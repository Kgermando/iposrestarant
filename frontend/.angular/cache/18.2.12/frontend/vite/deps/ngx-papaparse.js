import {
  require_papaparse_min
} from "./chunk-N336MEWE.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-A6QQXNMY.js";
import "./chunk-L3L3MARH.js";
import "./chunk-HT7FUOV6.js";
import "./chunk-YDJZLEI3.js";
import {
  __toESM
} from "./chunk-S35DAJRX.js";

// node_modules/ngx-papaparse/fesm2022/ngx-papaparse.mjs
var lib = __toESM(require_papaparse_min(), 1);
var Papa = class _Papa {
  constructor() {
    this._papa = lib;
  }
  /**
   * Parse CSV to an array
   */
  parse(csv, config) {
    return this._papa.parse(csv, config);
  }
  /**
   * Convert an array into CSV
   */
  unparse(data, config) {
    return this._papa.unparse(data, config);
  }
  /**
   * Set the size in bytes of each file chunk.
   * Used when streaming files obtained from the DOM that
   * exist on the local computer. Default 10 MB.
   */
  setLocalChunkSize(value) {
    this._papa.LocalChunkSize = value;
  }
  /**
   * Set the size in bytes of each remote file chunk.
   * Used when streaming remote files. Default 5 MB.
   */
  setRemoteChunkSize(value) {
    this._papa.RemoteChunkSize = value;
  }
  /**
   * Set the delimiter used when it is left unspecified and cannot be detected automatically. Default is comma.
   */
  setDefaultDelimiter(value) {
    this._papa.DefaultDelimiter = value;
  }
  /**
   * An array of characters that are not allowed as delimiters.
   */
  get badDelimiters() {
    return this._papa.BAD_DELIMITERS;
  }
  /**
   * The true delimiter. Invisible. ASCII code 30.
   * Should be doing the job we strangely rely upon commas and tabs for.
   */
  get recordSeparator() {
    return this._papa.RECORD_SEP;
  }
  /**
   * Also sometimes used as a delimiting character. ASCII code 31.
   */
  get unitSeparator() {
    return this._papa.UNIT_SEP;
  }
  /**
   * Whether or not the browser supports HTML5 Web Workers.
   * If false, worker: true will have no effect.
   */
  get workersSupported() {
    return this._papa.WORKERS_SUPPORTED;
  }
  static {
    this.ɵfac = function Papa_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _Papa)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _Papa,
      factory: _Papa.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Papa, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
export {
  Papa
};
//# sourceMappingURL=ngx-papaparse.js.map
