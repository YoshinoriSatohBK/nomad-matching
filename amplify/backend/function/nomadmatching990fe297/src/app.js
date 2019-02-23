const AWS = require("aws-sdk");
const ssm = new AWS.SSM({ region: process.env.AWS_REGION });

const nodemailer = require("nodemailer");

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

async function getSsmParameter(name, withDecryption = false) {
  const ret = await ssm
    .getParameter({ Name: name, WithDecryption: withDecryption })
    .promise();
  return ret.Parameter.Value;
}

async function getMailHost() {
  return getSsmParameter(`/NomadMatching/${process.env.ENV}/Mail/Host`, true);
}

async function getMailPort() {
  return getSsmParameter(`/NomadMatching/${process.env.ENV}/Mail/Port`);
}

async function getMailUser() {
  return getSsmParameter(
    `/NomadMatching/${process.env.ENV}/Mail/Auth/User`,
    true
  );
}

async function getMailPass() {
  return getSsmParameter(
    `/NomadMatching/${process.env.ENV}/Mail/Auth/Pass`,
    true
  );
}

async function getMailFromAddress() {
  return getSsmParameter(
    `/NomadMatching/${process.env.ENV}/Mail/FromAddress`,
    true
  );
}

async function createTransport() {
  const host = await getMailHost();
  const port = await getMailPort();
  const user = await getMailUser();
  const pass = await getMailPass();
  return nodemailer.createTransport({
    host: host,
    port: port,
    secure: true,
    auth: {
      user: user,
      pass: pass
    }
  });
}

app.post("/auth/message", async (req, res) => {
  try {
    const from = await getMailFromAddress();
    const transporter = await createTransport();
    const info = await transporter.sendMail({
      from: from,
      to: req.body.toEmail,
      subject: req.body.subject,
      text: req.body.text
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.json({});
  } catch (err) {
    console.error(err);
    res.json({ error: "Send message error", url: req.url });
  }
});

app.listen(3000, function() {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
