import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import store from "../store";

const API_AUTH = "api9f77a9d3";

const getMailText = (fromUser, message) => {
  return `${fromUser.name} さんからメッセージが届きました！
  
【${fromUser.name} さんのプロフィール】
https://nomad-links.com/user/${fromUser.id}
  
【${fromUser.name} さんのメールアドレス】
${fromUser.email}

【メッセージ】
${message}

----------------------------
Nomad-links
サービスサイト: https://nomad-links.com/
お問い合わせ: xxxxxxxx@gmail.com
`;
};

const sendMessage = async (toUserId, message) => {
  const fromUser = store.state.user.authUserProfile;
  const subject = "Nomad links - メッセージが届きました";
  const text = getMailText(fromUser, message);
  const toUserResult = await API.graphql(
    graphqlOperation(queries.getUserProfile, {
      id: toUserId
    })
  );
  return API.post(API_AUTH, "/auth/message", {
    body: {
      toEmail: toUserResult.data.getUserProfile.email,
      subject: subject,
      text: text
    }
  });
};

export default {
  sendMessage
};
