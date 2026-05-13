# AdFlow Manager

Projeto full stack em desenvolvimento para simular um sistema interno de gestão de campanhas publicitárias em contexto AdTech.

## Stack

- Java 21
- Spring Boot
- Maven
- MySQL
- Spring Data JPA
- Spring Security
- Bean Validation
- Swagger/OpenAPI
- Postman
- Git/GitHub

## Funcionalidades implementadas

- CRUD de campanhas
- DTO para entrada de dados
- Validação de campos obrigatórios
- Tratamento global de erros
- Paginação
- Ordenação
- Filtro por plataforma
- Documentação com Swagger

## Endpoints principais

```txt
POST   /campaigns
GET    /campaigns
GET    /campaigns/{id}
PUT    /campaigns/{id}
DELETE /campaigns/{id}
GET    /campaigns?platform=Google&page=0&size=5

```

## Swagger

```txt
http://localhost:8080/swagger-ui/index.html
```

## Objetivo do projeto

Praticar arquitetura backend com Spring Boot, APIs REST, persistência com MySQL, validações, documentação e boas práticas de organização em camadas.