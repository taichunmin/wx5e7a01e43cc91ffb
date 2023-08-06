var e = require("/errorInfo.js"), t = require("/constants.js"), n = null, i = null, r = null, c = null, o = !1, s = "", u = "", a = t.SERUUID, l = t.WRITEUUID, f = t.NOTIFYUUID;

function S() {
    wx.openBluetoothAdapter({
        success: function(e) {
            r = "start", wx.onBluetoothAdapterStateChange(function(e) {
                e.discovering ? i.bleStateListener(t.STATE_SCANNING) : i.bleStateListener(t.STATE_SCANNED);
            }), i.bleStateListener(t.STATE_INIT_SUCCESS);
        },
        fail: function(e) {
            10001 == e.errCode && i.bleStateListener(t.STATE_CLOSE_BLE);
        }
    });
}

function T(e, t) {
    for (var n = 0; n < e.length; n++) if (e[n].toUpperCase() === t.toUpperCase()) return !0;
    return !1;
}

function E(e, n) {
    wx.getBLEDeviceCharacteristics({
        deviceId: e,
        serviceId: n,
        success: function(n) {
            for (var r = n.characteristics, c = 0; c < r.length; c++) {
                var o = r[c].uuid;
                T(t.NOTIFYUUID.split(","), o) && (f = o), T(t.WRITEUUID.split(","), o) && (l = o);
            }
            !function(e) {
                wx.notifyBLECharacteristicValueChange({
                    deviceId: e,
                    serviceId: a,
                    characteristicId: f,
                    state: !0,
                    success: function(e) {
                        wx.onBLECharacteristicValueChange(function(e) {
                            var t = e.value, n = new Uint8Array(t);
                            i.notifyListener(n);
                        }), i.bleStateListener(t.STATE_NOTIFY_SUCCESS);
                    },
                    fail: function(e) {
                        i.bleStateListener(t.STATE_NOTIFY_FAIL);
                    }
                });
            }(e);
        }
    });
}

function I() {
    wx.closeBluetoothAdapter({
        success: function(e) {
            r = null, n = null;
        }
    });
}

function v(e, t) {
    e = e.split("."), t = t.split(".");
    for (var n = Math.max(e.length, t.length); e.length < n; ) e.push("0");
    for (;t.length < n; ) t.push("0");
    for (var i = 0; i < n; i++) {
        var r = parseInt(e[i]), c = parseInt(t[i]);
        if (r > c) return !0;
        if (r < c) return !1;
    }
    return !1;
}

function C() {
    null != n && I();
}

module.exports = {
    write: function(t) {
        var r = new Uint8Array(t.match(/[\da-f]{2}/gi).map(function(e) {
            return parseInt(e, 16);
        }));
        wx.writeBLECharacteristicValue({
            deviceId: n,
            serviceId: a,
            characteristicId: l,
            value: r.buffer,
            fail: function(t) {
                i.writeListener(!1, e.getErrorInfo(t.errCode));
            }
        });
    },
    startScanBle: function(e) {
        null == n && (C(), wx.onBluetoothDeviceFound(function(n) {
            var i = n.devices[0], r = i.name;
            console.log(r), (r.toUpperCase().startsWith(t.CONDITION1) || r.toUpperCase().startsWith(t.CONDITION2)) && e.success(i);
        }), wx.startBluetoothDevicesDiscovery({}), null != c && clearTimeout(c), c = setTimeout(function() {
            wx.stopBluetoothDevicesDiscovery({}), c = null;
        }, t.SCANTIME));
    },
    clear: I,
    stopBluetoothDevicesDiscovery: function() {
        wx.stopBluetoothDevicesDiscovery({});
    },
    connectBle: function(e) {
        null == n && (C(), wx.stopBluetoothDevicesDiscovery({}), n = e, i.bleStateListener(t.STATE_CONNECTING), 
        wx.createBLEConnection({
            deviceId: e,
            timeout: t.CONNECTTIME,
            fail: function(e) {
                i.bleStateListener(t.STATE_CONNECTING_ERROR), n = null;
            }
        }), wx.onBLEConnectionStateChange(function(r) {
            r.connected ? (i.bleStateListener(t.STATE_CONNECTED), function(e) {
                wx.getBLEDeviceServices({
                    deviceId: e,
                    success: function(n) {
                        for (var i = n.services, r = 0; r < i.length; r++) {
                            var c = i[r].uuid;
                            if (T(t.SERUUID.split(","), c)) {
                                a = c, E(e, c);
                                break;
                            }
                        }
                    },
                    fail: function(e) {}
                });
            }(e)) : (i.bleStateListener(t.STATE_DISCONNECTED), n = null);
        }));
    },
    CheckEvroment: function(e) {
        i = e;
        try {
            var n = wx.getSystemInfoSync();
            !function(e, n, r) {
                if ("android" === e) {
                    v(r.substring(8, r.length), "4.3.0") ? v(n, "6.5.7") ? S() : i.bleStateListener(t.STATE_NOTBLE_WCHAT_VERSION) : i.bleStateListener(t.STATE_NOTBLE_SYSTEM_VERSION);
                } else "ios" === e && (v(n, "6.5.6") ? S() : i.bleStateListener(t.STATE_NOTBLE_WCHAT_VERSION));
            }(n.platform, n.version, n.system);
        } catch (e) {}
    },
    disconnect: C,
    initThis: function(e) {
        i = e;
    },
    initblue: S,
    Inited: function() {
        return null == r;
    },
    connected: function() {
        return null == n;
    },
    SetSuc: function(e) {
        o = e;
    },
    GetSuc: function() {
        return o;
    },
    setBlueName: function(e, t) {
        s = e, u = t;
    },
    getBlueName: function() {
        return s;
    },
    getBlueUID: function() {
        return u;
    }
};