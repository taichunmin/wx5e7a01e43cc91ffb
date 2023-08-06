getApp();

var t = require("../../../../utils/Tools/AmiiboCRequest.js"), e = require("../../../../utils/BlueTools/AdditiveSolution.js"), i = require("../../../../utils/BlueTools/DataConversion.js"), n = require("../../../../utils/BlueTools/SecretKey.js"), o = require("../../../../utils/BlueTools/FunMethod.js"), a = require("../../../../utils/BlueTools/bletools.js"), r = require("../../../../utils/BlueTools/constants.js"), s = (require("../../../../utils/BlueTools/AdditiveSolution.js").CRC16, 
""), c = 0, u = 0;

function h(t) {
    wx.showModal({
        title: r.ALARM_TITLE,
        content: t,
        showCancel: !1,
        success: function(t) {
            t.confirm && wx.navigateBack({
                delta: 1
            });
        }
    });
}

function l(t) {
    for (var e = new Date(), i = e.getTime() + t; ;) if ((e = new Date()).getTime() > i) return;
}

function d(t, e) {
    for (var i = "", n = new Array(), o = 0; o < e - t.length; o++) i += "0";
    t = i + t;
    for (o = 0; o < t.length; o += 2) n.push(t.substring(o, o + 2));
    n.reverse();
    var a = "";
    for (o = 0; o < n.length; o++) a += n[o];
    return a;
}

Page({
    data: {
        bleItem: [],
        connected: !1,
        chs: [],
        modalName: null,
        initBlue: !1,
        initFlag: !1,
        restartsearch: !1,
        blueaerrinfo: {
            show: "none",
            text: ""
        }
    },
    onLoad: function(e) {
        var i = this;
        t.getcoment("/Amiibo/get?id=" + e.id, function(t) {
            200 == t.code && i.setData({
                ArrayList: t.data,
                options: e
            });
        });
    },
    ShowTip: function(t, e) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "progressline", n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1500;
        if (1 == e ? this.setData({
            errorData: {
                show: "show",
                text: t,
                pic: "Suc.png",
                disp: i
            }
        }) : 2 == e ? this.setData({
            errorData: {
                show: "show",
                text: t,
                pic: "Failpic.png",
                disp: i
            }
        }) : 3 == e && this.setData({
            errorData: {
                show: "show",
                text: t,
                pic: "Loading.gif",
                disp: i
            }
        }), 0 != n) var o = this, a = setTimeout(function() {
            o.CloseTip(), clearTimeout(a);
        }, n);
    },
    CloseTip: function() {
        var t = this.data.errorData;
        this.setData({
            errorData: {
                show: "",
                text: "",
                pic: t.pic,
                disp: "progressline"
            },
            tipspeed: 0
        });
    },
    resetKey: function() {
        if (a.connected()) return wx.redirectTo({
            url: "/pages/Amiibo/home_indext/home_indext?index=EQ"
        }), void this.ShowTip("蓝牙未连接", 2);
        this.ShowTip("写入中,请稍后", 3), a.initThis(this), this.WriteToEQ(n.read_ntag_inst), 
        s = "2A";
    },
    WriteToEQ: function(t) {
        var e = o.encryption(this.ObtainCRC(t), n.communication_key), i = Math.ceil(e.length / 40);
        if (i > 1) {
            for (var r = new Array(), s = 0, c = 40, u = 0; u < i; u++) {
                t = e.substring(s, s + c);
                r.push(t), s += c, e.length - s < c && (c = e.length - s);
            }
            for (u = 0; u < r.length; u++) console.log(o.encryption(r[u], n.communication_key)), 
            a.write(r[u]), l(15);
        } else a.write(e);
    },
    startScanBle: function() {
        var t = this;
        wx.getStorage({
            key: "bluedeviceID",
            success: function(e) {
                a.connected() && (a.initThis(t), a.Inited() && a.initblue(), a.connectBle(e.data));
            },
            fail: function(e) {
                t.setData({
                    modalName: "RadioModal"
                }), a.initThis(t), a.Inited() && a.initblue();
                var i = [];
                a.startScanBle({
                    success: function(e) {
                        (i = t.data.bleItem).push(e), t.setData({
                            bleItem: i
                        });
                    }
                });
            }
        });
    },
    writeListener: function(t, e) {
        console.log(t ? "发送数据成功" : e);
    },
    notifyListener: function(e) {
        wx.hideLoading({
            success: function(t) {}
        });
        var i = o.decrypt(e, n.communication_key), a = this;
        if ("2A" == s) {
            if (0 == i.charAt(5)) return void this.ShowTip("请放入卡片", 2);
            if (1 == i.charAt(5)) {
                if (0 != i.charAt(22) || 0 != i.charAt(24) || 0 != i.charAt(26)) return void this.ShowTip("该卡不为空", 2);
                t.getcoment("/Amiibo/amiibobin?id=" + this.data.options.id + "&uid=" + i.slice(6, 20), function(t) {
                    if (200 == t.code) {
                        var e = d((t.data.data1.length / 2 + 7).toString(16), 4) + "2C0101" + t.data.data1;
                        a.WriteToEQ(e), s = "2C";
                    } else a.ShowTip("访问错误，请联系客服！", 2);
                });
            } else this.ShowTip("失败,请重试!", 2);
        } else "2C" == s && (1 == i.charAt(5) ? this.ShowTip("写入完成！", 1) : this.ShowTip("写入失败！", 2));
    },
    bleStateListener: function(t) {
        switch (t) {
          case r.STATE_DISCONNECTED:
            this.ShowTip("蓝牙关闭", 2);
            break;

          case r.STATE_CLOSE_BLE:
            h(r.NOT_BLE);
            break;

          case r.STATE_NOTBLE_WCHAT_VERSION:
            h(r.NOT_PERMISSION2);
            break;

          case r.STATE_NOTBLE_SYSTEM_VERSION:
            h(r.NOT_PERMISSION1);
            break;

          case r.STATE_INIT_SUCCESS:
        }
    },
    hideModal: function(t) {
        this.setData({
            modalName: null
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    ObtainCRC: function(t) {
        var n = e.CRC16(0, i.sys16TOArrayBuffer(t)).toString(16).toUpperCase();
        return function(t) {
            var e = t.length % 40;
            if (0 != e) {
                for (var i = "", n = 0; n < 40 - e; n++) i += "0";
                t += i;
            }
            return t;
        }(t = t + n.charAt(2) + n.charAt(3) + n.charAt(0) + n.charAt(1));
    },
    SunCRC: function(t, e, i) {},
    updatea1: function() {
        var t, o, a = (n.Update_Data.length / 2).toString(16), r = Math.ceil(n.Update_Data.length / 10226).toString(16), s = (t = n.Update_Data, 
        o = e.CRC16(0, i.sys16TOArrayBuffer(t)).toString(16).toUpperCase(), t = o.charAt(2) + o.charAt(3) + o.charAt(0) + o.charAt(1));
        return "130005120401020304" + d(a, 8) + s + d(r, 4);
    },
    updatea2: function() {
        var t = n.Update_Data.length - (c + 10226);
        t >= 10226 && (t = 10226);
        var e = n.Update_Data.substring(c, c + t), i = d((e.length / 2 + 7).toString(16), 4) + "05" + d(u.toString(16), 4) + e;
        return c += t, u++, i;
    }
});