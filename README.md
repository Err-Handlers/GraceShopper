# Full Stack E-commerce Site (Sticky Situations)
A team of four worked to create an online storefront, called Sticky Situations, that sells stickers. Customers can add items to a persisting cart and checkout as a guest, or as a signed-in user. User accounts have access to all order history information. Admins can sign in to create, update, or delete item listings, and access user account information and order history.

## This full stack app boilerplate consists of:

- an Express web server,
- a PostgreSQL database instance,
- and a React front-end

# Local Development

## Getting Started

1. Fork and clone this repo to your local machine, then run the following commands to reinitialize your git history from scratch:

```bash
# these commands reset your git history
$ rm -rf .git
$ git init
```

2. Create a bare GitHub repo (no `.gitignore`, `README.md`, `CHANGELOG.md`, or license) and copy the ssh address to assign to your local clone with `git remote add origin <paste-your-ssh-address-here>`

3. `npm install` to add project dependencies to your local machine.

4. Choose a name for your local database instance and edit `db/index.js` to assign the name to `DB_NAME`. Next, run `createdb <your-db-name-goes-here>` from your command line to spin up your database.

5. `npm run start:dev` will build your React app and start your express server in concurrent mode (meaning that both processes run in the same terminal window). Once this command is running, you can start developing! `nodemon` and `react-scripts` will listen to file changes and update continuously (hot-module-reloading).

<em>NB: If you see a `proxy error` message in the terminal, just hard refresh your browser window and you'll be all set.</em>

## Project Structure

```bash
├── .github/workflows
│   └── heroku-deploy.yaml
│  
├── api
│   ├── apiRouter.test.js
│   └── index.js
│
├── db
│   ├── models
│   │   ├── index.js
│   │   └── user.js
│   ├── client.js
│   ├── index.js
│   └── init_db.js
│
├── public
│   └── index.html
│
├── src
│   ├── axios-services
│   │   └── index.js
│   ├── components
│   │   ├── App.js
│   │   └── index.js
│   ├── style
│   │   ├── App.css
│   │   └── index.css
│   └── index.js
│
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

`/db` contains your `index.js` which exports the client instance and your database adapter models, as well as `init_db.js` which should be run when you need to rebuild your tables and seed data.

`/public` and `/src` are the two puzzle pieces for your React front-end. `/public` contains any static files necessary for your front-end. This can include images, a favicon, and most importantly the `index.html` that is the root of your React application.

`src/axios-services` contains your axios network request adapters. `src/components` contains your React component files.

Inside `/api` you have `index.js` which is responsible for building the `apiRouter` that you'll attach in the express server, and `apiRouter.test.js` which will give you direction on test-driven development for your api. Your React application and Express server use any routes you build in the `/api` directory to send/receive data via JSON, for example, a `usersRouter.js` that will be required and mounted in the `apiRouter.js`.

Rounding things out, we've got the top level `index.js` that creates your Express Server. This should be responsible for setting up your API, starting your server, and connecting to your database. We've also got our `.gitignore`, `package-lock.json`, and `package.json` where you'll find the scripts necessary to get your app off the ground, as well as this `README.md`.

## Command Line Tools

In addition to `start:dev`, `client:build`, `client:dev` and `server:dev`, you have access to `db:build` which rebuilds the database, all the tables, and ensures that there is meaningful data present.
