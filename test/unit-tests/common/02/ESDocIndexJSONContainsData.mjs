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

describe(`esdoc generated data`, function() {
  let contents = '';
  
  it('contains what we expect', function() {
    // Here we just check some of the data which is expected
    // to be present in index.json

    const indexJSON = generatedDocumentationFiles['index.json'];
    
    expect(indexJSON.length).to.equal(88);
    
    const doc48 = collect(indexJSON)
      .where('__docId__', '===', 48)
      .firstOrFail();
    
    expect(doc48.kind).to.eql("file");
    expect(doc48.name).to.eql("src/DirectoryA/Identifier.js");

    const doc49 = collect(indexJSON)
      .where('__docId__', '===', 49)
      .firstOrFail();
    
    expect(doc49.importStyle).to.eql("{Identifier}");
    expect(doc49.description).to.eql("This Identifier class resides in DirectoryA");
    expect(doc49.longname).to.eql("src/DirectoryA/Identifier.js~Identifier");

    const doc52 = collect(indexJSON)
      .where('__docId__', '===', 52)
      .firstOrFail();

    expect(doc52.importStyle).to.eql("{Identifier}");
    expect(doc52.description).to.eql("This Identifier class resides in DirectoryB");
    expect(doc52.longname).to.eql("src/DirectoryB/Identifier.js~Identifier");
    
    const doc60 = collect(indexJSON)
      .where('__docId__', '===', 60)
      .firstOrFail();
    
    expect(doc60.access).to.eql('public');
    expect(doc60.description).to.eql("Creates instance.");
    expect(doc60.longname).to.eql("src/ESDocTest.js~ESDocTestSingleton#constructor");
  });
});
