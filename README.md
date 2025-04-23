# Pokedex 
> Project under construction

This project is a full-stack application built with `NodeJS, Express, MongoDB, Mongoose, GraphQL and React`.
The purpose of this project is to serve as a training to get familiar with those technologies.

## Features
In progress

### Ongoing improvements
- [x] ~~Frontend - Main page layout to be done~~
- [ ] Add functionality to capture a pokemon 
- [ ] Add functionality to search a pokemon by name or by type
- [ ] Make a change to keep pokemon id 
- [ ] Add pagination component

## Backend

### Prerequisites
Provide in the `.env` the MongoDB uri and a JWT secret for JWT generation

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

### Acknowledgement
This project took strong inspiration from the following resources :
- https://github.com/dgraph-io/graphql-sample-apps/tree/master/pokedex