#!/usr/bin/env nodejs

'use strict';

const assert = require('assert');
const path = require('path');
const process = require('process');

const register = require('./register');
const events = require('./events');

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
    app.locals.port = port;
    register.serve(app, BASE);
    events.serve(app, BASE);
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
