"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test = require("tape");
function singleTest(description, fn) {
    test(description, function (t) {
        fn(t);
        t.end();
    });
}
exports.singleTest = singleTest;
;
//# sourceMappingURL=test.js.map