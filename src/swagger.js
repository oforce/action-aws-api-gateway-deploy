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
  

  await exec.exec(
    `jq ${arg('url', `${baseUrl}`)} ${arg(
      'authorizer_name',
      authorizerName
    )} ${argjson('authorizer0', authorizerArn[0] )}  ${argjson('authorizer1', authorizerArn[0] )} -f api-gateway.jq ${swaggerFile}`,
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
