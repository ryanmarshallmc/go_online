import { API, graphqlOperation } from 'aws-amplify'

export async function callApi(operation, input) {
  return await API.graphql(graphqlOperation(operation, input))
}
