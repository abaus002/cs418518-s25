import { Router } from "express";
import connection from "../database/database.js";
import { ComparePassword, HashedPassword } from "../utils/helper.js";
import { sendEmail } from "../utils/mailer.js";
const user = Router();

//CRUD

user.get("/", (req, res) => {
  // res.send("Hello World!");
  // res.json({'message':'User get API Response!'})

  connection.execute("select * from user_information", function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        status: 200,
        message: "User fetced successfully",
        data: result,
      });
    }
  });
});

//get user by id
user.get("/:id", (req, res) => {
  // res.send("Hello World!");
  res.json({ message: "Get user by ID API Response!" + req.params.id });
});

//user post api

//get user by id
user.post("/", (req, res) => {

  const hashedPassword = HashedPassword(req.body.Password);

  connection.execute(
    "insert into user_information (u_first_name,u_last_name,u_email,u_password,is_admin) values (?,?,?,?,?)",
    [
      req.body.FirstName,
      req.body.LastName,
      req.body.Email,
      hashedPassword,//req.body.Password,
      req.body.IsAdmin,
    ],
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json({
          status: 200,
          message: "User created successfully",
          data: result,
        });
      }
    }
  );
});
// });

user.put("/:id", (req, res) => {
  connection.execute(
    "update user_information set u_first_name=?, u_last_name=? where u_id=?", [
    req.body.FirstName, req.body.LastName, req.params.id
  ],
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json({
          status: 200,
          message: "User updated successfully",
          data: result,
        });
      }
    }
  );
});



user.delete("/:id", (req, res) => {
  connection.execute(
    "delete from user_information where u_id=?", [
    req.params.id
  ],
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json({
          status: 200,
          message: "User deleted successfully",
          data: result,
        });
      }
    }
  );
});



user.post("/login", (req, res) => {
  connection.execute(
    "select * from user_information where u_email=?",// and u_password=?",
    [
      req.body.Email,
      // req.body.Password,
    ],
    function (err, result) {
      if (err) {
        console.log("Error");
        res.send(err);
      } else {
        if (result.length == 1) {
          // console.log("Result");
          const hashedPassword = result[0].u_password;

          if (ComparePassword(req.body.Password, hashedPassword)) {

            sendEmail(req.body.Email,"Login OTP Verification","Your OTP is 1234");

            res.json({
              status: 200,
              message: "User loggedIn successfully!",
              data: result,
            });
          }
          else {
            res.json({
              status: 403,
              message: "Password is not correct",
            });
          }
        }
      }
    }
  );
});

export default user;
