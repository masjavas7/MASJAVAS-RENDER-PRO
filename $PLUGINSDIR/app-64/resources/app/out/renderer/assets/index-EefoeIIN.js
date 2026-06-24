function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$1 = Symbol.for("react.element"), n$1 = Symbol.for("react.portal"), p$2 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$1 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
function A$1(a) {
  if (null === a || "object" !== typeof a) return null;
  a = z$1 && a[z$1] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B$1 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$1 = Object.assign, D$1 = {};
function E$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
E$1.prototype.isReactComponent = {};
E$1.prototype.setState = function(a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E$1.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {
}
F.prototype = E$1.prototype;
function G$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
var H$1 = G$1.prototype = new F();
H$1.constructor = G$1;
C$1(H$1, E$1.prototype);
H$1.isPureReactComponent = true;
var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
function M$1(a, b, e) {
  var d, c = {}, k2 = null, h = null;
  if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k2 = "" + b.key), b) J.call(b, d) && !L$1.hasOwnProperty(d) && (c[d] = b[d]);
  var g = arguments.length - 2;
  if (1 === g) c.children = e;
  else if (1 < g) {
    for (var f2 = Array(g), m2 = 0; m2 < g; m2++) f2[m2] = arguments[m2 + 2];
    c.children = f2;
  }
  if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
  return { $$typeof: l$1, type: a, key: k2, ref: h, props: c, _owner: K$1.current };
}
function N$1(a, b) {
  return { $$typeof: l$1, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
}
function O$1(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l$1;
}
function escape(a) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b[a2];
  });
}
var P$1 = /\/+/g;
function Q$1(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function R$1(a, b, e, d, c) {
  var k2 = typeof a;
  if ("undefined" === k2 || "boolean" === k2) a = null;
  var h = false;
  if (null === a) h = true;
  else switch (k2) {
    case "string":
    case "number":
      h = true;
      break;
    case "object":
      switch (a.$$typeof) {
        case l$1:
        case n$1:
          h = true;
      }
  }
  if (h) return h = a, c = c(h), a = "" === d ? "." + Q$1(h, 0) : d, I$1(c) ? (e = "", null != a && (e = a.replace(P$1, "$&/") + "/"), R$1(c, b, e, "", function(a2) {
    return a2;
  })) : null != c && (O$1(c) && (c = N$1(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P$1, "$&/") + "/") + a)), b.push(c)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (I$1(a)) for (var g = 0; g < a.length; g++) {
    k2 = a[g];
    var f2 = d + Q$1(k2, g);
    h += R$1(k2, b, e, f2, c);
  }
  else if (f2 = A$1(a), "function" === typeof f2) for (a = f2.call(a), g = 0; !(k2 = a.next()).done; ) k2 = k2.value, f2 = d + Q$1(k2, g++), h += R$1(k2, b, e, f2, c);
  else if ("object" === k2) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S$1(a, b, e) {
  if (null == a) return a;
  var d = [], c = 0;
  R$1(a, d, "", "", function(a2) {
    return b.call(e, a2, c++);
  });
  return d;
}
function T$1(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    b.then(function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
    }, function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
    });
    -1 === a._status && (a._status = 0, a._result = b);
  }
  if (1 === a._status) return a._result.default;
  throw a._result;
}
var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
function X$1() {
  throw Error("act(...) is not supported in production builds of React.");
}
react_production_min.Children = { map: S$1, forEach: function(a, b, e) {
  S$1(a, function() {
    b.apply(this, arguments);
  }, e);
}, count: function(a) {
  var b = 0;
  S$1(a, function() {
    b++;
  });
  return b;
}, toArray: function(a) {
  return S$1(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O$1(a)) throw Error("React.Children.only expected to receive a single React element child.");
  return a;
} };
react_production_min.Component = E$1;
react_production_min.Fragment = p$2;
react_production_min.Profiler = r;
react_production_min.PureComponent = G$1;
react_production_min.StrictMode = q$1;
react_production_min.Suspense = w;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
react_production_min.act = X$1;
react_production_min.cloneElement = function(a, b, e) {
  if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C$1({}, a.props), c = a.key, k2 = a.ref, h = a._owner;
  if (null != b) {
    void 0 !== b.ref && (k2 = b.ref, h = K$1.current);
    void 0 !== b.key && (c = "" + b.key);
    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
    for (f2 in b) J.call(b, f2) && !L$1.hasOwnProperty(f2) && (d[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2) d.children = e;
  else if (1 < f2) {
    g = Array(f2);
    for (var m2 = 0; m2 < f2; m2++) g[m2] = arguments[m2 + 2];
    d.children = g;
  }
  return { $$typeof: l$1, type: a.type, key: c, ref: k2, props: d, _owner: h };
};
react_production_min.createContext = function(a) {
  a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a.Provider = { $$typeof: t, _context: a };
  return a.Consumer = a;
};
react_production_min.createElement = M$1;
react_production_min.createFactory = function(a) {
  var b = M$1.bind(null, a);
  b.type = a;
  return b;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a) {
  return { $$typeof: v$1, render: a };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function(a) {
  return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T$1 };
};
react_production_min.memo = function(a, b) {
  return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
};
react_production_min.startTransition = function(a) {
  var b = V$1.transition;
  V$1.transition = {};
  try {
    a();
  } finally {
    V$1.transition = b;
  }
};
react_production_min.unstable_act = X$1;
react_production_min.useCallback = function(a, b) {
  return U$1.current.useCallback(a, b);
};
react_production_min.useContext = function(a) {
  return U$1.current.useContext(a);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a) {
  return U$1.current.useDeferredValue(a);
};
react_production_min.useEffect = function(a, b) {
  return U$1.current.useEffect(a, b);
};
react_production_min.useId = function() {
  return U$1.current.useId();
};
react_production_min.useImperativeHandle = function(a, b, e) {
  return U$1.current.useImperativeHandle(a, b, e);
};
react_production_min.useInsertionEffect = function(a, b) {
  return U$1.current.useInsertionEffect(a, b);
};
react_production_min.useLayoutEffect = function(a, b) {
  return U$1.current.useLayoutEffect(a, b);
};
react_production_min.useMemo = function(a, b) {
  return U$1.current.useMemo(a, b);
};
react_production_min.useReducer = function(a, b, e) {
  return U$1.current.useReducer(a, b, e);
};
react_production_min.useRef = function(a) {
  return U$1.current.useRef(a);
};
react_production_min.useState = function(a) {
  return U$1.current.useState(a);
};
react_production_min.useSyncExternalStore = function(a, b, e) {
  return U$1.current.useSyncExternalStore(a, b, e);
};
react_production_min.useTransition = function() {
  return U$1.current.useTransition();
};
react_production_min.version = "18.3.1";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const React$2 = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = reactExports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$1 = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a) m$1.call(a, b) && !p$1.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function f2(a, b) {
    var c = a.length;
    a.push(b);
    a: for (; 0 < c; ) {
      var d = c - 1 >>> 1, e = a[d];
      if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
      else break a;
    }
  }
  function h(a) {
    return 0 === a.length ? null : a[0];
  }
  function k2(a) {
    if (0 === a.length) return null;
    var b = a[0], c = a.pop();
    if (c !== b) {
      a[0] = c;
      a: for (var d = 0, e = a.length, w2 = e >>> 1; d < w2; ) {
        var m2 = 2 * (d + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
        if (0 > g(C2, c)) n2 < e && 0 > g(x2, C2) ? (a[d] = x2, a[n2] = c, d = n2) : (a[d] = C2, a[m2] = c, d = m2);
        else if (n2 < e && 0 > g(x2, c)) a[d] = x2, a[n2] = c, d = n2;
        else break a;
      }
    }
    return b;
  }
  function g(a, b) {
    var c = a.sortIndex - b.sortIndex;
    return 0 !== c ? c : a.id - b.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a) {
    for (var b = h(t2); null !== b; ) {
      if (null === b.callback) k2(t2);
      else if (b.startTime <= a) k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
      else break;
      b = h(t2);
    }
  }
  function H2(a) {
    B2 = false;
    G2(a);
    if (!A2) if (null !== h(r2)) A2 = true, I2(J2);
    else {
      var b = h(t2);
      null !== b && K2(H2, b.startTime - a);
    }
  }
  function J2(a, b) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c = y2;
    try {
      G2(b);
      for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b) || a && !M2()); ) {
        var d = v2.callback;
        if ("function" === typeof d) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e = d(v2.expirationTime <= b);
          b = exports.unstable_now();
          "function" === typeof e ? v2.callback = e : v2 === h(r2) && k2(r2);
          G2(b);
        } else k2(r2);
        v2 = h(r2);
      }
      if (null !== v2) var w2 = true;
      else {
        var m2 = h(t2);
        null !== m2 && K2(H2, m2.startTime - b);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a = exports.unstable_now();
      Q2 = a;
      var b = true;
      try {
        b = O2(true, a);
      } finally {
        b ? S2() : (N2 = false, O2 = null);
      }
    } else N2 = false;
  }
  var S2;
  if ("function" === typeof F2) S2 = function() {
    F2(R2);
  };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else S2 = function() {
    D2(R2, 0);
  };
  function I2(a) {
    O2 = a;
    N2 || (N2 = true, S2());
  }
  function K2(a, b) {
    L2 = D2(function() {
      a(exports.unstable_now());
    }, b);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a) {
    a.callback = null;
  };
  exports.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports.unstable_forceFrameRate = function(a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return h(r2);
  };
  exports.unstable_next = function(a) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = y2;
    }
    var c = y2;
    y2 = b;
    try {
      return a();
    } finally {
      y2 = c;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a = 3;
    }
    var c = y2;
    y2 = a;
    try {
      return b();
    } finally {
      y2 = c;
    }
  };
  exports.unstable_scheduleCallback = function(a, b, c) {
    var d = exports.unstable_now();
    "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
    switch (a) {
      case 1:
        var e = -1;
        break;
      case 2:
        e = 250;
        break;
      case 5:
        e = 1073741823;
        break;
      case 4:
        e = 1e4;
        break;
      default:
        e = 5e3;
    }
    e = c + e;
    a = { id: u2++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
    c > d ? (a.sortIndex = c, f2(t2, a), null === h(r2) && a === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c - d))) : (a.sortIndex = e, f2(r2, a), A2 || z2 || (A2 = true, I2(J2)));
    return a;
  };
  exports.unstable_shouldYield = M2;
  exports.unstable_wrapCallback = function(a) {
    var b = y2;
    return function() {
      var c = y2;
      y2 = b;
      try {
        return a.apply(this, arguments);
      } finally {
        y2 = c;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a, b) {
  ha(a, b);
  ha(a + "Capture", b);
}
function ha(a, b) {
  ea[a] = b;
  for (a = 0; a < b.length; a++) da.add(b[a]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a) {
  if (ja.call(ma, a)) return true;
  if (ja.call(la, a)) return false;
  if (ka.test(a)) return ma[a] = true;
  la[a] = true;
  return false;
}
function pa(a, b, c, d) {
  if (null !== c && 0 === c.type) return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d) return false;
      if (null !== c) return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;
    default:
      return false;
  }
}
function qa(a, b, c, d) {
  if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
  if (d) return false;
  if (null !== c) switch (c.type) {
    case 3:
      return !b;
    case 4:
      return false === b;
    case 5:
      return isNaN(b);
    case 6:
      return isNaN(b) || 1 > b;
  }
  return false;
}
function v(a, b, c, d, e, f2, g) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f2;
  this.removeEmptyString = g;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
  z[a] = new v(a, 0, false, a, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
  var b = a[0];
  z[b] = new v(b, 1, false, a[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
  z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
  z[a] = new v(a, 2, false, a, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
  z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a) {
  z[a] = new v(a, 3, true, a, null, false, false);
});
["capture", "download"].forEach(function(a) {
  z[a] = new v(a, 4, false, a, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a) {
  z[a] = new v(a, 6, false, a, null, false, false);
});
["rowSpan", "start"].forEach(function(a) {
  z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
  var b = a.replace(
    ra,
    sa
  );
  z[b] = new v(b, 1, false, a, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
});
z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
});
function ta(a, b, c, d) {
  var e = z.hasOwnProperty(b) ? z[b] : null;
  if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a) {
  if (null === a || "object" !== typeof a) return null;
  a = Ja && a[Ja] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var A = Object.assign, La;
function Ma(a) {
  if (void 0 === La) try {
    throw Error();
  } catch (c) {
    var b = c.stack.trim().match(/\n( *(at )?)/);
    La = b && b[1] || "";
  }
  return "\n" + La + a;
}
var Na = false;
function Oa(a, b) {
  if (!a || Na) return "";
  Na = true;
  var c = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b) if (b = function() {
      throw Error();
    }, Object.defineProperty(b.prototype, "props", { set: function() {
      throw Error();
    } }), "object" === typeof Reflect && Reflect.construct) {
      try {
        Reflect.construct(b, []);
      } catch (l2) {
        var d = l2;
      }
      Reflect.construct(a, [], b);
    } else {
      try {
        b.call();
      } catch (l2) {
        d = l2;
      }
      a.call(b.prototype);
    }
    else {
      try {
        throw Error();
      } catch (l2) {
        d = l2;
      }
      a();
    }
  } catch (l2) {
    if (l2 && d && "string" === typeof l2.stack) {
      for (var e = l2.stack.split("\n"), f2 = d.stack.split("\n"), g = e.length - 1, h = f2.length - 1; 1 <= g && 0 <= h && e[g] !== f2[h]; ) h--;
      for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f2[h]) {
        if (1 !== g || 1 !== h) {
          do
            if (g--, h--, 0 > h || e[g] !== f2[h]) {
              var k2 = "\n" + e[g].replace(" at new ", " at ");
              a.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a.displayName));
              return k2;
            }
          while (1 <= g && 0 <= h);
        }
        break;
      }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c;
  }
  return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
}
function Pa(a) {
  switch (a.tag) {
    case 5:
      return Ma(a.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Oa(a.type, false), a;
    case 11:
      return a = Oa(a.type.render, false), a;
    case 1:
      return a = Oa(a.type, true), a;
    default:
      return "";
  }
}
function Qa(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;
  switch (a) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a) switch (a.$$typeof) {
    case Ca:
      return (a.displayName || "Context") + ".Consumer";
    case Ba:
      return (a._context.displayName || "Context") + ".Provider";
    case Da:
      var b = a.render;
      a = a.displayName;
      a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      return a;
    case Ga:
      return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
    case Ha:
      b = a._payload;
      a = a._init;
      try {
        return Qa(a(b));
      } catch (c) {
      }
  }
  return null;
}
function Ra(a) {
  var b = a.type;
  switch (a.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b);
    case 8:
      return b === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b) return b.displayName || b.name || null;
      if ("string" === typeof b) return b;
  }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a;
    case "object":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua(a) {
  var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get, f2 = c.set;
    Object.defineProperty(a, b, { configurable: true, get: function() {
      return e.call(this);
    }, set: function(a2) {
      d = "" + a2;
      f2.call(this, a2);
    } });
    Object.defineProperty(a, b, { enumerable: c.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a2) {
      d = "" + a2;
    }, stopTracking: function() {
      a._valueTracker = null;
      delete a[b];
    } };
  }
}
function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
  if (!a) return false;
  var b = a._valueTracker;
  if (!b) return true;
  var c = b.getValue();
  var d = "";
  a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), true) : false;
}
function Xa(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a) return null;
  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}
function Ya(a, b) {
  var c = b.checked;
  return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
}
function Za(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
  c = Sa(null != b.value ? b.value : c);
  a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}
function ab(a, b) {
  b = b.checked;
  null != b && ta(a, "checked", b, false);
}
function bb(a, b) {
  ab(a, b);
  var c = Sa(b.value), d = b.type;
  if (null != c) if ("number" === d) {
    if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
  } else a.value !== "" + c && (a.value = "" + c);
  else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function db(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }
  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}
function cb(a, b, c) {
  if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
var eb = Array.isArray;
function fb(a, b, c, d) {
  a = a.options;
  if (b) {
    b = {};
    for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
    for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
  } else {
    c = "" + Sa(c);
    b = null;
    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = true;
        d && (a[e].defaultSelected = true);
        return;
      }
      null !== b || a[e].disabled || (b = a[e]);
    }
    null !== b && (b.selected = true);
  }
}
function gb(a, b) {
  if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
  return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}
function hb(a, b) {
  var c = b.value;
  if (null == c) {
    c = b.children;
    b = b.defaultValue;
    if (null != c) {
      if (null != b) throw Error(p(92));
      if (eb(c)) {
        if (1 < c.length) throw Error(p(93));
        c = c[0];
      }
      b = c;
    }
    null == b && (b = "");
    c = b;
  }
  a._wrapperState = { initialValue: Sa(c) };
}
function ib(a, b) {
  var c = Sa(b.value), d = Sa(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}
function jb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}
function kb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var mb, nb = function(a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function() {
      return a(b, c, d, e);
    });
  } : a;
}(function(a, b) {
  if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
    for (; b.firstChild; ) a.appendChild(b.firstChild);
  }
});
function ob(a, b) {
  if (b) {
    var c = a.firstChild;
    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }
  a.textContent = b;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a) {
  qb.forEach(function(b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    pb[b] = pb[a];
  });
});
function rb(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
}
function sb(a, b) {
  a = a.style;
  for (var c in b) if (b.hasOwnProperty(c)) {
    var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
    "float" === c && (c = "cssFloat");
    d ? a.setProperty(c, e) : a[c] = e;
  }
}
var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a, b) {
  if (b) {
    if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children) throw Error(p(60));
      if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
    }
    if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
  }
}
function vb(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null, zb = null, Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb) throw Error(p(280));
    var b = a.stateNode;
    b && (b = Db(b), yb(a.stateNode, a.type, b));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb, b = Ab;
    Ab = zb = null;
    Bb(a);
    if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
  }
}
function Gb(a, b) {
  return a(b);
}
function Hb() {
}
var Ib = false;
function Jb(a, b, c) {
  if (Ib) return a(b, c);
  Ib = true;
  try {
    return Gb(a, b, c);
  } finally {
    if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
  }
}
function Kb(a, b) {
  var c = a.stateNode;
  if (null === c) return null;
  var d = Db(c);
  if (null === d) return null;
  c = d[b];
  a: switch (b) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
      a = !d;
      break a;
    default:
      a = false;
  }
  if (a) return null;
  if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
  return c;
}
var Lb = false;
if (ia) try {
  var Mb = {};
  Object.defineProperty(Mb, "passive", { get: function() {
    Lb = true;
  } });
  window.addEventListener("test", Mb, Mb);
  window.removeEventListener("test", Mb, Mb);
} catch (a) {
  Lb = false;
}
function Nb(a, b, c, d, e, f2, g, h, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
  Ob = true;
  Pb = a;
} };
function Tb(a, b, c, d, e, f2, g, h, k2) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a, b, c, d, e, f2, g, h, k2) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else throw Error(p(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a) {
  var b = a, c = a;
  if (a.alternate) for (; b.return; ) b = b.return;
  else {
    a = b;
    do
      b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
    while (a);
  }
  return 3 === b.tag ? c : null;
}
function Wb(a) {
  if (13 === a.tag) {
    var b = a.memoizedState;
    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
    if (null !== b) return b.dehydrated;
  }
  return null;
}
function Xb(a) {
  if (Vb(a) !== a) throw Error(p(188));
}
function Yb(a) {
  var b = a.alternate;
  if (!b) {
    b = Vb(a);
    if (null === b) throw Error(p(188));
    return b !== a ? null : a;
  }
  for (var c = a, d = b; ; ) {
    var e = c.return;
    if (null === e) break;
    var f2 = e.alternate;
    if (null === f2) {
      d = e.return;
      if (null !== d) {
        c = d;
        continue;
      }
      break;
    }
    if (e.child === f2.child) {
      for (f2 = e.child; f2; ) {
        if (f2 === c) return Xb(e), a;
        if (f2 === d) return Xb(e), b;
        f2 = f2.sibling;
      }
      throw Error(p(188));
    }
    if (c.return !== d.return) c = e, d = f2;
    else {
      for (var g = false, h = e.child; h; ) {
        if (h === c) {
          g = true;
          c = e;
          d = f2;
          break;
        }
        if (h === d) {
          g = true;
          d = e;
          c = f2;
          break;
        }
        h = h.sibling;
      }
      if (!g) {
        for (h = f2.child; h; ) {
          if (h === c) {
            g = true;
            c = f2;
            d = e;
            break;
          }
          if (h === d) {
            g = true;
            d = f2;
            c = e;
            break;
          }
          h = h.sibling;
        }
        if (!g) throw Error(p(189));
      }
    }
    if (c.alternate !== d) throw Error(p(190));
  }
  if (3 !== c.tag) throw Error(p(188));
  return c.stateNode.current === c ? a : b;
}
function Zb(a) {
  a = Yb(a);
  return null !== a ? $b(a) : null;
}
function $b(a) {
  if (5 === a.tag || 6 === a.tag) return a;
  for (a = a.child; null !== a; ) {
    var b = $b(a);
    if (null !== b) return b;
    a = a.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a) {
  if (lc && "function" === typeof lc.onCommitFiberRoot) try {
    lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
  } catch (b) {
  }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a) {
  a >>>= 0;
  return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a) {
  switch (a & -a) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a;
  }
}
function uc(a, b) {
  var c = a.pendingLanes;
  if (0 === c) return 0;
  var d = 0, e = a.suspendedLanes, f2 = a.pingedLanes, g = c & 268435455;
  if (0 !== g) {
    var h = g & ~e;
    0 !== h ? d = tc(h) : (f2 &= g, 0 !== f2 && (d = tc(f2)));
  } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f2 && (d = tc(f2));
  if (0 === d) return 0;
  if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f2 = b & -b, e >= f2 || 16 === e && 0 !== (f2 & 4194240))) return b;
  0 !== (d & 4) && (d |= c & 16);
  b = a.entangledLanes;
  if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
  return d;
}
function vc(a, b) {
  switch (a) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a, b) {
  for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
    var g = 31 - oc(f2), h = 1 << g, k2 = e[g];
    if (-1 === k2) {
      if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
    } else k2 <= b && (a.expiredLanes |= h);
    f2 &= ~h;
  }
}
function xc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a;
}
function zc(a) {
  for (var b = [], c = 0; 31 > c; c++) b.push(a);
  return b;
}
function Ac(a, b, c) {
  a.pendingLanes |= b;
  536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
  a = a.eventTimes;
  b = 31 - oc(b);
  a[b] = c;
}
function Bc(a, b) {
  var c = a.pendingLanes & ~b;
  a.pendingLanes = b;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= b;
  a.mutableReadLanes &= b;
  a.entangledLanes &= b;
  b = a.entanglements;
  var d = a.eventTimes;
  for (a = a.expirationTimes; 0 < c; ) {
    var e = 31 - oc(c), f2 = 1 << e;
    b[e] = 0;
    d[e] = -1;
    a[e] = -1;
    c &= ~f2;
  }
}
function Cc(a, b) {
  var c = a.entangledLanes |= b;
  for (a = a.entanglements; c; ) {
    var d = 31 - oc(c), e = 1 << d;
    e & b | a[d] & b && (a[d] |= b);
    c &= ~e;
  }
}
var C = 0;
function Dc(a) {
  a &= -a;
  return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a, b) {
  switch (a) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b.pointerId);
  }
}
function Tc(a, b, c, d, e, f2) {
  if (null === a || a.nativeEvent !== f2) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
  a.eventSystemFlags |= d;
  b = a.targetContainers;
  null !== e && -1 === b.indexOf(e) && b.push(e);
  return a;
}
function Uc(a, b, c, d, e) {
  switch (b) {
    case "focusin":
      return Lc = Tc(Lc, a, b, c, d, e), true;
    case "dragenter":
      return Mc = Tc(Mc, a, b, c, d, e), true;
    case "mouseover":
      return Nc = Tc(Nc, a, b, c, d, e), true;
    case "pointerover":
      var f2 = e.pointerId;
      Oc.set(f2, Tc(Oc.get(f2) || null, a, b, c, d, e));
      return true;
    case "gotpointercapture":
      return f2 = e.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a, b, c, d, e)), true;
  }
  return false;
}
function Vc(a) {
  var b = Wc(a.target);
  if (null !== b) {
    var c = Vb(b);
    if (null !== c) {
      if (b = c.tag, 13 === b) {
        if (b = Wb(c), null !== b) {
          a.blockedOn = b;
          Ic(a.priority, function() {
            Gc(c);
          });
          return;
        }
      } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
        a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a.blockedOn = null;
}
function Xc(a) {
  if (null !== a.blockedOn) return false;
  for (var b = a.targetContainers; 0 < b.length; ) {
    var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
    if (null === c) {
      c = a.nativeEvent;
      var d = new c.constructor(c.type, c);
      wb = d;
      c.target.dispatchEvent(d);
      wb = null;
    } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
    b.shift();
  }
  return true;
}
function Zc(a, b, c) {
  Xc(a) && c.delete(b);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a, b) {
  a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a) {
  function b(b2) {
    return ad(b2, a);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a);
    for (var c = 1; c < Kc.length; c++) {
      var d = Kc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a);
  null !== Mc && ad(Mc, a);
  null !== Nc && ad(Nc, a);
  Oc.forEach(b);
  Pc.forEach(b);
  for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
  for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a, b, c, d) {
  var e = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 1, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f2;
  }
}
function gd(a, b, c, d) {
  var e = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 4, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f2;
  }
}
function fd(a, b, c, d) {
  if (dd) {
    var e = Yc(a, b, c, d);
    if (null === e) hd(a, b, d, id, c), Sc(a, d);
    else if (Uc(e, a, b, c, d)) d.stopPropagation();
    else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
      for (; null !== e; ) {
        var f2 = Cb(e);
        null !== f2 && Ec(f2);
        f2 = Yc(a, b, c, d);
        null === f2 && hd(a, b, d, id, c);
        if (f2 === e) break;
        e = f2;
      }
      null !== e && d.stopPropagation();
    } else hd(a, b, d, null, c);
  }
}
var id = null;
function Yc(a, b, c, d) {
  id = null;
  a = xb(d);
  a = Wc(a);
  if (null !== a) if (b = Vb(a), null === b) a = null;
  else if (c = b.tag, 13 === c) {
    a = Wb(b);
    if (null !== a) return a;
    a = null;
  } else if (3 === c) {
    if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
    a = null;
  } else b !== a && (a = null);
  id = a;
  return null;
}
function jd(a) {
  switch (a) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md) return md;
  var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f2 = e.length;
  for (a = 0; a < c && b[a] === e[a]; a++) ;
  var g = c - a;
  for (d = 1; d <= g && b[c - d] === e[f2 - d]; d++) ;
  return md = e.slice(a, 1 < d ? 1 - d : void 0);
}
function od(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a) {
  function b(b2, d, e, f2, g) {
    this._reactName = b2;
    this._targetInst = e;
    this.type = d;
    this.nativeEvent = f2;
    this.target = g;
    this.currentTarget = null;
    for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f2) : f2[c]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a2 = this.nativeEvent;
    a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a2 = this.nativeEvent;
    a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
  return a.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
  return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
}, movementX: function(a) {
  if ("movementX" in a) return a.movementX;
  a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
  return wd;
}, movementY: function(a) {
  return "movementY" in a ? a.movementY : xd;
} }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
  return "clipboardData" in a ? a.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
}
function zd() {
  return Pd;
}
var Qd = A({}, ud, { key: function(a) {
  if (a.key) {
    var b = Md[a.key] || a.key;
    if ("Unidentified" !== b) return b;
  }
  return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
  return "keypress" === a.type ? od(a) : 0;
}, keyCode: function(a) {
  return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
}, which: function(a) {
  return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
} }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
  deltaX: function(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
ia && "documentMode" in document && (be = document.documentMode);
var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
function ge(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);
    case "keydown":
      return 229 !== b.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}
var ie = false;
function je(a, b) {
  switch (a) {
    case "compositionend":
      return he(b);
    case "keypress":
      if (32 !== b.which) return null;
      fe = true;
      return ee;
    case "textInput":
      return a = b.data, a === ee && fe ? null : a;
    default:
      return null;
  }
}
function ke(a, b) {
  if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de && "ko" !== b.locale ? null : b.data;
    default:
      return null;
  }
}
var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
}
function ne(a, b, c, d) {
  Eb(d);
  b = oe(b, "onChange");
  0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
}
var pe = null, qe = null;
function re(a) {
  se(a, 0);
}
function te(a) {
  var b = ue(a);
  if (Wa(b)) return a;
}
function ve(a, b) {
  if ("change" === a) return b;
}
var we = false;
if (ia) {
  var xe;
  if (ia) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }
    xe = ye;
  } else xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a) {
  if ("value" === a.propertyName && te(qe)) {
    var b = [];
    ne(b, qe, a, xb(a));
    Jb(re, b);
  }
}
function Ce(a, b, c) {
  "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
}
function De(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
}
function Ee(a, b) {
  if ("click" === a) return te(b);
}
function Fe(a, b) {
  if ("input" === a || "change" === a) return te(b);
}
function Ge(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie(a, b) {
  if (He(a, b)) return true;
  if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
  var c = Object.keys(a), d = Object.keys(b);
  if (c.length !== d.length) return false;
  for (d = 0; d < c.length; d++) {
    var e = c[d];
    if (!ja.call(b, e) || !He(a[e], b[e])) return false;
  }
  return true;
}
function Je(a) {
  for (; a && a.firstChild; ) a = a.firstChild;
  return a;
}
function Ke(a, b) {
  var c = Je(a);
  a = 0;
  for (var d; c; ) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b) return { node: c, offset: b - a };
      a = d;
    }
    a: {
      for (; c; ) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }
        c = c.parentNode;
      }
      c = void 0;
    }
    c = Je(c);
  }
}
function Le(a, b) {
  return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
}
function Me() {
  for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = false;
    }
    if (c) a = b.contentWindow;
    else break;
    b = Xa(a.document);
  }
  return b;
}
function Ne(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}
function Oe(a) {
  var b = Me(), c = a.focusedElem, d = a.selectionRange;
  if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
    if (null !== d && Ne(c)) {
      if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
      else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
        a = a.getSelection();
        var e = c.textContent.length, f2 = Math.min(d.start, e);
        d = void 0 === d.end ? f2 : Math.min(d.end, e);
        !a.extend && f2 > d && (e = d, d = f2, f2 = e);
        e = Ke(c, f2);
        var g = Ke(
          c,
          d
        );
        e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f2 > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
      }
    }
    b = [];
    for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
    "function" === typeof c.focus && c.focus();
    for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
  }
}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
function Ue(a, b, c) {
  var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
  Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
}
function Ve(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a) {
  if (Xe[a]) return Xe[a];
  if (!We[a]) return a;
  var b = We[a], c;
  for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
  return a;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a, b) {
  df.set(a, b);
  fa(b, [a]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = c;
  Ub(d, b, void 0, a);
  a.currentTarget = null;
}
function se(a, b) {
  b = 0 !== (b & 4);
  for (var c = 0; c < a.length; c++) {
    var d = a[c], e = d.event;
    d = d.listeners;
    a: {
      var f2 = void 0;
      if (b) for (var g = d.length - 1; 0 <= g; g--) {
        var h = d[g], k2 = h.instance, l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e.isPropagationStopped()) break a;
        nf(e, h, l2);
        f2 = k2;
      }
      else for (g = 0; g < d.length; g++) {
        h = d[g];
        k2 = h.instance;
        l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e.isPropagationStopped()) break a;
        nf(e, h, l2);
        f2 = k2;
      }
    }
  }
  if (Qb) throw a = Rb, Qb = false, Rb = null, a;
}
function D(a, b) {
  var c = b[of];
  void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
  var d = a + "__bubble";
  c.has(d) || (pf(b, a, 2, false), c.add(d));
}
function qf(a, b, c) {
  var d = 0;
  b && (d |= 4);
  pf(c, a, d, b);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a) {
  if (!a[rf]) {
    a[rf] = true;
    da.forEach(function(b2) {
      "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
    });
    var b = 9 === a.nodeType ? a : a.ownerDocument;
    null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
  }
}
function pf(a, b, c, d) {
  switch (jd(b)) {
    case 1:
      var e = ed;
      break;
    case 4:
      e = gd;
      break;
    default:
      e = fd;
  }
  c = e.bind(null, b, c, a);
  e = void 0;
  !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
  d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
}
function hd(a, b, c, d, e) {
  var f2 = d;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
    if (null === d) return;
    var g = d.tag;
    if (3 === g || 4 === g) {
      var h = d.stateNode.containerInfo;
      if (h === e || 8 === h.nodeType && h.parentNode === e) break;
      if (4 === g) for (g = d.return; null !== g; ) {
        var k2 = g.tag;
        if (3 === k2 || 4 === k2) {
          if (k2 = g.stateNode.containerInfo, k2 === e || 8 === k2.nodeType && k2.parentNode === e) return;
        }
        g = g.return;
      }
      for (; null !== h; ) {
        g = Wc(h);
        if (null === g) return;
        k2 = g.tag;
        if (5 === k2 || 6 === k2) {
          d = f2 = g;
          continue a;
        }
        h = h.parentNode;
      }
    }
    d = d.return;
  }
  Jb(function() {
    var d2 = f2, e2 = xb(c), g2 = [];
    a: {
      var h2 = df.get(a);
      if (void 0 !== h2) {
        var k3 = td, n2 = a;
        switch (a) {
          case "keypress":
            if (0 === od(c)) break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a, x2 = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
        t2 = [];
        for (var w2 = d2, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2) break;
          w2 = w2.return;
        }
        0 < t2.length && (h2 = new k3(h2, n2, null, c, e2), g2.push({ event: h2, listeners: t2 }));
      }
    }
    if (0 === (b & 7)) {
      a: {
        h2 = "mouseover" === a || "pointerover" === a;
        k3 = "mouseout" === a || "pointerout" === a;
        if (h2 && c !== wb && (n2 = c.relatedTarget || c.fromElement) && (Wc(n2) || n2[uf])) break a;
        if (k3 || h2) {
          h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
          if (k3) {
            if (n2 = c.relatedTarget || c.toElement, k3 = d2, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
          } else k3 = null, n2 = d2;
          if (k3 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a || "pointerover" === a) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h2 : ue(k3);
            u2 = null == n2 ? h2 : ue(n2);
            h2 = new t2(F2, w2 + "leave", k3, c, e2);
            h2.target = J2;
            h2.relatedTarget = u2;
            F2 = null;
            Wc(e2) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c, e2), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k3 && n2) b: {
              t2 = k3;
              x2 = n2;
              w2 = 0;
              for (u2 = t2; u2; u2 = vf(u2)) w2++;
              u2 = 0;
              for (F2 = x2; F2; F2 = vf(F2)) u2++;
              for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
              for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
              for (; w2--; ) {
                if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                t2 = vf(t2);
                x2 = vf(x2);
              }
              t2 = null;
            }
            else t2 = null;
            null !== k3 && wf(g2, h2, k3, t2, false);
            null !== n2 && null !== J2 && wf(g2, J2, n2, t2, true);
          }
        }
      }
      a: {
        h2 = d2 ? ue(d2) : window;
        k3 = h2.nodeName && h2.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h2.type) var na = ve;
        else if (me(h2)) if (we) na = Fe;
        else {
          na = De;
          var xa = Ce;
        }
        else (k3 = h2.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
        if (na && (na = na(a, d2))) {
          ne(g2, na, c, e2);
          break a;
        }
        xa && xa(a, h2, d2);
        "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
      }
      xa = d2 ? ue(d2) : window;
      switch (a) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g2, c, e2);
          break;
        case "selectionchange":
          if (Pe) break;
        case "keydown":
        case "keyup":
          Ue(g2, c, e2);
      }
      var $a;
      if (ae) b: {
        switch (a) {
          case "compositionstart":
            var ba = "onCompositionStart";
            break b;
          case "compositionend":
            ba = "onCompositionEnd";
            break b;
          case "compositionupdate":
            ba = "onCompositionUpdate";
            break b;
        }
        ba = void 0;
      }
      else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
      ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
      if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
    }
    se(g2, b);
  });
}
function tf(a, b, c) {
  return { instance: a, listener: b, currentTarget: c };
}
function oe(a, b) {
  for (var c = b + "Capture", d = []; null !== a; ) {
    var e = a, f2 = e.stateNode;
    5 === e.tag && null !== f2 && (e = f2, f2 = Kb(a, c), null != f2 && d.unshift(tf(a, f2, e)), f2 = Kb(a, b), null != f2 && d.push(tf(a, f2, e)));
    a = a.return;
  }
  return d;
}
function vf(a) {
  if (null === a) return null;
  do
    a = a.return;
  while (a && 5 !== a.tag);
  return a ? a : null;
}
function wf(a, b, c, d, e) {
  for (var f2 = b._reactName, g = []; null !== c && c !== d; ) {
    var h = c, k2 = h.alternate, l2 = h.stateNode;
    if (null !== k2 && k2 === d) break;
    5 === h.tag && null !== l2 && (h = l2, e ? (k2 = Kb(c, f2), null != k2 && g.unshift(tf(c, k2, h))) : e || (k2 = Kb(c, f2), null != k2 && g.push(tf(c, k2, h))));
    c = c.return;
  }
  0 !== g.length && a.push({ event: b, listeners: g });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a) {
  return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
}
function Af(a, b, c) {
  b = zf(b);
  if (zf(a) !== b && c) throw Error(p(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a, b) {
  return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
  return Hf.resolve(null).then(a).catch(If);
} : Ff;
function If(a) {
  setTimeout(function() {
    throw a;
  });
}
function Kf(a, b) {
  var c = b, d = 0;
  do {
    var e = c.nextSibling;
    a.removeChild(c);
    if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
      if (0 === d) {
        a.removeChild(e);
        bd(b);
        return;
      }
      d--;
    } else "$" !== c && "$?" !== c && "$!" !== c || d++;
    c = e;
  } while (c);
  bd(b);
}
function Lf(a) {
  for (; null != a; a = a.nextSibling) {
    var b = a.nodeType;
    if (1 === b || 3 === b) break;
    if (8 === b) {
      b = a.data;
      if ("$" === b || "$!" === b || "$?" === b) break;
      if ("/$" === b) return null;
    }
  }
  return a;
}
function Mf(a) {
  a = a.previousSibling;
  for (var b = 0; a; ) {
    if (8 === a.nodeType) {
      var c = a.data;
      if ("$" === c || "$!" === c || "$?" === c) {
        if (0 === b) return a;
        b--;
      } else "/$" === c && b++;
    }
    a = a.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a) {
  var b = a[Of];
  if (b) return b;
  for (var c = a.parentNode; c; ) {
    if (b = c[uf] || c[Of]) {
      c = b.alternate;
      if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
        if (c = a[Of]) return c;
        a = Mf(a);
      }
      return b;
    }
    a = c;
    c = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[Of] || a[uf];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}
function ue(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;
  throw Error(p(33));
}
function Db(a) {
  return a[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a) {
  return { current: a };
}
function E(a) {
  0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G(a, b) {
  Tf++;
  Sf[Tf] = a.current;
  a.current = b;
}
var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a, b) {
  var c = a.type.contextTypes;
  if (!c) return Vf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
  var e = {}, f2;
  for (f2 in c) e[f2] = b[f2];
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}
function Zf(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}
function $f() {
  E(Wf);
  E(H);
}
function ag(a, b, c) {
  if (H.current !== Vf) throw Error(p(168));
  G(H, b);
  G(Wf, c);
}
function bg(a, b, c) {
  var d = a.stateNode;
  b = b.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c;
  d = d.getChildContext();
  for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
  return A({}, c, d);
}
function cg(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H.current;
  G(H, a);
  G(Wf, Wf.current);
  return true;
}
function dg(a, b, c) {
  var d = a.stateNode;
  if (!d) throw Error(p(169));
  c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
  G(Wf, c);
}
var eg = null, fg = false, gg = false;
function hg(a) {
  null === eg ? eg = [a] : eg.push(a);
}
function ig(a) {
  fg = true;
  hg(a);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a = 0, b = C;
    try {
      var c = eg;
      for (C = 1; a < c.length; a++) {
        var d = c[a];
        do
          d = d(true);
        while (null !== d);
      }
      eg = null;
      fg = false;
    } catch (e) {
      throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
    } finally {
      C = b, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a, b) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a;
  ng = b;
}
function ug(a, b, c) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a;
  var d = rg;
  a = sg;
  var e = 32 - oc(d) - 1;
  d &= ~(1 << e);
  c += 1;
  var f2 = 32 - oc(b) + e;
  if (30 < f2) {
    var g = e - e % 5;
    f2 = (d & (1 << g) - 1).toString(32);
    d >>= g;
    e -= g;
    rg = 1 << 32 - oc(b) + e | c << e | d;
    sg = f2 + a;
  } else rg = 1 << f2 | c << e | d, sg = a;
}
function vg(a) {
  null !== a.return && (tg(a, 1), ug(a, 1, 0));
}
function wg(a) {
  for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I = false, zg = null;
function Ag(a, b) {
  var c = Bg(5, null, null, 0);
  c.elementType = "DELETED";
  c.stateNode = b;
  c.return = a;
  b = a.deletions;
  null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
}
function Cg(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
    case 13:
      return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a) {
  return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
}
function Eg(a) {
  if (I) {
    var b = yg;
    if (b) {
      var c = b;
      if (!Cg(a, b)) {
        if (Dg(a)) throw Error(p(418));
        b = Lf(c.nextSibling);
        var d = xg;
        b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
      }
    } else {
      if (Dg(a)) throw Error(p(418));
      a.flags = a.flags & -4097 | 2;
      I = false;
      xg = a;
    }
  }
}
function Fg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
  xg = a;
}
function Gg(a) {
  if (a !== xg) return false;
  if (!I) return Fg(a), I = true, false;
  var b;
  (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
  if (b && (b = yg)) {
    if (Dg(a)) throw Hg(), Error(p(418));
    for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
  }
  Fg(a);
  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a) throw Error(p(317));
    a: {
      a = a.nextSibling;
      for (b = 0; a; ) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("/$" === c) {
            if (0 === b) {
              yg = Lf(a.nextSibling);
              break a;
            }
            b--;
          } else "$" !== c && "$!" !== c && "$?" !== c || b++;
        }
        a = a.nextSibling;
      }
      yg = null;
    }
  } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a = yg; a; ) a = Lf(a.nextSibling);
}
function Ig() {
  yg = xg = null;
  I = false;
}
function Jg(a) {
  null === zg ? zg = [a] : zg.push(a);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a, b, c) {
  a = c.ref;
  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c._owner) {
      c = c._owner;
      if (c) {
        if (1 !== c.tag) throw Error(p(309));
        var d = c.stateNode;
      }
      if (!d) throw Error(p(147, a));
      var e = d, f2 = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2) return b.ref;
      b = function(a2) {
        var b2 = e.refs;
        null === a2 ? delete b2[f2] : b2[f2] = a2;
      };
      b._stringRef = f2;
      return b;
    }
    if ("string" !== typeof a) throw Error(p(284));
    if (!c._owner) throw Error(p(290, a));
  }
  return a;
}
function Mg(a, b) {
  a = Object.prototype.toString.call(b);
  throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
}
function Ng(a) {
  var b = a._init;
  return b(a._payload);
}
function Og(a) {
  function b(b2, c2) {
    if (a) {
      var d2 = b2.deletions;
      null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
    }
  }
  function c(c2, d2) {
    if (!a) return null;
    for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
    return null;
  }
  function d(a2, b2) {
    for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
    return a2;
  }
  function e(a2, b2) {
    a2 = Pg(a2, b2);
    a2.index = 0;
    a2.sibling = null;
    return a2;
  }
  function f2(b2, c2, d2) {
    b2.index = d2;
    if (!a) return b2.flags |= 1048576, c2;
    d2 = b2.alternate;
    if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
    b2.flags |= 2;
    return c2;
  }
  function g(b2) {
    a && null === b2.alternate && (b2.flags |= 2);
    return b2;
  }
  function h(a2, b2, c2, d2) {
    if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function k2(a2, b2, c2, d2) {
    var f3 = c2.type;
    if (f3 === ya) return m2(a2, b2, c2.props.children, d2, c2.key);
    if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
    d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
    d2.ref = Lg(a2, b2, c2);
    d2.return = a2;
    return d2;
  }
  function l2(a2, b2, c2, d2) {
    if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2.children || []);
    b2.return = a2;
    return b2;
  }
  function m2(a2, b2, c2, d2, f3) {
    if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f3), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function q2(a2, b2, c2) {
    if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
    if ("object" === typeof b2 && null !== b2) {
      switch (b2.$$typeof) {
        case va:
          return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
        case wa:
          return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
        case Ha:
          var d2 = b2._init;
          return q2(a2, d2(b2._payload), c2);
      }
      if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
      Mg(a2, b2);
    }
    return null;
  }
  function r2(a2, b2, c2, d2) {
    var e2 = null !== b2 ? b2.key : null;
    if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
    if ("object" === typeof c2 && null !== c2) {
      switch (c2.$$typeof) {
        case va:
          return c2.key === e2 ? k2(a2, b2, c2, d2) : null;
        case wa:
          return c2.key === e2 ? l2(a2, b2, c2, d2) : null;
        case Ha:
          return e2 = c2._init, r2(
            a2,
            b2,
            e2(c2._payload),
            d2
          );
      }
      if (eb(c2) || Ka(c2)) return null !== e2 ? null : m2(a2, b2, c2, d2, null);
      Mg(a2, c2);
    }
    return null;
  }
  function y2(a2, b2, c2, d2, e2) {
    if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
    if ("object" === typeof d2 && null !== d2) {
      switch (d2.$$typeof) {
        case va:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k2(b2, a2, d2, e2);
        case wa:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l2(b2, a2, d2, e2);
        case Ha:
          var f3 = d2._init;
          return y2(a2, b2, c2, f3(d2._payload), e2);
      }
      if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m2(b2, a2, d2, e2, null);
      Mg(b2, d2);
    }
    return null;
  }
  function n2(e2, g2, h2, k3) {
    for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; null !== u2 && w2 < h2.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e2, u2, h2[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a && u2 && null === n3.alternate && b(e2, u2);
      g2 = f2(n3, g2, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h2.length) return c(e2, u2), I && tg(e2, w2), l3;
    if (null === u2) {
      for (; w2 < h2.length; w2++) u2 = q2(e2, h2[w2], k3), null !== u2 && (g2 = f2(u2, g2, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I && tg(e2, w2);
      return l3;
    }
    for (u2 = d(e2, u2); w2 < h2.length; w2++) x2 = y2(u2, e2, w2, h2[w2], k3), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g2 = f2(x2, g2, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a && u2.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w2);
    return l3;
  }
  function t2(e2, g2, h2, k3) {
    var l3 = Ka(h2);
    if ("function" !== typeof l3) throw Error(p(150));
    h2 = l3.call(h2);
    if (null == h2) throw Error(p(151));
    for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h2.next(); null !== m3 && !n3.done; w2++, n3 = h2.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e2, m3, n3.value, k3);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a && m3 && null === t3.alternate && b(e2, m3);
      g2 = f2(t3, g2, w2);
      null === u2 ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done) return c(
      e2,
      m3
    ), I && tg(e2, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h2.next()) n3 = q2(e2, n3.value, k3), null !== n3 && (g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I && tg(e2, w2);
      return l3;
    }
    for (m3 = d(e2, m3); !n3.done; w2++, n3 = h2.next()) n3 = y2(m3, e2, w2, n3.value, k3), null !== n3 && (a && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a && m3.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w2);
    return l3;
  }
  function J2(a2, d2, f3, h2) {
    "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va:
          a: {
            for (var k3 = f3.key, l3 = d2; null !== l3; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya) {
                  if (7 === l3.tag) {
                    c(a2, l3.sibling);
                    d2 = e(l3, f3.props.children);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                  c(a2, l3.sibling);
                  d2 = e(l3, f3.props);
                  d2.ref = Lg(a2, l3, f3);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                }
                c(a2, l3);
                break;
              } else b(a2, l3);
              l3 = l3.sibling;
            }
            f3.type === ya ? (d2 = Tg(f3.props.children, a2.mode, h2, f3.key), d2.return = a2, a2 = d2) : (h2 = Rg(f3.type, f3.key, f3.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f3), h2.return = a2, a2 = h2);
          }
          return g(a2);
        case wa:
          a: {
            for (l3 = f3.key; null !== d2; ) {
              if (d2.key === l3) if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                c(a2, d2.sibling);
                d2 = e(d2, f3.children || []);
                d2.return = a2;
                a2 = d2;
                break a;
              } else {
                c(a2, d2);
                break;
              }
              else b(a2, d2);
              d2 = d2.sibling;
            }
            d2 = Sg(f3, a2.mode, h2);
            d2.return = a2;
            a2 = d2;
          }
          return g(a2);
        case Ha:
          return l3 = f3._init, J2(a2, d2, l3(f3._payload), h2);
      }
      if (eb(f3)) return n2(a2, d2, f3, h2);
      if (Ka(f3)) return t2(a2, d2, f3, h2);
      Mg(a2, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f3), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f3, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
  }
  return J2;
}
var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
function $g() {
  Zg = Yg = Xg = null;
}
function ah(a) {
  var b = Wg.current;
  E(Wg);
  a._currentValue = b;
}
function bh(a, b, c) {
  for (; null !== a; ) {
    var d = a.alternate;
    (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
    if (a === c) break;
    a = a.return;
  }
}
function ch(a, b) {
  Xg = a;
  Zg = Yg = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
}
function eh(a) {
  var b = a._currentValue;
  if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
    if (null === Xg) throw Error(p(308));
    Yg = a;
    Xg.dependencies = { lanes: 0, firstContext: a };
  } else Yg = Yg.next = a;
  return b;
}
var fh = null;
function gh(a) {
  null === fh ? fh = [a] : fh.push(a);
}
function hh(a, b, c, d) {
  var e = b.interleaved;
  null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
  b.interleaved = c;
  return ih(a, d);
}
function ih(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  null !== c && (c.lanes |= b);
  c = a;
  for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
  return 3 === c.tag ? c.stateNode : null;
}
var jh = false;
function kh(a) {
  a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function lh(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
}
function mh(a, b) {
  return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function nh(a, b, c) {
  var d = a.updateQueue;
  if (null === d) return null;
  d = d.shared;
  if (0 !== (K & 2)) {
    var e = d.pending;
    null === e ? b.next = b : (b.next = e.next, e.next = b);
    d.pending = b;
    return ih(a, c);
  }
  e = d.interleaved;
  null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
  d.interleaved = b;
  return ih(a, c);
}
function oh(a, b, c) {
  b = b.updateQueue;
  if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
function ph(a, b) {
  var c = a.updateQueue, d = a.alternate;
  if (null !== d && (d = d.updateQueue, c === d)) {
    var e = null, f2 = null;
    c = c.firstBaseUpdate;
    if (null !== c) {
      do {
        var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
        null === f2 ? e = f2 = g : f2 = f2.next = g;
        c = c.next;
      } while (null !== c);
      null === f2 ? e = f2 = b : f2 = f2.next = b;
    } else e = f2 = b;
    c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
    a.updateQueue = c;
    return;
  }
  a = c.lastBaseUpdate;
  null === a ? c.firstBaseUpdate = b : a.next = b;
  c.lastBaseUpdate = b;
}
function qh(a, b, c, d) {
  var e = a.updateQueue;
  jh = false;
  var f2 = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
  if (null !== h) {
    e.shared.pending = null;
    var k2 = h, l2 = k2.next;
    k2.next = null;
    null === g ? f2 = l2 : g.next = l2;
    g = k2;
    var m2 = a.alternate;
    null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g && (null === h ? m2.firstBaseUpdate = l2 : h.next = l2, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e.baseState;
    g = 0;
    m2 = l2 = k2 = null;
    h = f2;
    do {
      var r2 = h.lane, y2 = h.eventTime;
      if ((d & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        });
        a: {
          var n2 = a, t2 = h;
          r2 = b;
          y2 = c;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2) break a;
              q2 = A({}, q2, r2);
              break a;
            case 2:
              jh = true;
          }
        }
        null !== h.callback && 0 !== h.lane && (a.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h] : r2.push(h));
      } else y2 = { eventTime: y2, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g |= r2;
      h = h.next;
      if (null === h) if (h = e.shared.pending, null === h) break;
      else r2 = h, h = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e.baseState = k2;
    e.firstBaseUpdate = l2;
    e.lastBaseUpdate = m2;
    b = e.shared.interleaved;
    if (null !== b) {
      e = b;
      do
        g |= e.lane, e = e.next;
      while (e !== b);
    } else null === f2 && (e.shared.lanes = 0);
    rh |= g;
    a.lanes = g;
    a.memoizedState = q2;
  }
}
function sh(a, b, c) {
  a = b.effects;
  b.effects = null;
  if (null !== a) for (b = 0; b < a.length; b++) {
    var d = a[b], e = d.callback;
    if (null !== e) {
      d.callback = null;
      d = c;
      if ("function" !== typeof e) throw Error(p(191, e));
      e.call(d);
    }
  }
}
var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
function xh(a) {
  if (a === th) throw Error(p(174));
  return a;
}
function yh(a, b) {
  G(wh, b);
  G(vh, a);
  G(uh, th);
  a = b.nodeType;
  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
      break;
    default:
      a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
  }
  E(uh);
  G(uh, b);
}
function zh() {
  E(uh);
  E(vh);
  E(wh);
}
function Ah(a) {
  xh(wh.current);
  var b = xh(uh.current);
  var c = lb(b, a.type);
  b !== c && (G(vh, a), G(uh, c));
}
function Bh(a) {
  vh.current === a && (E(uh), E(vh));
}
var L = Uf(0);
function Ch(a) {
  for (var b = a; null !== b; ) {
    if (13 === b.tag) {
      var c = b.memoizedState;
      if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 128)) return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a) break;
    for (; null === b.sibling; ) {
      if (null === b.return || b.return === a) return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Dh = [];
function Eh() {
  for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
  Dh.length = 0;
}
var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
function P() {
  throw Error(p(321));
}
function Mh(a, b) {
  if (null === b) return false;
  for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
  return true;
}
function Nh(a, b, c, d, e, f2) {
  Hh = f2;
  M = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
  a = c(d, e);
  if (Jh) {
    f2 = 0;
    do {
      Jh = false;
      Kh = 0;
      if (25 <= f2) throw Error(p(301));
      f2 += 1;
      O = N = null;
      b.updateQueue = null;
      Fh.current = Qh;
      a = c(d, e);
    } while (Jh);
  }
  Fh.current = Rh;
  b = null !== N && null !== N.next;
  Hh = 0;
  O = N = M = null;
  Ih = false;
  if (b) throw Error(p(300));
  return a;
}
function Sh() {
  var a = 0 !== Kh;
  Kh = 0;
  return a;
}
function Th() {
  var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === O ? M.memoizedState = O = a : O = O.next = a;
  return O;
}
function Uh() {
  if (null === N) {
    var a = M.alternate;
    a = null !== a ? a.memoizedState : null;
  } else a = N.next;
  var b = null === O ? M.memoizedState : O.next;
  if (null !== b) O = b, N = a;
  else {
    if (null === a) throw Error(p(310));
    N = a;
    a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
    null === O ? M.memoizedState = O = a : O = O.next = a;
  }
  return O;
}
function Vh(a, b) {
  return "function" === typeof b ? b(a) : b;
}
function Wh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = N, e = d.baseQueue, f2 = c.pending;
  if (null !== f2) {
    if (null !== e) {
      var g = e.next;
      e.next = f2.next;
      f2.next = g;
    }
    d.baseQueue = e = f2;
    c.pending = null;
  }
  if (null !== e) {
    f2 = e.next;
    d = d.baseState;
    var h = g = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a(d, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k2 ? (h = k2 = q2, g = d) : k2 = k2.next = q2;
        M.lanes |= m2;
        rh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k2 ? g = d : k2.next = h;
    He(d, b.memoizedState) || (dh = true);
    b.memoizedState = d;
    b.baseState = g;
    b.baseQueue = k2;
    c.lastRenderedState = d;
  }
  a = c.interleaved;
  if (null !== a) {
    e = a;
    do
      f2 = e.lane, M.lanes |= f2, rh |= f2, e = e.next;
    while (e !== a);
  } else null === e && (c.lanes = 0);
  return [b.memoizedState, c.dispatch];
}
function Xh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch, e = c.pending, f2 = b.memoizedState;
  if (null !== e) {
    c.pending = null;
    var g = e = e.next;
    do
      f2 = a(f2, g.action), g = g.next;
    while (g !== e);
    He(f2, b.memoizedState) || (dh = true);
    b.memoizedState = f2;
    null === b.baseQueue && (b.baseState = f2);
    c.lastRenderedState = f2;
  }
  return [f2, d];
}
function Yh() {
}
function Zh(a, b) {
  var c = M, d = Uh(), e = b(), f2 = !He(d.memoizedState, e);
  f2 && (d.memoizedState = e, dh = true);
  d = d.queue;
  $h(ai.bind(null, c, d, a), [a]);
  if (d.getSnapshot !== b || f2 || null !== O && O.memoizedState.tag & 1) {
    c.flags |= 2048;
    bi(9, ci.bind(null, c, d, e, b), void 0, null);
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(c, b, e);
  }
  return e;
}
function di(a, b, c) {
  a.flags |= 16384;
  a = { getSnapshot: b, value: c };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
}
function ci(a, b, c, d) {
  b.value = c;
  b.getSnapshot = d;
  ei(b) && fi(a);
}
function ai(a, b, c) {
  return c(function() {
    ei(b) && fi(a);
  });
}
function ei(a) {
  var b = a.getSnapshot;
  a = a.value;
  try {
    var c = b();
    return !He(a, c);
  } catch (d) {
    return true;
  }
}
function fi(a) {
  var b = ih(a, 1);
  null !== b && gi(b, a, 1, -1);
}
function hi(a) {
  var b = Th();
  "function" === typeof a && (a = a());
  b.memoizedState = b.baseState = a;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
  b.queue = a;
  a = a.dispatch = ii.bind(null, M, a);
  return [b.memoizedState, a];
}
function bi(a, b, c, d) {
  a = { tag: a, create: b, destroy: c, deps: d, next: null };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
  return a;
}
function ji() {
  return Uh().memoizedState;
}
function ki(a, b, c, d) {
  var e = Th();
  M.flags |= a;
  e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
}
function li(a, b, c, d) {
  var e = Uh();
  d = void 0 === d ? null : d;
  var f2 = void 0;
  if (null !== N) {
    var g = N.memoizedState;
    f2 = g.destroy;
    if (null !== d && Mh(d, g.deps)) {
      e.memoizedState = bi(b, c, f2, d);
      return;
    }
  }
  M.flags |= a;
  e.memoizedState = bi(1 | b, c, f2, d);
}
function mi(a, b) {
  return ki(8390656, 8, a, b);
}
function $h(a, b) {
  return li(2048, 8, a, b);
}
function ni(a, b) {
  return li(4, 2, a, b);
}
function oi(a, b) {
  return li(4, 4, a, b);
}
function pi(a, b) {
  if ("function" === typeof b) return a = a(), b(a), function() {
    b(null);
  };
  if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
    b.current = null;
  };
}
function qi(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return li(4, 4, pi.bind(null, b, a), c);
}
function ri() {
}
function si(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  c.memoizedState = [a, b];
  return a;
}
function ti(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  a = a();
  c.memoizedState = [a, b];
  return a;
}
function ui(a, b, c) {
  if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
  He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
  return b;
}
function vi(a, b) {
  var c = C;
  C = 0 !== c && 4 > c ? c : 4;
  a(true);
  var d = Gh.transition;
  Gh.transition = {};
  try {
    a(false), b();
  } finally {
    C = c, Gh.transition = d;
  }
}
function wi() {
  return Uh().memoizedState;
}
function xi(a, b, c) {
  var d = yi(a);
  c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, c);
  else if (c = hh(a, b, c, d), null !== c) {
    var e = R();
    gi(c, a, d, e);
    Bi(c, b, d);
  }
}
function ii(a, b, c) {
  var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, e);
  else {
    var f2 = a.alternate;
    if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2)) try {
      var g = b.lastRenderedState, h = f2(g, c);
      e.hasEagerState = true;
      e.eagerState = h;
      if (He(h, g)) {
        var k2 = b.interleaved;
        null === k2 ? (e.next = e, gh(b)) : (e.next = k2.next, k2.next = e);
        b.interleaved = e;
        return;
      }
    } catch (l2) {
    } finally {
    }
    c = hh(a, b, e, d);
    null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
  }
}
function zi(a) {
  var b = a.alternate;
  return a === M || null !== b && b === M;
}
function Ai(a, b) {
  Jh = Ih = true;
  var c = a.pending;
  null === c ? b.next = b : (b.next = c.next, c.next = b);
  a.pending = b;
}
function Bi(a, b, c) {
  if (0 !== (c & 4194240)) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b) {
  Th().memoizedState = [a, void 0 === b ? null : b];
  return a;
}, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return ki(
    4194308,
    4,
    pi.bind(null, b, a),
    c
  );
}, useLayoutEffect: function(a, b) {
  return ki(4194308, 4, a, b);
}, useInsertionEffect: function(a, b) {
  return ki(4, 2, a, b);
}, useMemo: function(a, b) {
  var c = Th();
  b = void 0 === b ? null : b;
  a = a();
  c.memoizedState = [a, b];
  return a;
}, useReducer: function(a, b, c) {
  var d = Th();
  b = void 0 !== c ? c(b) : b;
  d.memoizedState = d.baseState = b;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
  d.queue = a;
  a = a.dispatch = xi.bind(null, M, a);
  return [d.memoizedState, a];
}, useRef: function(a) {
  var b = Th();
  a = { current: a };
  return b.memoizedState = a;
}, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
  return Th().memoizedState = a;
}, useTransition: function() {
  var a = hi(false), b = a[0];
  a = vi.bind(null, a[1]);
  Th().memoizedState = a;
  return [b, a];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a, b, c) {
  var d = M, e = Th();
  if (I) {
    if (void 0 === c) throw Error(p(407));
    c = c();
  } else {
    c = b();
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(d, b, c);
  }
  e.memoizedState = c;
  var f2 = { value: c, getSnapshot: b };
  e.queue = f2;
  mi(ai.bind(
    null,
    d,
    f2,
    a
  ), [a]);
  d.flags |= 2048;
  bi(9, ci.bind(null, d, f2, c, b), void 0, null);
  return c;
}, useId: function() {
  var a = Th(), b = Q.identifierPrefix;
  if (I) {
    var c = sg;
    var d = rg;
    c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
    b = ":" + b + "R" + c;
    c = Kh++;
    0 < c && (b += "H" + c.toString(32));
    b += ":";
  } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
  return a.memoizedState = b;
}, unstable_isNewReconciler: false }, Ph = {
  readContext: eh,
  useCallback: si,
  useContext: eh,
  useEffect: $h,
  useImperativeHandle: qi,
  useInsertionEffect: ni,
  useLayoutEffect: oi,
  useMemo: ti,
  useReducer: Wh,
  useRef: ji,
  useState: function() {
    return Wh(Vh);
  },
  useDebugValue: ri,
  useDeferredValue: function(a) {
    var b = Uh();
    return ui(b, N.memoizedState, a);
  },
  useTransition: function() {
    var a = Wh(Vh)[0], b = Uh().memoizedState;
    return [a, b];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: wi,
  unstable_isNewReconciler: false
}, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
  return Xh(Vh);
}, useDebugValue: ri, useDeferredValue: function(a) {
  var b = Uh();
  return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
}, useTransition: function() {
  var a = Xh(Vh)[0], b = Uh().memoizedState;
  return [a, b];
}, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
function Ci(a, b) {
  if (a && a.defaultProps) {
    b = A({}, b);
    a = a.defaultProps;
    for (var c in a) void 0 === b[c] && (b[c] = a[c]);
    return b;
  }
  return b;
}
function Di(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : A({}, b, c);
  a.memoizedState = c;
  0 === a.lanes && (a.updateQueue.baseState = c);
}
var Ei = { isMounted: function(a) {
  return (a = a._reactInternals) ? Vb(a) === a : false;
}, enqueueSetState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e = yi(a), f2 = mh(d, e);
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e);
  null !== b && (gi(b, a, e, d), oh(b, a, e));
}, enqueueReplaceState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e = yi(a), f2 = mh(d, e);
  f2.tag = 1;
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e);
  null !== b && (gi(b, a, e, d), oh(b, a, e));
}, enqueueForceUpdate: function(a, b) {
  a = a._reactInternals;
  var c = R(), d = yi(a), e = mh(c, d);
  e.tag = 2;
  void 0 !== b && null !== b && (e.callback = b);
  b = nh(a, e, d);
  null !== b && (gi(b, a, d, c), oh(b, a, d));
} };
function Fi(a, b, c, d, e, f2, g) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f2) : true;
}
function Gi(a, b, c) {
  var d = false, e = Vf;
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
  b = new b(c, f2);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = Ei;
  a.stateNode = b;
  b._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f2);
  return b;
}
function Hi(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
}
function Ii(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = {};
  kh(a);
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? e.context = eh(f2) : (f2 = Zf(b) ? Xf : H.current, e.context = Yf(a, f2));
  e.state = a.memoizedState;
  f2 = b.getDerivedStateFromProps;
  "function" === typeof f2 && (Di(a, b, f2, c), e.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
  "function" === typeof e.componentDidMount && (a.flags |= 4194308);
}
function Ji(a, b) {
  try {
    var c = "", d = b;
    do
      c += Pa(d), d = d.return;
    while (d);
    var e = c;
  } catch (f2) {
    e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a, source: b, stack: e, digest: null };
}
function Ki(a, b, c) {
  return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
}
function Li(a, b) {
  try {
    console.error(b.value);
  } catch (c) {
    setTimeout(function() {
      throw c;
    });
  }
}
var Mi = "function" === typeof WeakMap ? WeakMap : Map;
function Ni(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  c.payload = { element: null };
  var d = b.value;
  c.callback = function() {
    Oi || (Oi = true, Pi = d);
    Li(a, b);
  };
  return c;
}
function Qi(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e = b.value;
    c.payload = function() {
      return d(e);
    };
    c.callback = function() {
      Li(a, b);
    };
  }
  var f2 = a.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c.callback = function() {
    Li(a, b);
    "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
    var c2 = b.stack;
    this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
  });
  return c;
}
function Si(a, b, c) {
  var d = a.pingCache;
  if (null === d) {
    d = a.pingCache = new Mi();
    var e = /* @__PURE__ */ new Set();
    d.set(b, e);
  } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
  e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
}
function Ui(a) {
  do {
    var b;
    if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
    if (b) return a;
    a = a.return;
  } while (null !== a);
  return null;
}
function Vi(a, b, c, d, e) {
  if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
  a.flags |= 65536;
  a.lanes = e;
  return a;
}
var Wi = ua.ReactCurrentOwner, dh = false;
function Xi(a, b, c, d) {
  b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
}
function Yi(a, b, c, d, e) {
  c = c.render;
  var f2 = b.ref;
  ch(b, e);
  d = Nh(a, b, c, d, f2, e);
  c = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
  I && c && vg(b);
  b.flags |= 1;
  Xi(a, b, d, e);
  return b.child;
}
function $i(a, b, c, d, e) {
  if (null === a) {
    var f2 = c.type;
    if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f2, bj(a, b, f2, d, e);
    a = Rg(c.type, null, d, b, b.mode, e);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  f2 = a.child;
  if (0 === (a.lanes & e)) {
    var g = f2.memoizedProps;
    c = c.compare;
    c = null !== c ? c : Ie;
    if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
  }
  b.flags |= 1;
  a = Pg(f2, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}
function bj(a, b, c, d, e) {
  if (null !== a) {
    var f2 = a.memoizedProps;
    if (Ie(f2, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f2, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
    else return b.lanes = a.lanes, Zi(a, b, e);
  }
  return cj(a, b, c, d, e);
}
function dj(a, b, c) {
  var d = b.pendingProps, e = d.children, f2 = null !== a ? a.memoizedState : null;
  if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
  else {
    if (0 === (c & 1073741824)) return a = null !== f2 ? f2.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
    b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
    d = null !== f2 ? f2.baseLanes : c;
    G(ej, fj);
    fj |= d;
  }
  else null !== f2 ? (d = f2.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
  Xi(a, b, e, c);
  return b.child;
}
function gj(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
}
function cj(a, b, c, d, e) {
  var f2 = Zf(c) ? Xf : H.current;
  f2 = Yf(b, f2);
  ch(b, e);
  c = Nh(a, b, c, d, f2, e);
  d = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
  I && d && vg(b);
  b.flags |= 1;
  Xi(a, b, c, e);
  return b.child;
}
function hj(a, b, c, d, e) {
  if (Zf(c)) {
    var f2 = true;
    cg(b);
  } else f2 = false;
  ch(b, e);
  if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
  else if (null === a) {
    var g = b.stateNode, h = b.memoizedProps;
    g.props = h;
    var k2 = g.context, l2 = c.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c) ? Xf : H.current, l2 = Yf(b, l2));
    var m2 = c.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k2 !== l2) && Hi(b, g, d, l2);
    jh = false;
    var r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    k2 = b.memoizedState;
    h !== d || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c, m2, d), k2 = b.memoizedState), (h = jh || Fi(b, c, h, d, r2, k2, l2)) ? (q2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k2), g.props = d, g.state = k2, g.context = l2, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
  } else {
    g = b.stateNode;
    lh(a, b);
    h = b.memoizedProps;
    l2 = b.type === b.elementType ? h : Ci(b.type, h);
    g.props = l2;
    q2 = b.pendingProps;
    r2 = g.context;
    k2 = c.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c) ? Xf : H.current, k2 = Yf(b, k2));
    var y2 = c.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q2 || r2 !== k2) && Hi(b, g, d, k2);
    jh = false;
    r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    var n2 = b.memoizedState;
    h !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c, y2, d), n2 = b.memoizedState), (l2 = jh || Fi(b, c, l2, d, r2, n2, k2) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n2, k2), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n2, k2)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g.props = d, g.state = n2, g.context = k2, d = l2) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), d = false);
  }
  return jj(a, b, c, d, f2, e);
}
function jj(a, b, c, d, e, f2) {
  gj(a, b);
  var g = 0 !== (b.flags & 128);
  if (!d && !g) return e && dg(b, c, false), Zi(a, b, f2);
  d = b.stateNode;
  Wi.current = b;
  var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.flags |= 1;
  null !== a && g ? (b.child = Ug(b, a.child, null, f2), b.child = Ug(b, null, h, f2)) : Xi(a, b, h, f2);
  b.memoizedState = d.state;
  e && dg(b, c, true);
  return b.child;
}
function kj(a) {
  var b = a.stateNode;
  b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
  yh(a, b.containerInfo);
}
function lj(a, b, c, d, e) {
  Ig();
  Jg(e);
  b.flags |= 256;
  Xi(a, b, c, d);
  return b.child;
}
var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
function nj(a) {
  return { baseLanes: a, cachePool: null, transitions: null };
}
function oj(a, b, c) {
  var d = b.pendingProps, e = L.current, f2 = false, g = 0 !== (b.flags & 128), h;
  (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
  if (h) f2 = true, b.flags &= -129;
  else if (null === a || null !== a.memoizedState) e |= 1;
  G(L, e & 1);
  if (null === a) {
    Eg(b);
    a = b.memoizedState;
    if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
    g = d.children;
    a = d.fallback;
    return f2 ? (d = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = pj(g, d, 0, null), a = Tg(a, d, c, null), f2.return = b, a.return = b, f2.sibling = a, b.child = f2, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
  }
  e = a.memoizedState;
  if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
  if (f2) {
    f2 = d.fallback;
    g = b.mode;
    e = a.child;
    h = e.sibling;
    var k2 = { mode: "hidden", children: d.children };
    0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k2, b.deletions = null) : (d = Pg(e, k2), d.subtreeFlags = e.subtreeFlags & 14680064);
    null !== h ? f2 = Pg(h, f2) : (f2 = Tg(f2, g, c, null), f2.flags |= 2);
    f2.return = b;
    d.return = b;
    d.sibling = f2;
    b.child = d;
    d = f2;
    f2 = b.child;
    g = a.child.memoizedState;
    g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
    f2.memoizedState = g;
    f2.childLanes = a.childLanes & ~c;
    b.memoizedState = mj;
    return d;
  }
  f2 = a.child;
  a = f2.sibling;
  d = Pg(f2, { mode: "visible", children: d.children });
  0 === (b.mode & 1) && (d.lanes = c);
  d.return = b;
  d.sibling = null;
  null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
  b.child = d;
  b.memoizedState = null;
  return d;
}
function qj(a, b) {
  b = pj({ mode: "visible", children: b }, a.mode, 0, null);
  b.return = a;
  return a.child = b;
}
function sj(a, b, c, d) {
  null !== d && Jg(d);
  Ug(b, a.child, null, c);
  a = qj(b, b.pendingProps.children);
  a.flags |= 2;
  b.memoizedState = null;
  return a;
}
function rj(a, b, c, d, e, f2, g) {
  if (c) {
    if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
    if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
    f2 = d.fallback;
    e = b.mode;
    d = pj({ mode: "visible", children: d.children }, e, 0, null);
    f2 = Tg(f2, e, g, null);
    f2.flags |= 2;
    d.return = b;
    f2.return = b;
    d.sibling = f2;
    b.child = d;
    0 !== (b.mode & 1) && Ug(b, a.child, null, g);
    b.child.memoizedState = nj(g);
    b.memoizedState = mj;
    return f2;
  }
  if (0 === (b.mode & 1)) return sj(a, b, g, null);
  if ("$!" === e.data) {
    d = e.nextSibling && e.nextSibling.dataset;
    if (d) var h = d.dgst;
    d = h;
    f2 = Error(p(419));
    d = Ki(f2, d, void 0);
    return sj(a, b, g, d);
  }
  h = 0 !== (g & a.childLanes);
  if (dh || h) {
    d = Q;
    if (null !== d) {
      switch (g & -g) {
        case 4:
          e = 2;
          break;
        case 16:
          e = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e = 32;
          break;
        case 536870912:
          e = 268435456;
          break;
        default:
          e = 0;
      }
      e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
      0 !== e && e !== f2.retryLane && (f2.retryLane = e, ih(a, e), gi(d, a, e, -1));
    }
    tj();
    d = Ki(Error(p(421)));
    return sj(a, b, g, d);
  }
  if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
  a = f2.treeContext;
  yg = Lf(e.nextSibling);
  xg = b;
  I = true;
  zg = null;
  null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
  b = qj(b, d.children);
  b.flags |= 4096;
  return b;
}
function vj(a, b, c) {
  a.lanes |= b;
  var d = a.alternate;
  null !== d && (d.lanes |= b);
  bh(a.return, b, c);
}
function wj(a, b, c, d, e) {
  var f2 = a.memoizedState;
  null === f2 ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c, f2.tailMode = e);
}
function xj(a, b, c) {
  var d = b.pendingProps, e = d.revealOrder, f2 = d.tail;
  Xi(a, b, d.children, c);
  d = L.current;
  if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
  else {
    if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
      if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
      else if (19 === a.tag) vj(a, c, b);
      else if (null !== a.child) {
        a.child.return = a;
        a = a.child;
        continue;
      }
      if (a === b) break a;
      for (; null === a.sibling; ) {
        if (null === a.return || a.return === b) break a;
        a = a.return;
      }
      a.sibling.return = a.return;
      a = a.sibling;
    }
    d &= 1;
  }
  G(L, d);
  if (0 === (b.mode & 1)) b.memoizedState = null;
  else switch (e) {
    case "forwards":
      c = b.child;
      for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
      c = e;
      null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
      wj(b, false, e, c, f2);
      break;
    case "backwards":
      c = null;
      e = b.child;
      for (b.child = null; null !== e; ) {
        a = e.alternate;
        if (null !== a && null === Ch(a)) {
          b.child = e;
          break;
        }
        a = e.sibling;
        e.sibling = c;
        c = e;
        e = a;
      }
      wj(b, true, c, null, f2);
      break;
    case "together":
      wj(b, false, null, null, void 0);
      break;
    default:
      b.memoizedState = null;
  }
  return b.child;
}
function ij(a, b) {
  0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
}
function Zi(a, b, c) {
  null !== a && (b.dependencies = a.dependencies);
  rh |= b.lanes;
  if (0 === (c & b.childLanes)) return null;
  if (null !== a && b.child !== a.child) throw Error(p(153));
  if (null !== b.child) {
    a = b.child;
    c = Pg(a, a.pendingProps);
    b.child = c;
    for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
    c.sibling = null;
  }
  return b.child;
}
function yj(a, b, c) {
  switch (b.tag) {
    case 3:
      kj(b);
      Ig();
      break;
    case 5:
      Ah(b);
      break;
    case 1:
      Zf(b.type) && cg(b);
      break;
    case 4:
      yh(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d = b.type._context, e = b.memoizedProps.value;
      G(Wg, d._currentValue);
      d._currentValue = e;
      break;
    case 13:
      d = b.memoizedState;
      if (null !== d) {
        if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
        if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
        G(L, L.current & 1);
        a = Zi(a, b, c);
        return null !== a ? a.sibling : null;
      }
      G(L, L.current & 1);
      break;
    case 19:
      d = 0 !== (c & b.childLanes);
      if (0 !== (a.flags & 128)) {
        if (d) return xj(a, b, c);
        b.flags |= 128;
      }
      e = b.memoizedState;
      null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
      G(L, L.current);
      if (d) break;
      else return null;
    case 22:
    case 23:
      return b.lanes = 0, dj(a, b, c);
  }
  return Zi(a, b, c);
}
var zj, Aj, Bj, Cj;
zj = function(a, b) {
  for (var c = b.child; null !== c; ) {
    if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
    else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b) break;
    for (; null === c.sibling; ) {
      if (null === c.return || c.return === b) return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
};
Aj = function() {
};
Bj = function(a, b, c, d) {
  var e = a.memoizedProps;
  if (e !== d) {
    a = b.stateNode;
    xh(uh.current);
    var f2 = null;
    switch (c) {
      case "input":
        e = Ya(a, e);
        d = Ya(a, d);
        f2 = [];
        break;
      case "select":
        e = A({}, e, { value: void 0 });
        d = A({}, d, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e = gb(a, e);
        d = gb(a, d);
        f2 = [];
        break;
      default:
        "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
    }
    ub(c, d);
    var g;
    c = null;
    for (l2 in e) if (!d.hasOwnProperty(l2) && e.hasOwnProperty(l2) && null != e[l2]) if ("style" === l2) {
      var h = e[l2];
      for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
    } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d) {
      var k2 = d[l2];
      h = null != e ? e[l2] : void 0;
      if (d.hasOwnProperty(l2) && k2 !== h && (null != k2 || null != h)) if ("style" === l2) if (h) {
        for (g in h) !h.hasOwnProperty(g) || k2 && k2.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
        for (g in k2) k2.hasOwnProperty(g) && h[g] !== k2[g] && (c || (c = {}), c[g] = k2[g]);
      } else c || (f2 || (f2 = []), f2.push(
        l2,
        c
      )), c = k2;
      else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h = h ? h.__html : void 0, null != k2 && h !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D("scroll", a), f2 || h === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c && (f2 = f2 || []).push("style", c);
    var l2 = f2;
    if (b.updateQueue = l2) b.flags |= 4;
  }
};
Cj = function(a, b, c, d) {
  c !== d && (b.flags |= 4);
};
function Dj(a, b) {
  if (!I) switch (a.tailMode) {
    case "hidden":
      b = a.tail;
      for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
      null === c ? a.tail = null : c.sibling = null;
      break;
    case "collapsed":
      c = a.tail;
      for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
      null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
  }
}
function S(a) {
  var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
  if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
  else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
  a.subtreeFlags |= d;
  a.childLanes = c;
  return b;
}
function Ej(a, b, c) {
  var d = b.pendingProps;
  wg(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S(b), null;
    case 1:
      return Zf(b.type) && $f(), S(b), null;
    case 3:
      d = b.stateNode;
      zh();
      E(Wf);
      E(H);
      Eh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
      Aj(a, b);
      S(b);
      return null;
    case 5:
      Bh(b);
      var e = xh(wh.current);
      c = b.type;
      if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      else {
        if (!d) {
          if (null === b.stateNode) throw Error(p(166));
          S(b);
          return null;
        }
        a = xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.type;
          var f2 = b.memoizedProps;
          d[Of] = b;
          d[Pf] = f2;
          a = 0 !== (b.mode & 1);
          switch (c) {
            case "dialog":
              D("cancel", d);
              D("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", d);
              break;
            case "video":
            case "audio":
              for (e = 0; e < lf.length; e++) D(lf[e], d);
              break;
            case "source":
              D("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D(
                "error",
                d
              );
              D("load", d);
              break;
            case "details":
              D("toggle", d);
              break;
            case "input":
              Za(d, f2);
              D("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f2.multiple };
              D("invalid", d);
              break;
            case "textarea":
              hb(d, f2), D("invalid", d);
          }
          ub(c, f2);
          e = null;
          for (var g in f2) if (f2.hasOwnProperty(g)) {
            var h = f2[g];
            "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f2.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f2.suppressHydrationWarning && Af(
              d.textContent,
              h,
              a
            ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
          }
          switch (c) {
            case "input":
              Va(d);
              db(d, f2, true);
              break;
            case "textarea":
              Va(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d.onclick = Bf);
          }
          d = e;
          b.updateQueue = d;
          null !== d && (b.flags |= 4);
        } else {
          g = 9 === e.nodeType ? e : e.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
          "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
          a[Of] = b;
          a[Pf] = d;
          zj(a, b, false, false);
          b.stateNode = a;
          a: {
            g = vb(c, d);
            switch (c) {
              case "dialog":
                D("cancel", a);
                D("close", a);
                e = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", a);
                e = d;
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++) D(lf[e], a);
                e = d;
                break;
              case "source":
                D("error", a);
                e = d;
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  a
                );
                D("load", a);
                e = d;
                break;
              case "details":
                D("toggle", a);
                e = d;
                break;
              case "input":
                Za(a, d);
                e = Ya(a, d);
                D("invalid", a);
                break;
              case "option":
                e = d;
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!d.multiple };
                e = A({}, d, { value: void 0 });
                D("invalid", a);
                break;
              case "textarea":
                hb(a, d);
                e = gb(a, d);
                D("invalid", a);
                break;
              default:
                e = d;
            }
            ub(c, e);
            h = e;
            for (f2 in h) if (h.hasOwnProperty(f2)) {
              var k2 = h[f2];
              "style" === f2 ? sb(a, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c || "" !== k2) && ob(a, k2) : "number" === typeof k2 && ob(a, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D("scroll", a) : null != k2 && ta(a, f2, k2, g));
            }
            switch (c) {
              case "input":
                Va(a);
                db(a, d, false);
                break;
              case "textarea":
                Va(a);
                jb(a);
                break;
              case "option":
                null != d.value && a.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a.multiple = !!d.multiple;
                f2 = d.value;
                null != f2 ? fb(a, !!d.multiple, f2, false) : null != d.defaultValue && fb(
                  a,
                  !!d.multiple,
                  d.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e.onClick && (a.onclick = Bf);
            }
            switch (c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = true;
                break a;
              default:
                d = false;
            }
          }
          d && (b.flags |= 4);
        }
        null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      }
      S(b);
      return null;
    case 6:
      if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
      else {
        if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
        c = xh(wh.current);
        xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.memoizedProps;
          d[Of] = b;
          if (f2 = d.nodeValue !== c) {
            if (a = xg, null !== a) switch (a.tag) {
              case 3:
                Af(d.nodeValue, c, 0 !== (a.mode & 1));
                break;
              case 5:
                true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
            }
          }
          f2 && (b.flags |= 4);
        } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
      }
      S(b);
      return null;
    case 13:
      E(L);
      d = b.memoizedState;
      if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
        if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f2 = false;
        else if (f2 = Gg(b), null !== d && null !== d.dehydrated) {
          if (null === a) {
            if (!f2) throw Error(p(318));
            f2 = b.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2) throw Error(p(317));
            f2[Of] = b;
          } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
          S(b);
          f2 = false;
        } else null !== zg && (Fj(zg), zg = null), f2 = true;
        if (!f2) return b.flags & 65536 ? b : null;
      }
      if (0 !== (b.flags & 128)) return b.lanes = c, b;
      d = null !== d;
      d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
      null !== b.updateQueue && (b.flags |= 4);
      S(b);
      return null;
    case 4:
      return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
    case 10:
      return ah(b.type._context), S(b), null;
    case 17:
      return Zf(b.type) && $f(), S(b), null;
    case 19:
      E(L);
      f2 = b.memoizedState;
      if (null === f2) return S(b), null;
      d = 0 !== (b.flags & 128);
      g = f2.rendering;
      if (null === g) if (d) Dj(f2, false);
      else {
        if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
          g = Ch(a);
          if (null !== g) {
            b.flags |= 128;
            Dj(f2, false);
            d = g.updateQueue;
            null !== d && (b.updateQueue = d, b.flags |= 4);
            b.subtreeFlags = 0;
            d = c;
            for (c = b.child; null !== c; ) f2 = c, a = d, f2.flags &= 14680066, g = f2.alternate, null === g ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a = g.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
            G(L, L.current & 1 | 2);
            return b.child;
          }
          a = a.sibling;
        }
        null !== f2.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
      }
      else {
        if (!d) if (a = Ch(g), null !== a) {
          if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g.alternate && !I) return S(b), null;
        } else 2 * B() - f2.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
        f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f2.last, null !== c ? c.sibling = g : b.child = g, f2.last = g);
      }
      if (null !== f2.tail) return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
      S(b);
      return null;
    case 22:
    case 23:
      return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p(156, b.tag));
}
function Ij(a, b) {
  wg(b);
  switch (b.tag) {
    case 1:
      return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 3:
      return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
    case 5:
      return Bh(b), null;
    case 13:
      E(L);
      a = b.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        if (null === b.alternate) throw Error(p(340));
        Ig();
      }
      a = b.flags;
      return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 19:
      return E(L), null;
    case 4:
      return zh(), null;
    case 10:
      return ah(b.type._context), null;
    case 22:
    case 23:
      return Hj(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
function Lj(a, b) {
  var c = a.ref;
  if (null !== c) if ("function" === typeof c) try {
    c(null);
  } catch (d) {
    W(a, b, d);
  }
  else c.current = null;
}
function Mj(a, b, c) {
  try {
    c();
  } catch (d) {
    W(a, b, d);
  }
}
var Nj = false;
function Oj(a, b) {
  Cf = dd;
  a = Me();
  if (Ne(a)) {
    if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
    else a: {
      c = (c = a.ownerDocument) && c.defaultView || window;
      var d = c.getSelection && c.getSelection();
      if (d && 0 !== d.rangeCount) {
        c = d.anchorNode;
        var e = d.anchorOffset, f2 = d.focusNode;
        d = d.focusOffset;
        try {
          c.nodeType, f2.nodeType;
        } catch (F2) {
          c = null;
          break a;
        }
        var g = 0, h = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a, r2 = null;
        b: for (; ; ) {
          for (var y2; ; ) {
            q2 !== c || 0 !== e && 3 !== q2.nodeType || (h = g + e);
            q2 !== f2 || 0 !== d && 3 !== q2.nodeType || (k2 = g + d);
            3 === q2.nodeType && (g += q2.nodeValue.length);
            if (null === (y2 = q2.firstChild)) break;
            r2 = q2;
            q2 = y2;
          }
          for (; ; ) {
            if (q2 === a) break b;
            r2 === c && ++l2 === e && (h = g);
            r2 === f2 && ++m2 === d && (k2 = g);
            if (null !== (y2 = q2.nextSibling)) break;
            q2 = r2;
            r2 = q2.parentNode;
          }
          q2 = y2;
        }
        c = -1 === h || -1 === k2 ? null : { start: h, end: k2 };
      } else c = null;
    }
    c = c || { start: 0, end: 0 };
  } else c = null;
  Df = { focusedElem: a, selectionRange: c };
  dd = false;
  for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
  else for (; null !== V; ) {
    b = V;
    try {
      var n2 = b.alternate;
      if (0 !== (b.flags & 1024)) switch (b.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (null !== n2) {
            var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
            x2.__reactInternalSnapshotBeforeUpdate = w2;
          }
          break;
        case 3:
          var u2 = b.stateNode.containerInfo;
          1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(p(163));
      }
    } catch (F2) {
      W(b, b.return, F2);
    }
    a = b.sibling;
    if (null !== a) {
      a.return = b.return;
      V = a;
      break;
    }
    V = b.return;
  }
  n2 = Nj;
  Nj = false;
  return n2;
}
function Pj(a, b, c) {
  var d = b.updateQueue;
  d = null !== d ? d.lastEffect : null;
  if (null !== d) {
    var e = d = d.next;
    do {
      if ((e.tag & a) === a) {
        var f2 = e.destroy;
        e.destroy = void 0;
        void 0 !== f2 && Mj(b, c, f2);
      }
      e = e.next;
    } while (e !== d);
  }
}
function Qj(a, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;
  if (null !== b) {
    var c = b = b.next;
    do {
      if ((c.tag & a) === a) {
        var d = c.create;
        c.destroy = d();
      }
      c = c.next;
    } while (c !== b);
  }
}
function Rj(a) {
  var b = a.ref;
  if (null !== b) {
    var c = a.stateNode;
    switch (a.tag) {
      case 5:
        a = c;
        break;
      default:
        a = c;
    }
    "function" === typeof b ? b(a) : b.current = a;
  }
}
function Sj(a) {
  var b = a.alternate;
  null !== b && (a.alternate = null, Sj(b));
  a.child = null;
  a.deletions = null;
  a.sibling = null;
  5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
  a.stateNode = null;
  a.return = null;
  a.dependencies = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.stateNode = null;
  a.updateQueue = null;
}
function Tj(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function Uj(a) {
  a: for (; ; ) {
    for (; null === a.sibling; ) {
      if (null === a.return || Tj(a.return)) return null;
      a = a.return;
    }
    a.sibling.return = a.return;
    for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
      if (a.flags & 2) continue a;
      if (null === a.child || 4 === a.tag) continue a;
      else a.child.return = a, a = a.child;
    }
    if (!(a.flags & 2)) return a.stateNode;
  }
}
function Vj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
  else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
}
function Wj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
  else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
}
var X = null, Xj = false;
function Yj(a, b, c) {
  for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
}
function Zj(a, b, c) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
    lc.onCommitFiberUnmount(kc, c);
  } catch (h) {
  }
  switch (c.tag) {
    case 5:
      U || Lj(c, b);
    case 6:
      var d = X, e = Xj;
      X = null;
      Yj(a, b, c);
      X = d;
      Xj = e;
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
      break;
    case 18:
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
      break;
    case 4:
      d = X;
      e = Xj;
      X = c.stateNode.containerInfo;
      Xj = true;
      Yj(a, b, c);
      X = d;
      Xj = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
        e = d = d.next;
        do {
          var f2 = e, g = f2.destroy;
          f2 = f2.tag;
          void 0 !== g && (0 !== (f2 & 2) ? Mj(c, b, g) : 0 !== (f2 & 4) && Mj(c, b, g));
          e = e.next;
        } while (e !== d);
      }
      Yj(a, b, c);
      break;
    case 1:
      if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
        d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
      } catch (h) {
        W(c, b, h);
      }
      Yj(a, b, c);
      break;
    case 21:
      Yj(a, b, c);
      break;
    case 22:
      c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
      break;
    default:
      Yj(a, b, c);
  }
}
function ak(a) {
  var b = a.updateQueue;
  if (null !== b) {
    a.updateQueue = null;
    var c = a.stateNode;
    null === c && (c = a.stateNode = new Kj());
    b.forEach(function(b2) {
      var d = bk.bind(null, a, b2);
      c.has(b2) || (c.add(b2), b2.then(d, d));
    });
  }
}
function ck(a, b) {
  var c = b.deletions;
  if (null !== c) for (var d = 0; d < c.length; d++) {
    var e = c[d];
    try {
      var f2 = a, g = b, h = g;
      a: for (; null !== h; ) {
        switch (h.tag) {
          case 5:
            X = h.stateNode;
            Xj = false;
            break a;
          case 3:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
          case 4:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
        }
        h = h.return;
      }
      if (null === X) throw Error(p(160));
      Zj(f2, g, e);
      X = null;
      Xj = false;
      var k2 = e.alternate;
      null !== k2 && (k2.return = null);
      e.return = null;
    } catch (l2) {
      W(e, b, l2);
    }
  }
  if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
}
function dk(a, b) {
  var c = a.alternate, d = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      ck(b, a);
      ek(a);
      if (d & 4) {
        try {
          Pj(3, a, a.return), Qj(3, a);
        } catch (t2) {
          W(a, a.return, t2);
        }
        try {
          Pj(5, a, a.return);
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 1:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      break;
    case 5:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      if (a.flags & 32) {
        var e = a.stateNode;
        try {
          ob(e, "");
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      if (d & 4 && (e = a.stateNode, null != e)) {
        var f2 = a.memoizedProps, g = null !== c ? c.memoizedProps : f2, h = a.type, k2 = a.updateQueue;
        a.updateQueue = null;
        if (null !== k2) try {
          "input" === h && "radio" === f2.type && null != f2.name && ab(e, f2);
          vb(h, g);
          var l2 = vb(h, f2);
          for (g = 0; g < k2.length; g += 2) {
            var m2 = k2[g], q2 = k2[g + 1];
            "style" === m2 ? sb(e, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e, q2) : "children" === m2 ? ob(e, q2) : ta(e, m2, q2, l2);
          }
          switch (h) {
            case "input":
              bb(e, f2);
              break;
            case "textarea":
              ib(e, f2);
              break;
            case "select":
              var r2 = e._wrapperState.wasMultiple;
              e._wrapperState.wasMultiple = !!f2.multiple;
              var y2 = f2.value;
              null != y2 ? fb(e, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                e,
                !!f2.multiple,
                f2.defaultValue,
                true
              ) : fb(e, !!f2.multiple, f2.multiple ? [] : "", false));
          }
          e[Pf] = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 6:
      ck(b, a);
      ek(a);
      if (d & 4) {
        if (null === a.stateNode) throw Error(p(162));
        e = a.stateNode;
        f2 = a.memoizedProps;
        try {
          e.nodeValue = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 3:
      ck(b, a);
      ek(a);
      if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
        bd(b.containerInfo);
      } catch (t2) {
        W(a, a.return, t2);
      }
      break;
    case 4:
      ck(b, a);
      ek(a);
      break;
    case 13:
      ck(b, a);
      ek(a);
      e = a.child;
      e.flags & 8192 && (f2 = null !== e.memoizedState, e.stateNode.isHidden = f2, !f2 || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
      d & 4 && ak(a);
      break;
    case 22:
      m2 = null !== c && null !== c.memoizedState;
      a.mode & 1 ? (U = (l2 = U) || m2, ck(b, a), U = l2) : ck(b, a);
      ek(a);
      if (d & 8192) {
        l2 = null !== a.memoizedState;
        if ((a.stateNode.isHidden = l2) && !m2 && 0 !== (a.mode & 1)) for (V = a, m2 = a.child; null !== m2; ) {
          for (q2 = V = m2; null !== V; ) {
            r2 = V;
            y2 = r2.child;
            switch (r2.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Pj(4, r2, r2.return);
                break;
              case 1:
                Lj(r2, r2.return);
                var n2 = r2.stateNode;
                if ("function" === typeof n2.componentWillUnmount) {
                  d = r2;
                  c = r2.return;
                  try {
                    b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                  } catch (t2) {
                    W(d, c, t2);
                  }
                }
                break;
              case 5:
                Lj(r2, r2.return);
                break;
              case 22:
                if (null !== r2.memoizedState) {
                  gk(q2);
                  continue;
                }
            }
            null !== y2 ? (y2.return = r2, V = y2) : gk(q2);
          }
          m2 = m2.sibling;
        }
        a: for (m2 = null, q2 = a; ; ) {
          if (5 === q2.tag) {
            if (null === m2) {
              m2 = q2;
              try {
                e = q2.stateNode, l2 ? (f2 = e.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q2.stateNode, k2 = q2.memoizedProps.style, g = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h.style.display = rb("display", g));
              } catch (t2) {
                W(a, a.return, t2);
              }
            }
          } else if (6 === q2.tag) {
            if (null === m2) try {
              q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
            } catch (t2) {
              W(a, a.return, t2);
            }
          } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
            q2.child.return = q2;
            q2 = q2.child;
            continue;
          }
          if (q2 === a) break a;
          for (; null === q2.sibling; ) {
            if (null === q2.return || q2.return === a) break a;
            m2 === q2 && (m2 = null);
            q2 = q2.return;
          }
          m2 === q2 && (m2 = null);
          q2.sibling.return = q2.return;
          q2 = q2.sibling;
        }
      }
      break;
    case 19:
      ck(b, a);
      ek(a);
      d & 4 && ak(a);
      break;
    case 21:
      break;
    default:
      ck(
        b,
        a
      ), ek(a);
  }
}
function ek(a) {
  var b = a.flags;
  if (b & 2) {
    try {
      a: {
        for (var c = a.return; null !== c; ) {
          if (Tj(c)) {
            var d = c;
            break a;
          }
          c = c.return;
        }
        throw Error(p(160));
      }
      switch (d.tag) {
        case 5:
          var e = d.stateNode;
          d.flags & 32 && (ob(e, ""), d.flags &= -33);
          var f2 = Uj(a);
          Wj(a, f2, e);
          break;
        case 3:
        case 4:
          var g = d.stateNode.containerInfo, h = Uj(a);
          Vj(a, h, g);
          break;
        default:
          throw Error(p(161));
      }
    } catch (k2) {
      W(a, a.return, k2);
    }
    a.flags &= -3;
  }
  b & 4096 && (a.flags &= -4097);
}
function hk(a, b, c) {
  V = a;
  ik(a);
}
function ik(a, b, c) {
  for (var d = 0 !== (a.mode & 1); null !== V; ) {
    var e = V, f2 = e.child;
    if (22 === e.tag && d) {
      var g = null !== e.memoizedState || Jj;
      if (!g) {
        var h = e.alternate, k2 = null !== h && null !== h.memoizedState || U;
        h = Jj;
        var l2 = U;
        Jj = g;
        if ((U = k2) && !l2) for (V = e; null !== V; ) g = V, k2 = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k2 ? (k2.return = g, V = k2) : jk(e);
        for (; null !== f2; ) V = f2, ik(f2), f2 = f2.sibling;
        V = e;
        Jj = h;
        U = l2;
      }
      kk(a);
    } else 0 !== (e.subtreeFlags & 8772) && null !== f2 ? (f2.return = e, V = f2) : kk(a);
  }
}
function kk(a) {
  for (; null !== V; ) {
    var b = V;
    if (0 !== (b.flags & 8772)) {
      var c = b.alternate;
      try {
        if (0 !== (b.flags & 8772)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            U || Qj(5, b);
            break;
          case 1:
            var d = b.stateNode;
            if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
            else {
              var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
              d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
            }
            var f2 = b.updateQueue;
            null !== f2 && sh(b, f2, d);
            break;
          case 3:
            var g = b.updateQueue;
            if (null !== g) {
              c = null;
              if (null !== b.child) switch (b.child.tag) {
                case 5:
                  c = b.child.stateNode;
                  break;
                case 1:
                  c = b.child.stateNode;
              }
              sh(b, g, c);
            }
            break;
          case 5:
            var h = b.stateNode;
            if (null === c && b.flags & 4) {
              c = h;
              var k2 = b.memoizedProps;
              switch (b.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  k2.autoFocus && c.focus();
                  break;
                case "img":
                  k2.src && (c.src = k2.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (null === b.memoizedState) {
              var l2 = b.alternate;
              if (null !== l2) {
                var m2 = l2.memoizedState;
                if (null !== m2) {
                  var q2 = m2.dehydrated;
                  null !== q2 && bd(q2);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(p(163));
        }
        U || b.flags & 512 && Rj(b);
      } catch (r2) {
        W(b, b.return, r2);
      }
    }
    if (b === a) {
      V = null;
      break;
    }
    c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function gk(a) {
  for (; null !== V; ) {
    var b = V;
    if (b === a) {
      V = null;
      break;
    }
    var c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function jk(a) {
  for (; null !== V; ) {
    var b = V;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c = b.return;
          try {
            Qj(4, b);
          } catch (k2) {
            W(b, c, k2);
          }
          break;
        case 1:
          var d = b.stateNode;
          if ("function" === typeof d.componentDidMount) {
            var e = b.return;
            try {
              d.componentDidMount();
            } catch (k2) {
              W(b, e, k2);
            }
          }
          var f2 = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, f2, k2);
          }
          break;
        case 5:
          var g = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, g, k2);
          }
      }
    } catch (k2) {
      W(b, b.return, k2);
    }
    if (b === a) {
      V = null;
      break;
    }
    var h = b.sibling;
    if (null !== h) {
      h.return = b.return;
      V = h;
      break;
    }
    V = b.return;
  }
}
var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
function R() {
  return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
}
function yi(a) {
  if (0 === (a.mode & 1)) return 1;
  if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
  if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
  a = C;
  if (0 !== a) return a;
  a = window.event;
  a = void 0 === a ? 16 : jd(a.type);
  return a;
}
function gi(a, b, c, d) {
  if (50 < yk) throw yk = 0, zk = null, Error(p(185));
  Ac(a, c, d);
  if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
}
function Dk(a, b) {
  var c = a.callbackNode;
  wc(a, b);
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
  else if (b = d & -d, a.callbackPriority !== b) {
    null != c && bc(c);
    if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
      0 === (K & 6) && jg();
    }), c = null;
    else {
      switch (Dc(d)) {
        case 1:
          c = fc;
          break;
        case 4:
          c = gc;
          break;
        case 16:
          c = hc;
          break;
        case 536870912:
          c = jc;
          break;
        default:
          c = hc;
      }
      c = Fk(c, Gk.bind(null, a));
    }
    a.callbackPriority = b;
    a.callbackNode = c;
  }
}
function Gk(a, b) {
  Ak = -1;
  Bk = 0;
  if (0 !== (K & 6)) throw Error(p(327));
  var c = a.callbackNode;
  if (Hk() && a.callbackNode !== c) return null;
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) return null;
  if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
  else {
    b = d;
    var e = K;
    K |= 2;
    var f2 = Jk();
    if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
    do
      try {
        Lk();
        break;
      } catch (h) {
        Mk(a, h);
      }
    while (1);
    $g();
    mk.current = f2;
    K = e;
    null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
  }
  if (0 !== b) {
    2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
    if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
    if (6 === b) Ck(a, d);
    else {
      e = a.current.alternate;
      if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f2 = xc(a), 0 !== f2 && (d = f2, b = Nk(a, f2))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
      a.finishedWork = e;
      a.finishedLanes = d;
      switch (b) {
        case 0:
        case 1:
          throw Error(p(345));
        case 2:
          Pk(a, tk, uk);
          break;
        case 3:
          Ck(a, d);
          if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
            if (0 !== uc(a, 0)) break;
            e = a.suspendedLanes;
            if ((e & d) !== d) {
              R();
              a.pingedLanes |= a.suspendedLanes & e;
              break;
            }
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 4:
          Ck(a, d);
          if ((d & 4194240) === d) break;
          b = a.eventTimes;
          for (e = -1; 0 < d; ) {
            var g = 31 - oc(d);
            f2 = 1 << g;
            g = b[g];
            g > e && (e = g);
            d &= ~f2;
          }
          d = e;
          d = B() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
          if (10 < d) {
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 5:
          Pk(a, tk, uk);
          break;
        default:
          throw Error(p(329));
      }
    }
  }
  Dk(a, B());
  return a.callbackNode === c ? Gk.bind(null, a) : null;
}
function Nk(a, b) {
  var c = sk;
  a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
  a = Ik(a, b);
  2 !== a && (b = tk, tk = c, null !== b && Fj(b));
  return a;
}
function Fj(a) {
  null === tk ? tk = a : tk.push.apply(tk, a);
}
function Ok(a) {
  for (var b = a; ; ) {
    if (b.flags & 16384) {
      var c = b.updateQueue;
      if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
        var e = c[d], f2 = e.getSnapshot;
        e = e.value;
        try {
          if (!He(f2(), e)) return false;
        } catch (g) {
          return false;
        }
      }
    }
    c = b.child;
    if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
    else {
      if (b === a) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a) return true;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return true;
}
function Ck(a, b) {
  b &= ~rk;
  b &= ~qk;
  a.suspendedLanes |= b;
  a.pingedLanes &= ~b;
  for (a = a.expirationTimes; 0 < b; ) {
    var c = 31 - oc(b), d = 1 << c;
    a[c] = -1;
    b &= ~d;
  }
}
function Ek(a) {
  if (0 !== (K & 6)) throw Error(p(327));
  Hk();
  var b = uc(a, 0);
  if (0 === (b & 1)) return Dk(a, B()), null;
  var c = Ik(a, b);
  if (0 !== a.tag && 2 === c) {
    var d = xc(a);
    0 !== d && (b = d, c = Nk(a, d));
  }
  if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
  if (6 === c) throw Error(p(345));
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b;
  Pk(a, tk, uk);
  Dk(a, B());
  return null;
}
function Qk(a, b) {
  var c = K;
  K |= 1;
  try {
    return a(b);
  } finally {
    K = c, 0 === K && (Gj = B() + 500, fg && jg());
  }
}
function Rk(a) {
  null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
  var b = K;
  K |= 1;
  var c = ok.transition, d = C;
  try {
    if (ok.transition = null, C = 1, a) return a();
  } finally {
    C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
  }
}
function Hj() {
  fj = ej.current;
  E(ej);
}
function Kk(a, b) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c = a.timeoutHandle;
  -1 !== c && (a.timeoutHandle = -1, Gf(c));
  if (null !== Y) for (c = Y.return; null !== c; ) {
    var d = c;
    wg(d);
    switch (d.tag) {
      case 1:
        d = d.type.childContextTypes;
        null !== d && void 0 !== d && $f();
        break;
      case 3:
        zh();
        E(Wf);
        E(H);
        Eh();
        break;
      case 5:
        Bh(d);
        break;
      case 4:
        zh();
        break;
      case 13:
        E(L);
        break;
      case 19:
        E(L);
        break;
      case 10:
        ah(d.type._context);
        break;
      case 22:
      case 23:
        Hj();
    }
    c = c.return;
  }
  Q = a;
  Y = a = Pg(a.current, null);
  Z = fj = b;
  T = 0;
  pk = null;
  rk = qk = rh = 0;
  tk = sk = null;
  if (null !== fh) {
    for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
      c.interleaved = null;
      var e = d.next, f2 = c.pending;
      if (null !== f2) {
        var g = f2.next;
        f2.next = e;
        d.next = g;
      }
      c.pending = d;
    }
    fh = null;
  }
  return a;
}
function Mk(a, b) {
  do {
    var c = Y;
    try {
      $g();
      Fh.current = Rh;
      if (Ih) {
        for (var d = M.memoizedState; null !== d; ) {
          var e = d.queue;
          null !== e && (e.pending = null);
          d = d.next;
        }
        Ih = false;
      }
      Hh = 0;
      O = N = M = null;
      Jh = false;
      Kh = 0;
      nk.current = null;
      if (null === c || null === c.return) {
        T = 1;
        pk = b;
        Y = null;
        break;
      }
      a: {
        var f2 = a, g = c.return, h = c, k2 = b;
        b = Z;
        h.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l2 = k2, m2 = h, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Ui(g);
          if (null !== y2) {
            y2.flags &= -257;
            Vi(y2, g, h, f2, b);
            y2.mode & 1 && Si(f2, l2, b);
            b = y2;
            k2 = l2;
            var n2 = b.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k2);
              b.updateQueue = t2;
            } else n2.add(k2);
            break a;
          } else {
            if (0 === (b & 1)) {
              Si(f2, l2, b);
              tj();
              break a;
            }
            k2 = Error(p(426));
          }
        } else if (I && h.mode & 1) {
          var J2 = Ui(g);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Vi(J2, g, h, f2, b);
            Jg(Ji(k2, h));
            break a;
          }
        }
        f2 = k2 = Ji(k2, h);
        4 !== T && (T = 2);
        null === sk ? sk = [f2] : sk.push(f2);
        f2 = g;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b &= -b;
              f2.lanes |= b;
              var x2 = Ni(f2, k2, b);
              ph(f2, x2);
              break a;
            case 1:
              h = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var F2 = Qi(f2, h, b);
                ph(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Sk(c);
    } catch (na) {
      b = na;
      Y === c && null !== c && (Y = c = c.return);
      continue;
    }
    break;
  } while (1);
}
function Jk() {
  var a = mk.current;
  mk.current = Rh;
  return null === a ? Rh : a;
}
function tj() {
  if (0 === T || 3 === T || 2 === T) T = 4;
  null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
}
function Ik(a, b) {
  var c = K;
  K |= 2;
  var d = Jk();
  if (Q !== a || Z !== b) uk = null, Kk(a, b);
  do
    try {
      Tk();
      break;
    } catch (e) {
      Mk(a, e);
    }
  while (1);
  $g();
  K = c;
  mk.current = d;
  if (null !== Y) throw Error(p(261));
  Q = null;
  Z = 0;
  return T;
}
function Tk() {
  for (; null !== Y; ) Uk(Y);
}
function Lk() {
  for (; null !== Y && !cc(); ) Uk(Y);
}
function Uk(a) {
  var b = Vk(a.alternate, a, fj);
  a.memoizedProps = a.pendingProps;
  null === b ? Sk(a) : Y = b;
  nk.current = null;
}
function Sk(a) {
  var b = a;
  do {
    var c = b.alternate;
    a = b.return;
    if (0 === (b.flags & 32768)) {
      if (c = Ej(c, b, fj), null !== c) {
        Y = c;
        return;
      }
    } else {
      c = Ij(c, b);
      if (null !== c) {
        c.flags &= 32767;
        Y = c;
        return;
      }
      if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
      else {
        T = 6;
        Y = null;
        return;
      }
    }
    b = b.sibling;
    if (null !== b) {
      Y = b;
      return;
    }
    Y = b = a;
  } while (null !== b);
  0 === T && (T = 5);
}
function Pk(a, b, c) {
  var d = C, e = ok.transition;
  try {
    ok.transition = null, C = 1, Wk(a, b, c, d);
  } finally {
    ok.transition = e, C = d;
  }
  return null;
}
function Wk(a, b, c, d) {
  do
    Hk();
  while (null !== wk);
  if (0 !== (K & 6)) throw Error(p(327));
  c = a.finishedWork;
  var e = a.finishedLanes;
  if (null === c) return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c === a.current) throw Error(p(177));
  a.callbackNode = null;
  a.callbackPriority = 0;
  var f2 = c.lanes | c.childLanes;
  Bc(a, f2);
  a === Q && (Y = Q = null, Z = 0);
  0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
    Hk();
    return null;
  }));
  f2 = 0 !== (c.flags & 15990);
  if (0 !== (c.subtreeFlags & 15990) || f2) {
    f2 = ok.transition;
    ok.transition = null;
    var g = C;
    C = 1;
    var h = K;
    K |= 4;
    nk.current = null;
    Oj(a, c);
    dk(c, a);
    Oe(Df);
    dd = !!Cf;
    Df = Cf = null;
    a.current = c;
    hk(c);
    dc();
    K = h;
    C = g;
    ok.transition = f2;
  } else a.current = c;
  vk && (vk = false, wk = a, xk = e);
  f2 = a.pendingLanes;
  0 === f2 && (Ri = null);
  mc(c.stateNode);
  Dk(a, B());
  if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
  if (Oi) throw Oi = false, a = Pi, Pi = null, a;
  0 !== (xk & 1) && 0 !== a.tag && Hk();
  f2 = a.pendingLanes;
  0 !== (f2 & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
  jg();
  return null;
}
function Hk() {
  if (null !== wk) {
    var a = Dc(xk), b = ok.transition, c = C;
    try {
      ok.transition = null;
      C = 16 > a ? 16 : a;
      if (null === wk) var d = false;
      else {
        a = wk;
        wk = null;
        xk = 0;
        if (0 !== (K & 6)) throw Error(p(331));
        var e = K;
        K |= 4;
        for (V = a.current; null !== V; ) {
          var f2 = V, g = f2.child;
          if (0 !== (V.flags & 16)) {
            var h = f2.deletions;
            if (null !== h) {
              for (var k2 = 0; k2 < h.length; k2++) {
                var l2 = h[k2];
                for (V = l2; null !== V; ) {
                  var m2 = V;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2) q2.return = m2, V = q2;
                  else for (; null !== V; ) {
                    m2 = V;
                    var r2 = m2.sibling, y2 = m2.return;
                    Sj(m2);
                    if (m2 === l2) {
                      V = null;
                      break;
                    }
                    if (null !== r2) {
                      r2.return = y2;
                      V = r2;
                      break;
                    }
                    V = y2;
                  }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g) g.return = f2, V = g;
          else b: for (; null !== V; ) {
            f2 = V;
            if (0 !== (f2.flags & 2048)) switch (f2.tag) {
              case 0:
              case 11:
              case 15:
                Pj(9, f2, f2.return);
            }
            var x2 = f2.sibling;
            if (null !== x2) {
              x2.return = f2.return;
              V = x2;
              break b;
            }
            V = f2.return;
          }
        }
        var w2 = a.current;
        for (V = w2; null !== V; ) {
          g = V;
          var u2 = g.child;
          if (0 !== (g.subtreeFlags & 2064) && null !== u2) u2.return = g, V = u2;
          else b: for (g = w2; null !== V; ) {
            h = V;
            if (0 !== (h.flags & 2048)) try {
              switch (h.tag) {
                case 0:
                case 11:
                case 15:
                  Qj(9, h);
              }
            } catch (na) {
              W(h, h.return, na);
            }
            if (h === g) {
              V = null;
              break b;
            }
            var F2 = h.sibling;
            if (null !== F2) {
              F2.return = h.return;
              V = F2;
              break b;
            }
            V = h.return;
          }
        }
        K = e;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
          lc.onPostCommitFiberRoot(kc, a);
        } catch (na) {
        }
        d = true;
      }
      return d;
    } finally {
      C = c, ok.transition = b;
    }
  }
  return false;
}
function Xk(a, b, c) {
  b = Ji(c, b);
  b = Ni(a, b, 1);
  a = nh(a, b, 1);
  b = R();
  null !== a && (Ac(a, 1, b), Dk(a, b));
}
function W(a, b, c) {
  if (3 === a.tag) Xk(a, a, c);
  else for (; null !== b; ) {
    if (3 === b.tag) {
      Xk(b, a, c);
      break;
    } else if (1 === b.tag) {
      var d = b.stateNode;
      if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
        a = Ji(c, a);
        a = Qi(b, a, 1);
        b = nh(b, a, 1);
        a = R();
        null !== b && (Ac(b, 1, a), Dk(b, a));
        break;
      }
    }
    b = b.return;
  }
}
function Ti(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  b = R();
  a.pingedLanes |= a.suspendedLanes & c;
  Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
  Dk(a, b);
}
function Yk(a, b) {
  0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c = R();
  a = ih(a, b);
  null !== a && (Ac(a, b, c), Dk(a, c));
}
function uj(a) {
  var b = a.memoizedState, c = 0;
  null !== b && (c = b.retryLane);
  Yk(a, c);
}
function bk(a, b) {
  var c = 0;
  switch (a.tag) {
    case 13:
      var d = a.stateNode;
      var e = a.memoizedState;
      null !== e && (c = e.retryLane);
      break;
    case 19:
      d = a.stateNode;
      break;
    default:
      throw Error(p(314));
  }
  null !== d && d.delete(b);
  Yk(a, c);
}
var Vk;
Vk = function(a, b, c) {
  if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
  else {
    if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
    dh = 0 !== (a.flags & 131072) ? true : false;
  }
  else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d = b.type;
      ij(a, b);
      a = b.pendingProps;
      var e = Yf(b, H.current);
      ch(b, c);
      e = Nh(null, b, d, a, e, c);
      var f2 = Sh();
      b.flags |= 1;
      "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f2, c)) : (b.tag = 0, I && f2 && vg(b), Xi(null, b, e, c), b = b.child);
      return b;
    case 16:
      d = b.elementType;
      a: {
        ij(a, b);
        a = b.pendingProps;
        e = d._init;
        d = e(d._payload);
        b.type = d;
        e = b.tag = Zk(d);
        a = Ci(d, a);
        switch (e) {
          case 0:
            b = cj(null, b, d, a, c);
            break a;
          case 1:
            b = hj(null, b, d, a, c);
            break a;
          case 11:
            b = Yi(null, b, d, a, c);
            break a;
          case 14:
            b = $i(null, b, d, Ci(d.type, a), c);
            break a;
        }
        throw Error(p(
          306,
          d,
          ""
        ));
      }
      return b;
    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
    case 3:
      a: {
        kj(b);
        if (null === a) throw Error(p(387));
        d = b.pendingProps;
        f2 = b.memoizedState;
        e = f2.element;
        lh(a, b);
        qh(b, d, null, c);
        var g = b.memoizedState;
        d = g.element;
        if (f2.isDehydrated) if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
          e = Ji(Error(p(423)), b);
          b = lj(a, b, d, c, e);
          break a;
        } else if (d !== e) {
          e = Ji(Error(p(424)), b);
          b = lj(a, b, d, c, e);
          break a;
        } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
        else {
          Ig();
          if (d === e) {
            b = Zi(a, b, c);
            break a;
          }
          Xi(a, b, d, c);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f2 = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f2 && Ef(d, f2) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
    case 6:
      return null === a && Eg(b), null;
    case 13:
      return oj(a, b, c);
    case 4:
      return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
    case 7:
      return Xi(a, b, b.pendingProps, c), b.child;
    case 8:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 12:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        f2 = b.memoizedProps;
        g = e.value;
        G(Wg, d._currentValue);
        d._currentValue = g;
        if (null !== f2) if (He(f2.value, g)) {
          if (f2.children === e.children && !Wf.current) {
            b = Zi(a, b, c);
            break a;
          }
        } else for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
          var h = f2.dependencies;
          if (null !== h) {
            g = f2.child;
            for (var k2 = h.firstContext; null !== k2; ) {
              if (k2.context === d) {
                if (1 === f2.tag) {
                  k2 = mh(-1, c & -c);
                  k2.tag = 2;
                  var l2 = f2.updateQueue;
                  if (null !== l2) {
                    l2 = l2.shared;
                    var m2 = l2.pending;
                    null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                    l2.pending = k2;
                  }
                }
                f2.lanes |= c;
                k2 = f2.alternate;
                null !== k2 && (k2.lanes |= c);
                bh(
                  f2.return,
                  c,
                  b
                );
                h.lanes |= c;
                break;
              }
              k2 = k2.next;
            }
          } else if (10 === f2.tag) g = f2.type === b.type ? null : f2.child;
          else if (18 === f2.tag) {
            g = f2.return;
            if (null === g) throw Error(p(341));
            g.lanes |= c;
            h = g.alternate;
            null !== h && (h.lanes |= c);
            bh(g, c, b);
            g = f2.sibling;
          } else g = f2.child;
          if (null !== g) g.return = f2;
          else for (g = f2; null !== g; ) {
            if (g === b) {
              g = null;
              break;
            }
            f2 = g.sibling;
            if (null !== f2) {
              f2.return = g.return;
              g = f2;
              break;
            }
            g = g.return;
          }
          f2 = g;
        }
        Xi(a, b, e.children, c);
        b = b.child;
      }
      return b;
    case 9:
      return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
    case 14:
      return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
    case 15:
      return bj(a, b, b.type, b.pendingProps, c);
    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
    case 19:
      return xj(a, b, c);
    case 22:
      return dj(a, b, c);
  }
  throw Error(p(156, b.tag));
};
function Fk(a, b) {
  return ac(a, b);
}
function $k(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a, b, c, d) {
  return new $k(a, b, c, d);
}
function aj(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function Zk(a) {
  if ("function" === typeof a) return aj(a) ? 1 : 0;
  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Da) return 11;
    if (a === Ga) return 14;
  }
  return 2;
}
function Pg(a, b) {
  var c = a.alternate;
  null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
  c.flags = a.flags & 14680064;
  c.childLanes = a.childLanes;
  c.lanes = a.lanes;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}
function Rg(a, b, c, d, e, f2) {
  var g = 2;
  d = a;
  if ("function" === typeof a) aj(a) && (g = 1);
  else if ("string" === typeof a) g = 5;
  else a: switch (a) {
    case ya:
      return Tg(c.children, e, f2, b);
    case za:
      g = 8;
      e |= 8;
      break;
    case Aa:
      return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f2, a;
    case Ea:
      return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f2, a;
    case Fa:
      return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f2, a;
    case Ia:
      return pj(c, e, f2, b);
    default:
      if ("object" === typeof a && null !== a) switch (a.$$typeof) {
        case Ba:
          g = 10;
          break a;
        case Ca:
          g = 9;
          break a;
        case Da:
          g = 11;
          break a;
        case Ga:
          g = 14;
          break a;
        case Ha:
          g = 16;
          d = null;
          break a;
      }
      throw Error(p(130, null == a ? a : typeof a, ""));
  }
  b = Bg(g, c, b, e);
  b.elementType = a;
  b.type = d;
  b.lanes = f2;
  return b;
}
function Tg(a, b, c, d) {
  a = Bg(7, a, d, b);
  a.lanes = c;
  return a;
}
function pj(a, b, c, d) {
  a = Bg(22, a, d, b);
  a.elementType = Ia;
  a.lanes = c;
  a.stateNode = { isHidden: false };
  return a;
}
function Qg(a, b, c) {
  a = Bg(6, a, null, b);
  a.lanes = c;
  return a;
}
function Sg(a, b, c) {
  b = Bg(4, null !== a.children ? a.children : [], a.key, b);
  b.lanes = c;
  b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
  return b;
}
function al(a, b, c, d, e) {
  this.tag = b;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e;
  this.mutableSourceEagerHydrationData = null;
}
function bl(a, b, c, d, e, f2, g, h, k2) {
  a = new al(a, b, c, h, k2);
  1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
  f2 = Bg(3, null, null, b);
  a.current = f2;
  f2.stateNode = a;
  f2.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  kh(f2);
  return a;
}
function cl(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
}
function dl(a) {
  if (!a) return Vf;
  a = a._reactInternals;
  a: {
    if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
    var b = a;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Zf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (null !== b);
    throw Error(p(171));
  }
  if (1 === a.tag) {
    var c = a.type;
    if (Zf(c)) return bg(a, c, b);
  }
  return b;
}
function el(a, b, c, d, e, f2, g, h, k2) {
  a = bl(c, d, true, a, e, f2, g, h, k2);
  a.context = dl(null);
  c = a.current;
  d = R();
  e = yi(c);
  f2 = mh(d, e);
  f2.callback = void 0 !== b && null !== b ? b : null;
  nh(c, f2, e);
  a.current.lanes = e;
  Ac(a, e, d);
  Dk(a, d);
  return a;
}
function fl(a, b, c, d) {
  var e = b.current, f2 = R(), g = yi(e);
  c = dl(c);
  null === b.context ? b.context = c : b.pendingContext = c;
  b = mh(f2, g);
  b.payload = { element: a };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  a = nh(e, b, g);
  null !== a && (gi(a, e, g, f2), oh(a, e, g));
  return g;
}
function gl(a) {
  a = a.current;
  if (!a.child) return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function hl(a, b) {
  a = a.memoizedState;
  if (null !== a && null !== a.dehydrated) {
    var c = a.retryLane;
    a.retryLane = 0 !== c && c < b ? c : b;
  }
}
function il(a, b) {
  hl(a, b);
  (a = a.alternate) && hl(a, b);
}
function jl() {
  return null;
}
var kl = "function" === typeof reportError ? reportError : function(a) {
  console.error(a);
};
function ll(a) {
  this._internalRoot = a;
}
ml.prototype.render = ll.prototype.render = function(a) {
  var b = this._internalRoot;
  if (null === b) throw Error(p(409));
  fl(a, b, null, null);
};
ml.prototype.unmount = ll.prototype.unmount = function() {
  var a = this._internalRoot;
  if (null !== a) {
    this._internalRoot = null;
    var b = a.containerInfo;
    Rk(function() {
      fl(null, a, null, null);
    });
    b[uf] = null;
  }
};
function ml(a) {
  this._internalRoot = a;
}
ml.prototype.unstable_scheduleHydration = function(a) {
  if (a) {
    var b = Hc();
    a = { blockedOn: null, target: a, priority: b };
    for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
    Qc.splice(c, 0, a);
    0 === c && Vc(a);
  }
};
function nl(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
}
function ol(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function pl() {
}
function ql(a, b, c, d, e) {
  if (e) {
    if ("function" === typeof d) {
      var f2 = d;
      d = function() {
        var a2 = gl(g);
        f2.call(a2);
      };
    }
    var g = el(b, d, a, 0, null, false, false, "", pl);
    a._reactRootContainer = g;
    a[uf] = g.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Rk();
    return g;
  }
  for (; e = a.lastChild; ) a.removeChild(e);
  if ("function" === typeof d) {
    var h = d;
    d = function() {
      var a2 = gl(k2);
      h.call(a2);
    };
  }
  var k2 = bl(a, 0, false, null, null, false, false, "", pl);
  a._reactRootContainer = k2;
  a[uf] = k2.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  Rk(function() {
    fl(b, k2, c, d);
  });
  return k2;
}
function rl(a, b, c, d, e) {
  var f2 = c._reactRootContainer;
  if (f2) {
    var g = f2;
    if ("function" === typeof e) {
      var h = e;
      e = function() {
        var a2 = gl(g);
        h.call(a2);
      };
    }
    fl(b, g, a, e);
  } else g = ql(c, b, a, e, d);
  return gl(g);
}
Ec = function(a) {
  switch (a.tag) {
    case 3:
      var b = a.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c = tc(b.pendingLanes);
        0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
      }
      break;
    case 13:
      Rk(function() {
        var b2 = ih(a, 1);
        if (null !== b2) {
          var c2 = R();
          gi(b2, a, 1, c2);
        }
      }), il(a, 1);
  }
};
Fc = function(a) {
  if (13 === a.tag) {
    var b = ih(a, 134217728);
    if (null !== b) {
      var c = R();
      gi(b, a, 134217728, c);
    }
    il(a, 134217728);
  }
};
Gc = function(a) {
  if (13 === a.tag) {
    var b = yi(a), c = ih(a, b);
    if (null !== c) {
      var d = R();
      gi(c, a, b, d);
    }
    il(a, b);
  }
};
Hc = function() {
  return C;
};
Ic = function(a, b) {
  var c = C;
  try {
    return C = a, b();
  } finally {
    C = c;
  }
};
yb = function(a, b, c) {
  switch (b) {
    case "input":
      bb(a, c);
      b = c.name;
      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode; ) c = c.parentNode;
        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c.length; b++) {
          var d = c[b];
          if (d !== a && d.form === a.form) {
            var e = Db(d);
            if (!e) throw Error(p(90));
            Wa(d);
            bb(d, e);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c);
      break;
    case "select":
      b = c.value, null != b && fb(a, !!c.multiple, b, false);
  }
};
Gb = Qk;
Hb = Rk;
var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
  a = Zb(a);
  return null === a ? null : a.stateNode;
}, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber) try {
    kc = vl.inject(ul), lc = vl;
  } catch (a) {
  }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
reactDom_production_min.createPortal = function(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!nl(b)) throw Error(p(200));
  return cl(a, b, null, c);
};
reactDom_production_min.createRoot = function(a, b) {
  if (!nl(a)) throw Error(p(299));
  var c = false, d = "", e = kl;
  null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
  b = bl(a, 1, false, null, null, c, false, d, e);
  a[uf] = b.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  return new ll(b);
};
reactDom_production_min.findDOMNode = function(a) {
  if (null == a) return null;
  if (1 === a.nodeType) return a;
  var b = a._reactInternals;
  if (void 0 === b) {
    if ("function" === typeof a.render) throw Error(p(188));
    a = Object.keys(a).join(",");
    throw Error(p(268, a));
  }
  a = Zb(b);
  a = null === a ? null : a.stateNode;
  return a;
};
reactDom_production_min.flushSync = function(a) {
  return Rk(a);
};
reactDom_production_min.hydrate = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, true, c);
};
reactDom_production_min.hydrateRoot = function(a, b, c) {
  if (!nl(a)) throw Error(p(405));
  var d = null != c && c.hydratedSources || null, e = false, f2 = "", g = kl;
  null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f2 = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
  b = el(b, null, a, 1, null != c ? c : null, e, false, f2, g);
  a[uf] = b.current;
  sf(a);
  if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
    c,
    e
  );
  return new ml(b);
};
reactDom_production_min.render = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, false, c);
};
reactDom_production_min.unmountComponentAtNode = function(a) {
  if (!ol(a)) throw Error(p(40));
  return a._reactRootContainer ? (Rk(function() {
    rl(null, null, a, false, function() {
      a._reactRootContainer = null;
      a[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Qk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
  if (!ol(c)) throw Error(p(200));
  if (null == a || void 0 === a._reactInternals) throw Error(p(38));
  return rl(a, b, c, false, d);
};
reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var reactDomExports = reactDom.exports;
var createRoot;
var m = reactDomExports;
{
  createRoot = m.createRoot;
  m.hydrateRoot;
}
const scriptRel = function detectScriptRel() {
  const relList = typeof document !== "undefined" && document.createElement("link").relList;
  return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
}();
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep, importerUrl);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        const isBaseRelative = !!importerUrl;
        if (isBaseRelative) {
          for (let i = links.length - 1; i >= 0; i--) {
            const link2 = links[i];
            if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
              return;
            }
          }
        } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const __vite_import_meta_env__$1 = {};
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => {
    if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
      );
    }
    listeners.clear();
  };
  const api = { setState, getState, getInitialState, subscribe, destroy };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
var withSelector = { exports: {} };
var withSelector_production = {};
var shim$2 = { exports: {} };
var useSyncExternalStoreShim_production = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React$1 = reactExports;
function is$1(x2, y2) {
  return x2 === y2 && (0 !== x2 || 1 / x2 === 1 / y2) || x2 !== x2 && y2 !== y2;
}
var objectIs$1 = "function" === typeof Object.is ? Object.is : is$1, useState = React$1.useState, useEffect$1 = React$1.useEffect, useLayoutEffect = React$1.useLayoutEffect, useDebugValue$2 = React$1.useDebugValue;
function useSyncExternalStore$2(subscribe, getSnapshot) {
  var value = getSnapshot(), _useState = useState({ inst: { value, getSnapshot } }), inst = _useState[0].inst, forceUpdate = _useState[1];
  useLayoutEffect(
    function() {
      inst.value = value;
      inst.getSnapshot = getSnapshot;
      checkIfSnapshotChanged(inst) && forceUpdate({ inst });
    },
    [subscribe, value, getSnapshot]
  );
  useEffect$1(
    function() {
      checkIfSnapshotChanged(inst) && forceUpdate({ inst });
      return subscribe(function() {
        checkIfSnapshotChanged(inst) && forceUpdate({ inst });
      });
    },
    [subscribe]
  );
  useDebugValue$2(value);
  return value;
}
function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  inst = inst.value;
  try {
    var nextValue = latestGetSnapshot();
    return !objectIs$1(inst, nextValue);
  } catch (error) {
    return true;
  }
}
function useSyncExternalStore$1(subscribe, getSnapshot) {
  return getSnapshot();
}
var shim$1 = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
useSyncExternalStoreShim_production.useSyncExternalStore = void 0 !== React$1.useSyncExternalStore ? React$1.useSyncExternalStore : shim$1;
{
  shim$2.exports = useSyncExternalStoreShim_production;
}
var shimExports = shim$2.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React = reactExports, shim = shimExports;
function is(x2, y2) {
  return x2 === y2 && (0 !== x2 || 1 / x2 === 1 / y2) || x2 !== x2 && y2 !== y2;
}
var objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore = shim.useSyncExternalStore, useRef = React.useRef, useEffect = React.useEffect, useMemo = React.useMemo, useDebugValue$1 = React.useDebugValue;
withSelector_production.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
  var instRef = useRef(null);
  if (null === instRef.current) {
    var inst = { hasValue: false, value: null };
    instRef.current = inst;
  } else inst = instRef.current;
  instRef = useMemo(
    function() {
      function memoizedSelector(nextSnapshot) {
        if (!hasMemo) {
          hasMemo = true;
          memoizedSnapshot = nextSnapshot;
          nextSnapshot = selector(nextSnapshot);
          if (void 0 !== isEqual && inst.hasValue) {
            var currentSelection = inst.value;
            if (isEqual(currentSelection, nextSnapshot))
              return memoizedSelection = currentSelection;
          }
          return memoizedSelection = nextSnapshot;
        }
        currentSelection = memoizedSelection;
        if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
        var nextSelection = selector(nextSnapshot);
        if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
          return memoizedSnapshot = nextSnapshot, currentSelection;
        memoizedSnapshot = nextSnapshot;
        return memoizedSelection = nextSelection;
      }
      var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
      return [
        function() {
          return memoizedSelector(getSnapshot());
        },
        null === maybeGetServerSnapshot ? void 0 : function() {
          return memoizedSelector(maybeGetServerSnapshot());
        }
      ];
    },
    [getSnapshot, getServerSnapshot, selector, isEqual]
  );
  var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
  useEffect(
    function() {
      inst.hasValue = true;
      inst.value = value;
    },
    [value]
  );
  useDebugValue$1(value);
  return value;
};
{
  withSelector.exports = withSelector_production;
}
var withSelectorExports = withSelector.exports;
const useSyncExternalStoreExports = /* @__PURE__ */ getDefaultExportFromCjs(withSelectorExports);
const __vite_import_meta_env__ = {};
const { useDebugValue } = React$2;
const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;
let didWarnAboutEqualityFn = false;
const identity = (arg) => arg;
function useStore(api, selector = identity, equalityFn) {
  if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && equalityFn && !didWarnAboutEqualityFn) {
    console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
    );
    didWarnAboutEqualityFn = true;
  }
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getInitialState,
    selector,
    equalityFn
  );
  useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && typeof createState !== "function") {
    console.warn(
      "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
    );
  }
  const api = typeof createState === "function" ? createStore(createState) : createState;
  const useBoundStore = (selector, equalityFn) => useStore(api, selector, equalityFn);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
const ACCENTS = {
  blue: { name: "Blue", hex: "#3b82f6", soft: "rgba(59,130,246,0.16)" },
  purple: { name: "Purple", hex: "#8b5cf6", soft: "rgba(139,92,246,0.16)" },
  orange: { name: "Orange", hex: "#f97316", soft: "rgba(249,115,22,0.16)" },
  green: { name: "Green", hex: "#22c55e", soft: "rgba(34,197,94,0.16)" },
  red: { name: "Red", hex: "#ef4444", soft: "rgba(239,68,68,0.16)" }
};
function applyTheme(mode, accent) {
  const root = document.documentElement;
  root.dataset.theme = mode;
  const a = ACCENTS[accent];
  root.style.setProperty("--accent", a.hex);
  root.style.setProperty("--accent-soft", a.soft);
}
let toastSeq = 1;
let autosaveTimer = null;
let renderListenersAdded = false;
const useApp = create((set, get) => ({
  ready: false,
  appInfo: null,
  settings: null,
  hardware: null,
  ffmpeg: null,
  sidecar: null,
  project: null,
  view: "home",
  userMode: "beginner",
  setUserMode: (v2) => set({ userMode: v2 }),
  projectList: [],
  activePanel: "project",
  toasts: [],
  isRendering: false,
  setRendering: (v2) => set({ isRendering: v2 }),
  userFonts: [],
  renderProgress: null,
  renderLog: [],
  renderRunning: false,
  renderQueue: { items: [], activeId: null },
  init: async () => {
    const [appInfo, settings] = await Promise.all([
      window.masjavas.getAppInfo(),
      window.masjavas.getSettings()
    ]);
    applyTheme(settings.theme, settings.accent);
    set({ appInfo, settings, ready: true });
    get().refreshStatus();
    get().loadProjectList();
    get().loadFonts();
    if (renderListenersAdded) return;
    renderListenersAdded = true;
    const cleanLog = (s) => s.replace(/[A-Za-z]:[/\\][^\s,)]+|\/[^\s,)]{10,}/g, (m2) => m2.split(/[/\\]/).pop() ?? m2);
    window.masjavas.onRenderEvent((p2) => {
      const st = get();
      let log = st.renderLog;
      let progress = st.renderProgress;
      let running = st.renderRunning;
      if (p2.logLine) {
        const c = cleanLog(p2.logLine);
        log = [`• ${c}`, ...log].slice(0, 500);
        progress = progress ? { ...progress, task: c } : p2;
        set({ renderLog: log, renderProgress: progress });
        return;
      }
      progress = p2;
      if (p2.status === "done") log = [`✓ ${p2.fileName} — done`, ...log].slice(0, 500);
      if (p2.status === "error") log = [`✗ ${p2.fileName}: ${cleanLog(p2.error ?? "")}`, ...log].slice(0, 500);
      if (p2.status === "cancelled") log = [`✗ Cancelled: ${p2.fileName}`, ...log].slice(0, 500);
      const finished = p2.index + 1 >= p2.total && (p2.status === "done" || p2.status === "error") || p2.status === "cancelled";
      if (finished) running = false;
      else if (p2.status === "rendering" || p2.status === "preparing") running = true;
      set({ renderProgress: progress, renderLog: log, renderRunning: running, isRendering: running });
    });
    window.masjavas.getRenderQueue().then((q2) => set({ renderQueue: q2 })).catch(() => {
    });
    window.masjavas.onQueueEvent((q2) => set({ renderQueue: q2 }));
  },
  loadFonts: async () => {
    const { loadUserFonts } = await __vitePreload(async () => {
      const { loadUserFonts: loadUserFonts2 } = await import("./userFonts-NJ9Rlnyn.js");
      return { loadUserFonts: loadUserFonts2 };
    }, true ? [] : void 0, import.meta.url);
    set({ userFonts: await loadUserFonts() });
  },
  importFonts: async () => {
    const { importUserFonts } = await __vitePreload(async () => {
      const { importUserFonts: importUserFonts2 } = await import("./userFonts-NJ9Rlnyn.js");
      return { importUserFonts: importUserFonts2 };
    }, true ? [] : void 0, import.meta.url);
    const fams = await importUserFonts();
    set({ userFonts: fams });
    get().toast("success", "Font diimpor — tersedia di Lirik, Playlist & Custom Teks.");
  },
  setPanel: (p2) => set({ activePanel: p2 }),
  setView: (v2) => {
    if (v2 === "home") get().loadProjectList();
    set({ view: v2 });
  },
  updateSettings: async (patch) => {
    const updated = await window.masjavas.setSettings(patch);
    if ("theme" in patch || "accent" in patch) applyTheme(updated.theme, updated.accent);
    set({ settings: updated });
    if ("ffmpegPath" in patch || "encoderPreference" in patch) get().refreshStatus();
  },
  refreshStatus: async () => {
    try {
      const [hardware, ffmpeg, sidecar] = await Promise.all([
        window.masjavas.getHardwareInfo(),
        window.masjavas.getFfmpegInfo(),
        window.masjavas.pingSidecar()
      ]);
      set({ hardware, ffmpeg, sidecar });
    } catch (e) {
      get().toast("error", `Status check failed: ${e.message}`);
    }
  },
  loadProjectList: async () => {
    try {
      const projectList = await window.masjavas.listProjects();
      set({ projectList });
    } catch (e) {
      get().toast("error", `Could not load projects: ${e.message}`);
    }
  },
  createProject: async (name, mode = "studio") => {
    const project = await window.masjavas.newProject(name, mode);
    const stored = await window.masjavas.storeProject(project);
    set({ project: stored, view: "editor", activePanel: "audio" });
    get().toast("success", `Project "${stored.name}" dibuat.`);
  },
  openProject: async () => {
    const paths = await window.masjavas.openFiles([{ name: "MASJAVAS Project", extensions: ["masjavas"] }]);
    if (!paths.length) return;
    try {
      const project = await window.masjavas.openProject(paths[0]);
      set({ project, view: "editor", activePanel: "audio" });
      get().toast("success", `Opened "${project.name}".`);
    } catch (e) {
      get().toast("error", `Failed to open project: ${e.message}`);
    }
  },
  openProjectById: async (id2) => {
    try {
      const project = await window.masjavas.loadProjectById(id2);
      set({ project, view: "editor", activePanel: "audio" });
    } catch (e) {
      get().toast("error", `Failed to open project: ${e.message}`);
    }
  },
  deleteProject: async (id2) => {
    try {
      await window.masjavas.deleteProject(id2);
      const cur = get().project;
      if (cur && cur.id === id2) set({ project: null });
      await get().loadProjectList();
      get().toast("success", "Project deleted.");
    } catch (e) {
      get().toast("error", `Delete failed: ${e.message}`);
    }
  },
  saveProject: async () => {
    const project = get().project;
    if (!project) return;
    try {
      const stored = await window.masjavas.storeProject(project);
      set({ project: stored });
      if (project.filePath) {
        await window.masjavas.saveProject(stored, project.filePath);
      }
      get().toast("success", "Project saved.");
    } catch (e) {
      get().toast("error", `Save failed: ${e.message}`);
    }
  },
  closeProject: () => {
    if (autosaveTimer) {
      clearTimeout(autosaveTimer);
      autosaveTimer = null;
    }
    set({ project: null, view: "home", activePanel: "project" });
    get().loadProjectList();
  },
  persistProject: async () => {
    const project = get().project;
    if (!project) return;
    try {
      const stored = await window.masjavas.storeProject(project);
      const cur = get().project;
      if (cur && cur.id === stored.id) set({ project: { ...cur, id: stored.id, updatedAt: stored.updatedAt } });
    } catch {
    }
  },
  setProject: (p2) => {
    set({ project: p2 });
    if (p2) {
      if (autosaveTimer) clearTimeout(autosaveTimer);
      autosaveTimer = setTimeout(() => get().persistProject(), 800);
    }
  },
  toast: (kind, message) => {
    const id2 = toastSeq++;
    set((s) => ({ toasts: [...s.toasts, { id: id2, kind, message }] }));
    setTimeout(() => get().dismissToast(id2), 5e3);
  },
  dismissToast: (id2) => set((s) => ({ toasts: s.toasts.filter((t2) => t2.id !== id2) }))
}));
function Toasts() {
  const toasts = useApp((s) => s.toasts);
  const dismiss = useApp((s) => s.dismissToast);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toasts", children: toasts.map((t2) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `toast ${t2.kind}`, onClick: () => dismiss(t2.id), children: t2.message }, t2.id)) });
}
function timeAgo(ts) {
  if (!ts) return "—";
  const s = Math.floor((Date.now() - ts) / 1e3);
  if (s < 60) return "just now";
  const m2 = Math.floor(s / 60);
  if (m2 < 60) return `${m2}m ago`;
  const h = Math.floor(m2 / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(ts).toLocaleDateString();
}
function HomeScreen() {
  const createProject = useApp((s) => s.createProject);
  const openProject = useApp((s) => s.openProject);
  const openProjectById = useApp((s) => s.openProjectById);
  const deleteProject = useApp((s) => s.deleteProject);
  const loadProjectList = useApp((s) => s.loadProjectList);
  const projectList = useApp((s) => s.projectList);
  reactExports.useEffect(() => {
    loadProjectList();
  }, [loadProjectList]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "home", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "home-top", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "./assets/logo.png", style: { width: 140, height: 140, marginBottom: 16, objectFit: "contain" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "home-brand", children: [
        "MASJAVAS ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "v", children: "RENDER PRO 2026" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "home-tagline", children: "Video Editor & Visualizer Pro. Mudah digunakan untuk pemula, bertenaga untuk profesional." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "home-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { margin: "0 20px 20px 20px", padding: 16, border: "1px solid var(--border)", background: "var(--bg-elev)", borderRadius: "var(--radius)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { marginTop: 0, display: "flex", alignItems: "center", gap: 6 }, children: "🚀 Panduan Memulai Cepat (Onboarding)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { style: { paddingLeft: 16, margin: "10px 0 0 0", fontSize: 13, lineHeight: "1.6", color: "var(--text-dim)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Pilih salah satu template pembuatan video di bawah (misal, Video Musik atau Karaoke)." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Impor file musik/audio di tab Audio, lalu impor video atau gambar latar belakang di tab Media." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Jika menggunakan mode Karaoke/Lirik, masukkan teks lirik lagu di tab Lirik (bisa transkripsi otomatis)." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Buka tab Render untuk memilih resolusi, cek prasyarat, lalu klik 'Tambah ke Antrian Render'!" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "home-create", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "home-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "action-card primary", onClick: () => createProject("Proyek Video Musik", "studio"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ac-ico", children: "🎵" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ac-title", children: "Video Musik" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ac-sub", children: "Gabungkan audio + video latar belakang" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "action-card primary-purple", onClick: () => createProject("Proyek Karaoke", "lyrics"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ac-ico", children: "🎤" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ac-title", children: "Karaoke" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ac-sub", children: "Buat video lirik/karaoke berjalan" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "action-card primary-cyan", onClick: async () => {
          await createProject("Proyek Visualizer", "studio");
          patchProject((p2) => {
            p2.spectrum.enabled = true;
            return p2;
          });
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ac-ico", children: "📊" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ac-title", children: "Visualizer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ac-sub", children: "Spektrum audio reaktif frekuensi" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "action-card primary-blue", onClick: () => createProject("Proyek Playlist", "playlist"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ac-ico", children: "📋" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ac-title", children: "Playlist Video" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ac-sub", children: "Gabungkan banyak lagu dalam satu video" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "action-card outline", onClick: openProject, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ac-ico", children: "📂" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ac-title", children: "Buka Proyek..." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ac-sub", children: "Pilih file proyek .masjavas dari komputer" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "home-history", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "history-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Project History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "history-count", children: projectList.length })
        ] }),
        projectList.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty", children: "No projects yet. Create one to get started." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "history-grid", children: projectList.map((p2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "proj-card", onClick: () => openProjectById(p2.id), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `proj-thumb mode-${p2.mode}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "proj-mode-ico", children: p2.mode === "lyrics" ? "“”" : "≣" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "proj-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "proj-name", title: p2.name, children: p2.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "proj-meta", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "proj-mode", children: p2.mode }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "· ",
                p2.audioCount,
                " audio · ",
                p2.footageCount,
                " media"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "proj-time", children: timeAgo(p2.updatedAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "proj-del",
              title: "Delete project",
              onClick: (e) => {
                e.stopPropagation();
                if (confirm(`Delete project "${p2.name}"? This cannot be undone.`)) deleteProject(p2.id);
              },
              children: "✕"
            }
          )
        ] }, p2.id)) })
      ] })
    ] })
  ] });
}
function showLyrics(p2) {
  if (typeof p2.showLyrics === "boolean") return p2.showLyrics;
  return p2.mode === "lyrics" || p2.mode === "batch" && !!p2.batch?.useLyrics;
}
function showPlaylist(p2) {
  if (typeof p2.showPlaylist === "boolean") return p2.showPlaylist;
  return p2.mode === "playlist" || p2.mode === "batch" && !!p2.batch?.usePlaylist;
}
function isReactive(p2) {
  if (p2.spectrumMode) return p2.spectrumMode === "reactive";
  return p2.mode !== "batch";
}
function sanitizeFilename(name) {
  if (!name) return "Untitled Project";
  let s = name.replace(/[\\/:*?"<>|]/g, " ");
  s = s.replace(/\s+/g, " ").trim();
  return s || "Untitled Project";
}
function ProjectPanel() {
  const project = useApp((s) => s.project);
  const saveProject = useApp((s) => s.saveProject);
  const setProject = useApp((s) => s.setProject);
  const closeProject = useApp((s) => s.closeProject);
  const setView = useApp((s) => s.setView);
  if (!project) return null;
  const exportAs = async () => {
    const target = await window.masjavas.saveFile(`${project.projectName || project.name || "Untitled"}.masjavas`, [
      { name: "Proyek MASJAVAS", extensions: ["masjavas"] }
    ]);
    if (!target) return;
    const saved = await window.masjavas.saveProject(project, target);
    setProject(saved);
    useApp.getState().toast("success", "Proyek berhasil diekspor.");
  };
  const modeLabel = [
    showLyrics(project) ? "Lirik" : null,
    showPlaylist(project) ? "Playlist" : null,
    project.spectrum.enabled ? isReactive(project) ? "Spektrum reaktif" : "Spektrum statis" : null
  ].filter(Boolean).join(" · ") || "Studio (kosong)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Proyek" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Detail proyek saat ini. Perubahan tersimpan otomatis ke perpustakaan." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Proyek Aktif" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Nama proyek" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "inp",
            value: project.projectName || project.name || "",
            onChange: (e) => setProject({ ...project, name: e.target.value, projectName: e.target.value })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Mode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "val", children: modeLabel })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Perpustakaan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "val", children: "Tersimpan otomatis" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "File ekspor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "val", children: project.filePath ? project.filePath.split(/[\\/]/).pop() : "Belum diekspor" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "btn-row", style: { marginTop: 14 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn primary", onClick: saveProject, children: "Simpan Sekarang" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: exportAs, children: "Ekspor .masjavas…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: closeProject, children: "Tutup Proyek" })
      ] })
    ] })
  ] });
}
function patchProject(updater) {
  const cur = useApp.getState().project;
  if (!cur) return;
  useApp.getState().setProject(updater(structuredClone(cur)));
}
function useProject() {
  return useApp((s) => s.project);
}
create((set) => ({
  previewTime: 0,
  setPreviewTime: (t2) => set({ previewTime: t2 })
}));
function Field({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
    children
  ] });
}
function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  fmt: fmt2
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { display: "flex", justifyContent: "space-between" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--text)", fontFamily: "var(--mono)" }, children: fmt2 ? fmt2(value) : value })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "range",
        min,
        max,
        step,
        value,
        style: { width: "100%", accentColor: "var(--accent)" },
        onChange: (e) => onChange(parseFloat(e.target.value))
      }
    )
  ] });
}
function Select({
  label,
  value,
  options,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label, children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "inp", value, onChange: (e) => onChange(e.target.value), children: options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value)) }) });
}
function ColorInput({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "color",
        value,
        onChange: (e) => onChange(e.target.value),
        style: { width: 44, height: 36, border: "none", background: "none", padding: 0 }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "inp", value, onChange: (e) => onChange(e.target.value), style: { flex: 1 } })
  ] }) });
}
function Toggle({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--text-dim)", fontSize: 13 }, children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `seg-toggle ${value ? "on" : ""}`, onClick: () => onChange(!value), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "seg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: !value ? "pillbtn on" : "pillbtn", style: pillStyle(!value), children: "Off" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: value ? "pillbtn on" : "pillbtn", style: pillStyle(value), children: "On" })
        ] }) })
      ]
    }
  );
}
function pillStyle(active) {
  return {
    padding: "5px 14px",
    fontSize: 12,
    background: active ? "var(--accent)" : "var(--bg)",
    color: active ? "#fff" : "var(--text-dim)",
    display: "inline-block"
  };
}
const BEAT_EFFECT_OPTIONS = [
  { value: "none", label: "Tanpa efek" },
  // --- Efek cahaya ---
  { value: "flash", label: "Flash putih — kilatan terang tiap ketukan" },
  { value: "color-flash", label: "Flash warna — kilatan warna mengikuti bass" },
  { value: "brightness-pulse", label: "Brightness pulse — kecerahan melonjak" },
  { value: "vignette-pulse", label: "Vignette pulse — tepi menggelap saat beat" },
  { value: "zoom-pulse", label: "Zoom pulse — cincin cahaya meledak" },
  { value: "rgb-split", label: "RGB Split — aberasi warna saat beat (treble)" },
  { value: "strobe-cut", label: "Strobe cut — kilap hitam/putih cepat" },
  // --- Efek gerak footage ---
  { value: "zoom-in", label: "Zoom in — footage membesar tiap ketukan" },
  { value: "zoom-out", label: "Zoom out — footage mengecil tiap ketukan" },
  { value: "shake-hard", label: "Shake — footage bergetar kencang" },
  { value: "zoom-shake", label: "Zoom + shake — zoom dan getar bersamaan" },
  { value: "tilt", label: "Tilt — footage miring mengikuti irama" }
];
const IMAGE_FILTER = [{ name: "Gambar", extensions: ["jpg", "jpeg", "png", "webp"] }];
const VIDEO_FILTER = [{ name: "Video", extensions: ["mp4", "mov", "mkv", "webm"] }];
function Thumb$1({ item }) {
  const [src, setSrc] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let alive = true;
    window.masjavas.thumbnail(item.path, item.kind === "video" ? "video" : "image").then((d) => alive && setSrc(d)).catch(() => {
    });
    return () => {
      alive = false;
    };
  }, [item.path, item.kind]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "100%", aspectRatio: "16/9", background: "var(--bg)", borderRadius: 6, marginBottom: 6, overflow: "hidden" }, children: src && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: item.name, style: { width: "100%", height: "100%", objectFit: "cover" } }) });
}
function MediaPanel() {
  const project = useProject();
  const toast = useApp((s) => s.toast);
  useApp((s) => s.sidecar);
  if (!project) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-head", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Media — Footage" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty", children: "Buat atau buka proyek terlebih dahulu." })
    ] });
  }
  const f2 = project.footage;
  const setType = (type) => patchProject((p2) => {
    p2.footage.type = type;
    p2.footage.items = [];
    p2.footage.order = [];
    p2.footage.pinned = [];
    return p2;
  });
  const importItems = async (kind) => {
    const only = [f2.type];
    let items = [];
    if (kind === "folder") {
      const folder = await window.masjavas.openFolder();
      if (!folder) return;
      const res = await window.masjavas.scanMedia({ kind: "folder", paths: [folder], only });
      items = res.items;
      toast(items.length ? "success" : "info", `Ditemukan ${items.length} ${f2.type === "image" ? "gambar" : "video"}, dilewati ${res.skipped}.`);
    } else {
      const filter = f2.type === "image" ? IMAGE_FILTER : VIDEO_FILTER;
      const sel = await window.masjavas.openFiles(filter);
      if (!sel.length) return;
      const res = await window.masjavas.scanMedia({ kind: "files", paths: sel, only });
      items = res.items;
      toast(items.length ? "success" : "info", `Ditambahkan ${items.length} file, dilewati ${res.skipped}.`);
    }
    patchProject((p2) => {
      p2.footage.items = items;
      p2.footage.source = kind === "folder" ? "folder" : "file";
      p2.footage.order = items.map((i) => i.path);
      if (p2.footage.randomCount > items.length) p2.footage.randomCount = Math.max(1, items.length);
      return p2;
    });
  };
  const togglePin = (path) => patchProject((p2) => {
    p2.footage.pinned = p2.footage.pinned.includes(path) ? p2.footage.pinned.filter((x2) => x2 !== path) : [...p2.footage.pinned, path];
    return p2;
  });
  const shuffle2 = () => {
    const items = project.footage.items;
    const pinned = project.footage.pinned;
    const pool = items.map((i) => i.path).filter((p2) => !pinned.includes(p2));
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const count = Math.min(project.footage.randomCount, items.length);
    const chosen = [...pinned, ...pool].slice(0, count);
    patchProject((p2) => (p2.footage.order = chosen, p2));
    toast("info", `Dipilih ${chosen.length} footage (${pinned.length} dikunci).`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Media — Footage" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Impor gambar atau video sebagai latar. Bisa pilih secara acak, kunci favorit, dan acak ulang." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Jenis Footage" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "seg", style: { marginBottom: 14 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: f2.type === "image" ? "on" : "", onClick: () => setType("image"), children: "Gambar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: f2.type === "video" ? "on" : "", onClick: () => setType("video"), children: "Video" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "btn-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: () => importItems("folder"), children: "Impor Folder…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: () => importItems("files"), children: "Impor File…" })
      ] })
    ] }),
    f2.items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Pemilihan Footage" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Slider,
          {
            label: "Jumlah footage yang digunakan",
            min: 1,
            max: f2.items.length,
            step: 1,
            value: Math.min(f2.randomCount, f2.items.length),
            onChange: (v2) => patchProject((p2) => (p2.footage.randomCount = v2, p2))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Toggle,
          {
            label: "Ulangi footage hingga durasi penuh",
            value: f2.loop,
            onChange: (v2) => patchProject((p2) => (p2.footage.loop = v2, p2))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Toggle,
          {
            label: "Seamless loop (sambung mulus, tanpa fade)",
            value: f2.seamlessLoop ?? false,
            onChange: (v2) => patchProject((p2) => (p2.footage.seamlessLoop = v2, p2))
          }
        ),
        f2.type === "video" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Toggle,
          {
            label: "Bisukan audio footage",
            value: f2.muteFootageAudio ?? true,
            onChange: (v2) => patchProject((p2) => (p2.footage.muteFootageAudio = v2, p2))
          }
        ),
        f2.type === "video" && f2.muteFootageAudio === false && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Slider,
            {
              label: "Volume audio footage",
              min: 0,
              max: 1.5,
              step: 0.05,
              value: f2.footageVolume ?? 1,
              fmt: (v2) => `${Math.round(v2 * 100)}%`,
              onChange: (v2) => patchProject((p2) => (p2.footage.footageVolume = v2, p2))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "soon", style: { fontSize: 11 }, children: [
            "Audio bawaan footage (mis. ASMR) ikut ke video, di-loop seamless ke durasi penuh. Tambah suara lain (piano/burung) di tab ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Audio → Audio FX" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "soon", style: { fontSize: 11, marginTop: 6 }, children: f2.seamlessLoop ?? false ? "Footage diputar berulang nyambung. Banyak footage beda = transisi halus; 1 footage = potongan mulus (cocok ASMR loop)." : "Footage dipotong rata sepanjang durasi." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "btn-row", style: { marginTop: 10 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn primary", onClick: shuffle2, children: "Acak / Pilih" }) }),
        f2.order.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "soon", style: { marginTop: 10 }, children: [
          "Dipilih: ",
          f2.order.length,
          " clip."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Efek Beat (Sinkron Ketukan Musik)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "soon", style: { fontSize: 11, marginBottom: 10 }, children: "Efek visual yang berdenyut mengikuti irama musik — cocok untuk DJ, deep house, atau musik berenergi tinggi." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Select,
          {
            label: "Preset efek",
            value: f2.beatEffect ?? "flash",
            options: BEAT_EFFECT_OPTIONS,
            onChange: (v2) => patchProject((p2) => (p2.footage.beatEffect = v2, p2))
          }
        ),
        (f2.beatEffect ?? "flash") !== "none" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Slider,
            {
              label: "Intensitas efek",
              min: 0.1,
              max: 1,
              step: 0.05,
              value: f2.beatEffectIntensity ?? 0.6,
              fmt: (v2) => `${Math.round(v2 * 100)}%`,
              onChange: (v2) => patchProject((p2) => (p2.footage.beatEffectIntensity = v2, p2))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "soon", style: { fontSize: 11 }, children: "Denyut periodik mengikuti tempo (BPM) lagu — cepat dirender, tidak menganalisis tiap ketukan." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { margin: 0 }, children: [
          "Footage (",
          f2.items.length,
          ") — dikunci ",
          f2.pinned.length,
          (f2.used?.length ?? 0) > 0 ? ` · used ${f2.used.length}` : ""
        ] }),
        (f2.used?.length ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", style: { fontSize: 11, padding: "3px 10px" }, onClick: () => patchProject((p2) => (p2.footage.used = [], p2)), children: "Reset Used" })
      ] }),
      f2.randomCount === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "soon", style: { fontSize: 11, marginTop: 4 }, children: [
        "Footage-count 1 + Batch render: tiap video pakai 1 footage berbeda. Yang sudah dirender ditandai ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "USED" }),
        " & dilewati sampai semua terpakai (lalu reset otomatis)."
      ] }),
      f2.items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty", children: [
        "Belum ada footage ",
        f2.type === "image" ? "gambar" : "video",
        "."
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "media-list", children: f2.items.map((m2) => {
        const pinned = f2.pinned.includes(m2.path);
        const chosen = f2.order.includes(m2.path);
        const used = (f2.used ?? []).includes(m2.path);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "media-tile", style: { borderColor: chosen ? "var(--accent)" : "var(--border)", opacity: used ? 0.55 : 1 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Thumb$1, { item: m2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mname", title: m2.path, children: m2.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap", justifyContent: "center" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: `pill ${pinned ? "ok" : "warn"}`,
                style: { border: "none", cursor: "pointer" },
                onClick: () => togglePin(m2.path),
                children: pinned ? "Dikunci" : "Kunci"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: `pill ${used ? "ok" : "warn"}`,
                style: { border: "none", cursor: "pointer" },
                title: "Tandai sudah dipakai (dilewati saat batch render)",
                onClick: () => patchProject((p2) => {
                  const cur = p2.footage.used ?? [];
                  p2.footage.used = cur.includes(m2.path) ? cur.filter((x2) => x2 !== m2.path) : [...cur, m2.path];
                  return p2;
                }),
                children: used ? "Used" : "Unused"
              }
            )
          ] })
        ] }, m2.path);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Video Intro & Outro Overlay" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "soon", style: { fontSize: 11, marginBottom: 12 }, children: "Tambahkan video overlay opsional untuk intro di awal dan outro di akhir. Durasi video utama tetap menjadi penentu durasi total." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { margin: "10px 0 6px 0", fontSize: 13, color: "var(--text)" }, children: "Intro Overlay" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          type: "text",
          readOnly: true,
          placeholder: "Pilih video intro...",
          value: project.introVideoPath || "",
          style: { flex: 1, padding: "6px 10px", background: "var(--bg-dark)", border: "1px solid var(--border)", borderRadius: 4, color: "var(--text)", fontSize: 12 }
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
          className: "btn",
          style: { padding: "6px 12px", fontSize: 12 },
          onClick: async () => {
            const sel = await window.masjavas.openFiles(VIDEO_FILTER);
            if (sel && sel[0]) {
              patchProject((p) => {
                p.introVideoPath = sel[0];
                return p;
              });
            }
          },
          children: "Pilih..."
        }),
        project.introVideoPath && /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
          className: "btn",
          style: { padding: "6px 12px", fontSize: 12, color: "var(--danger)" },
          onClick: () => patchProject((p) => {
            p.introVideoPath = null;
            return p;
          }),
          children: "Hapus"
        })
      ] }),
      project.introVideoPath && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Toggle,
        {
          label: "Aktifkan Audio Intro",
          value: project.introAudioEnabled ?? false,
          onChange: (v2) => patchProject((p2) => {
            p2.introAudioEnabled = v2;
            return p2;
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { margin: "16px 0 6px 0", fontSize: 13, color: "var(--text)" }, children: "Outro Overlay" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
          type: "text",
          readOnly: true,
          placeholder: "Pilih video outro...",
          value: project.outroVideoPath || "",
          style: { flex: 1, padding: "6px 10px", background: "var(--bg-dark)", border: "1px solid var(--border)", borderRadius: 4, color: "var(--text)", fontSize: 12 }
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
          className: "btn",
          style: { padding: "6px 12px", fontSize: 12 },
          onClick: async () => {
            const sel = await window.masjavas.openFiles(VIDEO_FILTER);
            if (sel && sel[0]) {
              patchProject((p) => {
                p.outroVideoPath = sel[0];
                return p;
              });
            }
          },
          children: "Pilih..."
        }),
        project.outroVideoPath && /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
          className: "btn",
          style: { padding: "6px 12px", fontSize: 12, color: "var(--danger)" },
          onClick: () => patchProject((p) => {
            p.outroVideoPath = null;
            return p;
          }),
          children: "Hapus"
        })
      ] }),
      project.outroVideoPath && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Toggle,
        {
          label: "Aktifkan Audio Outro",
          value: project.outroAudioEnabled ?? false,
          onChange: (v2) => patchProject((p2) => {
            p2.outroAudioEnabled = v2;
            return p2;
          })
        }
      )
    ] })
  ] });
}
const AUDIO_FILTER = [{ name: "Audio", extensions: ["mp3", "wav", "flac", "m4a", "aac", "ogg"] }];
function AudioPanel() {
  const project = useProject();
  const toast = useApp((s) => s.toast);
  if (!project) return /* @__PURE__ */ jsxRuntimeExports.jsx(Empty$6, {});
  const a = project.audio;
  const importItems = async (kind) => {
    if (kind === "folder") {
      const f2 = await window.masjavas.openFolder();
      if (!f2) return;
      const res = await window.masjavas.scanMedia({ kind: "folder", paths: [f2], only: ["audio"] });
      finalize(res.items, kind);
      toast(res.items.length ? "success" : "info", `Ditemukan ${res.items.length} file audio.`);
    } else {
      const sel = await window.masjavas.openFiles(AUDIO_FILTER);
      if (!sel.length) return;
      const res = await window.masjavas.scanMedia({ kind: "files", paths: sel, only: ["audio"] });
      finalize(res.items, kind);
      toast(res.items.length ? "success" : "info", `Ditambahkan ${res.items.length} file audio.`);
    }
  };
  const finalize = (items, kind) => {
    patchProject((p2) => {
      p2.audio.items = items;
      p2.audio.order = items.map((i) => i.path);
      p2.audio.source = kind === "folder" ? "folder" : "file";
      return p2;
    });
    items.forEach(async (it) => {
      try {
        const pr = await window.masjavas.probe(it.path);
        patchProject((p2) => {
          const m2 = p2.audio.items.find((x2) => x2.path === it.path);
          if (m2) m2.duration = pr.duration;
          return p2;
        });
      } catch {
      }
    });
  };
  const togglePin = (path) => patchProject((p2) => {
    p2.audio.pinned = p2.audio.pinned.includes(path) ? p2.audio.pinned.filter((x2) => x2 !== path) : [...p2.audio.pinned, path];
    return p2;
  });
  const fx = a.fx ?? [];
  const importFx = async () => {
    const sel = await window.masjavas.openFiles(AUDIO_FILTER);
    if (!sel.length) return;
    patchProject((p2) => {
      const list = p2.audio.fx ?? [];
      for (const path of sel) {
        const name = (path.replace(/\\/g, "/").split("/").pop() || path).replace(/\.[^.]+$/, "");
        list.push({ id: `fx_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`, path, name, volume: 1, loop: true });
      }
      p2.audio.fx = list;
      return p2;
    });
    toast("success", `${sel.length} Audio FX ditambahkan.`);
  };
  const updateFx = (id2, patch) => patchProject((p2) => {
    const f2 = (p2.audio.fx ?? []).find((x2) => x2.id === id2);
    if (f2) Object.assign(f2, patch);
    return p2;
  });
  const removeFx = (id2) => patchProject((p2) => {
    p2.audio.fx = (p2.audio.fx ?? []).filter((x2) => x2.id !== id2);
    return p2;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Audio" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Impor satu lagu atau folder berisi banyak lagu. Banyak lagu akan digabung menjadi satu video (atur di tab Render)." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Sumber Audio" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "btn-row", style: { marginBottom: 14 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: () => importItems("folder"), children: "Impor Folder…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: () => importItems("files"), children: "Impor File…" })
      ] }),
      a.items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty", children: "Belum ada audio." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: a.items.map((m2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { flex: 1 }, children: m2.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "val", style: { width: 70 }, children: m2.duration ? `${m2.duration.toFixed(1)}s` : "…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `pill ${a.pinned.includes(m2.path) ? "ok" : "warn"}`,
            style: { border: "none", cursor: "pointer" },
            onClick: () => togglePin(m2.path),
            children: a.pinned.includes(m2.path) ? "Dikunci" : "Kunci"
          }
        )
      ] }, m2.path)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Pengaturan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Toggle,
        {
          label: "Urutan acak (kecuali yang dikunci)",
          value: a.random,
          onChange: (v2) => patchProject((p2) => (p2.audio.random = v2, p2))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Toggle,
        {
          label: "Sesuaikan durasi video dengan audio",
          value: a.matchDuration,
          onChange: (v2) => patchProject((p2) => (p2.audio.matchDuration = v2, p2))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          label: "Volume audio utama",
          min: 0,
          max: 1.5,
          step: 0.05,
          value: a.mainVolume ?? 1,
          fmt: (v2) => `${Math.round(v2 * 100)}%`,
          onChange: (v2) => patchProject((p2) => (p2.audio.mainVolume = v2, p2))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "soon", children: [
        "Lagu digabung jadi satu video. Atur jumlah lagu & durasi di tab Render. Untuk merender beberapa video sekaligus, aktifkan ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Batch render" }),
        " di tab Render."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { margin: 0 }, children: [
          "Audio FX (",
          fx.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: importFx, children: "+ Impor FX…" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "soon", style: { fontSize: 11 }, children: [
        "Suara tambahan (piano, burung, hujan…) dicampur di atas audio utama & audio footage. Tiap FX punya volume & loop sendiri. ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Tidak" }),
        " memengaruhi spektrum."
      ] }),
      fx.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty", children: "Belum ada Audio FX." }) : fx.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { background: "rgba(255,255,255,0.03)", marginTop: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { flex: 1, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: item.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", style: { padding: "2px 8px" }, onClick: () => removeFx(item.id), children: "✕" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Slider,
          {
            label: "Volume",
            min: 0,
            max: 1.5,
            step: 0.05,
            value: item.volume,
            fmt: (v2) => `${Math.round(v2 * 100)}%`,
            onChange: (v2) => updateFx(item.id, { volume: v2 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Loop sampai durasi penuh", value: item.loop, onChange: (v2) => updateFx(item.id, { loop: v2 }) })
      ] }, item.id))
    ] })
  ] });
}
function Empty$6() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-head", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Audio" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty", children: "Buat atau buka proyek terlebih dahulu." })
  ] });
}
const FONT_OPTIONS = [
  // ── Sans-serif ──────────────────────────────────────────────────────────────
  { value: "Inter", label: "Inter (clean modern)" },
  { value: "Roboto", label: "Roboto (neutral)" },
  { value: "Lato", label: "Lato (humanist)" },
  { value: "Noto Sans", label: "Noto Sans (multi-language)" },
  { value: "Unbounded", label: "Unbounded (wide)" },
  // ── Rounded / Geometric ─────────────────────────────────────────────────────
  { value: "Poppins", label: "Poppins (rounded)" },
  { value: "Montserrat", label: "Montserrat (modern classic)" },
  { value: "Raleway", label: "Raleway (elegant)" },
  { value: "Exo 2", label: "Exo 2 (sci-fi rounded)" },
  // ── Bold / Condensed ────────────────────────────────────────────────────────
  { value: "Oswald", label: "Oswald (condensed)" },
  { value: "Bebas Neue", label: "Bebas Neue (bold caps)" },
  { value: "Anton", label: "Anton (heavy impact)" },
  { value: "Teko", label: "Teko (compact display)" },
  { value: "Chakra Petch", label: "Chakra Petch (tech)" },
  // ── Stylized / Futuristic ───────────────────────────────────────────────────
  { value: "Orbitron", label: "Orbitron (futuristic)" },
  { value: "Righteous", label: "Righteous (retro)" },
  { value: "Cinzel", label: "Cinzel (roman / epic)" },
  // ── Serif / Editorial ───────────────────────────────────────────────────────
  { value: "Playfair Display", label: "Playfair Display (luxury serif)" },
  // ── Script / Handwriting ────────────────────────────────────────────────────
  { value: "Pacifico", label: "Pacifico (fun script)" },
  { value: "Caveat", label: "Caveat (handwritten)" },
  { value: "Sacramento", label: "Sacramento (elegant script)" },
  // ── Vintage / Special ───────────────────────────────────────────────────────
  { value: "Special Elite", label: "Special Elite (typewriter)" },
  // ── Display / Script pack (dafont) ──────────────────────────────────────────
  { value: "Beyonest", label: "Beyonest" },
  { value: "Excess V", label: "Excess V" },
  { value: "Excess V Straight", label: "Excess V Straight" },
  { value: "Gentle Hearts", label: "Gentle Hearts" },
  { value: "Glendora", label: "Glendora" },
  { value: "Gokart Bubble", label: "Gokart Bubble" },
  { value: "Handflair", label: "Handflair" },
  { value: "Lumiare", label: "Lumiare" },
  { value: "Magic Yellow", label: "Magic Yellow" },
  { value: "Modern Romance", label: "Modern Romance" },
  { value: "Neogen", label: "Neogen" },
  { value: "Peach Club Script", label: "Peach Club Script" },
  { value: "Restful Silent", label: "Restful Silent" },
  { value: "Super Pandora", label: "Super Pandora" },
  { value: "Twilight Luminance Free", label: "Twilight Luminance" },
  { value: "Weghorst", label: "Weghorst" },
  // ── System ──────────────────────────────────────────────────────────────────
  { value: "Arial", label: "Arial (system fallback)" }
];
function fontOptionsWith(userFonts) {
  return [...FONT_OPTIONS, ...userFonts.map((f2) => ({ value: f2, label: `${f2} (impor)` }))];
}
const LANGUAGE_OPTIONS = [
  { value: "auto", label: "Deteksi otomatis" },
  { value: "id", label: "Indonesia" },
  { value: "en", label: "Inggris" },
  { value: "es", label: "Spanyol" },
  { value: "pt", label: "Portugis" },
  { value: "fr", label: "Prancis" },
  { value: "de", label: "Jerman" },
  { value: "it", label: "Italia" },
  { value: "nl", label: "Belanda" },
  { value: "ru", label: "Rusia" },
  { value: "zh", label: "Mandarin" },
  { value: "ja", label: "Jepang" },
  { value: "ko", label: "Korea" },
  { value: "pl", label: "Polandia" },
  { value: "uk", label: "Ukraina" },
  { value: "hu", label: "Hungaria" },
  { value: "cs", label: "Ceko" },
  { value: "ro", label: "Rumania" },
  { value: "fi", label: "Finlandia" },
  { value: "tr", label: "Turki" },
  { value: "vi", label: "Vietnam" },
  { value: "ar", label: "Arab" },
  { value: "hi", label: "Hindi" }
];
const WHISPER_MODEL_OPTIONS = [
  { value: "small", label: "Kecil — cepat, akurasi standar (~460 MB)" },
  { value: "medium", label: "Sedang — seimbang (~1.4 GB)" },
  { value: "large", label: "Besar — akurasi terbaik, lambat (~2.9 GB)" },
  { value: "large-v2", label: "Besar v2 — paling akurat (~2.9 GB)" }
];
function LyricsPanel() {
  const project = useProject();
  const settings = useApp((s) => s.settings);
  const toast = useApp((s) => s.toast);
  const userFonts = useApp((s) => s.userFonts);
  const [transcribing, setTranscribing] = reactExports.useState(false);
  const [transcribeStatus, setTranscribeStatus] = reactExports.useState("");
  const [multiResults, setMultiResults] = reactExports.useState(null);
  if (!project) return /* @__PURE__ */ jsxRuntimeExports.jsx(Empty$5, {});
  const ly = project.lyrics;
  const importLyrics = async () => {
    const sel = await window.masjavas.openFiles([{ name: "File Lirik", extensions: ["lrc", "srt", "txt"] }]);
    if (!sel.length) return;
    try {
      let lines = await window.masjavas.parseLyrics(sel[0]);
      const audio = project.audio.items[0];
      let dur = audio?.duration;
      if (audio && !dur) dur = (await window.masjavas.probe(audio.path)).duration;
      const normalized = normalizeLyrics(lines, dur);
      patchProject((p2) => (p2.lyrics.file = sel[0], p2.lyrics.lines = normalized.lines, p2.showLyrics = true, p2));
      toast("success", `${normalized.lines.length} baris lirik berhasil dimuat.`);
    } catch (e) {
      toast("error", e.message);
    }
  };
  const provider = settings?.transcribeProvider ?? "whisper";
  const hasGroqKey = !!settings?.groqApiKey;
  const autoLyrics = async () => {
    const audioItems = project.audio.items;
    if (!audioItems.length) {
      toast("error", "Impor audio di tab Audio terlebih dahulu.");
      return;
    }
    const lang = ly.whisperLanguage === "auto" ? void 0 : ly.whisperLanguage;
    if (provider === "groq") {
      if (!hasGroqKey) {
        toast("error", "Groq API key belum diatur. Masukkan di Pengaturan → Groq AI.");
        return;
      }
      setTranscribing(true);
      setMultiResults(null);
      const lim = ly.maxSongs && ly.maxSongs > 0 ? Math.min(ly.maxSongs, audioItems.length) : audioItems.length;
      const paths = audioItems.slice(0, lim).map((a) => a.path);
      const isMulti = paths.length > 1;
      setTranscribeStatus(isMulti ? `Mengirim ${paths.length} track ke Groq secara paralel…` : "Mengirim audio ke Groq AI…");
      try {
        const results = await window.masjavas.groqTranscribe(paths, lang);
        const mapped = results.map((r2) => ({
          path: r2.path,
          lines: r2.result?.lines ?? [],
          error: r2.error
        }));
        if (isMulti) {
          setMultiResults(mapped);
          const ok2 = mapped.filter((r2) => r2.lines.length > 0).length;
          toast(ok2 > 0 ? "success" : "error", `${ok2}/${paths.length} track berhasil ditranskrip.`);
          const first = mapped.find((r2) => r2.lines.length > 0);
          if (first) {
            const normalized = normalizeLyrics(first.lines, audioItems[0]?.duration);
            patchProject((p2) => (p2.lyrics.lines = normalized.lines, p2.lyrics.file = first.path, p2.showLyrics = true, p2));
          }
        } else {
          const r2 = mapped[0];
          if (!r2.lines.length) {
            toast("info", r2.error ? `Groq error: ${r2.error}` : "Vokal tidak terdeteksi. Coba rekaman yang lebih bersih atau ubah bahasa.");
          } else {
            const normalized = normalizeLyrics(r2.lines, audioItems[0]?.duration);
            console.log({
              audioDuration: audioItems[0]?.duration,
              transcriptSegments: r2.lines,
              normalizedLines: normalized.lines,
              projectLyrics: normalized.lines,
              editorLines: normalized.lines,
              assDialogueCount: normalized.lines.length
            });
            patchProject((p2) => (p2.lyrics.lines = normalized.lines, p2.lyrics.file = r2.path, p2.showLyrics = true, p2));
            toast("success", `${normalized.lines.length} baris lirik berhasil dihasilkan via Groq.`);
          }
        }
      } catch (e) {
        toast("error", e.message);
      } finally {
        setTranscribing(false);
        setTranscribeStatus("");
      }
      return;
    }
    const audio = audioItems[0];
    const modelSize = ly.whisperModel ?? "small";
    setTranscribing(true);
    setTranscribeStatus("Memuat model AI… unduhan pertama membutuhkan beberapa menit");
    try {
      const t1 = setTimeout(() => setTranscribeStatus("Mengenali vokal dan lirik…"), 4e3);
      const t2 = setTimeout(() => setTranscribeStatus("Menyesuaikan waktu setiap kata…"), 6e4);
      const res = await window.masjavas.transcribeLyrics(audio.path, modelSize, lang);
      clearTimeout(t1);
      clearTimeout(t2);
      if (!res.lines.length) {
        toast("info", "Vokal tidak terdeteksi. Coba rekaman yang lebih bersih atau edit lirik secara manual.");
        setTranscribing(false);
        setTranscribeStatus("");
        return;
      }
      const normalized = normalizeLyrics(res.lines, audio?.duration);
      console.log({
        audioDuration: audio?.duration,
        transcriptSegments: res.lines,
        normalizedLines: normalized.lines,
        projectLyrics: normalized.lines,
        editorLines: normalized.lines,
        assDialogueCount: normalized.lines.length
      });
      patchProject((p2) => (p2.lyrics.lines = normalized.lines, p2.lyrics.file = audio.path, p2.showLyrics = true, p2));
      toast("success", `${normalized.lines.length} baris lirik berhasil dihasilkan.`);
      setTranscribeStatus("");
    } catch (e) {
      toast("error", e.message);
      setTranscribeStatus("");
    } finally {
      setTranscribing(false);
    }
  };
  const updateLine = (i, field, value) => patchProject((p2) => {
    const line = p2.lyrics.lines[i];
    if (field === "text") line.text = value;
    else line[field] = parseFloat(value) || 0;
    return p2;
  });
  const st = ly.style;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Lirik / Karaoke" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Hasilkan lirik otomatis dari audio, atau impor file .lrc / .srt. Lirik akan terbakar ke video saat render." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Toggle,
        {
          label: "Aktifkan Lirik",
          value: showLyrics(project),
          onChange: (v2) => patchProject((p2) => (p2.showLyrics = v2, p2))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "soon", style: { fontSize: 11, marginTop: 6 }, children: "Saat aktif, lirik dibakar ke video. Bisa dipakai bareng Playlist." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { margin: 0 }, children: "Hasilkan Lirik Otomatis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
          fontSize: 10,
          fontWeight: 700,
          padding: "2px 7px",
          borderRadius: 10,
          background: provider === "groq" ? "var(--accent)" : "var(--bg-raised)",
          color: provider === "groq" ? "#fff" : "var(--text-dim)",
          border: "1px solid var(--accent)"
        }, children: provider === "groq" ? "Groq Cloud" : "WhisperX Lokal" }),
        provider === "groq" && !hasGroqKey && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 10, color: "var(--bad, #f66)" }, children: "⚠ API key belum diset" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: provider === "groq" ? "1fr" : "1fr 1fr", gap: 8, marginBottom: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Select,
          {
            label: "Bahasa",
            value: ly.whisperLanguage ?? "auto",
            options: LANGUAGE_OPTIONS,
            onChange: (v2) => patchProject((p2) => (p2.lyrics.whisperLanguage = v2, p2))
          }
        ),
        provider === "whisper" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Select,
          {
            label: "Akurasi model AI",
            value: ly.whisperModel ?? "small",
            options: WHISPER_MODEL_OPTIONS,
            onChange: (v2) => patchProject((p2) => (p2.lyrics.whisperModel = v2, p2))
          }
        )
      ] }),
      project.audio.items.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Slider,
          {
            label: "Jumlah lagu ditranskrip",
            min: 0,
            max: project.audio.items.length,
            step: 1,
            value: Math.min(ly.maxSongs ?? 0, project.audio.items.length),
            fmt: (v2) => v2 === 0 ? `semua (${project.audio.items.length})` : `${v2}`,
            onChange: (v2) => patchProject((p2) => (p2.lyrics.maxSongs = v2, p2))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 11, color: "var(--text-dim)", marginTop: 2 }, children: [
          "0 = semua. Hanya ",
          (ly.maxSongs ?? 0) || project.audio.items.length,
          " lagu pertama yang dibuatkan lirik; sisanya tanpa lirik."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "btn-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn primary", onClick: autoLyrics, disabled: transcribing, children: transcribing ? "⏳ Memproses…" : provider === "groq" ? "Transkripsi Groq" : "Hasilkan Lirik" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: importLyrics, disabled: transcribing, children: "Impor .lrc / .srt…" }),
        ly.lines.length > 0 && !transcribing && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: () => {
          patchProject((p2) => (p2.lyrics.lines = [], p2.lyrics.file = null, p2));
          setMultiResults(null);
        }, children: "Hapus" })
      ] }),
      transcribing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 8, padding: "10px 12px", background: "var(--bg-raised)", borderRadius: 8, border: "1px solid var(--accent)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 18, animation: "spin 1s linear infinite" }, children: "⏳" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 12, fontWeight: 600, color: "var(--accent)" }, children: "Memproses audio…" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-dim)", marginTop: 2 }, children: transcribeStatus })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 8, height: 3, background: "var(--bg)", borderRadius: 2, overflow: "hidden" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: "100%", background: "var(--accent)", width: "40%", animation: "indeterminate 1.5s ease-in-out infinite" } }) })
      ] }),
      multiResults && multiResults.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 10 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 11, fontWeight: 600, marginBottom: 6, color: "var(--text-dim)" }, children: [
          "Hasil transkripsi paralel (",
          multiResults.length,
          " track):"
        ] }),
        multiResults.map((r2, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4, padding: "5px 8px", background: "var(--bg-raised)", borderRadius: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: r2.path.split(/[\\/]/).pop() }),
          r2.error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: 10, color: "var(--bad, #f66)" }, children: [
            "✗ ",
            r2.error.slice(0, 50)
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: 10, color: "var(--good, #4c4)" }, children: [
              "✓ ",
              r2.lines.length,
              " baris"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "btn",
                style: { padding: "2px 8px", fontSize: 10 },
                onClick: () => {
                  const normalized = normalizeLyrics(r2.lines, project.audio.items.find((a) => a.path === r2.path)?.duration);
                  patchProject((p2) => (p2.lyrics.lines = normalized.lines, p2.lyrics.file = r2.path, p2.showLyrics = true, p2));
                },
                children: "Gunakan"
              }
            )
          ] })
        ] }, i))
      ] }),
      ly.file && !transcribing && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "soon", style: { marginTop: 6, fontSize: 11 }, children: [
        "Sumber: ",
        ly.file.split(/[\\/]/).pop()
      ] }),
      provider === "whisper" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "soon", style: { marginTop: 6, fontSize: 11 }, children: 'Gunakan model "Besar v2" untuk akurasi tertinggi. Unduhan model hanya sekali — tersimpan di komputer Anda.' }),
      provider === "groq" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "soon", style: { marginTop: 6, fontSize: 11 }, children: [
        "Groq: transkripsi cloud cepat (whisper-large-v3-turbo). Multi-track diproses paralel sekaligus. Ubah provider di ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Pengaturan → Groq AI" }),
        "."
      ] }),
      ly.lines.length > 0 && (() => {
        const hasWords = ly.lines.some((l2) => l2.words && l2.words.length > 0);
        const wordsUniform = hasWords && ly.lines.every(
          (l2) => !l2.words || l2.words.length < 2 || l2.words.every((w2) => Math.abs(w2.t - l2.t) < 0.05)
        );
        if (!hasWords) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 11, color: "var(--bad, #f66)", marginTop: 4 }, children: '⚠ Waktu per kata tidak tersedia — mode "Per Kata" tidak akan menyorot dengan benar. Gunakan mode "Per Baris" atau hasilkan ulang lirik.' });
        if (wordsUniform) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 11, color: "var(--warn, #fa0)", marginTop: 4 }, children: "⚠ Waktu per kata mungkin kurang presisi. Sorotan karaoke bisa sedikit meleset. Coba model yang lebih besar untuk hasil lebih akurat." });
        return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 11, color: "var(--good, #4c4)", marginTop: 4 }, children: "✓ Waktu per kata terdeteksi — sorotan karaoke siap digunakan." });
      })(),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Toggle,
        {
          label: "Hasilkan lirik otomatis saat render (jika belum ada lirik)",
          value: ly.autoTranscribe ?? false,
          onChange: (v2) => patchProject((p2) => (p2.lyrics.autoTranscribe = v2, p2))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Gaya Teks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Font", value: st.fontFamily, options: fontOptionsWith(userFonts), onChange: (v2) => patchProject((p2) => (p2.lyrics.style.fontFamily = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Ukuran font", min: 16, max: 120, step: 2, value: st.fontSize, onChange: (v2) => patchProject((p2) => (p2.lyrics.style.fontSize = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ColorInput, { label: "Warna teks", value: st.color, onChange: (v2) => patchProject((p2) => (p2.lyrics.style.color = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ColorInput, { label: "Warna sorotan", value: ly.highlightColor, onChange: (v2) => patchProject((p2) => (p2.lyrics.highlightColor = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Select,
          {
            label: "Mode sorotan",
            value: ly.highlightMode ?? "word",
            options: [
              { value: "word", label: "Per kata (karaoke)" },
              { value: "line", label: "Per baris" }
            ],
            onChange: (v2) => patchProject((p2) => (p2.lyrics.highlightMode = v2, p2))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Select,
          {
            label: "Animasi teks",
            value: ly.animation ?? "fade",
            options: [
              { value: "none", label: "Tanpa animasi" },
              { value: "fade", label: "Muncul/menghilang" },
              { value: "slide-up", label: "Geser ke atas" },
              { value: "slide-down", label: "Geser ke bawah" },
              { value: "scale-pop", label: "Pop membesar" },
              { value: "typewriter", label: "Mesin ketik" },
              { value: "glow-pulse", label: "Bersinar berdenyut" },
              { value: "bounce", label: "Memantul" }
            ],
            onChange: (v2) => patchProject((p2) => (p2.lyrics.animation = v2, p2))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ColorInput, { label: "Warna tepi teks", value: st.strokeColor, onChange: (v2) => patchProject((p2) => (p2.lyrics.style.strokeColor = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Ketebalan tepi", min: 0, max: 8, step: 1, value: st.strokeWidth, onChange: (v2) => patchProject((p2) => (p2.lyrics.style.strokeWidth = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Bayangan teks", value: st.shadow, onChange: (v2) => patchProject((p2) => (p2.lyrics.style.shadow = v2, p2)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Posisi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Select,
          {
            label: "Letak teks",
            value: st.position,
            options: [
              { value: "top", label: "Atas" },
              { value: "center", label: "Tengah" },
              { value: "bottom", label: "Bawah" },
              { value: "custom", label: "Kustom (X/Y)" }
            ],
            onChange: (v2) => patchProject((p2) => (p2.lyrics.style.position = v2, p2))
          }
        ),
        st.position === "custom" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Posisi X", min: 0, max: 1, step: 0.01, value: st.posX, fmt: (v2) => `${Math.round(v2 * 100)}%`, onChange: (v2) => patchProject((p2) => (p2.lyrics.style.posX = v2, p2)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Posisi Y", min: 0, max: 1, step: 0.01, value: st.posY, fmt: (v2) => `${Math.round(v2 * 100)}%`, onChange: (v2) => patchProject((p2) => (p2.lyrics.style.posY = v2, p2)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Select,
          {
            label: "Rata teks",
            value: st.align,
            options: [
              { value: "left", label: "Kiri" },
              { value: "center", label: "Tengah" },
              { value: "right", label: "Kanan" }
            ],
            onChange: (v2) => patchProject((p2) => (p2.lyrics.style.align = v2, p2))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
        "Editor (",
        ly.lines.length,
        " baris)"
      ] }),
      ly.lines.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state-lyrics", style: { padding: "20px 10px", textAlign: "center", border: "1px dashed var(--border)", borderRadius: 12 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 28, display: "block", marginBottom: 6 }, children: "💬" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { margin: "0 0 4px", fontSize: 13 }, children: "Belum Ada Lirik" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 11, color: "var(--text-dim)", margin: "0 0 10px", lineHeight: 1.4 }, children: "Tulis lirik secara manual, impor file lirik (.lrc/.srt), atau gunakan Transkripsi AI." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "btn-row", style: { justifyContent: "center", gap: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn primary", style: { padding: "4px 10px", fontSize: 11 }, onClick: () => {
            patchProject((p2) => {
              p2.lyrics.lines = [{ t: 0, end: 5, text: "Lirik lagu baris pertama..." }];
              p2.showLyrics = true;
              return p2;
            });
          }, children: "＋ Tulis Manual" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", style: { padding: "4px 10px", fontSize: 11 }, onClick: importLyrics, children: "⤓ Impor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", style: { padding: "4px 10px", fontSize: 11 }, onClick: autoLyrics, children: "🤖 Transkripsi" })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxHeight: 420, overflowY: "auto" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, marginBottom: 4, fontSize: 11, color: "var(--muted)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { width: 70 }, children: "Mulai (s)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { width: 70 }, children: "Selesai (s)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { flex: 1 }, children: "Teks" })
        ] }),
        ly.lines.map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, marginBottom: 6, alignItems: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "inp", style: { width: 70 }, value: line.t.toFixed(2), onChange: (e) => updateLine(i, "t", e.target.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "inp", style: { width: 70 }, value: line.end.toFixed(2), onChange: (e) => updateLine(i, "end", e.target.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "inp", style: { flex: 1 }, value: line.text, onChange: (e) => updateLine(i, "text", e.target.value) })
        ] }, i))
      ] })
    ] })
  ] });
}
function Empty$5() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-head", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Lirik / Karaoke" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty", children: "Buat atau buka proyek terlebih dahulu." })
  ] });
}
function cleanTitle(name) {
  return name.replace(/\.[^.]+$/, "").replace(/^\s*\d{1,3}\s*[-._,)]+\s*/, "").replace(/^[\s,;.\-_]+/, "").replace(/[_]+/g, " ").replace(/\s{2,}/g, " ").trim();
}
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function PlaylistPanel() {
  const project = useProject();
  const toast = useApp((s) => s.toast);
  const userFonts = useApp((s) => s.userFonts);
  if (!project) return /* @__PURE__ */ jsxRuntimeExports.jsx(Empty$4, {});
  const pl2 = project.playlist;
  const st = pl2.style;
  const audioCount = project.audio.items.length;
  const count = pl2.genCount ?? 0;
  const buildFromAudio = async () => {
    const items = project.audio.items;
    if (!items.length) {
      toast("error", "Import audio in the Audio panel first.");
      return;
    }
    const n2 = count > 0 ? Math.min(count, items.length) : items.length;
    const picked = shuffle(items).slice(0, n2);
    let start = 0;
    const built = [];
    for (const it of picked) {
      let dur = it.duration;
      if (!dur) {
        try {
          dur = (await window.masjavas.probe(it.path)).duration;
        } catch {
          dur = 180;
        }
      }
      built.push({ file: it.path, title: cleanTitle(it.name), start, duration: dur });
      start += dur;
    }
    patchProject((p2) => (p2.playlist.items = built, p2));
    toast("success", `Playlist dibuat: ${built.length} lagu (acak).`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Playlist Visual" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Builds a track list from your audio filenames. The active song highlights as the video plays." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Toggle,
        {
          label: "Aktifkan Playlist",
          value: showPlaylist(project),
          onChange: (v2) => patchProject((p2) => (p2.showPlaylist = v2, p2))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "soon", style: { fontSize: 11, marginTop: 6 }, children: "Saat aktif, daftar lagu tampil di video. Bisa dipakai bareng Lirik." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          label: `Jumlah lagu (0 = semua ${audioCount})`,
          min: 0,
          max: audioCount,
          step: 1,
          value: Math.min(count, audioCount),
          fmt: (v2) => v2 === 0 ? `Semua (${audioCount})` : String(v2),
          onChange: (v2) => patchProject((p2) => (p2.playlist.genCount = v2, p2))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "btn-row", style: { marginTop: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn primary", onClick: buildFromAudio, children: "Generate Playlist (Acak)" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "soon", style: { fontSize: 11, marginTop: 6 }, children: "Ambil lagu acak dari tab Audio. Klik lagi untuk urutan acak baru." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Style" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Font", value: st.fontFamily, options: fontOptionsWith(userFonts), onChange: (v2) => patchProject((p2) => (p2.playlist.style.fontFamily = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Font size", min: 16, max: 80, step: 2, value: st.fontSize, onChange: (v2) => patchProject((p2) => (p2.playlist.style.fontSize = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ColorInput, { label: "Active color", value: st.activeColor, onChange: (v2) => patchProject((p2) => (p2.playlist.style.activeColor = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ColorInput, { label: "Inactive color", value: st.inactiveColor, onChange: (v2) => patchProject((p2) => (p2.playlist.style.inactiveColor = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Line spacing", min: 0, max: 40, step: 2, value: st.spacing, onChange: (v2) => patchProject((p2) => (p2.playlist.style.spacing = v2, p2)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Placement, Icon & Box" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Position", value: st.position, options: [{ value: "top", label: "Top" }, { value: "center", label: "Center" }, { value: "bottom", label: "Bottom" }, { value: "custom", label: "Custom (X/Y)" }], onChange: (v2) => patchProject((p2) => (p2.playlist.style.position = v2, p2)) }),
        st.position === "custom" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Position X", min: 0, max: 1, step: 0.01, value: st.posX, fmt: (v2) => `${Math.round(v2 * 100)}%`, onChange: (v2) => patchProject((p2) => (p2.playlist.style.posX = v2, p2)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Position Y", min: 0, max: 1, step: 0.01, value: st.posY, fmt: (v2) => `${Math.round(v2 * 100)}%`, onChange: (v2) => patchProject((p2) => (p2.playlist.style.posY = v2, p2)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Active icon", value: st.iconStyle, options: [{ value: "triangle", label: "Triangle ▶" }, { value: "dot", label: "Dot ●" }, { value: "bars", label: "Bars ┃" }], onChange: (v2) => patchProject((p2) => (p2.playlist.style.iconStyle = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Background box", value: st.showBox, onChange: (v2) => patchProject((p2) => (p2.playlist.style.showBox = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Box opacity", min: 0, max: 1, step: 0.05, value: st.boxOpacity, onChange: (v2) => patchProject((p2) => (p2.playlist.style.boxOpacity = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Outline width", min: 0, max: 6, step: 1, value: st.strokeWidth, onChange: (v2) => patchProject((p2) => (p2.playlist.style.strokeWidth = v2, p2)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
        "Tracks (",
        pl2.items.length,
        ")"
      ] }),
      pl2.items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty", children: "No tracks. Build from audio above." }) : pl2.items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, marginBottom: 6, alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "val", style: { width: 30 }, children: i + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: "inp",
            style: { flex: 1 },
            value: it.title,
            onChange: (e) => patchProject((p2) => (p2.playlist.items[i].title = e.target.value, p2))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "val", style: { width: 60 }, children: [
          it.duration.toFixed(0),
          "s"
        ] })
      ] }, i))
    ] })
  ] });
}
function Empty$4() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-head", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Playlist Visual" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty", children: "Create or open a project first." })
  ] });
}
const PRESETS$1 = [
  { value: "modern-bars", label: "Modern Bars" },
  { value: "neon-bars", label: "Neon Bars" },
  { value: "rgb-bars", label: "RGB Bars" },
  { value: "mirror-bars", label: "Mirror Bars (symmetric)" },
  { value: "waveform-glow", label: "Waveform Glow" },
  { value: "oscilloscope", label: "Oscilloscope" },
  { value: "circular", label: "Circular Ring" },
  { value: "radial", label: "Radial (rotating)" },
  { value: "dna-twist", label: "DNA Twist" },
  { value: "spiral", label: "Spiral" },
  { value: "neon-tubes", label: "Neon Tubes" },
  { value: "hexagon", label: "Hexagon Grid" },
  { value: "orb-pulse", label: "Orb Pulse" },
  { value: "waterfall", label: "Waterfall" },
  { value: "minimal-line", label: "Minimal Line" },
  { value: "vintage-radio", label: "Vintage Radio Wave" },
  { value: "particle", label: "Particle Burst" },
  { value: "bass-pulse", label: "Bass Pulse" },
  { value: "smooth-jazz", label: "Smooth Jazz Glow" },
  { value: "youtube-music", label: "YouTube Music Style" }
];
function newLayer$1(id2) {
  return {
    id: id2,
    enabled: true,
    preset: "modern-bars",
    posX: 0.5,
    posY: 0.85,
    rotation: 0,
    scale: 0.35,
    radius: 0.25,
    thickness: 3,
    color: "#00e5ff",
    rgb: false,
    opacity: 1,
    glow: 0.3,
    smoothing: 0.6,
    sensitivity: 1.2,
    bassIntensity: 1.4,
    trebleIntensity: 0.9,
    bars: 64
  };
}
function LayerEditor$1({ layer, index }) {
  const [open, setOpen] = reactExports.useState(index === 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { marginBottom: 8 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }, onClick: () => setOpen((o) => !o), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Toggle,
        {
          label: "",
          value: layer.enabled,
          onChange: (v2) => patchProject((p2) => {
            const l2 = p2.spectrumLayers.find((x2) => x2.id === layer.id);
            if (l2) l2.enabled = v2;
            return p2;
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { flex: 1, fontWeight: 600, fontSize: 13 }, children: [
        "Layer ",
        index + 1,
        " — ",
        PRESETS$1.find((p2) => p2.value === layer.preset)?.label ?? layer.preset
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "btn",
          style: { padding: "2px 8px", fontSize: 11, color: "var(--danger, #f44)" },
          onClick: (e) => {
            e.stopPropagation();
            patchProject((p2) => {
              p2.spectrumLayers = p2.spectrumLayers.filter((x2) => x2.id !== layer.id);
              return p2;
            });
          },
          children: "✕"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 12, color: "var(--text-dim)" }, children: open ? "▲" : "▼" })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 10 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Select,
        {
          label: "Preset",
          value: layer.preset,
          options: PRESETS$1,
          onChange: (v2) => patchProject((p2) => {
            const l2 = p2.spectrumLayers.find((x2) => x2.id === layer.id);
            if (l2) l2.preset = v2;
            return p2;
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { margin: "10px 0 4px", fontSize: 12, color: "var(--text-dim)" }, children: "Posisi (seret di pratinjau atau gunakan slider)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          label: "Posisi X",
          min: 0,
          max: 1,
          step: 0.01,
          value: layer.posX,
          fmt: (v2) => `${Math.round(v2 * 100)}%`,
          onChange: (v2) => patchProject((p2) => {
            const l2 = p2.spectrumLayers.find((x2) => x2.id === layer.id);
            if (l2) l2.posX = v2;
            return p2;
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          label: "Posisi Y",
          min: 0,
          max: 1,
          step: 0.01,
          value: layer.posY,
          fmt: (v2) => `${Math.round(v2 * 100)}%`,
          onChange: (v2) => patchProject((p2) => {
            const l2 = p2.spectrumLayers.find((x2) => x2.id === layer.id);
            if (l2) l2.posY = v2;
            return p2;
          })
        }
      ),
      (() => {
        const setRot = (v2) => patchProject((p2) => {
          const l2 = p2.spectrumLayers.find((x2) => x2.id === layer.id);
          if (l2) l2.rotation = (Math.round(v2) % 360 + 360) % 360;
          return p2;
        });
        const snap = (v2) => {
          const t2 = Math.round(v2 / 45) * 45;
          return Math.abs(t2 - v2) <= 3 ? t2 : v2;
        };
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { display: "flex", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Rotasi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--text)", fontFamily: "var(--mono)" }, children: [
              layer.rotation,
              "°"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "range",
              min: 0,
              max: 360,
              step: 1,
              value: layer.rotation,
              style: { width: "100%", accentColor: "var(--accent)" },
              onChange: (e) => setRot(snap(parseFloat(e.target.value)))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6, marginTop: 6, alignItems: "center" }, children: [
            [0, 90, 180, 270].map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                className: `btn ${layer.rotation === a ? "primary" : ""}`,
                style: { padding: "3px 9px", fontSize: 11 },
                onClick: () => setRot(a),
                children: [
                  a,
                  "°"
                ]
              },
              a
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                min: 0,
                max: 360,
                step: 1,
                value: layer.rotation,
                onChange: (e) => setRot(parseFloat(e.target.value) || 0),
                style: { width: 64, marginLeft: "auto" },
                title: "Sudut tepat (derajat)"
              }
            )
          ] })
        ] });
      })(),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          label: "Tinggi",
          min: 0.05,
          max: 1,
          step: 0.01,
          value: layer.scale,
          fmt: (v2) => `${Math.round(v2 * 100)}%`,
          onChange: (v2) => patchProject((p2) => {
            const l2 = p2.spectrumLayers.find((x2) => x2.id === layer.id);
            if (l2) l2.scale = v2;
            return p2;
          })
        }
      ),
      (layer.preset === "circular" || layer.preset === "radial" || layer.preset === "spiral" || layer.preset === "orb-pulse") && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          label: "Radius",
          min: 0.05,
          max: 0.5,
          step: 0.01,
          value: layer.radius,
          fmt: (v2) => `${Math.round(v2 * 100)}%`,
          onChange: (v2) => patchProject((p2) => {
            const l2 = p2.spectrumLayers.find((x2) => x2.id === layer.id);
            if (l2) l2.radius = v2;
            return p2;
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          label: "Jumlah batang",
          min: 16,
          max: 256,
          step: 4,
          value: layer.bars,
          onChange: (v2) => patchProject((p2) => {
            const l2 = p2.spectrumLayers.find((x2) => x2.id === layer.id);
            if (l2) l2.bars = v2;
            return p2;
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { margin: "10px 0 4px", fontSize: 12, color: "var(--text-dim)" }, children: "Tampilan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ColorInput,
        {
          label: "Warna",
          value: layer.color,
          onChange: (v2) => patchProject((p2) => {
            const l2 = p2.spectrumLayers.find((x2) => x2.id === layer.id);
            if (l2) l2.color = v2;
            return p2;
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Toggle,
        {
          label: "Warna pelangi (RGB)",
          value: layer.rgb,
          onChange: (v2) => patchProject((p2) => {
            const l2 = p2.spectrumLayers.find((x2) => x2.id === layer.id);
            if (l2) l2.rgb = v2;
            return p2;
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          label: "Transparansi",
          min: 0,
          max: 1,
          step: 0.05,
          value: layer.opacity,
          onChange: (v2) => patchProject((p2) => {
            const l2 = p2.spectrumLayers.find((x2) => x2.id === layer.id);
            if (l2) l2.opacity = v2;
            return p2;
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          label: "Cahaya",
          min: 0,
          max: 1,
          step: 0.05,
          value: layer.glow,
          onChange: (v2) => patchProject((p2) => {
            const l2 = p2.spectrumLayers.find((x2) => x2.id === layer.id);
            if (l2) l2.glow = v2;
            return p2;
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          label: "Ketebalan",
          min: 1,
          max: 20,
          step: 1,
          value: layer.thickness,
          onChange: (v2) => patchProject((p2) => {
            const l2 = p2.spectrumLayers.find((x2) => x2.id === layer.id);
            if (l2) l2.thickness = v2;
            return p2;
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { margin: "10px 0 4px", fontSize: 12, color: "var(--text-dim)" }, children: "Respons Audio" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          label: "Sensitivitas",
          min: 0.2,
          max: 4,
          step: 0.1,
          value: layer.sensitivity,
          onChange: (v2) => patchProject((p2) => {
            const l2 = p2.spectrumLayers.find((x2) => x2.id === layer.id);
            if (l2) l2.sensitivity = v2;
            return p2;
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          label: "Kehalusan",
          min: 0,
          max: 0.95,
          step: 0.05,
          value: layer.smoothing,
          onChange: (v2) => patchProject((p2) => {
            const l2 = p2.spectrumLayers.find((x2) => x2.id === layer.id);
            if (l2) l2.smoothing = v2;
            return p2;
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          label: "Penguatan bass",
          min: 0.2,
          max: 4,
          step: 0.1,
          value: layer.bassIntensity,
          onChange: (v2) => patchProject((p2) => {
            const l2 = p2.spectrumLayers.find((x2) => x2.id === layer.id);
            if (l2) l2.bassIntensity = v2;
            return p2;
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          label: "Penguatan treble",
          min: 0.2,
          max: 4,
          step: 0.1,
          value: layer.trebleIntensity,
          onChange: (v2) => patchProject((p2) => {
            const l2 = p2.spectrumLayers.find((x2) => x2.id === layer.id);
            if (l2) l2.trebleIntensity = v2;
            return p2;
          })
        }
      )
    ] })
  ] });
}
function SpectrumPanel() {
  const project = useProject();
  if (!project) return /* @__PURE__ */ jsxRuntimeExports.jsx(Empty$3, {});
  const layers = project.spectrumLayers ?? [];
  const s = project.spectrum;
  const addLayer = () => {
    const id2 = `sl_${Date.now()}`;
    patchProject((p2) => {
      p2.spectrumLayers = [...p2.spectrumLayers ?? [], newLayer$1(id2)];
      return p2;
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Layer Spektrum" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tambahkan beberapa layer visualisasi spektrum. Setiap layer punya preset, posisi, rotasi, dan tampilan sendiri. Seret di pratinjau untuk memindahkan posisi." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { margin: "0 0 8px" }, children: "Mode Spektrum" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `btn ${!isReactive(project) ? "primary" : ""}`,
            style: { flex: 1 },
            onClick: () => patchProject((p2) => (p2.spectrumMode = "static", p2)),
            children: "Statis (cepat)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `btn ${isReactive(project) ? "primary" : ""}`,
            style: { flex: 1 },
            onClick: () => patchProject((p2) => (p2.spectrumMode = "reactive", p2)),
            children: "Full Reaktif (akurat)"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "soon", style: { fontSize: 11, marginTop: 8, lineHeight: 1.5 }, children: isReactive(project) ? "Full Reaktif: analisa seluruh durasi — tiap detik ikut beat asli. Render lebih lama. Berlaku ke spectrum bar, overlay & ring logo sekaligus." : "Statis: analisa irama awal lalu di-loop. Render cepat (cocok durasi panjang / batch). Berlaku ke spectrum bar, overlay & ring logo sekaligus." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { margin: 0 }, children: [
          "Layer (",
          layers.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn primary", style: { padding: "4px 12px", fontSize: 12 }, onClick: addLayer, children: "+ Tambah Layer" })
      ] }),
      layers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty", children: 'Belum ada layer spektrum. Klik "+ Tambah Layer" untuk membuat.' })
    ] }),
    layers.map((layer, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(LayerEditor$1, { layer, index: i }, layer.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { marginTop: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Spektrum Tunggal (klasik)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "soon", style: { fontSize: 11 }, children: "Konfigurasi spektrum lama untuk kompatibilitas. Gunakan Layer di atas untuk kontrol penuh." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Aktifkan spektrum klasik", value: s.enabled, onChange: (v2) => patchProject((p2) => (p2.spectrum.enabled = v2, p2)) }),
      s.enabled && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Preset", value: s.preset, options: PRESETS$1, onChange: (v2) => patchProject((p2) => (p2.spectrum.preset = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Select,
          {
            label: "Posisi",
            value: s.position,
            options: [
              { value: "top", label: "Atas" },
              { value: "center", label: "Tengah" },
              { value: "bottom", label: "Bawah" }
            ],
            onChange: (v2) => patchProject((p2) => (p2.spectrum.position = v2, p2))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Tinggi", min: 0.05, max: 0.9, step: 0.01, value: s.scale, fmt: (v2) => `${Math.round(v2 * 100)}%`, onChange: (v2) => patchProject((p2) => (p2.spectrum.scale = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Jumlah batang", min: 16, max: 128, step: 4, value: s.bars, onChange: (v2) => patchProject((p2) => (p2.spectrum.bars = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ColorInput, { label: "Warna", value: s.color, onChange: (v2) => patchProject((p2) => (p2.spectrum.color = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Warna pelangi (RGB)", value: s.rgb, onChange: (v2) => patchProject((p2) => (p2.spectrum.rgb = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Transparansi", min: 0, max: 1, step: 0.05, value: s.opacity, onChange: (v2) => patchProject((p2) => (p2.spectrum.opacity = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Cahaya", min: 0, max: 1, step: 0.05, value: s.glow, onChange: (v2) => patchProject((p2) => (p2.spectrum.glow = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Sensitivitas", min: 0.2, max: 3, step: 0.1, value: s.sensitivity, onChange: (v2) => patchProject((p2) => (p2.spectrum.sensitivity = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Kehalusan", min: 0, max: 1, step: 0.05, value: s.smoothing, onChange: (v2) => patchProject((p2) => (p2.spectrum.smoothing = v2, p2)) })
      ] })
    ] })
  ] });
}
function Empty$3() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-head", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Layer Spektrum" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty", children: "Buat atau buka proyek terlebih dahulu." })
  ] });
}
const RING_STYLE_OPTIONS = [
  { value: "bars", label: "Batang (klasik)" },
  { value: "dots", label: "Titik berdenyut" },
  { value: "wave", label: "Gelombang isi (blob)" },
  { value: "line", label: "Garis menyala (outline)" },
  { value: "spike", label: "Gelombang tajam (agresif)" },
  { value: "double", label: "Gelombang ganda (2 garis)" },
  { value: "teeth", label: "Blob + gerigi rim" },
  { value: "ribbon", label: "Pita tebal (band)" },
  { value: "mirror", label: "Mirror (spike simetris)" },
  { value: "led", label: "LED block (equalizer)" },
  // bar-family
  { value: "barsTaper", label: "Batang runcing (segitiga)" },
  { value: "barsCap", label: "Batang + titik ujung" },
  { value: "pins", label: "Jarum + titik" },
  { value: "blocks2", label: "Balok besar (LED kasar)" },
  { value: "wedge", label: "Irisan padat (wedge)" },
  // wave-family
  { value: "waveDots", label: "Gelombang titik (dotted)" },
  { value: "blobSoft", label: "Blob lembut (sangat mulus)" },
  { value: "waveFillRainbow", label: "Blob isi pelangi" },
  { value: "petals", label: "Kelopak (petals)" },
  { value: "spikeMirror", label: "Gelombang tajam mirror" }
];
function bandLen(o, v2) {
  return o.minDim * 0.08 * v2 + o.thickness;
}
function bassEnergy(frame) {
  if (!frame.length) return 0;
  const k2 = Math.max(1, Math.round(frame.length * 0.25));
  let s = 0;
  for (let i = 0; i < k2; i++) s += frame[i] || 0;
  return Math.min(1, s / k2);
}
function smoothRadii(o, passes = 1) {
  const n2 = o.bars;
  const raw = new Array(n2);
  const amp = o.minDim * 0.18;
  for (let i = 0; i < n2; i++) {
    const v2 = Math.min(1, (o.frame[i % o.frame.length] || 0) * o.intensity);
    const len = amp * Math.pow(v2, 0.7) + o.thickness;
    raw[i] = o.mode === "inside" ? Math.max(0, o.ringBase - len) : o.mode === "around" ? o.ringBase + (len - o.thickness) / 2 : o.ringBase + len;
  }
  let cur = raw;
  for (let p2 = 0; p2 < passes; p2++) {
    const next = new Array(n2);
    for (let i = 0; i < n2; i++) {
      const a = cur[(i - 1 + n2) % n2];
      const b = cur[i];
      const c = cur[(i + 1) % n2];
      next[i] = a * 0.25 + b * 0.5 + c * 0.25;
    }
    cur = next;
  }
  return cur;
}
const WAVE_FAMILY = /* @__PURE__ */ new Set([
  "wave",
  "line",
  "spike",
  "double",
  "teeth",
  "ribbon",
  "waveDots",
  "blobSoft",
  "waveFillRainbow",
  "petals",
  "spikeMirror"
]);
function innerOuter(o, len) {
  if (o.mode === "inside") return { outer: o.ringBase, inner: Math.max(0, o.ringBase - len) };
  if (o.mode === "around") return { inner: Math.max(0, o.ringBase - len / 2), outer: o.ringBase + len / 2 };
  return { inner: o.ringBase, outer: o.ringBase + len };
}
function drawRingBands(ctx, o) {
  const n2 = o.bars;
  if (n2 <= 0) return;
  const step = Math.PI * 2 / n2;
  const glowScale = o.glowScale ?? 30;
  ctx.save();
  if (o.glow > 0.02) {
    ctx.shadowBlur = o.glow * glowScale;
    ctx.shadowColor = o.rgb ? "#ffffff" : o.color;
  }
  ctx.lineWidth = o.thickness;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const valAt = (i) => Math.min(1, (o.frame[i % o.frame.length] || 0) * o.intensity);
  const ang = (i) => i * step - Math.PI / 2;
  if (WAVE_FAMILY.has(o.style)) {
    const passes = o.style === "spike" || o.style === "spikeMirror" ? 0 : o.style === "blobSoft" ? 3 : 1;
    const r2 = smoothRadii(o, passes);
    const px = new Array(n2);
    const py = new Array(n2);
    for (let i = 0; i < n2; i++) {
      const a = ang(i);
      px[i] = o.cx + Math.cos(a) * r2[i];
      py[i] = o.cy + Math.sin(a) * r2[i];
    }
    const sharp = o.style === "spike" || o.style === "spikeMirror";
    const buildPathAt = (rad) => {
      const qx = (i) => o.cx + Math.cos(ang(i)) * rad[i];
      const qy = (i) => o.cy + Math.sin(ang(i)) * rad[i];
      ctx.beginPath();
      if (sharp) {
        ctx.moveTo(qx(0), qy(0));
        for (let i = 1; i < n2; i++) ctx.lineTo(qx(i), qy(i));
      } else {
        const m0x = (qx(n2 - 1) + qx(0)) / 2;
        const m0y = (qy(n2 - 1) + qy(0)) / 2;
        ctx.moveTo(m0x, m0y);
        for (let i = 0; i < n2; i++) {
          const ex = (qx(i) + qx((i + 1) % n2)) / 2;
          const ey = (qy(i) + qy((i + 1) % n2)) / 2;
          ctx.quadraticCurveTo(qx(i), qy(i), ex, ey);
        }
      }
      ctx.closePath();
    };
    const buildPath = () => buildPathAt(r2);
    const makeRainbow = () => {
      const grad = ctx.createConicGradient(o.t * Math.PI * 2 - Math.PI / 2, o.cx, o.cy);
      const STOPS = 12;
      for (let s = 0; s <= STOPS; s++) grad.addColorStop(s / STOPS, `hsl(${s / STOPS * 360}, 95%, 60%)`);
      return grad;
    };
    const canConic = o.rgb && typeof ctx.createConicGradient === "function";
    const strokePath = (rad) => {
      if (canConic) {
        buildPathAt(rad);
        ctx.strokeStyle = makeRainbow();
        ctx.stroke();
      } else if (o.rgb) {
        for (let i = 0; i < n2; i++) {
          const a0 = ang(i);
          const a1 = ang((i + 1) % n2);
          ctx.strokeStyle = o.colorAt(i, n2, valAt(i));
          ctx.beginPath();
          ctx.moveTo(o.cx + Math.cos(a0) * rad[i], o.cy + Math.sin(a0) * rad[i]);
          ctx.lineTo(o.cx + Math.cos(a1) * rad[(i + 1) % n2], o.cy + Math.sin(a1) * rad[(i + 1) % n2]);
          ctx.stroke();
        }
      } else {
        buildPathAt(rad);
        ctx.strokeStyle = o.color;
        ctx.stroke();
      }
    };
    if (o.style === "wave" || o.style === "spike" || o.style === "teeth" || o.style === "blobSoft") {
      buildPath();
      ctx.fillStyle = o.color;
      ctx.fill();
    }
    if (o.style === "waveFillRainbow") {
      buildPath();
      if (o.rgb && typeof ctx.createRadialGradient === "function") {
        const maxR = Math.max(...r2);
        const g = ctx.createRadialGradient(o.cx, o.cy, Math.max(1, o.ringBase * 0.3), o.cx, o.cy, Math.max(2, maxR));
        const base = o.t * 360 % 360;
        const STOPS = 6;
        for (let s = 0; s <= STOPS; s++) g.addColorStop(s / STOPS, `hsl(${(base + s / STOPS * 300) % 360}, 90%, 58%)`);
        ctx.fillStyle = g;
      } else {
        ctx.fillStyle = o.color;
      }
      ctx.fill();
    }
    if (o.style === "ribbon") {
      const baseR = Math.max(0, o.ringBase - o.minDim * 0.02);
      buildPath();
      ctx.arc(o.cx, o.cy, baseR, 0, Math.PI * 2);
      ctx.fillStyle = o.color;
      ctx.fill();
    }
    if (o.style === "petals") {
      const rainbow = canConic ? makeRainbow() : null;
      const half = step * 0.5;
      for (let i = 0; i < n2; i++) {
        const a = ang(i);
        const baseR = o.ringBase;
        const tipX = o.cx + Math.cos(a) * r2[i];
        const tipY = o.cy + Math.sin(a) * r2[i];
        const lx = o.cx + Math.cos(a - half) * baseR;
        const ly = o.cy + Math.sin(a - half) * baseR;
        const rx = o.cx + Math.cos(a + half) * baseR;
        const ry = o.cy + Math.sin(a + half) * baseR;
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.quadraticCurveTo(tipX, tipY, rx, ry);
        ctx.quadraticCurveTo(o.cx + Math.cos(a) * baseR, o.cy + Math.sin(a) * baseR, lx, ly);
        ctx.closePath();
        ctx.fillStyle = rainbow ?? (o.rgb ? o.colorAt(i, n2, valAt(i)) : o.color);
        ctx.fill();
      }
      ctx.restore();
      return;
    }
    if (o.style === "waveDots") {
      const rainbow = canConic ? makeRainbow() : null;
      for (let i = 0; i < n2; i++) {
        const dotR = o.thickness * 0.6 + o.minDim * 0.012 * valAt(i);
        ctx.fillStyle = rainbow ?? (o.rgb ? o.colorAt(i, n2, valAt(i)) : o.color);
        ctx.beginPath();
        ctx.arc(px[i], py[i], Math.max(1, dotR), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      return;
    }
    strokePath(r2);
    if (o.style === "double") {
      const r22 = r2.map((v2) => Math.max(0, v2 - o.minDim * 0.04 - o.thickness));
      strokePath(r22);
    }
    if (o.style === "spikeMirror") {
      const rIn = r2.map((v2) => Math.max(0, 2 * o.ringBase - v2));
      strokePath(rIn);
    }
    if (o.style === "teeth") {
      const rainbow = canConic ? makeRainbow() : null;
      for (let i = 0; i < n2; i++) {
        const a = ang(i);
        const cos = Math.cos(a);
        const sin = Math.sin(a);
        const tick = o.thickness * 1.6 + o.minDim * 0.012 * valAt(i);
        ctx.strokeStyle = rainbow ?? (o.rgb ? o.colorAt(i, n2, valAt(i)) : o.color);
        ctx.beginPath();
        ctx.moveTo(o.cx + cos * r2[i], o.cy + sin * r2[i]);
        ctx.lineTo(o.cx + cos * (r2[i] + tick), o.cy + sin * (r2[i] + tick));
        ctx.stroke();
      }
    }
    ctx.restore();
    return;
  }
  for (let i = 0; i < n2; i++) {
    const v2 = valAt(i);
    const len = bandLen(o, v2);
    const a = ang(i);
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    const col = o.colorAt(i, n2, v2);
    if (o.style === "dots") {
      const dotR = o.thickness * 0.5 + o.minDim * 0.05 * v2;
      const r2 = o.ringBase;
      ctx.beginPath();
      ctx.arc(o.cx + cos * r2, o.cy + sin * r2, Math.max(1, dotR), 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
      continue;
    }
    if (o.style === "mirror") {
      const inner2 = Math.max(0, o.ringBase - len / 2);
      const outer2 = o.ringBase + len / 2;
      ctx.strokeStyle = col;
      ctx.beginPath();
      ctx.moveTo(o.cx + cos * inner2, o.cy + sin * inner2);
      ctx.lineTo(o.cx + cos * outer2, o.cy + sin * outer2);
      ctx.stroke();
      continue;
    }
    if (o.style === "led" || o.style === "blocks2") {
      const { inner: inner2, outer: outer2 } = innerOuter(o, len);
      const dir = outer2 >= inner2 ? 1 : -1;
      const total = Math.abs(outer2 - inner2);
      const block = Math.max(2, o.minDim * (o.style === "blocks2" ? 0.03 : 0.016));
      const gap = block * (o.style === "blocks2" ? 0.8 : 0.6);
      ctx.lineCap = "butt";
      ctx.strokeStyle = col;
      let d = 0;
      while (d < total) {
        const r0 = inner2 + dir * d;
        const r1 = inner2 + dir * Math.min(d + block, total);
        ctx.beginPath();
        ctx.moveTo(o.cx + cos * r0, o.cy + sin * r0);
        ctx.lineTo(o.cx + cos * r1, o.cy + sin * r1);
        ctx.stroke();
        d += block + gap;
      }
      ctx.lineCap = "round";
      continue;
    }
    if (o.style === "barsTaper") {
      const { inner: inner2, outer: outer2 } = innerOuter(o, len);
      const hw = o.thickness;
      const px0 = o.cx + cos * inner2;
      const py0 = o.cy + sin * inner2;
      const tx = o.cx + cos * outer2;
      const ty = o.cy + sin * outer2;
      ctx.beginPath();
      ctx.moveTo(px0 - sin * hw, py0 + cos * hw);
      ctx.lineTo(tx, ty);
      ctx.lineTo(px0 + sin * hw, py0 - cos * hw);
      ctx.closePath();
      ctx.fillStyle = col;
      ctx.fill();
      continue;
    }
    if (o.style === "barsCap" || o.style === "pins") {
      const { inner: inner2, outer: outer2 } = innerOuter(o, len);
      const thin = o.style === "pins";
      ctx.lineWidth = thin ? Math.max(1, o.thickness * 0.35) : o.thickness;
      ctx.strokeStyle = col;
      ctx.beginPath();
      ctx.moveTo(o.cx + cos * inner2, o.cy + sin * inner2);
      ctx.lineTo(o.cx + cos * outer2, o.cy + sin * outer2);
      ctx.stroke();
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(o.cx + cos * outer2, o.cy + sin * outer2, Math.max(1, o.thickness * (thin ? 1.1 : 0.8)), 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = o.thickness;
      continue;
    }
    if (o.style === "wedge") {
      const { inner: inner2, outer: outer2 } = innerOuter(o, len);
      const half = step * 0.46;
      ctx.beginPath();
      ctx.moveTo(o.cx + Math.cos(a - half) * inner2, o.cy + Math.sin(a - half) * inner2);
      ctx.lineTo(o.cx + Math.cos(a - half) * outer2, o.cy + Math.sin(a - half) * outer2);
      ctx.lineTo(o.cx + Math.cos(a + half) * outer2, o.cy + Math.sin(a + half) * outer2);
      ctx.lineTo(o.cx + Math.cos(a + half) * inner2, o.cy + Math.sin(a + half) * inner2);
      ctx.closePath();
      ctx.fillStyle = col;
      ctx.fill();
      continue;
    }
    const { inner, outer } = innerOuter(o, len);
    ctx.strokeStyle = col;
    ctx.beginPath();
    ctx.moveTo(o.cx + cos * inner, o.cy + sin * inner);
    ctx.lineTo(o.cx + cos * outer, o.cy + sin * outer);
    ctx.stroke();
  }
  ctx.restore();
}
const PARTICLE_STYLE_OPTIONS = [
  { value: "burst", label: "Ledakan radial" },
  { value: "fireworks", label: "Kembang api" },
  { value: "fountain", label: "Air mancur (ke atas)" },
  { value: "embers", label: "Bara melayang" },
  { value: "sparkle", label: "Kelap-kelip" },
  { value: "triangles", label: "Segitiga melesat (ekor)" },
  { value: "chevrons", label: "Panah chevron (ekor)" },
  { value: "comet", label: "Komet (ekor panjang)" },
  { value: "hearts", label: "Hati / love (ekor)" },
  { value: "leaves", label: "Daun (ekor)" },
  { value: "stars", label: "Bintang (ekor)" },
  { value: "diamonds", label: "Wajik / diamond (ekor)" },
  { value: "rings", label: "Cincin (ekor)" }
];
const SHAPE_STYLE = {
  hearts: 4,
  leaves: 5,
  stars: 6,
  diamonds: 7,
  rings: 8
};
function createParticleField() {
  return { parts: [], prevEnergy: 0 };
}
const BASS_GATE = 0.18;
const RISE_GATE = 0.04;
const MAX_PARTICLES = 700;
function rand(a, b) {
  return a + Math.random() * (b - a);
}
function stepParticles(ctx, field, o) {
  const dt = Math.max(1e-4, Math.min(3, o.dt));
  const style = o.style ?? "burst";
  const md2 = o.minDim;
  const spawnR = o.spawnRadius ?? 0;
  const spd = Math.max(0.1, o.speed ?? 1);
  const rise = o.energy - field.prevEnergy;
  field.prevEnergy = o.energy;
  const loud = o.energy > BASS_GATE;
  const beat = loud && (o.forceBurst === true || rise > RISE_GATE * dt);
  const over = loud ? Math.min(1, (o.energy - BASS_GATE) / (1 - BASS_GATE)) : 0;
  const hue0 = o.t * 120 % 360;
  const room = field.parts.length < MAX_PARTICLES;
  const push = (p2) => {
    if (field.parts.length < MAX_PARTICLES) field.parts.push(p2);
  };
  if (room) {
    if (style === "burst" && beat) {
      const count = Math.round(rand(20, 38) + over * 24);
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = md2 * 0.03 * spd * rand(0.55, 1.45);
        push({ x: o.cx + Math.cos(a) * spawnR, y: o.cy + Math.sin(a) * spawnR, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, gy: 0, life: 1, maxLife: 1, size: md2 * rand(6e-3, 0.016), hue: (hue0 + i * 9) % 360, twinkle: false, shape: 0, spin: a });
      }
    } else if (style === "fireworks" && beat) {
      const count = Math.round(rand(30, 56) + over * 30);
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = md2 * 0.05 * spd * rand(0.5, 1.5);
        push({ x: o.cx + Math.cos(a) * spawnR, y: o.cy + Math.sin(a) * spawnR, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, gy: md2 * 9e-4, life: 1, maxLife: 1, size: md2 * rand(5e-3, 0.012), hue: (hue0 + i * 7) % 360, twinkle: false, shape: 0, spin: a });
      }
    } else if (style === "fountain" && beat) {
      const count = Math.round(rand(16, 32) + over * 24);
      for (let i = 0; i < count; i++) {
        const a = -Math.PI / 2 + rand(-0.6, 0.6);
        const sp = md2 * 0.05 * spd * rand(0.7, 1.4);
        push({ x: o.cx + rand(-spawnR * 0.4, spawnR * 0.4), y: o.cy + spawnR * 0.4, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, gy: md2 * 11e-4, life: 1, maxLife: 1, size: md2 * rand(5e-3, 0.012), hue: (hue0 + i * 8) % 360, twinkle: false, shape: 0, spin: a });
      }
    } else if (style === "embers" && loud) {
      const rate = Math.round(over * 6 * dt);
      for (let i = 0; i < rate; i++) {
        const a = Math.random() * Math.PI * 2;
        push({ x: o.cx + Math.cos(a) * spawnR * rand(0.8, 1.1), y: o.cy + Math.sin(a) * spawnR * rand(0.8, 1.1), vx: rand(-0.4, 0.4) * md2 * 3e-3 * spd, vy: -md2 * 6e-3 * spd * rand(0.6, 1.3), gy: -md2 * 15e-5, life: 1, maxLife: 1, size: md2 * rand(4e-3, 9e-3), hue: (hue0 + i * 11) % 360, twinkle: false, shape: 0, spin: 0 });
      }
    } else if (style === "sparkle" && loud) {
      const rate = Math.round(over * 4 * dt + (beat ? 6 : 0));
      for (let i = 0; i < rate; i++) {
        const a = Math.random() * Math.PI * 2;
        const rr = spawnR * rand(1, 1.6);
        push({ x: o.cx + Math.cos(a) * rr, y: o.cy + Math.sin(a) * rr, vx: 0, vy: 0, gy: 0, life: 1, maxLife: 1, size: md2 * rand(4e-3, 9e-3), hue: (hue0 + i * 13) % 360, twinkle: true, shape: 0, spin: 0 });
      }
    } else if ((style === "triangles" || style === "chevrons") && beat) {
      const shape = style === "triangles" ? 1 : 2;
      const count = Math.round(rand(8, 16) + over * 12);
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = md2 * 0.025 * spd * rand(0.6, 1.3);
        push({ x: o.cx + Math.cos(a) * spawnR, y: o.cy + Math.sin(a) * spawnR, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, gy: 0, life: 1, maxLife: 1, size: md2 * rand(0.016, 0.028), hue: (hue0 + i * 12) % 360, twinkle: false, shape, spin: a });
      }
    } else if (style === "comet" && beat) {
      const count = Math.round(rand(6, 12) + over * 10);
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = md2 * 0.035 * spd * rand(0.7, 1.4);
        push({ x: o.cx + Math.cos(a) * spawnR, y: o.cy + Math.sin(a) * spawnR, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, gy: 0, life: 1, maxLife: 1, size: md2 * rand(0.01, 0.018), hue: (hue0 + i * 14) % 360, twinkle: false, shape: 3, spin: a });
      }
    } else if (SHAPE_STYLE[style] !== void 0 && beat) {
      const shape = SHAPE_STYLE[style];
      const count = Math.round(rand(6, 12) + over * 10);
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = md2 * 0.025 * spd * rand(0.6, 1.3);
        push({ x: o.cx + Math.cos(a) * spawnR, y: o.cy + Math.sin(a) * spawnR, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, gy: 0, life: 1, maxLife: 1, size: md2 * rand(0.018, 0.03), hue: (hue0 + i * 12) % 360, twinkle: false, shape, spin: a });
      }
    }
  }
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.lineJoin = "round";
  const drag = Math.pow(0.95, dt);
  const next = [];
  for (const p2 of field.parts) {
    p2.vy += p2.gy * dt;
    p2.x += p2.vx * dt;
    p2.y += p2.vy * dt;
    p2.vx *= drag;
    if (p2.gy === 0) p2.vy *= drag;
    if (p2.shape !== 0) p2.spin = Math.atan2(p2.vy, p2.vx);
    const decay = (p2.twinkle ? 0.05 : p2.shape >= 3 ? 9e-3 : p2.shape !== 0 ? 0.015 : 0.02) * dt;
    p2.life -= decay;
    if (p2.life <= 0) continue;
    next.push(p2);
    let alpha = Math.max(0, p2.life / p2.maxLife);
    if (p2.twinkle) alpha *= 0.4 + 0.6 * Math.abs(Math.sin((o.t + p2.hue) * 6));
    const col = o.rgb ? `hsl(${p2.hue}, 95%, 62%)` : o.color;
    const gr = p2.size * 2.2;
    ctx.globalAlpha = alpha * 0.32;
    ctx.fillStyle = o.rgb ? `hsl(${p2.hue}, 95%, 70%)` : o.color;
    ctx.beginPath();
    ctx.arc(p2.x, p2.y, Math.max(1, gr), 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = alpha;
    if (p2.shape === 0) {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(p2.x, p2.y, Math.max(0.5, p2.size * (0.6 + alpha * 0.4)), 0, Math.PI * 2);
      ctx.fill();
    } else if (p2.shape === 1) {
      drawTriangle(ctx, p2, col);
    } else if (p2.shape === 2) {
      drawChevron(ctx, p2, col);
    } else if (p2.shape === 3) {
      drawComet(ctx, p2, col);
    } else if (p2.shape === 4) {
      drawHeart(ctx, p2, col);
    } else if (p2.shape === 5) {
      drawLeaf(ctx, p2, col);
    } else if (p2.shape === 6) {
      drawStar(ctx, p2, col);
    } else if (p2.shape === 7) {
      drawDiamond(ctx, p2, col);
    } else {
      drawRingShape(ctx, p2, col);
    }
  }
  field.parts = next;
  ctx.shadowBlur = 0;
  ctx.restore();
}
function drawTail(ctx, p2, col, alpha, lenMul, wMul = 0.5) {
  const c = Math.cos(p2.spin);
  const sn = Math.sin(p2.spin);
  const L2 = p2.size * lenMul;
  const w2 = p2.size * wMul;
  const hlx = p2.x - sn * w2;
  const hly = p2.y + c * w2;
  const hrx = p2.x + sn * w2;
  const hry = p2.y - c * w2;
  const tx = p2.x - c * L2;
  const ty = p2.y - sn * L2;
  if (typeof ctx.createLinearGradient === "function") {
    const g = ctx.createLinearGradient(p2.x, p2.y, tx, ty);
    g.addColorStop(0, col);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
  } else {
    ctx.globalAlpha = alpha * 0.5;
    ctx.fillStyle = col;
  }
  ctx.beginPath();
  ctx.moveTo(hlx, hly);
  ctx.lineTo(hrx, hry);
  ctx.lineTo(tx, ty);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = alpha;
}
function drawTriangle(ctx, p2, col) {
  drawTail(ctx, p2, col, ctx.globalAlpha, 10);
  const s = p2.size;
  const c = Math.cos(p2.spin);
  const sn = Math.sin(p2.spin);
  const pt = (lx, ly) => [p2.x + lx * c - ly * sn, p2.y + lx * sn + ly * c];
  const [ax, ay] = pt(s, 0);
  const [bx, by] = pt(-s * 0.7, s * 0.7);
  const [dx, dy] = pt(-s * 0.7, -s * 0.7);
  ctx.strokeStyle = col;
  ctx.lineWidth = Math.max(1, s * 0.18);
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.lineTo(dx, dy);
  ctx.closePath();
  ctx.stroke();
}
function drawChevron(ctx, p2, col) {
  drawTail(ctx, p2, col, ctx.globalAlpha, 10);
  const s = p2.size;
  const c = Math.cos(p2.spin);
  const sn = Math.sin(p2.spin);
  const pt = (lx, ly) => [p2.x + lx * c - ly * sn, p2.y + lx * sn + ly * c];
  ctx.strokeStyle = col;
  ctx.lineWidth = Math.max(1, s * 0.16);
  for (let k2 = 0; k2 < 2; k2++) {
    const off = -s * 0.5 + k2 * s * 0.7;
    const [a1x, a1y] = pt(off, -s * 0.7);
    const [a2x, a2y] = pt(off + s * 0.7, 0);
    const [a3x, a3y] = pt(off, s * 0.7);
    ctx.beginPath();
    ctx.moveTo(a1x, a1y);
    ctx.lineTo(a2x, a2y);
    ctx.lineTo(a3x, a3y);
    ctx.stroke();
  }
}
function drawComet(ctx, p2, col) {
  drawTail(ctx, p2, col, ctx.globalAlpha, 18, 0.9);
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.arc(p2.x, p2.y, Math.max(1, p2.size), 0, Math.PI * 2);
  ctx.fill();
}
function drawHeart(ctx, p2, col) {
  drawTail(ctx, p2, col, ctx.globalAlpha, 10);
  const k2 = p2.size / 16;
  ctx.fillStyle = col;
  ctx.beginPath();
  const N2 = 22;
  for (let i = 0; i <= N2; i++) {
    const t2 = i / N2 * Math.PI * 2;
    const hx = 16 * Math.pow(Math.sin(t2), 3);
    const hy = -(13 * Math.cos(t2) - 5 * Math.cos(2 * t2) - 2 * Math.cos(3 * t2) - Math.cos(4 * t2));
    const x2 = p2.x + hx * k2;
    const y2 = p2.y + hy * k2;
    if (i === 0) ctx.moveTo(x2, y2);
    else ctx.lineTo(x2, y2);
  }
  ctx.closePath();
  ctx.fill();
}
function drawLeaf(ctx, p2, col) {
  drawTail(ctx, p2, col, ctx.globalAlpha, 10);
  const s = p2.size;
  const c = Math.cos(p2.spin);
  const sn = Math.sin(p2.spin);
  const pt = (lx, ly) => [p2.x + lx * c - ly * sn, p2.y + lx * sn + ly * c];
  const [tipX, tipY] = pt(s * 1.3, 0);
  const [baseX, baseY] = pt(-s * 1.3, 0);
  const [c1x, c1y] = pt(0, s * 0.8);
  const [c2x, c2y] = pt(0, -s * 0.8);
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.moveTo(tipX, tipY);
  ctx.quadraticCurveTo(c1x, c1y, baseX, baseY);
  ctx.quadraticCurveTo(c2x, c2y, tipX, tipY);
  ctx.closePath();
  ctx.fill();
}
function drawStar(ctx, p2, col) {
  drawTail(ctx, p2, col, ctx.globalAlpha, 10);
  const s = p2.size;
  ctx.strokeStyle = col;
  ctx.lineWidth = Math.max(1, s * 0.16);
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const rr = i % 2 === 0 ? s : s * 0.42;
    const a = -Math.PI / 2 + i / 10 * Math.PI * 2;
    const x2 = p2.x + Math.cos(a) * rr;
    const y2 = p2.y + Math.sin(a) * rr;
    if (i === 0) ctx.moveTo(x2, y2);
    else ctx.lineTo(x2, y2);
  }
  ctx.closePath();
  ctx.stroke();
}
function drawDiamond(ctx, p2, col) {
  drawTail(ctx, p2, col, ctx.globalAlpha, 10);
  const s = p2.size;
  ctx.strokeStyle = col;
  ctx.lineWidth = Math.max(1, s * 0.18);
  ctx.beginPath();
  ctx.moveTo(p2.x, p2.y - s);
  ctx.lineTo(p2.x + s * 0.7, p2.y);
  ctx.lineTo(p2.x, p2.y + s);
  ctx.lineTo(p2.x - s * 0.7, p2.y);
  ctx.closePath();
  ctx.stroke();
}
function drawRingShape(ctx, p2, col) {
  drawTail(ctx, p2, col, ctx.globalAlpha, 10);
  ctx.strokeStyle = col;
  ctx.lineWidth = Math.max(1, p2.size * 0.28);
  ctx.beginPath();
  ctx.arc(p2.x, p2.y, Math.max(1, p2.size), 0, Math.PI * 2);
  ctx.stroke();
}
function LogoPanel() {
  const project = useProject();
  const toast = useApp((s) => s.toast);
  if (!project) return /* @__PURE__ */ jsxRuntimeExports.jsx(Empty$2, {});
  const l2 = project.logo;
  const pickLogo = async () => {
    const sel = await window.masjavas.openFiles([{ name: "Gambar Logo", extensions: ["png", "jpg", "jpeg", "webp"] }]);
    if (!sel.length) return;
    patchProject((p2) => (p2.logo.path = sel[0], p2.logo.enabled = true, p2));
    toast("success", "Logo berhasil dimuat.");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Logo Spektrum" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tampilkan logo saluran dengan visualisasi spektrum melingkar yang reaktif terhadap musik." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Aktifkan logo spektrum", value: l2.enabled, onChange: (v2) => patchProject((p2) => (p2.logo.enabled = v2, p2)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "btn-row", style: { marginTop: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: pickLogo, children: l2.path ? "Ganti Logo…" : "Impor Logo PNG…" }) }),
      l2.path && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "soon", style: { marginTop: 8 }, children: [
        "File: ",
        l2.path.split(/[\\/]/).pop()
      ] })
    ] }),
    l2.enabled && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Logo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Posisi X", min: 0, max: 1, step: 0.01, value: l2.posX, fmt: (v2) => `${Math.round(v2 * 100)}%`, onChange: (v2) => patchProject((p2) => (p2.logo.posX = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Posisi Y", min: 0, max: 1, step: 0.01, value: l2.posY, fmt: (v2) => `${Math.round(v2 * 100)}%`, onChange: (v2) => patchProject((p2) => (p2.logo.posY = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Ukuran", min: 0.05, max: 0.6, step: 0.01, value: l2.size, fmt: (v2) => `${Math.round(v2 * 100)}%`, onChange: (v2) => patchProject((p2) => (p2.logo.size = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Transparansi", min: 0, max: 1, step: 0.05, value: l2.opacity, onChange: (v2) => patchProject((p2) => (p2.logo.opacity = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Putar logo (seperti CD)", value: l2.rotate ?? false, onChange: (v2) => patchProject((p2) => (p2.logo.rotate = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Denyut logo (ikut bass)", value: l2.logoPulse ?? false, onChange: (v2) => patchProject((p2) => (p2.logo.logoPulse = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Logo memantul saat beat (bass)", value: l2.logoBeatBounce ?? false, onChange: (v2) => patchProject((p2) => (p2.logo.logoBeatBounce = v2, p2)) }),
        (l2.rotate ?? false) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Kecepatan putar", min: 2, max: 20, step: 1, value: l2.rotateSecPerRev ?? 8, fmt: (v2) => `${v2} dtk/putaran`, onChange: (v2) => patchProject((p2) => (p2.logo.rotateSecPerRev = v2, p2)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "soon", style: { fontSize: 11 }, children: "Hanya logo yang berputar — cincin spektrum tetap diam." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Cincin Spektrum" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Select,
          {
            label: "Gaya cincin",
            value: l2.ringStyle ?? "bars",
            options: RING_STYLE_OPTIONS,
            onChange: (v2) => patchProject((p2) => (p2.logo.ringStyle = v2, p2))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Select,
          {
            label: "Posisi cincin",
            value: l2.mode,
            options: [
              { value: "outside", label: "Di luar logo" },
              { value: "around", label: "Mengelilingi logo" },
              { value: "inside", label: "Di dalam logo" }
            ],
            onChange: (v2) => patchProject((p2) => (p2.logo.mode = v2, p2))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Jumlah batang", min: 24, max: 144, step: 4, value: l2.bars, onChange: (v2) => patchProject((p2) => (p2.logo.bars = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Radius cincin", min: 0, max: 0.5, step: 5e-3, value: l2.ringRadius, onChange: (v2) => patchProject((p2) => (p2.logo.ringRadius = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Ketebalan", min: 2, max: 24, step: 1, value: l2.ringThickness, onChange: (v2) => patchProject((p2) => (p2.logo.ringThickness = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ColorInput, { label: "Warna cincin", value: l2.ringColor, onChange: (v2) => patchProject((p2) => (p2.logo.ringColor = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Warna pelangi (RGB)", value: l2.rgb, onChange: (v2) => patchProject((p2) => (p2.logo.rgb = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Cahaya", min: 0, max: 1, step: 0.05, value: l2.glow, onChange: (v2) => patchProject((p2) => (p2.logo.glow = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Intensitas", min: 0.2, max: 3, step: 0.1, value: l2.intensity, onChange: (v2) => patchProject((p2) => (p2.logo.intensity = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Partikel (saat beat)", value: l2.particles ?? false, onChange: (v2) => patchProject((p2) => (p2.logo.particles = v2, p2)) }),
        (l2.particles ?? false) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Select,
            {
              label: "Gaya partikel",
              value: l2.particleStyle ?? "burst",
              options: PARTICLE_STYLE_OPTIONS,
              onChange: (v2) => patchProject((p2) => (p2.logo.particleStyle = v2, p2))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Partikel warna pelangi (RGB)", value: l2.particleRgb ?? false, onChange: (v2) => patchProject((p2) => (p2.logo.particleRgb = v2, p2)) }),
          !(l2.particleRgb ?? false) && /* @__PURE__ */ jsxRuntimeExports.jsx(ColorInput, { label: "Warna partikel", value: l2.particleColor ?? "#ffd24a", onChange: (v2) => patchProject((p2) => (p2.logo.particleColor = v2, p2)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Kecepatan partikel", min: 0.2, max: 3, step: 0.1, value: l2.particleSpeed ?? 1, fmt: (v2) => `${v2.toFixed(1)}×`, onChange: (v2) => patchProject((p2) => (p2.logo.particleSpeed = v2, p2)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "soon", style: { fontSize: 11 }, children: "Spektrum logo membutuhkan layanan audio aktif. Pastikan proyek sudah memiliki file audio." })
    ] })
  ] });
}
function Empty$2() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-head", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Logo Spektrum" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty", children: "Buat atau buka proyek terlebih dahulu." })
  ] });
}
function EffectsPanel() {
  const project = useProject();
  if (!project) return /* @__PURE__ */ jsxRuntimeExports.jsx(Empty$1, {});
  const fx = project.effects;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Effects" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Color grading and atmosphere, applied during render via FFmpeg." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Color" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Brightness", min: -0.5, max: 0.5, step: 0.02, value: fx.brightness, onChange: (v2) => patchProject((p2) => (p2.effects.brightness = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Contrast", min: 0.5, max: 2, step: 0.05, value: fx.contrast, onChange: (v2) => patchProject((p2) => (p2.effects.contrast = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Saturation", min: 0, max: 3, step: 0.05, value: fx.saturation, onChange: (v2) => patchProject((p2) => (p2.effects.saturation = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Warmth", min: -1, max: 1, step: 0.05, value: fx.warmth, onChange: (v2) => patchProject((p2) => (p2.effects.warmth = v2, p2)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Atmosphere" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Vignette", min: 0, max: 1, step: 0.05, value: fx.vignette, onChange: (v2) => patchProject((p2) => (p2.effects.vignette = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Blur", min: 0, max: 10, step: 0.5, value: fx.blur, onChange: (v2) => patchProject((p2) => (p2.effects.blur = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Glow / Bloom", min: 0, max: 1, step: 0.05, value: fx.glow, onChange: (v2) => patchProject((p2) => (p2.effects.glow = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Film grain", min: 0, max: 1, step: 0.05, value: fx.filmGrain, onChange: (v2) => patchProject((p2) => (p2.effects.filmGrain = v2, p2)) })
      ] })
    ] })
  ] });
}
function Empty$1() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-head", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Effects" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty", children: "Create or open a project first." })
  ] });
}
const BLEND_OPTIONS = [
  { value: "normal", label: "Default" },
  { value: "screen", label: "Screen" },
  { value: "add", label: "Add" },
  { value: "lighten", label: "Lighten" },
  { value: "overlay", label: "Overlay" },
  { value: "soft-light", label: "Soft Light" },
  { value: "hard-light", label: "Hard Light" },
  { value: "multiply", label: "Multiply" },
  { value: "darken", label: "Darken" },
  { value: "difference", label: "Difference" },
  { value: "chroma", label: "Green Screen / Chroma Key" }
];
const LOOP_OPTIONS = [
  { value: "off", label: "Loop Off" },
  { value: "project", label: "Loop To Project Duration" },
  { value: "render", label: "Loop To Render Duration" }
];
const CANVAS_BLEND_OP = {
  normal: "source-over",
  screen: "screen",
  add: "lighter",
  lighten: "lighten",
  overlay: "overlay",
  "soft-light": "soft-light",
  "hard-light": "hard-light",
  multiply: "multiply",
  darken: "darken",
  difference: "difference",
  chroma: "source-over"
};
function kindForExt(ext) {
  const e = ext.toLowerCase().replace(".", "");
  if (e === "mp4" || e === "webm" || e === "mov" || e === "mkv") return "video";
  if (e === "gif") return "gif";
  return "image";
}
const defaultChroma = () => ({
  color: "#00ff00",
  similarity: 0.3,
  smoothness: 0.1,
  spill: 0.2,
  feather: 0.1
});
function newCustomOverlay(id2, path, name, ext) {
  const kind = kindForExt(ext);
  return {
    id: id2,
    enabled: true,
    name,
    path,
    kind,
    ext: ext.toLowerCase().replace(".", ""),
    posX: 0.5,
    posY: 0.5,
    scale: 1,
    rotation: 0,
    opacity: 1,
    blend: "normal",
    // Video/GIF default to seamless render-duration loop per spec.
    loop: kind === "video" || kind === "gif" ? "render" : "off",
    chroma: defaultChroma()
  };
}
function hexToRgb01(hex) {
  const h = (hex || "#00ff00").replace("#", "").padEnd(6, "0");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255
  ];
}
let coSeq = 1;
const ACCEPT = ["mp4", "webm", "mov", "gif", "png", "jpg", "jpeg"];
function baseName(p2) {
  const m2 = p2.replace(/\\/g, "/").split("/").pop() ?? p2;
  return m2;
}
function extOf(p2) {
  const m2 = p2.split(".").pop() ?? "";
  return m2.toLowerCase();
}
function Thumb({ overlay }) {
  const [url, setUrl] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let alive = true;
    window.masjavas.thumbnail(overlay.path, overlay.kind === "video" ? "video" : "image").then((u2) => {
      if (alive) setUrl(u2);
    }).catch(() => {
    });
    return () => {
      alive = false;
    };
  }, [overlay.path, overlay.kind]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        width: 56,
        height: 36,
        borderRadius: 6,
        flexShrink: 0,
        background: url ? `center/cover no-repeat url(${url})` : "var(--bg)",
        border: "1px solid var(--border)"
      }
    }
  );
}
function OverlayCard(props) {
  const { overlay: o, selected } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onClick: props.onSelect,
      style: {
        border: `1px solid ${selected ? "var(--accent)" : "var(--border)"}`,
        borderRadius: 10,
        marginBottom: 8,
        overflow: "hidden",
        cursor: "pointer",
        background: "var(--bg-raised)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Thumb, { overlay: o }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: 600, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: o.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: 11, color: "var(--text-faint)" }, children: [
              o.ext.toUpperCase(),
              " · ",
              o.kind
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "btn",
              style: { padding: "3px 8px", fontSize: 11, color: o.enabled ? "var(--good)" : "var(--text-faint)" },
              onClick: (e) => {
                e.stopPropagation();
                props.onUpdate({ enabled: !o.enabled });
              },
              title: o.enabled ? "Hide" : "Show",
              children: o.enabled ? "👁" : "🚫"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", style: btnSm, disabled: props.isFirst, onClick: (e) => {
            e.stopPropagation();
            props.onMove(-1);
          }, title: "Move up", children: "↑" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", style: btnSm, disabled: props.isLast, onClick: (e) => {
            e.stopPropagation();
            props.onMove(1);
          }, title: "Move down", children: "↓" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", style: btnSm, onClick: (e) => {
            e.stopPropagation();
            props.onDuplicate();
          }, title: "Duplicate", children: "⧉" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", style: { ...btnSm, color: "var(--bad)" }, onClick: (e) => {
            e.stopPropagation();
            props.onRemove();
          }, title: "Delete", children: "✕" })
        ] }),
        selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "4px 12px 14px", display: "flex", flexDirection: "column", gap: 8 }, onClick: (e) => e.stopPropagation(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", style: { flex: 1, fontSize: 11 }, onClick: props.onFront, children: "Bring to front" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", style: { flex: 1, fontSize: 11 }, onClick: props.onBack, children: "Send to back" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Position X", min: 0, max: 1, step: 5e-3, value: o.posX, onChange: (v2) => props.onUpdate({ posX: v2 }), fmt: (v2) => `${Math.round(v2 * 100)}%` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Position Y", min: 0, max: 1, step: 5e-3, value: o.posY, onChange: (v2) => props.onUpdate({ posY: v2 }), fmt: (v2) => `${Math.round(v2 * 100)}%` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Scale", min: 0.1, max: 4, step: 0.01, value: o.scale, onChange: (v2) => props.onUpdate({ scale: v2 }), fmt: (v2) => `${v2.toFixed(2)}×` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Rotation", min: 0, max: 360, step: 1, value: o.rotation, onChange: (v2) => props.onUpdate({ rotation: v2 }), fmt: (v2) => `${v2.toFixed(0)}°` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Opacity", min: 0, max: 1, step: 0.01, value: o.opacity, onChange: (v2) => props.onUpdate({ opacity: v2 }), fmt: (v2) => `${Math.round(v2 * 100)}%` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Blend Mode", value: o.blend, options: BLEND_OPTIONS, onChange: (v2) => props.onUpdate({ blend: v2 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Loop Mode", value: o.loop, options: LOOP_OPTIONS, onChange: (v2) => props.onUpdate({ loop: v2 }) }),
          o.blend === "chroma" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { borderTop: "1px solid var(--border-faint)", paddingTop: 8, marginTop: 2, display: "flex", flexDirection: "column", gap: 8 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-dim)", fontWeight: 600 }, children: "Chroma Key" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ColorInput, { label: "Key Color", value: o.chroma.color, onChange: (v2) => props.onUpdate({ chroma: { ...o.chroma, color: v2 } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Similarity", min: 0, max: 1, step: 0.01, value: o.chroma.similarity, onChange: (v2) => props.onUpdate({ chroma: { ...o.chroma, similarity: v2 } }), fmt: (v2) => v2.toFixed(2) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Smoothness", min: 0, max: 1, step: 0.01, value: o.chroma.smoothness, onChange: (v2) => props.onUpdate({ chroma: { ...o.chroma, smoothness: v2 } }), fmt: (v2) => v2.toFixed(2) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Spill Reduction", min: 0, max: 1, step: 0.01, value: o.chroma.spill, onChange: (v2) => props.onUpdate({ chroma: { ...o.chroma, spill: v2 } }), fmt: (v2) => v2.toFixed(2) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Edge Feather", min: 0, max: 1, step: 0.01, value: o.chroma.feather, onChange: (v2) => props.onUpdate({ chroma: { ...o.chroma, feather: v2 } }), fmt: (v2) => v2.toFixed(2) })
          ] })
        ] })
      ]
    }
  );
}
const btnSm = { padding: "3px 7px", fontSize: 11 };
function CustomOverlaySection() {
  const project = useProject();
  const [sel, setSel] = reactExports.useState(null);
  if (!project) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {});
  const overlays = project.customOverlays ?? [];
  async function importOverlays() {
    const paths = await window.masjavas.openFiles([{ name: "Overlay", extensions: ACCEPT }]).catch(() => []);
    if (!paths?.length) return;
    patchProject((p2) => {
      const list = [...p2.customOverlays ?? []];
      for (const path of paths) {
        const ext = extOf(path);
        if (!ACCEPT.includes(ext)) continue;
        const id2 = `co_${Date.now()}_${coSeq++}`;
        list.push(newCustomOverlay(id2, path, baseName(path), ext));
      }
      p2.customOverlays = list;
      return p2;
    });
  }
  function update(id2, patch) {
    patchProject((p2) => {
      p2.customOverlays = (p2.customOverlays ?? []).map((o) => o.id === id2 ? { ...o, ...patch } : o);
      return p2;
    });
  }
  function remove(id2) {
    patchProject((p2) => {
      p2.customOverlays = (p2.customOverlays ?? []).filter((o) => o.id !== id2);
      return p2;
    });
    if (sel === id2) setSel(null);
  }
  function duplicate(id2) {
    patchProject((p2) => {
      const list = [...p2.customOverlays ?? []];
      const idx = list.findIndex((o) => o.id === id2);
      if (idx < 0) return p2;
      const copy = { ...structuredClone(list[idx]), id: `co_${Date.now()}_${coSeq++}`, name: `${list[idx].name} copy` };
      list.splice(idx + 1, 0, copy);
      p2.customOverlays = list;
      return p2;
    });
  }
  function move(id2, dir) {
    patchProject((p2) => {
      const arr = [...p2.customOverlays ?? []];
      const idx = arr.findIndex((o) => o.id === id2);
      const next = idx + dir;
      if (idx < 0 || next < 0 || next >= arr.length) return p2;
      [arr[idx], arr[next]] = [arr[next], arr[idx]];
      p2.customOverlays = arr;
      return p2;
    });
  }
  function toEnd(id2, end) {
    patchProject((p2) => {
      const arr = [...p2.customOverlays ?? []];
      const idx = arr.findIndex((o) => o.id === id2);
      if (idx < 0) return p2;
      const [item] = arr.splice(idx, 1);
      if (end === "front") arr.push(item);
      else arr.unshift(item);
      p2.customOverlays = arr;
      return p2;
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 20, borderTop: "1px solid var(--border)", paddingTop: 16 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 4 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0, fontSize: 16 }, children: "Custom Overlay" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "2px 0 12px", fontSize: 12, color: "var(--text-dim)" }, children: "Import your own overlays (MP4, WEBM, GIF, PNG…). Each layer independent. Preview = render." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-accent", onClick: importOverlays, style: { width: "100%", padding: "9px 0", fontWeight: 700, marginBottom: 12 }, children: "+ Import Custom Overlay" }),
    overlays.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", padding: "24px 16px", color: "var(--text-dim)", fontSize: 13 }, children: "No custom overlays yet. Import a file to start." }),
    overlays.map((o, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      OverlayCard,
      {
        overlay: o,
        index: idx,
        selected: sel === o.id,
        isFirst: idx === 0,
        isLast: idx === overlays.length - 1,
        onSelect: () => setSel((s) => s === o.id ? null : o.id),
        onUpdate: (patch) => update(o.id, patch),
        onRemove: () => remove(o.id),
        onDuplicate: () => duplicate(o.id),
        onMove: (dir) => move(o.id, dir),
        onFront: () => toEnd(o.id, "front"),
        onBack: () => toEnd(o.id, "back")
      },
      o.id
    ))
  ] });
}
const TEXT_ANIMS = [
  { value: "none", label: "Statis" },
  { value: "pulse", label: "Denyut (pulse)" },
  { value: "float", label: "Melayang (float)" },
  { value: "blink", label: "Kedip (blink)" },
  { value: "sway", label: "Geleng (sway)" }
];
const PRESETS = [
  // Nature / Weather
  { value: "snow", label: "Snow", category: "Nature" },
  { value: "sakura", label: "Sakura Petals", category: "Nature" },
  { value: "leaves", label: "Falling Leaves", category: "Nature" },
  { value: "rain", label: "Rain", category: "Nature" },
  { value: "drizzle", label: "Drizzle", category: "Nature" },
  { value: "fog", label: "Fog / Mist", category: "Nature" },
  { value: "firefly", label: "Fireflies", category: "Nature" },
  { value: "bubbles", label: "Bubbles", category: "Nature" },
  { value: "smoke", label: "Smoke", category: "Nature" },
  { value: "dust", label: "Dust Particles", category: "Nature" },
  // Light / Glamour
  { value: "confetti", label: "Confetti", category: "Glamour" },
  { value: "glitter", label: "Glitter", category: "Glamour" },
  { value: "bokeh", label: "Bokeh Lights", category: "Glamour" },
  { value: "sparkle", label: "Sparkles", category: "Glamour" },
  { value: "stardust", label: "Stardust", category: "Glamour" },
  { value: "gold-rain", label: "Gold Rain", category: "Glamour" },
  { value: "hearts", label: "Hearts", category: "Glamour" },
  { value: "stars", label: "Shooting Stars", category: "Glamour" },
  { value: "lens-flare", label: "Lens Flare", category: "Glamour" },
  // Cinematic
  { value: "film-grain", label: "Film Grain", category: "Cinematic" },
  { value: "vhs-noise", label: "VHS Noise", category: "Cinematic" },
  { value: "scanlines", label: "Scanlines (TV)", category: "Cinematic" },
  { value: "vignette-pulse", label: "Vignette Pulse", category: "Cinematic" },
  { value: "chromatic", label: "Chromatic Aberration", category: "Cinematic" },
  // Glitch
  { value: "tv-static", label: "TV Static", category: "Glitch" },
  { value: "glitch-rgb", label: "RGB Glitch", category: "Glitch" },
  { value: "pixel-shatter", label: "Pixel Shatter", category: "Glitch" },
  { value: "matrix", label: "Matrix Code", category: "Glitch" },
  { value: "scanline-glitch", label: "Scanline Glitch", category: "Glitch" }
];
const PRESET_OPTIONS = PRESETS.map((p2) => ({ value: p2.value, label: `[${p2.category}] ${p2.label}` }));
function newLayer(id2) {
  return {
    id: id2,
    enabled: true,
    preset: "snow",
    opacity: 0.7,
    count: 120,
    size: 1,
    speed: 1,
    directionX: 0,
    directionY: 1,
    wind: 0.3,
    rotation: 0,
    color: "#ffffff",
    rgb: false,
    cycleDuration: 8
  };
}
let layerSeq = 1;
function LayerEditor({ layer, index, onUpdate, onRemove, onMoveUp, onMoveDown, isFirst, isLast }) {
  const [open, setOpen] = reactExports.useState(index === 0);
  const preset = PRESETS.find((p2) => p2.value === layer.preset);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { border: "1px solid var(--border)", borderRadius: 8, marginBottom: 8, overflow: "hidden" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          background: "var(--bg-raised)",
          cursor: "pointer",
          userSelect: "none"
        },
        onClick: () => setOpen((o) => !o),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { onPointerDown: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "", value: layer.enabled, onChange: (v2) => {
            onUpdate({ enabled: v2 });
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { flex: 1, fontWeight: 600, fontSize: 13 }, children: [
            preset?.label ?? layer.preset,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { marginLeft: 6, fontSize: 11, color: "var(--text-faint)", fontWeight: 400 }, children: [
              "[",
              preset?.category,
              "]"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "btn",
              style: { padding: "2px 6px", fontSize: 11 },
              onClick: (e) => {
                e.stopPropagation();
                onMoveUp();
              },
              disabled: isFirst,
              title: "Move up",
              children: "↑"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "btn",
              style: { padding: "2px 6px", fontSize: 11 },
              onClick: (e) => {
                e.stopPropagation();
                onMoveDown();
              },
              disabled: isLast,
              title: "Move down",
              children: "↓"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "btn",
              style: { padding: "2px 8px", fontSize: 11, color: "var(--bad)" },
              onClick: (e) => {
                e.stopPropagation();
                onRemove();
              },
              title: "Remove layer",
              children: "✕"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11, color: "var(--text-faint)" }, children: open ? "▲" : "▼" })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Select,
        {
          label: "Preset",
          value: layer.preset,
          options: PRESET_OPTIONS,
          onChange: (v2) => onUpdate({ preset: v2 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Opacity", min: 0, max: 1, step: 0.01, value: layer.opacity, onChange: (v2) => onUpdate({ opacity: v2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Count", min: 10, max: 500, step: 1, value: layer.count, onChange: (v2) => onUpdate({ count: v2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Size", min: 0.1, max: 4, step: 0.05, value: layer.size, onChange: (v2) => onUpdate({ size: v2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Speed", min: 0.05, max: 4, step: 0.05, value: layer.speed, onChange: (v2) => onUpdate({ speed: v2 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { borderTop: "1px solid var(--border-faint)", paddingTop: 8, marginTop: 2 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-dim)", marginBottom: 6, fontWeight: 600 }, children: "Direction & Motion" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Horizontal (←→)", min: -1, max: 1, step: 0.05, value: layer.directionX, onChange: (v2) => onUpdate({ directionX: v2 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Vertical (↑↓)", min: -1, max: 1, step: 0.05, value: layer.directionY, onChange: (v2) => onUpdate({ directionY: v2 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Wind / Sway", min: -1, max: 1, step: 0.05, value: layer.wind, onChange: (v2) => onUpdate({ wind: v2 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Rotation Offset °", min: 0, max: 360, step: 1, value: layer.rotation, onChange: (v2) => onUpdate({ rotation: v2 }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { borderTop: "1px solid var(--border-faint)", paddingTop: 8, marginTop: 2 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "var(--text-dim)", marginBottom: 6, fontWeight: 600 }, children: "Color" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ColorInput, { label: "Color", value: layer.color, onChange: (v2) => onUpdate({ color: v2 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "RGB Cycle", value: layer.rgb, onChange: (v2) => onUpdate({ rgb: v2 }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { borderTop: "1px solid var(--border-faint)", paddingTop: 8, marginTop: 2 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Slider,
          {
            label: `Loop duration: ${layer.cycleDuration}s`,
            min: 2,
            max: 30,
            step: 0.5,
            value: layer.cycleDuration,
            onChange: (v2) => onUpdate({ cycleDuration: v2 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { fontSize: 11, color: "var(--text-faint)", margin: "4px 0 0" }, children: [
          "Seamless loop — overlay repeats every ",
          layer.cycleDuration,
          "s. Preview = render identical."
        ] })
      ] })
    ] })
  ] });
}
function OverlayPanel() {
  const project = useProject();
  if (!project) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {});
  const layers = project.overlayLayers ?? [];
  function addLayer() {
    const id2 = `ol_${Date.now()}_${layerSeq++}`;
    patchProject((p2) => {
      p2.overlayLayers = [...p2.overlayLayers ?? [], newLayer(id2)];
      return p2;
    });
  }
  function updateLayer(id2, patch) {
    patchProject((p2) => {
      p2.overlayLayers = (p2.overlayLayers ?? []).map((l2) => l2.id === id2 ? { ...l2, ...patch } : l2);
      return p2;
    });
  }
  function removeLayer(id2) {
    patchProject((p2) => {
      p2.overlayLayers = (p2.overlayLayers ?? []).filter((l2) => l2.id !== id2);
      return p2;
    });
  }
  function moveLayer(id2, dir) {
    patchProject((p2) => {
      const arr = [...p2.overlayLayers ?? []];
      const idx = arr.findIndex((l2) => l2.id === id2);
      if (idx < 0) return p2;
      const next = idx + dir;
      if (next < 0 || next >= arr.length) return p2;
      [arr[idx], arr[next]] = [arr[next], arr[idx]];
      p2.overlayLayers = arr;
      return p2;
    });
  }
  const userFonts = useApp((s) => s.userFonts);
  const importFonts = useApp((s) => s.importFonts);
  const fontOptions = fontOptionsWith(userFonts);
  const texts = project.customTexts ?? [];
  function addText() {
    const id2 = `tx_${Date.now()}`;
    const t2 = {
      id: id2,
      text: "Teks Baru",
      enabled: true,
      posX: 0.5,
      posY: 0.5,
      fontSize: 48,
      fontFamily: "Inter",
      color: "#ffffff",
      glow: 0.3,
      anim: "none"
    };
    patchProject((p2) => {
      p2.customTexts = [...p2.customTexts ?? [], t2];
      return p2;
    });
  }
  function updateText(id2, patch) {
    patchProject((p2) => {
      p2.customTexts = (p2.customTexts ?? []).map((x2) => x2.id === id2 ? { ...x2, ...patch } : x2);
      return p2;
    });
  }
  function removeText(id2) {
    patchProject((p2) => {
      p2.customTexts = (p2.customTexts ?? []).filter((x2) => x2.id !== id2);
      return p2;
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Overlay" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Particle & cinematic overlays — seamless loop, preview = render." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginBottom: 12 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-accent", onClick: addLayer, style: { width: "100%", padding: "9px 0", fontWeight: 700 }, children: "+ Add Overlay Layer" }) }),
    layers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", padding: "32px 16px", color: "var(--text-dim)", fontSize: 13 }, children: 'No overlay layers yet. Click "Add Overlay Layer" to start.' }),
    layers.map((layer, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      LayerEditor,
      {
        layer,
        index: idx,
        onUpdate: (patch) => updateLayer(layer.id, patch),
        onRemove: () => removeLayer(layer.id),
        onMoveUp: () => moveLayer(layer.id, -1),
        onMoveDown: () => moveLayer(layer.id, 1),
        isFirst: idx === 0,
        isLast: idx === layers.length - 1
      },
      layer.id
    )),
    layers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { marginTop: 12 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { marginTop: 0 }, children: "Preset Guide" }),
      ["Nature", "Glamour", "Cinematic", "Glitch"].map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 6 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontWeight: 600, fontSize: 12, color: "var(--accent)" }, children: [
          cat,
          ": "
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 12, color: "var(--text-dim)" }, children: PRESETS.filter((p2) => p2.category === cat).map((p2) => p2.label).join(", ") })
      ] }, cat))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { marginTop: 12 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { margin: 0 }, children: [
          "Custom Teks (",
          texts.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: () => importFonts(), children: "Impor Font…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: addText, children: "+ Tambah Teks" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "soon", style: { fontSize: 11, marginTop: 4 }, children: "Teks bebas di semua mode. Sama persis di preview & hasil render. Impor font .ttf/.otf sendiri → masuk daftar font." }),
      texts.map((tx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { marginTop: 8, background: "var(--bg)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "inp", style: { flex: 1 }, value: tx.text, onChange: (e) => updateText(tx.id, { text: e.target.value }), placeholder: "Teks…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "", value: tx.enabled, onChange: (v2) => updateText(tx.id, { enabled: v2 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", style: { fontSize: 11, padding: "3px 8px" }, onClick: () => removeText(tx.id), children: "Hapus" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Animasi", value: tx.anim, options: TEXT_ANIMS, onChange: (v2) => updateText(tx.id, { anim: v2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Font", value: tx.fontFamily, options: fontOptions, onChange: (v2) => updateText(tx.id, { fontFamily: v2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Posisi X", min: 0, max: 1, step: 0.01, value: tx.posX, fmt: (v2) => `${Math.round(v2 * 100)}%`, onChange: (v2) => updateText(tx.id, { posX: v2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Posisi Y", min: 0, max: 1, step: 0.01, value: tx.posY, fmt: (v2) => `${Math.round(v2 * 100)}%`, onChange: (v2) => updateText(tx.id, { posY: v2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Ukuran", min: 12, max: 200, step: 2, value: tx.fontSize, onChange: (v2) => updateText(tx.id, { fontSize: v2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ColorInput, { label: "Warna", value: tx.color, onChange: (v2) => updateText(tx.id, { color: v2 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Cahaya (glow)", min: 0, max: 1, step: 0.05, value: tx.glow, onChange: (v2) => updateText(tx.id, { glow: v2 }) }),
        tx.glow > 0.02 && /* @__PURE__ */ jsxRuntimeExports.jsx(ColorInput, { label: "Warna glow", value: tx.glowColor || tx.color, onChange: (v2) => updateText(tx.id, { glowColor: v2 }) })
      ] }, tx.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomOverlaySection, {})
  ] });
}
function MasteringPanel() {
  const toast = useApp((s) => s.toast);
  const sidecar = useApp((s) => s.sidecar);
  const [presets, setPresets] = reactExports.useState([]);
  const [presetId, setPresetId] = reactExports.useState("streaming-ready");
  const [inputs, setInputs] = reactExports.useState([]);
  const [outputDir, setOutputDir] = reactExports.useState(null);
  const [gain, setGain] = reactExports.useState(0);
  const [progress, setProgress] = reactExports.useState(null);
  const [running, setRunning] = reactExports.useState(false);
  const [previewUrl, setPreviewUrl] = reactExports.useState(null);
  const [previewing, setPreviewing] = reactExports.useState(false);
  const previewAudioRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    setPreviewUrl(null);
  }, [presetId, gain]);
  reactExports.useEffect(() => {
    if (previewUrl && previewAudioRef.current) {
      previewAudioRef.current.play().catch(() => {
      });
    }
  }, [previewUrl]);
  reactExports.useEffect(() => {
    window.masjavas.masterPresets().then(setPresets);
    const off = window.masjavas.onMasterEvent((p2) => {
      setProgress(p2);
      if (p2.status === "done" && p2.index + 1 >= p2.total || p2.status === "cancelled") setRunning(false);
      if (p2.status === "error") toast("error", `${p2.fileName}: ${p2.error}`);
    });
    return off;
  }, [toast]);
  const pickInputs = async () => {
    const sel = await window.masjavas.openFiles([{ name: "Audio", extensions: ["mp3", "wav", "flac", "m4a", "aac", "ogg"] }]);
    if (sel.length) setInputs(sel);
  };
  const pickFolder = async () => {
    const f2 = await window.masjavas.openFolder();
    if (!f2) return;
    const res = await window.masjavas.scanMedia({ kind: "folder", paths: [f2], only: ["audio"] });
    setInputs(res.items.map((i) => i.path));
    toast("info", `${res.items.length} file audio dipilih.`);
  };
  const pickOut = async () => {
    const f2 = await window.masjavas.openFolder();
    if (f2) setOutputDir(f2);
  };
  const runPreview = async () => {
    if (!inputs.length) return toast("error", "Pilih minimal satu file audio terlebih dahulu.");
    if (!sidecar?.pythonFound) return toast("error", "Layanan audio belum aktif.");
    setPreviewing(true);
    setPreviewUrl(null);
    try {
      const url = await window.masjavas.masterPreview(inputs[0], presetId, gain);
      setPreviewUrl(url);
    } catch (e) {
      toast("error", `Pratinjau gagal: ${e.message}`);
    } finally {
      setPreviewing(false);
    }
  };
  const run = async () => {
    if (!inputs.length) return toast("error", "Pilih file audio terlebih dahulu.");
    if (!outputDir) return toast("error", "Pilih folder output terlebih dahulu.");
    if (!sidecar?.pythonFound) return toast("error", "Layanan audio belum aktif.");
    setRunning(true);
    setProgress(null);
    try {
      await window.masjavas.runMaster({ inputs, presetId, outputDir, outputGain: gain, targetLufs: -14 });
      toast("success", "Mastering selesai.");
    } catch (e) {
      toast("error", e.message);
    } finally {
      setRunning(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Mastering Audio" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Perbaiki kualitas suara dengan EQ, kompresi, dan normalisasi volume. Bisa satu file atau banyak sekaligus." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "File Masukan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "btn-row", style: { marginBottom: 10 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: pickInputs, children: "Pilih File…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: pickFolder, children: "Pilih Folder…" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "File dipilih" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "val", children: [
          inputs.length,
          " file"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Preset" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "inp", value: presetId, onChange: (e) => setPresetId(e.target.value), children: presets.map((p2) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p2.id, children: p2.name }, p2.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { marginTop: 14 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { display: "flex", justifyContent: "space-between" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Penguatan output (dB)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "val", children: gain })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: -6, max: 6, step: 0.5, value: gain, style: { width: "100%", accentColor: "var(--accent)" }, onChange: (e) => setGain(parseFloat(e.target.value)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "btn-row", style: { marginTop: 14 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "btn",
          disabled: previewing || !inputs.length || !sidecar?.pythonFound,
          onClick: runPreview,
          children: previewing ? "Memproses pratinjau…" : "▶ Pratinjau Preset (30 detik)"
        }
      ) }),
      previewUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 10 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { ref: previewAudioRef, src: previewUrl, controls: true, autoPlay: true, style: { width: "100%" } }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Output" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "btn-row", style: { marginBottom: 10 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: pickOut, children: "Pilih Folder Output…" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Folder" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "val", children: outputDir ? outputDir.split(/[\\/]/).pop() : "Belum dipilih" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "btn-row", style: { marginTop: 14 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn primary", disabled: running, onClick: run, children: running ? "Memproses…" : "Mulai Mastering" }),
        running && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: () => window.masjavas.cancelMaster(), children: "Batalkan" })
      ] }),
      progress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 14 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "val", children: [
            progress.index + 1,
            "/",
            progress.total,
            " · ",
            progress.fileName
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar$1, { pct: progress.status === "done" ? 100 : progress.percent })
      ] }),
      !sidecar?.pythonFound && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "soon", style: { marginTop: 10, fontSize: 11 }, children: "Layanan audio belum aktif. Pastikan proses analisis audio sudah berjalan di latar belakang." })
    ] })
  ] });
}
function Bar$1({ pct }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 8, background: "var(--bg)", borderRadius: 4, overflow: "hidden" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: `${pct}%`, height: "100%", background: "var(--accent)", transition: "width .2s" } }) });
}
function rng(seed) {
  const s = Math.sin(seed * 9301 + 49297) * 233280;
  return s - Math.floor(s);
}
function rng2(a, b) {
  return rng(a * 1e3 + b);
}
function loopT(t2, cycle) {
  return (t2 % cycle + cycle) % cycle;
}
function particleColor(layer, idx, lt) {
  if (layer.rgb) {
    const hue = (rng2(idx, 0) * 360 + lt * 60) % 360;
    return `hsla(${hue.toFixed(0)},95%,65%,${layer.opacity})`;
  }
  return hexAlpha(layer.color || "#ffffff", layer.opacity);
}
function hexAlpha(hex, alpha) {
  const h = (hex || "#ffffff").replace("#", "").padEnd(6, "f");
  const r2 = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r2},${g},${b},${alpha.toFixed(3)})`;
}
function drawSnow(ctx, layer, lt, W2, H2) {
  const n2 = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n2; i++) {
    const wobbleAmp = rng2(i, 5) * 18 * Math.abs(layer.wind);
    const wobbleFreq = rng2(i, 6) * 1.5 + 0.5;
    const phase = rng2(i, 7) * cycle;
    const fallT = (lt + phase) % cycle / cycle;
    const windSign = layer.wind >= 0 ? 1 : -1;
    const vy = layer.directionY >= 0 ? 1 : -1;
    const vx = layer.directionX;
    const spd = (rng2(i, 4) * 0.6 + 0.4) * layer.speed;
    const x2 = (rng2(i, 1) * W2 + vx * fallT * H2 * 0.3 + wobbleAmp * Math.sin(fallT * Math.PI * 2 * wobbleFreq * windSign)) % W2;
    const y2 = (rng2(i, 2) * H2 + vy * fallT * H2 * spd) % H2;
    const sz = (rng2(i, 3) * 3 + 1) * layer.size;
    ctx.beginPath();
    ctx.arc(x2 < 0 ? x2 + W2 : x2, y2 < 0 ? y2 + H2 : y2, sz, 0, Math.PI * 2);
    ctx.fillStyle = particleColor(layer, i, lt);
    ctx.fill();
  }
}
function drawSakura(ctx, layer, lt, W2, H2) {
  const n2 = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n2; i++) {
    const phase = rng2(i, 7) * cycle;
    const fallT = (lt + phase) % cycle / cycle;
    const spd = (rng2(i, 4) * 0.5 + 0.5) * layer.speed;
    const wobble = Math.sin(fallT * Math.PI * 4 + rng2(i, 8) * Math.PI * 2) * 30 * Math.abs(layer.wind + 1);
    const vy = layer.directionY >= 0 ? 1 : -1;
    const x2 = (rng2(i, 1) * W2 + layer.directionX * fallT * H2 * 0.25 + wobble) % W2;
    const y2 = (rng2(i, 2) * H2 + vy * fallT * H2 * spd) % H2;
    const rot = rng2(i, 9) * Math.PI * 2 + lt * (rng2(i, 10) - 0.5) * 3;
    const sz = (rng2(i, 3) * 5 + 3) * layer.size;
    ctx.save();
    ctx.translate(x2 < 0 ? x2 + W2 : x2, y2 < 0 ? y2 + H2 : y2);
    ctx.rotate(rot);
    ctx.globalAlpha = layer.opacity;
    const col = layer.rgb ? `hsl(${(rng2(i, 0) * 30 + 330).toFixed(0)},90%,75%)` : layer.color || "#ffb7c5";
    ctx.fillStyle = col;
    ctx.beginPath();
    for (let p2 = 0; p2 < 5; p2++) {
      const a = p2 / 5 * Math.PI * 2;
      const bx = Math.cos(a) * sz;
      const by = Math.sin(a) * sz;
      p2 === 0 ? ctx.moveTo(bx, by) : ctx.quadraticCurveTo(0, 0, bx, by);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
function drawLeaves(ctx, layer, lt, W2, H2) {
  const n2 = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  const leafColors = ["#8B4513", "#228B22", "#DC143C", "#DAA520", "#FF8C00"];
  for (let i = 0; i < n2; i++) {
    const phase = rng2(i, 7) * cycle;
    const fallT = (lt + phase) % cycle / cycle;
    const spd = (rng2(i, 4) * 0.6 + 0.4) * layer.speed;
    const wobble = Math.sin(fallT * Math.PI * 3 + rng2(i, 8) * Math.PI * 2) * 40 * (Math.abs(layer.wind) + 0.5);
    const vy = layer.directionY >= 0 ? 1 : -1;
    const x2 = (rng2(i, 1) * W2 + layer.directionX * fallT * H2 * 0.3 + wobble) % W2;
    const y2 = (rng2(i, 2) * H2 + vy * fallT * H2 * spd) % H2;
    const rot = rng2(i, 9) * Math.PI * 2 + lt * (rng2(i, 10) - 0.5) * 2;
    const sz = (rng2(i, 3) * 8 + 4) * layer.size;
    ctx.save();
    ctx.translate(x2 < 0 ? x2 + W2 : x2, y2 < 0 ? y2 + H2 : y2);
    ctx.rotate(rot);
    ctx.globalAlpha = layer.opacity;
    ctx.fillStyle = layer.rgb ? `hsl(${(lt * 40 + i * 37) % 360},80%,50%)` : leafColors[i % leafColors.length];
    ctx.beginPath();
    ctx.ellipse(0, 0, sz * 0.5, sz, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
function drawRain(ctx, layer, lt, W2, H2) {
  const n2 = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n2; i++) {
    const phase = rng2(i, 7) * cycle;
    const fallT = (lt + phase) % cycle / cycle;
    const spd = (rng2(i, 4) * 0.5 + 0.8) * layer.speed;
    const vy = layer.directionY >= 0 ? 1 : -1;
    const vx = layer.directionX * 0.3;
    const x2 = (rng2(i, 1) * W2 + vx * fallT * H2) % W2;
    const y2 = (vy * fallT * H2 * spd + rng2(i, 2) * H2) % H2;
    const len = (rng2(i, 3) * 14 + 8) * layer.size;
    const angle = Math.atan2(vy * spd, vx || 0.01);
    ctx.save();
    ctx.translate(x2 < 0 ? x2 + W2 : x2, y2 < 0 ? y2 + H2 : y2);
    ctx.rotate(angle);
    ctx.strokeStyle = particleColor(layer, i, lt);
    ctx.lineWidth = (rng2(i, 5) * 1.2 + 0.4) * layer.size;
    ctx.globalAlpha = layer.opacity * 0.7;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, len);
    ctx.stroke();
    ctx.restore();
  }
}
function drawDrizzle(ctx, layer, lt, W2, H2) {
  const mod = { ...layer, count: layer.count * 1.5, opacity: layer.opacity * 0.5 };
  drawRain(ctx, mod, lt, W2, H2);
}
function drawFog(ctx, layer, lt, W2, H2) {
  const n2 = Math.min(Math.round(layer.count * 0.3), 40);
  for (let i = 0; i < n2; i++) {
    const phase = rng2(i, 7) * layer.cycleDuration;
    const lt2 = (lt + phase) % layer.cycleDuration / layer.cycleDuration;
    const x2 = (rng2(i, 1) * W2 * 1.4 - W2 * 0.2 + lt2 * W2 * 0.4 * layer.directionX) % W2;
    const y2 = rng2(i, 2) * H2 + lt2 * H2 * 0.05 * layer.directionY;
    const rx = (rng2(i, 3) * W2 * 0.4 + W2 * 0.15) * layer.size;
    const ry = (rng2(i, 4) * H2 * 0.15 + H2 * 0.08) * layer.size;
    const alpha = (rng2(i, 5) * 0.12 + 0.04) * layer.opacity;
    const col = layer.color || "#ccddff";
    const grad = ctx.createRadialGradient(x2, y2, 0, x2, y2, rx);
    grad.addColorStop(0, hexAlpha(col, alpha));
    grad.addColorStop(1, hexAlpha(col, 0));
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(x2, y2, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}
function drawFirefly(ctx, layer, lt, W2, H2) {
  const n2 = Math.round(layer.count * 0.4);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n2; i++) {
    const phase = rng2(i, 7) * cycle;
    const lt2 = lt + phase;
    const x2 = rng2(i, 1) * W2 + Math.sin(lt2 * (rng2(i, 3) * 0.4 + 0.1) * Math.PI * 2 + layer.directionX) * (rng2(i, 5) * 80 + 20);
    const y2 = rng2(i, 2) * H2 + Math.sin(lt2 * (rng2(i, 4) * 0.4 + 0.1) * Math.PI * 2 + layer.directionY) * (rng2(i, 6) * 60 + 20);
    const glow = (Math.sin(lt2 * (rng2(i, 8) * 2 + 1) * Math.PI * 2) + 1) / 2;
    const sz = (rng2(i, 9) * 3 + 1.5) * layer.size;
    const col = layer.rgb ? `hsl(${(i * 60 + lt * 30) % 360},100%,75%)` : layer.color || "#aaff44";
    const grad = ctx.createRadialGradient(x2, y2, 0, x2, y2, sz * 3);
    grad.addColorStop(0, hexAlpha(col, layer.opacity * glow));
    grad.addColorStop(1, hexAlpha(col, 0));
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x2, y2, sz * 3, 0, Math.PI * 2);
    ctx.fill();
  }
}
function drawBubbles(ctx, layer, lt, W2, H2) {
  const n2 = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n2; i++) {
    const phase = rng2(i, 7) * cycle;
    const riseT = (lt + phase) % cycle / cycle;
    const spd = (rng2(i, 4) * 0.5 + 0.3) * layer.speed;
    const wobble = Math.sin(riseT * Math.PI * 3 + rng2(i, 8) * Math.PI * 2) * 20;
    const vy = layer.directionY <= 0 ? -1 : 1;
    const x2 = (rng2(i, 1) * W2 + wobble * layer.wind) % W2;
    const y2 = (rng2(i, 2) * H2 + vy * riseT * H2 * spd) % H2;
    const sz = (rng2(i, 3) * 14 + 4) * layer.size;
    ctx.save();
    ctx.globalAlpha = (1 - riseT * 0.4) * layer.opacity * 0.7;
    ctx.strokeStyle = particleColor(layer, i, lt);
    ctx.lineWidth = 1.2 * layer.size;
    ctx.beginPath();
    ctx.arc(x2 < 0 ? x2 + W2 : x2, y2 < 0 ? y2 + H2 : y2, sz, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.beginPath();
    ctx.arc((x2 < 0 ? x2 + W2 : x2) - sz * 0.25, (y2 < 0 ? y2 + H2 : y2) - sz * 0.25, sz * 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
function drawSmoke(ctx, layer, lt, W2, H2) {
  const n2 = Math.min(Math.round(layer.count * 0.25), 50);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n2; i++) {
    const phase = rng2(i, 7) * cycle;
    const riseT = (lt + phase) % cycle / cycle;
    const spd = (rng2(i, 4) * 0.4 + 0.2) * layer.speed;
    const vy = layer.directionY <= 0 ? -1 : 1;
    const drift = Math.sin(riseT * Math.PI * 2 + rng2(i, 8) * Math.PI * 2) * 40 * layer.wind;
    const x2 = rng2(i, 1) * W2 + layer.directionX * riseT * H2 * 0.2 + drift;
    const y2 = (rng2(i, 2) * H2 * 0.5 + H2 * 0.5 + vy * riseT * H2 * spd) % H2;
    const sz = (rng2(i, 3) * 60 + 20) * riseT * layer.size;
    const alpha = (1 - riseT) * layer.opacity * 0.25;
    const col = layer.color || "#888888";
    const grad = ctx.createRadialGradient(x2, y2, 0, x2, y2, sz);
    grad.addColorStop(0, hexAlpha(col, alpha));
    grad.addColorStop(1, hexAlpha(col, 0));
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x2, y2 < 0 ? y2 + H2 : y2, sz, 0, Math.PI * 2);
    ctx.fill();
  }
}
function drawDust(ctx, layer, lt, W2, H2) {
  const n2 = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n2; i++) {
    const phase = rng2(i, 7) * cycle;
    const driftT = (lt + phase) % cycle / cycle;
    const spd = (rng2(i, 4) * 0.3 + 0.1) * layer.speed;
    const x2 = (rng2(i, 1) * W2 + layer.directionX * driftT * W2 * spd * 2 + Math.sin(driftT * Math.PI * 4 + rng2(i, 8)) * 15 * layer.wind) % W2;
    const y2 = (rng2(i, 2) * H2 + layer.directionY * driftT * H2 * spd) % H2;
    const sz = (rng2(i, 3) * 1.5 + 0.3) * layer.size;
    ctx.beginPath();
    ctx.arc(x2 < 0 ? x2 + W2 : x2, y2 < 0 ? y2 + H2 : y2, sz, 0, Math.PI * 2);
    ctx.fillStyle = particleColor(layer, i, lt);
    ctx.globalAlpha = layer.opacity * (rng2(i, 9) * 0.5 + 0.3);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}
function drawConfetti(ctx, layer, lt, W2, H2) {
  const n2 = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  const COLORS = ["#ff4444", "#ff8800", "#ffee00", "#44ff44", "#44aaff", "#cc44ff", "#ff44cc", "#ffffff"];
  for (let i = 0; i < n2; i++) {
    const phase = rng2(i, 7) * cycle;
    const fallT = (lt + phase) % cycle / cycle;
    const spd = (rng2(i, 4) * 0.6 + 0.4) * layer.speed;
    const vy = layer.directionY >= 0 ? 1 : -1;
    const wobble = Math.sin(fallT * Math.PI * 4 + rng2(i, 8) * Math.PI * 2) * 30 * layer.wind;
    const x2 = (rng2(i, 1) * W2 + layer.directionX * fallT * H2 * 0.3 + wobble) % W2;
    const y2 = (rng2(i, 2) * H2 + vy * fallT * H2 * spd) % H2;
    const rot = rng2(i, 9) * Math.PI * 2 + lt * (rng2(i, 10) * 4 - 2) + layer.rotation * Math.PI / 180;
    const w2 = (rng2(i, 11) * 8 + 4) * layer.size;
    const h = w2 * (rng2(i, 12) * 0.6 + 0.3);
    ctx.save();
    ctx.translate(x2 < 0 ? x2 + W2 : x2, y2 < 0 ? y2 + H2 : y2);
    ctx.rotate(rot);
    ctx.globalAlpha = layer.opacity;
    ctx.fillStyle = layer.rgb ? `hsl(${(i * 47 + lt * 60) % 360},90%,60%)` : COLORS[i % COLORS.length];
    ctx.fillRect(-w2 / 2, -h / 2, w2, h);
    ctx.restore();
  }
}
function drawGlitter(ctx, layer, lt, W2, H2) {
  const n2 = Math.round(layer.count);
  for (let i = 0; i < n2; i++) {
    const x2 = rng2(i, 1) * W2;
    const y2 = rng2(i, 2) * H2;
    const twinkle = (Math.sin(lt * (rng2(i, 3) * 5 + 2) * Math.PI * 2 + rng2(i, 7) * Math.PI * 2) + 1) / 2;
    const sz = (rng2(i, 4) * 3 + 1) * layer.size * twinkle;
    const col = layer.rgb ? `hsl(${(i * 73 + lt * 80) % 360},100%,80%)` : layer.color || "#ffffaa";
    ctx.save();
    ctx.translate(x2, y2);
    ctx.rotate(lt * (rng2(i, 5) - 0.5) * 2 + layer.rotation * Math.PI / 180);
    ctx.globalAlpha = layer.opacity * twinkle;
    ctx.fillStyle = col;
    ctx.beginPath();
    for (let p2 = 0; p2 < 8; p2++) {
      const a = p2 / 8 * Math.PI * 2;
      const r2 = p2 % 2 === 0 ? sz : sz * 0.35;
      p2 === 0 ? ctx.moveTo(Math.cos(a) * r2, Math.sin(a) * r2) : ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
function drawBokeh(ctx, layer, lt, W2, H2) {
  const n2 = Math.round(layer.count * 0.3);
  for (let i = 0; i < n2; i++) {
    const x2 = (rng2(i, 1) * W2 + layer.directionX * lt * 15 * layer.speed) % W2;
    const y2 = (rng2(i, 2) * H2 + layer.directionY * lt * 10 * layer.speed) % H2;
    const pulse = (Math.sin(lt * (rng2(i, 3) * 0.5 + 0.2) * Math.PI * 2 + rng2(i, 7) * Math.PI * 2) + 1) / 2;
    const sz = (rng2(i, 4) * 60 + 20) * layer.size * (0.7 + pulse * 0.3);
    const alpha = (rng2(i, 5) * 0.15 + 0.04) * layer.opacity;
    const col = layer.rgb ? `hsl(${(i * 53 + lt * 20) % 360},80%,75%)` : layer.color || "#88aaff";
    const grad = ctx.createRadialGradient(x2, y2, 0, x2, y2, sz);
    grad.addColorStop(0, hexAlpha(col, alpha * 0.8));
    grad.addColorStop(0.6, hexAlpha(col, alpha * 0.3));
    grad.addColorStop(1, hexAlpha(col, 0));
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x2, y2, sz, 0, Math.PI * 2);
    ctx.fill();
  }
}
function drawSparkle(ctx, layer, lt, W2, H2) {
  const n2 = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n2; i++) {
    const phase = rng2(i, 7) * cycle;
    const lt2 = (lt + phase) % cycle / cycle;
    const life = Math.sin(lt2 * Math.PI);
    if (life < 0.01) continue;
    const x2 = rng2(i, 1) * W2 + layer.directionX * lt2 * 40;
    const y2 = rng2(i, 2) * H2 + layer.directionY * lt2 * 40;
    const sz = (rng2(i, 3) * 6 + 2) * layer.size * life;
    const col = layer.rgb ? `hsl(${(i * 61 + lt * 80) % 360},100%,85%)` : layer.color || "#ffffff";
    ctx.save();
    ctx.translate(x2, y2);
    ctx.rotate(layer.rotation * Math.PI / 180 + lt * rng2(i, 8));
    ctx.globalAlpha = layer.opacity * life;
    ctx.fillStyle = col;
    ctx.shadowBlur = sz * 2;
    ctx.shadowColor = col;
    ctx.fillRect(-sz / 2, -sz * 2, sz, sz * 4);
    ctx.fillRect(-sz * 2, -sz / 2, sz * 4, sz);
    ctx.restore();
  }
}
function drawStardust(ctx, layer, lt, W2, H2) {
  const n2 = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n2; i++) {
    const phase = rng2(i, 7) * cycle;
    const lt2 = (lt + phase) % cycle / cycle;
    const x2 = (rng2(i, 1) * W2 + layer.directionX * lt2 * W2 * 0.3) % W2;
    const y2 = (rng2(i, 2) * H2 + layer.directionY * lt2 * H2 * 0.2) % H2;
    const sz = (rng2(i, 3) * 1.5 + 0.4) * layer.size;
    const twinkle = (Math.sin(lt * rng2(i, 4) * 4 * Math.PI * 2 + rng2(i, 8) * Math.PI * 2) + 1) / 2;
    ctx.beginPath();
    ctx.arc(x2 < 0 ? x2 + W2 : x2, y2 < 0 ? y2 + H2 : y2, sz, 0, Math.PI * 2);
    ctx.fillStyle = layer.rgb ? `hsl(${(i * 83 + 200) % 360},80%,80%)` : layer.color || "#aaddff";
    ctx.globalAlpha = layer.opacity * (0.4 + twinkle * 0.6);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}
function drawGoldRain(ctx, layer, lt, W2, H2) {
  const n2 = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n2; i++) {
    const phase = rng2(i, 7) * cycle;
    const fallT = (lt + phase) % cycle / cycle;
    const spd = (rng2(i, 4) * 0.7 + 0.5) * layer.speed;
    const vy = layer.directionY >= 0 ? 1 : -1;
    const x2 = (rng2(i, 1) * W2 + layer.directionX * fallT * H2 * 0.2) % W2;
    const y2 = (rng2(i, 2) * H2 + vy * fallT * H2 * spd) % H2;
    const rot = rng2(i, 9) * Math.PI * 2 + lt * 2;
    const w2 = (rng2(i, 11) * 5 + 2) * layer.size;
    const h = w2 * 2.5;
    const hue = 45 + rng2(i, 12) * 20;
    ctx.save();
    ctx.translate(x2 < 0 ? x2 + W2 : x2, y2 < 0 ? y2 + H2 : y2);
    ctx.rotate(rot);
    ctx.globalAlpha = layer.opacity;
    ctx.fillStyle = layer.rgb ? `hsl(${(i * 47 + lt * 30) % 360},100%,60%)` : `hsl(${hue},100%,60%)`;
    ctx.fillRect(-w2 / 2, -h / 2, w2, h);
    ctx.restore();
  }
}
function drawHearts(ctx, layer, lt, W2, H2) {
  const n2 = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n2; i++) {
    const phase = rng2(i, 7) * cycle;
    const lt2 = (lt + phase) % cycle / cycle;
    const spd = (rng2(i, 4) * 0.4 + 0.3) * layer.speed;
    const vy = layer.directionY <= 0 ? -1 : 1;
    const wobble = Math.sin(lt2 * Math.PI * 3 + rng2(i, 8) * Math.PI * 2) * 20 * layer.wind;
    const x2 = (rng2(i, 1) * W2 + wobble) % W2;
    const y2 = (rng2(i, 2) * H2 + vy * lt2 * H2 * spd) % H2;
    const sz = (rng2(i, 3) * 12 + 6) * layer.size;
    ctx.save();
    ctx.translate(x2 < 0 ? x2 + W2 : x2, y2 < 0 ? y2 + H2 : y2);
    ctx.globalAlpha = layer.opacity;
    ctx.fillStyle = layer.rgb ? `hsl(${(i * 40 + 340) % 360},90%,65%)` : layer.color || "#ff4466";
    ctx.beginPath();
    ctx.moveTo(0, sz * 0.3);
    ctx.bezierCurveTo(-sz, -sz * 0.3, -sz * 1.2, sz * 0.8, 0, sz * 1.2);
    ctx.bezierCurveTo(sz * 1.2, sz * 0.8, sz, -sz * 0.3, 0, sz * 0.3);
    ctx.fill();
    ctx.restore();
  }
}
function drawStars(ctx, layer, lt, W2, H2) {
  const n2 = Math.round(layer.count);
  const cycle = layer.cycleDuration;
  for (let i = 0; i < n2; i++) {
    const phase = rng2(i, 7) * cycle;
    const lt2 = (lt + phase) % cycle / cycle;
    const spd = (rng2(i, 4) * 0.8 + 0.4) * layer.speed;
    const angle = rng2(i, 9) * Math.PI * 2 + layer.rotation * Math.PI / 180;
    const x2 = (rng2(i, 1) * W2 + Math.cos(angle) * lt2 * H2 * spd * layer.directionX) % W2;
    const y2 = (rng2(i, 2) * H2 + Math.sin(angle) * lt2 * H2 * spd * layer.directionY + lt2 * H2 * 0.4) % H2;
    const trail = Math.min(1, lt2 * 5) * (1 - lt2) * 2;
    const sz = (rng2(i, 3) * 2 + 1) * layer.size;
    ctx.save();
    ctx.translate(x2 < 0 ? x2 + W2 : x2, y2 < 0 ? y2 + H2 : y2);
    ctx.rotate(angle);
    ctx.globalAlpha = layer.opacity * trail;
    ctx.strokeStyle = layer.rgb ? `hsl(${(i * 67 + lt * 40) % 360},100%,85%)` : layer.color || "#ffffcc";
    ctx.lineWidth = sz;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-sz * 20 * trail, 0);
    ctx.stroke();
    ctx.restore();
  }
}
function drawLensFlare(ctx, layer, lt, W2, H2) {
  const n2 = Math.min(Math.round(layer.count * 0.1), 5);
  for (let i = 0; i < n2; i++) {
    const cx = rng2(i, 1) * W2;
    const cy = rng2(i, 2) * H2 * 0.4;
    const pulse = (Math.sin(lt * (rng2(i, 3) * 0.5 + 0.3) * Math.PI * 2) + 1) / 2;
    const sz = (rng2(i, 4) * 120 + 60) * layer.size;
    const col = layer.rgb ? `hsl(${(i * 60 + lt * 30) % 360},90%,90%)` : layer.color || "#ffffff";
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, sz * (0.5 + pulse * 0.5));
    grad.addColorStop(0, hexAlpha(col, layer.opacity * (0.6 + pulse * 0.4)));
    grad.addColorStop(0.3, hexAlpha(col, layer.opacity * 0.2));
    grad.addColorStop(1, hexAlpha(col, 0));
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, sz, 0, Math.PI * 2);
    ctx.fill();
    ctx.save();
    ctx.globalAlpha = 0.3 * pulse * layer.opacity;
    ctx.strokeStyle = col;
    ctx.lineWidth = 2 * layer.size;
    ctx.shadowBlur = 12;
    ctx.shadowColor = col;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(W2, cy);
    ctx.stroke();
    ctx.restore();
  }
}
function drawFilmGrain(ctx, layer, lt, W2, H2) {
  const frameSeed = Math.floor(lt * 24);
  const grain = layer.size * 1.5;
  const step = Math.max(2, Math.round(4 / grain));
  for (let y2 = 0; y2 < H2; y2 += step) {
    for (let x2 = 0; x2 < W2; x2 += step) {
      const v2 = rng(frameSeed * 9999 + x2 * 1e3 + y2);
      if (v2 > 0.5) {
        const bright = v2 > 0.75 ? 255 : 0;
        ctx.fillStyle = `rgba(${bright},${bright},${bright},${layer.opacity * (v2 - 0.5) * 0.5})`;
        ctx.fillRect(x2, y2, step, step);
      }
    }
  }
}
function drawVhsNoise(ctx, layer, lt, W2, H2) {
  const frameSeed = Math.floor(lt * 30);
  const bands = Math.round(layer.count * 0.1 + 3);
  for (let b = 0; b < bands; b++) {
    const y2 = rng2(frameSeed + b, b) * H2;
    const h = rng2(frameSeed + b, b + 1) * 12 + 2;
    const shift = (rng2(frameSeed + b, b + 2) - 0.5) * 30 * layer.size;
    const alpha = (rng2(frameSeed + b, b + 3) * 0.4 + 0.1) * layer.opacity;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = `rgb(${Math.round(rng2(b, 0) * 255)},${Math.round(rng2(b, 1) * 255)},${Math.round(rng2(b, 2) * 255)})`;
    ctx.fillRect(0, y2, W2, h);
    ctx.globalAlpha = 0.15 * layer.opacity;
    ctx.drawImage(ctx.canvas, shift, 0, W2, H2, 0, 0, W2, H2);
    ctx.restore();
  }
  ctx.globalAlpha = 0.06 * layer.opacity;
  ctx.fillStyle = "#000";
  for (let y2 = 0; y2 < H2; y2 += 3) {
    ctx.fillRect(0, y2, W2, 1);
  }
  ctx.globalAlpha = 1;
}
function drawScanlines(ctx, layer, lt, W2, H2) {
  const spacing = Math.max(2, Math.round(6 / layer.size));
  ctx.fillStyle = "#000";
  ctx.globalAlpha = layer.opacity * 0.35;
  for (let y2 = 0; y2 < H2; y2 += spacing) {
    ctx.fillRect(0, y2, W2, Math.ceil(spacing * 0.4));
  }
  ctx.globalAlpha = 1;
}
function drawVignettePulse(ctx, layer, lt, W2, H2) {
  const pulse = (Math.sin(lt * layer.speed * Math.PI * 2) + 1) / 2;
  const strength = layer.opacity * (0.4 + pulse * 0.6);
  const grad = ctx.createRadialGradient(W2 / 2, H2 / 2, 0, W2 / 2, H2 / 2, Math.max(W2, H2) * 0.7);
  const col = layer.color || "#000000";
  grad.addColorStop(0, hexAlpha(col, 0));
  grad.addColorStop(0.6, hexAlpha(col, 0));
  grad.addColorStop(1, hexAlpha(col, strength));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W2, H2);
}
function drawChromatic(ctx, layer, lt, W2, H2) {
  const shift = Math.sin(lt * layer.speed * Math.PI * 2) * 6 * layer.size;
  ctx.save();
  ctx.globalAlpha = layer.opacity * 0.25;
  ctx.globalCompositeOperation = "screen";
  ctx.drawImage(ctx.canvas, shift, 0);
  ctx.drawImage(ctx.canvas, -shift, 0);
  ctx.restore();
}
function drawTvStatic(ctx, layer, lt, W2, H2) {
  const frameSeed = Math.floor(lt * 30);
  const step = Math.max(2, Math.round(3 / layer.size));
  for (let y2 = 0; y2 < H2; y2 += step) {
    for (let x2 = 0; x2 < W2; x2 += step) {
      const v2 = rng(frameSeed * 7919 + x2 / step * 1e3 + y2 / step) * 255;
      ctx.fillStyle = `rgba(${v2},${v2},${v2},${layer.opacity * 0.7})`;
      ctx.fillRect(x2, y2, step, step);
    }
  }
}
function drawGlitchRgb(ctx, layer, lt, W2, H2) {
  const frameSeed = Math.floor(lt * 15);
  const glitches = Math.round(layer.count * 0.05 + 2);
  for (let g = 0; g < glitches; g++) {
    if (rng2(frameSeed + g, 99) > 0.6) continue;
    const y2 = rng2(frameSeed + g, g) * H2;
    const h = rng2(frameSeed + g, g + 1) * 30 + 4;
    const shiftR = (rng2(frameSeed + g, g + 2) - 0.5) * 20 * layer.size;
    const shiftB = (rng2(frameSeed + g, g + 3) - 0.5) * 20 * layer.size;
    ctx.save();
    ctx.globalAlpha = layer.opacity * 0.5;
    ctx.globalCompositeOperation = "screen";
    ctx.drawImage(ctx.canvas, shiftR, 0, W2, H2, 0, y2, W2, h);
    ctx.drawImage(ctx.canvas, shiftB, 0, W2, H2, 0, y2 + h * 0.3, W2, h * 0.6);
    ctx.restore();
  }
}
function drawPixelShatter(ctx, layer, lt, W2, H2) {
  const frameSeed = Math.floor(lt * 12);
  const blocks = Math.round(layer.count * 0.2 + 5);
  for (let b = 0; b < blocks; b++) {
    if (rng2(frameSeed + b, 77) > 0.5) continue;
    const x2 = rng2(frameSeed + b, b) * W2;
    const y2 = rng2(frameSeed + b, b + 1) * H2;
    const bw = (rng2(frameSeed + b, b + 2) * 60 + 10) * layer.size;
    const bh2 = (rng2(frameSeed + b, b + 3) * 20 + 4) * layer.size;
    const shift = (rng2(frameSeed + b, b + 4) - 0.5) * 40 * layer.size;
    ctx.save();
    ctx.globalAlpha = layer.opacity * 0.7;
    ctx.drawImage(ctx.canvas, x2 + shift, y2, bw, bh2, x2, y2, bw, bh2);
    ctx.restore();
  }
}
function drawMatrix(ctx, layer, lt, W2, H2) {
  const fontSize = Math.round(12 * layer.size);
  const cols = Math.floor(W2 / fontSize);
  const cycle = layer.cycleDuration;
  const col = layer.color || "#00ff41";
  ctx.font = `${fontSize}px monospace`;
  for (let c = 0; c < cols; c++) {
    const phase = rng2(c, 99) * cycle;
    const lt2 = (lt * layer.speed + phase) % cycle / cycle;
    const dropY = lt2 * (H2 + 20 * fontSize) - 20 * fontSize;
    const chars = Math.round(rng2(c, 1) * 20 + 5);
    for (let r2 = 0; r2 < chars; r2++) {
      const y2 = dropY - r2 * fontSize;
      if (y2 < -fontSize || y2 > H2 + fontSize) continue;
      const alpha = layer.opacity * (r2 === 0 ? 1 : Math.max(0, 1 - r2 / chars));
      const charCode = Math.floor(rng(c * 1e3 + r2 + Math.floor(lt * 5)) * 94) + 33;
      ctx.fillStyle = r2 === 0 ? `rgba(255,255,255,${alpha})` : layer.rgb ? `hsla(${(c * 37 + lt * 40) % 360},100%,55%,${alpha})` : hexAlpha(col, alpha);
      ctx.fillText(String.fromCharCode(charCode), c * fontSize, y2);
    }
  }
}
function drawScanlineGlitch(ctx, layer, lt, W2, H2) {
  const frameSeed = Math.floor(lt * 20);
  ctx.globalAlpha = layer.opacity * 0.2;
  ctx.fillStyle = "#000";
  for (let y2 = 0; y2 < H2; y2 += 4) {
    ctx.fillRect(0, y2, W2, 2);
  }
  ctx.globalAlpha = 1;
  const jumps = Math.round(layer.count * 0.05 + 1);
  for (let j = 0; j < jumps; j++) {
    if (rng2(frameSeed + j, 50) > 0.4) continue;
    const y2 = rng2(frameSeed + j, j) * H2;
    const h = rng2(frameSeed + j, j + 1) * 8 + 2;
    const shift = (rng2(frameSeed + j, j + 2) - 0.5) * 30 * layer.size;
    ctx.save();
    ctx.globalAlpha = layer.opacity * 0.6;
    ctx.drawImage(ctx.canvas, shift, 0, W2, H2, 0, y2, W2, h);
    ctx.restore();
  }
}
const DRAW_FNS = {
  "snow": drawSnow,
  "sakura": drawSakura,
  "leaves": drawLeaves,
  "rain": drawRain,
  "drizzle": drawDrizzle,
  "fog": drawFog,
  "firefly": drawFirefly,
  "bubbles": drawBubbles,
  "smoke": drawSmoke,
  "dust": drawDust,
  "confetti": drawConfetti,
  "glitter": drawGlitter,
  "bokeh": drawBokeh,
  "sparkle": drawSparkle,
  "stardust": drawStardust,
  "gold-rain": drawGoldRain,
  "hearts": drawHearts,
  "stars": drawStars,
  "lens-flare": drawLensFlare,
  "film-grain": drawFilmGrain,
  "vhs-noise": drawVhsNoise,
  "scanlines": drawScanlines,
  "vignette-pulse": drawVignettePulse,
  "chromatic": drawChromatic,
  "tv-static": drawTvStatic,
  "glitch-rgb": drawGlitchRgb,
  "pixel-shatter": drawPixelShatter,
  "matrix": drawMatrix,
  "scanline-glitch": drawScanlineGlitch
};
function drawOverlayLayers(ctx, layers, t2, W2, H2) {
  for (const layer of layers) {
    if (!layer.enabled) continue;
    const cycle = layer.cycleDuration > 0 ? layer.cycleDuration : 8;
    const lt = loopT(t2, cycle);
    ctx.save();
    const fn = DRAW_FNS[layer.preset];
    if (fn) fn(ctx, layer, lt, W2, H2);
    ctx.restore();
  }
}
const KEY_VERT = `
attribute vec2 aPos;
attribute vec2 aUV;
varying vec2 vUV;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); vUV = aUV; }
`;
const KEY_FRAG = `
precision mediump float;
varying vec2 vUV;
uniform sampler2D uTex;
uniform vec3 uKey;
uniform float uSimilarity;
uniform float uSmoothness;
uniform float uSpill;
uniform float uFeather;
void main() {
  vec4 src = texture2D(uTex, vUV);
  float d = distance(src.rgb, uKey);
  float k = smoothstep(uSimilarity, uSimilarity + uSmoothness + 0.001, d);
  // feather softens the alpha edge further
  k = mix(k, smoothstep(uSimilarity - uFeather, uSimilarity + uFeather + 0.001, d), uFeather);
  float a = src.a * k;
  // spill reduction: desaturate residual key colour
  if (uSpill > 0.0) {
    float g = (src.r + src.g + src.b) / 3.0;
    src.rgb = mix(src.rgb, vec3(g), uSpill * (1.0 - k));
  }
  gl_FragColor = vec4(src.rgb, a);
}
`;
class ChromaKeyer {
  canvas = document.createElement("canvas");
  // never appended to DOM
  gl = null;
  prog = null;
  quad = null;
  tex = null;
  lost = false;
  constructor() {
    this.canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      this.lost = true;
    });
    this.canvas.addEventListener("webglcontextrestored", () => {
      this.lost = false;
      this.init();
    });
    this.init();
  }
  init() {
    const gl2 = this.canvas.getContext("webgl", { premultipliedAlpha: false, alpha: true });
    if (!gl2) {
      this.lost = true;
      return;
    }
    this.gl = gl2;
    const compile = (type, src) => {
      const s = gl2.createShader(type);
      gl2.shaderSource(s, src);
      gl2.compileShader(s);
      return s;
    };
    const p2 = gl2.createProgram();
    gl2.attachShader(p2, compile(gl2.VERTEX_SHADER, KEY_VERT));
    gl2.attachShader(p2, compile(gl2.FRAGMENT_SHADER, KEY_FRAG));
    gl2.linkProgram(p2);
    if (!gl2.getProgramParameter(p2, gl2.LINK_STATUS)) {
      console.warn("customOverlay2d keyer shader link error:", gl2.getProgramInfoLog(p2));
      this.lost = true;
      return;
    }
    this.prog = p2;
    this.quad = gl2.createBuffer();
    gl2.bindBuffer(gl2.ARRAY_BUFFER, this.quad);
    gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array([
      // pos      uv
      -1,
      -1,
      0,
      0,
      1,
      -1,
      1,
      0,
      -1,
      1,
      0,
      1,
      1,
      1,
      1,
      1
    ]), gl2.STATIC_DRAW);
    this.tex = gl2.createTexture();
    gl2.bindTexture(gl2.TEXTURE_2D, this.tex);
    gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_S, gl2.CLAMP_TO_EDGE);
    gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_T, gl2.CLAMP_TO_EDGE);
    gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.LINEAR);
    gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MAG_FILTER, gl2.LINEAR);
    this.lost = false;
  }
  /** Key one media frame; returns the keyed offscreen canvas, or null on GL failure. */
  key(el2, mw, mh2, chroma) {
    const gl2 = this.gl;
    if (this.lost || !gl2 || !this.prog || !this.quad || !this.tex) return null;
    const s = Math.min(1, 1920 / Math.max(mw, mh2));
    const cw = Math.max(1, Math.round(mw * s)), ch2 = Math.max(1, Math.round(mh2 * s));
    if (this.canvas.width !== cw || this.canvas.height !== ch2) {
      this.canvas.width = cw;
      this.canvas.height = ch2;
    }
    gl2.bindFramebuffer(gl2.FRAMEBUFFER, null);
    gl2.viewport(0, 0, cw, ch2);
    gl2.useProgram(this.prog);
    gl2.bindBuffer(gl2.ARRAY_BUFFER, this.quad);
    const aPos = gl2.getAttribLocation(this.prog, "aPos");
    const aUV = gl2.getAttribLocation(this.prog, "aUV");
    gl2.enableVertexAttribArray(aPos);
    gl2.vertexAttribPointer(aPos, 2, gl2.FLOAT, false, 16, 0);
    gl2.enableVertexAttribArray(aUV);
    gl2.vertexAttribPointer(aUV, 2, gl2.FLOAT, false, 16, 8);
    gl2.activeTexture(gl2.TEXTURE0);
    gl2.bindTexture(gl2.TEXTURE_2D, this.tex);
    gl2.pixelStorei(gl2.UNPACK_FLIP_Y_WEBGL, 1);
    try {
      gl2.texImage2D(gl2.TEXTURE_2D, 0, gl2.RGBA, gl2.RGBA, gl2.UNSIGNED_BYTE, el2);
    } catch {
      return null;
    }
    gl2.uniform1i(gl2.getUniformLocation(this.prog, "uTex"), 0);
    const [kr, kg2, kb2] = hexToRgb01(chroma.color);
    gl2.uniform3f(gl2.getUniformLocation(this.prog, "uKey"), kr, kg2, kb2);
    gl2.uniform1f(gl2.getUniformLocation(this.prog, "uSimilarity"), Math.max(1e-3, chroma.similarity));
    gl2.uniform1f(gl2.getUniformLocation(this.prog, "uSmoothness"), chroma.smoothness);
    gl2.uniform1f(gl2.getUniformLocation(this.prog, "uSpill"), chroma.spill);
    gl2.uniform1f(gl2.getUniformLocation(this.prog, "uFeather"), chroma.feather);
    gl2.disable(gl2.BLEND);
    gl2.clearColor(0, 0, 0, 0);
    gl2.clear(gl2.COLOR_BUFFER_BIT);
    gl2.drawArrays(gl2.TRIANGLE_STRIP, 0, 4);
    return this.canvas;
  }
  dispose() {
    const gl2 = this.gl;
    if (gl2) {
      if (this.prog) gl2.deleteProgram(this.prog);
      if (this.quad) gl2.deleteBuffer(this.quad);
      if (this.tex) gl2.deleteTexture(this.tex);
    }
    this.gl = null;
    this.prog = null;
    this.quad = null;
    this.tex = null;
    this.lost = true;
  }
}
class CustomOverlay2D {
  constructor(srcUrl) {
    this.srcUrl = srcUrl;
  }
  media = /* @__PURE__ */ new Map();
  keyer = null;
  getMedia(o) {
    const key = o.id + "|" + o.path;
    let m2 = this.media.get(key);
    if (m2) return m2;
    for (const [k2, v2] of this.media) {
      if (k2.startsWith(o.id + "|")) {
        this.disposeMedia(v2);
        this.media.delete(k2);
      }
    }
    const url = this.srcUrl(o.path, o.ext);
    if (o.kind === "video") {
      const el2 = document.createElement("video");
      el2.src = url;
      el2.muted = true;
      el2.loop = o.loop !== "off";
      el2.playsInline = true;
      el2.crossOrigin = "anonymous";
      m2 = { el: el2, kind: "video", ready: false };
      el2.addEventListener("loadeddata", () => {
        m2.ready = true;
        el2.play().catch(() => {
        });
      });
    } else {
      const el2 = new Image();
      el2.crossOrigin = "anonymous";
      el2.src = url;
      m2 = { el: el2, kind: "image", ready: false };
      el2.onload = () => {
        m2.ready = true;
      };
    }
    this.media.set(key, m2);
    return m2;
  }
  disposeMedia(m2) {
    if (m2.kind === "video") {
      m2.el.pause();
      m2.el.src = "";
    }
  }
  /** Remove media whose overlay id is no longer present. */
  prune(overlays) {
    const live = new Set(overlays.map((o) => o.id + "|" + o.path));
    for (const [k2, v2] of this.media) {
      if (!live.has(k2)) {
        this.disposeMedia(v2);
        this.media.delete(k2);
      }
    }
  }
  mediaSize(m2) {
    if (m2.kind === "video") {
      const v2 = m2.el;
      return [v2.videoWidth || 1, v2.videoHeight || 1];
    }
    const i = m2.el;
    return [i.naturalWidth || 1, i.naturalHeight || 1];
  }
  syncVideo(v2, o, t2, playing) {
    v2.loop = o.loop !== "off";
    const dur = v2.duration || 0;
    if (playing) {
      if (v2.paused) v2.play().catch(() => {
      });
    } else {
      if (!v2.paused) v2.pause();
      if (dur > 0) {
        const lt = o.loop === "off" ? Math.min(t2, dur) : t2 % dur;
        if (Math.abs(v2.currentTime - lt) > 0.05) {
          try {
            v2.currentTime = lt;
          } catch {
          }
        }
      }
    }
  }
  /**
   * Draw all enabled overlays into the preview 2D context (array order = bottom→top).
   * @param ctx the main preview canvas context — caller's state is preserved
   * @param t playback time seconds (drives video loop scrubbing when paused)
   * @param playing whether audio is playing (videos free-run; else seek to t)
   */
  draw(ctx, overlays, t2, playing) {
    this.prune(overlays);
    const W2 = ctx.canvas.width, H2 = ctx.canvas.height;
    for (const o of overlays) {
      if (!o.enabled || o.opacity <= 0) continue;
      const m2 = this.getMedia(o);
      if (!m2.ready) continue;
      if (m2.kind === "video") this.syncVideo(m2.el, o, t2, playing);
      const [mw, mh2] = this.mediaSize(m2);
      if (mw < 2 || mh2 < 2) continue;
      const fit = Math.min(W2 / mw, H2 / mh2);
      const drawW = mw * fit * o.scale;
      const drawH = mh2 * fit * o.scale;
      let src = m2.el;
      let op = CANVAS_BLEND_OP[o.blend] ?? "source-over";
      if (o.blend === "chroma") {
        this.keyer ??= new ChromaKeyer();
        const keyed = this.keyer.key(m2.el, mw, mh2, o.chroma);
        if (keyed) src = keyed;
        op = "source-over";
      }
      ctx.save();
      ctx.translate(o.posX * W2, o.posY * H2);
      if (o.rotation !== 0) ctx.rotate(o.rotation * Math.PI / 180);
      ctx.globalAlpha = o.opacity;
      ctx.globalCompositeOperation = op;
      try {
        ctx.drawImage(src, -drawW / 2, -drawH / 2, drawW, drawH);
      } catch {
      }
      ctx.restore();
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
  }
  dispose() {
    for (const [, v2] of this.media) this.disposeMedia(v2);
    this.media.clear();
    this.keyer?.dispose();
    this.keyer = null;
  }
}
const EDGE_PUNCT = /^[\s,.;:!?،۔。、「」“”"…~*]+|[\s,.;:!?،۔。、「」“”"…~*]+$/g;
function cleanLyricText(s) {
  return (s || "").replace(EDGE_PUNCT, "").replace(/\s{2,}/g, " ");
}
function parseLrc(text) {
  const lines = [];
  const re = /\[(\d{1,2}):(\d{2})(?:[.:](\d{1,3}))?\]/g;
  for (const raw of text.split(/\r?\n/)) {
    const matches = [...raw.matchAll(re)];
    if (!matches.length) continue;
    const content = raw.replace(re, "").trim();
    for (const m of matches) {
      const min = parseInt(m[1], 10);
      const sec = parseInt(m[2], 10);
      const frac = m[3] ? parseInt(m[3].padEnd(3, "0"), 10) / 1e3 : 0;
      const t = min * 60 + sec + frac;
      lines.push({ t, end: 0, text: content });
    }
  }
  lines.sort((a, b) => a.t - b.t);
  for (let i = 0; i < lines.length; i++) lines[i].end = lines[i + 1]?.t ?? lines[i].t + 4;
  return lines.filter((l) => l.text.length > 0);
}
function srtTime(s) {
  const m = /(\d{2}):(\d{2}):(\d{2})[,.](\d{3})/.exec(s);
  if (!m) return 0;
  return parseInt(m[1]) * 3600 + parseInt(m[2]) * 60 + parseInt(m[3]) + parseInt(m[4]) / 1e3;
}
function parseSrt(text) {
  const lines = [];
  const blocks = text.split(/\r?\n\r?\n/);
  for (const block of blocks) {
    const rows = block.split(/\r?\n/).filter(Boolean);
    const timeRow = rows.find((r) => r.includes("-->"));
    if (!timeRow) continue;
    const [a, b] = timeRow.split("-->");
    const t = srtTime(a);
    const end = srtTime(b);
    const textRows = rows.slice(rows.indexOf(timeRow) + 1);
    const content = textRows.join(" ").trim();
    if (content) lines.push({ t, end, text: content });
  }
  return lines;
}
function parseTxt(text) {
  const rows = text.split(/\r?\n/).map((r) => r.trim()).filter(Boolean);
  return rows.map((text2) => ({ t: -1, end: -1, text: text2 }));
}
function normalizeLyrics(input, audioDuration) {
  let rawLines = [];
  if (!input) {
    return { enabled: true, showLyrics: true, lines: [], lyrics: [] };
  }
  if (typeof input === "string") {
    if (input.includes("[") && input.includes("]")) {
      rawLines = parseLrc(input);
    } else if (input.includes("-->")) {
      rawLines = parseSrt(input);
    } else {
      rawLines = parseTxt(input);
    }
  } else if (Array.isArray(input)) {
    rawLines = input;
  } else if (typeof input === "object") {
    if (Array.isArray(input.lines)) {
      rawLines = input.lines;
    } else if (Array.isArray(input.segments)) {
      rawLines = input.segments.map((seg, idx) => ({
        t: seg.start,
        end: seg.end,
        text: seg.text || "",
        words: seg.words ? seg.words.map(w => ({ t: w.start ?? w.t, end: w.end, text: w.word ?? w.text })) : undefined
      }));
    } else if (typeof input.content === "string") {
      rawLines = normalizeLyrics(input.content, audioDuration).lines;
    } else if (Array.isArray(input.timestamps)) {
      rawLines = input.timestamps;
    } else {
      rawLines = [];
    }
  }
  let lines = rawLines.map((line, idx) => {
    if (!line) return null;
    let text = typeof line === "string" ? line : (line.text || line.word || "");
    text = cleanLyricText(text);
    if (!text) return null;
    let t = typeof line.t === "number" && !isNaN(line.t) ? line.t : (line.start ?? -1);
    let end = typeof line.end === "number" && !isNaN(line.end) ? line.end : -1;
    let words = undefined;
    if (Array.isArray(line.words)) {
      words = line.words.map(w => {
        const wText = cleanLyricText(w.text || w.word || "");
        if (!wText) return null;
        const wt = typeof w.t === "number" && !isNaN(w.t) ? w.t : (w.start ?? -1);
        const wend = typeof w.end === "number" && !isNaN(w.end) ? w.end : -1;
        return { text: wText, t: wt, end: wend };
      }).filter(Boolean);
    }
    return {
      id: line.id || `line-${idx}-${Math.random().toString(36).slice(2, 6)}`,
      text,
      t,
      end,
      words
    };
  }).filter(Boolean);

  const dur = typeof audioDuration === "number" && audioDuration > 0 ? audioDuration : (lines.length * 4 || 15);
  const hasNoTimings = lines.every(l => l.t < 0);

  if (hasNoTimings) {
    const minLines = Math.max(3, Math.ceil(dur / 4));
    const allWords = lines.flatMap(l => (l.text || "").split(/\s+/)).map(w => w.trim()).filter(Boolean);
    
    if (allWords.length > 0) {
      const idealWordsPerLine = Math.floor(allWords.length / minLines);
      const targetWordsPerLine = Math.max(1, Math.min(8, idealWordsPerLine));
      
      const newLines = [];
      for (let i = 0; i < allWords.length; i += targetWordsPerLine) {
        const chunk = allWords.slice(i, i + targetWordsPerLine);
        newLines.push({
          id: `line-chunk-${Math.random().toString(36).slice(2, 6)}`,
          text: chunk.join(" "),
          t: -1,
          end: -1
        });
      }
      lines = newLines;
    }
    
    const perLine = dur / Math.max(1, lines.length);
    lines = lines.map((l, i) => {
      const startT = i * perLine;
      const endT = (i + 1) * perLine;
      let words = l.words;
      if (words && words.length > 0) {
        const perWord = perLine / words.length;
        words = words.map((w, wi) => ({
          text: w.text,
          t: startT + wi * perWord,
          end: startT + (wi + 1) * perWord
        }));
      }
      return {
        id: l.id || `line-${i}-${Math.random().toString(36).slice(2, 6)}`,
        text: l.text,
        t: startT,
        end: endT,
        words
      };
    });
  } else {
    lines.sort((a, b) => a.t - b.t);
    for (let i = 0; i < lines.length; i++) {
      const curr = lines[i];
      if (curr.t < 0) {
        curr.t = i > 0 ? lines[i - 1].end : 0;
      }
      if (curr.end <= curr.t) {
        const nextStart = lines[i + 1]?.t;
        curr.end = nextStart && nextStart > curr.t ? nextStart : Math.min(dur, curr.t + 4);
      }
      if (curr.words && curr.words.length > 0) {
        const lineDur = curr.end - curr.t;
        const perWord = lineDur / curr.words.length;
        curr.words = curr.words.map((w, wi) => {
          let wt = w.t >= 0 ? w.t : curr.t + wi * perWord;
          let wend = w.end > wt ? w.end : curr.t + (wi + 1) * perWord;
          return { text: w.text, t: wt, end: wend };
        });
      }
    }
  }
  lines.sort((a, b) => a.t - b.t);
  return {
    enabled: true,
    showLyrics: true,
    lines,
    lyrics: lines,
    style: input?.style,
    highlightColor: input?.highlightColor,
    animation: input?.animation
  };
}
function fakeSpectrumFrame(bands, t2, bpm = 90) {
  const beat = 60 / bpm;
  const phase = t2 % beat / beat;
  const beatIdx = Math.floor(t2 / beat);
  const kick = Math.pow(1 - phase, 2.2);
  const isBackbeat = beatIdx % 2 === 1;
  const snare = isBackbeat ? Math.pow(1 - phase, 3) : 0;
  const hatPeriod = beat / 2;
  const hphase = t2 % hatPeriod / hatPeriod;
  const hat = Math.pow(1 - hphase, 4);
  const vals = new Array(bands);
  for (let i = 0; i < bands; i++) {
    const p2 = bands > 1 ? i / (bands - 1) : 0;
    const bass = Math.max(0, 1 - p2 / 0.28);
    const mid = Math.exp(-Math.pow((p2 - 0.45) / 0.22, 2));
    const treble = Math.max(0, (p2 - 0.55) / 0.45);
    const shimmer = 0.12 * (0.5 + 0.5 * Math.sin(t2 * (2 + p2 * 6) + i * 0.6));
    let v2 = bass * kick + mid * snare * 0.9 + treble * hat * 0.7 + shimmer;
    v2 += mid * kick * 0.25;
    v2 = v2 * 0.95 + 0.05;
    vals[i] = Math.max(0, Math.min(1, v2));
  }
  return vals;
}
function drawPlaylistIcon(ctx, iconStyle, cx, cy, s) {
  if (iconStyle === "dot") {
    ctx.beginPath();
    ctx.arc(cx, cy, s * 0.32, 0, Math.PI * 2);
    ctx.fill();
  } else if (iconStyle === "bars") {
    const w2 = s * 0.16, h = s * 0.7;
    ctx.fillRect(cx - s * 0.28, cy - h / 2, w2, h);
    ctx.fillRect(cx + s * 0.08, cy - h / 2, w2, h);
  } else {
    const h = s * 0.5;
    ctx.beginPath();
    ctx.moveTo(cx - s * 0.28, cy - h);
    ctx.lineTo(cx - s * 0.28, cy + h);
    ctx.lineTo(cx + s * 0.36, cy);
    ctx.closePath();
    ctx.fill();
  }
}
function drawPlaylistList(ctx, items, style, t2, W2, H2) {
  if (!items.length) return;
  const scale = H2 / 1080;
  const activeIdx = items.findIndex((it) => t2 >= it.start && t2 < it.start + it.duration);
  const lineH = (style.fontSize + style.spacing) * scale;
  const blockH = items.length * lineH;
  const anchorY = style.position === "custom" ? H2 * style.posY : style.position === "top" ? H2 * 0.12 + blockH / 2 : style.position === "bottom" ? H2 * 0.88 - blockH / 2 : H2 / 2;
  const startY = anchorY - blockH / 2;
  const x2 = style.position === "custom" ? W2 * style.posX : style.align === "left" ? W2 * 0.08 : style.align === "right" ? W2 * 0.92 : W2 / 2;
  ctx.textAlign = style.align === "left" ? "left" : style.align === "right" ? "right" : "center";
  ctx.textBaseline = "middle";
  ctx.font = `700 ${style.fontSize * scale}px ${style.fontFamily}, sans-serif`;
  if (style.shadow) {
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 8 * scale;
    ctx.shadowOffsetY = 2 * scale;
  }
  for (let i = 0; i < items.length; i++) {
    ctx.save();
    const isActive = i === activeIdx;
    ctx.fillStyle = isActive ? style.activeColor : style.inactiveColor;
    ctx.globalAlpha = isActive ? style.opacity : style.opacity * 0.55;
    const y2 = startY + i * lineH;
    const iconX = x2 - style.fontSize * 1.1 * scale;
    if (style.strokeWidth > 0) {
      ctx.strokeStyle = style.strokeColor;
      ctx.lineWidth = style.strokeWidth * scale * 2;
      ctx.lineJoin = "round";
      ctx.strokeText(items[i].title, x2, y2);
    }
    if (isActive && style.iconStyle) drawPlaylistIcon(ctx, style.iconStyle, iconX, y2, style.fontSize * scale);
    ctx.fillText(items[i].title, x2, y2);
    ctx.restore();
  }
}
function drawCustomTexts(ctx, items, t2, W2, H2) {
  if (!items?.length) return;
  const scale = H2 / 1080;
  for (const it of items) {
    if (!it.enabled || !it.text) continue;
    let x2 = it.posX * W2;
    let y2 = it.posY * H2;
    let size = Math.max(4, it.fontSize) * scale;
    let alpha = 1;
    switch (it.anim) {
      case "pulse":
        size *= 1 + 0.08 * Math.sin(t2 * 3);
        break;
      case "float":
        y2 += Math.sin(t2 * 2) * H2 * 0.012;
        break;
      case "blink":
        alpha = 0.45 + 0.55 * Math.abs(Math.sin(t2 * 2.5));
        break;
      case "sway":
        x2 += Math.sin(t2 * 1.4) * W2 * 0.02;
        break;
    }
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = `700 ${size}px ${it.fontFamily}, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = it.color;
    if (it.glow > 0.02) {
      ctx.shadowBlur = it.glow * 28 * scale;
      ctx.shadowColor = it.glowColor || it.color;
    }
    ctx.fillText(it.text, x2, y2);
    ctx.restore();
  }
}
const PREVIEW_FPS = 30;
function lerp(a, b, t2) {
  return a + (b - a) * t2;
}
function rgbColor(rgb, color, t2, energy) {
  if (rgb) {
    const hue = (t2 * 320 + energy * 40) % 360;
    return `hsl(${hue}, 95%, ${55 + energy * 15}%)`;
  }
  return color;
}
function bandY(cfg, H2) {
  const maxH = H2 * Math.min(0.9, Math.max(0.05, cfg.scale));
  if (cfg.position === "top") return { baseY: 0, maxH, growDir: 1 };
  if (cfg.position === "center") return { baseY: H2 / 2, maxH: maxH / 2, growDir: -1 };
  return { baseY: H2 - 8, maxH, growDir: -1 };
}
function drawSpectrum(ctx, cfg, vals, W2, H2, nowSec) {
  const n2 = vals.length;
  if (!n2) return;
  ctx.save();
  ctx.globalAlpha = cfg.opacity;
  const glowColor = cfg.rgb ? "#ffffff" : cfg.color;
  switch (cfg.preset) {
    case "circular":
    case "radial": {
      const cx = W2 / 2;
      const cy = H2 / 2;
      const baseR = Math.min(W2, H2) * cfg.radius;
      const step = Math.PI * 2 / n2;
      const rotOff = cfg.preset === "radial" ? nowSec * 0.3 : 0;
      ctx.lineWidth = cfg.thickness;
      ctx.lineCap = "round";
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 28;
        ctx.shadowColor = glowColor;
      }
      for (let i = 0; i < n2; i++) {
        const v2 = vals[i];
        const len = baseR * 0.8 * v2 + 3;
        const angle = i * step - Math.PI / 2 + rotOff;
        const x1 = cx + Math.cos(angle) * baseR;
        const y1 = cy + Math.sin(angle) * baseR;
        const x2 = cx + Math.cos(angle) * (baseR + len);
        const y2 = cy + Math.sin(angle) * (baseR + len);
        ctx.strokeStyle = rgbColor(cfg.rgb, cfg.color, i / n2, v2);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      break;
    }
    case "waveform-glow": {
      const { baseY, maxH, growDir } = bandY(cfg, H2);
      const ampDir = growDir * -1;
      ctx.lineWidth = cfg.thickness + 1;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 32;
        ctx.shadowColor = glowColor;
      }
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      for (let i = 0; i < n2; i++) {
        const x2 = i / (n2 - 1) * W2;
        const y2 = baseY + ampDir * vals[i] * maxH;
        ctx.lineTo(x2, y2);
      }
      ctx.lineTo(W2, baseY);
      ctx.closePath();
      const gf = ctx.createLinearGradient(0, 0, W2, 0);
      if (cfg.rgb) {
        for (let s = 0; s <= 6; s++) gf.addColorStop(s / 6, `hsl(${s * 60},100%,60%)`);
      } else {
        gf.addColorStop(0, cfg.color);
        gf.addColorStop(1, cfg.color);
      }
      ctx.fillStyle = gf;
      ctx.globalAlpha = cfg.opacity * 0.35;
      ctx.fill();
      ctx.globalAlpha = cfg.opacity;
      ctx.beginPath();
      for (let i = 0; i < n2; i++) {
        const x2 = i / (n2 - 1) * W2;
        const y2 = baseY + ampDir * vals[i] * maxH;
        if (i === 0) ctx.moveTo(x2, y2);
        else ctx.lineTo(x2, y2);
      }
      ctx.strokeStyle = cfg.rgb ? (() => {
        const g = ctx.createLinearGradient(0, 0, W2, 0);
        for (let s = 0; s <= 6; s++) g.addColorStop(s / 6, `hsl(${s * 60},100%,65%)`);
        return g;
      })() : cfg.color;
      ctx.stroke();
      break;
    }
    case "minimal-line": {
      const { baseY, maxH, growDir } = bandY(cfg, H2);
      const ampDir = growDir * -1;
      ctx.lineWidth = 1.5;
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (let i = 0; i < n2; i++) {
        const x2 = i / (n2 - 1) * W2;
        const y2 = baseY + ampDir * vals[i] * maxH;
        if (i === 0) ctx.moveTo(x2, y2);
        else ctx.lineTo(x2, y2);
      }
      ctx.strokeStyle = cfg.color;
      ctx.globalAlpha = cfg.opacity * 0.85;
      ctx.stroke();
      break;
    }
    case "vintage-radio": {
      const { baseY, maxH, growDir } = bandY(cfg, H2);
      const ampDir = growDir * -1;
      ctx.lineWidth = cfg.thickness;
      ctx.lineJoin = "round";
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 20;
        ctx.shadowColor = glowColor;
      }
      for (const sign of [1, -1]) {
        ctx.beginPath();
        for (let i = 0; i < n2; i++) {
          const x2 = i / (n2 - 1) * W2;
          const y2 = baseY + sign * ampDir * vals[i] * maxH * 0.5;
          if (i === 0) ctx.moveTo(x2, y2);
          else ctx.lineTo(x2, y2);
        }
        ctx.strokeStyle = cfg.color;
        ctx.globalAlpha = cfg.opacity * (sign === 1 ? 1 : 0.5);
        ctx.stroke();
      }
      break;
    }
    case "particle": {
      const { baseY, maxH, growDir } = bandY(cfg, H2);
      const ampDir = growDir * -1;
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 18;
        ctx.shadowColor = glowColor;
      }
      const barW = W2 / n2;
      for (let i = 0; i < n2; i++) {
        const v2 = vals[i];
        const dotCount = Math.ceil(v2 * 8) + 1;
        for (let d = 0; d < dotCount; d++) {
          const x2 = (i + 0.5) * barW + (Math.random() - 0.5) * barW * 0.8;
          const y2 = baseY + ampDir * (d / dotCount) * v2 * maxH;
          const r2 = Math.max(1, cfg.thickness * 0.4 * (1 - d / dotCount));
          ctx.beginPath();
          ctx.arc(x2, y2, r2, 0, Math.PI * 2);
          ctx.fillStyle = rgbColor(cfg.rgb, cfg.color, i / n2, v2);
          ctx.globalAlpha = cfg.opacity * (1 - d / dotCount * 0.6);
          ctx.fill();
        }
      }
      break;
    }
    case "bass-pulse": {
      const { baseY, maxH, growDir } = bandY(cfg, H2);
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 40;
        ctx.shadowColor = glowColor;
      }
      const gap = 3;
      const barW = (W2 - gap * (n2 + 1)) / n2;
      for (let i = 0; i < n2; i++) {
        const v2 = vals[i];
        const bh2 = Math.max(2, v2 * maxH);
        const x2 = gap + i * (barW + gap);
        const y2 = growDir === 1 ? baseY : baseY - bh2;
        const pulse = i < n2 * 0.25 ? 1.3 : 1;
        ctx.globalAlpha = cfg.opacity * Math.min(1, v2 * pulse * 1.5 + 0.1);
        ctx.fillStyle = rgbColor(cfg.rgb, cfg.color, i / n2, v2);
        roundRect(ctx, x2, y2, barW, bh2, 4);
        ctx.fill();
      }
      break;
    }
    case "smooth-jazz": {
      const { baseY, maxH, growDir } = bandY(cfg, H2);
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 14;
        ctx.shadowColor = glowColor;
      }
      const gap = Math.max(2, cfg.thickness * 0.4);
      const barW = (W2 - gap * (n2 + 1)) / n2;
      for (let i = 0; i < n2; i++) {
        const v2 = vals[i];
        const bh2 = Math.max(3, v2 * maxH);
        const x2 = gap + i * (barW + gap);
        const y2 = growDir === 1 ? baseY : baseY - bh2;
        const gr = ctx.createLinearGradient(x2, y2, x2, y2 + bh2);
        const hue = cfg.rgb ? i / n2 * 240 : void 0;
        const base = hue !== void 0 ? `hsl(${hue},90%,65%)` : cfg.color;
        const top = hue !== void 0 ? `hsl(${hue},90%,45%)` : darken(cfg.color);
        if (growDir === 1) {
          gr.addColorStop(0, base);
          gr.addColorStop(1, top);
        } else {
          gr.addColorStop(0, top);
          gr.addColorStop(1, base);
        }
        ctx.fillStyle = gr;
        ctx.globalAlpha = cfg.opacity;
        roundRect(ctx, x2, y2, barW, bh2, Math.min(barW / 2, 10));
        ctx.fill();
      }
      break;
    }
    case "youtube-music": {
      const { baseY, maxH, growDir } = bandY(cfg, H2);
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      const gap = 2;
      const barW = (W2 - gap * (n2 + 1)) / n2;
      for (let i = 0; i < n2; i++) {
        const v2 = vals[i];
        const bh2 = Math.max(4, v2 * maxH);
        const x2 = gap + i * (barW + gap);
        const y2 = growDir === 1 ? baseY : baseY - bh2;
        ctx.fillStyle = rgbColor(cfg.rgb, cfg.color, i / n2, v2);
        ctx.globalAlpha = cfg.opacity;
        roundRect(ctx, x2, y2, barW, bh2, Math.min(barW / 2, 5));
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x2 + barW / 2, y2 - 3, Math.min(barW / 2, 4), 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case "neon-bars": {
      const { baseY, maxH, growDir } = bandY(cfg, H2);
      const gap = 1;
      const barW = Math.max(1, (W2 - gap * (n2 + 1)) / n2);
      ctx.shadowBlur = cfg.glow * 40 + 15;
      ctx.shadowColor = glowColor;
      for (let i = 0; i < n2; i++) {
        const v2 = vals[i];
        const bh2 = Math.max(2, v2 * maxH);
        const x2 = gap + i * (barW + gap);
        const y2 = growDir === 1 ? baseY : baseY - bh2;
        ctx.fillStyle = rgbColor(cfg.rgb, cfg.color, i / n2, v2);
        ctx.globalAlpha = cfg.opacity;
        ctx.fillRect(x2, y2, barW, bh2);
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = cfg.opacity * 0.6;
      for (let i = 0; i < n2; i++) {
        const v2 = vals[i];
        const bh2 = Math.max(2, v2 * maxH);
        const x2 = gap + i * (barW + gap) + barW * 0.3;
        const y2 = growDir === 1 ? baseY : baseY - bh2;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x2, y2, barW * 0.4, bh2);
      }
      break;
    }
    case "rgb-bars": {
      const { baseY, maxH, growDir } = bandY(cfg, H2);
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 20;
        ctx.shadowColor = "#fff";
      }
      const gap = Math.max(1, cfg.thickness * 0.25);
      const barW = (W2 - gap * (n2 + 1)) / n2;
      const grad = ctx.createLinearGradient(0, 0, W2, 0);
      for (let s = 0; s <= 7; s++) grad.addColorStop(s / 7, `hsl(${s * 51.4},100%,55%)`);
      for (let i = 0; i < n2; i++) {
        const v2 = vals[i];
        const bh2 = Math.max(2, v2 * maxH);
        const x2 = gap + i * (barW + gap);
        const y2 = growDir === 1 ? baseY : baseY - bh2;
        ctx.globalAlpha = cfg.opacity;
        ctx.fillStyle = grad;
        ctx.fillRect(x2, y2, barW, bh2);
      }
      break;
    }
    case "mirror-bars": {
      const maxH = H2 * Math.min(0.9, cfg.scale) / 2;
      const baseY = H2 / 2;
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 18;
        ctx.shadowColor = glowColor;
      }
      const gap = Math.max(1, cfg.thickness * 0.3);
      const barW = (W2 - gap * (n2 + 1)) / n2;
      for (let i = 0; i < n2; i++) {
        const v2 = vals[i];
        const bh2 = Math.max(2, v2 * maxH);
        const x2 = gap + i * (barW + gap);
        ctx.fillStyle = rgbColor(cfg.rgb, cfg.color, i / n2, v2);
        ctx.globalAlpha = cfg.opacity;
        roundRect(ctx, x2, baseY - bh2, barW, bh2, Math.min(barW / 2, 6));
        ctx.fill();
        roundRect(ctx, x2, baseY, barW, bh2, Math.min(barW / 2, 6));
        ctx.fill();
      }
      break;
    }
    case "oscilloscope": {
      const cy = H2 / 2;
      const amp = H2 * cfg.scale * 0.5;
      ctx.lineWidth = cfg.thickness;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 22;
        ctx.shadowColor = glowColor;
      }
      ctx.beginPath();
      for (let i = 0; i < n2; i++) {
        const x2 = i / (n2 - 1) * W2;
        const sign = i % 2 === 0 ? 1 : -1;
        const y2 = cy + sign * vals[i] * amp;
        if (i === 0) ctx.moveTo(x2, y2);
        else ctx.lineTo(x2, y2);
      }
      ctx.strokeStyle = cfg.rgb ? (() => {
        const g = ctx.createLinearGradient(0, 0, W2, 0);
        for (let s = 0; s <= 6; s++) g.addColorStop(s / 6, `hsl(${s * 60},100%,65%)`);
        return g;
      })() : cfg.color;
      ctx.stroke();
      break;
    }
    case "dna-twist": {
      const { baseY, maxH, growDir } = bandY(cfg, H2);
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 20;
        ctx.shadowColor = glowColor;
      }
      const gap = Math.max(1, cfg.thickness * 0.25);
      const barW = Math.max(2, (W2 - gap * (n2 + 1)) / n2);
      for (const phase of [0, Math.PI]) {
        for (let i = 0; i < n2; i++) {
          const v2 = vals[i];
          const twist = Math.abs(Math.sin(i / n2 * Math.PI * 3 + phase + nowSec * 1.5));
          const bh2 = Math.max(2, v2 * maxH * twist);
          const x2 = gap + i * (barW + gap);
          const y2 = growDir === 1 ? baseY : baseY - bh2;
          const hue = cfg.rgb ? (i / n2 * 360 + phase * 57) % 360 : void 0;
          ctx.fillStyle = hue !== void 0 ? `hsl(${hue},90%,60%)` : cfg.color;
          ctx.globalAlpha = cfg.opacity * (phase === 0 ? 1 : 0.65);
          roundRect(ctx, x2, y2, barW, bh2, Math.min(barW / 2, 5));
          ctx.fill();
        }
      }
      break;
    }
    case "spiral": {
      const cx = W2 / 2;
      const cy = H2 / 2;
      const minDim = Math.min(W2, H2);
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 22;
        ctx.shadowColor = glowColor;
      }
      ctx.lineWidth = cfg.thickness;
      ctx.lineCap = "round";
      for (let i = 0; i < n2; i++) {
        const v2 = vals[i];
        const t2 = i / n2;
        const angle = t2 * Math.PI * 4 + nowSec * 0.4;
        const r2 = minDim * cfg.radius * (0.1 + t2 * 0.9);
        const len = r2 * 0.18 * v2 + 2;
        const x1 = cx + Math.cos(angle) * r2;
        const y1 = cy + Math.sin(angle) * r2;
        const x2 = cx + Math.cos(angle) * (r2 + len);
        const y2 = cy + Math.sin(angle) * (r2 + len);
        ctx.strokeStyle = rgbColor(cfg.rgb, cfg.color, t2, v2);
        ctx.globalAlpha = cfg.opacity * (0.4 + t2 * 0.6);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      break;
    }
    case "neon-tubes": {
      const { baseY, maxH, growDir } = bandY(cfg, H2);
      ctx.shadowBlur = cfg.glow * 35 + 12;
      ctx.shadowColor = glowColor;
      ctx.lineWidth = Math.max(2, cfg.thickness);
      ctx.lineCap = "round";
      const step = W2 / n2;
      for (let i = 0; i < n2; i++) {
        const v2 = vals[i];
        const bh2 = Math.max(cfg.thickness, v2 * maxH);
        const x2 = (i + 0.5) * step;
        const y1 = growDir === 1 ? baseY : baseY - bh2;
        const y2 = growDir === 1 ? baseY + bh2 : baseY;
        ctx.strokeStyle = rgbColor(cfg.rgb, cfg.color, i / n2, v2);
        ctx.globalAlpha = cfg.opacity;
        ctx.beginPath();
        ctx.moveTo(x2, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      break;
    }
    case "hexagon": {
      const cols = Math.ceil(Math.sqrt(n2 * (W2 / H2)));
      const rows = Math.ceil(n2 / cols);
      const hexW = W2 / cols;
      const hexH = H2 / rows;
      const r2 = Math.min(hexW, hexH) * 0.42;
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 20;
        ctx.shadowColor = glowColor;
      }
      for (let i = 0; i < n2; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const cx = (col + (row % 2 === 0 ? 0.5 : 1)) * hexW;
        const cy = (row + 0.5) * hexH;
        const v2 = vals[i];
        const hr = r2 * (0.3 + v2 * 0.7);
        ctx.beginPath();
        for (let k2 = 0; k2 < 6; k2++) {
          const a = k2 / 6 * Math.PI * 2 - Math.PI / 6;
          if (k2 === 0) ctx.moveTo(cx + Math.cos(a) * hr, cy + Math.sin(a) * hr);
          else ctx.lineTo(cx + Math.cos(a) * hr, cy + Math.sin(a) * hr);
        }
        ctx.closePath();
        ctx.fillStyle = rgbColor(cfg.rgb, cfg.color, i / n2, v2);
        ctx.globalAlpha = cfg.opacity * (0.2 + v2 * 0.8);
        ctx.fill();
      }
      break;
    }
    case "orb-pulse": {
      const cx = W2 / 2;
      const cy = H2 / 2;
      const bass = vals.slice(0, Math.ceil(n2 * 0.2)).reduce((s, v2) => s + v2, 0) / Math.ceil(n2 * 0.2);
      const minDim = Math.min(W2, H2);
      const baseR = minDim * cfg.radius;
      const pulseR = baseR * (1 + bass * 0.5);
      for (let r2 = 3; r2 >= 0; r2--) {
        const gr = ctx.createRadialGradient(cx, cy, pulseR * 0.3, cx, cy, pulseR * (1 + r2 * 0.4));
        gr.addColorStop(0, cfg.rgb ? `hsl(${nowSec * 80 % 360},90%,65%)` : cfg.color);
        gr.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gr;
        ctx.globalAlpha = cfg.opacity * bass * (0.35 - r2 * 0.08);
        ctx.beginPath();
        ctx.arc(cx, cy, pulseR * (1 + r2 * 0.4), 0, Math.PI * 2);
        ctx.fill();
      }
      const coreGr = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulseR);
      const hue = cfg.rgb ? `hsl(${nowSec * 80 % 360},95%,70%)` : cfg.color;
      coreGr.addColorStop(0, "#ffffff");
      coreGr.addColorStop(0.3, hue);
      coreGr.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = coreGr;
      ctx.globalAlpha = cfg.opacity;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "waterfall": {
      const colW = W2 / n2;
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 12;
        ctx.shadowColor = glowColor;
      }
      for (let i = 0; i < n2; i++) {
        const v2 = vals[i];
        let r2 = 0, g = 0, b = 0;
        if (cfg.rgb) {
          r2 = Math.round(v2 * 255);
          g = Math.round(v2 * v2 * 220);
          b = Math.round((1 - v2) * 180);
        } else {
          const hex = cfg.color.replace("#", "");
          r2 = Math.round(parseInt(hex.slice(0, 2), 16) * v2);
          g = Math.round(parseInt(hex.slice(2, 4), 16) * v2);
          b = Math.round(parseInt(hex.slice(4, 6), 16) * v2);
        }
        ctx.fillStyle = `rgb(${r2},${g},${b})`;
        ctx.globalAlpha = cfg.opacity;
        ctx.fillRect(i * colW, 0, colW, H2);
      }
      break;
    }
    default:
    case "modern-bars": {
      const { baseY, maxH, growDir } = bandY(cfg, H2);
      if (cfg.glow > 0.02) {
        ctx.shadowBlur = cfg.glow * 18;
        ctx.shadowColor = glowColor;
      }
      const gap = Math.max(1, cfg.thickness * 0.3);
      const barW = (W2 - gap * (n2 + 1)) / n2;
      for (let i = 0; i < n2; i++) {
        const v2 = vals[i];
        const bh2 = Math.max(2, v2 * maxH);
        const x2 = gap + i * (barW + gap);
        const y2 = growDir === 1 ? baseY : baseY - bh2;
        ctx.fillStyle = rgbColor(cfg.rgb, cfg.color, i / n2, v2);
        ctx.globalAlpha = cfg.opacity;
        roundRect(ctx, x2, y2, barW, bh2, Math.min(barW / 2, 6));
        ctx.fill();
      }
    }
  }
  ctx.restore();
}
function drawSpectrumLayer(ctx, layer, vals, W2, H2, nowSec, smoothBuf) {
  if (!layer.enabled || !vals.length) return smoothBuf;
  const raw = vals.slice(0, layer.bars);
  if (smoothBuf.length !== raw.length) smoothBuf = new Array(raw.length).fill(0);
  const processed = raw.map((rv, i) => {
    const tilt = lerp(layer.bassIntensity, layer.trebleIntensity, i / Math.max(1, raw.length - 1));
    let v2 = Math.min(1.4, rv * layer.sensitivity * tilt);
    v2 = Math.pow(v2, 0.85);
    smoothBuf[i] = lerp(v2, smoothBuf[i], Math.min(0.9, layer.smoothing));
    return smoothBuf[i];
  });
  const cfg = {
    preset: layer.preset,
    position: "bottom",
    // irrelevant — we translate canvas
    scale: layer.scale,
    radius: layer.radius,
    thickness: layer.thickness,
    color: layer.color,
    rgb: layer.rgb,
    opacity: layer.opacity,
    glow: layer.glow,
    smoothing: layer.smoothing,
    sensitivity: layer.sensitivity,
    bassIntensity: layer.bassIntensity,
    trebleIntensity: layer.trebleIntensity,
    bars: layer.bars
  };
  ctx.save();
  const cx = layer.posX * W2;
  const cy = layer.posY * H2;
  ctx.translate(cx, cy);
  if (layer.rotation !== 0) ctx.rotate(layer.rotation * Math.PI / 180);
  ctx.translate(-W2 / 2, -H2 / 2);
  drawSpectrum(ctx, cfg, processed, W2, H2, nowSec);
  ctx.restore();
  return smoothBuf;
}
function darken(hex) {
  const n2 = parseInt(hex.replace("#", ""), 16);
  const r2 = Math.max(0, (n2 >> 16 & 255) - 80);
  const g = Math.max(0, (n2 >> 8 & 255) - 80);
  const b = Math.max(0, (n2 & 255) - 80);
  return `rgb(${r2},${g},${b})`;
}
function roundRect(ctx, x2, y2, w2, h, r2) {
  r2 = Math.min(r2, w2 / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x2 + r2, y2);
  ctx.arcTo(x2 + w2, y2, x2 + w2, y2 + h, r2);
  ctx.arcTo(x2 + w2, y2 + h, x2, y2 + h, r2);
  ctx.arcTo(x2, y2 + h, x2, y2, r2);
  ctx.arcTo(x2, y2, x2 + w2, y2, r2);
  ctx.closePath();
}
function drawBeatEffect(ctx, preset, strength, W2, H2, t2, bassEnergy2, trebleEnergy) {
  ctx.save();
  switch (preset) {
    case "flash": {
      ctx.globalAlpha = Math.min(0.9, strength * 0.85);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, W2, H2);
      break;
    }
    case "color-flash": {
      const hue = (t2 * 80 + bassEnergy2 * 120) % 360;
      ctx.globalAlpha = Math.min(0.75, strength * 0.7);
      ctx.fillStyle = `hsl(${hue}, 100%, 65%)`;
      ctx.fillRect(0, 0, W2, H2);
      break;
    }
    case "brightness-pulse": {
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = Math.min(0.6, strength * 0.55 + bassEnergy2 * 0.1);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, W2, H2);
      break;
    }
    case "vignette-pulse": {
      const alpha = Math.min(0.9, strength * 0.8 + bassEnergy2 * 0.15);
      const r2 = ctx.createRadialGradient(W2 / 2, H2 / 2, Math.min(W2, H2) * 0.1, W2 / 2, H2 / 2, Math.max(W2, H2) * 0.75);
      r2.addColorStop(0, "rgba(0,0,0,0)");
      r2.addColorStop(1, `rgba(0,0,0,${alpha.toFixed(2)})`);
      ctx.fillStyle = r2;
      ctx.fillRect(0, 0, W2, H2);
      break;
    }
    case "zoom-pulse": {
      const radius = (0.3 + strength * 0.5) * Math.min(W2, H2);
      const ring = ctx.createRadialGradient(W2 / 2, H2 / 2, radius * 0.7, W2 / 2, H2 / 2, radius);
      ring.addColorStop(0, `rgba(255,255,255,0)`);
      ring.addColorStop(0.5, `rgba(255,255,255,${(strength * 0.6).toFixed(2)})`);
      ring.addColorStop(1, `rgba(255,255,255,0)`);
      ctx.fillStyle = ring;
      ctx.fillRect(0, 0, W2, H2);
      break;
    }
    case "shake": {
      ctx.globalAlpha = strength * 0.4;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, W2, H2);
      break;
    }
    case "rgb-split": {
      const off = strength * W2 * 0.018;
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = Math.min(0.5, strength * 0.45 + trebleEnergy * 0.1);
      ctx.fillStyle = "rgba(255,0,0,1)";
      ctx.fillRect(-off, 0, W2, H2);
      ctx.fillStyle = "rgba(0,255,0,1)";
      ctx.fillRect(0, 0, W2, H2);
      ctx.fillStyle = "rgba(0,0,255,1)";
      ctx.fillRect(off, 0, W2, H2);
      break;
    }
    case "strobe-cut": {
      const strobe = Math.sin(t2 * Math.PI * 18) > 0;
      ctx.globalAlpha = strength * 0.65;
      ctx.fillStyle = strobe ? "#ffffff" : "#000000";
      ctx.fillRect(0, 0, W2, H2);
      break;
    }
  }
  ctx.restore();
}
function effectsFilterString(fx) {
  const parts = [];
  parts.push(`brightness(${(1 + fx.brightness).toFixed(2)})`);
  parts.push(`contrast(${fx.contrast.toFixed(2)})`);
  parts.push(`saturate(${fx.saturation.toFixed(2)})`);
  if (fx.warmth > 0) parts.push(`sepia(${(fx.warmth * 0.4).toFixed(2)})`);
  else if (fx.warmth < 0) parts.push(`hue-rotate(${Math.round(fx.warmth * 20)}deg)`);
  if (fx.blur > 0.01) parts.push(`blur(${(fx.blur * 0.8).toFixed(1)}px)`);
  return parts.join(" ");
}
function localFileUrl(path) {
  const segments = path.replace(/\\/g, "/").split("/");
  const encoded = segments.map((seg, i) => i === 0 && /^[A-Za-z]:$/.test(seg) ? seg : encodeURIComponent(seg)).join("/");
  return "localfile:///" + encoded;
}
function PreviewPanel() {
  const project = useProject();
  const toast = useApp((s) => s.toast);
  const sidecar = useApp((s) => s.sidecar);
  const isRendering = useApp((s) => s.isRendering);
  const isRenderingRef = reactExports.useRef(false);
  const canvasRef = reactExports.useRef(null);
  const overlay2dRef = reactExports.useRef(null);
  const audioRef = reactExports.useRef(null);
  const fxAudiosRef = reactExports.useRef([]);
  const footageAudioRef = reactExports.useRef(null);
  const introVideoRef = reactExports.useRef(null);
  const outroVideoRef = reactExports.useRef(null);
  const introDurRef = reactExports.useRef(0);
  const outroDurRef = reactExports.useRef(0);
  reactExports.useRef(0);
  const playingRef = reactExports.useRef(false);
  const manualTimeRef = reactExports.useRef(0);
  const lastRafTsRef = reactExports.useRef(0);
  const smoothRef = reactExports.useRef([]);
  const layerSmoothRef = reactExports.useRef(/* @__PURE__ */ new Map());
  const spectrumRef = reactExports.useRef(null);
  const projectRef = reactExports.useRef(null);
  const footageImgsRef = reactExports.useRef([]);
  const logoImgRef = reactExports.useRef(null);
  const particleFieldRef = reactExports.useRef(createParticleField());
  const prevLogoBassRef = reactExports.useRef(0);
  const logoBounceRef = reactExports.useRef(0);
  const scaleRef = reactExports.useRef(1);
  const beatsRef = reactExports.useRef([]);
  const beatStrengthRef = reactExports.useRef(0);
  const lastBeatIdxRef = reactExports.useRef(-1);
  const stageRef = reactExports.useRef(null);
  const dragRef = reactExports.useRef(null);
  const [playing, setPlaying] = reactExports.useState(false);
  const [time, setTime] = reactExports.useState(0);
  const [duration, setDuration] = reactExports.useState(0);
  const [footageImgs, setFootageImgs] = reactExports.useState([]);
  const [logoImg, setLogoImg] = reactExports.useState(null);
  const [spectrum, setSpectrum] = reactExports.useState(null);
  const [audioUrl, setAudioUrl] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [spectrumLoaded, setSpectrumLoaded] = reactExports.useState(false);
  const [dragTarget, setDragTarget] = reactExports.useState(null);
  reactExports.useEffect(() => {
    projectRef.current = project ?? null;
  }, [project]);
  reactExports.useEffect(() => {
    footageImgsRef.current = footageImgs;
  }, [footageImgs]);
  reactExports.useEffect(() => {
    isRenderingRef.current = isRendering;
    if (isRendering) for (const it of footageImgsRef.current) it.video?.pause();
  }, [isRendering]);
  reactExports.useEffect(() => {
    logoImgRef.current = logoImg;
  }, [logoImg]);
  reactExports.useEffect(() => {
    spectrumRef.current = spectrum;
  }, [spectrum]);
  reactExports.useEffect(() => {
    playingRef.current = playing;
  }, [playing]);
  const audioItem = project?.audio.items[0] ?? null;
  const W2 = project?.export.width ?? 1920;
  const H2 = project?.export.height ?? 1080;
  const exp = project?.export ?? {};
  const stageContainerRef = reactExports.useRef(null);
  const [containerSize, setContainerSize] = reactExports.useState({ w: 960, h: 600 });
  reactExports.useEffect(() => {
    const el2 = stageContainerRef.current;
    if (!el2) return;
    const ro = new ResizeObserver((entries) => {
      const e = entries[0];
      if (e) setContainerSize({ w: e.contentRect.width, h: e.contentRect.height });
    });
    ro.observe(el2);
    return () => ro.disconnect();
  }, []);
  const { PW, PH, scale } = reactExports.useMemo(() => {
    const sw = containerSize.w / W2;
    const sh2 = containerSize.h / H2;
    const s = Math.min(sw, sh2);
    scaleRef.current = s;
    return { PW: Math.round(W2 * s), PH: Math.round(H2 * s), scale: s };
  }, [containerSize, W2, H2]);
  reactExports.useEffect(() => {
    if (!project) return;
    let cancelled = false;
    const items = project.footage.items.slice(0, 8);
    Promise.all(
      items.map(async (it) => {
        if (it.kind === "image") {
          const url = await window.masjavas.fileToDataUrl(it.path, mimeFor(it.ext)).catch(() => window.masjavas.thumbnail(it.path, "image"));
          if (!url) return null;
          const img = await loadImage(url);
          return { path: it.path, img };
        }
        const v2 = document.createElement("video");
        v2.src = localFileUrl(it.path);
        v2.muted = true;
        v2.loop = true;
        v2.playsInline = true;
        v2.preload = "metadata";
        await new Promise((res) => {
          v2.onloadeddata = () => res();
          v2.onerror = () => res();
          setTimeout(res, 4e3);
        });
        return { path: it.path, video: v2 };
      })
    ).then((arr) => {
      if (!cancelled) {
        const loaded2 = arr.filter(Boolean);
        for (let i = loaded2.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [loaded2[i], loaded2[j]] = [loaded2[j], loaded2[i]];
        }
        setFootageImgs(loaded2);
      }
    });
    return () => {
      cancelled = true;
      for (const it of footageImgsRef.current) it.video?.pause();
    };
  }, [(project?.footage.items ?? []).map((it) => `${it.kind}:${it.path}`).join("|")]);
  reactExports.useEffect(() => {
    if (!project?.logo.enabled || !project.logo.path) {
      setLogoImg(null);
      return;
    }
    let cancelled = false;
    window.masjavas.fileToDataUrl(project.logo.path, "image/png").then(loadImage).then((img) => {
      if (!cancelled) setLogoImg(img);
    }).catch(() => setLogoImg(null));
    return () => {
      cancelled = true;
    };
  }, [project?.logo.path, project?.logo.enabled]);
  const introPath = project?.introVideoPath;
  const outroPath = project?.outroVideoPath;
  reactExports.useEffect(() => {
    if (introVideoRef.current) {
      try {
        introVideoRef.current.pause();
        introVideoRef.current.src = "";
      } catch {}
      introVideoRef.current = null;
    }
    introDurRef.current = 0;
    if (introPath) {
      const v = document.createElement("video");
      v.src = localFileUrl(introPath);
      v.muted = true;
      v.playsInline = true;
      v.preload = "auto";
      v.onloadedmetadata = () => {
        introDurRef.current = v.duration;
      };
      v.load();
      introVideoRef.current = v;
    }
    return () => {
      if (introVideoRef.current) {
        try {
          introVideoRef.current.pause();
          introVideoRef.current.src = "";
        } catch {}
      }
    };
  }, [introPath]);
  reactExports.useEffect(() => {
    if (outroVideoRef.current) {
      try {
        outroVideoRef.current.pause();
        outroVideoRef.current.src = "";
      } catch {}
      outroVideoRef.current = null;
    }
    outroDurRef.current = 0;
    if (outroPath) {
      const v = document.createElement("video");
      v.src = localFileUrl(outroPath);
      v.muted = true;
      v.playsInline = true;
      v.preload = "auto";
      v.onloadedmetadata = () => {
        outroDurRef.current = v.duration;
      };
      v.load();
      outroVideoRef.current = v;
    }
    return () => {
      if (outroVideoRef.current) {
        try {
          outroVideoRef.current.pause();
          outroVideoRef.current.src = "";
        } catch {}
      }
    };
  }, [outroPath]);
  reactExports.useEffect(() => {
    if (!audioItem) {
      setAudioUrl(null);
      return;
    }
    const normalized = audioItem.path.replace(/\\/g, "/");
    const segments = normalized.split("/");
    const encoded = segments.map((seg, i) => i === 0 && /^[A-Za-z]:$/.test(seg) ? seg : encodeURIComponent(seg)).join("/");
    setAudioUrl("localfile:///" + encoded);
    playingRef.current = false;
    setPlaying(false);
    manualTimeRef.current = 0;
    setTime(0);
    beatStrengthRef.current = 0;
  }, [audioItem?.path]);
  const mainVol = project?.audio.mainVolume ?? 1;
  const footageVol = project?.footage.footageVolume ?? 1;
  const footageMuted = project?.footage.muteFootageAudio !== false;
  const footageAudioClip = !footageMuted && project?.footage.type === "video" && project?.footage.items?.[0]?.path || null;
  const fxKey = (project?.audio.fx ?? []).map((f2) => `${f2.id}:${f2.path}:${f2.loop}`).join("|");
  reactExports.useEffect(() => {
    for (const el2 of fxAudiosRef.current) {
      try {
        el2.pause();
        el2.src = "";
      } catch {
      }
    }
    const fx = (projectRef.current?.audio.fx ?? []).filter((f2) => f2.path);
    fxAudiosRef.current = fx.map((f2) => {
      const el2 = new Audio(localFileUrl(f2.path));
      el2.loop = f2.loop !== false;
      el2.volume = Math.max(0, Math.min(1, f2.volume ?? 1));
      el2.preload = "auto";
      return el2;
    });
    return () => {
      for (const el2 of fxAudiosRef.current) {
        try {
          el2.pause();
          el2.src = "";
        } catch {
        }
      }
    };
  }, [fxKey]);
  reactExports.useEffect(() => {
    if (footageAudioRef.current) {
      try {
        footageAudioRef.current.pause();
        footageAudioRef.current.src = "";
      } catch {
      }
      footageAudioRef.current = null;
    }
    if (footageAudioClip) {
      const el2 = new Audio(localFileUrl(footageAudioClip));
      el2.loop = true;
      el2.preload = "auto";
      footageAudioRef.current = el2;
    }
    return () => {
      if (footageAudioRef.current) {
        try {
          footageAudioRef.current.pause();
          footageAudioRef.current.src = "";
        } catch {
        }
      }
    };
  }, [footageAudioClip]);
  const fxVolKey = (project?.audio.fx ?? []).map((f2) => f2.volume).join(",");
  reactExports.useEffect(() => {
    if (audioRef.current) audioRef.current.volume = Math.max(0, Math.min(1, mainVol));
    const fx = projectRef.current?.audio.fx ?? [];
    fxAudiosRef.current.forEach((el2, i) => {
      if (fx[i]) el2.volume = Math.max(0, Math.min(1, fx[i].volume ?? 1));
    });
    if (footageAudioRef.current) footageAudioRef.current.volume = Math.max(0, Math.min(1, footageVol));
  }, [mainVol, footageVol, fxVolKey]);
  const syncFx = (play) => {
    const a = audioRef.current;
    const extras = [...fxAudiosRef.current, ...footageAudioRef.current ? [footageAudioRef.current] : []];
    for (const el2 of extras) {
      try {
        if (a && el2.duration && isFinite(el2.duration)) el2.currentTime = el2.loop ? a.currentTime % el2.duration : Math.min(a.currentTime, el2.duration);
        if (play) el2.play().catch(() => {
        });
        else el2.pause();
      } catch {
      }
    }
    const proj = projectRef.current;
    if (a && proj) {
      const vIntro = introVideoRef.current;
      if (vIntro) {
        try {
          const introDur = introDurRef.current;
          if (a.currentTime <= introDur) {
            vIntro.currentTime = a.currentTime;
            vIntro.muted = !proj.introAudioEnabled;
            vIntro.volume = Math.max(0, Math.min(1, proj.audio.mainVolume ?? 1));
            if (play) vIntro.play().catch(() => {});
            else vIntro.pause();
          } else {
            vIntro.pause();
            vIntro.muted = true;
          }
        } catch {}
      }
      const vOutro = outroVideoRef.current;
      if (vOutro) {
        try {
          const outroDur = outroDurRef.current;
          const startOutro = Math.max(0, a.duration - outroDur);
          if (a.currentTime >= startOutro) {
            vOutro.currentTime = a.currentTime - startOutro;
            vOutro.muted = !proj.outroAudioEnabled;
            vOutro.volume = Math.max(0, Math.min(1, proj.audio.mainVolume ?? 1));
            if (play) vOutro.play().catch(() => {});
            else vOutro.pause();
          } else {
            vOutro.pause();
            vOutro.muted = true;
          }
        } catch {}
      }
    }
  };
  const spectrumActive = !!(project?.spectrum.enabled || project?.logo.enabled || (project?.spectrumLayers ?? []).some((l) => l.enabled));
  const loadSpectrum = reactExports.useCallback(async (silent = false) => {
    const curProject = projectRef.current;
    const curAudioItem = curProject?.audio.items[0] ?? null;
    if (!curAudioItem) {
      if (!silent) toast("error", "Import an audio track first.");
      return;
    }
    if (!sidecar?.running) {
      if (!silent) toast("error", "Python sidecar not running.");
      return;
    }
    setLoading(true);
    try {
      const maxBars = Math.max(
        curProject?.spectrum.enabled ? curProject.spectrum.bars : 16,
        curProject?.logo.enabled ? curProject.logo.bars : 16,
        ...(curProject?.spectrumLayers ?? []).filter((l) => l.enabled).map((l) => l.bars),
        64
      );
      const bands = Math.max(16, Math.min(160, maxBars));
      const frames = await window.masjavas.getSpectrum(curAudioItem.path, PREVIEW_FPS, bands);
      setSpectrum(frames);
      setSpectrumLoaded(true);
      if (!frames.frames.length && !silent) toast("info", "No spectrum data returned.");
    } catch (e) {
      if (!silent) toast("error", `Spectrum failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }, [sidecar?.running, toast]);
  reactExports.useEffect(() => {
    if (!spectrumActive || !audioItem || !sidecar?.running) return;
    setSpectrumLoaded(false);
    loadSpectrum(true);
  }, [audioItem?.path, spectrumActive, sidecar?.running]);
  reactExports.useEffect(() => {
    beatsRef.current = [];
    beatStrengthRef.current = 0;
    lastBeatIdxRef.current = -1;
    if (!audioItem || !sidecar?.running) return;
    window.masjavas.analyzeAudio(audioItem.path).then((res) => {
      beatsRef.current = res.beats ?? [];
    }).catch(() => {
    });
  }, [audioItem?.path, sidecar?.running]);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId = 0;
    const draw = (rafTs) => {
      const proj = projectRef.current;
      if (!proj) {
        animId = requestAnimationFrame(draw);
        return;
      }
      const audio = audioRef.current;
      let t2;
      if (audio && audio.readyState >= 2) {
        t2 = audio.currentTime;
        if (Math.abs(t2 - manualTimeRef.current) > 0.1) {
          manualTimeRef.current = t2;
          setTime(t2);
        }
      } else {
        if (playingRef.current && lastRafTsRef.current > 0) {
          manualTimeRef.current += (rafTs - lastRafTsRef.current) / 1e3;
        }
        t2 = manualTimeRef.current;
      }
      const dtFrames = lastRafTsRef.current > 0 ? Math.min(3, Math.max(1e-4, (rafTs - lastRafTsRef.current) / 1e3 * PREVIEW_FPS)) : 1;
      lastRafTsRef.current = rafTs;
      const beatIntensitySetting = Math.max(0.1, Math.min(1, proj.footage.beatEffectIntensity ?? 0.6));
      let beatFired = false;
      {
        const beats = beatsRef.current;
        if (beats.length > 0) {
          let idx = -1;
          for (let i = beats.length - 1; i >= 0; i--) {
            if (beats[i] <= t2) {
              idx = i;
              break;
            }
          }
          if (idx >= 0 && idx !== lastBeatIdxRef.current) {
            const timeSinceBeat = t2 - beats[idx];
            if (timeSinceBeat < 0.08) {
              beatStrengthRef.current = 1;
              beatFired = true;
            }
            lastBeatIdxRef.current = idx;
          }
        }
        const decay = 0.78 + (1 - beatIntensitySetting) * 0.15;
        beatStrengthRef.current *= decay;
      }
      const dur = audio?.duration || 1;
      const imgs = footageImgsRef.current;
      const lImg = logoImgRef.current;
      const spec = spectrumRef.current;
      ctx.save();
      ctx.clearRect(0, 0, W2, H2);
      ctx.save();
      ctx.filter = effectsFilterString(proj.effects);
      const bEffect = proj.footage.beatEffect ?? "none";
      const beatStr = beatStrengthRef.current;
      const beatInt = Math.max(0.1, Math.min(1, proj.footage.beatEffectIntensity ?? 0.6));
      const bAmt = beatStr * beatInt;
      if (beatStr > 0.01) {
        switch (bEffect) {
          case "zoom-in": {
            const s = 1 + bAmt * 0.1;
            ctx.translate(W2 / 2, H2 / 2);
            ctx.scale(s, s);
            ctx.translate(-W2 / 2, -H2 / 2);
            break;
          }
          case "zoom-out": {
            const s = 1 - bAmt * 0.07;
            ctx.translate(W2 / 2, H2 / 2);
            ctx.scale(s, s);
            ctx.translate(-W2 / 2, -H2 / 2);
            break;
          }
          case "shake-hard": {
            const sx = (Math.random() - 0.5) * bAmt * W2 * 0.04;
            const sy = (Math.random() - 0.5) * bAmt * H2 * 0.03;
            ctx.translate(sx, sy);
            break;
          }
          case "zoom-shake": {
            const sc2 = 1 + bAmt * 0.08;
            const sx = (Math.random() - 0.5) * bAmt * W2 * 0.025;
            const sy = (Math.random() - 0.5) * bAmt * H2 * 0.018;
            ctx.translate(W2 / 2 + sx, H2 / 2 + sy);
            ctx.scale(sc2, sc2);
            ctx.translate(-W2 / 2, -H2 / 2);
            break;
          }
          case "tilt": {
            const angle = Math.sin(t2 * 3) * bAmt * 0.03;
            ctx.translate(W2 / 2, H2 / 2);
            ctx.rotate(angle);
            ctx.translate(-W2 / 2, -H2 / 2);
            break;
          }
        }
      }
      if (imgs.length) {
        const per = Math.max(2, dur / imgs.length);
        const idx = Math.min(imgs.length - 1, Math.floor(t2 / per));
        const item = imgs[idx];
        if (item.video) {
          const v2 = item.video;
          if (!isRenderingRef.current && v2.paused) v2.play().catch(() => {
          });
          if (v2.videoWidth) drawFootageWithMode(ctx, v2, W2, H2, proj);
          else {
            ctx.fillStyle = "#111";
            ctx.fillRect(0, 0, W2, H2);
          }
          for (let k2 = 0; k2 < imgs.length; k2++) {
            if (k2 !== idx && imgs[k2].video && !imgs[k2].video.paused) imgs[k2].video.pause();
          }
        } else if (item.img) {
          drawFootageWithMode(ctx, item.img, W2, H2, proj);
        }
      } else {
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, W2, H2);
      }
      ctx.restore();

      if (proj.effects.glow > 0.01) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = Math.min(0.9, proj.effects.glow * 0.75);
        ctx.filter = `blur(${Math.max(1, Math.round(proj.effects.glow * 14))}px)`;
        ctx.drawImage(canvasRef.current, 0, 0);
        ctx.restore();
      }

      const vIntro = introVideoRef.current;
      if (vIntro && introDurRef.current > 0 && t2 <= introDurRef.current) {
        if (Math.abs(vIntro.currentTime - t2) > 0.15) {
          try { vIntro.currentTime = t2; } catch (_) {}
        }
        if (playingRef.current && !isRenderingRef.current) {
          if (vIntro.paused) vIntro.play().catch(() => {});
        } else {
          if (!vIntro.paused) vIntro.pause();
        }
        vIntro.muted = !proj.introAudioEnabled;
        vIntro.volume = Math.max(0, Math.min(1, proj.audio.mainVolume ?? 1));
        if (vIntro.readyState >= 2) {
          drawFit(ctx, vIntro, W2, H2);
        }
      } else if (vIntro) {
        if (!vIntro.paused) vIntro.pause();
        vIntro.muted = true;
      }
      const vOutro = outroVideoRef.current;
      const startOutro = Math.max(0, dur - outroDurRef.current);
      if (vOutro && outroDurRef.current > 0 && t2 >= startOutro) {
        const targetOutroTime = t2 - startOutro;
        if (Math.abs(vOutro.currentTime - targetOutroTime) > 0.15) {
          try { vOutro.currentTime = targetOutroTime; } catch (_) {}
        }
        if (playingRef.current && !isRenderingRef.current) {
          if (vOutro.paused) vOutro.play().catch(() => {});
        } else {
          if (!vOutro.paused) vOutro.pause();
        }
        vOutro.muted = !proj.outroAudioEnabled;
        vOutro.volume = Math.max(0, Math.min(1, proj.audio.mainVolume ?? 1));
        if (vOutro.readyState >= 2) {
          drawFit(ctx, vOutro, W2, H2);
        }
      } else if (vOutro) {
        if (!vOutro.paused) vOutro.pause();
        vOutro.muted = true;
      }
      const dummyOverlay = !isReactive(proj);
      const batchLoopW = proj.footage.type === "image" ? 30 : 300;
      const realFrameAt = (loop) => {
        if (!spec || !spec.frames.length) return null;
        const tt = loop ? t2 % batchLoopW : t2;
        const fi2 = Math.min(spec.frames.length - 1, Math.max(0, Math.floor(tt * spec.fps)));
        return spec.frames[fi2] || [];
      };
      const rawFrame = realFrameAt(dummyOverlay) ?? fakeFrame(Math.max(16, Math.min(160, proj.spectrum.bars)), t2);
      let vals = [];
      if (rawFrame) {
        const raw = rawFrame;
        const cfg = proj.spectrum;
        if (smoothRef.current.length !== raw.length) smoothRef.current = new Array(raw.length).fill(0);
        vals = raw.map((rv, i) => {
          const tilt = lerp(cfg.bassIntensity, cfg.trebleIntensity, i / Math.max(1, raw.length - 1));
          let v2 = Math.min(1.4, rv * cfg.sensitivity * tilt);
          v2 = Math.pow(v2, 0.85);
          smoothRef.current[i] = lerp(v2, smoothRef.current[i], Math.min(0.9, cfg.smoothing));
          return smoothRef.current[i];
        });
      }
      if (proj.logo.enabled && lImg) {
        const logoFrame = realFrameAt(dummyOverlay) ?? fakeFrame(64, t2);
        const rawBass = bassEnergy(logoFrame);
        const useBeats = !dummyOverlay && beatsRef.current.length >= 4;
        const onset = rawBass - prevLogoBassRef.current > 0.05;
        prevLogoBassRef.current = rawBass;
        const bassBeat = (useBeats ? beatFired : onset) && rawBass > 0.18;
        if (bassBeat) logoBounceRef.current = 1;
        logoBounceRef.current *= 0.8;
        drawLogo(ctx, proj.logo, lImg, rawFrame ?? [], W2, H2, t2, rawBass, particleFieldRef.current, dtFrames, bassBeat, logoBounceRef.current);
      }
      if (proj.spectrum.enabled && vals.length) {
        drawSpectrum(ctx, proj.spectrum, vals, W2, H2, t2);
      }
      if (proj.spectrumLayers?.length) {
        const rawVals = realFrameAt(dummyOverlay) ?? fakeFrame(160, t2);
        for (const layer of proj.spectrumLayers) {
          if (!layer.enabled) continue;
          const buf = layerSmoothRef.current.get(layer.id) ?? [];
          const newBuf = drawSpectrumLayer(ctx, layer, rawVals, W2, H2, t2, buf);
          layerSmoothRef.current.set(layer.id, newBuf);
        }
      }
      if (proj.overlayLayers?.length) {
        drawOverlayLayers(ctx, proj.overlayLayers, t2, W2, H2);
      }
      if (proj.effects.vignette > 0.01) {
        const g = ctx.createRadialGradient(W2 / 2, H2 / 2, Math.min(W2, H2) * 0.3, W2 / 2, H2 / 2, Math.max(W2, H2) * 0.7);
        g.addColorStop(0, "rgba(0,0,0,0)");
        g.addColorStop(1, `rgba(0,0,0,${(proj.effects.vignette * 0.85).toFixed(2)})`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W2, H2);
      }
      const bEffectOverlay = proj.footage.beatEffect ?? "none";
      const overlayPresets = ["flash", "color-flash", "brightness-pulse", "vignette-pulse", "zoom-pulse", "shake", "rgb-split", "strobe-cut"];
      if (overlayPresets.includes(bEffectOverlay) && beatStrengthRef.current > 0.01) {
        const intensity = Math.max(0, Math.min(1, proj.footage.beatEffectIntensity ?? 0.6));
        const strength = beatStrengthRef.current * intensity;
        drawBeatEffect(ctx, bEffectOverlay, strength, W2, H2, t2, strength, strength * 0.5);
      }
      const co = overlay2dRef.current;
      if (co) {
        try {
          co.draw(ctx, proj.customOverlays ?? [], t2, playingRef.current);
        } catch {
        }
      }
      if (showLyrics(proj)) drawLyrics(ctx, proj, t2, W2, H2, rafTs);
      if (showPlaylist(proj)) drawPlaylist(ctx, proj, t2, W2, H2, rafTs, dur, proj.audio.items);
      drawCustomTexts(ctx, proj.customTexts, t2, W2, H2);
      ctx.restore();
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [W2, H2]);
  reactExports.useEffect(() => {
    const srcUrl = (path) => {
      const norm = path.replace(/\\/g, "/");
      const encoded = norm.split("/").map((seg, i) => i === 0 && /^[A-Za-z]:$/.test(seg) ? seg : encodeURIComponent(seg)).join("/");
      return "localfile:///" + encoded;
    };
    const co = new CustomOverlay2D(srcUrl);
    overlay2dRef.current = co;
    return () => {
      overlay2dRef.current = null;
      co.dispose();
    };
  }, []);
  if (!project) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", flex: 1, color: "var(--text-dim)", fontSize: 14 }, children: "Create or open a project." });
  }
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || audio.readyState < 2) {
      const next = !playing;
      if (next) lastRafTsRef.current = 0;
      playingRef.current = next;
      setPlaying(next);
      syncFx(next);
      return;
    }
    if (audio.paused) {
      const doPlay = () => {
        audio.play().catch((err) => {
          toast("error", `Cannot play audio: ${err.message}`);
          playingRef.current = false;
          setPlaying(false);
        });
        syncFx(true);
        playingRef.current = true;
        setPlaying(true);
      };
      doPlay();
    } else {
      audio.pause();
      syncFx(false);
      playingRef.current = false;
      setPlaying(false);
    }
  };
  const toNorm = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return { nx: 0, ny: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      nx: Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)),
      ny: Math.max(0, Math.min(1, (clientY - rect.top) / rect.height))
    };
  };
  const hitTest = (nx, ny) => {
    if (!project) return null;
    const HIT = 0.12;
    if (project.logo.enabled && project.logo.path) {
      const dx = nx - project.logo.posX;
      const dy = ny - project.logo.posY;
      if (Math.abs(dx) < HIT && Math.abs(dy) < HIT) return { kind: "logo" };
    }
    for (const layer of project.spectrumLayers ?? []) {
      if (!layer.enabled) continue;
      const dx = nx - layer.posX;
      const dy = ny - layer.posY;
      if (Math.abs(dx) < HIT && Math.abs(dy) < HIT) return { kind: "spectrumLayer", id: layer.id };
    }
    if (showLyrics(project) && project.lyrics.style.position === "custom") {
      const dx = nx - project.lyrics.style.posX;
      const dy = ny - project.lyrics.style.posY;
      if (Math.abs(dx) < 0.25 && Math.abs(dy) < 0.06) return { kind: "lyrics" };
    }
    if (showPlaylist(project) && project.playlist.style.position === "custom") {
      const dx = nx - project.playlist.style.posX;
      const dy = ny - project.playlist.style.posY;
      if (Math.abs(dx) < 0.25 && Math.abs(dy) < 0.15) return { kind: "playlist" };
    }
    return null;
  };
  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    const { nx, ny } = toNorm(e.clientX, e.clientY);
    const target = hitTest(nx, ny);
    if (!target) return;
    e.preventDefault();
    const getStartPos = () => {
      if (!project) return { startPosX: nx, startPosY: ny };
      switch (target.kind) {
        case "logo":
          return { startPosX: project.logo.posX, startPosY: project.logo.posY };
        case "lyrics":
          return { startPosX: project.lyrics.style.posX, startPosY: project.lyrics.style.posY };
        case "playlist":
          return { startPosX: project.playlist.style.posX, startPosY: project.playlist.style.posY };
        case "spectrumLayer": {
          const l2 = project.spectrumLayers?.find((s) => s.id === target.id);
          return { startPosX: l2?.posX ?? nx, startPosY: l2?.posY ?? ny };
        }
      }
    };
    dragRef.current = { target, startMouseX: nx, startMouseY: ny, ...getStartPos() };
    setDragTarget(target);
  };
  const onMouseMove = (e) => {
    const drag = dragRef.current;
    if (!drag) return;
    e.preventDefault();
    const { nx, ny } = toNorm(e.clientX, e.clientY);
    const dx = nx - drag.startMouseX;
    const dy = ny - drag.startMouseY;
    const newX = Math.max(0, Math.min(1, drag.startPosX + dx));
    const newY = Math.max(0, Math.min(1, drag.startPosY + dy));
    const t2 = drag.target;
    patchProject((p2) => {
      if (t2.kind === "logo") {
        p2.logo.posX = newX;
        p2.logo.posY = newY;
      } else if (t2.kind === "lyrics") {
        p2.lyrics.style.posX = newX;
        p2.lyrics.style.posY = newY;
        p2.lyrics.style.position = "custom";
      } else if (t2.kind === "playlist") {
        p2.playlist.style.posX = newX;
        p2.playlist.style.posY = newY;
        p2.playlist.style.position = "custom";
      } else if (t2.kind === "spectrumLayer") {
        const l2 = p2.spectrumLayers?.find((s) => s.id === t2.id);
        if (l2) {
          l2.posX = newX;
          l2.posY = newY;
        }
      }
      return p2;
    });
  };
  const onMouseUp = () => {
    dragRef.current = null;
    setDragTarget(null);
  };
  const dragCursor = dragTarget ? "grabbing" : "default";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: stageContainerRef,
        className: "preview-stage",
        style: {
          flex: 1,
          minHeight: 0,
          margin: "8px 8px 0",
          borderRadius: 10,
          background: "#111",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            ref: stageRef,
            style: {
              position: "relative",
              width: PW,
              height: PH,
              flexShrink: 0,
              borderRadius: 8,
              overflow: "hidden",
              background: "#000"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "canvas",
                {
                  ref: canvasRef,
                  width: W2,
                  height: H2,
                  className: "preview-canvas",
                  style: {
                    display: "block",
                    width: PW,
                    height: PH
                  }
                }
              ),
              exp.showSafeAreas && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { 
                style: { position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10 }, 
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: "5%", border: "1px dashed rgba(255,255,255,0.45)", borderRadius: 4 } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", inset: "10%", border: "1px dashed rgba(255,80,80,0.55)", borderRadius: 4 } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", left: "10%", right: "10%", bottom: H2 > W2 ? "28%" : "15%", borderTop: "1px dotted rgba(80,255,80,0.65)" } })
                ]
              }),
              exp.showDeviceMockup && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { 
                style: { position: "absolute", inset: 0, pointerEvents: "none", zIndex: 11, fontFamily: "sans-serif", color: "#ffffff" }, 
                children: 
                  (exp.platformPreset === "tiktok_reels_shorts" || exp.platformPreset === "story") ? (
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", inset: 0 }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", top: 15, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 16, fontSize: 14, fontWeight: 600, textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { opacity: 0.6 }, children: "Following" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "For You" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", right: 10, bottom: "25%", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 36, height: 36, borderRadius: "50%", background: "#444", border: "1px solid #fff" } }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 20 }, children: "♥" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 10, fontWeight: 600 }, children: "124K" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 20 }, children: "💬" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 10, fontWeight: 600 }, children: "782" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 20 }, children: "➥" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 10, fontWeight: 600 }, children: "Share" })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", left: 12, bottom: 15, right: 60, display: "flex", flexDirection: "column", gap: 4, textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontWeight: 600, fontSize: 13 }, children: "@masjavas_pro" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11, opacity: 0.9 }, children: "Amazing social media video auto-resize #visualizer #autoFix" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 10, opacity: 0.7 }, children: "🎵 original sound - masjavas" })
                      ] })
                    ] })
                  ) : (exp.platformPreset === "instagram_feed_square" || exp.platformPreset === "instagram_feed_portrait") ? (
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", inset: 0 }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", top: 10, left: 10, right: 10, display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, fontWeight: 600 }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 24, height: 24, borderRadius: "50%", background: "#444" } }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "masjavas_pro" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 16 }, children: "•••" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", left: 10, bottom: 10, right: 10, display: "flex", flexDirection: "column", gap: 4, fontSize: 11 }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 12, fontSize: 16, marginBottom: 4 }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "♡" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "💬" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✈" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "masjavas_pro " }),
                          "Smart social media video resizing made extremely simple!"
                        ] })
                      ] })
                    ] })
                  ) : exp.platformPreset === "youtube_landscape" ? (
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", inset: 0 }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0, height: 36, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)", padding: "0 10px", display: "flex", alignItems: "center", gap: 10, fontSize: 12 }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, height: 3, background: "rgba(255,255,255,0.3)", position: "relative" }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", left: 0, top: 0, bottom: 0, width: "35%", background: "#ff0000" } }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", left: "35%", top: -3, width: 9, height: 9, borderRadius: "50%", background: "#ff0000" } })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 12, fontSize: 14 }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚙" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⛶" })
                        ] })
                      ] })
                    ] })
                  ) : null
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    inset: 0,
                    cursor: dragCursor
                  },
                  onMouseDown,
                  onMouseMove,
                  onMouseUp,
                  onMouseLeave: onMouseUp
                }
              ),
              dragTarget && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                position: "absolute",
                top: 8,
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(0,0,0,0.65)",
                color: "#fff",
                fontSize: 11,
                padding: "3px 10px",
                borderRadius: 6,
                pointerEvents: "none"
              }, children: [
                "Dragging ",
                dragTarget.kind
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "audio",
      {
        ref: audioRef,
        src: audioUrl ?? void 0,
        onLoadedMetadata: (e) => {
          const d = e.target.duration;
          if (d && isFinite(d)) setDuration(d);
        },
        onCanPlay: (e) => {
          const d = e.target.duration;
          if (d && isFinite(d)) setDuration(d);
        },
        onTimeUpdate: (e) => {
          const ct = e.target.currentTime;
          manualTimeRef.current = ct;
          setTime(ct);
        },
        onEnded: () => {
          playingRef.current = false;
          setPlaying(false);
        },
        onError: () => {
          if (!audioUrl) return;
          toast("error", "Audio gagal dimuat — periksa format atau path file.");
          playingRef.current = false;
          setPlaying(false);
        },
        hidden: true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preview-controls", style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "var(--bg-elev)", borderTop: "1px solid var(--border)" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "btn primary",
          onClick: togglePlay,
          style: { padding: "6px 14px", fontSize: 12, flexShrink: 0 },
          children: playing ? "❚❚" : "►"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          className: "scrubber",
          min: 0,
          max: Math.max(1, duration),
          step: 0.1,
          value: Math.min(time, Math.max(1, duration)),
          style: { flex: 1, cursor: "pointer" },
          onMouseDown: () => {
            if (audioRef.current && !audioRef.current.paused) audioRef.current.pause();
          },
          onMouseUp: (e) => {
            const v2 = parseFloat(e.target.value);
            manualTimeRef.current = v2;
            setTime(v2);
            if (audioRef.current) {
              audioRef.current.currentTime = v2;
              if (playingRef.current) audioRef.current.play().catch(() => {
              });
            }
            syncFx(playingRef.current);
          },
          onChange: (e) => {
            const v2 = parseFloat(e.target.value);
            manualTimeRef.current = v2;
            setTime(v2);
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "time-readout", style: { fontSize: 11, fontFamily: "var(--mono)", minWidth: 80, textAlign: "right", color: "var(--text-dim)" }, children: [
        fmt(time),
        " / ",
        fmt(duration)
      ] }),
      spectrumActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "btn",
          onClick: () => loadSpectrum(false),
          disabled: loading || !audioItem,
          title: spectrumLoaded ? "Reload spectrum data" : "Load spectrum for preview",
          style: { padding: "5px 10px", fontSize: 11, flexShrink: 0, opacity: spectrumLoaded ? 0.7 : 1 },
          children: loading ? "⏳" : spectrumLoaded ? "⟳ spektrum" : "∿ muat spektrum"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "3px 12px 5px", fontSize: 11, color: "var(--text-faint)", display: "flex", gap: 16 }, children: [
      !audioItem && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚠ Impor audio untuk mengaktifkan pemutaran" }),
      spectrumActive && !sidecar?.running && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚠ Spektrum membutuhkan layanan audio" }),
      spectrumActive && sidecar?.running && !spectrumLoaded && audioItem && !loading && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: 'Klik "∿ muat spektrum" untuk mengaktifkan visualisasi' }),
      spectrumLoaded && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--accent)" }, children: [
        "✓ Spektrum dimuat — ",
        spectrum?.frames.length ?? 0,
        " frame"
      ] })
    ] })
  ] });
}
function fmt(s) {
  if (!isFinite(s)) return "0:00";
  const m2 = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m2}:${String(sec).padStart(2, "0")}`;
}
function mimeFor(ext) {
  const e = ext.replace(".", "").toLowerCase();
  if (["jpg", "jpeg"].includes(e)) return "image/jpeg";
  if (e === "png") return "image/png";
  if (e === "webp") return "image/webp";
  if (e === "gif") return "image/gif";
  if (e === "mp3") return "audio/mpeg";
  if (e === "wav") return "audio/wav";
  if (e === "m4a" || e === "aac") return "audio/mp4";
  if (e === "ogg") return "audio/ogg";
  if (e === "flac") return "audio/flac";
  if (e === "mp4" || e === "mov" || e === "mkv" || e === "webm") return "video/mp4";
  return "application/octet-stream";
}
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}
function fakeFrame(bands, t2) {
  return fakeSpectrumFrame(bands, t2);
}
function drawCover(ctx, src, W2, H2) {
  const sw = src.videoWidth || src.naturalWidth || src.width;
  const sh2 = src.videoHeight || src.naturalHeight || src.height;
  if (!sw || !sh2) return;
  const ir = sw / sh2;
  const cr = W2 / H2;
  let dw = W2;
  let dh2 = H2;
  if (ir > cr) {
    dh2 = H2;
    dw = H2 * ir;
  } else {
    dw = W2;
    dh2 = W2 / ir;
  }
  ctx.drawImage(src, (W2 - dw) / 2, (H2 - dh2) / 2, dw, dh2);
}
function drawFit(ctx, src, W2, H2, bgColor) {
  const sw = src.videoWidth || src.naturalWidth || src.width || W2;
  const sh2 = src.videoHeight || src.naturalHeight || src.height || H2;
  if (!sw || !sh2) return;
  const ir = sw / sh2;
  const cr = W2 / H2;
  let dw = W2;
  let dh2 = H2;
  if (ir > cr) {
    dw = W2;
    dh2 = W2 / ir;
  } else {
    dh2 = H2;
    dw = H2 * ir;
  }
  const dx = (W2 - dw) / 2;
  const dy = (H2 - dh2) / 2;
  ctx.save();
  if (bgColor !== "transparent") {
    ctx.fillStyle = bgColor || "#000000";
    ctx.fillRect(0, 0, W2, H2);
  }
  ctx.drawImage(src, dx, dy, dw, dh2);
  ctx.restore();
}
function drawFill(ctx, src, W2, H2) {
  const sw = src.videoWidth || src.naturalWidth || src.width || W2;
  const sh2 = src.videoHeight || src.naturalHeight || src.height || H2;
  if (!sw || !sh2) return;
  const ir = sw / sh2;
  const cr = W2 / H2;
  let dw = W2;
  let dh2 = H2;
  if (ir > cr) {
    dh2 = H2;
    dw = H2 * ir;
  } else {
    dw = W2;
    dh2 = W2 / ir;
  }
  ctx.drawImage(src, (W2 - dw) / 2, (H2 - dh2) / 2, dw, dh2);
}
function drawBlurBackground(ctx, src, W2, H2) {
  const sw = src.videoWidth || src.naturalWidth || src.width || W2;
  const sh2 = src.videoHeight || src.naturalHeight || src.height || H2;
  if (!sw || !sh2) return;
  ctx.save();
  ctx.filter = "blur(20px)";
  const ir = sw / sh2;
  const cr = W2 / H2;
  let bgw = W2, bgh = H2;
  if (ir > cr) {
    bgh = H2;
    bgw = H2 * ir;
  } else {
    bgw = W2;
    bgh = W2 / ir;
  }
  ctx.drawImage(src, (W2 - bgw) / 2 - 20, (H2 - bgh) / 2 - 20, bgw + 40, bgh + 40);
  ctx.filter = "none";
  ctx.restore();
  drawFit(ctx, src, W2, H2, "transparent");
}
function drawFootageWithMode(ctx, src, W2, H2, proj) {
  const exp = proj.export || {};
  let mode = exp.resizeMode || "smartAutoFix";
  const sw = src.videoWidth || src.naturalWidth || src.width || W2;
  const sh2 = src.videoHeight || src.naturalHeight || src.height || H2;
  const inAspect = sw / sh2;
  const targetAspect = W2 / H2;
  if (mode === "smartAutoFix") {
    const diff = Math.abs(inAspect - targetAspect);
    if (diff < 0.15) {
      mode = "fill";
    } else if (inAspect >= 1.2 && targetAspect <= 0.85) {
      mode = "blurBackground";
    } else if (inAspect <= 0.85 && targetAspect >= 1.2) {
      mode = "fit";
    } else {
      mode = "fill";
    }
  }
  if (mode === "fit") {
    drawFit(ctx, src, W2, H2, exp.backgroundColor || "#000000");
  } else if (mode === "crop") {
    ctx.save();
    const zoom = Math.max(1, exp.zoom || 1);
    const cropX = typeof exp.cropX === "number" ? exp.cropX : 0.5;
    const cropY = typeof exp.cropY === "number" ? exp.cropY : 0.5;
    let dw, dh2;
    if (inAspect > targetAspect) {
      dh2 = H2 * zoom;
      dw = dh2 * inAspect;
    } else {
      dw = W2 * zoom;
      dh2 = dw / inAspect;
    }
    const dx = (W2 - dw) * cropX;
    const dy = (H2 - dh2) * cropY;
    ctx.beginPath();
    ctx.rect(0, 0, W2, H2);
    ctx.clip();
    ctx.drawImage(src, dx, dy, dw, dh2);
    ctx.restore();
  } else if (mode === "blurBackground") {
    drawBlurBackground(ctx, src, W2, H2);
  } else {
    drawFill(ctx, src, W2, H2);
  }
}
function resampleBands(src, n2) {
  const m2 = src.length;
  if (m2 === 0) return new Array(n2).fill(0);
  if (m2 === n2) return src;
  const out = new Array(n2);
  for (let i = 0; i < n2; i++) {
    const p2 = i / Math.max(1, n2 - 1) * (m2 - 1);
    const lo = Math.floor(p2);
    const hi2 = Math.min(m2 - 1, lo + 1);
    out[i] = src[lo] + (src[hi2] - src[lo]) * (p2 - lo);
  }
  return out;
}
function drawLogo(ctx, logo, img, rawFrame, W2, H2, t2, energy, field, dtFrames, beatFired, bounce) {
  const cx = logo.posX * W2;
  const cy = logo.posY * H2;
  const minDim = Math.min(W2, H2);
  const size = minDim * logo.size;
  let scale = 1;
  if (logo.logoBeatBounce ?? false) scale = 1 + bounce * 0.18;
  else if (logo.logoPulse ?? false) scale = 1 + energy * 0.12;
  const r2 = size / 2 * scale;
  if (logo.particles ?? false) {
    stepParticles(ctx, field, {
      cx,
      cy,
      minDim,
      energy,
      color: logo.particleColor ?? "#ffd24a",
      rgb: logo.particleRgb ?? false,
      t: t2,
      dt: dtFrames,
      forceBurst: beatFired,
      spawnRadius: r2,
      style: logo.particleStyle ?? "burst",
      speed: logo.particleSpeed ?? 1
    });
  }
  if (rawFrame.length) {
    const n2 = Math.max(8, Math.min(160, logo.bars));
    const ringFrame = resampleBands(rawFrame, n2);
    const ringBase = minDim * logo.ringRadius;
    ctx.save();
    ctx.globalAlpha = logo.opacity;
    drawRingBands(ctx, {
      cx,
      cy,
      ringBase,
      minDim,
      bars: n2,
      thickness: logo.ringThickness,
      color: logo.ringColor,
      rgb: logo.rgb,
      glow: logo.glow,
      glowScale: 22,
      intensity: logo.intensity,
      mode: logo.mode,
      style: logo.ringStyle ?? "bars",
      t: t2,
      frame: ringFrame,
      colorAt: (i, count, v2) => rgbColor(logo.rgb, logo.ringColor, i / count, v2)
    });
    ctx.restore();
  }
  ctx.save();
  ctx.globalAlpha = logo.opacity;
  if (logo.rotate ?? false) {
    const secPerRev = Math.max(2, Math.min(20, logo.rotateSecPerRev ?? 8));
    const angle = t2 / secPerRev * Math.PI * 2;
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.arc(0, 0, r2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, -r2, -r2, r2 * 2, r2 * 2);
  } else {
    ctx.beginPath();
    ctx.arc(cx, cy, r2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, cx - r2, cy - r2, r2 * 2, r2 * 2);
  }
  ctx.restore();
}
function applyTextStyle(ctx, style, color, H2) {
  ctx.font = `700 ${style.fontSize * (H2 / 1080)}px ${style.fontFamily}, sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = style.align === "left" ? "left" : style.align === "right" ? "right" : "center";
  ctx.textBaseline = "middle";
  ctx.globalAlpha = style.opacity;
  if (style.shadow) {
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;
  }
}
function textX(style, W2) {
  if (style.position === "custom") return W2 * style.posX;
  if (style.align === "left") return W2 * 0.08;
  if (style.align === "right") return W2 * 0.92;
  return W2 / 2;
}
function lyricsAnimTransform(anim, progress, lineH, nowMs) {
  const easeIn = (p2) => p2 * p2;
  const easeOut = (p2) => 1 - (1 - p2) * (1 - p2);
  const alpha = progress < 0.15 ? easeIn(progress / 0.15) : progress > 0.8 ? easeOut(1 - (progress - 0.8) / 0.2) : 1;
  switch (anim) {
    case "fade":
      return { alpha, offsetY: 0, scaleXY: 1 };
    case "slide-up": {
      const slide = progress < 0.2 ? 1 - easeOut(progress / 0.2) : 0;
      return { alpha, offsetY: lineH * slide, scaleXY: 1 };
    }
    case "slide-down": {
      const slide = progress < 0.2 ? 1 - easeOut(progress / 0.2) : 0;
      return { alpha, offsetY: -lineH * slide, scaleXY: 1 };
    }
    case "scale-pop": {
      const sc2 = progress < 0.12 ? lerp(0.5, 1, easeOut(progress / 0.12)) : 1;
      return { alpha, offsetY: 0, scaleXY: sc2 };
    }
    case "bounce": {
      const b = progress < 0.25 ? Math.sin(progress / 0.25 * Math.PI) * lineH * 0.25 : 0;
      return { alpha, offsetY: -b, scaleXY: 1 };
    }
    case "glow-pulse": {
      const pulse = 0.85 + 0.15 * Math.sin(nowMs / 1e3 * Math.PI * 2 * 1.5);
      return { alpha: alpha * pulse, offsetY: 0, scaleXY: 1 };
    }
    case "typewriter": {
      return { alpha: 1, offsetY: 0, scaleXY: 1, charLimit: Math.floor(progress * 40) };
    }
    default:
      return { alpha: 1, offsetY: 0, scaleXY: 1 };
  }
}
function drawLyrics(ctx, project, t2, W2, H2, nowMs = 0) {
  const { lines, style, highlightColor, highlightMode, animation } = project.lyrics;
  if (!lines.length) {
    placeholder(ctx, "Lyrics will appear here", style, W2, H2);
    return;
  }
  let activeIdx = lines.findIndex((l2) => t2 >= l2.t && t2 < l2.end);
  if (activeIdx === -1) {
    const nextIdx = lines.findIndex((l2) => t2 < l2.t);
    if (nextIdx > 0) activeIdx = nextIdx - 1;
    else if (nextIdx === 0) activeIdx = 0;
  }
  if (activeIdx === -1) return;
  let baseY = style.position === "custom" ? H2 * style.posY : style.position === "top" ? H2 * 0.18 : style.position === "center" ? H2 / 2 : H2 * 0.82;
  if (style.position === "bottom" && H2 > W2) {
    const ratio = H2 / W2;
    if (ratio > 1.5) {
      baseY = H2 * 0.72;
    } else {
      baseY = H2 * 0.76;
    }
  } else if (style.position === "top" && H2 > W2) {
    baseY = H2 * 0.20;
  }
  const x2 = textX(style, W2);
  const scH = H2 / 1080;
  const lineStep = style.fontSize * 1.4 * scH;
  const anim = animation ?? "fade";
  const range = [-1, 0, 1];
  for (const d of range) {
    const idx = activeIdx + d;
    if (idx < 0 || idx >= lines.length) continue;
    const line = lines[idx];
    const isActive = idx === activeIdx;
    const isActuallyActive = isActive && t2 >= line.t && t2 < line.end;
    if (!isActive) {
      if (d === -1 && activeIdx > 0) {
        const gap = lines[activeIdx].t - lines[activeIdx - 1].end;
        if (gap > 2) continue;
      }
      if (d === 1 && activeIdx < lines.length - 1) {
        const gap = lines[activeIdx + 1].t - lines[activeIdx].end;
        if (gap > 2) continue;
      }
    }
    const lineY = baseY + d * lineStep;
    const progress = isActuallyActive && line.end > line.t ? Math.max(0, Math.min(1, (t2 - line.t) / (line.end - line.t))) : 0.5;
    const { alpha, offsetY, scaleXY, charLimit } = isActuallyActive && anim !== "none" ? lyricsAnimTransform(anim, progress, lineStep, nowMs) : { alpha: isActuallyActive ? 1 : 0.35, offsetY: 0, scaleXY: 1 };
    ctx.save();
    if (scaleXY !== 1) {
      ctx.translate(x2, lineY + offsetY);
      ctx.scale(scaleXY, scaleXY);
      ctx.translate(-x2, -(lineY + offsetY));
    }
    const sweepWords = (isActuallyActive && highlightMode === "word") ? (line.words ?? []).map((w2) => ({ t: w2.t, end: w2.end, text: cleanLyricText(w2.text) })).filter((w2) => w2.text) : [];
    if (isActuallyActive && sweepWords.length > 0) {
      ctx.font = `700 ${style.fontSize * scH}px ${style.fontFamily}, sans-serif`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      if (style.shadow) {
        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 2;
      }
      ctx.globalAlpha = style.opacity * alpha;
      const spaceW = ctx.measureText(" ").width;
      const wordWidths = sweepWords.map((w2) => ctx.measureText(w2.text).width);
      const totalW = wordWidths.reduce((s, w2) => s + w2, 0) + spaceW * Math.max(0, sweepWords.length - 1);
      let startX = style.align === "center" ? x2 - totalW / 2 : style.align === "right" ? x2 - totalW : x2;
      for (let wi2 = 0; wi2 < sweepWords.length; wi2++) {
        const word = sweepWords[wi2];
        if (charLimit !== void 0) {
          const charsSoFar = sweepWords.slice(0, wi2).reduce((s, w2) => s + w2.text.length + 1, 0);
          if (charsSoFar >= charLimit) break;
        }
        const isPast = t2 >= word.end;
        const isCurrent = t2 >= word.t && t2 < word.end;
        const wordColor = isPast || isCurrent ? highlightColor : style.color;
        if (style.strokeWidth > 0) {
          ctx.strokeStyle = style.strokeColor;
          ctx.lineWidth = style.strokeWidth * scH * 2;
          ctx.lineJoin = "round";
          ctx.strokeText(word.text, startX, lineY + offsetY);
        }
        ctx.fillStyle = wordColor;
        ctx.fillText(word.text, startX, lineY + offsetY);
        startX += wordWidths[wi2] + spaceW;
      }
    } else {
      applyTextStyle(ctx, style, isActuallyActive ? highlightColor : style.color, H2);
      ctx.globalAlpha = style.opacity * alpha;
      const cleanText = cleanLyricText(line.text);
      const displayText = charLimit !== void 0 ? cleanText.slice(0, charLimit) : cleanText;
      if (style.strokeWidth > 0) {
        ctx.strokeStyle = style.strokeColor;
        ctx.lineWidth = style.strokeWidth * scH * 2;
        ctx.lineJoin = "round";
        ctx.strokeText(displayText, x2, lineY + offsetY);
      }
      ctx.fillText(displayText, x2, lineY + offsetY);
    }
    ctx.restore();
  }
}
function drawPlaylist(ctx, project, t2, W2, H2, rafTs, totalDur, audioItems) {
  const { style } = project.playlist;
  let items = project.playlist.items;
  if (!items.length) {
    if (!audioItems.length) {
      placeholder(ctx, "Playlist titles will appear here", style, W2, H2);
      return;
    }
    const perTrack = totalDur / audioItems.length;
    let acc = 0;
    items = audioItems.map((a) => {
      const item = { file: a.path, title: a.name.replace(/\.[^.]+$/, ""), start: acc, duration: perTrack };
      acc += perTrack;
      return item;
    });
  }
  if (!items.length) {
    placeholder(ctx, "Playlist titles will appear here", style, W2, H2);
    return;
  }
  drawPlaylistList(ctx, items, style, t2, W2, H2);
}
function placeholder(ctx, text, style, W2, H2) {
  ctx.save();
  ctx.font = `600 ${style.fontSize * (H2 / 1080)}px ${style.fontFamily}, sans-serif`;
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, W2 / 2, H2 * 0.82);
  ctx.restore();
}
const ASPECTS = {
  "16:9": [16, 9],
  "9:16": [9, 16],
  "1:1": [1, 1],
  "4:5": [4, 5],
  "custom": null
};
const RES_BY_HEIGHT = { 720: 720, 1080: 1080, 1440: 1440, 2160: 2160 };
function applyResolution(exp, height, aspect) {
  exp.aspect = aspect;
  if (aspect in ASPECTS && ASPECTS[aspect]) {
    const [aw, ah2] = ASPECTS[aspect];
    exp.height = height;
    exp.width = Math.round(height * aw / ah2 / 2) * 2;
  }
}
function pickFootageOrder(project) {
  const f2 = project.footage;
  if (!f2.items.length) return [];
  const pinned = f2.pinned.filter((p2) => f2.items.some((i) => i.path === p2));
  const pool = f2.items.map((i) => i.path).filter((p2) => !pinned.includes(p2));
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const count = Math.max(1, Math.min(f2.randomCount || f2.items.length, f2.items.length));
  const chosen = [...pinned, ...pool].slice(0, Math.max(count, pinned.length));
  return chosen.length ? chosen : f2.items.map((i) => i.path);
}
function generateProjectDnaJs(project) {
  if (!project) return "00000000000000000000000000000000";
  const audioPath = project.audio?.items?.[0]?.path || "";
  const payload = `${project.id || ""}-${project.name || ""}-${project.created_at || ""}-${audioPath}`;
  let h = 2166136261;
  for (let i = 0; i < payload.length; i++) {
    h = Math.imul(h ^ payload.charCodeAt(i), 16777619);
  }
  let seed = h >>> 0;
  let dna = "";
  for (let i = 0; i < 8; i++) {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    const num = (t ^ (t >>> 14)) >>> 0;
    dna += num.toString(16).padStart(8, "0");
  }
  return dna.substring(0, 32);
}
function getAuthenticityScore(project, dna) {
  if (!project) return "0.0%";
  let h = 2166136261;
  for (let i = 0; i < dna.length; i++) {
    h = Math.imul(h ^ dna.charCodeAt(i), 16777619);
  }
  let seed = h >>> 0;
  const prng = () => {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  let score = 80.0;
  if (project.logo?.enabled) {
    if (project.logo?.particles) score += 3.5;
    if (project.logo?.logoBeatBounce) score += 3.2;
    if (project.logo?.glow) score += 2.1;
  }
  if (project.lyrics?.lines?.length > 0) {
    score += 4.5;
    if (project.lyrics?.style?.position === "custom") score += 2.5;
  }
  score += prng() * 4.5;
  score = Math.max(85, Math.min(98, score));
  return score.toFixed(1) + "%";
}
function RenderPanel() {
  const project = useProject();
  const projectDna = reactExports.useMemo(() => generateProjectDnaJs(project), [project]);
  const authenticityScore = reactExports.useMemo(() => getAuthenticityScore(project, projectDna), [project, projectDna]);
  const userMode = useApp((s) => s.userMode);
  const toast = useApp((s) => s.toast);
  const ffmpeg = useApp((s) => s.ffmpeg);
  const hardware = useApp((s) => s.hardware);
  const setPanel = useApp((s) => s.setPanel);
  const progress = useApp((s) => s.renderProgress);
  const running = useApp((s) => s.renderRunning);
  const log = useApp((s) => s.renderLog);
  const queue = useApp((s) => s.renderQueue);
  const [copied, setCopied] = reactExports.useState(false);
  const [masterPresets, setMasterPresets] = reactExports.useState([]);
  const [checklist, setChecklist] = reactExports.useState(null);
  const runChecklist = reactExports.useCallback(async () => {
    if (project) {
      try {
        const res = await window.masjavas.renderCheck(project);
        setChecklist(res);
      } catch (e) {
        console.error(e);
      }
    }
  }, [project]);
  reactExports.useEffect(() => {
    runChecklist();
    const interval = setInterval(runChecklist, 5000);
    return () => clearInterval(interval);
  }, [runChecklist]);
  reactExports.useEffect(() => {
    window.masjavas.masterPresets().then(setMasterPresets);
  }, []);
  reactExports.useEffect(() => {
    const off = window.masjavas.onRenderEvent((p2) => {
      if (p2.logLine) return;
      if (p2.status === "error") toast("error", `${p2.fileName}: ${p2.error}`);
    });
    return off;
  }, []);
  if (!project) return /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, {});
  const exp = project.export;
  const buildJobs = async () => {
    let outDir = exp.outputDir;
    if (!outDir) {
      outDir = await window.masjavas.openFolder();
      if (!outDir) return null;
      patchProject((p2) => (p2.export.outputDir = outDir, p2));
    }
    const sep = outDir.includes("/") && !outDir.includes("\\") ? "/" : "\\";
    const a = project.audio;
    const safeName = sanitizeFilename(project.projectName || project.name || "mix");
    const runId = Date.now();
    const pad = (n2) => String(n2).padStart(2, "0");
    const f2 = project.footage;
    const singlePick = f2.randomCount === 1 && f2.items.length > 0;
    let unused = singlePick ? f2.items.map((it) => it.path).filter((p2) => !(f2.used ?? []).includes(p2)) : [];
    const usedThisRun = [...f2.used ?? []];
    const drawUnusedFootage = () => {
      if (unused.length === 0) {
        unused = f2.items.map((it) => it.path);
        usedThisRun.length = 0;
      }
      const idx = Math.floor(Math.random() * unused.length);
      const [path] = unused.splice(idx, 1);
      usedThisRun.push(path);
      return [path];
    };

    const selectedPlatforms = exp.multiExport && exp.multiExport.length > 0
      ? exp.multiExport
      : [exp.platformPreset || "youtube_landscape"];

    const jobs = [];
    const suffixMap = {
      youtube_landscape: "_youtube",
      tiktok_reels_shorts: "_tiktok",
      instagram_feed_square: "_ig_feed",
      instagram_feed_portrait: "_ig_portrait",
      story: "_story",
      facebook_feed: "_facebook_feed"
    };

    for (const platform of selectedPlatforms) {
      const clonedProject = JSON.parse(JSON.stringify(project));
      clonedProject.export.platformPreset = platform;
      if (platform === "youtube_landscape") {
        applyResolution(clonedProject.export, 1080, "16:9");
      } else if (platform === "tiktok_reels_shorts" || platform === "story") {
        applyResolution(clonedProject.export, 1920, "9:16");
      } else if (platform === "instagram_feed_square" || platform === "facebook_feed") {
        applyResolution(clonedProject.export, 1080, "1:1");
      } else if (platform === "instagram_feed_portrait") {
        applyResolution(clonedProject.export, 1350, "4:5");
      }

      const suffix = suffixMap[platform] || `_${platform}`;
      const count = exp.batchRender ? Math.max(1, Math.floor(exp.batchCount ?? 1)) : 1;

      for (let i = 0; i < count; i++) {
        const platformName = count > 1 ? `${safeName}${suffix}_${pad(i + 1)}.mp4` : `${safeName}${suffix}.mp4`;
        jobs.push({
          jobId: `batch-${runId}-${platform}-${i}`,
          project: clonedProject,
          audioPath: a.items[0]?.path ?? "",
          footageOrder: singlePick ? drawUnusedFootage() : pickFootageOrder(clonedProject),
          outputPath: `${outDir}${sep}${platformName}`
        });
      }
    }

    if (singlePick) patchProject((p2) => (p2.footage.used = usedThisRun, p2));
    return jobs;
  };
  const start = async () => {
    if (!ffmpeg?.found) return toast("error", "FFmpeg not found. Set it up in Settings.");
    const hasMain = project.audio.items.length > 0;
    const hasFootageAudio = project.footage.type === "video" && project.footage.muteFootageAudio === false && project.footage.items.length > 0;
    if (!hasMain && !hasFootageAudio) {
      return toast("error", 'Impor audio di tab Audio, atau matikan "Bisukan audio footage" agar audio ASMR dipakai.');
    }
    const jobs = await buildJobs();
    if (!jobs) return;
    try {
      await window.masjavas.enqueueRender(project, jobs);
      toast("success", `${jobs.length} video ditambahkan ke antrian render.`);
      setPanel("render");
    } catch (e) {
      toast("error", e.message);
    }
  };
  const totalPct = progress && progress.total > 0 ? Math.round((progress.index + (progress.status === "done" ? 1 : progress.percent / 100)) / progress.total * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Render" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Ekspor video hasil editing. Encoder otomatis memilih GPU terbaik yang tersedia." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Format Video" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { 
          label: "Mode Pemula (Sederhana)", 
          value: exp.beginnerMode ?? true, 
          onChange: (v2) => patchProject((p2) => (p2.export.beginnerMode = v2, p2)) 
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Preset Platform", value: exp.platformPreset || "youtube_landscape", options: [
          { value: "youtube_landscape", label: "YouTube Landscape (16:9)" },
          { value: "tiktok_reels_shorts", label: "TikTok / Reels / Shorts (9:16)" },
          { value: "instagram_feed_square", label: "Instagram Feed (1:1)" },
          { value: "instagram_feed_portrait", label: "Instagram Feed (4:5)" },
          { value: "story", label: "Story (9:16)" },
          { value: "facebook_feed", label: "Facebook Feed (1:1)" },
          { value: "custom", label: "Kustom / Manual" }
        ], onChange: (v2) => patchProject((p2) => {
          p2.export.platformPreset = v2;
          if (v2 === "youtube_landscape") {
            applyResolution(p2.export, 1080, "16:9");
          } else if (v2 === "tiktok_reels_shorts" || v2 === "story") {
            applyResolution(p2.export, 1920, "9:16");
          } else if (v2 === "instagram_feed_square" || v2 === "facebook_feed") {
            applyResolution(p2.export, 1080, "1:1");
          } else if (v2 === "instagram_feed_portrait") {
            applyResolution(p2.export, 1350, "4:5");
          }
          return p2;
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { 
          label: "Tampilkan Safe Area", 
          value: exp.showSafeAreas ?? false, 
          onChange: (v2) => patchProject((p2) => (p2.export.showSafeAreas = v2, p2)) 
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { 
          label: "Simulasikan Tampilan Aplikasi", 
          value: exp.showDeviceMockup ?? false, 
          onChange: (v2) => patchProject((p2) => (p2.export.showDeviceMockup = v2, p2)) 
        }),
        (exp.beginnerMode ?? true) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 10, border: "1px solid var(--border)", borderRadius: 6, padding: 10, background: "var(--bg-dark)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 12, fontWeight: 600, color: "var(--text-dim)", display: "block", marginBottom: 6 }, children: "Ekspor Banyak Platform Sekaligus (Render Once, Export Many)" }),
          [
            { value: "youtube_landscape", label: "YouTube (16:9)" },
            { value: "tiktok_reels_shorts", label: "TikTok / Reels (9:16)" },
            { value: "instagram_feed_square", label: "Instagram Feed (1:1)" },
            { value: "instagram_feed_portrait", label: "Instagram Portrait (4:5)" },
            { value: "story", label: "Story (9:16)" },
            { value: "facebook_feed", label: "Facebook Feed (1:1)" }
          ].map((opt) => {
            const isChecked = (exp.multiExport || []).includes(opt.value);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { 
              style: { display: "flex", alignItems: "center", gap: 8, margin: "4px 0", fontSize: 12, cursor: "pointer" }, 
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { 
                  type: "checkbox", 
                  checked: isChecked, 
                  onChange: (e) => patchProject((p2) => {
                    const list = p2.export.multiExport || [];
                    if (e.target.checked) {
                      if (!list.includes(opt.value)) p2.export.multiExport = [...list, opt.value];
                    } else {
                      p2.export.multiExport = list.filter((v3) => v3 !== opt.value);
                    }
                    return p2;
                  }) 
                }),
                opt.label
              ] 
            }, opt.value);
          })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Rasio layar", value: exp.aspect, options: [
            { value: "16:9", label: "16:9 (Landscape)" },
            { value: "9:16", label: "9:16 (Vertikal)" },
            { value: "1:1", label: "1:1 (Kotak)" },
            { value: "4:5", label: "4:5 (Instagram)" },
            { value: "custom", label: "Kustom (Manual)" }
          ], onChange: (v2) => patchProject((p2) => {
            if (v2 !== "custom") {
              applyResolution(p2.export, p2.export.height, v2);
            } else {
              p2.export.aspect = "custom";
            }
            return p2;
          }) }),
          exp.aspect === "custom" && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Lebar (Width)", children: 
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
              type: "number",
              className: "inp",
              value: exp.width || 1920,
              onChange: (e) => patchProject((p2) => {
                const val = parseInt(e.target.value) || 1920;
                p2.export.width = Math.round(val / 2) * 2;
                return p2;
              })
            })
          }),
          exp.aspect === "custom" && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tinggi (Height)", children: 
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
              type: "number",
              className: "inp",
              value: exp.height || 1080,
              onChange: (e) => patchProject((p2) => {
                const val = parseInt(e.target.value) || 1080;
                p2.export.height = Math.round(val / 2) * 2;
                return p2;
              })
            })
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Resolusi Preset", value: String(exp.height), options: [
            { value: "720", label: "720p — HD" },
            { value: "1080", label: "1080p — Full HD" },
            { value: "1440", label: "1440p — 2K" },
            { value: "2160", label: "4K — Ultra HD" }
          ], onChange: (v2) => patchProject((p2) => {
            const h = parseInt(v2);
            if (p2.export.aspect !== "custom") {
              applyResolution(p2.export, h, p2.export.aspect);
            } else {
              p2.export.height = h;
            }
            return p2;
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Frame rate", value: String(exp.fps), options: [
            { value: "24", label: "24 fps — sinematik" },
            { value: "30", label: "30 fps — standar" },
            { value: "60", label: "60 fps — halus" }
          ], onChange: (v2) => patchProject((p2) => (p2.export.fps = parseInt(v2), p2)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Penyesuaian Visual", value: exp.resizeMode || "smartAutoFix", options: [
            { value: "smartAutoFix", label: "Smart Auto-Fix (Rekomendasi)" },
            { value: "fit", label: "Fit (Borders/Padding)" },
            { value: "fill", label: "Fill (Penuh/Potong)" },
            { value: "crop", label: "Crop Manual (Zoom/Geser)" },
            { value: "blurBackground", label: "Blur Background" }
          ], onChange: (v2) => patchProject((p2) => (p2.export.resizeMode = v2, p2)) }),
          (exp.resizeMode === "fit" || exp.resizeMode === "blurBackground" || exp.resizeMode === "smartAutoFix") && 
            /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Tipe Background", value: exp.backgroundMode || "blur", options: [
              { value: "blur", label: "Blur footage" },
              { value: "color", label: "Warna solid" }
            ], onChange: (v2) => patchProject((p2) => (p2.export.backgroundMode = v2, p2)) }),
          (exp.resizeMode === "fit" || exp.resizeMode === "blurBackground" || exp.resizeMode === "smartAutoFix") && exp.backgroundMode === "color" &&
            /* @__PURE__ */ jsxRuntimeExports.jsx(ColorInput, { label: "Warna Background", value: exp.backgroundColor || "#000000", onChange: (v2) => patchProject((p2) => (p2.export.backgroundColor = v2, p2)) }),
          (exp.resizeMode === "crop" || exp.resizeMode === "smartAutoFix") && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Zoom Scale", min: 1, max: 3, step: 0.05, value: exp.zoom ?? 1, onChange: (v2) => patchProject((p2) => (p2.export.zoom = v2, p2)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Posisi Crop X (Horizontal)", min: 0, max: 1, step: 0.05, value: exp.cropX ?? 0.5, onChange: (v2) => patchProject((p2) => (p2.export.cropX = v2, p2)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Posisi Crop Y (Vertikal)", min: 0, max: 1, step: 0.05, value: exp.cropY ?? 0.5, onChange: (v2) => patchProject((p2) => (p2.export.cropY = v2, p2)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", style: { marginTop: 10, width: "100%" }, onClick: () => patchProject((p2) => {
          p2.export.platformPreset = "youtube_landscape";
          p2.export.aspect = "16:9";
          p2.export.width = 1920;
          p2.export.height = 1080;
          p2.export.resizeMode = "smartAutoFix";
          p2.export.zoom = 1.0;
          p2.export.cropX = 0.5;
          p2.export.cropY = 0.5;
          p2.export.backgroundMode = "blur";
          p2.export.backgroundColor = "#000000";
          p2.export.beginnerMode = true;
          p2.export.showSafeAreas = false;
          p2.export.showDeviceMockup = false;
          p2.export.multiExport = [];
          return p2;
        }), children: "Reset ke Rekomendasi Otomatis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "soon", children: [
          "Output: ",
          exp.width,
          "×",
          exp.height,
          " @ ",
          exp.fps,
          "fps"
        ] })
      ] }),
      userMode === "advanced" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Kualitas & Codec" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Codec video", value: exp.vcodec, options: [{ value: "h264", label: "H.264 — kompatibel luas" }, { value: "h265", label: "H.265 — file lebih kecil" }], onChange: (v2) => patchProject((p2) => (p2.export.vcodec = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Codec audio", value: exp.acodec, options: [{ value: "aac", label: "AAC — standar streaming" }, { value: "wav", label: "WAV — lossless" }], onChange: (v2) => patchProject((p2) => (p2.export.acodec = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Encoder", value: exp.encoder, options: [{ value: "auto", label: `Otomatis (${hardware?.selectedEncoder ?? "—"})` }, ...hardware?.encoders.filter((e) => e.available).map((e) => ({ value: e.id, label: e.label })) ?? []], onChange: (v2) => patchProject((p2) => (p2.export.encoder = v2, p2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Bitrate", value: exp.bitrate === "auto" ? "auto" : "custom", options: [{ value: "auto", label: "Otomatis (berbasis kualitas)" }, { value: "custom", label: "Kustom" }], onChange: (v2) => patchProject((p2) => (p2.export.bitrate = v2 === "auto" ? "auto" : 8e3, p2)) }),
        exp.bitrate !== "auto" && /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Bitrate (kbps)", min: 1e3, max: 4e4, step: 500, value: exp.bitrate, onChange: (v2) => patchProject((p2) => (p2.export.bitrate = v2, p2)) })
      ] })
    ] }),
    userMode === "advanced" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Audio" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          label: `Jumlah lagu yang digabung (0 = semua ${project.audio.items.length})`,
          min: 0,
          max: project.audio.items.length,
          step: 1,
          value: Math.min(project.audio.mergeCount, project.audio.items.length),
          fmt: (v2) => v2 === 0 ? `Semua (${project.audio.items.length})` : String(v2),
          onChange: (v2) => patchProject((p2) => (p2.audio.mergeCount = v2, p2))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Toggle,
        {
          label: "Acak urutan lagu setiap render",
          value: project.audio.shuffleEachRender,
          onChange: (v2) => patchProject((p2) => (p2.audio.shuffleEachRender = v2, p2))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Toggle,
        {
          label: "Atur durasi total secara manual",
          value: project.audio.customDuration,
          onChange: (v2) => patchProject((p2) => (p2.audio.customDuration = v2, p2))
        }
      ),
      project.audio.customDuration && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontSize: 12, color: "var(--text-dim)", display: "block", marginBottom: 4 }, children: "Target durasi (menit) — audio diulang jika terlalu pendek, dipotong jika terlalu panjang" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            min: 1,
            step: 1,
            value: project.audio.targetMinutes,
            onChange: (e) => {
              const v2 = Math.max(1, parseInt(e.target.value, 10) || 1);
              patchProject((p2) => (p2.audio.targetMinutes = v2, p2));
            },
            style: { width: "100%", padding: "6px 8px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--text)", fontSize: 13 }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "soon", style: { marginTop: 4 }, children: [
          project.audio.targetMinutes,
          " menit = ",
          Math.floor(project.audio.targetMinutes / 60),
          "j ",
          project.audio.targetMinutes % 60,
          "m"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "soon", children: `Menggabungkan ${project.audio.mergeCount === 0 ? project.audio.items.length : project.audio.mergeCount} lagu menjadi 1 video${project.audio.customDuration ? `, durasi ${project.audio.targetMinutes} menit` : ""}.` })
    ] }),
    userMode === "advanced" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Batch Render" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Toggle,
        {
          label: "Batch render — beberapa video sekaligus",
          value: exp.batchRender ?? false,
          onChange: (v2) => patchProject((p2) => (p2.export.batchRender = v2, p2))
        }
      ),
      exp.batchRender && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontSize: 12, color: "var(--text-dim)", display: "block", marginBottom: 4 }, children: "Jumlah video" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            min: 1,
            step: 1,
            value: exp.batchCount ?? 1,
            onChange: (e) => {
              const v2 = Math.max(1, parseInt(e.target.value, 10) || 1);
              patchProject((p2) => (p2.export.batchCount = v2, p2));
            },
            style: { width: "100%", padding: "6px 8px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--text)", fontSize: 13 }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "soon", style: { marginTop: 8 }, children: exp.batchRender ? `Akan merender ${Math.max(1, Math.floor(exp.batchCount ?? 1))} video. Footage & lagu diacak ulang tiap video; semua elemen overlay sama. File: ${(project.name || "mix").replace(/[\\/:*?"<>|]/g, "_")}_01.mp4, _02.mp4, …` : "Nonaktif — merender 1 video." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Prasyarat Render" }),
      checklist ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8, fontSize: 12 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Audio terimpor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusPill, { ok: checklist.audio.ok, label: checklist.audio.ok ? "Siap" : "Kosong" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Footage terimpor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusPill, { ok: checklist.footage.ok, label: checklist.footage.ok ? "Siap" : "Kosong" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Penyimpanan disk" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusPill, { ok: checklist.disk.ok, label: checklist.disk.ok ? "Cukup" : `Kurang (${checklist.disk.freeMb}MB)` })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 12, color: "var(--text-dim)" }, children: "Memeriksa prasyarat..." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Output" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "btn-row", style: { marginBottom: 10 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: async () => {
        const f2 = await window.masjavas.openFolder();
        if (f2) patchProject((p2) => (p2.export.outputDir = f2, p2));
      }, children: "Pilih Folder Output…" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Folder" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "val", children: exp.outputDir ? exp.outputDir.split(/[\\/]/).pop() : "Belum dipilih (akan ditanya saat render)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Output" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "val", children: exp.batchRender ? `${Math.max(1, Math.floor(exp.batchCount ?? 1))} video (batch)` : "1 video" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-row", style: { marginTop: 6, opacity: 0.9 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Project DNA" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "val", style: { fontFamily: "monospace", fontSize: 11, cursor: "pointer", color: "var(--text-dim)" }, onClick: () => {
          navigator.clipboard.writeText(projectDna);
          toast("success", "DNA berhasil disalin!");
        }, children: [
          projectDna.substring(0, 8),
          "...",
          projectDna.substring(24),
          " 📋"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-row", style: { marginTop: 6 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", style: { color: "var(--ok, #4ea)" }, children: "Keaslian (Authenticity)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "val", style: { fontWeight: "bold", color: "var(--ok, #4ea)" }, children: authenticityScore })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "btn-row", style: { marginTop: 14 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `btn primary ${(!checklist || !checklist.ready) ? "disabled" : ""}`, disabled: !checklist || !checklist.ready, onClick: start, children: "+ Tambah ke Antrian Render" }) }),
      (!checklist || !checklist.ready) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 11, color: "var(--bad, #f66)", marginTop: 6, textAlign: "center" }, children: "⚠ Silakan penuhi prasyarat render di atas untuk memulai." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "soon", style: { fontSize: 11, marginTop: 6 }, children: "Semua mode masuk antrian. Setelah ditambahkan, buka/buat project lain & tambahkan lagi — antrian diproses berurutan. (Lirik/Playlist full reaktif, Batch dummy.)" })
    ] }),
    queue.items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
        "Antrian Render (",
        queue.items.filter((i) => i.status === "waiting" || i.status === "rendering").length,
        " aktif)"
      ] }),
      queue.items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-row", style: { alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "label", style: { flex: 1 }, children: [
          it.name,
          " · ",
          it.jobCount,
          " video"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `pill ${it.status === "rendering" ? "ok" : it.status === "error" ? "no" : "warn"}`, style: { marginRight: 8 }, children: it.status === "waiting" ? "menunggu" : it.status === "rendering" ? "merender" : it.status === "done" ? "selesai" : it.status === "error" ? "gagal" : "dibatalkan" }),
        (it.status === "waiting" || it.status === "rendering") && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", style: { fontSize: 11, padding: "3px 8px" }, onClick: () => window.masjavas.cancelQueueItem(it.id), children: "Batal" })
      ] }, it.id)),
      queue.items.some((i) => i.status === "waiting" || i.status === "rendering") && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "btn-row", style: { marginTop: 10 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: () => window.masjavas.clearRenderQueue(), children: "Batalkan Semua Antrian" }) })
    ] }),
    userMode === "advanced" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Pemrosesan Audio" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "soon", style: { fontSize: 11 }, children: "Diterapkan per lagu sebelum digabung — mastering, fade in/out, lalu gabung." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Select,
        {
          label: "Mastering per lagu",
          value: project.audio.preMasterPreset || "",
          options: [{ value: "", label: "Tidak ada (lewati mastering)" }, ...masterPresets.map((p2) => ({ value: p2.id, label: p2.name }))],
          onChange: (v2) => patchProject((p2) => (p2.audio.preMasterPreset = v2, p2))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid2", style: { gap: 8, marginTop: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontSize: 12, color: "var(--text-dim)" }, children: "Fade in (detik)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              min: 0,
              max: 10,
              step: 0.5,
              value: project.audio.fadeIn ?? 1,
              onChange: (e) => patchProject((p2) => (p2.audio.fadeIn = parseFloat(e.target.value) || 0, p2)),
              style: { width: "100%", marginTop: 4 }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontSize: 12, color: "var(--text-dim)" }, children: "Fade out (detik)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              min: 0,
              max: 10,
              step: 0.5,
              value: project.audio.fadeOut ?? 3,
              onChange: (e) => patchProject((p2) => (p2.audio.fadeOut = parseFloat(e.target.value) || 0, p2)),
              style: { width: "100%", marginTop: 4 }
            }
          )
        ] })
      ] })
    ] }),
    (running || progress) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Progress Render" }),
      progress && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontWeight: 600 }, children: [
            progress.total > 1 ? `Video ${progress.index + 1} / ${progress.total}` : "Merender",
            " — ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--text-dim)", fontWeight: 400 }, children: progress.fileName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--accent)", fontWeight: 700 }, children: [
            totalPct,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { pct: totalPct, color: "var(--accent)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6, margin: "10px 0", padding: "8px 10px", background: "var(--bg-elev2)", borderRadius: 6, fontSize: 12 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: ["♪ ", "Persiapan audio & penggabungan"] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: (progress.status === "rendering" || progress.status === "done") ? "var(--good)" : "var(--warn)" }, children: (progress.status === "rendering" || progress.status === "done") ? "Selesai" : "Memproses..." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: ["“” ", "Transkripsi lirik & subtitle"] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: (progress.status === "rendering" || progress.status === "done") ? "var(--good)" : progress.task?.includes("lirik") ? "var(--warn)" : "var(--text-faint)" }, children: (progress.status === "rendering" || progress.status === "done") ? "Selesai" : progress.task?.includes("lirik") ? "Memproses..." : "Menunggu" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: ["⚡ ", "Rendering video (FFmpeg)"] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: progress.status === "done" ? "var(--good)" : progress.status === "rendering" ? "var(--warn)" : "var(--text-faint)" }, children: progress.status === "done" ? "Selesai" : progress.status === "rendering" ? `Rendering (${totalPct}%)` : "Menunggu" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 11, marginTop: 10, marginBottom: 3, color: "var(--text-dim)" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Proses saat ini" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            progress.status === "done" ? "100" : progress.percent,
            "%",
            progress.elapsedMs > 0 && ` · ${(progress.elapsedMs / 1e3).toFixed(0)}d terlewati`,
            progress.etaMs > 0 && progress.status === "rendering" && ` · ~${(progress.etaMs / 1e3).toFixed(0)}d tersisa`
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { pct: progress.status === "done" ? 100 : progress.percent, color: "var(--accent-soft, rgba(59,130,246,0.4))" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 8, fontSize: 11, color: "var(--text-faint)", minHeight: 16 }, children: progress.task || progress.status })
      ] }),
      running && !progress && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 12, color: "var(--text-dim)" }, children: "Mempersiapkan…" }),
      log.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 12 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11, color: "var(--text-faint)" }, children: "Log render" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "btn",
              style: { padding: "2px 10px", fontSize: 11 },
              onClick: () => {
                const text = [...log].reverse().join("\n");
                navigator.clipboard.writeText(text).then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }).catch(() => {
                });
              },
              title: "Salin semua log",
              children: copied ? "✓ Tersalin" : "Salin log"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          fontFamily: "var(--mono)",
          fontSize: 11,
          maxHeight: 180,
          overflowY: "auto",
          background: "var(--bg)",
          borderRadius: 6,
          padding: "8px 10px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          userSelect: "text",
          cursor: "text"
        }, children: log.map((l2, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: l2.startsWith("✓") ? "var(--good, #4c4)" : l2.startsWith("✗") ? "var(--bad, #f66)" : "var(--text-dim)", userSelect: "text" }, children: l2 }, i)) })
      ] })
    ] })
  ] });
}
function Bar({ pct, color = "var(--accent)" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 6, background: "var(--bg)", borderRadius: 4, overflow: "hidden" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: `${Math.min(100, pct)}%`, height: "100%", background: color, transition: "width .3s ease" } }) });
}
function Empty() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "panel-head", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Render" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty", children: "Buat atau buka proyek terlebih dahulu." })
  ] });
}
const GROQ_CONSOLE_URL = "https://console.groq.com/keys";
function StatusPill({ ok: ok2, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `pill ${ok2 ? "ok" : "no"}`, children: label || (ok2 ? "OK" : "Tidak ada") });
}
function SettingsPanel() {
  const settings = useApp((s) => s.settings);
  const hardware = useApp((s) => s.hardware);
  const ffmpeg = useApp((s) => s.ffmpeg);
  const sidecar = useApp((s) => s.sidecar);
  const appInfo = useApp((s) => s.appInfo);
  const update = useApp((s) => s.updateSettings);
  const refresh = useApp((s) => s.refreshStatus);
  const toast = useApp((s) => s.toast);
  const [groqKeyInput, setGroqKeyInput] = reactExports.useState(null);
  const [groqKeySaved, setGroqKeySaved] = reactExports.useState(false);
  const [showGroqKey, setShowGroqKey] = reactExports.useState(false);
  const [groqTesting, setGroqTesting] = reactExports.useState(false);
  const [groqTestStatus, setGroqTestStatus] = reactExports.useState(null);
  const [tgToken, setTgToken] = reactExports.useState(null);
  const [tgChat, setTgChat] = reactExports.useState(null);
  const [tgSaved, setTgSaved] = reactExports.useState(false);
  const [showTgToken, setShowTgToken] = reactExports.useState(false);
  const [tgTesting, setTgTesting] = reactExports.useState(false);
  const [healthData, setHealthData] = reactExports.useState(null);
  const [checkingHealth, setCheckingHealth] = reactExports.useState(false);
  const [updateStatus, setUpdateStatus] = reactExports.useState(null);
  const [checkingUpdate, setCheckingUpdate] = reactExports.useState(false);
  const [exportingDiagnostics, setExportingDiagnostics] = reactExports.useState(false);
  const checkHealth = async () => {
    setCheckingHealth(true);
    try {
      const res = await window.masjavas.appHealthCheck();
      setHealthData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setCheckingHealth(false);
    }
  };
  reactExports.useEffect(() => {
    checkHealth();
  }, []);
  if (!settings) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {});
  const qualityLabel = (q2) => q2 === "low" ? "Rendah" : q2 === "balanced" ? "Seimbang" : "Tinggi";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Pengaturan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tampilan, encoder video, dan status layanan." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Tampilan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tema" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "seg", children: ["dark", "light"].map((t2) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: settings.theme === t2 ? "on" : "", onClick: () => update({ theme: t2 }), children: t2 === "dark" ? "Gelap" : "Terang" }, t2)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Warna aksen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "swatches", children: Object.keys(ACCENTS).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `swatch ${settings.accent === a ? "sel" : ""}`,
            style: { background: ACCENTS[a].hex },
            title: ACCENTS[a].name,
            onClick: () => update({ accent: a })
          },
          a
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "adv-details", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { children: "Tampilkan Pengaturan Lanjutan (Developer Settings)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 10 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Encoder Render" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Preferensi encoder (otomatis pilih GPU terbaik yang tersedia)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 11, color: "var(--text-dim)", margin: "4px 0" }, children: "💡 GPU Encoder (NVENC, AMF, QSV) mempercepat render hingga 5x lipat daripada CPU standar." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                className: "inp",
                value: settings.encoderPreference,
                onChange: (e) => update({ encoderPreference: e.target.value }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "auto", children: "Otomatis" }),
                  hardware?.encoders.map((enc) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: enc.id, disabled: !enc.available, children: [
                    enc.label,
                    enc.available ? "" : " (tidak tersedia)"
                  ] }, enc.id))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Encoder aktif" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "val", children: hardware?.selectedEncoder ?? "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { marginTop: 12 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mode kualitas (bitrate otomatis)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 11, color: "var(--text-dim)", margin: "4px 0" }, children: "💡 Kualitas mengatur bitrate secara otomatis: Rendah (2-5 Mbps), Seimbang (8-12 Mbps), Tinggi (15-20 Mbps)." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "seg", children: ["low", "balanced", "high"].map((q2) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: settings.qualityMode === q2 ? "on" : "", onClick: () => update({ qualityMode: q2 }), children: qualityLabel(q2) }, q2)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Manage API Key — Groq AI" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { fontSize: 12, color: "var(--text-dim)", marginBottom: 10 }, children: [
            "Groq menggunakan model ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "whisper-large-v3-turbo" }),
            " via cloud — lebih cepat dan akurat dari WhisperX lokal. API key disimpan di komputer ini secara aman.",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: GROQ_CONSOLE_URL, target: "_blank", rel: "noreferrer", style: { color: "var(--accent)" }, children: "Dapatkan API key gratis →" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Provider transkripsi lirik" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 11, color: "var(--text-dim)", margin: "4px 0" }, children: "💡 WhisperX dijalankan secara lokal di PC Anda. Groq AI berjalan di cloud (sangat cepat dan akurat, memerlukan API key)." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "seg", children: ["whisper", "groq"].map((p2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: settings.transcribeProvider === p2 ? "on" : "",
                onClick: () => update({ transcribeProvider: p2 }),
                children: p2 === "whisper" ? "WhisperX (lokal)" : "Groq (cloud)"
              },
              p2
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { marginTop: 10 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Groq API Key" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6, alignItems: "center" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  className: "inp",
                  type: showGroqKey ? "text" : "password",
                  placeholder: "gsk_…",
                  style: { flex: 1, fontFamily: "monospace", fontSize: 12 },
                  value: groqKeyInput ?? settings.groqApiKey,
                  onChange: (e) => {
                    setGroqKeyInput(e.target.value);
                    setGroqKeySaved(false);
                    setGroqTestStatus(null);
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", style: { padding: "4px 10px", fontSize: 11 }, onClick: () => setShowGroqKey((v2) => !v2), children: showGroqKey ? "Sembunyikan" : "Tampilkan" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "btn-row", style: { marginTop: 12 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "btn primary",
                style: { padding: "4px 12px", fontSize: 11 },
                disabled: groqKeyInput === null || groqKeyInput === settings.groqApiKey,
                onClick: async () => {
                  await update({ groqApiKey: groqKeyInput ?? "" });
                  setGroqKeySaved(true);
                  setGroqTestStatus(null);
                  toast("success", "Groq API key disimpan.");
                },
                children: groqKeySaved ? "✓ Tersimpan" : "Simpan"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "btn",
                style: { padding: "4px 12px", fontSize: 11 },
                disabled: groqTesting,
                onClick: async () => {
                  const currentKey = groqKeyInput ?? settings.groqApiKey;
                  if (!currentKey) {
                    toast("error", "API key kosong.");
                    return;
                  }
                  setGroqTesting(true);
                  setGroqTestStatus(null);
                  try {
                    const res = await window.masjavas.groqTestConnection(currentKey);
                    setGroqTesting(false);
                    if (res.ok) {
                      setGroqTestStatus({ ok: true, msg: "Koneksi Berhasil: API Merespons OK" });
                      toast("success", "Koneksi Groq sukses!");
                    } else {
                      setGroqTestStatus({ ok: false, msg: `Koneksi Gagal: ${res.error || "Unknown error"}` });
                      toast("error", "Koneksi Groq gagal.");
                    }
                  } catch (e) {
                    setGroqTesting(false);
                    setGroqTestStatus({ ok: false, msg: `Koneksi Gagal: ${e.message}` });
                    toast("error", `Koneksi Groq gagal: ${e.message}`);
                  }
                },
                children: groqTesting ? "Menguji…" : "Uji Koneksi"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "btn danger",
                style: { padding: "4px 12px", fontSize: 11, backgroundColor: "#551a1a", color: "#ff9999" },
                disabled: !(groqKeyInput ?? settings.groqApiKey),
                onClick: async () => {
                  if (confirm("Hapus Groq API key?")) {
                    await update({ groqApiKey: "" });
                    setGroqKeyInput("");
                    setGroqKeySaved(false);
                    setGroqTestStatus(null);
                    toast("success", "Groq API key dihapus.");
                  }
                },
                children: "Hapus API Key"
              }
            )
          ] }),
          groqTestStatus && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 11, color: groqTestStatus.ok ? "var(--good, #4c4)" : "var(--bad, #f66)", marginTop: 6 }, children: groqTestStatus.msg }),
          settings.groqApiKey && !groqTestStatus && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 11, color: "var(--good, #4c4)", marginTop: 6 }, children: "✓ API key tersimpan — Groq siap digunakan." }),
          !settings.groqApiKey && settings.transcribeProvider === "groq" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 11, color: "var(--bad, #f66)", marginTop: 6 }, children: "⚠ Provider diset ke Groq tapi API key belum diisi." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Telegram — Notifikasi Render" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { fontSize: 12, color: "var(--text-dim)", marginBottom: 10, lineHeight: 1.5 }, children: [
            "Kirim pesan otomatis ke Telegram tiap render selesai (nama file, durasi, sisa batch & antrian project). Disimpan di komputer ini — tidak perlu isi ulang.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Cara dapat:" }),
            " chat ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://t.me/BotFather", target: "_blank", rel: "noreferrer", style: { color: "var(--accent)" }, children: "@BotFather" }),
            " → ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "/newbot" }),
            " → salin ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "bot token" }),
            ". Lalu chat ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://t.me/userinfobot", target: "_blank", rel: "noreferrer", style: { color: "var(--accent)" }, children: "@userinfobot" }),
            " untuk dapat ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Chat ID" }),
            " kamu. Kirim dulu 1 pesan ke bot-mu biar bot boleh balas."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Aktifkan notifikasi Telegram" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "seg", children: [["Nyala", true], ["Mati", false]].map(([label, val]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: settings.telegramEnabled === val ? "on" : "",
                onClick: () => update({ telegramEnabled: val }),
                children: label
              },
              label
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { marginTop: 10 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Bot Token" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6, alignItems: "center" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  className: "inp",
                  type: showTgToken ? "text" : "password",
                  placeholder: "123456789:ABCdef…",
                  style: { flex: 1, fontFamily: "monospace", fontSize: 12 },
                  value: tgToken ?? settings.telegramBotToken,
                  onChange: (e) => {
                    setTgToken(e.target.value);
                    setTgSaved(false);
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", style: { padding: "4px 10px", fontSize: 11 }, onClick: () => setShowTgToken((v2) => !v2), children: showTgToken ? "Sembunyikan" : "Tampilkan" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { marginTop: 10 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Chat ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "inp",
                placeholder: "mis. 123456789",
                style: { fontFamily: "monospace", fontSize: 12 },
                value: tgChat ?? settings.telegramChatId,
                onChange: (e) => {
                  setTgChat(e.target.value);
                  setTgSaved(false);
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "btn-row", style: { marginTop: 12 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "btn primary",
                style: { padding: "4px 12px", fontSize: 11 },
                disabled: tgToken === null && tgChat === null || (tgToken ?? settings.telegramBotToken) === settings.telegramBotToken && (tgChat ?? settings.telegramChatId) === settings.telegramChatId,
                onClick: async () => {
                  await update({
                    telegramBotToken: tgToken ?? settings.telegramBotToken,
                    telegramChatId: tgChat ?? settings.telegramChatId
                  });
                  setTgSaved(true);
                  toast("success", "Pengaturan Telegram disimpan.");
                },
                children: tgSaved ? "✓ Tersimpan" : "Simpan"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "btn",
                style: { padding: "4px 12px", fontSize: 11 },
                disabled: tgTesting,
                onClick: async () => {
                  if (tgToken !== null && tgToken !== settings.telegramBotToken || tgChat !== null && tgChat !== settings.telegramChatId) {
                    await update({
                      telegramBotToken: tgToken ?? settings.telegramBotToken,
                      telegramChatId: tgChat ?? settings.telegramChatId
                    });
                    setTgSaved(true);
                  }
                  setTgTesting(true);
                  const res = await window.masjavas.telegramTest();
                  setTgTesting(false);
                  toast(res.ok ? "success" : "error", res.ok ? "Pesan tes terkirim ke Telegram." : `Gagal: ${res.error}`);
                },
                children: tgTesting ? "Mengirim…" : "Kirim Tes"
              }
            )
          ] }),
          settings.telegramEnabled && (!settings.telegramBotToken || !settings.telegramChatId) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 11, color: "var(--bad, #f66)", marginTop: 6 }, children: "⚠ Notifikasi nyala tapi Bot Token / Chat ID belum lengkap." })
        ] })
      ] })
    ] }),,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Status Sistem" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Aplikasi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "val", children: [
          appInfo?.name,
          " · v",
          appInfo?.version
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Sistem" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "val", children: [
          appInfo?.platform,
          " ",
          appInfo?.arch,
          " · ",
          hardware?.cpus,
          " CPU ·",
          " ",
          hardware ? `${Math.round(hardware.totalMemMB / 1024)} GB RAM` : "—"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Mesin render" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "val" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusPill, { ok: !!ffmpeg?.found, label: ffmpeg?.found ? "Siap" : "Belum siap" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Akselerasi GPU" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "val" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatusPill,
          {
            ok: !!hardware?.encoders.some((e) => e.available && e.id !== "x264"),
            label: hardware?.encoders.some((e) => e.available && e.id !== "x264") ? "Tersedia" : "CPU"
          }
        )
      ] }),
      hardware?.gpuNote && !hardware.encoders.some((e) => e.available && e.id !== "x264") && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "status-row", style: { marginTop: -6 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "val", style: { flex: 1, fontSize: 11, opacity: 0.7, lineHeight: 1.3 }, children: hardware.gpuNote }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Pemrosesan audio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "val" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `pill ${sidecar?.running ? "ok" : sidecar?.pythonFound ? "warn" : "no"}`, children: sidecar?.running ? "Aktif" : sidecar?.pythonFound ? "Standby" : "Belum siap" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Penyimpanan disk" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "val" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusPill, { ok: healthData?.disk?.ok ?? true, label: healthData?.disk ? `${healthData.disk.freeMb} MB Bebas` : "Memeriksa..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Auto Update" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "val", children: updateStatus ? (updateStatus.hasUpdate ? `Versi baru v${updateStatus.latest} tersedia` : "Aplikasi versi terbaru") : "Belum diperiksa" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "btn-row", style: { marginTop: 14, flexWrap: "wrap", gap: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: () => refresh().then(() => checkHealth()).then(() => toast("info", "Status diperbarui.")), children: "Perbarui Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn",
            onClick: async () => {
              const res = await window.masjavas.pingSidecar();
              toast(res.running ? "success" : "error", res.running ? "Pemrosesan audio aktif." : "Pemrosesan audio belum siap.");
              refresh();
              checkHealth();
            },
            children: "Uji Pemrosesan Audio"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn",
            disabled: exportingDiagnostics,
            onClick: async () => {
              setExportingDiagnostics(true);
              try {
                const path = await window.masjavas.appExportDiagnostics();
                toast("success", `Diagnostik diekspor ke: ${path}`);
              } catch (e) {
                toast("error", `Gagal ekspor: ${e.message}`);
              } finally {
                setExportingDiagnostics(false);
              }
            },
            children: exportingDiagnostics ? "Mengekspor…" : "Ekspor Diagnostik"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn",
            disabled: checkingUpdate,
            onClick: async () => {
              setCheckingUpdate(true);
              try {
                const res = await window.masjavas.appCheckForUpdates();
                setUpdateStatus(res);
                if (res.hasUpdate) {
                  toast("info", `Update tersedia: v${res.latest}. Silakan klik 'Terapkan Update'`);
                } else {
                  toast("success", "Aplikasi Anda sudah versi terbaru.");
                }
              } catch (e) {
                toast("error", `Gagal cek update: ${e.message}`);
              } finally {
                setCheckingUpdate(false);
              }
            },
            children: checkingUpdate ? "Memeriksa…" : "Cek Update"
          }
        ),
        updateStatus?.hasUpdate && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "btn primary",
            onClick: async () => {
              toast("info", "Sedang menerapkan update...");
              try {
                const res = await window.masjavas.appApplyUpdate();
                if (res.success) {
                  toast("success", res.message);
                } else {
                  toast("error", `Gagal update: ${res.error}`);
                }
              } catch (e) {
                toast("error", `Gagal update: ${e.message}`);
              }
            },
            children: "Terapkan Update"
          }
        )
      ] }),
      !ffmpeg?.found && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "soon", style: { marginTop: 12, fontSize: 11 }, children: "Mesin render belum siap. Mulai ulang aplikasi; jika tetap, instal ulang aplikasi." })
    ] })
  ] });
}
const TABS = [
  { id: "project", label: "Proyek", icon: "◆" },
  { id: "media", label: "Media", icon: "▣" },
  { id: "audio", label: "Audio", icon: "♪" },
  { id: "lyrics", label: "Lirik", icon: '""' },
  { id: "playlist", label: "Playlist", icon: "≣" },
  { id: "spectrum", label: "Spektrum", icon: "∿" },
  { id: "logo", label: "Logo", icon: "◎" },
  { id: "effects", label: "Efek", icon: "✶" },
  { id: "overlay", label: "Overlay", icon: "❄" },
  { id: "mastering", label: "Mastering", icon: "⊜" },
  { id: "render", label: "Render", icon: "►" },
  { id: "settings", label: "Pengaturan", icon: "⚙" }
];
function ActivePanel() {
  const panel = useApp((s) => s.activePanel);
  switch (panel) {
    case "project":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectPanel, {});
    case "media":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(MediaPanel, {});
    case "audio":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(AudioPanel, {});
    case "lyrics":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(LyricsPanel, {});
    case "playlist":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(PlaylistPanel, {});
    case "spectrum":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SpectrumPanel, {});
    case "logo":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(LogoPanel, {});
    case "effects":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(EffectsPanel, {});
    case "overlay":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(OverlayPanel, {});
    case "mastering":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(MasteringPanel, {});
    case "render":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(RenderPanel, {});
    case "settings":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsPanel, {});
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectPanel, {});
  }
}
const WIZARD_DISMISSED_KEY = "masjavas_wizard_dismissed_v1";
function App() {
  const init = useApp((s) => s.init);
  const ready = useApp((s) => s.ready);
  const view = useApp((s) => s.view);
  const activePanel = useApp((s) => s.activePanel);
  const setPanel = useApp((s) => s.setPanel);
  const setView = useApp((s) => s.setView);
  const saveProject = useApp((s) => s.saveProject);
  const project = useApp((s) => s.project);
  const appInfo = useApp((s) => s.appInfo);
  const ffmpeg = useApp((s) => s.ffmpeg);
  useApp((s) => s.sidecar);
  const isRendering = useApp((s) => s.isRendering);
  const userMode = useApp((s) => s.userMode);
  const setUserMode = useApp((s) => s.setUserMode);
  const [wizardDismissed, setWizardDismissed] = reactExports.useState(
    () => localStorage.getItem(WIZARD_DISMISSED_KEY) === "1"
  );
  const [leftW, setLeftW] = reactExports.useState(310);
  const resizingRef = reactExports.useRef(false);
  const startXRef = reactExports.useRef(0);
  const startWRef = reactExports.useRef(310);
  const onResizeMouseDown = reactExports.useCallback((e) => {
    resizingRef.current = true;
    startXRef.current = e.clientX;
    startWRef.current = leftW;
    e.preventDefault();
  }, [leftW]);
  reactExports.useEffect(() => {
    const onMove = (e) => {
      if (!resizingRef.current) return;
      const delta = e.clientX - startXRef.current;
      const newW = Math.max(240, Math.min(520, startWRef.current + delta));
      setLeftW(newW);
    };
    const onUp = () => {
      resizingRef.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);
  const showWizard = false;
  reactExports.useEffect(() => {
    init();
  }, [init]);
  if (!ready) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", placeItems: "center", height: "100vh", color: "var(--text-dim)" }, children: "Loading MASJAVAS…" });
  }
  if (view === "home" || !project) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HomeScreen, {}),
      showWizard,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toasts, {})
    ] });
  }
  const beginnerTabIds = ["audio", "media", "lyrics", "spectrum", "render"];
  const visibleTabs = TABS.filter((t2) => {
    if (userMode === "beginner") {
      return beginnerTabIds.includes(t2.id);
    }
    return !t2.modes || t2.modes.includes(project.mode);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "topbar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "brand", style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "./assets/logo.png", style: { width: 22, height: 22, objectFit: "contain", marginRight: 8, borderRadius: 2 } }),
        "MASJAVAS ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "v", children: "V1.7" })
      ] }),
      project && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mode-badge", children: project.mode }),
      project && /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
        type: "text",
        className: "proj-name-input",
        value: project.projectName || project.name || "Untitled Project",
        style: {
          background: "transparent",
          border: "1px solid transparent",
          borderRadius: 4,
          color: "var(--text)",
          fontSize: 13,
          fontWeight: 600,
          padding: "2px 6px",
          width: 200,
          cursor: "text"
        },
        onFocus: (e) => {
          e.target.style.border = "1px solid var(--border)";
          e.target.style.background = "var(--bg-dark)";
        },
        onBlur: (e) => {
          e.target.style.border = "1px solid transparent";
          e.target.style.background = "transparent";
          const nextVal = e.target.value.trim();
          if (nextVal) {
            patchProject((p) => {
              p.projectName = nextVal;
              p.name = nextVal;
              return p;
            });
          }
        },
        onKeyDown: (e) => {
          if (e.key === "Enter") {
            e.target.blur();
          }
        },
        onChange: (e) => {
          const val = e.target.value;
          patchProject((p) => {
            p.projectName = val;
            p.name = val;
            return p;
          });
        }
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", {
        className: `mode-toggle-btn ${userMode === "beginner" ? "beg" : ""}`,
        onClick: () => {
          const nextMode = userMode === "beginner" ? "advanced" : "beginner";
          setUserMode(nextMode);
          if (nextMode === "beginner" && !beginnerTabIds.includes(activePanel)) {
            setPanel("audio");
          }
        },
        style: { marginLeft: 8 },
        children: userMode === "beginner" ? [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginRight: 4 }, children: "🐣" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mode Pemula" })
        ] : [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginRight: 4 }, children: "🛠" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mode Lanjutan" })
        ]
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spacer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "save-indicator", children: "Tersimpan otomatis" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn", onClick: saveProject, style: { padding: "5px 14px", fontSize: 12, marginRight: 8 }, children: "Simpan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "render-header-btn", onClick: () => setPanel("render"), children: "Ekspor Video ▶" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "proj-name", style: { fontSize: 11 }, children: [
        appInfo?.platform,
        " ",
        appInfo?.arch
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toptabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "tab-btn home-tab", onClick: () => setView("home"), title: "Home", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tab-ico", children: "⌂" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Home" })
      ] }),
      visibleTabs.map((t2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `tab-btn ${activePanel === t2.id ? "active" : ""}`,
          onClick: () => setPanel(t2.id),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tab-ico", children: t2.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t2.label })
          ]
        },
        t2.id
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1 } }),
      isRendering && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11, color: "var(--accent)", padding: "0 8px", fontWeight: 600, letterSpacing: "0.02em" }, children: "⏳ Rendering…" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, padding: "0 8px", fontSize: 11, color: "var(--text-faint)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: ffmpeg?.found ? "var(--good)" : "var(--bad)",
              flexShrink: 0
            },
            title: ffmpeg?.found ? "FFmpeg siap" : "FFmpeg tidak ditemukan"
          }
        ),
        "FFmpeg"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shell", style: { gridTemplateColumns: `${leftW}px 4px 1fr` }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "left-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ActivePanel, {}),
        userMode === "beginner" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wizard-nav-panel", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
            className: "btn",
            disabled: activePanel === "audio",
            onClick: () => {
              const prevMap = {
                media: "audio",
                lyrics: "media",
                spectrum: "lyrics",
                render: "spectrum"
              };
              if (prevMap[activePanel]) setPanel(prevMap[activePanel]);
            },
            children: "← Sebelumnya"
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
            className: "btn primary",
            disabled: activePanel === "render",
            onClick: () => {
              const nextMap = {
                audio: "media",
                media: "lyrics",
                lyrics: "spectrum",
                spectrum: "render"
              };
              if (nextMap[activePanel]) setPanel(nextMap[activePanel]);
            },
            children: "Selanjutnya →"
          })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          onMouseDown: onResizeMouseDown,
          style: {
            cursor: "col-resize",
            background: "var(--border)",
            transition: "background 0.15s",
            zIndex: 10
          },
          onMouseEnter: (e) => e.currentTarget.style.background = "var(--accent)",
          onMouseLeave: (e) => e.currentTarget.style.background = "var(--border)",
          title: "Drag to resize panel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "center-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewPanel, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "footer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "dot",
          style: { background: ffmpeg?.found ? "var(--good)" : "var(--bad)" },
          title: ffmpeg?.found ? "FFmpeg siap" : "FFmpeg tidak ditemukan"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "MASJAVAS Studio" }),

    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toasts, {}),
    showWizard
  ] });
}
const FILE_TO_FAMILY = {
  "Inter-Regular.ttf": "Inter",
  "Roboto-Regular.ttf": "Roboto",
  "Roboto-Bold.ttf": "Roboto",
  "Lato-Regular.ttf": "Lato",
  "Lato-Bold.ttf": "Lato",
  "NotoSans-Regular.ttf": "Noto Sans",
  "Unbounded-Regular.ttf": "Unbounded",
  "Poppins-Regular.ttf": "Poppins",
  "Poppins-Bold.ttf": "Poppins",
  "Montserrat.ttf": "Montserrat",
  "Raleway-Regular.ttf": "Raleway",
  "Exo2-Regular.ttf": "Exo 2",
  "Oswald.ttf": "Oswald",
  "BebasNeue-Regular.ttf": "Bebas Neue",
  "Anton-Regular.ttf": "Anton",
  "Teko-Regular.ttf": "Teko",
  "Chakra-Regular.ttf": "Chakra Petch",
  "Orbitron-Regular.ttf": "Orbitron",
  "Righteous-Regular.ttf": "Righteous",
  "Cinzel-Regular.ttf": "Cinzel",
  "PlayfairDisplay-Regular.ttf": "Playfair Display",
  "Pacifico-Regular.ttf": "Pacifico",
  "Caveat-Regular.ttf": "Caveat",
  "Sacramento-Regular.ttf": "Sacramento",
  "SpecialElite-Regular.ttf": "Special Elite",
  // Imported display / script pack — family = real internal name (matches FONT_OPTIONS).
  "Beyonest.otf": "Beyonest",
  "ExcessV.otf": "Excess V",
  "ExcessVStraight.otf": "Excess V Straight",
  "GentleHearts.ttf": "Gentle Hearts",
  "Glendora.otf": "Glendora",
  "GokartBubble.otf": "Gokart Bubble",
  "Handflair.ttf": "Handflair",
  "Lumiare.otf": "Lumiare",
  "MagicYellow.otf": "Magic Yellow",
  "ModernRomance.otf": "Modern Romance",
  "Neogen.ttf": "Neogen",
  "PeachClubScript.ttf": "Peach Club Script",
  "RestfulSilent.ttf": "Restful Silent",
  "SuperPandora.ttf": "Super Pandora",
  "TwilightLuminance.ttf": "Twilight Luminance Free",
  "Weghorst.otf": "Weghorst"
};
const FILE_TO_WEIGHT = {
  "Roboto-Bold.ttf": "700",
  "Lato-Bold.ttf": "700",
  "Poppins-Bold.ttf": "700"
};
let loaded = false;
async function loadBundledFonts() {
  if (loaded) return;
  loaded = true;
  try {
    const files = await window.masjavas.fontsList();
    const faces = [];
    for (const { name, path } of files) {
      const family = FILE_TO_FAMILY[name];
      if (!family) continue;
      const weight = FILE_TO_WEIGHT[name] ?? "400";
      faces.push(
        (async () => {
          try {
            const dataUrl = await window.masjavas.fileToDataUrl(path, "font/ttf");
            const face = new FontFace(family, `url(${dataUrl})`, { weight });
            await face.load();
            document.fonts.add(face);
          } catch {
          }
        })()
      );
    }
    await Promise.allSettled(faces);
  } catch {
  }
}
loadBundledFonts();
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React$2.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
