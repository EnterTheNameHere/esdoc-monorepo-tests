import {expect} from 'chai';

import {scope as gScope, dirExists} from './helper.js';

describe(`Lone local esdoc installation`, function() {
  const nodeModulesRootDirectory = './test/fixture/node_modules';
  const tests = [
    { packageName: 'esdoc', shouldExist: true },
    { packageName: 'esdoc-core', shouldExist: true },
    { packageName: 'esdoc-standard-plugin', shouldExist: false },
    { packageName: 'esdoc-publish-html-plugin', shouldExist: false },
    { packageName: 'esdoc-brand-plugin', shouldExist: false },
    { packageName: 'esdoc-undocumented-identifier-plugin', shouldExist: false },
  ];

  tests.forEach((args) => {
    describe(`${gScope}/${args.packageName}`, function() {
      it(`is ${ args.shouldExist ? 'installed' : 'NOT installed' } in root node_modules`, function() {
        expect(dirExists(nodeModulesRootDirectory, gScope, args.packageName)).to.equal(args.shouldExist, `${gScope}/${args.packageName} ${args.shouldExist ? 'is not found' : 'is FOUND installed'} in root of node_modules!`);
      });
    });
  });
});

import './ESDocIndexJSONContainsData.mjs'
