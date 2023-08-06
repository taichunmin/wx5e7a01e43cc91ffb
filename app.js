require("utils/LoginType.js");

App({
    onLaunch: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                t.globalData.StatusBar = a.statusBarHeight;
                var o = wx.getMenuButtonBoundingClientRect();
                o ? (t.globalData.Custom = o, t.globalData.CustomBar = o.bottom + o.top - a.statusBarHeight) : t.globalData.CustomBar = a.statusBarHeight + 50;
            }
        });
        var a = wx.getStorageSync("logs") || [];
        a.unshift(Date.now()), wx.setStorageSync("logs", a);
    },
    globalData: {
        iconList: null,
        shophome: null,
        openhome: !1,
        username: null,
        colour: "blue",
        openID: null
    }
});