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

  let [filename, handlerFunction] = handler.split('.');
  filename = filename + '.js';

  const { servicePath } = serverless.config;
  const importedHandler = requireFn(path.join(servicePath, filename));

  const event = requireFn(path.join(servicePath, 'event.json'));

  importedHandler[handlerFunction](
    event,
    contextFn(functionName, serverless),
    callbackFn(serverless)
  );
};
