module.exports = function (math) {
  var util = require('../../util/index'),

    array = require('../../../lib/util/array'),
          
    BigNumber = math.type.BigNumber,
    Complex = require('../../type/Complex'),
    Matrix = require('../../type/Matrix'),
    collection = require('../../type/collection'),

    isNumber = util.number.isNumber,
    isBoolean = util['boolean'].isBoolean,
    isComplex = Complex.isComplex,
    isCollection = collection.isCollection;

  /**
   * Calculate the norm of a number, vector or matrix.
   *
   *     norm(x)
   *     norm(x, p)
   *
   * p is optional. If not provided, defaults to 2 (The Frobenius norm or 'fro')).
   *
   * @param  {Number | BigNumber | Complex | Boolean | Array | Matrix} x
   * @param  {Number | Infinity | -Infinity, 'inf', '-inf', 'fro'} [p]
   * @return {Number} the p-norm
   */
  math.norm = function norm(x, p) {
    if (arguments.length < 1 || arguments.length > 2) {
      throw new math.error.ArgumentsError('abs', arguments.length, 1, 2);
    }

    if (isNumber(x)) {
      // norm(x) = abs(x)
      return Math.abs(x);
    }

    if (isComplex(x)) {
      // ignore p, complex numbers 
      return Math.sqrt(x.re * x.re + x.im * x.im);
    }

    if (x instanceof BigNumber) {
      // norm(x) = abs(x)
      return x.abs();
    }

    if (isBoolean(x)) {
      // norm(x) = abs(x)
      return Math.abs(x);
    }
    
    if (isArray(x)) {
      // size
      var sizeX = array.size(x);
      // p
      p = p || 2;
      // check it is a Vector
      if (sizeX.length == 1) {
        // check p
        if (p === Number.POSITIVE_INFINITY || p === 'inf') {
          // norm(x, Infinity) = max(abs(x))
          var n;
          math.forEach(x, function (value) {
            var v = math.abs(value);
            if (!n || math.larger(v, n))
              n = v;
          });
          return n;
        }
        if (p === Number.NEGATIVE_INFINITY || p === '-inf') {
          // norm(x, -Infinity) = min(abs(x))
          var n;
          math.forEach(x, function (value) {
            var v = math.abs(value);
            if (!n || math.smaller(v, n))
              n = v;
          });
          return n;
        }
        if (p === 'fro')
            return norm(x);
        if (isNumber(p) && !isNaN(p)) {
          // check p != 0
          if (!math.equal(p, 0)) {
            // norm(x, p) = sum(abs(xi) ^ p) ^ 1/p
            var n = 0;
            math.forEach(x, function (value) {
              n = math.add(math.pow(math.abs(value), p), n);
            });
            return math.pow(n, 1 / p);
          }
          return Number.POSITIVE_INFINITY;
        }
        // invalid parameter value
        throw new Error('Unsupported parameter value');
      }
      else if (sizeX.length == 2) {
        // check p
        if (p == 1) {
          // norm(x) = the largest column sum
          var c = [];
          // loop rows
          for (var i = 0; i < x.length; i++) {
            var r = x[i];
            // loop columns
            for (var j = 0; j < r.length; j++) {
              c[j] = math.add(c[j] || 0, math.abs(r[j]));
            }
          }
          return math.max(c);
        }
        if (p == Number.POSITIVE_INFINITY || p === 'inf') {
          // norm(x) = the largest row sum
          var n = 0;
          // loop rows
          for (var i = 0; i < x.length; i++) {            
            var rs = 0;
            var r = x[i];
            // loop columns
            for (var j = 0; j < r.length; j++) {
              rs = math.add(rs, math.abs(r[j]));
            }
            if (math.larger(rs, n))
              n = rs;
          }
          return n;
        }
        if (p === 'fro') {
          // norm(x) = sqrt(sum(diag(x'x)))
          var d = math.diag(math.multiply(math.transpose(x), x));
          var s = 0;
          math.forEach(d, function (value) {
            s = math.add(value, s);
          });
          return math.sqrt(s);
        }
        if (p == 2) {
          // not implemented
          throw new Error('Unsupported parameter value, missing implementation of matrix singular value decomposition');
        }
        // invalid parameter value
        throw new Error('Unsupported parameter value');
      }
    }

    if (x instanceof Matrix) {
      return norm(x.valueOf(), p);
    }

    throw new math.error.UnsupportedTypeError('norm', x);
  };
};
