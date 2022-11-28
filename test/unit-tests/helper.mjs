import upath from 'upath';
import fse from 'fs-extra';
import url from 'node:url';

export const joinDir = helperJoinDir;
export const dirExists = helperDirExists;
export const readJSON = helperReadJson;

function helperJoinDir(...args) {
  return upath.normalize(upath.join(...args));
}

function helperDirExists(...args) {
  return fse.pathExistsSync(helperJoinDir(...args));
}

function helperReadJson(...args) {
  return fse.readJsonSync(helperJoinDir(...args));
}

/**
 * Returns __filename and __dirname for ES modules. Expects import.meta
 * as an argument.
 * 
 * @example
 * ```js
 * import {__moduleInfo} from 'helper.mjs';
 * 
 * const moduleInfo = __moduleInfo(import.meta);
 * 
 * console.log(moduleInfo.__filename); // "c:/directory/path/filename.extension"
 * console.log(moduleInfo.__dirname);  // "c:/directory/path"
 * ```
 * 
 * ES modules do not have __filename and __dirname defined, but you can
 * use import.meta.url if it's available. This function converts url
 * to filename and dirname.
 * 
 * @param {"import.meta object"} importMeta 
 * @returns {{__filename: string, __dirname: string}}
 */
export function __moduleInfo(importMeta) {
  if( importMeta?.url ) {
    const fileName = url.fileURLToPath(importMeta.url);
    return {
      __filename: upath.normalize(fileName),
      __dirname: upath.normalize(upath.dirname(fileName)),
    }
  }

  return {
    __filename: '',
    __dirname: '',
  }
}
