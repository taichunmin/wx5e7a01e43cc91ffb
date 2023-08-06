var t, e, a = require("../../../@babel/runtime/helpers/defineProperty"), i = getApp(), o = require("../../../utils/Tools/AmiiboCRequest.js"), n = require("../../../utils/BlueTools/bletools.js"), s = require("../../../utils/BlueTools/constants.js"), r = require("../../../utils/BlueTools/SecretKey.js"), l = require("../../../utils/BlueTools/AdditiveSolution.js"), u = require("../../../utils/BlueTools/DataConversion.js"), c = require("../../../utils/BlueTools/FunMethod.js"), d = require("../../../utils/Tools/DESEncrypt.js"), h = "", g = 0, f = 0, p = 0, S = null, w = !0, m = "", v = null, b = "";

function D(t) {
    for (var e = new Date(), a = e.getTime() + t; ;) if ((e = new Date()).getTime() > a) return;
}

function T(t) {
    wx.showModal({
        title: s.ALARM_TITLE,
        content: t,
        showCancel: !1,
        success: function(t) {
            t.confirm;
        }
    });
}

function I(t, e) {
    for (var a = "", i = new Array(), o = 0; o < e - t.length; o++) a += "0";
    t = a + t;
    for (o = 0; o < t.length; o += 2) i.push(t.substring(o, o + 2));
    i.reverse();
    var n = "";
    for (o = 0; o < i.length; o++) n += i[o];
    return n;
}

Page((e = {
    data: (t = {
        strip: 10,
        CustomBar: i.globalData.CustomBar,
        scrollTop: "",
        inite: 0,
        ArrayList2: null,
        token: null,
        percentage: 0,
        bleItem: [],
        viewShowed: "",
        bluetools: null,
        bluetoolName: "",
        bluetoolAtten: null,
        loginName: "",
        userLogo: "/images/tabbar/about.png",
        usernickName: "",
        login: "",
        fruserLogin: "",
        disbtn: "",
        blueaerrinfo: {
            show: "none",
            text: ""
        },
        errorData: {
            show: "",
            text: "",
            pic: "Suc.png",
            disp: "progressline"
        }
    }, a(t, "blueaerrinfo", {
        show: "none",
        text: ""
    }), a(t, "isbackbutton", !0), a(t, "oldversiondata", {
        macID: "",
        snCode: "",
        sid: ""
    }), t),
    onShow: function() {},
    onLoad: function(t) {
        var e = this, a = t.index, n = (wx.getStorageSync("fropenid"), this), s = wx.getStorageSync("frUserInfo");
        "" == s && null == s || n.setData({
            token: s
        }), wx.showLoading({
            title: "加载中…"
        }), n.getHeight(), n.setData({
            sname: !1
        }), o.getcoment("/Amiibo/list1?PageIndex=1&PageSize=10", function(t) {
            wx.hideLoading(), 200 == t.code && ("" == a || null == a || null == a ? n.setData({
                PageCur: "Homepage",
                ArrayList: t.data
            }) : n.setData({
                PageCur: a,
                isbackbutton: !1,
                ArrayList: t.data
            }));
        }), i.globalData.userInfo ? this.setData({
            userInfo: i.globalData.userInfo,
            hasUserInfo: !0
        }) : this.data.canIUse ? i.userInfoReadyCallback = function(t) {
            e.setData({
                userInfo: t.userInfo,
                hasUserInfo: !0
            });
        } : wx.getUserInfo({
            success: function(t) {
                i.globalData.userInfo = t.userInfo, e.setData({
                    userInfo: t.userInfo,
                    hasUserInfo: !0
                });
            }
        });
    },
    topshopcome: function(t) {
        i.globalData.MapList = this.data.ArrayList.amiiboList[t.currentTarget.dataset.id];
    },
    storage: function(t) {
        i.globalData.priMap = this.data.ArrayList2.amiiboList[t.currentTarget.dataset.id], 
        wx.navigateTo({
            url: "/pages/Amiibo/form/form"
        }), this.hideModal();
    },
    watchPassWord: function(t) {
        var e = this;
        wx.showLoading({
            title: "加载中…"
        }), "" != t.detail.value ? o.getcoment("/Amiibo/list1?SearchName=" + t.detail.value + "&SerialID=0", function(t) {
            wx.hideLoading(), 200 == t.code && e.setData({
                ArrayList: t.data
            });
        }) : o.getcoment("/Amiibo/list1?PageIndex=1&PageSize=10", function(t) {
            wx.hideLoading(), 200 == t.code && e.setData({
                ArrayList: t.data
            });
        });
    },
    getHeight: function() {
        var t = this;
        wx.createSelectorQuery().select("#home-init").boundingClientRect().exec(function(e) {
            t.setData({
                init: e[0].height
            });
        }), t.setData({
            homejpg: wx.getSystemInfoSync().windowHeight
        });
    },
    Input: function() {
        this.setData({
            sname: !0
        });
    },
    bindrefre: function() {
        var t = this;
        if (wx.showLoading({
            title: "加载中…"
        }), t.data.strip > t.data.ArrayList.total) wx.hideLoading(); else {
            var e = t.data.strip + 10;
            o.getcoment("/Amiibo/list1?PageIndex=1&PageSize=" + e, function(a) {
                wx.hideLoading(), 200 == a.code && t.setData({
                    ArrayList: a.data,
                    strip: e
                });
            });
        }
    },
    NavChange: function(t) {
        this.setData({
            PageCur: t.currentTarget.dataset.cur
        });
        this.setData({
            user: wx.getStorageSync("user")
        }), "Homepage" == t.currentTarget.dataset.cur ? this.setData({
            isbackbutton: !0
        }) : "CardDag" == t.currentTarget.dataset.cur ? "" != this.data.token && null != this.data.token && null != this.data.token || this.setData({
            viewShowed: "show",
            isbackbutton: !1
        }) : this.setData({
            viewShowed: "",
            isbackbutton: !1
        });
    },
    GetPrivateList: function() {
        var t = this.data.token, e = this, a = wx.getStorageSync("fropenid");
        o.getcoment1({
            url: "/Amiibo/privatelist?userID=" + t.id,
            Authorization: t.token
        }, function(t) {
            200 == t.code ? (e.setData({
                ArrayList2: t.data
            }), e.setData({
                PrivatePackage: "DialogModal1"
            }), e.CloseTip()) : 401 == t.code && o.UserGetComent("/user/openidlogin?openID=" + a.result, function(t) {
                200 == t.code && (wx.setStorageSync("frUserInfo", t.data), e.setData({
                    token: t.data
                }), e.GetPrivateList());
            }, function(t) {});
        });
    },
    SetConnnectBlueToolsError: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "block";
        this.setData({
            blueaerrinfo: {
                show: e,
                text: t
            }
        });
    },
    layoutScroll: function(t) {
        this.data.scrollTop = 1 * this.data.scrollTop + 1 * t.detail.deltaY;
        this.data.scrollTop <= -280 ? this.setData({
            navFixed: !0,
            absolute: !1,
            inite: this.data.init
        }) : this.setData({
            navFixed: !1,
            absolute: !0,
            inite: 0
        });
    },
    PrivatePackge: function() {
        var t = wx.getStorageSync("frUserInfo");
        null != t && "" != t && null != t ? (this.ShowTip("加载中", 3), this.GetPrivateList()) : this.ShowTip("请先登录", 2);
    },
    userIn: function() {
        var t = wx.getStorageSync("frUserInfo");
        if (null != t && "" != t && null != t) {
            var e = this;
            o.getUserCommet({
                url: "/User/getuserinfo?userid=" + t.id,
                Authorization: t.token
            }, function(t) {
                200 == t.code ? e.setData({
                    modalName: "DialogModal1",
                    user: t.data
                }) : 401 == t.code && (e.ShowTip("登陆过期", 2), e.setData({
                    login: "",
                    userLogo: "/images/tabbar/about.png"
                }), wx.clearStorageSync("frUserInfo"));
            }, function(t) {
                e.ShowTip(t, 2);
            });
        } else this.ShowTip("请先登录", 2), this.setData({
            login: ""
        });
    },
    userInPass: function() {
        var t = wx.getStorageSync("frUserInfo");
        null != t && "" != t && null != t ? this.setData({
            modalPass: "DialogModal1"
        }) : this.ShowTip("请先登录", 2);
    },
    UpdatePass: function() {
        null == v ? this.UpdateNonPass() : this.setData({
            moddelupdate: "DialogModal2"
        });
    },
    UpdateNonPass: function() {
        this.setData({
            moddelnonupdate: "DialogModal3"
        });
    },
    UpdateView: function() {
        this.hideModal(), this.setData({
            updateview: "DialogModal4",
            msgtext: "设备正在更新,请稍后..."
        }), this.progressView2 = this.selectComponent("#progressView2"), this.progressView2.drawProgressBar(0, 100), 
        this.progressView2.setHide(!1), this.WriteToEQ(this.updatea1());
    },
    UpdateBtn: function() {
        this.setData({
            updatebtn: "DialogModal5"
        });
    },
    SetPer: function(t) {
        this.setData({
            percentage: t
        });
    },
    bindGetUserInfo: function(t) {
        if (t.detail.userInfo) {
            i.globalData.userInfo = t.detail.userInfo;
            var e = t, a = (wx.getStorageSync("fropenid"), {
                nickname: e.detail.userInfo.nickName,
                avatarUrl: e.detail.userInfo.avatarUrl
            });
            wx.setStorageSync("WxUserInfobyfr", a), this.setData({
                loginName: "DialogModal1"
            });
        } else wx.showModal({
            title: "警告",
            content: "您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!",
            showCancel: !1,
            confirmText: "返回授权",
            success: function(t) {
                t.confirm;
            }
        });
    },
    frAccountlogin: function() {
        this.setData({
            fruserLogin: "DialogModal1"
        });
    },
    LoginAccount: function(t) {
        var e = this, a = t.detail.value.username, i = d.jsencrypt(t.detail.value.password);
        o.UserGetComent("/user/login?account=" + a + "&password=" + i, function(t) {
            200 == t.code && (wx.setStorageSync("frUserInfo", t.data), e.setData({
                userLogo: t.data.logoPath,
                usernickName: t.data.name,
                login: "login"
            }), e.setData({
                token: t.data
            }), e.hideModal());
        }, function(t) {});
    },
    logOut: function() {
        this.setData({
            login: "",
            userLogo: "/images/tabbar/about.png"
        }), wx.removeStorageSync("frUserInfo");
    },
    hideModal: function() {
        this.setData({
            modalPass: null,
            moddelupdate: null,
            moddelnonupdate: null,
            updateview: null,
            updatebtn: null,
            modalName: null,
            loginName: null,
            PrivatePackage: null,
            fruserLogin: null
        }), null != this.progressView2 && this.progressView2.setHide(!0);
    },
    ModifyUserPassWord: function(t) {
        var e = this;
        if (t.detail.value.UmPass === t.detail.value.RmPass) {
            wx.showLoading({
                title: "加载中…"
            });
            var a = e.data.token, i = {
                id: a.id,
                oldPass: t.detail.value.UserPass,
                newPass: t.detail.value.UmPass
            };
            o.request({
                url: "/User/updatepassword",
                Authorization: a.token
            }, i, function(t) {
                200 != t.code ? e.tisp(t.message) : e.tisp(t.data);
            }), e.hideModal();
        } else e.tisp("两次新密码不同，请重新核对。");
    },
    ModifyUserInformation: function(t) {
        var e = this, a = e.data.token;
        wx.showLoading({
            title: "加载中…"
        });
        var i = {
            id: a.id,
            name: t.detail.value.name,
            logoPath: "",
            sex: 1 == t.detail.value.sex ? 1 : 2,
            email: t.detail.value.email
        };
        o.request({
            url: "/User/update",
            Authorization: a.token
        }, i, function(a) {
            if (200 == a.code) return e.tisp(a.data), void e.setData({
                usernickName: t.detail.value.name
            });
            e.tisp(a.message);
        }), e.hideModal();
    },
    tisp: function(t) {
        wx.showToast({
            title: t,
            icon: "none",
            duration: 2e3
        });
    },
    onReady: function() {
        var t = wx.getStorageSync("fropenid");
        if (null == t || null == t || "" == t) wx.login({
            success: function(t) {
                t.code && o.UserGetComent("/User/author?code=" + t.code, function(t) {
                    200 == t.code && (i.globalData.openID = t.data, wx.setStorageSync("fropenid", t.data));
                });
            }
        }); else {
            var e = this.data.token, a = wx.getStorageSync("WxUserInfobyfr");
            null != e && null != e && "" != e && this.setData({
                userLogo: "" == e.logoPath ? a.avatarUrl : e.logoPath,
                usernickName: e.name,
                login: "login"
            });
        }
        n.clear();
    }
}, a(e, "onShow", function() {}), a(e, "onHide", function() {}), a(e, "onUnload", function() {}), 
a(e, "onPullDownRefresh", function() {}), a(e, "onReachBottom", function() {}), 
a(e, "onShareAppMessage", function() {}), a(e, "bleStateListener", function(t) {
    switch (t) {
      case s.STATE_DISCONNECTED:
        break;

      case s.STATE_SCANNING:
        this.ShowTip("正在扫描", 3);
        break;

      case s.STATE_SCANNED:
        this.setData({
            disbtn: ""
        });
        break;

      case s.STATE_CONNECTING:
        this.SetConnnectBlueToolsError("", "none");
        break;

      case s.STATE_CONNECTED:
        this.setData({
            bluetoolAtten: "正在开启服务,请稍后。。。"
        });
        break;

      case s.STATE_CONNECTING_ERROR:
        this.setData({
            bluetoolName: "",
            bluetools: ""
        }), this.SetConnnectBlueToolsError("连接失败,请重新连接"), n.clear();
        break;

      case s.STATE_NOTIFY_SUCCESS:
        this.setData({
            bluetoolAtten: "开启成功,配置中,请稍后。。。"
        }), this.StartHighConnect();
        break;

      case s.STATE_NOTIFY_FAIL:
        this.setData({
            bluetoolName: "",
            bluetools: "",
            bleItem: []
        }), this.SetConnnectBlueToolsError("连接失败,请重新连接"), n.clear();
        break;

      case s.STATE_CLOSE_BLE:
        T(s.NOT_BLE), setTimeout(function() {
            n.Inited() && n.initblue();
        }, 5e3);
        break;

      case s.STATE_NOTBLE_WCHAT_VERSION:
        T(s.NOT_PERMISSION2);
        break;

      case s.STATE_NOTBLE_SYSTEM_VERSION:
        T(s.NOT_PERMISSION1);
        break;

      case s.STATE_INIT_SUCCESS:
        w || (w = !0, n.connectBle(m)), this.startScanBle();
    }
}), a(e, "ShowTip", function(t, e) {
    var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "progressline", i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1500;
    if (1 == e ? this.setData({
        errorData: {
            show: "show",
            text: t,
            pic: "Suc.png",
            disp: a
        }
    }) : 2 == e ? this.setData({
        errorData: {
            show: "show",
            text: t,
            pic: "Failpic.png",
            disp: a
        }
    }) : 3 == e && this.setData({
        errorData: {
            show: "show",
            text: t,
            pic: "Loading.gif",
            disp: a
        }
    }), 0 != i) var o = this, n = setTimeout(function() {
        o.CloseTip(), clearTimeout(n);
    }, i);
}), a(e, "CloseTip", function() {
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
}), a(e, "WriteToEQ", function(t) {
    var e = this.ObtainCRC(t), a = c.encryption(e), i = Math.ceil(a.length / 40);
    if (i > 1) {
        for (var o = new Array(), s = new Array(), r = 0, l = 40, u = 0; u < i; u++) {
            t = a.substring(r, r + l);
            o.push(t), s.push(e.substring(r, r + l)), r += l, a.length - r < l && (l = a.length - r);
        }
        for (u = 0; u < o.length; u++) n.write(o[u]), D(15);
    } else n.write(a);
}), a(e, "ObtainCRC", function(t) {
    return function(t) {
        var e = t.length % 40;
        if (0 != e) {
            for (var a = "", i = 0; i < 40 - e; i++) a += "0";
            t += a;
        }
        return t;
    }(t += I(l.CRC16(0, u.sys16TOArrayBuffer(t)).toString(16).toUpperCase(), 4));
}), a(e, "updatea1", function() {
    g = 0, f = 1;
    var t = (v.dataPath.length / 2).toString(16), e = (p = Math.ceil(v.dataPath.length / 3986)).toString(16), a = (function(t) {
        var e = t, a = l.CRC16(0, u.sys16TOArrayBuffer(e)).toString(16).toUpperCase();
        (t = I(a, 4)).length;
    }(r.Update_Data), "130005" + b + I(v.version.toString(16), 8) + I(t, 8) + I(v.keyCRC.toString(16), 4) + I(e, 4));
    return h = "05", a;
}), a(e, "updatea2", function() {
    var t = Math.ceil(g / v.dataPath.length * 100);
    this.progressView2.drawProgressBar(t, 100);
    var e = v.dataPath.length - g;
    e = e >= 3986 ? 3986 : e;
    var a = v.dataPath.substring(g, g + e), i = I((a.length / 2 + 7).toString(16), 4) + "05" + I(f.toString(16), 4) + a;
    return g += e, f++, h = "052", i;
}), a(e, "startScanBle", function() {
    var t = this;
    n.initThis(t), n.Inited() && n.initblue();
    var e = [];
    this.setData({
        bleItem: e,
        disbtn: "dis"
    }), n.startScanBle({
        success: function(a) {
            (e = t.data.bleItem).push(a), t.setData({
                bleItem: e
            });
        }
    });
}), a(e, "OnclickRidio", function(t) {
    var e = t.currentTarget.dataset;
    n.connected() ? (n.setBlueName(e.name, e.deviceId), this.setData({
        bluetools: "show",
        bluetoolAtten: "正在连接蓝牙,请稍后。。。",
        bluetoolName: n.getBlueName(),
        bluetoolUID: n.getBlueUID()
    }), n.Inited() ? (n.initThis(this), n.initblue(), m = e.deviceId, w = !1) : n.connectBle(e.deviceId)) : this.ShowTip("蓝牙已连接", 1);
}), a(e, "StartHighConnect", function() {
    this.WriteToEQ(r.even_meet_one), h = "01";
}), a(e, "notifyListener", function(t) {
    var e = this, a = c.decrypt(t);
    if ("01" == h && "1" == a.charAt(5)) {
        var i = a.substring(24, 32);
        t = r.even_meet_two + i;
        this.WriteToEQ(t), h = "012";
    } else if ("012" == h) "1" == a.charAt(5) ? (this.ShowTip("服务开启成功", 1), this.setData({
        bluetools: null,
        PageCur: "Homepage",
        isbackbutton: !0
    }), this.WriteToEQ("050006"), h = "06") : this.StartHighConnect(); else if ("06" == h && "1" == a.charAt(5)) {
        var n = a.substring(18, 22);
        b = n;
        var s = n.charAt(2) + n.charAt(3) + n.charAt(0) + n.charAt(1), l = a.substring(22, 30), u = l.charAt(6) + l.charAt(7) + l.charAt(4) + l.charAt(5) + l.charAt(2) + l.charAt(3) + l.charAt(0) + l.charAt(1), d = a.substring(10, 18), g = a.substring(46, 70);
        this.setData({
            oldVersion: parseInt(u, 16),
            oldversiondata: {
                macID: d,
                sid: s,
                snCode: g
            }
        }), o.UpdateVersion("/Version/binupdatewechat?sid=" + s + "&sncode=" + g + "&version=" + parseInt(u, 16) + "&key=A1B2", function(t) {
            if (200 == t.code) {
                t.data.dataPath.length;
                v = t.data, e.setData({
                    newversion: t.data.version,
                    description: t.data.description
                });
            } else v = null;
        }, function(t) {});
    } else if ("05" == h && "1" == a.charAt(5)) this.WriteToEQ(this.updatea2()), this.SetIsLifeUpdate(2e4), 
    h = "052", wx.setKeepScreenOn({
        keepScreenOn: !0
    }); else if ("052" == h && "1" == a.charAt(5)) {
        if (this.ClearTimer(), f > p) {
            for (var S = 0; S < 10; S++) this.setData({
                msgtext: "设备即将完成更新(" + (10 - (S + 1)) + ")"
            }), D(1e3);
            return this.UpdateBtn(), wx.setKeepScreenOn({
                keepScreenOn: !1
            }), void this.UpdateLog();
        }
        this.WriteToEQ(this.updatea2()), this.SetIsLifeUpdate(2e4);
    }
}), a(e, "SetIsLifeUpdate", function(t) {
    var e = this;
    S = setTimeout(function() {
        e.hideModal(), wx.setKeepScreenOn({
            keepScreenOn: !1
        }), wx.showModal({
            title: "升级错误",
            content: "升级失败，请移动蓝牙与设备的距离重试，是否重新开始",
            success: function(t) {
                t.confirm ? (e.UpdateView(), e.updatea1()) : e.ShowTip("取消成功", 2);
            }
        });
    }, t);
}), a(e, "ClearTimer", function() {
    null != S && clearTimeout(S);
}), a(e, "writeListener", function(t, e) {}), a(e, "getPhoneNumber", function(t) {
    var e = t.detail.encryptedData, a = t.detail.iv;
    if ("getPhoneNumber:fail user deny" == t.detail.errMsg) this.ShowTip("您拒绝授权！", 2); else {
        this.ShowTip("登陆中,请稍后", 3);
        var i = wx.getStorageSync("fropenid").result;
        if (null == i || "" == i || null == i) return void this.GetOpenID(a, e);
        this.GetPrivatePhone(i, a, e);
    }
}), a(e, "cancle", function() {
    this.setData({
        viewShowed: ""
    }), this.ShowTip("您取消了登录", 2);
}), a(e, "InitBlueToolth", function() {
    var t = this;
    if (n.Inited()) n.CheckEvroment(this); else {
        var e = [];
        this.data.bleItem = [], n.startScanBle({
            success: function(a) {
                if (0 == (e = t.data.bleItem).length) e.push(a), t.setData({
                    bleItem: e
                }); else {
                    for (var i = !1, o = 0; o < e.length; o++) (e[o].deviceId = a.deviceId) && (i = !0);
                    i || (e.push(a), t.setData({
                        bleItem: e
                    }));
                }
            },
            fail: function(t) {}
        });
    }
}), a(e, "CloseBlueToolth", function() {
    var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
    n.disconnect(), n.connected() || t && this.ShowTip("蓝牙关闭", 2), n.setBlueName("", ""), 
    this.setData({
        bluetools: "",
        bluetoolName: n.getBlueName(),
        bluetoolUID: n.getBlueUID(),
        disbtn: ""
    });
}), a(e, "GetOpenID", function(t, e) {
    var a = this;
    wx.login({
        success: function(i) {
            i.code ? o.UserGetComent("/User/author?code=" + i.code, function(i) {
                200 == i.code && (wx.setStorageSync("fropenid", i.data), a.GetPrivatePhone(i.data.result, t, e));
            }) : that.ShowTip("获取失败", 2);
        }
    });
}), a(e, "GetPrivatePhone", function(t, e, a) {
    var i = wx.getStorageSync("WxUserInfobyfr"), n = this;
    o.Post("/User/descriptdata", {
        openID: t,
        iv: e,
        data: a,
        picurl: i.avatarUrl,
        nickname: i.nickname
    }, function(t) {
        200 == t.code && (wx.setStorageSync("frUserInfo", t.data), n.setData({
            token: t.data,
            userLogo: "" == t.data.logoPath ? i.avatarUrl : t.data.logoPath,
            usernickName: t.data.name,
            login: "login"
        }), n.hideModal(), n.CloseTip());
    }, function(t) {
        n.ShowTip("登陆失败", 2);
    });
}), a(e, "UpdateLog", function() {
    o.UpdateVersion("/UpdateLog/add", {
        macID: this.data.oldversiondata.macID,
        snCode: this.data.oldversiondata.SnCode,
        sid: this.data.oldversiondata.sid,
        version: this.data.newversion
    }, function(t) {
        t.code;
    }, function(t) {});
}), e));