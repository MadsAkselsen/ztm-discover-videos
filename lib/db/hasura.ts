/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function queryHasuraGraphQL(operationName: string, variables: any) {
    console.log("fetch graphql")
    const operationsDoc: BodyInit = `
    query GetUsers {
      users {
        id
        email
        issuer
        publicAddress
      }
    }
  `;

    const result = await fetch(
        process.env.NEXT_PUBLIC_HASURA_ADMIN_URL!,
      {
        method: "POST",
        headers: {
            // "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET!,
            "Authorization": "Bearer "
          },
        body: JSON.stringify({
          query: operationsDoc,
          variables: variables,
          operationName: operationName
        })
      }
    );
  
    return await result.json();
  }
  
  export function fetchGetUsers() {
    return queryHasuraGraphQL(
      "GetUsers",
      {}
    );
  }
  
  function executeInsertUser() {
    return queryHasuraGraphQL(
      "InsertUser",
      {}
    );
  }
  
  function executeInsertStats() {
    return queryHasuraGraphQL(
      "InsertStats",
      {}
    );
  }
  
  function fetchGetStats() {
    return queryHasuraGraphQL(
      "GetStats",
      {}
    );
  }
  
  async function startFetchGetUsers() {
    const { errors, data } = await fetchGetUsers();
  
    if (errors) {
      // handle those errors like a pro
      console.error(errors);
    }
  
    // do something great with this precious data
    console.log(data);
  }
  
  startFetchGetUsers();
  
  async function startExecuteInsertUser() {
    const { errors, data } = await executeInsertUser();
  
    if (errors) {
      // handle those errors like a pro
      console.error(errors);
    }
  
    // do something great with this precious data
    console.log(data);
  }
  
//   startExecuteInsertUser();
  
  async function startExecuteInsertStats() {
    const { errors, data } = await executeInsertStats();
  
    if (errors) {
      // handle those errors like a pro
      console.error(errors);
    }
  
    // do something great with this precious data
    console.log(data);
  }
  
//   startExecuteInsertStats();
  
  async function startFetchGetStats() {
    const { errors, data } = await fetchGetStats();
  
    if (errors) {
      // handle those errors like a pro
      console.error(errors);
    }
  
    // do something great with this precious data
    console.log(data);
  }
  
//   startFetchGetStats();