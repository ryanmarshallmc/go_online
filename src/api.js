import { API, graphqlOperation } from 'aws-amplify'

export async function callApi(operation, input) {
  return await API.graphql(graphqlOperation(operation, input))
}

export async function createSubscription(subscription, input, callback) {
  return await API.graphql(graphqlOperation(subscription, input)).subscribe({
    next: (res) => callback(res),
  })
}
