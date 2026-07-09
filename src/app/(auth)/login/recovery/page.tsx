"use client";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import logo from "@/app/Assets/images/logo.png";
import "@/app/Assets/styles.css";
import Loader from "@/Components/ui/loader";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/config";
import { FirebaseError } from "firebase/app";
import ErrorMessage from "../errorMessage";

export default function Login() {
  const router = useRouter();
  const [emailValue, setEmailValue] = useState("");
  const [recoveryError, setRecoveryError] = useState<FirebaseError | null>(
    null,
  );
  const delay = (ms: number | undefined) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const [status, setStatus] = useState("idle");
  async function handleSendEmailRecovery(e: FormEvent) {
    e.preventDefault();

    try {
      setStatus("LOADING");
      await delay(500);
      await sendPasswordResetEmail(auth, emailValue);

      await delay(1000);

      setStatus("SUCESS");

      await delay(5000);

      setEmailValue("");

      router.push("/login");
    } catch (err: unknown) {
      setStatus("ERROR");
      console.log(err);
      if (err instanceof FirebaseError) {
        setRecoveryError(err);
      } else {
        setRecoveryError(new FirebaseError("unknown", String(err)));
      }
      await delay(2000);
      setRecoveryError(null);
      setStatus("idle");
    }
  }
  return (
    <>
      <div className="box-pattern">
        <div className="box-logo">
          <Image src={logo} width={120} height={120} alt="Logo Picnic" />
        </div>
        <div className="Container-login">
          <div className="box-title">
            <h2>Esqueceu sua senha?</h2>
            <span>
              Digite seu e-mail cadastrado para receber as instruções de
              redefinição.
            </span>
          </div>
          <div className="box-form">
            <form onSubmit={handleSendEmailRecovery}>
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
              <div className="box-button">
                <ErrorMessage error={recoveryError} />
                <button
                  style={{
                    backgroundColor: status === "SUCESS" ? "#3ba177" : "",
                  }}
                >
                  {status !== "idle" ? (
                    <Loader status={status} />
                  ) : (
                    "Enviar link de recuperação"
                  )}
                </button>
                <p>
                  Lembrou sua senha?
                  <span onClick={() => router.push("/login")}>Entrar</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
