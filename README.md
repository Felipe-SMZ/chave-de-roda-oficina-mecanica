# Chave de Roda

Sistema de gestão para oficina mecânica, desenvolvido em **React Native (Expo)** com **Firebase Cloud Firestore** como banco de dados NoSQL. Projeto acadêmico da disciplina de Dispositivos Móveis, com CRUD completo para as 5 entidades do domínio da oficina.

## Sobre o projeto

O **Chave de Roda** permite que uma oficina mecânica gerencie seus clientes, veículos, funcionários, serviços oferecidos e ordens de serviço em um único aplicativo, com dados armazenados na nuvem via Firestore e acesso tanto pelo celular quanto pelo navegador (Web).

O projeto foi desenvolvido individualmente, com foco em:
- Modelagem de um banco de dados NoSQL orientado a documentos;
- Integração de um app React Native com o Firebase Firestore;
- Implementação de CRUD completo (criar, listar, editar, excluir) para cada entidade;
- Tratamento de referências entre collections (o Firestore não possui `JOIN` nativo);
- Interface responsiva, funcionando tanto em telas de celular quanto na Web.

## Funcionalidades

Para cada uma das 5 entidades abaixo, o app oferece cadastro, listagem, edição e exclusão:

| Entidade | Descrição |
|---|---|
| **Clientes** | Cadastro de clientes da oficina (nome, telefone, email) |
| **Veículos** | Veículos vinculados a um cliente (placa, modelo, marca, ano) |
| **Funcionários** | Funcionários da oficina (nome, cargo, telefone, data de admissão) |
| **Serviços** | Catálogo de serviços oferecidos (descrição, categoria, valor médio) |
| **Ordens de Serviço** | Vincula veículo, funcionário e serviço, com data, status e valor total |

Recursos adicionais:
- Seleção de registros relacionados via **Picker** (ex: escolher o cliente dono de um veículo, ou o veículo/funcionário/serviço de uma ordem de serviço), em vez de digitar IDs manualmente;
- Resolução de referências na listagem (ex: a tela de Veículos mostra o **nome** do cliente, não apenas o ID armazenado);
- Validação e formatação de dados antes de salvar (nome capitalizado, placa padronizada em maiúsculas, telefone só com números, validação de formato de email);
- Layout responsivo com grid adaptável (colunas ajustam conforme a largura da tela, de 1 no celular até 4 na Web).

## Tecnologias utilizadas

- **React Native** com **Expo** (SDK gerenciado, suporte nativo a Web via `react-native-web`)
- **Firebase Cloud Firestore** (banco de dados NoSQL)
- **React Navigation** (`@react-navigation/native-stack`) para navegação entre telas
- **@react-native-picker/picker** para seleção de registros relacionados
- Variáveis de ambiente via `.env` (padrão `EXPO_PUBLIC_*` do Expo)

## Modelagem do banco (NoSQL)

O modelo de dados foi projetado previamente no [brModeloWeb](https://www.brmodeloweb.com/), representando as 5 collections e suas relações antes da implementação. O diagrama completo está disponível em [`docs/modelo-nosql.png`](./docs/modelo-nosql.png) 

Resumo da estrutura:

```
clientes
├── nome        (string)
├── telefone    (string)
├── email       (string)
└── cpf         (string)

veiculos
├── placa           (string)
├── modelo          (string)
├── marca           (string)
├── ano             (number)
└── clientes_REF    (string) → referência a um documento de "clientes"

funcionarios
├── nome            (string)
├── cargo           (string)
├── telefone        (string)
└── dataAdmissao    (string, formato DD/MM/AAAA)

servicos
├── descricao   (string)
├── categoria   (string)
└── valorMedio  (number)

ordensServico
├── veiculos_REF      (string) → referência a um documento de "veiculos"
├── funcionarios_REF  (string) → referência a um documento de "funcionarios"
├── servicos_REF      (string) → referência a um documento de "servicos"
├── data              (string, formato DD/MM/AAAA)
├── status            (string)
└── valorTotal        (number)
```

> No Firestore (NoSQL) não existem chaves estrangeiras de verdade como em bancos relacionais. Os campos `*_REF` são referências lógicas — strings contendo o `id` do documento relacionado — resolvidas manualmente no código da aplicação (nunca automaticamente pelo banco).

## Estrutura de pastas

```
chave-de-roda/
├── src/
│   ├── components/
│   │   └── InfoCard.js            # card reutilizável usado em todas as listagens
│   ├── config/
│   │   └── firebaseConfig.js      # inicialização do Firebase/Firestore
│   ├── navigation/
│   │   └── AppNavigator.js        # todas as rotas do app (Stack Navigator)
│   ├── screens/
│   │   ├── MenuScreen.js
│   │   ├── clientes/
│   │   │   ├── ClienteFormScreen.js
│   │   │   ├── ClienteListScreen.js
│   │   │   └── ClienteEditScreen.js
│   │   ├── veiculos/      (mesmo padrão de clientes/)
│   │   ├── funcionarios/  (mesmo padrão de clientes/)
│   │   ├── servicos/      (mesmo padrão de clientes/)
│   │   └── ordensServico/ (mesmo padrão de clientes/)
│   ├── services/
│   │   ├── clienteService.js      # operações Firestore (CRUD) de cada collection
│   │   ├── veiculoService.js
│   │   ├── funcionarioService.js
│   │   ├── servicoService.js
│   │   └── ordemServicoService.js
│   ├── styles/
│   │   └── theme.js               # cores e estilos compartilhados entre todas as telas
│   └── utils/
│       └── formatters.js          # capitalização de nome, formatação de placa/telefone, validação de email, conversão numérica
├── App.js
├── .env                           # credenciais do Firebase (não versionado)
├── .env.example                   # modelo de variáveis necessárias (versionado)
└── package.json
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) (LTS recomendado)
- Uma conta no [Firebase](https://console.firebase.google.com/) com um projeto criado e o **Cloud Firestore** ativado

## Como rodar o projeto

1. Clone o repositório e instale as dependências:
   ```bash
   git clone https://github.com/Felipe-SMZ/chave-de-roda-oficina-mecanica
   cd chave-de-roda
   npm install
   ```

2. Copie o arquivo de exemplo de variáveis de ambiente e preencha com as credenciais do seu projeto Firebase:
   ```bash
   cp .env.example .env
   ```

3. Preencha o `.env` com os dados encontrados em **Firebase Console → Configurações do projeto → Seus apps → SDK do Firebase**:

   | Variável | Descrição |
   |---|---|
   | `EXPO_PUBLIC_FIREBASE_API_KEY` | Chave de API do projeto Firebase |
   | `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN` | Domínio de autenticação (`<projeto>.firebaseapp.com`) |
   | `EXPO_PUBLIC_FIREBASE_PROJECT_ID` | ID do projeto no Firebase |
   | `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET` | Bucket de armazenamento do projeto |
   | `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | ID do remetente de mensagens |
   | `EXPO_PUBLIC_FIREBASE_APP_ID` | ID do app registrado no Firebase |

4. Inicie o projeto (Web):
   ```bash
   npx expo start --web
   ```

   Para rodar em um emulador ou dispositivo físico (Android/iOS), use `npx expo start` e escaneie o QR Code com o app Expo Go, ou pressione `a`/`i` no terminal.

## Regras do Firestore

Para fins de desenvolvimento, o projeto foi configurado com as regras do Firestore liberando leitura e escrita:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

> **Atenção:** essa configuração é adequada apenas para desenvolvimento/entrega acadêmica. Em um sistema real, seria necessário restringir o acesso (por exemplo, `allow read, write: if request.auth != null;`), exigindo autenticação de usuários antes de liberar operações no banco.

## Limitações conhecidas e possíveis melhorias futuras

- **Resolução de referências em memória**: as telas que exibem dados relacionados (ex: nome do cliente dono de um veículo) buscam a collection inteira e cruzam os dados no próprio app. Essa abordagem é simples e adequada para o volume de dados deste projeto, mas não escalaria bem para uma base de dados com milhares de registros — nesses casos, seria mais indicado paginar as consultas ou denormalizar dados (salvar cópias de campos como o nome do cliente diretamente no documento do veículo).
- **Datas como texto**: os campos de data (`dataAdmissao`, `data`) são armazenados como string no formato `DD/MM/AAAA`, por simplicidade, em vez do tipo `Timestamp` nativo do Firestore. Isso é suficiente para exibição, mas não permite comparações ou ordenação cronológica direta no banco.
- **Lógica de acesso ao Firestore dentro das telas**: as chamadas ao Firestore ficam nos arquivos `*Service.js`, mas o tratamento de erros e o disparo dessas chamadas ainda ocorrem diretamente nas telas. Uma evolução possível seria extrair essa orquestração para uma camada intermediária adicional, aproximando a estrutura de um padrão em camadas mais tradicional (Controller/Service/Repository).
- **Regras de segurança abertas**: como mencionado acima, as regras do Firestore atualmente permitem leitura/escrita irrestritas, adequadas apenas ao escopo deste trabalho.

## Autor

Desenvolvido por Felipe S. Shimizu, como parte da disciplina de Dispositivos Móveis.
