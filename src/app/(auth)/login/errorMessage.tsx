import React from 'react';
interface errorProps{
  error: string | { code: string } | null;
}


export default function ErrorMessage({ error } :errorProps) {
  // Se não houver erro, não renderiza nada na tela
  if (!error) return null;

  // Extrai o código caso venha o objeto de erro completo, ou usa a própria string
  const errorCode = typeof error === 'string' ? error : error?.code;

  // Função para traduzir o código do Firebase para Português
  const getErrorMessage = (code: string) => {
    switch (code) {
   // --- Erros de Login ---
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'E-mail ou senha incorretos.';
      case 'auth/invalid-email':
        return 'O formato do e-mail digitado é inválido.';
      case 'auth/user-disabled':
        return 'Este usuário foi desativado pela administração.';
      
      // --- Erros de Recuperação de Senha ---
      case 'auth/missing-email':
        return 'Por favor, digite um endereço de e-mail.';
      case 'auth/missing-android-pkg-name':
      case 'auth/missing-ios-bundle-id':
      case 'auth/invalid-continue-uri':
        return 'Erro interno na configuração do link de recuperação.';

      // --- Erros Gerais / Rede ---
      case 'auth/too-many-requests':
        return 'Muitas tentativas seguidas. Aguarde um momento e tente novamente.';
      case 'auth/network-request-failed':
        return 'Falha na conexão com a internet. Verifique sua rede.';
      default:
        return 'Ocorreu um erro inesperado. Tente novamente.';
    }
  };

  const mensagemTraduzida = getErrorMessage(errorCode);

  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#FEE2E2', // Fundo vermelho claro
        border: '1px solid #FCA5A5', // Borda vermelha suave
        color: '#991B1B', // Texto vermelho escuro para contraste
        padding: '10px 14px',
        borderRadius: '8px',
        fontSize: '14px',
        marginBottom: '16px',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Ícone de Alerta */}
      <svg style={{ width: '18px', height: '18px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span>{mensagemTraduzida}</span>
    </div>
  );
}