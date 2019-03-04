import { Storage } from "aws-amplify";
import Jimp from "jimp/es";

const path = "/profile-images";
const profileImageKey = profileId => `${path}/${profileId}`;

const getUserImageUrl = async userProfile => {
  const keys = await Storage.list(path);
  let imageUrl = require("@/assets/images/human.png");
  const objectKeys = keys.map(item => item.key);
  if (objectKeys.includes(profileImageKey(userProfile.id))) {
    imageUrl = await Storage.get(profileImageKey(userProfile.id));
  }
  return imageUrl;
};

const putUserImageFile = async (userProfile, imageBuffer) => {
  const image = await Jimp.read(imageBuffer);
  const resizedBuffer = await image
    .resize(250, Jimp.AUTO)
    .quality(90)
    .getBufferAsync(Jimp.MIME_JPEG);
  await Storage.put(profileImageKey(userProfile.id), resizedBuffer, {
    contentType: "image/jpg"
  });
};

const getIncomeRangeString = income => {
  if (income >= 0 && income < 400) {
    return "0〜400万";
  } else if (income >= 400 && income < 700) {
    return "400〜700万";
  } else if (income >= 700 && income < 1000) {
    return "700〜1000万";
  } else if (income >= 1000) {
    return "1000万以上";
  } else {
    return "未設定";
  }
};

const getNomadStatusString = nomadStatus => {
  if (nomadStatus === "nomad") {
    return "ノマド達成済み";
  } else if (nomadStatus === "goingNomad") {
    return "目指している";
  }
  if (nomadStatus === "notNomad") {
    return "ノマドではない";
  } else {
    return "未設定";
  }
};

const getSmokingString = smoking => {
  if (smoking) {
    return "吸う";
  } else {
    return "吸わない";
  }
};

const getDrinkString = drink => {
  if (drink) {
    return "飲む";
  } else {
    return "飲まない";
  }
};

const getDisplayUser = async user => {
  const imageUrl = await getUserImageUrl(user);
  return {
    id: user.id,
    name: user.name,
    description: user.description,
    twitterScreenName: user.twitterScreenName,
    location: user.location,
    skill: user.skill,
    smoking: getSmokingString(user.smoking),
    drink: getDrinkString(user.drink),
    incomeRange: getIncomeRangeString(user.income),
    nomadStatus: getNomadStatusString(user.nomadStatus),
    imageUrl: imageUrl
  };
};

export default {
  getUserImageUrl,
  putUserImageFile,
  getDisplayUser
};
