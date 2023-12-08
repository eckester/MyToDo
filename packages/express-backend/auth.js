import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import toDoListServices from "./models/toDoList-services.js";

const creds = [];

export function registerUser(req, res) {
  const { username, pwd } = req.body; // from form

  if (!username || !pwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else if (creds.find((c) => c.username === username)) {
    res.status(409).send("Username already taken");
  } else {
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(pwd, salt))
      .then((hashedPassword) => {
        generateAccessToken(username).then((token) => {
          console.log("Token:", token);
          const promise = fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: username,
              password: hashedPassword
            })
          })
            .then((response) => {
              console.log("Respomse", response);
            })
            .catch((error) => {
              setMessage(`Signup Error: ${error}`);
              alert(message);
            });

          res.status(201).send({
            token: token,
            username: username
          });

          creds.push({ username, hashedPassword });
        });
      });
  }
}

function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      `${process.env.JWT_SECRET_KEY}`,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
}

function getPassword(username) {
  const promise = fetch(
    `http://localhost:8000/user/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return promise;
}

export function authenticateUser(req, res, next) {
  // alert("HERE")
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth header (the token)
  const token = authHeader && authHeader.split(" ")[1];
  console.log("authheader");
  console.log(authHeader);
  // alert(token);

  if (!token) {
    console.log("No token received");
    res.status(401).end();
  } else {
    jwt.verify(
      token,
      `${process.env.JWT_SECRET_KEY}`,
      (error, decoded) => {
        if (decoded) {
          next();
        } else {
          console.log("JWT error:", error);
          res.status(401).end();
        }
      }
    );
  }
}

export async function loginUser(req, res) {
  const { username, pwd } = req.body; // from form
  console.log("FIODAJL:F");
  // alert(username);
  // alert(pwd);
  // res.status(401).send(`http://localhost:8000/user/${username}`);
  const result = await toDoListServices.getuserName(username);
  if (result === []) {
    res.status(400).send("unavailable");
  } else {
    if (result.length !== 0) {
      bcrypt
          .compare(pwd, result[0].password)
          .then((matched) => {
            if (matched) {
              generateAccessToken(username).then((token) => {
                res
                    .status(200)
                    .send({token: token, username: username});
              });
            } else {
              // invalid password
              res.status(401).send("Unauthorized - doesnt match");
            }
          })
          .catch(() => {
            res.status(401).send("Unauthorized");
          });
      // res.status(200).send(result[0].password);
    } else {
      res.status(400).send("No user with that name!");
    }
  }
}
