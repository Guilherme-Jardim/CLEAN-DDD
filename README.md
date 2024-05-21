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
