import pathLib from 'path';

import callback from './callback';
import context from './context';

export const run = (
  serverless,
  options,
  requireFn = require,
  contextFn = context,
  callbackFn = callback
) => {
  const { functionName, path } = options;

  const functionObj = serverless.service.getFunction(functionName);
  const { handler } = functionObj;

  const filename = `${handler.split('.')[0]}.js`;
  const jsFuncName = `${handler.split('.')[1]}`;
  const { servicePath } = serverless.config;

  const importedHandler = requireFn(pathLib.join(servicePath, filename));

  const event = requireFn(pathLib.join(servicePath, path ? path : 'event.json'));

  importedHandler[jsFuncName](
    event,
    contextFn(functionName, serverless),
    callbackFn(serverless)
  );
};
