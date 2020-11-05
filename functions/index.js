const functions = require("firebase-functions");
const app = require("express")();
const { loginUser } = require("./API/users");

app.post("/login", loginUser);

exports.api = functions.https.onRequest(app);
