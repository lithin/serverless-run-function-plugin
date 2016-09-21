import path from 'path';

import callback from './callback';
import context from './context';

export const run = (
  serverless,
  options,
  requireFn = require,
  contextFn = context,
  callbackFn = callback
) => {
  const { functionName } = options;

  const functionObj = serverless.service.getFunction(functionName);
  const { handler } = functionObj;

  const filename = `${handler.split('.')[0]}.js`;
  const { servicePath } = serverless.config;
  const importedHandler = requireFn(path.join(servicePath, filename));

  const event = requireFn(path.join(servicePath, 'event.json'));

  importedHandler[functionName](
    event,
    contextFn(functionName, serverless),
    callbackFn(serverless)
  );
};
