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

describe('undocumented-identifier plugin', function () {
  it('adds ignore property where ', function () {
    const indexJSON = generatedDocumentationFiles['index.json'];

    const identifierWithoutIgnore = collect(indexJSON)
      .where('name', '===', 'shouldNotHaveIgnore')
      .firstOrFail();
    const identifierWithIgnore = collect(indexJSON)
      .where('name', '===', 'shouldHaveIgnore')
      .firstOrFail();
    
    expect(identifierWithoutIgnore).to.not.contain.property('ignore');
    expect(identifierWithIgnore).property('ignore').to.equal(true);
  });
});
