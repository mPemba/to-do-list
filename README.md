# To Do List

This is a simple To-Do List application. You can add items,
mark them as complete, update their titles/descriptions and delete them.

> Built with React, Node, and a Firestore DB

## Get Started

- First, generate a Firestore private key file via [these instructions](https://firebase.google.com/docs/firestore/quickstart#initialize) in the "Initialize on your own server" section. Keep your file in a safe place.
- Create a directory `/server/secret`. This will be ignored by Github.
- Add a copy of your Firestore config file to the folder
- Create a `.env` file in the `/server` directory and add the path to the config file like this:

```
FIRESTORE_CONFIG_PATH=../secret/{yourConfigFileHere}.json
```

## Start the server

- In a terminal window, navigate to root and start the server
- `cd server`
- `yarn install`
- `yarn start`
- You should see the message in your terminal "Server is listening on port 5000"

## Test the server

- Run `yarn test`

## Start the React app

- Now in a new terminal window navigate to root
- `yarn install`
- `yarn start`

## Test the React app

- First start the app
- Then open a new terminal window and navigate to the project
- To run Cypress tests run: `yarn cy:run`
- To open Cypress and watch the tests run use: `yarn cy:open`
