# Spotify API

This is a REST API that can be used to create Spotify-like music application 🎵.

## Tech Stack

**Server:** Node.js, Express.js

**Database:** PostgreSQL

**ORM:** Sequelize

## Database diagram

[![spotify-db-diagram.png](https://i.postimg.cc/BtWtsnVX/spotify-db-diagram.png)](https://postimg.cc/rRJqNMck)

## Project Structure

```bash
.
├── .env
├── node_modules
├── package-lock.json
├── package.json
├── server.js	
├── src
    ├── auxiliaries
    │   ├── errors 
    │   │   └── ... 
    │   ├── helpers
    │   │   └── ... 
    │   └── validations
    │   │   └── ... 
    ├── configs
    │   └── ... 
    ├── controllers
    │   └── ... 
    ├── libs
    │   └── ... 
    ├── middlewares
    │   └── ... 
    ├── models
    │   └── ... 
    ├── routes
    │   └── ... 
    └── services
    │   └── ... 

```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DB_USER`
`DB_PASSWORD`
`DB_NAME`
`DB_HOST`
`DB_PORT`

`SECRET_KEY`

## Run Locally

Clone the project

```bash
  git clone https://github.com/WinterSakuraa/spotify-api.git
```

Go to the project directory

```bash
  cd spotify-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

Start the server in development mode

```bash
  npm run dev
```

