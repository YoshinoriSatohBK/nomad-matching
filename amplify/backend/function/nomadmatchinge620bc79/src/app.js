const AWS = require("aws-sdk");
const ssm = new AWS.SSM({ region: process.env.AWS_REGION });

const OAuth = require("oauth").OAuth;
const Twitter = require("twitter");

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

async function getOAuthClient() {
  const consumerKey = await getSsmParameter(
    "/NomadMatching/Dev/ConsumerKey",
    true
  );
  console.log(consumerKey);
  const consumerSecret = await getSsmParameter(
    "/NomadMatching/Dev/ConsumerSecret",
    true
  );
  console.log(consumerSecret);
  const callbackURL = await getSsmParameter("/NomadMatching/Dev/CallbackUrl");

  return new OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    consumerKey,
    consumerSecret,
    "1.0",
    callbackURL,
    "HMAC-SHA1"
  );
}

async function getTwitterClient(access_token_key, access_token_secret) {
  const consumerKey = await getSsmParameter(
    "/NomadMatching/Dev/ConsumerKey",
    true
  );
  const consumerSecret = await getSsmParameter(
    "/NomadMatching/Dev/ConsumerSecret",
    true
  );

  return new Twitter({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: access_token_key,
    access_token_secret: access_token_secret
  });
}

app.post("/twitter-auth/request-token", async (req, res) => {
  try {
    const oauth = await getOAuthClient();
    console.log(oauth);
    const responseBody = await new Promise((resolve, reject) => {
      oauth.getOAuthRequestToken(
        (error, oauth_token, oauth_token_secret, results) => {
          if (error) {
            reject(error);
          } else {
            console.log(results);
            resolve({
              oauth_token: oauth_token,
              oauth_token_secret: oauth_token_secret
            });
          }
        }
      );
    });

    res.json(responseBody);
  } catch (err) {
    console.error(err);
    res.json({ error: err, url: req.url });
  }
});

app.post("/twitter-auth/access-token", async (req, res) => {
  try {
    const oauth = await getOAuthClient();
    const responseBody = await new Promise((resolve, reject) => {
      oauth.getOAuthAccessToken(
        req.body.oauth_token,
        req.body.oauth_token_secret,
        req.body.oauth_verifier,
        function(
          error,
          oauth_access_token,
          oauth_access_token_secret,
          results
        ) {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            console.log(results);
            resolve({
              access_token: oauth_access_token,
              access_token_secret: oauth_access_token_secret
            });
          }
        }
      );
    });

    res.json(responseBody);
  } catch (err) {
    console.error(err);
    res.json({ error: err, url: req.url });
  }
});

app.get("/twitter-auth/get-user", async (req, res) => {
  try {
    const client = await getTwitterClient(
      req.query.access_token_key,
      req.query.access_token_secret
    );
    const responseBody = await new Promise((resolve, reject) => {
      client.get(
        "account/verify_credentials",
        {
          include_email: true
        },
        (error, res) => {
          if (error) {
            console.error(error);
            reject(error);
          }
          resolve(res);
        }
      );
    });

    res.json(responseBody);
  } catch (err) {
    console.error(err);
    res.json({ error: err, url: req.url });
  }
});

app.listen(3000, function() {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
