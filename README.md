# Pokedex

This project is a **full-stack application** built with `NodeJS, Express, MongoDB, Mongoose, GraphQL, React and Mui`.
The purpose of this project is to serve as a practice to get familiar with `GraphQL`.

## Features
### User can view all pokemon cards
<img src="./docs/pokedex.png" alt="pokedex" height="500"><img src="./docs/mobile-pokedex.png" alt="mobile pokedex" height="500">

### User can search pokemons by name, number or type
<img src="./docs/pokedex-filter.png" alt="pokedex filter" height="500">

## Backend

### Prerequisites
Provide in the `.env` the MongoDB URI and a JWT secret for JWT generation.
> In this MongoDB Atlas was used

```
MONGO_URI=
ALLOWED_ORIGIN=
```

- For `ALLOWED_ORIGIN` specify the frontend url, example : `ALLOWED_ORIGIN=http://localhost:5173`


### Installation and Setup Instructions

You will need `node` and `npm` installed globally on your machine.

Move to frontend folder:
`cd ./backend`

Installation:

`npm install`


To Start Server:

`npm start`

Server is running on PORT:

`http://localhost:8080/`

## Usage - Populate the MongoDB database
Run the `graphql` statement in `backend/snippets/createAllPokemon.graphql` to populate your mongodb database with data.

As an example, you can use `Postman`

<img src="./docs/postman.png" alt="postamn example" height="300">

> Please note that the example of data provided in `backend/snippets/createAllPokemon.graphql` is definitely not exhaustive. As the purpose of this project is only to practice GraphQL.

## Frontend

### Prerequisites
Provide in the `.env` the backend url.

```
VITE_BACKEND_API_URL=http://localhost:8080
```

- For `VITE_BACKEND_API_URL` specify the backend url.

### Installation and Setup Instructions

You will need `node` and `npm` installed globally on your machine.

Move to frontend folder:
`cd ./frontend`

Installation:

`npm install`


To Start Server:

`npm run dev`

To Visit App:

`http://localhost:5173/`

To run testcafe test:

`npm run test`

### Acknowledgement
This project took strong inspiration from the following resources :
- https://github.com/dgraph-io/graphql-sample-apps/tree/master/pokedex