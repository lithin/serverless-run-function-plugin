const callback = serverless => ((err, result) => {
  serverless.cli.log('-----------------');

  if (err) {
    serverless.cli.log('Failed - This Error Was Returned:');
    serverless.cli.log(err.message);
    serverless.cli.log(err.stack);
  }

  serverless.cli.log('Success! - This Response Was Returned:');
  serverless.cli.log(JSON.stringify(result, null, 4));
});

export default callback;
