import { expect } from 'chai';

import { scope as gScope, dirExists, readJSON } from './helper.js';

const esdocGeneratedFile = './test/fixture/out/index.json';

describe(`The file ${esdocGeneratedFile} is generated and`, function() {
  let contents = '';

  before('should exist', function() {
    if( !dirExists(esdocGeneratedFile) ) {
      if( !dirExists(`./test/fixture/node_modules/${gScope}/esdoc`) ) {
        throw new Error(`Seems ${gScope}/esdoc is not installed correctly!`);
      }
      throw new Error(`${esdocGeneratedFile} file doesn't exist! That could mean ESDoc haven't successfully processed source files.`);
    }
    
    contents = readJSON(esdocGeneratedFile);
  });
  
  it('contains expected data', function() {
    // Here we just check some of the data which is expected
    // to be present in index.json
    
    expect(contents.length).to.equal(16);
    
    const doc0 = contents.find((elem) => {
      if( Object.prototype.hasOwnProperty.call(elem, '__docId__') ) {
        if(elem['__docId__'] === 0) return elem;
      }
    });
    


    expect(doc0.__docId__).to.eql(0);
    expect(doc0.kind).to.eql("file");
    expect(doc0.name).to.eql("src/DirectoryA/Identifier.js");

    const doc1 = contents.find((elem) => {
      if( Object.prototype.hasOwnProperty.call(elem, '__docId__') ) {
        if(elem['__docId__'] === 1) return elem;
      }
    });
    


    expect(doc1).to.haveOwnProperty('__docId__').and.to.eql(1);
    expect(doc1.importStyle).to.eql("{Identifier}");
    expect(doc1.description).to.eql("This Identifier class resides in DirectoryA");
    expect(doc1.longname).to.eql("src/DirectoryA/Identifier.js~Identifier");

    const doc4 = contents.find((elem) => {
      if( Object.prototype.hasOwnProperty.call(elem, '__docId__') ) {
        if(elem['__docId__'] === 4) return elem;
      }
    });
    
    expect(doc4).to.haveOwnProperty('__docId__').and.to.eql(4);
    expect(doc4.importStyle).to.eql("{Identifier}");
    expect(doc4.description).to.eql("This Identifier class resides in DirectoryB");
    expect(doc4.longname).to.eql("src/DirectoryB/Identifier.js~Identifier");
    


    const constr = contents.find((elem) => {
      if( Object.prototype.hasOwnProperty.call(elem, 'kind') ) {
        if(elem['kind'] === 'constructor') return elem;
      }
    });
    
    expect(constr).to.haveOwnProperty('__docId__').and.to.eql(12);
    expect(constr.access).to.be.null;
    expect(constr.description).to.eql("Creates instance.");
    expect(constr.longname).to.eql("src/ESDocTest.js~ESDocTestSingleton#constructor");
  });
});
