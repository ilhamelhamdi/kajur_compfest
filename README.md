# SEA Canteen Web App
## Introduction
Hello fellas developers, this project is dedicated to fulfill a prerequisite task from Software Engine Academy of Compfest 2022. The task is to make basic web app system for "Kantin Kejujuran", which is basically a simple corner store/canteen in a virtual school that expects its students to make transaction in that store honestly. 

## Description
In order to make such system, this project is designed to be build in full stack web technologies, i.e. MERN stack (MongoDB, Express JS, React JS, and Node JS). At the client (front end) side, React JS is chosen as a main technology to build this project as its flexibility and versatility among other technology. At the server (back end_ side, Node JS is the main techology used along with Express JS as its framework to development process more efficient. MongoDB is chosen as a main tech to address data storing in this project as it is open source.

The web system is basically simple. When user request to the server at root path url, the server send client side app to the user. So, everything related to views matter that user request will be handled by client app. When the client need some data to be displayed, it will request to our API server. For more detailed information about API endpoints, check the API Endpoint section.

## Installation
In this project, we mainly use NPM as our package manager, which is already installed if we install Node JS. So, this is the way how we can install this project on localhost for development.

1. Clone this project
2. Install dependencies for server app. In a terminal, run ```npm install && npm install -D```
3. Go to client app folder and install its dependencies. Run ```cd client && npm install && npm install -D```
4. Open *config.js* in **/client/src** folder. Change the value of **API_URL** variable to 'http://localhost:9000/api'
5. Back to root folder project. Run ```cd ..```
6. Run server app. Run ```npm run start-server-dev```
7. Run client app on the other terminal. Run ```npm run start-client-dev```

That's it!!!
