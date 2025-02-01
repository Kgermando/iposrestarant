import {
  CommonModule
} from "./chunk-DQZ67R24.js";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  NgModule,
  Renderer2,
  ViewContainerRef,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject
} from "./chunk-A6QQXNMY.js";
import "./chunk-L3L3MARH.js";
import "./chunk-HT7FUOV6.js";
import {
  __decorate
} from "./chunk-YDJZLEI3.js";
import "./chunk-S35DAJRX.js";

// node_modules/@syncfusion/ej2-base/src/util.js
var isBlazorPlatform = false;
function createInstance(classFunction, params) {
  var arrayParam = params;
  arrayParam.unshift(void 0);
  return new (Function.prototype.bind.apply(classFunction, arrayParam))();
}
function setImmediate(handler) {
  var unbind;
  var num = new Uint16Array(5);
  var intCrypto = window.msCrypto || window.crypto;
  intCrypto.getRandomValues(num);
  var secret = "ej2" + combineArray(num);
  var messageHandler = function(event) {
    if (event.source === window && typeof event.data === "string" && event.data.length <= 32 && event.data === secret) {
      handler();
      unbind();
    }
  };
  window.addEventListener("message", messageHandler, false);
  window.postMessage(secret, "*");
  return unbind = function() {
    window.removeEventListener("message", messageHandler);
    handler = messageHandler = secret = void 0;
  };
}
function getValue(nameSpace, obj) {
  var value = obj;
  var splits = nameSpace.replace(/\[/g, ".").replace(/\]/g, "").split(".");
  for (var i = 0; i < splits.length && !isUndefined(value); i++) {
    value = value[splits[parseInt(i.toString(), 10)]];
  }
  return value;
}
function setValue(nameSpace, value, obj) {
  var keys2 = nameSpace.replace(/\[/g, ".").replace(/\]/g, "").split(".");
  var start = obj || {};
  var fromObj = start;
  var i;
  var length = keys2.length;
  var key;
  for (i = 0; i < length; i++) {
    key = keys2[parseInt(i.toString(), 10)];
    if (i + 1 === length) {
      fromObj["" + key] = value === void 0 ? {} : value;
    } else if (isNullOrUndefined(fromObj["" + key])) {
      fromObj["" + key] = {};
    }
    fromObj = fromObj["" + key];
  }
  return start;
}
function deleteObject(obj, key) {
  delete obj["" + key];
}
var containerObject = typeof window !== "undefined" ? window : {};
function isObject(obj) {
  var objCon = {};
  return !isNullOrUndefined(obj) && obj.constructor === objCon.constructor;
}
function merge(source, destination) {
  if (!isNullOrUndefined(destination)) {
    var temrObj = source;
    var tempProp = destination;
    var keys2 = Object.keys(destination);
    var deepmerge = "deepMerge";
    for (var _i = 0, keys_1 = keys2; _i < keys_1.length; _i++) {
      var key = keys_1[_i];
      if (!isNullOrUndefined(temrObj["" + deepmerge]) && temrObj["" + deepmerge].indexOf(key) !== -1 && (isObject(tempProp["" + key]) || Array.isArray(tempProp["" + key]))) {
        extend(temrObj["" + key], temrObj["" + key], tempProp["" + key], true);
      } else {
        temrObj["" + key] = tempProp["" + key];
      }
    }
  }
}
function extend(copied, first, second, deep) {
  var result = copied && typeof copied === "object" ? copied : {};
  var length = arguments.length;
  var args = [copied, first, second, deep];
  if (deep) {
    length = length - 1;
  }
  var _loop_1 = function(i2) {
    if (!args[parseInt(i2.toString(), 10)]) {
      return "continue";
    }
    var obj1 = args[parseInt(i2.toString(), 10)];
    Object.keys(obj1).forEach(function(key) {
      var src = result["" + key];
      var copy = obj1["" + key];
      var clone;
      var isArrayChanged = Array.isArray(copy) && Array.isArray(src) && copy.length !== src.length;
      var blazorEventExtend = isBlazor() ? !(src instanceof Event) && !isArrayChanged : true;
      if (deep && blazorEventExtend && (isObject(copy) || Array.isArray(copy))) {
        if (isObject(copy)) {
          clone = src ? src : {};
          if (Array.isArray(clone) && Object.prototype.hasOwnProperty.call(clone, "isComplexArray")) {
            extend(clone, {}, copy, deep);
          } else {
            result["" + key] = extend(clone, {}, copy, deep);
          }
        } else {
          clone = isBlazor() ? src && Object.keys(copy).length : src ? src : [];
          result["" + key] = extend([], clone, copy, clone && clone.length || copy && copy.length);
        }
      } else {
        result["" + key] = copy;
      }
    });
  };
  for (var i = 1; i < length; i++) {
    _loop_1(i);
  }
  return result;
}
function isNullOrUndefined(value) {
  return value === void 0 || value === null;
}
function isUndefined(value) {
  return "undefined" === typeof value;
}
function debounce(eventFunction, delay) {
  var out;
  return function() {
    var _this = this;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var later = function() {
      out = null;
      return eventFunction.apply(_this, args);
    };
    clearTimeout(out);
    out = setTimeout(later, delay);
  };
}
function compareElementParent(child, parent) {
  var node = child;
  if (node === parent) {
    return true;
  } else if (node === document || !node) {
    return false;
  } else {
    return compareElementParent(node.parentNode, parent);
  }
}
function throwError(message) {
  try {
    throw new Error(message);
  } catch (e) {
    throw new Error(e.message + "\n" + e.stack);
  }
}
function isBlazor() {
  return isBlazorPlatform;
}
function uniqueID() {
  if (typeof window === "undefined") {
    return;
  }
  var num = new Uint16Array(5);
  var intCrypto = window.msCrypto || window.crypto;
  return intCrypto.getRandomValues(num);
}
function combineArray(num) {
  var ret = "";
  for (var i = 0; i < 5; i++) {
    ret += (i ? "," : "") + num[parseInt(i.toString(), 10)];
  }
  return ret;
}

// node_modules/@syncfusion/ej2-base/src/intl/parser-base.js
var defaultNumberingSystem = {
  "latn": {
    "_digits": "0123456789",
    "_type": "numeric"
  }
};
var defaultNumberSymbols = {
  "decimal": ".",
  "group": ",",
  "percentSign": "%",
  "plusSign": "+",
  "minusSign": "-",
  "infinity": "∞",
  "nan": "NaN",
  "exponential": "E"
};
var latnNumberSystem = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var ParserBase = (
  /** @class */
  function() {
    function ParserBase2() {
    }
    ParserBase2.getMainObject = function(obj, cName) {
      var value = isBlazor() ? cName : "main." + cName;
      return getValue(value, obj);
    };
    ParserBase2.getNumberingSystem = function(obj) {
      return getValue("supplemental.numberingSystems", obj) || this.numberingSystems;
    };
    ParserBase2.reverseObject = function(prop, keys2) {
      var propKeys = keys2 || Object.keys(prop);
      var res = {};
      for (var _i = 0, propKeys_1 = propKeys; _i < propKeys_1.length; _i++) {
        var key = propKeys_1[_i];
        if (!Object.prototype.hasOwnProperty.call(res, prop["" + key])) {
          res[prop["" + key]] = key;
        }
      }
      return res;
    };
    ParserBase2.getSymbolRegex = function(props) {
      var regexStr = props.map(function(str) {
        return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
      }).join("|");
      var regExp3 = RegExp;
      return new regExp3(regexStr, "g");
    };
    ParserBase2.getSymbolMatch = function(prop) {
      var matchKeys = Object.keys(defaultNumberSymbols);
      var ret = {};
      for (var _i = 0, matchKeys_1 = matchKeys; _i < matchKeys_1.length; _i++) {
        var key = matchKeys_1[_i];
        ret[prop["" + key]] = defaultNumberSymbols["" + key];
      }
      return ret;
    };
    ParserBase2.constructRegex = function(val) {
      var len = val.length;
      var ret = "";
      for (var i = 0; i < len; i++) {
        if (i !== len - 1) {
          ret += val[parseInt(i.toString(), 10)] + "|";
        } else {
          ret += val[parseInt(i.toString(), 10)];
        }
      }
      return ret;
    };
    ParserBase2.convertValueParts = function(value, regex, obj) {
      return value.replace(regex, function(str) {
        return obj["" + str];
      });
    };
    ParserBase2.getDefaultNumberingSystem = function(obj) {
      var ret = {};
      ret.obj = getValue("numbers", obj);
      ret.nSystem = getValue("defaultNumberingSystem", ret.obj);
      return ret;
    };
    ParserBase2.getCurrentNumericOptions = function(curObj, numberSystem, needSymbols, blazorMode) {
      var ret = {};
      var cur = this.getDefaultNumberingSystem(curObj);
      if (!isUndefined(cur.nSystem) || blazorMode) {
        var digits = blazorMode ? getValue("obj.mapperDigits", cur) : getValue(cur.nSystem + "._digits", numberSystem);
        if (!isUndefined(digits)) {
          ret.numericPair = this.reverseObject(digits, latnNumberSystem);
          var regExp3 = RegExp;
          ret.numberParseRegex = new regExp3(this.constructRegex(digits), "g");
          ret.numericRegex = "[" + digits[0] + "-" + digits[9] + "]";
          if (needSymbols) {
            ret.numericRegex = digits[0] + "-" + digits[9];
            ret.symbolNumberSystem = getValue(blazorMode ? "numberSymbols" : "symbols-numberSystem-" + cur.nSystem, cur.obj);
            ret.symbolMatch = this.getSymbolMatch(ret.symbolNumberSystem);
            ret.numberSystem = cur.nSystem;
          }
        }
      }
      return ret;
    };
    ParserBase2.getNumberMapper = function(curObj, numberSystem, isNumber) {
      var ret = {
        mapper: {}
      };
      var cur = this.getDefaultNumberingSystem(curObj);
      if (!isUndefined(cur.nSystem)) {
        ret.numberSystem = cur.nSystem;
        ret.numberSymbols = getValue("symbols-numberSystem-" + cur.nSystem, cur.obj);
        ret.timeSeparator = getValue("timeSeparator", ret.numberSymbols);
        var digits = getValue(cur.nSystem + "._digits", numberSystem);
        if (!isUndefined(digits)) {
          for (var _i = 0, latnNumberSystem_1 = latnNumberSystem; _i < latnNumberSystem_1.length; _i++) {
            var i = latnNumberSystem_1[_i];
            ret.mapper[parseInt(i.toString(), 10)] = digits[parseInt(i.toString(), 10)];
          }
        }
      }
      return ret;
    };
    ParserBase2.nPair = "numericPair";
    ParserBase2.nRegex = "numericRegex";
    ParserBase2.numberingSystems = defaultNumberingSystem;
    return ParserBase2;
  }()
);
var blazorCurrencyData = {
  "DJF": "Fdj",
  "ERN": "Nfk",
  "ETB": "Br",
  "NAD": "$",
  "ZAR": "R",
  "XAF": "FCFA",
  "GHS": "GH₵",
  "XDR": "XDR",
  "AED": "د.إ.",
  "BHD": "د.ب.",
  "DZD": "د.ج.",
  "EGP": "ج.م.",
  "ILS": "₪",
  "IQD": "د.ع.",
  "JOD": "د.ا.",
  "KMF": "CF",
  "KWD": "د.ك.",
  "LBP": "ل.ل.",
  "LYD": "د.ل.",
  "MAD": "د.م.",
  "MRU": "أ.م.",
  "OMR": "ر.ع.",
  "QAR": "ر.ق.",
  "SAR": "ر.س.",
  "SDG": "ج.س.",
  "SOS": "S",
  "SSP": "£",
  "SYP": "ل.س.",
  "TND": "د.ت.",
  "YER": "ر.ي.",
  "CLP": "$",
  "INR": "₹",
  "TZS": "TSh",
  "EUR": "€",
  "AZN": "₼",
  "RUB": "₽",
  "BYN": "Br",
  "ZMW": "K",
  "BGN": "лв.",
  "NGN": "₦",
  "XOF": "CFA",
  "BDT": "৳",
  "CNY": "¥",
  "BAM": "КМ",
  "UGX": "USh",
  "USD": "$",
  "CZK": "Kč",
  "GBP": "£",
  "DKK": "kr.",
  "KES": "Ksh",
  "CHF": "CHF",
  "MVR": "ރ.",
  "BTN": "Nu.",
  "XCD": "EC$",
  "AUD": "$",
  "BBD": "$",
  "BIF": "FBu",
  "BMD": "$",
  "BSD": "$",
  "BWP": "P",
  "BZD": "$",
  "CAD": "$",
  "NZD": "$",
  "FJD": "$",
  "FKP": "£",
  "GIP": "£",
  "GMD": "D",
  "GYD": "$",
  "HKD": "$",
  "IDR": "Rp",
  "JMD": "$",
  "KYD": "$",
  "LRD": "$",
  "MGA": "Ar",
  "MOP": "MOP$",
  "MUR": "Rs",
  "MWK": "MK",
  "MYR": "RM",
  "PGK": "K",
  "PHP": "₱",
  "PKR": "Rs",
  "RWF": "RF",
  "SBD": "$",
  "SCR": "SR",
  "SEK": "kr",
  "SGD": "$",
  "SHP": "£",
  "SLL": "Le",
  "ANG": "NAf.",
  "SZL": "E",
  "TOP": "T$",
  "TTD": "$",
  "VUV": "VT",
  "WST": "WS$",
  "ARS": "$",
  "BOB": "Bs",
  "BRL": "R$",
  "COP": "$",
  "CRC": "₡",
  "CUP": "$",
  "DOP": "$",
  "GTQ": "Q",
  "HNL": "L",
  "MXN": "$",
  "NIO": "C$",
  "PAB": "B/.",
  "PEN": "S/",
  "PYG": "₲",
  "UYU": "$",
  "VES": "Bs.S",
  "IRR": "ريال",
  "GNF": "FG",
  "CDF": "FC",
  "HTG": "G",
  "XPF": "FCFP",
  "HRK": "kn",
  "HUF": "Ft",
  "AMD": "֏",
  "ISK": "kr",
  "JPY": "¥",
  "GEL": "₾",
  "CVE": "​",
  "KZT": "₸",
  "KHR": "៛",
  "KPW": "₩",
  "KRW": "₩",
  "KGS": "сом",
  "AOA": "Kz",
  "LAK": "₭",
  "MZN": "MTn",
  "MKD": "ден",
  "MNT": "₮",
  "BND": "$",
  "MMK": "K",
  "NOK": "kr",
  "NPR": "रु",
  "AWG": "Afl.",
  "SRD": "$",
  "PLN": "zł",
  "AFN": "؋",
  "STN": "Db",
  "MDL": "L",
  "RON": "lei",
  "UAH": "₴",
  "LKR": "රු.",
  "ALL": "Lekë",
  "RSD": "дин.",
  "TJS": "смн",
  "THB": "฿",
  "TMT": "m.",
  "TRY": "₺",
  "UZS": "сўм",
  "VND": "₫",
  "TWD": "NT$"
};
function getBlazorCurrencySymbol(currencyCode) {
  return getValue(currencyCode || "", blazorCurrencyData);
}

// node_modules/@syncfusion/ej2-base/src/hijri-parser.js
var HijriParser;
(function(HijriParser2) {
  var dateCorrection = [28607, 28636, 28665, 28695, 28724, 28754, 28783, 28813, 28843, 28872, 28901, 28931, 28960, 28990, 29019, 29049, 29078, 29108, 29137, 29167, 29196, 29226, 29255, 29285, 29315, 29345, 29375, 29404, 29434, 29463, 29492, 29522, 29551, 29580, 29610, 29640, 29669, 29699, 29729, 29759, 29788, 29818, 29847, 29876, 29906, 29935, 29964, 29994, 30023, 30053, 30082, 30112, 30141, 30171, 30200, 30230, 30259, 30289, 30318, 30348, 30378, 30408, 30437, 30467, 30496, 30526, 30555, 30585, 30614, 30644, 30673, 30703, 30732, 30762, 30791, 30821, 30850, 30880, 30909, 30939, 30968, 30998, 31027, 31057, 31086, 31116, 31145, 31175, 31204, 31234, 31263, 31293, 31322, 31352, 31381, 31411, 31441, 31471, 31500, 31530, 31559, 31589, 31618, 31648, 31676, 31706, 31736, 31766, 31795, 31825, 31854, 31884, 31913, 31943, 31972, 32002, 32031, 32061, 32090, 32120, 32150, 32180, 32209, 32239, 32268, 32298, 32327, 32357, 32386, 32416, 32445, 32475, 32504, 32534, 32563, 32593, 32622, 32652, 32681, 32711, 32740, 32770, 32799, 32829, 32858, 32888, 32917, 32947, 32976, 33006, 33035, 33065, 33094, 33124, 33153, 33183, 33213, 33243, 33272, 33302, 33331, 33361, 33390, 33420, 33450, 33479, 33509, 33539, 33568, 33598, 33627, 33657, 33686, 33716, 33745, 33775, 33804, 33834, 33863, 33893, 33922, 33952, 33981, 34011, 34040, 34069, 34099, 34128, 34158, 34187, 34217, 34247, 34277, 34306, 34336, 34365, 34395, 34424, 34454, 34483, 34512, 34542, 34571, 34601, 34631, 34660, 34690, 34719, 34749, 34778, 34808, 34837, 34867, 34896, 34926, 34955, 34985, 35015, 35044, 35074, 35103, 35133, 35162, 35192, 35222, 35251, 35280, 35310, 35340, 35370, 35399, 35429, 35458, 35488, 35517, 35547, 35576, 35605, 35635, 35665, 35694, 35723, 35753, 35782, 35811, 35841, 35871, 35901, 35930, 35960, 35989, 36019, 36048, 36078, 36107, 36136, 36166, 36195, 36225, 36254, 36284, 36314, 36343, 36373, 36403, 36433, 36462, 36492, 36521, 36551, 36580, 36610, 36639, 36669, 36698, 36728, 36757, 36786, 36816, 36845, 36875, 36904, 36934, 36963, 36993, 37022, 37052, 37081, 37111, 37141, 37170, 37200, 37229, 37259, 37288, 37318, 37347, 37377, 37406, 37436, 37465, 37495, 37524, 37554, 37584, 37613, 37643, 37672, 37701, 37731, 37760, 37790, 37819, 37849, 37878, 37908, 37938, 37967, 37997, 38027, 38056, 38085, 38115, 38144, 38174, 38203, 38233, 38262, 38292, 38322, 38351, 38381, 38410, 38440, 38469, 38499, 38528, 38558, 38587, 38617, 38646, 38676, 38705, 38735, 38764, 38794, 38823, 38853, 38882, 38912, 38941, 38971, 39001, 39030, 39059, 39089, 39118, 39148, 39178, 39208, 39237, 39267, 39297, 39326, 39355, 39385, 39414, 39444, 39473, 39503, 39532, 39562, 39592, 39621, 39650, 39680, 39709, 39739, 39768, 39798, 39827, 39857, 39886, 39916, 39946, 39975, 40005, 40035, 40064, 40094, 40123, 40153, 40182, 40212, 40241, 40271, 40300, 40330, 40359, 40389, 40418, 40448, 40477, 40507, 40536, 40566, 40595, 40625, 40655, 40685, 40714, 40744, 40773, 40803, 40832, 40862, 40892, 40921, 40951, 40980, 41009, 41039, 41068, 41098, 41127, 41157, 41186, 41216, 41245, 41275, 41304, 41334, 41364, 41393, 41422, 41452, 41481, 41511, 41540, 41570, 41599, 41629, 41658, 41688, 41718, 41748, 41777, 41807, 41836, 41865, 41894, 41924, 41953, 41983, 42012, 42042, 42072, 42102, 42131, 42161, 42190, 42220, 42249, 42279, 42308, 42337, 42367, 42397, 42426, 42456, 42485, 42515, 42545, 42574, 42604, 42633, 42662, 42692, 42721, 42751, 42780, 42810, 42839, 42869, 42899, 42929, 42958, 42988, 43017, 43046, 43076, 43105, 43135, 43164, 43194, 43223, 43253, 43283, 43312, 43342, 43371, 43401, 43430, 43460, 43489, 43519, 43548, 43578, 43607, 43637, 43666, 43696, 43726, 43755, 43785, 43814, 43844, 43873, 43903, 43932, 43962, 43991, 44021, 44050, 44080, 44109, 44139, 44169, 44198, 44228, 44258, 44287, 44317, 44346, 44375, 44405, 44434, 44464, 44493, 44523, 44553, 44582, 44612, 44641, 44671, 44700, 44730, 44759, 44788, 44818, 44847, 44877, 44906, 44936, 44966, 44996, 45025, 45055, 45084, 45114, 45143, 45172, 45202, 45231, 45261, 45290, 45320, 45350, 45380, 45409, 45439, 45468, 45498, 45527, 45556, 45586, 45615, 45644, 45674, 45704, 45733, 45763, 45793, 45823, 45852, 45882, 45911, 45940, 45970, 45999, 46028, 46058, 46088, 46117, 46147, 46177, 46206, 46236, 46265, 46295, 46324, 46354, 46383, 46413, 46442, 46472, 46501, 46531, 46560, 46590, 46620, 46649, 46679, 46708, 46738, 46767, 46797, 46826, 46856, 46885, 46915, 46944, 46974, 47003, 47033, 47063, 47092, 47122, 47151, 47181, 47210, 47240, 47269, 47298, 47328, 47357, 47387, 47417, 47446, 47476, 47506, 47535, 47565, 47594, 47624, 47653, 47682, 47712, 47741, 47771, 47800, 47830, 47860, 47890, 47919, 47949, 47978, 48008, 48037, 48066, 48096, 48125, 48155, 48184, 48214, 48244, 48273, 48303, 48333, 48362, 48392, 48421, 48450, 48480, 48509, 48538, 48568, 48598, 48627, 48657, 48687, 48717, 48746, 48776, 48805, 48834, 48864, 48893, 48922, 48952, 48982, 49011, 49041, 49071, 49100, 49130, 49160, 49189, 49218, 49248, 49277, 49306, 49336, 49365, 49395, 49425, 49455, 49484, 49514, 49543, 49573, 49602, 49632, 49661, 49690, 49720, 49749, 49779, 49809, 49838, 49868, 49898, 49927, 49957, 49986, 50016, 50045, 50075, 50104, 50133, 50163, 50192, 50222, 50252, 50281, 50311, 50340, 50370, 50400, 50429, 50459, 50488, 50518, 50547, 50576, 50606, 50635, 50665, 50694, 50724, 50754, 50784, 50813, 50843, 50872, 50902, 50931, 50960, 50990, 51019, 51049, 51078, 51108, 51138, 51167, 51197, 51227, 51256, 51286, 51315, 51345, 51374, 51403, 51433, 51462, 51492, 51522, 51552, 51582, 51611, 51641, 51670, 51699, 51729, 51758, 51787, 51816, 51846, 51876, 51906, 51936, 51965, 51995, 52025, 52054, 52083, 52113, 52142, 52171, 52200, 52230, 52260, 52290, 52319, 52349, 52379, 52408, 52438, 52467, 52497, 52526, 52555, 52585, 52614, 52644, 52673, 52703, 52733, 52762, 52792, 52822, 52851, 52881, 52910, 52939, 52969, 52998, 53028, 53057, 53087, 53116, 53146, 53176, 53205, 53235, 53264, 53294, 53324, 53353, 53383, 53412, 53441, 53471, 53500, 53530, 53559, 53589, 53619, 53648, 53678, 53708, 53737, 53767, 53796, 53825, 53855, 53884, 53913, 53943, 53973, 54003, 54032, 54062, 54092, 54121, 54151, 54180, 54209, 54239, 54268, 54297, 54327, 54357, 54387, 54416, 54446, 54476, 54505, 54535, 54564, 54593, 54623, 54652, 54681, 54711, 54741, 54770, 54800, 54830, 54859, 54889, 54919, 54948, 54977, 55007, 55036, 55066, 55095, 55125, 55154, 55184, 55213, 55243, 55273, 55302, 55332, 55361, 55391, 55420, 55450, 55479, 55508, 55538, 55567, 55597, 55627, 55657, 55686, 55716, 55745, 55775, 55804, 55834, 55863, 55892, 55922, 55951, 55981, 56011, 56040, 56070, 56100, 56129, 56159, 56188, 56218, 56247, 56276, 56306, 56335, 56365, 56394, 56424, 56454, 56483, 56513, 56543, 56572, 56601, 56631, 56660, 56690, 56719, 56749, 56778, 56808, 56837, 56867, 56897, 56926, 56956, 56985, 57015, 57044, 57074, 57103, 57133, 57162, 57192, 57221, 57251, 57280, 57310, 57340, 57369, 57399, 57429, 57458, 57487, 57517, 57546, 57576, 57605, 57634, 57664, 57694, 57723, 57753, 57783, 57813, 57842, 57871, 57901, 57930, 57959, 57989, 58018, 58048, 58077, 58107, 58137, 58167, 58196, 58226, 58255, 58285, 58314, 58343, 58373, 58402, 58432, 58461, 58491, 58521, 58551, 58580, 58610, 58639, 58669, 58698, 58727, 58757, 58786, 58816, 58845, 58875, 58905, 58934, 58964, 58994, 59023, 59053, 59082, 59111, 59141, 59170, 59200, 59229, 59259, 59288, 59318, 59348, 59377, 59407, 59436, 59466, 59495, 59525, 59554, 59584, 59613, 59643, 59672, 59702, 59731, 59761, 59791, 59820, 59850, 59879, 59909, 59939, 59968, 59997, 60027, 60056, 60086, 60115, 60145, 60174, 60204, 60234, 60264, 60293, 60323, 60352, 60381, 60411, 60440, 60469, 60499, 60528, 60558, 60588, 60618, 60648, 60677, 60707, 60736, 60765, 60795, 60824, 60853, 60883, 60912, 60942, 60972, 61002, 61031, 61061, 61090, 61120, 61149, 61179, 61208, 61237, 61267, 61296, 61326, 61356, 61385, 61415, 61445, 61474, 61504, 61533, 61563, 61592, 61621, 61651, 61680, 61710, 61739, 61769, 61799, 61828, 61858, 61888, 61917, 61947, 61976, 62006, 62035, 62064, 62094, 62123, 62153, 62182, 62212, 62242, 62271, 62301, 62331, 62360, 62390, 62419, 62448, 62478, 62507, 62537, 62566, 62596, 62625, 62655, 62685, 62715, 62744, 62774, 62803, 62832, 62862, 62891, 62921, 62950, 62980, 63009, 63039, 63069, 63099, 63128, 63157, 63187, 63216, 63246, 63275, 63305, 63334, 63363, 63393, 63423, 63453, 63482, 63512, 63541, 63571, 63600, 63630, 63659, 63689, 63718, 63747, 63777, 63807, 63836, 63866, 63895, 63925, 63955, 63984, 64014, 64043, 64073, 64102, 64131, 64161, 64190, 64220, 64249, 64279, 64309, 64339, 64368, 64398, 64427, 64457, 64486, 64515, 64545, 64574, 64603, 64633, 64663, 64692, 64722, 64752, 64782, 64811, 64841, 64870, 64899, 64929, 64958, 64987, 65017, 65047, 65076, 65106, 65136, 65166, 65195, 65225, 65254, 65283, 65313, 65342, 65371, 65401, 65431, 65460, 65490, 65520, 65549, 65579, 65608, 65638, 65667, 65697, 65726, 65755, 65785, 65815, 65844, 65874, 65903, 65933, 65963, 65992, 66022, 66051, 66081, 66110, 66140, 66169, 66199, 66228, 66258, 66287, 66317, 66346, 66376, 66405, 66435, 66465, 66494, 66524, 66553, 66583, 66612, 66641, 66671, 66700, 66730, 66760, 66789, 66819, 66849, 66878, 66908, 66937, 66967, 66996, 67025, 67055, 67084, 67114, 67143, 67173, 67203, 67233, 67262, 67292, 67321, 67351, 67380, 67409, 67439, 67468, 67497, 67527, 67557, 67587, 67617, 67646, 67676, 67705, 67735, 67764, 67793, 67823, 67852, 67882, 67911, 67941, 67971, 68e3, 68030, 68060, 68089, 68119, 68148, 68177, 68207, 68236, 68266, 68295, 68325, 68354, 68384, 68414, 68443, 68473, 68502, 68532, 68561, 68591, 68620, 68650, 68679, 68708, 68738, 68768, 68797, 68827, 68857, 68886, 68916, 68946, 68975, 69004, 69034, 69063, 69092, 69122, 69152, 69181, 69211, 69240, 69270, 69300, 69330, 69359, 69388, 69418, 69447, 69476, 69506, 69535, 69565, 69595, 69624, 69654, 69684, 69713, 69743, 69772, 69802, 69831, 69861, 69890, 69919, 69949, 69978, 70008, 70038, 70067, 70097, 70126, 70156, 70186, 70215, 70245, 70274, 70303, 70333, 70362, 70392, 70421, 70451, 70481, 70510, 70540, 70570, 70599, 70629, 70658, 70687, 70717, 70746, 70776, 70805, 70835, 70864, 70894, 70924, 70954, 70983, 71013, 71042, 71071, 71101, 71130, 71159, 71189, 71218, 71248, 71278, 71308, 71337, 71367, 71397, 71426, 71455, 71485, 71514, 71543, 71573, 71602, 71632, 71662, 71691, 71721, 71751, 71781, 71810, 71839, 71869, 71898, 71927, 71957, 71986, 72016, 72046, 72075, 72105, 72135, 72164, 72194, 72223, 72253, 72282, 72311, 72341, 72370, 72400, 72429, 72459, 72489, 72518, 72548, 72577, 72607, 72637, 72666, 72695, 72725, 72754, 72784, 72813, 72843, 72872, 72902, 72931, 72961, 72991, 73020, 73050, 73080, 73109, 73139, 73168, 73197, 73227, 73256, 73286, 73315, 73345, 73375, 73404, 73434, 73464, 73493, 73523, 73552, 73581, 73611, 73640, 73669, 73699, 73729, 73758, 73788, 73818, 73848, 73877, 73907, 73936, 73965, 73995, 74024, 74053, 74083, 74113, 74142, 74172, 74202, 74231, 74261, 74291, 74320, 74349, 74379, 74408, 74437, 74467, 74497, 74526, 74556, 74586, 74615, 74645, 74675, 74704, 74733, 74763, 74792, 74822, 74851, 74881, 74910, 74940, 74969, 74999, 75029, 75058, 75088, 75117, 75147, 75176, 75206, 75235, 75264, 75294, 75323, 75353, 75383, 75412, 75442, 75472, 75501, 75531, 75560, 75590, 75619, 75648, 75678, 75707, 75737, 75766, 75796, 75826, 75856, 75885, 75915, 75944, 75974, 76003, 76032, 76062, 76091, 76121, 76150, 76180, 76210, 76239, 76269, 76299, 76328, 76358, 76387, 76416, 76446, 76475, 76505, 76534, 76564, 76593, 76623, 76653, 76682, 76712, 76741, 76771, 76801, 76830, 76859, 76889, 76918, 76948, 76977, 77007, 77036, 77066, 77096, 77125, 77155, 77185, 77214, 77243, 77273, 77302, 77332, 77361, 77390, 77420, 77450, 77479, 77509, 77539, 77569, 77598, 77627, 77657, 77686, 77715, 77745, 77774, 77804, 77833, 77863, 77893, 77923, 77952, 77982, 78011, 78041, 78070, 78099, 78129, 78158, 78188, 78217, 78247, 78277, 78307, 78336, 78366, 78395, 78425, 78454, 78483, 78513, 78542, 78572, 78601, 78631, 78661, 78690, 78720, 78750, 78779, 78808, 78838, 78867, 78897, 78926, 78956, 78985, 79015, 79044, 79074, 79104, 79133, 79163, 79192, 79222, 79251, 79281, 79310, 79340, 79369, 79399, 79428, 79458, 79487, 79517, 79546, 79576, 79606, 79635, 79665, 79695, 79724, 79753, 79783, 79812, 79841, 79871, 79900, 79930, 79960, 79990];
  function getHijriDate(gDate) {
    var day = gDate.getDate();
    var month2 = gDate.getMonth();
    var year = gDate.getFullYear();
    var tMonth = month2 + 1;
    var tYear = year;
    if (tMonth < 3) {
      tYear -= 1;
      tMonth += 12;
    }
    var yPrefix = Math.floor(tYear / 100);
    var julilanOffset = yPrefix - Math.floor(yPrefix / 4) - 2;
    var julianNumber = Math.floor(365.25 * (tYear + 4716)) + Math.floor(30.6001 * (tMonth + 1)) + day - julilanOffset - 1524;
    yPrefix = Math.floor((julianNumber - 186721625e-2) / 36524.25);
    julilanOffset = yPrefix - Math.floor(yPrefix / 4) + 1;
    var b = julianNumber + julilanOffset + 1524;
    var c = Math.floor((b - 122.1) / 365.25);
    var d = Math.floor(365.25 * c);
    var tempMonth = Math.floor((b - d) / 30.6001);
    day = b - d - Math.floor(30.6001 * tempMonth);
    month2 = Math.floor((b - d) / 20.6001);
    if (month2 > 13) {
      c += 1;
      month2 -= 12;
    }
    month2 -= 1;
    year = c - 4716;
    var modifiedJulianDate = julianNumber - 24e5;
    var iyear = 10631 / 30;
    var z = julianNumber - 1948084;
    var cyc = Math.floor(z / 10631);
    z = z - 10631 * cyc;
    var j = Math.floor((z - 0.1335) / iyear);
    var iy = 30 * cyc + j;
    z = z - Math.floor(j * iyear + 0.1335);
    var im = Math.floor((z + 28.5001) / 29.5);
    if (im === 13) {
      im = 12;
    }
    var tempDay = z - Math.floor(29.5001 * im - 29);
    var i = 0;
    for (; i < dateCorrection.length; i++) {
      if (dateCorrection[parseInt(i.toString(), 10)] > modifiedJulianDate) {
        break;
      }
    }
    var iln = i + 16260;
    var ii = Math.floor((iln - 1) / 12);
    var hYear = ii + 1;
    var hmonth = iln - 12 * ii;
    var hDate = modifiedJulianDate - dateCorrection[i - 1] + 1;
    if ((hDate + "").length > 2) {
      hDate = tempDay;
      hmonth = im;
      hYear = iy;
    }
    return {
      year: hYear,
      month: hmonth,
      date: hDate
    };
  }
  HijriParser2.getHijriDate = getHijriDate;
  function toGregorian(year, month2, day) {
    var iy = year;
    var im = month2;
    var id = day;
    var ii = iy - 1;
    var iln = ii * 12 + 1 + (im - 1);
    var i = iln - 16260;
    var mcjdn = id + dateCorrection[i - 1] - 1;
    var julianDate = mcjdn + 24e5;
    var z = Math.floor(julianDate + 0.5);
    var a = Math.floor((z - 186721625e-2) / 36524.25);
    a = z + 1 + a - Math.floor(a / 4);
    var b = a + 1524;
    var c = Math.floor((b - 122.1) / 365.25);
    var d = Math.floor(365.25 * c);
    var e = Math.floor((b - d) / 30.6001);
    var gDay = b - d - Math.floor(e * 30.6001);
    var gMonth = e - (e > 13.5 ? 13 : 1);
    var gYear = c - (gMonth > 2.5 ? 4716 : 4715);
    if (gYear <= 0) {
      gMonth--;
    }
    return /* @__PURE__ */ new Date(gYear + "/" + gMonth + "/" + gDay);
  }
  HijriParser2.toGregorian = toGregorian;
})(HijriParser || (HijriParser = {}));

// node_modules/@syncfusion/ej2-base/src/intl/date-formatter.js
var abbreviateRegexGlobal = /\/MMMMM|MMMM|MMM|a|LLLL|LLL|EEEEE|EEEE|E|K|cccc|ccc|WW|W|G+|z+/gi;
var standalone = "stand-alone";
var weekdayKey = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
var timeSetter = {
  m: "getMinutes",
  h: "getHours",
  H: "getHours",
  s: "getSeconds",
  d: "getDate",
  f: "getMilliseconds"
};
var datePartMatcher = {
  "M": "month",
  "d": "day",
  "E": "weekday",
  "c": "weekday",
  "y": "year",
  "m": "minute",
  "h": "hour",
  "H": "hour",
  "s": "second",
  "L": "month",
  "a": "designator",
  "z": "timeZone",
  "Z": "timeZone",
  "G": "era",
  "f": "milliseconds"
};
var timeSeparator = "timeSeparator";
var DateFormat = (
  /** @class */
  function() {
    function DateFormat2() {
    }
    DateFormat2.dateFormat = function(culture, option, cldr) {
      var _this = this;
      var dependable = IntlBase.getDependables(cldr, culture, option.calendar);
      var numObject = getValue("parserObject.numbers", dependable);
      var dateObject = dependable.dateObject;
      var formatOptions = {
        isIslamic: IntlBase.islamicRegex.test(option.calendar)
      };
      if (isBlazor() && option.isServerRendered) {
        option = IntlBase.compareBlazorDateFormats(option, culture);
      }
      var resPattern = option.format || IntlBase.getResultantPattern(option.skeleton, dependable.dateObject, option.type, false, isBlazor() ? culture : "");
      formatOptions.dateSeperator = isBlazor() ? getValue("dateSeperator", dateObject) : IntlBase.getDateSeparator(dependable.dateObject);
      if (isUndefined(resPattern)) {
        throwError("Format options or type given must be invalid");
      } else {
        resPattern = IntlBase.ConvertDateToWeekFormat(resPattern);
        if (isBlazor()) {
          resPattern = resPattern.replace(/tt/, "a");
        }
        formatOptions.pattern = resPattern;
        formatOptions.numMapper = isBlazor() ? extend({}, numObject) : ParserBase.getNumberMapper(dependable.parserObject, ParserBase.getNumberingSystem(cldr));
        var patternMatch = resPattern.match(abbreviateRegexGlobal) || [];
        for (var _i = 0, patternMatch_1 = patternMatch; _i < patternMatch_1.length; _i++) {
          var str = patternMatch_1[_i];
          var len = str.length;
          var char = str[0];
          if (char === "K") {
            char = "h";
          }
          switch (char) {
            case "E":
            case "c":
              if (isBlazor()) {
                formatOptions.weekday = getValue("days." + IntlBase.monthIndex["" + len], dateObject);
              } else {
                formatOptions.weekday = dependable.dateObject["" + IntlBase.days]["" + standalone][IntlBase.monthIndex["" + len]];
              }
              break;
            case "M":
            case "L":
              if (isBlazor()) {
                formatOptions.month = getValue("months." + IntlBase.monthIndex["" + len], dateObject);
              } else {
                formatOptions.month = dependable.dateObject["" + IntlBase.month]["" + standalone][IntlBase.monthIndex["" + len]];
              }
              break;
            case "a":
              formatOptions.designator = isBlazor() ? getValue("dayPeriods", dateObject) : getValue("dayPeriods.format.wide", dateObject);
              break;
            case "G": {
              var eText = len <= 3 ? "eraAbbr" : len === 4 ? "eraNames" : "eraNarrow";
              formatOptions.era = isBlazor() ? getValue("eras", dateObject) : getValue("eras." + eText, dependable.dateObject);
              break;
            }
            case "z":
              formatOptions.timeZone = getValue("dates.timeZoneNames", dependable.parserObject);
              break;
          }
        }
      }
      return function(value) {
        if (isNaN(value.getDate())) {
          return null;
        }
        return _this.intDateFormatter(value, formatOptions);
      };
    };
    DateFormat2.intDateFormatter = function(value, options) {
      var pattern = options.pattern;
      var ret = "";
      var matches2 = pattern.match(IntlBase.dateParseRegex);
      var dObject = this.getCurrentDateValue(value, options.isIslamic);
      for (var _i = 0, matches_1 = matches2; _i < matches_1.length; _i++) {
        var match = matches_1[_i];
        var length_1 = match.length;
        var char = match[0];
        if (char === "K") {
          char = "h";
        }
        var curval = void 0;
        var curvalstr = "";
        var isNumber = void 0;
        var processNumber = void 0;
        var curstr = "";
        switch (char) {
          case "M":
          case "L":
            curval = dObject.month;
            if (length_1 > 2) {
              ret += options.month["" + curval];
            } else {
              isNumber = true;
            }
            break;
          case "E":
          case "c":
            ret += options.weekday["" + weekdayKey[value.getDay()]];
            break;
          case "H":
          case "h":
          case "m":
          case "s":
          case "d":
          case "f":
            isNumber = true;
            if (char === "d") {
              curval = dObject.date;
            } else if (char === "f") {
              isNumber = false;
              processNumber = true;
              curvalstr = value["" + timeSetter["" + char]]().toString();
              curvalstr = curvalstr.substring(0, length_1);
              var curlength = curvalstr.length;
              if (length_1 !== curlength) {
                if (length_1 > 3) {
                  continue;
                }
                for (var i = 0; i < length_1 - curlength; i++) {
                  curvalstr = "0" + curvalstr.toString();
                }
              }
              curstr += curvalstr;
            } else {
              curval = value["" + timeSetter["" + char]]();
            }
            if (char === "h") {
              curval = curval % 12 || 12;
            }
            break;
          case "y":
            processNumber = true;
            curstr += dObject.year;
            if (length_1 === 2) {
              curstr = curstr.substr(curstr.length - 2);
            }
            break;
          case "a": {
            var desig = value.getHours() < 12 ? "am" : "pm";
            ret += options.designator["" + desig];
            break;
          }
          case "G": {
            var dec = value.getFullYear() < 0 ? 0 : 1;
            var retu = options.era["" + dec];
            if (isNullOrUndefined(retu)) {
              retu = options.era[dec ? 0 : 1];
            }
            ret += retu || "";
            break;
          }
          case "'":
            ret += match === "''" ? "'" : match.replace(/'/g, "");
            break;
          case "z": {
            var timezone = value.getTimezoneOffset();
            var pattern_1 = length_1 < 4 ? "+H;-H" : options.timeZone.hourFormat;
            pattern_1 = pattern_1.replace(/:/g, options.numMapper.timeSeparator);
            if (timezone === 0) {
              ret += options.timeZone.gmtZeroFormat;
            } else {
              processNumber = true;
              curstr = this.getTimeZoneValue(timezone, pattern_1);
            }
            curstr = options.timeZone.gmtFormat.replace(/\{0\}/, curstr);
            break;
          }
          case ":":
            ret += options.numMapper.numberSymbols["" + timeSeparator];
            break;
          case "/":
            ret += options.dateSeperator;
            break;
          case "W":
            isNumber = true;
            curval = IntlBase.getWeekOfYear(value);
            break;
          default:
            ret += match;
        }
        if (isNumber) {
          processNumber = true;
          curstr = this.checkTwodigitNumber(curval, length_1);
        }
        if (processNumber) {
          ret += ParserBase.convertValueParts(curstr, IntlBase.latnParseRegex, options.numMapper.mapper);
        }
      }
      return ret;
    };
    DateFormat2.getCurrentDateValue = function(value, isIslamic) {
      if (isIslamic) {
        return HijriParser.getHijriDate(value);
      }
      return {
        year: value.getFullYear(),
        month: value.getMonth() + 1,
        date: value.getDate()
      };
    };
    DateFormat2.checkTwodigitNumber = function(val, len) {
      var ret = val + "";
      if (len === 2 && ret.length !== 2) {
        return "0" + ret;
      }
      return ret;
    };
    DateFormat2.getTimeZoneValue = function(tVal, pattern) {
      var _this = this;
      var splt = pattern.split(";");
      var curPattern = splt[tVal > 0 ? 1 : 0];
      var no = Math.abs(tVal);
      return curPattern = curPattern.replace(/HH?|mm/g, function(str) {
        var len = str.length;
        var ishour = str.indexOf("H") !== -1;
        return _this.checkTwodigitNumber(Math.floor(ishour ? no / 60 : no % 60), len);
      });
    };
    return DateFormat2;
  }()
);

// node_modules/@syncfusion/ej2-base/src/intl/number-formatter.js
var errorText = {
  "ms": "minimumSignificantDigits",
  "ls": "maximumSignificantDigits",
  "mf": "minimumFractionDigits",
  "lf": "maximumFractionDigits"
};
var percentSign = "percentSign";
var minusSign = "minusSign";
var mapper = ["infinity", "nan", "group", "decimal", "exponential"];
var NumberFormat = (
  /** @class */
  function() {
    function NumberFormat2() {
    }
    NumberFormat2.numberFormatter = function(culture, option, cldr) {
      var _this = this;
      var fOptions = extend({}, option);
      var cOptions = {};
      var dOptions = {};
      var symbolPattern;
      var dependable = IntlBase.getDependables(cldr, culture, "", true);
      var numObject = dependable.numericObject;
      dOptions.numberMapper = isBlazor() ? extend({}, numObject) : ParserBase.getNumberMapper(dependable.parserObject, ParserBase.getNumberingSystem(cldr), true);
      dOptions.currencySymbol = isBlazor() ? getValue("currencySymbol", numObject) : IntlBase.getCurrencySymbol(dependable.numericObject, fOptions.currency || defaultCurrencyCode, option.altSymbol, option.ignoreCurrency);
      dOptions.percentSymbol = isBlazor() ? getValue("numberSymbols.percentSign", numObject) : dOptions.numberMapper.numberSymbols["" + percentSign];
      dOptions.minusSymbol = isBlazor() ? getValue("numberSymbols.minusSign", numObject) : dOptions.numberMapper.numberSymbols["" + minusSign];
      var symbols = dOptions.numberMapper.numberSymbols;
      if (option.format && !IntlBase.formatRegex.test(option.format)) {
        cOptions = IntlBase.customFormat(option.format, dOptions, dependable.numericObject);
        if (!isUndefined(fOptions.useGrouping) && fOptions.useGrouping) {
          fOptions.useGrouping = cOptions.pData.useGrouping;
        }
      } else {
        extend(fOptions, IntlBase.getProperNumericSkeleton(option.format || "N"));
        fOptions.isCurrency = fOptions.type === "currency";
        fOptions.isPercent = fOptions.type === "percent";
        if (!isBlazor()) {
          symbolPattern = IntlBase.getSymbolPattern(fOptions.type, dOptions.numberMapper.numberSystem, dependable.numericObject, fOptions.isAccount);
        }
        fOptions.groupOne = this.checkValueRange(fOptions.maximumSignificantDigits, fOptions.minimumSignificantDigits, true);
        this.checkValueRange(fOptions.maximumFractionDigits, fOptions.minimumFractionDigits, false, true);
        if (!isUndefined(fOptions.fractionDigits)) {
          fOptions.minimumFractionDigits = fOptions.maximumFractionDigits = fOptions.fractionDigits;
        }
        if (isUndefined(fOptions.useGrouping)) {
          fOptions.useGrouping = true;
        }
        if (fOptions.isCurrency && !isBlazor()) {
          symbolPattern = symbolPattern.replace(/\u00A4/g, IntlBase.defaultCurrency);
        }
        if (!isBlazor()) {
          var split = symbolPattern.split(";");
          cOptions.nData = IntlBase.getFormatData(split[1] || "-" + split[0], true, dOptions.currencySymbol);
          cOptions.pData = IntlBase.getFormatData(split[0], false, dOptions.currencySymbol);
          if (fOptions.useGrouping) {
            fOptions.groupSeparator = symbols[mapper[2]];
            fOptions.groupData = this.getGroupingDetails(split[0]);
          }
        } else {
          cOptions.nData = extend({}, {}, getValue(fOptions.type + "nData", numObject));
          cOptions.pData = extend({}, {}, getValue(fOptions.type + "pData", numObject));
          if (fOptions.type === "currency" && option.currency) {
            IntlBase.replaceBlazorCurrency([cOptions.pData, cOptions.nData], dOptions.currencySymbol, option.currency);
          }
        }
        var minFrac = isUndefined(fOptions.minimumFractionDigits);
        if (minFrac) {
          fOptions.minimumFractionDigits = cOptions.nData.minimumFraction;
        }
        if (isUndefined(fOptions.maximumFractionDigits)) {
          var mval = cOptions.nData.maximumFraction;
          fOptions.maximumFractionDigits = isUndefined(mval) && fOptions.isPercent ? 0 : mval;
        }
        var mfrac = fOptions.minimumFractionDigits;
        var lfrac = fOptions.maximumFractionDigits;
        if (!isUndefined(mfrac) && !isUndefined(lfrac)) {
          if (mfrac > lfrac) {
            fOptions.maximumFractionDigits = mfrac;
          }
        }
      }
      extend(cOptions.nData, fOptions);
      extend(cOptions.pData, fOptions);
      return function(value) {
        if (isNaN(value)) {
          return symbols[mapper[1]];
        } else if (!isFinite(value)) {
          return symbols[mapper[0]];
        }
        return _this.intNumberFormatter(value, cOptions, dOptions, option);
      };
    };
    NumberFormat2.getGroupingDetails = function(pattern) {
      var ret = {};
      var match = pattern.match(IntlBase.negativeDataRegex);
      if (match && match[4]) {
        var pattern_1 = match[4];
        var p = pattern_1.lastIndexOf(",");
        if (p !== -1) {
          var temp = pattern_1.split(".")[0];
          ret.primary = temp.length - p - 1;
          var s = pattern_1.lastIndexOf(",", p - 1);
          if (s !== -1) {
            ret.secondary = p - 1 - s;
          }
        }
      }
      return ret;
    };
    NumberFormat2.checkValueRange = function(val1, val2, checkbothExist, isFraction) {
      var decide = isFraction ? "f" : "s";
      var dint = 0;
      var str1 = errorText["l" + decide];
      var str2 = errorText["m" + decide];
      if (!isUndefined(val1)) {
        this.checkRange(val1, str1, isFraction);
        dint++;
      }
      if (!isUndefined(val2)) {
        this.checkRange(val2, str2, isFraction);
        dint++;
      }
      if (dint === 2) {
        if (val1 < val2) {
          throwError(str2 + "specified must be less than the" + str1);
        } else {
          return true;
        }
      } else if (checkbothExist && dint === 1) {
        throwError("Both" + str2 + "and" + str2 + "must be present");
      }
      return false;
    };
    NumberFormat2.checkRange = function(val, text, isFraction) {
      var range = isFraction ? [0, 20] : [1, 21];
      if (val < range[0] || val > range[1]) {
        throwError(text + "value must be within the range" + range[0] + "to" + range[1]);
      }
    };
    NumberFormat2.intNumberFormatter = function(value, fOptions, dOptions, option) {
      var curData;
      if (isUndefined(fOptions.nData.type)) {
        return void 0;
      } else {
        if (value < 0) {
          value = value * -1;
          curData = fOptions.nData;
        } else if (value === 0) {
          curData = fOptions.zeroData || fOptions.pData;
        } else {
          curData = fOptions.pData;
        }
        var fValue = "";
        if (curData.isPercent) {
          value = value * 100;
        }
        if (curData.groupOne) {
          fValue = this.processSignificantDigits(value, curData.minimumSignificantDigits, curData.maximumSignificantDigits);
        } else {
          fValue = this.processFraction(value, curData.minimumFractionDigits, curData.maximumFractionDigits, option);
          if (curData.minimumIntegerDigits) {
            fValue = this.processMinimumIntegers(fValue, curData.minimumIntegerDigits);
          }
          if (dOptions.isCustomFormat && curData.minimumFractionDigits < curData.maximumFractionDigits && /\d+\.\d+/.test(fValue)) {
            var temp = fValue.split(".");
            var decimalPart = temp[1];
            var len = decimalPart.length;
            for (var i = len - 1; i >= 0; i--) {
              if (decimalPart[parseInt(i.toString(), 10)] === "0" && i >= curData.minimumFractionDigits) {
                decimalPart = decimalPart.slice(0, i);
              } else {
                break;
              }
            }
            fValue = temp[0] + "." + decimalPart;
          }
        }
        if (curData.type === "scientific") {
          fValue = value.toExponential(curData.maximumFractionDigits);
          fValue = fValue.replace("e", dOptions.numberMapper.numberSymbols[mapper[4]]);
        }
        fValue = fValue.replace(".", dOptions.numberMapper.numberSymbols[mapper[3]]);
        fValue = curData.format === "#,###,,;(#,###,,)" ? this.customPivotFormat(parseInt(fValue, 10)) : fValue;
        if (curData.useGrouping) {
          fValue = this.groupNumbers(fValue, curData.groupData.primary, curData.groupSeparator || ",", dOptions.numberMapper.numberSymbols[mapper[3]] || ".", curData.groupData.secondary);
        }
        fValue = ParserBase.convertValueParts(fValue, IntlBase.latnParseRegex, dOptions.numberMapper.mapper);
        if (curData.nlead === "N/A") {
          return curData.nlead;
        } else {
          if (fValue === "0" && option && option.format === "0") {
            return fValue + curData.nend;
          }
          return curData.nlead + fValue + curData.nend;
        }
      }
    };
    NumberFormat2.processSignificantDigits = function(value, min, max) {
      var temp = value + "";
      var tn;
      var length = temp.length;
      if (length < min) {
        return value.toPrecision(min);
      } else {
        temp = value.toPrecision(max);
        tn = +temp;
        return tn + "";
      }
    };
    NumberFormat2.groupNumbers = function(val, level1, sep, decimalSymbol, level2) {
      var flag = !isNullOrUndefined(level2) && level2 !== 0;
      var split = val.split(decimalSymbol);
      var prefix = split[0];
      var length = prefix.length;
      var str = "";
      while (length > level1) {
        str = prefix.slice(length - level1, length) + (str.length ? sep + str : "");
        length -= level1;
        if (flag) {
          level1 = level2;
          flag = false;
        }
      }
      split[0] = prefix.slice(0, length) + (str.length ? sep : "") + str;
      return split.join(decimalSymbol);
    };
    NumberFormat2.processFraction = function(value, min, max, option) {
      var temp = (value + "").split(".")[1];
      var length = temp ? temp.length : 0;
      if (min && length < min) {
        var ret = "";
        if (length === 0) {
          ret = value.toFixed(min);
        } else {
          ret += value;
          for (var j = 0; j < min - length; j++) {
            ret += "0";
          }
          return ret;
        }
        return value.toFixed(min);
      } else if (!isNullOrUndefined(max) && (length > max || max === 0)) {
        return value.toFixed(max);
      }
      var str = value + "";
      if (str[0] === "0" && option && option.format === "###.00") {
        str = str.slice(1);
      }
      return str;
    };
    NumberFormat2.processMinimumIntegers = function(value, min) {
      var temp = value.split(".");
      var lead = temp[0];
      var len = lead.length;
      if (len < min) {
        for (var i = 0; i < min - len; i++) {
          lead = "0" + lead;
        }
        temp[0] = lead;
      }
      return temp.join(".");
    };
    NumberFormat2.customPivotFormat = function(value) {
      if (value >= 5e5) {
        value /= 1e6;
        var _a = value.toString().split("."), integer = _a[0], decimal = _a[1];
        return decimal && +decimal.substring(0, 1) >= 5 ? Math.ceil(value).toString() : Math.floor(value).toString();
      }
      return "";
    };
    return NumberFormat2;
  }()
);

// node_modules/@syncfusion/ej2-base/src/intl/date-parser.js
var standalone2 = "stand-alone";
var latnRegex = /^[0-9]*$/;
var timeSetter2 = {
  minute: "setMinutes",
  hour: "setHours",
  second: "setSeconds",
  day: "setDate",
  month: "setMonth",
  milliseconds: "setMilliseconds"
};
var month = "months";
var DateParser = (
  /** @class */
  function() {
    function DateParser2() {
    }
    DateParser2.dateParser = function(culture, option, cldr) {
      var _this = this;
      var dependable = IntlBase.getDependables(cldr, culture, option.calendar);
      var numOptions = ParserBase.getCurrentNumericOptions(dependable.parserObject, ParserBase.getNumberingSystem(cldr), false, isBlazor());
      var parseOptions = {};
      if (isBlazor() && option.isServerRendered) {
        option = IntlBase.compareBlazorDateFormats(option, culture);
      }
      var resPattern = option.format || IntlBase.getResultantPattern(option.skeleton, dependable.dateObject, option.type, false, isBlazor() ? culture : "");
      var regexString = "";
      var hourOnly;
      if (isUndefined(resPattern)) {
        throwError("Format options or type given must be invalid");
      } else {
        resPattern = IntlBase.ConvertDateToWeekFormat(resPattern);
        parseOptions = {
          isIslamic: IntlBase.islamicRegex.test(option.calendar),
          pattern: resPattern,
          evalposition: {},
          culture
        };
        var patternMatch = resPattern.match(IntlBase.dateParseRegex) || [];
        var length_1 = patternMatch.length;
        var gmtCorrection = 0;
        var zCorrectTemp = 0;
        var isgmtTraversed = false;
        var nRegx = numOptions.numericRegex;
        var numMapper = isBlazor() ? dependable.parserObject.numbers : ParserBase.getNumberMapper(dependable.parserObject, ParserBase.getNumberingSystem(cldr));
        for (var i = 0; i < length_1; i++) {
          var str = patternMatch[parseInt(i.toString(), 10)];
          var len = str.length;
          var char = str[0] === "K" ? "h" : str[0];
          var isNumber = void 0;
          var canUpdate = void 0;
          var charKey = datePartMatcher["" + char];
          var optional = len === 2 ? "" : "?";
          if (isgmtTraversed) {
            gmtCorrection = zCorrectTemp;
            isgmtTraversed = false;
          }
          switch (char) {
            case "E":
            case "c": {
              var weekData = void 0;
              if (isBlazor()) {
                weekData = getValue("days." + IntlBase.monthIndex["" + len], dependable.dateObject);
              } else {
                weekData = dependable.dateObject["" + IntlBase.days]["" + standalone2][IntlBase.monthIndex["" + len]];
              }
              var weekObject = ParserBase.reverseObject(weekData);
              regexString += "(" + Object.keys(weekObject).join("|") + ")";
              break;
            }
            case "M":
            case "L":
            case "d":
            case "m":
            case "s":
            case "h":
            case "H":
            case "f":
              canUpdate = true;
              if ((char === "M" || char === "L") && len > 2) {
                var monthData = void 0;
                if (isBlazor()) {
                  monthData = getValue("months." + IntlBase.monthIndex["" + len], dependable.dateObject);
                } else {
                  monthData = dependable.dateObject["" + month]["" + standalone2][IntlBase.monthIndex["" + len]];
                }
                parseOptions["" + charKey] = ParserBase.reverseObject(monthData);
                regexString += "(" + Object.keys(parseOptions["" + charKey]).join("|") + ")";
              } else if (char === "f") {
                if (len > 3) {
                  continue;
                }
                isNumber = true;
                regexString += "(" + nRegx + nRegx + "?" + nRegx + "?)";
              } else {
                isNumber = true;
                regexString += "(" + nRegx + nRegx + optional + ")";
              }
              if (char === "h") {
                parseOptions.hour12 = true;
              }
              break;
            case "W": {
              var opt = len === 1 ? "?" : "";
              regexString += "(" + nRegx + opt + nRegx + ")";
              break;
            }
            case "y":
              canUpdate = isNumber = true;
              if (len === 2) {
                regexString += "(" + nRegx + nRegx + ")";
              } else {
                regexString += "(" + nRegx + "{" + len + ",})";
              }
              break;
            case "a": {
              canUpdate = true;
              var periodValur = isBlazor() ? getValue("dayPeriods", dependable.dateObject) : getValue("dayPeriods.format.wide", dependable.dateObject);
              parseOptions["" + charKey] = ParserBase.reverseObject(periodValur);
              regexString += "(" + Object.keys(parseOptions["" + charKey]).join("|") + ")";
              break;
            }
            case "G": {
              canUpdate = true;
              var eText = len <= 3 ? "eraAbbr" : len === 4 ? "eraNames" : "eraNarrow";
              parseOptions["" + charKey] = ParserBase.reverseObject(isBlazor() ? getValue("eras", dependable.dateObject) : getValue("eras." + eText, dependable.dateObject));
              regexString += "(" + Object.keys(parseOptions["" + charKey]).join("|") + "?)";
              break;
            }
            case "z": {
              var tval = (/* @__PURE__ */ new Date()).getTimezoneOffset();
              canUpdate = tval !== 0;
              parseOptions["" + charKey] = getValue("dates.timeZoneNames", dependable.parserObject);
              var tzone = parseOptions["" + charKey];
              hourOnly = len < 4;
              var hpattern = hourOnly ? "+H;-H" : tzone.hourFormat;
              hpattern = hpattern.replace(/:/g, numMapper.timeSeparator);
              regexString += "(" + this.parseTimeZoneRegx(hpattern, tzone, nRegx) + ")?";
              isgmtTraversed = true;
              zCorrectTemp = hourOnly ? 6 : 12;
              break;
            }
            case "'": {
              var iString = str.replace(/'/g, "");
              regexString += "(" + iString + ")?";
              break;
            }
            default:
              regexString += "([\\D])";
              break;
          }
          if (canUpdate) {
            parseOptions.evalposition["" + charKey] = {
              isNumber,
              pos: i + 1 + gmtCorrection,
              hourOnly
            };
          }
          if (i === length_1 - 1 && !isNullOrUndefined(regexString)) {
            var regExp3 = RegExp;
            parseOptions.parserRegex = new regExp3("^" + regexString + "$", "i");
          }
        }
      }
      return function(value) {
        var parsedDateParts = _this.internalDateParse(value, parseOptions, numOptions);
        if (isNullOrUndefined(parsedDateParts) || !Object.keys(parsedDateParts).length) {
          return null;
        }
        if (parseOptions.isIslamic) {
          var dobj = {};
          var tYear = parsedDateParts.year;
          var tDate = parsedDateParts.day;
          var tMonth = parsedDateParts.month;
          var ystrig = tYear ? tYear + "" : "";
          var is2DigitYear = ystrig.length === 2;
          if (!tYear || !tMonth || !tDate || is2DigitYear) {
            dobj = HijriParser.getHijriDate(/* @__PURE__ */ new Date());
          }
          if (is2DigitYear) {
            tYear = parseInt((dobj.year + "").slice(0, 2) + ystrig, 10);
          }
          var dateObject = HijriParser.toGregorian(tYear || dobj.year, tMonth || dobj.month, tDate || dobj.date);
          parsedDateParts.year = dateObject.getFullYear();
          parsedDateParts.month = dateObject.getMonth() + 1;
          parsedDateParts.day = dateObject.getDate();
        }
        return _this.getDateObject(parsedDateParts);
      };
    };
    DateParser2.getDateObject = function(options, value) {
      var res = value || /* @__PURE__ */ new Date();
      res.setMilliseconds(0);
      var tKeys = ["hour", "minute", "second", "milliseconds", "month", "day"];
      var y = options.year;
      var desig = options.designator;
      var tzone = options.timeZone;
      if (!isUndefined(y)) {
        var len = (y + "").length;
        if (len <= 2) {
          var century = Math.floor(res.getFullYear() / 100) * 100;
          y += century;
        }
        res.setFullYear(y);
      }
      for (var _i = 0, tKeys_1 = tKeys; _i < tKeys_1.length; _i++) {
        var key = tKeys_1[_i];
        var tValue = options["" + key];
        if (isUndefined(tValue) && key === "day") {
          res.setDate(1);
        }
        if (!isUndefined(tValue)) {
          if (key === "month") {
            tValue -= 1;
            if (tValue < 0 || tValue > 11) {
              return /* @__PURE__ */ new Date("invalid");
            }
            var pDate = res.getDate();
            res.setDate(1);
            res[timeSetter2["" + key]](tValue);
            var lDate = new Date(res.getFullYear(), tValue + 1, 0).getDate();
            res.setDate(pDate < lDate ? pDate : lDate);
          } else {
            if (key === "day") {
              var lastDay = new Date(res.getFullYear(), res.getMonth() + 1, 0).getDate();
              if (tValue < 1 || tValue > lastDay) {
                return null;
              }
            }
            res["" + timeSetter2["" + key]](tValue);
          }
        }
      }
      if (!isUndefined(desig)) {
        var hour = res.getHours();
        if (desig === "pm") {
          res.setHours(hour + (hour === 12 ? 0 : 12));
        } else if (hour === 12) {
          res.setHours(0);
        }
      }
      if (!isUndefined(tzone)) {
        var tzValue = tzone - res.getTimezoneOffset();
        if (tzValue !== 0) {
          res.setMinutes(res.getMinutes() + tzValue);
        }
      }
      return res;
    };
    DateParser2.internalDateParse = function(value, parseOptions, num) {
      var matches2 = value.match(parseOptions.parserRegex);
      var retOptions = {
        "hour": 0,
        "minute": 0,
        "second": 0
      };
      if (isNullOrUndefined(matches2)) {
        return null;
      } else {
        var props = Object.keys(parseOptions.evalposition);
        for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
          var prop = props_1[_i];
          var curObject = parseOptions.evalposition["" + prop];
          var matchString = matches2[curObject.pos];
          if (curObject.isNumber) {
            retOptions["" + prop] = this.internalNumberParser(matchString, num);
          } else {
            if (prop === "timeZone" && !isUndefined(matchString)) {
              var pos = curObject.pos;
              var val = void 0;
              var tmatch = matches2[pos + 1];
              var flag = !isUndefined(tmatch);
              if (curObject.hourOnly) {
                val = this.getZoneValue(flag, tmatch, matches2[pos + 4], num) * 60;
              } else {
                val = this.getZoneValue(flag, tmatch, matches2[pos + 7], num) * 60;
                val += this.getZoneValue(flag, matches2[pos + 4], matches2[pos + 10], num);
              }
              if (!isNullOrUndefined(val)) {
                retOptions["" + prop] = val;
              }
            } else {
              var cultureOptions = ["en-US", "en-MH", "en-MP"];
              matchString = prop === "month" && !parseOptions.isIslamic && (parseOptions.culture === "en" || parseOptions.culture === "en-GB" || parseOptions.culture === "en-US") ? matchString[0].toUpperCase() + matchString.substring(1).toLowerCase() : matchString;
              matchString = prop !== "month" && prop === "designator" && parseOptions.culture && parseOptions.culture.indexOf("en-") !== -1 && cultureOptions.indexOf(parseOptions.culture) === -1 ? matchString.toLowerCase() : matchString;
              retOptions["" + prop] = parseOptions["" + prop]["" + matchString];
            }
          }
        }
        if (parseOptions.hour12) {
          retOptions.hour12 = true;
        }
      }
      return retOptions;
    };
    DateParser2.internalNumberParser = function(value, option) {
      value = ParserBase.convertValueParts(value, option.numberParseRegex, option.numericPair);
      if (latnRegex.test(value)) {
        return +value;
      }
      return null;
    };
    DateParser2.parseTimeZoneRegx = function(hourFormat, tZone, nRegex) {
      var pattern = tZone.gmtFormat;
      var ret;
      var cRegex = "(" + nRegex + ")(" + nRegex + ")";
      ret = hourFormat.replace("+", "\\+");
      if (hourFormat.indexOf("HH") !== -1) {
        ret = ret.replace(/HH|mm/g, "(" + cRegex + ")");
      } else {
        ret = ret.replace(/H|m/g, "(" + cRegex + "?)");
      }
      var splitStr = ret.split(";").map(function(str) {
        return pattern.replace("{0}", str);
      });
      ret = splitStr.join("|") + "|" + tZone.gmtZeroFormat;
      return ret;
    };
    DateParser2.getZoneValue = function(flag, val1, val2, num) {
      var ival = flag ? val1 : val2;
      if (!ival) {
        return 0;
      }
      var value = this.internalNumberParser(ival, num);
      if (flag) {
        return -value;
      }
      return value;
    };
    return DateParser2;
  }()
);

// node_modules/@syncfusion/ej2-base/src/intl/number-parser.js
var regExp = RegExp;
var parseRegex = new regExp("^([^0-9]*)(([0-9,]*[0-9]+)(.[0-9]+)?)([Ee][+-]?[0-9]+)?([^0-9]*)$");
var groupRegex = /,/g;
var keys = ["minusSign", "infinity"];
var NumberParser = (
  /** @class */
  function() {
    function NumberParser2() {
    }
    NumberParser2.numberParser = function(culture, option, cldr) {
      var _this = this;
      var dependable = IntlBase.getDependables(cldr, culture, "", true);
      var parseOptions = {
        custom: true
      };
      if (IntlBase.formatRegex.test(option.format) || !option.format) {
        extend(parseOptions, IntlBase.getProperNumericSkeleton(option.format || "N"));
        parseOptions.custom = false;
        if (!parseOptions.fractionDigits) {
          if (option.maximumFractionDigits) {
            parseOptions.maximumFractionDigits = option.maximumFractionDigits;
          }
        }
      } else {
        extend(parseOptions, IntlBase.customFormat(option.format, null, null));
      }
      var numbers = getValue("numbers", dependable.parserObject);
      var numOptions = ParserBase.getCurrentNumericOptions(dependable.parserObject, ParserBase.getNumberingSystem(cldr), true, isBlazor());
      parseOptions.symbolRegex = ParserBase.getSymbolRegex(Object.keys(numOptions.symbolMatch));
      parseOptions.infinity = numOptions.symbolNumberSystem[keys[1]];
      var symbolpattern;
      if (!isBlazor()) {
        symbolpattern = IntlBase.getSymbolPattern(parseOptions.type, numOptions.numberSystem, dependable.numericObject, parseOptions.isAccount);
        if (symbolpattern) {
          symbolpattern = symbolpattern.replace(/\u00A4/g, IntlBase.defaultCurrency);
          var split = symbolpattern.split(";");
          parseOptions.nData = IntlBase.getFormatData(split[1] || "-" + split[0], true, "");
          parseOptions.pData = IntlBase.getFormatData(split[0], true, "");
        }
      } else {
        parseOptions.nData = extend({}, {}, getValue(parseOptions.type + "nData", numbers));
        parseOptions.pData = extend({}, {}, getValue(parseOptions.type + "pData", numbers));
        if (parseOptions.type === "currency" && option.currency) {
          IntlBase.replaceBlazorCurrency([parseOptions.pData, parseOptions.nData], getValue("currencySymbol", numbers), option.currency);
        }
      }
      return function(value) {
        return _this.getParsedNumber(value, parseOptions, numOptions);
      };
    };
    NumberParser2.getParsedNumber = function(value, options, numOptions) {
      var isNegative;
      var isPercent;
      var tempValue;
      var lead;
      var end;
      var ret;
      if (value.indexOf(options.infinity) !== -1) {
        return Infinity;
      } else {
        value = ParserBase.convertValueParts(value, options.symbolRegex, numOptions.symbolMatch);
        value = ParserBase.convertValueParts(value, numOptions.numberParseRegex, numOptions.numericPair);
        value = value.indexOf("-") !== -1 ? value.replace("-.", "-0.") : value;
        if (value.indexOf(".") === 0) {
          value = "0" + value;
        }
        var matches2 = value.match(parseRegex);
        if (isNullOrUndefined(matches2)) {
          return NaN;
        }
        lead = matches2[1];
        tempValue = matches2[2];
        var exponent = matches2[5];
        end = matches2[6];
        isNegative = options.custom ? lead === options.nData.nlead && end === options.nData.nend : lead.indexOf(options.nData.nlead) !== -1 && end.indexOf(options.nData.nend) !== -1;
        isPercent = isNegative ? options.nData.isPercent : options.pData.isPercent;
        tempValue = tempValue.replace(groupRegex, "");
        if (exponent) {
          tempValue += exponent;
        }
        ret = +tempValue;
        if (options.type === "percent" || isPercent) {
          ret = ret / 100;
        }
        if (options.custom || options.fractionDigits) {
          ret = parseFloat(ret.toFixed(options.custom ? isNegative ? options.nData.maximumFractionDigits : options.pData.maximumFractionDigits : options.fractionDigits));
        }
        if (options.maximumFractionDigits) {
          ret = this.convertMaxFracDigits(tempValue, options, ret, isNegative);
        }
        if (isNegative) {
          ret *= -1;
        }
        return ret;
      }
    };
    NumberParser2.convertMaxFracDigits = function(value, options, ret, isNegative) {
      var decimalSplitValue = value.split(".");
      if (decimalSplitValue[1] && decimalSplitValue[1].length > options.maximumFractionDigits) {
        ret = +ret.toFixed(options.custom ? isNegative ? options.nData.maximumFractionDigits : options.pData.maximumFractionDigits : options.maximumFractionDigits);
      }
      return ret;
    };
    return NumberParser2;
  }()
);

// node_modules/@syncfusion/ej2-base/src/observer.js
var Observer = (
  /** @class */
  function() {
    function Observer2(context) {
      this.ranArray = [];
      this.boundedEvents = {};
      if (isNullOrUndefined(context)) {
        return;
      }
      this.context = context;
    }
    Observer2.prototype.on = function(property, handler, context, id) {
      if (isNullOrUndefined(handler)) {
        return;
      }
      var cntxt = context || this.context;
      if (this.notExist(property)) {
        this.boundedEvents["" + property] = [{
          handler,
          context: cntxt,
          id
        }];
        return;
      }
      if (!isNullOrUndefined(id)) {
        if (this.ranArray.indexOf(id) === -1) {
          this.ranArray.push(id);
          this.boundedEvents["" + property].push({
            handler,
            context: cntxt,
            id
          });
        }
      } else if (!this.isHandlerPresent(this.boundedEvents["" + property], handler)) {
        this.boundedEvents["" + property].push({
          handler,
          context: cntxt
        });
      }
    };
    Observer2.prototype.off = function(property, handler, id) {
      if (this.notExist(property)) {
        return;
      }
      var curObject = getValue(property, this.boundedEvents);
      if (handler) {
        for (var i = 0; i < curObject.length; i++) {
          if (id) {
            if (curObject[parseInt(i.toString(), 10)].id === id) {
              curObject.splice(i, 1);
              var indexLocation = this.ranArray.indexOf(id);
              if (indexLocation !== -1) {
                this.ranArray.splice(indexLocation, 1);
              }
              break;
            }
          } else if (handler === curObject[parseInt(i.toString(), 10)].handler) {
            curObject.splice(i, 1);
            break;
          }
        }
      } else {
        delete this.boundedEvents["" + property];
      }
    };
    Observer2.prototype.notify = function(property, argument, successHandler, errorHandler) {
      if (this.notExist(property)) {
        if (successHandler) {
          successHandler.call(this, argument);
        }
        return;
      }
      if (argument) {
        argument.name = property;
      }
      var blazor = "Blazor";
      var curObject = getValue(property, this.boundedEvents).slice(0);
      if (window["" + blazor]) {
        return this.blazorCallback(curObject, argument, successHandler, errorHandler, 0);
      } else {
        for (var _i = 0, curObject_1 = curObject; _i < curObject_1.length; _i++) {
          var cur = curObject_1[_i];
          cur.handler.call(cur.context, argument);
        }
        if (successHandler) {
          successHandler.call(this, argument);
        }
      }
    };
    Observer2.prototype.blazorCallback = function(objs, argument, successHandler, errorHandler, index) {
      var _this = this;
      var isTrigger = index === objs.length - 1;
      if (index < objs.length) {
        var obj_1 = objs[parseInt(index.toString(), 10)];
        var promise = obj_1.handler.call(obj_1.context, argument);
        if (promise && typeof promise.then === "function") {
          if (!successHandler) {
            return promise;
          }
          promise.then(function(data) {
            data = typeof data === "string" && _this.isJson(data) ? JSON.parse(data, _this.dateReviver) : data;
            extend(argument, argument, data, true);
            if (successHandler && isTrigger) {
              successHandler.call(obj_1.context, argument);
            } else {
              return _this.blazorCallback(objs, argument, successHandler, errorHandler, index + 1);
            }
          }).catch(function(data) {
            if (errorHandler) {
              errorHandler.call(obj_1.context, typeof data === "string" && _this.isJson(data) ? JSON.parse(data, _this.dateReviver) : data);
            }
          });
        } else if (successHandler && isTrigger) {
          successHandler.call(obj_1.context, argument);
        } else {
          return this.blazorCallback(objs, argument, successHandler, errorHandler, index + 1);
        }
      }
    };
    Observer2.prototype.dateReviver = function(key, value) {
      var dPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
      if (isBlazor && typeof value === "string" && value.match(dPattern) !== null) {
        return new Date(value);
      }
      return value;
    };
    Observer2.prototype.isJson = function(value) {
      try {
        JSON.parse(value);
      } catch (e) {
        return false;
      }
      return true;
    };
    Observer2.prototype.destroy = function() {
      this.boundedEvents = this.context = void 0;
    };
    Observer2.prototype.offIntlEvents = function() {
      var eventsArr = this.boundedEvents["notifyExternalChange"];
      if (eventsArr) {
        for (var i = 0; i < eventsArr.length; i++) {
          var curContext = eventsArr[parseInt(i.toString(), 10)].context;
          if (curContext && curContext.detectFunction && curContext.randomId && curContext.isReactMock) {
            this.off("notifyExternalChange", curContext.detectFunction, curContext.randomId);
            i--;
          }
        }
        if (!this.boundedEvents["notifyExternalChange"].length) {
          delete this.boundedEvents["notifyExternalChange"];
        }
      }
    };
    Observer2.prototype.notExist = function(prop) {
      return Object.prototype.hasOwnProperty.call(this.boundedEvents, prop) === false || this.boundedEvents["" + prop].length <= 0;
    };
    Observer2.prototype.isHandlerPresent = function(boundedEvents, handler) {
      for (var _i = 0, boundedEvents_1 = boundedEvents; _i < boundedEvents_1.length; _i++) {
        var cur = boundedEvents_1[_i];
        if (cur.handler === handler) {
          return true;
        }
      }
      return false;
    };
    return Observer2;
  }()
);

// node_modules/@syncfusion/ej2-base/src/internationalization.js
var onIntlChange = new Observer();
var rightToLeft = false;
var cldrData = {};
var defaultCulture = "en-US";
var defaultCurrencyCode = "USD";
var Internationalization = (
  /** @class */
  function() {
    function Internationalization2(cultureName) {
      if (cultureName) {
        this.culture = cultureName;
      }
    }
    Internationalization2.prototype.getDateFormat = function(options) {
      return DateFormat.dateFormat(this.getCulture(), options || {
        type: "date",
        skeleton: "short"
      }, cldrData);
    };
    Internationalization2.prototype.getNumberFormat = function(options) {
      if (options && !options.currency) {
        options.currency = defaultCurrencyCode;
      }
      if (isBlazor() && options && !options.format) {
        options.minimumFractionDigits = 0;
      }
      return NumberFormat.numberFormatter(this.getCulture(), options || {}, cldrData);
    };
    Internationalization2.prototype.getDateParser = function(options) {
      return DateParser.dateParser(this.getCulture(), options || {
        skeleton: "short",
        type: "date"
      }, cldrData);
    };
    Internationalization2.prototype.getNumberParser = function(options) {
      if (isBlazor() && options && !options.format) {
        options.minimumFractionDigits = 0;
      }
      return NumberParser.numberParser(this.getCulture(), options || {
        format: "N"
      }, cldrData);
    };
    Internationalization2.prototype.formatNumber = function(value, option) {
      return this.getNumberFormat(option)(value);
    };
    Internationalization2.prototype.formatDate = function(value, option) {
      return this.getDateFormat(option)(value);
    };
    Internationalization2.prototype.parseDate = function(value, option) {
      return this.getDateParser(option)(value);
    };
    Internationalization2.prototype.parseNumber = function(value, option) {
      return this.getNumberParser(option)(value);
    };
    Internationalization2.prototype.getDatePattern = function(option, isExcelFormat) {
      return IntlBase.getActualDateTimeFormat(this.getCulture(), option, cldrData, isExcelFormat);
    };
    Internationalization2.prototype.getNumberPattern = function(option, isExcel) {
      return IntlBase.getActualNumberFormat(this.getCulture(), option, cldrData, isExcel);
    };
    Internationalization2.prototype.getFirstDayOfWeek = function() {
      return IntlBase.getWeekData(this.getCulture(), cldrData);
    };
    Internationalization2.prototype.getCulture = function() {
      return this.culture || defaultCulture;
    };
    return Internationalization2;
  }()
);

// node_modules/@syncfusion/ej2-base/src/intl/intl-base.js
var regExp2 = RegExp;
var blazorCultureFormats = {
  "en-US": {
    "d": "M/d/y",
    "D": "EEEE, MMMM d, y",
    "f": "EEEE, MMMM d, y h:mm a",
    "F": "EEEE, MMMM d, y h:mm:s a",
    "g": "M/d/y h:mm a",
    "G": "M/d/yyyy h:mm:ss tt",
    "m": "MMMM d",
    "M": "MMMM d",
    "r": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
    "R": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
    "s": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
    "t": "h:mm tt",
    "T": "h:m:s tt",
    "u": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
    "U": "dddd, MMMM d, yyyy h:mm:ss tt",
    "y": "MMMM yyyy",
    "Y": "MMMM yyyy"
  }
};
var IntlBase;
(function(IntlBase2) {
  IntlBase2.negativeDataRegex = /^(('[^']+'|''|[^*#@0,.E])*)(\*.)?((([#,]*[0,]*0+)(\.0*[0-9]*#*)?)|([#,]*@+#*))(E\+?0+)?(('[^']+'|''|[^*#@0,.E])*)$/;
  IntlBase2.customRegex = /^(('[^']+'|''|[^*#@0,.])*)(\*.)?((([0#,]*[0,]*[0#]*[0# ]*)(\.[0#]*)?)|([#,]*@+#*))(E\+?0+)?(('[^']+'|''|[^*#@0,.E])*)$/;
  IntlBase2.latnParseRegex = /0|1|2|3|4|5|6|7|8|9/g;
  var fractionRegex = /[0-9]/g;
  IntlBase2.defaultCurrency = "$";
  var mapper2 = ["infinity", "nan", "group", "decimal"];
  var patternRegex = /G|M|L|H|c|'| a|yy|y|EEEE|E/g;
  var patternMatch = {
    "G": "",
    "M": "m",
    "L": "m",
    "H": "h",
    "c": "d",
    "'": '"',
    " a": " AM/PM",
    "yy": "yy",
    "y": "yyyy",
    "EEEE": "dddd",
    "E": "ddd"
  };
  IntlBase2.dateConverterMapper = /dddd|ddd/ig;
  var defaultFirstDay = "sun";
  IntlBase2.islamicRegex = /^islamic/;
  var firstDayMapper = {
    "sun": 0,
    "mon": 1,
    "tue": 2,
    "wed": 3,
    "thu": 4,
    "fri": 5,
    "sat": 6
  };
  IntlBase2.formatRegex = new regExp2("(^[ncpae]{1})([0-1]?[0-9]|20)?$", "i");
  IntlBase2.currencyFormatRegex = new regExp2("(^[ca]{1})([0-1]?[0-9]|20)?$", "i");
  IntlBase2.curWithoutNumberRegex = /(c|a)$/ig;
  var typeMapper = {
    "$": "isCurrency",
    "%": "isPercent",
    "-": "isNegative",
    0: "nlead",
    1: "nend"
  };
  IntlBase2.dateParseRegex = /([a-z])\1*|'([^']|'')+'|''|./gi;
  IntlBase2.basicPatterns = ["short", "medium", "long", "full"];
  IntlBase2.defaultObject = {
    "dates": {
      "calendars": {
        "gregorian": {
          "months": {
            "stand-alone": {
              "abbreviated": {
                "1": "Jan",
                "2": "Feb",
                "3": "Mar",
                "4": "Apr",
                "5": "May",
                "6": "Jun",
                "7": "Jul",
                "8": "Aug",
                "9": "Sep",
                "10": "Oct",
                "11": "Nov",
                "12": "Dec"
              },
              "narrow": {
                "1": "J",
                "2": "F",
                "3": "M",
                "4": "A",
                "5": "M",
                "6": "J",
                "7": "J",
                "8": "A",
                "9": "S",
                "10": "O",
                "11": "N",
                "12": "D"
              },
              "wide": {
                "1": "January",
                "2": "February",
                "3": "March",
                "4": "April",
                "5": "May",
                "6": "June",
                "7": "July",
                "8": "August",
                "9": "September",
                "10": "October",
                "11": "November",
                "12": "December"
              }
            }
          },
          "days": {
            "stand-alone": {
              "abbreviated": {
                "sun": "Sun",
                "mon": "Mon",
                "tue": "Tue",
                "wed": "Wed",
                "thu": "Thu",
                "fri": "Fri",
                "sat": "Sat"
              },
              "narrow": {
                "sun": "S",
                "mon": "M",
                "tue": "T",
                "wed": "W",
                "thu": "T",
                "fri": "F",
                "sat": "S"
              },
              "short": {
                "sun": "Su",
                "mon": "Mo",
                "tue": "Tu",
                "wed": "We",
                "thu": "Th",
                "fri": "Fr",
                "sat": "Sa"
              },
              "wide": {
                "sun": "Sunday",
                "mon": "Monday",
                "tue": "Tuesday",
                "wed": "Wednesday",
                "thu": "Thursday",
                "fri": "Friday",
                "sat": "Saturday"
              }
            }
          },
          "dayPeriods": {
            "format": {
              "wide": {
                "am": "AM",
                "pm": "PM"
              }
            }
          },
          "eras": {
            "eraNames": {
              "0": "Before Christ",
              "0-alt-variant": "Before Common Era",
              "1": "Anno Domini",
              "1-alt-variant": "Common Era"
            },
            "eraAbbr": {
              "0": "BC",
              "0-alt-variant": "BCE",
              "1": "AD",
              "1-alt-variant": "CE"
            },
            "eraNarrow": {
              "0": "B",
              "0-alt-variant": "BCE",
              "1": "A",
              "1-alt-variant": "CE"
            }
          },
          "dateFormats": {
            "full": "EEEE, MMMM d, y",
            "long": "MMMM d, y",
            "medium": "MMM d, y",
            "short": "M/d/yy"
          },
          "timeFormats": {
            "full": "h:mm:ss a zzzz",
            "long": "h:mm:ss a z",
            "medium": "h:mm:ss a",
            "short": "h:mm a"
          },
          "dateTimeFormats": {
            "full": "{1} 'at' {0}",
            "long": "{1} 'at' {0}",
            "medium": "{1}, {0}",
            "short": "{1}, {0}",
            "availableFormats": {
              "d": "d",
              "E": "ccc",
              "Ed": "d E",
              "Ehm": "E h:mm a",
              "EHm": "E HH:mm",
              "Ehms": "E h:mm:ss a",
              "EHms": "E HH:mm:ss",
              "Gy": "y G",
              "GyMMM": "MMM y G",
              "GyMMMd": "MMM d, y G",
              "GyMMMEd": "E, MMM d, y G",
              "h": "h a",
              "H": "HH",
              "hm": "h:mm a",
              "Hm": "HH:mm",
              "hms": "h:mm:ss a",
              "Hms": "HH:mm:ss",
              "hmsv": "h:mm:ss a v",
              "Hmsv": "HH:mm:ss v",
              "hmv": "h:mm a v",
              "Hmv": "HH:mm v",
              "M": "L",
              "Md": "M/d",
              "MEd": "E, M/d",
              "MMM": "LLL",
              "MMMd": "MMM d",
              "MMMEd": "E, MMM d",
              "MMMMd": "MMMM d",
              "ms": "mm:ss",
              "y": "y",
              "yM": "M/y",
              "yMd": "M/d/y",
              "yMEd": "E, M/d/y",
              "yMMM": "MMM y",
              "yMMMd": "MMM d, y",
              "yMMMEd": "E, MMM d, y",
              "yMMMM": "MMMM y"
            }
          }
        },
        "islamic": {
          "months": {
            "stand-alone": {
              "abbreviated": {
                "1": "Muh.",
                "2": "Saf.",
                "3": "Rab. I",
                "4": "Rab. II",
                "5": "Jum. I",
                "6": "Jum. II",
                "7": "Raj.",
                "8": "Sha.",
                "9": "Ram.",
                "10": "Shaw.",
                "11": "Dhuʻl-Q.",
                "12": "Dhuʻl-H."
              },
              "narrow": {
                "1": "1",
                "2": "2",
                "3": "3",
                "4": "4",
                "5": "5",
                "6": "6",
                "7": "7",
                "8": "8",
                "9": "9",
                "10": "10",
                "11": "11",
                "12": "12"
              },
              "wide": {
                "1": "Muharram",
                "2": "Safar",
                "3": "Rabiʻ I",
                "4": "Rabiʻ II",
                "5": "Jumada I",
                "6": "Jumada II",
                "7": "Rajab",
                "8": "Shaʻban",
                "9": "Ramadan",
                "10": "Shawwal",
                "11": "Dhuʻl-Qiʻdah",
                "12": "Dhuʻl-Hijjah"
              }
            }
          },
          "days": {
            "stand-alone": {
              "abbreviated": {
                "sun": "Sun",
                "mon": "Mon",
                "tue": "Tue",
                "wed": "Wed",
                "thu": "Thu",
                "fri": "Fri",
                "sat": "Sat"
              },
              "narrow": {
                "sun": "S",
                "mon": "M",
                "tue": "T",
                "wed": "W",
                "thu": "T",
                "fri": "F",
                "sat": "S"
              },
              "short": {
                "sun": "Su",
                "mon": "Mo",
                "tue": "Tu",
                "wed": "We",
                "thu": "Th",
                "fri": "Fr",
                "sat": "Sa"
              },
              "wide": {
                "sun": "Sunday",
                "mon": "Monday",
                "tue": "Tuesday",
                "wed": "Wednesday",
                "thu": "Thursday",
                "fri": "Friday",
                "sat": "Saturday"
              }
            }
          },
          "dayPeriods": {
            "format": {
              "wide": {
                "am": "AM",
                "pm": "PM"
              }
            }
          },
          "eras": {
            "eraNames": {
              "0": "AH"
            },
            "eraAbbr": {
              "0": "AH"
            },
            "eraNarrow": {
              "0": "AH"
            }
          },
          "dateFormats": {
            "full": "EEEE, MMMM d, y G",
            "long": "MMMM d, y G",
            "medium": "MMM d, y G",
            "short": "M/d/y GGGGG"
          },
          "timeFormats": {
            "full": "h:mm:ss a zzzz",
            "long": "h:mm:ss a z",
            "medium": "h:mm:ss a",
            "short": "h:mm a"
          },
          "dateTimeFormats": {
            "full": "{1} 'at' {0}",
            "long": "{1} 'at' {0}",
            "medium": "{1}, {0}",
            "short": "{1}, {0}",
            "availableFormats": {
              "d": "d",
              "E": "ccc",
              "Ed": "d E",
              "Ehm": "E h:mm a",
              "EHm": "E HH:mm",
              "Ehms": "E h:mm:ss a",
              "EHms": "E HH:mm:ss",
              "Gy": "y G",
              "GyMMM": "MMM y G",
              "GyMMMd": "MMM d, y G",
              "GyMMMEd": "E, MMM d, y G",
              "h": "h a",
              "H": "HH",
              "hm": "h:mm a",
              "Hm": "HH:mm",
              "hms": "h:mm:ss a",
              "Hms": "HH:mm:ss",
              "M": "L",
              "Md": "M/d",
              "MEd": "E, M/d",
              "MMM": "LLL",
              "MMMd": "MMM d",
              "MMMEd": "E, MMM d",
              "MMMMd": "MMMM d",
              "ms": "mm:ss",
              "y": "y G",
              "yyyy": "y G",
              "yyyyM": "M/y GGGGG",
              "yyyyMd": "M/d/y GGGGG",
              "yyyyMEd": "E, M/d/y GGGGG",
              "yyyyMMM": "MMM y G",
              "yyyyMMMd": "MMM d, y G",
              "yyyyMMMEd": "E, MMM d, y G",
              "yyyyMMMM": "MMMM y G",
              "yyyyQQQ": "QQQ y G",
              "yyyyQQQQ": "QQQQ y G"
            }
          }
        }
      },
      "timeZoneNames": {
        "hourFormat": "+HH:mm;-HH:mm",
        "gmtFormat": "GMT{0}",
        "gmtZeroFormat": "GMT"
      }
    },
    "numbers": {
      "currencies": {
        "USD": {
          "displayName": "US Dollar",
          "symbol": "$",
          "symbol-alt-narrow": "$"
        },
        "EUR": {
          "displayName": "Euro",
          "symbol": "€",
          "symbol-alt-narrow": "€"
        },
        "GBP": {
          "displayName": "British Pound",
          "symbol-alt-narrow": "£"
        }
      },
      "defaultNumberingSystem": "latn",
      "minimumGroupingDigits": "1",
      "symbols-numberSystem-latn": {
        "decimal": ".",
        "group": ",",
        "list": ";",
        "percentSign": "%",
        "plusSign": "+",
        "minusSign": "-",
        "exponential": "E",
        "superscriptingExponent": "×",
        "perMille": "‰",
        "infinity": "∞",
        "nan": "NaN",
        "timeSeparator": ":"
      },
      "decimalFormats-numberSystem-latn": {
        "standard": "#,##0.###"
      },
      "percentFormats-numberSystem-latn": {
        "standard": "#,##0%"
      },
      "currencyFormats-numberSystem-latn": {
        "standard": "¤#,##0.00",
        "accounting": "¤#,##0.00;(¤#,##0.00)"
      },
      "scientificFormats-numberSystem-latn": {
        "standard": "#E0"
      }
    }
  };
  IntlBase2.blazorDefaultObject = {
    "numbers": {
      "mapper": {
        "0": "0",
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9"
      },
      "mapperDigits": "0123456789",
      "numberSymbols": {
        "decimal": ".",
        "group": ",",
        "plusSign": "+",
        "minusSign": "-",
        "percentSign": "%",
        "nan": "NaN",
        "timeSeparator": ":",
        "infinity": "∞"
      },
      "timeSeparator": ":",
      "currencySymbol": "$",
      "currencypData": {
        "nlead": "$",
        "nend": "",
        "groupSeparator": ",",
        "groupData": {
          "primary": 3
        },
        "maximumFraction": 2,
        "minimumFraction": 2
      },
      "percentpData": {
        "nlead": "",
        "nend": "%",
        "groupSeparator": ",",
        "groupData": {
          "primary": 3
        },
        "maximumFraction": 2,
        "minimumFraction": 2
      },
      "percentnData": {
        "nlead": "-",
        "nend": "%",
        "groupSeparator": ",",
        "groupData": {
          "primary": 3
        },
        "maximumFraction": 2,
        "minimumFraction": 2
      },
      "currencynData": {
        "nlead": "($",
        "nend": ")",
        "groupSeparator": ",",
        "groupData": {
          "primary": 3
        },
        "maximumFraction": 2,
        "minimumFraction": 2
      },
      "decimalnData": {
        "nlead": "-",
        "nend": "",
        "groupData": {
          "primary": 3
        },
        "maximumFraction": 2,
        "minimumFraction": 2
      },
      "decimalpData": {
        "nlead": "",
        "nend": "",
        "groupData": {
          "primary": 3
        },
        "maximumFraction": 2,
        "minimumFraction": 2
      }
    },
    "dates": {
      "dayPeriods": {
        "am": "AM",
        "pm": "PM"
      },
      "dateSeperator": "/",
      "days": {
        "abbreviated": {
          "sun": "Sun",
          "mon": "Mon",
          "tue": "Tue",
          "wed": "Wed",
          "thu": "Thu",
          "fri": "Fri",
          "sat": "Sat"
        },
        "short": {
          "sun": "Su",
          "mon": "Mo",
          "tue": "Tu",
          "wed": "We",
          "thu": "Th",
          "fri": "Fr",
          "sat": "Sa"
        },
        "wide": {
          "sun": "Sunday",
          "mon": "Monday",
          "tue": "Tuesday",
          "wed": "Wednesday",
          "thu": "Thursday",
          "fri": "Friday",
          "sat": "Saturday"
        }
      },
      "months": {
        "abbreviated": {
          "1": "Jan",
          "2": "Feb",
          "3": "Mar",
          "4": "Apr",
          "5": "May",
          "6": "Jun",
          "7": "Jul",
          "8": "Aug",
          "9": "Sep",
          "10": "Oct",
          "11": "Nov",
          "12": "Dec"
        },
        "wide": {
          "1": "January",
          "2": "February",
          "3": "March",
          "4": "April",
          "5": "May",
          "6": "June",
          "7": "July",
          "8": "August",
          "9": "September",
          "10": "October",
          "11": "November",
          "12": "December"
        }
      },
      "eras": {
        "1": "AD"
      }
    }
  };
  IntlBase2.monthIndex = {
    3: "abbreviated",
    4: "wide",
    5: "narrow",
    1: "abbreviated"
  };
  IntlBase2.month = "months";
  IntlBase2.days = "days";
  IntlBase2.patternMatcher = {
    C: "currency",
    P: "percent",
    N: "decimal",
    A: "currency",
    E: "scientific"
  };
  function getResultantPattern(skeleton, dateObject, type, isIslamic, blazorCulture) {
    var resPattern;
    var iType = type || "date";
    if (blazorCulture) {
      resPattern = compareBlazorDateFormats({
        skeleton
      }, blazorCulture).format || compareBlazorDateFormats({
        skeleton: "d"
      }, "en-US").format;
    } else {
      if (IntlBase2.basicPatterns.indexOf(skeleton) !== -1) {
        resPattern = getValue(iType + "Formats." + skeleton, dateObject);
        if (iType === "dateTime") {
          var dPattern = getValue("dateFormats." + skeleton, dateObject);
          var tPattern = getValue("timeFormats." + skeleton, dateObject);
          resPattern = resPattern.replace("{1}", dPattern).replace("{0}", tPattern);
        }
      } else {
        resPattern = getValue("dateTimeFormats.availableFormats." + skeleton, dateObject);
      }
      if (isUndefined(resPattern) && skeleton === "yMd") {
        resPattern = "M/d/y";
      }
    }
    return resPattern;
  }
  IntlBase2.getResultantPattern = getResultantPattern;
  function getDependables(cldr, culture, mode, isNumber) {
    var ret = {};
    var calendartype = mode || "gregorian";
    ret.parserObject = ParserBase.getMainObject(cldr, culture) || (isBlazor() ? IntlBase2.blazorDefaultObject : IntlBase2.defaultObject);
    if (isNumber) {
      ret.numericObject = getValue("numbers", ret.parserObject);
    } else {
      var dateString = isBlazor() ? "dates" : "dates.calendars." + calendartype;
      ret.dateObject = getValue(dateString, ret.parserObject);
    }
    return ret;
  }
  IntlBase2.getDependables = getDependables;
  function getSymbolPattern(type, numSystem, obj, isAccount) {
    return getValue(type + "Formats-numberSystem-" + numSystem + (isAccount ? ".accounting" : ".standard"), obj) || (isAccount ? getValue(type + "Formats-numberSystem-" + numSystem + ".standard", obj) : "");
  }
  IntlBase2.getSymbolPattern = getSymbolPattern;
  function ConvertDateToWeekFormat(format) {
    var convertMapper = format.match(IntlBase2.dateConverterMapper);
    if (convertMapper && isBlazor()) {
      var tempString = convertMapper[0].length === 3 ? "EEE" : "EEEE";
      return format.replace(IntlBase2.dateConverterMapper, tempString);
    }
    return format;
  }
  IntlBase2.ConvertDateToWeekFormat = ConvertDateToWeekFormat;
  function compareBlazorDateFormats(formatOptions, culture) {
    var format = formatOptions.format || formatOptions.skeleton;
    var curFormatMapper = getValue((culture || "en-US") + "." + format, blazorCultureFormats);
    if (!curFormatMapper) {
      curFormatMapper = getValue("en-US." + format, blazorCultureFormats);
    }
    if (curFormatMapper) {
      curFormatMapper = ConvertDateToWeekFormat(curFormatMapper);
      formatOptions.format = curFormatMapper.replace(/tt/, "a");
    }
    return formatOptions;
  }
  IntlBase2.compareBlazorDateFormats = compareBlazorDateFormats;
  function getProperNumericSkeleton(skeleton) {
    var matches2 = skeleton.match(IntlBase2.formatRegex);
    var ret = {};
    var pattern = matches2[1].toUpperCase();
    ret.isAccount = pattern === "A";
    ret.type = IntlBase2.patternMatcher["" + pattern];
    if (skeleton.length > 1) {
      ret.fractionDigits = parseInt(matches2[2], 10);
    }
    return ret;
  }
  IntlBase2.getProperNumericSkeleton = getProperNumericSkeleton;
  function getFormatData(pattern, needFraction, cSymbol, fractionOnly) {
    var nData = fractionOnly ? {} : {
      nlead: "",
      nend: ""
    };
    var match = pattern.match(IntlBase2.customRegex);
    if (match) {
      if (!fractionOnly) {
        nData.nlead = changeCurrencySymbol(match[1], cSymbol);
        nData.nend = changeCurrencySymbol(match[10], cSymbol);
        nData.groupPattern = match[4];
      }
      var fraction = match[7];
      if (fraction && needFraction) {
        var fmatch = fraction.match(fractionRegex);
        if (!isNullOrUndefined(fmatch)) {
          nData.minimumFraction = fmatch.length;
        } else {
          nData.minimumFraction = 0;
        }
        nData.maximumFraction = fraction.length - 1;
      }
    }
    return nData;
  }
  IntlBase2.getFormatData = getFormatData;
  function changeCurrencySymbol(val, sym) {
    if (val) {
      val = val.replace(IntlBase2.defaultCurrency, sym);
      return sym === "" ? val.trim() : val;
    }
    return "";
  }
  IntlBase2.changeCurrencySymbol = changeCurrencySymbol;
  function getCurrencySymbol(numericObject, currencyCode, altSymbol, ignoreCurrency) {
    var symbol = altSymbol ? "." + altSymbol : ".symbol";
    var getCurrency = ignoreCurrency ? "$" : getValue("currencies." + currencyCode + symbol, numericObject) || getValue("currencies." + currencyCode + ".symbol-alt-narrow", numericObject) || "$";
    return getCurrency;
  }
  IntlBase2.getCurrencySymbol = getCurrencySymbol;
  function customFormat(format, dOptions, obj) {
    var options = {};
    var formatSplit = format.split(";");
    var data = ["pData", "nData", "zeroData"];
    for (var i = 0; i < formatSplit.length; i++) {
      options["" + data[parseInt(i.toString(), 10)]] = customNumberFormat(formatSplit[parseInt(i.toString(), 10)], dOptions, obj);
    }
    if (isNullOrUndefined(options.nData)) {
      options.nData = extend({}, options.pData);
      options.nData.nlead = isNullOrUndefined(dOptions) ? "-" + options.nData.nlead : dOptions.minusSymbol + options.nData.nlead;
    }
    return options;
  }
  IntlBase2.customFormat = customFormat;
  function customNumberFormat(format, dOptions, numObject) {
    var cOptions = {
      type: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    };
    var pattern = format.match(IntlBase2.customRegex);
    if (isNullOrUndefined(pattern) || pattern[5] === "" && format !== "N/A") {
      cOptions.type = void 0;
      return cOptions;
    }
    cOptions.nlead = pattern[1];
    cOptions.nend = pattern[10];
    var integerPart = pattern[6];
    var spaceCapture = integerPart.match(/ $/g) ? true : false;
    var spaceGrouping = integerPart.replace(/ $/g, "").indexOf(" ") !== -1;
    cOptions.useGrouping = integerPart.indexOf(",") !== -1 || spaceGrouping;
    integerPart = integerPart.replace(/,/g, "");
    var fractionPart = pattern[7];
    if (integerPart.indexOf("0") !== -1) {
      cOptions.minimumIntegerDigits = integerPart.length - integerPart.indexOf("0");
    }
    if (!isNullOrUndefined(fractionPart)) {
      cOptions.minimumFractionDigits = fractionPart.lastIndexOf("0");
      cOptions.maximumFractionDigits = fractionPart.lastIndexOf("#");
      if (cOptions.minimumFractionDigits === -1) {
        cOptions.minimumFractionDigits = 0;
      }
      if (cOptions.maximumFractionDigits === -1 || cOptions.maximumFractionDigits < cOptions.minimumFractionDigits) {
        cOptions.maximumFractionDigits = cOptions.minimumFractionDigits;
      }
    }
    if (!isNullOrUndefined(dOptions)) {
      dOptions.isCustomFormat = true;
      extend(cOptions, isCurrencyPercent([cOptions.nlead, cOptions.nend], "$", dOptions.currencySymbol));
      if (!cOptions.isCurrency) {
        extend(cOptions, isCurrencyPercent([cOptions.nlead, cOptions.nend], "%", dOptions.percentSymbol));
      }
    } else {
      extend(cOptions, isCurrencyPercent([cOptions.nlead, cOptions.nend], "%", "%"));
    }
    if (!isNullOrUndefined(numObject)) {
      var symbolPattern = getSymbolPattern(cOptions.type, dOptions.numberMapper.numberSystem, numObject, false);
      if (cOptions.useGrouping) {
        cOptions.groupSeparator = spaceGrouping ? " " : dOptions.numberMapper.numberSymbols[mapper2[2]];
        cOptions.groupData = NumberFormat.getGroupingDetails(symbolPattern.split(";")[0]);
      }
      cOptions.nlead = cOptions.nlead.replace(/'/g, "");
      cOptions.nend = spaceCapture ? " " + cOptions.nend.replace(/'/g, "") : cOptions.nend.replace(/'/g, "");
    }
    return cOptions;
  }
  IntlBase2.customNumberFormat = customNumberFormat;
  function isCurrencyPercent(parts, actual, symbol) {
    var options = {
      nlead: parts[0],
      nend: parts[1]
    };
    for (var i = 0; i < 2; i++) {
      var part = parts[parseInt(i.toString(), 10)];
      var loc = part.indexOf(actual);
      if (loc !== -1 && (loc < part.indexOf("'") || loc > part.lastIndexOf("'"))) {
        options["" + typeMapper[parseInt(i.toString(), 10)]] = part.substr(0, loc) + symbol + part.substr(loc + 1);
        options["" + typeMapper["" + actual]] = true;
        options.type = options.isCurrency ? "currency" : "percent";
        break;
      }
    }
    return options;
  }
  IntlBase2.isCurrencyPercent = isCurrencyPercent;
  function getDateSeparator(dateObj) {
    var value = (getValue("dateFormats.short", dateObj) || "").match(/[dM]([^dM])[dM]/i);
    return value ? value[1] : "/";
  }
  IntlBase2.getDateSeparator = getDateSeparator;
  function getActualDateTimeFormat(culture, options, cldr, isExcelFormat) {
    var dependable = getDependables(cldr, culture, options.calendar);
    if (isBlazor()) {
      options = compareBlazorDateFormats(options, culture);
    }
    var actualPattern = options.format || getResultantPattern(options.skeleton, dependable.dateObject, options.type);
    if (isExcelFormat) {
      actualPattern = actualPattern.replace(patternRegex, function(pattern2) {
        return patternMatch["" + pattern2];
      });
      if (actualPattern.indexOf("z") !== -1) {
        var tLength = actualPattern.match(/z/g).length;
        var timeZonePattern = void 0;
        var options_1 = {
          "timeZone": {}
        };
        options_1.numMapper = ParserBase.getNumberMapper(dependable.parserObject, ParserBase.getNumberingSystem(cldr));
        options_1.timeZone = getValue("dates.timeZoneNames", dependable.parserObject);
        var value = /* @__PURE__ */ new Date();
        var timezone = value.getTimezoneOffset();
        var pattern = tLength < 4 ? "+H;-H" : options_1.timeZone.hourFormat;
        pattern = pattern.replace(/:/g, options_1.numMapper.timeSeparator);
        if (timezone === 0) {
          timeZonePattern = options_1.timeZone.gmtZeroFormat;
        } else {
          timeZonePattern = DateFormat.getTimeZoneValue(timezone, pattern);
          timeZonePattern = options_1.timeZone.gmtFormat.replace(/\{0\}/, timeZonePattern);
        }
        actualPattern = actualPattern.replace(/[z]+/, '"' + timeZonePattern + '"');
      }
      actualPattern = actualPattern.replace(/ $/, "");
    }
    return actualPattern;
  }
  IntlBase2.getActualDateTimeFormat = getActualDateTimeFormat;
  function processSymbol(actual, option) {
    if (actual.indexOf(",") !== -1) {
      var split = actual.split(",");
      actual = split[0] + getValue("numberMapper.numberSymbols.group", option) + split[1].replace(".", getValue("numberMapper.numberSymbols.decimal", option));
    } else {
      actual = actual.replace(".", getValue("numberMapper.numberSymbols.decimal", option));
    }
    return actual;
  }
  IntlBase2.processSymbol = processSymbol;
  function getActualNumberFormat(culture, options, cldr, isExcel) {
    var dependable = getDependables(cldr, culture, "", true);
    var parseOptions = {
      custom: true
    };
    var numrericObject = dependable.numericObject;
    var minFrac;
    var curObj = {};
    var curMatch = (options.format || "").match(IntlBase2.currencyFormatRegex);
    var type = IntlBase2.formatRegex.test(options.format) ? getProperNumericSkeleton(options.format || "N") : {};
    var dOptions = {};
    if (curMatch) {
      dOptions.numberMapper = isBlazor() ? extend({}, dependable.numericObject) : ParserBase.getNumberMapper(dependable.parserObject, ParserBase.getNumberingSystem(cldr), true);
      var curCode = isBlazor() ? getValue("currencySymbol", dependable.numericObject) : getCurrencySymbol(dependable.numericObject, options.currency || defaultCurrencyCode, options.altSymbol);
      var symbolPattern = getSymbolPattern("currency", dOptions.numberMapper.numberSystem, dependable.numericObject, /a/i.test(options.format));
      symbolPattern = symbolPattern.replace(/\u00A4/g, curCode);
      var split = symbolPattern.split(";");
      curObj.hasNegativePattern = isBlazor() ? true : split.length > 1;
      curObj.nData = isBlazor() ? getValue(type.type + "nData", numrericObject) : getFormatData(split[1] || "-" + split[0], true, curCode);
      curObj.pData = isBlazor() ? getValue(type.type + "pData", numrericObject) : getFormatData(split[0], false, curCode);
      if (!curMatch[2] && !options.minimumFractionDigits && !options.maximumFractionDigits) {
        minFrac = getFormatData(symbolPattern.split(";")[0], true, "", true).minimumFraction;
      }
    }
    var actualPattern;
    if (IntlBase2.formatRegex.test(options.format) || !options.format) {
      extend(parseOptions, getProperNumericSkeleton(options.format || "N"));
      parseOptions.custom = false;
      actualPattern = "###0";
      if (parseOptions.fractionDigits || options.minimumFractionDigits || options.maximumFractionDigits || minFrac) {
        var defaultMinimum = 0;
        if (parseOptions.fractionDigits) {
          options.minimumFractionDigits = options.maximumFractionDigits = parseOptions.fractionDigits;
        }
        actualPattern = fractionDigitsPattern(actualPattern, minFrac || parseOptions.fractionDigits || options.minimumFractionDigits || defaultMinimum, options.maximumFractionDigits || defaultMinimum);
      }
      if (options.minimumIntegerDigits) {
        actualPattern = minimumIntegerPattern(actualPattern, options.minimumIntegerDigits);
      }
      if (options.useGrouping) {
        actualPattern = groupingPattern(actualPattern);
      }
      if (parseOptions.type === "currency" || parseOptions.type && isBlazor()) {
        if (isBlazor() && parseOptions.type !== "currency") {
          curObj.pData = getValue(parseOptions.type + "pData", numrericObject);
          curObj.nData = getValue(parseOptions.type + "nData", numrericObject);
        }
        var cPattern = actualPattern;
        actualPattern = curObj.pData.nlead + cPattern + curObj.pData.nend;
        if (curObj.hasNegativePattern || isBlazor()) {
          actualPattern += ";" + curObj.nData.nlead + cPattern + curObj.nData.nend;
        }
      }
      if (parseOptions.type === "percent" && !isBlazor()) {
        actualPattern += " %";
      }
    } else {
      actualPattern = options.format.replace(/'/g, '"');
    }
    if (Object.keys(dOptions).length > 0) {
      actualPattern = !isExcel ? processSymbol(actualPattern, dOptions) : actualPattern;
    }
    return actualPattern;
  }
  IntlBase2.getActualNumberFormat = getActualNumberFormat;
  function fractionDigitsPattern(pattern, minDigits, maxDigits) {
    pattern += ".";
    for (var a = 0; a < minDigits; a++) {
      pattern += "0";
    }
    if (minDigits < maxDigits) {
      var diff = maxDigits - minDigits;
      for (var b = 0; b < diff; b++) {
        pattern += "#";
      }
    }
    return pattern;
  }
  IntlBase2.fractionDigitsPattern = fractionDigitsPattern;
  function minimumIntegerPattern(pattern, digits) {
    var temp = pattern.split(".");
    var integer = "";
    for (var x = 0; x < digits; x++) {
      integer += "0";
    }
    return temp[1] ? integer + "." + temp[1] : integer;
  }
  IntlBase2.minimumIntegerPattern = minimumIntegerPattern;
  function groupingPattern(pattern) {
    var temp = pattern.split(".");
    var integer = temp[0];
    var no = 3 - integer.length % 3;
    var hash = no && no === 1 ? "#" : no === 2 ? "##" : "";
    integer = hash + integer;
    pattern = "";
    for (var x = integer.length - 1; x > 0; x = x - 3) {
      pattern = "," + integer[x - 2] + integer[x - 1] + integer[parseInt(x.toString(), 10)] + pattern;
    }
    pattern = pattern.slice(1);
    return temp[1] ? pattern + "." + temp[1] : pattern;
  }
  IntlBase2.groupingPattern = groupingPattern;
  function getWeekData(culture, cldr) {
    var firstDay = defaultFirstDay;
    var mapper3 = getValue("supplemental.weekData.firstDay", cldr);
    var iCulture = culture;
    if (/en-/.test(iCulture)) {
      iCulture = iCulture.slice(3);
    }
    iCulture = iCulture.slice(0, 2).toUpperCase() + iCulture.substr(2);
    if (mapper3) {
      firstDay = mapper3["" + iCulture] || mapper3[iCulture.slice(0, 2)] || defaultFirstDay;
    }
    return firstDayMapper["" + firstDay];
  }
  IntlBase2.getWeekData = getWeekData;
  function replaceBlazorCurrency(pData, aCurrency, rCurrency) {
    var iCurrency = getBlazorCurrencySymbol(rCurrency);
    if (aCurrency !== iCurrency) {
      for (var _i = 0, pData_1 = pData; _i < pData_1.length; _i++) {
        var data = pData_1[_i];
        data.nend = data.nend.replace(aCurrency, iCurrency);
        data.nlead = data.nlead.replace(aCurrency, iCurrency);
      }
    }
  }
  IntlBase2.replaceBlazorCurrency = replaceBlazorCurrency;
  function getWeekOfYear(date) {
    var newYear = new Date(date.getFullYear(), 0, 1);
    var day = newYear.getDay();
    var weeknum;
    day = day >= 0 ? day : day + 7;
    var daynum = Math.floor((date.getTime() - newYear.getTime() - (date.getTimezoneOffset() - newYear.getTimezoneOffset()) * 6e4) / 864e5) + 1;
    if (day < 4) {
      weeknum = Math.floor((daynum + day - 1) / 7) + 1;
      if (weeknum > 52) {
        var nYear = new Date(date.getFullYear() + 1, 0, 1);
        var nday = nYear.getDay();
        nday = nday >= 0 ? nday : nday + 7;
        weeknum = nday < 4 ? 1 : 53;
      }
    } else {
      weeknum = Math.floor((daynum + day - 1) / 7);
    }
    return weeknum;
  }
  IntlBase2.getWeekOfYear = getWeekOfYear;
})(IntlBase || (IntlBase = {}));

// node_modules/@syncfusion/ej2-base/src/ajax.js
var headerRegex = /^(.*?):[ \t]*([^\r\n]*)$/gm;
var defaultType = "GET";
var Ajax = (
  /** @class */
  function() {
    function Ajax2(options, type, async, contentType) {
      this.mode = true;
      this.emitError = true;
      this.options = {};
      if (typeof options === "string") {
        this.url = options;
        this.type = type ? type.toUpperCase() : defaultType;
        this.mode = !isNullOrUndefined(async) ? async : true;
      } else if (typeof options === "object") {
        this.options = options;
        merge(this, this.options);
      }
      this.type = this.type ? this.type.toUpperCase() : defaultType;
      this.contentType = this.contentType !== void 0 ? this.contentType : contentType;
    }
    Ajax2.prototype.send = function(data) {
      var _this = this;
      this.data = isNullOrUndefined(data) ? this.data : data;
      var eventArgs = {
        cancel: false,
        httpRequest: null
      };
      var promise = new Promise(function(resolve, reject) {
        _this.httpRequest = new XMLHttpRequest();
        _this.httpRequest.onreadystatechange = function() {
          _this.stateChange(resolve, reject);
        };
        if (!isNullOrUndefined(_this.onLoad)) {
          _this.httpRequest.onload = _this.onLoad;
        }
        if (!isNullOrUndefined(_this.onProgress)) {
          _this.httpRequest.onprogress = _this.onProgress;
        }
        if (!isNullOrUndefined(_this.onAbort)) {
          _this.httpRequest.onabort = _this.onAbort;
        }
        if (!isNullOrUndefined(_this.onError)) {
          _this.httpRequest.onerror = _this.onError;
        }
        if (!isNullOrUndefined(_this.onUploadProgress)) {
          _this.httpRequest.upload.onprogress = _this.onUploadProgress;
        }
        _this.httpRequest.open(_this.type, _this.url, _this.mode);
        if (!isNullOrUndefined(_this.data) && _this.contentType !== null) {
          _this.httpRequest.setRequestHeader("Content-Type", _this.contentType || "application/json; charset=utf-8");
        }
        if (_this.beforeSend) {
          eventArgs.httpRequest = _this.httpRequest;
          _this.beforeSend(eventArgs);
        }
        if (!eventArgs.cancel) {
          _this.httpRequest.send(!isNullOrUndefined(_this.data) ? _this.data : null);
        }
      });
      return promise;
    };
    Ajax2.prototype.successHandler = function(data) {
      if (this.onSuccess) {
        this.onSuccess(data, this);
      }
      return data;
    };
    Ajax2.prototype.failureHandler = function(reason) {
      if (this.onFailure) {
        this.onFailure(this.httpRequest);
      }
      return reason;
    };
    Ajax2.prototype.stateChange = function(resolve, reject) {
      var data = this.httpRequest.responseText;
      if (this.dataType && this.dataType.toLowerCase() === "json") {
        if (data === "") {
          data = void 0;
        } else {
          try {
            data = JSON.parse(data);
          } catch (error) {
          }
        }
      }
      if (this.httpRequest.readyState === 4) {
        if (this.httpRequest.status >= 200 && this.httpRequest.status <= 299 || this.httpRequest.status === 304) {
          resolve(this.successHandler(data));
        } else {
          if (this.emitError) {
            reject(new Error(this.failureHandler(this.httpRequest.statusText)));
          } else {
            resolve();
          }
        }
      }
    };
    Ajax2.prototype.getResponseHeader = function(key) {
      var responseHeaders = {};
      var headers = headerRegex.exec(this.httpRequest.getAllResponseHeaders());
      while (headers) {
        responseHeaders[headers[1].toLowerCase()] = headers[2];
        headers = headerRegex.exec(this.httpRequest.getAllResponseHeaders());
      }
      var header = responseHeaders[key.toLowerCase()];
      return isNullOrUndefined(header) ? null : header;
    };
    return Ajax2;
  }()
);

// node_modules/@syncfusion/ej2-base/src/fetch.js
var Fetch = (
  /** @class */
  function() {
    function Fetch2(options, type, contentType) {
      this.type = "GET";
      this.emitError = true;
      if (typeof options === "string") {
        this.url = options;
        this.type = !isNullOrUndefined(type) ? type.toUpperCase() : this.type;
        this.contentType = contentType;
      } else if (isObject(options) && Object.keys(options).length > 0) {
        merge(this, options);
      }
      this.contentType = !isNullOrUndefined(this.contentType) ? this.contentType : "application/json; charset=utf-8";
    }
    Fetch2.prototype.send = function(data) {
      var _this = this;
      var contentTypes = {
        "application/json": "json",
        "multipart/form-data": "formData",
        "application/octet-stream": "blob",
        "application/x-www-form-urlencoded": "formData"
      };
      try {
        if (isNullOrUndefined(this.fetchRequest) && this.type === "GET") {
          this.fetchRequest = new Request(this.url, {
            method: this.type
          });
        } else if (isNullOrUndefined(this.fetchRequest)) {
          this.data = !isNullOrUndefined(data) ? data : this.data;
          this.fetchRequest = new Request(this.url, {
            method: this.type,
            headers: {
              "Content-Type": this.contentType
            },
            body: this.data
          });
        }
        var eventArgs = {
          cancel: false,
          fetchRequest: this.fetchRequest
        };
        this.triggerEvent(this["beforeSend"], eventArgs);
        if (eventArgs.cancel) {
          return null;
        }
        this.fetchResponse = fetch(this.fetchRequest);
        return this.fetchResponse.then(function(response) {
          _this.triggerEvent(_this["onLoad"], response);
          if (!response.ok) {
            throw response;
          }
          var responseType = "text";
          for (var _i = 0, _a = Object.keys(contentTypes); _i < _a.length; _i++) {
            var key = _a[_i];
            if (response.headers.get("Content-Type") && response.headers.get("Content-Type").indexOf(key) !== -1) {
              responseType = contentTypes[key];
            }
          }
          return response[responseType]();
        }).then(function(data2) {
          _this.triggerEvent(_this["onSuccess"], data2, _this);
          return data2;
        }).catch(function(error) {
          var returnVal = {};
          if (_this.emitError) {
            _this.triggerEvent(_this["onFailure"], error);
            returnVal = Promise.reject(error);
          }
          return returnVal;
        });
      } catch (error) {
        return error;
      }
    };
    Fetch2.prototype.triggerEvent = function(callback, data, instance) {
      if (!isNullOrUndefined(callback) && typeof callback === "function") {
        callback(data, instance);
      }
    };
    return Fetch2;
  }()
);

// node_modules/@syncfusion/ej2-base/src/browser.js
var REGX_MOBILE = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i;
var REGX_IE = /msie|trident/i;
var REGX_IE11 = /Trident\/7\./;
var REGX_IOS = /(ipad|iphone|ipod touch)/i;
var REGX_IOS7 = /(ipad|iphone|ipod touch);.*os 7_\d|(ipad|iphone|ipod touch);.*os 8_\d/i;
var REGX_ANDROID = /android/i;
var REGX_WINDOWS = /trident|windows phone|edge/i;
var REGX_VERSION = /(version)[ /]([\w.]+)/i;
var REGX_BROWSER = {
  OPERA: /(opera|opr)(?:.*version|)[ /]([\w.]+)/i,
  EDGE: /(edge)(?:.*version|)[ /]([\w.]+)/i,
  CHROME: /(chrome|crios)[ /]([\w.]+)/i,
  PANTHOMEJS: /(phantomjs)[ /]([\w.]+)/i,
  SAFARI: /(safari)[ /]([\w.]+)/i,
  WEBKIT: /(webkit)[ /]([\w.]+)/i,
  MSIE: /(msie|trident) ([\w.]+)/i,
  MOZILLA: /(mozilla)(?:.*? rv:([\w.]+)|)/i
};
if (typeof window !== "undefined") {
  window.browserDetails = window.browserDetails || {};
}
var Browser = (
  /** @class */
  function() {
    function Browser2() {
    }
    Browser2.extractBrowserDetail = function() {
      var browserInfo = {
        culture: {}
      };
      var keys2 = Object.keys(REGX_BROWSER);
      var clientInfo = [];
      for (var _i = 0, keys_1 = keys2; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        clientInfo = Browser2.userAgent.match(REGX_BROWSER["" + key]);
        if (clientInfo) {
          browserInfo.name = clientInfo[1].toLowerCase() === "opr" ? "opera" : clientInfo[1].toLowerCase();
          browserInfo.name = clientInfo[1].toLowerCase() === "crios" ? "chrome" : browserInfo.name;
          browserInfo.version = clientInfo[2];
          browserInfo.culture.name = browserInfo.culture.language = navigator.language;
          if (Browser2.userAgent.match(REGX_IE11)) {
            browserInfo.name = "msie";
            break;
          }
          var version = Browser2.userAgent.match(REGX_VERSION);
          if (browserInfo.name === "safari" && version) {
            browserInfo.version = version[2];
          }
          break;
        }
      }
      return browserInfo;
    };
    Browser2.getEvent = function(event) {
      var events = {
        start: {
          isPointer: "pointerdown",
          isTouch: "touchstart",
          isDevice: "mousedown"
        },
        move: {
          isPointer: "pointermove",
          isTouch: "touchmove",
          isDevice: "mousemove"
        },
        end: {
          isPointer: "pointerup",
          isTouch: "touchend",
          isDevice: "mouseup"
        },
        cancel: {
          isPointer: "pointercancel",
          isTouch: "touchcancel",
          isDevice: "mouseleave"
        }
      };
      return Browser2.isPointer ? events["" + event].isPointer : Browser2.isTouch ? events["" + event].isTouch + (!Browser2.isDevice ? " " + events["" + event].isDevice : "") : events["" + event].isDevice;
    };
    Browser2.getTouchStartEvent = function() {
      return Browser2.getEvent("start");
    };
    Browser2.getTouchEndEvent = function() {
      return Browser2.getEvent("end");
    };
    Browser2.getTouchMoveEvent = function() {
      return Browser2.getEvent("move");
    };
    Browser2.getTouchCancelEvent = function() {
      return Browser2.getEvent("cancel");
    };
    Browser2.isSafari = function() {
      return Browser2.isDevice && Browser2.isIos && Browser2.isTouch && typeof window !== "undefined" && window.navigator.userAgent.toLowerCase().indexOf("iphone") === -1 && window.navigator.userAgent.toLowerCase().indexOf("safari") > -1;
    };
    Browser2.getValue = function(key, regX) {
      var browserDetails = typeof window !== "undefined" ? window.browserDetails : {};
      if (typeof navigator !== "undefined" && navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1 && Browser2.isTouch === true && !REGX_BROWSER.CHROME.test(navigator.userAgent)) {
        browserDetails["isIos"] = true;
        browserDetails["isDevice"] = true;
        browserDetails["isTouch"] = true;
        browserDetails["isPointer"] = true;
        browserDetails["isPointer"] = "pointerEnabled" in window.navigator;
      }
      if (typeof window !== "undefined" && window.Capacitor && window.Capacitor.getPlatform() === "ios") {
        browserDetails["isPointer"] = false;
      }
      if ("undefined" === typeof browserDetails["" + key]) {
        return browserDetails["" + key] = regX.test(Browser2.userAgent);
      }
      return browserDetails["" + key];
    };
    Object.defineProperty(Browser2, "userAgent", {
      get: function() {
        return Browser2.uA;
      },
      //Properties
      /**
       * Property specifies the userAgent of the browser. Default userAgent value is based on the browser.
       * Also we can set our own userAgent.
       *
       * @param {string} uA ?
       */
      set: function(uA) {
        Browser2.uA = uA;
        window.browserDetails = {};
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Browser2, "info", {
      //Read Only Properties
      /**
       * Property is to get the browser information like Name, Version and Language
       *
       * @returns {BrowserInfo} ?
       */
      get: function() {
        if (isUndefined(window.browserDetails.info)) {
          return window.browserDetails.info = Browser2.extractBrowserDetail();
        }
        return window.browserDetails.info;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Browser2, "isIE", {
      /**
       * Property is to get whether the userAgent is based IE.
       *
       * @returns {boolean} ?
       */
      get: function() {
        return Browser2.getValue("isIE", REGX_IE);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Browser2, "isTouch", {
      /**
       * Property is to get whether the browser has touch support.
       *
       * @returns {boolean} ?
       */
      get: function() {
        if (isUndefined(window.browserDetails.isTouch)) {
          return window.browserDetails.isTouch = "ontouchstart" in window.navigator || window && window.navigator && window.navigator.maxTouchPoints > 0 || "ontouchstart" in window;
        }
        return window.browserDetails.isTouch;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Browser2, "isPointer", {
      /**
       * Property is to get whether the browser has Pointer support.
       *
       * @returns {boolean} ?
       */
      get: function() {
        if (isUndefined(window.browserDetails.isPointer)) {
          return window.browserDetails.isPointer = "pointerEnabled" in window.navigator;
        }
        return window.browserDetails.isPointer;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Browser2, "isMSPointer", {
      /**
       * Property is to get whether the browser has MSPointer support.
       *
       * @returns {boolean} ?
       */
      get: function() {
        if (isUndefined(window.browserDetails.isMSPointer)) {
          return window.browserDetails.isMSPointer = "msPointerEnabled" in window.navigator;
        }
        return window.browserDetails.isMSPointer;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Browser2, "isDevice", {
      /**
       * Property is to get whether the userAgent is device based.
       *
       * @returns {boolean} ?
       */
      get: function() {
        return Browser2.getValue("isDevice", REGX_MOBILE);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Browser2, "isIos", {
      /**
       * Property is to get whether the userAgent is IOS.
       *
       * @returns {boolean} ?
       */
      get: function() {
        return Browser2.getValue("isIos", REGX_IOS);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Browser2, "isIos7", {
      /**
       * Property is to get whether the userAgent is Ios7.
       *
       * @returns {boolean} ?
       */
      get: function() {
        return Browser2.getValue("isIos7", REGX_IOS7);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Browser2, "isAndroid", {
      /**
       * Property is to get whether the userAgent is Android.
       *
       * @returns {boolean} ?
       */
      get: function() {
        return Browser2.getValue("isAndroid", REGX_ANDROID);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Browser2, "isWebView", {
      /**
       * Property is to identify whether application ran in web view.
       *
       * @returns {boolean} ?
       */
      get: function() {
        if (isUndefined(window.browserDetails.isWebView)) {
          window.browserDetails.isWebView = !(isUndefined(window.cordova) && isUndefined(window.PhoneGap) && isUndefined(window.phonegap) && window.forge !== "object");
          return window.browserDetails.isWebView;
        }
        return window.browserDetails.isWebView;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Browser2, "isWindows", {
      /**
       * Property is to get whether the userAgent is Windows.
       *
       * @returns {boolean} ?
       */
      get: function() {
        return Browser2.getValue("isWindows", REGX_WINDOWS);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Browser2, "touchStartEvent", {
      /**
       * Property is to get the touch start event. It returns event name based on browser.
       *
       * @returns {string} ?
       */
      get: function() {
        if (isUndefined(window.browserDetails.touchStartEvent)) {
          return window.browserDetails.touchStartEvent = Browser2.getTouchStartEvent();
        }
        return window.browserDetails.touchStartEvent;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Browser2, "touchMoveEvent", {
      /**
       * Property is to get the touch move event. It returns event name based on browser.
       *
       * @returns {string} ?
       */
      get: function() {
        if (isUndefined(window.browserDetails.touchMoveEvent)) {
          return window.browserDetails.touchMoveEvent = Browser2.getTouchMoveEvent();
        }
        return window.browserDetails.touchMoveEvent;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Browser2, "touchEndEvent", {
      /**
       * Property is to get the touch end event. It returns event name based on browser.
       *
       * @returns {string} ?
       */
      get: function() {
        if (isUndefined(window.browserDetails.touchEndEvent)) {
          return window.browserDetails.touchEndEvent = Browser2.getTouchEndEvent();
        }
        return window.browserDetails.touchEndEvent;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Browser2, "touchCancelEvent", {
      /**
       * Property is to cancel the touch end event.
       *
       * @returns {string} ?
       */
      get: function() {
        if (isUndefined(window.browserDetails.touchCancelEvent)) {
          return window.browserDetails.touchCancelEvent = Browser2.getTouchCancelEvent();
        }
        return window.browserDetails.touchCancelEvent;
      },
      enumerable: true,
      configurable: true
    });
    Browser2.uA = typeof navigator !== "undefined" ? navigator.userAgent : "";
    return Browser2;
  }()
);

// node_modules/@syncfusion/ej2-base/src/event-handler.js
var EventHandler = (
  /** @class */
  function() {
    function EventHandler2() {
    }
    EventHandler2.addOrGetEventData = function(element) {
      if ("__eventList" in element) {
        return element.__eventList.events;
      } else {
        element.__eventList = {};
        return element.__eventList.events = [];
      }
    };
    EventHandler2.add = function(element, eventName, listener, bindTo, intDebounce) {
      var eventData = EventHandler2.addOrGetEventData(element);
      var debounceListener;
      if (intDebounce) {
        debounceListener = debounce(listener, intDebounce);
      } else {
        debounceListener = listener;
      }
      if (bindTo) {
        debounceListener = debounceListener.bind(bindTo);
      }
      var event = eventName.split(" ");
      for (var i = 0; i < event.length; i++) {
        eventData.push({
          name: event[parseInt(i.toString(), 10)],
          listener,
          debounce: debounceListener
        });
        if (Browser.isIE) {
          element.addEventListener(event[parseInt(i.toString(), 10)], debounceListener);
        } else {
          element.addEventListener(event[parseInt(i.toString(), 10)], debounceListener, {
            passive: false
          });
        }
      }
      return debounceListener;
    };
    EventHandler2.remove = function(element, eventName, listener) {
      var eventData = EventHandler2.addOrGetEventData(element);
      var event = eventName.split(" ");
      var _loop_1 = function(j2) {
        var index = -1;
        var debounceListener;
        if (eventData && eventData.length !== 0) {
          eventData.some(function(x, i) {
            return x.name === event[parseInt(j2.toString(), 10)] && x.listener === listener ? (index = i, debounceListener = x.debounce, true) : false;
          });
        }
        if (index !== -1) {
          eventData.splice(index, 1);
        }
        if (debounceListener) {
          element.removeEventListener(event[parseInt(j2.toString(), 10)], debounceListener);
        }
      };
      for (var j = 0; j < event.length; j++) {
        _loop_1(j);
      }
    };
    EventHandler2.clearEvents = function(element) {
      var eventData = EventHandler2.addOrGetEventData(element);
      var copyData = extend([], void 0, eventData);
      for (var i = 0; i < copyData.length; i++) {
        var parseValue = copyData[parseInt(i.toString(), 10)];
        element.removeEventListener(parseValue.name, parseValue.debounce);
        eventData.shift();
      }
    };
    EventHandler2.trigger = function(element, eventName, eventProp) {
      var eventData = EventHandler2.addOrGetEventData(element);
      for (var _i = 0, eventData_1 = eventData; _i < eventData_1.length; _i++) {
        var event_1 = eventData_1[_i];
        if (event_1.name === eventName) {
          event_1.debounce.call(this, eventProp);
        }
      }
    };
    return EventHandler2;
  }()
);

// node_modules/@syncfusion/ej2-base/src/dom.js
var SVG_REG = /^svg|^path|^g/;
function createElement(tagName, properties) {
  var element = SVG_REG.test(tagName) ? document.createElementNS("http://www.w3.org/2000/svg", tagName) : document.createElement(tagName);
  if (typeof properties === "undefined") {
    return element;
  }
  element.innerHTML = properties.innerHTML ? properties.innerHTML : "";
  if (properties.className !== void 0) {
    element.className = properties.className;
  }
  if (properties.id !== void 0) {
    element.id = properties.id;
  }
  if (properties.styles !== void 0) {
    element.setAttribute("style", properties.styles);
  }
  if (properties.attrs !== void 0) {
    attributes(element, properties.attrs);
  }
  return element;
}
function addClass(elements, classes) {
  var classList = getClassList(classes);
  var regExp3 = RegExp;
  for (var _i = 0, _a = elements; _i < _a.length; _i++) {
    var ele = _a[_i];
    for (var _b = 0, classList_1 = classList; _b < classList_1.length; _b++) {
      var className = classList_1[_b];
      if (isObject(ele)) {
        var curClass = getValue("attributes.className", ele);
        if (isNullOrUndefined(curClass)) {
          setValue("attributes.className", className, ele);
        } else if (!new regExp3("\\b" + className + "\\b", "i").test(curClass)) {
          setValue("attributes.className", curClass + " " + className, ele);
        }
      } else {
        if (!ele.classList.contains(className)) {
          ele.classList.add(className);
        }
      }
    }
  }
  return elements;
}
function removeClass(elements, classes) {
  var classList = getClassList(classes);
  for (var _i = 0, _a = elements; _i < _a.length; _i++) {
    var ele = _a[_i];
    var flag = isObject(ele);
    var canRemove = flag ? getValue("attributes.className", ele) : ele.className !== "";
    if (canRemove) {
      for (var _b = 0, classList_2 = classList; _b < classList_2.length; _b++) {
        var className = classList_2[_b];
        if (flag) {
          var classes_1 = getValue("attributes.className", ele);
          var classArr = classes_1.split(" ");
          var index = classArr.indexOf(className);
          if (index !== -1) {
            classArr.splice(index, 1);
          }
          setValue("attributes.className", classArr.join(" "), ele);
        } else {
          ele.classList.remove(className);
        }
      }
    }
  }
  return elements;
}
function getClassList(classes) {
  var classList = [];
  if (typeof classes === "string") {
    classList.push(classes);
  } else {
    classList = classes;
  }
  return classList;
}
function isVisible(element) {
  var ele = element;
  return ele.style.visibility === "" && ele.offsetWidth > 0;
}
function detach(element) {
  var parentNode = element.parentNode;
  if (parentNode) {
    return parentNode.removeChild(element);
  }
}
function attributes(element, attributes2) {
  var keys2 = Object.keys(attributes2);
  var ele = element;
  for (var _i = 0, keys_1 = keys2; _i < keys_1.length; _i++) {
    var key = keys_1[_i];
    if (isObject(ele)) {
      var iKey = key;
      if (key === "tabindex") {
        iKey = "tabIndex";
      }
      ele.attributes["" + iKey] = attributes2["" + key];
    } else {
      ele.setAttribute(key, attributes2["" + key]);
    }
  }
  return ele;
}
function select(selector, context, needsVDOM) {
  if (context === void 0) {
    context = document;
  }
  selector = querySelectId(selector);
  return context.querySelector(selector);
}
function selectAll(selector, context, needsVDOM) {
  if (context === void 0) {
    context = document;
  }
  selector = querySelectId(selector);
  var nodeList = context.querySelectorAll(selector);
  return nodeList;
}
function querySelectId(selector) {
  var charRegex = /(!|"|\$|%|&|'|\(|\)|\*|\/|:|;|<|=|\?|@|\]|\^|`|{|}|\||\+|~)/g;
  if (selector.match(/#[0-9]/g) || selector.match(charRegex)) {
    var idList = selector.split(",");
    for (var i = 0; i < idList.length; i++) {
      var list = idList[parseInt(i.toString(), 10)].split(" ");
      for (var j = 0; j < list.length; j++) {
        if (list[parseInt(j.toString(), 10)].indexOf("#") > -1) {
          if (!list[parseInt(j.toString(), 10)].match(/\[.*\]/)) {
            var splitId = list[parseInt(j.toString(), 10)].split("#");
            if (splitId[1].match(/^\d/) || splitId[1].match(charRegex)) {
              var setId = list[parseInt(j.toString(), 10)].split(".");
              setId[0] = setId[0].replace(/#/, "[id='") + "']";
              list[parseInt(j.toString(), 10)] = setId.join(".");
            }
          }
        }
      }
      idList[parseInt(i.toString(), 10)] = list.join(" ");
    }
    return idList.join(",");
  }
  return selector;
}
function closest(element, selector) {
  var el = element;
  if (typeof el.closest === "function") {
    return el.closest(selector);
  }
  while (el && el.nodeType === 1) {
    if (matches(el, selector)) {
      return el;
    }
    el = el.parentNode;
  }
  return null;
}
function setStyleAttribute(element, attrs) {
  if (attrs !== void 0) {
    Object.keys(attrs).forEach(function(key) {
      element.style["" + key] = attrs["" + key];
    });
  }
}
function matches(element, selector) {
  var matches2 = element.matches || element.msMatchesSelector || element.webkitMatchesSelector;
  if (matches2) {
    return matches2.call(element, selector);
  } else {
    return [].indexOf.call(document.querySelectorAll(selector), element) !== -1;
  }
}

// node_modules/@syncfusion/ej2-base/src/base.js
var isColEName = new RegExp("]");
var Base = (
  /** @class */
  function() {
    function Base2(options, element) {
      this.isRendered = false;
      this.isComplexArraySetter = false;
      this.isServerRendered = false;
      this.allowServerDataBinding = true;
      this.isProtectedOnChange = true;
      this.properties = {};
      this.changedProperties = {};
      this.oldProperties = {};
      this.bulkChanges = {};
      this.refreshing = false;
      this.ignoreCollectionWatch = false;
      this.finalUpdate = function() {
      };
      this.childChangedProperties = {};
      this.modelObserver = new Observer(this);
      if (!isUndefined(element)) {
        if ("string" === typeof element) {
          this.element = document.querySelector(element);
        } else {
          this.element = element;
        }
        if (!isNullOrUndefined(this.element)) {
          this.isProtectedOnChange = false;
          this.addInstance();
        }
      }
      if (!isUndefined(options)) {
        this.setProperties(options, true);
      }
      this.isDestroyed = false;
    }
    Base2.prototype.setProperties = function(prop, muteOnChange) {
      var prevDetection = this.isProtectedOnChange;
      this.isProtectedOnChange = !!muteOnChange;
      merge(this, prop);
      if (muteOnChange !== true) {
        merge(this.changedProperties, prop);
        this.dataBind();
      } else if (isBlazor() && this.isRendered) {
        this.serverDataBind(prop);
      }
      this.finalUpdate();
      this.changedProperties = {};
      this.oldProperties = {};
      this.isProtectedOnChange = prevDetection;
    };
    Base2.callChildDataBind = function(obj, parent) {
      var keys2 = Object.keys(obj);
      for (var _i = 0, keys_1 = keys2; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (parent["" + key] instanceof Array) {
          for (var _a = 0, _b = parent["" + key]; _a < _b.length; _a++) {
            var obj_1 = _b[_a];
            if (obj_1.dataBind !== void 0) {
              obj_1.dataBind();
            }
          }
        } else {
          parent["" + key].dataBind();
        }
      }
    };
    Base2.prototype.clearChanges = function() {
      this.finalUpdate();
      this.changedProperties = {};
      this.oldProperties = {};
      this.childChangedProperties = {};
    };
    Base2.prototype.dataBind = function() {
      Base2.callChildDataBind(this.childChangedProperties, this);
      if (Object.getOwnPropertyNames(this.changedProperties).length) {
        var prevDetection = this.isProtectedOnChange;
        var newChanges = this.changedProperties;
        var oldChanges = this.oldProperties;
        this.clearChanges();
        this.isProtectedOnChange = true;
        this.onPropertyChanged(newChanges, oldChanges);
        this.isProtectedOnChange = prevDetection;
      }
    };
    Base2.prototype.serverDataBind = function(newChanges) {
      if (!isBlazor()) {
        return;
      }
      newChanges = newChanges ? newChanges : {};
      extend(this.bulkChanges, {}, newChanges, true);
      var sfBlazor = "sfBlazor";
      if (this.allowServerDataBinding && window["" + sfBlazor].updateModel) {
        window["" + sfBlazor].updateModel(this);
        this.bulkChanges = {};
      }
    };
    Base2.prototype.saveChanges = function(key, newValue, oldValue) {
      if (isBlazor()) {
        var newChanges = {};
        newChanges["" + key] = newValue;
        this.serverDataBind(newChanges);
      }
      if (this.isProtectedOnChange) {
        return;
      }
      this.oldProperties["" + key] = oldValue;
      this.changedProperties["" + key] = newValue;
      this.finalUpdate();
      this.finalUpdate = setImmediate(this.dataBind.bind(this));
    };
    Base2.prototype.addEventListener = function(eventName, handler) {
      this.modelObserver.on(eventName, handler);
    };
    Base2.prototype.removeEventListener = function(eventName, handler) {
      this.modelObserver.off(eventName, handler);
    };
    Base2.prototype.trigger = function(eventName, eventProp, successHandler, errorHandler) {
      var _this = this;
      if (this.isDestroyed !== true) {
        var prevDetection = this.isProtectedOnChange;
        this.isProtectedOnChange = false;
        var data = this.modelObserver.notify(eventName, eventProp, successHandler, errorHandler);
        if (isColEName.test(eventName)) {
          var handler = getValue(eventName, this);
          if (handler) {
            var blazor = "Blazor";
            if (window["" + blazor]) {
              var promise = handler.call(this, eventProp);
              if (promise && typeof promise.then === "function") {
                if (!successHandler) {
                  data = promise;
                } else {
                  promise.then(function(data2) {
                    if (successHandler) {
                      data2 = typeof data2 === "string" && _this.modelObserver.isJson(data2) ? JSON.parse(data2) : data2;
                      successHandler.call(_this, data2);
                    }
                  }).catch(function(data2) {
                    if (errorHandler) {
                      data2 = typeof data2 === "string" && _this.modelObserver.isJson(data2) ? JSON.parse(data2) : data2;
                      errorHandler.call(_this, data2);
                    }
                  });
                }
              } else if (successHandler) {
                successHandler.call(this, eventProp);
              }
            } else {
              handler.call(this, eventProp);
              if (successHandler) {
                successHandler.call(this, eventProp);
              }
            }
          } else if (successHandler) {
            successHandler.call(this, eventProp);
          }
        }
        this.isProtectedOnChange = prevDetection;
        return data;
      }
    };
    Base2.prototype.addInstance = function() {
      var moduleClass = "e-" + this.getModuleName().toLowerCase();
      addClass([this.element], ["e-lib", moduleClass]);
      if (!isNullOrUndefined(this.element.ej2_instances)) {
        this.element.ej2_instances.push(this);
      } else {
        setValue("ej2_instances", [this], this.element);
      }
    };
    Base2.prototype.destroy = function() {
      var _this = this;
      this.element.ej2_instances = this.element.ej2_instances ? this.element.ej2_instances.filter(function(i) {
        if (proxyToRaw) {
          return proxyToRaw(i) !== proxyToRaw(_this);
        }
        return i !== _this;
      }) : [];
      removeClass([this.element], ["e-" + this.getModuleName()]);
      if (this.element.ej2_instances.length === 0) {
        removeClass([this.element], ["e-lib"]);
      }
      this.clearChanges();
      this.modelObserver.destroy();
      this.isDestroyed = true;
    };
    return Base2;
  }()
);
var proxyToRaw;

// node_modules/@syncfusion/ej2-base/src/notify-property-change.js
function getObject(instance, curKey, defaultValue, type) {
  if (!Object.prototype.hasOwnProperty.call(instance.properties, curKey) || !(instance.properties["" + curKey] instanceof type)) {
    instance.properties["" + curKey] = createInstance(type, [instance, curKey, defaultValue]);
  }
  return instance.properties["" + curKey];
}
function propertyGetter(defaultValue, curKey) {
  return function() {
    if (!Object.prototype.hasOwnProperty.call(this.properties, curKey)) {
      this.properties["" + curKey] = defaultValue;
    }
    return this.properties["" + curKey];
  };
}
function propertySetter(defaultValue, curKey) {
  return function(newValue) {
    if (this.properties["" + curKey] !== newValue) {
      var oldVal = Object.prototype.hasOwnProperty.call(this.properties, curKey) ? this.properties["" + curKey] : defaultValue;
      this.saveChanges(curKey, newValue, oldVal);
      this.properties["" + curKey] = newValue;
    }
  };
}
function complexGetter(defaultValue, curKey, type) {
  return function() {
    return getObject(this, curKey, defaultValue, type);
  };
}
function complexSetter(defaultValue, curKey, type) {
  return function(newValue) {
    getObject(this, curKey, defaultValue, type).setProperties(newValue);
  };
}
function Property(defaultValue) {
  return function(target, key) {
    var propertyDescriptor = {
      set: propertySetter(defaultValue, key),
      get: propertyGetter(defaultValue, key),
      enumerable: true,
      configurable: true
    };
    Object.defineProperty(target, key, propertyDescriptor);
    addPropertyCollection(target, key, "prop", defaultValue);
  };
}
function Complex(defaultValue, type) {
  return function(target, key) {
    var propertyDescriptor = {
      set: complexSetter(defaultValue, key, type),
      get: complexGetter(defaultValue, key, type),
      enumerable: true,
      configurable: true
    };
    Object.defineProperty(target, key, propertyDescriptor);
    addPropertyCollection(target, key, "complexProp", defaultValue, type);
  };
}
function Event2() {
  return function(target, key) {
    var eventDescriptor = {
      set: function(newValue) {
        var oldValue = this.properties["" + key];
        if (oldValue !== newValue) {
          var finalContext = getParentContext(this, key);
          if (isUndefined(oldValue) === false) {
            finalContext.context.removeEventListener(finalContext.prefix, oldValue);
          }
          finalContext.context.addEventListener(finalContext.prefix, newValue);
          this.properties["" + key] = newValue;
        }
      },
      get: propertyGetter(void 0, key),
      enumerable: true,
      configurable: true
    };
    Object.defineProperty(target, key, eventDescriptor);
    addPropertyCollection(target, key, "event");
  };
}
function NotifyPropertyChanges(classConstructor) {
}
function addPropertyCollection(target, key, propertyType, defaultValue, type) {
  if (isUndefined(target.propList)) {
    target.propList = {
      props: [],
      complexProps: [],
      colProps: [],
      events: [],
      propNames: [],
      complexPropNames: [],
      colPropNames: [],
      eventNames: []
    };
  }
  target.propList[propertyType + "s"].push({
    propertyName: key,
    defaultValue,
    type
  });
  target.propList[propertyType + "Names"].push(key);
}
function getParentContext(context, prefix) {
  if (Object.prototype.hasOwnProperty.call(context, "parentObj") === false) {
    return {
      context,
      prefix
    };
  } else {
    var curText = getValue("propName", context);
    if (curText) {
      prefix = curText + "-" + prefix;
    }
    return getParentContext(getValue("parentObj", context), prefix);
  }
}

// node_modules/@syncfusion/ej2-base/src/animation.js
var __extends = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate2 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Animation = (
  /** @class */
  function(_super) {
    __extends(Animation2, _super);
    function Animation2(options) {
      var _this = _super.call(this, options, void 0) || this;
      _this.easing = {
        ease: "cubic-bezier(0.250, 0.100, 0.250, 1.000)",
        linear: "cubic-bezier(0.250, 0.250, 0.750, 0.750)",
        easeIn: "cubic-bezier(0.420, 0.000, 1.000, 1.000)",
        easeOut: "cubic-bezier(0.000, 0.000, 0.580, 1.000)",
        easeInOut: "cubic-bezier(0.420, 0.000, 0.580, 1.000)",
        elasticInOut: "cubic-bezier(0.5,-0.58,0.38,1.81)",
        elasticIn: "cubic-bezier(0.17,0.67,0.59,1.81)",
        elasticOut: "cubic-bezier(0.7,-0.75,0.99,1.01)"
      };
      return _this;
    }
    Animation_1 = Animation2;
    Animation2.prototype.animate = function(element, options) {
      options = !options ? {} : options;
      var model = this.getModel(options);
      if (typeof element === "string") {
        var elements = Array.prototype.slice.call(selectAll(element, document));
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
          var element_1 = elements_1[_i];
          model.element = element_1;
          Animation_1.delayAnimation(model);
        }
      } else {
        model.element = element;
        Animation_1.delayAnimation(model);
      }
    };
    Animation2.stop = function(element, model) {
      element.style.animation = "";
      element.removeAttribute("e-animate");
      var animationId = element.getAttribute("e-animation-id");
      if (animationId) {
        var frameId = parseInt(animationId, 10);
        cancelAnimationFrame(frameId);
        element.removeAttribute("e-animation-id");
      }
      if (model && model.end) {
        model.end.call(this, model);
      }
    };
    Animation2.delayAnimation = function(model) {
      if (animationMode === "Disable" || animationMode === GlobalAnimationMode.Disable) {
        if (model.begin) {
          model.begin.call(this, model);
        }
        if (model.end) {
          model.end.call(this, model);
        }
      } else {
        if (model.delay) {
          setTimeout(function() {
            Animation_1.applyAnimation(model);
          }, model.delay);
        } else {
          Animation_1.applyAnimation(model);
        }
      }
    };
    Animation2.applyAnimation = function(model) {
      var _this = this;
      model.timeStamp = 0;
      var step = 0;
      var timerId = 0;
      var prevTimeStamp = 0;
      var duration = model.duration;
      model.element.setAttribute("e-animate", "true");
      var startAnimation = function(timeStamp) {
        try {
          if (timeStamp) {
            prevTimeStamp = prevTimeStamp === 0 ? timeStamp : prevTimeStamp;
            model.timeStamp = timeStamp + model.timeStamp - prevTimeStamp;
            prevTimeStamp = timeStamp;
            if (!step && model.begin) {
              model.begin.call(_this, model);
            }
            step = step + 1;
            var avg = model.timeStamp / step;
            if (model.timeStamp < duration && model.timeStamp + avg < duration && model.element.getAttribute("e-animate")) {
              model.element.style.animation = model.name + " " + model.duration + "ms " + model.timingFunction;
              if (model.progress) {
                model.progress.call(_this, model);
              }
              requestAnimationFrame(startAnimation);
            } else {
              cancelAnimationFrame(timerId);
              model.element.removeAttribute("e-animation-id");
              model.element.removeAttribute("e-animate");
              model.element.style.animation = "";
              if (model.end) {
                model.end.call(_this, model);
              }
            }
          } else {
            timerId = requestAnimationFrame(startAnimation);
            model.element.setAttribute("e-animation-id", timerId.toString());
          }
        } catch (e) {
          cancelAnimationFrame(timerId);
          model.element.removeAttribute("e-animation-id");
          if (model.fail) {
            model.fail.call(_this, e);
          }
        }
      };
      startAnimation();
    };
    Animation2.prototype.getModel = function(options) {
      return {
        name: options.name || this.name,
        delay: options.delay || this.delay,
        duration: options.duration !== void 0 ? options.duration : this.duration,
        begin: options.begin || this.begin,
        end: options.end || this.end,
        fail: options.fail || this.fail,
        progress: options.progress || this.progress,
        timingFunction: this.easing[options.timingFunction] ? this.easing[options.timingFunction] : options.timingFunction || this.easing[this.timingFunction]
      };
    };
    Animation2.prototype.onPropertyChanged = function(newProp, oldProp) {
    };
    Animation2.prototype.getModuleName = function() {
      return "animation";
    };
    Animation2.prototype.destroy = function() {
    };
    var Animation_1;
    __decorate2([Property("FadeIn")], Animation2.prototype, "name", void 0);
    __decorate2([Property(400)], Animation2.prototype, "duration", void 0);
    __decorate2([Property("ease")], Animation2.prototype, "timingFunction", void 0);
    __decorate2([Property(0)], Animation2.prototype, "delay", void 0);
    __decorate2([Event2()], Animation2.prototype, "progress", void 0);
    __decorate2([Event2()], Animation2.prototype, "begin", void 0);
    __decorate2([Event2()], Animation2.prototype, "end", void 0);
    __decorate2([Event2()], Animation2.prototype, "fail", void 0);
    Animation2 = Animation_1 = __decorate2([NotifyPropertyChanges], Animation2);
    return Animation2;
  }(Base)
);
var animationMode;
var GlobalAnimationMode;
(function(GlobalAnimationMode2) {
  GlobalAnimationMode2["Default"] = "Default";
  GlobalAnimationMode2["Enable"] = "Enable";
  GlobalAnimationMode2["Disable"] = "Disable";
})(GlobalAnimationMode || (GlobalAnimationMode = {}));

// node_modules/@syncfusion/ej2-base/src/module-loader.js
var MODULE_SUFFIX = "Module";
var ModuleLoader = (
  /** @class */
  function() {
    function ModuleLoader2(parent) {
      this.loadedModules = [];
      this.parent = parent;
    }
    ModuleLoader2.prototype.inject = function(requiredModules, moduleList) {
      var reqLength = requiredModules.length;
      if (reqLength === 0) {
        this.clean();
        return;
      }
      if (this.loadedModules.length) {
        this.clearUnusedModule(requiredModules);
      }
      for (var i = 0; i < reqLength; i++) {
        var modl = requiredModules[parseInt(i.toString(), 10)];
        for (var _i = 0, moduleList_1 = moduleList; _i < moduleList_1.length; _i++) {
          var module = moduleList_1[_i];
          var modName = modl.member;
          if (module && module.prototype.getModuleName() === modl.member && !this.isModuleLoaded(modName)) {
            var moduleObject = createInstance(module, modl.args);
            var memberName = this.getMemberName(modName);
            if (modl.isProperty) {
              setValue(memberName, module, this.parent);
            } else {
              setValue(memberName, moduleObject, this.parent);
            }
            var loadedModule = modl;
            loadedModule.member = memberName;
            this.loadedModules.push(loadedModule);
          }
        }
      }
    };
    ModuleLoader2.prototype.clean = function() {
      for (var _i = 0, _a = this.loadedModules; _i < _a.length; _i++) {
        var modules = _a[_i];
        if (!modules.isProperty) {
          getValue(modules.member, this.parent).destroy();
        }
      }
      this.loadedModules = [];
    };
    ModuleLoader2.prototype.getNonInjectedModules = function(requiredModules) {
      var _this = this;
      return requiredModules.filter(function(module) {
        return !_this.isModuleLoaded(module.member);
      });
    };
    ModuleLoader2.prototype.clearUnusedModule = function(moduleList) {
      var _this = this;
      var usedModules = moduleList.map(function(arg) {
        return _this.getMemberName(arg.member);
      });
      var removableModule = this.loadedModules.filter(function(module) {
        return usedModules.indexOf(module.member) === -1;
      });
      for (var _i = 0, removableModule_1 = removableModule; _i < removableModule_1.length; _i++) {
        var mod = removableModule_1[_i];
        if (!mod.isProperty) {
          getValue(mod.member, this.parent).destroy();
        }
        this.loadedModules.splice(this.loadedModules.indexOf(mod), 1);
        deleteObject(this.parent, mod.member);
      }
    };
    ModuleLoader2.prototype.getMemberName = function(name) {
      return name[0].toLowerCase() + name.substring(1) + MODULE_SUFFIX;
    };
    ModuleLoader2.prototype.isModuleLoaded = function(modName) {
      for (var _i = 0, _a = this.loadedModules; _i < _a.length; _i++) {
        var mod = _a[_i];
        if (mod.member === this.getMemberName(modName)) {
          return true;
        }
      }
      return false;
    };
    return ModuleLoader2;
  }()
);

// node_modules/@syncfusion/ej2-base/src/child-property.js
var ChildProperty = (
  /** @class */
  function() {
    function ChildProperty2(parent, propName, defaultValue, isArray) {
      this.isComplexArraySetter = false;
      this.properties = {};
      this.changedProperties = {};
      this.childChangedProperties = {};
      this.oldProperties = {};
      this.finalUpdate = function() {
      };
      this.callChildDataBind = getValue("callChildDataBind", Base);
      this.parentObj = parent;
      this.controlParent = this.parentObj.controlParent || this.parentObj;
      this.propName = propName;
      this.isParentArray = isArray;
      this.setProperties(defaultValue, true);
    }
    ChildProperty2.prototype.updateChange = function(val, propName) {
      if (val === true) {
        this.parentObj.childChangedProperties["" + propName] = val;
      } else {
        delete this.parentObj.childChangedProperties["" + propName];
      }
      if (this.parentObj.updateChange) {
        this.parentObj.updateChange(val, this.parentObj.propName);
      }
    };
    ChildProperty2.prototype.updateTimeOut = function() {
      if (this.parentObj.updateTimeOut) {
        this.parentObj.finalUpdate();
        this.parentObj.updateTimeOut();
      } else {
        var changeTime_1 = setTimeout(this.parentObj.dataBind.bind(this.parentObj));
        var clearUpdate = function() {
          clearTimeout(changeTime_1);
        };
        this.finalUpdate = clearUpdate;
      }
    };
    ChildProperty2.prototype.clearChanges = function() {
      this.finalUpdate();
      this.updateChange(false, this.propName);
      this.oldProperties = {};
      this.changedProperties = {};
    };
    ChildProperty2.prototype.setProperties = function(prop, muteOnChange) {
      if (muteOnChange === true) {
        merge(this, prop);
        this.updateChange(false, this.propName);
        this.clearChanges();
      } else {
        merge(this, prop);
      }
    };
    ChildProperty2.prototype.dataBind = function() {
      this.callChildDataBind(this.childChangedProperties, this);
      if (this.isParentArray) {
        var curIndex = this.parentObj[this.propName].indexOf(this);
        if (Object.keys(this.changedProperties).length) {
          setValue(this.propName + "." + curIndex, this.changedProperties, this.parentObj.changedProperties);
          setValue(this.propName + "." + curIndex, this.oldProperties, this.parentObj.oldProperties);
        }
      } else {
        this.parentObj.changedProperties[this.propName] = this.changedProperties;
        this.parentObj.oldProperties[this.propName] = this.oldProperties;
      }
      this.clearChanges();
    };
    ChildProperty2.prototype.saveChanges = function(key, newValue, oldValue, restrictServerDataBind) {
      if (this.controlParent.isProtectedOnChange) {
        return;
      }
      if (!restrictServerDataBind) {
        this.serverDataBind(key, newValue, true);
      }
      this.oldProperties["" + key] = oldValue;
      this.changedProperties["" + key] = newValue;
      this.updateChange(true, this.propName);
      this.finalUpdate();
      this.updateTimeOut();
    };
    ChildProperty2.prototype.serverDataBind = function(key, value, isSaveChanges, action) {
      if (isBlazor() && !this.parentObj.isComplexArraySetter) {
        var parent_1;
        var newChanges = {};
        var parentKey = isSaveChanges ? this.getParentKey(true) + "." + key : key;
        if (parentKey.indexOf(".") !== -1) {
          var complexKeys = parentKey.split(".");
          parent_1 = newChanges;
          for (var i = 0; i < complexKeys.length; i++) {
            var isFinal = i === complexKeys.length - 1;
            parent_1[complexKeys[parseInt(i.toString(), 10)]] = isFinal ? value : {};
            parent_1 = isFinal ? parent_1 : parent_1[complexKeys[parseInt(i.toString(), 10)]];
          }
        } else {
          newChanges["" + parentKey] = {};
          parent_1 = newChanges["" + parentKey];
          newChanges["" + parentKey]["" + key] = value;
        }
        if (this.isParentArray) {
          var actionProperty = "ejsAction";
          parent_1["" + actionProperty] = action ? action : "none";
        }
        this.controlParent.serverDataBind(newChanges);
      }
    };
    ChildProperty2.prototype.getParentKey = function(isSaveChanges) {
      var index = "";
      var propName = this.propName;
      if (this.isParentArray) {
        index = this.parentObj[this.propName].indexOf(this);
        var valueLength = this.parentObj[this.propName].length;
        valueLength = isSaveChanges ? valueLength : valueLength > 0 ? valueLength - 1 : 0;
        index = index !== -1 ? "-" + index : "-" + valueLength;
        propName = propName + index;
      }
      if (this.controlParent !== this.parentObj) {
        propName = this.parentObj.getParentKey() + "." + this.propName + index;
      }
      return propName;
    };
    return ChildProperty2;
  }()
);

// node_modules/@syncfusion/ej2-base/src/validate-lic.js
var componentList = ["grid", "pivotview", "treegrid", "spreadsheet", "rangeNavigator", "DocumentEditor", "listbox", "inplaceeditor", "PdfViewer", "richtexteditor", "DashboardLayout", "chart", "stockChart", "circulargauge", "diagram", "heatmap", "lineargauge", "maps", "slider", "smithchart", "barcode", "sparkline", "treemap", "bulletChart", "kanban", "daterangepicker", "schedule", "gantt", "signature", "query-builder", "drop-down-tree", "carousel", "filemanager", "uploader", "accordion", "tab", "treeview"];
var bypassKey = [115, 121, 110, 99, 102, 117, 115, 105, 111, 110, 46, 105, 115, 76, 105, 99, 86, 97, 108, 105, 100, 97, 116, 101, 100];
var accountURL;
var LicenseValidator = (
  /** @class */
  function() {
    function LicenseValidator2(key) {
      this.isValidated = false;
      this.isLicensed = true;
      this.version = "27";
      this.platform = /JavaScript|ASPNET|ASPNETCORE|ASPNETMVC|FileFormats|essentialstudio/i;
      this.errors = {
        noLicense: "<span>This application was built using a trial version of Syncfusion Essential Studio. To remove the license validation message permanently, a valid license key must be included.</span>",
        trailExpired: "<span>This application was built using a trial version of Syncfusion Essential Studio. To remove the license validation message permanently, a valid license key must be included.</span>",
        versionMismatched: "<span>The included Syncfusion license key is invalid.</span>",
        platformMismatched: "<span>The included Syncfusion license key is invalid.</span>",
        invalidKey: "<span>The included Syncfusion license key is invalid.</span>"
      };
      this.manager = /* @__PURE__ */ function() {
        var licKey = null;
        function set(key2) {
          licKey = key2;
        }
        function get() {
          return licKey;
        }
        return {
          setKey: set,
          getKey: get
        };
      }();
      this.npxManager = /* @__PURE__ */ function() {
        var npxLicKey = "npxKeyReplace";
        function get() {
          return npxLicKey;
        }
        return {
          getKey: get
        };
      }();
      this.manager.setKey(key);
    }
    LicenseValidator2.prototype.validate = function() {
      var contentKey = [115, 121, 110, 99, 102, 117, 115, 105, 111, 110, 46, 108, 105, 99, 101, 110, 115, 101, 67, 111, 110, 116, 101, 110, 116];
      var URLKey = [115, 121, 110, 99, 102, 117, 115, 105, 111, 110, 46, 99, 108, 97, 105, 109, 65, 99, 99, 111, 117, 110, 116, 85, 82, 76];
      if (!this.isValidated && containerObject && !getValue(convertToChar(bypassKey), containerObject) && !getValue("Blazor", containerObject)) {
        var validateMsg = void 0;
        var validateURL = void 0;
        if (this.manager && this.manager.getKey() || this.npxManager && this.npxManager.getKey() !== "npxKeyReplace") {
          var result = this.getInfoFromKey();
          if (result && result.length) {
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
              var res = result_1[_i];
              if (!this.platform.test(res.platform) || res.invalidPlatform) {
                validateMsg = this.errors.platformMismatched;
              } else if (res.version.indexOf(this.version) === -1) {
                validateMsg = this.errors.versionMismatched;
                validateMsg = validateMsg.replace("##LicenseVersion", res.version);
                validateMsg = validateMsg.replace("##Requireversion", this.version + ".x");
              } else if (res.expiryDate) {
                var expDate = new Date(res.expiryDate);
                var currDate = /* @__PURE__ */ new Date();
                if (expDate !== currDate && expDate < currDate) {
                  validateMsg = this.errors.trailExpired;
                } else {
                  break;
                }
              }
            }
          } else {
            validateMsg = this.errors.invalidKey;
          }
        } else {
          var licenseContent = getValue(convertToChar(contentKey), containerObject);
          validateURL = getValue(convertToChar(URLKey), containerObject);
          if (licenseContent && licenseContent !== "") {
            validateMsg = licenseContent;
          } else {
            validateMsg = this.errors.noLicense;
          }
        }
        if (validateMsg && typeof document !== "undefined" && !isNullOrUndefined(document)) {
          accountURL = validateURL && validateURL !== "" ? validateURL : "https://www.syncfusion.com/account/claim-license-key?pl=SmF2YVNjcmlwdA==&vs=Mjc=&utm_source=es_license_validation_banner&utm_medium=listing&utm_campaign=license-information";
          var errorDiv = createElement("div", {
            innerHTML: `<img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE5OV80KSI+CjxwYXRoIGQ9Ik0xMiAyMUMxNi45NzA2IDIxIDIxIDE2Ljk3MDYgMjEgMTJDMjEgNy4wMjk0NCAxNi45NzA2IDMgMTIgM0M3LjAyOTQ0IDMgMyA3LjAyOTQ0IDMgMTJDMyAxNi45NzA2IDcuMDI5NDQgMjEgMTIgMjFaIiBzdHJva2U9IiM3MzczNzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMS4yNSAxMS4yNUgxMlYxNi41SDEyLjc1IiBmaWxsPSIjNjE2MDYzIi8+CjxwYXRoIGQ9Ik0xMS4yNSAxMS4yNUgxMlYxNi41SDEyLjc1IiBzdHJva2U9IiM3MzczNzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMS44MTI1IDlDMTIuNDMzOCA5IDEyLjkzNzUgOC40OTYzMiAxMi45Mzc1IDcuODc1QzEyLjkzNzUgNy4yNTM2OCAxMi40MzM4IDYuNzUgMTEuODEyNSA2Ljc1QzExLjE5MTIgNi43NSAxMC42ODc1IDcuMjUzNjggMTAuNjg3NSA3Ljg3NUMxMC42ODc1IDguNDk2MzIgMTEuMTkxMiA5IDExLjgxMjUgOVoiIGZpbGw9IiM3MzczNzMiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xOTlfNCI+CjxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K' style="top: 6px;
                    position: absolute;
                    left: 16px;
                    width: 24px;
                    height: 24px;"/>` + validateMsg + ' <a style="text-decoration: none;color: #0D6EFD;font-weight: 500;" href=' + accountURL + ">Claim your free account</a>"
          });
          errorDiv.setAttribute("style", "position: fixed;\n                top: 10px;\n                left: 10px;\n                right: 10px;\n                font-size: 14px;\n                background: #EEF2FF;\n                color: #222222;\n                z-index: 999999999;\n                text-align: left;\n                border: 1px solid #EEEEEE;\n                padding: 10px 11px 10px 50px;\n                border-radius: 8px;\n                font-family: Helvetica Neue, Helvetica, Arial;");
          document.body.appendChild(errorDiv);
          this.isLicensed = false;
        }
        this.isValidated = true;
        setValue(convertToChar(bypassKey), this.isValidated, containerObject);
      }
      return this.isLicensed;
    };
    LicenseValidator2.prototype.getDecryptedData = function(key) {
      try {
        return atob(key);
      } catch (error) {
        return "";
      }
    };
    LicenseValidator2.prototype.getInfoFromKey = function() {
      try {
        var licKey = "";
        var pkey = [5439488, 7929856, 5111808, 6488064, 4587520, 7667712, 5439488, 6881280, 5177344, 7208960, 4194304, 4456448, 6619136, 7733248, 5242880, 7077888, 6356992, 7602176, 4587520, 7274496, 7471104, 7143424];
        var decryptedStr = [];
        var resultArray = [];
        var invalidPlatform = false;
        var isNpxKey = false;
        if (this.manager.getKey()) {
          licKey = this.manager.getKey();
        } else {
          isNpxKey = true;
          licKey = this.npxManager.getKey().split("npxKeyReplace")[1];
        }
        var licKeySplit = licKey.split(";");
        for (var _i = 0, licKeySplit_1 = licKeySplit; _i < licKeySplit_1.length; _i++) {
          var lKey = licKeySplit_1[_i];
          var decodeStr = this.getDecryptedData(lKey);
          if (!decodeStr) {
            continue;
          }
          var k = 0;
          var buffr = "";
          if (!isNpxKey) {
            for (var i = 0; i < decodeStr.length; i++, k++) {
              if (k === pkey.length) {
                k = 0;
              }
              var c = decodeStr.charCodeAt(i);
              buffr += String.fromCharCode(c ^ pkey[parseInt(k.toString(), 10)] >> 16);
            }
          } else {
            var charKey = decodeStr[decodeStr.length - 1];
            var decryptedKey = [];
            for (var i = 0; i < decodeStr.length; i++) {
              decryptedKey[parseInt(i.toString(), 10)] = decodeStr[parseInt(i.toString(), 10)].charCodeAt(0) - charKey.charCodeAt(0);
            }
            for (var i = 0; i < decryptedKey.length; i++) {
              buffr += String.fromCharCode(decryptedKey[parseInt(i.toString(), 10)]);
            }
          }
          if (this.platform.test(buffr)) {
            decryptedStr = buffr.split(";");
            invalidPlatform = false;
            if (decryptedStr.length > 3) {
              resultArray.push({
                platform: decryptedStr[0],
                version: decryptedStr[1],
                expiryDate: decryptedStr[2]
              });
            }
          } else if (buffr && buffr.split(";").length > 3) {
            invalidPlatform = true;
          }
        }
        if (invalidPlatform && !resultArray.length) {
          return [{
            invalidPlatform
          }];
        } else {
          return resultArray.length ? resultArray : null;
        }
      } catch (error) {
        return null;
      }
    };
    return LicenseValidator2;
  }()
);
var licenseValidator = new LicenseValidator();
function convertToChar(cArr) {
  var ret = "";
  for (var _i = 0, cArr_1 = cArr; _i < cArr_1.length; _i++) {
    var arr = cArr_1[_i];
    ret += String.fromCharCode(arr);
  }
  return ret;
}
function registerLicense(key) {
  licenseValidator = new LicenseValidator(key);
}
var validateLicense = function(key) {
  if (key) {
    registerLicense(key);
  }
  return licenseValidator.validate();
};
var createLicenseOverlay = function() {
  var bannerTemplate = '\n    <div style="\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: rgba(0, 0, 0, 0.5);\n    z-index: 99999;\n    ">\n        <div style="\n    background: #FFFFFF;\n    height: 455px;\n    width: 840px;\n    font-family: Helvetica Neue, Helvetica, Arial;\n    color: #000000;\n    box-shadow: 0px 4.8px 14.4px rgb(0 0 0 / 18%), 0px 25.6px 57.6px rgb(0 0 0 / 22%);\n    display: block;\n    margin: 8% auto;\n    border-radius: 20px;\n    ">\n            <div style="\n    position: absolute;\nwidth: 838px;\nheight: 62px;\nbackground-color: #F9F9F9;\nborder: 1px solid #EEEEEE;\nborder-top-left-radius: 20px;\nborder-top-right-radius: 20px;\n">\n                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ2IiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMTQ2IDMyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNDAuNTk2NSAxNS4wMDc4SDMyLjQyNUMzMS41NTU3IDE1LjAwNzggMzAuOTAzNyAxNS4xODEyIDMwLjUxMjUgMTUuNDg0NkMzMC4xMjEzIDE1LjgzMTQgMjkuOTA0IDE2LjMwODIgMjkuOTA0IDE3LjA0NTFDMjkuOTA0IDE3LjYwODYgMzAuMDc3OCAxOC4wNDIxIDMwLjQyNTYgMTguMzAyMkMzMC43NzMzIDE4LjYwNTYgMzEuMjk0OSAxOC43MzU2IDMxLjk5MDMgMTguNzM1NkgzNi4zMzY5QzM4LjExODkgMTguNzM1NiAzOS40MjI5IDE5LjA4MjQgNDAuMTYxOCAxOS43MzI2QzQwLjk0NDIgMjAuNDI2MiA0MS4yOTE5IDIxLjU1MzIgNDEuMjkxOSAyMy4xMTM3QzQxLjI5MTkgMjQuNzE3NiA0MC44NTcyIDI1Ljg4OCAzOS45ODc5IDI2LjY2ODJDMzkuMTE4NiAyNy40MDUxIDM3LjcyNzcgMjcuNzk1MyAzNS44NTg3IDI3Ljc5NTNIMjcuMDc4N1YyNS4wMjFIMzUuMzM3MkMzNi4yOTM0IDI1LjAyMSAzNi45NDU0IDI0Ljg5MSAzNy4zMzY2IDI0LjYzMDlDMzcuNzI3NyAyNC4zNzA4IDM3LjkwMTYgMjMuODk0IDM3LjkwMTYgMjMuMjg3MUMzNy45MDE2IDIyLjYzNjkgMzcuNzI3NyAyMi4xNjAxIDM3LjM4IDIxLjlDMzcuMDMyMyAyMS42Mzk5IDM2LjQyMzggMjEuNDY2NSAzNS41NTQ1IDIxLjQ2NjVIMzEuNjQyNkMyOS44NjA1IDIxLjQ2NjUgMjguNTEzMSAyMS4xMTk4IDI3LjY4NzMgMjAuMzgyOEMyNi44NjE0IDE5LjY0NTkgMjYuNDI2OCAxOC41MTg5IDI2LjQyNjggMTcuMDAxN0MyNi40MjY4IDE1LjM1NDUgMjYuODYxNCAxNC4xNDA4IDI3LjczMDcgMTMuMzYwNkMyOC42IDEyLjU4MDMgMjkuOTkwOSAxMi4yMzM1IDMxLjkwMzQgMTIuMjMzNUg0MC41OTY1VjE1LjAwNzhaIiBmaWxsPSIjMzU0M0E4Ii8+CjxwYXRoIGQ9Ik00OC4wNzI3IDI1LjI4MTFINTAuNTA2OFYxNi4zOTQ5SDUzLjU0OTNWMjcuNTM1MkM1My41NDkzIDI5LjA1MjQgNTMuMjAxNiAzMC4xNzk0IDUyLjUwNjIgMzAuOTE2M0M1MS44MTA3IDMxLjY1MzIgNTAuNzI0MSAzMiA0OS4yNDYzIDMySDQzLjMzNVYyOS42NTkySDQ4LjcyNDdDNDkuMjg5NyAyOS42NTkyIDQ5Ljc2NzkgMjkuNTI5MiA1MC4wNzIxIDI5LjIyNThDNTAuMzc2NCAyOC45NjU3IDUwLjU1MDIgMjguNTMyMiA1MC41NTAyIDI4LjAxMlYyNy44Mzg2SDQ3Ljg5ODlDNDYuMjAzNyAyNy44Mzg2IDQ0Ljk0MzIgMjcuNDkxOSA0NC4yNDc4IDI2Ljg0MTZDNDMuNTA4OSAyNi4xNDgxIDQzLjE2MTEgMjUuMDY0NCA0My4xNjExIDIzLjQ2MDVWMTYuMzk0OUg0Ni4xNjAyVjIzLjIwMDVDNDYuMTYwMiAyNC4wNjc0IDQ2LjI5MDYgMjQuNjMwOSA0Ni41NTE0IDI0Ljg5MUM0Ni43MjUzIDI1LjE1MTEgNDcuMjQ2OSAyNS4yODExIDQ4LjA3MjcgMjUuMjgxMVoiIGZpbGw9IiMzNTQzQTgiLz4KPHBhdGggZD0iTTU1Ljg5NjUgMTYuMzk0OUg2MS41OTA0QzYzLjMyOTEgMTYuMzk0OSA2NC41NDYxIDE2LjY5ODMgNjUuMjg1IDE3LjM0ODVDNjYuMDIzOSAxNy45OTg4IDY2LjM3MTYgMTkuMDgyNCA2Ni4zNzE2IDIwLjU1NjNWMjcuNzk1M0g2My4zMjkxVjIwLjk0NjRDNjMuMzI5MSAyMC4wNzk0IDYzLjE5ODcgMTkuNTE1OSA2Mi45Mzc5IDE5LjI5OTJDNjIuNjc3MSAxOS4wMzkxIDYyLjE1NTUgMTguOTA5MSA2MS4zMjk3IDE4LjkwOTFINTguODk1NlYyNy44Mzg2SDU1Ljg1M1YxNi4zOTQ5SDU1Ljg5NjVaIiBmaWxsPSIjMzU0M0E4Ii8+CjxwYXRoIGQ9Ik03NC45MzQyIDI1LjM2NzhINzguMTUwNlYyNy43OTUySDc0LjAyMTRDNzIuOTc4MiAyNy43OTUyIDcyLjEwODkgMjcuNjY1MiA3MS40NTcgMjcuNDkxOEM3MC44MDUgMjcuMjc1IDcwLjE5NjUgMjYuOTI4MyA2OS43MTgzIDI2LjQ1MTRDNjkuMTk2OCAyNS45MzEzIDY4Ljc2MjEgMjUuMjgxMSA2OC40NTc4IDI0LjU0NDJDNjguMTUzNiAyMy44MDcyIDY4LjAyMzIgMjIuOTgzNiA2OC4wMjMyIDIyLjE2QzY4LjAyMzIgMjEuMjkzMSA2OC4xNTM2IDIwLjQ2OTUgNjguNDU3OCAxOS42ODkyQzY4Ljc2MjEgMTguOTA5IDY5LjE1MzMgMTguMzAyMSA2OS43MTgzIDE3Ljc4MTlDNzAuMjM5OSAxNy4zMDUxIDcwLjgwNSAxNi45NTgzIDcxLjUwMDQgMTYuNzQxNkM3Mi4xOTU5IDE2LjUyNDkgNzMuMDIxNyAxNi40MzgyIDc0LjA2NDkgMTYuNDM4Mkg3OC4xOTQxVjE4LjkwOUg3NC45MzQyQzczLjQ5OTggMTguOTA5IDcyLjU0MzYgMTkuMTY5MSA3MS45Nzg1IDE5LjY0NTlDNzEuNDU2OSAyMC4xMjI3IDcxLjE1MjcgMjAuOTg5NyA3MS4xNTI3IDIyLjIwMzRDNzEuMTUyNyAyMi44OTY5IDcxLjI4MzEgMjMuNDYwNSA3MS41MDA0IDIzLjkzNzNDNzEuNzE3NyAyNC40MTQxIDcyLjA2NTUgMjQuNzYwOSA3Mi41MDAxIDI1LjA2NDNDNzIuNzE3NCAyNS4xOTQ0IDcyLjk3ODIgMjUuMjgxMSA3My4yODI1IDI1LjM2NzhDNzMuNjMwMiAyNS4zMjQ0IDc0LjE1MTggMjUuMzY3OCA3NC45MzQyIDI1LjM2NzhaIiBmaWxsPSIjMzU0M0E4Ii8+CjxwYXRoIGQ9Ik04MC44NDU2IDE4LjY0ODlINzguNjcyNFYxNi4zNTE1SDgwLjg0NTZWMTUuMTgxMUM4MC44NDU2IDE0LjAxMDggODEuMDYzIDEzLjIzMDUgODEuNDk3NiAxMi44NDA0QzgxLjkzMjMgMTIuNDUwMyA4Mi43NTgxIDEyLjIzMzUgODMuOTc1MSAxMi4yMzM1SDg2Ljg0MzhWMTQuNDAwOUg4NS40MDk1Qzg0Ljg4NzkgMTQuNDAwOSA4NC41NDAyIDE0LjQ4NzYgODQuMzIyOSAxNC42NjFDODQuMTA1NSAxNC44MzQ0IDgzLjk3NTEgMTUuMDk0NSA4My45NzUxIDE1LjQ0MTJWMTYuMzUxNUg4Ni44NDM4VjE4LjY0ODlIODMuOTc1MVYyNy43OTUzSDgwLjg0NTZWMTguNjQ4OVoiIGZpbGw9IiMzNTQzQTgiLz4KPHBhdGggZD0iTTk4LjQwNTYgMjcuNzk1M0g5Mi43MTE2QzkxLjAxNjUgMjcuNzk1MyA4OS44NDI5IDI3LjQ0ODUgODkuMDYwNSAyNi43OTgzQzg4LjMyMTYgMjYuMTQ4MSA4Ny45MzA0IDI1LjA2NDQgODcuOTMwNCAyMy41OTA2VjE2LjM5NDlIOTAuOTI5NVYyMy40MTcyQzkwLjkyOTUgMjQuMTk3NCA5MS4wNTk5IDI0LjY3NDMgOTEuMzIwNyAyNC45MzQ0QzkxLjU4MTUgMjUuMTk0NCA5Mi4xMDMxIDI1LjMyNDUgOTIuOTI4OSAyNS4zMjQ1SDk1LjM2M1YxNi4zOTQ5SDk4LjQwNTZWMjcuNzk1M1oiIGZpbGw9IiMzNTQzQTgiLz4KPHBhdGggZD0iTTEwMC42MjIgMjUuNDExMkgxMDcuMDExQzEwNy41NzcgMjUuNDExMiAxMDguMDExIDI1LjMyNDUgMTA4LjI3MiAyNS4xNTExQzEwOC41MzMgMjQuOTc3NyAxMDguNjYzIDI0LjY3NDMgMTA4LjY2MyAyNC4zMjc1QzEwOC42NjMgMjMuOTM3NCAxMDguNTMzIDIzLjY3NzMgMTA4LjI3MiAyMy40NjA1QzEwOC4wMTEgMjMuMjg3MSAxMDcuNTc3IDIzLjIwMDUgMTA3LjA1NSAyMy4yMDA1SDEwNC40NDdDMTAyLjg4MiAyMy4yMDA1IDEwMS44MzkgMjIuOTgzNyAxMDEuMzE4IDIyLjUwNjlDMTAwLjc1MiAyMi4wMzAxIDEwMC40OTIgMjEuMjA2NSAxMDAuNDkyIDE5Ljk5MjdDMTAwLjQ5MiAxOC43NzkgMTAwLjgzOSAxNy44Njg3IDEwMS40OTEgMTcuMjYxOEMxMDIuMTQzIDE2LjY5ODMgMTAzLjE4NyAxNi4zOTQ5IDEwNC41MzQgMTYuMzk0OUgxMTEuMDU0VjE4Ljc3OUgxMDUuNzA4QzEwNC44MzggMTguNzc5IDEwNC4yNzMgMTguODY1NyAxMDQuMDEyIDE4Ljk5NTdDMTAzLjc1MiAxOS4xNjkxIDEwMy42MjEgMTkuNDI5MiAxMDMuNjIxIDE5LjgxOTRDMTAzLjYyMSAyMC4xNjYxIDEwMy43NTIgMjAuNDI2MiAxMDMuOTY5IDIwLjU5OTZDMTA0LjE4NiAyMC43NzMgMTA0LjU3NyAyMC44NTk3IDEwNS4wNTYgMjAuODU5N0gxMDcuNzk0QzEwOS4wNTQgMjAuODU5NyAxMTAuMDExIDIxLjE2MzEgMTEwLjY2MyAyMS43MjY2QzExMS4zMTUgMjIuMjkwMiAxMTEuNjYyIDIzLjE1NzEgMTExLjY2MiAyNC4yNDA4QzExMS42NjIgMjUuMjgxMSAxMTEuMzU4IDI2LjE0ODEgMTEwLjc5MyAyNi43OTgzQzExMC4yMjggMjcuNDQ4NSAxMDkuNDQ2IDI3Ljc5NTMgMTA4LjUzMyAyNy43OTUzSDEwMC43MDlWMjUuNDExMkgxMDAuNjIyWiIgZmlsbD0iIzM1NDNBOCIvPgo8cGF0aCBkPSJNMTE2LjU3NCAxNS4wOTQ0SDExMy40MDFWMTIuMjc2OUgxMTYuNTc0VjE1LjA5NDRaTTExNi41NzQgMjcuNzk1M0gxMTMuNDAxVjE2LjM5NDlIMTE2LjU3NFYyNy43OTUzWiIgZmlsbD0iIzM1NDNBOCIvPgo8cGF0aCBkPSJNMTMwLjMwOSAyMi4xMTY3QzEzMC4zMDkgMjMuODkzOSAxMjkuNzQ0IDI1LjMyNDQgMTI4LjY1NyAyNi40MDgxQzEyNy41NzEgMjcuNDkxOCAxMjYuMDkzIDI4LjAxMiAxMjQuMjI0IDI4LjAxMkMxMjIuMzU1IDI4LjAxMiAxMjAuODc3IDI3LjQ5MTggMTE5Ljc5IDI2LjQwODFDMTE4LjcwNCAyNS4zMjQ0IDExOC4xMzkgMjMuODkzOSAxMTguMTM5IDIyLjExNjdDMTE4LjEzOSAyMC4zMzk0IDExOC43MDQgMTguOTA5IDExOS43OSAxNy44MjUzQzEyMC44NzcgMTYuNzQxNiAxMjIuMzk4IDE2LjIyMTQgMTI0LjIyNCAxNi4yMjE0QzEyNi4wNDkgMTYuMjIxNCAxMjcuNTI3IDE2Ljc0MTYgMTI4LjY1NyAxNy44MjUzQzEyOS43NDQgMTguODY1NiAxMzAuMzA5IDIwLjI5NjEgMTMwLjMwOSAyMi4xMTY3Wk0xMjEuMjY4IDIyLjExNjdDMTIxLjI2OCAyMy4yMDA0IDEyMS41MjkgMjQuMDY3MyAxMjIuMDUxIDI0LjY3NDJDMTIyLjU3MiAyNS4yODExIDEyMy4yNjggMjUuNTg0NSAxMjQuMTggMjUuNTg0NUMxMjUuMDkzIDI1LjU4NDUgMTI1Ljc4OSAyNS4yODExIDEyNi4zMSAyNC42NzQyQzEyNi44MzIgMjQuMDY3MyAxMjcuMDkzIDIzLjIwMDQgMTI3LjA5MyAyMi4xMTY3QzEyNy4wOTMgMjEuMDMzIDEyNi44MzIgMjAuMTY2MSAxMjYuMzEgMTkuNjAyNUMxMjUuNzg5IDE4Ljk5NTcgMTI1LjA5MyAxOC42OTIyIDEyNC4xMzcgMTguNjkyMkMxMjMuMjI0IDE4LjY5MjIgMTIyLjUyOSAxOC45OTU3IDEyMi4wMDcgMTkuNjAyNUMxMjEuNTI5IDIwLjE2NjEgMTIxLjI2OCAyMS4wMzMgMTIxLjI2OCAyMi4xMTY3WiIgZmlsbD0iIzM1NDNBOCIvPgo8cGF0aCBkPSJNMTMxLjc4NyAxNi4zOTQ5SDEzNy40ODFDMTM5LjIxOSAxNi4zOTQ5IDE0MC40MzYgMTYuNjk4MyAxNDEuMTc1IDE3LjM0ODVDMTQxLjkxNCAxNy45OTg4IDE0Mi4yNjIgMTkuMDgyNCAxNDIuMjYyIDIwLjU1NjNWMjcuNzk1M0gxMzkuMjE5VjIwLjk0NjRDMTM5LjIxOSAyMC4wNzk0IDEzOS4wODkgMTkuNTE1OSAxMzguODI4IDE5LjI5OTJDMTM4LjU2NyAxOS4wMzkxIDEzOC4wNDYgMTguOTA5MSAxMzcuMjIgMTguOTA5MUgxMzQuNzg2VjI3LjgzODZIMTMxLjc0M1YxNi4zOTQ5SDEzMS43ODdaIiBmaWxsPSIjMzU0M0E4Ii8+CjxwYXRoIGQ9Ik03LjEyODMxIDMuNzM3NDNIMFYxMC44NDY0SDcuMTI4MzFWMy43Mzc0M1oiIGZpbGw9IiMzNTQzQTgiLz4KPHBhdGggZD0iTTIzLjI1MTMgLTIuMTU3MjVlLTA1TDE4LjU1MTMgNS41MTY4NUwyNC4wODMxIDEwLjIwNDFMMjguNzgzMSA0LjY4NzI1TDIzLjI1MTMgLTIuMTU3MjVlLTA1WiIgZmlsbD0iI0ZGODYwMCIvPgo8cGF0aCBkPSJNMTUuNjA0MSAzLjczNzQzSDguNDc1ODNWMTAuODQ2NEgxNS42MDQxVjMuNzM3NDNaIiBmaWxsPSIjMzU0M0E4Ii8+CjxwYXRoIGQ9Ik03LjEyODMxIDEyLjE5MDJIMFYxOS4yOTkySDcuMTI4MzFWMTIuMTkwMloiIGZpbGw9IiMzNTQzQTgiLz4KPHBhdGggZD0iTTE1LjYwNDEgMTIuMTkwMkg4LjQ3NTgzVjE5LjI5OTJIMTUuNjA0MVYxMi4xOTAyWiIgZmlsbD0iIzM1NDNBOCIvPgo8cGF0aCBkPSJNMjQuMDc5NyAxMi4xOTAySDE2Ljk1MTRWMTkuMjk5MkgyNC4wNzk3VjEyLjE5MDJaIiBmaWxsPSIjRkY4NjAwIi8+CjxwYXRoIGQ9Ik03LjEyODMxIDIwLjY4NjNIMFYyNy43OTUzSDcuMTI4MzFWMjAuNjg2M1oiIGZpbGw9IiMzNTQzQTgiLz4KPHBhdGggZD0iTTE1LjYwNDEgMjAuNjg2M0g4LjQ3NTgzVjI3Ljc5NTNIMTUuNjA0MVYyMC42ODYzWiIgZmlsbD0iIzM1NDNBOCIvPgo8cGF0aCBkPSJNMjQuMTIzMiAyMC42ODYzSDE2Ljk5NDlWMjcuNzk1M0gyNC4xMjMyVjIwLjY4NjNaIiBmaWxsPSIjMzU0M0E4Ii8+CjxwYXRoIGQ9Ik0xNDYgMTUuODMxM0MxNDYgMTYuODcxNyAxNDUuMTc0IDE3LjY5NTMgMTQ0LjEzMSAxNy42OTUzQzE0My4wODggMTcuNjk1MyAxNDIuMjYyIDE2Ljg3MTcgMTQyLjI2MiAxNS44MzEzQzE0Mi4yNjIgMTQuNzkxIDE0My4wODggMTQuMDEwNyAxNDQuMTMxIDE0LjAxMDdDMTQ1LjEzMSAxMy45Njc0IDE0NiAxNC43OTEgMTQ2IDE1LjgzMTNaTTE0Mi45NTcgMTQuNzkxQzE0Mi42OTcgMTUuMDUxMSAxNDIuNTY2IDE1LjQ0MTIgMTQyLjU2NiAxNS44MzEzQzE0Mi41NjYgMTYuNjk4MyAxNDMuMjYyIDE3LjM5MTggMTQ0LjEzMSAxNy4zOTE4QzE0NSAxNy4zOTE4IDE0NS42OTYgMTYuNjk4MyAxNDUuNjk2IDE1LjgzMTNDMTQ1LjY5NiAxNS4wMDc3IDE0NSAxNC4yNzA4IDE0NC4xNzQgMTQuMjcwOEMxNDMuNjUzIDE0LjI3MDggMTQzLjI2MiAxNC40NDQyIDE0Mi45NTcgMTQuNzkxWk0xNDQuODcgMTYuOTE1SDE0NC40NzlMMTQzLjkxNCAxNi4wOTE0VjE2LjkxNUgxNDMuNjA5VjE0Ljc0NzZIMTQzLjk1N0MxNDQuNDM1IDE0Ljc0NzYgMTQ0LjY1MyAxNC45NjQ0IDE0NC42NTMgMTUuMzU0NUMxNDQuNjUzIDE1LjY1NzkgMTQ0LjQ3OSAxNS44NzQ3IDE0NC4xNzQgMTUuOTYxNEwxNDQuODcgMTYuOTE1Wk0xNDQuMDQ0IDE1LjY1NzlDMTQ0LjI2MSAxNS42NTc5IDE0NC4zOTIgMTUuNTI3OSAxNDQuMzkyIDE1LjM1NDVDMTQ0LjM5MiAxNS4xMzc4IDE0NC4yNjEgMTUuMDUxMSAxNDQuMDAxIDE1LjA1MTFIMTQzLjkxNFYxNS42NTc5SDE0NC4wNDRaIiBmaWxsPSIjMzU0M0E4Ii8+Cjwvc3ZnPgo=" style="\n    text-align: left;\n    width: 146px;\n    position: absolute;\n    top: 14px;\n    left: 31px;\n">\n            </div>\n            <div style="\n    position: relative;\n    top: 80px;\n    left: 32px;\n    font-size: 20px;\n    text-align: left;\n    font-weight: 700;\n    letter-spacing: 0.02em;\n    font-style: normal;\n    line-height: 125%;\n    ">Claim your FREE account and get a key in less than a minute</div>\n            <ul style="\n        font-size: 15px;\n        font-weight: 400;\n        color: #333333;\n        letter-spacing: 0.01em;\n        position: relative;\n        left: 32px;\n        top: 88px;\n        line-height: 180%;\n        ">\n                <li><span>Access to a 30-day free trial of any of our products.</span></li>\n                <li><span>Access to 24x5 support by developers via the <a href="https://support.syncfusion.com/create?utm_source=es_license_validation_banner&utm_medium=listing&utm_campaign=license-information" style="text-decoration: none;\n                color: #0D6EFD;\n                font-weight: 500;">support tickets</a>, <a href="https://www.syncfusion.com/forums?utm_source=es_license_validation_banner&utm_medium=listing&utm_campaign=license-information" style="text-decoration: none;\n                color: #0D6EFD;\n                font-weight: 500;">forum</a>, <a href="https://www.syncfusion.com/feedback?utm_source=es_license_validation_banner&utm_medium=listing&utm_campaign=license-information\n                " style="text-decoration: none;\n                color: #0D6EFD;\n                font-weight: 500;">feature &amp; feedback page</a> and chat.</span></li>\n                <li><span>200+ <a href="https://www.syncfusion.com/succinctly-free-ebooks?utm_source=es_license_validation_banner&utm_medium=listing&utm_campaign=license-information" style="text-decoration: none;\n                color: #0D6EFD;\n                font-weight: 500;">ebooks </a>on the latest technologies, industry trends, and research topics.</span>\n                </li>\n                <li><span>Largest collection of over 7,000 flat and wireframe icons for free with Syncfusion <a href="https://www.syncfusion.com/downloads/metrostudio?utm_source=es_license_validation_banner&utm_medium=listing&utm_campaign=license-information\n                " style="text-decoration: none;\n                color: #0D6EFD;\n                font-weight: 500;">Metro Studio.</a></span></li>\n                <li><span>Free and unlimited access to Syncfusion technical <a href="https://www.syncfusion.com/blogs/?utm_source=es_license_validation_banner&utm_medium=listing&utm_campaign=license-information\n                " style="text-decoration: none;\n                color: #0D6EFD;\n                font-weight: 500;">blogs</a> and <a href="https://www.syncfusion.com/resources/techportal/whitepapers?utm_source=es_license_validation_banner&utm_medium=listing&utm_campaign=license-information" style="text-decoration: none;\n                color: #0D6EFD;\n                font-weight: 500;">whitepapers.</a></span></li>\n            </ul>\n            <div style="\n            font-size: 18px;\n            font-weight: 700;\n            position: relative;\n            line-height: 125%;\n            letter-spacing: 0.02em;\n            top: 90px;\n            left: 32px;\n    ">Syncfusion is trusted by 29,000+ businesses worldwide</div>\n            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODIwIiBoZWlnaHQ9IjU2IiB2aWV3Qm94PSIwIDAgODIwIDU2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00MjcuNjE3IDIyLjU2NTlWMjQuNzIyNkM0MjYuNTU4IDI0LjM2MzggNDI1LjM5OCAyNC4xNTQ0IDQyNC40NzQgMjQuMTU0NEM0MjMuMzMzIDI0LjE1NDQgNDIyLjY5OCAyNC40OTEyIDQyMi42OTggMjUuMDk2M0M0MjIuNjk4IDI1LjQ4MjQgNDIyLjk3NiAyNS43MzgzIDQyMy43NzMgMjYuMDg1NEw0MjUuOTE3IDI3LjAxNzRDNDI3LjYzMyAyNy43NjM5IDQyOC40OTcgMjguODUzIDQyOC40OTcgMzAuMjY4MUM0MjguNDk3IDMyLjQ1MjIgNDI2LjU0NiAzMy44MyA0MjMuNDUyIDMzLjgzQzQyMi4zMjQgMzMuODMgNDIxLjAxOCAzMy42NzM2IDQxOS42MzYgMzMuMzcwOVYzMS4xNDE2QzQyMS4wMDYgMzEuNTAyOCA0MjIuMjYyIDMxLjY5NTcgNDIzLjIzOSAzMS42OTU3QzQyNC41MTggMzEuNjk1NyA0MjUuMjAzIDMxLjM1MDYgNDI1LjIwMyAzMC43MDc0QzQyNS4yMDMgMzAuMzIwOCA0MjQuOTM1IDMwLjAzNjcgNDI0LjMyMiAyOS43NzE3TDQyMS45NzUgMjguNzU5M0M0MjAuMjM2IDI4LjAwNzggNDE5LjQzMyAyNi45OTU0IDQxOS40MzMgMjUuNTUyMUM0MTkuNDMzIDIzLjQ4MzcgNDIxLjMxNCAyMi4xNjQ5IDQyNC4yNjUgMjIuMTY0OUM0MjUuMjk4IDIyLjE2NDkgNDI2LjU3IDIyLjMxNzEgNDI3LjYxNyAyMi41NjU5VjIyLjU2NTlaTTQzMC4xNjcgMjIuMzkwOUg0MzMuNjM1VjMzLjYwMzlINDMwLjE2N1YyMi4zOTA5Wk00NDQuOTExIDIyLjM5MDlWMjQuNDQ1MUg0MzkuNjc1VjI2Ljk3NDJINDQ0LjI0OVYyOC44MzIzSDQzOS42NzVWMzEuNDU0M0g0NDQuOTc4VjMzLjYwMzlINDM2LjMwNVYyMi4zOTA5SDQ0NC45MTFaTTQ2MS4yOTQgMjIuMzkwOVYzMy42MDM5SDQ1Ny45MzlWMjYuMjIzNkw0NTQuNjUyIDMzLjY5MTVINDUyLjUzMUw0NDkuMjY2IDI2LjIyMzZWMzMuNjAzOUg0NDYuOTQ5VjIyLjM5MDlINDUxLjE4NEw0NTQuMTc4IDI5LjIxMTRMNDU3LjE1NiAyMi4zOTA5SDQ2MS4yOTRWMjIuMzkwOVpNNDcyLjU3OSAyMi4zOTA5VjI0LjQ0NTFINDY3LjMzNVYyNi45NzQySDQ3MS45MDhWMjguODMyM0g0NjcuMzM1VjMxLjQ1NDNINDcyLjYzOFYzMy42MDM5SDQ2My45NTdWMjIuMzkwOUg0NzIuNTc5Wk00ODQuNzk0IDIyLjM5MDlWMzMuNjAzOUg0ODEuMDkzTDQ3Ni45MjYgMjYuNDEyM1YzMy42MDM5SDQ3NC42MDhWMjIuMzkwOUg0NzguNDA3TDQ4Mi40ODQgMjkuNDg3NlYyMi4zOTA5SDQ4NC43OTRaTTQ5NC44NTggMjIuNTY1OVYyNC43MjI2QzQ5My44MDcgMjQuMzY2MyA0OTIuNjQgMjQuMTU0NCA0OTEuNzMyIDI0LjE1NDRDNDkwLjU3MyAyNC4xNTQ0IDQ4OS45MzkgMjQuNDg1OCA0ODkuOTM5IDI1LjA5M0M0ODkuOTM5IDI1LjQ4ODYgNDkwLjE5OCAyNS43MjUgNDkxLjAyMyAyNi4wODU5TDQ5My4xNTcgMjcuMDE3OEM0OTQuODg1IDI3Ljc3MjIgNDk1LjczOSAyOC44NTE4IDQ5NS43MzkgMzAuMjgzNUM0OTUuNzM5IDMyLjQ1NTkgNDkzLjc4NiAzMy44MzA4IDQ5MC42OTkgMzMuODMwOEM0ODkuNTY5IDMzLjgzMDggNDg4LjI1OSAzMy42NzM2IDQ4Ni44NzggMzMuMzcxN1YzMS4xNDI0QzQ4OC4yNDcgMzEuNTAyOCA0ODkuNDk5IDMxLjY5NjUgNDkwLjQ3IDMxLjY5NjVDNDkxLjc0IDMxLjY5NjUgNDkyLjQ0NCAzMS4zNTE1IDQ5Mi40NDQgMzAuNzI4NUM0OTIuNDQ0IDMwLjMxNjMgNDkyLjE5NyAzMC4wNTA0IDQ5MS41NTUgMjkuNzcyNUw0ODkuMjE4IDI4Ljc2MDFDNDg3LjQ2NyAyOC4wMDI4IDQ4Ni42NzQgMjcuMDAyIDQ4Ni42NzQgMjUuNTUzM0M0ODYuNjc0IDIzLjQ4NjIgNDg4LjU1NiAyMi4xNjY1IDQ5MS41IDIyLjE2NjVDNDkyLjUzNiAyMi4xNjUzIDQ5My44MTMgMjIuMzE3MSA0OTQuODU4IDIyLjU2NTlWMjIuNTY1OVoiIGZpbGw9IiMwMEEwQjAiLz4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzUyLjQxMyAyNi44MTlDMzUwLjk5MiAyNS4yNzU5IDM0OS42MzggMjMuODMxNSAzNDguMzQ5IDIyLjE1NzRMMzQ3LjkyIDIxLjU5OTVDMzQ5LjQwNiAyMS4zNjkzIDM1MC42OTUgMjAuMzg0OCAzNTAuNjk1IDE4Ljc0MzNDMzUwLjY5NSAxNy4yMzMxIDM0OS41MzkgMTYuMjQ4MiAzNDcuODIxIDE2LjI0ODJDMzQ2LjU5OCAxNi4yNDgyIDM0NS43MDYgMTYuMzEzNyAzNDUuMjQzIDE2LjMxMzdDMzQ0LjcxNSAxNi4zMTM3IDM0NC4yODUgMTYuMzEzNyAzNDMuNzkgMTYuMjgwOEMzNDMuODU2IDE4LjE1MjEgMzQzLjg4OSAxOC4yODM0IDM0My44ODkgMTkuNDMyMlYyMy42MzQzQzM0My44ODkgMjQuNDU1MyAzNDMuODU2IDI1LjI3NTkgMzQzLjc5IDI2LjgxODZDMzQ0LjE1MyAyNi43MjAyIDM0NC41MTcgMjYuNzIwMiAzNDQuNzgxIDI2LjcyMDJDMzQ1LjA0NSAyNi43MjAyIDM0NS40MDkgMjYuNzUzMSAzNDUuNzA2IDI2LjgxODZDMzQ1LjY0IDI1Ljc2NzkgMzQ1LjYwNyAyNC4wMjgzIDM0NS42MDcgMjMuNjM0M1YyMS4yMDUxQzM0Ny4xNiAyMy4yMDc3IDM0OS4yMDkgMjUuNjY5NSAzNTAuMDAxIDI2LjgxODZDMzUwLjM5OCAyNi43MjAyIDM1MC43MjggMjYuNzIwMiAzNTEuMTI0IDI2LjcyMDJDMzUxLjQ1NSAyNi43MjA2IDM1MS45MTggMjYuNzIwNiAzNTIuNDEzIDI2LjgxOVYyNi44MTlaTTM0OC44NzggMTkuMDA2QzM0OC44NzggMjAuMDIzNCAzNDguMzE3IDIxLjIwNTQgMzQ2Ljc5NyAyMS4yMDU0QzM0Ni40IDIxLjIwNTQgMzQ2LjAwMyAyMS4yMDU0IDM0NS42MDcgMjEuMTcyNVYxNy4wNjg4QzM0Ni4wMDMgMTYuOTcwNCAzNDYuNDk5IDE2LjkwNDYgMzQ2Ljc2MyAxNi45MDQ2QzM0OC4wODUgMTYuOTA0OSAzNDguODc4IDE3LjY2IDM0OC44NzggMTkuMDA2VjE5LjAwNlpNMzgyLjM4IDI2Ljg4NDVDMzgxLjgxOSAyNi4yOTM2IDM4MC45NiAyNS4zNDE3IDM4MC4xMzQgMjQuNDIyM0MzODAuODI4IDIzLjY2NzIgMzgxLjU1NSAyMi41NTEgMzgxLjk4NCAyMS41OTkxQzM4MS43MTkgMjEuNDY3OCAzODEuMzU2IDIxLjIwNTEgMzgxLjA5MiAyMC45NzUzQzM4MC45OTMgMjEuNzk1OSAzODAuNDMyIDIyLjg3OTIgMzc5LjYzOSAyMy44MzE1QzM3OC41MTUgMjIuNTE4NSAzNzguMjE4IDIyLjE1NzQgMzc3LjE5MyAyMC43Nzg1QzM3OC41ODEgMTkuODkyMSAzNzkuMjQyIDE4Ljg3NDMgMzc5LjI0MiAxOC4wNTM3QzM3OS4yNDIgMTcuMTAxNyAzNzguNTgxIDE2LjExNjkgMzc2Ljk2MiAxNi4xMTY5QzM3NS4yMTEgMTYuMTE2OSAzNzQuMzUyIDE3LjIwMDIgMzc0LjM1MiAxOC40ODAzQzM3NC4zNTIgMTkuMjM1NCAzNzQuNTUgMTkuODkxNyAzNzUuMzc2IDIwLjk3NTNDMzc0LjA1NCAyMS42OTc1IDM3Mi43NjYgMjIuNzQ3OSAzNzIuNzY2IDI0LjQyMjNDMzcyLjc2NiAyNi4wNjM5IDM3NC4wODcgMjYuOTE3NCAzNzUuNzA3IDI2LjkxNzRDMzc3LjE5MyAyNi45MTc0IDM3OC4xNTEgMjYuMzI2NiAzNzguOTEyIDI1LjYzNjlMMzc5LjkwMiAyNi44MTlDMzgwLjIgMjYuNzg2MSAzODAuNTMxIDI2LjcyMDYgMzgwLjg2MSAyNi43MjA2QzM4MS4zMjQgMjYuNzIwNiAzODEuODUyIDI2Ljc4NjEgMzgyLjM4IDI2Ljg4NDVWMjYuODg0NVpNMzgzLjM3MiA0MC4wMTU4QzM4MS45MTggMzguNDczIDM4MC41OTcgMzcuMDYxMiAzNzkuMzA4IDM1LjM4NzFMMzc4Ljg3OCAzNC44Mjg4QzM4MC4zMzIgMzQuNTk5MSAzODEuNjU0IDMzLjYxNSAzODEuNjU0IDMxLjk0MDFDMzgxLjY1NCAzMC40NjMyIDM4MC40OTggMjkuNDQ1NCAzNzguNzc5IDI5LjQ0NTRDMzc3LjU1NyAyOS40NDU0IDM3Ni42MzIgMjkuNTQzNSAzNzYuMTY5IDI5LjU0MzVDMzc1LjY3MyAyOS41NDM1IDM3NS4yNDQgMjkuNTQzNSAzNzQuNzQ4IDI5LjQ3NzZDMzc0LjgxNCAzMS4zODIyIDM3NC44NDggMzEuNDgwMiAzNzQuODQ4IDMyLjYyOTRWMzYuODMxMUMzNzQuODQ4IDM3LjY1MjQgMzc0LjgxNCAzOC41MDUyIDM3NC43NDggNDAuMDE1NEMzNzUuMTEyIDM5Ljk0OTYgMzc1LjQ3NSAzOS45NDk2IDM3NS43MDcgMzkuOTQ5NkMzNzYuMDA0IDM5Ljk0OTYgMzc2LjM2OCAzOS45NDk2IDM3Ni42MzIgNDAuMDE1NEMzNzYuNTY1IDM4Ljk5OCAzNzYuNTMzIDM3LjI1ODEgMzc2LjUzMyAzNi44MzExVjM0LjQzNDhDMzc4LjExOSAzNi40MDQyIDM4MC4xNjcgMzguODk5NiAzODAuOTYgNDAuMDE1NEMzODEuMzU2IDM5Ljk0OTYgMzgxLjY4NyAzOS45NDk2IDM4Mi4wODMgMzkuOTQ5NkMzODIuMzggMzkuOTUgMzgyLjg3NiAzOS45NSAzODMuMzcyIDQwLjAxNThaTTM2Mi4xNiAyNi44MTlDMzYwLjk3MSAyNS41NzE1IDM1OC44ODkgMjIuOTc4IDM1OC4wNjMgMjEuOTkzNUwzNTcuMjM3IDIwLjk3NTdDMzU4LjA5NiAxOS45NTgzIDM1OC42OSAxOS4zMzQxIDM1OS4zMTkgMTguNTc5QzM2MC4wNDUgMTcuNzkxIDM2MC43MDYgMTYuOTcwNCAzNjEuNDk5IDE2LjI0ODJDMzYxLjEzNiAxNi4zMTM3IDM2MC45MzcgMTYuMzEzNyAzNjAuNzM5IDE2LjMxMzdDMzYwLjU0MSAxNi4zMTM3IDM2MC4zNDMgMTYuMzEzNyAzNjAuMTQ0IDE2LjI0ODJDMzU5LjkxMyAxNi42MDkzIDM1OS41NSAxNy4wNjg4IDM1OS4xNTMgMTcuNTI4N0MzNTguNzU2IDE3Ljk1NTYgMzU4LjM2IDE4LjM4MjIgMzU4LjA2MyAxOC43NDMzQzM1Ny4yMzYgMTkuNjk1MiAzNTYuNzc0IDIwLjE1NDcgMzU1LjU4NSAyMS4yNzA5VjE5LjQ2NTVDMzU1LjU4NSAxOC40MTUxIDM1NS41ODUgMTcuNzI1NSAzNTUuNjUxIDE2LjI0ODJDMzU1LjMyMSAxNi4zMTM3IDM1NC45NTcgMTYuMzEzNyAzNTQuNzI2IDE2LjMxMzdDMzU0LjQ2MSAxNi4zMTM3IDM1NC4wMzIgMTYuMzEzNyAzNTMuNzY4IDE2LjI0ODJDMzUzLjgzMyAxNy44MjM5IDM1My44NjcgMTguMjgzNCAzNTMuODY3IDE5LjQzMjVWMjMuNjM0N0MzNTMuODY3IDI0LjY4NSAzNTMuODMzIDI1LjMwODggMzUzLjc2OCAyNi44MTlDMzU0LjE2NCAyNi43MjA2IDM1NC40OTUgMjYuNzIwNiAzNTQuNzI2IDI2LjcyMDZDMzU0Ljk1NyAyNi43MjA2IDM1NS4zNTMgMjYuNzUzNSAzNTUuNjUxIDI2LjgxOUMzNTUuNTg1IDI1LjE0NDkgMzU1LjU4NSAyNC4xNTk3IDM1NS41ODUgMjMuNjM0N1YyMS40MzUyQzM1Ni44MDcgMjIuODc5NiAzNTguNjkgMjUuMjQzMyAzNTkuNzQ4IDI2LjgxOUMzNjAuMTMgMjYuNzU2MyAzNjAuNTE3IDI2LjcyMzQgMzYwLjkwNSAyNi43MjA2QzM2MS4yMDIgMjYuNzIwNiAzNjEuNjY1IDI2LjcyMDYgMzYyLjE2IDI2LjgxOVYyNi44MTlaTTM3Mi42MDEgNDAuMDE1OEMzNzIuNTY4IDM5Ljg1MTkgMzcyLjUzNSAzOS43MjA2IDM3Mi41MzUgMzkuNTIzNEMzNzIuNTM1IDM5LjM5MjggMzcyLjU2OCAzOS4yMjgxIDM3Mi42MDEgMzkuMDk2NEMzNzEuMjggMzkuMTI5NyAzNjguOTAxIDM5LjE5NTIgMzY4LjM3MiAzOS4xOTUyVjM0LjY2NDlDMzY5LjY5NCAzNC42NjQ5IDM3MC45ODIgMzQuNjY0OSAzNzIuMjcgMzQuNzk2M0MzNzIuMjM4IDM0LjYzMjQgMzcyLjIwNCAzNC40Njc3IDM3Mi4yMDQgMzQuMzM2NEMzNzIuMjA0IDM0LjIwNTggMzcyLjIwNCAzNC4wNDE5IDM3Mi4yNyAzMy44NDQ3QzM3MS4zNDYgMzMuOTQyOCAzNjkuMTk4IDMzLjk3NiAzNjguMzcyIDMzLjk3NlYzMC4yNjZDMzY5LjgyNiAzMC4yNjYgMzcwLjY4NSAzMC4yNjYgMzcxLjE4IDMwLjI5OTNMMzcyLjUwMiAzMC4zNjUxQzM3Mi40MzYgMzAuMTY3OSAzNzIuNDM2IDMwLjA2OTIgMzcyLjQzNiAyOS45MDUzQzM3Mi40MzYgMjkuNzQxNCAzNzIuNDM2IDI5LjcwODEgMzcyLjUwMiAyOS40NDU4QzM3MS40MTEgMjkuNDc4MyAzNjkuOTI1IDI5LjU0MzggMzY5LjI2NCAyOS41NDM4QzM2OC44MDIgMjkuNTQzOCAzNjcuMzQ4IDI5LjUxMTMgMzY2LjU4NyAyOS40NDU4QzM2Ni42NTQgMzAuMjY2NCAzNjYuNjg2IDMxLjYxMjMgMzY2LjY4NiAzMi41NjQyVjM2Ljg2NTFDMzY2LjY4NiAzNy40ODg1IDM2Ni42MiAzOC43MzU3IDM2Ni41ODcgNDAuMDE2MkMzNjcuNTEzIDM5Ljk1MDMgMzY4LjgwMiAzOS45NTAzIDM2OS4yNjQgMzkuOTUwM0MzNzAuMDI0IDM5Ljk1IDM3MS42NDMgMzkuOTUgMzcyLjYwMSA0MC4wMTU4Wk0zNjQuNjA1IDM5LjEyOTRDMzY0LjQ0IDM4LjgwMDggMzY0LjM0MSAzOC4zMDg4IDM2NC4yNzUgMzguMDQ2MUMzNjIuOTIgMzkuMTYxOSAzNjEuOTk1IDM5LjM5MjQgMzYwLjkzOCAzOS4zOTI0QzM1OC41OTIgMzkuMzkyNCAzNTcuMzM3IDM3LjI5MTMgMzU3LjMzNyAzNC42NjQ5QzM1Ny4zMzcgMzEuNzQzNiAzNTguNzU3IDMwLjAzNjIgMzYxLjE2OSAzMC4wMzYyQzM2Mi40MjUgMzAuMDM2MiAzNjMuNjE0IDMwLjU5NDUgMzY0LjE3NiAzMS4xNTI4QzM2NC4yMDggMzAuODg5OCAzNjQuMzA4IDMwLjM2NDggMzY0LjQ3MyAzMC4wNjg4QzM2My4zMTYgMjkuNTExMyAzNjIuMjU5IDI5LjM0NjYgMzYxLjEwMiAyOS4zNDY2QzM1Ny4yMzcgMjkuMzQ2NiAzNTUuNDUzIDMxLjc0MzYgMzU1LjQ1MyAzNC44Mjg4QzM1NS40NTMgMzguMzA5MSAzNTcuNzk4IDQwLjE0NzEgMzYwLjczOSA0MC4xNDcxQzM2Mi40MjUgNDAuMTQ3MSAzNjMuODEyIDM5LjYyMjIgMzY0LjYwNSAzOS4xMjk0VjM5LjEyOTRaTTM0Mi4zMDMgMjYuODE5QzM0MC41MTkgMjMuNDA0OSAzMzguOCAxOS4xMzczIDMzNy41NzggMTYuMTE2OUgzMzcuMzhDMzM2LjU4NyAxOC4wMjA3IDMzNS4xMzMgMjEuMjcwOSAzMzQuNzM3IDIyLjE4OTlDMzM0LjI3NCAyMy4zMDYxIDMzMy4yNSAyNS41MDU2IDMzMi41ODkgMjYuODE4NkMzMzIuODAzIDI2Ljc1MzggMzMzLjAyNiAyNi43MjA2IDMzMy4yNSAyNi43MjAyQzMzMy40NDggMjYuNzIwMiAzMzMuNjEzIDI2Ljc1MzEgMzMzLjg0NSAyNi44MTg2QzMzNC4xNzUgMjUuOTMyMiAzMzQuNjM4IDI0LjgxNiAzMzUuMTMzIDIzLjYzNDNDMzM1Ljc5NCAyMy42MDE0IDMzNi4zODkgMjMuNTY4OCAzMzYuOTg0IDIzLjU2ODhDMzM3LjYxMiAyMy41Njg4IDMzOC4yNzIgMjMuNjAxNCAzMzguOTMzIDIzLjYzNDNMMzM5LjU5NCAyNS4yMUwzNDAuMjU1IDI2LjgxODZDMzQwLjcxNyAyNi43MjAyIDM0MS4wOCAyNi43MjAyIDM0MS4zMTIgMjYuNzIwMkMzNDEuNjA5IDI2LjcyMDYgMzQxLjg3MyAyNi43MjA2IDM0Mi4zMDMgMjYuODE5VjI2LjgxOVpNMzUzLjYzNiAyOS40NDU0QzM1My40MzggMjkuNTExMyAzNTMuMjczIDI5LjU0MzUgMzUzLjEwNyAyOS41NDM1QzM1Mi45MDkgMjkuNTQzNSAzNTIuNzQ0IDI5LjUxMDkgMzUyLjU0NiAyOS40NDU0QzM1Mi42NDQgMzAuNzU4NCAzNTIuNjc4IDMyLjA3MTQgMzUyLjY3OCAzMy4zNTE5VjM2LjczMzRDMzUyLjE0OSAzNi4yNzM2IDM1MC44NiAzNS4wOTE5IDM0OS4zNzQgMzMuNzEzQzM0Ny44NiAzMi4zMDc0IDM0Ni4zOTQgMzAuODUxMSAzNDQuOTc5IDI5LjM0NjZIMzQ0Ljc0OEMzNDQuNzgxIDMwLjgyNDMgMzQ0LjgxNCAzMi40IDM0NC44MTQgMzMuODExNFYzNS44Nzk5QzM0NC44MTQgMzcuNjUyOCAzNDQuODE0IDM4LjYwNDcgMzQ0LjcxNSA0MC4wMTYyQzM0NC45OCAzOS45NTAzIDM0NS4xMTIgMzkuOTUwMyAzNDUuMzEgMzkuOTUwM0MzNDUuNDQyIDM5Ljk1MDMgMzQ1LjU3NSAzOS45NTAzIDM0NS44MDYgNDAuMDE2MkMzNDUuNzQgMzguNjcwNiAzNDUuNzA3IDM2LjQ3MDggMzQ1LjcwNyAzNS44Nzk5VjMyLjU5NjhDMzQ4LjE4NSAzNC44NjI1IDM1MS4yMjQgMzcuODgyNiAzNTMuNDcxIDQwLjE0NzVIMzUzLjYwM0MzNTMuNjAzIDM4LjkzMjkgMzUzLjUzNyAzNy43MTc5IDM1My41MzcgMzYuNTA0VjM0LjYzMjdDMzUzLjUzNiAzMi40MzI1IDM1My41MzYgMzEuMzQ5MyAzNTMuNjM2IDI5LjQ0NTRaTTM0Mi41NjcgNDAuMDE1OEMzNDIuNTM0IDM5Ljg1MTkgMzQyLjUwMSAzOS43MjA2IDM0Mi41MDEgMzkuNTIzNEMzNDIuNTAxIDM5LjM5MjggMzQyLjUzNCAzOS4yMjgxIDM0Mi41NjcgMzkuMDk2NEMzNDEuMjQ2IDM5LjEyOTcgMzM4Ljg2NyAzOS4xOTUyIDMzOC4zNzEgMzkuMTk1MlYzNC42NjQ5QzMzOS42NiAzNC42NjQ5IDM0MC45NDggMzQuNjY0OSAzNDIuMjM3IDM0Ljc5NjNDMzQyLjIwNCAzNC42MzI0IDM0Mi4xNzEgMzQuNDY3NyAzNDIuMTcxIDM0LjMzNjRDMzQyLjE3MSAzNC4yMDU4IDM0Mi4xNzEgMzQuMDQxOSAzNDIuMjM3IDMzLjg0NDdDMzQxLjMxMiAzMy45NDI4IDMzOS4xOTcgMzMuOTc2IDMzOC4zNzEgMzMuOTc2VjMwLjI2NkMzMzkuNzkyIDMwLjI2NiAzNDAuNjUxIDMwLjI2NiAzNDEuMTc5IDMwLjI5OTNMMzQyLjQ2OCAzMC4zNjUxQzM0Mi40MzUgMzAuMTY3OSAzNDIuNDM1IDMwLjA2OTIgMzQyLjQzNSAyOS45MDUzQzM0Mi40MzUgMjkuNzQxNCAzNDIuNDM1IDI5LjY3NTUgMzQyLjQ2OCAyOS40NDU4QzM0MS4zNzggMjkuNDc4MyAzMzkuODkxIDI5LjU0MzggMzM5LjIzIDI5LjU0MzhDMzM4Ljc2NyAyOS41NDM4IDMzNy4zMTQgMjkuNTExMyAzMzYuNTU0IDI5LjQ0NThDMzM2LjYyIDMwLjI2NjQgMzM2LjY1MyAzMS42MTIzIDMzNi42NTMgMzIuNTY0MlYzNi44NjUxQzMzNi42NTMgMzcuNDg4NSAzMzYuNTg3IDM4LjczNTcgMzM2LjU1NCA0MC4wMTYyQzMzNy41MTIgMzkuOTUwMyAzMzguNzY3IDM5Ljk1MDMgMzM5LjIzIDM5Ljk1MDNDMzM5Ljk5IDM5Ljk1IDM0MS42NDIgMzkuOTUgMzQyLjU2NyA0MC4wMTU4VjQwLjAxNThaTTMzMS4yMDEgMjYuODE5QzMzMC42NzMgMjMuMjQwNiAzMzAuMjEgMTkuNDk4NCAzMjkuODQ3IDE2LjExNjlDMzI5Ljc0OCAxNi4xNDk4IDMyOS43MTQgMTYuMTQ5OCAzMjkuNjQ5IDE2LjExNjlDMzI4Ljk1NSAxNy4zMzE1IDMyOC4xNjIgMTguNjQ0NSAzMjcuNTY3IDE5LjU2MzlDMzI3LjAwNiAyMC40NTAzIDMyNi4zNDUgMjEuNTAwNyAzMjUuNTg1IDIyLjYxNjlDMzIzLjk5OSAyMC41ODE3IDMyMi4zNDcgMTguMDIxMSAzMjEuMjU2IDE2LjExNjlDMzIxLjE5IDE2LjE0OTggMzIxLjE1NyAxNi4xMTY5IDMyMS4wOTEgMTYuMTE2OUMzMjAuNzI4IDE5LjQ5OCAzMjAuMjMyIDIzLjI3MzIgMzE5LjczNiAyNi44MTlDMzIwLjAwMSAyNi43MjA2IDMyMC4xNjYgMjYuNzIwNiAzMjAuMjk4IDI2LjcyMDZDMzIwLjQ5NiAyNi43MjA2IDMyMC42MjggMjYuNzUzNSAzMjAuODU5IDI2LjgxOUMzMjAuOTkyIDI0LjQ1NTMgMzIxLjI1NiAyMi4xMjQ0IDMyMS41NTMgMTkuNjYyM0MzMjIuODQyIDIxLjUzMzYgMzIzLjk2NSAyMy4xNDIyIDMyNS4yMjEgMjQuODQ5M0MzMjYuMjc4IDIzLjIwNzcgMzI3LjM2OCAyMS40MzQ4IDMyOC41NTggMTkuNjI5NEMzMjguODg4IDIyLjE1NyAzMjkuMTg2IDI0LjQ1NTMgMzI5LjM1MSAyNi44MTlDMzI5Ljc4IDI2LjcyMDYgMzMwLjA3OCAyNi43MjA2IDMzMC4yNzYgMjYuNzIwNkMzMzAuNTQgMjYuNzIwNiAzMzAuODA1IDI2LjcyMDYgMzMxLjIwMSAyNi44MTlWMjYuODE5Wk0zMzQuOTY4IDMyLjIwMjhDMzM0Ljk2OCAzMC4yOTg5IDMzMy40NDggMjkuNDQ1NCAzMzEuNTk4IDI5LjQ0NTRDMzMwLjc3MiAyOS40NDU0IDMyOS44OCAyOS41NDM1IDMyOS4yNTIgMjkuNTQzNUMzMjkuMDIxIDI5LjU0MzUgMzI4LjUyNSAyOS41NDM1IDMyNy45OTcgMjkuNDc3NkMzMjguMDMgMzAuNTI4MyAzMjguMDk2IDMxLjQxNDggMzI4LjA5NiAzMi40MzIyVjM2LjkyOTVDMzI4LjA5NiAzNy45MTQ4IDMyOC4wMyAzOC45OTggMzI3Ljk5NyA0MC4wMTU0QzMyOC40MjYgMzkuOTQ5NiAzMjguNzI0IDM5Ljk0OTYgMzI4LjkyMiAzOS45NDk2QzMyOS4xNTMgMzkuOTQ5NiAzMjkuNDg0IDM5Ljk0OTYgMzI5Ljg4IDQwLjAxNTRDMzI5LjgxNSAzOS4wMzE5IDMyOS43ODIgMzguMDQ2NSAzMjkuNzgxIDM3LjA2MDlWMzUuNDJDMzMwLjE0NSAzNS40NTI2IDMzMC41MDggMzUuNDUyNiAzMzAuOTA1IDM1LjQ1MjZDMzMyLjgyIDM1LjQ1MjYgMzM0Ljk2OCAzNC43MzA0IDMzNC45NjggMzIuMjAyOFYzMi4yMDI4Wk0zMjYuMDE0IDM2Ljg5NzNDMzI2LjAxNCAzNS4yNTU4IDMyNC45MjQgMzQuNTMzNiAzMjMuMDQgMzMuNzQ1NkMzMjEuNjg2IDMzLjE4OCAzMjAuOTkyIDMyLjY5NTYgMzIwLjk5MiAzMS42NDQ1QzMyMC45OTIgMzAuNjYgMzIxLjc1MiAzMC4wMzYyIDMyMy4wMDggMzAuMDM2MkMzMjMuODM0IDMwLjAzNjIgMzI0LjU2MSAzMC4zMzE1IDMyNS4yMjIgMzAuODU2OEMzMjUuMjg3IDMwLjQ5NTcgMzI1LjQ1MyAzMC4xMzQ3IDMyNS42NTEgMjkuODM5NEMzMjQuODU4IDI5LjQ3ODMgMzIzLjk5OSAyOS4zNDcgMzIzLjA3NCAyOS4zNDdDMzIwLjM2NSAyOS4zNDcgMzE5LjUwNSAzMC44OTA1IDMxOS41MDUgMzIuMjAzNUMzMTkuNTA1IDMzLjgxMTggMzIwLjI5OSAzNC41NjcyIDMyMi4zNDcgMzUuMzU1M0MzMjMuNjM2IDM1Ljg0NyAzMjQuMjk2IDM2LjQ3MTEgMzI0LjI5NiAzNy41NTQ0QzMyNC4yOTYgMzguNzAzNSAzMjMuNDM3IDM5LjQyNTcgMzIyLjI0OCAzOS40MjU3QzMyMS41NTQgMzkuNDI1NyAzMjAuMzY1IDM5LjA2NDYgMzE5LjUzOSAzOC4zMDk5QzMxOS41MDUgMzguNzM2MSAzMTkuNTA1IDM5LjEzMDQgMzE5LjM3MyAzOS40OTE1QzMxOS45MDIgMzkuNzU0NiAzMjEuMTI1IDQwLjE0NzkgMzIyLjIxNSA0MC4xNDc5QzMyNC45OSA0MC4xNDcxIDMyNi4wMTQgMzguNDM5NyAzMjYuMDE0IDM2Ljg5NzNWMzYuODk3M1pNMzc4LjE1MiAxNy45ODgyQzM3OC4xNTIgMTguOTczIDM3Ny40NTggMTkuNjYyMyAzNzYuNzY0IDIwLjIyMDJDMzc2LjMwMSAxOS41NjM5IDM3NS43NCAxOC42NzcxIDM3NS43NCAxNy45ODgyQzM3NS43NCAxNy4yMzMxIDM3Ni4yNjggMTYuODA2MSAzNzYuOTk1IDE2LjgwNjFDMzc3Ljk4NyAxNi44MDY1IDM3OC4xNTIgMTcuNjkyNiAzNzguMTUyIDE3Ljk4ODJWMTcuOTg4MlpNMzc4LjQ4MiAyNS4wMTMyQzM3OC4xMTkgMjUuMzQxNyAzNzcuMjYgMjUuOTY1NSAzNzYuNTMzIDI1Ljk2NTVDMzc1LjU3NCAyNS45NjU1IDM3NC40MTggMjUuMjc1OSAzNzQuNDE4IDIzLjc5ODZDMzc0LjQxOCAyMi40ODU1IDM3NS4yNzcgMjEuODk0NyAzNzUuODA2IDIxLjU2NjVDMzc3LjAyOCAyMy4yNDA2IDM3Ny4wOTUgMjMuMzM5MSAzNzguNDgyIDI1LjAxMzJaTTM3OS44MDQgMzIuMjAyOEMzNzkuODA0IDMzLjI1MzUgMzc5LjI3NSAzNC40MDI2IDM3Ny43NTUgMzQuNDAyNkMzNzcuMzI2IDM0LjQwMjYgMzc2LjkyOSAzNC40MDI2IDM3Ni41MzMgMzQuMzY5M1YzMC4yNjU2QzM3Ni45MjkgMzAuMTY3NiAzNzcuNDI1IDMwLjEzNDMgMzc3LjcyMiAzMC4xMzQzQzM3OS4wMTEgMzAuMTM0MyAzNzkuODA0IDMwLjg4OTggMzc5LjgwNCAzMi4yMDI4Wk0zMzguNjAyIDIyLjgxNDFDMzM3LjkwOSAyMi44NDY2IDMzNy41NDUgMjIuODQ2NiAzMzcuMDgyIDIyLjg0NjZDMzM2LjUyMSAyMi44NDY2IDMzNi4xOSAyMi44NDY2IDMzNS40NjMgMjIuODE0MUwzMzcuMDgyIDE5LjAwNkwzMzguNjAyIDIyLjgxNDFaTTMzMy4xNTEgMzIuMzAwOEMzMzMuMTUxIDMzLjgxMTEgMzMyLjI1OCAzNC43OTU5IDMzMC44MDUgMzQuNzk1OUMzMzAuNTA3IDM0Ljc5NTkgMzMwLjE3NyAzNC43OTU5IDMyOS43OCAzNC43MzAxVjMwLjIzMjdDMzMwLjI0MyAzMC4xNjY5IDMzMC42MzkgMzAuMTMzOSAzMzEuMDM2IDMwLjEzMzlDMzMyLjQyNCAzMC4xMzQzIDMzMy4xNTEgMzEuMDIxMSAzMzMuMTUxIDMyLjMwMDhaTTM2OS41MjggMjMuNjY3NkMzNjkuNTI4IDIyLjAyNiAzNjguNDM4IDIxLjMwMzkgMzY2LjU1NSAyMC41MTYyQzM2NS4yIDE5Ljk1ODMgMzY0LjUwNiAxOS40OTg4IDM2NC41MDYgMTguNDE1MUMzNjQuNTA2IDE3LjQ2MzIgMzY1LjI2NiAxNi44MDY1IDM2Ni41MjEgMTYuODA2NUMzNjcuMzQ4IDE2LjgwNjUgMzY4LjA3NSAxNy4xMDE3IDM2OC43MzUgMTcuNjI3NUMzNjguODAyIDE3LjI2NjQgMzY4Ljk2NyAxNi45MDQ5IDM2OS4xMzEgMTYuNjQyMkMzNjguMzcyIDE2LjI4MTEgMzY3LjQ3OSAxNi4xMTcyIDM2Ni41ODcgMTYuMTE3MkMzNjMuOTQ0IDE2LjExNzIgMzYyLjk4NiAxNy42NiAzNjIuOTg2IDE5LjAwNkMzNjIuOTg2IDIwLjU4MTcgMzYzLjgxMiAyMS4zMzY4IDM2NS44NjEgMjIuMTI0NEMzNjcuMTQ5IDIyLjYxNjkgMzY3LjgxIDIzLjI0MDYgMzY3LjgxIDI0LjM1NjhDMzY3LjgxIDI1LjQ3MyAzNjYuOTUxIDI2LjE5NTIgMzY1Ljc2MiAyNi4xOTUyQzM2NS4wMzUgMjYuMTk1MiAzNjMuODc5IDI1LjgzNDEgMzYzLjA1MiAyNS4xMTE5QzM2My4wMiAyNS41Mzg5IDM2Mi45ODYgMjUuOSAzNjIuODg3IDI2LjI2MTFDMzYzLjM4MyAyNi41MjM4IDM2NC42MDYgMjYuOTE3NCAzNjUuNzI5IDI2LjkxNzRDMzY4LjUwNCAyNi45MTc0IDM2OS41MjggMjUuMjQzMyAzNjkuNTI4IDIzLjY2NzZWMjMuNjY3NloiIGZpbGw9IiMwMzY1NTUiLz4NCjxwYXRoIGQ9Ik02NDAuNDE2IDIwLjU1NzNDNjM4LjY3MSAxOS44MzU0IDYzNy42MzEgMTkuNTU1MSA2MzYuNTk4IDE5LjU1NTFDNjM1LjUxNCAxOS41NTUxIDYzNC44MTkgMTkuOTE3IDYzNC44MTkgMjAuNDc2NUM2MzQuODE5IDIyLjE2NDUgNjQwLjk2MiAyMS42ODkzIDY0MC45NjIgMjUuNTkzNkM2NDAuOTYyIDI3Ljc0NjQgNjM5LjAyNCAyOC45OTc0IDYzNi4zMzIgMjguOTk3NEM2MzQuMjIgMjguOTk3NCA2MzMuMTggMjguNDg4IDYzMS45ODMgMjcuOTExNlYyNS40OTYyQzYzMy43MSAyNi41NjM1IDYzNC43NjggMjYuOTQwMSA2MzYuMTAxIDI2Ljk0MDFDNjM3LjI1NiAyNi45NDAxIDYzNy44NzkgMjYuNTYzNSA2MzcuODc5IDI1LjkwNjNDNjM3Ljg3OSAyNC4wNjg1IDYzMS43MzcgMjQuNzQxNSA2MzEuNzM3IDIwLjcyMTNDNjMxLjczNyAxOC43ODI3IDYzMy41MzQgMTcuNDk5IDYzNi4zMzIgMTcuNDk5QzYzNy42ODIgMTcuNDk5IDYzOC45MDEgMTcuNzYzNSA2NDAuNDE2IDE4LjM3MDdWMjAuNTU3M1pNNjQ5LjAxNiAyOC40ODQxQzY0Ny45OTIgMjguODMwNiA2NDcuMTI2IDI4Ljk5NTQgNjQ2LjI2MiAyOC45OTU0QzY0My40MDIgMjguOTk1NCA2NDEuNTUyIDI3LjQ0MjIgNjQxLjU1MiAyNS4wNzkyQzY0MS41NTIgMjIuNzU5NCA2NDMuNDczIDIxLjEyMDIgNjQ2LjE1NiAyMS4xMjAyQzY0Ni45ODUgMjEuMTIwMiA2NDguMDQ0IDIxLjMxODIgNjQ4Ljg5MSAyMS42MTIzVjIzLjM4ODFDNjQ4LjIyMSAyMy4wNTYyIDY0Ny40NDQgMjIuODc0MSA2NDYuODA5IDIyLjg3NDFDNjQ1LjI3MyAyMi44NzQxIDY0NC4yODYgMjMuNzM0MyA2NDQuMjg2IDI1LjA2MTlDNjQ0LjI4NiAyNi40MDggNjQ1LjI1NiAyNy4yOTQgNjQ2LjcyIDI3LjI5NEM2NDcuMzM3IDI3LjI5NCA2NDcuODg2IDI3LjE2MjMgNjQ5LjAxNiAyNi43NjhMNjQ5LjAxNiAyOC40ODQxWk02NzEuMzIgMjQuMjA5QzY3MS40MjUgMjMuMTU0OCA2NzIuMDgxIDIyLjU0NTcgNjczLjA4NyAyMi41NDU3QzY3NC4wNzYgMjIuNTQ1NyA2NzQuNzQ2IDIzLjE3MjEgNjc0Ljg1MiAyNC4yMDlINjcxLjMyWk02NzIuOTEgMjEuMTIyOUM2NzAuNCAyMS4xMjI5IDY2OC42MTQgMjIuNzc1NSA2NjguNjE0IDI1LjEwMTJDNjY4LjYxNCAyNy40NDQxIDY3MC40NzEgMjguOTk1NCA2NzMuMzM1IDI4Ljk5NTRDNjczLjk3IDI4Ljk5NTQgNjc1LjUwNCAyOC45OTU0IDY3Ni45NjYgMjcuOTg3VjI2LjUwNDJDNjc1Ljc2OSAyNy4yOTkzIDY3NC45NzcgMjcuNTczMSA2NzMuOTU1IDI3LjU3MzFDNjcyLjM0MSAyNy41NzMxIDY3MS4zNTQgMjYuNzk0OSA2NzEuMjY1IDI1LjQ2NjZINjc3LjExQzY3Ny4yMzIgMjIuNjkzOSA2NzUuMjc5IDIxLjEyMjkgNjcyLjkxIDIxLjEyMjlWMjEuMTIyOVpNNjc4LjA5OSAyOC44NTcySDY4MC42NTRWMjEuMjYyN0g2NzguMDk5VjI4Ljg1NzJaTTY4Ny43NjcgMjYuNzgxNUM2ODcuMjM0IDI3LjIyODEgNjg2Ljc5MiAyNy40MDcyIDY4Ni4yNDYgMjcuNDA3MkM2ODUuMDQzIDI3LjQwNzIgNjg0LjI4MSAyNi40ODM4IDY4NC4yODEgMjUuMTAwNEM2ODQuMjgxIDIzLjU4NDEgNjg1LjA0MyAyMi43MTAxIDY4Ni4zMzEgMjIuNzEwMUM2ODYuNzkyIDIyLjcxMDEgNjg3LjM5NCAyMi45MDggNjg3Ljc2NyAyMy4xNTU5VjI2Ljc4MTVaTTY4Ny43NjcgMTcuNjM5MVYyMS41OTU4QzY4Ny4wNzYgMjEuMjg0NyA2ODYuMzg4IDIxLjEyMDIgNjg1LjY0NCAyMS4xMjAyQzY4My4zMTMgMjEuMTIwMiA2ODEuNyAyMi43MjY2IDY4MS43IDI1LjA1MDdDNjgxLjcgMjcuMzI0OCA2ODMuMzEzIDI4Ljk5NzQgNjg1LjUgMjguOTk3NEM2ODYuMzY3IDI4Ljk5NzQgNjg3LjAzNyAyOC43ODU2IDY4Ny43NjcgMjguMjQzNVYyOC44NTQ5SDY5MC4zMjJWMTcuNjM5MUg2ODcuNzY3Wk02OTQuMTA1IDI0LjIwOUM2OTQuMjExIDIzLjE1NDggNjk0Ljg2NCAyMi41NDU3IDY5NS44NjggMjIuNTQ1N0M2OTYuODU4IDIyLjU0NTcgNjk3LjUzNSAyMy4xNzIxIDY5Ny42NDEgMjQuMjA5SDY5NC4xMDVaTTY5NS42OTQgMjEuMTIyOUM2OTMuMTg0IDIxLjEyMjkgNjkxLjQgMjIuNzc1NSA2OTEuNCAyNS4xMDEyQzY5MS40IDI3LjQ0NDEgNjkzLjI1OSAyOC45OTU0IDY5Ni4xMTkgMjguOTk1NEM2OTYuNzUzIDI4Ljk5NTQgNjk4LjI5IDI4Ljk5NTQgNjk5Ljc1NSAyNy45ODdWMjYuNTA0MkM2OTguNTU3IDI3LjI5OTMgNjk3Ljc2MyAyNy41NzMxIDY5Ni43MzYgMjcuNTczMUM2OTUuMTMxIDI3LjU3MzEgNjk0LjE0IDI2Ljc5NDkgNjk0LjA1MSAyNS40NjY2SDY5OS44OTRDNzAwLjAxNSAyMi42OTM5IDY5OC4wNjEgMjEuMTIyOSA2OTUuNjk0IDIxLjEyMjkiIGZpbGw9IiMwMDlFNEQiLz4NCjxwYXRoIGQ9Ik03MDMuNzIxIDIzLjQzNjhINzAzLjc1OEM3MDQuNTE3IDIxLjg1NjIgNzA1LjM2NiAyMS4xMTUgNzA2LjM1MiAyMS4xMTVDNzA2Ljg2MiAyMS4xMTUgNzA3LjMwMyAyMS4yOTY0IDcwOC4wNDQgMjEuODA3Nkw3MDcuMzQxIDIzLjkxMzNDNzA2LjY3IDIzLjUxODYgNzA2LjIyOSAyMy4zNTM1IDcwNS44MjMgMjMuMzUzNUM3MDQuODg2IDIzLjM1MzUgNzA0LjI4NiAyNC4xNzc1IDcwMy43MjEgMjUuNTcwNFYyOC44NDY2SDcwMS4xNjJWMjEuMjU0MUg3MDMuNzIxVjIzLjQzNjhaTTY4MC43NzUgMTguMDY3NEM2ODEuMDE1IDE4LjY1NzUgNjgwLjU4MyAxOS40ODA1IDY3OS44MTQgMTkuOTA0QzY3OS4wNDEgMjAuMzI3MSA2NzguMjI0IDIwLjE5MjggNjc3Ljk4NiAxOS42MDI3QzY3Ny43NDMgMTkuMDExNyA2NzguMTczIDE4LjE4NzcgNjc4Ljk0NSAxNy43NjY2QzY3OS43MTYgMTcuMzQxMSA2ODAuNTMzIDE3LjQ3NTkgNjgwLjc3NSAxOC4wNjc0WiIgZmlsbD0iIzAwOUU0RCIvPg0KPHBhdGggZD0iTTY1OC4yMiAyNC4wMjMxQzY1OC4yMiAyMS45NjUxIDY1Ni43MTkgMjEuMTIyNiA2NTUuMjM5IDIxLjEyMjZDNjU0LjIzMiAyMS4xMjI2IDY1My40MDQgMjEuNTE4NCA2NTIuNjY0IDIyLjM5MjFINjUyLjYyOVYxNy42MzkySDY1MC4wNzFWMjguODM1M0g2NTIuNjI5VjI0LjAyMzFDNjUzLjIyOCAyMy4yMTYxIDY1My43MzggMjIuODcxMSA2NTQuMzM4IDIyLjg3MTFDNjU1LjEzNCAyMi44NzExIDY1NS42NjIgMjMuMzk4NiA2NTUuNjYyIDI0LjUzMjlWMjcuMjAwOEM2NTYuNTIgMjYuNzg5NiA2NTcuMzkzIDI2LjUzNzQgNjU4LjIyIDI2LjQ0MzhWMjQuMDIzMVpNNjY0LjYzNiAyMS4xMTk5QzY2My41OTQgMjEuMTE5OSA2NjIuNzk5IDIxLjQ4MTEgNjYxLjk4NCAyMi4zNDkzVjIxLjI2MjRINjU5LjQyOFYyNi40MjM0QzY2MC4zMTMgMjYuNTA1OCA2NjEuNDQzIDI2Ljg4NDcgNjYxLjk4NCAyNy41MTA0VjIzLjk2MzRDNjYyLjY1NyAyMy4wMjMyIDY2My4xMzQgMjIuNzA5NyA2NjMuNzcgMjIuNzA5N0M2NjQuNDk0IDIyLjcwOTcgNjY1LjA0NSAyMy4xNTU2IDY2NS4wNDUgMjQuMjI2NFYyOC44MzcySDY2Ny42MDJWMjQuMDI4OUM2NjcuNjAyIDIxLjc5MjYgNjY1LjkwOCAyMS4xMTk5IDY2NC42MzYgMjEuMTE5OVYyMS4xMTk5Wk02NjkuMDE1IDMxLjAxODFINjY2LjA0M1YzMi45ODY0SDY2OC45MDlWMzMuODMxMkg2NjYuMDQzVjM1Ljg2MTlINjY5LjEwM1YzNi43MDU1SDY2NS4wNDZWMzAuMTc1Mkg2NjkuMDE1TDY2OS4wMTUgMzEuMDE4MVpNNjcxLjQ0MiAzNi43MDkzSDY3Mi4zNTJWMzAuMTczM0g2NzEuNDQyVjM2LjcwOTNaTTY3Ni44NTkgMzMuMDQ4NEM2NzcuNTA0IDMzLjA0ODQgNjc3LjkwNCAzMy40NjMxIDY3Ny45MzUgMzQuMTE0Mkg2NzUuNjE2QzY3NS43NDIgMzMuNDM0MiA2NzYuMTYxIDMzLjA0ODQgNjc2Ljg1OSAzMy4wNDg0Wk02NzUuNiAzNC42ODFINjc4Ljg0MkM2NzguODQyIDMzLjA4NjkgNjc4LjA2MiAzMi4zMTggNjc2LjgzOCAzMi4zMThDNjc1LjU2OSAzMi4zMTggNjc0LjY4OCAzMy4xOTI0IDY3NC42ODggMzQuNDk2OUM2NzQuNjg4IDM1LjY4OSA2NzUuNDg0IDM2Ljc4OTggNjc2LjkxNyAzNi43ODk4QzY3Ny42OTggMzYuNzg5OCA2NzguMjAzIDM2LjYyODEgNjc4Ljc2MyAzNi4yODJWMzUuNDU2QzY3OC4yMjIgMzUuNzg1NiA2NzcuNjk4IDM1Ljk3NTggNjc3LjE0NyAzNS45NzU4QzY3Ni4yNjUgMzUuOTc1OCA2NzUuNzQyIDM1LjUzNSA2NzUuNiAzNC42ODA2VjM0LjY4MVpNNjg0Ljc4NiAzMy41MzA5QzY4NC4yNjMgMzMuMTk2NiA2ODMuOTE0IDMzLjA5ODUgNjgzLjUxNSAzMy4wOTg1QzY4Mi42ODIgMzMuMDk4NSA2ODIuMTA1IDMzLjY5NDUgNjgyLjEwNSAzNC41NjdDNjgyLjEwNSAzNS40NTYgNjgyLjcxOSAzNS45OTE2IDY4My42NjggMzUuOTkxNkM2ODQuMDU4IDM1Ljk5MTYgNjg0LjQzIDM1Ljg5NzMgNjg0Ljg4OCAzNS43MDU5VjM2LjU0MjZDNjg0LjU4MiAzNi42Nzc0IDY4My45OTcgMzYuNzg5OCA2ODMuNTE1IDM2Ljc4OThDNjgyLjEzNiAzNi43ODk4IDY4MS4xOCAzNS45MDYyIDY4MS4xOCAzNC42NDMyQzY4MS4xOCAzMy4yMTc4IDY4Mi4wNTQgMzIuMzE4IDY4My40NTMgMzIuMzE4QzY4My45ODcgMzIuMzE4IDY4NC4zNDYgMzIuNDMzOSA2ODQuNzg3IDMyLjYxNDVMNjg0Ljc4NiAzMy41MzA5Wk02ODguOTM0IDMyLjQwMDRINjkwLjM5NVYzMy4xNjUxSDY4OC45MzRWMzUuMzc1MkM2ODguOTM0IDM1Ljg4MTEgNjg5LjMyNyAzNi4wMjc0IDY4OS41OTMgMzYuMDI3NEM2ODkuOTIyIDM2LjAyNzQgNjkwLjI2MiAzNS45MiA2OTAuNjMgMzUuNzA3OVYzNi41MDM3QzY5MC4zMSAzNi42Njc4IDY4OS44MiAzNi43ODk4IDY4OS41MTkgMzYuNzg5OEM2ODguNTI4IDM2Ljc4OTggNjg4LjAyNyAzNi4yMTYxIDY4OC4wMjcgMzUuNDM5MVYzMy4xNjUxSDY4Ny4yMjRWMzMuMDcwM0w2ODguOTM0IDMxLjUxMDJWMzIuNDAwNFpNNjkzLjg3NiAzMi40MDA0VjMzLjM5NjlINjkzLjg5NUM2OTQuMzU5IDMyLjYzNDUgNjk0LjggMzIuMzE4IDY5NS4yMyAzMi4zMThDNjk1LjYwMSAzMi4zMTggNjk1Ljk0NyAzMi40ODAxIDY5Ni4zMjkgMzIuODE2Nkw2OTUuODQ3IDMzLjU2NDRDNjk1LjU3IDMzLjMwOTEgNjk1LjIxMSAzMy4xMzMxIDY5NC45OTUgMzMuMTMzMUM2OTQuMzY4IDMzLjEzMzEgNjkzLjg3NiAzMy43MjY4IDY5My44NzYgMzQuNDYyNlYzNi43MDkzSDY5Mi45NjdWMzIuNDAwNEg2OTMuODc2Wk03MDUuNjU3IDMzLjUzMDlDNzA1LjEzMSAzMy4xOTY2IDcwNC43ODIgMzMuMDk4NSA3MDQuMzgxIDMzLjA5ODVDNzAzLjU0OSAzMy4wOTg1IDcwMi45NzcgMzMuNjk0NSA3MDIuOTc3IDM0LjU2N0M3MDIuOTc3IDM1LjQ1NiA3MDMuNTkyIDM1Ljk5MTYgNzA0LjUzNSAzNS45OTE2QzcwNC45MjUgMzUuOTkxNiA3MDUuMjk1IDM1Ljg5NzMgNzA1Ljc2IDM1LjcwNTlWMzYuNTQyNkM3MDUuNDQ3IDM2LjY3NzQgNzA0Ljg2MiAzNi43ODk4IDcwNC4zOCAzNi43ODk4QzcwMy4wMDQgMzYuNzg5OCA3MDIuMDQ0IDM1LjkwNjIgNzAyLjA0NCAzNC42NDMyQzcwMi4wNDQgMzMuMjE3OCA3MDIuOTIyIDMyLjMxOCA3MDQuMzIgMzIuMzE4QzcwNC44NTUgMzIuMzE4IDcwNS4yMTIgMzIuNDMzOSA3MDUuNjU3IDMyLjYxNDVMNzA1LjY1NyAzMy41MzA5Wk02OTguNzQyIDM2LjcwOTNINjk5LjY1MlYzMi40MDA4SDY5OC43NDJWMzYuNzA5M1oiIGZpbGw9IiMwMDlFNEQiLz4NCjxwYXRoIGQ9Ik02OTkuNjg0IDMwLjg1MjVDNjk5Ljc3MyAzMS4wNjA0IDY5OS42MTggMzEuMzU0NCA2OTkuMzQ0IDMxLjUwNDFDNjk5LjA2OCAzMS42NTQzIDY5OC43NzYgMzEuNjA2MiA2OTguNjkzIDMxLjM5NzhDNjk4LjYxIDMxLjE4NzQgNjk4Ljc2MSAzMC44OTU4IDY5OS4wMzggMzAuNzQ1NkM2OTkuMzExIDMwLjU5MzUgNjk5LjYwMSAzMC42NDIxIDY5OS42ODQgMzAuODUyNVYzMC44NTI1Wk02NTguOTQgMzEuMjAwOUM2NTguNzc5IDMxLjIwMDkgNjU4LjcxMSAzMS4yMjU1IDY1OC42NDYgMzEuMjkzOEM2NTguNjIgMzEuMzIwMyA2NTguNjEgMzEuMzQ3MiA2NTguNiAzMS40MDExTDY1Ny43ODQgMzQuMjg3QzY1Ny41OTMgMzUuMjk5MiA2NTYuMjU5IDM2LjMwOTkgNjU0LjUyMSAzNi4zMDk5SDY1Mi4xMDRMNjUyLjUyMyAzNC44MjdINjU0LjA3NkM2NTQuMjM0IDM0LjgyNyA2NTQuMzU4IDM0Ljc3MjEgNjU0LjQ2MiAzNC42NjQzQzY1NC41IDM0LjYyMjUgNjU0LjU1IDM0LjU1NyA2NTQuNTU2IDM0LjQ4OTZMNjU1LjIwMSAzMS45NjgxQzY1NS4zOTEgMzAuOTU1NSA2NTYuNTM4IDI5LjgzNjkgNjU4LjI3NiAyOS44MzY5SDY2MC43NTFMNjYwLjQzNSAzMS4yMDA5SDY1OC45NFpNNjU5LjQ5NyAzMi45NTk2TDY1OS43NzMgMzIuMDI1OUg2NjIuMjg4QzY2Mi41OTggMzAuNjcyIDY2Mi4zNTQgMjkuNDE3NyA2NjEuNDczIDI4LjU5NjFDNjU5LjY4OSAyNi45MzMyIDY1NS45NTcgMjcuNDk4MyA2NTMuMTc3IDI5Ljk3NzlDNjUyLjc0MyAzMC4zNjMgNjUyLjM3NiAzMC43NzkzIDY1Mi4wNDIgMzEuMjA0OEg2NTMuNTU2TDY1My4yMDQgMzIuMTQwNEg2NTEuMzk1QzY1MS4yMjIgMzIuNDM1NCA2NTEuMDYgMzIuNzI4MSA2NTAuOTM2IDMzLjAyNUg2NTMuMDgxTDY1Mi43MzcgMzMuOTYwN0g2NTAuNjNDNjUwLjI2OSAzNS4zOTAxIDY1MC40OTkgMzYuNzIzMyA2NTEuNDA2IDM3LjU2OTlDNjUzLjE2NyAzOS4yMTE2IDY1Ni44ODggMzguNjM0NiA2NTkuNjY3IDM2LjE1NTRDNjYwLjE1MyAzNS43MjQyIDY2MC41NTUgMzUuMjU4NyA2NjAuOTE4IDM0Ljc4MDhINjU4Ljk3M0w2NTkuMjY5IDMzLjg0NzFINjYxLjU0M0M2NjEuNzEgMzMuNTUwMSA2NjEuODYzIDMzLjI1NjUgNjYxLjk4MyAzMi45NTk2SDY1OS40OTdaIiBmaWxsPSIjMDA5RTREIi8+DQo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfNThfMTExKSI+DQo8cGF0aCBkPSJNNzc1LjA2OCA0MS4yMjc0Qzc2Ni4yODUgNDIuMDQ2MyA3NTcuMTMxIDQwLjc1NjQgNzU1Ljg0OCAzMy44MTlDNzU1LjIyMSAzMC4zOTkgNzU2Ljc2NSAyNi43NzI1IDc1OC44MSAyNC41MTg0VjIzLjMxNDhDNzU1LjEyNiAyNi41OCA3NTMuMTMgMzAuNzExNSA3NTQuMjggMzUuNTkyQzc1NS43NDggNDEuODUxOCA3NjMuNjAzIDQ1LjM5NjcgNzc1LjU5NSA0NC4yMTk1Qzc4MC4zNDIgNDMuNzU0NSA3ODYuNTUgNDIuMjEyIDc5MC44NjkgMzkuODE0NFYzNi40MTA5Qzc4Ni45NDkgMzguNzcxMyA3ODAuNDY4IDQwLjcyMTEgNzc1LjA2OCA0MS4yMjc0VjQxLjIyNzRaTTc5OC4yMDUgMjMuMjMzNUM3OTYuMTIyIDEyLjk1MzMgNzc2LjM3MyAxMi4zMDE2IDc2My42NDMgMjAuMTMzOFYyMC45OTg5Qzc3Ni4zNTkgMTQuMzkxNSA3OTQuMzk1IDE0LjQzMTcgNzk2LjAzNyAyMy45MDE2Qzc5Ni41ODkgMjcuMDM0MiA3OTQuODQzIDMwLjI5NzggNzkxLjcyMyAzMi4xNzdWMzQuNjM0MkM3OTUuNDc2IDMzLjI0MzIgNzk5LjMyNCAyOC43NDQyIDc5OC4yMDUgMjMuMjMzNVYyMy4yMzM1WiIgZmlsbD0iIzBFN0RDMiIvPg0KPHBhdGggZD0iTTc5MC4xNTkgMjEuNzM2OEg3ODcuODU2VjMyLjEwM0M3ODcuODU2IDMzLjMxNzkgNzg4LjQzNyAzNC4zNzQ0IDc5MC4xNTkgMzQuNTQzMlYyMS43MzY4Wk03NjIuNzM5IDI1LjUyMTdINzYwLjQzMkw3NjAuNDMxIDMyLjI5NDNDNzYwLjQzMSAzMy41MTM0IDc2MS4wMTMgMzQuNTY4OCA3NjIuNzM5IDM0LjczNDRWMjUuNTIxN1YyNS41MjE3Wk03NjAuNDMyIDIyLjA1MjFINzYyLjczMlYyNC4yNTg0SDc2MC40MzJWMjIuMDUyMVpNNzc2LjUzIDM0LjYyNzJDNzc0LjY2NiAzNC42MjcyIDc3My44NzcgMzMuMzE3NyA3NzMuODc3IDMyLjAyOFYyMy4wMzU1SDc3Ni4xNlYyNS41MjE3SDc3Ny44NzlWMjcuMzg1M0g3NzYuMTZWMzEuODg1NEM3NzYuMTYgMzIuNDExMyA3NzYuNDA3IDMyLjcwNDQgNzc2Ljk1IDMyLjcwNDRINzc3Ljg3OVYzNC42MjcyTDc3Ni41MyAzNC42MjcyVjM0LjYyNzJaTTc4MC43MzEgMzAuNzk2MUM3ODAuNzMxIDMxLjk3NjggNzgxLjQ2MSAzMi44NDQ2IDc4Mi43NTQgMzIuODQ0NkM3ODMuNzY2IDMyLjg0NDYgNzg0LjI2NiAzMi41NjA1IDc4NC44NSAzMS45NzY4TDc4Ni4yNjEgMzMuMzM0OUM3ODUuMzU3IDM0LjIzNzkgNzg0LjQwOSAzNC43ODcgNzgyLjczNyAzNC43ODdDNzgwLjU1MiAzNC43ODcgNzc4LjQ1OSAzMy41ODE5IDc3OC40NTkgMzAuMDY4NkM3NzguNDU5IDI3LjA2NTEgNzgwLjI4OCAyNS4zNjczIDc4Mi42ODYgMjUuMzY3M0M3ODUuMTI0IDI1LjM2NzMgNzg2LjUyNSAyNy4zNTQ5IDc4Ni41MjUgMjkuOTYzOVYzMC43OTYzSDc4MC43MzFWMzAuNzk2MVpNNzgyLjU4NiAyNy4yNzU2Qzc4MS44MDUgMjcuMjc1NiA3ODEuMjA0IDI3LjY4MjMgNzgwLjk1IDI4LjIzMDlDNzgwLjgwMiAyOC41NjA3IDc4MC43NDcgMjguODE3NyA3ODAuNzMxIDI5LjIyMjlINzg0LjI0OUM3ODQuMjA0IDI4LjIzMDkgNzgzLjc1OSAyNy4yNzU2IDc4Mi41ODYgMjcuMjc1NlpNNzY4LjkzOSAyNy4zODUzQzc2OS42MDggMjcuMzg1MyA3NjkuODg3IDI3LjcxOTggNzY5Ljg4NyAyOC4yNjI2VjM0LjY0MDZINzcyLjE3VjI4LjI0OTJDNzcyLjE3IDI2Ljk1NDIgNzcxLjQ4NyAyNS41MjQxIDc2OS40ODIgMjUuNTI0MUw3NjQuNzY2IDI1LjUyMTdWMzQuNjQwNkg3NjcuMDVWMjcuMzg1M0g3NjguOTM5VjI3LjM4NTNaTTc5Mi42MzcgMjMuNTg5MUM3OTIuMTI5IDIzLjU4OTEgNzkxLjcyNCAyMy4xNzU0IDc5MS43MjQgMjIuNjYyOUM3OTEuNzI0IDIyLjE1MjkgNzkyLjEyOSAyMS43MzY4IDc5Mi42MzcgMjEuNzM2OEM3OTMuMTQyIDIxLjczNjggNzkzLjU1NiAyMi4xNTI5IDc5My41NTYgMjIuNjYyOUM3OTMuNTU2IDIzLjE3NTQgNzkzLjE0MiAyMy41ODkxIDc5Mi42MzcgMjMuNTg5MVpNNzkyLjYzNyAyMS44OTEyQzc5Mi4yMTggMjEuODkxMiA3OTEuODgyIDIyLjI0MDcgNzkxLjg4MiAyMi42NjI5Qzc5MS44ODIgMjMuMDg3NiA3OTIuMjE4IDIzLjQzMDkgNzkyLjYzNyAyMy40MzA5Qzc5My4wNTUgMjMuNDMwOSA3OTMuNDAyIDIzLjA4NzYgNzkzLjQwMiAyMi42NjI5Qzc5My40MDIgMjIuMjQwNyA3OTMuMDU1IDIxLjg5MTIgNzkyLjYzNyAyMS44OTEyWk03OTMuMDQzIDIzLjIxOEg3OTIuODcyQzc5Mi44NjQgMjMuMjE3OSA3OTIuODU3IDIzLjIxNTcgNzkyLjg1MSAyMy4yMTE2Qzc5Mi44NDUgMjMuMjA3NSA3OTIuODQgMjMuMjAxNyA3OTIuODM3IDIzLjE5NDlMNzkyLjYwNSAyMi43OTdDNzkyLjU5OCAyMi43ODg1IDc5Mi41NzkgMjIuNzc4OCA3OTIuNTczIDIyLjc3ODhINzkyLjQ2N1YyMy4xNzU0Qzc5Mi40NjcgMjMuMTk1IDc5Mi40NTMgMjMuMjE4MSA3OTIuNDI4IDIzLjIxODFINzkyLjI3NEM3OTIuMjUxIDIzLjIxODEgNzkyLjIzNSAyMy4xOTUgNzkyLjIzNSAyMy4xNzU0VjIyLjE3NDlDNzkyLjIzNSAyMi4xMTY0IDc5Mi4yNTQgMjIuMDkyNCA3OTIuMzA1IDIyLjA4NUM3OTIuMzYxIDIyLjA3OSA3OTIuNTA1IDIyLjA3MTYgNzkyLjU4NiAyMi4wNzE2Qzc5Mi44NzIgMjIuMDcxNiA3OTMuMDM5IDIyLjE1NjYgNzkzLjAzOSAyMi40MjQ0VjIyLjQ0NEM3OTMuMDM5IDIyLjYwOTQgNzkyLjk1OSAyMi42OTk1IDc5Mi44MzMgMjIuNzM5N0w3OTMuMDc0IDIzLjE1NDdDNzkzLjA3OCAyMy4xNjQgNzkzLjA4IDIzLjE3MzkgNzkzLjA4IDIzLjE4NEM3OTMuMDggMjMuMTk5NyA3OTMuMDcyIDIzLjIxOCA3OTMuMDQzIDIzLjIxOFYyMy4yMThaTTc5Mi44MjEgMjIuNDI0NEM3OTIuODIxIDIyLjMxMjcgNzkyLjc1MiAyMi4yNzczIDc5Mi42MDUgMjIuMjc3M0g3OTIuNDU5VjIyLjU5NDdDNzkyLjQ4MiAyMi41OTQ3IDc5Mi41ODYgMjIuNTk5NiA3OTIuNjA1IDIyLjU5OTZDNzkyLjc1MiAyMi41OTk2IDc5Mi44MjEgMjIuNTUgNzkyLjgyMSAyMi40NDRWMjIuNDI0NFoiIGZpbGw9IiMwRTdEQzIiLz4NCjwvZz4NCjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMV81OF8xMTEpIj4NCjxwYXRoIGQ9Ik01MzMuNzczIDIwLjk5MTFDNTI5LjI2MyAyMC45OTExIDUyNS41OTkgMjQuNjU0NyA1MjUuNTk5IDI5LjE2NDRDNTI1LjU5OSAzMy42NzQxIDUyOS4yNjMgMzcuMzM3NyA1MzMuNzczIDM3LjMzNzdDNTM4LjI4MiAzNy4zMzc3IDU0MS45NDYgMzMuNjc0MSA1NDEuOTQ2IDI5LjE2NDRDNTQxLjk0NiAyNC42NTQ3IDUzOC4yODIgMjAuOTkxMSA1MzMuNzczIDIwLjk5MTFaTTUzMy43NzMgMzYuNTE4NkM1MjkuNzEzIDM2LjUxODYgNTI2LjQxOSAzMy4yMTUgNTI2LjQxOSAyOS4xNjQ0QzUyNi40MTkgMjUuMTEzNyA1MjkuNzEzIDIxLjgxMDIgNTMzLjc3MyAyMS44MTAyQzUzNy44MzIgMjEuODEwMiA1NDEuMTI3IDI1LjExMzcgNTQxLjEyNyAyOS4xNjQ0QzU0MS4xMjcgMzMuMjE1IDUzNy44MzIgMzYuNTE4NiA1MzMuNzczIDM2LjUxODZaIiBmaWxsPSJibGFjayIvPg0KPHBhdGggZD0iTTUzNi42OSAyMy45MjUyQzUzNi42NjMgMjMuOTA3MiA1MzYuNjI3IDIzLjg5ODIgNTM2LjU5MSAyMy44OTgyQzUzNi40ODMgMjMuODk4MiA1MzYuNDAyIDIzLjk3OTIgNTM2LjQwMiAyNC4wODczVjI2LjY0MzdDNTM2LjQwMiAyNi43MzM3IDUzNi4zMyAyNi44MDU3IDUzNi4yNCAyNi44MDU3SDUzMS4yOUM1MzEuMiAyNi44MDU3IDUzMS4xMzcgMjYuNzMzNyA1MzEuMTI4IDI2LjY0MzdWMjQuMDg3M0M1MzEuMTI4IDI0LjA1MTMgNTMxLjExOSAyNC4wMjQyIDUzMS4xMDEgMjMuOTg4MkM1MzEuMDQ3IDIzLjg5ODIgNTMwLjkzIDIzLjg3MTIgNTMwLjgzOSAyMy45MjUyQzUyOS4wMTIgMjUuMDUwNCA1MjcuOTA1IDI3LjAwMzcgNTI3LjkwNSAyOS4xNjQxQzUyNy45MDUgMzEuMzI0NCA1MjkuMDEyIDMzLjI3NzcgNTMwLjg1NyAzNC40MDI5QzUzMC44ODUgMzQuNDIwOSA1MzAuOTIxIDM0LjQyOTkgNTMwLjk1NyAzNC40Mjk5QzUzMS4wNjUgMzQuNDI5OSA1MzEuMTQ2IDM0LjM0ODkgNTMxLjE0NiAzNC4yNDA5VjMxLjY4NDVDNTMxLjE0NiAzMS41OTQ0IDUzMS4yMTggMzEuNTMxNCA1MzEuMzA4IDMxLjUyMjRINTM2LjI1OEM1MzYuMzQ4IDMxLjUyMjQgNTM2LjQyIDMxLjU5NDQgNTM2LjQyIDMxLjY4NDVWMzQuMjQwOUM1MzYuNDIgMzQuMjc2OSA1MzYuNDI5IDM0LjMwMzkgNTM2LjQ0NyAzNC4zMzk5QzUzNi41MDEgMzQuNDI5OSA1MzYuNjE4IDM0LjQ1NjkgNTM2LjcwOCAzNC40MDI5QzUzOC41NTQgMzMuMjc3NyA1MzkuNjYxIDMxLjMyNDQgNTM5LjY2MSAyOS4xNjQxQzUzOS42NjEgMjcuMDAzNyA1MzguNTM2IDI1LjA1MDQgNTM2LjY5IDIzLjkyNTJWMjMuOTI1MlpNNTMwLjE5MSAzMi4zNjg2TDUzMC4yMTggMzIuNjc0Nkw1MzAuMDIgMzIuNDMxNkM1MjguNDk5IDMwLjUxNDMgNTI4LjQ5OSAyNy44MDQ4IDUzMC4wMiAyNS44ODc1TDUzMC4xOTEgMjUuNjcxNUw1MzAuMjE4IDI1LjY0NDVMNTMwLjE5MSAyNS45NTk2QzUzMC4xNjQgMjYuMjExNiA1MzAuMTU1IDI2LjQ3MjYgNTMwLjE1NSAyNi43MzM3VjMxLjU4NTRDNTMwLjE1NSAzMS44NDY1IDUzMC4xNzMgMzIuMTA3NSA1MzAuMTkxIDMyLjM2ODZaTTUzNi40MDIgMzAuMzg4M0M1MzYuNDAyIDMwLjQ3ODMgNTM2LjMzIDMwLjU1MDMgNTM2LjI0IDMwLjU1MDNINTMxLjI5QzUzMS4yIDMwLjU1MDMgNTMxLjEzNyAzMC40NzgzIDUzMS4xMjggMzAuMzg4M1YyNy45Mzk5QzUzMS4xMjggMjcuODQ5OSA1MzEuMiAyNy43Nzc4IDUzMS4yOSAyNy43Nzc4SDUzNi4yNEM1MzYuMzMgMjcuNzc3OCA1MzYuNDAyIDI3Ljg0OTkgNTM2LjQwMiAyNy45Mzk5VjMwLjM4ODNaTTUzNy41MTkgMzIuNDMxNkw1MzcuMzIxIDMyLjY3NDZMNTM3LjM0OCAzMi4zNjg2QzUzNy4zNzUgMzIuMTE2NSA1MzcuMzg0IDMxLjg1NTUgNTM3LjM4NCAzMS41OTQ0VjI2LjczMzdDNTM3LjM4NCAyNi40NzI2IDUzNy4zNzUgMjYuMjExNiA1MzcuMzQ4IDI1Ljk1OTZMNTM3LjMzOSAyNS44MjQ1TDUzNy4zMyAyNS42ODA1VjI1LjY0NDVMNTM3LjUxOSAyNS44ODc1QzUzOC4yNTcgMjYuODA1NyA1MzguNjYyIDI3Ljk3NTkgNTM4LjY2MiAyOS4xNTUxQzUzOC42NjIgMzAuMzM0MiA1MzguMjU3IDMxLjUxMzQgNTM3LjUxOSAzMi40MzE2VjMyLjQzMTZaIiBmaWxsPSJibGFjayIvPg0KPHBhdGggZD0iTTU1NC4yNzYgMjkuMDIwMkM1NTQuMjMxIDI5LjAwMjIgNTU0LjE3NyAyOC45ODQyIDU1NC4xNzcgMjguOTMwMkM1NTQuMTc3IDI4Ljg5NDIgNTU0LjE5NSAyOC44NjcyIDU1NC4yMzEgMjguODQ5MkM1NTQuMjk0IDI4LjgyMjIgNTU1Ljg1MSAyOC4yNjQxIDU1NS44NTEgMjYuNDI3OEM1NTUuODUxIDI0LjM4NDUgNTU0LjQ3NCAyMy4xNjkzIDU1Mi4xNTIgMjMuMTY5M0g1NDYuNTI2VjM1LjE3NzJINTUyLjY2NUM1NTQuNDU2IDM1LjE3NzIgNTU2LjM4MiAzMy45MDggNTU2LjM4MiAzMS44NjQ2QzU1Ni4zODIgMjkuOTExMyA1NTQuOTA2IDI5LjIyNzIgNTU0LjI3NiAyOS4wMjAyVjI5LjAyMDJaTTU0OS4zNjEgMjUuNjI2N0M1NDkuMzYxIDI1LjU4MTcgNTQ5LjM5NyAyNS41NDU2IDU0OS40NDIgMjUuNTQ1Nkg1NTEuNjc1QzU1Mi40MTMgMjUuNTQ1NiA1NTIuOTE3IDI2LjA0MDcgNTUyLjkxNyAyNi43Nzg4QzU1Mi45MTcgMjcuMzU0OSA1NTIuNDY3IDI3Ljk3NiA1NTEuNjIxIDI3Ljk3Nkg1NDkuNDQyQzU0OS4zOTcgMjcuOTc2IDU0OS4zNjEgMjcuOTQgNTQ5LjM2MSAyNy44OTVWMjUuNjI2N1pNNTUxLjY3NSAzMi44MDk4SDU0OS40NDJDNTQ5LjM5NyAzMi44MDk4IDU0OS4zNjEgMzIuNzczOCA1NDkuMzYxIDMyLjcyODhWMzAuMzM0NEM1NDkuMzYxIDMwLjI4OTQgNTQ5LjM5NyAzMC4yNTM0IDU0OS40NDIgMzAuMjUzNEg1NTEuNjIxQzU1Mi42OTIgMzAuMjUzNCA1NTMuMzA0IDMwLjcxMjUgNTUzLjMwNCAzMS41MjI2QzU1My4zMDQgMzIuMzU5NyA1NTIuNzM3IDMyLjgwOTggNTUxLjY3NSAzMi44MDk4VjMyLjgwOThaTTU3NS4zODQgMjcuOTQ5TDU3NC45NTIgMjcuODU5QzU3My45OCAyNy42NTIgNTczLjAzNSAyNy4zOTA5IDU3My4wMzUgMjYuNTUzOEM1NzMuMDM1IDI1LjcxNjcgNTczLjgxOCAyNS4zMzg2IDU3NC41OTIgMjUuMzM4NkM1NzUuNTAxIDI1LjMzODYgNTc2LjQwMSAyNS43NDM3IDU3Ny4wODYgMjYuNDQ1OEw1NzguODY4IDI0LjY4MTVDNTc4LjEwMyAyMy44MzU0IDU3Ni43NDQgMjIuODYzMiA1NzQuNTQ3IDIyLjg2MzJDNTcxLjkwMSAyMi44NjMyIDU3MC4xMTggMjQuMzY2NSA1NzAuMTE4IDI2LjYwNzhDNTcwLjExOCAyOC45NzUyIDU3MS45ODIgMjkuODY2MyA1NzMuNTQ4IDMwLjE5OTRMNTczLjk3MSAzMC4yODk0QzU3NS40OTIgMzAuNjEzNSA1NzYuMjEyIDMwLjg1NjUgNTc2LjIxMiAzMS43MjA2QzU3Ni4yMTIgMzIuNDk0NyA1NzUuNTE5IDMzLjAwNzggNTc0LjQ5MyAzMy4wMDc4QzU3My4yODcgMzMuMDA3OCA1NzIuMjE2IDMyLjQ3NjcgNTcxLjQwNiAzMS40Nzc2TDU2OS41NzggMzMuMjY4OUM1NzAuNTUxIDM0LjQyMTEgNTcxLjgzOCAzNS40NjUyIDU3NC41MjkgMzUuNDY1MkM1NzYuODI1IDM1LjQ2NTIgNTc5LjE1NiAzNC4xMzMgNTc5LjE1NiAzMS41NzY2QzU3OS4xNDcgMjguOTU3MiA1NzcuMzY1IDI4LjM2MzEgNTc1LjM4NCAyNy45NDlWMjcuOTQ5Wk01OTkuMTAzIDIzLjE2OTNWMjcuNTYyQzU5OS4xMDMgMjcuNjA3IDU5OS4wNjcgMjcuNjQzIDU5OS4wMjIgMjcuNjQzSDU5NS4zMzFDNTk1LjI4NiAyNy42NDMgNTk1LjI1IDI3LjYwNyA1OTUuMjUgMjcuNTYyVjIzLjE2OTNINTkyLjIyNlYzNS4xNzcySDU5NS4yNVYzMC40NjA0QzU5NS4yNSAzMC40MTU0IDU5NS4yODYgMzAuMzc5NCA1OTUuMzMxIDMwLjM3OTRINTk5LjAyMkM1OTkuMDY3IDMwLjM3OTQgNTk5LjEwMyAzMC40MTU0IDU5OS4xMDMgMzAuNDYwNFYzNS4xNzcySDYwMi4xNDZWMjMuMTY5M0g1OTkuMTAzWk01ODYuMTQxIDMyLjcxOThDNTg0Ljc4MiAzMi43MTk4IDU4My4zMTUgMzEuNTg1NiA1ODMuMzE1IDI5LjA5MjJDNTgzLjMxNSAyNi44MTQ4IDU4NC42OTIgMjUuNjI2NyA1ODYuMDUxIDI1LjYyNjdDNTg3LjA0MSAyNS42MjY3IDU4Ny43MzQgMjYuMDQwNyA1ODguMjgzIDI2Ljk1ODlMNTkwLjYwNiAyNS40MTk2QzU4OS40MTggMjMuNjczMyA1ODguMDA0IDIyLjg4MTIgNTg2LjAzMyAyMi44ODEyQzU4Mi4xNzEgMjIuODgxMiA1ODAuNDQzIDI2LjAwNDcgNTgwLjQ0MyAyOS4wOTIyQzU4MC40NDMgMzIuODQ1OCA1ODIuNzI5IDM1LjQ2NTIgNTg1Ljk5NyAzNS40NjUyQzU4OC40MjcgMzUuNDY1MiA1ODkuNTM1IDM0LjU3NDEgNTkwLjY5NiAzMi45MjY4TDU4OC4zNTUgMzEuMzUxNkM1ODcuODMzIDMyLjE5NzcgNTg3LjI2NiAzMi43MTk4IDU4Ni4xNDEgMzIuNzE5OFpNNTYzLjE3OCAyMi44NjMyQzU1OS44NzUgMjIuODYzMiA1NTcuNjYxIDI1LjM5MjYgNTU3LjY2MSAyOS4xNjQyQzU1Ny42NjEgMzIuOTM1OCA1NTkuODc1IDM1LjQ2NTIgNTYzLjE3OCAzNS40NjUyQzU2Ni40ODIgMzUuNDY1MiA1NjguNjk2IDMyLjkzNTggNTY4LjY5NiAyOS4xNjQyQzU2OC42OTYgMjUuMzkyNiA1NjYuNDgyIDIyLjg2MzIgNTYzLjE3OCAyMi44NjMyVjIyLjg2MzJaTTU2My4xNzggMzIuNzE5OEM1NjEuNTU4IDMyLjcxOTggNTYwLjUxNCAzMS4zMjQ2IDU2MC41MTQgMjkuMTY0MkM1NjAuNTE0IDI3LjAxMjkgNTYxLjU1OCAyNS42MjY3IDU2My4xNzggMjUuNjI2N0M1NjQuODA4IDI1LjYyNjcgNTY1Ljg2MSAyNy4wMTI5IDU2NS44NjEgMjkuMTY0MkM1NjUuODYxIDMxLjMyNDYgNTY0LjgwOCAzMi43MTk4IDU2My4xNzggMzIuNzE5OFoiIGZpbGw9IiNGODAwMDAiLz4NCjwvZz4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTQ2LjM0NCAyMi4xODExQzE0Ny41OTUgMjIuMjg1NCAxNDguODQ1IDIxLjU1NTMgMTQ5LjYyNyAyMC42Mjk4QzE1MC4zOTUgMTkuNjc4MSAxNTAuOTAzIDE4LjQwMDUgMTUwLjc3MyAxNy4wOTY5QzE0OS42NjYgMTcuMTQ5MSAxNDguMjk4IDE3LjgyNjkgMTQ3LjUxNyAxOC43Nzg2QzE0Ni44IDE5LjU5OTkgMTQ2LjE4OCAyMC45Mjk2IDE0Ni4zNDQgMjIuMTgxMVpNMTQ3Ljg0MSAyMy4wNzk3QzE0OC42NTMgMjIuNzYwNiAxNDkuNjU4IDIyLjM2NTYgMTUwLjc2IDIyLjQyOTFDMTUxLjQ2MyAyMi40ODEyIDE1My40OTUgMjIuNjg5OCAxNTQuNzk4IDI0LjYxOTJDMTU0Ljc5MiAyNC42MjM3IDE1NC43NzggMjQuNjMyMyAxNTQuNzU5IDI0LjY0NUMxNTQuNDM2IDI0Ljg1NDggMTUyLjM5IDI2LjE4NzEgMTUyLjQxNCAyOC44MTY5QzE1Mi40MzkgMzEuOTQ5OSAxNTQuOTg4IDMzLjExODMgMTU1LjMyMiAzMy4yNzExQzE1NS4zNDQgMzMuMjgxMSAxNTUuMzU2IDMzLjI4NjcgMTU1LjM1OCAzMy4yODgzQzE1NS4zNTYgMzMuMjkyNiAxNTUuMzU0IDMzLjMwMSAxNTUuMzUgMzMuMzEzM0MxNTUuMjgzIDMzLjUyODggMTU0Ljg0NSAzNC45NDg5IDE1My44NDcgMzYuNDA0QzE1Mi45MjIgMzcuNzU5OCAxNTEuOTcxIDM5LjA4OTUgMTUwLjQ2IDM5LjExNTZDMTQ5Ljc0OSAzOS4xMjgzIDE0OS4yNyAzOC45MjExIDE0OC43NzIgMzguNzA1NEMxNDguMjQ3IDM4LjQ3ODUgMTQ3LjcwMSAzOC4yNDIyIDE0Ni44NCAzOC4yNDIyQzE0NS45NDcgMzguMjQyMiAxNDUuMzc2IDM4LjQ4NDggMTQ0LjgyNiAzOC43MTg0QzE0NC4zNDggMzguOTIxNCAxNDMuODg3IDM5LjExNzQgMTQzLjI0NSAzOS4xNDE3QzE0MS43ODYgMzkuMTkzOCAxNDAuNjc5IDM3LjcwNzcgMTM5Ljc1NCAzNi4zNTE5QzEzNy44NjYgMzMuNjE0MyAxMzYuNDIgMjguNjM0NCAxMzguMzc0IDI1LjI3MUMxMzkuMzI1IDIzLjU4OTMgMTQxLjA1NyAyMi41MzM0IDE0Mi45MTkgMjIuNTA3M0MxNDMuNzMyIDIyLjQ5MjUgMTQ0LjUwNyAyMi44MDA2IDE0NS4xODQgMjMuMDcwMUMxNDUuNzAyIDIzLjI3NTggMTQ2LjE2MiAyMy40NTg5IDE0Ni41NCAyMy40NTg5QzE0Ni44NzcgMjMuNDU4OSAxNDcuMzE5IDIzLjI4NTEgMTQ3Ljg0MSAyMy4wNzk3WiIgZmlsbD0iYmxhY2siLz4NCjxwYXRoIGQ9Ik0zNi44NTg3IDM3LjUyNDFIMzEuOTg3NEwzNS4wMzQyIDE5LjY2NjhIMzkuOTA1MkwzNi44NTg3IDM3LjUyNDFaIiBmaWxsPSIjMDA1NzlGIi8+DQo8cGF0aCBkPSJNNTQuNTE1NyAyMC4xMDQxQzUzLjU1NDkgMTkuNzQyOCA1Mi4wMzA5IDE5LjM0MzggNTAuMTQ2NiAxOS4zNDM4QzQ1LjMzNjEgMTkuMzQzOCA0MS45NDg2IDIxLjc3NTMgNDEuOTI3OCAyNS4yNTE2QzQxLjg4NzggMjcuODE2NSA0NC4zNTMxIDI5LjI0MSA0Ni4xOTcgMzAuMDk2MkM0OC4wODE2IDMwLjk3MDEgNDguNzIyMyAzMS41NDA1IDQ4LjcyMjMgMzIuMzE5NEM0OC43MDMxIDMzLjUxNTcgNDcuMTk5NCAzNC4wNjcyIDQ1Ljc5NjkgMzQuMDY3MkM0My44NTIxIDM0LjA2NzIgNDIuODEgMzMuNzgyOSA0MS4yMjY0IDMzLjExNzNMNDAuNTg1IDMyLjgzMkwzOS45MDMzIDM2Ljg0MDZDNDEuMDQ1OCAzNy4zMzM5IDQzLjE1MDcgMzcuNzcxNyA0NS4zMzYxIDM3Ljc5MDlDNTAuNDQ3MyAzNy43OTA5IDUzLjc3NDkgMzUuMzk3MSA1My44MTQzIDMxLjY5MjVDNTMuODMzOCAyOS42NTk3IDUyLjUzMiAyOC4xMDIgNDkuNzI1NCAyNi44MjkyQzQ4LjAyMTcgMjYuMDEyMSA0Ni45NzgzIDI1LjQ2MTIgNDYuOTc4MyAyNC42MjUyQzQ2Ljk5ODMgMjMuODY1MiA0Ny44NjA4IDIzLjA4NjggNDkuNzg0IDIzLjA4NjhDNTEuMzY3NyAyMy4wNDg2IDUyLjUzMTIgMjMuNDA5NCA1My40MTI2IDIzLjc3MDVMNTMuODUzMiAyMy45NjAxTDU0LjUxNTcgMjAuMTA0MVoiIGZpbGw9IiMwMDU3OUYiLz4NCjxwYXRoIGQ9Ik02MC45OTI0IDMxLjE5NzlDNjEuMzkzNiAzMC4xNzIgNjIuOTM3MiAyNi4yMDE2IDYyLjkzNzIgMjYuMjAxNkM2Mi45MTcgMjYuMjM5NyA2My4zMzc2IDI1LjE1NjggNjMuNTc4MSAyNC40OTE5TDYzLjkxODYgMjYuMDMwNkM2My45MTg2IDI2LjAzMDYgNjQuODQxIDMwLjMwNTEgNjUuMDQxNCAzMS4xOTc5QzY0LjI4IDMxLjE5NzkgNjEuOTU0NiAzMS4xOTc5IDYwLjk5MjQgMzEuMTk3OVpNNjcuMDA1NCAxOS42NjY4SDYzLjIzNzRDNjIuMDc1NSAxOS42NjY4IDYxLjE5MjcgMTkuOTg5NSA2MC42OTE0IDIxLjE0ODRMNTMuNDU1OCAzNy41MjM5SDU4LjU2NzFDNTguNTY3MSAzNy41MjM5IDU5LjQwODUgMzUuMzE5OSA1OS41ODk0IDM0Ljg0NTJDNjAuMTUwMSAzNC44NDUyIDY1LjEyMjMgMzQuODQ1MiA2NS44NDM3IDM0Ljg0NTJDNjUuOTgzNSAzNS40NzIxIDY2LjQyNDkgMzcuNTIzOSA2Ni40MjQ5IDM3LjUyMzlINzAuOTM1Mkw2Ny4wMDU0IDE5LjY2NjhWMTkuNjY2OFoiIGZpbGw9IiMwMDU3OUYiLz4NCjxwYXRoIGQ9Ik0yNy45MTggMTkuNjY2OEwyMy4xNDc1IDMxLjg0MzhMMjIuNjI2MiAyOS4zNzQxQzIxLjc0NDIgMjYuNTI0NSAxOC45NzgxIDIzLjQyODQgMTUuODkxNCAyMS44ODlMMjAuMjYxIDM3LjUwNTJIMjUuNDEyMkwzMy4wNjkgMTkuNjY2OEgyNy45MThWMTkuNjY2OFoiIGZpbGw9IiMwMDU3OUYiLz4NCjxwYXRoIGQ9Ik0xOC43MTg0IDE5LjY2NjhIMTAuODgxMUwxMC44MDA5IDIwLjAyNzZDMTYuOTE0NSAyMS41MDk1IDIwLjk2MzUgMjUuMDgxNSAyMi42MjcgMjkuMzc0OUwyMC45MjMyIDIxLjE2NzlDMjAuNjQyNyAyMC4wMjc0IDE5Ljc4MDcgMTkuNzA0NCAxOC43MTg0IDE5LjY2NjhaIiBmaWxsPSIjRkFBNjFBIi8+DQo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDJfNThfMTExKSI+DQo8cGF0aCBkPSJNMjIxLjE1OCAxNy40OTlWMTguOTM1NkgyMzEuMzA2VjE3LjQ5OUgyMjEuMTU4Wk0yMzIuNzQ0IDE3LjQ5OVYxOC45MzU2SDI0Ny4yMDZDMjQ3LjIwNiAxOC45MzU2IDI0NS43MjkgMTcuNDk5IDI0My43NzMgMTcuNDk5SDIzMi43NDRaTTI1MC4wNDMgMTcuNDk5VjE4LjkzNTZIMjU4Ljc5M0wyNTguMjczIDE3LjQ5OUgyNTAuMDQzWk0yNjUuMDY1IDE3LjQ5OUwyNjQuNTQ2IDE4LjkzNTZIMjczLjIxNlYxNy40OTlIMjY1LjA2NVpNMjIxLjE1OCAyMC4yOTI5VjIxLjcyOTZIMjMxLjMwNlYyMC4yOTI5SDIyMS4xNThaTTIzMi43NDQgMjAuMjk1VjIxLjcyOTdIMjQ4Ljg4NEMyNDguODg0IDIxLjcyOTcgMjQ4LjY5NiAyMC42MjM5IDI0OC4zNjcgMjAuMjk1SDIzMi43NDRaTTI1MC4wNDMgMjAuMjk1VjIxLjcyOTdIMjU5Ljc1MkwyNTkuMjcxIDIwLjI5NUgyNTAuMDQzWk0yNjQuMDI3IDIwLjI5NUwyNjMuNTQ2IDIxLjcyOTdIMjczLjIxNlYyMC4yOTVIMjY0LjAyN1YyMC4yOTVaTTIyNC4wNzQgMjMuMDg2OVYyNC41MjU3SDIyOC40NjlWMjMuMDg2OUgyMjQuMDc0VjIzLjA4NjlaTTIzNS42NjEgMjMuMDg2OVYyNC41MjU3SDI0MC4wNTZWMjMuMDg2OUgyMzUuNjYxVjIzLjA4NjlaTTI0NC4zMzEgMjMuMDg2OVYyNC41MjU3SDI0OC43MjZDMjQ4LjcyNiAyNC41MjU3IDI0OS4wMDUgMjMuNzY1OSAyNDkuMDA1IDIzLjA4NjlIMjQ0LjMzMVYyMy4wODY5Wk0yNTIuOTYgMjMuMDg2OVYyNC41MjU3SDI2MC43NTJMMjYwLjIzMiAyMy4wODY5SDI1Mi45NlYyMy4wODY5Wk0yNjMuMDY5IDIzLjA4NjlMMjYyLjU0OCAyNC41MjU3SDI3MC4zNzlWMjMuMDg2OUgyNjMuMDY5VjIzLjA4NjlaTTIyNC4wNzQgMjUuODgzVjI3LjMxOTdIMjI4LjQ2OVYyNS44ODNIMjI0LjA3NFYyNS44ODNaTTIzNS42NjEgMjUuODgzVjI3LjMxOTdIMjQ2Ljg4N0MyNDYuODg3IDI3LjMxOTcgMjQ3LjgyNiAyNi41ODI1IDI0OC4xMjUgMjUuODgzSDIzNS42NjFaTTI1Mi45NiAyNS44ODNWMjcuMzE5N0gyNTcuMzU1VjI2LjUyTDI1Ny42MzQgMjcuMzE5N0gyNjUuNjg0TDI2NS45ODQgMjYuNTJWMjcuMzE5N0gyNzAuMzc5VjI1Ljg4M0gyNjIuMTI5TDI2MS42OTEgMjcuMDk5OUwyNjEuMjUxIDI1Ljg4M0gyNTIuOTZaTTIyNC4wNzQgMjguNjc3VjMwLjExMzdIMjI4LjQ2OVYyOC42NzdIMjI0LjA3NFpNMjM1LjY2MSAyOC42NzdWMzAuMTEzN0gyNDguMTI1QzI0Ny44MjYgMjkuNDE2NSAyNDYuODg3IDI4LjY3NyAyNDYuODg3IDI4LjY3N0gyMzUuNjYxWk0yNTIuOTYgMjguNjc3VjMwLjExMzdIMjU3LjM1NVYyOC42NzdIMjUyLjk2Wk0yNTguMTUzIDI4LjY3N0wyNTguNjg1IDMwLjExMzdIMjY0LjcyMUwyNjUuMjI2IDI4LjY3N0gyNTguMTUzWk0yNjUuOTg0IDI4LjY3N1YzMC4xMTM3SDI3MC4zNzlWMjguNjc3SDI2NS45ODRaTTIyNC4wNzQgMzEuNDcxVjMyLjkwNzZIMjI4LjQ2OVYzMS40NzFIMjI0LjA3NFpNMjM1LjY2MSAzMS40NzFWMzIuOTA3NkgyNDAuMDU2VjMxLjQ3MUgyMzUuNjYxWk0yNDQuMzMxIDMxLjQ3MVYzMi45MDc2SDI0OS4wMDVDMjQ5LjAwNSAzMi4yMjk2IDI0OC43MjYgMzEuNDcxIDI0OC43MjYgMzEuNDcxSDI0NC4zMzFWMzEuNDcxWk0yNTIuOTYgMzEuNDcxVjMyLjkwNzZIMjU3LjM1NVYzMS40NzFIMjUyLjk2Wk0yNTkuMTUxIDMxLjQ3MUwyNTkuNjY2IDMyLjkwNzZIMjYzLjcxM0wyNjQuMjMyIDMxLjQ3MUgyNTkuMTUxWk0yNjUuOTg0IDMxLjQ3MVYzMi45MDc2SDI3MC4zNzlWMzEuNDcxSDI2NS45ODRaTTIyMS4yMzcgMzQuMjY1VjM1LjcwMzdIMjMxLjM4NlYzNC4yNjVIMjIxLjIzN1pNMjMyLjc0NCAzNC4yNjVWMzUuNzAzN0gyNDguMzY3QzI0OC42OTYgMzUuMzc0MyAyNDguODg0IDM0LjI2NSAyNDguODg0IDM0LjI2NUgyMzIuNzQ0VjM0LjI2NVpNMjUwLjEyMyAzNC4yNjVWMzUuNzAzN0gyNTcuMzU1VjM0LjI2NUgyNTAuMTIzWk0yNjAuMTUxIDM0LjI2NUwyNjAuNjggMzUuNzAzN0gyNjIuNzM5TDI2My4yMzYgMzQuMjY1SDI2MC4xNTFaTTI2NS45ODQgMzQuMjY1VjM1LjcwMzdIMjczLjI5NVYzNC4yNjVIMjY1Ljk4NFpNMjIxLjIzNyAzNy4wNjFWMzguNDk3N0gyMzEuMzg2VjM3LjA2MUgyMjEuMjM3Wk0yMzIuNzQ0IDM3LjA2MVYzOC40OTU2SDI0My43NzNDMjQ1LjcyOSAzOC40OTU2IDI0Ny4yMDYgMzcuMDYxIDI0Ny4yMDYgMzcuMDYxSDIzMi43NDRaTTI1MC4xMjMgMzcuMDYxVjM4LjQ5NzdIMjU3LjM1NVYzNy4wNjFIMjUwLjEyM1pNMjYxLjE1NSAzNy4wNjFMMjYxLjY2NCAzOC40OTM2TDI2MS43NTIgMzguNDk1NkwyNjIuMjY5IDM3LjA2MUgyNjEuMTU1VjM3LjA2MVpNMjY1Ljk4NCAzNy4wNjFWMzguNDk3N0gyNzMuMjk1VjM3LjA2MUgyNjUuOTg0WiIgZmlsbD0iIzFGNzBDMSIvPg0KPC9nPg0KPGRlZnM+DQo8Y2xpcFBhdGggaWQ9ImNsaXAwXzU4XzExMSI+DQo8cmVjdCB3aWR0aD0iNDQuNDQ3MyIgaGVpZ2h0PSIyOS42MzE1IiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzUzLjk1NSAxNC44MTU1KSIvPg0KPC9jbGlwUGF0aD4NCjxjbGlwUGF0aCBpZD0iY2xpcDFfNThfMTExIj4NCjxyZWN0IHdpZHRoPSI3Ni41NDgxIiBoZWlnaHQ9IjE2LjM1MDciIGZpbGw9IndoaXRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MjUuNTk5IDIwLjk4ODkpIi8+DQo8L2NsaXBQYXRoPg0KPGNsaXBQYXRoIGlkPSJjbGlwMl81OF8xMTEiPg0KPHJlY3Qgd2lkdGg9IjUyLjEzNzIiIGhlaWdodD0iMjAuOTk4NyIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIyMS4xNTggMTcuNDk5KSIvPg0KPC9jbGlwUGF0aD4NCjwvZGVmcz4NCjwvc3ZnPg0K" style="\n            width: 742.5px;\n            position: relative;\n            top: 107px;\n            left: 32px;\n            ">\n            <a href=' + accountURL + ' style="\n        float: left;\n        border-radius: 56px;\n        background: #0D6EFD;\n        padding-top: 8px;\n        width: 280px;\n        height: 38px;\n        text-align: center;\n        position: relative;\n        top: 127px;\n        left: 274px;\n        font-size: 16px;\n        color: white;\n        text-decoration: none;\n        letter-spacing: 0.02em;\n    ">Claim your FREE account</a>\n            <div style="\n    font-size: 14px;\n    position: relative;\n    top: 180px;\n    left: 19px;\n    letter-spacing: 0.02em;\n    font-weight: 500;\n    line-height: 125%;\n">have a Syncfusion account? <a href="https://www.syncfusion.com/account/login?ReturnUrl=/account/login" style="text-decoration: none;\ncolor: #0D6EFD;\nfont-weight: 500;">Sign In</a></div>\n        </div>\n    </div>';
  if (typeof document !== "undefined" && !isNullOrUndefined(document)) {
    var errorBackground = createElement("div", {
      innerHTML: bannerTemplate
    });
    document.body.appendChild(errorBackground);
  }
};

// node_modules/@syncfusion/ej2-base/src/component.js
var __extends2 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate3 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var componentCount = 0;
var lastPageID;
var lastHistoryLen = 0;
var instancecount = 0;
var isvalid = true;
var isBannerAdded = false;
var versionBasedStatePersistence = false;
var Component2 = (
  /** @class */
  function(_super) {
    __extends2(Component3, _super);
    function Component3(options, selector) {
      var _this = _super.call(this, options, selector) || this;
      _this.randomId = uniqueID();
      _this.isStringTemplate = false;
      _this.needsID = false;
      _this.isReactHybrid = false;
      _this.isAngular = false;
      _this.isReact = false;
      _this.isVue = false;
      if (isNullOrUndefined(_this.enableRtl)) {
        _this.setProperties({
          "enableRtl": rightToLeft
        }, true);
      }
      if (isNullOrUndefined(_this.locale)) {
        _this.setProperties({
          "locale": defaultCulture
        }, true);
      }
      _this.moduleLoader = new ModuleLoader(_this);
      _this.localObserver = new Observer(_this);
      onIntlChange.on("notifyExternalChange", _this.detectFunction, _this, _this.randomId);
      if (typeof window !== "undefined" && typeof document !== "undefined" && !validateLicense()) {
        if (componentList.indexOf(_this.getModuleName()) !== -1) {
          instancecount = instancecount + 1;
          if (instancecount > 5) {
            isvalid = false;
          }
        }
      }
      if (!isUndefined(selector)) {
        _this.appendTo();
      }
      return _this;
    }
    Component3.prototype.requiredModules = function() {
      return [];
    };
    Component3.prototype.destroy = function() {
      if (this.isDestroyed) {
        return;
      }
      if (this.enablePersistence) {
        this.setPersistData();
        this.detachUnloadEvent();
      }
      this.localObserver.destroy();
      if (this.refreshing) {
        return;
      }
      removeClass([this.element], ["e-control"]);
      this.trigger("destroyed", {
        cancel: false
      });
      _super.prototype.destroy.call(this);
      this.moduleLoader.clean();
      onIntlChange.off("notifyExternalChange", this.detectFunction, this.randomId);
    };
    Component3.prototype.refresh = function() {
      this.refreshing = true;
      this.moduleLoader.clean();
      this.destroy();
      this.clearChanges();
      this.localObserver = new Observer(this);
      this.preRender();
      this.injectModules();
      this.render();
      this.refreshing = false;
    };
    Component3.prototype.accessMount = function() {
      if (this.mount && !this.isReactHybrid) {
        this.mount();
      }
    };
    Component3.prototype.getRootElement = function() {
      if (this.isReactHybrid) {
        return this.actualElement;
      } else {
        return this.element;
      }
    };
    Component3.prototype.getLocalData = function() {
      var eleId = this.getModuleName() + this.element.id;
      if (versionBasedStatePersistence) {
        return window.localStorage.getItem(eleId + this.ej2StatePersistenceVersion);
      } else {
        return window.localStorage.getItem(eleId);
      }
    };
    Component3.prototype.attachUnloadEvent = function() {
      this.handleUnload = this.handleUnload.bind(this);
      window.addEventListener("pagehide", this.handleUnload);
    };
    Component3.prototype.handleUnload = function() {
      this.setPersistData();
    };
    Component3.prototype.detachUnloadEvent = function() {
      window.removeEventListener("pagehide", this.handleUnload);
    };
    Component3.prototype.appendTo = function(selector) {
      if (!isNullOrUndefined(selector) && typeof selector === "string") {
        this.element = select(selector, document);
      } else if (!isNullOrUndefined(selector)) {
        this.element = selector;
      }
      if (!isNullOrUndefined(this.element)) {
        var moduleClass = "e-" + this.getModuleName().toLowerCase();
        addClass([this.element], ["e-control", moduleClass]);
        this.isProtectedOnChange = false;
        if (this.needsID && !this.element.id) {
          this.element.id = this.getUniqueID(this.getModuleName());
        }
        if (this.enablePersistence) {
          this.mergePersistData();
          this.attachUnloadEvent();
        }
        var inst = getValue("ej2_instances", this.element);
        if (!inst || inst.indexOf(this) === -1) {
          _super.prototype.addInstance.call(this);
        }
        this.preRender();
        this.injectModules();
        var ignoredComponents = {
          schedule: "all",
          diagram: "all",
          PdfViewer: "all",
          grid: ["logger"],
          richtexteditor: ["link", "table", "image", "audio", "video", "formatPainter", "emojiPicker", "pasteCleanup", "htmlEditor", "toolbar", "importExport"],
          treegrid: ["filter"],
          gantt: ["tooltip"],
          chart: ["Export", "Zoom"],
          accumulationchart: ["Export"],
          "query-builder": "all"
        };
        var component = this.getModuleName();
        if (this.requiredModules && (!ignoredComponents["" + component] || ignoredComponents["" + component] !== "all")) {
          var modulesRequired = this.requiredModules();
          for (var _i = 0, _a = this.moduleLoader.getNonInjectedModules(modulesRequired); _i < _a.length; _i++) {
            var module = _a[_i];
            var moduleName = module.name ? module.name : module.member;
            if (ignoredComponents["" + component] && ignoredComponents["" + component].indexOf(module.member) !== -1) {
              continue;
            }
            var componentName = component.charAt(0).toUpperCase() + component.slice(1);
            console.warn('[WARNING] :: Module "' + moduleName + '" is not available in ' + componentName + " component! You either misspelled the module name or forgot to load it.");
          }
        }
        if (!isvalid && !isBannerAdded) {
          createLicenseOverlay();
          isBannerAdded = true;
        }
        this.render();
        if (!this.mount) {
          this.trigger("created");
        } else {
          this.accessMount();
        }
      }
    };
    Component3.prototype.renderComplete = function(wrapperElement) {
      if (isBlazor()) {
        var sfBlazor = "sfBlazor";
        window["" + sfBlazor].renderComplete(this.element, wrapperElement);
      }
      this.isRendered = true;
    };
    Component3.prototype.dataBind = function() {
      this.injectModules();
      _super.prototype.dataBind.call(this);
    };
    Component3.prototype.on = function(event, handler, context) {
      if (typeof event === "string") {
        this.localObserver.on(event, handler, context);
      } else {
        for (var _i = 0, event_1 = event; _i < event_1.length; _i++) {
          var arg = event_1[_i];
          this.localObserver.on(arg.event, arg.handler, arg.context);
        }
      }
    };
    Component3.prototype.off = function(event, handler) {
      if (typeof event === "string") {
        this.localObserver.off(event, handler);
      } else {
        for (var _i = 0, event_2 = event; _i < event_2.length; _i++) {
          var arg = event_2[_i];
          this.localObserver.off(arg.event, arg.handler);
        }
      }
    };
    Component3.prototype.notify = function(property, argument) {
      if (this.isDestroyed !== true) {
        this.localObserver.notify(property, argument);
      }
    };
    Component3.prototype.getInjectedModules = function() {
      return this.injectedModules;
    };
    Component3.Inject = function() {
      var moduleList = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        moduleList[_i] = arguments[_i];
      }
      if (!this.prototype.injectedModules) {
        this.prototype.injectedModules = [];
      }
      for (var i = 0; i < moduleList.length; i++) {
        if (this.prototype.injectedModules.indexOf(moduleList[parseInt(i.toString(), 10)]) === -1) {
          this.prototype.injectedModules.push(moduleList[parseInt(i.toString(), 10)]);
        }
      }
    };
    Component3.prototype.createElement = function(tagName, prop, isVDOM) {
      return createElement(tagName, prop);
    };
    Component3.prototype.triggerStateChange = function(handler, argument) {
      if (this.isReactHybrid) {
        this.setState();
        this.currentContext = {
          calls: handler,
          args: argument
        };
      }
    };
    Component3.prototype.injectModules = function() {
      if (this.injectedModules && this.injectedModules.length) {
        this.moduleLoader.inject(this.requiredModules(), this.injectedModules);
      }
    };
    Component3.prototype.detectFunction = function(args) {
      var prop = Object.keys(args);
      if (prop.length) {
        this[prop[0]] = args[prop[0]];
      }
    };
    Component3.prototype.mergePersistData = function() {
      var data;
      if (versionBasedStatePersistence) {
        data = window.localStorage.getItem(this.getModuleName() + this.element.id + this.ej2StatePersistenceVersion);
      } else {
        data = window.localStorage.getItem(this.getModuleName() + this.element.id);
      }
      if (!(isNullOrUndefined(data) || data === "")) {
        this.setProperties(JSON.parse(data), true);
      }
    };
    Component3.prototype.setPersistData = function() {
      if (!this.isDestroyed) {
        if (versionBasedStatePersistence) {
          window.localStorage.setItem(this.getModuleName() + this.element.id + this.ej2StatePersistenceVersion, this.getPersistData());
        } else {
          window.localStorage.setItem(this.getModuleName() + this.element.id, this.getPersistData());
        }
      }
    };
    Component3.prototype.renderReactTemplates = function(callback) {
      if (!isNullOrUndefined(callback)) {
        callback();
      }
    };
    Component3.prototype.clearTemplate = function(templateName, index) {
    };
    Component3.prototype.getUniqueID = function(definedName) {
      if (this.isHistoryChanged()) {
        componentCount = 0;
      }
      lastPageID = this.pageID(location.href);
      lastHistoryLen = history.length;
      return definedName + "_" + lastPageID + "_" + componentCount++;
    };
    Component3.prototype.pageID = function(url) {
      var hash = 0;
      if (url.length === 0) {
        return hash;
      }
      for (var i = 0; i < url.length; i++) {
        var char = url.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }
      return Math.abs(hash);
    };
    Component3.prototype.isHistoryChanged = function() {
      return lastPageID !== this.pageID(location.href) || lastHistoryLen !== history.length;
    };
    Component3.prototype.addOnPersist = function(options) {
      var _this = this;
      var persistObj = {};
      for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
        var key = options_1[_i];
        var objValue = getValue(key, this);
        if (!isUndefined(objValue)) {
          setValue(key, this.getActualProperties(objValue), persistObj);
        }
      }
      return JSON.stringify(persistObj, function(key2, value) {
        return _this.getActualProperties(value);
      });
    };
    Component3.prototype.getActualProperties = function(obj) {
      if (obj instanceof ChildProperty) {
        return getValue("properties", obj);
      } else {
        return obj;
      }
    };
    Component3.prototype.ignoreOnPersist = function(options) {
      return JSON.stringify(this.iterateJsonProperties(this.properties, options));
    };
    Component3.prototype.iterateJsonProperties = function(obj, ignoreList) {
      var newObj = {};
      var _loop_1 = function(key2) {
        if (ignoreList.indexOf(key2) === -1) {
          var value = obj["" + key2];
          if (typeof value === "object" && !(value instanceof Array)) {
            var newList = ignoreList.filter(function(str) {
              var regExp3 = RegExp;
              return new regExp3(key2 + ".").test(str);
            }).map(function(str) {
              return str.replace(key2 + ".", "");
            });
            newObj["" + key2] = this_1.iterateJsonProperties(this_1.getActualProperties(value), newList);
          } else {
            newObj["" + key2] = value;
          }
        }
      };
      var this_1 = this;
      for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var key = _a[_i];
        _loop_1(key);
      }
      return newObj;
    };
    __decorate3([Property(false)], Component3.prototype, "enablePersistence", void 0);
    __decorate3([Property()], Component3.prototype, "enableRtl", void 0);
    __decorate3([Property()], Component3.prototype, "locale", void 0);
    Component3 = __decorate3([NotifyPropertyChanges], Component3);
    return Component3;
  }(Base)
);
(function() {
  if (typeof window !== "undefined") {
    window.addEventListener(
      "popstate",
      /* istanbul ignore next */
      function() {
        componentCount = 0;
      }
    );
  }
})();

// node_modules/@syncfusion/ej2-base/src/draggable.js
var __extends3 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate4 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var defaultPosition = {
  left: 0,
  top: 0,
  bottom: 0,
  right: 0
};
var isDraggedObject = {
  isDragged: false
};
var Position = (
  /** @class */
  function(_super) {
    __extends3(Position2, _super);
    function Position2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate4([Property(0)], Position2.prototype, "left", void 0);
    __decorate4([Property(0)], Position2.prototype, "top", void 0);
    return Position2;
  }(ChildProperty)
);
var Draggable = (
  /** @class */
  function(_super) {
    __extends3(Draggable2, _super);
    function Draggable2(element, options) {
      var _this = _super.call(this, options, element) || this;
      _this.dragLimit = Draggable_1.getDefaultPosition();
      _this.borderWidth = Draggable_1.getDefaultPosition();
      _this.padding = Draggable_1.getDefaultPosition();
      _this.diffX = 0;
      _this.prevLeft = 0;
      _this.prevTop = 0;
      _this.dragProcessStarted = false;
      _this.eleTop = 0;
      _this.tapHoldTimer = 0;
      _this.externalInitialize = false;
      _this.diffY = 0;
      _this.parentScrollX = 0;
      _this.parentScrollY = 0;
      _this.droppables = {};
      _this.bind();
      return _this;
    }
    Draggable_1 = Draggable2;
    Draggable2.prototype.bind = function() {
      this.toggleEvents();
      if (Browser.isIE) {
        addClass([this.element], "e-block-touch");
      }
      this.droppables[this.scope] = {};
    };
    Draggable2.getDefaultPosition = function() {
      return extend({}, defaultPosition);
    };
    Draggable2.prototype.toggleEvents = function(isUnWire) {
      var ele;
      if (!isUndefined(this.handle)) {
        ele = select(this.handle, this.element);
      }
      var handler = this.enableTapHold && Browser.isDevice && Browser.isTouch ? this.mobileInitialize : this.initialize;
      if (isUnWire) {
        EventHandler.remove(ele || this.element, Browser.isSafari() ? "touchstart" : Browser.touchStartEvent, handler);
      } else {
        EventHandler.add(ele || this.element, Browser.isSafari() ? "touchstart" : Browser.touchStartEvent, handler, this);
      }
    };
    Draggable2.prototype.mobileInitialize = function(evt) {
      var _this = this;
      var target = evt.currentTarget;
      this.tapHoldTimer = setTimeout(function() {
        _this.externalInitialize = true;
        _this.removeTapholdTimer();
        _this.initialize(evt, target);
      }, this.tapHoldThreshold);
      EventHandler.add(document, Browser.isSafari() ? "touchmove" : Browser.touchMoveEvent, this.removeTapholdTimer, this);
      EventHandler.add(document, Browser.isSafari() ? "touchend" : Browser.touchEndEvent, this.removeTapholdTimer, this);
    };
    Draggable2.prototype.removeTapholdTimer = function() {
      clearTimeout(this.tapHoldTimer);
      EventHandler.remove(document, Browser.isSafari() ? "touchmove" : Browser.touchMoveEvent, this.removeTapholdTimer);
      EventHandler.remove(document, Browser.isSafari() ? "touchend" : Browser.touchEndEvent, this.removeTapholdTimer);
    };
    Draggable2.prototype.getScrollableParent = function(element, axis) {
      var scroll = {
        "vertical": "scrollHeight",
        "horizontal": "scrollWidth"
      };
      var client = {
        "vertical": "clientHeight",
        "horizontal": "clientWidth"
      };
      if (isNullOrUndefined(element)) {
        return null;
      }
      if (element[scroll["" + axis]] > element[client["" + axis]]) {
        if (axis === "vertical" ? element.scrollTop > 0 : element.scrollLeft > 0) {
          if (axis === "vertical") {
            this.parentScrollY = this.parentScrollY + (this.parentScrollY === 0 ? element.scrollTop : element.scrollTop - this.parentScrollY);
            this.tempScrollHeight = element.scrollHeight;
          } else {
            this.parentScrollX = this.parentScrollX + (this.parentScrollX === 0 ? element.scrollLeft : element.scrollLeft - this.parentScrollX);
            this.tempScrollWidth = element.scrollWidth;
          }
          if (!isNullOrUndefined(element)) {
            return this.getScrollableParent(element.parentNode, axis);
          } else {
            return element;
          }
        } else {
          return this.getScrollableParent(element.parentNode, axis);
        }
      } else {
        return this.getScrollableParent(element.parentNode, axis);
      }
    };
    Draggable2.prototype.getScrollableValues = function() {
      this.parentScrollX = 0;
      this.parentScrollY = 0;
      var isModalDialog = this.element.classList.contains("e-dialog") && this.element.classList.contains("e-dlg-modal");
      var verticalScrollParent = this.getScrollableParent(this.element.parentNode, "vertical");
      var horizontalScrollParent = this.getScrollableParent(this.element.parentNode, "horizontal");
    };
    Draggable2.prototype.initialize = function(evt, curTarget) {
      this.currentStateTarget = evt.target;
      if (this.isDragStarted()) {
        return;
      } else {
        this.isDragStarted(true);
        this.externalInitialize = false;
      }
      this.target = evt.currentTarget || curTarget;
      this.dragProcessStarted = false;
      if (this.abort) {
        var abortSelectors = this.abort;
        if (typeof abortSelectors === "string") {
          abortSelectors = [abortSelectors];
        }
        for (var i = 0; i < abortSelectors.length; i++) {
          if (!isNullOrUndefined(closest(evt.target, abortSelectors[parseInt(i.toString(), 10)]))) {
            if (this.isDragStarted()) {
              this.isDragStarted(true);
            }
            return;
          }
        }
      }
      if (this.preventDefault && !isUndefined(evt.changedTouches) && evt.type !== "touchstart") {
        evt.preventDefault();
      }
      this.element.setAttribute("aria-grabbed", "true");
      var intCoord = this.getCoordinates(evt);
      this.initialPosition = {
        x: intCoord.pageX,
        y: intCoord.pageY
      };
      if (!this.clone) {
        var pos = this.element.getBoundingClientRect();
        this.getScrollableValues();
        if (evt.clientX === evt.pageX) {
          this.parentScrollX = 0;
        }
        if (evt.clientY === evt.pageY) {
          this.parentScrollY = 0;
        }
        this.relativeXPosition = intCoord.pageX - (pos.left + this.parentScrollX);
        this.relativeYPosition = intCoord.pageY - (pos.top + this.parentScrollY);
      }
      if (this.externalInitialize) {
        this.intDragStart(evt);
      } else {
        EventHandler.add(document, Browser.isSafari() ? "touchmove" : Browser.touchMoveEvent, this.intDragStart, this);
        EventHandler.add(document, Browser.isSafari() ? "touchend" : Browser.touchEndEvent, this.intDestroy, this);
      }
      this.toggleEvents(true);
      if (evt.type !== "touchstart" && this.isPreventSelect) {
        document.body.classList.add("e-prevent-select");
      }
      this.externalInitialize = false;
      EventHandler.trigger(document.documentElement, Browser.isSafari() ? "touchstart" : Browser.touchStartEvent, evt);
    };
    Draggable2.prototype.intDragStart = function(evt) {
      this.removeTapholdTimer();
      var isChangeTouch = !isUndefined(evt.changedTouches);
      if (isChangeTouch && evt.changedTouches.length !== 1) {
        return;
      }
      var intCordinate = this.getCoordinates(evt);
      var pos;
      var styleProp = getComputedStyle(this.element);
      this.margin = {
        left: parseInt(styleProp.marginLeft, 10),
        top: parseInt(styleProp.marginTop, 10),
        right: parseInt(styleProp.marginRight, 10),
        bottom: parseInt(styleProp.marginBottom, 10)
      };
      var element = this.element;
      if (this.clone && this.dragTarget) {
        var intClosest = closest(evt.target, this.dragTarget);
        if (!isNullOrUndefined(intClosest)) {
          element = intClosest;
        }
      }
      if (this.isReplaceDragEle) {
        element = this.currentStateCheck(evt.target, element);
      }
      this.offset = this.calculateParentPosition(element);
      this.position = this.getMousePosition(evt, this.isDragScroll);
      var x = this.initialPosition.x - intCordinate.pageX;
      var y = this.initialPosition.y - intCordinate.pageY;
      var distance = Math.sqrt(x * x + y * y);
      if (distance >= this.distance || this.externalInitialize) {
        var ele = this.getHelperElement(evt);
        if (!ele || isNullOrUndefined(ele)) {
          return;
        }
        if (isChangeTouch) {
          evt.preventDefault();
        }
        var dragTargetElement = this.helperElement = ele;
        this.parentClientRect = this.calculateParentPosition(dragTargetElement.offsetParent);
        if (this.dragStart) {
          var curTarget = this.getProperTargetElement(evt);
          var args = {
            event: evt,
            element,
            target: curTarget,
            bindEvents: isBlazor() ? this.bindDragEvents.bind(this) : null,
            dragElement: dragTargetElement
          };
          this.trigger("dragStart", args);
        }
        if (this.dragArea) {
          this.setDragArea();
        } else {
          this.dragLimit = {
            left: 0,
            right: 0,
            bottom: 0,
            top: 0
          };
          this.borderWidth = {
            top: 0,
            left: 0
          };
        }
        pos = {
          left: this.position.left - this.parentClientRect.left,
          top: this.position.top - this.parentClientRect.top
        };
        if (this.clone && !this.enableTailMode) {
          this.diffX = this.position.left - this.offset.left;
          this.diffY = this.position.top - this.offset.top;
        }
        this.getScrollableValues();
        var styles = getComputedStyle(element);
        var marginTop = parseFloat(styles.marginTop);
        if (this.clone && marginTop !== 0) {
          pos.top += marginTop;
        }
        this.eleTop = !isNaN(parseFloat(styles.top)) ? parseFloat(styles.top) - this.offset.top : 0;
        if (this.enableScrollHandler && !this.clone) {
          pos.top -= this.parentScrollY;
          pos.left -= this.parentScrollX;
        }
        var posValue = this.getProcessedPositionValue({
          top: pos.top - this.diffY + "px",
          left: pos.left - this.diffX + "px"
        });
        if (this.dragArea && typeof this.dragArea !== "string" && this.dragArea.classList.contains("e-kanban-content") && this.dragArea.style.position === "relative") {
          pos.top += this.dragArea.scrollTop;
        }
        this.dragElePosition = {
          top: pos.top,
          left: pos.left
        };
        setStyleAttribute(dragTargetElement, this.getDragPosition({
          position: "absolute",
          left: posValue.left,
          top: posValue.top
        }));
        EventHandler.remove(document, Browser.isSafari() ? "touchmove" : Browser.touchMoveEvent, this.intDragStart);
        EventHandler.remove(document, Browser.isSafari() ? "touchend" : Browser.touchEndEvent, this.intDestroy);
        if (!isBlazor()) {
          this.bindDragEvents(dragTargetElement);
        }
      }
    };
    Draggable2.prototype.bindDragEvents = function(dragTargetElement) {
      if (isVisible(dragTargetElement)) {
        EventHandler.add(document, Browser.isSafari() ? "touchmove" : Browser.touchMoveEvent, this.intDrag, this);
        EventHandler.add(document, Browser.isSafari() ? "touchend" : Browser.touchEndEvent, this.intDragStop, this);
        this.setGlobalDroppables(false, this.element, dragTargetElement);
      } else {
        this.toggleEvents();
        document.body.classList.remove("e-prevent-select");
      }
    };
    Draggable2.prototype.elementInViewport = function(el) {
      this.top = el.offsetTop;
      this.left = el.offsetLeft;
      this.width = el.offsetWidth;
      this.height = el.offsetHeight;
      while (el.offsetParent) {
        el = el.offsetParent;
        this.top += el.offsetTop;
        this.left += el.offsetLeft;
      }
      return this.top >= window.pageYOffset && this.left >= window.pageXOffset && this.top + this.height <= window.pageYOffset + window.innerHeight && this.left + this.width <= window.pageXOffset + window.innerWidth;
    };
    Draggable2.prototype.getProcessedPositionValue = function(value) {
      if (this.queryPositionInfo) {
        return this.queryPositionInfo(value);
      }
      return value;
    };
    Draggable2.prototype.calculateParentPosition = function(ele) {
      if (isNullOrUndefined(ele)) {
        return {
          left: 0,
          top: 0
        };
      }
      var rect = ele.getBoundingClientRect();
      var style = getComputedStyle(ele);
      return {
        left: rect.left + window.pageXOffset - parseInt(style.marginLeft, 10),
        top: rect.top + window.pageYOffset - parseInt(style.marginTop, 10)
      };
    };
    Draggable2.prototype.intDrag = function(evt) {
      if (!isUndefined(evt.changedTouches) && evt.changedTouches.length !== 1) {
        return;
      }
      if (this.clone && evt.changedTouches && Browser.isDevice && Browser.isTouch) {
        evt.preventDefault();
      }
      var left;
      var top;
      this.position = this.getMousePosition(evt, this.isDragScroll);
      var docHeight = this.getDocumentWidthHeight("Height");
      if (docHeight < this.position.top) {
        this.position.top = docHeight;
      }
      var docWidth = this.getDocumentWidthHeight("Width");
      if (docWidth < this.position.left) {
        this.position.left = docWidth;
      }
      if (this.drag) {
        var curTarget = this.getProperTargetElement(evt);
        this.trigger("drag", {
          event: evt,
          element: this.element,
          target: curTarget
        });
      }
      var eleObj = this.checkTargetElement(evt);
      if (eleObj.target && eleObj.instance) {
        var flag = true;
        if (this.hoverObject) {
          if (this.hoverObject.instance !== eleObj.instance) {
            this.triggerOutFunction(evt, eleObj);
          } else {
            flag = false;
          }
        }
        if (flag) {
          eleObj.instance.dragData[this.scope] = this.droppables[this.scope];
          eleObj.instance.intOver(evt, eleObj.target);
          this.hoverObject = eleObj;
        }
      } else if (this.hoverObject) {
        this.triggerOutFunction(evt, eleObj);
      }
      var helperElement = this.droppables[this.scope].helper;
      this.parentClientRect = this.calculateParentPosition(this.helperElement.offsetParent);
      var tLeft = this.parentClientRect.left;
      var tTop = this.parentClientRect.top;
      var intCoord = this.getCoordinates(evt);
      var pagex = intCoord.pageX;
      var pagey = intCoord.pageY;
      var dLeft = this.position.left - this.diffX;
      var dTop = this.position.top - this.diffY;
      var styles = getComputedStyle(helperElement);
      if (this.dragArea) {
        if (this.enableAutoScroll) {
          this.setDragArea();
        }
        if (this.pageX !== pagex || this.skipDistanceCheck) {
          var helperWidth = helperElement.offsetWidth + (parseFloat(styles.marginLeft) + parseFloat(styles.marginRight));
          if (this.dragLimit.left > dLeft && dLeft > 0) {
            left = this.dragLimit.left;
          } else if (this.dragLimit.right + window.pageXOffset < dLeft + helperWidth && dLeft > 0) {
            left = dLeft - (dLeft - this.dragLimit.right) + window.pageXOffset - helperWidth;
          } else {
            left = dLeft < 0 ? this.dragLimit.left : dLeft;
          }
        }
        if (this.pageY !== pagey || this.skipDistanceCheck) {
          var helperHeight = helperElement.offsetHeight + (parseFloat(styles.marginTop) + parseFloat(styles.marginBottom));
          if (this.dragLimit.top > dTop && dTop > 0) {
            top = this.dragLimit.top;
          } else if (this.dragLimit.bottom + window.pageYOffset < dTop + helperHeight && dTop > 0) {
            top = dTop - (dTop - this.dragLimit.bottom) + window.pageYOffset - helperHeight;
          } else {
            top = dTop < 0 ? this.dragLimit.top : dTop;
          }
        }
      } else {
        left = dLeft;
        top = dTop;
      }
      var iTop = tTop + this.borderWidth.top;
      var iLeft = tLeft + this.borderWidth.left;
      if (this.dragProcessStarted) {
        if (isNullOrUndefined(top)) {
          top = this.prevTop;
        }
        if (isNullOrUndefined(left)) {
          left = this.prevLeft;
        }
      }
      var draEleTop;
      var draEleLeft;
      if (this.helperElement.classList.contains("e-treeview")) {
        if (this.dragArea) {
          this.dragLimit.top = this.clone ? this.dragLimit.top : 0;
          draEleTop = top - iTop < 0 ? this.dragLimit.top : top - this.borderWidth.top;
          draEleLeft = left - iLeft < 0 ? this.dragLimit.left : left - this.borderWidth.left;
        } else {
          draEleTop = top - this.borderWidth.top;
          draEleLeft = left - this.borderWidth.left;
        }
      } else {
        if (this.dragArea) {
          var isDialogEle = this.helperElement.classList.contains("e-dialog");
          this.dragLimit.top = this.clone ? this.dragLimit.top : 0;
          draEleTop = top - iTop < 0 ? this.dragLimit.top : top - iTop;
          draEleLeft = left - iLeft < 0 ? isDialogEle ? left - (iLeft - this.borderWidth.left) : this.dragElePosition.left : left - iLeft;
        } else {
          draEleTop = top - iTop;
          draEleLeft = left - iLeft;
        }
      }
      var marginTop = parseFloat(getComputedStyle(this.element).marginTop);
      if (marginTop > 0) {
        if (this.clone) {
          draEleTop += marginTop;
          if (dTop < 0) {
            if (marginTop + dTop >= 0) {
              draEleTop = marginTop + dTop;
            } else {
              draEleTop -= marginTop;
            }
          }
          if (this.dragArea) {
            draEleTop = this.dragLimit.bottom < draEleTop ? this.dragLimit.bottom : draEleTop;
          }
        }
        if (top - iTop < 0) {
          if (dTop + marginTop + (helperElement.offsetHeight - iTop) >= 0) {
            var tempDraEleTop = this.dragLimit.top + dTop - iTop;
            if (tempDraEleTop + marginTop + iTop < 0) {
              draEleTop -= marginTop + iTop;
            } else {
              draEleTop = tempDraEleTop;
            }
          } else {
            draEleTop -= marginTop + iTop;
          }
        }
      }
      if (this.dragArea && this.helperElement.classList.contains("e-treeview")) {
        var helperHeight = helperElement.offsetHeight + (parseFloat(styles.marginTop) + parseFloat(styles.marginBottom));
        draEleTop = draEleTop + helperHeight > this.dragLimit.bottom ? this.dragLimit.bottom - helperHeight : draEleTop;
      }
      if (this.enableScrollHandler && !this.clone) {
        draEleTop -= this.parentScrollY;
        draEleLeft -= this.parentScrollX;
      }
      if (this.dragArea && typeof this.dragArea !== "string" && this.dragArea.classList.contains("e-kanban-content") && this.dragArea.style.position === "relative") {
        draEleTop += this.dragArea.scrollTop;
      }
      var dragValue = this.getProcessedPositionValue({
        top: draEleTop + "px",
        left: draEleLeft + "px"
      });
      if (this.isPreventScroll) {
        dragValue = this.getProcessedPositionValue({
          top: this.position.top - this.parentClientRect.top - 2 + "px",
          left: this.position.left - this.parentClientRect.left - 2 + "px"
        });
      }
      setStyleAttribute(helperElement, this.getDragPosition(dragValue));
      if (!this.elementInViewport(helperElement) && this.enableAutoScroll && !this.helperElement.classList.contains("e-treeview")) {
        this.helperElement.scrollIntoView();
      }
      var elements = document.querySelectorAll(":hover");
      if (this.enableAutoScroll && this.helperElement.classList.contains("e-treeview")) {
        if (elements.length === 0) {
          elements = this.getPathElements(evt);
        }
        var scrollParent = this.getScrollParent(elements, false);
        if (this.elementInViewport(this.helperElement)) {
          this.getScrollPosition(scrollParent, draEleTop);
        } else if (!this.elementInViewport(this.helperElement)) {
          elements = [].slice.call(document.querySelectorAll(":hover"));
          if (elements.length === 0) {
            elements = this.getPathElements(evt);
          }
          scrollParent = this.getScrollParent(elements, true);
          this.getScrollPosition(scrollParent, draEleTop);
        }
      }
      this.dragProcessStarted = true;
      this.prevLeft = left;
      this.prevTop = top;
      this.position.left = left;
      this.position.top = top;
      this.pageX = pagex;
      this.pageY = pagey;
    };
    Draggable2.prototype.getScrollParent = function(node, reverse) {
      var nodeEl = reverse ? node.reverse() : node;
      var hasScroll;
      for (var i = nodeEl.length - 1; i >= 0; i--) {
        hasScroll = window.getComputedStyle(nodeEl[parseInt(i.toString(), 10)])["overflow-y"];
        if ((hasScroll === "auto" || hasScroll === "scroll") && nodeEl[parseInt(i.toString(), 10)].scrollHeight > nodeEl[parseInt(i.toString(), 10)].clientHeight) {
          return nodeEl[parseInt(i.toString(), 10)];
        }
      }
      hasScroll = window.getComputedStyle(document.scrollingElement)["overflow-y"];
      if (hasScroll === "visible") {
        document.scrollingElement.style.overflow = "auto";
        return document.scrollingElement;
      }
    };
    Draggable2.prototype.getScrollPosition = function(nodeEle, draEleTop) {
      if (nodeEle && nodeEle === document.scrollingElement) {
        if (nodeEle.clientHeight + document.scrollingElement.scrollTop - this.helperElement.clientHeight < draEleTop && nodeEle.getBoundingClientRect().height + this.parentClientRect.top > draEleTop) {
          nodeEle.scrollTop += this.helperElement.clientHeight;
        } else if (nodeEle.scrollTop > draEleTop - this.helperElement.clientHeight) {
          nodeEle.scrollTop -= this.helperElement.clientHeight;
        }
      } else if (nodeEle && nodeEle !== document.scrollingElement) {
        var docScrollTop = document.scrollingElement.scrollTop;
        var helperClientHeight = this.helperElement.clientHeight;
        if (nodeEle.clientHeight + nodeEle.getBoundingClientRect().top - helperClientHeight + docScrollTop < draEleTop) {
          nodeEle.scrollTop += this.helperElement.clientHeight;
        } else if (nodeEle.getBoundingClientRect().top > draEleTop - helperClientHeight - docScrollTop) {
          nodeEle.scrollTop -= this.helperElement.clientHeight;
        }
      }
    };
    Draggable2.prototype.getPathElements = function(evt) {
      var elementTop = evt.clientX > 0 ? evt.clientX : 0;
      var elementLeft = evt.clientY > 0 ? evt.clientY : 0;
      return document.elementsFromPoint(elementTop, elementLeft);
    };
    Draggable2.prototype.triggerOutFunction = function(evt, eleObj) {
      this.hoverObject.instance.intOut(evt, eleObj.target);
      this.hoverObject.instance.dragData[this.scope] = null;
      this.hoverObject = null;
    };
    Draggable2.prototype.getDragPosition = function(dragValue) {
      var temp = extend({}, dragValue);
      if (this.axis) {
        if (this.axis === "x") {
          delete temp.top;
        } else if (this.axis === "y") {
          delete temp.left;
        }
      }
      return temp;
    };
    Draggable2.prototype.getDocumentWidthHeight = function(str) {
      var docBody = document.body;
      var docEle = document.documentElement;
      var returnValue = Math.max(docBody["scroll" + str], docEle["scroll" + str], docBody["offset" + str], docEle["offset" + str], docEle["client" + str]);
      return returnValue;
    };
    Draggable2.prototype.intDragStop = function(evt) {
      this.dragProcessStarted = false;
      if (!isUndefined(evt.changedTouches) && evt.changedTouches.length !== 1) {
        return;
      }
      var type = ["touchend", "pointerup", "mouseup"];
      if (type.indexOf(evt.type) !== -1) {
        if (this.dragStop) {
          var curTarget = this.getProperTargetElement(evt);
          this.trigger("dragStop", {
            event: evt,
            element: this.element,
            target: curTarget,
            helper: this.helperElement
          });
        }
        this.intDestroy(evt);
      } else {
        this.element.setAttribute("aria-grabbed", "false");
      }
      var eleObj = this.checkTargetElement(evt);
      if (eleObj.target && eleObj.instance) {
        eleObj.instance.dragStopCalled = true;
        eleObj.instance.dragData[this.scope] = this.droppables[this.scope];
        eleObj.instance.intDrop(evt, eleObj.target);
      }
      this.setGlobalDroppables(true);
      document.body.classList.remove("e-prevent-select");
    };
    Draggable2.prototype.intDestroy = function(evt) {
      this.dragProcessStarted = false;
      this.toggleEvents();
      document.body.classList.remove("e-prevent-select");
      this.element.setAttribute("aria-grabbed", "false");
      EventHandler.remove(document, Browser.isSafari() ? "touchmove" : Browser.touchMoveEvent, this.intDragStart);
      EventHandler.remove(document, Browser.isSafari() ? "touchend" : Browser.touchEndEvent, this.intDragStop);
      EventHandler.remove(document, Browser.isSafari() ? "touchend" : Browser.touchEndEvent, this.intDestroy);
      EventHandler.remove(document, Browser.isSafari() ? "touchmove" : Browser.touchMoveEvent, this.intDrag);
      if (this.isDragStarted()) {
        this.isDragStarted(true);
      }
    };
    Draggable2.prototype.onPropertyChanged = function(newProp, oldProp) {
    };
    Draggable2.prototype.getModuleName = function() {
      return "draggable";
    };
    Draggable2.prototype.isDragStarted = function(change) {
      if (change) {
        isDraggedObject.isDragged = !isDraggedObject.isDragged;
      }
      return isDraggedObject.isDragged;
    };
    Draggable2.prototype.setDragArea = function() {
      var eleWidthBound;
      var eleHeightBound;
      var top = 0;
      var left = 0;
      var ele;
      var type = typeof this.dragArea;
      if (type === "string") {
        ele = select(this.dragArea);
      } else {
        ele = this.dragArea;
      }
      if (ele) {
        var elementArea = ele.getBoundingClientRect();
        eleWidthBound = ele.scrollWidth ? ele.scrollWidth : elementArea.right - elementArea.left;
        eleHeightBound = ele.scrollHeight ? this.dragArea && !isNullOrUndefined(this.helperElement) && this.helperElement.classList.contains("e-treeview") ? ele.clientHeight : ele.scrollHeight : elementArea.bottom - elementArea.top;
        var keys2 = ["Top", "Left", "Bottom", "Right"];
        var styles = getComputedStyle(ele);
        for (var i = 0; i < keys2.length; i++) {
          var key = keys2[parseInt(i.toString(), 10)];
          var tborder = styles["border" + key + "Width"];
          var tpadding = styles["padding" + key];
          var lowerKey = key.toLowerCase();
          this.borderWidth["" + lowerKey] = isNaN(parseFloat(tborder)) ? 0 : parseFloat(tborder);
          this.padding["" + lowerKey] = isNaN(parseFloat(tpadding)) ? 0 : parseFloat(tpadding);
        }
        if (this.dragArea && !isNullOrUndefined(this.helperElement) && this.helperElement.classList.contains("e-treeview")) {
          top = elementArea.top + document.scrollingElement.scrollTop;
        } else {
          top = elementArea.top;
        }
        left = elementArea.left;
        this.dragLimit.left = left + this.borderWidth.left + this.padding.left;
        this.dragLimit.top = ele.offsetTop + this.borderWidth.top + this.padding.top;
        this.dragLimit.right = left + eleWidthBound - (this.borderWidth.right + this.padding.right);
        this.dragLimit.bottom = top + eleHeightBound - (this.borderWidth.bottom + this.padding.bottom);
      }
    };
    Draggable2.prototype.getProperTargetElement = function(evt) {
      var intCoord = this.getCoordinates(evt);
      var ele;
      var prevStyle = this.helperElement.style.pointerEvents || "";
      var isPointer = evt.type.indexOf("pointer") !== -1 && Browser.info.name === "safari" && parseInt(Browser.info.version, 10) > 12;
      if (compareElementParent(evt.target, this.helperElement) || evt.type.indexOf("touch") !== -1 || isPointer) {
        this.helperElement.style.pointerEvents = "none";
        ele = document.elementFromPoint(intCoord.clientX, intCoord.clientY);
        this.helperElement.style.pointerEvents = prevStyle;
      } else {
        ele = evt.target;
      }
      return ele;
    };
    Draggable2.prototype.currentStateCheck = function(ele, oldEle) {
      var elem;
      if (!isNullOrUndefined(this.currentStateTarget) && this.currentStateTarget !== ele) {
        elem = this.currentStateTarget;
      } else {
        elem = !isNullOrUndefined(oldEle) ? oldEle : ele;
      }
      return elem;
    };
    Draggable2.prototype.getMousePosition = function(evt, isdragscroll) {
      var dragEle = evt.srcElement !== void 0 ? evt.srcElement : evt.target;
      var intCoord = this.getCoordinates(evt);
      var pageX;
      var pageY;
      var isOffsetParent = isNullOrUndefined(dragEle.offsetParent);
      if (isdragscroll) {
        pageX = this.clone ? intCoord.pageX : intCoord.pageX + (isOffsetParent ? 0 : dragEle.offsetParent.scrollLeft) - this.relativeXPosition;
        pageY = this.clone ? intCoord.pageY : intCoord.pageY + (isOffsetParent ? 0 : dragEle.offsetParent.scrollTop) - this.relativeYPosition;
      } else {
        pageX = this.clone ? intCoord.pageX : intCoord.pageX + window.pageXOffset - this.relativeXPosition;
        pageY = this.clone ? intCoord.pageY : intCoord.pageY + window.pageYOffset - this.relativeYPosition;
      }
      if (document.scrollingElement && !isdragscroll && !this.clone) {
        var ele = document.scrollingElement;
        var isVerticalScroll = ele.scrollHeight > 0 && ele.scrollHeight > ele.clientHeight && ele.scrollTop > 0;
        var isHorrizontalScroll = ele.scrollWidth > 0 && ele.scrollWidth > ele.clientWidth && ele.scrollLeft > 0;
        pageX = isHorrizontalScroll ? pageX - ele.scrollLeft : pageX;
        pageY = isVerticalScroll ? pageY - ele.scrollTop : pageY;
      }
      return {
        left: pageX - (this.margin.left + this.cursorAt.left),
        top: pageY - (this.margin.top + this.cursorAt.top)
      };
    };
    Draggable2.prototype.getCoordinates = function(evt) {
      if (evt.type.indexOf("touch") > -1) {
        return evt.changedTouches[0];
      }
      return evt;
    };
    Draggable2.prototype.getHelperElement = function(evt) {
      var element;
      if (this.clone) {
        if (this.helper) {
          element = this.helper({
            sender: evt,
            element: this.target
          });
        } else {
          element = createElement("div", {
            className: "e-drag-helper e-block-touch",
            innerHTML: "Draggable"
          });
          document.body.appendChild(element);
        }
      } else {
        element = this.element;
      }
      return element;
    };
    Draggable2.prototype.setGlobalDroppables = function(reset, drag, helper) {
      this.droppables[this.scope] = reset ? null : {
        draggable: drag,
        helper,
        draggedElement: this.element
      };
    };
    Draggable2.prototype.checkTargetElement = function(evt) {
      var target = this.getProperTargetElement(evt);
      var dropIns = this.getDropInstance(target);
      if (!dropIns && target && !isNullOrUndefined(target.parentNode)) {
        var parent_1 = closest(target.parentNode, ".e-droppable") || target.parentElement;
        if (parent_1) {
          dropIns = this.getDropInstance(parent_1);
        }
      }
      return {
        target,
        instance: dropIns
      };
    };
    Draggable2.prototype.getDropInstance = function(ele) {
      var name = "getModuleName";
      var drop;
      var eleInst = ele && ele.ej2_instances;
      if (eleInst) {
        for (var _i = 0, eleInst_1 = eleInst; _i < eleInst_1.length; _i++) {
          var inst = eleInst_1[_i];
          if (inst["" + name]() === "droppable") {
            drop = inst;
            break;
          }
        }
      }
      return drop;
    };
    Draggable2.prototype.destroy = function() {
      this.toggleEvents(true);
      _super.prototype.destroy.call(this);
    };
    var Draggable_1;
    __decorate4([Complex({}, Position)], Draggable2.prototype, "cursorAt", void 0);
    __decorate4([Property(true)], Draggable2.prototype, "clone", void 0);
    __decorate4([Property()], Draggable2.prototype, "dragArea", void 0);
    __decorate4([Property()], Draggable2.prototype, "isDragScroll", void 0);
    __decorate4([Property()], Draggable2.prototype, "isReplaceDragEle", void 0);
    __decorate4([Property(true)], Draggable2.prototype, "isPreventSelect", void 0);
    __decorate4([Property(false)], Draggable2.prototype, "isPreventScroll", void 0);
    __decorate4([Event2()], Draggable2.prototype, "drag", void 0);
    __decorate4([Event2()], Draggable2.prototype, "dragStart", void 0);
    __decorate4([Event2()], Draggable2.prototype, "dragStop", void 0);
    __decorate4([Property(1)], Draggable2.prototype, "distance", void 0);
    __decorate4([Property()], Draggable2.prototype, "handle", void 0);
    __decorate4([Property()], Draggable2.prototype, "abort", void 0);
    __decorate4([Property()], Draggable2.prototype, "helper", void 0);
    __decorate4([Property("default")], Draggable2.prototype, "scope", void 0);
    __decorate4([Property("")], Draggable2.prototype, "dragTarget", void 0);
    __decorate4([Property()], Draggable2.prototype, "axis", void 0);
    __decorate4([Property()], Draggable2.prototype, "queryPositionInfo", void 0);
    __decorate4([Property(false)], Draggable2.prototype, "enableTailMode", void 0);
    __decorate4([Property(false)], Draggable2.prototype, "skipDistanceCheck", void 0);
    __decorate4([Property(true)], Draggable2.prototype, "preventDefault", void 0);
    __decorate4([Property(false)], Draggable2.prototype, "enableAutoScroll", void 0);
    __decorate4([Property(false)], Draggable2.prototype, "enableTapHold", void 0);
    __decorate4([Property(750)], Draggable2.prototype, "tapHoldThreshold", void 0);
    __decorate4([Property(false)], Draggable2.prototype, "enableScrollHandler", void 0);
    Draggable2 = Draggable_1 = __decorate4([NotifyPropertyChanges], Draggable2);
    return Draggable2;
  }(Base)
);

// node_modules/@syncfusion/ej2-base/src/droppable.js
var __extends4 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate5 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Droppable = (
  /** @class */
  function(_super) {
    __extends4(Droppable2, _super);
    function Droppable2(element, options) {
      var _this = _super.call(this, options, element) || this;
      _this.mouseOver = false;
      _this.dragData = {};
      _this.dragStopCalled = false;
      _this.bind();
      return _this;
    }
    Droppable2.prototype.bind = function() {
      this.wireEvents();
    };
    Droppable2.prototype.wireEvents = function() {
      EventHandler.add(this.element, Browser.isSafari() ? "touchend" : Browser.touchEndEvent, this.intDrop, this);
    };
    Droppable2.prototype.onPropertyChanged = function(newProp, oldProp) {
    };
    Droppable2.prototype.getModuleName = function() {
      return "droppable";
    };
    Droppable2.prototype.intOver = function(event, element) {
      if (!this.mouseOver) {
        var drag = this.dragData[this.scope];
        this.trigger("over", {
          event,
          target: element,
          dragData: drag
        });
        this.mouseOver = true;
      }
    };
    Droppable2.prototype.intOut = function(event, element) {
      if (this.mouseOver) {
        this.trigger("out", {
          evt: event,
          target: element
        });
        this.mouseOver = false;
      }
    };
    Droppable2.prototype.intDrop = function(evt, element) {
      if (!this.dragStopCalled) {
        return;
      } else {
        this.dragStopCalled = false;
      }
      var accept = true;
      var drag = this.dragData[this.scope];
      var isDrag = drag ? drag.helper && isVisible(drag.helper) : false;
      var area;
      if (isDrag) {
        area = this.isDropArea(evt, drag.helper, element);
        if (this.accept) {
          accept = matches(drag.helper, this.accept);
        }
      }
      if (isDrag && this.drop && area.canDrop && accept) {
        this.trigger("drop", {
          event: evt,
          target: area.target,
          droppedElement: drag.helper,
          dragData: drag
        });
      }
      this.mouseOver = false;
    };
    Droppable2.prototype.isDropArea = function(evt, helper, element) {
      var area = {
        canDrop: true,
        target: element || evt.target
      };
      var isTouch = evt.type === "touchend";
      if (isTouch || area.target === helper) {
        helper.style.display = "none";
        var coord = isTouch ? evt.changedTouches[0] : evt;
        var ele = document.elementFromPoint(coord.clientX, coord.clientY);
        area.canDrop = false;
        area.canDrop = compareElementParent(ele, this.element);
        if (area.canDrop) {
          area.target = ele;
        }
        helper.style.display = "";
      }
      return area;
    };
    Droppable2.prototype.destroy = function() {
      EventHandler.remove(this.element, Browser.isSafari() ? "touchend" : Browser.touchEndEvent, this.intDrop);
      _super.prototype.destroy.call(this);
    };
    __decorate5([Property()], Droppable2.prototype, "accept", void 0);
    __decorate5([Property("default")], Droppable2.prototype, "scope", void 0);
    __decorate5([Event2()], Droppable2.prototype, "drop", void 0);
    __decorate5([Event2()], Droppable2.prototype, "over", void 0);
    __decorate5([Event2()], Droppable2.prototype, "out", void 0);
    Droppable2 = __decorate5([NotifyPropertyChanges], Droppable2);
    return Droppable2;
  }(Base)
);

// node_modules/@syncfusion/ej2-base/src/keyboard.js
var __extends5 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate6 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var keyCode = {
  "backspace": 8,
  "tab": 9,
  "enter": 13,
  "shift": 16,
  "control": 17,
  "alt": 18,
  "pause": 19,
  "capslock": 20,
  "space": 32,
  "escape": 27,
  "pageup": 33,
  "pagedown": 34,
  "end": 35,
  "home": 36,
  "leftarrow": 37,
  "uparrow": 38,
  "rightarrow": 39,
  "downarrow": 40,
  "insert": 45,
  "delete": 46,
  "f1": 112,
  "f2": 113,
  "f3": 114,
  "f4": 115,
  "f5": 116,
  "f6": 117,
  "f7": 118,
  "f8": 119,
  "f9": 120,
  "f10": 121,
  "f11": 122,
  "f12": 123,
  "semicolon": 186,
  "plus": 187,
  "comma": 188,
  "minus": 189,
  "dot": 190,
  "forwardslash": 191,
  "graveaccent": 192,
  "openbracket": 219,
  "backslash": 220,
  "closebracket": 221,
  "singlequote": 222
};
var KeyboardEvents = (
  /** @class */
  function(_super) {
    __extends5(KeyboardEvents2, _super);
    function KeyboardEvents2(element, options) {
      var _this = _super.call(this, options, element) || this;
      _this.keyPressHandler = function(e) {
        var isAltKey = e.altKey;
        var isCtrlKey = e.ctrlKey;
        var isShiftKey = e.shiftKey;
        var curkeyCode = e.which;
        var keys2 = Object.keys(_this.keyConfigs);
        for (var _i = 0, keys_1 = keys2; _i < keys_1.length; _i++) {
          var key = keys_1[_i];
          var configCollection = _this.keyConfigs["" + key].split(",");
          for (var _a = 0, configCollection_1 = configCollection; _a < configCollection_1.length; _a++) {
            var rconfig = configCollection_1[_a];
            var rKeyObj = KeyboardEvents_1.getKeyConfigData(rconfig.trim());
            if (isAltKey === rKeyObj.altKey && isCtrlKey === rKeyObj.ctrlKey && isShiftKey === rKeyObj.shiftKey && curkeyCode === rKeyObj.keyCode) {
              e.action = key;
              if (_this.keyAction) {
                _this.keyAction(e);
              }
            }
          }
        }
      };
      _this.bind();
      return _this;
    }
    KeyboardEvents_1 = KeyboardEvents2;
    KeyboardEvents2.prototype.destroy = function() {
      this.unwireEvents();
      _super.prototype.destroy.call(this);
    };
    KeyboardEvents2.prototype.onPropertyChanged = function(newProp, oldProp) {
    };
    KeyboardEvents2.prototype.bind = function() {
      this.wireEvents();
    };
    KeyboardEvents2.prototype.getModuleName = function() {
      return "keyboard";
    };
    KeyboardEvents2.prototype.wireEvents = function() {
      this.element.addEventListener(this.eventName, this.keyPressHandler);
    };
    KeyboardEvents2.prototype.unwireEvents = function() {
      this.element.removeEventListener(this.eventName, this.keyPressHandler);
    };
    KeyboardEvents2.getKeyConfigData = function(config) {
      if (config in this.configCache) {
        return this.configCache["" + config];
      }
      var keys2 = config.toLowerCase().split("+");
      var keyData = {
        altKey: keys2.indexOf("alt") !== -1 ? true : false,
        ctrlKey: keys2.indexOf("ctrl") !== -1 ? true : false,
        shiftKey: keys2.indexOf("shift") !== -1 ? true : false,
        keyCode: null
      };
      if (keys2[keys2.length - 1].length > 1 && !!Number(keys2[keys2.length - 1])) {
        keyData.keyCode = Number(keys2[keys2.length - 1]);
      } else {
        keyData.keyCode = KeyboardEvents_1.getKeyCode(keys2[keys2.length - 1]);
      }
      KeyboardEvents_1.configCache["" + config] = keyData;
      return keyData;
    };
    KeyboardEvents2.getKeyCode = function(keyVal) {
      return keyCode["" + keyVal] || keyVal.toUpperCase().charCodeAt(0);
    };
    var KeyboardEvents_1;
    KeyboardEvents2.configCache = {};
    __decorate6([Property({})], KeyboardEvents2.prototype, "keyConfigs", void 0);
    __decorate6([Property("keyup")], KeyboardEvents2.prototype, "eventName", void 0);
    __decorate6([Event2()], KeyboardEvents2.prototype, "keyAction", void 0);
    KeyboardEvents2 = KeyboardEvents_1 = __decorate6([NotifyPropertyChanges], KeyboardEvents2);
    return KeyboardEvents2;
  }(Base)
);

// node_modules/@syncfusion/ej2-base/src/l10n.js
var L10n = (
  /** @class */
  function() {
    function L10n2(controlName, localeStrings, locale) {
      this.controlName = controlName;
      this.localeStrings = localeStrings;
      this.setLocale(locale || defaultCulture);
    }
    L10n2.prototype.setLocale = function(locale) {
      var intLocale = this.intGetControlConstant(L10n2.locale, locale);
      this.currentLocale = intLocale || this.localeStrings;
    };
    L10n2.load = function(localeObject) {
      this.locale = extend(this.locale, localeObject, {}, true);
    };
    L10n2.prototype.getConstant = function(prop) {
      if (!isNullOrUndefined(this.currentLocale["" + prop])) {
        return this.currentLocale["" + prop];
      } else {
        return this.localeStrings["" + prop] || "";
      }
    };
    L10n2.prototype.intGetControlConstant = function(curObject, locale) {
      if (curObject["" + locale]) {
        return curObject["" + locale][this.controlName];
      }
      return null;
    };
    L10n2.locale = {};
    return L10n2;
  }()
);

// node_modules/@syncfusion/ej2-base/src/touch.js
var __extends6 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate7 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SwipeSettings = (
  /** @class */
  function(_super) {
    __extends6(SwipeSettings2, _super);
    function SwipeSettings2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate7([Property(50)], SwipeSettings2.prototype, "swipeThresholdDistance", void 0);
    return SwipeSettings2;
  }(ChildProperty)
);
var swipeRegex = /(Up|Down)/;
var Touch = (
  /** @class */
  function(_super) {
    __extends6(Touch2, _super);
    function Touch2(element, options) {
      var _this = _super.call(this, options, element) || this;
      _this.touchAction = true;
      _this.tapCount = 0;
      _this.startEvent = function(evt) {
        if (_this.touchAction === true) {
          var point = _this.updateChangeTouches(evt);
          if (evt.changedTouches !== void 0) {
            _this.touchAction = false;
          }
          _this.isTouchMoved = false;
          _this.movedDirection = "";
          _this.startPoint = _this.lastMovedPoint = {
            clientX: point.clientX,
            clientY: point.clientY
          };
          _this.startEventData = point;
          _this.hScrollLocked = _this.vScrollLocked = false;
          _this.tStampStart = Date.now();
          _this.timeOutTapHold = setTimeout(function() {
            _this.tapHoldEvent(evt);
          }, _this.tapHoldThreshold);
          EventHandler.add(_this.element, Browser.touchMoveEvent, _this.moveEvent, _this);
          EventHandler.add(_this.element, Browser.touchEndEvent, _this.endEvent, _this);
          EventHandler.add(_this.element, Browser.touchCancelEvent, _this.cancelEvent, _this);
        }
      };
      _this.moveEvent = function(evt) {
        var point = _this.updateChangeTouches(evt);
        _this.movedPoint = point;
        _this.isTouchMoved = !(point.clientX === _this.startPoint.clientX && point.clientY === _this.startPoint.clientY);
        var eScrollArgs = {};
        if (_this.isTouchMoved) {
          clearTimeout(_this.timeOutTapHold);
          _this.calcScrollPoints(evt);
          var scrollArg = {
            startEvents: _this.startEventData,
            originalEvent: evt,
            startX: _this.startPoint.clientX,
            startY: _this.startPoint.clientY,
            distanceX: _this.distanceX,
            distanceY: _this.distanceY,
            scrollDirection: _this.scrollDirection,
            velocity: _this.getVelocity(point)
          };
          eScrollArgs = extend(eScrollArgs, {}, scrollArg);
          _this.trigger("scroll", eScrollArgs);
          _this.lastMovedPoint = {
            clientX: point.clientX,
            clientY: point.clientY
          };
        }
      };
      _this.cancelEvent = function(evt) {
        clearTimeout(_this.timeOutTapHold);
        clearTimeout(_this.timeOutTap);
        _this.tapCount = 0;
        _this.swipeFn(evt);
        EventHandler.remove(_this.element, Browser.touchCancelEvent, _this.cancelEvent);
      };
      _this.endEvent = function(evt) {
        _this.swipeFn(evt);
        if (!_this.isTouchMoved) {
          if (typeof _this.tap === "function") {
            _this.trigger("tap", {
              originalEvent: evt,
              tapCount: ++_this.tapCount
            });
            _this.timeOutTap = setTimeout(function() {
              _this.tapCount = 0;
            }, _this.tapThreshold);
          }
        }
        _this.modeclear();
      };
      _this.swipeFn = function(evt) {
        clearTimeout(_this.timeOutTapHold);
        clearTimeout(_this.timeOutTap);
        var point = _this.updateChangeTouches(evt);
        var diffX = point.clientX - _this.startPoint.clientX;
        var diffY = point.clientY - _this.startPoint.clientY;
        diffX = Math.floor(diffX < 0 ? -1 * diffX : diffX);
        diffY = Math.floor(diffY < 0 ? -1 * diffY : diffX);
        _this.isTouchMoved = diffX > 1 || diffY > 1;
        var isFirefox = /Firefox/.test(Browser.userAgent);
        if (isFirefox && point.clientX === 0 && point.clientY === 0 && evt.type === "mouseup") {
          _this.isTouchMoved = false;
        }
        _this.endPoint = point;
        _this.calcPoints(evt);
        var swipeArgs = {
          originalEvent: evt,
          startEvents: _this.startEventData,
          startX: _this.startPoint.clientX,
          startY: _this.startPoint.clientY,
          distanceX: _this.distanceX,
          distanceY: _this.distanceY,
          swipeDirection: _this.movedDirection,
          velocity: _this.getVelocity(point)
        };
        if (_this.isTouchMoved) {
          var tDistance = _this.swipeSettings.swipeThresholdDistance;
          var eSwipeArgs = extend(void 0, _this.defaultArgs, swipeArgs);
          var canTrigger = false;
          var ele = _this.element;
          var scrollBool = _this.isScrollable(ele);
          var moved = swipeRegex.test(_this.movedDirection);
          if (tDistance < _this.distanceX && !moved || tDistance < _this.distanceY && moved) {
            if (!scrollBool) {
              canTrigger = true;
            } else {
              canTrigger = _this.checkSwipe(ele, moved);
            }
          }
          if (canTrigger) {
            _this.trigger("swipe", eSwipeArgs);
          }
        }
        _this.modeclear();
      };
      _this.modeclear = function() {
        _this.modeClear = setTimeout(function() {
          _this.touchAction = true;
        }, typeof _this.tap !== "function" ? 0 : 20);
        _this.lastTapTime = (/* @__PURE__ */ new Date()).getTime();
        EventHandler.remove(_this.element, Browser.touchMoveEvent, _this.moveEvent);
        EventHandler.remove(_this.element, Browser.touchEndEvent, _this.endEvent);
        EventHandler.remove(_this.element, Browser.touchCancelEvent, _this.cancelEvent);
      };
      _this.bind();
      return _this;
    }
    Touch2.prototype.onPropertyChanged = function(newProp, oldProp) {
    };
    Touch2.prototype.bind = function() {
      this.wireEvents();
      if (Browser.isIE) {
        this.element.classList.add("e-block-touch");
      }
    };
    Touch2.prototype.destroy = function() {
      this.unwireEvents();
      _super.prototype.destroy.call(this);
    };
    Touch2.prototype.wireEvents = function() {
      EventHandler.add(this.element, Browser.touchStartEvent, this.startEvent, this);
    };
    Touch2.prototype.unwireEvents = function() {
      EventHandler.remove(this.element, Browser.touchStartEvent, this.startEvent);
    };
    Touch2.prototype.getModuleName = function() {
      return "touch";
    };
    Touch2.prototype.isScrollable = function(element) {
      var eleStyle = getComputedStyle(element);
      var style = eleStyle.overflow + eleStyle.overflowX + eleStyle.overflowY;
      if (/(auto|scroll)/.test(style)) {
        return true;
      }
      return false;
    };
    Touch2.prototype.tapHoldEvent = function(evt) {
      this.tapCount = 0;
      this.touchAction = true;
      EventHandler.remove(this.element, Browser.touchMoveEvent, this.moveEvent);
      EventHandler.remove(this.element, Browser.touchEndEvent, this.endEvent);
      var eTapArgs = {
        originalEvent: evt
      };
      this.trigger("tapHold", eTapArgs);
      EventHandler.remove(this.element, Browser.touchCancelEvent, this.cancelEvent);
    };
    Touch2.prototype.calcPoints = function(evt) {
      var point = this.updateChangeTouches(evt);
      this.defaultArgs = {
        originalEvent: evt
      };
      this.distanceX = Math.abs(Math.abs(point.clientX) - Math.abs(this.startPoint.clientX));
      this.distanceY = Math.abs(Math.abs(point.clientY) - Math.abs(this.startPoint.clientY));
      if (this.distanceX > this.distanceY) {
        this.movedDirection = point.clientX > this.startPoint.clientX ? "Right" : "Left";
      } else {
        this.movedDirection = point.clientY < this.startPoint.clientY ? "Up" : "Down";
      }
    };
    Touch2.prototype.calcScrollPoints = function(evt) {
      var point = this.updateChangeTouches(evt);
      this.defaultArgs = {
        originalEvent: evt
      };
      this.distanceX = Math.abs(Math.abs(point.clientX) - Math.abs(this.lastMovedPoint.clientX));
      this.distanceY = Math.abs(Math.abs(point.clientY) - Math.abs(this.lastMovedPoint.clientY));
      if ((this.distanceX > this.distanceY || this.hScrollLocked === true) && this.vScrollLocked === false) {
        this.scrollDirection = point.clientX > this.lastMovedPoint.clientX ? "Right" : "Left";
        this.hScrollLocked = true;
      } else {
        this.scrollDirection = point.clientY < this.lastMovedPoint.clientY ? "Up" : "Down";
        this.vScrollLocked = true;
      }
    };
    Touch2.prototype.getVelocity = function(pnt) {
      var newX = pnt.clientX;
      var newY = pnt.clientY;
      var newT = Date.now();
      var xDist = newX - this.startPoint.clientX;
      var yDist = newY - this.startPoint.clientX;
      var interval = newT - this.tStampStart;
      return Math.sqrt(xDist * xDist + yDist * yDist) / interval;
    };
    Touch2.prototype.checkSwipe = function(ele, flag) {
      var keys2 = ["scroll", "offset"];
      var temp = flag ? ["Height", "Top"] : ["Width", "Left"];
      if (ele[keys2[0] + temp[0]] <= ele[keys2[1] + temp[0]]) {
        return true;
      }
      return ele[keys2[0] + temp[1]] === 0 || ele[keys2[1] + temp[0]] + ele[keys2[0] + temp[1]] >= ele[keys2[0] + temp[0]];
    };
    Touch2.prototype.updateChangeTouches = function(evt) {
      var point = evt.changedTouches && evt.changedTouches.length !== 0 ? evt.changedTouches[0] : evt;
      return point;
    };
    __decorate7([Event2()], Touch2.prototype, "tap", void 0);
    __decorate7([Event2()], Touch2.prototype, "tapHold", void 0);
    __decorate7([Event2()], Touch2.prototype, "swipe", void 0);
    __decorate7([Event2()], Touch2.prototype, "scroll", void 0);
    __decorate7([Property(350)], Touch2.prototype, "tapThreshold", void 0);
    __decorate7([Property(750)], Touch2.prototype, "tapHoldThreshold", void 0);
    __decorate7([Complex({}, SwipeSettings)], Touch2.prototype, "swipeSettings", void 0);
    Touch2 = __decorate7([NotifyPropertyChanges], Touch2);
    return Touch2;
  }(Base)
);

// node_modules/@syncfusion/ej2-base/src/template.js
var LINES = new RegExp("\\n|\\r|\\s\\s+", "g");
var QUOTES = new RegExp(/'|"/g);
var IF_STMT = new RegExp("if ?\\(");
var ELSEIF_STMT = new RegExp("else if ?\\(");
var ELSE_STMT = new RegExp("else");
var FOR_STMT = new RegExp("for ?\\(");
var IF_OR_FOR = new RegExp("(/if|/for)");
var CALL_FUNCTION = new RegExp("\\((.*)\\)", "");
var NOT_NUMBER = new RegExp("^[0-9]+$", "g");
var WORD = new RegExp(`[\\w"'.\\s+]+`, "g");
var DBL_QUOTED_STR = new RegExp('"(.*?)"', "g");
var WORDIF = new RegExp(`[\\w"'@#$.\\s-+]+`, "g");
var exp = new RegExp("\\${([^}]*)}", "g");
var ARR_OBJ = /^\..*/gm;
var SINGLE_SLASH = /\\/gi;
var DOUBLE_SLASH = /\\\\/gi;
var WORDFUNC = new RegExp(`[\\w"'@#$.\\s+]+`, "g");
var WINDOWFUNC = /\window\./gm;
function compile(template, helper, ignorePrefix) {
  if (typeof template === "function") {
    return template;
  } else {
    var argName = "data";
    var evalExpResult = evalExp(template, argName, helper, ignorePrefix);
    var condtion = `var valueRegEx = (/value=\\'([A-Za-z0-9 _]*)((.)([\\w)(!-;?-■\\s]+)['])/g);
        var hrefRegex = (/(?:href)([\\s='"./]+)([\\w-./?=&\\\\#"]+)((.)([\\w)(!-;/?-■\\s]+)['])/g);
        if(str.match(valueRegEx)){
            var check = str.match(valueRegEx);
            var str1 = str;
            for (var i=0; i < check.length; i++) {
                var check1 = str.match(valueRegEx)[i].split('value=')[1];
                var change = check1.match(/^'/) !== null ? check1.replace(/^'/, '"') : check1;
                change =change.match(/.$/)[0] === '\\'' ? change.replace(/.$/,'"') : change;
                str1 = str1.replace(check1, change);
            }
            str = str.replace(str, str1);
        }
        else if (str.match(/(?:href='')/) === null) {
            if(str.match(hrefRegex)) {
                var check = str.match(hrefRegex);
                var str1 = str;
                for (var i=0; i < check.length; i++) {
                    var check1 = str.match(hrefRegex)[i].split('href=')[1];
                    if (check1) {
                        var change = check1.match(/^'/) !== null ? check1.replace(/^'/, '"') : check1;
                        change =change.match(/.$/)[0] === '\\'' ? change.replace(/.$/,'"') : change;
                        str1 = str1.replace(check1, change);
                    }
                }
                str = str.replace(str, str1);
            }
        }
        `;
    var fnCode = 'var str="' + evalExpResult + '";' + condtion + " return str;";
    var fn = new Function(argName, fnCode);
    return fn.bind(helper);
  }
}
function evalExp(str, nameSpace, helper, ignorePrefix) {
  var varCOunt = 0;
  var localKeys = [];
  var isClass = str.match(/class="([^"]+|)\s{2}/g);
  var singleSpace = "";
  if (isClass) {
    isClass.forEach(function(value) {
      singleSpace = value.replace(/\s\s+/g, " ");
      str = str.replace(value, singleSpace);
    });
  }
  if (exp.test(str)) {
    var insideBraces = false;
    var outputString = "";
    for (var i = 0; i < str.length; i++) {
      if (str[i + ""] === "$" && str[i + 1] === "{") {
        insideBraces = true;
      } else if (str[i + ""] === "}") {
        insideBraces = false;
      }
      outputString += str[i + ""] === '"' && !insideBraces ? '\\"' : str[i + ""];
    }
    str = outputString;
  } else {
    str = str.replace(/\\?"/g, '\\"');
  }
  return str.replace(LINES, "").replace(DBL_QUOTED_STR, "'$1'").replace(exp, function(match, cnt, offset, matchStr) {
    var SPECIAL_CHAR = /@|#|\$/gm;
    var matches2 = cnt.match(CALL_FUNCTION);
    if (matches2) {
      var rlStr = matches2[1];
      if (ELSEIF_STMT.test(cnt)) {
        cnt = '";} ' + cnt.replace(matches2[1], rlStr.replace(WORD, function(str2) {
          str2 = str2.trim();
          return addNameSpace(str2, !QUOTES.test(str2) && localKeys.indexOf(str2) === -1, nameSpace, localKeys, ignorePrefix);
        })) + '{ \n str = str + "';
      } else if (IF_STMT.test(cnt)) {
        cnt = '"; ' + cnt.replace(matches2[1], rlStr.replace(WORDIF, function(strs) {
          return HandleSpecialCharArrObj(strs, nameSpace, localKeys, ignorePrefix);
        })) + '{ \n str = str + "';
      } else if (FOR_STMT.test(cnt)) {
        var rlStr_1 = matches2[1].split(" of ");
        cnt = '"; ' + cnt.replace(matches2[1], function(mtc) {
          localKeys.push(rlStr_1[0]);
          localKeys.push(rlStr_1[0] + "Index");
          varCOunt = varCOunt + 1;
          return "var i" + varCOunt + "=0; i" + varCOunt + " < " + addNameSpace(rlStr_1[1], true, nameSpace, localKeys, ignorePrefix) + ".length; i" + varCOunt + "++";
        }) + "{ \n " + rlStr_1[0] + "= " + addNameSpace(rlStr_1[1], true, nameSpace, localKeys, ignorePrefix) + "[i" + varCOunt + "]; \n var " + rlStr_1[0] + "Index=i" + varCOunt + '; \n str = str + "';
      } else {
        var fnStr = cnt.split("(");
        var fNameSpace = helper && Object.prototype.hasOwnProperty.call(helper, fnStr[0]) ? "this." : "global";
        fNameSpace = /\./.test(fnStr[0]) ? "" : fNameSpace;
        var ftArray = matches2[1].split(",");
        if (matches2[1].length !== 0 && !/data/.test(ftArray[0]) && !/window./.test(ftArray[0])) {
          matches2[1] = fNameSpace === "global" ? nameSpace + "." + matches2[1] : matches2[1];
        }
        var splRegexp = /@|\$|#/gm;
        var arrObj = /\]\./gm;
        if (WINDOWFUNC.test(cnt) && arrObj.test(cnt) || splRegexp.test(cnt)) {
          var splArrRegexp = /@|\$|#|\]\./gm;
          if (splArrRegexp.test(cnt)) {
            cnt = '"+ ' + (fNameSpace === "global" ? "" : fNameSpace) + cnt.replace(matches2[1], rlStr.replace(WORDFUNC, function(strs) {
              return HandleSpecialCharArrObj(strs, nameSpace, localKeys, ignorePrefix);
            })) + '+ "';
          }
        } else {
          cnt = '" + ' + (fNameSpace === "global" ? "" : fNameSpace) + cnt.replace(rlStr, addNameSpace(matches2[1].replace(/,( |)data.|,/gi, "," + nameSpace + ".").replace(/,( |)data.window/gi, ",window"), fNameSpace === "global" ? false : true, nameSpace, localKeys, ignorePrefix)) + '+"';
        }
      }
    } else if (ELSE_STMT.test(cnt)) {
      cnt = '"; ' + cnt.replace(ELSE_STMT, '} else { \n str = str + "');
    } else if (cnt.match(IF_OR_FOR)) {
      cnt = cnt.replace(IF_OR_FOR, '"; \n } \n str = str + "');
    } else if (SPECIAL_CHAR.test(cnt)) {
      if (cnt.match(SINGLE_SLASH)) {
        cnt = SlashReplace(cnt);
      }
      cnt = '"+' + NameSpaceForspecialChar(cnt, localKeys.indexOf(cnt) === -1, nameSpace, localKeys) + '"]+"';
    } else {
      if (cnt.match(SINGLE_SLASH)) {
        cnt = SlashReplace(cnt);
        cnt = '"+' + NameSpaceForspecialChar(cnt, localKeys.indexOf(cnt) === -1, nameSpace, localKeys) + '"]+"';
      } else {
        cnt = cnt !== "" ? '"+' + addNameSpace(cnt.replace(/,/gi, "+" + nameSpace + "."), localKeys.indexOf(cnt) === -1, nameSpace, localKeys, ignorePrefix) + '+"' : "${}";
      }
    }
    return cnt;
  });
}
function addNameSpace(str, addNS, nameSpace, ignoreList, ignorePrefix) {
  return addNS && !NOT_NUMBER.test(str) && ignoreList.indexOf(str.split(".")[0]) === -1 && !ignorePrefix && str !== "true" && str !== "false" ? nameSpace + "." + str : str;
}
function NameSpaceArrObj(str, addNS, nameSpace, ignoreList) {
  var arrObjReg = /^\..*/gm;
  return addNS && !NOT_NUMBER.test(str) && ignoreList.indexOf(str.split(".")[0]) === -1 && !arrObjReg.test(str) ? nameSpace + "." + str : str;
}
function NameSpaceForspecialChar(str, addNS, nameSpace, ignoreList) {
  return addNS && !NOT_NUMBER.test(str) && ignoreList.indexOf(str.split(".")[0]) === -1 ? nameSpace + '["' + str : str;
}
function SlashReplace(tempStr) {
  var double = "\\\\";
  if (tempStr.match(DOUBLE_SLASH)) {
    return tempStr;
  } else {
    return tempStr.replace(SINGLE_SLASH, double);
  }
}
function HandleSpecialCharArrObj(str, nameSpaceNew, keys2, ignorePrefix) {
  str = str.trim();
  var windowFunc = /\window\./gm;
  if (!windowFunc.test(str)) {
    var quotes = /'|"/gm;
    var splRegexp = /@|\$|#/gm;
    if (splRegexp.test(str)) {
      str = NameSpaceForspecialChar(str, keys2.indexOf(str) === -1, nameSpaceNew, keys2) + '"]';
    }
    if (ARR_OBJ.test(str)) {
      return NameSpaceArrObj(str, !quotes.test(str) && keys2.indexOf(str) === -1, nameSpaceNew, keys2);
    } else {
      return addNameSpace(str, !quotes.test(str) && keys2.indexOf(str) === -1, nameSpaceNew, keys2, ignorePrefix);
    }
  } else {
    return str;
  }
}

// node_modules/@syncfusion/ej2-base/src/template-engine.js
function setTemplateEngine(classObj) {
  engineObj.compile = classObj.compile;
}
function getTemplateEngine() {
  return engineObj.compile;
}
var Engine = (
  /** @class */
  function() {
    function Engine2() {
    }
    Engine2.prototype.compile = function(templateString, helper, ignorePrefix) {
      if (helper === void 0) {
        helper = {};
      }
      return compile(templateString, helper);
    };
    return Engine2;
  }()
);
var engineObj = {
  compile: new Engine().compile
};

// node_modules/@syncfusion/ej2-base/src/sanitize-helper.js
var removeTags = ["script", "style", "iframe[src]", 'link[href*="javascript:"]', 'object[type="text/x-scriptlet"]', 'object[data^="data:text/html;base64"]', 'img[src^="data:text/html;base64"]', '[src^="javascript:"]', '[dynsrc^="javascript:"]', '[lowsrc^="javascript:"]', '[type^="application/x-shockwave-flash"]'];
var removeAttrs = [{
  attribute: "href",
  selector: '[href*="javascript:"]'
}, {
  attribute: "href",
  selector: "a[href]"
}, {
  attribute: "background",
  selector: '[background^="javascript:"]'
}, {
  attribute: "style",
  selector: '[style*="javascript:"]'
}, {
  attribute: "style",
  selector: '[style*="expression("]'
}, {
  attribute: "href",
  selector: 'a[href^="data:text/html;base64"]'
}];
var jsEvents = ["onchange", "onclick", "onmouseover", "onmouseout", "onkeydown", "onload", "onerror", "onblur", "onfocus", "onbeforeload", "onbeforeunload", "onkeyup", "onsubmit", "onafterprint", "onbeforeonload", "onbeforeprint", "oncanplay", "oncanplaythrough", "oncontextmenu", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended", "onformchange", "onforminput", "onhaschange", "oninput", "oninvalid", "onkeypress", "onloadeddata", "onloadedmetadata", "onloadstart", "onmessage", "onmousedown", "onmousemove", "onmouseup", "onmousewheel", "onoffline", "onoine", "ononline", "onpagehide", "onpageshow", "onpause", "onplay", "onplaying", "onpopstate", "onprogress", "onratechange", "onreadystatechange", "onredo", "onresize", "onscroll", "onseeked", "onseeking", "onselect", "onstalled", "onstorage", "onsuspend", "ontimeupdate", "onundo", "onunload", "onvolumechange", "onwaiting", "onmouseenter", "onmouseleave", "onstart", "onpropertychange", "oncopy", "ontoggle", "onpointerout", "onpointermove", "onpointerleave", "onpointerenter", "onpointerrawupdate", "onpointerover", "onbeforecopy", "onbeforecut", "onbeforeinput"];
var SanitizeHtmlHelper = (
  /** @class */
  function() {
    function SanitizeHtmlHelper2() {
    }
    SanitizeHtmlHelper2.beforeSanitize = function() {
      return {
        selectors: {
          tags: removeTags,
          attributes: removeAttrs
        }
      };
    };
    SanitizeHtmlHelper2.sanitize = function(value) {
      if (isNullOrUndefined(value)) {
        return value;
      }
      var item = this.beforeSanitize();
      var output = this.serializeValue(item, value);
      return output;
    };
    SanitizeHtmlHelper2.serializeValue = function(item, value) {
      this.removeAttrs = item.selectors.attributes;
      this.removeTags = item.selectors.tags;
      this.wrapElement = document.createElement("div");
      this.wrapElement.innerHTML = value;
      this.removeXssTags();
      this.removeJsEvents();
      this.removeXssAttrs();
      var tempEleValue = this.wrapElement.innerHTML;
      this.removeElement();
      this.wrapElement = null;
      return tempEleValue.replace(/&amp;/g, "&");
    };
    SanitizeHtmlHelper2.removeElement = function() {
      var nodes = this.wrapElement.children;
      for (var j = 0; j < nodes.length; j++) {
        var attribute = nodes[parseInt(j.toString(), 10)].attributes;
        for (var i = 0; i < attribute.length; i++) {
          this.wrapElement.children[parseInt(j.toString(), 10)].removeAttribute(attribute[parseInt(i.toString(), 10)].localName);
        }
      }
    };
    SanitizeHtmlHelper2.removeXssTags = function() {
      var elements = this.wrapElement.querySelectorAll(this.removeTags.join(","));
      if (elements.length > 0) {
        elements.forEach(function(element) {
          detach(element);
        });
      } else {
        return;
      }
    };
    SanitizeHtmlHelper2.removeJsEvents = function() {
      var elements = this.wrapElement.querySelectorAll("[" + jsEvents.join("],[") + "]");
      if (elements.length > 0) {
        elements.forEach(function(element) {
          jsEvents.forEach(function(attr) {
            if (element.hasAttribute(attr)) {
              element.removeAttribute(attr);
            }
          });
        });
      } else {
        return;
      }
    };
    SanitizeHtmlHelper2.removeXssAttrs = function() {
      var _this = this;
      this.removeAttrs.forEach(function(item, index) {
        var elements = _this.wrapElement.querySelectorAll(item.selector);
        if (elements.length > 0) {
          if (item.selector === "a[href]") {
            elements.forEach(function(element) {
              if (element.getAttribute(item.attribute).replace(/\t|\s|&/, "").indexOf("javascript:alert") !== -1) {
                element.removeAttribute(item.attribute);
              }
            });
          } else {
            elements.forEach(function(element) {
              element.removeAttribute(item.attribute);
            });
          }
        }
      });
    };
    return SanitizeHtmlHelper2;
  }()
);

// node_modules/@syncfusion/ej2-angular-base/src/util.js
function applyMixins(derivedClass, baseClass) {
  baseClass.forEach(function(baseClass2) {
    Object.getOwnPropertyNames(baseClass2.prototype).forEach(function(name) {
      if (!Object.prototype.hasOwnProperty.call(derivedClass.prototype, name) || baseClass2.isFormBase && name !== "constructor") {
        derivedClass.prototype["".concat(name)] = baseClass2.prototype["".concat(name)];
      }
    });
  });
}
function ComponentMixins(baseClass) {
  return function(derivedClass) {
    applyMixins(derivedClass, baseClass);
  };
}
function registerEvents(eventList, obj, direct) {
  var ngEventsEmitter = {};
  if (eventList && eventList.length) {
    for (var _i = 0, eventList_1 = eventList; _i < eventList_1.length; _i++) {
      var event_1 = eventList_1[_i];
      if (direct === true) {
        obj.propCollection["".concat(event_1)] = new EventEmitter(false);
        obj["".concat(event_1)] = obj.propCollection["".concat(event_1)];
      } else {
        ngEventsEmitter["".concat(event_1)] = new EventEmitter(false);
      }
    }
    if (direct !== true) {
      obj.setProperties(ngEventsEmitter, true);
    }
  }
}
function clearTemplate(_this, templateNames, index) {
  var regTemplates = Object.keys(_this.registeredTemplate);
  if (regTemplates.length) {
    var regProperties = templateNames && templateNames.filter(function(val) {
      return /\./g.test(val) ? false : true;
    });
    var tabaccordionTemp = /tab|accordion|toolbar/.test(_this.getModuleName());
    for (var _i = 0, _a = regProperties && regProperties || regTemplates; _i < _a.length; _i++) {
      var registeredTemplate = _a[_i];
      if (index && index.length) {
        for (var e = 0; e < index.length; e++) {
          if (tabaccordionTemp) {
            for (var m = 0; m < _this.registeredTemplate["".concat(registeredTemplate)].length; m++) {
              var value = _this.registeredTemplate["".concat(registeredTemplate)][parseInt(m.toString(), 10)];
              if (value && value === index["".concat(e)]) {
                value.destroy();
                _this.registeredTemplate["".concat(registeredTemplate)].splice(m, 1);
              }
            }
          } else {
            for (var m = 0; m < _this.registeredTemplate.template.length; m++) {
              var value = _this.registeredTemplate.template[parseInt(m.toString(), 10)].rootNodes[0];
              if (value === index["".concat(e)]) {
                var rt = _this.registeredTemplate["".concat(registeredTemplate)];
                rt[parseInt(m.toString(), 10)].destroy();
              }
            }
          }
        }
      } else {
        if (_this.registeredTemplate["".concat(registeredTemplate)]) {
          for (var _b = 0, _c = _this.registeredTemplate["".concat(registeredTemplate)]; _b < _c.length; _b++) {
            var rt = _c[_b];
            if (!rt.destroyed) {
              if (rt._view) {
                var pNode = rt._view.renderer.parentNode(rt.rootNodes[0]);
                if (!isNullOrUndefined(pNode)) {
                  for (var m = 0; m < rt.rootNodes.length; m++) {
                    pNode.appendChild(rt.rootNodes[parseInt(m.toString(), 10)]);
                  }
                }
              }
              rt.destroy();
            }
          }
        }
      }
      if (!tabaccordionTemp || !index) {
        delete _this.registeredTemplate["".concat(registeredTemplate)];
      }
    }
  }
  var _loop_1 = function(tagObject2) {
    if (tagObject2.instance) {
      tagObject2.instance.clearTemplate(templateNames && templateNames.filter(function(val) {
        var regExp3 = RegExp;
        return new regExp3(tagObject2.name).test(val) ? true : false;
      }));
    }
  };
  for (var _d = 0, _e = _this.tagObjects; _d < _e.length; _d++) {
    var tagObject = _e[_d];
    _loop_1(tagObject);
  }
}
function setValue2(nameSpace, value, object) {
  var keys2 = nameSpace.replace(/\[/g, ".").replace(/\]/g, "").split(".");
  var fromObj = object || {};
  for (var i = 0; i < keys2.length; i++) {
    var key = keys2[parseInt(i.toString(), 10)];
    if (i + 1 === keys2.length) {
      fromObj["".concat(key)] = value === void 0 ? {} : value;
    } else if (fromObj["".concat(key)] === void 0) {
      fromObj["".concat(key)] = {};
    }
    fromObj = fromObj["".concat(key)];
  }
  return fromObj;
}

// node_modules/@syncfusion/ej2-angular-base/src/complex-array-base.js
var refRegex = /Ref$/;
var ComplexBase = (
  /** @class */
  function() {
    function ComplexBase2() {
      this.hasChanges = false;
      this.propCollection = {};
      this.dataSource = {};
      this.tags = [];
      this.tagObjects = [];
    }
    ComplexBase2.prototype.ngOnInit = function() {
      this.registeredTemplate = {};
      for (var _i = 0, _a = this.tags; _i < _a.length; _i++) {
        var tag = _a[_i];
        var objInstance = getValue("child" + tag.substring(0, 1).toUpperCase() + tag.substring(1), this);
        if (objInstance) {
          this.tagObjects.push({
            instance: objInstance,
            name: tag
          });
        }
      }
      var templateProperties = Object.keys(this);
      for (var i = 0; i < templateProperties.length; i++) {
        var tempProp = getValue(templateProperties[parseInt(i.toString(), 10)], this);
        if (typeof tempProp === "object" && tempProp && tempProp.elementRef) {
          if (!getValue(templateProperties[parseInt(i.toString(), 10)].indexOf("Ref") !== -1 ? templateProperties[parseInt(i.toString(), 10)] : templateProperties[parseInt(i.toString(), 10)] + "Ref", this)) {
            setValue(templateProperties[parseInt(i.toString(), 10)].indexOf("Ref") !== -1 ? templateProperties[parseInt(i.toString(), 10)] : templateProperties[parseInt(i.toString(), 10)] + "Ref", tempProp, this);
          }
          if (getValue("viewContainerRef", this) && !getValue("_viewContainerRef", tempProp.elementRef.nativeElement) && !getValue("propName", tempProp.elementRef.nativeElement)) {
            setValue("_viewContainerRef", getValue("viewContainerRef", this), tempProp.elementRef.nativeElement);
            setValue("propName", templateProperties[parseInt(i.toString(), 10)].replace("Ref", ""), tempProp.elementRef.nativeElement);
          }
        }
      }
      templateProperties = Object.keys(this);
      templateProperties = templateProperties.filter(function(val) {
        return /Ref$/i.test(val);
      });
      for (var _b = 0, templateProperties_1 = templateProperties; _b < templateProperties_1.length; _b++) {
        var tempName = templateProperties_1[_b];
        var propName = tempName.replace("Ref", "");
        setValue(propName.replace("_", "."), getValue(propName, this), this.propCollection);
      }
      var propList = Object.keys(this);
      if (this.directivePropList) {
        for (var k = 0; k < this.directivePropList.length; k++) {
          var dirPropName = this.directivePropList[parseInt(k.toString(), 10)];
          if (propList.indexOf(dirPropName) !== -1 && (getValue(dirPropName, this) === false || getValue(dirPropName, this))) {
            setValue(dirPropName, getValue(dirPropName, this), this.propCollection);
          }
        }
        this.hasChanges = true;
      }
      this.isInitChanges = true;
    };
    ComplexBase2.prototype.registerEvents = function(eventList) {
      registerEvents(eventList, this, true);
    };
    ComplexBase2.prototype.ngOnChanges = function(changes) {
      for (var _i = 0, _a = Object.keys(changes); _i < _a.length; _i++) {
        var propName = _a[_i];
        var changedVal = changes["".concat(propName)];
        this.propCollection["".concat(propName)] = changedVal.currentValue;
      }
      this.isUpdated = false;
      this.hasChanges = true;
    };
    ComplexBase2.prototype.clearTemplate = function(templateNames) {
      clearTemplate(this, templateNames);
    };
    ComplexBase2.prototype.getProperties = function() {
      for (var _i = 0, _a = this.tagObjects; _i < _a.length; _i++) {
        var tagObject = _a[_i];
        this.propCollection[tagObject.name] = tagObject.instance.getProperties();
      }
      return this.propCollection;
    };
    ComplexBase2.prototype.isChanged = function() {
      var result = this.hasChanges;
      if (!isNullOrUndefined(this.propCollection[this.property])) {
        var tempProps = this.propCollection[this.property];
        var props = Object.keys(tempProps[0]);
        for (var d = 0; d < props.length; d++) {
          if (!isNullOrUndefined(this.propCollection[props[parseInt(d.toString(), 10)]])) {
            var val = getValue(props[parseInt(d.toString(), 10)], this);
            var propVal = this.propCollection[this.property][0][props[parseInt(d.toString(), 10)]];
            if (!isNullOrUndefined(val) && this.propCollection[props[parseInt(d.toString(), 10)]] !== val && propVal !== val) {
              setValue(props[parseInt(d.toString(), 10)], val, this.propCollection[this.property][0]);
              setValue(props[parseInt(d.toString(), 10)], val, this.propCollection);
              this.hasChanges = true;
              this.isUpdated = false;
            }
          }
        }
      }
      for (var _i = 0, _a = this.tagObjects; _i < _a.length; _i++) {
        var item = _a[_i];
        result = result || item.instance.hasChanges;
      }
      return result || this.hasChanges;
    };
    ComplexBase2.prototype.ngAfterContentChecked = function() {
      this.hasChanges = this.isChanged();
      if (this.isInitChanges || this.hasChanges) {
        var templateProperties = Object.keys(this);
        templateProperties = templateProperties.filter(function(val) {
          return refRegex.test(val);
        });
        for (var _i = 0, templateProperties_2 = templateProperties; _i < templateProperties_2.length; _i++) {
          var tempName = templateProperties_2[_i];
          var propName = tempName.replace("Ref", "");
          setValue(propName.replace("_", "."), getValue(propName, this), this.propCollection);
        }
      }
    };
    ComplexBase2.prototype.ngAfterViewChecked = function() {
      if (this.isUpdated) {
        this.hasChanges = false;
      }
    };
    ComplexBase2.prototype.ngAfterViewInit = function() {
      this.isInitChanges = false;
    };
    ComplexBase2.prototype.ngOnDestroy = function() {
      this.directivePropList = [];
    };
    return ComplexBase2;
  }()
);
var ArrayBase = (
  /** @class */
  function() {
    function ArrayBase2(propertyName) {
      this.list = [];
      this.hasChanges = false;
      this.propertyName = propertyName;
    }
    ArrayBase2.prototype.ngOnInit = function() {
      this.isInitChanges = true;
    };
    ArrayBase2.prototype.ngAfterContentInit = function() {
      var _this = this;
      var index = 0;
      this.list = this.children.map(function(child) {
        child.dirIndex = index++;
        child.property = _this.propertyName;
        return child;
      });
      this.hasChanges = true;
    };
    ArrayBase2.prototype.getProperties = function() {
      var onlyProp = [];
      for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
        var item = _a[_i];
        onlyProp.push(item.getProperties());
      }
      return onlyProp;
    };
    ArrayBase2.prototype.isChanged = function() {
      var _this = this;
      var result = false;
      var index = 0;
      var isSourceChanged = false;
      var childrenDataSource = this.children.map(function(child) {
        return child;
      });
      if (this.list.length === this.children.length) {
        for (var i = 0; i < this.list.length; i++) {
          if (this.list[parseInt(i.toString(), 10)].propCollection.dataSource) {
            if (this.list[parseInt(i.toString(), 10)].dataSource && this.list[parseInt(i.toString(), 10)].propCollection.dataSource !== this.list[parseInt(i.toString(), 10)].dataSource) {
              this.list[parseInt(i.toString(), 10)].propCollection.dataSource = this.list[parseInt(i.toString(), 10)].dataSource;
              this.list[parseInt(i.toString(), 10)].hasChanges = true;
            }
            if (this.list[parseInt(i.toString(), 10)].property !== "series") {
              isSourceChanged = JSON.stringify(this.list[parseInt(i.toString(), 10)].propCollection.dataSource) !== JSON.stringify(childrenDataSource[parseInt(i.toString(), 10)].propCollection.dataSource);
            }
          }
          isSourceChanged = this.list[parseInt(i.toString(), 10)].hasChanges !== childrenDataSource[parseInt(i.toString(), 10)].hasChanges;
        }
      }
      this.hasNewChildren = this.list.length !== this.children.length || isSourceChanged ? true : null;
      if (this.hasNewChildren) {
        this.list = this.children.map(function(child) {
          child.dirIndex = index++;
          child.property = _this.propertyName;
          return child;
        });
      }
      for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
        var item = _a[_i];
        result = result || item.hasChanges;
      }
      return !!this.list.length && result;
    };
    ArrayBase2.prototype.clearTemplate = function(templateNames) {
      var _this = this;
      for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
        var item = _a[_i];
        item.clearTemplate(templateNames && templateNames.map(function(val) {
          var regExp3 = RegExp;
          return new regExp3(_this.propertyName).test(val) ? val.replace(_this.propertyName + ".", "") : val;
        }));
      }
    };
    ArrayBase2.prototype.ngAfterContentChecked = function() {
      this.hasChanges = this.isChanged();
      for (var i = 0; i < this.list.length; i++) {
        if (getValue("childColumns", this.list[parseInt(i.toString(), 10)]) && getValue("property", this.list[parseInt(i.toString(), 10)]) === "columns") {
          setValue("columns", getValue("childColumns", this.list[parseInt(i.toString(), 10)]).getProperties(), this.list[parseInt(i.toString(), 10)].propCollection);
        }
        this.list[parseInt(i.toString(), 10)].isUpdated = true;
      }
    };
    ArrayBase2.prototype.ngAfterViewInit = function() {
      this.isInitChanges = false;
    };
    ArrayBase2.prototype.ngOnDestroy = function() {
      this.list = [];
    };
    return ArrayBase2;
  }()
);

// node_modules/@syncfusion/ej2-angular-base/src/component-base.js
var ComponentBase = (
  /** @class */
  function() {
    function ComponentBase2() {
      this.isProtectedOnChange = true;
      this.isFormInit = true;
    }
    ComponentBase2.prototype.saveChanges = function(key, newValue, oldValue) {
      if (this.isProtectedOnChange) {
        return;
      }
      this.oldProperties["".concat(key)] = oldValue;
      this.changedProperties["".concat(key)] = newValue;
      this.finalUpdate();
      var changeTime = setTimeout(this.dataBind.bind(this));
      var clearUpdate = function() {
        clearTimeout(changeTime);
      };
      this.finalUpdate = clearUpdate;
    };
    ComponentBase2.prototype.ngOnInit = function(isTempRef) {
      var tempOnThis = isTempRef || this;
      tempOnThis.registeredTemplate = {};
      tempOnThis.ngBoundedEvents = {};
      tempOnThis.isAngular = true;
      tempOnThis.isFormInit = true;
      if (isTempRef) {
        this.tags = isTempRef.tags;
      }
      tempOnThis.tags = this.tags || [];
      tempOnThis.complexTemplate = this.complexTemplate || [];
      tempOnThis.tagObjects = [];
      tempOnThis.ngAttr = this.getAngularAttr(tempOnThis.element);
      tempOnThis.createElement = function(tagName, prop) {
        var ele = tempOnThis.srenderer ? tempOnThis.srenderer.createElement(tagName) : createElement(tagName);
        if (typeof prop === "undefined") {
          return ele;
        }
        ele.innerHTML = prop.innerHTML ? prop.innerHTML : "";
        if (prop.className !== void 0) {
          ele.className = prop.className;
        }
        if (prop.id !== void 0) {
          ele.id = prop.id;
        }
        if (prop.styles !== void 0) {
          ele.setAttribute("style", prop.styles);
        }
        if (tempOnThis.ngAttr !== void 0) {
          ele.setAttribute(tempOnThis.ngAttr, "");
        }
        if (prop.attrs !== void 0) {
          attributes(ele, prop.attrs);
        }
        return ele;
      };
      for (var _i = 0, _a = tempOnThis.tags; _i < _a.length; _i++) {
        var tag = _a[_i];
        var tagObject = {
          instance: getValue("child" + tag.substring(0, 1).toUpperCase() + tag.substring(1), tempOnThis),
          name: tag
        };
        tempOnThis.tagObjects.push(tagObject);
      }
      var complexTemplates = Object.keys(tempOnThis);
      for (var i = 0; i < complexTemplates.length; i++) {
        var compProp = getValue(complexTemplates[parseInt(i.toString(), 10)], tempOnThis);
        if (typeof compProp === "object" && compProp && compProp.elementRef) {
          if (typeof compProp === "object" && compProp && compProp.elementRef && complexTemplates[parseInt(i.toString(), 10)].indexOf("_") !== -1 && complexTemplates[parseInt(i.toString(), 10)].indexOf("Ref") === -1) {
            setValue(complexTemplates[parseInt(i.toString(), 10)] + "Ref", compProp, tempOnThis);
          }
          if (tempOnThis.viewContainerRef && !getValue("_viewContainerRef", compProp.elementRef.nativeElement) && !getValue("propName", compProp.elementRef.nativeElement)) {
            setValue("_viewContainerRef", tempOnThis.viewContainerRef, compProp.elementRef.nativeElement);
            setValue("propName", complexTemplates[parseInt(i.toString(), 10)].replace("Ref", ""), compProp.elementRef.nativeElement);
          }
        }
      }
      complexTemplates = Object.keys(tempOnThis);
      complexTemplates = complexTemplates.filter(function(val2) {
        return /Ref$/i.test(val2) && /_/i.test(val2);
      });
      for (var _b = 0, complexTemplates_1 = complexTemplates; _b < complexTemplates_1.length; _b++) {
        var tempName = complexTemplates_1[_b];
        var propName = tempName.replace("Ref", "");
        var val = {};
        setValue(propName.replace("_", "."), getValue(propName, tempOnThis), val);
        tempOnThis.setProperties(val, true);
      }
    };
    ComponentBase2.prototype.getAngularAttr = function(ele) {
      var attributes2 = ele.attributes;
      var length = attributes2.length;
      var ngAr;
      for (var i = 0; i < length; i++) {
        if (/_ngcontent/g.test(attributes2[parseInt(i.toString(), 10)].name)) {
          ngAr = attributes2[parseInt(i.toString(), 10)].name;
        }
      }
      return ngAr;
    };
    ComponentBase2.prototype.ngAfterViewInit = function(isTempRef) {
      var tempAfterViewThis = isTempRef || this;
      var regExp3 = /ejs-tab|ejs-accordion/g;
      if (regExp3.test(tempAfterViewThis.ngEle.nativeElement.outerHTML)) {
        tempAfterViewThis.ngEle.nativeElement.style.visibility = "hidden";
      }
      var templateProperties = Object.keys(tempAfterViewThis);
      templateProperties = templateProperties.filter(function(val) {
        return /Ref$/i.test(val);
      });
      var ngtempRef = tempAfterViewThis.getModuleName() === "DocumentEditor";
      for (var _i = 0, templateProperties_1 = templateProperties; _i < templateProperties_1.length; _i++) {
        var tempName = templateProperties_1[_i];
        var propName = tempName.replace("Ref", "");
        setValue(propName.replace("_", "."), getValue(propName + "Ref", tempAfterViewThis), tempAfterViewThis);
      }
      var appendToComponent = function(tempAfterViewThis2) {
        if (typeof window !== "undefined" && tempAfterViewThis2.element || tempAfterViewThis2.getModuleName().includes("btn")) {
          tempAfterViewThis2.appendTo(tempAfterViewThis2.element);
          tempAfterViewThis2.ngEle.nativeElement.style.visibility = "";
        }
      };
      if (!ngtempRef) {
        setTimeout(function() {
          appendToComponent(tempAfterViewThis);
        });
      } else {
        appendToComponent(tempAfterViewThis);
      }
    };
    ComponentBase2.prototype.ngOnDestroy = function(isTempRef) {
      var tempOnDestroyThis = isTempRef || this;
      setTimeout(function() {
        if (typeof window !== "undefined" && tempOnDestroyThis.element.classList.contains("e-control")) {
          if (tempOnDestroyThis.ngOnFocus !== void 0 && tempOnDestroyThis.ngOnBlur !== void 0) {
            var ele = tempOnDestroyThis.inputElement || tempOnDestroyThis.element;
            ele.removeEventListener("focus", tempOnDestroyThis.ngOnFocusBound);
            ele.removeEventListener("blur", tempOnDestroyThis.ngOnBlurBound);
            tempOnDestroyThis.ngOnFocusBound = null;
            tempOnDestroyThis.ngOnBlurBound = null;
          }
          tempOnDestroyThis.destroy();
          tempOnDestroyThis.clearTemplate(null);
          setTimeout(function() {
            for (var _i = 0, _a = Object.keys(tempOnDestroyThis); _i < _a.length; _i++) {
              var key = _a[_i];
              var value = tempOnDestroyThis["".concat(key)];
              if (value && /object/.test(typeof value) && Object.keys(value).length !== 0) {
                if (/properties|changedProperties|childChangedProperties|oldProperties|moduleLoader/.test(key)) {
                  for (var _b = 0, _c = Object.keys(tempOnDestroyThis["".concat(key)]); _b < _c.length; _b++) {
                    var propKey = _c[_b];
                    var propValue = value["".concat(propKey)];
                    if (propValue && /object/.test(typeof propValue) && Object.keys(propValue).length !== 0 && (propValue.parent || propValue.parentObj)) {
                      tempOnDestroyThis["".concat(key)]["".concat(propKey)] = null;
                    }
                  }
                } else {
                  if (value.parent || value.parentObj) {
                    tempOnDestroyThis["".concat(key)] = null;
                  }
                }
              }
            }
          });
        }
      });
    };
    ComponentBase2.prototype.clearTemplate = function(templateNames, index) {
      clearTemplate(this, templateNames, index);
    };
    ComponentBase2.prototype.ngAfterContentChecked = function(isTempRef) {
      var tempAfterContentThis = isTempRef || this;
      for (var _i = 0, _a = tempAfterContentThis.tagObjects; _i < _a.length; _i++) {
        var tagObject = _a[_i];
        if (!isUndefined(tagObject.instance) && (tagObject.instance.isInitChanges || tagObject.instance.hasChanges || tagObject.instance.hasNewChildren)) {
          var propObj = {};
          if (tagObject.instance.isInitChanges) {
            var complexDirProps = void 0;
            var list = getValue("instance.list", tagObject);
            if (list && list.length) {
              complexDirProps = list[0].directivePropList;
            }
            var skip = true;
            if (tempAfterContentThis.getModuleName && tempAfterContentThis.getModuleName() === "gantt") {
              skip = false;
            }
            if (complexDirProps && skip && complexDirProps.indexOf(tagObject.instance.propertyName) === -1) {
              var compDirPropList = Object.keys(tagObject.instance.list[0].propCollection);
              for (var h = 0; h < tagObject.instance.list.length; h++) {
                tagObject.instance.list["".concat(h)].propCollection[tagObject.instance.propertyName] = [];
                var obj = {};
                for (var k = 0; k < compDirPropList.length; k++) {
                  var complexPropName = compDirPropList[parseInt(k.toString(), 10)];
                  obj["".concat(complexPropName)] = tagObject.instance.list["".concat(h)].propCollection["".concat(complexPropName)];
                }
                var _loop_1 = function(i2) {
                  var tag = tagObject.instance.list["".concat(h)].tags[parseInt(i2.toString(), 10)];
                  var childObj = getValue("child" + tag.substring(0, 1).toUpperCase() + tag.substring(1), tagObject.instance.list["".concat(h)]);
                  if (childObj) {
                    var innerchildObj = tagObject.instance.list["".concat(h)]["child" + tag.substring(0, 1).toUpperCase() + tag.substring(1)];
                    var updateChildTag_1 = function(innerchild) {
                      var innerLevelTag = [];
                      if (innerchild) {
                        for (var j = 0; j < innerchild.list.length; j++) {
                          var innerTag = innerchild.list[0].tags[0];
                          if (innerTag) {
                            var innerchildTag = getValue("child" + innerTag.substring(0, 1).toUpperCase() + innerTag.substring(1), innerchild.list[parseInt(j.toString(), 10)]);
                            if (innerchildTag) {
                              innerchild.list[parseInt(j.toString(), 10)].tagObjects.push({
                                instance: innerchildTag,
                                name: innerTag
                              });
                              innerLevelTag.push(innerchildTag);
                            }
                          }
                        }
                      }
                      if (innerLevelTag.length !== 0) {
                        for (var l = 0; l < innerLevelTag.length; l++) {
                          updateChildTag_1(innerLevelTag[parseInt(l.toString(), 10)]);
                        }
                      }
                    };
                    updateChildTag_1(innerchildObj);
                    tagObject.instance.list["".concat(h)].tagObjects.push({
                      instance: childObj,
                      name: tag
                    });
                  }
                };
                for (var i = 0; i < tagObject.instance.list["".concat(h)].tags.length; i++) {
                  _loop_1(i);
                }
                tagObject.instance.list["".concat(h)].propCollection[tagObject.instance.propertyName].push(obj);
              }
            }
            propObj[tagObject.name] = tagObject.instance.getProperties();
            tempAfterContentThis.setProperties(propObj, tagObject.instance.isInitChanges);
          } else {
            var hasDiffLength = false;
            if (tempAfterContentThis[tagObject.name].length !== tagObject.instance.list.length || /diagram|DashboardLayout/.test(tempAfterContentThis.getModuleName())) {
              tempAfterContentThis[tagObject.name] = tagObject.instance.list;
              hasDiffLength = true;
            }
            for (var _b = 0, _c = tagObject.instance.list; _b < _c.length; _b++) {
              var list = _c[_b];
              var curIndex = tagObject.instance.list.indexOf(list);
              var curChild = getValue(tagObject.name, tempAfterContentThis)["".concat(curIndex)];
              var complexTemplates = Object.keys(curChild);
              complexTemplates = complexTemplates.filter(function(val) {
                return /Ref$/i.test(val);
              });
              if (curChild.properties && Object.keys(curChild.properties).length !== 0) {
                for (var _d = 0, complexTemplates_2 = complexTemplates; _d < complexTemplates_2.length; _d++) {
                  var complexPropName = complexTemplates_2[_d];
                  complexPropName = complexPropName.replace(/Ref/, "");
                  curChild.properties["".concat(complexPropName)] = !curChild.properties["".concat(complexPropName)] ? curChild.propCollection["".concat(complexPropName)] : curChild.properties["".concat(complexPropName)];
                }
              }
              if (!isUndefined(curChild) && !isUndefined(curChild.setProperties)) {
                if (/diagram|DashboardLayout/.test(tempAfterContentThis.getModuleName())) {
                  curChild.setProperties(list.getProperties(), true);
                } else {
                  curChild.setProperties(list.getProperties());
                }
              }
              list.isUpdated = true;
            }
            if (/grid/.test(tempAfterContentThis.getModuleName()) && hasDiffLength || /chart/.test(tempAfterContentThis.getModuleName())) {
              propObj[tagObject.name] = tagObject.instance.getProperties();
              tempAfterContentThis.setProperties(propObj, tagObject.instance.isInitChanges);
            }
          }
        }
      }
    };
    ComponentBase2.prototype.registerEvents = function(eventList) {
      registerEvents(eventList, this);
    };
    ComponentBase2.prototype.twoWaySetter = function(newVal, prop) {
      var oldVal = getValue(prop, this.properties);
      if (oldVal === newVal) {
        return;
      }
      this.saveChanges(prop, newVal, oldVal);
      setValue(prop, isNullOrUndefined(newVal) ? null : newVal, this.properties);
      getValue(prop + "Change", this).emit(newVal);
    };
    ComponentBase2.prototype.addTwoWay = function(propList) {
      var _this = this;
      var _loop_2 = function(prop2) {
        getValue(prop2, this_1);
        Object.defineProperty(this_1, prop2, {
          get: function() {
            return getValue(prop2, _this.properties);
          },
          set: function(newVal) {
            return _this.twoWaySetter(newVal, prop2);
          }
        });
        setValue(prop2 + "Change", new EventEmitter(), this_1);
      };
      var this_1 = this;
      for (var _i = 0, propList_1 = propList; _i < propList_1.length; _i++) {
        var prop = propList_1[_i];
        _loop_2(prop);
      }
    };
    ComponentBase2.prototype.addEventListener = function(eventName, handler) {
      var eventObj = getValue(eventName, this);
      if (!isUndefined(eventObj)) {
        if (!this.ngBoundedEvents["".concat(eventName)]) {
          this.ngBoundedEvents["".concat(eventName)] = /* @__PURE__ */ new Map();
        }
        this.ngBoundedEvents["".concat(eventName)].set(handler, eventObj.subscribe(handler));
      }
    };
    ComponentBase2.prototype.removeEventListener = function(eventName, handler) {
      var eventObj = getValue(eventName, this);
      if (!isUndefined(eventObj)) {
        this.ngBoundedEvents["".concat(eventName)].get(handler).unsubscribe();
      }
    };
    ComponentBase2.prototype.trigger = function(eventName, eventArgs, success) {
      var eventObj = getValue(eventName, this);
      var prevDetection = this.isProtectedOnChange;
      this.isProtectedOnChange = false;
      if (eventArgs) {
        eventArgs.name = eventName;
      }
      if (!isUndefined(eventObj)) {
        eventObj.next(eventArgs);
      }
      var localEventObj = getValue("local" + eventName.charAt(0).toUpperCase() + eventName.slice(1), this);
      if (!isUndefined(localEventObj)) {
        localEventObj.call(this, eventArgs);
      }
      this.isProtectedOnChange = prevDetection;
      if (success) {
        this.preventChange = this.isPreventChange;
        success.call(this, eventArgs);
      }
      this.isPreventChange = false;
    };
    return ComponentBase2;
  }()
);

// node_modules/@syncfusion/ej2-angular-base/src/form-base.js
var FormBase = (
  /** @class */
  function() {
    function FormBase2() {
    }
    FormBase2.prototype.propagateChange = function(_) {
      return;
    };
    FormBase2.prototype.propagateTouch = function() {
      return;
    };
    FormBase2.prototype.localChange = function(e) {
      var value = e.checked === void 0 ? e.value : e.checked;
      this.objCheck = isObject(value);
      if (this.isUpdated === true) {
        this.angularValue = this.oldValue;
      }
      if (this.objCheck === true) {
        this.duplicateValue = JSON.stringify(value);
        this.duplicateAngularValue = JSON.stringify(this.angularValue);
        if (this.duplicateValue !== this.duplicateAngularValue && this.propagateChange !== void 0 && value !== void 0) {
          this.propagateChange(value);
          this.angularValue = value;
        }
      } else {
        if (value !== this.angularValue && this.propagateChange !== void 0 && value !== void 0) {
          if (value !== "" && value !== null) {
            this.propagateChange(value);
            this.angularValue = value;
          } else {
            var optionalValue = value;
            this.propagateChange(optionalValue);
            this.angularValue = value;
          }
        }
      }
      this.cdr.markForCheck();
    };
    FormBase2.prototype.registerOnChange = function(registerFunction) {
      this.propagateChange = registerFunction;
    };
    FormBase2.prototype.registerOnTouched = function(registerFunction) {
      this.propagateTouch = registerFunction;
    };
    FormBase2.prototype.twoWaySetter = function(newVal, prop) {
      var oldVal = this.oldValue || getValue(prop, this.properties);
      var ele = this.inputElement || this.element;
      if (ele && oldVal === newVal && this.value === newVal && (ele.value === void 0 || ele.value === "")) {
        return;
      }
      this.saveChanges(prop, newVal, oldVal);
      setValue(prop, isNullOrUndefined(newVal) ? null : newVal, this.properties);
      getValue(prop + "Change", this).emit(newVal);
    };
    FormBase2.prototype.ngAfterViewInit = function(isTempRef) {
      var tempFormAfterViewThis = isTempRef || this;
      tempFormAfterViewThis.ngOnBlurBound = this.ngOnBlur.bind(this);
      tempFormAfterViewThis.ngOnFocusBound = this.ngOnFocus.bind(this);
      if (typeof window !== "undefined") {
        if (tempFormAfterViewThis.getModuleName().includes("dropdowntree")) {
          setTimeout(function() {
            tempFormAfterViewThis.appendTo(tempFormAfterViewThis.element);
          });
        } else {
          tempFormAfterViewThis.appendTo(tempFormAfterViewThis.element);
        }
        var ele = tempFormAfterViewThis.inputElement || tempFormAfterViewThis.element;
        ele.addEventListener("focus", tempFormAfterViewThis.ngOnFocusBound);
        ele.addEventListener("blur", tempFormAfterViewThis.ngOnBlurBound);
      }
      this.isFormInit = false;
    };
    FormBase2.prototype.setDisabledState = function(disabled) {
      this.enabled = !disabled;
      this.disabled = disabled;
    };
    FormBase2.prototype.writeValue = function(value) {
      var regExp3 = /ejs-radiobutton/g;
      if (this.checked === void 0) {
        this.value = value;
      } else {
        if (this.ngEle) {
          if (typeof value === "boolean") {
            if (regExp3.test(this.ngEle.nativeElement.outerHTML)) {
              this.checked = value === this.value;
            } else {
              this.checked = value;
            }
          } else {
            this.checked = value === this.value;
          }
        }
      }
      this.angularValue = value;
      this.isUpdated = true;
      this.preventChange = this.isFormInit ? false : true;
      this.cdr.markForCheck();
      if (value === null) {
        return;
      }
    };
    FormBase2.prototype.ngOnFocus = function(e) {
      if (this.skipFromEvent !== true) {
        this.focus.emit(e);
      }
      this.cdr.markForCheck();
    };
    FormBase2.prototype.ngOnBlur = function(e) {
      this.propagateTouch();
      if (this.skipFromEvent !== true) {
        this.blur.emit(e);
      }
      this.cdr.markForCheck();
    };
    FormBase2.isFormBase = true;
    return FormBase2;
  }()
);

// node_modules/@syncfusion/ej2-angular-base/src/template.js
var stringCompiler = getTemplateEngine();
function compile2(templateEle, helper) {
  if (typeof templateEle === "string" || typeof templateEle === "function" && templateEle.prototype && templateEle.prototype.CSPTemplate) {
    return stringCompiler(templateEle, helper);
  } else {
    var contRef_1 = templateEle.elementRef.nativeElement._viewContainerRef;
    var pName_1 = templateEle.elementRef.nativeElement.propName;
    return function(data, component, propName) {
      var context = {
        $implicit: data
      };
      var conRef = contRef_1 ? contRef_1 : component.viewContainerRef;
      var viewRef = conRef.createEmbeddedView(templateEle, context);
      if (/EJS-MENTION|EJS-DROPDOWNLIST/.test(getValue("currentInstance.element.nodeName", conRef)) || /E-TABITEM/.test(getValue("element.nativeElement.nodeName", conRef))) {
        viewRef.detectChanges();
      } else {
        viewRef.markForCheck();
      }
      var viewCollection = component && component.registeredTemplate ? component.registeredTemplate : getValue("currentInstance.registeredTemplate", conRef);
      propName = propName && component.registeredTemplate ? propName : pName_1;
      if (typeof viewCollection["".concat(propName)] === "undefined") {
        viewCollection["".concat(propName)] = [];
      }
      viewCollection["".concat(propName)].push(viewRef);
      return viewRef.rootNodes;
    };
  }
}
setTemplateEngine({
  compile: compile2
});

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/enum/enum.js
var BarcodeEvent;
(function(BarcodeEvent2) {
  BarcodeEvent2[BarcodeEvent2["invalid"] = 0] = "invalid";
})(BarcodeEvent || (BarcodeEvent = {}));
var QuietZone;
(function(QuietZone2) {
  QuietZone2[QuietZone2["All"] = 2] = "All";
})(QuietZone || (QuietZone = {}));
var DataMatrixSize;
(function(DataMatrixSize2) {
  DataMatrixSize2[DataMatrixSize2["Auto"] = 0] = "Auto";
  DataMatrixSize2[DataMatrixSize2["Size10x10"] = 1] = "Size10x10";
  DataMatrixSize2[DataMatrixSize2["Size12x12"] = 2] = "Size12x12";
  DataMatrixSize2[DataMatrixSize2["Size14x14"] = 3] = "Size14x14";
  DataMatrixSize2[DataMatrixSize2["Size16x16"] = 4] = "Size16x16";
  DataMatrixSize2[DataMatrixSize2["Size18x18"] = 5] = "Size18x18";
  DataMatrixSize2[DataMatrixSize2["Size20x20"] = 6] = "Size20x20";
  DataMatrixSize2[DataMatrixSize2["Size22x22"] = 7] = "Size22x22";
  DataMatrixSize2[DataMatrixSize2["Size24x24"] = 8] = "Size24x24";
  DataMatrixSize2[DataMatrixSize2["Size26x26"] = 9] = "Size26x26";
  DataMatrixSize2[DataMatrixSize2["Size32x32"] = 10] = "Size32x32";
  DataMatrixSize2[DataMatrixSize2["Size36x36"] = 11] = "Size36x36";
  DataMatrixSize2[DataMatrixSize2["Size40x40"] = 12] = "Size40x40";
  DataMatrixSize2[DataMatrixSize2["Size44x44"] = 13] = "Size44x44";
  DataMatrixSize2[DataMatrixSize2["Size48x48"] = 14] = "Size48x48";
  DataMatrixSize2[DataMatrixSize2["Size52x52"] = 15] = "Size52x52";
  DataMatrixSize2[DataMatrixSize2["Size64x64"] = 16] = "Size64x64";
  DataMatrixSize2[DataMatrixSize2["Size72x72"] = 17] = "Size72x72";
  DataMatrixSize2[DataMatrixSize2["Size80x80"] = 18] = "Size80x80";
  DataMatrixSize2[DataMatrixSize2["Size88x88"] = 19] = "Size88x88";
  DataMatrixSize2[DataMatrixSize2["Size96x96"] = 20] = "Size96x96";
  DataMatrixSize2[DataMatrixSize2["Size104x104"] = 21] = "Size104x104";
  DataMatrixSize2[DataMatrixSize2["Size120x120"] = 22] = "Size120x120";
  DataMatrixSize2[DataMatrixSize2["Size132x132"] = 23] = "Size132x132";
  DataMatrixSize2[DataMatrixSize2["Size144x144"] = 24] = "Size144x144";
  DataMatrixSize2[DataMatrixSize2["Size8x18"] = 25] = "Size8x18";
  DataMatrixSize2[DataMatrixSize2["Size8x32"] = 26] = "Size8x32";
  DataMatrixSize2[DataMatrixSize2["Size12x26"] = 27] = "Size12x26";
  DataMatrixSize2[DataMatrixSize2["Size12x36"] = 28] = "Size12x36";
  DataMatrixSize2[DataMatrixSize2["Size16x36"] = 29] = "Size16x36";
  DataMatrixSize2[DataMatrixSize2["Size16x48"] = 30] = "Size16x48";
})(DataMatrixSize || (DataMatrixSize = {}));
var QRCodeVersion;
(function(QRCodeVersion2) {
  QRCodeVersion2[QRCodeVersion2["Auto"] = 0] = "Auto";
  QRCodeVersion2[QRCodeVersion2["Version01"] = 1] = "Version01";
  QRCodeVersion2[QRCodeVersion2["Version02"] = 2] = "Version02";
  QRCodeVersion2[QRCodeVersion2["Version03"] = 3] = "Version03";
  QRCodeVersion2[QRCodeVersion2["Version04"] = 4] = "Version04";
  QRCodeVersion2[QRCodeVersion2["Version05"] = 5] = "Version05";
  QRCodeVersion2[QRCodeVersion2["Version06"] = 6] = "Version06";
  QRCodeVersion2[QRCodeVersion2["Version07"] = 7] = "Version07";
  QRCodeVersion2[QRCodeVersion2["Version08"] = 8] = "Version08";
  QRCodeVersion2[QRCodeVersion2["Version09"] = 9] = "Version09";
  QRCodeVersion2[QRCodeVersion2["Version10"] = 10] = "Version10";
  QRCodeVersion2[QRCodeVersion2["Version11"] = 11] = "Version11";
  QRCodeVersion2[QRCodeVersion2["Version12"] = 12] = "Version12";
  QRCodeVersion2[QRCodeVersion2["Version13"] = 13] = "Version13";
  QRCodeVersion2[QRCodeVersion2["Version14"] = 14] = "Version14";
  QRCodeVersion2[QRCodeVersion2["Version15"] = 15] = "Version15";
  QRCodeVersion2[QRCodeVersion2["Version16"] = 16] = "Version16";
  QRCodeVersion2[QRCodeVersion2["Version17"] = 17] = "Version17";
  QRCodeVersion2[QRCodeVersion2["Version18"] = 18] = "Version18";
  QRCodeVersion2[QRCodeVersion2["Version19"] = 19] = "Version19";
  QRCodeVersion2[QRCodeVersion2["Version20"] = 20] = "Version20";
  QRCodeVersion2[QRCodeVersion2["Version21"] = 21] = "Version21";
  QRCodeVersion2[QRCodeVersion2["Version22"] = 22] = "Version22";
  QRCodeVersion2[QRCodeVersion2["Version23"] = 23] = "Version23";
  QRCodeVersion2[QRCodeVersion2["Version24"] = 24] = "Version24";
  QRCodeVersion2[QRCodeVersion2["Version25"] = 25] = "Version25";
  QRCodeVersion2[QRCodeVersion2["Version26"] = 26] = "Version26";
  QRCodeVersion2[QRCodeVersion2["Version27"] = 27] = "Version27";
  QRCodeVersion2[QRCodeVersion2["Version28"] = 28] = "Version28";
  QRCodeVersion2[QRCodeVersion2["Version29"] = 29] = "Version29";
  QRCodeVersion2[QRCodeVersion2["Version30"] = 30] = "Version30";
  QRCodeVersion2[QRCodeVersion2["Version31"] = 31] = "Version31";
  QRCodeVersion2[QRCodeVersion2["Version32"] = 32] = "Version32";
  QRCodeVersion2[QRCodeVersion2["Version33"] = 33] = "Version33";
  QRCodeVersion2[QRCodeVersion2["Version34"] = 34] = "Version34";
  QRCodeVersion2[QRCodeVersion2["Version35"] = 35] = "Version35";
  QRCodeVersion2[QRCodeVersion2["Version36"] = 36] = "Version36";
  QRCodeVersion2[QRCodeVersion2["Version37"] = 37] = "Version37";
  QRCodeVersion2[QRCodeVersion2["Version38"] = 38] = "Version38";
  QRCodeVersion2[QRCodeVersion2["Version39"] = 39] = "Version39";
  QRCodeVersion2[QRCodeVersion2["Version40"] = 40] = "Version40";
})(QRCodeVersion || (QRCodeVersion = {}));
var ErrorCorrectionLevel;
(function(ErrorCorrectionLevel2) {
  ErrorCorrectionLevel2[ErrorCorrectionLevel2["Low"] = 7] = "Low";
  ErrorCorrectionLevel2[ErrorCorrectionLevel2["Medium"] = 15] = "Medium";
  ErrorCorrectionLevel2[ErrorCorrectionLevel2["Quartile"] = 25] = "Quartile";
  ErrorCorrectionLevel2[ErrorCorrectionLevel2["High"] = 30] = "High";
})(ErrorCorrectionLevel || (ErrorCorrectionLevel = {}));

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/primitives/size.js
var Size = (
  /** @class */
  /* @__PURE__ */ function() {
    function Size2(width, height) {
      this.width = width;
      this.height = height;
    }
    return Size2;
  }()
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/utility/dom-util.js
function createHtmlElement(elementType, attribute) {
  var element = createElement(elementType);
  if (attribute) {
    setAttribute(element, attribute);
  }
  return element;
}
function getChildNode(node) {
  var child;
  var collection = [];
  if (Browser.info.name === "msie" || Browser.info.name === "edge") {
    for (var i = 0; i < node.childNodes.length; i++) {
      child = node.childNodes[parseInt(i.toString(), 10)];
      if (child.nodeType === 1) {
        collection.push(child);
      }
    }
  } else {
    collection = node.children;
  }
  return collection;
}
function measureText(textContent) {
  var measureElement = "barcodeMeasureElement";
  window["" + measureElement].style.visibility = "visible";
  var svg = window["" + measureElement].children[1];
  var text = getChildNode(svg)[0];
  text.textContent = textContent.string;
  text.setAttribute("style", "font-size:" + textContent.stringSize + "px; font-family:" + textContent.fontStyle + ";font-weight:");
  var bBox = new Size(0, 0);
  bBox.width = text.getBBox().width;
  bBox.height = text.getBBox().height;
  window["" + measureElement].style.visibility = "hidden";
  return bBox;
}
function setAttribute(element, attributes2) {
  var keys2 = Object.keys(attributes2);
  for (var i = 0; i < keys2.length; i++) {
    element.setAttribute(keys2[parseInt(i.toString(), 10)], attributes2[keys2[parseInt(i.toString(), 10)]]);
  }
}
function createSvgElement(elementType, attribute) {
  var element = document.createElementNS("http://www.w3.org/2000/svg", elementType);
  setAttribute(element, attribute);
  return element;
}
function createMeasureElements() {
  var measureElement = "barcodeMeasureElement";
  if (!window["" + measureElement]) {
    var divElement = createHtmlElement("div", {
      id: "barcodeMeasureElement",
      class: "barcodeMeasureElement",
      style: "visibility:hidden ; height: 0px ; width: 0px; overflow: hidden;"
    });
    var text = createHtmlElement("span", {
      "style": "display:inline-block ; line-height: normal"
    });
    divElement.appendChild(text);
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xlink", "http://www.w3.org/1999/xlink");
    divElement.appendChild(svg);
    var tSpan = document.createElementNS("http://www.w3.org/2000/svg", "text");
    tSpan.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve");
    svg.appendChild(tSpan);
    window["" + measureElement] = divElement;
    window["" + measureElement].usageCount = 1;
    document.body.appendChild(divElement);
  } else {
    window["" + measureElement].usageCount += 1;
  }
}

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/rendering/canvas-renderer.js
var BarcodeCanvasRenderer = (
  /** @class */
  function() {
    function BarcodeCanvasRenderer2() {
    }
    BarcodeCanvasRenderer2.getContext = function(canvas) {
      return canvas.getContext("2d");
    };
    BarcodeCanvasRenderer2.prototype.renderRootElement = function(attribute, backGroundColor, width, height) {
      var canvasObj = createHtmlElement("canvas", attribute);
      var ctx = canvasObj.getContext("2d");
      ctx.fillStyle = backGroundColor;
      ctx.fillRect(0, 0, width, height);
      return canvasObj;
    };
    BarcodeCanvasRenderer2.prototype.renderRect = function(canvas, attribute) {
      var ctx = canvas.getContext("2d");
      if (attribute.imageSource) {
        var image_1 = new Image();
        image_1.src = attribute.imageSource;
        image_1.onload = function() {
          ctx.drawImage(image_1, attribute.x, attribute.y, attribute.width, attribute.height);
        };
      } else {
        ctx.fillStyle = attribute.color;
        ctx.fillRect(attribute.x, attribute.y, attribute.width, attribute.height);
      }
      return canvas;
    };
    BarcodeCanvasRenderer2.prototype.renderText = function(canvas, attribute) {
      var ctx = canvas.getContext("2d");
      ctx.save();
      ctx.font = attribute.stringSize + "px " + attribute.fontStyle;
      ctx.fillStyle = attribute.color;
      ctx.fillText(attribute.string, attribute.x, attribute.y);
      return canvas;
    };
    return BarcodeCanvasRenderer2;
  }()
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/rendering/svg-renderer.js
var BarcodeSVGRenderering = (
  /** @class */
  function() {
    function BarcodeSVGRenderering2() {
    }
    BarcodeSVGRenderering2.prototype.renderRootElement = function(attribute, backGroundColor) {
      var canvasObj = createSvgElement("svg", attribute);
      canvasObj.setAttribute("style", "background:" + backGroundColor);
      return canvasObj;
    };
    BarcodeSVGRenderering2.prototype.renderRect = function(svg, attribute) {
      if (attribute.imageSource) {
        return this.renderImage(svg, attribute);
      }
      var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", attribute.x.toString());
      rect.setAttribute("y", attribute.y.toString());
      rect.setAttribute("width", attribute.width.toString());
      rect.setAttribute("height", attribute.height.toString());
      rect.setAttribute("fill", attribute.color);
      rect.setAttribute("style", "shape-rendering: crispEdges");
      svg.appendChild(rect);
      return svg;
    };
    BarcodeSVGRenderering2.prototype.renderText = function(svg, attribute) {
      var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", attribute.x.toString());
      text.setAttribute("y", attribute.y.toString());
      text.setAttribute("fill", attribute.color);
      text.style.fontSize = attribute.stringSize.toString() + "px";
      text.style.fontFamily = attribute.fontStyle;
      text.textContent = attribute.string;
      svg.appendChild(text);
      return svg;
    };
    BarcodeSVGRenderering2.prototype.renderImage = function(svg, attribute) {
      var image = document.createElementNS("http://www.w3.org/2000/svg", "image");
      image.setAttribute("x", attribute.x.toString());
      image.setAttribute("y", attribute.y.toString());
      image.setAttribute("width", attribute.width.toString());
      image.setAttribute("height", attribute.height.toString());
      image.setAttribute("href", attribute.imageSource);
      image.setAttribute("preserveAspectRatio", "none");
      svg.appendChild(image);
      return svg;
    };
    return BarcodeSVGRenderering2;
  }()
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/rendering/renderer.js
var BarcodeRenderer = (
  /** @class */
  function() {
    function BarcodeRenderer2(name, isSvgMode) {
      this.renderer = null;
      this.isSvgMode = null;
      this.isSvgMode = isSvgMode;
      this.renderer = isSvgMode ? new BarcodeSVGRenderering() : new BarcodeCanvasRenderer();
    }
    BarcodeRenderer2.prototype.renderRootElement = function(attribute, backGroundColor, width, height) {
      var canvasObj = this.renderer.renderRootElement(attribute, backGroundColor, width, height);
      return canvasObj;
    };
    BarcodeRenderer2.prototype.renderRectElement = function(canvas, attribute) {
      var canvasObj = this.renderer.renderRect(canvas, attribute);
      return canvasObj;
    };
    BarcodeRenderer2.prototype.renderTextElement = function(canvas, attribute) {
      var canvasObj = this.renderer.renderText(canvas, attribute);
      return canvasObj;
    };
    return BarcodeRenderer2;
  }()
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/barcode-base.js
var BarcodeBase = (
  /** @class */
  /* @__PURE__ */ function() {
    function BarcodeBase2() {
    }
    return BarcodeBase2;
  }()
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/primitives/rect.js
var Rect = (
  /** @class */
  /* @__PURE__ */ function() {
    function Rect2(x, y, width, height) {
      this.x = Number.MAX_VALUE;
      this.y = Number.MAX_VALUE;
      this.width = 0;
      this.height = 0;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
    return Rect2;
  }()
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/one-dimension.js
var __extends7 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var OneDimension = (
  /** @class */
  function(_super) {
    __extends7(OneDimension2, _super);
    function OneDimension2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    OneDimension2.prototype.getInstance = function(id) {
      var barCode = document.getElementById(id);
      var barcodeRenderer = new BarcodeRenderer(barCode.id, this.isSvgMode);
      return barcodeRenderer;
    };
    OneDimension2.prototype.getDrawableSize = function(margin, w, h) {
      var topMargin = (this.isSvgMode ? margin.bottom : margin.bottom * 1.5) + (this.isSvgMode ? margin.top : margin.top * 1.5);
      var rightMargin = (this.isSvgMode ? margin.right : margin.right * 1.5) + (this.isSvgMode ? margin.left : margin.left * 1.5);
      var barcodeSize = new Rect(margin.left, margin.top, w - rightMargin, h - topMargin);
      return barcodeSize;
    };
    OneDimension2.prototype.getBaseAttributes = function(width, height, offSetX, offsetY, color, string, stringSize, visibility, fontStyle) {
      var options = {
        width,
        height,
        x: offSetX,
        y: offsetY,
        color,
        string,
        stringSize,
        visibility,
        fontStyle
      };
      if (!this.isSvgMode) {
        options.height = options.height / 1.5;
      }
      if (string && !this.isSvgMode) {
        var scaleValue = this.margin.bottom * 1.5 - this.margin.bottom;
        options.y += scaleValue;
      }
      return options;
    };
    OneDimension2.prototype.getBarLineRatio = function(code, widthValue) {
      var type = this.type;
      if (type === "Code39" || type === "Code32" || type === "Code39Extension" || type === "Code11") {
        var singlewidth = code.length * (type === "Code39" || type === "Code32" || type === "Code39Extension" ? 6 : 3);
        var doublwidth = code.length * (type === "Code39" || type === "Code32" || type === "Code39Extension" ? 3 : 2) * 2;
        return widthValue / (doublwidth + singlewidth + code.length - 1);
      } else if (type === "Code128A" || type === "Code128B" || type === "Code128C" || type === "Code128") {
        var lineCount = code[0].length;
        return widthValue / (lineCount + code.length - 1);
      } else if (type === "Code93Extension") {
        var count = 0;
        for (var i = 0; i < code.length; i++) {
          var numberOfDigits = code[parseInt(i.toString(), 10)];
          for (var j = 0; j < numberOfDigits.length; j++) {
            count += Number(numberOfDigits[parseInt(j.toString(), 10)]);
          }
        }
        return widthValue / count;
      } else {
        var lineCount = 0;
        for (var i = 0; i < code.length; i++) {
          var numberOfDigits = code[parseInt(i.toString(), 10)].length;
          lineCount += numberOfDigits;
        }
        var additionalValue = void 0;
        if (type === "Ean8" || type === "Ean13" || type === "UpcA") {
          additionalValue = 2;
        } else if (type === "Code93") {
          additionalValue = -code.length + 1;
        }
        return widthValue / (additionalValue ? lineCount + code.length - 1 + additionalValue : lineCount + code.length - 1);
      }
    };
    OneDimension2.prototype.multipleWidth = function(codeValue, k, value) {
      var number;
      if (codeValue[parseInt(k.toString(), 10)] === "1" && codeValue[k + 1] === "1") {
        number = value + 1;
        return this.multipleWidth(codeValue, k + 1, number);
      }
      return value;
    };
    OneDimension2.prototype.barCodeType = function(type) {
      if (type === "Code39" || type === "UpcE" || type === "Code39Extension") {
        return "twoBars";
      } else if (type === "UpcA" || type === "Ean13" || type === "Ean8") {
        return "threeBars";
      } else {
        return "noBars";
      }
    };
    OneDimension2.prototype.checkStartValueCondition = function(j, k, numberOfDigits, barType) {
      if (j === 1 && k === 0 && barType === "twoBars" && this.type !== "UpcE" || (j === 0 && k === numberOfDigits - 1 || j === 2 && k === numberOfDigits - 2) && (this.type === "Ean8" || this.type === "Ean13") || this.type === "UpcE" && j === 2 && k === 0 || this.type !== "UpcA" && barType === "threeBars" && j === 2 && k === numberOfDigits - 1 || this.type === "UpcA" && (j === 1 && k === numberOfDigits - 2 || j === 3 && k === numberOfDigits - 2) || barType === "noBars" && j === 0 && k === 0) {
        return true;
      } else {
        return false;
      }
    };
    OneDimension2.prototype.checkEndValueCondition = function(k, j, numberOfDigits, code, temp, doublwidth) {
      var type = this.type;
      if (k === numberOfDigits && j === code.length - 2 && (type === "Code39" || type === "Code39Extension") || type === "Code11" && j === code.length - 1 && k === numberOfDigits - 1 || type === "Code93Extension" && j === code.length - 1 && k === numberOfDigits - 1 || type === "Ean8" && (j === 1 && k === numberOfDigits || j === code.length - 2 && k === numberOfDigits) || this.type === "Ean13" && (j === 2 && k === 1 || j === code.length - 2 && k === numberOfDigits) || type === "UpcA" && (j === 3 && k === 0 || j === 5 && (!temp ? k === 1 : k === doublwidth)) || type === "UpcE" && j === code.length - 2 && k === 1 || type === "Code93" && j === code.length - 1 && k === numberOfDigits - 1 || type !== "Code39" && type !== "Code39Extension" && type !== "Ean8" && type !== "Ean13" && j === code.length - 1 && k === numberOfDigits) {
        return true;
      } else {
        return false;
      }
    };
    OneDimension2.prototype.getDisplayText = function(j, textProperty) {
      var text;
      if (this.type === "Ean8") {
        text = j === 1 ? this.value.substring(0, 4) : this.value.substring(4, 8);
      } else if (this.type === "Ean13") {
        text = j === 2 ? this.value.substring(1, 7) : this.value.substring(7);
      } else if (this.type === "UpcA") {
        text = j === 3 ? this.value.substring(0, 6) : this.value.substring(6, 12);
      } else {
        text = textProperty.text ? textProperty.text : this.value;
      }
      return text;
    };
    OneDimension2.prototype.checkExtraHeight = function(j, type, code) {
      if ((j === 0 || j === code.length - 1) && (type === "Code39" || type === "Code39Extension") || (type === "Ean8" || type === "Ean13") && (j === 0 || j === 2 || j === code.length - 1) || type === "UpcA" && (j === 1 || j === code.length - 2 || j === code.length - 4) || type === "UpcE" && (j === 1 || j === code.length - 2 || j === code.length - 4)) {
        return true;
      } else {
        return false;
      }
    };
    OneDimension2.prototype.getWidthValue = function(number, width, type) {
      if (this.type !== "Code93Extension") {
        if (number) {
          var dividerValue = type === "Code32" ? 3 : 2;
          width = number % dividerValue ? 1 : 2;
        } else {
          width = 1;
        }
      }
      if (this.type === "Code93Extension") {
        if (number && !(number % 4)) {
          width = 4;
        } else if (number && !(number % 2)) {
          width = 2;
        } else if (number && !(number % 3)) {
          width = 3;
        } else {
          width = 1;
        }
      }
      return width;
    };
    OneDimension2.prototype.calculateBarCodeAttributes = function(code, canvas, isUpcE) {
      var temp = false;
      var canDoubleWidth;
      var barcodeSize = this.getDrawableSize(this.margin, this.width, this.height);
      if (barcodeSize.height > 0 && barcodeSize.width > 0) {
        var tempBaseAttributes = void 0;
        var options = [];
        var offsetX = barcodeSize.x;
        var ratio = this.getBarLineRatio(code, barcodeSize.width);
        ratio = this.isSvgMode ? ratio : ratio / 1.5;
        var startValue = 0;
        var endValue = void 0;
        var type = this.type;
        var position = this.displayText.position;
        var scaleValue = this.isSvgMode ? 1 : 1.5;
        var textOptions = void 0;
        var textSize = void 0;
        var textHeight = void 0;
        var textProperty = void 0;
        for (var j = 0; j < code.length; j++) {
          var codeValue = code[parseInt(j.toString(), 10)];
          var check = type !== "UpcA" && type !== "UpcE" && type !== "Code11" && type !== "Code93" && type !== "Code93Extension";
          var barType = this.barCodeType(this.type);
          var extraHeight = this.checkExtraHeight(j, type, code);
          var numberOfDigits = codeValue.length;
          temp = false;
          for (var k = 0; check ? k <= numberOfDigits : k < numberOfDigits; k++) {
            var renderText = false;
            if (this.checkStartValueCondition(j, k, numberOfDigits, barType)) {
              startValue = offsetX;
            } else if (this.checkEndValueCondition(k, j, numberOfDigits, code, temp, canDoubleWidth)) {
              endValue = offsetX;
              if (this.type === "UpcA" && temp && canDoubleWidth) {
                endValue -= canDoubleWidth * ratio;
              }
              renderText = true;
            }
            var canDrawCheck = type === "Code39" || type === "Code93Extension" || type === "Code32" || type === "Code11" || type === "Code39Extension";
            var candraw = canDrawCheck ? k % 2 ? false : true : codeValue[parseInt(k.toString(), 10)] === "1" ? true : false;
            var string = codeValue.toString();
            var number = Number(string[parseInt(k.toString(), 10)]);
            var width = void 0;
            width = this.getWidthValue(number, width, type);
            width = width * ratio;
            textProperty = this.displayText;
            var text = this.getDisplayText(j, textProperty);
            textOptions = this.getBaseAttributes(void 0, void 0, startValue, position === "Bottom" ? barcodeSize.y + barcodeSize.height + 2 : barcodeSize.y + textHeight - 2, this.foreColor, isUpcE || text, textProperty.size, textProperty.visibility, textProperty.font);
            if (!textHeight) {
              createMeasureElements();
              textSize = measureText(textOptions);
              textHeight = textSize.height / 2 + 2;
            }
            if (extraHeight) {
              tempBaseAttributes = this.getBaseAttributes(width, position === "Top" && barType !== "noBars" ? barcodeSize.height - textHeight - this.displayText.margin.top : barcodeSize.height, offsetX, position === "Bottom" ? barcodeSize.y : barcodeSize.y + textHeight + this.displayText.margin.top, this.foreColor);
            }
            if (type === "Ean13" && k === 0 && j === 0 && textProperty.visibility) {
              textOptions = this.getBaseAttributes(void 0, void 0, startValue, position === "Bottom" ? barcodeSize.y + barcodeSize.height + 2 : barcodeSize.y + textHeight + this.displayText.margin.top - 2 - this.displayText.margin.bottom, this.foreColor, isUpcE || text, textProperty.size, textProperty.visibility, textProperty.font);
              textOptions.string = this.value[0];
              this.drawText(canvas, textOptions);
            }
            if (!extraHeight || renderText || type === "UpcA" && extraHeight) {
              var checkCode = type === "Code39" || type === "Code32" || type === "Code93Extension" || type === "Code39Extension" || type === "Code11";
              var value = barcodeSize.height;
              var barCodeHeight = value - textHeight * scaleValue > 0 ? value - textHeight * scaleValue : 0;
              if (checkCode || type === "Ean8" || type === "Ean13") {
                barCodeHeight = position === "Top" && barType !== "noBars" ? barCodeHeight - textHeight : barCodeHeight;
                var height = extraHeight ? barcodeSize.height : barCodeHeight;
                if (this.type !== "Code39") {
                  height = position === "Top" && barType !== "noBars" ? height - this.displayText.margin.top - textHeight : height;
                }
                tempBaseAttributes = this.getBaseAttributes(width, height, offsetX, position === "Bottom" ? barcodeSize.y : barcodeSize.y + textHeight + this.displayText.margin.top, this.foreColor);
              }
              if ((!checkCode || !renderText && !checkCode) && (!renderText || this.type !== "UpcE")) {
                canDoubleWidth = this.multipleWidth(codeValue, k, 1);
                k += canDoubleWidth - 1;
                if (canDoubleWidth > 1) {
                  temp = true;
                }
                var rectWidth = canDoubleWidth > 1 ? canDoubleWidth * width : width;
                var rectHeight = barcodeSize.height - textHeight * scaleValue;
                var height = extraHeight ? barcodeSize.height : rectHeight;
                height = position === "Top" && barType !== "noBars" ? height - this.displayText.margin.top - textHeight : height;
                tempBaseAttributes = this.getBaseAttributes(rectWidth, height, offsetX, position === "Bottom" ? barcodeSize.y : barcodeSize.y + textHeight + this.displayText.margin.top, this.foreColor);
                offsetX = canDoubleWidth > 1 ? offsetX + canDoubleWidth * width : offsetX + 1 * width;
              }
              if (renderText || !extraHeight) {
                this.verticalTextMargin(textProperty, tempBaseAttributes, textOptions);
              }
              if (textProperty.visibility && (endValue && type !== "Ean8" && type !== "Ean13" && type !== "UpcA" && type !== "UpcE" || (type === "Ean8" || type === "UpcA" || type === "UpcE" || type === "Ean13") && renderText)) {
                if (!textProperty.margin.left && !textProperty.margin.right && (textProperty.text || type === "UpcA")) {
                  this.updateOverlappedTextPosition(endValue - startValue, textOptions, textSize, startValue, textProperty, endValue);
                } else {
                  this.getAlignmentPosition(textOptions, endValue, startValue, textSize);
                }
                if (type === "UpcA") {
                  var checkVAl = textOptions.string === this.value.substr(0, 6) ? true : false;
                  textOptions.string = checkVAl ? this.value.substr(0, 1) : textOptions.string.substr(0, 5);
                  var xPosition = checkVAl ? options[0].x / 2 : options[options.length - 1].x + textOptions.stringSize;
                  var yPosition = 0;
                  if (checkVAl) {
                    var tempPosition = textOptions.x;
                    textOptions.x = xPosition;
                    yPosition = textOptions.y;
                    this.drawText(canvas, textOptions);
                    textOptions.x = tempPosition;
                    if (!this.isSvgMode) {
                      textOptions.y = yPosition;
                    }
                    textOptions.string = this.value.substr(1, 5);
                    this.updateOverlappedTextPosition(endValue - startValue, textOptions, textSize, startValue, textProperty, endValue);
                  } else {
                    this.updateOverlappedTextPosition(endValue - startValue, textOptions, textSize, startValue, textProperty, endValue);
                    yPosition = textOptions.y;
                    this.drawText(canvas, textOptions);
                    if (!this.isSvgMode) {
                      textOptions.y = yPosition;
                    }
                    textOptions.string = this.value.substr(11, 12);
                    textOptions.x = xPosition;
                  }
                }
                this.alignDisplayText(textOptions, textProperty, startValue, endValue, textSize);
                this.drawText(canvas, textOptions);
              }
            }
            if (candraw) {
              options.push(tempBaseAttributes);
            }
            if (this.canIncrementCheck(type, j, code)) {
              offsetX += width;
            }
          }
        }
        this.drawImage(canvas, options);
      }
    };
    OneDimension2.prototype.canIncrementCheck = function(type, j, code) {
      if (type === "Code39" || type === "Code32" || type === "Code39Extension" || type === "Code93Extension" || type === "Code11" || type === "UpcE" && (j === 1 || j === code.length - 2) || (type === "Ean8" || type === "Ean13") && (j === 0 || j === code.length - 1 || j === 2)) {
        return true;
      } else {
        return false;
      }
    };
    OneDimension2.prototype.verticalTextMargin = function(textProperty, tempBaseAttributes, textOptions) {
      if (textProperty.margin.top && tempBaseAttributes.height - textProperty.margin.top > 0) {
        if (textProperty.margin.top > 0 && textProperty.position === "Bottom") {
          tempBaseAttributes.height -= textProperty.margin.top;
        } else {
          textOptions.y += textProperty.margin.top;
        }
      }
      if (textProperty.margin.bottom && tempBaseAttributes.height - textProperty.margin.bottom > 0) {
        if (textProperty.margin.bottom > 0) {
          textOptions.y -= textProperty.margin.bottom;
          if (this.displayText.position === "Bottom") {
            tempBaseAttributes.height -= textProperty.margin.bottom;
          }
        } else {
          textOptions.y -= textProperty.margin.bottom;
        }
      }
    };
    OneDimension2.prototype.getAlignmentPosition = function(textOptions, endValue, startValue, textSize) {
      if (this.displayText.alignment === "Center") {
        textOptions.x += (endValue - startValue) / 2 - textSize.width * 0.5;
      } else if (this.displayText.alignment === "Left") {
        textOptions.x = startValue;
      } else {
        textOptions.x = endValue - textSize.width;
      }
    };
    OneDimension2.prototype.drawImage = function(canvas, options) {
      var barcodeRenderer = this.getInstance(canvas.id);
      for (var i = 0; i < options.length; i++) {
        barcodeRenderer.renderRectElement(canvas, options[parseInt(i.toString(), 10)]);
      }
    };
    OneDimension2.prototype.updateDisplayTextSize = function(options, size, endValue, startValue, textProperty) {
      if (options.x + size.width > endValue || options.x < startValue && options.stringSize > 2) {
        var rightAlign = options.x < startValue && textProperty.margin.right ? true : false;
        if (options.x < startValue && textProperty.margin.right) {
          options.stringSize -= 2;
          var newSize = measureText(options);
          options.x += (endValue - startValue) / 2 - newSize.width * 0.5;
          var diff = textProperty.margin.right - (endValue - (options.x + size.width));
          options.x -= diff;
          this.updateDisplayTextSize(options, newSize, endValue, startValue, textProperty);
        }
      }
    };
    OneDimension2.prototype.alignDisplayText = function(options, textProperty, startValue, endValue, size) {
      var leftMargin = false;
      if (textProperty.margin.left || textProperty.margin.right) {
        if (options.x - startValue < textProperty.margin.left && textProperty.margin.left) {
          leftMargin = true;
          var diff = textProperty.margin.left - (options.x - startValue);
          options.x += diff;
          this.updateDisplayTextSize(options, size, endValue, startValue, textProperty);
        }
        if (endValue - (options.x + size.width) < textProperty.margin.right && textProperty.margin.right && !leftMargin) {
          var diff = textProperty.margin.right - (endValue - (options.x + size.width));
          options.x -= diff;
          this.updateDisplayTextSize(options, size, endValue, startValue, textProperty);
        } else if (endValue - (options.x + size.width) < textProperty.margin.right) {
          var newSize = measureText(options);
          this.updateOverlappedTextPosition(endValue - startValue, options, newSize, startValue, textProperty, endValue);
          this.updateDisplayTextSize(options, newSize, endValue, startValue, textProperty);
        }
      }
    };
    OneDimension2.prototype.updateOverlappedTextPosition = function(width, options, size, startValue, textProperty, endValue) {
      if ((size.width > width || textProperty) && endValue - (options.x + size.width) <= textProperty.margin.right && options.stringSize > 2) {
        options.stringSize -= !textProperty ? 2 : 0.2;
        var newSize = measureText(options);
        this.updateOverlappedTextPosition(width, options, newSize, startValue, textProperty, endValue);
      } else if (!textProperty.margin.left && !textProperty.margin.right && options.stringSize > 2) {
        this.getAlignmentPosition(options, endValue, startValue, size);
      }
    };
    OneDimension2.prototype.drawText = function(canvas, options) {
      if (!this.isSvgMode) {
        options.y /= 1.5;
      }
      var barcodeRenderer = this.getInstance(canvas.id);
      barcodeRenderer.renderTextElement(canvas, options);
    };
    return OneDimension2;
  }(BarcodeBase)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/one-dimension/code128.js
var __extends8 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Code128 = (
  /** @class */
  function(_super) {
    __extends8(Code1282, _super);
    function Code1282() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Code1282.prototype.validateInput = function(char) {
      if (char.search(/^[0-9A-Za-z\-\.\ \@\$\/\+\%\!\@\#\$\%\&\*\^\(\)\_\+\=\<\>\?\{\}\[\]\~\-\Ê]+$/) === -1) {
        return "Supports only 128 characters of ASCII.";
      } else {
        return void 0;
      }
    };
    Code1282.prototype.getCodeValue = function() {
      var codes = [11011001100, 11001101100, 11001100110, 10010011e3, 10010001100, 10001001100, 10011001e3, 10011000100, 10001100100, 11001001e3, 11001000100, 11000100100, 10110011100, 10011011100, 10011001110, 10111001100, 10011101100, 10011100110, 11001110010, 11001011100, 11001001110, 11011100100, 11001110100, 11101101110, 11101001100, 11100101100, 11100100110, 11101100100, 11100110100, 11100110010, 11011011e3, 11011000110, 11000110110, 10100011e3, 10001011e3, 10001000110, 10110001e3, 10001101e3, 10001100010, 11010001e3, 11000101e3, 11000100010, 10110111e3, 10110001110, 10001101110, 10111011e3, 10111000110, 10001110110, 11101110110, 11010001110, 11000101110, 11011101e3, 11011100010, 11011101110, 11101011e3, 11101000110, 11100010110, 11101101e3, 11101100010, 11100011010, 11101111010, 11001000010, 11110001010, 1010011e4, 10100001100, 1001011e4, 10010000110, 10000101100, 10000100110, 1011001e4, 10110000100, 1001101e4, 10011000010, 10000110100, 10000110010, 11000010010, 1100101e4, 11110111010, 11000010100, 10001111010, 10100111100, 10010111100, 10010011110, 10111100100, 10011110100, 10011110010, 11110100100, 11110010100, 11110010010, 11011011110, 11011110110, 11110110110, 10101111e3, 10100011110, 10001011110, 10111101e3, 10111100010, 11110101e3, 11110100010, 10111011110, 10111101110, 11101011110, 11110101110, 11010000100, 1101001e4, 11010011100, 1100011101011];
      return codes;
    };
    Code1282.prototype.getBytes = function(givenWord) {
      var bytes = [];
      for (var i = 0; i < givenWord.length; i++) {
        bytes.push(givenWord[parseInt(i.toString(), 10)].charCodeAt(0));
      }
      return bytes;
    };
    Code1282.prototype.appendStartStopCharacters = function(char) {
      var startChararcter;
      if (this.type === "Code128A") {
        startChararcter = String.fromCharCode(208);
      } else if (this.type === "Code128B") {
        startChararcter = String.fromCharCode(209);
      } else if (this.type === "Code128C") {
        startChararcter = String.fromCharCode(210);
      }
      return startChararcter + char;
    };
    Code1282.prototype.check128C = function(value) {
      return value.match(new RegExp("^(Ï*[0-9]{2}Ï*)*"))[0];
    };
    Code1282.prototype.check128A = function(value) {
      return value.match(new RegExp("^[\0-_È-Ï]*"))[0];
    };
    Code1282.prototype.check128B = function(value) {
      return value.match(new RegExp("^[ -È-Ï]*"))[0];
    };
    Code1282.prototype.clipAB = function(value, code128A) {
      var ranges = code128A ? "[\0-_È-Ï]" : "[ -È-Ï]";
      var untilC = value.match(new RegExp("^(" + ranges + "+?)(([0-9]{2}){2,})([^0-9]|$)"));
      if (untilC) {
        return untilC[1] + String.fromCharCode(204) + this.clipC(value.substring(untilC[1].length));
      }
      var chars = value.match(new RegExp("^" + ranges + "+"))[0];
      if (chars.length === value.length) {
        return value;
      }
      return value;
    };
    Code1282.prototype.code128Clip = function() {
      var newString;
      var check128C = this.check128C(this.value).length;
      if (check128C >= 2) {
        return newString = String.fromCharCode(210) + this.clipC(this.value);
      } else {
        var code128A = this.check128A(this.value) > this.check128B(this.value);
        return newString = (code128A ? String.fromCharCode(208) : String.fromCharCode(209)) + this.clipAB(this.value, code128A);
      }
    };
    Code1282.prototype.clipC = function(string) {
      var cMatch = this.check128C(string);
      var length = cMatch.length;
      if (length === string.length) {
        return string;
      }
      string = string.substring(length);
      var code128A = this.check128A(string) >= this.check128B(string);
      return cMatch + String.fromCharCode(code128A ? 206 : 205) + this.clipAB(string, code128A);
    };
    Code1282.prototype.draw = function(canvas) {
      this.code128(canvas);
    };
    Code1282.prototype.code128 = function(canvas) {
      var givenCharacter = this.value;
      givenCharacter = this.type !== "Code128" ? this.appendStartStopCharacters(givenCharacter) : this.code128Clip();
      var bytes = this.getBytes(givenCharacter);
      var startCharacterValue = bytes.shift() - 105;
      var set;
      if (startCharacterValue === 103) {
        set = "0";
      } else if (startCharacterValue === 104) {
        set = "1";
      } else {
        set = "2";
      }
      var encodingResult = this.encodeData(bytes, 1, set);
      var encodedData = this.encode(startCharacterValue, encodingResult);
      var code = [];
      code.push(encodedData);
      this.calculateBarCodeAttributes(code, canvas);
    };
    Code1282.prototype.encodeData = function(byteValue, textPosition, set) {
      if (!byteValue.length) {
        return {
          result: "",
          checksum: 0
        };
      }
      var nextCode;
      var index;
      if (byteValue[0] >= 200) {
        index = byteValue.shift() - 105;
        var nextSet = this.swap(index);
        if (nextSet !== void 0) {
          nextCode = this.encodeData(byteValue, textPosition + 1, nextSet);
        }
      } else {
        index = this.correctIndex(byteValue, set);
        nextCode = this.encodeData(byteValue, textPosition + 1, set);
      }
      var encodingValues = this.getCodes(index);
      var weight = index * textPosition;
      return {
        result: encodingValues + nextCode.result,
        checksum: weight + nextCode.checksum
      };
    };
    Code1282.prototype.swap = function(index) {
      if (index === 99) {
        return "2";
      } else if (index === 100) {
        return "1";
      } else {
        return "0";
      }
    };
    Code1282.prototype.encode = function(startIndex, encodingResult) {
      var moduloValue = 103;
      var stopvalue = 106;
      var encodeValue = this.getCodes(startIndex) + encodingResult.result;
      if (this.enableCheckSum) {
        encodeValue += this.getCodes((encodingResult.checksum + startIndex) % moduloValue);
      }
      encodeValue += this.getCodes(stopvalue);
      return encodeValue;
    };
    Code1282.prototype.correctIndex = function(bytes, set) {
      if (set === "0") {
        var charCode = bytes.shift();
        return charCode < 32 ? charCode + 64 : charCode - 32;
      } else if (set === "1") {
        return bytes.shift() - 32;
      } else {
        return (bytes.shift() - 48) * 10 + bytes.shift() - 48;
      }
    };
    Code1282.prototype.getCodes = function(index) {
      var codes = this.getCodeValue();
      return codes[parseInt(index.toString(), 10)] ? codes[parseInt(index.toString(), 10)].toString() : "";
    };
    return Code1282;
  }(OneDimension)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/one-dimension/code128B.js
var __extends9 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Code128B = (
  /** @class */
  function(_super) {
    __extends9(Code128B2, _super);
    function Code128B2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Code128B2.prototype.validateInput = function(char) {
      if (new RegExp("^[ -È-Ï]+$").test(char)) {
        return void 0;
      } else {
        return "Supports only ASCII characters 32 to 127 (0–9, A–Z, a–z), and special characters.";
      }
    };
    Code128B2.prototype.draw = function(canvas) {
      this.code128(canvas);
    };
    return Code128B2;
  }(Code128)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/one-dimension/code128C.js
var __extends10 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Code128C = (
  /** @class */
  function(_super) {
    __extends10(Code128C2, _super);
    function Code128C2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Code128C2.prototype.validateInput = function(char) {
      if (new RegExp("^(Ï*[0-9]{2}Ï*)+$").test(char)) {
        return void 0;
      } else {
        return "Supports even number of numeric characters (00-99).";
      }
    };
    Code128C2.prototype.draw = function(canvas) {
      this.code128(canvas);
    };
    return Code128C2;
  }(Code128)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/primitives/margin.js
var __extends11 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate8 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Margin = (
  /** @class */
  function(_super) {
    __extends11(Margin2, _super);
    function Margin2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate8([Property(10)], Margin2.prototype, "left", void 0);
    __decorate8([Property(10)], Margin2.prototype, "right", void 0);
    __decorate8([Property(10)], Margin2.prototype, "top", void 0);
    __decorate8([Property(10)], Margin2.prototype, "bottom", void 0);
    return Margin2;
  }(ChildProperty)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/primitives/displaytext.js
var __extends12 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate9 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DisplayText = (
  /** @class */
  function(_super) {
    __extends12(DisplayText2, _super);
    function DisplayText2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate9([Property("")], DisplayText2.prototype, "text", void 0);
    __decorate9([Property(true)], DisplayText2.prototype, "visibility", void 0);
    __decorate9([Property("monospace")], DisplayText2.prototype, "font", void 0);
    __decorate9([Property(20)], DisplayText2.prototype, "size", void 0);
    __decorate9([Complex({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, Margin)], DisplayText2.prototype, "margin", void 0);
    __decorate9([Property("Center")], DisplayText2.prototype, "alignment", void 0);
    __decorate9([Property("Bottom")], DisplayText2.prototype, "position", void 0);
    return DisplayText2;
  }(ChildProperty)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/one-dimension/code39.js
var __extends13 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Code39 = (
  /** @class */
  function(_super) {
    __extends13(Code392, _super);
    function Code392() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Code392.prototype.getCodeValue = function() {
      var codes = ["111221211", "211211112", "112211112", "212211111", "111221112", "211221111", "112221111", "111211212", "211211211", "112211211", "211112112", "112112112", "212112111", "111122112", "211122111", "112122111", "111112212", "211112211", "112112211", "111122211", "211111122", "112111122", "212111121", "111121122", "211121121", "112121121", "111111222", "211111221", "112111221", "111121221", "221111112", "122111112", "222111111", "121121112", "221121111", "122121111", "121111212", "221111211", "122111211", "121121211", "121212111", "121211121", "121112121", "111212121"];
      return codes;
    };
    Code392.prototype.getCharacter = function() {
      var characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. *$/+%";
      return characters;
    };
    Code392.prototype.checkSum = function(char, characters) {
      var checksum = 0;
      for (var i = 0; i < char.length; i++) {
        var codeNumber = characters.indexOf(char[parseInt(i.toString(), 10)]);
        checksum += codeNumber;
      }
      checksum = checksum % 43;
      return checksum;
    };
    Code392.prototype.validateInput = function(char) {
      if (char.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) === -1) {
        return "Supports A-Z, 0-9, and symbols ( - . $ / + % SPACE).";
      } else {
        return void 0;
      }
    };
    Code392.prototype.getPatternCollection = function(givenChar, characters) {
      var codeNumber;
      var code = [];
      var codes = this.getCodeValue();
      for (var i = 0; i < givenChar.length; i++) {
        codeNumber = characters.indexOf(givenChar.charAt(i));
        code.push(codes[parseInt(codeNumber.toString(), 10)]);
      }
      return code;
    };
    Code392.prototype.appendStartStopCharacters = function(char) {
      return "*" + char + "*";
    };
    Code392.prototype.drawCode39Extension = function(canvas, encodedCharacter) {
      this.draw(canvas, encodedCharacter);
    };
    Code392.prototype.draw = function(canvas, encodedCharacter) {
      var givenCharacter = encodedCharacter ? encodedCharacter : this.value;
      var characters = this.getCharacter();
      if (this.enableCheckSum) {
        var checkSum = this.checkSum(givenCharacter, characters);
        givenCharacter += checkSum;
      }
      givenCharacter = this.appendStartStopCharacters(givenCharacter);
      var code = this.getPatternCollection(givenCharacter, characters);
      this.calculateBarCodeAttributes(code, canvas);
    };
    return Code392;
  }(OneDimension)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/one-dimension/codabar.js
var __extends14 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var CodaBar = (
  /** @class */
  function(_super) {
    __extends14(CodaBar2, _super);
    function CodaBar2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    CodaBar2.prototype.validateInput = function(char) {
      if (char.search(/^[0-9A-D\-\.\$\/\+\%\:]+$/) === -1) {
        return "Supports 0-9, A-D and symbols (-,$, /, ., +).";
      } else {
        return void 0;
      }
    };
    CodaBar2.prototype.getCodeValue = function() {
      var codes = {
        "0": "101010011",
        "1": "101011001",
        "2": "101001011",
        "3": "110010101",
        "4": "101101001",
        "5": "110101001",
        "6": "100101011",
        "7": "100101101",
        "8": "100110101",
        "9": "110100101",
        "-": "101001101",
        "$": "101100101",
        ":": "1101011011",
        "/": "1101101011",
        ".": "1101101101",
        "+": "101100110011",
        "A": "1011001001",
        "B": "1001001011",
        "C": "1010010011",
        "D": "1010011001"
      };
      return codes;
    };
    CodaBar2.prototype.appendStartStopCharacters = function(char) {
      return "A" + char + "A";
    };
    CodaBar2.prototype.getPatternCollection = function(givenCharacter, codes) {
      var code = [];
      for (var i = 0; i < givenCharacter.length; i++) {
        var char = givenCharacter[parseInt(i.toString(), 10)];
        code.push(codes["" + char]);
      }
      return code;
    };
    CodaBar2.prototype.draw = function(canvas) {
      var codes = this.getCodeValue();
      var givenCharacter = this.value;
      givenCharacter = this.appendStartStopCharacters(givenCharacter);
      var code = this.getPatternCollection(givenCharacter, codes);
      this.calculateBarCodeAttributes(code, canvas);
    };
    return CodaBar2;
  }(OneDimension)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/one-dimension/code128A.js
var __extends15 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Code128A = (
  /** @class */
  function(_super) {
    __extends15(Code128A2, _super);
    function Code128A2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Code128A2.prototype.validateInput = function(char) {
      if (new RegExp("^[\0-_È-Ï]+$").test(char)) {
        return void 0;
      } else {
        return "Supports only ASCII characters 00 to 95 (0–9, A–Z and control codes) and special characters.";
      }
    };
    Code128A2.prototype.draw = function(canvas) {
      this.code128(canvas);
    };
    return Code128A2;
  }(Code128)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/one-dimension/ean8.js
var __extends16 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Ean8 = (
  /** @class */
  function(_super) {
    __extends16(Ean82, _super);
    function Ean82() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Ean82.prototype.validateInput = function(value) {
      if (value.search(/^[0-9]{8}$/) !== -1 && Number(value[7]) === this.checkSumData(value)) {
        return void 0;
      } else {
        return "Accepts 8 numeric characters.";
      }
    };
    Ean82.prototype.getCodeValueRight = function(right) {
      var codes;
      if (right) {
        codes = {
          "0": "0001101",
          "1": "0011001",
          "2": "0010011",
          "3": "0111101",
          "4": "0100011",
          "5": "0110001",
          "6": "0101111",
          "7": "0111011",
          "8": "0110111",
          "9": "0001011"
        };
      } else {
        codes = {
          "0": "1110010",
          "1": "1100110",
          "2": "1101100",
          "3": "1000010",
          "4": "1011100",
          "5": "1001110",
          "6": "1010000",
          "7": "1000100",
          "8": "1001000",
          "9": "1110100"
        };
      }
      return codes;
    };
    Ean82.prototype.checkSumData = function(value) {
      for (var i = 0; i < value.length; i++) {
        var sum1 = Number(value[1]) + Number(value[3]) + Number(value[5]);
        var sum2 = 3 * (Number(value[0]) + Number(value[2]) + Number(value[4]) + Number(value[6]));
        var checkSumValue = sum1 + sum2;
        var checkSumDigit = 10 - checkSumValue % 10;
        return checkSumDigit === 0 ? checkSumDigit = 0 : checkSumDigit;
      }
      return 0;
    };
    Ean82.prototype.draw = function(canvas) {
      var endBars = "101";
      var middleBar = "01010";
      var codes = this.getCodeValueRight(true);
      var code = [];
      code.push(endBars);
      code.push(this.leftValue(codes, true));
      code.push(middleBar);
      codes = this.getCodeValueRight(false);
      code.push(this.leftValue(codes, false));
      code.push(endBars);
      this.calculateBarCodeAttributes(code, canvas);
    };
    Ean82.prototype.leftValue = function(codes, isLeft) {
      var code;
      for (var i = isLeft ? 0 : this.value.length - 4; i < (isLeft ? this.value.length - 4 : this.value.length); i++) {
        if (i === 0 || i === 4) {
          code = codes[this.value[parseInt(i.toString(), 10)]];
        } else {
          code += codes[this.value[parseInt(i.toString(), 10)]];
        }
      }
      return code;
    };
    return Ean82;
  }(OneDimension)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/one-dimension/ean13.js
var __extends17 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Ean13 = (
  /** @class */
  function(_super) {
    __extends17(Ean132, _super);
    function Ean132() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Ean132.prototype.validateInput = function(value) {
      var checkSumValue = this.checksumValue(value);
      if (value.search(/^[0-9]{13}$/) !== -1 && (Number(value[12]) === this.checkSumData(value) || Number(value[12]) === checkSumValue)) {
        return void 0;
      } else if (value.search(/^[0-9]{12}$/) !== -1) {
        value += this.checkSumData(value);
        this.value = value;
        return void 0;
      } else {
        return "Accepts 12 numeric characters.";
      }
    };
    Ean132.prototype.checksumValue = function(number) {
      var res = number.substr(0, 12).split("").map(function(n) {
        return +n;
      }).reduce(function(sum, a, idx) {
        return idx % 2 ? sum + a * 3 : sum + a;
      }, 0);
      return (10 - res % 10) % 10;
    };
    Ean132.prototype.checkSumData = function(value) {
      var sum1 = 3 * (Number(value[11]) + Number(value[9]) + Number(value[7]) + Number(value[5]) + Number(value[3]) + Number(value[1]));
      var sum2 = Number(value[10]) + Number(value[8]) + Number(value[6]) + Number(value[4]) + Number(value[2]) + Number(value[0]);
      var checkSumValue = sum1 + sum2;
      var roundOffValue = Math.round(checkSumValue / 10) * 10;
      return roundOffValue - checkSumValue;
    };
    Ean132.prototype.getStructure = function() {
      return {
        "0": "LLLLLL",
        "1": "LLGLGG",
        "2": "LLGGLG",
        "3": "LLGGGL",
        "4": "LGLLGG",
        "5": "LGGLLG",
        "6": "LGGGLL",
        "7": "LGLGLG",
        "8": "LGLGGL",
        "9": "LGGLGL"
      };
    };
    Ean132.prototype.getBinaries = function() {
      return {
        "L": ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"],
        "G": ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"],
        "R": ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"],
        "O": ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"],
        "E": ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"]
      };
    };
    Ean132.prototype.draw = function(canvas) {
      var endBars = "101";
      var middleBar = "01010";
      var code = [];
      var structureValue = this.getStructure();
      var structure = structureValue[this.value[0]];
      code.push(endBars);
      var leftString = this.value.substr(1, 6);
      code.push(this.leftValue(true, structure, leftString));
      code.push(middleBar);
      leftString = this.value.substr(7, 6);
      code.push(this.leftValue(false, "RRRRRR", leftString));
      code.push(endBars);
      this.calculateBarCodeAttributes(code, canvas);
    };
    Ean132.prototype.leftValue = function(isLeft, structure, leftString) {
      var code;
      var tempCodes;
      var codes = this.getBinaries();
      for (var i = 0; i < leftString.length; i++) {
        tempCodes = codes[structure[parseInt(i.toString(), 10)]];
        if (i === 0) {
          code = tempCodes[leftString[parseInt(i.toString(), 10)]];
        } else {
          code += tempCodes[leftString[parseInt(i.toString(), 10)]];
        }
      }
      return code;
    };
    return Ean132;
  }(OneDimension)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/one-dimension/upcE.js
var __extends18 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var UpcE = (
  /** @class */
  function(_super) {
    __extends18(UpcE2, _super);
    function UpcE2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    UpcE2.prototype.validateInput = function(value) {
      if (value.search(/^[0-9]{6}$/) !== -1) {
        return void 0;
      } else {
        return "Accepts 6 numeric characters.";
      }
    };
    UpcE2.prototype.checkSum = function(value) {
      var result = 0;
      var i;
      for (i = 1; i < 11; i += 2) {
        result += parseInt(value[i], void 0);
      }
      for (i = 0; i < 11; i += 2) {
        result += parseInt(value[i], void 0) * 3;
      }
      return (10 - result % 10) % 10;
    };
    UpcE2.prototype.getStructure = function() {
      return {
        "0": "EEEOOO",
        "1": "EEOEOO",
        "2": "EEOOEO",
        "3": "EEOOOE",
        "4": "EOEEOO",
        "5": "EOOEEO",
        "6": "EOOOEE",
        "7": "EOEOEO",
        "8": "EOEOOE",
        "9": "EOOEOE"
      };
    };
    UpcE2.prototype.getValue = function() {
      return ["XX00000XXX", "XX10000XXX", "XX20000XXX", "XXX00000XX", "XXXX00000X", "XXXXX00005", "XXXXX00006", "XXXXX00007", "XXXXX00008", "XXXXX00009"];
    };
    UpcE2.prototype.getExpansion = function(lastDigit) {
      var value = this.getValue();
      return value["" + lastDigit];
    };
    UpcE2.prototype.getUpcValue = function() {
      var lastDigit = this.value[this.value.length - 1];
      var expansionValue = this.getExpansion(lastDigit);
      var result = "";
      var index = 0;
      for (var i = 0; i < expansionValue.length; i++) {
        var value = expansionValue[parseInt(i.toString(), 10)];
        if (value === "X") {
          result += this.value[index++];
        } else {
          result += value;
        }
      }
      result = "0" + result;
      var encodingValue = "" + result;
      if (this.enableCheckSum) {
        encodingValue += this.checkSum(result);
      }
      return encodingValue;
    };
    UpcE2.prototype.getBinaries = function() {
      return {
        "O": ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"],
        "E": ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"]
      };
    };
    UpcE2.prototype.encoding = function(upcAValue, string, structure) {
      var code;
      var tempValue;
      var codes = this.getBinaries();
      for (var i = 0; i < string.length; i++) {
        tempValue = codes[structure[parseInt(i.toString(), 10)]];
        if (i === 0) {
          code = tempValue[string[parseInt(i.toString(), 10)]];
        } else {
          code += tempValue[string[parseInt(i.toString(), 10)]];
        }
      }
      return code;
    };
    UpcE2.prototype.draw = function(canvas) {
      var endBars = "101";
      var middleBar = "010101";
      var endDigits = "00000000";
      var code = [];
      var upcAValue = this.getUpcValue();
      var structureValue = this.getStructure();
      var structure = structureValue[upcAValue[upcAValue.length - 1]];
      code.push(endDigits);
      code.push(endBars);
      code.push(this.encoding(upcAValue, this.value, structure));
      code.push(middleBar);
      code.push(endDigits);
      var renderText = upcAValue[0] + this.value + upcAValue[upcAValue.length - 1];
      this.calculateBarCodeAttributes(code, canvas, this.displayText.text === "" ? renderText : void 0);
    };
    return UpcE2;
  }(OneDimension)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/one-dimension/upcA.js
var __extends19 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var UpcA = (
  /** @class */
  function(_super) {
    __extends19(UpcA2, _super);
    function UpcA2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    UpcA2.prototype.validateInput = function(value) {
      if (value.search(/^[0-9]{11}$/) !== -1 && this.enableCheckSum) {
        this.value += this.checkSumData(this.value);
      }
      if (this.value.search(/^[0-9]{12}$/) !== -1 && Number(this.value[11]) === this.checkSumData(this.value)) {
        return void 0;
      } else {
        return "Accepts 11 numeric characters.";
      }
    };
    UpcA2.prototype.checkSumData = function(value) {
      var sum1 = 3 * (Number(value[0]) + Number(value[2]) + Number(value[4]) + Number(value[6]) + Number(value[8]) + Number(value[10]));
      var sum2 = Number(value[9]) + Number(value[7]) + Number(value[5]) + Number(value[3]) + Number(value[1]);
      var checkSumValue = sum1 + sum2;
      return (10 - checkSumValue % 10) % 10;
    };
    UpcA2.prototype.getBinaries = function() {
      return {
        "L": ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"],
        "R": ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"]
      };
    };
    UpcA2.prototype.draw = function(canvas) {
      var endDigits = "00000000";
      var middleBar = "01010";
      var code = [];
      code.push(endDigits);
      code.push("101" + this.leftValue(true, "L", this.value[0]));
      code.push(this.leftValue(true, "LLLLL", this.value.substr(1, 5)));
      code.push(middleBar);
      code.push(this.leftValue(true, "RRRRR", this.value.substr(6, 5)));
      code.push(this.leftValue(true, "R", this.value[11]) + "101");
      code.push(endDigits);
      this.calculateBarCodeAttributes(code, canvas);
    };
    UpcA2.prototype.leftValue = function(isLeft, structure, leftString) {
      var code;
      var tempValue;
      var codes = this.getBinaries();
      for (var i = 0; i < leftString.length; i++) {
        tempValue = codes[structure[parseInt(i.toString(), 10)]];
        if (i === 0) {
          code = tempValue[leftString[parseInt(i.toString(), 10)]];
        } else {
          code += tempValue[leftString[parseInt(i.toString(), 10)]];
        }
      }
      return code;
    };
    return UpcA2;
  }(OneDimension)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/one-dimension/code11.js
var __extends20 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Code11 = (
  /** @class */
  function(_super) {
    __extends20(Code112, _super);
    function Code112() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Code112.prototype.validateInput = function(value) {
      if (value.search(/^[0-9\-\*]+$/) === -1) {
        return "This bar code support 0-9 , * , -";
      } else {
        return void 0;
      }
    };
    Code112.prototype.getCodeValue = function() {
      var codes = {
        "0": "111121",
        "1": "211121",
        "2": "121121",
        "3": "221111",
        "4": "112121",
        "5": "212111",
        "6": "122111",
        "7": "111221",
        "8": "211211",
        "9": "211111",
        "-": "112111",
        "*": "112211"
      };
      return codes;
    };
    Code112.prototype.getPatternCollection = function(givenChar) {
      var code = [];
      var codes = this.getCodeValue();
      for (var i = 0; i < givenChar.length; i++) {
        code.push(codes[givenChar[parseInt(i.toString(), 10)]]);
      }
      return code;
    };
    Code112.prototype.draw = function(canvas) {
      var codes = [];
      var givenChar = "*" + this.value + "*";
      codes = this.getPatternCollection(givenChar);
      this.calculateBarCodeAttributes(codes, canvas);
    };
    return Code112;
  }(OneDimension)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/one-dimension/code93.js
var __extends21 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Code93 = (
  /** @class */
  function(_super) {
    __extends21(Code932, _super);
    function Code932() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Code932.prototype.validateInput = function(value) {
      if (value.search(/^[0-9A-Z\-\.\*\$\/\+\ %\ ]+$/) === -1) {
        return "Supports A-Z, 0-9, and symbols ( - . $ / + % SPACE).";
      } else {
        return void 0;
      }
    };
    Code932.prototype.getCharacterWeight = function() {
      var codes = {
        "0": "0",
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
        "A": "10",
        "B": "11",
        "C": "12",
        "D": "13",
        "E": "14",
        "F": "15",
        "G": "16",
        "H": "17",
        "I": "18",
        "J": "19",
        "K": "20",
        "L": "21",
        "M": "22",
        "N": "23",
        "O": "24",
        "P": "25",
        "Q": "26",
        "R": "27",
        "S": "28",
        "T": "29",
        "U": "30",
        "V": "31",
        "W": "32",
        "X": "33",
        "Y": "34",
        "Z": "35",
        "-": "36",
        ".": "37",
        " ": "38",
        "$": "39",
        "/": "40",
        "+": "41",
        "%": "42",
        "($)": "43",
        "(/)": "44",
        "(+)": "45",
        "(%)": "46"
      };
      return codes;
    };
    Code932.prototype.getCodeValue = function() {
      var codes = {
        "0": "100010100",
        "1": "101001000",
        "2": "101000100",
        "3": "101000010",
        "4": "100101000",
        "5": "100100100",
        "6": "100100010",
        "7": "101010000",
        "8": "100010010",
        "9": "100001010",
        "A": "110101000",
        "B": "110100100",
        "C": "110100010",
        "D": "110010100",
        "E": "110010010",
        "F": "110001010",
        "G": "101101000",
        "H": "101100100",
        "I": "101100010",
        "J": "100110100",
        "K": "100011010",
        "L": "101011000",
        "M": "101001100",
        "N": "101000110",
        "O": "100101100",
        "P": "100010110",
        "Q": "110110100",
        "R": "110110010",
        "S": "110101100",
        "T": "110100110",
        "U": "110010110",
        "V": "110011010",
        "W": "101101100",
        "X": "101100110",
        "Y": "100110110",
        "Z": "100111010",
        "-": "100101110",
        ".": "111010100",
        " ": "111010010",
        "$": "111001010",
        "/": "101101110",
        "+": "101110110",
        "%": "110101110",
        "($)": "100100110",
        "(/)": "111010110",
        "(+)": "100110010",
        "(%)": "111011010"
      };
      return codes;
    };
    Code932.prototype.getPatternCollection = function(givenCharacter, codes, encodingValue) {
      var code = encodingValue;
      for (var i = 0; i < givenCharacter.length; i++) {
        var char = givenCharacter[parseInt(i.toString(), 10)];
        code.push(codes["" + char]);
      }
    };
    Code932.prototype.calculateCheckSum = function(givenCharacter) {
      var value = givenCharacter;
      var weightSum = 0;
      var j = 0;
      var codes = this.getCharacterWeight();
      for (var i = value.length; i > 0; i--) {
        var characterValue = codes[value[parseInt(j.toString(), 10)]] * i;
        weightSum += characterValue;
        j++;
      }
      var moduloValue = weightSum % 47;
      var objectValue = Object.keys(codes);
      var appendSymbol = objectValue[parseInt(moduloValue.toString(), 10)];
      return appendSymbol;
    };
    Code932.prototype.draw = function(canvas) {
      var codes = this.getCodeValue();
      var encodingValue = [];
      var givenCharacter = this.value;
      var startStopCharacter = "101011110";
      var terminationBar = "1";
      if (this.enableCheckSum) {
        givenCharacter += this.calculateCheckSum(givenCharacter);
        givenCharacter += this.calculateCheckSum(givenCharacter);
      }
      encodingValue.push(startStopCharacter);
      this.getPatternCollection(givenCharacter, codes, encodingValue);
      encodingValue.push(startStopCharacter);
      encodingValue.push(terminationBar);
      this.calculateBarCodeAttributes(encodingValue, canvas);
    };
    return Code932;
  }(OneDimension)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/one-dimension/code93Extension.js
var __extends22 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Code93Extension = (
  /** @class */
  function(_super) {
    __extends22(Code93Extension2, _super);
    function Code93Extension2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.barcodeSymbols = [];
      return _this;
    }
    Code93Extension2.prototype.validateInput = function(text) {
      var valueCheck = this.getValue(text);
      if (valueCheck) {
        return void 0;
      } else {
        return "Supports 128 characters of ASCII.";
      }
    };
    Code93Extension2.prototype.getValue = function(text) {
      for (var i = 0; i < text.length; i++) {
        if (text.charCodeAt(i) > 127) {
          return false;
        }
      }
      return true;
    };
    Code93Extension2.prototype.getBars = function() {
      this.barcodeSymbols[0] = {
        value: "",
        checkDigit: 0,
        bars: "111213"
      };
      this.barcodeSymbols[1] = {
        value: "1",
        checkDigit: 1,
        bars: "111213"
      };
      this.barcodeSymbols[2] = {
        value: "2",
        checkDigit: 2,
        bars: "111312 "
      };
      this.barcodeSymbols[3] = {
        value: "3",
        checkDigit: 3,
        bars: "111411 "
      };
      this.barcodeSymbols[4] = {
        value: "4",
        checkDigit: 4,
        bars: "121113"
      };
      this.barcodeSymbols[5] = {
        value: "5",
        checkDigit: 5,
        bars: "121212"
      };
      this.barcodeSymbols[6] = {
        value: "6",
        checkDigit: 6,
        bars: "121311"
      };
      this.barcodeSymbols[7] = {
        value: "7",
        checkDigit: 7,
        bars: "111114"
      };
      this.barcodeSymbols[8] = {
        value: "8",
        checkDigit: 8,
        bars: "131211"
      };
      this.barcodeSymbols[9] = {
        value: "9",
        checkDigit: 9,
        bars: "141111"
      };
      this.barcodeSymbols[10] = {
        value: "A",
        checkDigit: 10,
        bars: "211113"
      };
      this.barcodeSymbols[11] = {
        value: "B",
        checkDigit: 11,
        bars: "211212"
      };
      this.barcodeSymbols[12] = {
        value: "C",
        checkDigit: 12,
        bars: "211311"
      };
      this.barcodeSymbols[13] = {
        value: "D",
        checkDigit: 13,
        bars: "221112"
      };
      this.barcodeSymbols[14] = {
        value: "E",
        checkDigit: 14,
        bars: "221211 "
      };
      this.barcodeSymbols[15] = {
        value: "F",
        checkDigit: 15,
        bars: "231111"
      };
      this.barcodeSymbols[16] = {
        value: "G",
        checkDigit: 16,
        bars: "112113"
      };
      this.barcodeSymbols[17] = {
        value: "H",
        checkDigit: 17,
        bars: "112212"
      };
      this.barcodeSymbols[18] = {
        value: "I",
        checkDigit: 18,
        bars: "112311"
      };
      this.barcodeSymbols[19] = {
        value: "J",
        checkDigit: 19,
        bars: "122112"
      };
      this.barcodeSymbols[20] = {
        value: "K",
        checkDigit: 20,
        bars: "132111 "
      };
      this.barcodeSymbols[21] = {
        value: "L",
        checkDigit: 21,
        bars: "111123"
      };
      this.barcodeSymbols[22] = {
        value: "M",
        checkDigit: 22,
        bars: "111222"
      };
      this.barcodeSymbols[23] = {
        value: "N",
        checkDigit: 23,
        bars: "111321"
      };
      this.barcodeSymbols[24] = {
        value: "O",
        checkDigit: 24,
        bars: "121122 "
      };
      this.barcodeSymbols[25] = {
        value: "P",
        checkDigit: 25,
        bars: "131121 "
      };
      this.barcodeSymbols[26] = {
        value: "Q",
        checkDigit: 26,
        bars: "212112 "
      };
      this.barcodeSymbols[27] = {
        value: "R",
        checkDigit: 27,
        bars: " 212211 "
      };
      this.barcodeSymbols[28] = {
        value: "S",
        checkDigit: 28,
        bars: "211122"
      };
      this.barcodeSymbols[29] = {
        value: "T",
        checkDigit: 29,
        bars: "211221"
      };
      this.barcodeSymbols[30] = {
        value: "U",
        checkDigit: 30,
        bars: "221121"
      };
      this.barcodeSymbols[31] = {
        value: "V",
        checkDigit: 31,
        bars: "222111"
      };
      this.barcodeSymbols[32] = {
        value: "W",
        checkDigit: 32,
        bars: "112122"
      };
      this.barcodeSymbols[33] = {
        value: "X",
        checkDigit: 33,
        bars: "112221"
      };
      this.barcodeSymbols[34] = {
        value: "Y",
        checkDigit: 34,
        bars: "122121"
      };
      this.barcodeSymbols[35] = {
        value: "Z",
        checkDigit: 35,
        bars: " 123111"
      };
      this.barcodeSymbols[36] = {
        value: "-",
        checkDigit: 36,
        bars: "121131"
      };
      this.barcodeSymbols[37] = {
        value: ".",
        checkDigit: 37,
        bars: "311112"
      };
      this.barcodeSymbols[38] = {
        value: " ",
        checkDigit: 38,
        bars: "311211"
      };
      this.barcodeSymbols[39] = {
        value: "$",
        checkDigit: 39,
        bars: "321111"
      };
      this.barcodeSymbols[40] = {
        value: "/",
        checkDigit: 40,
        bars: "112131"
      };
      this.barcodeSymbols[41] = {
        value: "+",
        checkDigit: 41,
        bars: "113121"
      };
      this.barcodeSymbols[42] = {
        value: "%",
        checkDigit: 42,
        bars: "211131"
      };
      this.barcodeSymbols[43] = {
        value: "*",
        checkDigit: 42,
        bars: "111141"
      };
      this.barcodeSymbols[44] = {
        value: "ÿ",
        checkDigit: 47,
        bars: "1111411"
      };
      this.barcodeSymbols[45] = {
        value: "û",
        checkDigit: 43,
        bars: "121220"
      };
      this.barcodeSymbols[46] = {
        value: "ü",
        checkDigit: 44,
        bars: "312111 "
      };
      this.barcodeSymbols[47] = {
        value: "ý",
        checkDigit: 45,
        bars: "311121"
      };
      this.barcodeSymbols[48] = {
        value: "þ",
        checkDigit: 46,
        bars: "122211"
      };
    };
    Code93Extension2.prototype.GetExtendedText = function(string) {
      var code = this.value;
      var extcodes;
      this.extendedText = "";
      for (var i = 0; i < code.length; i++) {
        for (var j = string.length - 1; j > 0; j--) {
          if (string[parseInt(j.toString(), 10)] && string[parseInt(j.toString(), 10)].value && string[parseInt(j.toString(), 10)].character === code[parseInt(i.toString(), 10)]) {
            extcodes = string[parseInt(j.toString(), 10)];
            break;
          }
        }
        if (extcodes.keyword && extcodes.value) {
          this.extendedText += extcodes.keyword + extcodes.value;
        } else if (extcodes.value && extcodes.value) {
          this.extendedText += extcodes.value;
        }
      }
    };
    Code93Extension2.prototype.drawCode93 = function(canvas) {
      this.getBars();
      var temp = [];
      var string = this.getArrayValue();
      this.GetExtendedText(string);
      var checkDigit = this.CalculateCheckDigit();
      for (var i = 0; i < checkDigit.length; i++) {
        this.extendedText += checkDigit[parseInt(i.toString(), 10)];
      }
      temp[0] = "*" + this.extendedText + "ÿ";
      var encodingValue = [];
      encodingValue = this.encoding(temp);
      this.calculateBarCodeAttributes(encodingValue, canvas);
    };
    Code93Extension2.prototype.GetCheckSumSymbols = function() {
      var text = this.extendedText;
      var dataToEncode = text;
      var charArray = [];
      var checkValue = 0;
      var length = dataToEncode.length;
      var numi;
      for (var i = 0; i < length; i++) {
        var num4 = (length - i) % 20;
        if (num4 === 0) {
          num4 = 20;
        }
        for (var j = 0; j < this.barcodeSymbols.length; j++) {
          if (dataToEncode[parseInt(i.toString(), 10)] === this.barcodeSymbols[parseInt(j.toString(), 10)].value) {
            numi = this.barcodeSymbols[parseInt(j.toString(), 10)].checkDigit;
          }
        }
        checkValue += numi * num4;
      }
      checkValue = checkValue % 47;
      var char1 = "";
      for (var k = 0; k < this.barcodeSymbols.length; k++) {
        if (checkValue === this.barcodeSymbols[parseInt(k.toString(), 10)].checkDigit) {
          char1 = this.barcodeSymbols[parseInt(k.toString(), 10)].value;
          break;
        }
      }
      var data = this.extendedText;
      data = data + char1;
      charArray[0] = char1;
      text = data;
      checkValue = 0;
      dataToEncode = text;
      length = dataToEncode.length;
      for (var i = 0; i < length; i++) {
        var num4 = (length - i) % 15;
        if (num4 === 0) {
          num4 = 15;
        }
        for (var m = 0; m < this.barcodeSymbols.length; m++) {
          if (dataToEncode[parseInt(i.toString(), 10)] === this.barcodeSymbols[parseInt(m.toString(), 10)].value) {
            var tempi = this.barcodeSymbols[parseInt(m.toString(), 10)].checkDigit;
            checkValue += tempi * num4;
          }
        }
      }
      checkValue = checkValue % 47;
      text = text + checkValue;
      var char2 = " ";
      for (var i = 0; i < this.barcodeSymbols.length; i++) {
        if (checkValue === this.barcodeSymbols[parseInt(i.toString(), 10)].checkDigit) {
          char2 = this.barcodeSymbols[parseInt(i.toString(), 10)].value;
          break;
        }
      }
      data = data + char2;
      charArray[1] = char2;
      return charArray;
    };
    Code93Extension2.prototype.CalculateCheckDigit = function() {
      var code = this.extendedText;
      var checkValue = 0;
      for (var i = 0; i < code.length; i++) {
        for (var j = 0; j < this.barcodeSymbols.length; j++) {
          if (code[parseInt(i.toString(), 10)] === this.barcodeSymbols[parseInt(j.toString(), 10)].value) {
            checkValue += this.barcodeSymbols[j].checkDigit;
          }
        }
      }
      var ch = this.GetCheckSumSymbols();
      return ch;
    };
    Code93Extension2.prototype.getArrayValue = function() {
      var arrayValue = [];
      arrayValue[0] = {
        character: "\0",
        keyword: "ü",
        value: "U"
      };
      arrayValue[1] = {
        character: "\x0001",
        keyword: "û",
        value: "A"
      };
      arrayValue[2] = {
        character: "\x0002",
        keyword: "x00fb",
        value: "B"
      };
      arrayValue[3] = {
        character: "\x0003",
        keyword: "û",
        value: "C"
      };
      arrayValue[4] = {
        character: "\x0004",
        keyword: "û",
        value: "D"
      };
      arrayValue[5] = {
        character: "\x0005",
        keyword: "û",
        value: "E"
      };
      arrayValue[6] = {
        character: "\x0006",
        keyword: "û",
        value: "F"
      };
      arrayValue[7] = {
        character: "a",
        keyword: "û",
        value: "G"
      };
      arrayValue[8] = {
        character: "\b",
        keyword: "û",
        value: "H"
      };
      arrayValue[9] = {
        character: "	",
        keyword: "û",
        value: "I"
      };
      arrayValue[10] = {
        character: "\n",
        keyword: "û",
        value: "J"
      };
      arrayValue[12] = {
        character: "\v",
        keyword: "û",
        value: "K"
      };
      arrayValue[13] = {
        character: "\f",
        keyword: "û",
        value: "L"
      };
      arrayValue[14] = {
        character: "\r",
        keyword: "û",
        value: "M"
      };
      arrayValue[15] = {
        character: "\x000e",
        keyword: "û",
        value: "N"
      };
      arrayValue[16] = {
        character: "\x000f",
        keyword: "û",
        value: "O"
      };
      arrayValue[17] = {
        character: "\x0010",
        keyword: "û",
        value: "P"
      };
      arrayValue[18] = {
        character: "\x0011",
        keyword: "û",
        value: "Q"
      };
      arrayValue[19] = {
        character: "\x0012",
        keyword: "û",
        value: "R"
      };
      arrayValue[20] = {
        character: "\x0013",
        keyword: "û",
        value: "S"
      };
      arrayValue[21] = {
        character: "\x0014",
        keyword: "û",
        value: "T"
      };
      arrayValue[22] = {
        character: "\x0015",
        keyword: "û",
        value: "U"
      };
      arrayValue[23] = {
        character: "\x0016",
        keyword: "û",
        value: "V"
      };
      arrayValue[24] = {
        character: "\x0017",
        keyword: "û",
        value: "W"
      };
      arrayValue[25] = {
        character: "\x0018",
        keyword: "û",
        value: "X"
      };
      arrayValue[26] = {
        character: "\x0019",
        keyword: "û",
        value: "Y"
      };
      arrayValue[27] = {
        character: "\x001a",
        keyword: "û",
        value: "Z"
      };
      arrayValue[28] = {
        character: "\x001b",
        keyword: "ü",
        value: "A"
      };
      arrayValue[29] = {
        character: "\x001c",
        keyword: "ü",
        value: "B"
      };
      arrayValue[30] = {
        character: "\x001d",
        keyword: "ü",
        value: "C"
      };
      arrayValue[31] = {
        character: "\x001e",
        keyword: "ü",
        value: "D"
      };
      arrayValue[32] = {
        character: "\x001f",
        keyword: "ü",
        value: "E"
      };
      arrayValue[33] = {
        character: " ",
        keyword: " "
      };
      arrayValue[34] = {
        character: "!",
        keyword: "ý",
        value: "A"
      };
      arrayValue[35] = {
        character: '"',
        keyword: "ý",
        value: "B"
      };
      arrayValue[36] = {
        character: "#",
        keyword: "ý",
        value: "C"
      };
      arrayValue[37] = {
        character: "$",
        keyword: "ý",
        value: "D"
      };
      arrayValue[38] = {
        character: "%",
        keyword: "ý",
        value: "E"
      };
      arrayValue[39] = {
        character: "&",
        keyword: "ý",
        value: "F"
      };
      arrayValue[40] = {
        character: "'",
        keyword: "ý",
        value: "G"
      };
      arrayValue[41] = {
        character: "(",
        keyword: "ý",
        value: "H"
      };
      arrayValue[42] = {
        character: ")",
        keyword: "ý",
        value: "I"
      };
      arrayValue[43] = {
        character: "*",
        keyword: "ý",
        value: "J"
      };
      arrayValue[44] = {
        character: "+",
        keyword: "ý",
        value: "K"
      };
      arrayValue[45] = {
        character: ",",
        keyword: "ý",
        value: "L"
      };
      arrayValue[46] = {
        character: "-",
        keyword: "ý",
        value: "M"
      };
      arrayValue[47] = {
        character: ".",
        keyword: "ý",
        value: "N"
      };
      arrayValue[48] = {
        character: "/",
        keyword: "ý",
        value: "O"
      };
      arrayValue[49] = {
        character: "0",
        value: "0"
      };
      arrayValue[50] = {
        character: "1",
        value: "1"
      };
      arrayValue[51] = {
        character: "2",
        value: "2"
      };
      arrayValue[52] = {
        character: "3",
        value: "3"
      };
      arrayValue[53] = {
        character: "4",
        value: "4"
      };
      arrayValue[54] = {
        character: "5",
        value: "5"
      };
      arrayValue[55] = {
        character: "6",
        value: "6"
      };
      arrayValue[56] = {
        character: "7",
        value: "7"
      };
      arrayValue[57] = {
        character: "8",
        value: "8"
      };
      arrayValue[58] = {
        character: "9",
        value: "9"
      };
      arrayValue[59] = {
        character: ":",
        keyword: "ý",
        value: "Z"
      };
      arrayValue[60] = {
        character: ";",
        keyword: "ü",
        value: "F"
      };
      arrayValue[61] = {
        character: "<",
        keyword: "ü",
        value: "G"
      };
      arrayValue[62] = {
        character: "=",
        keyword: "ü",
        value: "H"
      };
      arrayValue[63] = {
        character: ">",
        keyword: "ü",
        value: "I"
      };
      arrayValue[64] = {
        character: "?",
        keyword: "ü",
        value: "J"
      };
      arrayValue[65] = {
        character: "@",
        keyword: "ü",
        value: "V"
      };
      arrayValue[66] = {
        character: "A",
        value: "A"
      };
      arrayValue[67] = {
        character: "B",
        value: "B"
      };
      arrayValue[68] = {
        character: "C",
        value: "C"
      };
      arrayValue[69] = {
        character: "D",
        value: "D"
      };
      arrayValue[70] = {
        character: "E",
        value: "E"
      };
      arrayValue[71] = {
        character: "F",
        value: "F"
      };
      arrayValue[72] = {
        character: "G",
        value: "G"
      };
      arrayValue[73] = {
        character: "H",
        value: "H"
      };
      arrayValue[74] = {
        character: "I",
        value: "I"
      };
      arrayValue[75] = {
        character: "J",
        value: "J"
      };
      arrayValue[76] = {
        character: "K",
        value: "K"
      };
      arrayValue[77] = {
        character: "L",
        value: "L"
      };
      arrayValue[78] = {
        character: "M",
        value: "M"
      };
      arrayValue[79] = {
        character: "N",
        value: "N"
      };
      arrayValue[80] = {
        character: "O",
        value: "O"
      };
      arrayValue[81] = {
        character: "P",
        value: "P"
      };
      arrayValue[82] = {
        character: "Q",
        value: "Q"
      };
      arrayValue[83] = {
        character: "R",
        value: "R"
      };
      arrayValue[84] = {
        character: "S",
        value: "S"
      };
      arrayValue[85] = {
        character: "T",
        value: "T"
      };
      arrayValue[86] = {
        character: "U",
        value: "U"
      };
      arrayValue[87] = {
        character: "V",
        value: "V"
      };
      arrayValue[88] = {
        character: "W",
        value: "W"
      };
      arrayValue[88] = {
        character: "X",
        value: "X"
      };
      arrayValue[89] = {
        character: "Y",
        value: "Y"
      };
      arrayValue[90] = {
        character: "Z",
        value: "Z"
      };
      arrayValue[91] = {
        character: "[",
        keyword: "ü",
        value: "K"
      };
      arrayValue[92] = {
        character: "\\",
        keyword: "ü",
        value: "L"
      };
      arrayValue[93] = {
        character: "]",
        keyword: "ü",
        value: "M"
      };
      arrayValue[94] = {
        character: "^",
        keyword: "ü",
        value: "N"
      };
      arrayValue[95] = {
        character: "_",
        keyword: "ü",
        value: "O"
      };
      arrayValue[96] = {
        character: "`",
        keyword: "ü",
        value: "W"
      };
      arrayValue[97] = {
        character: "a",
        keyword: "þ",
        value: "A"
      };
      arrayValue[98] = {
        character: "b",
        keyword: "þ",
        value: "B"
      };
      arrayValue[99] = {
        character: "c",
        keyword: "þ",
        value: "C"
      };
      arrayValue[100] = {
        character: "d",
        keyword: "þ",
        value: "D"
      };
      arrayValue[101] = {
        character: "e",
        keyword: "þ",
        value: "E"
      };
      arrayValue[102] = {
        character: "f",
        keyword: "þ",
        value: "F"
      };
      arrayValue[103] = {
        character: "g",
        keyword: "þ",
        value: "G"
      };
      arrayValue[104] = {
        character: "h",
        keyword: "þ",
        value: "H"
      };
      arrayValue[105] = {
        character: "i",
        keyword: "þ",
        value: "I"
      };
      arrayValue[106] = {
        character: "j",
        keyword: "þ",
        value: "J"
      };
      arrayValue[107] = {
        character: "k",
        keyword: "þ",
        value: "K"
      };
      arrayValue[108] = {
        character: "l",
        keyword: "þ",
        value: "L"
      };
      arrayValue[109] = {
        character: "m",
        keyword: "þ",
        value: "M"
      };
      arrayValue[110] = {
        character: "n",
        keyword: "þ",
        value: "N"
      };
      arrayValue[111] = {
        character: "o",
        keyword: "þ",
        value: "O"
      };
      arrayValue[112] = {
        character: "p",
        keyword: "þ",
        value: "P"
      };
      arrayValue[113] = {
        character: "q",
        keyword: "þ",
        value: "Q"
      };
      arrayValue[114] = {
        character: "r",
        keyword: "þ",
        value: "R"
      };
      arrayValue[115] = {
        character: "s",
        keyword: "þ",
        value: "S"
      };
      arrayValue[116] = {
        character: "t",
        keyword: "þ",
        value: "T"
      };
      arrayValue[117] = {
        character: "u",
        keyword: "þ",
        value: "U"
      };
      arrayValue[118] = {
        character: "v",
        keyword: "þ",
        value: "V"
      };
      arrayValue[119] = {
        character: "w",
        keyword: "þ",
        value: "W"
      };
      arrayValue[120] = {
        character: "x",
        keyword: "þ",
        value: "X"
      };
      arrayValue[121] = {
        character: "y",
        keyword: "þ",
        value: "Y"
      };
      arrayValue[122] = {
        character: "z",
        keyword: "þ",
        value: "Z"
      };
      arrayValue[123] = {
        character: "{",
        keyword: "ü",
        value: "P"
      };
      arrayValue[124] = {
        character: "|",
        keyword: "ü",
        value: "Q"
      };
      arrayValue[125] = {
        character: "}",
        keyword: "ü",
        value: "R"
      };
      arrayValue[126] = {
        character: "~",
        keyword: "ü",
        value: "S"
      };
      return arrayValue;
    };
    Code93Extension2.prototype.encoding = function(string) {
      var temp = [];
      for (var j = 0; j < string.length; j++) {
        for (var k = 0; k < string[parseInt(j.toString(), 10)].length; k++) {
          for (var i = 0; i < this.barcodeSymbols.length; i++) {
            if (string[parseInt(j.toString(), 10)][parseInt(k.toString(), 10)] === this.barcodeSymbols[parseInt(i.toString(), 10)].value) {
              temp[parseInt(k.toString(), 10)] = this.barcodeSymbols[parseInt(i.toString(), 10)].bars;
            }
          }
        }
      }
      return temp;
    };
    return Code93Extension2;
  }(Code93)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/one-dimension/code32.js
var __extends23 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Code32 = (
  /** @class */
  function(_super) {
    __extends23(Code322, _super);
    function Code322() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Code322.prototype.validateInput = function(char) {
      if (char.length === 8 && char.match(/^[0-9]+$/)) {
        return void 0;
      } else {
        return "Accepts 9 numeric characters.";
      }
    };
    Code322.prototype.getCodeValue = function() {
      var symbolTable = [["0", 0, ["111331311"]], ["1", 1, ["311311113"]], ["2", 2, ["113311113"]], ["3", 3, ["313311111"]], ["4", 4, ["111331113"]], ["5", 5, ["311331111"]], ["6", 6, ["113331111"]], ["7", 7, ["111311313"]], ["8", 8, ["311311311"]], ["9", 9, ["113311311"]], ["A", 10, ["113113113"]], ["B", 11, ["113113113"]], ["C", 12, ["313113111"]], ["D", 13, ["111133113"]], ["E", 14, ["221211"]], ["F", 15, ["113133111"]], ["G", 16, ["111113313"]], ["H", 17, ["311113311"]], ["I", 18, ["112311"]], ["J", 19, ["111133311"]], ["K", 20, ["311111133"]], ["L", 21, ["113111133"]], ["M", 22, ["313111131"]], ["N", 23, ["111131133"]], ["O", 24, ["121122"]], ["P", 25, ["113131131"]], ["Q", 26, ["111111333"]], ["R", 27, ["311111331"]], ["S", 28, ["113111331"]], ["T", 29, ["111131331"]], ["U", 30, ["331111113"]], ["V", 31, ["133111113"]], ["W", 32, ["333111111"]], ["X", 33, ["131131113"]], ["Y", 34, ["331131111"]], ["Z", 35, ["133131111"]], ["*", 0, ["131131311"]]];
      return symbolTable;
    };
    Code322.prototype.getPatternCollection = function(givenChar) {
      var code = [];
      var codes = this.getCodeValue();
      for (var i = 0; i <= givenChar.length; i++) {
        for (var j = 0; j < codes.length; j++) {
          if (givenChar[parseInt(i.toString(), 10)] === codes[parseInt(j.toString(), 10)][0]) {
            code.push(codes[parseInt(j.toString(), 10)][2][0]);
          }
        }
      }
      return code;
    };
    Code322.prototype.draw = function(canvas) {
      var value = this.value;
      var givenChar = "*" + value + "*";
      var codes = this.getPatternCollection(givenChar);
      this.calculateBarCodeAttributes(codes, canvas);
    };
    return Code322;
  }(OneDimension)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/one-dimension/code39Extension.js
var __extends24 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var Code39Extension = (
  /** @class */
  function(_super) {
    __extends24(Code39Extension2, _super);
    function Code39Extension2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Code39Extension2.prototype.code39ExtensionValues = function() {
      var codes = {
        "0": "%U",
        "1": "$A",
        "2": "$B",
        "3": "$C",
        "4": "$D",
        "5": "$E",
        "6": "$F",
        "7": "$G",
        "8": "$H",
        "9": "$I",
        "10": "$J",
        "11": "$K",
        "12": "$L",
        "13": "$M",
        "14": "$N",
        "15": "$O",
        "16": "$P",
        "17": "$Q",
        "18": "$R",
        "19": "$S",
        "20": "$T",
        "21": "$U",
        "22": "$V",
        "23": "$W",
        "24": "$X",
        "25": "$Y",
        "26": "$Z",
        "27": "%A",
        "28": "%B",
        "29": "%C",
        "30": "%D",
        "31": "%E",
        "32": " ",
        "33": "/A",
        "34": "/B",
        "35": "/C",
        "36": "/D",
        "37": "/E",
        "38": "/F",
        "39": "/G",
        "40": "/H",
        "41": "/I",
        "42": "/J",
        "43": "/K",
        "44": "/L",
        "45": "-",
        "46": ".",
        "47": "/O",
        "48": "0",
        "49": "1",
        "50": "2",
        "51": "3",
        "52": "4",
        "53": "5",
        "54": "6",
        "55": "7",
        "56": "8",
        "57": "9",
        "58": "/Z",
        "59": "%F",
        "60": "%G",
        "61": "%H",
        "62": "%I",
        "63": "%J",
        "64": "%V",
        "65": "A",
        "66": "B",
        "67": "C",
        "68": "D",
        "69": "E",
        "70": "F",
        "71": "G",
        "72": "H",
        "73": "I",
        "74": "J",
        "75": "K",
        "76": "L",
        "77": "M",
        "78": "N",
        "79": "O",
        "80": "P",
        "81": "Q",
        "82": "R",
        "83": "S",
        "84": "T",
        "85": "U",
        "86": "V",
        "87": "W",
        "88": "X",
        "89": "Y",
        "90": "Z",
        "91": "%K",
        "92": "%L",
        "93": "%M",
        "94": "%N",
        "95": "%O",
        "96": "%W",
        "97": "+A",
        "98": "+B",
        "99": "+C",
        "100": "+D",
        "101": "+E",
        "102": "+F",
        "103": "+G",
        "104": "+H",
        "105": "+I",
        "106": "+J",
        "107": "+K",
        "108": "+L",
        "109": "+M",
        "110": "+N",
        "111": "+O",
        "112": "+P",
        "113": "+Q",
        "114": "+R",
        "115": "+S",
        "116": "+T",
        "117": "+U",
        "118": "+V",
        "119": "+W",
        "120": "+X",
        "121": "+Y",
        "122": "+Z",
        "123": "%P",
        "124": "%Q",
        "125": "	%R",
        "126": "%S",
        "127": "%T"
      };
      return codes;
    };
    Code39Extension2.prototype.validateInput = function(char) {
      var asciiCheck = this.checkText(char);
      if (asciiCheck) {
        return void 0;
      } else {
        return "Supports 128 characters of ASCII.";
      }
    };
    Code39Extension2.prototype.checkText = function(char) {
      for (var i = 0; i < char.length; i++) {
        if (char.charCodeAt(i) > 127) {
          return false;
        }
      }
      return true;
    };
    Code39Extension2.prototype.code39Extension = function(givenCharacter) {
      var encodedString = "";
      var code = this.code39ExtensionValues();
      var asciivalue;
      for (var i = 0; i < givenCharacter.length; i++) {
        asciivalue = givenCharacter[parseInt(i.toString(), 10)].charCodeAt(0);
        encodedString += code[parseInt(asciivalue.toString(), 10)];
      }
      return encodedString;
    };
    Code39Extension2.prototype.drawCode39 = function(canvas) {
      var givenCharacter = this.value;
      var encodedCharacter = this.code39Extension(givenCharacter);
      this.drawCode39Extension(canvas, encodedCharacter);
    };
    return Code39Extension2;
  }(Code39)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/utility/barcode-util.js
function removeChildElements(newProp, barcodeCanvas, mode, id) {
  var barCodeSVG = barcodeCanvas;
  if (mode === "SVG" && !newProp.mode) {
    barCodeSVG.innerHTML = "";
  } else if (newProp.mode) {
    barCodeSVG.parentNode.removeChild(barCodeSVG);
  }
  return new BarcodeRenderer(id, mode === "SVG");
}
function getBaseAttributes(width, height, offSetX, offsetY, color, strokeColor) {
  var options = {
    width,
    height,
    x: offSetX,
    y: offsetY,
    color,
    strokeColor
  };
  return options;
}
function clearCanvas(view, barcodeCanvas) {
  var width = view.element.offsetWidth * 1.5;
  var height = view.element.offsetHeight * 1.5;
  var ctx = BarcodeCanvasRenderer.getContext(barcodeCanvas);
  ctx.clearRect(0, 0, width, height);
}
function refreshCanvasBarcode(qrCodeGenerator, barcodeCanvas) {
  clearCanvas(qrCodeGenerator, barcodeCanvas);
}
function triggerDownload(type, fileName, url) {
  var anchorElement = document.createElement("a");
  anchorElement.download = fileName + "." + type.toLocaleLowerCase();
  anchorElement.href = url;
  anchorElement.click();
}
function exportAsImage(exportType, fileName, element, isReturnBase64, code) {
  var returnValue = imageExport(exportType, fileName, element, isReturnBase64, code);
  if (returnValue instanceof Promise) {
    returnValue.then(function(data) {
      return data;
    });
  }
  return returnValue;
}
function imageExport(type, fileName, element, isReturnBase64, code) {
  var promise = new Promise(function(resolve, reject) {
    var canvas = element.children[0];
    var serializer = "XMLSerializer";
    var canvasElement = document.createElement("canvas");
    canvasElement.height = element.clientHeight;
    canvasElement.width = element.clientWidth;
    var context = canvasElement.getContext("2d");
    var image = new Image();
    image.onload = function() {
      context.drawImage(image, 0, 0);
      if (!isReturnBase64) {
        triggerDownload(type, fileName, canvasElement.toDataURL("image/png").replace("image/png", "image/octet-stream"));
        resolve(null);
      } else {
        var base64String = type === "JPG" ? canvasElement.toDataURL("image/jpg") : canvasElement.toDataURL("image/png");
        resolve(base64String);
      }
    };
    if (code.mode === "Canvas") {
      image.src = type === "JPG" ? canvas.toDataURL("image/jpg") : canvas.toDataURL("image/png");
      canvasElement.height = element.clientHeight * 1.5;
      canvasElement.width = element.clientWidth * 1.5;
      context.scale(2 / 3, 2 / 3);
    } else {
      image.src = window.URL.createObjectURL(new Blob([new window["" + serializer]().serializeToString(element.children[0])], {
        type: "image/svg+xml"
      }));
    }
  });
  return promise;
}

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/barcode.js
var __extends25 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate10 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BarcodeGenerator = (
  /** @class */
  function(_super) {
    __extends25(BarcodeGenerator2, _super);
    function BarcodeGenerator2(options, element) {
      return _super.call(this, options, element) || this;
    }
    BarcodeGenerator2.prototype.triggerEvent = function(eventName, message) {
      var arg = {
        message
      };
      this.trigger(BarcodeEvent["" + eventName], arg);
    };
    BarcodeGenerator2.prototype.onPropertyChanged = function(newProp, oldProp) {
      if (this.mode === "Canvas" && newProp.mode !== "Canvas") {
        this.refreshCanvasBarcode();
      } else {
        this.barcodeRenderer = removeChildElements(newProp, this.barcodeCanvas, this.mode, this.element.id);
      }
      if (newProp.width) {
        this.barcodeCanvas.setAttribute("width", String(newProp.width));
      }
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "width":
            this.element.style.width = this.getElementSize(this.width);
            this.barcodeCanvas.setAttribute("width", String(this.element.offsetWidth));
            break;
          case "height":
            this.element.style.height = this.getElementSize(this.height);
            this.barcodeCanvas.setAttribute("height", String(this.element.offsetHeight));
            break;
          case "backgroundColor":
            this.barcodeCanvas.setAttribute("style", "background:" + newProp.backgroundColor);
            break;
          case "mode":
            this.initialize();
        }
      }
      this.renderElements();
    };
    BarcodeGenerator2.prototype.initialize = function() {
      this.element.style.display = "block";
      this.element.style.height = this.getElementSize(this.height);
      this.element.style.width = this.getElementSize(this.width);
      var height = this.mode === "SVG" ? this.element.offsetHeight : this.element.offsetHeight * 1.5;
      var width = this.mode === "SVG" ? this.element.offsetWidth : this.element.offsetWidth * 1.5;
      this.barcodeCanvas = this.barcodeRenderer.renderRootElement({
        id: this.element.id + "content",
        height,
        width
      }, this.backgroundColor, width, height);
      this.element.appendChild(this.barcodeCanvas);
    };
    BarcodeGenerator2.prototype.exportImage = function(filename, exportType) {
      exportAsImage(exportType, filename, this.element, false, this);
    };
    BarcodeGenerator2.prototype.exportAsBase64Image = function(exportType) {
      var returnValue = exportAsImage(exportType, "", this.element, true, this);
      return returnValue;
    };
    BarcodeGenerator2.prototype.renderElements = function() {
      var barCode;
      switch (this.type) {
        case "Code39Extension":
          barCode = new Code39Extension();
          break;
        case "Code39":
          barCode = new Code39();
          break;
        case "Codabar":
          barCode = new CodaBar();
          break;
        case "Code128A":
          barCode = new Code128A();
          break;
        case "Code128B":
          barCode = new Code128B();
          break;
        case "Code128C":
          barCode = new Code128C();
          break;
        case "Code128":
          barCode = new Code128();
          break;
        case "Ean8":
          barCode = new Ean8();
          break;
        case "Ean13":
          barCode = new Ean13();
          break;
        case "UpcA":
          barCode = new UpcA();
          break;
        case "UpcE":
          barCode = new UpcE();
          break;
        case "Code11":
          barCode = new Code11();
          break;
        case "Code93":
          barCode = new Code93();
          break;
        case "Code93Extension":
          barCode = new Code93Extension();
          break;
        case "Code32":
          barCode = new Code32();
          break;
      }
      if (this.mode === "Canvas") {
        this.barcodeCanvas.getContext("2d").setTransform(1, 0, 0, 1, 0, 0);
        this.barcodeCanvas.getContext("2d").scale(1.5, 1.5);
      }
      barCode.width = this.barcodeCanvas.getAttribute("width");
      if ((this.type === "Ean8" || this.type === "Ean13" || this.type === "UpcA") && this.displayText.text.length > 0) {
        this.triggerEvent(BarcodeEvent.invalid, "Invalid Display Text");
      }
      barCode.value = this.value;
      barCode.margin = this.margin;
      barCode.type = this.type;
      barCode.height = this.barcodeCanvas.getAttribute("height");
      barCode.foreColor = this.foreColor;
      barCode.isSvgMode = this.mode === "SVG" ? true : false;
      barCode.displayText = this.displayText;
      barCode.enableCheckSum = this.enableCheckSum;
      var validateMessage = barCode.validateInput(this.value);
      if (validateMessage === void 0) {
        if (this.type === "Code39Extension") {
          barCode.drawCode39(this.barcodeCanvas);
        } else if (this.type === "Code93Extension") {
          barCode.drawCode93(this.barcodeCanvas);
        } else {
          barCode.draw(this.barcodeCanvas);
        }
      } else {
        this.triggerEvent(BarcodeEvent.invalid, validateMessage);
      }
      if (this.mode === "Canvas") {
        this.barcodeCanvas.style.transform = "scale(" + 2 / 3 + ")";
        this.barcodeCanvas.style.transformOrigin = "0 0";
      }
    };
    BarcodeGenerator2.prototype.refreshCanvasBarcode = function() {
      this.clearCanvas(this);
    };
    BarcodeGenerator2.prototype.clearCanvas = function(view) {
      var width = view.element.offsetWidth;
      var height = view.element.offsetHeight;
      if (view.mode !== "SVG") {
        var ctx = BarcodeCanvasRenderer.getContext(this.barcodeCanvas);
        ctx.clearRect(0, 0, width, height);
      }
    };
    BarcodeGenerator2.prototype.getPersistData = function() {
      var keyEntity = ["loaded"];
      return this.addOnPersist(keyEntity);
    };
    BarcodeGenerator2.prototype.getElementSize = function(real, rulerSize) {
      var value;
      if (real.toString().indexOf("px") > 0 || real.toString().indexOf("%") > 0) {
        value = real.toString();
      } else {
        value = real.toString() + "px";
      }
      return value;
    };
    BarcodeGenerator2.prototype.preRender = function() {
      this.element.classList.add("e-barcode");
      this.barcodeRenderer = new BarcodeRenderer(this.element.id, this.mode === "SVG");
      this.initialize();
      this.initializePrivateVariables();
      this.setCulture();
      var measureElement = document.getElementsByClassName("barcodeMeasureElement");
      if (measureElement.length > 0) {
        for (var i = measureElement.length - 1; i >= 0; i--) {
          measureElement[parseInt(i.toString(), 10)].parentNode.removeChild(measureElement[parseInt(i.toString(), 10)]);
        }
        var element = "barcodeMeasureElement";
        window["" + element] = null;
      }
    };
    BarcodeGenerator2.prototype.initializePrivateVariables = function() {
      this.defaultLocale = {};
    };
    BarcodeGenerator2.prototype.setCulture = function() {
      this.localeObj = new L10n(this.getModuleName(), this.defaultLocale, this.locale);
    };
    BarcodeGenerator2.prototype.render = function() {
      this.notify("initial-load", {});
      this.trigger("load");
      this.notify("initial-end", {});
      this.renderElements();
      this.renderComplete();
    };
    BarcodeGenerator2.prototype.getModuleName = function() {
      return "barcode";
    };
    BarcodeGenerator2.prototype.requiredModules = function() {
      var modules = [];
      return modules;
    };
    BarcodeGenerator2.prototype.destroy = function() {
      this.notify("destroy", {});
      _super.prototype.destroy.call(this);
      var content = document.getElementById(this.element.id + "content");
      if (content) {
        this.element.removeChild(content);
      }
    };
    __decorate10([Property("100%")], BarcodeGenerator2.prototype, "width", void 0);
    __decorate10([Property("100px")], BarcodeGenerator2.prototype, "height", void 0);
    __decorate10([Property("SVG")], BarcodeGenerator2.prototype, "mode", void 0);
    __decorate10([Property("Code128")], BarcodeGenerator2.prototype, "type", void 0);
    __decorate10([Property(void 0)], BarcodeGenerator2.prototype, "value", void 0);
    __decorate10([Property(true)], BarcodeGenerator2.prototype, "enableCheckSum", void 0);
    __decorate10([Complex({}, DisplayText)], BarcodeGenerator2.prototype, "displayText", void 0);
    __decorate10([Complex({}, Margin)], BarcodeGenerator2.prototype, "margin", void 0);
    __decorate10([Property("white")], BarcodeGenerator2.prototype, "backgroundColor", void 0);
    __decorate10([Property("black")], BarcodeGenerator2.prototype, "foreColor", void 0);
    __decorate10([Event2()], BarcodeGenerator2.prototype, "invalid", void 0);
    return BarcodeGenerator2;
  }(Component2)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/primitives/point.js
var __extends26 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate11 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Point = (
  /** @class */
  function(_super) {
    __extends26(Point2, _super);
    function Point2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate11([Property(0)], Point2.prototype, "x", void 0);
    __decorate11([Property(0)], Point2.prototype, "y", void 0);
    return Point2;
  }(ChildProperty)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/rendering/canvas-interface.js
var BarcodeSVGRenderer = (
  /** @class */
  function() {
    function BarcodeSVGRenderer2() {
    }
    BarcodeSVGRenderer2.prototype.renderRootElement = function(attribute) {
      var canvasObj = createHtmlElement("canvase", attribute);
      return canvasObj;
    };
    BarcodeSVGRenderer2.prototype.renderRect = function(canvas, attribute) {
      var canvasObj = createHtmlElement("canvase", attribute);
      return canvasObj;
    };
    BarcodeSVGRenderer2.prototype.renderLine = function(canvas, attribute) {
      var canvasObj = createHtmlElement("canvase", attribute);
      return canvasObj;
    };
    BarcodeSVGRenderer2.prototype.renderText = function(canvas, attribute) {
      var canvasObj = createHtmlElement("canvase", attribute);
      return canvasObj;
    };
    return BarcodeSVGRenderer2;
  }()
);

// node_modules/@syncfusion/ej2-barcode-generator/src/qrcode/qr-barcode-values.js
var PdfQRBarcodeValues = (
  /** @class */
  function() {
    function PdfQRBarcodeValues2(version, errorCorrectionLevel) {
      this.numberOfErrorCorrectingCodeWords = [7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72, 88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198, 288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430];
      this.cp437CharSet = ["2591", "2592", "2593", "2502", "2524", "2561", "2562", "2556", "2555", "2563", "2551", "2557", "255D", "255C", "255B", "2510", "2514", "2534", "252C", "251C", "2500", "253C", "255E", "255F", "255A", "2554", "2569", "2566", "2560", "2550", "256C", "2567", "2568", "2564", "2565", "2559", "2558", "2552", "2553", "256B", "256A", "2518", "250C", "2588", "2584", "258C", "2590", "2580", "25A0"];
      this.iso88592CharSet = ["104", "2D8", "141", "13D", "15A", "160", "15E", "164", "179", "17D", "17B", "105", "2DB", "142", "13E", "15B", "2C7", "161", "15F", "165", "17A", "2DD", "17E", "17C", "154", "102", "139", "106", "10C", "118", "11A", "10E", "110", "143", "147", "150", "158", "16E", "170", "162", "155", "103", "13A", "107", "10D", "119", "11B", "10F", "111", "144", "148", "151", "159", "16F", "171", "163", "2D9"];
      this.iso88593CharSet = ["126", "124", "130", "15E", "11E", "134", "17B", "127", "125", "131", "15F", "11F", "135", "17C", "10A", "108", "120", "11C", "16C", "15C", "10B", "109", "121", "11D", "16D", "15D"];
      this.iso88594CharSet = ["104", "138", "156", "128", "13B", "160", "112", "122", "166", "17D", "105", "2DB", "157", "129", "13C", "2C7", "161", "113", "123", "167", "14A", "17E", "14B", "100", "12E", "10C", "118", "116", "12A", "110", "145", "14C", "136", "172", "168", "16A", "101", "12F", "10D", "119", "117", "12B", "111", "146", "14D", "137", "173", "169", "16B"];
      this.windows1250CharSet = ["141", "104", "15E", "17B", "142", "105", "15F", "13D", "13E", "17C"];
      this.windows1251CharSet = ["402", "403", "453", "409", "40A", "40C", "40B", "40F", "452", "459", "45A", "45C", "45B", "45F", "40E", "45E", "408", "490", "401", "404", "407", "406", "456", "491", "451", "454", "458", "405", "455", "457"];
      this.windows1252CharSet = ["20AC", "201A", "192", "201E", "2026", "2020", "2021", "2C6", "2030", "160", "2039", "152", "17D", "2018", "2019", "201C", "201D", "2022", "2013", "2014", "2DC", "2122", "161", "203A", "153", "17E", "178"];
      this.windows1256CharSet = ["67E", "679", "152", "686", "698", "688", "6AF", "6A9", "691", "153", "6BA", "6BE", "6C1", "644", "645", "646", "647", "648", "649", "64A", "6D2"];
      this.cp437ReplaceNumber = [176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 254];
      this.iso88592ReplaceNumber = [161, 162, 163, 165, 166, 169, 170, 171, 172, 174, 175, 177, 178, 179, 181, 182, 183, 185, 186, 187, 188, 189, 190, 191, 192, 195, 197, 198, 200, 202, 204, 207, 208, 209, 210, 213, 216, 217, 219, 222, 224, 227, 229, 230, 232, 234, 236, 239, 240, 241, 242, 245, 248, 249, 251, 254, 255];
      this.iso88593ReplaceNumber = [161, 166, 169, 170, 171, 172, 175, 177, 182, 185, 186, 187, 188, 191, 197, 198, 213, 216, 221, 222, 229, 230, 245, 248, 253, 254];
      this.iso88594ReplaceNumber = [161, 162, 163, 165, 166, 169, 170, 171, 172, 174, 177, 178, 179, 181, 182, 183, 185, 186, 187, 188, 189, 190, 191, 192, 199, 200, 202, 204, 207, 208, 209, 210, 211, 217, 221, 222, 224, 231, 232, 234, 236, 239, 240, 241, 242, 243, 249, 253, 254];
      this.windows1250ReplaceNumber = [163, 165, 170, 175, 179, 185, 186, 188, 190, 191];
      this.windows1251ReplaceNumber = [128, 129, 131, 138, 140, 141, 142, 143, 144, 154, 156, 157, 158, 159, 161, 162, 163, 165, 168, 170, 175, 178, 179, 180, 184, 186, 188, 189, 190, 191];
      this.windows1252ReplaceNumber = [128, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 142, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 158, 159];
      this.windows1256ReplaceNumber = [129, 138, 140, 141, 142, 143, 144, 152, 154, 156, 159, 170, 192, 225, 227, 228, 229, 230, 236, 237, 255];
      this.endValues = [208, 359, 567, 807, 1079, 1383, 1568, 1936, 2336, 2768, 3232, 3728, 4256, 4651, 5243, 5867, 6523, 7211, 7931, 8683, 9252, 10068, 10916, 11796, 12708, 13652, 14628, 15371, 16411, 17483, 18587, 19723, 20891, 22091, 23008, 24272, 25568, 26896, 28256, 29648];
      this.dataCapacityValues = [26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706];
      this.numericDataCapacityLow = [41, 77, 127, 187, 255, 322, 370, 461, 552, 652, 772, 883, 1022, 1101, 1250, 1408, 1548, 1725, 1903, 2061, 2232, 2409, 2620, 2812, 3057, 3283, 3517, 3669, 3909, 4158, 4417, 4686, 4965, 5253, 5529, 5836, 6153, 6479, 6743, 7089];
      this.numericDataCapacityMedium = [34, 63, 101, 149, 202, 255, 293, 365, 432, 513, 604, 691, 796, 871, 991, 1082, 1212, 1346, 1500, 1600, 1708, 1872, 2059, 2188, 2395, 2544, 2701, 2857, 3035, 3289, 3486, 3693, 3909, 4134, 4343, 4588, 4775, 5039, 5313, 5596];
      this.numericDataCapacityQuartile = [27, 48, 77, 111, 144, 178, 207, 259, 312, 364, 427, 489, 580, 621, 703, 775, 876, 948, 1063, 1159, 1224, 1358, 1468, 1588, 1718, 1804, 1933, 2085, 2181, 2358, 2473, 2670, 2805, 2949, 3081, 3244, 3417, 3599, 3791, 3993];
      this.numericDataCapacityHigh = [17, 34, 58, 82, 106, 139, 154, 202, 235, 288, 331, 374, 427, 468, 530, 602, 674, 746, 813, 919, 969, 1056, 1108, 1228, 1286, 1425, 1501, 1581, 1677, 1782, 1897, 2022, 2157, 2301, 2361, 2524, 2625, 2735, 2927, 3057];
      this.alphanumericDataCapacityLow = [25, 47, 77, 114, 154, 195, 224, 279, 335, 395, 468, 535, 619, 667, 758, 854, 938, 1046, 1153, 1249, 1352, 1460, 1588, 1704, 1853, 1990, 2132, 2223, 2369, 2520, 2677, 2840, 3009, 3183, 3351, 3537, 3729, 3927, 4087, 4296];
      this.alphanumericDataCapacityMedium = [20, 38, 61, 90, 122, 154, 178, 221, 262, 311, 366, 419, 483, 528, 600, 656, 734, 816, 909, 970, 1035, 1134, 1248, 1326, 1451, 1542, 1637, 1732, 1839, 1994, 2113, 2238, 2369, 2506, 2632, 2780, 2894, 3054, 3220, 3391];
      this.alphanumericDataCapacityQuartile = [16, 29, 47, 67, 87, 108, 125, 157, 189, 221, 259, 296, 352, 376, 426, 470, 531, 574, 644, 702, 742, 823, 890, 963, 1041, 1094, 1172, 1263, 1322, 1429, 1499, 1618, 1700, 1787, 1867, 1966, 2071, 2181, 2298, 2420];
      this.alphanumericDataCapacityHigh = [10, 20, 35, 50, 64, 84, 93, 122, 143, 174, 200, 227, 259, 283, 321, 365, 408, 452, 493, 557, 587, 640, 672, 744, 779, 864, 910, 958, 1016, 1080, 1150, 1226, 1307, 1394, 1431, 1530, 1591, 1658, 1774, 1852];
      this.binaryDataCapacityLow = [17, 32, 53, 78, 106, 134, 154, 192, 230, 271, 321, 367, 425, 458, 520, 586, 644, 718, 792, 858, 929, 1003, 1091, 1171, 1273, 1367, 1465, 1528, 1628, 1732, 1840, 1952, 2068, 2188, 2303, 2431, 2563, 2699, 2809, 2953];
      this.binaryDataCapacityMedium = [14, 26, 42, 62, 84, 106, 122, 152, 180, 213, 251, 287, 331, 362, 412, 450, 504, 560, 624, 666, 711, 779, 857, 911, 997, 1059, 1125, 1190, 1264, 1370, 1452, 1538, 1628, 1722, 1809, 1911, 1989, 2099, 2213, 2331];
      this.binaryDataCapacityQuartile = [11, 20, 32, 46, 60, 74, 86, 108, 130, 151, 177, 203, 241, 258, 292, 322, 364, 394, 442, 482, 509, 565, 611, 661, 715, 751, 805, 868, 908, 982, 1030, 1112, 1168, 1228, 1283, 1351, 1423, 1499, 1579, 1663];
      this.binaryDataCapacityHigh = [7, 14, 24, 34, 44, 58, 64, 84, 98, 119, 137, 155, 177, 194, 220, 250, 280, 310, 338, 382, 403, 439, 461, 511, 535, 593, 625, 658, 698, 742, 790, 842, 898, 958, 983, 1051, 1093, 1139, 1219, 1273];
      this.mixedDataCapacityLow = [152, 272, 440, 640, 864, 1088, 1248, 1552, 1856, 2192, 2592, 2960, 3424, 3688, 4184, 4712, 5176, 5768, 6360, 6888, 7456, 8048, 8752, 9392, 10208, 10960, 11744, 12248, 13048, 13880, 4744, 15640, 16568, 17528, 18448, 19472, 20528, 21616, 22496, 23648];
      this.mixedDataCapacityMedium = [128, 244, 352, 512, 688, 864, 992, 1232, 1456, 1728, 2032, 2320, 2672, 2920, 3320, 3624, 4056, 4504, 5016, 5352, 5712, 6256, 6880, 7312, 8e3, 8496, 9024, 9544, 10136, 10984, 1640, 12328, 13048, 13800, 14496, 15312, 15936, 16816, 17728, 18672];
      this.mixedDataCapacityQuartile = [104, 176, 272, 384, 496, 608, 704, 880, 1056, 1232, 1440, 1648, 1952, 2088, 2360, 2600, 2936, 3176, 3560, 3880, 4096, 4544, 4912, 5312, 5744, 6032, 6464, 6968, 7288, 7880, 8264, 8920, 9368, 9848, 10288, 10832, 11408, 12016, 12656, 13328];
      this.mixedDataCapacityHigh = [72, 128, 208, 288, 368, 480, 528, 688, 800, 976, 1120, 1264, 1440, 1576, 1784, 2024, 2264, 2504, 2728, 3080, 3248, 3536, 3712, 4112, 4304, 4768, 5024, 5288, 5608, 5960, 6344, 6760, 7208, 7688, 7888, 8432, 8768, 9136, 9776, 10208];
      this.mVersion = version;
      this.mErrorCorrectionLevel = errorCorrectionLevel;
      this.NumberOfDataCodeWord = this.obtainNumberOfDataCodeWord();
      this.NumberOfErrorCorrectingCodeWords = this.obtainNumberOfErrorCorrectingCodeWords();
      this.NumberOfErrorCorrectionBlocks = this.obtainNumberOfErrorCorrectionBlocks();
      this.End = this.obtainEnd();
      this.DataCapacity = this.obtainDataCapacity();
      this.FormatInformation = this.obtainFormatInformation();
      this.VersionInformation = this.obtainVersionInformation();
    }
    Object.defineProperty(PdfQRBarcodeValues2.prototype, "NumberOfDataCodeWord", {
      /**
       *   Get or public set the Number of Data code words.
       *
       * @returns { number} Get or public set the Number of Data code words.
       * @private
       */
      get: function() {
        return this.mNumberOfDataCodeWord;
      },
      /**
       *   Get or public set the Number of Data code words.
       *
       * @param {number} value -  Get or public set the Number of Data code words.
       * @private
       */
      set: function(value) {
        this.mNumberOfDataCodeWord = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(PdfQRBarcodeValues2.prototype, "NumberOfErrorCorrectingCodeWords", {
      /**
       *   Get or Private set the Number of Error correction Blocks.
       *
       * @returns { number} Get or Private set the Number of Error correction Blocks.
       * @private
       */
      get: function() {
        return this.mNumberOfErrorCorrectingCodeWords;
      },
      /**
       *  Get or Private set the Number of Error correction code words.
       *
       *  @param {number} value - Get or Private set the Number of Error correction code words.
       * @private
       */
      set: function(value) {
        this.mNumberOfErrorCorrectingCodeWords = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(PdfQRBarcodeValues2.prototype, "NumberOfErrorCorrectionBlocks", {
      /**
       *   Get or Private set the Number of Error correction Blocks.
       *
       * @returns { number[]}Get or Private set the Number of Error correction Blocks.
       * @private
       */
      get: function() {
        return this.mNumberOfErrorCorrectionBlocks;
      },
      /**
       *  set or Private set the Number of Error correction Blocks.
       *
       *  @param {number[]} value - et or Private set the Number of Error correction Blocks.
       * @private
       */
      set: function(value) {
        this.mNumberOfErrorCorrectionBlocks = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(PdfQRBarcodeValues2.prototype, "End", {
      /**
       * Set the End value of the Current Version.
       */
      set: function(value) {
        this.mEnd = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(PdfQRBarcodeValues2.prototype, "DataCapacity", {
      /**
       *   Get or Private set the Data capacity.
       *
       * @returns { number[]}Get or Private set the Data capacity.
       * @private
       */
      get: function() {
        return this.mDataCapacity;
      },
      /**
       *  Get or Private set the Data capacity.
       *
       *  @param {string} value - Get or Private set the Data capacity.
       * @private
       */
      set: function(value) {
        this.mDataCapacity = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(PdfQRBarcodeValues2.prototype, "FormatInformation", {
      /**
       *   Get or Private set the Format Information.
       *
       * @returns { number[]} Get or Private set the Format Information.
       * @private
       */
      get: function() {
        return this.mFormatInformation;
      },
      /**
       *   Get or Private set the Format Information.
       *
       *  @param {string} value - Get or Private set the Format Information.
       * @private
       */
      set: function(value) {
        this.mFormatInformation = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(PdfQRBarcodeValues2.prototype, "VersionInformation", {
      /**
       *   Get or Private set the Version Information.
       *
       * @returns { number[]} Validate the given input.
       * @private
       */
      get: function() {
        return this.mVersionInformation;
      },
      /** @private */
      /**
       *   Get or Private set the Version Information.
       *
       *  @param {string} value - Get or Private set the Version Information.
       * @private
       */
      set: function(value) {
        this.mVersionInformation = value;
      },
      enumerable: true,
      configurable: true
    });
    PdfQRBarcodeValues2.prototype.getAlphaNumericValues = function(value) {
      var valueInInt = 0;
      switch (value) {
        case "0":
          valueInInt = 0;
          break;
        case "1":
          valueInInt = 1;
          break;
        case "2":
          valueInInt = 2;
          break;
        case "3":
          valueInInt = 3;
          break;
        case "4":
          valueInInt = 4;
          break;
        case "5":
          valueInInt = 5;
          break;
        case "6":
          valueInInt = 6;
          break;
        case "7":
          valueInInt = 7;
          break;
        case "8":
          valueInInt = 8;
          break;
        case "9":
          valueInInt = 9;
          break;
        case "A":
          valueInInt = 10;
          break;
        case "B":
          valueInInt = 11;
          break;
        case "C":
          valueInInt = 12;
          break;
        case "D":
          valueInInt = 13;
          break;
        case "E":
          valueInInt = 14;
          break;
        case "F":
          valueInInt = 15;
          break;
        case "G":
          valueInInt = 16;
          break;
        case "H":
          valueInInt = 17;
          break;
        case "I":
          valueInInt = 18;
          break;
        case "J":
          valueInInt = 19;
          break;
        case "K":
          valueInInt = 20;
          break;
        case "L":
          valueInInt = 21;
          break;
        case "M":
          valueInInt = 22;
          break;
        case "N":
          valueInInt = 23;
          break;
        case "O":
          valueInInt = 24;
          break;
        case "P":
          valueInInt = 25;
          break;
        case "Q":
          valueInInt = 26;
          break;
        case "R":
          valueInInt = 27;
          break;
        case "S":
          valueInInt = 28;
          break;
        case "T":
          valueInInt = 29;
          break;
        case "U":
          valueInInt = 30;
          break;
        case "V":
          valueInInt = 31;
          break;
        case "W":
          valueInInt = 32;
          break;
        case "X":
          valueInInt = 33;
          break;
        case "Y":
          valueInInt = 34;
          break;
        case "Z":
          valueInInt = 35;
          break;
        case " ":
          valueInInt = 36;
          break;
        case "$":
          valueInInt = 37;
          break;
        case "%":
          valueInInt = 38;
          break;
        case "*":
          valueInInt = 39;
          break;
        case "+":
          valueInInt = 40;
          break;
        case "-":
          valueInInt = 41;
          break;
        case ".":
          valueInInt = 42;
          break;
        case "/":
          valueInInt = 43;
          break;
        case ":":
          valueInInt = 44;
          break;
        default:
      }
      return valueInInt;
    };
    PdfQRBarcodeValues2.prototype.obtainNumberOfDataCodeWord = function() {
      var countOfDataCodeWord = 0;
      switch (this.mVersion) {
        case 1:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 19;
              break;
            case 15:
              countOfDataCodeWord = 16;
              break;
            case 25:
              countOfDataCodeWord = 13;
              break;
            case 30:
              countOfDataCodeWord = 9;
              break;
          }
          break;
        case 2:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 34;
              break;
            case 15:
              countOfDataCodeWord = 28;
              break;
            case 25:
              countOfDataCodeWord = 22;
              break;
            case 30:
              countOfDataCodeWord = 16;
              break;
          }
          break;
        case 3:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 55;
              break;
            case 15:
              countOfDataCodeWord = 44;
              break;
            case 25:
              countOfDataCodeWord = 34;
              break;
            case 30:
              countOfDataCodeWord = 26;
              break;
          }
          break;
        case 4:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 80;
              break;
            case 15:
              countOfDataCodeWord = 64;
              break;
            case 25:
              countOfDataCodeWord = 48;
              break;
            case 30:
              countOfDataCodeWord = 36;
              break;
          }
          break;
        case 5:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 108;
              break;
            case 15:
              countOfDataCodeWord = 86;
              break;
            case 25:
              countOfDataCodeWord = 62;
              break;
            case 30:
              countOfDataCodeWord = 46;
              break;
          }
          break;
        case 6:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 136;
              break;
            case 15:
              countOfDataCodeWord = 108;
              break;
            case 25:
              countOfDataCodeWord = 76;
              break;
            case 30:
              countOfDataCodeWord = 60;
              break;
          }
          break;
        case 7:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 156;
              break;
            case 15:
              countOfDataCodeWord = 124;
              break;
            case 25:
              countOfDataCodeWord = 88;
              break;
            case 30:
              countOfDataCodeWord = 66;
              break;
          }
          break;
        case 8:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 194;
              break;
            case 15:
              countOfDataCodeWord = 154;
              break;
            case 25:
              countOfDataCodeWord = 110;
              break;
            case 30:
              countOfDataCodeWord = 86;
              break;
          }
          break;
        case 9:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 232;
              break;
            case 15:
              countOfDataCodeWord = 182;
              break;
            case 25:
              countOfDataCodeWord = 132;
              break;
            case 30:
              countOfDataCodeWord = 100;
              break;
          }
          break;
        case 10:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 274;
              break;
            case 15:
              countOfDataCodeWord = 216;
              break;
            case 25:
              countOfDataCodeWord = 154;
              break;
            case 30:
              countOfDataCodeWord = 122;
              break;
          }
          break;
        case 11:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 324;
              break;
            case 15:
              countOfDataCodeWord = 254;
              break;
            case 25:
              countOfDataCodeWord = 180;
              break;
            case 30:
              countOfDataCodeWord = 140;
              break;
          }
          break;
        case 12:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 370;
              break;
            case 15:
              countOfDataCodeWord = 290;
              break;
            case 25:
              countOfDataCodeWord = 206;
              break;
            case 30:
              countOfDataCodeWord = 158;
              break;
          }
          break;
        case 13:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 428;
              break;
            case 15:
              countOfDataCodeWord = 334;
              break;
            case 25:
              countOfDataCodeWord = 244;
              break;
            case 30:
              countOfDataCodeWord = 180;
              break;
          }
          break;
        case 14:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 461;
              break;
            case 15:
              countOfDataCodeWord = 365;
              break;
            case 25:
              countOfDataCodeWord = 261;
              break;
            case 30:
              countOfDataCodeWord = 197;
              break;
          }
          break;
        case 15:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 523;
              break;
            case 15:
              countOfDataCodeWord = 415;
              break;
            case 25:
              countOfDataCodeWord = 295;
              break;
            case 30:
              countOfDataCodeWord = 223;
              break;
          }
          break;
        case 16:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 589;
              break;
            case 15:
              countOfDataCodeWord = 453;
              break;
            case 25:
              countOfDataCodeWord = 325;
              break;
            case 30:
              countOfDataCodeWord = 253;
              break;
          }
          break;
        case 17:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 647;
              break;
            case 15:
              countOfDataCodeWord = 507;
              break;
            case 25:
              countOfDataCodeWord = 367;
              break;
            case 30:
              countOfDataCodeWord = 283;
              break;
          }
          break;
        case 18:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 721;
              break;
            case 15:
              countOfDataCodeWord = 563;
              break;
            case 25:
              countOfDataCodeWord = 397;
              break;
            case 30:
              countOfDataCodeWord = 313;
              break;
          }
          break;
        case 19:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 795;
              break;
            case 15:
              countOfDataCodeWord = 627;
              break;
            case 25:
              countOfDataCodeWord = 445;
              break;
            case 30:
              countOfDataCodeWord = 341;
              break;
          }
          break;
        case 20:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 861;
              break;
            case 15:
              countOfDataCodeWord = 669;
              break;
            case 25:
              countOfDataCodeWord = 485;
              break;
            case 30:
              countOfDataCodeWord = 385;
              break;
          }
          break;
        case 21:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 932;
              break;
            case 15:
              countOfDataCodeWord = 714;
              break;
            case 25:
              countOfDataCodeWord = 512;
              break;
            case 30:
              countOfDataCodeWord = 406;
              break;
          }
          break;
        case 22:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 1006;
              break;
            case 15:
              countOfDataCodeWord = 782;
              break;
            case 25:
              countOfDataCodeWord = 568;
              break;
            case 30:
              countOfDataCodeWord = 442;
              break;
          }
          break;
        case 23:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 1094;
              break;
            case 15:
              countOfDataCodeWord = 860;
              break;
            case 25:
              countOfDataCodeWord = 614;
              break;
            case 30:
              countOfDataCodeWord = 464;
              break;
          }
          break;
        case 24:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 1174;
              break;
            case 15:
              countOfDataCodeWord = 914;
              break;
            case 25:
              countOfDataCodeWord = 664;
              break;
            case 30:
              countOfDataCodeWord = 514;
              break;
          }
          break;
        case 25:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 1276;
              break;
            case 15:
              countOfDataCodeWord = 1e3;
              break;
            case 25:
              countOfDataCodeWord = 718;
              break;
            case 30:
              countOfDataCodeWord = 538;
              break;
          }
          break;
        case 26:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 1370;
              break;
            case 15:
              countOfDataCodeWord = 1062;
              break;
            case 25:
              countOfDataCodeWord = 754;
              break;
            case 30:
              countOfDataCodeWord = 596;
              break;
          }
          break;
        case 27:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 1468;
              break;
            case 15:
              countOfDataCodeWord = 1128;
              break;
            case 25:
              countOfDataCodeWord = 808;
              break;
            case 30:
              countOfDataCodeWord = 628;
              break;
          }
          break;
        case 28:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 1531;
              break;
            case 15:
              countOfDataCodeWord = 1193;
              break;
            case 25:
              countOfDataCodeWord = 871;
              break;
            case 30:
              countOfDataCodeWord = 661;
              break;
          }
          break;
        case 29:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 1631;
              break;
            case 15:
              countOfDataCodeWord = 1267;
              break;
            case 25:
              countOfDataCodeWord = 911;
              break;
            case 30:
              countOfDataCodeWord = 701;
              break;
          }
          break;
        case 30:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 1735;
              break;
            case 15:
              countOfDataCodeWord = 1373;
              break;
            case 25:
              countOfDataCodeWord = 985;
              break;
            case 30:
              countOfDataCodeWord = 745;
              break;
          }
          break;
        case 31:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 1843;
              break;
            case 15:
              countOfDataCodeWord = 1455;
              break;
            case 25:
              countOfDataCodeWord = 1033;
              break;
            case 30:
              countOfDataCodeWord = 793;
              break;
          }
          break;
        case 32:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 1955;
              break;
            case 15:
              countOfDataCodeWord = 1541;
              break;
            case 25:
              countOfDataCodeWord = 1115;
              break;
            case 30:
              countOfDataCodeWord = 845;
              break;
          }
          break;
        case 33:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 2071;
              break;
            case 15:
              countOfDataCodeWord = 1631;
              break;
            case 25:
              countOfDataCodeWord = 1171;
              break;
            case 30:
              countOfDataCodeWord = 901;
              break;
          }
          break;
        case 34:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 2191;
              break;
            case 15:
              countOfDataCodeWord = 1725;
              break;
            case 25:
              countOfDataCodeWord = 1231;
              break;
            case 30:
              countOfDataCodeWord = 961;
              break;
          }
          break;
        case 35:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 2306;
              break;
            case 15:
              countOfDataCodeWord = 1812;
              break;
            case 25:
              countOfDataCodeWord = 1286;
              break;
            case 30:
              countOfDataCodeWord = 986;
              break;
          }
          break;
        case 36:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 2434;
              break;
            case 15:
              countOfDataCodeWord = 1914;
              break;
            case 25:
              countOfDataCodeWord = 1354;
              break;
            case 30:
              countOfDataCodeWord = 1054;
              break;
          }
          break;
        case 37:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 2566;
              break;
            case 15:
              countOfDataCodeWord = 1992;
              break;
            case 25:
              countOfDataCodeWord = 1426;
              break;
            case 30:
              countOfDataCodeWord = 1096;
              break;
          }
          break;
        case 38:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 2702;
              break;
            case 15:
              countOfDataCodeWord = 2102;
              break;
            case 25:
              countOfDataCodeWord = 1502;
              break;
            case 30:
              countOfDataCodeWord = 1142;
              break;
          }
          break;
        case 39:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 2812;
              break;
            case 15:
              countOfDataCodeWord = 2216;
              break;
            case 25:
              countOfDataCodeWord = 1582;
              break;
            case 30:
              countOfDataCodeWord = 1222;
              break;
          }
          break;
        case 40:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              countOfDataCodeWord = 2956;
              break;
            case 15:
              countOfDataCodeWord = 2334;
              break;
            case 25:
              countOfDataCodeWord = 1666;
              break;
            case 30:
              countOfDataCodeWord = 1276;
              break;
          }
          break;
      }
      return countOfDataCodeWord;
    };
    PdfQRBarcodeValues2.prototype.obtainNumberOfErrorCorrectingCodeWords = function() {
      var index = (this.mVersion - 1) * 4;
      switch (this.mErrorCorrectionLevel) {
        case 7:
          index += 0;
          break;
        case 15:
          index += 1;
          break;
        case 25:
          index += 2;
          break;
        case 30:
          index += 3;
          break;
      }
      return this.numberOfErrorCorrectingCodeWords[parseInt(index.toString(), 10)];
    };
    PdfQRBarcodeValues2.prototype.obtainNumberOfErrorCorrectionBlocks = function() {
      var numberOfErrorCorrectionBlocks = null;
      switch (this.mVersion) {
        case 1:
          numberOfErrorCorrectionBlocks = [1];
          break;
        case 2:
          numberOfErrorCorrectionBlocks = [1];
          break;
        case 3:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [1];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [1];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [2];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [2];
              break;
          }
          break;
        case 4:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [1];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [2];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [2];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [4];
              break;
          }
          break;
        case 5:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [1];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [2];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [2, 33, 15, 2, 34, 16];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [2, 33, 11, 2, 34, 12];
              break;
          }
          break;
        case 6:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [2];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [4];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [4];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [4];
              break;
          }
          break;
        case 7:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [2];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [4];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [2, 32, 14, 4, 33, 15];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [4, 39, 13, 1, 40, 14];
              break;
          }
          break;
        case 8:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [2];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [2, 60, 38, 2, 61, 39];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [4, 40, 18, 2, 41, 19];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [4, 40, 14, 2, 41, 15];
              break;
          }
          break;
        case 9:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [2];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [3, 58, 36, 2, 59, 37];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [4, 36, 16, 4, 37, 17];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [4, 36, 12, 4, 37, 13];
              break;
          }
          break;
        case 10:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [2, 86, 68, 2, 87, 69];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [4, 69, 43, 1, 70, 44];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [6, 43, 19, 2, 44, 20];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [6, 43, 15, 2, 44, 16];
              break;
          }
          break;
        case 11:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [4];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [1, 80, 50, 4, 81, 51];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [4, 50, 22, 4, 51, 23];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [3, 36, 12, 8, 37, 13];
              break;
          }
          break;
        case 12:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [2, 116, 92, 2, 117, 93];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [6, 58, 36, 2, 59, 37];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [4, 46, 20, 6, 47, 21];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [7, 42, 14, 4, 43, 15];
              break;
          }
          break;
        case 13:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [4];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [8, 59, 37, 1, 60, 38];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [8, 44, 20, 4, 45, 21];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [12, 33, 11, 4, 34, 12];
              break;
          }
          break;
        case 14:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [3, 145, 115, 1, 146, 116];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [4, 64, 40, 5, 65, 41];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [11, 36, 16, 5, 37, 17];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [11, 36, 12, 5, 37, 13];
              break;
          }
          break;
        case 15:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [5, 109, 87, 1, 110, 88];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [5, 65, 41, 5, 66, 42];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [5, 54, 24, 7, 55, 25];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [11, 36, 12, 7, 37, 13];
              break;
          }
          break;
        case 16:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [5, 112, 98, 1, 123, 99];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [7, 73, 45, 3, 74, 46];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [15, 43, 19, 2, 44, 20];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [3, 45, 15, 13, 46, 16];
              break;
          }
          break;
        case 17:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [1, 135, 107, 5, 136, 108];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [10, 74, 46, 1, 75, 47];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [1, 50, 22, 15, 51, 23];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [2, 42, 14, 17, 43, 15];
              break;
          }
          break;
        case 18:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [5, 150, 120, 1, 151, 121];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [9, 69, 43, 4, 70, 44];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [17, 50, 22, 1, 51, 23];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [2, 42, 14, 19, 43, 15];
              break;
          }
          break;
        case 19:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [3, 141, 113, 4, 142, 114];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [3, 70, 44, 11, 71, 45];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [17, 47, 21, 4, 48, 22];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [9, 39, 13, 16, 40, 14];
              break;
          }
          break;
        case 20:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [3, 135, 107, 5, 136, 108];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [3, 67, 41, 13, 68, 42];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [15, 54, 24, 5, 55, 25];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [15, 43, 15, 10, 44, 16];
              break;
          }
          break;
        case 21:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [4, 144, 116, 4, 145, 117];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [17];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [17, 50, 22, 6, 51, 23];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [19, 46, 16, 6, 47, 17];
              break;
          }
          break;
        case 22:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [2, 139, 111, 7, 140, 112];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [17];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [7, 54, 24, 16, 55, 25];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [34];
              break;
          }
          break;
        case 23:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [4, 151, 121, 5, 152, 122];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [4, 75, 47, 14, 76, 48];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [11, 54, 24, 14, 55, 25];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [16, 45, 15, 14, 46, 16];
              break;
          }
          break;
        case 24:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [6, 147, 117, 4, 148, 118];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [6, 73, 45, 14, 74, 46];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [11, 54, 24, 16, 55, 25];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [30, 46, 16, 2, 47, 17];
              break;
          }
          break;
        case 25:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [8, 132, 106, 4, 133, 107];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [8, 75, 47, 13, 76, 48];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [7, 54, 24, 22, 55, 25];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [22, 45, 15, 13, 46, 16];
              break;
          }
          break;
        case 26:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [10, 142, 114, 2, 143, 115];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [19, 74, 46, 4, 75, 47];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [28, 50, 22, 6, 51, 23];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [33, 46, 16, 4, 47, 17];
              break;
          }
          break;
        case 27:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [8, 152, 122, 4, 153, 123];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [22, 73, 45, 3, 74, 46];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [8, 53, 23, 26, 54, 24];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [12, 45, 15, 28, 46, 16];
              break;
          }
          break;
        case 28:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [3, 147, 117, 10, 148, 118];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [3, 73, 45, 23, 74, 46];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [4, 54, 24, 31, 55, 25];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [11, 45, 15, 31, 46, 16];
              break;
          }
          break;
        case 29:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [7, 146, 116, 7, 147, 117];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [21, 73, 45, 7, 74, 46];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [1, 53, 23, 37, 54, 24];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [19, 45, 15, 26, 46, 16];
              break;
          }
          break;
        case 30:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [5, 145, 115, 10, 146, 116];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [19, 75, 47, 10, 76, 48];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [15, 54, 24, 25, 55, 25];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [23, 45, 15, 25, 46, 16];
              break;
          }
          break;
        case 31:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [13, 145, 115, 3, 146, 116];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [2, 74, 46, 29, 75, 47];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [42, 54, 24, 1, 55, 25];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [23, 45, 15, 28, 46, 16];
              break;
          }
          break;
        case 32:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [17];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [10, 74, 46, 23, 75, 47];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [10, 54, 24, 35, 55, 25];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [19, 45, 15, 35, 46, 16];
              break;
          }
          break;
        case 33:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [17, 145, 115, 1, 146, 116];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [14, 74, 46, 21, 75, 47];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [29, 54, 24, 19, 55, 25];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [11, 45, 15, 46, 46, 16];
              break;
          }
          break;
        case 34:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [13, 145, 115, 6, 146, 116];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [14, 74, 46, 23, 75, 47];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [44, 54, 24, 7, 55, 25];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [59, 46, 16, 1, 47, 17];
              break;
          }
          break;
        case 35:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [12, 151, 121, 7, 152, 122];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [12, 75, 47, 26, 76, 48];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [39, 54, 24, 14, 55, 25];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [22, 45, 15, 41, 46, 16];
              break;
          }
          break;
        case 36:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [6, 151, 121, 14, 152, 122];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [6, 75, 47, 34, 76, 48];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [46, 54, 24, 10, 55, 25];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [2, 45, 15, 64, 46, 16];
              break;
          }
          break;
        case 37:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [17, 152, 122, 4, 153, 123];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [29, 74, 46, 14, 75, 47];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [49, 54, 24, 10, 55, 25];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [24, 45, 15, 46, 46, 16];
              break;
          }
          break;
        case 38:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [4, 152, 122, 18, 153, 123];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [13, 74, 46, 32, 75, 47];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [48, 54, 24, 14, 55, 25];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [42, 45, 15, 32, 46, 16];
              break;
          }
          break;
        case 39:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [20, 147, 117, 4, 148, 118];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [40, 75, 47, 7, 76, 48];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [43, 54, 24, 22, 55, 25];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [10, 45, 15, 67, 46, 16];
              break;
          }
          break;
        case 40:
          switch (this.mErrorCorrectionLevel) {
            case 7:
              numberOfErrorCorrectionBlocks = [19, 148, 118, 6, 149, 119];
              break;
            case 15:
              numberOfErrorCorrectionBlocks = [18, 75, 47, 31, 76, 48];
              break;
            case 25:
              numberOfErrorCorrectionBlocks = [34, 54, 24, 34, 55, 25];
              break;
            case 30:
              numberOfErrorCorrectionBlocks = [20, 45, 15, 61, 46, 16];
              break;
          }
          break;
      }
      return numberOfErrorCorrectionBlocks;
    };
    PdfQRBarcodeValues2.prototype.obtainEnd = function() {
      return this.endValues[this.mVersion - 1];
    };
    PdfQRBarcodeValues2.prototype.obtainDataCapacity = function() {
      return this.dataCapacityValues[this.mVersion - 1];
    };
    PdfQRBarcodeValues2.prototype.obtainFormatInformation = function() {
      var formatInformation = null;
      switch (this.mErrorCorrectionLevel) {
        case 7:
          formatInformation = [1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1];
          break;
        case 15:
          formatInformation = [1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1];
          break;
        case 25:
          formatInformation = [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0];
          break;
        case 30:
          formatInformation = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0];
          break;
      }
      return formatInformation;
    };
    PdfQRBarcodeValues2.prototype.obtainVersionInformation = function() {
      var versionInformation = null;
      switch (this.mVersion) {
        case 7:
          versionInformation = [0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0];
          break;
        case 8:
          versionInformation = [0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0];
          break;
        case 9:
          versionInformation = [1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0];
          break;
        case 10:
          versionInformation = [1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0];
          break;
        case 11:
          versionInformation = [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0];
          break;
        case 12:
          versionInformation = [0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0];
          break;
        case 13:
          versionInformation = [1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0];
          break;
        case 14:
          versionInformation = [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0];
          break;
        case 15:
          versionInformation = [0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0];
          break;
        case 16:
          versionInformation = [0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0];
          break;
        case 17:
          versionInformation = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0];
          break;
        case 18:
          versionInformation = [1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0];
          break;
        case 19:
          versionInformation = [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0];
          break;
        case 20:
          versionInformation = [0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0];
          break;
        case 21:
          versionInformation = [1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0];
          break;
        case 22:
          versionInformation = [1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0];
          break;
        case 23:
          versionInformation = [0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0];
          break;
        case 24:
          versionInformation = [0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0];
          break;
        case 25:
          versionInformation = [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0];
          break;
        case 26:
          versionInformation = [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0];
          break;
        case 27:
          versionInformation = [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0];
          break;
        case 28:
          versionInformation = [0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0];
          break;
        case 29:
          versionInformation = [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0];
          break;
        case 30:
          versionInformation = [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0];
          break;
        case 31:
          versionInformation = [0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0];
          break;
        case 32:
          versionInformation = [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1];
          break;
        case 33:
          versionInformation = [0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1];
          break;
        case 34:
          versionInformation = [0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1];
          break;
        case 35:
          versionInformation = [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1];
          break;
        case 36:
          versionInformation = [1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1];
          break;
        case 37:
          versionInformation = [0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1];
          break;
        case 38:
          versionInformation = [0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1];
          break;
        case 39:
          versionInformation = [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1];
          break;
        case 40:
          versionInformation = [1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1];
          break;
      }
      return versionInformation;
    };
    PdfQRBarcodeValues2.prototype.getNumericDataCapacity = function(version, errorCorrectionLevel) {
      var capacity = null;
      switch (errorCorrectionLevel) {
        case 7:
          capacity = this.numericDataCapacityLow;
          break;
        case 15:
          capacity = this.numericDataCapacityMedium;
          break;
        case 25:
          capacity = this.numericDataCapacityQuartile;
          break;
        case 30:
          capacity = this.numericDataCapacityHigh;
          break;
      }
      return capacity[version - 1];
    };
    PdfQRBarcodeValues2.prototype.getAlphanumericDataCapacity = function(version, errorCorrectionLevel) {
      var capacity = null;
      switch (errorCorrectionLevel) {
        case 7:
          capacity = this.alphanumericDataCapacityLow;
          break;
        case 15:
          capacity = this.alphanumericDataCapacityMedium;
          break;
        case 25:
          capacity = this.alphanumericDataCapacityQuartile;
          break;
        case 30:
          capacity = this.alphanumericDataCapacityHigh;
          break;
      }
      return capacity[version - 1];
    };
    PdfQRBarcodeValues2.prototype.getBinaryDataCapacity = function(version, errorCorrectionLevel) {
      var capacity = null;
      switch (errorCorrectionLevel) {
        case 7:
          capacity = this.binaryDataCapacityLow;
          break;
        case 15:
          capacity = this.binaryDataCapacityMedium;
          break;
        case 25:
          capacity = this.binaryDataCapacityQuartile;
          break;
        case 30:
          capacity = this.binaryDataCapacityHigh;
          break;
      }
      return capacity[version - 1];
    };
    return PdfQRBarcodeValues2;
  }()
);

// node_modules/@syncfusion/ej2-barcode-generator/src/qrcode/qr-error-correction.js
var ErrorCorrectionCodewords = (
  /** @class */
  function() {
    function ErrorCorrectionCodewords2(version, correctionLevel) {
      this.alpha = [1, 2, 4, 8, 16, 32, 64, 128, 29, 58, 116, 232, 205, 135, 19, 38, 76, 152, 45, 90, 180, 117, 234, 201, 143, 3, 6, 12, 24, 48, 96, 192, 157, 39, 78, 156, 37, 74, 148, 53, 106, 212, 181, 119, 238, 193, 159, 35, 70, 140, 5, 10, 20, 40, 80, 160, 93, 186, 105, 210, 185, 111, 222, 161, 95, 190, 97, 194, 153, 47, 94, 188, 101, 202, 137, 15, 30, 60, 120, 240, 253, 231, 211, 187, 107, 214, 177, 127, 254, 225, 223, 163, 91, 182, 113, 226, 217, 175, 67, 134, 17, 34, 68, 136, 13, 26, 52, 104, 208, 189, 103, 206, 129, 31, 62, 124, 248, 237, 199, 147, 59, 118, 236, 197, 151, 51, 102, 204, 133, 23, 46, 92, 184, 109, 218, 169, 79, 158, 33, 66, 132, 21, 42, 84, 168, 77, 154, 41, 82, 164, 85, 170, 73, 146, 57, 114, 228, 213, 183, 115, 230, 209, 191, 99, 198, 145, 63, 126, 252, 229, 215, 179, 123, 246, 241, 255, 227, 219, 171, 75, 150, 49, 98, 196, 149, 55, 110, 220, 165, 87, 174, 65, 130, 25, 50, 100, 200, 141, 7, 14, 28, 56, 112, 224, 221, 167, 83, 166, 81, 162, 89, 178, 121, 242, 249, 239, 195, 155, 43, 86, 172, 69, 138, 9, 18, 36, 72, 144, 61, 122, 244, 245, 247, 243, 251, 235, 203, 139, 11, 22, 44, 88, 176, 125, 250, 233, 207, 131, 27, 54, 108, 216, 173, 71, 142];
      this.mQrBarcodeValues = new PdfQRBarcodeValues(version, correctionLevel);
      var variable = "DataCapacity";
      this.mLength = this.mQrBarcodeValues["" + variable];
      variable = "NumberOfErrorCorrectingCodeWords";
      this.eccw = this.mQrBarcodeValues["" + variable];
    }
    Object.defineProperty(ErrorCorrectionCodewords2.prototype, "DC", {
      /**
       * Sets and Gets the Data code word
       *
       * @param {string} value - Sets and Gets the Data code word
       * @private
       */
      set: function(value) {
        this.mDataCodeWord = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ErrorCorrectionCodewords2.prototype, "DataBits", {
      /**
       * Sets and Gets the DataBits
       *
       * @param {string} value - Sets and Gets the DataBits
       * @private
       */
      set: function(value) {
        this.databits = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ErrorCorrectionCodewords2.prototype, "Eccw", {
      /**
       * Sets and Gets the Error Correction Code Words
       *
       * @param {string} value - Sets and Gets the Error Correction Code Words
       * @private
       */
      set: function(value) {
        this.eccw = value;
      },
      enumerable: true,
      configurable: true
    });
    ErrorCorrectionCodewords2.prototype.getErcw = function() {
      this.decimalValue = [this.databits];
      switch (this.eccw) {
        case 7:
          this.gx = [0, 87, 229, 146, 149, 238, 102, 21];
          break;
        case 10:
          this.gx = [0, 251, 67, 46, 61, 118, 70, 64, 94, 32, 45];
          break;
        case 13:
          this.gx = [0, 74, 152, 176, 100, 86, 100, 106, 104, 130, 218, 206, 140, 78];
          break;
        case 15:
          this.gx = [0, 8, 183, 61, 91, 202, 37, 51, 58, 58, 237, 140, 124, 5, 99, 105];
          break;
        case 16:
          this.gx = [0, 120, 104, 107, 109, 102, 161, 76, 3, 91, 191, 147, 169, 182, 194, 225, 120];
          break;
        case 17:
          this.gx = [0, 43, 139, 206, 78, 43, 239, 123, 206, 214, 147, 24, 99, 150, 39, 243, 163, 136];
          break;
        case 18:
          this.gx = [0, 215, 234, 158, 94, 184, 97, 118, 170, 79, 187, 152, 148, 252, 179, 5, 98, 96, 153];
          break;
        case 20:
          this.gx = [0, 17, 60, 79, 50, 61, 163, 26, 187, 202, 180, 221, 225, 83, 239, 156, 164, 212, 212, 188, 190];
          break;
        case 22:
          this.gx = [0, 210, 171, 247, 242, 93, 230, 14, 109, 221, 53, 200, 74, 8, 172, 98, 80, 219, 134, 160, 105, 165, 231];
          break;
        case 24:
          this.gx = [0, 229, 121, 135, 48, 211, 117, 251, 126, 159, 180, 169, 152, 192, 226, 228, 218, 111, 0, 117, 232, 87, 96, 227, 21];
          break;
        case 26:
          this.gx = [0, 173, 125, 158, 2, 103, 182, 118, 17, 145, 201, 111, 28, 165, 53, 161, 21, 245, 142, 13, 102, 48, 227, 153, 145, 218, 70];
          break;
        case 28:
          this.gx = [0, 168, 223, 200, 104, 224, 234, 108, 180, 110, 190, 195, 147, 205, 27, 232, 201, 21, 43, 245, 87, 42, 195, 212, 119, 242, 37, 9, 123];
          break;
        case 30:
          this.gx = [0, 41, 173, 145, 152, 216, 31, 179, 182, 50, 48, 110, 86, 239, 96, 222, 125, 42, 173, 226, 193, 224, 130, 156, 37, 251, 216, 238, 40, 192, 180];
          break;
      }
      this.gx = this.getElement(this.gx, this.alpha);
      this.toDecimal(this.mDataCodeWord);
      var decimalRepresentation = this.divide();
      var ecw = this.toBinary(decimalRepresentation);
      return ecw;
    };
    ErrorCorrectionCodewords2.prototype.toDecimal = function(inString) {
      for (var i = 0; i < inString.length; i++) {
        this.decimalValue[parseInt(i.toString(), 10)] = parseInt(inString[parseInt(i.toString(), 10)], 2);
      }
    };
    ErrorCorrectionCodewords2.prototype.toBinary = function(decimalRepresentation) {
      var toBinary = [];
      for (var i = 0; i < this.eccw; i++) {
        var str = "";
        var temp = decimalRepresentation[parseInt(i.toString(), 10)].toString(2);
        if (temp.length < 8) {
          for (var j = 0; j < 8 - temp.length; j++) {
            str += "0";
          }
        }
        toBinary[parseInt(i.toString(), 10)] = str + temp;
      }
      return toBinary;
    };
    ErrorCorrectionCodewords2.prototype.divide = function() {
      var messagePolynom = {};
      for (var i = 0; i < this.decimalValue.length; i++) {
        messagePolynom[this.decimalValue.length - 1 - i] = this.decimalValue[parseInt(i.toString(), 10)];
      }
      var generatorPolynom = {};
      for (var i = 0; i < this.gx.length; i++) {
        generatorPolynom[this.gx.length - 1 - i] = this.findElement(this.gx[parseInt(i.toString(), 10)], this.alpha);
      }
      var tempMessagePolynom = {};
      for (var _i = 0, _a = Object.keys(messagePolynom); _i < _a.length; _i++) {
        var poly = _a[_i];
        tempMessagePolynom[Number(poly) + this.eccw] = messagePolynom["" + poly];
      }
      messagePolynom = tempMessagePolynom;
      var genLeadtermFactor = this.decimalValue.length + this.eccw - this.gx.length;
      tempMessagePolynom = {};
      for (var _b = 0, _c = Object.keys(generatorPolynom); _b < _c.length; _b++) {
        var poly = _c[_b];
        tempMessagePolynom[Number(poly) + genLeadtermFactor] = generatorPolynom["" + poly];
      }
      generatorPolynom = tempMessagePolynom;
      var leadTermSource = messagePolynom;
      for (var i = 0; i < Object.keys(messagePolynom).length; i++) {
        var largestExponent = this.findLargestExponent(leadTermSource);
        if (leadTermSource[parseInt(largestExponent.toString(), 10)] === 0) {
          delete leadTermSource[parseInt(largestExponent.toString(), 10)];
        } else {
          var alphaNotation = this.convertToAlphaNotation(leadTermSource);
          var resPoly = this.multiplyGeneratorPolynomByLeadterm(generatorPolynom, alphaNotation[this.findLargestExponent(alphaNotation)], i);
          resPoly = this.convertToDecNotation(resPoly);
          resPoly = this.xORPolynoms(leadTermSource, resPoly);
          leadTermSource = resPoly;
        }
      }
      this.eccw = Object.keys(leadTermSource).length;
      var returnValue = [];
      for (var _d = 0, _e = Object.keys(leadTermSource); _d < _e.length; _d++) {
        var temp = _e[_d];
        returnValue.push(leadTermSource["" + temp]);
      }
      return returnValue.reverse();
    };
    ErrorCorrectionCodewords2.prototype.xORPolynoms = function(messagePolynom, resPolynom) {
      var resultPolynom = {};
      var longPoly = {};
      var shortPoly = {};
      if (Object.keys(messagePolynom).length >= Object.keys(resPolynom).length) {
        longPoly = messagePolynom;
        shortPoly = resPolynom;
      } else {
        longPoly = resPolynom;
        shortPoly = messagePolynom;
      }
      var messagePolyExponent = this.findLargestExponent(messagePolynom);
      var shortPolyExponent = this.findLargestExponent(shortPoly);
      var i = Object.keys(longPoly).length - 1;
      for (var _i = 0, _a = Object.keys(longPoly); _i < _a.length; _i++) {
        var longPolySingle = _a[_i];
        resultPolynom[messagePolyExponent - i] = longPoly["" + longPolySingle] ^ (Object.keys(shortPoly).length > i ? shortPoly[shortPolyExponent - i] : 0);
        i--;
      }
      var resultPolyExponent = this.findLargestExponent(resultPolynom);
      delete resultPolynom[parseInt(resultPolyExponent.toString(), 10)];
      return resultPolynom;
    };
    ErrorCorrectionCodewords2.prototype.multiplyGeneratorPolynomByLeadterm = function(genPolynom, leadTermCoefficient, lowerExponentBy) {
      var tempPolynom = {};
      for (var _i = 0, _a = Object.keys(genPolynom); _i < _a.length; _i++) {
        var treeNode = _a[_i];
        tempPolynom[Number(treeNode) - lowerExponentBy] = (genPolynom["" + treeNode] + leadTermCoefficient) % 255;
      }
      return tempPolynom;
    };
    ErrorCorrectionCodewords2.prototype.convertToDecNotation = function(poly) {
      var tempPolynom = {};
      for (var _i = 0, _a = Object.keys(poly); _i < _a.length; _i++) {
        var treeNode = _a[_i];
        tempPolynom["" + treeNode] = this.getIntValFromAlphaExp(poly["" + treeNode], this.alpha);
      }
      return tempPolynom;
    };
    ErrorCorrectionCodewords2.prototype.convertToAlphaNotation = function(polynom) {
      var tempPolynom = {};
      for (var _i = 0, _a = Object.keys(polynom); _i < _a.length; _i++) {
        var poly = _a[_i];
        if (polynom["" + poly] !== 0) {
          tempPolynom["" + poly] = this.findElement(polynom["" + poly], this.alpha);
        }
      }
      return tempPolynom;
    };
    ErrorCorrectionCodewords2.prototype.findLargestExponent = function(polynom) {
      var largCo = 0;
      for (var _i = 0, _a = Object.keys(polynom); _i < _a.length; _i++) {
        var poly = _a[_i];
        if (Number(poly) > largCo) {
          largCo = Number(poly);
        }
      }
      return largCo;
    };
    ErrorCorrectionCodewords2.prototype.getIntValFromAlphaExp = function(element, alpha) {
      if (element > 255) {
        element = element - 255;
      }
      return alpha[parseInt(element.toString(), 10)];
    };
    ErrorCorrectionCodewords2.prototype.findElement = function(element, alpha) {
      var j;
      for (j = 0; j < alpha.length; j++) {
        if (element === alpha[parseInt(j.toString(), 10)]) {
          break;
        }
      }
      return j;
    };
    ErrorCorrectionCodewords2.prototype.getElement = function(element, alpha) {
      var gx = [element.length];
      for (var i = 0; i < element.length; i++) {
        if (element[parseInt(i.toString(), 10)] > 255) {
          element[parseInt(i.toString(), 10)] = element[parseInt(i.toString(), 10)] - 255;
        }
        gx[parseInt(i.toString(), 10)] = alpha[element[parseInt(i.toString(), 10)]];
      }
      return gx;
    };
    return ErrorCorrectionCodewords2;
  }()
);

// node_modules/@syncfusion/ej2-barcode-generator/src/qrcode/qr-code-util.js
var QRCode = (
  /** @class */
  function() {
    function QRCode2() {
      this.mVersion = QRCodeVersion.Version01;
      this.mInputMode = "NumericMode";
      this.validInput = true;
      this.totalBits = 0;
      this.mModuleValue = [];
      this.mDataAllocationValues = [[], []];
      this.mixVersionERC = true;
      this.mixExecutablePart = null;
      this.mixDataCount = 0;
      this.mNoOfModules = 21;
      this.mIsUserMentionedMode = false;
      this.chooseDefaultMode = false;
      this.mixRemainingPart = null;
      this.isXdimension = false;
      this.mXDimension = 1;
      this.mIsEci = false;
      this.mIsUserMentionedErrorCorrectionLevel = false;
      this.mEciAssignmentNumber = 3;
      this.mIsUserMentionedVersion = false;
      this.mErrorCorrectionLevel = ErrorCorrectionLevel.Low;
      this.textList = [];
      this.mode = [];
    }
    Object.defineProperty(QRCode2.prototype, "XDimension", {
      /**
       * Get or Private set the XDimension values.
       *
       * @returns {number}Get or Private set the XDimension values..
       * @private
       */
      get: function() {
        return this.mXDimension;
      },
      /**
       *  Get or Private set the XDimension values.
       *
       * @param {number} value - Get or Private set the XDimension values.
       * @private
       */
      set: function(value) {
        this.mXDimension = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(QRCode2.prototype, "inputMode", {
      get: function() {
        return this.mInputMode;
      },
      set: function(value) {
        this.mInputMode = value;
        this.mIsUserMentionedMode = true;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(QRCode2.prototype, "version", {
      /**
       *Get or Private set the version
       *
       * @returns {QRCodeVersion}Get or Private set the version
       * @private
       */
      get: function() {
        return this.mVersion;
      },
      /**
       *  Get or Private set the version
       *
       * @param {QRCodeVersion} value - Get or Private set the version
       * @private
       */
      set: function(value) {
        this.mVersion = value;
        this.mNoOfModules = (this.mVersion - 1) * 4 + 21;
        if (value !== QRCodeVersion.Auto) {
          this.mIsUserMentionedVersion = true;
        }
      },
      enumerable: true,
      configurable: true
    });
    QRCode2.prototype.getBaseAttributes = function(width, height, offSetX, offsetY, color, strokeColor) {
      var options = {
        width,
        height,
        x: offSetX,
        y: offsetY,
        color,
        strokeColor
      };
      return options;
    };
    QRCode2.prototype.getInstance = function(id) {
      var barCode = document.getElementById(id);
      var barcodeRenderer = new BarcodeRenderer(barCode.id, this.isSvgMode);
      return barcodeRenderer;
    };
    QRCode2.prototype.drawImage = function(canvas, options) {
      var barcodeRenderer = this.getInstance(canvas.id);
      for (var i = 0; i < options.length; i++) {
        barcodeRenderer.renderRectElement(canvas, options[parseInt(i.toString(), 10)]);
      }
    };
    QRCode2.prototype.draw = function(char, canvas, height, width, margin, displayText, mode, foreColor, logo) {
      this.isSvgMode = mode;
      this.generateValues();
      if (this.validInput) {
        var size = void 0;
        var actualWidth = width - (margin.left + margin.right);
        var actualHeight = height - (margin.top + margin.bottom);
        size = actualWidth >= actualHeight ? actualHeight : actualWidth;
        var dimension = this.XDimension;
        var quietZone = QuietZone.All;
        var x = actualWidth >= size ? (actualWidth - size) / 2 : 0;
        var y = actualHeight >= size ? (actualHeight - size) / 2 : 0;
        y += margin.top;
        x += margin.left;
        var textBounds = void 0;
        if (char && displayText.visibility) {
          textBounds = this.drawDisplayText(canvas, x, y, size, actualHeight, displayText, char, margin, foreColor);
          actualHeight -= textBounds.height;
        }
        if (displayText.margin.bottom > 0) {
          if (displayText.position === "Top") {
            y += displayText.margin.bottom;
            actualHeight -= displayText.margin.bottom;
          } else {
            actualHeight -= displayText.margin.bottom;
          }
        }
        if (displayText.margin.top > 0) {
          if (displayText.position === "Top") {
            y += displayText.margin.top;
            actualHeight -= displayText.margin.top;
          } else {
            actualHeight -= displayText.margin.top;
          }
        }
        size = actualWidth >= actualHeight ? actualHeight : actualWidth;
        var moduleCount = this.mNoOfModules + 2 * quietZone + 1;
        dimension = size / moduleCount;
        var imageBound = null;
        var imageAttributes = null;
        if (logo !== null && logo.imageSource !== "") {
          x = (actualWidth >= size ? (actualWidth - size) / 2 : 0) + margin.left;
          var qrsize = size - (2 * quietZone + 1) * dimension;
          var sizeRatio = 0.3;
          var imgwidth = logo.width ? Math.min(logo.width, qrsize * sizeRatio) : qrsize * sizeRatio;
          var imgheight = logo.height ? Math.min(logo.height, qrsize * sizeRatio) : qrsize * sizeRatio;
          var ximg = x + quietZone * dimension + qrsize / 2 - imgwidth / 2;
          var yimg = y + quietZone * dimension + qrsize / 2 - imgheight / 2;
          imageAttributes = {
            x: ximg,
            y: yimg,
            width: imgwidth,
            height: imgheight,
            color: "transparent",
            imageSource: logo.imageSource
          };
          imageBound = {
            x: imageAttributes.x,
            y: imageAttributes.y,
            width: imageAttributes.width,
            height: imageAttributes.height
          };
        }
        this.isXdimension = true;
        width = (this.mNoOfModules + 2 * quietZone) * dimension;
        height = (this.mNoOfModules + 2 * quietZone) * dimension;
        var w = this.mNoOfModules + 2 * quietZone;
        var h = this.mNoOfModules + 2 * quietZone;
        var optionsCollection = [];
        for (var i = 0; i < w; i++) {
          for (var j = 0; j < h; j++) {
            var color = void 0;
            color = this.mModuleValue[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)].isBlack ? foreColor : "white";
            if (this.mDataAllocationValues[parseInt(j.toString(), 10)][parseInt(i.toString(), 10)].isFilled) {
              if (this.mDataAllocationValues[parseInt(j.toString(), 10)][parseInt(i.toString(), 10)].isBlack) {
                color = foreColor;
              }
            }
            if (color !== "white") {
              var options = this.getBaseAttributes(dimension, dimension, x, displayText.position === "Bottom" ? y : y + textBounds.height / 2, color);
              var currentBound = {
                x: options.x,
                y: options.y,
                width: dimension,
                height: dimension
              };
              if (imageBound == null || !this.containsRect(imageBound, currentBound)) {
                optionsCollection.push(options);
              }
            }
            x = x + dimension;
          }
          y = y + dimension;
          x = (actualWidth >= size ? (actualWidth - size) / 2 : 0) + margin.left;
        }
        this.drawImage(canvas, optionsCollection);
        if (imageAttributes) {
          this.drawImage(canvas, [imageAttributes]);
        }
        this.mModuleValue = void 0;
        this.mDataAllocationValues = void 0;
        return true;
      } else {
        return false;
      }
    };
    QRCode2.prototype.containsRect = function(rect1, rect2) {
      return rect1.x <= rect2.x && rect1.x + rect1.width >= rect2.x + rect2.width && rect1.y <= rect2.y && rect1.y + rect1.height >= rect2.y + rect2.height;
    };
    QRCode2.prototype.drawText = function(canvas, options) {
      var barcodeRenderer = this.getInstance(canvas.id);
      barcodeRenderer.renderTextElement(canvas, options);
    };
    QRCode2.prototype.drawDisplayText = function(canvas, x, y, width, height, text, value, margin, foreColor) {
      var displayText = text;
      createMeasureElements();
      var options = this.getBaseAttributes(width, height, x, y, "black");
      options.string = displayText.text ? displayText.text : value;
      options.color = foreColor;
      options.fontStyle = displayText.font;
      options.stringSize = displayText.size;
      options.visibility = displayText.visibility;
      var textSize = measureText(options);
      var textHeight = textSize.height / 2 + 2;
      options.height = textHeight;
      options.x = x + width / 2 - textSize.width / 2 + displayText.margin.left - displayText.margin.right;
      if (text.position === "Bottom") {
        if (text.margin.top > 0) {
          options.y = y + height;
        }
        if (text.margin.bottom > 0) {
          options.y = y + height - displayText.margin.bottom;
        } else {
          if (margin.top < 10) {
            options.y = height + textSize.height / 2;
          } else {
            options.y = height + margin.top;
          }
        }
      } else {
        if (text.margin.top > 0) {
          options.y = y + text.margin.top + textSize.height / 2;
        } else {
          options.y = y + textSize.height / 2;
        }
      }
      if (text.visibility) {
        this.drawText(canvas, options);
      }
      return options;
    };
    QRCode2.prototype.generateValues = function() {
      this.mQrBarcodeValues = new PdfQRBarcodeValues(this.mVersion, this.mErrorCorrectionLevel);
      this.initialize();
      this.mQrBarcodeValues = new PdfQRBarcodeValues(this.mVersion, this.mErrorCorrectionLevel);
      for (var i = 0; i < this.mNoOfModules; i++) {
        this.mModuleValue.push([0]);
        for (var j = 0; j < this.mNoOfModules; j++) {
          this.mModuleValue[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)] = new ModuleValue();
        }
      }
      this.drawPDP(0, 0);
      this.drawPDP(this.mNoOfModules - 7, 0);
      this.drawPDP(0, this.mNoOfModules - 7);
      this.drawTimingPattern();
      if (this.mVersion !== 1) {
        var allignCoOrdinates = this.getAlignmentPatternCoOrdinates();
        for (var _i = 0, _a = Object.keys(allignCoOrdinates); _i < _a.length; _i++) {
          var i = _a[_i];
          for (var _b = 0, _c = Object.keys(allignCoOrdinates); _b < _c.length; _b++) {
            var j = _c[_b];
            if (!this.mModuleValue[allignCoOrdinates["" + i]][allignCoOrdinates["" + j]].isPdp) {
              this.drawAlignmentPattern(allignCoOrdinates["" + i], allignCoOrdinates["" + j]);
            }
          }
        }
      }
      this.allocateFormatAndVersionInformation();
      var encodeData = null;
      encodeData = this.encodeData();
      this.dataAllocationAndMasking(encodeData);
      this.drawFormatInformation();
      this.addQuietZone();
      this.mQrBarcodeValues.FormatInformation = void 0;
      this.mQrBarcodeValues.NumberOfDataCodeWord = void 0;
      this.mQrBarcodeValues.NumberOfErrorCorrectingCodeWords = void 0;
      this.mQrBarcodeValues.VersionInformation = void 0;
      this.mQrBarcodeValues.alphanumericDataCapacityHigh = void 0;
      this.mQrBarcodeValues.alphanumericDataCapacityLow = void 0;
      this.mQrBarcodeValues.alphanumericDataCapacityMedium = void 0;
      this.mQrBarcodeValues.alphanumericDataCapacityQuartile = void 0;
      this.mQrBarcodeValues.binaryDataCapacityHigh = void 0;
      this.mQrBarcodeValues.dataCapacityValues = void 0;
      this.mQrBarcodeValues.endValues = void 0;
      this.mQrBarcodeValues.dataCapacityValues = void 0;
      this.mQrBarcodeValues = void 0;
      this.mIsUserMentionedVersion = void 0;
      this.mVersion = void 0;
    };
    QRCode2.prototype.drawPDP = function(x, y) {
      var i;
      var j;
      for (i = x, j = y; i < x + 7; i++, j++) {
        this.mModuleValue[parseInt(i.toString(), 10)][parseInt(y.toString(), 10)].isBlack = true;
        this.mModuleValue[parseInt(i.toString(), 10)][parseInt(y.toString(), 10)].isFilled = true;
        this.mModuleValue[parseInt(i.toString(), 10)][parseInt(y.toString(), 10)].isPdp = true;
        this.mModuleValue[parseInt(i.toString(), 10)][y + 6].isBlack = true;
        this.mModuleValue[parseInt(i.toString(), 10)][y + 6].isFilled = true;
        this.mModuleValue[parseInt(i.toString(), 10)][y + 6].isPdp = true;
        if (y + 7 < this.mNoOfModules) {
          this.mModuleValue[parseInt(i.toString(), 10)][y + 7].isBlack = false;
          this.mModuleValue[parseInt(i.toString(), 10)][y + 7].isFilled = true;
          this.mModuleValue[parseInt(i.toString(), 10)][y + 7].isPdp = true;
        } else if (y - 1 >= 0) {
          this.mModuleValue[parseInt(i.toString(), 10)][y - 1].isBlack = false;
          this.mModuleValue[parseInt(i.toString(), 10)][y - 1].isFilled = true;
          this.mModuleValue[parseInt(i.toString(), 10)][y - 1].isPdp = true;
        }
        this.mModuleValue[parseInt(x.toString(), 10)][parseInt(j.toString(), 10)].isBlack = true;
        this.mModuleValue[parseInt(x.toString(), 10)][parseInt(j.toString(), 10)].isFilled = true;
        this.mModuleValue[parseInt(x.toString(), 10)][parseInt(j.toString(), 10)].isPdp = true;
        this.mModuleValue[x + 6][parseInt(j.toString(), 10)].isBlack = true;
        this.mModuleValue[x + 6][parseInt(j.toString(), 10)].isFilled = true;
        this.mModuleValue[x + 6][parseInt(j.toString(), 10)].isPdp = true;
        if (x + 7 < this.mNoOfModules) {
          this.mModuleValue[x + 7][parseInt(j.toString(), 10)].isBlack = false;
          this.mModuleValue[x + 7][parseInt(j.toString(), 10)].isFilled = true;
          this.mModuleValue[x + 7][parseInt(j.toString(), 10)].isPdp = true;
        } else if (x - 1 >= 0) {
          this.mModuleValue[x - 1][parseInt(j.toString(), 10)].isBlack = false;
          this.mModuleValue[x - 1][parseInt(j.toString(), 10)].isFilled = true;
          this.mModuleValue[x - 1][parseInt(j.toString(), 10)].isPdp = true;
        }
      }
      if (x + 7 < this.mNoOfModules && y + 7 < this.mNoOfModules) {
        this.mModuleValue[x + 7][y + 7].isBlack = false;
        this.mModuleValue[x + 7][y + 7].isFilled = true;
        this.mModuleValue[x + 7][y + 7].isPdp = true;
      } else if (x + 7 < this.mNoOfModules && y + 7 >= this.mNoOfModules) {
        this.mModuleValue[x + 7][y - 1].isBlack = false;
        this.mModuleValue[x + 7][y - 1].isFilled = true;
        this.mModuleValue[x + 7][y - 1].isPdp = true;
      } else if (x + 7 >= this.mNoOfModules && y + 7 < this.mNoOfModules) {
        this.mModuleValue[x - 1][y + 7].isBlack = false;
        this.mModuleValue[x - 1][y + 7].isFilled = true;
        this.mModuleValue[x - 1][y + 7].isPdp = true;
      }
      x++;
      y++;
      for (i = x, j = y; i < x + 5; i++, j++) {
        this.mModuleValue[parseInt(i.toString(), 10)][parseInt(y.toString(), 10)].isBlack = false;
        this.mModuleValue[parseInt(i.toString(), 10)][parseInt(y.toString(), 10)].isFilled = true;
        this.mModuleValue[parseInt(i.toString(), 10)][parseInt(y.toString(), 10)].isPdp = true;
        this.mModuleValue[parseInt(i.toString(), 10)][y + 4].isBlack = false;
        this.mModuleValue[parseInt(i.toString(), 10)][y + 4].isFilled = true;
        this.mModuleValue[parseInt(i.toString(), 10)][y + 4].isPdp = true;
        this.mModuleValue[parseInt(x.toString(), 10)][parseInt(j.toString(), 10)].isBlack = false;
        this.mModuleValue[parseInt(x.toString(), 10)][parseInt(j.toString(), 10)].isFilled = true;
        this.mModuleValue[parseInt(x.toString(), 10)][parseInt(j.toString(), 10)].isPdp = true;
        this.mModuleValue[x + 4][parseInt(j.toString(), 10)].isBlack = false;
        this.mModuleValue[x + 4][parseInt(j.toString(), 10)].isFilled = true;
        this.mModuleValue[x + 4][parseInt(j.toString(), 10)].isPdp = true;
      }
      x++;
      y++;
      for (i = x, j = y; i < x + 3; i++, j++) {
        this.mModuleValue[parseInt(i.toString(), 10)][parseInt(y.toString(), 10)].isBlack = true;
        this.mModuleValue[parseInt(i.toString(), 10)][parseInt(y.toString(), 10)].isFilled = true;
        this.mModuleValue[parseInt(i.toString(), 10)][parseInt(y.toString(), 10)].isPdp = true;
        this.mModuleValue[parseInt(i.toString(), 10)][y + 2].isBlack = true;
        this.mModuleValue[parseInt(i.toString(), 10)][y + 2].isFilled = true;
        this.mModuleValue[parseInt(i.toString(), 10)][y + 2].isPdp = true;
        this.mModuleValue[parseInt(x.toString(), 10)][parseInt(j.toString(), 10)].isBlack = true;
        this.mModuleValue[parseInt(x.toString(), 10)][parseInt(j.toString(), 10)].isFilled = true;
        this.mModuleValue[parseInt(x.toString(), 10)][parseInt(j.toString(), 10)].isPdp = true;
        this.mModuleValue[x + 2][parseInt(j.toString(), 10)].isBlack = true;
        this.mModuleValue[x + 2][parseInt(j.toString(), 10)].isFilled = true;
        this.mModuleValue[x + 2][parseInt(j.toString(), 10)].isPdp = true;
      }
      this.mModuleValue[x + 1][y + 1].isBlack = true;
      this.mModuleValue[x + 1][y + 1].isFilled = true;
      this.mModuleValue[x + 1][y + 1].isPdp = true;
    };
    QRCode2.prototype.drawTimingPattern = function() {
      for (var i = 8; i < this.mNoOfModules - 8; i += 2) {
        this.mModuleValue[parseInt(i.toString(), 10)][6].isBlack = true;
        this.mModuleValue[parseInt(i.toString(), 10)][6].isFilled = true;
        this.mModuleValue[i + 1][6].isBlack = false;
        this.mModuleValue[i + 1][6].isFilled = true;
        this.mModuleValue[6][parseInt(i.toString(), 10)].isBlack = true;
        this.mModuleValue[6][parseInt(i.toString(), 10)].isFilled = true;
        this.mModuleValue[6][i + 1].isBlack = false;
        this.mModuleValue[6][i + 1].isFilled = true;
      }
      this.mModuleValue[this.mNoOfModules - 8][8].isBlack = true;
      this.mModuleValue[this.mNoOfModules - 8][8].isFilled = true;
    };
    QRCode2.prototype.initialize = function() {
      if (!this.mIsUserMentionedMode) {
        this.chooseDefaultMode = true;
      }
      var mode = "NumericMode";
      for (var i = 0; i < this.text.length; i++) {
        if (this.text.charCodeAt(i) < 58 && this.text.charCodeAt(i) > 47) {
        } else if (this.text.charCodeAt(i) < 91 && this.text.charCodeAt(i) > 64 || this.text[parseInt(i.toString(), 10)] === "$" || this.text[parseInt(i.toString(), 10)] === "%" || this.text[parseInt(i.toString(), 10)] === "*" || this.text[parseInt(i.toString(), 10)] === "+" || this.text[parseInt(i.toString(), 10)] === "-" || this.text[parseInt(i.toString(), 10)] === "." || this.text[parseInt(i.toString(), 10)] === "/" || this.text[parseInt(i.toString(), 10)] === ":" || this.text[parseInt(i.toString(), 10)] === " ") {
          mode = "AlphaNumericMode";
        } else if (this.text.charCodeAt(i) >= 65377 && this.text.charCodeAt(i) <= 65439 || this.text.charCodeAt(i) >= 97 && this.text.charCodeAt(i) <= 122) {
          mode = "BinaryMode";
          break;
        } else {
          mode = "BinaryMode";
          this.mIsEci = true;
          break;
        }
      }
      if (this.mIsUserMentionedMode) {
        if (mode !== this.mInputMode) {
          if ((mode === "AlphaNumericMode" || mode === "BinaryMode") && this.mInputMode === "NumericMode" || mode === "BinaryMode" && this.mInputMode === "AlphaNumericMode") {
            this.validInput = false;
            if (mode !== this.mInputMode) {
              if ((mode === "AlphaNumericMode" || mode === "BinaryMode") && this.mInputMode === "NumericMode" || mode === "BinaryMode" && this.mInputMode === "AlphaNumericMode") {
                this.validInput = false;
              }
            }
          }
        }
      }
      this.inputMode = mode;
      if (this.mIsEci === true) {
        for (var i = 0; i < this.text.length; i++) {
          if (this.text.charCodeAt(i) >= 32 && this.text.charCodeAt(i) <= 255) {
            continue;
          }
        }
      }
      if (this.mixVersionERC) {
        if (!this.mIsUserMentionedVersion || this.mVersion & QRCodeVersion.Auto) {
          var dataCapacityOfVersions = null;
          if (this.mIsUserMentionedErrorCorrectionLevel) {
            switch (this.mInputMode) {
              case "NumericMode":
                switch (this.mErrorCorrectionLevel) {
                  case 7:
                    dataCapacityOfVersions = this.mQrBarcodeValues.numericDataCapacityLow;
                    break;
                  case 15:
                    dataCapacityOfVersions = this.mQrBarcodeValues.numericDataCapacityMedium;
                    break;
                  case 25:
                    dataCapacityOfVersions = this.mQrBarcodeValues.numericDataCapacityQuartile;
                    break;
                  case 30:
                    dataCapacityOfVersions = this.mQrBarcodeValues.numericDataCapacityHigh;
                    break;
                }
                break;
              case "AlphaNumericMode":
                switch (this.mErrorCorrectionLevel) {
                  case 7:
                    dataCapacityOfVersions = this.mQrBarcodeValues.alphanumericDataCapacityLow;
                    break;
                  case 15:
                    dataCapacityOfVersions = this.mQrBarcodeValues.alphanumericDataCapacityMedium;
                    break;
                  case 25:
                    dataCapacityOfVersions = this.mQrBarcodeValues.alphanumericDataCapacityQuartile;
                    break;
                  case 30:
                    dataCapacityOfVersions = this.mQrBarcodeValues.alphanumericDataCapacityHigh;
                    break;
                }
                break;
              case "BinaryMode":
                switch (this.mErrorCorrectionLevel) {
                  case 7:
                    dataCapacityOfVersions = this.mQrBarcodeValues.binaryDataCapacityLow;
                    break;
                  case 15:
                    dataCapacityOfVersions = this.mQrBarcodeValues.binaryDataCapacityMedium;
                    break;
                  case 25:
                    dataCapacityOfVersions = this.mQrBarcodeValues.binaryDataCapacityQuartile;
                    break;
                  case 30:
                    dataCapacityOfVersions = this.mQrBarcodeValues.binaryDataCapacityHigh;
                    break;
                }
                break;
            }
          } else {
            this.mErrorCorrectionLevel = ErrorCorrectionLevel.Medium;
            switch (this.mInputMode) {
              case "NumericMode":
                dataCapacityOfVersions = this.mQrBarcodeValues.numericDataCapacityMedium;
                break;
              case "AlphaNumericMode":
                dataCapacityOfVersions = this.mQrBarcodeValues.alphanumericDataCapacityMedium;
                break;
              case "BinaryMode":
                dataCapacityOfVersions = this.mQrBarcodeValues.binaryDataCapacityMedium;
                break;
            }
          }
          var i = void 0;
          for (i = 0; i < dataCapacityOfVersions.length; i++) {
            if (dataCapacityOfVersions[parseInt(i.toString(), 10)] > this.text.length) {
              break;
            }
          }
          this.version = i + 1;
        } else if (this.mIsUserMentionedVersion) {
          if (this.mIsUserMentionedErrorCorrectionLevel) {
            var capacity = 0;
            if (this.mInputMode === "AlphaNumericMode") {
              capacity = this.mQrBarcodeValues.getAlphanumericDataCapacity(this.mVersion, this.mErrorCorrectionLevel);
            } else if (this.mInputMode === "NumericMode") {
              capacity = this.mQrBarcodeValues.getNumericDataCapacity(this.mVersion, this.mErrorCorrectionLevel);
            }
            if (this.mInputMode === "BinaryMode") {
              capacity = this.mQrBarcodeValues.getBinaryDataCapacity(this.mVersion, this.mErrorCorrectionLevel);
            }
            if (capacity < this.text.length) {
              if (!this.chooseDefaultMode) {
                this.validInput = false;
              } else {
                this.mixVersionERC = false;
              }
            }
          } else {
            var capacityLow = 0;
            var capacityMedium = 0;
            var capacityQuartile = 0;
            var capacityHigh = 0;
            if (this.mInputMode === "AlphaNumericMode") {
              capacityLow = this.mQrBarcodeValues.getAlphanumericDataCapacity(this.mVersion, ErrorCorrectionLevel.Low);
              capacityMedium = this.mQrBarcodeValues.getAlphanumericDataCapacity(this.mVersion, ErrorCorrectionLevel.Medium);
              capacityQuartile = this.mQrBarcodeValues.getAlphanumericDataCapacity(this.mVersion, ErrorCorrectionLevel.Quartile);
              capacityHigh = this.mQrBarcodeValues.getAlphanumericDataCapacity(this.mVersion, ErrorCorrectionLevel.High);
            } else if (this.mInputMode === "NumericMode") {
              capacityLow = this.mQrBarcodeValues.getNumericDataCapacity(this.mVersion, ErrorCorrectionLevel.Low);
              capacityMedium = this.mQrBarcodeValues.getNumericDataCapacity(this.mVersion, ErrorCorrectionLevel.Medium);
              capacityQuartile = this.mQrBarcodeValues.getNumericDataCapacity(this.mVersion, ErrorCorrectionLevel.Quartile);
              capacityHigh = this.mQrBarcodeValues.getNumericDataCapacity(this.mVersion, ErrorCorrectionLevel.High);
            } else if (this.mInputMode === "BinaryMode") {
              capacityLow = this.mQrBarcodeValues.getBinaryDataCapacity(this.mVersion, ErrorCorrectionLevel.Low);
              capacityMedium = this.mQrBarcodeValues.getBinaryDataCapacity(this.mVersion, ErrorCorrectionLevel.Medium);
              capacityQuartile = this.mQrBarcodeValues.getBinaryDataCapacity(this.mVersion, ErrorCorrectionLevel.Quartile);
              capacityHigh = this.mQrBarcodeValues.getBinaryDataCapacity(this.mVersion, ErrorCorrectionLevel.High);
            }
            if (capacityHigh > this.text.length) {
              this.mErrorCorrectionLevel = ErrorCorrectionLevel.High;
            } else if (capacityQuartile > this.text.length) {
              this.mErrorCorrectionLevel = ErrorCorrectionLevel.Quartile;
            } else if (capacityMedium > this.text.length) {
              this.mErrorCorrectionLevel = ErrorCorrectionLevel.Medium;
            } else if (capacityLow > this.text.length) {
              this.mErrorCorrectionLevel = ErrorCorrectionLevel.Low;
            } else {
              this.validInput = false;
            }
          }
        }
      }
    };
    QRCode2.prototype.addQuietZone = function() {
      var quietZone = QuietZone.All;
      var w = this.mNoOfModules + 2 * quietZone;
      var h = this.mNoOfModules + 2 * quietZone;
      var tempValue1 = [];
      var tempValue2 = [];
      for (var i = 0; i < w; i++) {
        tempValue1.push([0]);
        tempValue2.push([0]);
        for (var j = 0; j < h; j++) {
          tempValue1[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)] = new ModuleValue();
          tempValue2[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)] = new ModuleValue();
        }
      }
      for (var i = 0; i < h; i++) {
        tempValue1[0][parseInt(i.toString(), 10)] = new ModuleValue();
        tempValue1[0][parseInt(i.toString(), 10)].isBlack = false;
        tempValue1[0][parseInt(i.toString(), 10)].isFilled = false;
        tempValue1[0][parseInt(i.toString(), 10)].isPdp = false;
        tempValue2[0][parseInt(i.toString(), 10)] = new ModuleValue();
        tempValue2[0][parseInt(i.toString(), 10)].isBlack = false;
        tempValue2[0][parseInt(i.toString(), 10)].isFilled = false;
        tempValue2[0][parseInt(i.toString(), 10)].isPdp = false;
      }
      for (var i = quietZone; i < w - quietZone; i++) {
        tempValue1[parseInt(i.toString(), 10)][0] = new ModuleValue();
        tempValue1[parseInt(i.toString(), 10)][0].isBlack = false;
        tempValue1[parseInt(i.toString(), 10)][0].isFilled = false;
        tempValue1[parseInt(i.toString(), 10)][0].isPdp = false;
        tempValue2[parseInt(i.toString(), 10)][0] = new ModuleValue();
        tempValue2[parseInt(i.toString(), 10)][0].isBlack = false;
        tempValue2[parseInt(i.toString(), 10)][0].isFilled = false;
        tempValue2[parseInt(i.toString(), 10)][0].isPdp = false;
        for (var j = quietZone; j < h - quietZone; j++) {
          tempValue1[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)] = this.mModuleValue[i - quietZone][j - quietZone];
          tempValue2[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)] = this.mDataAllocationValues[i - quietZone][j - quietZone];
        }
        tempValue1[parseInt(i.toString(), 10)][h - quietZone] = new ModuleValue();
        tempValue1[parseInt(i.toString(), 10)][h - quietZone].isBlack = false;
        tempValue1[parseInt(i.toString(), 10)][h - quietZone].isFilled = false;
        tempValue1[parseInt(i.toString(), 10)][h - quietZone].isPdp = false;
        tempValue2[parseInt(i.toString(), 10)][h - quietZone] = new ModuleValue();
        tempValue2[parseInt(i.toString(), 10)][h - quietZone].isBlack = false;
        tempValue2[parseInt(i.toString(), 10)][h - quietZone].isFilled = false;
        tempValue2[parseInt(i.toString(), 10)][h - quietZone].isPdp = false;
      }
      for (var i = 0; i < h; i++) {
        tempValue1[w - quietZone][parseInt(i.toString(), 10)] = new ModuleValue();
        tempValue1[w - quietZone][parseInt(i.toString(), 10)].isBlack = false;
        tempValue1[w - quietZone][parseInt(i.toString(), 10)].isFilled = false;
        tempValue1[w - quietZone][parseInt(i.toString(), 10)].isPdp = false;
        tempValue2[w - quietZone][parseInt(i.toString(), 10)] = new ModuleValue();
        tempValue2[w - quietZone][parseInt(i.toString(), 10)].isBlack = false;
        tempValue2[w - quietZone][parseInt(i.toString(), 10)].isFilled = false;
        tempValue2[w - quietZone][parseInt(i.toString(), 10)].isPdp = false;
      }
      this.mModuleValue = tempValue1;
      this.mDataAllocationValues = tempValue2;
    };
    QRCode2.prototype.drawFormatInformation = function() {
      var formatInformation = this.mQrBarcodeValues.FormatInformation;
      var count = 0;
      for (var i = 0; i < 7; i++) {
        if (i === 6) {
          this.mModuleValue[i + 1][8].isBlack = formatInformation[parseInt(count.toString(), 10)] === 1 ? true : false;
        } else {
          this.mModuleValue[parseInt(i.toString(), 10)][8].isBlack = formatInformation[parseInt(count.toString(), 10)] === 1 ? true : false;
        }
        this.mModuleValue[8][this.mNoOfModules - i - 1].isBlack = formatInformation[count++] === 1 ? true : false;
      }
      count = 14;
      for (var i = 0; i < 7; i++) {
        if (i === 6) {
          this.mModuleValue[8][i + 1].isBlack = formatInformation[parseInt(count.toString(), 10)] === 1 ? true : false;
        } else {
          this.mModuleValue[8][parseInt(i.toString(), 10)].isBlack = formatInformation[parseInt(count.toString(), 10)] === 1 ? true : false;
        }
        this.mModuleValue[this.mNoOfModules - i - 1][8].isBlack = formatInformation[count--] === 1 ? true : false;
      }
      this.mModuleValue[8][8].isBlack = formatInformation[7] === 1 ? true : false;
      this.mModuleValue[8][this.mNoOfModules - 8].isBlack = formatInformation[7] === 1 ? true : false;
    };
    QRCode2.prototype.dataAllocationAndMasking = function(data) {
      this.mDataAllocationValues = [];
      for (var i = 0; i < this.mNoOfModules; i++) {
        this.mDataAllocationValues.push([0]);
        for (var j = 0; j < this.mNoOfModules; j++) {
          this.mDataAllocationValues[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)] = new ModuleValue();
        }
      }
      var point = 0;
      for (var i = this.mNoOfModules - 1; i >= 0; i -= 2) {
        for (var j = this.mNoOfModules - 1; j >= 0; j--) {
          if (!(this.mModuleValue[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)].isFilled && this.mModuleValue[i - 1][parseInt(j.toString(), 10)].isFilled)) {
            if (!this.mModuleValue[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)].isFilled) {
              if (point + 1 < data.length) {
                this.mDataAllocationValues[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)].isBlack = data[point++];
              }
              if ((i + j) % 3 === 0) {
                this.mDataAllocationValues[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)].isBlack = this.mDataAllocationValues[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)].isBlack ? true : false;
              } else {
                this.mDataAllocationValues[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)].isBlack = this.mDataAllocationValues[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)].isBlack ? false : true;
              }
              this.mDataAllocationValues[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)].isFilled = true;
            }
            if (!this.mModuleValue[i - 1][parseInt(j.toString(), 10)].isFilled) {
              if (point + 1 < data.length) {
                this.mDataAllocationValues[i - 1][parseInt(j.toString(), 10)].isBlack = data[point++];
              }
              if ((i - 1 + j) % 3 === 0) {
                this.mDataAllocationValues[i - 1][parseInt(j.toString(), 10)].isBlack = this.mDataAllocationValues[i - 1][parseInt(j.toString(), 10)].isBlack ? true : false;
              } else {
                this.mDataAllocationValues[i - 1][parseInt(j.toString(), 10)].isBlack = this.mDataAllocationValues[i - 1][parseInt(j.toString(), 10)].isBlack ? false : true;
              }
              this.mDataAllocationValues[i - 1][parseInt(j.toString(), 10)].isFilled = true;
            }
          }
        }
        i -= 2;
        if (i === 6) {
          i--;
        }
        for (var k = 0; k < this.mNoOfModules; k++) {
          if (!(this.mModuleValue[parseInt(i.toString(), 10)][parseInt(k.toString(), 10)].isFilled && this.mModuleValue[i - 1][parseInt(k.toString(), 10)].isFilled)) {
            if (!this.mModuleValue[parseInt(i.toString(), 10)][parseInt(k.toString(), 10)].isFilled) {
              if (point + 1 < data.length) {
                this.mDataAllocationValues[parseInt(i.toString(), 10)][parseInt(k.toString(), 10)].isBlack = data[point++];
              }
              if ((i + k) % 3 !== 0) {
                this.mDataAllocationValues[parseInt(i.toString(), 10)][parseInt(k.toString(), 10)].isBlack = this.mDataAllocationValues[parseInt(i.toString(), 10)][parseInt(k.toString(), 10)].isBlack ? false : true;
              } else {
                this.mDataAllocationValues[parseInt(i.toString(), 10)][parseInt(k.toString(), 10)].isBlack = this.mDataAllocationValues[parseInt(i.toString(), 10)][parseInt(k.toString(), 10)].isBlack ? true : false;
              }
              this.mDataAllocationValues[parseInt(i.toString(), 10)][parseInt(k.toString(), 10)].isFilled = true;
            }
            if (!this.mModuleValue[i - 1][parseInt(k.toString(), 10)].isFilled) {
              if (point + 1 < data.length) {
                this.mDataAllocationValues[i - 1][parseInt(k.toString(), 10)].isBlack = data[point++];
              }
              if ((i - 1 + k) % 3 !== 0) {
                this.mDataAllocationValues[i - 1][parseInt(k.toString(), 10)].isBlack = this.mDataAllocationValues[i - 1][parseInt(k.toString(), 10)].isBlack ? false : true;
              } else {
                this.mDataAllocationValues[i - 1][parseInt(k.toString(), 10)].isBlack = this.mDataAllocationValues[i - 1][parseInt(k.toString(), 10)].isBlack ? true : false;
              }
              this.mDataAllocationValues[i - 1][parseInt(k.toString(), 10)].isFilled = true;
            }
          }
        }
      }
      for (var i = 0; i < this.mNoOfModules; i++) {
        for (var j = 0; j < this.mNoOfModules; j++) {
          if (!this.mModuleValue[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)].isFilled) {
            var flag = this.mDataAllocationValues[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)].isBlack;
            if (flag) {
              this.mDataAllocationValues[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)].isBlack = false;
            } else {
              this.mDataAllocationValues[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)].isBlack = true;
            }
          }
        }
      }
    };
    QRCode2.prototype.allocateFormatAndVersionInformation = function() {
      for (var i = 0; i < 9; i++) {
        this.mModuleValue[8][parseInt(i.toString(), 10)].isFilled = true;
        this.mModuleValue[parseInt(i.toString(), 10)][8].isFilled = true;
      }
      for (var i = this.mNoOfModules - 8; i < this.mNoOfModules; i++) {
        this.mModuleValue[8][parseInt(i.toString(), 10)].isFilled = true;
        this.mModuleValue[parseInt(i.toString(), 10)][8].isFilled = true;
      }
      if (this.mVersion > 6) {
        var versionInformation = this.mQrBarcodeValues.VersionInformation;
        var count = 0;
        for (var i = 0; i < 6; i++) {
          for (var j = 2; j >= 0; j--) {
            this.mModuleValue[parseInt(i.toString(), 10)][this.mNoOfModules - 9 - j].isBlack = versionInformation[parseInt(count.toString(), 10)] === 1 ? true : false;
            this.mModuleValue[parseInt(i.toString(), 10)][this.mNoOfModules - 9 - j].isFilled = true;
            this.mModuleValue[this.mNoOfModules - 9 - j][parseInt(i.toString(), 10)].isBlack = versionInformation[count++] === 1 ? true : false;
            this.mModuleValue[this.mNoOfModules - 9 - j][parseInt(i.toString(), 10)].isFilled = true;
          }
        }
      }
    };
    QRCode2.prototype.drawAlignmentPattern = function(x, y) {
      var i;
      var j;
      for (i = x - 2, j = y - 2; i < x + 3; i++, j++) {
        this.mModuleValue[parseInt(i.toString(), 10)][y - 2].isBlack = true;
        this.mModuleValue[parseInt(i.toString(), 10)][y - 2].isFilled = true;
        this.mModuleValue[parseInt(i.toString(), 10)][y + 2].isBlack = true;
        this.mModuleValue[parseInt(i.toString(), 10)][y + 2].isFilled = true;
        this.mModuleValue[x - 2][parseInt(j.toString(), 10)].isBlack = true;
        this.mModuleValue[x - 2][parseInt(j.toString(), 10)].isFilled = true;
        this.mModuleValue[x + 2][parseInt(j.toString(), 10)].isBlack = true;
        this.mModuleValue[x + 2][parseInt(j.toString(), 10)].isFilled = true;
      }
      for (i = x - 1, j = y - 1; i < x + 2; i++, j++) {
        this.mModuleValue[parseInt(i.toString(), 10)][y - 1].isBlack = false;
        this.mModuleValue[parseInt(i.toString(), 10)][y - 1].isFilled = true;
        this.mModuleValue[parseInt(i.toString(), 10)][y + 1].isBlack = false;
        this.mModuleValue[parseInt(i.toString(), 10)][y + 1].isFilled = true;
        this.mModuleValue[x - 1][parseInt(j.toString(), 10)].isBlack = false;
        this.mModuleValue[x - 1][parseInt(j.toString(), 10)].isFilled = true;
        this.mModuleValue[x + 1][parseInt(j.toString(), 10)].isBlack = false;
        this.mModuleValue[x + 1][parseInt(j.toString(), 10)].isFilled = true;
      }
      this.mModuleValue[parseInt(x.toString(), 10)][parseInt(y.toString(), 10)].isBlack = true;
      this.mModuleValue[parseInt(x.toString(), 10)][parseInt(y.toString(), 10)].isFilled = true;
    };
    QRCode2.prototype.getAlignmentPatternCoOrdinates = function() {
      var allign = null;
      switch (this.mVersion) {
        case 2:
          allign = [6, 18];
          break;
        case 3:
          allign = [6, 22];
          break;
        case 4:
          allign = [6, 26];
          break;
        case 5:
          allign = [6, 30];
          break;
        case 6:
          allign = [6, 34];
          break;
        case 7:
          allign = [6, 22, 38];
          break;
        case 8:
          allign = [6, 24, 42];
          break;
        case 9:
          allign = [6, 26, 46];
          break;
        case 10:
          allign = [6, 28, 50];
          break;
        case 11:
          allign = [6, 30, 54];
          break;
        case 12:
          allign = [6, 32, 58];
          break;
        case 13:
          allign = [6, 34, 62];
          break;
        case 14:
          allign = [6, 26, 46, 66];
          break;
        case 15:
          allign = [6, 26, 48, 70];
          break;
        case 16:
          allign = [6, 26, 50, 74];
          break;
        case 17:
          allign = [6, 30, 54, 78];
          break;
        case 18:
          allign = [6, 30, 56, 82];
          break;
        case 19:
          allign = [6, 30, 58, 86];
          break;
        case 20:
          allign = [6, 34, 62, 90];
          break;
        case 21:
          allign = [6, 28, 50, 72, 94];
          break;
        case 22:
          allign = [6, 26, 50, 74, 98];
          break;
        case 23:
          allign = [6, 30, 54, 78, 102];
          break;
        case 24:
          allign = [6, 28, 54, 80, 106];
          break;
        case 25:
          allign = [6, 32, 58, 84, 110];
          break;
        case 26:
          allign = [6, 30, 58, 86, 114];
          break;
        case 27:
          allign = [6, 34, 62, 90, 118];
          break;
        case 28:
          allign = [6, 26, 50, 74, 98, 122];
          break;
        case 29:
          allign = [6, 30, 54, 78, 102, 126];
          break;
        case 30:
          allign = [6, 26, 52, 78, 104, 130];
          break;
        case 31:
          allign = [6, 30, 56, 82, 108, 134];
          break;
        case 32:
          allign = [6, 34, 60, 86, 112, 138];
          break;
        case 33:
          allign = [6, 30, 58, 86, 114, 142];
          break;
        case 34:
          allign = [6, 34, 62, 90, 118, 146];
          break;
        case 35:
          allign = [6, 30, 54, 78, 102, 126, 150];
          break;
        case 36:
          allign = [6, 24, 50, 76, 102, 128, 154];
          break;
        case 37:
          allign = [6, 28, 54, 80, 106, 132, 158];
          break;
        case 38:
          allign = [6, 32, 58, 84, 110, 136, 162];
          break;
        case 39:
          allign = [6, 26, 54, 82, 110, 138, 166];
          break;
        case 40:
          allign = [6, 30, 58, 86, 114, 142, 170];
          break;
      }
      return allign;
    };
    QRCode2.prototype.encodeData = function() {
      var encodeData = [];
      switch (this.mInputMode) {
        case "NumericMode":
          encodeData.push(false);
          encodeData.push(false);
          encodeData.push(false);
          encodeData.push(true);
          break;
        case "AlphaNumericMode":
          encodeData.push(false);
          encodeData.push(false);
          encodeData.push(true);
          encodeData.push(false);
          break;
        case "BinaryMode":
          if (this.mIsEci) {
            encodeData.push(false);
            encodeData.push(true);
            encodeData.push(true);
            encodeData.push(true);
            var numberInBool = this.stringToBoolArray(this.mEciAssignmentNumber.toString(), 8);
            for (var _i = 0, _a = Object.keys(numberInBool); _i < _a.length; _i++) {
              var x = _a[_i];
              encodeData.push(numberInBool["" + x]);
            }
          }
          encodeData.push(false);
          encodeData.push(true);
          encodeData.push(false);
          encodeData.push(false);
          break;
      }
      var numberOfBitsInCharacterCountIndicator = 0;
      if (this.mVersion < 10) {
        switch (this.mInputMode) {
          case "NumericMode":
            numberOfBitsInCharacterCountIndicator = 10;
            break;
          case "AlphaNumericMode":
            numberOfBitsInCharacterCountIndicator = 9;
            break;
          case "BinaryMode":
            numberOfBitsInCharacterCountIndicator = 8;
            break;
        }
      } else if (this.mVersion < 27) {
        switch (this.mInputMode) {
          case "NumericMode":
            numberOfBitsInCharacterCountIndicator = 12;
            break;
          case "AlphaNumericMode":
            numberOfBitsInCharacterCountIndicator = 11;
            break;
          case "BinaryMode":
            numberOfBitsInCharacterCountIndicator = 16;
            break;
        }
      } else {
        switch (this.mInputMode) {
          case "NumericMode":
            numberOfBitsInCharacterCountIndicator = 14;
            break;
          case "AlphaNumericMode":
            numberOfBitsInCharacterCountIndicator = 13;
            break;
          case "BinaryMode":
            numberOfBitsInCharacterCountIndicator = 16;
            break;
        }
      }
      var numberOfBitsInCharacterCountIndicatorInBool = this.intToBoolArray(this.text.length, numberOfBitsInCharacterCountIndicator);
      for (var i = 0; i < numberOfBitsInCharacterCountIndicator; i++) {
        encodeData.push(numberOfBitsInCharacterCountIndicatorInBool[parseInt(i.toString(), 10)]);
      }
      if (this.mInputMode === "NumericMode") {
        var dataStringArray = this.text.split("");
        var number = "";
        for (var i = 0; i < dataStringArray.length; i++) {
          var numberInBool = void 0;
          number += dataStringArray[parseInt(i.toString(), 10)];
          if (i % 3 === 2 && i !== 0 || i === dataStringArray.length - 1) {
            if (number.toString().length === 3) {
              numberInBool = this.stringToBoolArray(number, 10);
            } else if (number.toString().length === 2) {
              numberInBool = this.stringToBoolArray(number, 7);
            } else {
              numberInBool = this.stringToBoolArray(number, 4);
            }
            number = "";
            for (var _b = 0, _c = Object.keys(numberInBool); _b < _c.length; _b++) {
              var x = _c[_b];
              encodeData.push(numberInBool["" + x]);
            }
          }
        }
      } else if (this.mInputMode === "AlphaNumericMode") {
        var dataStringArray = this.text.split("");
        var numberInString = "";
        var number = 0;
        for (var i = 0; i < dataStringArray.length; i++) {
          var numberInBool = void 0;
          numberInString += dataStringArray[parseInt(i.toString(), 10)];
          if (i % 2 === 0 && i + 1 !== dataStringArray.length) {
            number = 45 * this.mQrBarcodeValues.getAlphaNumericValues(dataStringArray[parseInt(i.toString(), 10)]);
          }
          if (i % 2 === 1 && i !== 0) {
            number += this.mQrBarcodeValues.getAlphaNumericValues(dataStringArray[parseInt(i.toString(), 10)]);
            numberInBool = this.intToBoolArray(number, 11);
            number = 0;
            for (var _d = 0, _e = Object.keys(numberInBool); _d < _e.length; _d++) {
              var x = _e[_d];
              encodeData.push(numberInBool["" + x]);
            }
            numberInString = "";
          }
          if (i !== 1 && numberInString !== "") {
            if (i + 1 === dataStringArray.length && numberInString.length === 1) {
              number = this.mQrBarcodeValues.getAlphaNumericValues(dataStringArray[parseInt(i.toString(), 10)]);
              numberInBool = this.intToBoolArray(number, 6);
              number = 0;
              for (var _f = 0, _g = Object.keys(numberInBool); _f < _g.length; _f++) {
                var x = _g[_f];
                encodeData.push(numberInBool["" + x]);
              }
            }
          }
        }
      } else if (this.mInputMode === "BinaryMode") {
        var dataStringArray = this.text.split("");
        for (var i = 0; i < dataStringArray.length; i++) {
          var number = 0;
          if (this.text.charCodeAt(i) >= 32 && this.text.charCodeAt(i) <= 126 || this.text.charCodeAt(i) >= 161 && this.text.charCodeAt(i) <= 255 || this.text.charCodeAt(i) === 10 || this.text.charCodeAt(i) === 13) {
            number = dataStringArray[parseInt(i.toString(), 10)].charCodeAt(0);
          } else if (this.text.charCodeAt(i) >= 65377 && this.text.charCodeAt(i) <= 65439) {
            number = dataStringArray[parseInt(i.toString(), 10)].charCodeAt(0) - 65216;
          } else if (this.text.charCodeAt(i) >= 1025 && this.text.charCodeAt(i) <= 1119) {
            number = dataStringArray[parseInt(i.toString(), 10)].charCodeAt(0) - 864;
          } else {
            this.validInput = false;
          }
          var numberInBool = this.intToBoolArray(number, 8);
          for (var _h = 0, _j = Object.keys(numberInBool); _h < _j.length; _h++) {
            var x = _j[_h];
            encodeData.push(numberInBool[x]);
          }
        }
      }
      if (this.mixDataCount === 0) {
        for (var i = 0; i < 4; i++) {
          if (encodeData.length / 8 === this.mQrBarcodeValues.NumberOfDataCodeWord) {
            break;
          } else {
            encodeData.push(false);
          }
        }
        for (; ; ) {
          if (encodeData.length % 8 === 0) {
            break;
          } else {
            encodeData.push(false);
          }
        }
        for (; ; ) {
          if (encodeData.length / 8 === this.mQrBarcodeValues.NumberOfDataCodeWord) {
            break;
          } else {
            encodeData.push(true);
            encodeData.push(true);
            encodeData.push(true);
            encodeData.push(false);
            encodeData.push(true);
            encodeData.push(true);
            encodeData.push(false);
            encodeData.push(false);
          }
          if (encodeData.length / 8 === this.mQrBarcodeValues.NumberOfDataCodeWord) {
            break;
          } else {
            encodeData.push(false);
            encodeData.push(false);
            encodeData.push(false);
            encodeData.push(true);
            encodeData.push(false);
            encodeData.push(false);
            encodeData.push(false);
            encodeData.push(true);
          }
        }
        var dataBits = this.mQrBarcodeValues.NumberOfDataCodeWord;
        var blocks = this.mQrBarcodeValues.NumberOfErrorCorrectionBlocks;
        var totalBlockSize = blocks[0];
        if (blocks.length === 6) {
          totalBlockSize = blocks[0] + blocks[3];
        }
        var ds1 = [];
        var testEncodeData = encodeData;
        if (blocks.length === 6) {
          var dataCodeWordLength = blocks[0] * blocks[2] * 8;
          testEncodeData = [];
          for (var i = 0; i < dataCodeWordLength; i++) {
            testEncodeData.push(encodeData[parseInt(i.toString(), 10)]);
          }
        }
        var dsOne = [];
        dsOne = this.createBlocks(testEncodeData, blocks[0]);
        for (var i = 0; i < blocks[0]; i++) {
          ds1[parseInt(i.toString(), 10)] = this.splitCodeWord(dsOne, i, testEncodeData.length / 8 / blocks[0]);
        }
        if (blocks.length === 6) {
          testEncodeData = [];
          for (var i = blocks[0] * blocks[2] * 8; i < encodeData.length; i++) {
            testEncodeData.push(encodeData[parseInt(i.toString(), 10)]);
          }
          var dsTwo = [];
          dsTwo = this.createBlocks(testEncodeData, blocks[3]);
          for (var i = blocks[0], count_1 = 0; i < totalBlockSize; i++) {
            ds1[parseInt(i.toString(), 10)] = this.splitCodeWord(dsTwo, count_1++, testEncodeData.length / 8 / blocks[3]);
          }
        }
        encodeData = null;
        encodeData = [];
        for (var i = 0; i < 125; i++) {
          for (var k = 0; k < totalBlockSize; k++) {
            for (var j = 0; j < 8; j++) {
              if (i < ds1[parseInt(k.toString(), 10)].length) {
                encodeData.push(ds1[parseInt(k.toString(), 10)][parseInt(i.toString(), 10)][parseInt(j.toString(), 10)] === "1" ? true : false);
              }
            }
          }
        }
        var ec = new ErrorCorrectionCodewords(this.mVersion, this.mErrorCorrectionLevel);
        dataBits = this.mQrBarcodeValues.NumberOfDataCodeWord;
        var eccw = this.mQrBarcodeValues.NumberOfErrorCorrectingCodeWords;
        blocks = this.mQrBarcodeValues.NumberOfErrorCorrectionBlocks;
        if (blocks.length === 6) {
          ec.DataBits = (dataBits - blocks[3] * blocks[5]) / blocks[0];
        } else {
          ec.DataBits = dataBits / blocks[0];
        }
        ec.Eccw = eccw / totalBlockSize;
        var polynomial = [];
        var count = 0;
        for (var i = 0; i < blocks[0]; i++) {
          ec.DC = ds1[parseInt(count.toString(), 10)];
          polynomial[count++] = ec.getErcw();
        }
        if (blocks.length === 6) {
          ec.DataBits = (dataBits - blocks[0] * blocks[2]) / blocks[3];
          for (var i = 0; i < blocks[3]; i++) {
            ec.DC = ds1[parseInt(count.toString(), 10)];
            polynomial[count++] = ec.getErcw();
          }
        }
        if (blocks.length !== 6) {
          for (var i = 0; i < polynomial[0].length; i++) {
            for (var k = 0; k < blocks[0]; k++) {
              for (var j = 0; j < 8; j++) {
                if (i < polynomial[parseInt(k.toString(), 10)].length) {
                  encodeData.push(polynomial[parseInt(k.toString(), 10)][parseInt(i.toString(), 10)][parseInt(j.toString(), 10)] === "1" ? true : false);
                }
              }
            }
          }
        } else {
          for (var i = 0; i < polynomial[0].length; i++) {
            for (var k = 0; k < totalBlockSize; k++) {
              for (var j = 0; j < 8; j++) {
                if (i < polynomial[parseInt(k.toString(), 10)].length) {
                  encodeData.push(polynomial[parseInt(k.toString(), 10)][parseInt(i.toString(), 10)][parseInt(j.toString(), 10)] === "1" ? true : false);
                }
              }
            }
          }
        }
      }
      return encodeData;
    };
    QRCode2.prototype.stringToBoolArray = function(numberInString, noOfBits) {
      var numberInBool = [];
      var dataStringArray = numberInString.split("");
      var number = 0;
      for (var i = 0; i < dataStringArray.length; i++) {
        number = number * 10 + dataStringArray[parseInt(i.toString(), 10)].charCodeAt(0) - 48;
      }
      for (var i = 0; i < noOfBits; i++) {
        numberInBool[noOfBits - i - 1] = (number >> i & 1) === 1;
      }
      return numberInBool;
    };
    QRCode2.prototype.intToBoolArray = function(number, noOfBits) {
      var numberInBool = [];
      for (var i = 0; i < noOfBits; i++) {
        numberInBool[noOfBits - i - 1] = (number >> i & 1) === 1;
      }
      return numberInBool;
    };
    QRCode2.prototype.splitCodeWord = function(ds, blk, count) {
      var ds1 = [];
      for (var i = 0; i < count; i++) {
        ds1.push(ds[parseInt(blk.toString(), 10)][parseInt(i.toString(), 10)]);
      }
      return ds1;
    };
    QRCode2.prototype.createBlocks = function(encodeData, noOfBlocks) {
      var ret = [];
      var cols = encodeData.length / 8 / noOfBlocks;
      var stringValue = "";
      var i = 0;
      var blockNumber = 0;
      for (var i_1 = 0; i_1 < noOfBlocks; i_1++) {
        ret.push([0]);
        for (var j = 0; j < cols; j++) {
          ret[parseInt(i_1.toString(), 10)][parseInt(j.toString(), 10)] = "";
        }
      }
      for (var j = 0; j < encodeData.length; j++) {
        if (j % 8 === 0 && j !== 0) {
          ret[parseInt(blockNumber.toString(), 10)][parseInt(i.toString(), 10)] = stringValue;
          stringValue = "";
          i++;
          if (i === encodeData.length / noOfBlocks / 8) {
            blockNumber++;
            i = 0;
          }
        }
        stringValue += encodeData[parseInt(j.toString(), 10)] ? "1" : "0";
      }
      ret[parseInt(blockNumber.toString(), 10)][parseInt(i.toString(), 10)] = stringValue;
      return ret;
    };
    return QRCode2;
  }()
);
var ModuleValue = (
  /** @class */
  /* @__PURE__ */ function() {
    function ModuleValue2() {
      this.isBlack = false;
      this.isFilled = false;
      this.isPdp = false;
    }
    return ModuleValue2;
  }()
);

// node_modules/@syncfusion/ej2-barcode-generator/src/barcode/primitives/icon.js
var __extends27 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate12 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var QRCodeLogo = (
  /** @class */
  function(_super) {
    __extends27(QRCodeLogo2, _super);
    function QRCodeLogo2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate12([Property("")], QRCodeLogo2.prototype, "imageSource", void 0);
    __decorate12([Property(0)], QRCodeLogo2.prototype, "width", void 0);
    __decorate12([Property(0)], QRCodeLogo2.prototype, "height", void 0);
    return QRCodeLogo2;
  }(ChildProperty)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/qrcode/qrcode.js
var __extends28 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate13 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var QRCodeGenerator = (
  /** @class */
  function(_super) {
    __extends28(QRCodeGenerator2, _super);
    function QRCodeGenerator2(options, element) {
      var _this = _super.call(this, options, element) || this;
      _this.widthChange = false;
      _this.heightChange = false;
      return _this;
    }
    QRCodeGenerator2.prototype.render = function() {
      this.notify("initial-load", {});
      this.trigger("load");
      this.notify("initial-end", {});
      this.renderElements();
      this.renderComplete();
    };
    QRCodeGenerator2.prototype.triggerEvent = function(eventName, message) {
      var arg = {
        message
      };
      this.trigger(BarcodeEvent["" + eventName], arg);
    };
    QRCodeGenerator2.prototype.renderElements = function() {
      var barCode = new QRCode();
      barCode.text = this.value;
      barCode.XDimension = this.xDimension;
      barCode.mIsUserMentionedErrorCorrectionLevel = this.errorCorrectionLevel !== void 0 ? true : false;
      barCode.mErrorCorrectionLevel = this.errorCorrectionLevel !== void 0 ? this.errorCorrectionLevel : ErrorCorrectionLevel.Medium;
      barCode.version = this.version !== void 0 ? this.version : void 0;
      barCode.mIsUserMentionedVersion = this.version !== void 0 ? true : false;
      var mode = this.mode === "SVG" ? true : false;
      var validInput = barCode.draw(this.value, this.barcodeCanvas, this.element.offsetHeight, this.element.offsetWidth, this.margin, this.displayText, mode, this.foreColor, this.logo);
      if (this.mode === "Canvas") {
        this.barcodeCanvas.getContext("2d").setTransform(1, 0, 0, 1, 0, 0);
        this.barcodeCanvas.getContext("2d").scale(1.5, 1.5);
      }
      if (!validInput) {
        var encoding = "Invalid Input";
        this.triggerEvent(BarcodeEvent.invalid, encoding);
      }
      if (this.mode === "Canvas") {
        this.barcodeCanvas.style.transform = "scale(" + 2 / 3 + ")";
        this.barcodeCanvas.style.transformOrigin = "0 0";
      }
    };
    QRCodeGenerator2.prototype.setCulture = function() {
      this.localeObj = new L10n(this.getModuleName(), this.defaultLocale, this.locale);
    };
    QRCodeGenerator2.prototype.getElementSize = function(real, rulerSize) {
      var value;
      if (real.toString().indexOf("px") > 0 || real.toString().indexOf("%") > 0) {
        value = real.toString();
      } else {
        value = real.toString() + "px";
      }
      return value;
    };
    QRCodeGenerator2.prototype.initialize = function() {
      this.element.style.display = "block";
      this.element.style.height = this.getElementSize(this.height);
      this.element.style.width = this.getElementSize(this.width);
      this.barcodeCanvas = this.barcodeRenderer.renderRootElement({
        id: this.element.id + "content",
        height: this.mode === "SVG" ? this.element.offsetHeight : this.element.offsetHeight * 1.5,
        width: this.mode === "SVG" ? this.element.offsetWidth : this.element.offsetWidth * 1.5
      }, this.backgroundColor, this.element.offsetWidth, this.element.offsetHeight);
      this.element.appendChild(this.barcodeCanvas);
    };
    QRCodeGenerator2.prototype.preRender = function() {
      this.element.classList.add("e-qrcode");
      this.barcodeRenderer = new BarcodeRenderer(this.element.id, this.mode === "SVG");
      this.initialize();
      this.initializePrivateVariables();
      this.setCulture();
    };
    QRCodeGenerator2.prototype.getPersistData = function() {
      var keyEntity = ["loaded"];
      return this.addOnPersist(keyEntity);
    };
    QRCodeGenerator2.prototype.getModuleName = function() {
      return "QRCodeGenerator";
    };
    QRCodeGenerator2.prototype.destroy = function() {
      this.notify("destroy", {});
      _super.prototype.destroy.call(this);
      var content = document.getElementById(this.element.id + "content");
      if (content) {
        this.element.removeChild(content);
      }
    };
    QRCodeGenerator2.prototype.initializePrivateVariables = function() {
      this.defaultLocale = {};
    };
    QRCodeGenerator2.prototype.exportImage = function(filename, barcodeExportType) {
      exportAsImage(barcodeExportType, filename, this.element, false, this);
    };
    QRCodeGenerator2.prototype.exportAsBase64Image = function(barcodeExportType) {
      var returnValue = exportAsImage(barcodeExportType, "", this.element, true, this);
      return returnValue;
    };
    QRCodeGenerator2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var width;
      var height;
      if (this.mode === "Canvas" && newProp.mode !== "Canvas") {
        refreshCanvasBarcode(this, this.barcodeCanvas);
      } else {
        this.barcodeRenderer = removeChildElements(newProp, this.barcodeCanvas, this.mode, this.element.id);
      }
      if (newProp.width) {
        if (this.mode === "Canvas" && newProp.mode !== "Canvas") {
          this.widthChange = true;
        }
        width = this.mode === "Canvas" && newProp.mode !== "Canvas" ? newProp.width * 1.5 : newProp.width;
        this.barcodeCanvas.setAttribute("width", String(width));
      }
      if (newProp.height) {
        if (this.mode === "Canvas" && newProp.mode !== "Canvas") {
          this.heightChange = true;
        }
        height = this.mode === "Canvas" && newProp.mode !== "Canvas" ? newProp.height * 1.5 : newProp.height;
        this.barcodeCanvas.setAttribute("height", String(height));
      }
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "width":
            this.element.style.width = this.getElementSize(width);
            this.barcodeCanvas.setAttribute("width", String(this.element.offsetWidth));
            break;
          case "height":
            this.element.style.height = this.getElementSize(height);
            this.barcodeCanvas.setAttribute("height", String(this.element.offsetHeight));
            break;
          case "backgroundColor":
            this.barcodeCanvas.setAttribute("style", "background:" + newProp.backgroundColor);
            break;
          case "mode":
            this.initialize();
        }
      }
      this.renderElements();
    };
    __decorate13([Property("100%")], QRCodeGenerator2.prototype, "height", void 0);
    __decorate13([Complex({}, QRCodeLogo)], QRCodeGenerator2.prototype, "logo", void 0);
    __decorate13([Property("100%")], QRCodeGenerator2.prototype, "width", void 0);
    __decorate13([Property("SVG")], QRCodeGenerator2.prototype, "mode", void 0);
    __decorate13([Property(1)], QRCodeGenerator2.prototype, "xDimension", void 0);
    __decorate13([Property()], QRCodeGenerator2.prototype, "errorCorrectionLevel", void 0);
    __decorate13([Complex({}, Margin)], QRCodeGenerator2.prototype, "margin", void 0);
    __decorate13([Property("white")], QRCodeGenerator2.prototype, "backgroundColor", void 0);
    __decorate13([Event2()], QRCodeGenerator2.prototype, "invalid", void 0);
    __decorate13([Property("black")], QRCodeGenerator2.prototype, "foreColor", void 0);
    __decorate13([Complex({}, DisplayText)], QRCodeGenerator2.prototype, "displayText", void 0);
    __decorate13([Property()], QRCodeGenerator2.prototype, "version", void 0);
    __decorate13([Property(void 0)], QRCodeGenerator2.prototype, "value", void 0);
    return QRCodeGenerator2;
  }(Component2)
);

// node_modules/@syncfusion/ej2-barcode-generator/src/datamatrix/datamatrix-util.js
var DataMatrix = (
  /** @class */
  function() {
    function DataMatrix2() {
      this.mXDimension = 1;
      this.mDataMatrixArray = [];
    }
    Object.defineProperty(DataMatrix2.prototype, "XDimension", {
      // eslint-disable-next-line
      /** @private */
      set: function(value) {
        this.mXDimension = value;
      },
      enumerable: true,
      configurable: true
    });
    DataMatrix2.prototype.GetData = function() {
      var givenString = this.value;
      var asciiValue = [];
      for (var i = 0; i < givenString.length; i++) {
        asciiValue.push(givenString.charCodeAt(i));
      }
      return asciiValue;
    };
    DataMatrix2.prototype.fillZero = function(destinationArray) {
      for (var i = 0; i < destinationArray.length; i++) {
        destinationArray[parseInt(i.toString(), 10)] = 0;
      }
      return destinationArray;
    };
    DataMatrix2.prototype.DataMatrixNumericEncoder = function(dataCodeword) {
      var destinationArray = dataCodeword;
      var isEven = true;
      if (destinationArray.length % 2 === 1) {
        isEven = false;
        destinationArray = Array(dataCodeword.length + 1);
        destinationArray = this.fillZero(destinationArray);
        destinationArray = this.copy(dataCodeword, 0, destinationArray, 0, dataCodeword.length);
      }
      var result = Array(destinationArray.length / 2);
      result = this.fillZero(result);
      for (var i = 0; i < result.length; i++) {
        if (!isEven && i === result.length - 1) {
          result[parseInt(i.toString(), 10)] = destinationArray[2 * i] + 1;
        } else {
          result[parseInt(i.toString(), 10)] = (destinationArray[2 * i] - 48) * 10 + (destinationArray[2 * i + 1] - 48) + 130;
        }
      }
      return result;
    };
    DataMatrix2.prototype.ComputeBase256Codeword = function(val, index) {
      var num = 149 * (index + 1) % 255 + 1;
      var num2 = val + num;
      if (num2 <= 255) {
        return num2;
      }
      return num2 - 256;
    };
    DataMatrix2.prototype.DataMatrixBaseEncoder = function(dataCodeword) {
      var num = 1;
      if (dataCodeword.length > 249) {
        num++;
      }
      var result = Array(1 + num + dataCodeword.length);
      result = this.fillZero(result);
      result[0] = 231;
      if (dataCodeword.length <= 249) {
        result[1] = dataCodeword.length;
      } else {
        result[1] = dataCodeword.length / 250 + 249;
        result[2] = dataCodeword.length % 250;
      }
      result = this.copy(dataCodeword, 0, result, 1 + num, dataCodeword.length);
      for (var i = 1; i < result.length; i++) {
        result[parseInt(i.toString(), 10)] = this.ComputeBase256Codeword(result[parseInt(i.toString(), 10)], i);
      }
      return result;
    };
    DataMatrix2.prototype.copy = function(sourceArray, sourceIndex, destinationArray, destinationIndex, length) {
      for (var i = 0; i < length; i++) {
        destinationArray[destinationIndex + i] = sourceArray[sourceIndex + i];
      }
      return destinationArray;
    };
    DataMatrix2.prototype.DataMatrixEncoder = function(dataCodeword) {
      var result = new Array(dataCodeword.length);
      var index = 0;
      for (var i = 0; i < dataCodeword.length; i++) {
        if (dataCodeword[parseInt(i.toString(), 10)] >= 48 && dataCodeword[parseInt(i.toString(), 10)] <= 57) {
          var prevIndex = 0;
          if (i !== 0) {
            prevIndex = index - 1;
          }
          var prevValue = result[parseInt(prevIndex.toString(), 10)] - 1;
          var priorValue = 0;
          if (i !== 0 && index !== 1) {
            priorValue = result[prevIndex - 1];
          }
          if (priorValue !== 235 && prevValue >= 48 && prevValue <= 57) {
            result[parseInt(prevIndex.toString(), 10)] = 10 * (prevValue - 48) + (dataCodeword[parseInt(i.toString(), 10)] - 48) + 130;
          } else {
            result[parseInt(index.toString(), 10)] = dataCodeword[parseInt(i.toString(), 10)] + 1;
            index++;
          }
        } else if (dataCodeword[parseInt(i.toString(), 10)] < 127) {
          result[parseInt(index.toString(), 10)] = dataCodeword[parseInt(i.toString(), 10)] + 1;
          index++;
        } else {
          result[parseInt(index.toString(), 10)] = dataCodeword[parseInt(i.toString(), 10)] - 127;
          index++;
        }
      }
      var encodedData = Array(index);
      encodedData = this.fillZero(encodedData);
      for (var i = 0; i < index; i++) {
        encodedData[parseInt(i.toString(), 10)] = result[parseInt(i.toString(), 10)];
      }
      return encodedData;
    };
    DataMatrix2.prototype.PrepareDataCodeword = function(dataCodeword) {
      if (this.encodingValue === "Auto" || this.encodingValue === "ASCIINumeric") {
        var number = true;
        var extended = false;
        var num = 0;
        var data = dataCodeword;
        var encoding = "ASCII";
        for (var i = 0; i < data.length; i++) {
          if (data[parseInt(i.toString(), 10)] < 48 || data[parseInt(i.toString(), 10)] > 57) {
            number = false;
          }
        }
        if (number) {
          encoding = "ASCIINumeric";
        }
        if (this.encodingValue === "ASCIINumeric" && this.encodingValue !== encoding) {
          return "Data contains invalid characters and cannot be encoded as ASCIINumeric.";
        }
        this.encodingValue = encoding;
      }
      var result = [];
      switch (this.encodingValue) {
        case "ASCII":
          result = this.DataMatrixEncoder(dataCodeword);
          break;
        case "ASCIINumeric":
          result = this.DataMatrixNumericEncoder(dataCodeword);
          break;
        case "Base256":
          result = this.DataMatrixBaseEncoder(dataCodeword);
          break;
      }
      return result;
    };
    DataMatrix2.prototype.PdfDataMatrixSymbolAttribute = function(symbolRow, symbolColumn, horizontalDataRegion, verticalDataRegion, dataCodewords, correctionCodewords, interleavedBlock, interleavedDataBlock) {
      var mSymbolAttribute = {
        SymbolRow: symbolRow,
        SymbolColumn: symbolColumn,
        HorizontalDataRegion: horizontalDataRegion,
        VerticalDataRegion: verticalDataRegion,
        DataCodewords: dataCodewords,
        CorrectionCodewords: correctionCodewords,
        InterleavedBlock: interleavedBlock,
        InterleavedDataBlock: interleavedDataBlock
      };
      return mSymbolAttribute;
    };
    DataMatrix2.prototype.getmSymbolAttributes = function() {
      var getmSymbolAttributeValue = [];
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(10, 10, 1, 1, 3, 5, 1, 3));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(12, 12, 1, 1, 5, 7, 1, 5));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(14, 14, 1, 1, 8, 10, 1, 8));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(16, 16, 1, 1, 12, 12, 1, 12));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(18, 18, 1, 1, 18, 14, 1, 18));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(20, 20, 1, 1, 22, 18, 1, 22));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(22, 22, 1, 1, 30, 20, 1, 30));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(24, 24, 1, 1, 36, 24, 1, 36));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(26, 26, 1, 1, 44, 28, 1, 44));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(32, 32, 2, 2, 62, 36, 1, 62));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(36, 36, 2, 2, 86, 42, 1, 86));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(40, 40, 2, 2, 114, 48, 1, 114));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(44, 44, 2, 2, 144, 56, 1, 144));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(48, 48, 2, 2, 174, 68, 1, 174));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(52, 52, 2, 2, 204, 84, 2, 102));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(64, 64, 4, 4, 280, 112, 2, 140));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(72, 72, 4, 4, 368, 144, 4, 92));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(80, 80, 4, 4, 456, 192, 4, 114));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(88, 88, 4, 4, 576, 224, 4, 144));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(96, 96, 4, 4, 696, 272, 4, 174));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(104, 104, 4, 4, 816, 336, 6, 136));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(120, 120, 6, 6, 1050, 408, 6, 175));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(132, 132, 6, 6, 1304, 496, 8, 163));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(144, 144, 6, 6, 1558, 620, 10, 156));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(8, 18, 1, 1, 5, 7, 1, 5));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(8, 32, 2, 1, 10, 11, 1, 10));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(12, 26, 1, 1, 16, 14, 1, 16));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(12, 36, 2, 1, 22, 18, 1, 22));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(16, 36, 2, 1, 32, 24, 1, 32));
      getmSymbolAttributeValue.push(this.PdfDataMatrixSymbolAttribute(16, 48, 2, 1, 49, 28, 1, 49));
      return getmSymbolAttributeValue;
    };
    DataMatrix2.prototype.PadCodewords = function(dataCWLength, temp, codeword) {
      var l = temp.length;
      var ms = [];
      for (var i = 0; i < l; i++) {
        ms.push(temp[parseInt(i.toString(), 10)]);
      }
      if (l < dataCWLength) {
        ms.push(129);
      }
      l = ms.length;
      while (l < dataCWLength) {
        var v = 129 + (l + 1) * 149 % 253 + 1;
        if (v > 254) {
          v -= 254;
        }
        ms.push(v);
        l = ms.length;
      }
      codeword = Array(ms.length);
      codeword = ms;
      return codeword;
    };
    DataMatrix2.prototype.EccProduct = function(a, b) {
      if (a === 0 || b === 0) {
        return 0;
      }
      var mLog = Array(256);
      mLog = this.CreateLogArrays(true);
      var mALog = Array(256);
      mALog = this.CreateLogArrays(false);
      return mALog[(mLog[parseInt(a.toString(), 10)] + mLog[parseInt(b.toString(), 10)]) % 255];
    };
    DataMatrix2.prototype.validateInput = function(char, characters) {
      return char;
    };
    DataMatrix2.prototype.ComputeErrorCorrection = function() {
      var dataLength = this.encodedCodeword.length;
      this.mSymbolAttribute = this.PdfDataMatrixSymbolAttribute(0, 0, 0, 0, 0, 0, 0, 0);
      var mSymbolAttributes = this.getmSymbolAttributes();
      if (!this.size) {
        mSymbolAttributes = this.getmSymbolAttributes();
        for (var i = 0; i < mSymbolAttributes.length; i++) {
          var attr = mSymbolAttributes[parseInt(i.toString(), 10)];
          if (attr.DataCodewords >= dataLength) {
            this.mSymbolAttribute = attr;
            break;
          }
        }
      } else {
        this.mSymbolAttribute = mSymbolAttributes[this.size - 1];
      }
      var temp;
      if (this.mSymbolAttribute.DataCodewords > dataLength) {
        temp = this.PadCodewords(this.mSymbolAttribute.DataCodewords, this.encodedCodeword, temp);
        this.encodedCodeword = Array(temp.length);
        this.encodedCodeword = temp;
        dataLength = this.encodedCodeword.length;
      } else if (this.mSymbolAttribute.DataCodewords === 0) {
        return this.validateInput("Data cannot be encoded as barcode", void 0);
      } else if (this.mSymbolAttribute.DataCodewords < dataLength) {
        var r = this.mSymbolAttribute.SymbolRow.toString();
        var c = this.mSymbolAttribute.SymbolColumn.toString();
        return "Data too long for {0}x{1} barcode.";
      }
      var k = this.mSymbolAttribute.CorrectionCodewords;
      var ctArray = [];
      ctArray = this.create1DMatrixArray(k + this.mSymbolAttribute.DataCodewords, ctArray);
      var step = this.mSymbolAttribute.InterleavedBlock;
      var symbolDataWords = this.mSymbolAttribute.DataCodewords;
      var blockErrorWords = this.mSymbolAttribute.CorrectionCodewords / step;
      var total = symbolDataWords + blockErrorWords * step;
      var mrsPolynomial = this.CreateRSPolynomial(step, this.mSymbolAttribute);
      var mBlockLength = 68;
      var b = [];
      b = this.create1DMatrixArray(mBlockLength, b);
      for (var block = 0; block < step; block++) {
        for (var bI = 0; bI < b.length; bI++) {
          b[parseInt(bI.toString(), 10)] = 0;
        }
        for (var i = block; i < symbolDataWords; i += step) {
          var val = this.EccSum(b[blockErrorWords - 1], this.encodedCodeword[parseInt(i.toString(), 10)]);
          for (var j = blockErrorWords - 1; j > 0; j--) {
            b[parseInt(j.toString(), 10)] = this.EccSum(b[j - 1], this.EccProduct(mrsPolynomial[parseInt(j.toString(), 10)], val));
          }
          b[0] = this.EccProduct(mrsPolynomial[0], val);
        }
        var blockDataWords = 0;
        if (block >= 8 && this.size & DataMatrixSize.Size144x144) {
          blockDataWords = this.mSymbolAttribute.DataCodewords / step;
        } else {
          blockDataWords = this.mSymbolAttribute.InterleavedDataBlock;
          var bIndex = blockErrorWords;
          for (var i = block + step * blockDataWords; i < total; i += step) {
            ctArray[parseInt(i.toString(), 10)] = b[--bIndex];
          }
          if (bIndex !== 0) {
            return "Error in error correction code generation!";
          }
        }
      }
      if (ctArray.length > k) {
        var tmp = ctArray;
        ctArray = [];
        ctArray = this.create1DMatrixArray(k, ctArray);
        var z = 0;
        for (var i = tmp.length - 1; i > this.mSymbolAttribute.DataCodewords; i--) {
          ctArray[z++] = tmp[parseInt(i.toString(), 10)];
        }
      }
      return ctArray.reverse();
    };
    DataMatrix2.prototype.CreateLogArrays = function(value) {
      var mLog = Array(256);
      var maLog = Array(256);
      mLog[0] = -255;
      maLog[0] = 1;
      for (var i = 1; i <= 255; i++) {
        maLog[parseInt(i.toString(), 10)] = maLog[i - 1] * 2;
        if (maLog[parseInt(i.toString(), 10)] >= 256) {
          maLog[parseInt(i.toString(), 10)] = maLog[parseInt(i.toString(), 10)] ^ 301;
        }
        mLog[maLog[parseInt(i.toString(), 10)]] = i;
      }
      if (value) {
        return mLog;
      } else {
        return maLog;
      }
    };
    DataMatrix2.prototype.EccSum = function(a, b) {
      return a ^ b;
    };
    DataMatrix2.prototype.EccDoublify = function(a, b) {
      if (a === 0) {
        return 0;
      }
      if (b === 0) {
        return a;
      }
      var mLog = Array(256);
      mLog = this.CreateLogArrays(true);
      var maLog = Array(256);
      maLog = this.CreateLogArrays(false);
      return maLog[(mLog[parseInt(a.toString(), 10)] + b) % 255];
    };
    DataMatrix2.prototype.CreateRSPolynomial = function(step, mSymbolAttribute) {
      var mBlockLength = 69;
      var mrsPolynomial = Array(mBlockLength);
      var blockErrorWords = mSymbolAttribute.CorrectionCodewords / step;
      for (var i = 0; i < mrsPolynomial.length; i++) {
        mrsPolynomial[parseInt(i.toString(), 10)] = 1;
      }
      for (var i = 1; i <= blockErrorWords; i++) {
        for (var j = i - 1; j >= 0; j--) {
          mrsPolynomial[parseInt(j.toString(), 10)] = this.EccDoublify(mrsPolynomial[parseInt(j.toString(), 10)], i);
          if (j > 0) {
            mrsPolynomial[parseInt(j.toString(), 10)] = this.EccSum(mrsPolynomial[parseInt(j.toString(), 10)], mrsPolynomial[j - 1]);
          }
        }
      }
      return mrsPolynomial;
    };
    DataMatrix2.prototype.PrepareCodeword = function(dataCodeword) {
      this.encodedCodeword = this.PrepareDataCodeword(dataCodeword);
      if (isNaN(this.encodedCodeword[0])) {
        return this.encodedCodeword;
      }
      var correctCodeword = this.ComputeErrorCorrection();
      if (isNaN(correctCodeword[0])) {
        return correctCodeword;
      }
      this.encodedCodeword = this.encodedCodeword;
      var finalCodeword = Array(this.encodedCodeword.length + correctCodeword.length);
      this.copyArray(finalCodeword, 0, this.encodedCodeword);
      this.copyArray(finalCodeword, this.encodedCodeword.length, correctCodeword);
      return finalCodeword;
    };
    DataMatrix2.prototype.copyArray = function(array, index, correctCodeword) {
      for (var i = 0; i < correctCodeword.length; i++) {
        array[index + i] = correctCodeword[parseInt(i.toString(), 10)];
      }
    };
    DataMatrix2.prototype.ecc200placementbit = function(array, NR, NC, r, c, p, b) {
      if (r < 0) {
        r += NR;
        c += 4 - (NR + 4) % 8;
      }
      if (c < 0) {
        c += NC;
        r += 4 - (NC + 4) % 8;
      }
      array[r * NC + c] = (p << 3) + b;
    };
    DataMatrix2.prototype.ecc200placementblock = function(array, NR, NC, r, c, p) {
      this.ecc200placementbit(array, NR, NC, r - 2, c - 2, p, 7);
      this.ecc200placementbit(array, NR, NC, r - 2, c - 1, p, 6);
      this.ecc200placementbit(array, NR, NC, r - 1, c - 2, p, 5);
      this.ecc200placementbit(array, NR, NC, r - 1, c - 1, p, 4);
      this.ecc200placementbit(array, NR, NC, r - 1, c - 0, p, 3);
      this.ecc200placementbit(array, NR, NC, r - 0, c - 2, p, 2);
      this.ecc200placementbit(array, NR, NC, r - 0, c - 1, p, 1);
      this.ecc200placementbit(array, NR, NC, r - 0, c - 0, p, 0);
    };
    DataMatrix2.prototype.ecc200placementcornerD = function(array, NR, NC, p) {
      this.ecc200placementbit(array, NR, NC, NR - 1, 0, p, 7);
      this.ecc200placementbit(array, NR, NC, NR - 1, NC - 1, p, 6);
      this.ecc200placementbit(array, NR, NC, 0, NC - 3, p, 5);
      this.ecc200placementbit(array, NR, NC, 0, NC - 2, p, 4);
      this.ecc200placementbit(array, NR, NC, 0, NC - 1, p, 3);
      this.ecc200placementbit(array, NR, NC, 1, NC - 3, p, 2);
      this.ecc200placementbit(array, NR, NC, 1, NC - 2, p, 1);
      this.ecc200placementbit(array, NR, NC, 1, NC - 1, p, 0);
    };
    DataMatrix2.prototype.ecc200placementcornerA = function(array, NR, NC, p) {
      this.ecc200placementbit(array, NR, NC, NR - 1, 0, p, 7);
      this.ecc200placementbit(array, NR, NC, NR - 1, 1, p, 6);
      this.ecc200placementbit(array, NR, NC, NR - 1, 2, p, 5);
      var value = 4;
      this.ecc200placementbit(array, NR, NC, 0, NC - 2, p, value);
      this.ecc200placementbit(array, NR, NC, 0, NC - 1, p, 3);
      var value1 = 2;
      this.ecc200placementbit(array, NR, NC, 1, NC - 1, p, value1);
      this.ecc200placementbit(array, NR, NC, 2, NC - 1, p, 1);
      this.ecc200placementbit(array, NR, NC, 3, NC - 1, p, 0);
    };
    DataMatrix2.prototype.ecc200placementcornerB = function(array, NR, NC, p) {
      var value = 7;
      this.ecc200placementbit(array, NR, NC, NR - 3, 0, p, value);
      this.ecc200placementbit(array, NR, NC, NR - 2, 0, p, 6);
      this.ecc200placementbit(array, NR, NC, NR - 1, 0, p, 5);
      this.ecc200placementbit(array, NR, NC, 0, NC - 4, p, 4);
      this.ecc200placementbit(array, NR, NC, 0, NC - 3, p, 3);
      this.ecc200placementbit(array, NR, NC, 0, NC - 2, p, 2);
      this.ecc200placementbit(array, NR, NC, 0, NC - 1, p, 1);
      this.ecc200placementbit(array, NR, NC, 1, NC - 1, p, 0);
    };
    DataMatrix2.prototype.ecc200placementcornerC = function(array, NR, NC, p) {
      this.ecc200placementbit(array, NR, NC, NR - 3, 0, p, 7);
      this.ecc200placementbit(array, NR, NC, NR - 2, 0, p, 6);
      this.ecc200placementbit(array, NR, NC, NR - 1, 0, p, 5);
      this.ecc200placementbit(array, NR, NC, 0, NC - 2, p, 4);
      this.ecc200placementbit(array, NR, NC, 0, NC - 1, p, 3);
      this.ecc200placementbit(array, NR, NC, 1, NC - 1, p, 2);
      this.ecc200placementbit(array, NR, NC, 2, NC - 1, p, 1);
      this.ecc200placementbit(array, NR, NC, 3, NC - 1, p, 0);
    };
    DataMatrix2.prototype.ecc200placement = function(array, NR, NC) {
      var r;
      var c;
      var p;
      for (var r_1 = 0; r_1 < NR; r_1++) {
        for (var c_1 = 0; c_1 < NC; c_1++) {
          array[r_1 * NC + c_1] = 0;
        }
      }
      p = 1;
      r = 4;
      c = 0;
      do {
        if (r === NR && !(c !== 0)) {
          this.ecc200placementcornerA(array, NR, NC, p++);
        }
        if (r === NR - 2 && !(c !== 0) && NC % 4 !== 0) {
          this.ecc200placementcornerB(array, NR, NC, p++);
        }
        if (r === NR - 2 && !(c !== 0) && NC % 8 === 4) {
          this.ecc200placementcornerC(array, NR, NC, p++);
        }
        if (r === NR + 4 && c === 2 && !(NC % 8 !== 0)) {
          this.ecc200placementcornerD(array, NR, NC, p++);
        }
        do {
          if (r < NR && c >= 0 && !(array[r * NC + c] !== 0)) {
            this.ecc200placementblock(array, NR, NC, r, c, p++);
          }
          r -= 2;
          c += 2;
        } while (r >= 0 && c < NC);
        r++;
        c += 3;
        do {
          if (r >= 0 && c < NC && !(array[r * NC + c] !== 0)) {
            this.ecc200placementblock(array, NR, NC, r, c, p++);
          }
          r += 2;
          c -= 2;
        } while (r < NR && c >= 0);
        r += 3;
        c++;
      } while (r < NR || c < NC);
      if (!(array[NR * NC - 1] !== 0)) {
        array[NR * NC - 1] = array[NR * NC - NC - 2] = 1;
      }
    };
    DataMatrix2.prototype.getActualRows = function() {
      return this.mSymbolAttribute.SymbolRow + QuietZone.All;
    };
    DataMatrix2.prototype.getActualColumns = function() {
      return this.mSymbolAttribute.SymbolColumn + QuietZone.All;
    };
    DataMatrix2.prototype.AddQuiteZone = function(tempArray2) {
      this.actualRows = this.getActualRows();
      this.actualColumns = this.getActualColumns();
      var w = this.actualRows;
      var h = this.actualColumns;
      var quietZone = QuietZone.All - 1;
      this.mDataMatrixArray = this.create2DMartixArray(w, h, this.mDataMatrixArray);
      for (var i = 0; i < h; i++) {
        this.mDataMatrixArray[0][parseInt(i.toString(), 10)] = 0;
      }
      for (var i = quietZone; i < w - quietZone; i++) {
        this.mDataMatrixArray[parseInt(i.toString(), 10)][0] = 0;
        for (var j = quietZone; j < h - quietZone; j++) {
          this.mDataMatrixArray[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)] = tempArray2[i - quietZone][j - quietZone];
        }
        this.mDataMatrixArray[parseInt(i.toString(), 10)][h - quietZone] = 0;
      }
      for (var i = 0; i < h; i++) {
        this.mDataMatrixArray[w - quietZone][parseInt(i.toString(), 10)] = 0;
      }
    };
    DataMatrix2.prototype.drawImage = function(canvas, options) {
      var barcodeRenderer = this.getInstance(canvas.id);
      for (var i = 0; i < options.length; i++) {
        barcodeRenderer.renderRectElement(canvas, options[parseInt(i.toString(), 10)]);
      }
    };
    DataMatrix2.prototype.CreateMatrix = function(codeword) {
      var x;
      var y;
      var W = this.mSymbolAttribute.SymbolColumn;
      var H = this.mSymbolAttribute.SymbolRow;
      var FW = W / this.mSymbolAttribute.HorizontalDataRegion;
      var FH = H / this.mSymbolAttribute.VerticalDataRegion;
      var NC = W - 2 * (W / FW);
      var NR = H - 2 * (H / FH);
      var places = Array(NC * NR);
      this.ecc200placement(places, NR, NC);
      var matrix = [];
      matrix = this.create1DMatrixArray(W * H, matrix);
      for (var y_1 = 0; y_1 < H; y_1 += FH) {
        for (var x_1 = 0; x_1 < W; x_1++) {
          matrix[y_1 * W + x_1] = 1;
        }
        for (var x_2 = 0; x_2 < W; x_2 += 2) {
          matrix[(y_1 + FH - 1) * W + x_2] = 1;
        }
      }
      for (x = 0; x < W; x += FW) {
        for (y = 0; y < H; y++) {
          matrix[y * W + x] = 1;
        }
        for (y = 0; y < H; y += 2) {
          matrix[y * W + x + FW - 1] = 1;
        }
      }
      for (var y_2 = 0; y_2 < NR; y_2++) {
        for (var x_3 = 0; x_3 < NC; x_3++) {
          var v = places[(NR - y_2 - 1) * NC + x_3];
          if (v === 1 || v > 7 && (codeword[(v >> 3) - 1] & 1 << (v & 7)) !== 0) {
            matrix[(1 + Math.floor(y_2) + 2 * Math.floor(Math.floor(y_2) / Math.floor(FH - 2))) * Math.floor(W) + 1 + Math.floor(x_3) + 2 * Math.floor(Math.floor(x_3) / Math.floor(FW - 2))] = 1;
          }
        }
      }
      var w = this.mSymbolAttribute.SymbolColumn;
      var h = this.mSymbolAttribute.SymbolRow;
      var tempArray = [];
      tempArray = this.create2DMartixArray(w, h, tempArray);
      for (var x1 = 0; x1 < w; x1++) {
        for (var y1 = 0; y1 < h; y1++) {
          tempArray[parseInt(x1.toString(), 10)][parseInt(y1.toString(), 10)] = matrix[w * y1 + x1];
        }
      }
      var tempArray2 = [];
      tempArray2 = this.create2DMartixArray(w, h, tempArray2);
      for (var i = 0; i < h; i++) {
        for (var j = 0; j < w; j++) {
          tempArray2[h - 1 - i][parseInt(j.toString(), 10)] = tempArray[parseInt(j.toString(), 10)][parseInt(i.toString(), 10)];
        }
      }
      this.AddQuiteZone(tempArray2);
    };
    DataMatrix2.prototype.create1DMatrixArray = function(w, tempArray) {
      for (var i = 0; i < w; i++) {
        tempArray[parseInt(i.toString(), 10)] = 0;
      }
      return tempArray;
    };
    DataMatrix2.prototype.create2DMartixArray = function(w, h, tempArray) {
      for (var i = 0; i < w; i++) {
        tempArray.push([i]);
        for (var j = 0; j < h; j++) {
          tempArray[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)] = 0;
        }
      }
      return tempArray;
    };
    DataMatrix2.prototype.BuildDataMatrix = function() {
      var codeword = [];
      codeword = this.PrepareCodeword(this.GetData());
      if (isNaN(codeword[0])) {
        return codeword;
      } else {
        this.CreateMatrix(codeword);
        return this.mDataMatrixArray[0];
      }
    };
    DataMatrix2.prototype.drawText = function(canvas, options) {
      var barcodeRenderer = this.getInstance(canvas.id);
      barcodeRenderer.renderTextElement(canvas, options);
    };
    DataMatrix2.prototype.getInstance = function(id) {
      var barCode = document.getElementById(id);
      var barcodeRenderer = new BarcodeRenderer(barCode.id, this.isSvgMode);
      return barcodeRenderer;
    };
    DataMatrix2.prototype.drawDisplayText = function(canvas, x, y, width, height, scaleValue, foreColor) {
      var displayText = this.displayText;
      createMeasureElements();
      var textOptions = getBaseAttributes(width, height, x, y, "black");
      textOptions.string = displayText.text ? displayText.text : this.value;
      textOptions.fontStyle = displayText.font;
      textOptions.color = foreColor;
      textOptions.stringSize = displayText.size;
      textOptions.visibility = displayText.visibility;
      var textSize = measureText(textOptions);
      if (!this.isSvgMode) {
        textSize = {
          width: textSize.width * scaleValue,
          height: textSize.height * scaleValue
        };
      }
      var textHeight = textSize.height / 2 + (this.isSvgMode ? 2 : 2 * 1.5);
      textOptions.height = textHeight;
      if (width > textSize.width) {
        if (this.displayText.alignment === "Center") {
          textOptions.x += (x + width - x) / 2 - textSize.width * 0.5;
        } else if (this.displayText.alignment === "Left") {
          textOptions.x = x + this.displayText.margin.left;
        } else {
          textOptions.x = this.width - this.margin.left - textSize.width - this.displayText.margin.right;
        }
      }
      if (textOptions.x < x) {
        textOptions.x = x;
      }
      if (this.displayText.position === "Bottom") {
        if (this.displayText.margin.top > 0) {
          textOptions.y = y + height;
        }
        if (this.displayText.margin.bottom > 0) {
          textOptions.y = y + height - displayText.margin.bottom;
        } else {
          if (this.margin.top < 10) {
            textOptions.y = height + textSize.height / 2;
          } else {
            textOptions.y = height + this.margin.top;
          }
        }
      } else {
        if (this.displayText.margin.top > 0) {
          textOptions.y = y + this.displayText.margin.top + textSize.height / 2;
        } else {
          textOptions.y = y + textSize.height / 2;
        }
      }
      if (this.displayText.visibility) {
        if (!this.isSvgMode) {
          textOptions.stringSize = textOptions.stringSize * 1.5;
        }
        this.drawText(canvas, textOptions);
      }
      return textOptions;
    };
    DataMatrix2.prototype.getDrawableSize = function(margin, actualWidth, actualHeight) {
      var barcodeSize = actualWidth >= actualHeight ? actualHeight : actualWidth;
      return barcodeSize;
    };
    DataMatrix2.prototype.draw = function(canvas) {
      var scaleValue = 1.5;
      var isSvg = this.isSvgMode;
      var isSquareMatrix = this.size < 25;
      var dimension = this.mDataMatrixArray.length;
      var width = this.width;
      var height = this.height;
      var dimensionX;
      var dimensionY;
      var leftValue = this.margin.left;
      var rightValue = this.margin.right;
      var topValue = this.margin.top;
      var bottomVal = this.margin.bottom;
      var actualWidth = width - ((isSvg ? leftValue : leftValue * scaleValue) + (isSvg ? rightValue : rightValue * scaleValue));
      var actualHeight = height - ((isSvg ? topValue : topValue * scaleValue) + (isSvg ? bottomVal : bottomVal * scaleValue));
      var size = this.getDrawableSize(this.margin, actualWidth, actualHeight);
      size = actualWidth >= actualHeight ? actualHeight : actualWidth;
      var x = (actualWidth - size) / 2;
      var y = (actualHeight - size) / 2;
      y += isSvg ? this.margin.top : this.margin.top * scaleValue;
      x += isSvg ? this.margin.left : this.margin.left * scaleValue;
      var textBounds = this.drawDisplayText(canvas, x, y, size, actualHeight, scaleValue, this.foreColor);
      actualHeight -= textBounds.height;
      if (this.displayText.margin.bottom > 0) {
        if (this.displayText.position === "Top") {
          y += this.displayText.margin.bottom;
          actualHeight -= this.displayText.margin.bottom;
        } else {
          actualHeight -= this.displayText.margin.bottom;
        }
      }
      if (this.displayText.margin.top > 0) {
        if (this.displayText.position === "Top") {
          y += this.displayText.margin.top;
          actualHeight -= this.displayText.margin.top;
        } else {
          actualHeight -= this.displayText.margin.top;
        }
      }
      size = actualWidth >= actualHeight ? actualHeight : actualWidth;
      if (!isSquareMatrix) {
        dimensionX = size / this.mDataMatrixArray[0].length;
        dimensionY = size / this.mDataMatrixArray.length;
      }
      dimension = size / this.mDataMatrixArray.length;
      var w = this.actualRows;
      var h = this.actualColumns;
      var option;
      var options = [];
      for (var i = 0; i < w; i++) {
        for (var j = 0; j < h; j++) {
          var color = void 0;
          if (this.mDataMatrixArray[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)] === 1) {
            color = this.foreColor;
          } else {
            color = "white";
          }
          if (color !== "white") {
            option = getBaseAttributes(isSquareMatrix ? dimension : dimensionX, isSquareMatrix ? dimension : dimensionY, x, this.displayText.position === "Bottom" ? y : y + textBounds.height / 2, color);
            options.push(option);
          }
          x = x + (isSquareMatrix ? dimension : dimensionX);
        }
        y = y + (isSquareMatrix ? dimension : dimensionY);
        x = (actualWidth - size) / 2 + (isSvg ? this.margin.left : this.margin.left * scaleValue);
      }
      this.drawImage(canvas, options);
      this.mDataMatrixArray = void 0;
    };
    return DataMatrix2;
  }()
);

// node_modules/@syncfusion/ej2-barcode-generator/src/datamatrix/datamatrix.js
var __extends29 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate14 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DataMatrixGenerator = (
  /** @class */
  function(_super) {
    __extends29(DataMatrixGenerator2, _super);
    function DataMatrixGenerator2(options, element) {
      return _super.call(this, options, element) || this;
    }
    DataMatrixGenerator2.prototype.destroy = function() {
      this.notify("destroy", {});
      _super.prototype.destroy.call(this);
      var content = document.getElementById(this.element.id + "content");
      if (content) {
        this.element.removeChild(content);
      }
    };
    DataMatrixGenerator2.prototype.initializePrivateVariables = function() {
      this.defaultLocale = {};
    };
    DataMatrixGenerator2.prototype.getPersistData = function() {
      var keyEntity = ["loaded"];
      return this.addOnPersist(keyEntity);
    };
    DataMatrixGenerator2.prototype.getModuleName = function() {
      return "DataMatrixGenerator";
    };
    DataMatrixGenerator2.prototype.setCulture = function() {
      this.localeObj = new L10n(this.getModuleName(), this.defaultLocale, this.locale);
    };
    DataMatrixGenerator2.prototype.getElementSize = function(real, rulerSize) {
      var value;
      if (real.toString().indexOf("px") > 0 || real.toString().indexOf("%") > 0) {
        value = real.toString();
      } else {
        value = real.toString() + "px";
      }
      return value;
    };
    DataMatrixGenerator2.prototype.initialize = function() {
      this.element.style.display = "block";
      this.element.style.width = this.getElementSize(this.width);
      this.element.style.height = this.getElementSize(this.height);
      var height = this.mode === "SVG" ? this.element.offsetHeight : this.element.offsetHeight * 1.5;
      var width = this.mode === "SVG" ? this.element.offsetWidth : this.element.offsetWidth * 1.5;
      this.barcodeCanvas = this.barcodeRenderer.renderRootElement({
        id: this.element.id + "content",
        height,
        width
      }, this.backgroundColor, width, height);
      this.element.appendChild(this.barcodeCanvas);
    };
    DataMatrixGenerator2.prototype.triggerEvent = function(eventName, message) {
      var arg = {
        message
      };
      this.trigger(BarcodeEvent["" + eventName], arg);
    };
    DataMatrixGenerator2.prototype.preRender = function() {
      this.element.classList.add("e-datamatrix");
      this.barcodeRenderer = new BarcodeRenderer(this.element.id, this.mode === "SVG");
      this.initialize();
      this.initializePrivateVariables();
      this.setCulture();
    };
    DataMatrixGenerator2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var width;
      var height;
      if (this.mode === "Canvas" && newProp.mode !== "Canvas") {
        refreshCanvasBarcode(this, this.barcodeCanvas);
      } else {
        this.barcodeRenderer = removeChildElements(newProp, this.barcodeCanvas, this.mode, this.element.id);
      }
      if (newProp.width) {
        width = this.mode === "Canvas" && newProp.mode !== "Canvas" ? newProp.width * 1.5 : newProp.width;
        this.barcodeCanvas.setAttribute("width", String(width));
      }
      if (newProp.height) {
        height = this.mode === "Canvas" && newProp.mode !== "Canvas" ? newProp.height * 1.5 : newProp.height;
        this.barcodeCanvas.setAttribute("height", String(height));
      }
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "mode":
            this.initialize();
            break;
          case "height":
            this.element.style.height = this.getElementSize(height);
            this.barcodeCanvas.setAttribute("height", String(this.element.offsetHeight));
            break;
          case "width":
            this.element.style.width = this.getElementSize(width);
            this.barcodeCanvas.setAttribute("width", String(this.element.offsetWidth));
            break;
          case "backgroundColor":
            this.barcodeCanvas.setAttribute("style", "background:" + newProp.backgroundColor);
            break;
        }
      }
      this.renderElements();
    };
    DataMatrixGenerator2.prototype.checkdata = function(value) {
      var validData = false;
      for (var i = 0; i < value.length; i++) {
        var number = 0;
        if (value.charCodeAt(i) >= 32 && value.charCodeAt(i) <= 126 || value.charCodeAt(i) === 10 || value.charCodeAt(i) === 13) {
          validData = true;
        }
      }
      return validData;
    };
    DataMatrixGenerator2.prototype.exportImage = function(fileName, exportType) {
      exportAsImage(exportType, fileName, this.element, false, this);
    };
    DataMatrixGenerator2.prototype.exportAsBase64Image = function(barcodeExportType) {
      var returnValue = exportAsImage(barcodeExportType, "", this.element, true, this);
      return returnValue;
    };
    DataMatrixGenerator2.prototype.renderElements = function() {
      var dataMatrix = new DataMatrix();
      dataMatrix.encodingValue = this.encoding;
      dataMatrix.size = this.size;
      dataMatrix.value = this.value;
      dataMatrix.width = this.barcodeCanvas.getAttribute("width");
      dataMatrix.height = this.barcodeCanvas.getAttribute("height");
      dataMatrix.XDimension = this.xDimension;
      dataMatrix.isSvgMode = this.mode === "SVG" ? true : false;
      dataMatrix.margin = this.margin;
      dataMatrix.displayText = this.displayText;
      dataMatrix.foreColor = this.foreColor;
      var checkOtherLanguage = this.checkdata(this.value);
      var encoding = dataMatrix.BuildDataMatrix();
      if (isNaN(encoding[0])) {
        this.triggerEvent(BarcodeEvent.invalid, encoding);
      } else if (!checkOtherLanguage) {
        this.triggerEvent(BarcodeEvent.invalid, "Invalid input");
      } else {
        dataMatrix.draw(this.barcodeCanvas);
      }
      if (this.mode === "Canvas") {
        this.barcodeCanvas.style.transform = "scale(" + 2 / 3 + ")";
        this.barcodeCanvas.style.transformOrigin = "0 0";
      }
    };
    DataMatrixGenerator2.prototype.render = function() {
      this.notify("initial-load", {});
      this.trigger("load");
      this.notify("initial-end", {});
      this.renderElements();
      this.renderComplete();
    };
    __decorate14([Property("Auto")], DataMatrixGenerator2.prototype, "encoding", void 0);
    __decorate14([Property(DataMatrixSize.Auto)], DataMatrixGenerator2.prototype, "size", void 0);
    __decorate14([Property("SVG")], DataMatrixGenerator2.prototype, "mode", void 0);
    __decorate14([Property(void 0)], DataMatrixGenerator2.prototype, "value", void 0);
    __decorate14([Property("100%")], DataMatrixGenerator2.prototype, "height", void 0);
    __decorate14([Property("100%")], DataMatrixGenerator2.prototype, "width", void 0);
    __decorate14([Complex({}, DisplayText)], DataMatrixGenerator2.prototype, "displayText", void 0);
    __decorate14([Complex({}, Margin)], DataMatrixGenerator2.prototype, "margin", void 0);
    __decorate14([Property("white")], DataMatrixGenerator2.prototype, "backgroundColor", void 0);
    __decorate14([Event2()], DataMatrixGenerator2.prototype, "invalid", void 0);
    __decorate14([Property("black")], DataMatrixGenerator2.prototype, "foreColor", void 0);
    __decorate14([Property(1)], DataMatrixGenerator2.prototype, "xDimension", void 0);
    return DataMatrixGenerator2;
  }(Component2)
);

// node_modules/@syncfusion/ej2-angular-barcode-generator/fesm2020/syncfusion-ej2-angular-barcode-generator.mjs
var inputs$2 = ["backgroundColor", "displayText", "enableCheckSum", "enablePersistence", "enableRtl", "foreColor", "height", "locale", "margin", "mode", "type", "value", "width"];
var outputs$2 = ["invalid"];
var twoWays$2 = [""];
var BarcodeGeneratorComponent = class BarcodeGeneratorComponent2 extends BarcodeGenerator {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$2);
    this.addTwoWay.call(this, twoWays$2);
    setValue2("currentInstance", this, this.viewContainerRef);
    this.context = new ComponentBase();
  }
  ngOnInit() {
    this.context.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.context.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.context.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.context.ngAfterContentChecked(this);
  }
};
BarcodeGeneratorComponent.ɵfac = function BarcodeGeneratorComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || BarcodeGeneratorComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
BarcodeGeneratorComponent.ɵcmp = ɵɵdefineComponent({
  type: BarcodeGeneratorComponent,
  selectors: [["ejs-barcodegenerator"]],
  inputs: {
    backgroundColor: "backgroundColor",
    displayText: "displayText",
    enableCheckSum: "enableCheckSum",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    foreColor: "foreColor",
    height: "height",
    locale: "locale",
    margin: "margin",
    mode: "mode",
    type: "type",
    value: "value",
    width: "width"
  },
  outputs: {
    invalid: "invalid"
  },
  features: [ɵɵInheritDefinitionFeature],
  decls: 0,
  vars: 0,
  template: function BarcodeGeneratorComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
BarcodeGeneratorComponent = __decorate([ComponentMixins([ComponentBase])], BarcodeGeneratorComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BarcodeGeneratorComponent, [{
    type: Component,
    args: [{
      selector: "ejs-barcodegenerator",
      inputs: inputs$2,
      outputs: outputs$2,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {}
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }];
  }, null);
})();
var BarcodeGeneratorModule = class {
};
BarcodeGeneratorModule.ɵfac = function BarcodeGeneratorModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || BarcodeGeneratorModule)();
};
BarcodeGeneratorModule.ɵmod = ɵɵdefineNgModule({
  type: BarcodeGeneratorModule,
  declarations: [BarcodeGeneratorComponent],
  imports: [CommonModule],
  exports: [BarcodeGeneratorComponent]
});
BarcodeGeneratorModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BarcodeGeneratorModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [BarcodeGeneratorComponent],
      exports: [BarcodeGeneratorComponent]
    }]
  }], null, null);
})();
var BarcodeGeneratorAllModule = class {
};
BarcodeGeneratorAllModule.ɵfac = function BarcodeGeneratorAllModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || BarcodeGeneratorAllModule)();
};
BarcodeGeneratorAllModule.ɵmod = ɵɵdefineNgModule({
  type: BarcodeGeneratorAllModule,
  imports: [CommonModule, BarcodeGeneratorModule],
  exports: [BarcodeGeneratorModule]
});
BarcodeGeneratorAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, BarcodeGeneratorModule], BarcodeGeneratorModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BarcodeGeneratorAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, BarcodeGeneratorModule],
      exports: [BarcodeGeneratorModule],
      providers: []
    }]
  }], null, null);
})();
var inputs$1 = ["backgroundColor", "displayText", "enablePersistence", "enableRtl", "errorCorrectionLevel", "foreColor", "height", "locale", "logo", "margin", "mode", "value", "version", "width", "xDimension"];
var outputs$1 = ["invalid"];
var twoWays$1 = [""];
var QRCodeGeneratorComponent = class QRCodeGeneratorComponent2 extends QRCodeGenerator {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$1);
    this.addTwoWay.call(this, twoWays$1);
    setValue2("currentInstance", this, this.viewContainerRef);
    this.context = new ComponentBase();
  }
  ngOnInit() {
    this.context.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.context.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.context.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.context.ngAfterContentChecked(this);
  }
};
QRCodeGeneratorComponent.ɵfac = function QRCodeGeneratorComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || QRCodeGeneratorComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
QRCodeGeneratorComponent.ɵcmp = ɵɵdefineComponent({
  type: QRCodeGeneratorComponent,
  selectors: [["ejs-qrcodegenerator"]],
  inputs: {
    backgroundColor: "backgroundColor",
    displayText: "displayText",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    errorCorrectionLevel: "errorCorrectionLevel",
    foreColor: "foreColor",
    height: "height",
    locale: "locale",
    logo: "logo",
    margin: "margin",
    mode: "mode",
    value: "value",
    version: "version",
    width: "width",
    xDimension: "xDimension"
  },
  outputs: {
    invalid: "invalid"
  },
  features: [ɵɵInheritDefinitionFeature],
  decls: 0,
  vars: 0,
  template: function QRCodeGeneratorComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
QRCodeGeneratorComponent = __decorate([ComponentMixins([ComponentBase])], QRCodeGeneratorComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QRCodeGeneratorComponent, [{
    type: Component,
    args: [{
      selector: "ejs-qrcodegenerator",
      inputs: inputs$1,
      outputs: outputs$1,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {}
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }];
  }, null);
})();
var QRCodeGeneratorModule = class {
};
QRCodeGeneratorModule.ɵfac = function QRCodeGeneratorModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || QRCodeGeneratorModule)();
};
QRCodeGeneratorModule.ɵmod = ɵɵdefineNgModule({
  type: QRCodeGeneratorModule,
  declarations: [QRCodeGeneratorComponent],
  imports: [CommonModule],
  exports: [QRCodeGeneratorComponent]
});
QRCodeGeneratorModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QRCodeGeneratorModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [QRCodeGeneratorComponent],
      exports: [QRCodeGeneratorComponent]
    }]
  }], null, null);
})();
var QRCodeGeneratorAllModule = class {
};
QRCodeGeneratorAllModule.ɵfac = function QRCodeGeneratorAllModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || QRCodeGeneratorAllModule)();
};
QRCodeGeneratorAllModule.ɵmod = ɵɵdefineNgModule({
  type: QRCodeGeneratorAllModule,
  imports: [CommonModule, QRCodeGeneratorModule],
  exports: [QRCodeGeneratorModule]
});
QRCodeGeneratorAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, QRCodeGeneratorModule], QRCodeGeneratorModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QRCodeGeneratorAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, QRCodeGeneratorModule],
      exports: [QRCodeGeneratorModule],
      providers: []
    }]
  }], null, null);
})();
var inputs = ["backgroundColor", "displayText", "enablePersistence", "enableRtl", "encoding", "foreColor", "height", "locale", "margin", "mode", "size", "value", "width", "xDimension"];
var outputs = ["invalid"];
var twoWays = [""];
var DataMatrixGeneratorComponent = class DataMatrixGeneratorComponent2 extends DataMatrixGenerator {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs);
    this.addTwoWay.call(this, twoWays);
    setValue2("currentInstance", this, this.viewContainerRef);
    this.context = new ComponentBase();
  }
  ngOnInit() {
    this.context.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.context.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.context.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.context.ngAfterContentChecked(this);
  }
};
DataMatrixGeneratorComponent.ɵfac = function DataMatrixGeneratorComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || DataMatrixGeneratorComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
DataMatrixGeneratorComponent.ɵcmp = ɵɵdefineComponent({
  type: DataMatrixGeneratorComponent,
  selectors: [["ejs-datamatrixgenerator"]],
  inputs: {
    backgroundColor: "backgroundColor",
    displayText: "displayText",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    encoding: "encoding",
    foreColor: "foreColor",
    height: "height",
    locale: "locale",
    margin: "margin",
    mode: "mode",
    size: "size",
    value: "value",
    width: "width",
    xDimension: "xDimension"
  },
  outputs: {
    invalid: "invalid"
  },
  features: [ɵɵInheritDefinitionFeature],
  decls: 0,
  vars: 0,
  template: function DataMatrixGeneratorComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
DataMatrixGeneratorComponent = __decorate([ComponentMixins([ComponentBase])], DataMatrixGeneratorComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataMatrixGeneratorComponent, [{
    type: Component,
    args: [{
      selector: "ejs-datamatrixgenerator",
      inputs,
      outputs,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {}
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }];
  }, null);
})();
var DataMatrixGeneratorModule = class {
};
DataMatrixGeneratorModule.ɵfac = function DataMatrixGeneratorModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || DataMatrixGeneratorModule)();
};
DataMatrixGeneratorModule.ɵmod = ɵɵdefineNgModule({
  type: DataMatrixGeneratorModule,
  declarations: [DataMatrixGeneratorComponent],
  imports: [CommonModule],
  exports: [DataMatrixGeneratorComponent]
});
DataMatrixGeneratorModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataMatrixGeneratorModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [DataMatrixGeneratorComponent],
      exports: [DataMatrixGeneratorComponent]
    }]
  }], null, null);
})();
var DataMatrixGeneratorAllModule = class {
};
DataMatrixGeneratorAllModule.ɵfac = function DataMatrixGeneratorAllModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || DataMatrixGeneratorAllModule)();
};
DataMatrixGeneratorAllModule.ɵmod = ɵɵdefineNgModule({
  type: DataMatrixGeneratorAllModule,
  imports: [CommonModule, DataMatrixGeneratorModule],
  exports: [DataMatrixGeneratorModule]
});
DataMatrixGeneratorAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, DataMatrixGeneratorModule], DataMatrixGeneratorModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataMatrixGeneratorAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, DataMatrixGeneratorModule],
      exports: [DataMatrixGeneratorModule],
      providers: []
    }]
  }], null, null);
})();
export {
  BarcodeBase,
  BarcodeCanvasRenderer,
  BarcodeEvent,
  BarcodeGenerator,
  BarcodeGeneratorAllModule,
  BarcodeGeneratorComponent,
  BarcodeGeneratorModule,
  BarcodeRenderer,
  BarcodeSVGRenderer,
  CodaBar,
  Code128,
  Code128A,
  Code128B,
  Code128C,
  Code39,
  DataMatrix,
  DataMatrixGenerator,
  DataMatrixGeneratorAllModule,
  DataMatrixGeneratorComponent,
  DataMatrixGeneratorModule,
  DataMatrixSize,
  DisplayText,
  Ean13,
  Ean8,
  ErrorCorrectionCodewords,
  ErrorCorrectionLevel,
  Margin,
  ModuleValue,
  OneDimension,
  PdfQRBarcodeValues,
  Point,
  QRCode,
  QRCodeGenerator,
  QRCodeGeneratorAllModule,
  QRCodeGeneratorComponent,
  QRCodeGeneratorModule,
  QRCodeVersion,
  QuietZone,
  Rect,
  Size,
  UpcA,
  UpcE,
  createHtmlElement,
  createMeasureElements,
  createSvgElement,
  getChildNode,
  measureText,
  setAttribute
};
//# sourceMappingURL=@syncfusion_ej2-angular-barcode-generator.js.map
