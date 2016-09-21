import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import context from './context';

chai.use(sinonChai);

describe('context', () => {
  let callback;
  let obj;

  beforeEach(() => {
    callback = sinon.spy();
    obj = context('name', callback);
  });

  it('is a function returning an object', () => {
    expect(obj).to.be.an('object');
  });

  describe('object has', () => {
    it('awsRequestId', () => {
      expect(obj.awsRequestId).to.equal('id');
    });

    it('invokeid', () => {
      expect(obj.invokeid).to.equal('id');
    });

    it('logGroupName', () => {
      expect(obj.logGroupName).to.equal('/aws/lambda/name');
    });

    it('logStreamName', () => {
      expect(obj.logStreamName)
        .to.equal('2015/09/22/[HEAD]13370a84ca4ed8b77c427af260');
    });

    it('functionVersion', () => {
      expect(obj.functionVersion).to.equal('HEAD');
    });

    it('isDefaultFunctionVersion', () => {
      expect(obj.isDefaultFunctionVersion).to.equal(true);
    });

    it('functionName', () => {
      expect(obj.functionName).to.equal('name');
    });

    it('memoryLimitInMB', () => {
      expect(obj.memoryLimitInMB).to.equal('1024');
    });

    it('succeed which calls the callback with result', () => {
      obj.succeed('result');
      expect(callback).to.have.been.calledWith(null, 'result');
    });

    it('fail which calls the callback with error', () => {
      obj.fail('error');
      expect(callback).to.have.been.calledWith('error');
    });

    it('done which calls the callback directly', () => {
      obj.done(1, 2, 3);
      expect(callback).to.have.been.calledWith(1, 2, 3);
    });

    it('getRemainingTimeInMillis which returns 5s', () => {
      expect(obj.getRemainingTimeInMillis()).to.equal(5000);
    });
  });
});
