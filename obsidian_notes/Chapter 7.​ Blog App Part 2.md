==7_Blog App Part 2==

"In the previous chapter, we began to define the frontend of our application. We created the component to perform the login, and we defined the services that will be communicating with the API. In this chapter, we will focus on the backend, using NodeJS, Express, and MongoDB for it. We’ll build our home component, which will be the central screen of our application. In addition, we’ll establish the mechanisms to persist the user’s session." -Victor Hugo Garcia

---
*Start date: 13.3.2025*

NodeJS
Express
MongoDB
Mongoose

Starting the Project on the Server

Problems:
Trying to use login username password as declared in mongodb, we are hit with a 404 error. After going through proxy, angular.json, and index.js thoroughly, the issue was that as the POST request was made, the mongodb hit error, further checking the tutorials code was off and a change in mongoose library was made and it no longer accepts a method described in the tutorial.
Solution: per Copilot:

---

Ah, that error is caused by a change in the Mongoose library. The method `mongoose.connect()` no longer accepts a callback function. This means that the code in your `index.js` attempting to connect to MongoDB like this:

javascript

```
mongoose.connect(url, { }, function(err) {
    if (err) throw err;
    ...
});
```

needs to be updated to use **promises** or **async/await** for better handling of asynchronous operations.

### Updated Code

Here’s how you can fix it:

1. **Move the MongoDB Connection to an** `async` **Function** Establish the MongoDB connection during the server startup instead of inside the route.
    
    javascript
    
    ```
    const express = require('express');
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');
    const User = require('./models/user');
    
    const app = express();
    const url = 'mongodb://localhost/blog';
    
    mongoose.set('strictQuery', true);
    
    async function connectToDB() {
        try {
            await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log('Connected to MongoDB');
        } catch (err) {
            console.error('Database connection error:', err);
            process.exit(1); // Exit the app if the database connection fails
        }
    }
    
    connectToDB(); // Call the async function to connect
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    
    app.post('/api/user/login', async (req, res) => {
        try {
            const user = await User.find({
                username: req.body.username,
                password: req.body.password,
            });
    
            if (user.length === 1) {
                return res.status(200).json({ status: 'success', data: user });
            } else {
                return res.status(401).json({ status: 'fail', message: 'Login Failed' });
            }
        } catch (err) {
            console.error('Error during login:', err);
            return res.status(500).send('Internal Server Error');
        }
    });
    
    app.listen(3000, () => console.log('Listening on port 3000'));
    ```
    

### Why This Works

1. `async/await` **for Database Connection**:
    
    - The `connectToDB()` function handles the connection and ensures the app doesn't start without a successful MongoDB connection.
        
2. **Error Handling with** `try/catch`:
    
    - Errors during the login request or MongoDB query are caught and logged properly, ensuring the server doesn't crash.
        
3. **Promises over Callbacks**:
    
    - The new Mongoose API encourages the use of `async/await` or `.then()` and `.catch()` instead of callbacks, making the code cleaner and easier to maintain.
    
---
Problems:
tested backend with postman, working, frontend doesnt want to play nice with the backend.

Frontend directs to 4200, when it should direct to 3000. Somethings off, proxy is set, everythings set.

Diving into Proxy, proxy.conf.json, CORS

Problem solved after two days:
Solution:
In proxy file, being the middleware, instad of using "/api/*": ... use "/api": ... 
- or "/api/**:"

And copilot did not see this. -1 Copilot. +1 Google

Now frontend works, with the local backend

---
Reminder of done things:

Starting the Project on the Server -*done*
	-backend/frontend folders
	npm init (in backend folder)
	npm install express --save (install epress framework)
	create index.js
	node index.js (starts server)
	npm install body-parser --save ("This package will allow you to extract parameters from the requests received by the server. ")
	npm install mongoose --save ("This package will allow you to easily interact with the MongoDB database")

Creating the Database -*done*
	Start MongoDB server and connect, use MongoDB Compass
	->Settings
	Create new database
	->Insert Document -> ADD DATA
	{  "name": "Administrator",  "username": "Admin",  "password": "1234"}

	add proxy (proxy.conf.json) to src
	{   "/api/**": {       "target": "http://localhost:3000",       "secure": "false"   }}
	Modify angular.json to include the proxy file
	Why proxy? Check CORS, and CORS errors
[Angular Proxy: How to Bypass CORS Errors Using proxy.conf.json | by Navneet Singh | Medium](https://medium.com/@navneetskahlon/angular-proxy-how-to-bypass-cors-errors-using-proxy-conf-json-7ee80509d399)
[json - How to configure proxy with Angular 18 - Stack Overflow](https://stackoverflow.com/questions/78778622/how-to-configure-proxy-with-angular-18)

Per tutorial, mongoose settings probably wrong as no async operations used, but in present form its possibly a must, otherwise the server wont connect to MongoDB

---

Home Component

Using bootstrap examples (blog) as a base we create our home component, then fill the html and css files (bootstrap example ) and create our path, we also modify our onSubmit method to direct us to Home after login.

"At this point, we have fulfilled the goal of initially showing a login screen to the user and then redirecting it to the home once they have entered their username and password."

---

AuthService: Saving the User in the Session

Changing name of login service to auth.service.ts - changing appropriate depencies (imports etc.)
LocalStorage to store user.
IsAuthenticated logics, in login component, and login/logot button.
___

"In this chapter, we built our home component, which will be the central screen of our application. In addition, we established the mechanisms to persist the user’s session." -Victor Hugo Garcia

---
