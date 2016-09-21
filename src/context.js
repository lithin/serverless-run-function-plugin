import { callback } from './callback';

const context = (name, callbackFn = callback) => ({
  awsRequestId: 'id',
  invokeid: 'id',
  logGroupName: `/aws/lambda/${name}`,
  logStreamName: '2015/09/22/[HEAD]13370a84ca4ed8b77c427af260',
  functionVersion: 'HEAD',
  isDefaultFunctionVersion: true,

  functionName: name,
  memoryLimitInMB: '1024',

  succeed: result => callbackFn(null, result),
  fail: error => callbackFn(error),
  done: callbackFn,

  getRemainingTimeInMillis: () => 5000,
});

export default context;
