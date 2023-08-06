var t = require("../../../../@babel/runtime/helpers/defineProperty"), e = getApp(), i = require("../../../../utils/Tools/AmiiboCRequest.js");

Page({
    data: {
        CustomBar: 500,
        strip: 10,
        open: !0,
        list: [ {
            id: "content",
            name: "基础内容",
            open: !0,
            pages: [ "text", "icon", "progress", "rich-text" ]
        } ],
        blueaerrinfo: {
            show: "none",
            text: ""
        }
    },
    onLoad: function(t) {
        var a = this;
        a.setData({
            options: t,
            MapList: e.globalData.MapList
        }), wx.createSelectorQuery().select("#home-init").boundingClientRect().exec(function(t) {
            a.setData({
                init: t[0].height
            });
        }), i.getcoment("/Amiibo/seriallist1?PageIndex=1&SerialID=" + t.serverid, function(t) {
            200 == t.code && a.setData({
                ArrayList: t.data
            });
        });
    },
    kindToggle: function(t) {
        for (var e = t.currentTarget.id, i = this.data.list, a = this.data.open, o = 0, s = i.length; o < s; ++o) i[o].id === e ? (i[o].open = !i[o].open, 
        this.setData({
            open: !a
        })) : (i[o].open = !1, this.setData({
            open: !1
        }));
        this.setData({
            list: i
        });
    },
    watchPassWord: function(t) {
        var e = this;
        this.ShowTip("加载中", 3), "" != t.detail.value ? i.getcoment("/Amiibo/seriallist1?SearchName=" + t.detail.value + "&SerialID=" + this.options.serverid, function(t) {
            e.CloseTip(), 200 == t.code && e.setData({
                ArrayList: t.data
            });
        }) : i.getcoment("/Amiibo/seriallist1?PageIndex=1&SerialID=" + e.options.serverid, function(t) {
            e.CloseTip(), 200 == t.code && e.setData({
                ArrayList: t.data
            });
        });
    },
    sunmmmm: function() {},
    ShowTip: function(t, e) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "progressline", a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1500;
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
        }), 0 != a) var o = this, s = setTimeout(function() {
            o.CloseTip(), clearTimeout(s);
        }, a);
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
    bindrefre: function() {
        var t = this, e = this.data.strip;
        if (this.ShowTip("加载中", 3), t.data.strip > t.data.ArrayList.total) t.CloseTip(); else {
            e = t.data.strip + 10;
            var a = this.options.serverid;
            i.getcoment("/Amiibo/seriallist1?PageIndex=1&PageSize=" + e + "&SerialID=" + a, function(i) {
                t.CloseTip(), 200 == i.code && t.setData({
                    ArrayList: i.data,
                    strip: e
                });
            });
        }
    },
    layoutScroll: function() {
        this.setData(t({
            open: !1
        }, "list[0].open", !1));
    },
    onReady: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    swiperHeight: e.windowHeight - 90
                });
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});