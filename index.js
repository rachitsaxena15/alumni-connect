#!/usr/bin/env nodejs

'use strict';

const assert = require('assert');
const path = require('path');
const process = require('process');
const bodyParser = require("body-parser");

const register = require('./routes/register');
const events = require('./routes/events');
const login = require('./routes/login');
const express = require('express');
const mongo = require('mongodb').MongoClient


function usage() {
  console.error(`usage: ${process.argv[1]} PORT...`);
  process.exit(1);
}

function getPort(portArg) {
  let port = Number(portArg);
  if (!port) usage();
  return port;
}

const BASE = '/api';

async function serve(port){

}

async function go(args) {
  try {
    const port = getPort(args[0]);
    const app = express();
    app.use(express.json());
    app.locals.port = port;
    register.serve(app, BASE);
    events.serve(app, BASE);
    login.serve(app, BASE);
    if(process.env.NODE_ENV === "production"){
      app.use(express.static("/client/alumni-connect/build"));
      app.get("*", (req,res) => {
        return res.sendFile(path.resolve(__dirname, "client", "alumni-meet", "public", "index.html"));
      });
    }
    app.listen(port, function() {
      console.log(`listening on port ${port}`);
    })
  }
  catch (err) {
    console.error(err);
  }
}
    

if (process.argv.length < 2) usage();
go(process.argv.slice(2));
