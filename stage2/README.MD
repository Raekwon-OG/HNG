# CRUD API GUIDE

This REST API server uses the modern Ecmascript module (ES Modules) syntax and allows you to perform CRUD (Create, Read, Update, Delete) operations on a person record in a database. This README provides instructions on setting up, running, and using this API.

## Getting Started
### Prerequisites
Make sure the following are installed:
* Node v16.13.2+
* NPM 8.1.2+
* NPM Package Dependencies:
    * cors: ^2.8.5
    * dotenv: ^16.3.1
    * express: ^4.18.2
    * mongodb: 4.1
* VS Code (Download here https://code.visualstudio.com/download )
* Postman (Download here https://www.postman.com/downloads/)

### Installation
Note: The database is hosted using MonogDB Atlas. You may test this API [here](https://demisbackend.onrender.com/api "Title")  using postman or insomnia to avoid setting up a new cloud database. If you must run this project locally, you can set up your own Atlas DB (Guide: https://www.youtube.com/watch?v=084rmLU1UgA). 
After setting up your account and DB through the youtube guide. Create a .env file in the project home folder on your local machine @ <</path/to/cloned/repository/track-backend>>, then, you can pass your atlas db user credentials through environment variables referenced in the <</path/to/cloned/repository/track-backend/stage2/db/conn.mjs>> file.
1. Open VS Code and launch its integrated terminal
2. Clone this [repository](https://github.com/Raekwon-OG/track-backend.git "Title") by performing a git clone (Paste the command below into the terminal)<br>
~~~
git clone https://github.com/Raekwon-OG/track-backend.git
~~~
3. Navigate to the project folder :
    cd <</path/to/cloned/repository/track-backend/>>
4. Start the server: <br>
    On windows: ~~~ node .\stage2\index.mjs ~~~<br>
    On mac/linux: ~~~ node ./stage2/index.mjs ~~~

## Using the API 
### Create a Person
Method: PUT 

Endpoint: localhost:5050/api 

Description: Create a new person with the name specified in the request body.

Request Body: 
    Object: JSON object containing person details<br> 
    Type: id (number), name (string)<br>
    Format: {"id": <value>, "name": "<value>"}

### Get a Person
Method: GET 

Endpoint: localhost:5050/api

Description: Get a person with the specified name or id, or using both parameters.

Request Body: 
    Object: JSON object containing person details<br>
    Type: id (number), name (string) <br>
    Format: {"id": <value>} or {"name": "<value>"} or {"id": <value>, "name": "<value>"}

### Update a Person
Method: PUT (Replaces the person record. i.e name and id. A new User ID is generated for you)<br>
Method: PATCH (Updates the person name)

Endpoint: localhost:5050/api/:user_id

Description: Updates a person with the specified id

Request Body: 
    Object: JSON object containing person name<br>
    Type: name (string)  <br>
    Format: {"name": "<value>"}
### Delete a Person
Method: DELETE

Endpoint: localhost:5050/api/:user_id 

Description: Deletes a person record with the specified id



Find details on testing the endpoints in DOCUMENTATION.md