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
  const functionObj = serverless.service.getFunction(options.functionName);
  const { handler } = functionObj;

  const [filename, handlerFunction] = handler.split('.');
  const file = `${filename}.js`;

  const { servicePath } = serverless.config;
  const importedHandler = requireFn(path.join(servicePath, file));

  const event = requireFn(path.join(servicePath, options.path || 'event.json'));

  importedHandler[handlerFunction](
    event,
    contextFn(options.functionName, serverless),
    callbackFn(serverless)
  );
};
