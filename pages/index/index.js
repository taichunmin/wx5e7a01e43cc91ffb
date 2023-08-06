var e = require("../../@babel/runtime/helpers/defineProperty"), t = require("../../utils/Tools/IcopyCRequest.js"), a = getApp();

Page(e({
    data: {
        openhome: null,
        swiperList: null,
        colour: a.globalData.colour,
        opentype: "switchTab",
        PageCur: "component",
        itme: [],
        showtip: "",
        elements: [ {
            name: "Icopy/index/index",
            picurl: "/images/Logo/btn1.jpg"
        }, {
            name: "Amiibo/home_indext/home_indext",
            picurl: "/images/Logo/btn2.jpg"
        } ]
    },
    hidetip: function() {
        this.setData({
            showtip: ""
        });
    },
    onReady: function() {
        this.setData({
            loadModal: !0,
            showtip: "show"
        }), this.setData({
            swiperList: [ {
                wheeloneimage: "/images/toplogo.jpg",
                wheeloneuse: 1,
                name: "Icopy/index/index"
            }, {
                wheeloneimage: "/images/Amiibo.jpg",
                wheeloneuse: 1,
                name: "Amiibo/home_indext/home_indext"
            } ]
        }), this.setData({
            index: "openhomet",
            loadModal: !1
        });
    },
    tip: function() {
        return this.TipsEncapsulation("努力开发中，敬请期待吧！");
    },
    Jump: function(e) {
        wx.navigateTo({
            url: e.currentTarget.id
        });
    },
    swipclick: function(e) {
        console.log(e);
    },
    parkingrecord: function(e) {
        this.setData({
            modalName: "ChooseModal"
        });
    },
    hideModal: function(e) {
        this.setData({
            modalName: null
        });
    },
    ChooseCheckbox: function(e) {
        for (var a = this.data.itme, o = this.data.checkbox, n = e.currentTarget.dataset.value, s = 0, i = o.length; s < i; ++s) if (o[s].atiid == n) {
            0 == o[s].checked && a.push(o[s]), o[s].checked = !o[s].checked;
            break;
        }
        if (this.setData({
            checkbox: o,
            coum: a
        }), this.data.coum.length >= 2) {
            this.setData({
                modalName: null,
                useruser: wx.getStorageSync("useruser")
            });
            var u = this.data.coum[0].atiid + "," + this.data.coum[1].atiid;
            t.request("/personalCenter/modifyUser", {
                openid: this.data.useruser.useropenId,
                username: u
            }, function(e) {
                wx.setStorageSync("useruser", e);
            });
        }
    },
    openof: function(e) {
        var t = e.currentTarget.dataset.cur;
        null == wx.getStorageSync("useruser").useropenId ? this.setData({
            username: "识别不了用户,请重新授权",
            modalName: "bottomModal"
        }) : "component" != t && "plugin" != t || (this.setData({
            PageCur: t
        }), "component" == t ? this.setData({
            index: "openhomet"
        }) : "plugin" == t && this.setData({
            index: "null"
        })), this.setData({
            mask: !1
        });
    },
    cancel: function() {
        this.setData({
            modalName: null,
            opentype: "switchTab"
        });
    },
    OpenMatch: function(e) {
        wx.showLoading && wx.showToast({
            icon: "loading",
            title: "加载中",
            mask: !0
        });
    },
    bindGetUserInfo: function(e) {
        if (this.setData({
            loadModal: !0
        }), this.setData({
            modalName: null
        }), e.detail.userInfo) {
            var a = this;
            wx.login({
                success: function(e) {
                    wx.getUserInfo({
                        success: function(e) {
                            wx.login({
                                success: function(e) {
                                    var o = e.code;
                                    if (!o) return a.TipsEncapsulation("授权失败");
                                    wx.getUserInfo({
                                        success: function(e) {
                                            t.openhome("/toGrant/author", {
                                                encryptedData: e.encryptedData,
                                                iv: e.iv,
                                                code: o
                                            }, function(e) {
                                                return 1 == e.status ? (wx.setStorageSync("useruser", e.useruser), a.setData({
                                                    opentype: "navigate",
                                                    useruser: e.useruser
                                                }), a.TipsEncapsulation("授权成功,快点来使用吧！")) : (a.setData({
                                                    loadModal: !1,
                                                    modalName: "bottomModal",
                                                    username: "授权失败，请重新授权"
                                                }), a.TipsEncapsulation("授权失败"));
                                            });
                                        },
                                        fail: function() {
                                            return a.TipsEncapsulation("授权失败");
                                        }
                                    });
                                },
                                fail: function() {
                                    return a.TipsEncapsulation("授权失败");
                                }
                            });
                        },
                        fail: function() {
                            return a.TipsEncapsulation("授权失败");
                        }
                    });
                },
                fail: function() {
                    callback(!1);
                }
            });
        } else wx.showModal({
            title: "警告",
            content: "您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!",
            showCancel: !1,
            confirmText: "返回授权",
            success: function(e) {}
        });
        this.setData({
            loadModal: !1
        });
    },
    TipsEncapsulation: function(e) {
        this.setData({
            some: e,
            modalName: "Modal"
        });
    }
}, "hideModal", function(e) {
    this.setData({
        modalName: null
    });
}));