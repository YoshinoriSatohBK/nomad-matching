<template lang="pug">
  div
    div waiting...

</template>

<script>
import AWS from "aws-sdk";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";

async function getTwitterUser(accessToken, accessTokenSecret) {
  const twitterUser = await API.get("api9ca178e8", "/twitter-auth/get-user", {
    queryStringParameters: {
      access_token_key: accessToken,
      access_token_secret: accessTokenSecret
    }
  });
  console.log(twitterUser);
  return twitterUser;
}

async function getIdentityId(accessToken, accessTokenSecret) {
  const cognitoidentity = new AWS.CognitoIdentity();
  return await cognitoidentity
    .getId({
      IdentityPoolId: "ap-northeast-1:e6c784a1-5d0e-4a29-9934-d06706c65379",
      Logins: {
        "api.twitter.com": String(`${accessToken};${accessTokenSecret}`)
      }
    })
    .promise();
}

export default {
  name: "twitter-auth-callback",
  components: {},
  async mounted() {
    const oAuthToken = this.$route.query.oauth_token;
    const oAuthVerifier = this.$route.query.oauth_verifier;
    const oAuthTokenSecret = localStorage.getItem("oauth_token_secret");

    const res = await API.post("api9ca178e8", "/twitter-auth/access-token", {
      body: {
        oauth_token: oAuthToken,
        oauth_token_secret: oAuthTokenSecret,
        oauth_verifier: oAuthVerifier
      }
    });
    const accessToken = res.access_token;
    const accessTokenSecret = res.access_token_secret;

    AWS.config.region = "ap-northeast-1";
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-1:e6c784a1-5d0e-4a29-9934-d06706c65379",
      Logins: {
        "api.twitter.com": String(`${accessToken};${accessTokenSecret}`)
      }
    });
    AWS.config.credentials.get(async err => {
      console.log(err);
      // Credentials will be available when this function is called.
      console.log(AWS.config.credentials.accessKeyId);
      console.log(AWS.config.credentials.secretAccessKey);
      console.log(AWS.config.credentials.sessionToken);

      const twitterUser = await getTwitterUser(accessToken, accessTokenSecret);
      this.$store.dispatch("setTwitterUser", twitterUser);

      const identity = await getIdentityId(accessToken, accessTokenSecret);
      this.$store.dispatch("setIdentityId", identity.IdentityId);

      const user = await API.graphql(
        graphqlOperation(queries.getUserProfile, { id: identity.IdentityId })
      );

      if (user.data.getUserProfile) {
        this.$router.push("/home");
      } else {
        this.$router.push("/user-profile");
      }
    });
  }
};
</script>
