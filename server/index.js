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
  const userObject= {
    userName:req.body.userName,
    email:req.body.email,
    password:req.body.password,
    type:'user'
  }
  console.log("data from angular",userObject);
  dbconnection.testdb.insert(userObject).then((data)=>{
    console.log("register successfully ",data);
    let data1;
    if(data['id']){
      data1 ={
        message: 'Registered Successfully',
        status: "success",
        response: data
      }
    }
  res.send(data1);
  }).catch((error)=>{
  res.status(400).send({
    message: 'failed to register',
    status: "error",
    error: error
 });
  })
});

app.post("/postdata4", function (req, res) {
  const fetchData ={
    "selector" :{
      userid :req.body.userid,
      password :req.body.password,
    }
  }
  console.log(fetchData)
  dbconnection.testdb.find(fetchData).then((data) => {
    console.log("datas", data.docs[0]);
    let data1;
    if(data.docs[0]._id){
      data1 ={
        message:'login Successfully',
        status: "success",
        response: data
      }
    }
    console.log(data1)
   res.send(data1);
  }).catch((error)=>{
    res.status(400).send({
      message: 'failed to login',
      status: "error",
      error: error
   });
});
});

app.post('/getdata', (req, res) => {
  console.log('email:', req.body.email);
  console.log('password:', req.body.password);
  const object = {
    selector: {
      email: req.body.email,
      password:req.body.password,
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
