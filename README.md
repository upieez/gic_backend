# Setup

We are using Node.JS and Express to run our web server. 

Please ensure the following:

## Prerequisite (Development)

1. Please have Node v20.x and above installed
3. `npm install`
4. `npm run start`
5. Visit `http://localhost:3000/` in your browser
6. Seed data is provided in `cafe.seed.sql`. To run it, first connect to it using the CLI by running `sqlite3 cafe`
7. Next, run `.read cafe.seed.sql`
8. Verify by running `SELECT * FROM cafe` & `SELECT * FROM employee` and checking to see if the data exist

## Afterword

I've chosen to focus more on the frontend, so the backend is really barebones. I've chosen SQLite as it's the simplest to get up and running. I know that this isn't the best solution since I've committed the DB to this repository as well and any commits will overwrite any existing data when I deploy it again. If I could improve this, I would look into having a proper DB setup and Dockerize it. I would also look into using TypeScript or a framework like NestJS.