var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// let Message =

//   subject: String,
//   name : String,
//   message : String


let dbOne = "";

app.get('/message.ejs', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})


app.get('/message/:user', (req, res) => {
  var user = req.params.user
  Message.find({name: user},(err, messages)=> {
    res.send(messages);
  })
})


app.post('/message', async (req, res) => {
  try{
    var message = new Message(req.body);

    var savedMessage = await message.save()
      console.log('saved');
  }
  catch (error){
    res.sendStatus(500);
    return console.log('error',error);
  }
  finally{
    console.log('Message Posted')
  }

})



io.on('connection', () =>{
  console.log('a user is connected')
})


let server = http.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});