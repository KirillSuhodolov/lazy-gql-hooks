"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildUseQuery = exports.buildUseMutation = exports.buildUseLazyQuery = void 0;

var _ramdaAdjunct = require("ramda-adjunct");

var _ramda = require("ramda");

var _array = require("./array");

var _templateObject, _templateObject2;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultOptions = {
  useSkeleton: true
};

var prepareSkeleton = function prepareSkeleton(_ref) {
  var loading = _ref.loading,
      called = _ref.called,
      useSkeleton = _ref.useSkeleton,
      skeleton = _ref.skeleton,
      data = _ref.data;

  if (loading || !called) {
    if ((0, _ramda.equals)(useSkeleton, 'empty')) {
      return (0, _ramda.keys)(skeleton).reduce(function (acc, key) {
        return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, [{}]));
      }, {});
    } else if (useSkeleton) {
      return skeleton;
    } else {
      return data;
    }
  } else {
    return data;
  }
};

var deepValues = function deepValues(args) {
  if ((0, _ramda.is)(Array, args)) {
    if (args.some((0, _ramda.is)(Object))) {
      return args.map(deepValues);
    } else {
      return args;
    }
  } else if ((0, _ramda.is)(Object, args)) {
    if ((0, _ramda.values)(args).some((0, _ramda.is)(Object))) {
      return (0, _ramda.values)(args).map(deepValues);
    } else {
      return (0, _ramda.values)(args);
    }
  } else {
    return args;
  }
};

var buildUseMutation = function buildUseMutation(_ref2) {
  var gql = _ref2.gql,
      hook = _ref2.hook,
      useState = _ref2.useState;
  return function (q) {
    var _options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var options = _objectSpread(_objectSpread({}, defaultOptions), _options);

    var _useState = useState({}),
        _useState2 = _slicedToArray(_useState, 2),
        executedVars = _useState2[0],
        setExecutedVars = _useState2[1];

    var mutation = q.mutation,
        variables = q.variables,
        skeleton = q.skeleton,
        extendVariablesKeys = q.extendVariablesKeys;
    var gqlMutation = gql(_templateObject || (_templateObject = _taggedTemplateLiteral(["", ""])), mutation);

    var _hook = hook(gqlMutation, options),
        _hook2 = _slicedToArray(_hook, 2),
        run = _hook2[0],
        _hook2$ = _hook2[1],
        data = _hook2$.data,
        loading = _hook2$.loading,
        error = _hook2$.error,
        called = _hook2$.called;

    var useSkeleton = options.useSkeleton;
    return [function () {
      var _vars = extendVariablesKeys(variables.apply(void 0, arguments));

      setExecutedVars(_vars);
      return run({
        variables: _vars
      });
    }, {
      data: prepareSkeleton({
        loading: loading,
        called: called,
        useSkeleton: useSkeleton,
        skeleton: skeleton,
        data: data
      }),
      loading: loading,
      error: error,
      called: called,
      variables: executedVars,
      mutation: gqlMutation
    }];
  };
};

exports.buildUseMutation = buildUseMutation;

var buildUseLazyQuery = function buildUseLazyQuery(_ref3) {
  var gql = _ref3.gql,
      hook = _ref3.hook,
      useState = _ref3.useState;
  return function (q) {
    var _options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var options = _objectSpread(_objectSpread({}, defaultOptions), _options);

    var _useState3 = useState({}),
        _useState4 = _slicedToArray(_useState3, 2),
        executedVars = _useState4[0],
        setExecutedVars = _useState4[1];

    var query = q.query,
        variables = q.variables,
        skeleton = q.skeleton,
        mandatoryVariables = q.mandatoryVariables,
        extendVariablesKeys = q.extendVariablesKeys;
    var gqlQuery = gql(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["", ""])), query);

    var _hook3 = hook(gqlQuery, options),
        _hook4 = _slicedToArray(_hook3, 2),
        run = _hook4[0],
        _hook4$ = _hook4[1],
        data = _hook4$.data,
        previousData = _hook4$.previousData,
        loading = _hook4$.loading,
        error = _hook4$.error,
        called = _hook4$.called,
        refetch = _hook4$.refetch,
        usedVars = _hook4$.variables;

    var useSkeleton = options.useSkeleton;
    return [function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if ((0, _ramda.gte)((0, _ramdaAdjunct.compact)(args).length, mandatoryVariables || variables.length)) {
        var _vars = extendVariablesKeys(variables.apply(void 0, args));

        setExecutedVars(_vars);
        return run({
          variables: _vars
        });
      }
    }, {
      data: prepareSkeleton({
        loading: loading,
        called: called,
        useSkeleton: useSkeleton,
        skeleton: skeleton,
        data: data
      }),
      loading: loading,
      error: error,
      called: called,
      refetch: refetch,
      variables: executedVars,
      query: gqlQuery
    }];
  };
};

exports.buildUseLazyQuery = buildUseLazyQuery;

var buildUseQuery = function buildUseQuery(_ref4) {
  var gql = _ref4.gql,
      hook = _ref4.hook,
      useState = _ref4.useState,
      useEffect = _ref4.useEffect;
  return function (q) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var _buildUseLazyQuery = buildUseLazyQuery({
      gql: gql,
      hook: hook,
      useState: useState
    })(q, options),
        _buildUseLazyQuery2 = _slicedToArray(_buildUseLazyQuery, 2),
        run = _buildUseLazyQuery2[0],
        data = _buildUseLazyQuery2[1];

    useEffect(function () {
      !options.skip && run.apply(void 0, _toConsumableArray((0, _array.wrapToArray)(args)));
    }, [].concat(_toConsumableArray((0, _ramda.compose)(_ramda.flatten, _array.wrapToArray, deepValues)(args)), [options.skip]));
    return data;
  };
};

exports.buildUseQuery = buildUseQuery;