import { expect } from 'chai';

import { ServerlessRunFunction } from './ServerlessRunFunction';

describe('ServerlessRunFunction', () => {
  context('is an object that', () => {
    it('has hooks set, passing to them serverless and options', () => {
      const serverless = {};
      const options = {};
      const obj = new ServerlessRunFunction(serverless, options);
      // deep equal with params doesn't work because
      // bound functions are new objects - different ref
      expect(typeof obj.hooks['run:run']).to.equal('function');
    });

    it('has command set', () => {
      const serverless = {};
      const options = {};
      const obj = new ServerlessRunFunction(serverless, options);
      expect(obj.commands).to.deep.equal({
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
          },
        },
      });
    });
  });
});
