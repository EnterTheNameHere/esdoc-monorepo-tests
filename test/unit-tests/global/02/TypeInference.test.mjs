import {expect} from 'chai';
import collect from 'collect.js';
import { readJSON, __moduleInfo } from '../../helper.mjs';

const moduleInfo = __moduleInfo(import.meta);


/**
 * @type {Array<JSONObject>} Contents of files as JSON objects.
 * 
 * Contains the content of files found in fixtureFiles.json as JSON objects.
 * Key is the name of the file.
 */
let generatedDocumentationFiles = [];
before('"getting generated fixture documentation data"', function() {
  let fixtureFiles = {};
  
  try {
    // Load paths of fixture data from fixtureFiles.json
    fixtureFiles = readJSON(moduleInfo.__dirname, 'fixtureFiles.json');
  }
  catch(err) {
    if(err?.errno === -4058) // ENOENT - file not found
    {
      throw new Error('Cannot find fixtureFiles.json setting file! unit-test must have one in it\'s directory to know where to find fixture data!');
    }
    throw err;
  }

  // Now load files
  const filePaths = Object.entries(fixtureFiles);
  
  for( let [fileName, filePath] of filePaths ) {
    try {
      generatedDocumentationFiles[fileName] = readJSON(moduleInfo.__dirname, filePath);
    }
    catch(err) {
      if(err?.errno === -4058) // ENOENT - file not found
      {
        throw new Error(`Error: Cannot find ${filePath}. This path was loaded from fixtureFiles.json`);
      }
      throw err;
    }
  }
});

describe('type-inference plugin', function () {
  it('infer return types as it should', function () {
    const indexJSON = generatedDocumentationFiles['index.json'];

    const returnsNumber = collect(indexJSON)
      .where('name', '===', 'returnsNumber')
      .firstOrFail();
    const returnsArrayOfStrings = collect(indexJSON)
      .where('name', '===', 'returnsArrayOfStrings')
      .firstOrFail();
    
    expect(returnsNumber.return.types).to.be.deep.equal(['number']);
    expect(returnsArrayOfStrings.return.types).to.be.deep.equal(['string[]']);
  });
});
