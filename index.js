// import express
const express = require("express");

const app = express();

//Parse URL-encoded bodies - Allows us to retrieve data from submitted data
app.use(express.urlencoded({ extended: true }));

// import cors
var cors = require("cors");
app.use(cors());
app.use(express.json()); //this adds application/json to the headers

// import the harperdb instance
const db = require("./dbconfig");

const port = 8080; //This port will be used when it is not busy, if it is busy, you can set another port

// root endpoint response
app.get("/", (req, res) => {
    res.send("Hello, World!");
  });

// Creating endpoint with Express Js, the endpoint is a function which will be run when a request is made.
// In the endpoint, the methods like delete, patch, get and others will be defined
// 1. create your post route that handles creating new title item

app.post("/add", async (req, res) => {  //Post method, with two parameters; request: what is sent to the backend, response: what is sent to the frontend
    // 2. retrieve the title from req.body
    // 3. Validate the title to nsure the user does not submit an empty form
    if (!req.body.title) {
      res.status(400).send("title is required");
    } else {
      // 4. prepare the title in an object
      const option = {
        title: req.body.title,
        isCompleted: false
      };
      // 5. ensure to catch the error using try/catch
      try {
        // 6. if the title is not empty
        const response = await db.insert({
          table: "items",
          records: [option],
        });
        // 7. notify the frontend or sender with the success response
        res.status(200).send(response);
      } catch (error) {
        // 7. notify the frontend or sender with the error response
        res.status(500).send(error);
      }
    }
  });

  
// 1. route to retrieve all todos in the database
app.get("/todos", async (req, res) => {
    // 2. use try/catch to control errors
    try {
      // 3. user query method to get all title from the database table
      const response = await db.query("SELECT * FROM todos.items");
      // 4. send success message to the frontend
      res.status(200).send(response);
    } catch (error) {
      // 4. send error message to the frontend
      res.status(500).send("something went wrong");
    }
  });


// Route to retrieve todos by ID from the database
app.get("/todos/:id", async (req, res) => {
  // 2. use try/catch to control errors
  try {
    // 3. user searchByHash method to get the matching id item 
    const response = await db.searchByHash({
      table: "items",
      hashValues: [req.params.id],
      attributes: ['id', 'title', 'isCompleted']
    });
    // 4. send success message to the frontend
    res.status(200).send(response.data);
  } catch (error) {
    // 4. send error message to the frontend
    res.status(500).send("something went wrong");
  }
});
  

// 1. route to update a title
app.post("/edit", async (req, res) => {
    // 2. set the updated title and specify the title identifier - hash attribute
    const option = {
      id: req.body.id,
      title: req.body.title,
      status: req.body.status,
    };
    // 3. use try/catch to control errors
    try {
      // 4. send the updated title
      const response = await db.update({
        table: "items",
        records: [option],
      });
      // 5. send success message to the frontend
      res.status(200).send(response);
    } catch (error) {
      // 5. send error message to the frontend
      res.status(500).send(error);
    }
  });

  
  // 1. route to delete a title using its id
app.post("/delete/:todo_id", async (req, res) => {
    // 2. get the id from the url parameter
    const { todo_id } = req.params;
    // 3. use try/catch to control errors
    try {
      // 4. Send a delete request to the database
      const response = await db.delete({
        table: "items",
        hashValues: [todo_id],
      });
      // 5. send success message to the frontend
      res.status(200).send(response);
    } catch (error) {
      // 5. send error message to the frontend
      res.status(500).send(error);
    }
  });
  

  
  // just a notification in the console
  app.listen(port, () => {
    console.log(`Your server ⚡ is running 🏃‍♂️ on http://localhost:${port}`);
  });
  

