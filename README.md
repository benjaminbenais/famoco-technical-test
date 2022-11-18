# Famoco Technical Test - Benjamin Benais

## Project overview

Project URL: https://famoco-technical-test.vercel.app/

The API I have decided to use is [CoinLore](https://www.coinlore.com/cryptocurrency-data-api).

CoinLore is a public API (no key required) which can be used to access cryptocurrencies data such as the current price of each crypto, the market cap, etc.

Two pages are available:

- https://famoco-technical-test.vercel.app/currencies
- https://famoco-technical-test.vercel.app/currencies/90

### Currencies page

The route `/currencies` displays the latest market data about cryptocurrencies in a table.
The currencies are ranked by market cap.

The pagination can be found below the table, allowing to display more rows in the table and to display the next/previous results.

General information about the market is displayed above the table.

1. The first step is to call the endpoint: https://api.coinlore.net/api/global/ to retrieve the general information about the market, but most importantly, to retrieve the total number of coins.

The total number of coins is required to be able to paginate, since the endpoint to retrieve all the coins do not returns the total of coins.

2. Once the endpoint responds with the data, a second endpoint is called: https://api.coinlore.net/api/tickers/ to retrieve data for all the cryptocurrencies.

Two parameters can be used to handle the pagination: `start` and `limit`.

Each row of the table is clickable to get more information about a specific coin.

### Currency page

This page display more information about a specific coin and a table containing all the exchanges where the coin can be bought.

## Project setup

The project uses Typescript, Eslint, Prettier and Lint-staged (with Husky) to enforce code quality.

Husky is a Git hook that will execute some scripts when changes are committed.
In this case, two scripts are excecuted:
`eslint` and `prettier --write`.

The `eslint` script checks if there are any linting errors in the commited files.

The `prettier --write` script runs Prettier across all the commited files to format them according to the `.prettierrc` file.

If any of the scripts fails, with linting errors for example, the commit is rejected.

## UI Library

The project is using Material UI as the UI library. Since you work with this library at Famoco I though it would be a good idea to use it here as well. I was not very familiar with the library before but I find it quite enjoyable to work with and it is well documented.

I have implemented a light/dark theme mode, which you can toggle using the icons in the header.

The theme is managed with a React context, located in `src/contexts/colorModeContext.tsx`.

It uses the mode saved in localStorage (if previously set), otherwise it uses the preferences saved in the system as the default to detect if the user prefers dark of light mode.

## State management library

Redux is the main state management library in the project as it was required for the technical test.
I have been using redux for 3 years now, and for a year with their latest version Redux Toolkit.

## Deployment

The project is deployed using [Vercel](https://vercel.com).

Vercel makes the deploiement of React and Next JS project very easy, a few clicks and it's up and running.

## React specific

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
