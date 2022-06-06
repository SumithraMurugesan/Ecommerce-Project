const nano = require('nano');
const url = "https://apikey-v2-2djdlrrbf736ap4aa6rlre2x1j1wf65v1ti1e8x2bihn:3bc2893c0a2a1ec42d9b17840b18447b@75b0afe3-3fa7-477b-8352-bdcfcd522a16-bluemix.cloudant.com/";   
const nanodb = nano(process.env.COUCHDB_URL || url);// connect with couchdb
const testdb = nanodb.use('testdb'); // connect to database
module.exports={testdb,nano};



