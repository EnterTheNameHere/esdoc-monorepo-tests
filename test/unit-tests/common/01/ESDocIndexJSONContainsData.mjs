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
    
    expect(indexJSON.length).to.equal(16);
    
    const doc0 = collect(indexJSON)
      .where('__docId__', '===', 0)
      .firstOrFail();
    
    expect(doc0.kind).to.eql("file");
    expect(doc0.name).to.eql("src/DirectoryA/Identifier.js");

    const doc1 = collect(indexJSON)
      .where('__docId__', '===', 1)
      .firstOrFail();
    
    expect(doc1.importStyle).to.eql("{Identifier}");
    expect(doc1.description).to.eql("This Identifier class resides in DirectoryA");
    expect(doc1.longname).to.eql("src/DirectoryA/Identifier.js~Identifier");

    const doc4 = collect(indexJSON)
      .where('__docId__', '===', 4)
      .firstOrFail();

    expect(doc4.importStyle).to.eql("{Identifier}");
    expect(doc4.description).to.eql("This Identifier class resides in DirectoryB");
    expect(doc4.longname).to.eql("src/DirectoryB/Identifier.js~Identifier");
    
    const doc12 = collect(indexJSON)
      .where('__docId__', '===', 12)
      .firstOrFail();
    
    expect(doc12.access).to.eql(null); // Since plugins are not used, it won't be "public"
    expect(doc12.description).to.eql("Creates instance.");
    expect(doc12.longname).to.eql("src/ESDocTest.js~ESDocTestSingleton#constructor");
  });
});
