import chai, { expect } from 'chai';
import path from 'path';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { run } from './run';

chai.use(sinonChai);

describe('run function', () => {
  const functionObj = {
    handler: 'file.name',
  };
  const serverless = {
    service: {},
    utils: {},
    config: {
      servicePath: 'path',
    },
  };
  const options = {
    functionName: 'name',
  };
  const requiredFile = {};
  const event = {};

  let getFunctionStub;
  let requireStub;
  let contextStub;
  let callbackStub;

  before(() => {
    getFunctionStub = sinon.stub().returns(functionObj);
    serverless.service.getFunction = getFunctionStub;

    requiredFile.name = sinon.spy();
    requireStub = sinon.stub();
    requireStub.onFirstCall().returns(requiredFile);
    requireStub.onSecondCall().returns(event);

    contextStub = sinon.stub().returns('context');
    callbackStub = sinon.stub().returns('callback');

    run(serverless, options, requireStub, contextStub, callbackStub);
  });

  it('gets function by its function name', () => {
    expect(getFunctionStub).to.have.been.calledWith('name');
  });

  it('requires the file', () => {
    expect(requireStub).to.have.been.calledWith(path.join('path', 'file.js'));
  });

  it('gets event.json', () => {
    expect(requireStub).to.have.been.calledWith(path.join('path', 'event.json'));
  });

  it('runs the function with event.json, context, and callback', () => {
    expect(contextStub).to.have.been.calledWith('name', serverless);
    expect(callbackStub).to.have.been.calledWith(serverless);
    expect(requiredFile.name)
      .to.have.been.calledWith(event, 'context', 'callback');
  });
});
