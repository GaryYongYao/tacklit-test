var fs = require('fs');

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));


module.exports = { 
  delay
}
