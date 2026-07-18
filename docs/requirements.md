## Sistema de eventos cosplay

## Objetivo
Desenvolver um sistema para gerenciar os eventos e os concursos cosplay substituindo o processo 
realizado com planilhas.

---
## Usuarios dos sitemas
- Administrador
- Jurados
- Membro

---

## Problemas indentificados

- demora para preencher as informações do cosplay;
- filas gigantes para preencher o concurso cosplay;

## Requisitos Funcionais

-RF01 - Authenticar usuários do dashboard
-RF02 - Crud com eventos
-RF03 - Separar os eventos em status por timestamp (ativo, ao vivo e encerrado)
-RF04 - crud com usuários pelo Administrador
-RF05 - Recebe os competidores da lista na seção jurados
-RF06 - Jurados podem avaliar os competidores
-RF07 - Pódio de top 3 vencedores da competição cosplay
-RF08 - Gerenciar logs do sistema

## Requisitos Não funcionais
-RNF01 - O sistema deve ser acessado apenas pela equipe do Picnic
-RNF02 - O sistema deve ter mediaqueries para os dispositivos
-RNF03 - Tempo de resposta inferior a 2 segundos


## Regras de Negócios

-RN01 - Cada evento deve possuir uma opção de ativar o concurso cosplay
-RN02 - Caso tenha um evento com concurso ativado, as opções dos eventos restantes deve ser desativados
-RN03 - Apenas administradores pode excluir alunos.
-RN04 - Nenhum membro pode excluir o owner.
-RN05 - Usuários da equipe podem visualizar as seções eventos e equipe 
-RN06 - Na página principal deve retornar o evento mais próximo a ser realizado
