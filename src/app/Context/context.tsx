"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { userProps } from "@/types/user";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth"; // Importe o observador de autenticação

interface MeuContextoProps {
  estado: string;
  setEstado: React.Dispatch<React.SetStateAction<string>>;
  usuarios: userProps[];
  usuarioLogado: userProps | undefined;
  statusContext: string;
  
  loading: boolean; // Útil para você travar telas enquanto carrega
}

interface MeuProviderProps {
  children: ReactNode;
}

// 1. Criação do Contexto
export const MeuContexto = createContext<MeuContextoProps | undefined>(
  undefined,
);

// 2. Criação do componente Provedor (Provider)
export function Provider({ children }: MeuProviderProps) {
  const [estado, setEstado] = useState("Dado inicial");
  const [usuarios, setUsuarios] = useState<userProps[]>([]);
  const [usuarioLogado, setUsuarioLogado] = useState<userProps>();
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [statusContext, setStatusContext] = useState<"loading" | "sucess" | "error" | "idle">(
    "idle",
  );

  // Escuta se o usuário está logado ou não (resolve o problema do Firebase iniciar vazio)
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Escuta o Firestore em tempo real assim que tivermos um userId válido
  useEffect(() => {
    if (!userId) return;
    const docRef = doc(db, "usuarios", userId);
    
    const unsubscribeFirestore = onSnapshot(
      docRef,
      (docSnap) => {
      

        if (docSnap.exists()) {
          const dadosDoBanco = docSnap.data();

          // Mapeamos o campo 'nome' do Firestore para a propriedade 'userName' esperada
          const dadosDoUsuario = {
            uid: docSnap.id,
            userName: dadosDoBanco?.nome || "Usuário sem nome",
            ...dadosDoBanco,
          } as userProps;

          setUsuarioLogado(dadosDoUsuario);
        } else {
          console.log("Nenhum documento encontrado para este UID!");
        }

       
      },
      (error) => {
        console.error("Erro ao buscar dados em tempo real: ", error);
      
      },
    );

    return () => {
      
      unsubscribeFirestore();
    };
  }, [userId]); // Monitora a mudança do userId gerado pelo auth

  useEffect(() => {
    const refCollection = collection(db, "usuarios");
    const timer = window.setTimeout(() => setStatusContext("loading"), 0);
    const unsubscribeAllUsers = onSnapshot(refCollection, async (snapshot) => {
      try{
        const lista = snapshot.docs.map((docSnap) => {
          const dados = docSnap.data();
          return {
            uid: docSnap.id,
            // Mapeia o campo 'nome' para 'userName' em toda a lista se a sua interface 'userProps' exigir
            userName: dados?.nome || "Sem nome",
            ...dados,
          } as userProps;
          
        });
       setStatusContext("idle")
        setUsuarios(lista);
      }catch(err){
        console.log(err)
      }

    });
    return () => {
      window.clearTimeout(timer);
      unsubscribeAllUsers();}
  }, []);

const contextoValor = useMemo(() => {
  return {
    estado,
    setEstado,
    usuarios,
    usuarioLogado,
    loading,
    statusContext,
    
  };
}, [estado, usuarios, usuarioLogado, loading, statusContext]);

  return (
    <MeuContexto.Provider
      value={contextoValor}
    >
      {children}
    </MeuContexto.Provider>
  );
}

// 3. Hook customizado para consumir o contexto
export function ContextUsers() {
  const context = useContext(MeuContexto);
  if (!context) {
    throw new Error("useMeuContexto must be used within a MeuProvider");
  }
  return context;
}
