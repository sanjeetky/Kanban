# Kanban
<hr/>
Project management sysytem.

A group of people working together on a project can track the progress , assign any particular task on particular time like do-today,do tomorrow etc.

this will help in better co-ordination among people working upon it.

At the end you can also check efficiency of team based upon time alloted and time taken to complete.
<hr/>

Features:

1)signup

2)login/logout

3)use of session for tracking the user

4)add project

5)update project into todo/dotoday/inprogress/done

6)deletion of project

7)check efficiency at any time of project

8)update timing of project
<hr/>

Tech Stack Used:

1)The MERN Stack

2)MongoDB - Document database - to store data as JSON

3)Express.js - Back-end web application framework running on top of Node.js

4)React - Front-end web app framework used

5)Node.js - JavaScript runtime environment

Middleware<br/>

1)Mongoose - ODM for MongoDB

<hr/>
Steps followed to setup the project<br/>

1.Setting up server and database<br/>

2.Initialise a package.json file by entering the following command in terminal, after getting into the project directory :<br/>
  npm init<br/>
  
3.Install npm packages required for backend side :<br/>
 npm i express body-parser mongoose concurrently<br/>

4.Create a file server.js to make use of the express packages<br/>

5.Modify the package.json by adding the following scripts to it :<br/>

  "start": "node server.js",<br/>
  "server": "nodemon server.js",<br/>

6.Create an account on MongoDB cloud Atlas, thereafter, creating a database on it and get your MongoURI exported from a file keys.js in a folder config<br/>

7.Modify server.js to get connected to the database, using the MongoURI and also add the following lines at the end of server.js :

const port = process.env.PORT || 5000;<br/>
app.listen(port, ()=> console.log(`Server started running on port ${port}`));<br/>

8.Type the following command to get your server running on your localhost and ensure hot-reloading, when the server-side code is modified :<br/>
npm run server<br/>

9.Make Schemas for various collections to be stored in database and export them from a folder models and the REST APIs for various routes in the folder routes. Change the server.js accordingly to make the use of these REST APIs. Ensure that the APIs are working correctly, by making requests using POSTMAN

10.Add JWT token based authentication and 'cors' module and use them in server.js.

11. Setting up the React client

a.Create a folder 'client' in the project directory. Ensure that you have create-react-app CLI installed. Enter the following commands in terminal :<br/>
cd client<br/>
create-react-app .<br/>
cd ..<br/>

b.In the package.json of the server, add the following scripts :<br/>
"client-install": "npm install --prefix client",<br/>
"client": "npm start --prefix client",<br/>
"dev": "concurrently \"npm run server\" \"npm run client\" ",<br/>

c.Remove all the additional default setup from client folder like logo, index.css, etc. Then, configure the client to make use of bootstrap and reactstrap to make the app responsive by using following commands in terminal :
cd client<br/>

d.npm i bootstrap reactstrap react-popper font-awesome bootstrap-social<br/>

e.Add the following line to index.js :<br/>

f.import 'bootstrap/dist/css/bootstrap.min.css<br/>

