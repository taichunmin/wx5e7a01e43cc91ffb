getApp();

var t = require("AdditiveSolution.js"), e = (require("DataConversion.js"), require("SecretKey.js"));

module.exports = {
    encryption: function(r) {
        for (var n = new Uint8Array(r.match(/[\da-f]{2}/gi).map(function(t) {
            return parseInt(t, 16);
        })), i = new Uint8Array(e.communication_key.match(/[\da-f]{2}/gi).map(function(t) {
            return parseInt(t, 16);
        })), a = t.FuruiTalkEncDec(i, n, n.length), o = (r = "", 0); o < a.length; o++) a[o].toString(16).toUpperCase().length <= 1 ? r += "0" + a[o].toString(16).toUpperCase() : r += a[o].toString(16).toUpperCase();
        return r;
    },
    decrypt: function(r) {
        for (var n = new Uint8Array(e.communication_key.match(/[\da-f]{2}/gi).map(function(t) {
            return parseInt(t, 16);
        })), i = t.FuruiTalkEncDec(n, r, r.length), a = (r = "", 0); a < i.length; a++) i[a].toString(16).toUpperCase().length <= 1 ? r += "0" + i[a].toString(16).toUpperCase() : r += i[a].toString(16).toUpperCase();
        return r;
    }
};