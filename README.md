# SEA Canteen Web App
For production environment, this project has been deployed at https://canteen-elhamdi.herokuapp.com/. You can check and see it!

## Introduction
Hello fellas developers, this project is dedicated to fulfill a prerequisite task from Software Engine Academy of Compfest 2022. The task is to make basic web app system for "Kantin Kejujuran", which is basically a simple corner store/canteen in a virtual school that expects its students to make transaction in that store honestly. 

## Description
In order to make such system, this project is designed to be build in full stack web technologies, i.e. MERN stack (MongoDB, Express JS, React JS, and Node JS). At the client (front end) side, React JS is chosen as a main technology to build this project because of its flexibility and versatility among the others. At the server (back end) side, Node JS is used as a main techology along with Express JS as its framework for more efficient development process. MongoDB is chosen as a main tech to address data storing in this project as it is open source.

The web system is simple. Basically, when user request to the server at root path url, the server send client side app to the user. So, everything related to views matter that user request will be handled by client app. When the client need some data to be displayed, it will request to our API server. For more detailed information about API endpoints, check the [API Endpoints](#api-endpoints) section.

## Installation
In this project, we mainly use NPM as our package manager, which is already installed if we have installed Node JS. So, these are two ways you can install this project on localhost for development.

You can run server app in development mode, while the client app is built
1. Clone this project
2. Install dependencies for server app. In a terminal, run ```npm install && npm install -D```
3. Build client app. Run ```npm run build```
4. Back to root folder project. Run ```cd ..```
5. Run server app. Run ```npm run start-server-dev```
6. Open 'http://localhost:9000' in browser

If you want to run both app (server & client) in development mode. You can follow this.
1. Clone this project
2. Install dependencies for server app. In a terminal, run ```npm install && npm install -D```
3. Go to client app folder and install its dependencies. Run ```cd client && npm install && npm install -D```
4. Open *config.js* in **/client/src** folder. Change the value of **API_URL** variable to 'http://localhost:9000/api'
5. Back to root folder project. Run ```cd ..```
6. Run server app. Run ```npm run start-server-dev```
7. Run client app on the other terminal. Run ```npm run start-client-dev```
8. Open 'http://localhost:3000' in browser

That's it!!!

## API Endpoints
This project uses ```{hostname}/api``` for API root path. The following is our API endpoints along with its methods, requests, and response.

### ```/api/login```
1. **POST**
    
    For authenticating user (login)
    
    - Request :
        
        Body (Raw JSON)
        
        ```
        {
            "userId": (int),
            "password": (string)
        }
        ```
            
    - Example response :
        ```
        {
            "status": "success",
            "message": "Login successful",
            "body": {
                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMwNiIsImlhdCI6MTY1NzQ4MDgxM30.nuJI7DmEowAw7_VacXvDhKz8FFWwPUV1tEL3Fobhdhc",
                "user": {
                    "userId": "12306",
                    "name": "Ilham Abdillah"
                }
            }
        }
        ```
        
### ```/api/register```
1. **POST**
    
    For user registration
    
    - Request :
        
        Body (Raw JSON)
        
        ```
        {
            "userId": (string),
            "name": (string),
            "password": (string)
        }
        ```
            
    - Example response :
        ```
        {
            "status": "success",
            "message": "User was successfully registered."
        }
        ```


### ```/api/items```

1. **GET**
  
    For getting all items/products.
    
    - Example response : 
        ```
        {
          "status": "success"/"fail",
          "message": (string),
          "body": {
            "items": {
              "_id": (string),
              "name": (string),
              "img": {
                      "url": (url),
                      "delete_url": (url)
              },
              "price": (int),
              "createdAt": (date),
              "updatedAt": (date)
          }
        }
        ```

2. **POST**

    For adding new item/product. 

    - Request : 

        Header
        ```
        {
          'Authorization': 'JWT <accessToken>'
        }
        ```

        Body (Raw JSON)
        ```
        {
          'name': (string),
          'img': {
            'url': (url),
            'delete_url': (url)
          },
          'desc': (array),
          'price': (int)
        }
        ```

    - Example response :
        ```
        {
            "status": "success",
            "message": "Item was successfully added.",
            "body": {
                "_id": "62cb20539079167acba74fb5"
            }
        }
        ```


### ```/api/items/:id```
1. **GET**
  
    For getting a specified item/product by its id.

    - Example response :
        ```
        {
            "status": "success",
            "message": "Item was successfully fetched.",
            "body": {
                "_id": "62c9b106c12b11eef67859db",
                "name": "Cimory Yogurt Drink Low Fat Strawberry & Mango 250 ml",
                "img": {
                    "url": "https://i.imgur.com/LZqLseW.png",
                    "delete_url": "https://api.imgur.com/3/image/CnMjSw968dEGGCT"
                },
                "desc": [
                    "This is first line.",
                    "This is second line."
                ],
                "price": 8000,
                "createdAt": "2022-07-09T16:47:01.679Z",
                "updatedAt": "2022-07-09T16:47:01.679Z"
            }
        }
        ```

2. **PUT**

    For updating a specified item/product data by its id. 

    - Request : 

        Header
        ```
        {
          'Authorization': 'JWT <accessToken>'
        }
        ```

        Body (Raw JSON)
        ```
        {
          'name': (string),
          'img': {
            'url': (url),
            'delete_url': (url)
          },
          'desc': (array),
          'price': (int)
        }
        ```

    - Example response:
        ```
        {
            "status": "success",
            "message": "1 document(s) matched the filter, updated 1 document(s)"
        }
        ```

3. **DELETE**

    For deleting a specified item/product data by its id. 

    - Request : 

        Header
        ```
        {
          'Authorization': 'JWT <accessToken>'
        }
        ```

    - Example response:
        ```
        {
            "status": "success",
            "message": "Total 1 item was successfully deleted."
        }
        ```
        
### ```/api/balance```
1. **GET**
    
    For getting store's current balance
    
    - Request :
        
        Header
        ```
        {
          'Authorization': 'JWT <accessToken>'
        }
        ```
            
    - Example response :
        ```
        {
            "status": "success",
            "message": "Balance was successfully fetched.",
            "updatedAt": "2022-07-10T18:01:14.312Z",
            "balance": 0
        }
        ```
        
2. **PUT**
    
    For making transaction with store's balance (add/withdraw)
    
    - Request :
        
        Header
        ```
        {
          'Authorization': 'JWT <accessToken>'
        }
        ```
        
        Body (Raw JSON)
        ```
        {
            "action": "withdraw" / "add",
            "amount": (int)
        }
        ```
            
    - Example response :
        ```
        {
            "status": "success",
            "message": "Action (add) was success."
        }
        ```
