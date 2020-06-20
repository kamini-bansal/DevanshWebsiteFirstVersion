const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin:Test1234@devansh-pdlfn.mongodb.net/devbDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const contactsSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact_no: String,
  message: String
});

const Contact = mongoose.model("Contact", contactsSchema);



app.get("*", function(req, res) {
  res.sendFile(__dirname + "/profile.html");
});


app.post("/", function(req, res) {

  console.log("post req recieved");
  console.log(req.body.name);
  console.log(req.body.email);
  console.log(req.body.contact);
  console.log(req.body.message);

  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    contact_no: req.body.contact,
    message: req.body.message
  });

  contact.save();
  res.sendFile(__dirname + "/profile.html");

});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("server is running successfully");
});
