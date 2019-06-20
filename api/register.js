const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const {promisify} = require('util');
const mongo = require('mongodb').MongoClient

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const CONFLICT = 409;
const SERVER_ERROR = 500;

const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'alumni';
const ALUMNI_TABLES = 'people';

async function serve(port, base, images) {
  await initialize();
  const app = express();
  app.locals.port = port;
  app.locals.base = base;
  app.locals.images = images;
  setupRoutes(app);
  app.listen(port, function() {
    console.log(`listening on port ${port}`);
  });

}

async function initialize(){
  this.client = await mongo.connect(MONGO_URL, { useNewUrlParser: true });
  this.db = client.db(DB_NAME);
  this.client = client;
}

module.exports = {
  serve: serve
}

/** Prefix for user services */
const USERS = 'users'; 

/** Set up routes based on USERS for all URLs to be handled
 *  by this server with all necessary middleware and handlers.
 */
function setupRoutes(app) {
  const base = app.locals.base;
  app.get(`/`, getDefault(app));
  app.get(`${base}/${USERS}/list`, listUsers(app));
  app.post(`${base}/${USERS}/register`, bodyParser.urlencoded({ extended: false }), registerUser(app));
  app.delete(`${base}/${USERS}/removeusers`, bodyParser.urlencoded({extended: false}), deleteUser(app));
}

function getDefault(){
  return async function(req, res){
    res.status(OK).send("Hey there! Make a request using a valid api");
  }
}

function listUsers(){
  return async function(req, res){
    let stat;
    let result = [];
    const dbTable = this.db.collection(ALUMNI_TABLES);
    try{
      result = await dbTable.find().toArray();
      stat = OK;
    }
    catch(err){
      stat = SERVER_ERROR;
    }
    res.status(stat).send(result);
  }
}

function registerUser(){
  return async function(req, res){
    const dbTable = this.db.collection(ALUMNI_TABLES);
    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const regex = /\s/;

    //check for valid username
    if(username.length == 0 || regex.test(username)){
      res.status(BAD_REQUEST).send();
      return;
    }

    const obj = {username: username, password: password, firstname: firstname, lastname: lastname};
    let stat;
    let exist = {};
    exist  = await dbTable.findOne({username: username});
    console.log(exist);
    if(exist)
      stat = 409;
    else{
      try{
        const ret = await dbTable.insertOne(obj);
        stat = 201;
      }
      catch (err){
        stat = 500;
        throw err;
      }
    }
    res.status(stat).send();
  }
}

function deleteUser(){
  return async function(req, res){
    //console.log(req.body);
    const dbTable = this.db.collection(ALUMNI_TABLES);
    const username = req.body.username;
    const obj = {username: username};
    try{
      const ret = await dbTable.deleteOne(obj);
      const count = ret.deletedCount;
      res.status(202).send({deleted: count});
    }
    catch(err){
      res.status(500).send();
    }
  }
}

//Object mapping domain error codes to HTTP status codes.
const ERROR_MAP = {
  EXISTS: CONFLICT,
  NOT_FOUND: NOT_FOUND,
  READ_ERROR: SERVER_ERROR,
  WRITE_ERROR: SERVER_ERROR,
  UNLINK_ERROR: SERVER_ERROR
}

/** Map domain/internal errors into suitable HTTP errors.  Return'd
 *  object will have a "status" property corresponding to HTTP status
 *  code.
 */
function mapError(err) {
  console.error(err);
  return err.isDomain
    ? { status: (ERROR_MAP[err.errorCode] || BAD_REQUEST),
      code: err.errorCode,
      message: err.message
    }
    : { status: SERVER_ERROR,
      code: 'INTERNAL',
      message: err.toString()
    };
} 
