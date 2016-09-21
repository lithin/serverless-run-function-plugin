import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import callback from './callback';

chai.use(sinonChai);

describe('callback', () => {
  let serverless;
  let fn;

  beforeEach(() => {
    serverless = {
      cli: {
        log: sinon.spy(),
      },
    };
    fn = callback(serverless);
  });

  it('is a function returning a function', () => {
    expect(fn).to.be.a('function');
  });

  describe('inner function', () => {
    it('prints out error if there is an error', () => {
      const error = new Error('error');
      fn(error);
      expect(serverless.cli.log)
        .to.have.been.calledWith('Failed - This Error Was Returned:');
      expect(serverless.cli.log)
        .to.have.been.calledWith('error');
      expect(serverless.cli.log)
        .to.have.been.calledWith(error.stack);
    });

    it('prints out stringified result if there is no error', () => {
      fn(null, 'result');
      expect(serverless.cli.log)
        .to.have.been.calledWith('Success! - This Response Was Returned:');
      expect(serverless.cli.log)
        .to.have.been.calledWith('"result"');
    });
  });
});
