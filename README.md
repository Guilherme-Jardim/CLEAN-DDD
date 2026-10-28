# CLEAN-DDD

Estudo de Domain-Driven Design e Clean Architecture em TypeScript. É um fórum de perguntas e respostas modelado só no domínio, sem framework nem banco: os repositórios são em memória e servem para os testes.

## Arquitetura

- `src/core`: base compartilhada (Entity, AggregateRoot, WatchedList, Either, eventos de domínio, erros)
- `src/domain/forum`: entidades, value objects (Slug), eventos e casos de uso de perguntas, respostas, comentários e anexos
- `src/domain/notification`: casos de uso e subscribers que reagem aos eventos do fórum
- `test/`: factories e repositórios em memória usados pelos testes

## Como instalar

```bash
npm install
```

## Como rodar e testar

Não há servidor, o projeto é validado pelos testes:

```bash
npm test          # vitest (27 arquivos, 45 testes)
npm run lint
npx tsc --noEmit
```

Obs.: os arquivos do repositório usam fim de linha CRLF, então o lint pode reclamar de `prettier/prettier` no Windows/Linux se o arquivo não for convertido.

---

## Anotações de estudo

# DDD (Domain-Driver-Design)

Design dirigido à domínio

## Domínio

- Domain Experts
  - Conversa
- Linguagem ubiqua

- Usuário
  - Cliente
  - Fornecedor
  - Atendente
  - Barman

- Agregados
- Value Objects
- Eventos de domínio
- Subdormínios (Bounded Contexts)
- Entidades
- Casos de uso 
  
# Conceitos

- Aggregate
- WatchedList

## Exemplo

- Order -> OrderItem[]
- Order -> Shipping

- Question -> Attachment[]

### Criação

- Título
- Conteúdo
- Anexos (3)

### Edição

- Título
- Conteúdo

- Adicionar um novo anexo (create)
- Remover o segundo anexo que tinha sido criado previamente (delete)
- Editar um anexo existente (update)

# Subdominios

- Core: O que dá dinheiro
- Supporting: Da suporte para o core funcionar
- Generic: Você precisa, mas não são tão importantes

## Exemplos

### Core

- Compra
- Catálogo
- Estoque
- Pagamento
- Entrega 
- Faturamento

### Supporting

- Estoque

### Generic

- Notificação ao cliente
- Promoções
- Chat

# Explicação do Padrão Publish/Subscribe (Pub/Sub)

## Visão Geral
O padrão Publish/Subscribe (pub/sub) é um método de comunicação assíncrona utilizado em arquiteturas serverless, onde mensagens ou eventos são enviados por publicadores a assinantes indiretamente através de um mecanismo de despacho de eventos.

## Componentes
- **Publicador (Publisher)**: Inicia a mensagem ou evento sem saber quais assinantes a receberão.
- **BD (DB)**: Representa um banco de dados que pode estar envolvido no armazenamento ou recuperação de dados relacionados aos eventos.
- **Resposta**: Provavelmente representa um serviço que cria respostas com base nas mensagens recebidas.
- **Notificação**: Indica um serviço responsável por lidar com notificações.
- **Enviar Notificação**: Sugere uma ação realizada por um dos serviços para notificar os assinantes.
- **Assinante (Subscriber)**: Recebe mensagens ou notificações com base em tópicos assinados sem saber sobre a existência dos publicadores.

## Fluxo de Trabalho
1. O Publicador publica um evento/mensagem em um tópico específico.
2. O BD pode armazenar ou fornecer dados necessários para o processamento da mensagem.
3. Resposta cria uma resposta ao evento que desencadeia ações adicionais dentro do sistema.
4. Notificação prepara notificações com base nos eventos/mensagens processados.
5. Enviar Notificação envia notificações para as partes interessadas ou sistemas.
6. O Assinante recebe notificações se estiver inscrito nos tópicos relevantes.

Este modelo promove um acoplamento frouxo entre componentes, permitindo que os sistemas escalem de forma eficiente e permaneçam resilientes a mudanças em componentes individuais.
