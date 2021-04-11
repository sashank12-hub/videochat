const express = require("express");
const bcrypt = require('bcryptjs')
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
const io = require("socket.io")(server);
const auth=require('./auth/auth')
////
// const User = require('./auth/user')
// const  mongoose  = require('mongoose')

//   const db_url='mongodb+srv://sashank:Ss789456123@@cluster0.ugbba.mongodb.net/auth?retryWrites=true&w=majority'

//   mongoose.connect(db_url,{useNewUrlParser:true,
//       useUnifiedTopology:true
//   })

//   const db=mongoose.connection;
//   app.use(express.json())
//   db.on('error',(error)=>console.log(error))
//   db.once('open',()=>{console.log('connected')})

/////

const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/video/peerjs", peerServer);
app.get("/", (req, rsp) => {
  rsp.redirect(`/signup`);
});
 app.get("/signup",(req, rsp) => {
   rsp.render('one')
 });
  // app.post('/signupp',auth.signup)
 
  // app.post("/login", (req, res) => {
  //   const user = User.find((user) => user.username == req.body.username);
  
  //   if (user == null) {
  //     return res.send("User does not exist please signup");
  //   }
  //   if (bcrypt.compare(req.body.password, user.password)) {
  //     res.send("LogedIn");
  //   } else {
  //     res.send("Wrong Credentials");
  //   }
  // });
 
app.get("/video", (req, rsp) => {
  rsp.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  
 
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);

    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message);
    });
  });
});

server.listen(process.env.PORT || 3030);
