import * as core from '@actions/core';
import * as aws from 'aws-sdk';

export { getAuthorizer };

function getAuthorizer(restApiId, authorizerName) {
  return new aws.APIGateway()
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
  core.info("gandolfo")
  core.notice("gandolfo")
  core.info(authorizer)
  core.info(authorizer.providerARNs)
  core.info(authorizer.providerARNs[0])
  return {
    id: authorizer.id,
    name: authorizer.name,
    arn: authorizer.providerARNs
  };
};
