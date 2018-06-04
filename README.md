# Amazon URL Asin Crawler

This ASIN crawler is a full stack web application with the Front-end Developed in Node.js and React and Back-end developed in Node.js and Express.
This crawler crawls through a given URL and extracts information regarding the product such as product name, category, rank, dimensions, as well as a URL to the image based on the ASIN.

## Images

!["asin sample"](https://raw.githubusercontent.com/theoryofchao/asin-database/master/docs/sample.png)

## Getting Started
- Install dependencies for the project by running `npm install` in the root project folder as well as `npm install` in the `/asin-frontend` folder well.
- Because I haven't resolved the issue of utilizing Docker to correctly set up and expose the Postgres database, you will have to create a database `asin` utilizing `psql` and run the `init.sql` located in root project directory. This should allow `asinuser` to have control over the `asin` database.
- Run the project using `npm start`. We are using `concurrently` to run both the frontend and the backend at the same time.

### Dependencies

- Node.js
- Express
- Body Parser
- Cheerio
- Concurrently
- Cors
- Pg Promise
- Request Promise
- React

### WIP
- Getting Docker to properly expose port 5432 and allow our backend API to connect to the database
- Refactoring and creating helper functions in the api.js routes and modularizing that file by creating new files containing these methods
- Moving constants and configuration files out in order to not expose these sorts of data on Github, etc.