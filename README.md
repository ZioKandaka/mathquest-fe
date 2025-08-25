# Mathquest Frontend

A web application where user, mostly student, can learn about mathematic

# Tech Stacks

- Javascript
- React
- Zustand
- Tailwind

# How to run locally

- Clone this repository to your machine
- Open terminal (bash) in root folder
- Run "npm i" on terminal
- Open "src/api/client.js" then make sure the baseURL is the URL of the backend. The default is 'http://localhost:3000'
- Run "npm run dev" on terminal
- Open "http://localhost:5173/" (or "http://localhost:<YOUR_PORT>/") in your browser

# Troubleshoot

- If request to backend is blocked by CORS, check where the client is running. Make sure that the cient domain is equal to the FRONTEND_ORIGIN in the .env file of the backend
- If port 5173 is already used, open /vite.config.js then change the value. Make sure that FRONTEND_ORIGIN in the .env file of the backend is also changed

# Answer of submission questions

* Time spent for this assesment
    I spent most of the time designing database schema, creating and testing API. This is because database is the crucial part for ensuring performance. A well designed and indexed database can smoothly handles more than ten thousand users. Here is the breakdown of how I spent my time:
    - 30% time for database design
    - 20% time for API creation
    - 20% time for testing API
    - 10% time for client interface (frontend) creation 
    - 10% time for API and database revision
    - 10% time for documentation

* What I did not build
    - Attractive animation and micro-interaction in frontend, when transitioning or navigating pages. Although animation is engaging, it is improvable after shipping the product
    - Two of the most needed pages: review lesson (explaination page for problems) and submission record page
    - Login and registration. This is standard practice is web app, but not needed for this assesment. For testing purposes, I create a feature to select which user to use
    - Caching. This is a standard practice to improve performance and reducing load, but not yet required for small application
    - Unit testing (automated). I usually build automated testing for long term application development convenience, but had no time in this assesment
    - Full code modularity. While most code are written modular with clear folder and path. Some of the code is improvable for maintainability

* What I prioritized
    - Core features: lesson submission with idempotency, xp calculation, streaks calculation, mandatory APIs, and mandatory interface
    - Database scalability and maintainability
    - API security and validation
    - Ease of running this application

* How would you keep teens motivated?
    There are two main things that I would focus to increase user motivation. Convenience during lesson and clear lesson review. User will stay motivated if the feel comfortable doing lesson. Lesson is where their most time is spent. Post-lesson reveal is only few seconds and their main focus is usually the score, not XP or streaks. After seeing their score, most user want to see explanation of the problem they get wrong. In this case, we rely more on the teacher that design the problem, answer, and explanation, rather than on the application developer. If the explanation is clear and student understand the lesson, they will be motivated to keep learning

* Product (Fokuslah) review
    - The theme of of this app is great
    - It is mobile friendly
    - Easy to register and login
    - There is a bug in lesson page where I restart the page and the timer also restart
    - Lesson should be navigable. User should be able to jump from problem 1 to problem 5, or reverse

* How you'd handle 1000+ students using this simultaneously
    I would do load testing on crucial API and evaluate query performance. Add caching for data that is often retrieved and index database based on queries. If this is not enough, then we might need to increase database specification (add more ram, upgrade CPU, etc)