const jwt = require('../api/node_modules/jsonwebtoken');
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

async function serve(app, base) {
  await initialize();
  app.locals.base = base;
  setupRoutes(app);
}

async function initialize(){
  this.client = await mongo.connect(MONGO_URL, { useNewUrlParser: true });
  this.db = client.db(DB_NAME);
  this.client = client;
}

module.exports = {
  serve: serve,
}

/** Prefix for user services */
const SERVICES = 'services';

/** Set up routes based on USERS for all URLs to be handled
 *  by this server with all necessary middleware and handlers.
 */
function setupRoutes(app) {
  const base = app.locals.base;
  app.post(`${base}/${SERVICES}/login`, bodyParser.urlencoded({ extended: false }), login(app));
  /*app.post(`${base}/${SERVICES}/validate`, validate(app));
  app.post(`${base}/${SERVICES}/logout`, logout(app));*/
}

function login(){
  return async function(req, res){
    const dbTable = this.db.collection(ALUMNI_TABLES);
    const username = req.body.username;
    const password = req.body.password;
    
    const data = await dbTable.findOne({username: username});
    if(data.password !== password)
      res.status(400).send();

    else{
      const obj = generateToken();
      res.status(200).send(obj);
    }
  }
}

function generateToken(username, password, expiry ){
  const secret = 'MyFirstAptinSanJoseCa95***'
  const payload = {username: username, password: password};
  const token = jwt.sign({payload}, secret, {expiresIn: '1h'});
  return {at: token};
}
