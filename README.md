# To Do List

This is a simple To-Do List application. You can add items,
mark them as complete, update their titles and delete them.

> Built with React, Node, and a Firestore DB

## How to start

- Generate a Firestore privite key via [these instructions](https://firebase.google.com/docs/firestore/quickstart#initialize) in the "Initialize on your own server" section. Keep your file in a safe place.
- Create a directory `/server/secret`. This will be ignored by Github.
- Add a copy of your Firestore config file to the folder
- Create a `.env` file and add the path to the config file:

```
env code here
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

- Cypress tests coming soon 😎
