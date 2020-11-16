/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame($id: String, $host: String) {
    onCreateGame(id: $id, host: $host) {
      id
      host
      board
      boardSize
      createdAt
      updatedAt
      currentTurn
    }
  }
`;
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame($id: String, $host: String) {
    onUpdateGame(id: $id, host: $host) {
      id
      host
      board
      boardSize
      createdAt
      updatedAt
      currentTurn
    }
  }
`;
