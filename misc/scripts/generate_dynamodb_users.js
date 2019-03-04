const AWS = require("aws-sdk");
AWS.config.update({
  region: "ap-northeast-1"
});
const credentials = new AWS.SharedIniFileCredentials({
  profile: "amplify-user"
});
AWS.config.credentials = credentials;

const nomadStatuses = ["nomad", "goingNomad", "notNomad"];
const randNomadStatus = () =>
  nomadStatuses[Math.floor(Math.random() * nomadStatuses.length)];

const skills = [
  "エンジニア",
  "デザイナー",
  "AWSエンジニア",
  "ライター",
  "バックエンドエンジニア",
  "フロントエンドエンジニア",
  "UI/UXエンジニア"
];
const randSkill = () => skills[Math.floor(Math.random() * skills.length)];

const locations = [
  "日本",
  "バンコク",
  "タイ",
  "バングラデシュ",
  "インドネシア",
  "オーストラリア",
  "フィリピン",
  "マレーシア",
  "シンガポール",
  "中国",
  "韓国",
  "アメリカ"
];
const randLocation = () =>
  locations[Math.floor(Math.random() * locations.length)];

const randIncome = () => Math.floor(Math.random() * 3000);

const randBoolean = () => Math.random() > 0.5;

const docClient = new AWS.DynamoDB.DocumentClient();

for (let i = 0; i < 100; i++) {
  const numString = ("00000" + i).slice(-5);
  const params = {
    TableName: "UserProfile-bb6rzxenpjgmlk6zc4xgoeh73e-devs",
    Item: {
      id: "ap-northeast-1:00000000-0000-0000-0000-000000000000-" + numString,
      twitterScreenName: "dummy" + numString,
      name: "テストユーザー" + numString,
      income: randIncome(),
      location: randLocation(),
      drink: randBoolean(),
      smoking: randBoolean(),
      nomadStatus: randNomadStatus(),
      __typename: "UserProfile",
      email: `yoshinori.satoh.test+${numString}@gmail.com`,
      owner: "___xamznone____",
      skill: randSkill(),
      createdAt: "2019-02-25T10:27:57.813Z",
      updatedAt: "2019-02-25T10:33:51.363Z"
    }
  };
  console.log(params);
  docClient.put(params, function(err) {
    if (err) console.error(err);
  });
}
