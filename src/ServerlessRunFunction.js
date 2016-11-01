import { run } from './run';

export class ServerlessRunFunction {
  constructor(serverless, options) {
    this.hooks = {
      'run:run': run.bind(null, serverless, options),
    };

    this.commands = {
      run: {
        usage: 'Runs a serverless function',
        lifecycleEvents: [
          'run',
        ],
        options: {
          functionName: {
            usage: 'Name of the function to run',
            required: true,
            shortcut: 'f',
          },
          eventPath: {
            usage: 'Relative path to event.json to execute',
            required: false,
            shortcut: 'e',
          },
        },
      },
    };
  }
}
