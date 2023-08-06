var e = getApp();

require("../../utils/Tools/IcopyCRequest.js");

Page({
    data: {
        canIUse: wx.canIUse("button.open-type.getUserInfo")
    },
    onLoad: function() {},
    bindGetUserInfo: function(n) {
        if (n.detail.userInfo) {
            e.globalData.userInfo = n.detail.userInfo;
            this.insertUserInfo(n);
        } else wx.showModal({
            title: "警告",
            content: "您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!",
            showCancel: !1,
            confirmText: "返回授权",
            success: function(e) {
                e.confirm && console.log("用户点击了“返回授权”");
            }
        });
    },
    insertUserInfo: function(e) {
        wx.getStorageSync("fropenid");
        var n = {
            nickname: e.detail.userInfo.nickName,
            avatarUrl: e.detail.userInfo.avatarUrl
        };
        wx.setStorageSync("WxUserInfobyfr", n), wx.redirectTo({
            url: "../../pages/Amiibo/home_indext/home_indext"
        });
    }
});