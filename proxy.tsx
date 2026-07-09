import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Busca o token ou cookie de sessão do Firebase administrado pelo app
  const token = request.cookies.get("session")?.value;

  // 2. Define a rota alvo que precisa de proteção
  const isDashboardRoute = pathname.startsWith("/dashboard");

  // 3. Se tentar acessar o painel privado sem estar autenticado, barra o acesso
  if (isDashboardRoute && (!token || token === '""' || token.trim() === "")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4. Se já estiver logado e tentar voltar para a tela de login, joga para dentro do painel
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Permite a navegação para rotas públicas
  const response = NextResponse.next();
  return response;
}

// Configura o filtro para o proxy rodar apenas onde interessa
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/login"],
};
