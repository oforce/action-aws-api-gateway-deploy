import * as exec from '@actions/exec';
import * as fs from 'fs';

export { generateSwaggerFile };

async function generateSwaggerFile({
  jqScript,
  swaggerFile,
  baseUrl,
  authorizerName,
  authorizerArn
}) {
  await exec.exec(`curl -o api-gateway.jq ${jqScript}`);

  function arg(name, value) {
    return `--arg ${name} "${value}"`;
  }

  let out = '';
  
  core.error("gandolfo")
  core.warning("gandolfo")
  core.info(arn)
  core.info(authorizerArn)

  await exec.exec(
    `jq ${arg('url', `${baseUrl}`)} ${arg(
      'authorizer_name',
      authorizerName
    )} ${arg('authorizer', authorizerArn)} -f api-gateway.jq ${swaggerFile}`,
    [],
    {
      listeners: {
        stdout: data => (out += data.toString())
      }
    }
  );

  const destinationSwaggerFile = 'api-gateway-swagger.json';
  fs.writeFileSync(destinationSwaggerFile, out);
  return { destinationSwaggerFile };
}
