exports.scope = _getPackageScope('../../package.json');

/**
 * Returns scope of package eg. '@enterthenamehere' from package named 
 * '@enterthenamehere/esdoc-test' or empty string if scope is not present.
 * Scope name must immediately be followed by '/esdoc*', so only '@scope/esdoc*'
 * is considered valid. Package named '@scope/fs-extra' will return empty string,
 * as '/esdoc' does not immediately follow scope name. Any text can follow '/esdoc'.
 *
 * @return {string} Scope of package.
 */
 function _getPackageScope(packageJSONFilePath) {
  const filePath = upath.normalizeSafe(packageJSONFilePath);

  try {
    // Since require does cache loaded modules/files, we need to reset the entry
    // for the file we will require just in case it was already required before,
    // to.
    if(require.resolve(filePath) in require.cache) {
      delete require.cache[require.resolve(filePath)];
    }
    
    let packageName = require(filePath)?.name;

    if(typeof packageName !== 'string') {
      // Package name must be string...
      return '';
    }
    
    // Scope begins with '@'...
    if(!packageName.startsWith('@')) {
      return '';
    }
        
    // Scope should be followed by '/esdoc'
    let pos = packageName.indexOf('/esdoc');
    if(pos === -1) {
      return '';
    }
    
    return packageName.substring(0, pos);
  
  } catch( err ) {
    if( err.code === 'MODULE_NOT_FOUND' ) {
      throw new Error('Cannot determine the scope (ie. @scope/package) of esdoc. Cannot continue.');
    }
    throw err;
  }
}
