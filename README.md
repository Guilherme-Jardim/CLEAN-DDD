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
