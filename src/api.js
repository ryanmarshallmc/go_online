import { API, graphqlOperation } from 'aws-amplify'

export async function callApi(operation, input) {
  const res = await API.graphql(graphqlOperation(operation, input))
  console.log(res)
  return res
}

// export async function getCollectionInfo({ id }, authMode = process.env.REACT_APP_AWS_APPSYNC_AUTHENTICATION_TYPE ) {
//   const res = await API.graphql({
//     query: queries.getCollectionInfo,
//     variables: { id } ,
//     authMode,
//   })
//   return res
// }
