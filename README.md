# Mottu Mobile

Aplicativo de gestão e mapeamento inteligente de motos para a Mottu, desenvolvido com React Native e Expo.

## Funcionalidades Implementadas

1. **Navegação entre telas (20 pontos)**
   - Uso da biblioteca React Navigation para gerenciar rotas
   - 5 rotas navegáveis: Login, Painel, Gestão de Motos, Usuário e Sobre
   - Nomenclatura de telas e componentes em português

2. **Protótipo visual funcional (30 pontos)**
   - Layout funcional e coerente com o fluxo de uso
   - Design moderno com temas consistentes
   - UI responsiva e amigável
   - Cores e estilos padronizados

3. **Formulário com manipulação de estado (20 pontos)**
   - Uso de useState e useEffect para controle dos campos
   - Formulários reativos com validação
   - Feedback visual para o usuário (alertas, etc.)
   - Tipagem forte com TypeScript

4. **Armazenamento local com AsyncStorage (20 pontos)**
   - Persistência de dados entre sessões
   - Armazenamento de perfil de usuário
   - Armazenamento da lista de motos
   - Opção de "lembrar usuário" no login

5. **Qualidade de código (10 pontos)**
   - Código organizado e bem estruturado
   - Padrões de nomenclatura consistentes
   - Componentes reutilizáveis
   - Tipagem adequada com TypeScript
   - Comentários explicativos em português

## Estrutura do Projeto

- **App.tsx** - Configuração de navegação
- **screens/**
  - **TelaLogin.tsx** - Tela de login com opção "lembrar usuário"
  - **TelaPainel.tsx** - Dashboard com estatísticas e acesso rápido às funcionalidades
  - **TelaGestaoMotos.tsx** - CRUD completo para gestão de motos
  - **TelaUsuario.tsx** - Visualização e edição de perfil de usuário
  - **TelaSobre.tsx** - Informações sobre o aplicativo

## Como Executar

1. Clone o repositório
2. Instale as dependências: `npm install` ou `yarn install`
3. Execute o projeto: `npx expo start` ou `yarn start`
4. Escaneie o QR Code com o aplicativo Expo Go no seu dispositivo ou use um emulador

## Tecnologias Utilizadas

- React Native
- TypeScript
- React Navigation
- AsyncStorage
- Expo

## Desenvolvido por

Matheus Munuera Ueti- RM557812
Pedro Gomes - RM 553907
Luiz Felipe Abreu - RM 555197