const mongoose = require("mongoose");
const SignUp = require("../models/sign_up.model");
var url = require("url");
const ObjectId = mongoose.Types.ObjectId;
const appConfig = require("../../config/app.config.js");

exports.create = (req, res) => {
  // Validate the request
  if (
    !req.body.userName ||
    !req.body.email ||
    !req.body.password ||
    !req.body.confirmPassword
  ) {
    return res.status(400).send({
      message: "All fields are required!",
    });
  }

  const signUp = new SignUp({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  signUp
    .save()
    .then((data) => {
      res.send(data);
      console.log("Created user account successfully");
      return res
        .status(200)
        .send({ message: "Created user account successfully" });
    })
    .catch((err) => {
      console.log(`${err.message}`);
      res.status(500).send({
        message:
          err.message || "Some error occured while creating user account",
      });
    });
};

exports.findAllUsers = (req, res) => {
  SignUp.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "An error occurred while retrieving all Users Accounts.",
      });
    });
};

exports.findOne = (req, res) => {
  SignUp.findOne({ userName: req.params.userName })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Account not found with id " + req.params.userName,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Account not found with id " + req.params.userName,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Account with id " + req.params.userName,
      });
    });
};
