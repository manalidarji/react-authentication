# react-authentication
React Authentication


Pre-requistite
-React(Components, Hooks, Routing)
-Node.js(with Express)
-MongoDB
-Full Stack Development Basics

2 Main Goals
-Understand and apply authentication fundamentals with full-stack React
-Develop a full-stack authetication template

learning structure from this project
1 user authentication basics
technique of verifying that our application's users are who they are

2 project set up

3 add user authentication to full-stack MERN app
--signing up
--logging in and out
--creating private routes
--using JSON Web Tokens(JWTs)

4 email verification flow & implementtaion
--The user creates a new account with their email & password
--The server adds this information to the DB(here it is MongoDB)
--The server also generates a secret verification hash which the user can't see
--The server sends an email link with verification hash to the provided email address(of the user), which the user can click
--If the user really owns the email, they can click this link, which sends them to a special landing page in our application
--The landing page parses the verification hash from the URL and sends it to server
--if the varification has matches, the user is marked as 'verified'

-- https://sendgrid.com/ app is used
--create free account & log in
--ceate single sender and verify that account
--create API key that will allow the backend to send emails through this sender
--click 'Email API' -> 'Integration Guide' -> 'WEB API' -> Node.js -> Create an API key('Node Server') ->


5 resetting passwords
6 OAuth integration
7 using prebuilt authentication providers
8 authetication best practices



STEPS to start the project

-mondod ->  is the primary daemon process for the MongoDB system. It handles data requests, manages data access, and performs background management operations.

-> cd to front-end folder 
-npm install   -----> installs dependencies
-npm start   -----> starts  react project



-> cd to back-end folder 
-npm install   -----> installs dependencies
-npm run dev   -----> starts node project