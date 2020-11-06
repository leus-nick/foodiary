const functions = require("firebase-functions");
const {
  loginUser,
  signUpUser,
  getUserDetail,
  updateUserDetails,
} = require("./API/users");
const auth = require("./util/auth");
const app = require("express")();

app.post("/login", loginUser);
app.post("/signup", signUpUser);
app.get("/user", auth, getUserDetail);
app.post("/user", auth, updateUserDetails);

exports.api = functions.region("europe-west2").https.onRequest(app);
