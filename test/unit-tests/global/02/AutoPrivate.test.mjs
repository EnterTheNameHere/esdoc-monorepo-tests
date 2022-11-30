
import { expect } from 'chai';
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

describe('accessor plugin', function () {
  it('adds ignore property to all private identifiers, since access is only "public", "protected"', function () {
    const indexJSON = generatedDocumentationFiles['index.json'];

    const privateIdentifiers = collect(indexJSON)
      .where('access', '===', 'private');
    
    for( let identifier of privateIdentifiers ) {
      expect(identifier).to.have.property('ignore').and.to.equal(true);
    }
  });
  
  it('privates all identifiers starting with underscore, since autoprivate is true', function () {
    const indexJSON = generatedDocumentationFiles['index.json'];
    
    let privateIdentifier = collect(indexJSON)
      .where('name', '===', '_staticMethodShouldBePrivate')
      .firstOrFail();
    expect(privateIdentifier).to.have.property('access').and.to.equal('private');

    privateIdentifier = collect(indexJSON)
      .where('name', '===', '_generatorMethodShouldBePrivate')
      .firstOrFail();
    expect(privateIdentifier).to.have.property('access').and.to.equal('private');

    privateIdentifier = collect(indexJSON)
      .where('name', '===', '_getterShouldBePrivate')
      .firstOrFail();
    expect(privateIdentifier).to.have.property('access').and.to.equal('private');

    privateIdentifier = collect(indexJSON)
      .where('name', '===', '_methodShouldBePrivate')
      .firstOrFail();
    expect(privateIdentifier).to.have.property('access').and.to.equal('private');

    privateIdentifier = collect(indexJSON)
      .where('name', '===', '_instanceShouldBePrivate')
      .firstOrFail();
    expect(privateIdentifier).to.have.property('access').and.to.equal('private');

    privateIdentifier = collect(indexJSON)
      .where('name', '===', '_shouldBePrivateStatic')
      .firstOrFail();
    expect(privateIdentifier).to.have.property('access').and.to.equal('private');
  });
});
