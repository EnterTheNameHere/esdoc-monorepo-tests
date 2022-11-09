import {expect} from 'chai';

import {scope as gScope, dirExists} from './helper.js';

describe(`Full local esdoc installation`, function() {
  const nodeModulesRootDirectory = './test/fixture/node_modules';
  const tests = [
    { packageName: 'color-logger', shouldExist: true },
    { packageName: 'esdoc', shouldExist: true },
    { packageName: 'esdoc-accessor-plugin', shouldExist: true },
    { packageName: 'esdoc-brand-plugin', shouldExist: true },
    { packageName: 'esdoc-core', shouldExist: true },
    { packageName: 'esdoc-coverage-plugin', shouldExist: true },
    { packageName: 'esdoc-ecmascript-proposal-plugin', shouldExist: true },
    { packageName: 'esdoc-exclude-source-plugin', shouldExist: true },
    { packageName: 'esdoc-external-ecmascript-plugin', shouldExist: true },
    { packageName: 'esdoc-external-nodejs-plugin', shouldExist: true },
    { packageName: 'esdoc-external-webapi-plugin', shouldExist: true },
    { packageName: 'esdoc-flow-type-plugin', shouldExist: true },
    { packageName: 'esdoc-importpath-plugin', shouldExist: true },
    { packageName: 'esdoc-inject-gtm-plugin', shouldExist: true },
    { packageName: 'esdoc-inject-script-plugin', shouldExist: true },
    { packageName: 'esdoc-inject-style-plugin', shouldExist: true },
    { packageName: 'esdoc-integrate-manual-plugin', shouldExist: true },
    { packageName: 'esdoc-integrate-test-plugin', shouldExist: true },
    { packageName: 'esdoc-jsx-plugin', shouldExist: true },
    { packageName: 'esdoc-lint-plugin', shouldExist: true },
    { packageName: 'esdoc-publish-html-plugin', shouldExist: true },
    { packageName: 'esdoc-publish-markdown-plugin', shouldExist: true },
    { packageName: 'esdoc-react-plugin', shouldExist: true },
    { packageName: 'esdoc-type-inference-plugin', shouldExist: true },
    { packageName: 'esdoc-typescript-plugin', shouldExist: true },
    { packageName: 'esdoc-undocumented-identifier-plugin', shouldExist: true },
    { packageName: 'esdoc-unexported-identifier-plugin', shouldExist: true },
    { packageName: 'ice-cap', shouldExist: true },
  ];
  
  tests.forEach((args) => {
    describe(`of ${gScope}/${args.packageName}`, function() {
      it(`is ${ args.shouldExist ? 'installed' : 'NOT installed' } in root node_modules`, function() {
        expect(dirExists(nodeModulesRootDirectory, gScope, args.packageName)).to.equal(args.shouldExist, `${gScope}/${args.packageName} ${args.shouldExist ? 'is not found' : 'is FOUND installed'} in root of node_modules!`);
      });
    });
  });
});

import './ESDocIndexJSONContainsData.mjs'
