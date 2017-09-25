import chai, { expect } from 'chai';
import path from 'path';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { run } from './run';

chai.use(sinonChai);

describe('run function', () => {
  const functionObj = {
    handler: 'file.handler',
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

  beforeEach(() => {
    getFunctionStub = sinon.stub().returns(functionObj);
    serverless.service.getFunction = getFunctionStub;

    requiredFile.handler = sinon.spy();
    requireStub = sinon.stub();
    requireStub.onFirstCall().returns(requiredFile);
    requireStub.onSecondCall().returns(event);

    contextStub = sinon.stub().returns('context');
    callbackStub = sinon.stub().returns('callback');
  });

  it('gets function by its function name', () => {
    run(serverless, options, requireStub, contextStub, callbackStub);
    expect(getFunctionStub).to.have.been.calledWith('name');
  });

  it('requires the file', () => {
    run(serverless, options, requireStub, contextStub, callbackStub);
    expect(requireStub).to.have.been.calledWith(path.join('path', 'file.js'));
  });

  it('gets event.json', () => {
    run(serverless, options, requireStub, contextStub, callbackStub);
    expect(requireStub).to.have.been.calledWith(path.join('path', 'event.json'));
  });

  it('gets event.json from another path if required in options', () => {
    const optionsWithPath = {
      functionName: 'name',
      eventPath: 'another/path.event.json',
    };
    run(serverless, optionsWithPath, requireStub, contextStub, callbackStub);
    expect(requireStub)
      .to.have.been.calledWith(path.join('path', 'another/path.event.json'));
  });

  it('runs the function with event.json, context, and callback', () => {
    run(serverless, options, requireStub, contextStub, callbackStub);
    expect(contextStub).to.have.been.calledWith('name', serverless);
    expect(callbackStub).to.have.been.calledWith(serverless);
    expect(requiredFile.handler)
      .to.have.been.calledWith(event, 'context', 'callback');
  });
});
