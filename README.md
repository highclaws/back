<p align="center">
  <img src="https://docs.nestjs.com/assets/logo-small.svg" width="150px" height="150px"/>
</p>

## Installation

```bash
# install nvm
nvm install lts
# change the default active Node version to v18.14.0
nvm use 18.14.0
# install dependencies
npm install
```

## Installation with docker compose

```bash
#  set the value of "migration" to flase for the fist time
#  if there is the modification in the code source we need run "docker compose up --build"
docker compose up

#  after the first build to initiliez the database, set the migration to "true"
#  since we change the value from false to true, we need run "docker compose up --build"
docker compose up --build
```

## Creat a connexion with Pgadmin

```bash

# register a server :
host name : db
port : 5432
Database : store-apple
User : store
mdp : store
# after the connexion, you can see the data
```

## Build

```bash
# build the app and generate TSOA routes
npm run build

# build the app and launch it (used for deploying the app)
npm run start:dev

```

# Create an empty migration file

To create an empty migration file you can run the following command:
`npm run create-empty-migration -- -n SprintXX -c ??`

## Tests

```bash
# run unit tests
npm test

# run unit tests with watcher
npm run tdd

# generate coverage for unit tests
npm run coverage

```

## Linting

```bash
# run typescript linter
npm run lint

# run typescript linter and fix fixable linting errors
npm run lint:fix
```
