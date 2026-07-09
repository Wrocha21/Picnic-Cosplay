"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import IconPassView from "@/Components/ui/login-pass-view";
import Image from "next/image";
import logo from "@/app/Assets/images/logo.png";
import "@/app/Assets/styles.css";
import Loader from "@/Components/ui/loader";
import { auth } from "@/firebase/config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import ErrorMessage from "./errorMessage";

export default function Login() {
  const router = useRouter();
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    // O onAuthStateChanged espera o Firebase inicializar e carregar o usuário
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // SÓ redireciona automaticamente se o formulário não estiver em processo de login
      if (user && status !== "LOADING" && status !== "SUCESS") {
        router.push("/dashboard");
      }
    });

    return () => unsubscribe(); // Limpa o listener ao desmontar a tela
  }, [router, status]);

  const [viewPass, setViewPass] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [loginError, setLoginError] = useState<FirebaseError | null>(null);
  const delay = (ms: number | undefined) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  function handleViewPass() {
    setViewPass(!viewPass);
  }
  async function handleAuth(e: FormEvent) {
    e.preventDefault();

    try {
      setStatus("LOADING");
      await delay(1000);
      const userCredential = await signInWithEmailAndPassword(auth, emailValue, passValue);
      const user = userCredential.user
      const token = await user.getIdToken();
      const diasParaExpirar = 7;
      const data = new Date();
      data.setTime(data.getTime() + diasParaExpirar * 24 * 60 * 60 * 1000);

      document.cookie = `session=${encodeURIComponent(token)}; expires=${data.toUTCString()}; path=/; SameSite=Strict; Secure`;
      setStatus("SUCESS");

      
      await delay(500);
      window.location.href = "/dashboard";
      
    } catch (err: unknown) {
      setStatus("ERROR");
      if (err instanceof FirebaseError) {
        setLoginError(err);
      } else {
        setLoginError(new FirebaseError("unknown", String(err)));
      }
      await delay(3000);
      setLoginError(null);
      setStatus("idle");
    }
  }

  return (
    <>
      <div className="box-pattern">
        <div className="Container-login">
        <div className="box-logo">
          <Image src={logo} width={120} height={120} alt="Logo Picnic" />
          <div className="title">
            <h2>Dashboard Administrativo</h2>
            <span>Acesse o painel de controle do evento</span>
          </div>
        </div>
          <div className="box-form">
            <form onSubmit={handleAuth}>
              <span>Email</span>
              <div
                className="box-email"
                style={{ border: emailValue ? "1px solid red" : "" }}
              >
                <input
                  type="text"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  placeholder="example@gmail.com"
                />
              </div>
              <span>Senha</span>
              <div
                className="box-senha"
                style={{ border: passValue ? "1px solid red" : "" }}
              >
                <input
                  type={viewPass ? "text" : "password"}
                  value={passValue}
                  placeholder="Sua Senha"
                  onChange={(e) => setPassValue(e.target.value)}
                />
                <div className="box-eyeIcon" onClick={handleViewPass}>
                  <IconPassView HandleView={viewPass} />
                </div>
              </div>
              <ErrorMessage error={loginError} />
              <div className="box-button">
                <button
                  style={{
                    backgroundColor: status === "SUCESS" ? "#3ba177" : "",
                  }}
                >
                  {" "}
                  {status !== "idle" ? (
                    <Loader status={status} />
                  ) : (
                    "Entrar no sistema"
                  )}
                </button>
                <p>
                  Esqueceu a senha?{" "}
                  <span onClick={() => router.push("/login/recovery")}>
                    recuperar
                  </span>{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
