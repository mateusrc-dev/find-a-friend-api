### Regras da aplicação

[ ] Deve ser possível cadastrar um pet 
[ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade 
[ ] Deve ser possível filtrar pets por suas características 
[ ] Deve ser possível visualizar detalhes de um pet para adoção 
[ ] Deve ser possível se cadastrar como uma ORG 
[ ] Deve ser possível realizar login como uma ORG

### Regras de negócio

[ ] Para listar os pets, obrigatoriamente precisamos informar a cidade 
[ ] Uma ORG precisa ter um endereço e um número de WhatsApp 
[ ] Um pet deve estar ligado a uma ORG 
[ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp 
[ ] Todos os filtros, além da cidade, são opcionais 
[ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

### Requisitos não funcionais

[ ] A senha da ORG precisa estar criptografada 
[ ] Os dados da aplicação precisam estar persistidos em um banco de dados PostgreSQL 
[ ] Todas as listas de dados precisam estar paginados com 20 items por página 
[ ] A ORG precisa ser identificada com um JWT (JSON Web Token)