var e = require("../../../@babel/runtime/helpers/defineProperty"), t = new (require("../../../utils/Tools/http.js").HTTP)(), o = getApp(), i = require("../../../utils/Tools/AmiiboCRequest.js");

Page({
    data: {
        imgList: [],
        token: wx.getStorageSync("token")
    },
    ModifyUserInformation: function(t) {
        var o;
        wx.showLoading({
            title: "修改中…"
        });
        var n = this;
        n.setData((e(o = {}, "options.cnTittle", t.detail.value.cnTittle), e(o, "options.description", t.detail.value.description), 
        e(o, "options.presentedBy", t.detail.value.presentedBy), e(o, "options.relesaseTime", t.detail.value.relesaseTime), 
        e(o, "options.seriesName", t.detail.value.seriesName), e(o, "options.tittle", t.detail.value.tittle), 
        o)), setTimeout(function() {
            var e = n.data.token;
            i.requestA({
                url: "/Amiibo/updateprivate",
                Authorization: e.token
            }, n.data.options, function(e) {
                if (console.log(e), 200 == e.code) return wx.navigateBack({
                    delta: 1
                }), void n.tisp("修改成功");
                n.tisp("修改失败");
            });
        }, 2e3);
    },
    tisp: function(e) {
        wx.showToast({
            title: e,
            icon: "none",
            duration: 2e3
        });
    },
    DateChange: function(t) {
        this.setData(e({}, "options.relesaseTime", t.detail.value));
    },
    uploadImage: function() {
        var o = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album" ],
            success: function(i) {
                t.C3cupload_file("/FileUpload/upload", i.tempFilePaths[0], {
                    type: 1,
                    userID: 16
                }, function(t) {
                    o.setData(e({}, "options.logoPath", t.data));
                });
            }
        });
    },
    onLoad: function(e) {
        this.setData({
            options: o.globalData.priMap,
            token: wx.getStorageSync("token")
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});