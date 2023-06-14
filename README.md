# Find a Friend API - projeto em produção - desafio que faz parte da trilha NodeJs do Ignite/Rocketseat

### Regras da aplicação

- [x] Deve ser possível cadastrar um pet 
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade 
- [x] Deve ser possível filtrar pets por suas características 
- [x] Deve ser possível visualizar detalhes de um pet para adoção 
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

### Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade 
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp 
- [x] Um pet deve estar ligado a uma ORG 
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp 
- [x] Todos os filtros, além da cidade, são opcionais 
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

### Requisitos não funcionais

- [x] A senha da ORG precisa estar criptografada 
- [x] Os dados da aplicação precisam estar persistidos em um banco de dados PostgreSQL 
- [x] Todas as listas de dados precisam estar paginados com 10 items por página 
- [ ] A ORG precisa ser identificada com um JWT (JSON Web Token)