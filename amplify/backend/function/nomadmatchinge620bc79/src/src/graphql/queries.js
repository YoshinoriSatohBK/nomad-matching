// eslint-disable
// this is an auto generated file. This will be overwritten

export const getUserProfile = `query GetUserProfile($id: ID!) {
  getUserProfile(id: $id) {
    identityId
    email
    profileImageUrl
    name
    screenName
  }
}
`;
export const listUserProfiles = `query ListUserProfiles(
  $filter: ModelUserProfileFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      identityId
      email
      profileImageUrl
      name
      screenName
    }
    nextToken
  }
}
`;
