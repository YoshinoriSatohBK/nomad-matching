import AWS from "aws-sdk";
import awsExports from "../aws-exports";

const setCredentials = async (accessToken, accessTokenSecret) => {
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: awsExports.aws_cognito_identity_pool_id,
    Logins: {
      "api.twitter.com": String(`${accessToken};${accessTokenSecret}`)
    }
  });

  await AWS.config.credentials.getPromise();
  console.log(AWS.config.credentials);
};

const authenticated = async identityId => {
  return identityId;
};

export default {
  setCredentials,
  authenticated
};
