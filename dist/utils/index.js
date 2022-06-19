"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Decimal = require('decimal.js');
var fs = require('fs');
const delay = ms => new Promise(res => setTimeout(res, ms));
const factorial = (n) => {
    try {
        var r = new Decimal(1);
        for (var i = 2; i <= n; r = r.times(i++))
            ;
    }
    catch (err) {
        console.log(err.message);
    }
    return r;
};
// Decimal.js to make decimal more precise and show more 
// Madhava Algorithm
// note: slowest, but easier to understand  
const calcPIM = (loop, app) => __awaiter(void 0, void 0, void 0, function* () {
    // limit to 5000 digits only
    if (loop > 5000)
        return;
    yield delay(100);
    Decimal.precision = loop + 2;
    var pi = new Decimal(0);
    var Nk, Dk;
    var iterations = (loop / 0.4) + 2;
    for (var k = 1; k < iterations; k++) {
        // Numerator term, Nk = (-1)^(k+1)
        Nk = Decimal(-1).pow(k + 1);
        // Denominator term, Dk = (2k - 1) * 3^(k-1)
        Dk = Decimal((2 * k) - 1).times(Decimal(3).pow(k - 1));
        // Pi series partial summation.
        pi = pi.plus(Nk.div(Dk));
    }
    // Multiply by 12^0.5.
    pi = pi.times(Decimal(12).sqrt());
    // Set significant digits.
    pi = pi.toSD(loop);
    // console.log(loop, pi);
    /* const file = fs.createWriteStream('pi.txt');
    await file.write(pi.toString()) */
    app.set('PI', pi);
    calcPIM(loop++, app);
});
// Chudnovsky Algorithm
// notes - fastest, 
const calcPIC = (loop, app) => __awaiter(void 0, void 0, void 0, function* () {
    // if (loop > 5000) return
    // await delay(50)
    Decimal.precision = loop + 2;
    var pi = new Decimal(0);
    var C, Mk, Lk, Xk;
    var iterations = (loop / 14) + 1;
    for (var k = 0; k < iterations; k++) {
        // Multinomial term, Mk = (6k)! / (3k)! * (6k)!^3
        Mk = Decimal(factorial(6 * k)).div(Decimal(factorial(3 * k)).times(Decimal(factorial(k)).pow(3)));
        // Linear term, Lk = 545140134k + 13591409
        Lk = Decimal(545140134 * k).plus(13591409);
        // Exponential term, Xk = -262537412640768000^k
        Xk = Decimal(-262537412640768000).pow(k);
        // Pi series partial summation.
        pi = pi.plus(Mk.times(Lk).div(Xk));
    }
    // C = 1 / (426880 * 10005^0.5)
    C = Decimal(1).div(Decimal(426880).times(Decimal(10005).sqrt()));
    // Multiply by constant and take reciprocal.
    pi = Decimal(1).div(C.times(pi));
    // Set significant digits.
    pi = pi.toSD(loop);
    // to show it in action
    // console.log(loop, pi);
    /* const file = fs.createWriteStream('pi.txt');
    await file.write(pi.toString()) */
    app.set('PI', pi);
    calcPIC(loop + 1, app);
});
module.exports = {
    delay,
    calcPIM,
    calcPIC
};
