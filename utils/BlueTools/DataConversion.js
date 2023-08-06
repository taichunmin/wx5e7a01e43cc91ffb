module.exports = {
    stringToByte: function(r) {
        var t, n, e = new Array();
        t = r.length;
        for (var u = 0; u < t; u++) (n = r.charCodeAt(u)) >= 65536 && n <= 1114111 ? (e.push(n >> 18 & 7 | 240), 
        e.push(n >> 12 & 63 | 128), e.push(n >> 6 & 63 | 128), e.push(63 & n | 128)) : n >= 2048 && n <= 65535 ? (e.push(n >> 12 & 15 | 224), 
        e.push(n >> 6 & 63 | 128), e.push(63 & n | 128)) : n >= 128 && n <= 2047 ? (e.push(n >> 6 & 31 | 192), 
        e.push(63 & n | 128)) : e.push(255 & n);
        return e;
    },
    stringToArrayBuffer: function(r) {
        var t, n, e = new Array();
        t = r.length;
        for (var u = 0; u < t; u++) (n = r.charCodeAt(u)) >= 65536 && n <= 1114111 ? (e.push(n >> 18 & 7 | 240), 
        e.push(n >> 12 & 63 | 128), e.push(n >> 6 & 63 | 128), e.push(63 & n | 128)) : n >= 2048 && n <= 65535 ? (e.push(n >> 12 & 15 | 224), 
        e.push(n >> 6 & 63 | 128), e.push(63 & n | 128)) : n >= 128 && n <= 2047 ? (e.push(n >> 6 & 31 | 192), 
        e.push(63 & n | 128)) : e.push(255 & n);
        var h = new Int8Array(e.length);
        for (var u in e) h[u] = e[u];
        return h.buffer;
    },
    arrayBufferToString: function(r) {
        if ("string" == typeof r) return r;
        for (var t = new DataView(r), n = new Uint8Array(r.byteLength), e = 0; e < n.length; e++) n[e] = t.getUint8(e);
        var u = "", h = r = n;
        for (e = 0; e < h.length; e++) {
            var s = h[e].toString(2), a = s.match(/^1+?(?=0)/);
            if (a && 8 == s.length) {
                for (var o = a[0].length, f = h[e].toString(2).slice(7 - o), i = 1; i < o; i++) f += h[i + e].toString(2).slice(2);
                u += String.fromCharCode(parseInt(f, 2)), e += o - 1;
            } else u += String.fromCharCode(h[e]);
        }
        return u;
    },
    sys16TOArrayBuffer: function(r) {
        return new Uint8Array(r.match(/[\da-f]{2}/gi).map(function(r) {
            return parseInt(r, 16);
        }));
    }
};