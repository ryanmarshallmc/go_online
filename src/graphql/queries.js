/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGame = /* GraphQL */ `
  query GetGame($id: String!) {
    getGame(id: $id) {
      id
      host
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: TableGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        host
      }
      nextToken
    }
  }
`;
