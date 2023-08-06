module.exports = {
    FuruiTalkInit: function(r, n) {
        var u = [ 256 ], o = 0, t = 0, a = [ 16 ];
        for (o = 0; o < n; o++) a[o] = r[o];
        a[n] = 64, a[n + 1] = 163, a[n + 2] = 121, a[n + 3] = 132, a[n + 4] = 155, a[n + 5] = 245, 
        a[n + 6] = 109, a[n + 7] = 22;
        var f = n + 8;
        for (o = 0; o < 256; o++) u[o] = o;
        for (o = 0; o < 256; o++) {
            t = (t + u[o] + a[o % f]) % 256;
            var e = u[o];
            u[o] = u[t], u[t] = e;
        }
        return u;
    },
    FuruiTalkEncDec: function(r, n, u) {
        for (var o = 0, t = 0, a = 0, f = 0; f < u; f++) {
            t = (t + r[o = (o + 1) % 256]) % 256;
            var e = r[o];
            r[o] = r[t], r[t] = e, a = (r[o] + r[t]) % 256, n[f] ^= r[a];
        }
        return n;
    },
    CRC16: function(r, n) {
        for (var u = r, o = 0, t = n.length; t-- > 0; ) {
            for (var a = 128; 0 != a; a >>= 1) 0 != (32768 & u) ? (u <<= 1, u ^= 4129) : u <<= 1, 
            0 != (n[o] & a) && (u ^= 4129);
            o += 1;
        }
        return 65535 & u;
    }
};