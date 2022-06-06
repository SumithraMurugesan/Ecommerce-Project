const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbconnection =require('./nano');
const app = express();
const port = 8000;


 app.use(cors({
  origin:'http://localhost:4200'
}));
app.use(bodyParser.json());






app.post('/postdata2',function (req, res) {
  var userObject= {
    userName:req.body.userName,
    email:req.body.email,
    password:req.body.password,
    type:'user'
  }
  console.log("data from angular",userObject);
  dbconnection.testdb.insert(userObject).then((data)=>{
    console.log("data inserted successfully ",data);
  })
});
app.post("/postdata4", function (req, res) {
  var adminObject = {
    userid: req.body.userid,
    password: req.body.password,
    type:"admin"
  };
  const fetchData ={
    "selector" :{
      userid :adminObject.userid,
      password :adminObject.password,
    }
  }
  console.log(fetchData)
  dbconnection.testdb.find(fetchData).then((data) => {
    console.log("datas", data);
   res.send(data);
  });
});
app.get('/getdata/:id', (req, res) => {
  console.log('email:', req.params.id);
  console.log('password:', req.params.id);
  var object = {
    selector: {
      email: req.params.id,
      type:'user'
    },
  };

  dbconnection.testdb
    .find(object)
    .then((data) => {
      console.log('data fetch from db', data);
      res.send(data);
    })
    .catch((err) => {
      console.log('error', err);
    });
});




app.listen(port, (err) => {
  if (err) {
   return console.log('something bad happened', err);
  }
 
  console.log(`server is listening on http://localhost:${port}`)
 });
