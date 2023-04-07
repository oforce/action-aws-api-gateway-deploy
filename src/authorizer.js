import * as core from '@actions/core';
import { APIGateway } from "@aws-sdk/client-api-gateway";

export { getAuthorizer };

function getAuthorizer(restApiId, authorizerName) {
  return new APIGateway()
    .getAuthorizers({ restApiId })
    .promise()
    .then(readResponse(authorizerName))
    .catch(e => core.setFailed(e.message));
}

const readResponse = authorizerName => ({ items }) => {
  const authorizer = items.find(x => x.name === authorizerName);
  if (!authorizer) {
    core.setFailed(`Unable to find authorizer`);
  }
  return {
    id: authorizer.id,
    name: authorizer.name,
    arn: authorizer.providerARNs[0]
  };
};
