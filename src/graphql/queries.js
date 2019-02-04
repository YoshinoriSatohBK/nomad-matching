// eslint-disable
// this is an auto generated file. This will be overwritten

export const getUserProfile = `query GetUserProfile($id: ID!) {
  getUserProfile(id: $id) {
    id
    name
    email
    imageUrl
    location
    income
    smoking
    drink
    nomadStatus
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
      id
      name
      email
      imageUrl
      location
      income
      smoking
      drink
      nomadStatus
    }
    nextToken
  }
}
`;
export const searchUserProfiles = `query SearchUserProfiles(
  $filter: SearchableUserProfileFilterInput
  $sort: SearchableUserProfileSortInput
  $limit: Int
  $nextToken: Int
) {
  searchUserProfiles(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      email
      imageUrl
      location
      income
      smoking
      drink
      nomadStatus
    }
    nextToken
  }
}
`;
