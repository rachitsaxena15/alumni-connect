'use strict'

const axios = require('axios');


function registerWs(baseUrl){
  this.registerUrl = `${baseUrl}`;
}

module.exports = registerWs;

registerWs.prototype.list = async function(){
  try {
    const url = this.imageUrl + `/images/`;
    const response = await axios.get(url);
    return response.data;
  }
  catch (err) {
    return err.response.data;
  }
};


