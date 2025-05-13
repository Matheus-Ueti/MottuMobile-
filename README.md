# Mottu Mobile

Aplicativo de gestão e mapeamento inteligente de motos para a Mottu, desenvolvido com React Native e Expo.

## Funcionalidades Implementadas

1. **Navegação entre telas (20 pontos)**
   - Uso da biblioteca React Navigation para gerenciar rotas
   - 5 rotas navegáveis: Login, Dashboard, CRUD, User e About

2. **Protótipo visual funcional (30 pontos)**
   - Layout funcional e coerente com o fluxo de uso
   - Design moderno com temas consistentes
   - UI responsiva e amigável

3. **Formulário com manipulação de estado (20 pontos)**
   - Uso de useState e useEffect para controle dos campos
   - Formulários reativos com validação
   - Feedback visual para o usuário (alertas, etc.)

4. **Armazenamento local com AsyncStorage (20 pontos)**
   - Persistência de dados entre sessões
   - Armazenamento de perfil de usuário
   - Armazenamento da lista de motos cadastradas
   - Opção de "lembrar usuário" no login

5. **Projeto organizado (10 pontos)**
   - Estrutura de diretórios clara
   - Código limpo e comentado
   - Tipagem com TypeScript

## Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- React Navigation
- AsyncStorage

## Como executar o projeto

1. Certifique-se de ter o Node.js instalado (versão recomendada: 16.x ou superior)
2. Instale o Expo CLI: `npm install -g expo-cli`
3. Clone este repositório
4. Navegue até a pasta do projeto e execute:
   ```
   npm install
   npx expo start
   ```
5. Use o aplicativo Expo Go no seu dispositivo móvel para escanear o QR Code, ou execute em um emulador

## Estrutura de arquivos

```
├── assets/           # Recursos estáticos (imagens, fontes)
├── screens/          # Componentes de tela
│   ├── AboutScreen.tsx
│   ├── CrudScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── LoginScreen.tsx
│   └── UserScreen.tsx
├── App.tsx           # Componente principal e configuração de navegação
├── app.json          # Configurações do Expo
├── package.json      # Dependências e scripts
└── tsconfig.json     # Configurações do TypeScript
```

## Credenciais para teste

O aplicativo não possui autenticação real, você pode usar qualquer usuário e senha para login.

## Funcionalidades por tela

### Login
- Sistema de login com opção "lembrar usuário"
- Validação de formulário

### Dashboard
- Painel de controle com estatísticas
- Menu de navegação para todas as funcionalidades
- Exibição de dados personalizados baseados no perfil

### Gestão de Motos (CRUD)
- Listagem de motos cadastradas
- Adição, edição e remoção de motos
- Persistência dos dados entre sessões

### Perfil do Usuário
- Visualização e edição de perfil
- Armazenamento local dos dados

### Sobre
- Informações sobre o aplicativo
- Detalhes técnicos e versão

## Desenvolvido por

Nome do Desenvolvedor - RM12345

## Licença

Este projeto está licenciado sob a Licença MIT. 