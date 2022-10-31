require("dotenv").config();
const harperive = require("harperive");

// Steps to configure the database 
// 1. Put the variables in a .env file which will be ignored and invisible to external people in the online repo
// 2. We access the env variables using the proces.env methods
// * Packages used; 1.dotenv - for accessing/exporting our env module 
// 2. harperive - to communicate to our harperDB cloud database from our node application

// const DB_CONFIG = {
//     harperHost: process.env.INSTANCE_URL,
//     username: process.env.INSTANCE_USERNAME,
//     password: process.env.INSTACE_PASSWORD,
//     schema: process.env.INSTANCE_SCHEMA, //schema is the name of our database table on harperDB..in this case, I named it todos 
// }



const DB_CONFIG = {
    harperHost: "https://cloud-todos-blessme.harperdbcloud.com",
    username: "admin",
    password: "admin",
    schema: "todos", 
}



const Client = harperive.Client; //Establish a connection between our application and the remote database using the harperive client method
const db = new Client(DB_CONFIG);

module.exports = db;  // ES5

// export default db ES6

