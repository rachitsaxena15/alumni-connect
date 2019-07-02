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
const EVENT_TABLES = 'events';
const ALUMNI_TABLE = 'people';

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
  app: express()
}

/** Prefix for event services */
const EVENT = 'event';

/** Set up routes based on USERS for all URLs to be handled
 *  by this server with all necessary middleware and handlers.
 */
function setupRoutes(app) {
  const base = app.locals.base;
  //app.get(`/`, getDefault(app));
  app.get(`${base}/${EVENT}/list`, listEvents(app));
  app.post(`${base}/${EVENT}/register`, bodyParser.urlencoded({ extended: false }), register(app));
  app.delete(`${base}/${EVENT}/remove`, bodyParser.urlencoded({ extended: false }), deleteEvent(app));
}

function listEvents(app){
  return async function(req, res){
    console.log("List events..");
    const dbTable = this.db.collection(EVENT_TABLES);
    result = await dbTable.find().toArray();
    result = result.slice(1,result.length);
    res.status(OK).send(result); 
  }
}

function register(app){
  return async function(req, res){
    const dbTable = this.db.collection(EVENT_TABLES);


    
    const event_id = await getNextSequenceValue("eventid");
    const username = req.body.username;
    const event_type = req.body.eventtype;
    const description = req.body.description;
    const date_posted = (new Date(req.body.dateposted)).toISOString();
    const date_from = (new Date(req.body.datefrom)).toISOString();
    const date_to = (new Date(req.body.dateto)).toISOString();
    const locations = req.body.locations;
    const no_of_openings = req.body.no_of_openings;
    const links = req.body.links;
    const organizer_email = req.body.organizeremail;
    const event_status = req.body.eventstatus;

    const obj = {event_id, username, event_type, description, 
      date_posted, date_from, date_to, locations,
      no_of_openings, links, organizer_email, 
      event_status};

    const regex = /\s/;

    try{
      const ret = dbTable.insertOne(obj);
      console.log("Event added..");
      res.status(CREATED).send(obj);
      return;
    }
    catch(err){
      console.log("Event add failed..", err);
      res.status(SERVER_ERROR).send();
      return;
    }
    res.status(OK).send({"id": event_id});
  }
}

function deleteEvent(){
  return async function(req, res){
    const dbTable = this.db.collection(EVENT_TABLES);
    const event_id = req.body.event_id;
    const obj = {event_id: Number(event_id)};
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


//Functionality for autoincrement event ids in database
async function getNextSequenceValue(sequenceName){
  const dbTable = this.db.collection(EVENT_TABLES);
  try{
    var sequenceDocument = await dbTable.findOneAndUpdate(
      {"_id": sequenceName },
      {$inc: {"sequence_value": 1}}
    );
    return sequenceDocument.value.sequence_value;
  }
  catch(err){
    return -1;
  }
}

