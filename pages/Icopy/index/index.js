require("../../../@babel/runtime/helpers/Arrayincludes");

getApp();

var t, a = require("../../../utils/Tools/IcopyCRequest.js"), e = require("../../../utils/Tools/DESEncrypt.js"), s = require("../../../utils/BlueTools/bletools.js"), i = require("../../../utils/BlueTools/constants.js"), r = require("../../../utils/BlueTools/SecretKey.js"), n = require("../../../utils/BlueTools/AdditiveSolution.js"), o = require("../../../utils/BlueTools/DataConversion.js"), d = require("../../../utils/BlueTools/FunMethod.js"), h = require("../../../utils/BlueTools/ModelEnum.js"), c = require("../../../utils/Tools/WebsocketTools.js"), l = null, u = 0, g = 0, p = 0, f = !0, b = "", m = "", D = 1, v = "", k = "", w = !0, T = 0, I = [], y = "", F = !0, S = [], x = !1, C = 0, A = {}, B = {}, P = 0, E = 0, O = 0, U = "", N = 0, M = "", W = [], L = 0, z = 0, Q = 0, _ = "", H = "", G = 0, K = "", R = 0, q = !1, V = null, j = null, Z = 0, Y = !1, J = !1, $ = null, X = 0, tt = [], at = 0, et = 1, st = "", it = 0, rt = 0, nt = 0, ot = 0, dt = "index", ht = 0, ct = [], lt = null, ut = !1;

function gt(t) {
    for (var a = new Array(), e = t.substring(64, t.length), s = 0; s < e.length; s += 12) a.push(e.substring(s, s + 12));
    return a;
}

function pt(t) {
    wx.showModal({
        title: i.ALARM_TITLE,
        content: t,
        showCancel: !1,
        success: function(t) {
            t.confirm;
        }
    });
}

function ft(t, a) {
    for (var e = "", s = new Array(), i = 0; i < a - t.length; i++) e += "0";
    t = e + t;
    for (i = 0; i < t.length; i += 2) s.push(t.substring(i, i + 2));
    s.reverse();
    var r = "";
    for (i = 0; i < s.length; i++) r += s[i];
    return r;
}

function bt(t) {
    var a = t.toString(16);
    return a.length % 2 == 0 ? a : "0" + a;
}

function mt(t) {
    var a = t;
    return t = ft(n.CRC16(0, o.sys16TOArrayBuffer(a)).toString(16).toUpperCase(), 4);
}

function Dt(t) {
    for (var a = new Date(), e = a.getTime() + t; ;) if ((a = new Date()).getTime() > e) return;
}

function vt(t, a) {
    for (var e = 0; e < t.length; e++) if (t[e].id == a) return nt = e, t[e].name;
}

function kt(t) {
    for (var a = new Array(), e = 0; e < t.length; e += 2) a.push(t.substring(e, e + 2));
    a.reverse();
    var s = "";
    for (e = 0; e < a.length; e++) s += a[e];
    return s;
}

function wt(t) {
    for (var a = h.hex_array_big, e = "", s = new Array(), i = 0; i < t.length; i += 2) s.push(t.substring(i, i + 2));
    var r = "";
    for (i = 0; i < s.length; i++) r += s[i].charAt(1) + s[i].charAt(0);
    for (var n = 0; n < r.length; n++) for (var o = 0; o < a.length; o++) if (r.charAt(n).toLowerCase() == a[o].key) {
        e = e.concat(a[o].val);
        break;
    }
    return e;
}

function Tt() {
    for (var t = !0, a = 0; a < S.length; a++) if ("1" != S[a].release) {
        t = !1;
        break;
    }
    return t;
}

function It() {
    for (var t = !0, a = 0; a < S.length; a++) if ("1" == S[a].release) {
        t = !1;
        break;
    }
    return t;
}

function yt() {
    for (var t = new Array(), a = 0; a < S.length; a++) "1" == S[a].release && t.push({
        key: S[a].key,
        id: S[a].id
    });
    return t;
}

function Ft(t) {
    var a = (t = (t + 8) / 2).toString(16);
    if (a.length % 4 != 0) {
        for (var e = a.length % 4, s = "", i = 0; i < 4 - e; i++) s += "0";
        var r = s + a;
        return r.charAt(2) + r.charAt(3) + r.charAt(0) + r.charAt(1);
    }
    return a.charAt(2) + a.charAt(3) + a.charAt(0) + a.charAt(1);
}

function St(t) {
    return t < 10 ? "0" + t : t;
}

function xt(t) {
    for (var a = new Array(), e = 0; e < t.length; e += 2) a.push({
        text: t.substring(e, e + 2),
        color: ""
    });
    return a;
}

function Ct(t) {
    return t.data.substring(488, 496);
}

function At(t, a) {
    for (var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], s = t.data.substring(512, t.data.length), i = 0, r = new Array(), n = 0; n < s.length; n += 32) {
        var o = s.substring(n, n + 32);
        i > 127 ? r.push({
            id: St(i),
            textarray: xt(o),
            block: St(parseInt(i / 4) + parseInt((i - 128) / 16)),
            isedit: a,
            backcolor: (i - 128 + 1) % 16 == 0 ? "bg-grey" : "",
            comparebackcolor: e ? "bg-grey" : "",
            iscompare: e,
            alltext: o
        }) : r.push({
            id: St(i),
            textarray: xt(o),
            block: St(parseInt(i / 4)),
            isedit: a,
            backcolor: (i + 1) % 4 == 0 ? "bg-grey" : "",
            comparebackcolor: e ? "bg-grey" : "",
            iscompare: e,
            alltext: o
        }), i++;
    }
    return r;
}

function Bt(t, a) {
    for (var e = new Array(), s = 0; s < t.length; s++) {
        for (var i = 0; i < t[s].textarray.length; i++) t[s].textarray[i].text != a[s].textarray[i].text && (a[s].textarray[i].color = "red");
        e.push(t[s]), e.push(a[s]);
    }
    return e;
}

function Pt(t) {
    for (var a = "", e = 0; e < t.length; e++) a += t[e].text + " ";
    return a;
}

function Et() {
    var t = new Date(), a = t.getHours(), e = t.getMinutes(), s = t.getSeconds();
    return (a < 10 ? "0" + a : a) + ":" + (e < 10 ? "0" + e : e) + ":" + (s < 10 ? "0" + s : s);
}

function Ot() {
    for (var t = "", a = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" ], e = 0; e < 12; e++) {
        t += a[parseInt(16 * Math.random())];
    }
    return t;
}

function Ut(t) {
    return null == t;
}

function Nt(t) {
    if ("" != t && null != t) {
        for (var a = "", e = t.length; e >= 0; e -= 2) a += t.charAt(e), a += t.charAt(e + 1);
        return a;
    }
    return t;
}

function Mt(t, a) {
    var e = t.toString(16);
    if (e.length % 2 != 0 && (e = "0" + e), e.length < a) {
        for (var s = "", i = 0; i < a - e.length; i++) s += "0";
        return s + e;
    }
}

Page({
    data: {
        PageCur: "Decode",
        totalstatic: 0,
        staticindex: 0,
        staticnested: "none",
        Decode: "A",
        speed: 0,
        provinceindex: 0,
        passempty: "",
        cityindex: 0,
        areaindex: 0,
        provincearray: [],
        cityarray: [],
        areaarray: [],
        index: "index",
        totalAccount: 40,
        loginName: "",
        userLogo: "/images/tabbar/about.png",
        usernickName: "",
        token: null,
        bleItem: [],
        login: "",
        editCard: "",
        imglist: [],
        carddata: {
            ID: "",
            Type: "",
            Hz: "",
            IntID: "",
            cmd: ""
        },
        morecard: [],
        hhlist: h.ICHZ,
        hzlist: h.ICHZ,
        hz1list: h.IDHz,
        typelist: h.Type,
        fullhz: h.FullHz,
        fullcardtype: h.FullCardType,
        morecardshow: "",
        cardText: [],
        konwpass: "",
        konwarray: [],
        addressdata: [],
        region: [ "广东省", "广州市", "海珠区" ],
        customItem: "全部",
        allTextData: [],
        cardName: "",
        alreadyreadid: 0,
        compare1: [],
        edittextid: 0,
        cardtexteshow: "",
        temptextdata: "",
        backwards: 0,
        iscompare: !1,
        comparecard: {
            card1: "",
            card2: ""
        },
        msgText: [],
        writecarddata: "",
        iswritebtn: !0,
        nameinputText: "",
        nameregioncode: [],
        comparedatadiv: 7,
        savecarddata: "",
        nownetpassarray: [],
        dataindex: 0,
        dataareaindex: 0,
        totalnetdata: 0,
        netpassarray: [],
        isWork: !1,
        isIC: !1,
        isIC1: !1,
        editcardID: "",
        editcardformat: 1,
        editcardtype: 0,
        editcardhz: 0,
        editcarddata: {
            id: "",
            type: "",
            hz: ""
        },
        idcardwriteinfo: {
            id: "",
            hz: "",
            pcode: ""
        },
        iscomparebtn: !1,
        clearcomparebtn: !0,
        analysingarray: [],
        analysingdata: "",
        formartarrayblock: [],
        isfinish: !1,
        datascrolls: "datascroll",
        msgbottom: "msgscrollbottom",
        senseresolve: "",
        sensebtn: "true",
        sensepassdata: [],
        cardtypeonread: 0,
        isstopbtn: !0,
        errorData: {
            show: "",
            text: "",
            pic: "Suc.png",
            disp: "progressline"
        },
        tipspeed: 0,
        attensioninfo: {
            show: "",
            text: "请点击对应的数据块，开始编辑 ",
            text1: "(此提示点击窗体自动消失)"
        },
        isbackbutton: !0,
        packgeID: 0,
        lastclicktime: 0,
        carddataname: {
            isloginshow: "none",
            cardNamep: ""
        },
        tipmessage: "提示区域",
        nettest: "有",
        isconnectnet: !0,
        connectShow: "Grid",
        blueaerrinfo: {
            show: "none",
            text: ""
        },
        hidcardidwrite: "",
        isten: !0,
        aboutus: "",
        version: "211227",
        isEditBtn: !0,
        staticattak: 0
    },
    changeconnenct: function() {
        var t = !this.data.isconnectnet;
        this.setData({
            isconnectnet: t,
            nettest: t ? "有" : "无"
        });
    },
    SetConnnectBlueToolsError: function(t) {
        var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "block";
        this.setData({
            blueaerrinfo: {
                show: a,
                text: t
            }
        });
    },
    onShow: function(t) {
        ut || this.webSocket();
    },
    onReady: function(t) {
        this.InitUser(), this.InitBaseData();
    },
    InitBaseData: function() {
        var t = this, e = wx.getStorageSync("addressdata");
        null == e || null == e || "" == e ? a.getcoment("/basedata/list", function(a) {
            200 == a.code && (t.setData({
                addressdata: a.data
            }), wx.setStorageSync("addressdata", a.data));
        }, function(a) {
            t.ShowTip(a, 2);
        }) : this.setData({
            addressdata: e
        });
    },
    InitUser: function() {
        var t = wx.getStorageSync("frUserInfo"), a = wx.getStorageSync("WxUserInfobyfr");
        null != t && "" != t && null != t && this.setData({
            userLogo: "" == t.logoPath ? a.avatarUrl : t.logoPath,
            usernickName: t.name,
            login: "login"
        });
    },
    webSocket: function() {
        t = wx.connectSocket({
            url: "wss://47.92.79.178:17850",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t);
            },
            fail: function(t) {
                that.ShowTip("网络异常", 2);
            }
        });
    },
    initWebsocket: function() {
        var a = this, e = this;
        t.onOpen(function(t) {
            ut = !0;
        }), t.onClose(function(t) {
            ut = !1, a.webSocket();
        }), t.onError(function(t) {
            e.ShowTip("WebSocket 错误", 2), ut = !1;
        }), t.onMessage(function(t) {});
    },
    ShowTipMessageOnFirstPage: function(t) {
        this.setData({
            tipmessage: Et() + ":" + t
        });
    },
    InitCardDataText: function(t) {
        for (var a = new Array(), e = 0; e < t; e++) a.push({
            id: St(e),
            textarray: [ {
                text: "00",
                color: ""
            }, {
                text: "00",
                color: ""
            }, {
                text: "00",
                color: ""
            }, {
                text: "00",
                color: ""
            }, {
                text: "00",
                color: ""
            }, {
                text: "00",
                color: ""
            }, {
                text: "00",
                color: ""
            }, {
                text: "00",
                color: ""
            }, {
                text: "00",
                color: ""
            }, {
                text: "00",
                color: ""
            }, {
                text: "00",
                color: ""
            }, {
                text: "00",
                color: ""
            }, {
                text: "00",
                color: ""
            }, {
                text: "00",
                color: ""
            }, {
                text: "00",
                color: ""
            }, {
                text: "00",
                color: ""
            } ],
            block: St(parseInt(e / 4))
        });
        this.setData({
            allTextData: a
        });
    },
    ReadData: function() {
        if (q = !1, this.setData({
            staticnested: "none",
            staticindex: 0,
            totalstatic: 0,
            nownetpassarray: []
        }), s.connected()) return this.setData({
            PageCur: "EQ",
            isbackbutton: !1
        }), ht = 0, void this.ShowTip("蓝牙未连接", 2);
        wx.setKeepScreenOn({
            keepScreenOn: !0
        });
        var t = this;
        c.iscounted() || c.ws_connect(function(a) {
            clearTimeout(j);
            var e = JSON.parse(a), s = new Array(), i = new Array();
            t.data.nownetpassarray = [], t.data.netpassarray = [];
            for (var r = 0; r < e.length; r++) if ("06" == e[r].CMD) {
                for (var n = 0; n < e[r].BackData.length; n++) s.push(e[r].BackData[n]), i.push({
                    block: parseInt(parseInt(e[r].Block) / 4) < 10 ? "0" + parseInt(parseInt(e[r].Block) / 4) : parseInt(parseInt(e[r].Block) / 4),
                    abpass: 0 == e[r].ABPass ? "A" : "B",
                    password: e[r].BackData[n]
                });
                t.CloseTip();
            } else {
                if ("0C" != e[r].CMD) {
                    t.data.netpassarray = e, t.GetAllTemPass();
                    break;
                }
                t.setData({
                    totalstatic: e[r].TotalLength,
                    staticnested: "flex"
                }), t.data.totalstatic > 0 && t.GetStaticPass();
            }
            t.setData({
                sensepassdata: i
            }), t.data.konwarray = s;
        }), this.ShowTipMessageOnFirstPage("开始读卡！"), this.OnLoading("正在读取卡片"), this.setData({
            speed: 0,
            imglist: [],
            msgText: [],
            iswritebtn: !0,
            isEditBtn: !0,
            isstopbtn: !1,
            carddataname: {
                isloginshow: "None",
                cardNamep: ""
            }
        }), J = !1, I = [], S = [], W = [], x = !1, !1, !0, O = 0, P = 0, E = 0, N = 0, 
        this.IDCard();
    },
    WriteCardData: function() {
        if (s.connected()) return this.setData({
            PageCur: "EQ",
            isbackbutton: !1
        }), ht = 0, void this.ShowTip("蓝牙未连接", 2);
        if (this.setData({
            iswritebtn: !0,
            isEditBtn: !0
        }), J = !1, this.OnLoading("正在写卡"), "21" == this.data.carddata.cmd) {
            b = "1E", this.data.writecarddata = "";
            for (var t = 0; t < this.data.allTextData.length; t++) this.data.writecarddata += this.data.allTextData[t].alltext;
            if ("" != this.data.editcarddata.id && (0 == this.data.editcarddata.type.id || 1 == this.data.editcarddata.type.id)) {
                var a = this.data.writecarddata.substring(8, this.data.writecarddata.length), e = this.data.editcarddata.id;
                this.data.writecarddata = e + a;
            }
            var i = Ft((r = "1E" + (y = this.data.writecarddata.substring(12, 14)) + this.data.writecarddata).length);
            this.WriteToEQ(i + r);
        } else if ("28" == this.data.carddata.cmd) {
            b = "2D", "" != this.data.editcarddata.id && 2 == this.data.editcarddata.type.id && (this.data.idcardwriteinfo.id = this.data.editcarddata.id);
            i = Ft((r = "2D" + this.data.idcardwriteinfo.hz + this.data.idcardwriteinfo.id + this.data.idcardwriteinfo.pcode).length);
            this.WriteToEQ(i + r);
        } else if ("29" == this.data.carddata.cmd) {
            b = "2E";
            var r;
            i = Ft((r = "2E" + this.data.hidcardidwrite).length);
            this.WriteToEQ(i + r);
        }
    },
    WriteCardData2: function() {
        b = "1F";
        var t = "08001F" + y + "0000";
        this.WriteToEQ(t);
    },
    ReadEmptyBlock: function(t) {
        b = "1D";
        var a = "06001D" + t;
        this.WriteToEQ(a);
    },
    FormartData: function() {
        if (R >= S.length - 1) {
            for (var t = 0; t < this.data.formartarrayblock.length; t++) "0" == this.data.formartarrayblock[t].code && 0 != t && "某些区块格式失败";
            return this.CloseTip(), this.data.allTextData = [], this.ReadData(), void this.OnLoading("数据读取中,请稍后..", "progresslineshow");
        }
        b = "16";
        var a = "";
        for (t = R; t < S.length; t++) if (R++, t % 2 == 0) {
            a = "130016" + bt(parseInt(t / 2)) + "03" + S[t].key + S[t + 1].key;
            break;
        }
        this.WriteToEQ(a);
    },
    PassMakeBlock: function() {
        b = "17";
        var t = "", a = parseInt(G / (S.length - 1) * 100);
        if (G >= S.length - 1) return this.setData({
            iswritebtn: !1,
            isEditBtn: !1,
            isWork: !1,
            isfinish: !1,
            iscomparebtn: !1,
            isstopbtn: !0,
            tipspeed: 100,
            msgText: [ {
                time: Et(),
                text: "卡片读取完成",
                type: 2
            } ]
        }), G = 0, wx.setKeepScreenOn({
            keepScreenOn: !1
        }), this.CloseTip(), this.SucBee(), void this.ShowTipMessageOnFirstPage("卡片读取完成");
        for (var e = G; e < S.length; e++) {
            if (e % 2 == 0) {
                t = "130017" + bt(parseInt(e / 2)) + "03" + S[e].key + S[e + 1].key, G++;
                break;
            }
            G++;
        }
        this.setData({
            isfinish: !0,
            iscomparebtn: !0,
            tipspeed: a
        }), this.WriteToEQ(t);
    },
    FullCounter: function() {
        if (this.setData({
            Decode: "A"
        }), L = 1, this.data.nownetpassarray.length >= 1) this.InitWebSocket(); else {
            if (P >= S.length) return this.AllPasswordAttack(), void this.ShowTip("此为无漏洞卡", 2);
            if (It()) {
                b = "15";
                var t = "08001502" + bt(4 * parseInt(P / 2)) + (P % 2 == 0 ? "00" : "01");
                P % 2 == 0 ? this.data.imglist[parseInt(P / 2)].r = "formblocck" : this.data.imglist[parseInt(P / 2)].r1 = "formblocck", 
                this.setData({
                    imglist: this.data.imglist
                }), Q = P, P++, this.WriteToEQ(t);
            } else P = 0, this.NestedCounter();
        }
    },
    GetLastUnKownPasslength: function() {
        if (0 == X) for (var t = P; t < S.length; t++) "1" != S[t].release && (X += 1);
        return X;
    },
    StaticNestedCounter: function() {
        if (this.setData({
            Decode: "S"
        }), L = 5, (this.data.nownetpassarray.length >= 1 || this.data.nownetpassarray.length >= this.GetLastUnKownPasslength()) && this.data.nownetpassarray.length > 0) return X = 0, 
        void this.InitWebSocket();
        if (N >= 1) this.AllPasswordAttack(); else {
            for (var t = P; t < S.length; t++) if ("1" != S[t].release) {
                t % 2 == 0 ? this.data.imglist[parseInt(t / 2)].r = "formblocck" : this.data.imglist[parseInt(t / 2)].r1 = "formblocck", 
                this.setData({
                    imglist: this.data.imglist
                });
                var a = yt();
                if (a.length > 0) {
                    b = "32";
                    var e = "";
                    for (t = 0; t < a.length; t++) (P % 2 == 0 && a[t].id % 2 == 0 || P % 2 != 0 && a[t].id % 2 != 0) && (e = "150032" + bt(4 * parseInt(a[t].id / 2)) + (a[t].id % 2 == 0 ? "00" : "01") + a[t].key + bt(4 * parseInt(P / 2)) + (P % 2 == 0 ? "00" : "01") + "0101" + U);
                    Q = P, this.WriteToEQ(e), O++, P++, O >= a.length && (O = 0);
                    break;
                }
            } else P++;
            P >= S.length && (P = 0, N <= 3 ? (Y = !0, this.NestedABlockToBBlock()) : (Y = !1, 
            !0), N++);
        }
    },
    NestedCounter: function() {
        if (this.setData({
            Decode: "D"
        }), L = 4, (this.data.nownetpassarray.length >= 2 || this.data.nownetpassarray.length >= this.GetLastUnKownPasslength()) && this.data.nownetpassarray.length > 0) return X = 0, 
        void this.InitWebSocket();
        if (N >= 3) return X = 0, P = 0, N = 0, void this.HalfCounter();
        for (var t = P; t < S.length; t++) if ("1" != S[t].release) {
            t % 2 == 0 ? this.data.imglist[parseInt(t / 2)].r = "formblocck" : this.data.imglist[parseInt(t / 2)].r1 = "formblocck", 
            this.setData({
                imglist: this.data.imglist
            });
            var a = yt();
            if (a.length > 0) {
                b = "30";
                var e = "150030" + bt(4 * parseInt(a[O].id / 2)) + (a[O].id % 2 == 0 ? "00" : "01") + a[O].key + bt(4 * parseInt(P / 2)) + (P % 2 == 0 ? "00" : "01") + "0A0100000000";
                return Q = P, this.WriteToEQ(e), O++, P++, void (O >= a.length && (O = 0));
            }
        } else P++;
        P >= S.length && (P = 0, N++, Tt() || this.NestedCounter());
    },
    HalfCounter: function() {
        if (this.setData({
            Decode: "H"
        }), L = 2, (this.data.nownetpassarray.length >= 3 || this.data.nownetpassarray.length >= this.GetLastUnKownPasslength()) && this.data.nownetpassarray.length > 0) return X = 0, 
        void this.InitWebSocket();
        if (N >= 5) return X = 0, P = 0, N = 0, this.data.nownetpassarray = [], void this.StaticNestedCounter();
        for (var t = P; t < S.length; t++) if ("1" != S[t].release) {
            t % 2 == 0 ? this.data.imglist[parseInt(t / 2)].r = "formblocck" : this.data.imglist[parseInt(t / 2)].r1 = "formblocck", 
            this.setData({
                imglist: this.data.imglist
            });
            var a = yt();
            if (a.length > 0) {
                b = "14";
                var e = "130014" + bt(4 * parseInt(a[O].id / 2)) + (a[O].id % 2 == 0 ? "00" : "01") + a[O].key + bt(4 * parseInt(P / 2)) + (P % 2 == 0 ? "00" : "01") + U;
                return Q = P, this.WriteToEQ(e), O++, P++, void (O >= a.length && (O = 0));
            }
        } else P++;
        P >= S.length && (P = 0, N++, Tt() || this.HalfCounter());
    },
    NestedABlockToBBlock: function() {
        for (var t = Z; t < S.length; t++) {
            if ("1" == S[t].release && t % 2 == 0) {
                if (Z++, "1" == S[t + 1].release) continue;
                Q = t + 1;
                var a = "0E0013" + bt(4 * parseInt(S[t].id / 2)) + "0101" + S[t].key;
                this.WriteToEQ(a);
                break;
            }
            Z++;
        }
        Z >= S.length && (Z = 0, Y = !1, this.NestedCounter());
    },
    ABlockToBBlock: function() {
        for (var t = Z; t < S.length; t++) {
            if ("1" == S[t].release && t % 2 == 0) {
                if (Z++, "1" == S[t + 1].release) continue;
                Q = t + 1;
                var a = "0E0013" + bt(4 * parseInt(S[t].id / 2)) + "0101" + S[t].key;
                this.WriteToEQ(a);
                break;
            }
            Z++;
        }
        Z >= S.length && (Z = 0, Y = !1, this.HalfCounter());
    },
    MorePassToOneBlock: function(t) {
        L = 0, b = "13", this.WriteToEQ(t);
    },
    OnePassToMoreBlock: function() {
        if ("21" == this.data.carddata.cmd) {
            b = "12";
            var t = "";
            this.data.konwarray.length > 0 && rt < this.data.konwarray.length ? (t = "04" == y ? "150012" + this.data.konwarray[rt].replace(/\s+/g, "") + "FFFFFFFF000000000000" : "150012" + this.data.konwarray[rt].replace(/\s+/g, "") + "FFFFFFFFFFFFFFFFFFFF", 
            rt++) : 1 == it ? t = "04" == y ? "150012FFFFFFFFFFFFFFFFFFFF000000000000" : "150012FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF" : 2 == it && (t = "04" == y ? "150012000000000000FFFFFFFF000000000000" : "150012000000000000FFFFFFFFFFFFFFFFFFFF"), 
            this.WriteToEQ(t);
        }
    },
    InsertData: function() {
        var t = this, a = [];
        $ = setInterval(function() {
            a.push({
                time: Et(),
                text: Ot().toLocaleUpperCase(),
                type: 2
            }), t.setData({
                msgText: a
            }), t.setData({
                msgbottom: "msgscrollbottom"
            }), a.length > 50 && (a = []);
        }, 500);
    },
    ICCard: function() {
        b = "21";
        this.WriteToEQ("050021");
    },
    IDCard: function() {
        this.setData({
            isWork: !0
        }), b = "28";
        this.WriteToEQ("0700280100");
    },
    HidCard: function() {
        b = "29";
        this.WriteToEQ("050029");
    },
    FindCard: function() {
        b = "10";
        this.WriteToEQ("050010");
    },
    SenseDecodeData: function() {
        this.setData({
            senseresolve: ""
        }), wx.setKeepScreenOn({
            keepScreenOn: !0
        }), this.OnLoading("认证中"), this.OnePassToMoreBlock();
    },
    addnewpass: function() {
        this.data.konwarray.push("FF FF FF FF FF FF"), this.setData({
            konwarray: this.data.konwarray
        });
    },
    clearpass: function() {
        this.data.konwarray = [], this.setData({
            konwarray: this.data.konwarray
        });
    },
    setkeytext: function(t) {
        var a = parseInt(t.currentTarget.id), e = t.detail.value, s = this.data.konwarray;
        s[a] = e, this.setData({
            konwarray: s
        });
    },
    Passcheckbtn: function() {
        if (s.connected()) return this.setData({
            PageCur: "EQ",
            isbackbutton: !1
        }), ht = 0, void this.ShowTip("请先连接蓝牙设备", 2);
        for (var t = 0; t < this.data.konwarray.length; t++) {
            this.data.konwarray[t].length;
            var a = this.data.konwarray[t].replace(/ /g, "");
            if (a.length % 2 != 0 || a.length > 12) return void this.ShowTip("请输入正确的密匙", 2);
        }
        this.OnLoading("正在读取卡片"), wx.setKeepScreenOn({
            keepScreenOn: !0
        }), this.setData({
            speed: 0,
            imglist: []
        }), I = [], S = [], W = [], x = !1, !0, J = !1, P = 0, E = 0, rt = 0, this.ICCard(), 
        this.setData({
            konwpass: ""
        });
    },
    backlist: function() {
        this.setData({
            index: "index"
        });
    },
    DecodeData: function() {
        dt = this.data.index, this.setData({
            index: "decode",
            isbackbutton: !1
        });
    },
    BackData: function() {
        0 == ht ? "index" == dt ? this.setData({
            index: dt,
            isbackbutton: !0,
            alreadyreadid: 0
        }) : (this.setData({
            index: dt,
            isbackbutton: !1,
            alreadyreadid: 0
        }), dt = "index") : (this.setData({
            PageCur: "CP"
        }), ht = 1);
    },
    editCardBtn: function() {
        this.setData({
            editCard: "show",
            editcardID: "",
            editcardformat: 1,
            editcardtype: this.data.cardtypeonread,
            editcardhz: 2 == this.data.cardtypeonread ? nt : 0,
            hhlist: 2 == this.data.cardtypeonread ? this.data.hz1list : this.data.hzlist
        });
    },
    NavChange: function(t) {
        if (this.setData({
            PageCur: t.currentTarget.dataset.cur
        }), "Decode" == t.currentTarget.dataset.cur) this.setData({
            index: "index",
            isbackbutton: !0
        }), ht = 0; else if ("CP" == t.currentTarget.dataset.cur) {
            var a = wx.getStorageSync("frUserInfo");
            null != a && "" != a && null != a ? (this.GetPrivateList(), ht = 1) : (this.ShowTip("请先登录", 2), 
            this.setData({
                PageCur: "MY",
                isbackbutton: !1
            }), ht = 0), this.setData({
                isbackbutton: !1
            });
        } else this.setData({
            isbackbutton: !1
        }), ht = 0;
    },
    ShowTip: function(t, a) {
        var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "progressline", s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1500;
        if (1 == a ? this.setData({
            errorData: {
                show: "show",
                text: t,
                pic: "Suc.png",
                disp: e
            }
        }) : 2 == a ? this.setData({
            errorData: {
                show: "show",
                text: t,
                pic: "Failpic.png",
                disp: e
            }
        }) : 3 == a && this.setData({
            errorData: {
                show: "show",
                text: t,
                pic: "Loading.gif",
                disp: e
            }
        }), 0 != s) var i = this, r = setTimeout(function() {
            i.CloseTip(), clearTimeout(r);
        }, s);
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
    userInPass: function() {
        var t = wx.getStorageSync("frUserInfo");
        null != t && "" != t && null != t ? this.setData({
            passempty: "",
            modalPass: "DialogModal1"
        }) : (this.ShowTip("请先登录", 2), this.setData({
            login: ""
        }));
    },
    userIn: function() {
        var t = wx.getStorageSync("frUserInfo");
        if (null != t && "" != t && null != t) {
            var e = this;
            a.getUserCommet({
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
    PrivatePackge: function() {
        var t = wx.getStorageSync("frUserInfo");
        null != t && "" != t && null != t ? (D = 1, this.GetPrivateList()) : this.ShowTip("请先登录", 2);
    },
    DataEdit: function() {
        this.ShowData();
    },
    CompareData: function() {
        var t = wx.getStorageSync("frUserInfo");
        null != t && "" != t && null != t ? (D = 3, this.GetPrivateList(), this.setData({
            PrivatePackage: "DialogModal1"
        })) : this.ShowTip("请先登录", 2);
    },
    getUserProfile: function(t) {
        var a = this;
        wx.getUserProfile({
            desc: "用于完善会员资料",
            success: function(t) {
                wx.getStorageSync("fropenid");
                var e = {
                    nickname: t.userInfo.nickName,
                    avatarUrl: t.userInfo.avatarUrl
                };
                wx.setStorageSync("WxUserInfobyfr", e), a.setData({
                    loginName: "DialogModal1"
                });
            },
            fail: function(t) {
                wx.showModal({
                    title: "警告",
                    content: "您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!",
                    showCancel: !1,
                    confirmText: "返回授权",
                    success: function(t) {
                        t.confirm;
                    }
                });
            }
        });
    },
    getPhoneNumber: function(t) {
        var a = t.detail.encryptedData, e = t.detail.iv;
        if ("getPhoneNumber:fail user deny" == t.detail.errMsg) this.ShowTip("您拒绝授权！", 2); else {
            var s = wx.getStorageSync("fropenid").result;
            if (this.OnLoading("登陆中"), null == s || "" == s || null == s) return void this.GetOpenID(e, a);
            this.GetPrivatePhone(s, e, a);
        }
    },
    GetOpenID: function(t, e) {
        var s = this;
        wx.login({
            success: function(i) {
                i.code && a.UserGetComent("/User/author?code=" + i.code, function(a) {
                    200 == a.code && (wx.setStorageSync("fropenid", a.data), s.GetPrivatePhone(a.data.result, t, e));
                }, function(t) {
                    s.ShowTip(t, 2);
                });
            }
        });
    },
    GetPrivatePhone: function(t, e, s) {
        var i = wx.getStorageSync("WxUserInfobyfr"), r = this;
        a.Post("/User/descriptdata", {
            openID: t,
            iv: e,
            data: s,
            picurl: i.avatarUrl,
            nickname: i.nickname
        }, function(t) {
            r.CloseTip(), 200 == t.code && (wx.setStorageSync("frUserInfo", t.data), r.setData({
                token: t.data,
                userLogo: "" == t.data.logoPath ? i.avatarUrl : t.data.logoPath,
                usernickName: null == t.data.name ? i.nickname : t.data.name,
                login: "login"
            }), r.hideModal());
        }, function(t) {});
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
            fruserLogin: null,
            editCard: "",
            morecardshow: "",
            konwpass: "",
            cardtexteshow: "",
            analysingdata: "",
            senseresolve: "",
            aboutus: ""
        }), null != this.progressView2 && this.progressView2.setHide(!0);
    },
    InitBlueToolth: function() {
        var t = this;
        if (s.Inited()) s.CheckEvroment(this); else {
            var a = [];
            this.data.bleItem = [], s.startScanBle({
                success: function(e) {
                    if (0 == (a = t.data.bleItem).length) a.push(e), t.setData({
                        bleItem: a
                    }); else {
                        for (var s = !1, i = 0; i < a.length; i++) (a[i].deviceId = e.deviceId) && (s = !0);
                        s || (a.push(e), t.setData({
                            bleItem: a
                        }));
                    }
                },
                fail: function(t) {}
            });
        }
    },
    CloseBlueToolth: function() {
        var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        s.disconnect(), s.connected() || t && this.ShowTip("蓝牙关闭", 2), s.setBlueName("", ""), 
        this.setData({
            bluetools: "",
            bluetoolName: s.getBlueName(),
            bluetoolUID: s.getBlueUID(),
            disbtn: ""
        });
    },
    frAccountlogin: function() {
        this.setData({
            fruserLogin: "DialogModal1"
        });
    },
    LoginAccount: function(t) {
        var s = this, i = t.detail.value.username, r = e.jsencrypt(t.detail.value.password);
        this.OnLoading("登陆中"), a.UserGetComent("/user/login?account=" + i + "&password=" + r, function(t) {
            s.CloseTip(), 200 == t.code ? (wx.setStorageSync("frUserInfo", t.data), s.setData({
                userLogo: t.data.logoPath,
                usernickName: t.data.name,
                login: "login"
            }), s.setData({
                token: t.data
            }), s.hideModal()) : s.ShowTip(t.message, 2);
        }, function(t) {});
    },
    OnLoading: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "正在加载", a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "progressline";
        this.ShowTip(t, 3, a, 0);
    },
    HideLoading: function() {
        this.CloseTip();
    },
    GetPrivateList: function() {
        var t = wx.getStorageSync("frUserInfo");
        if (null != t && "" != t && null != t) {
            this.OnLoading();
            var e = this, s = wx.getStorageSync("fropenid"), i = this.data.alreadyreadid;
            a.getcoment1({
                url: "/PrivateKey/list?userID=" + t.id + "&pageindex=1&pagesize=50",
                Authorization: t.token
            }, function(t) {
                if (e.HideLoading(), 200 == t.code) {
                    if (0 == t.data.list.length) return void e.ShowTip("卡包为空", 1);
                    for (var r = t.data.list, n = [], o = e.data.addressdata, d = 0; d < r.length; d++) {
                        for (var h = "", c = "", l = "", u = "", g = "", p = "", f = 0; f < o.length; f++) if (r[d].provinceID == parseInt(o[f].code)) {
                            h = o[f].text, u = r[d].provinceID;
                            for (var b = 0; b < o[f].children.length; b++) if (r[d].cityID == parseInt(o[f].children[b].code)) {
                                c = o[f].children[b].text, g = r[d].cityID;
                                for (var m = 0; m < o[f].children[b].children.length; m++) if (r[d].areaID == parseInt(o[f].children[b].children[m].code)) {
                                    l = o[f].children[b].children[m].text, p = r[d].areaID;
                                    break;
                                }
                                break;
                            }
                            break;
                        }
                        0 != i && r[d].id == i || n.push({
                            province: h,
                            city: c,
                            area: l,
                            pcode: u,
                            ccode: g,
                            acode: p,
                            name: r[d].name,
                            id: r[d].id
                        });
                    }
                    e.setData({
                        ArrayList2: n
                    });
                } else 401 == t.code && a.UserGetComent("/user/openidlogin?openID=" + s.result, function(t) {
                    200 == t.code && (wx.setStorageSync("frUserInfo", t.data), e.setData({
                        token: t.data
                    }), e.GetPrivateList());
                }, function(t) {});
            }, function(t) {
                e.ShowTip(t, 2);
            });
        } else this.ShowTip("请先登陆", 2);
    },
    logOut: function() {
        this.setData({
            login: "",
            userLogo: "/images/tabbar/about.png",
            carddataname: {
                isloginshow: "None",
                cardNamep: ""
            }
        }), wx.removeStorageSync("frUserInfo");
    },
    UpdatePass: function() {
        this.setData({
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
        }), this.progressView2 = this.selectComponent("#progressView2"), this.progressView2.drawProgressBar(10, 100), 
        this.progressView2.setHide(!1), this.WriteToEQ(this.updatea1());
    },
    updatea1: function() {
        u = 0, g = 1;
        var t = (l.dataPath.length / 2).toString(16), a = (p = Math.ceil(l.dataPath.length / 3986)).toString(16), e = (mt(r.Update_Data), 
        "130005" + m + ft(l.version.toString(16), 8) + ft(t, 8) + ft(l.keyCRC.toString(16), 4) + ft(a, 4));
        return b = "05", e;
    },
    updatea2: function() {
        var t = Math.ceil(u / l.dataPath.length * 100);
        this.progressView2.drawProgressBar(t, 100);
        var a = l.dataPath.length - u;
        a = a >= 3986 ? 3986 : a;
        var e = l.dataPath.substring(u, u + a), s = ft((e.length / 2 + 7).toString(16), 4) + "05" + ft(g.toString(16), 4) + e;
        return u += a, g++, b = "052", s;
    },
    SetIsLifeUpdate: function(t) {
        var a = this;
        V = setTimeout(function() {
            a.hideModal(), wx.setKeepScreenOn({
                keepScreenOn: !1
            }), wx.showModal({
                title: "升级错误",
                content: "升级失败，请移动蓝牙与设备的距离重试，是否重新开始",
                success: function(t) {
                    t.confirm ? (a.UpdateView(), a.updatea1()) : a.ShowTip("取消成功", 1);
                }
            });
        }, t);
    },
    ClearTimer: function() {
        null != V && clearTimeout(V);
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
    bleStateListener: function(t) {
        switch (t) {
          case i.STATE_DISCONNECTED:
            this.ShowTip("蓝牙断开连接", 2), s.setBlueName("", ""), this.setData({
                bluetools: "",
                bluetoolName: s.getBlueName(),
                bluetoolUID: s.getBlueUID(),
                disbtn: ""
            }), s.clear();
            break;

          case i.STATE_SCANNING:
            this.ShowTip("正在扫描", 3);
            break;

          case i.STATE_SCANNED:
            this.setData({
                disbtn: ""
            });
            break;

          case i.STATE_CONNECTING:
            this.SetConnnectBlueToolsError("", "none");
            break;

          case i.STATE_CONNECTED:
            this.setData({
                bluetoolAtten: "正在开启服务,请稍后。。。"
            });
            break;

          case i.STATE_CONNECTING_ERROR:
            this.setData({
                bluetoolName: "",
                bluetools: ""
            }), this.SetConnnectBlueToolsError("连接失败,请重新连接"), s.clear();
            break;

          case i.STATE_NOTIFY_SUCCESS:
            this.setData({
                bluetoolAtten: "开启成功,配置中,请稍后。。。"
            }), this.StartHighConnect();
            break;

          case i.STATE_NOTIFY_FAIL:
            this.setData({
                bluetoolName: "",
                bluetools: "",
                bleItem: []
            }), this.SetConnnectBlueToolsError("连接失败,请重新连接"), s.clear();
            break;

          case i.STATE_CLOSE_BLE:
            pt(i.NOT_BLE), setTimeout(function() {
                s.Inited() && s.initblue();
            }, 5e3);
            break;

          case i.STATE_NOTBLE_WCHAT_VERSION:
            pt(i.NOT_PERMISSION2);
            break;

          case i.STATE_NOTBLE_SYSTEM_VERSION:
            pt(i.NOT_PERMISSION1);
            break;

          case i.STATE_INIT_SUCCESS:
            f || (f = !0, s.connectBle(v)), this.startScanBle();
        }
    },
    startScanBle: function() {
        var t = this;
        s.initThis(t), s.Inited() && s.initblue();
        var a = [];
        this.setData({
            bleItem: a,
            disbtn: "true"
        }), s.startScanBle({
            success: function(e) {
                (a = t.data.bleItem).push(e), t.setData({
                    bleItem: a
                });
            }
        });
    },
    konwpass: function() {
        this.setData({
            konwpass: "show",
            konwarray: []
        });
    },
    OnclickRidio: function(t) {
        var a = t.currentTarget.dataset;
        s.connected() ? (s.setBlueName(a.name, a.deviceId), this.setData({
            bluetools: "show",
            bluetoolAtten: "正在连接蓝牙,请稍后。。。",
            bluetoolName: s.getBlueName(),
            bluetoolUID: s.getBlueUID()
        }), s.Inited() ? (s.initThis(this), s.initblue(), v = a.deviceId, f = !1) : s.connectBle(a.deviceId)) : this.ShowTip("蓝牙已连接", 1);
    },
    StartHighConnect: function() {
        this.WriteToEQ(r.even_meet_one), b = "01";
    },
    notifyListener: function(t) {
        this.DeleteTimeoutTimer();
        var e, s = this;
        k += (e = t, Array.prototype.map.call(new Uint8Array(e), function(t) {
            return ("00" + t.toString(16)).slice(-2);
        }).join(""));
        var i = d.decrypt(t), n = i.substring(0, 4);
        if (w && (T = parseInt(n[2] + n[3] + n[0] + n[1], 16), w = !1), !(k.length < 2 * T)) {
            var o = new Uint8Array(k.match(/[\da-f]{2}/gi).map(function(t) {
                return parseInt(t, 16);
            })).buffer, h = new Uint8Array(o);
            switch (i = d.decrypt(h), w = !0, ot = 0, k = new Array(), b) {
              case "01":
                if ("1" == i.charAt(5)) {
                    U = i.substring(24, 32);
                    t = r.even_meet_two + U;
                    this.WriteToEQ(t), b = "012";
                }
                break;

              case "012":
                "1" == i.charAt(5) ? (this.ShowTip("服务开启成功", 1), this.setData({
                    bluetools: "",
                    PageCur: "Decode",
                    disbtn: "true",
                    isbackbutton: !0,
                    bleItem: []
                }), ht = 0, this.WriteToEQ("050006"), b = "06") : this.StartHighConnect();
                break;

              case "06":
                var c = i.substring(18, 22);
                m = c;
                var u = c.charAt(2) + c.charAt(3) + c.charAt(0) + c.charAt(1), f = i.substring(22, 30), D = f.charAt(6) + f.charAt(7) + f.charAt(4) + f.charAt(5) + f.charAt(2) + f.charAt(3) + f.charAt(0) + f.charAt(1), v = i.substring(10, 18), P = i.substring(46, 70), E = "A1B2";
                this.setData({
                    oldVersion: parseInt(D, 16),
                    oldversiondata: {
                        macID: v,
                        sid: u,
                        snCode: P
                    }
                }), a.UpdateVersion("/Version/binupdatewechat?sid=" + u + "&sncode=" + P + "&version=" + parseInt(D, 16) + "&key=" + E, function(t) {
                    if (200 == t.code) {
                        t.data.dataPath.length;
                        l = t.data, s.setData({
                            newversion: t.data.version,
                            description: t.data.description
                        });
                    } else l = null;
                }, function(t) {});
                break;

              case "05":
                "1" == i.charAt(5) && (this.WriteToEQ(this.updatea2()), this.SetIsLifeUpdate(2e4), 
                b = "052", wx.setKeepScreenOn({
                    keepScreenOn: !0
                }));
                break;

              case "052":
                if ("1" == i.charAt(5)) {
                    if (this.ClearTimer(), g > p) {
                        for (var O = 0; O < 10; O++) this.setData({
                            msgtext: "设备即将完成更新(" + (10 - (O + 1)) + ")"
                        }), Dt(1e3);
                        return this.UpdateBtn(), wx.setKeepScreenOn({
                            keepScreenOn: !1
                        }), void this.UpdateLog();
                    }
                    this.WriteToEQ(this.updatea2()), this.SetIsLifeUpdate(2e4);
                }
                break;

              case "21":
                if ("1" == i.charAt(5) && ("04" == (y = i.substring(14, 16)) ? this.data.cardtypeonread = 0 : "02" == y && (this.data.cardtypeonread = 1), 
                nt = 0, this.setData({
                    carddata: {
                        ID: "(0x" + i.substring(6, 14) + ")",
                        Type: vt(this.data.fullcardtype, i.substring(14, 16)),
                        Hz: "13.56Mhz",
                        IntID: parseInt(kt(i.substring(6, 14)), 16),
                        cmd: "21"
                    }
                }), A = {
                    ID: i.substring(6, 14),
                    Type: i.substring(14, 18)
                }, I.push({
                    ID: "(0x" + i.substring(6, 14) + ")",
                    Type: vt(this.data.fullcardtype, i.substring(14, 16)),
                    Hz: "13.56Mhz",
                    IntID: parseInt(kt(i.substring(6, 14)), 16),
                    cmd: "21"
                })), q) return void ("1" == i.charAt(5) ? (it = 1, this.OnePassToMoreBlock(), F = !0, 
                this.setData({
                    isIC: !1,
                    isIC1: !1
                })) : this.ShowTip("未读取到IC卡", 2));
                this.HidCard();
                break;

              case "211":
                "1" == i.charAt(5) ? (this.ShowTip("读卡成功", 1), this.setData({
                    carddata: {
                        ID: "(0x" + i.substring(6, 14) + ")",
                        Type: vt(this.data.fullcardtype, i.substring(14, 16)),
                        Hz: "13.56Mhz",
                        IntID: parseInt(kt(i.substring(6, 14)), 16),
                        cmd: "21"
                    },
                    sensebtn: ""
                }), y = i.substring(14, 16), A = {
                    ID: i.substring(6, 14),
                    Type: i.substring(14, 18)
                }) : this.ShowTip("请放入ic卡", 2);
                break;

              case "26":
                "1" == i.charAt(5) ? this.ShowTip("初始化成功", 1) : this.ShowTip("初始化失败", 2);
                break;

              case "27":
                if ("1" == i.charAt(5)) {
                    console.log(i);
                    var N = i.substring(6, 10), M = parseInt(N.charAt(2) + N.charAt(3) + N.charAt(0) + N.charAt(1), 16), _ = i.substring(10, 18 * M * 2 + 10);
                    this.data.nownetpassarray = function(t, a) {
                        for (var e = new Array(), s = 0; s < a.length; s += 36) e.push(a.substring(s, s + 36));
                        var i = new Array();
                        for (s = 0; s < e.length; s++) i.push({
                            carid: e[s].substring(8, 12),
                            data: e[s]
                        });
                        var r = new Array(), n = new Array();
                        for (s = 0; s < i.length; s++) if (!n.includes(s)) {
                            n.push(s);
                            var o = new Array();
                            o.push(i[s]);
                            for (var d = 0; d < i.length; d++) n.includes(d) || i[s].carid == i[d].carid && (n.push(d), 
                            o.push(i[d]));
                            r.push(o);
                        }
                        var h = new Array(), c = a.substring(0, 8) + A.Type;
                        for (s = 0; s < r.length; s++) for (d = 0; d < r[s].length; d++) r[s].length >= d + 2 && d % 2 == 0 && h.push({
                            CMD: "06",
                            KeyWord: c + r[s][d].data.substring(10, 12) + r[s][d].data.substring(8, 10) + "01" + r[s][d].data.substring(12, 36) + r[s][d + 1].data.substring(12, 36),
                            Block: parseInt(parseInt(r[s][d].data.substring(8, 10), 16) / 4),
                            abpass: 60 == r[s][d].data.substring(10, 12) ? "0" : "1"
                        });
                        return h;
                    }(0, _), this.InitWebSocket();
                } else this.ShowTip("读取失败", 2);
                break;

              case "28":
                if ("1" == i.charAt(5)) {
                    this.data.cardtypeonread = 2, this.setData({
                        carddata: {
                            ID: "(0x" + kt(i.substring(8, 16)) + ")",
                            Type: "HD-H4100",
                            Hz: vt(this.data.fullhz, i.substring(6, 8)),
                            IntID: parseInt(kt(i.substring(8, 16)), 16),
                            cmd: "28"
                        },
                        idcardwriteinfo: {
                            id: i.substring(8, 16),
                            hz: i.substring(6, 8),
                            pcode: i.substring(16, 18)
                        }
                    });
                    this.data.idcardwriteinfo;
                    I.push({
                        ID: "(0x" + kt(i.substring(8, 16)) + ")",
                        Type: "HD-H4100",
                        Hz: vt(this.data.fullhz, i.substring(6, 8)),
                        IntID: parseInt(kt(i.substring(8, 16)), 16),
                        cmd: "28"
                    });
                }
                this.ICCard();
                break;

              case "29":
                if ("1" == i.charAt(5) && (this.setData({
                    carddata: {
                        ID: "(0x" + i.substring(6, 30) + ")",
                        Type: "HID",
                        cmd: "29"
                    }
                }), this.data.hidcardidwrite = i.substring(6, 30), I.push({
                    ID: "(0x" + i.substring(6, 30) + ")",
                    Type: "HID",
                    cmd: "29"
                })), 0 == I.length) return this.CloseTip(), this.FailBee(), this.ShowTip("未读到卡片", 2), 
                this.data.msgText.push({
                    time: Et(),
                    text: "未读到卡片",
                    type: 1
                }), this.setData({
                    msgText: this.data.msgText,
                    isWork: !1
                }), void this.ShowTipMessageOnFirstPage("未读到卡片");
                if (I.length > 1) {
                    this.CloseTip(), this.setData({
                        morecardshow: "show",
                        morecard: I
                    });
                    var H = this;
                    this.data.backwards = 10, this.setData({
                        backwards: this.data.backwards
                    }), lt = setInterval(function() {
                        H.setData({
                            backwards: H.data.backwards
                        }), H.data.backwards--, H.data.backwards <= 0 && ("21" == I[0].cmd ? (it = 1, F = !0, 
                        H.setData({
                            morecardshow: "",
                            carddata: I[0],
                            isIC: !1,
                            isIC1: !1,
                            iswritebtn: !1,
                            isEditBtn: !1,
                            isWork: !1
                        }), H.OnePassToMoreBlock(), H.OnLoading("即将开始解码"), H.ShowTipMessageOnFirstPage("开始解码！")) : (H.SucBee(), 
                        H.setData({
                            morecardshow: "",
                            carddata: I[0],
                            isIC: !0,
                            isIC1: !0,
                            iswritebtn: !1,
                            isWork: !1,
                            isEditBtn: !0
                        })), clearInterval(lt));
                    }, 1e3);
                } else "21" == this.data.carddata.cmd ? (it = 1, this.OnePassToMoreBlock(), F = !0, 
                this.setData({
                    isIC: !1,
                    isIC1: !1,
                    isEditBtn: !1
                }), this.ShowTipMessageOnFirstPage("开始解码！")) : (this.CloseTip(), this.SucBee(), 
                this.setData({
                    isIC: !0,
                    isIC1: !0,
                    iswritebtn: !1,
                    isEditBtn: !0,
                    isWork: !1
                }), this.ShowTipMessageOnFirstPage("读取完成！"));
                break;

              case "0F":
                break;

              case "09":
                this.AutoFindCard();
                break;

              case "10":
                "1" == i.charAt(5) && this.ReadEmptyBlock(C < 10 ? "0" + C : C);
                break;

              case "12":
                if ("1" == i.charAt(5)) {
                    E = "";
                    "04" == y ? E = i.substring(6, 14) : "02" == y && (E = i.substring(6, 26));
                    var K = wt(E);
                    t = new Array();
                    if (0 == S.length) {
                        for (O = 0; O < K.length; O++) {
                            var V = "formblickred";
                            E = "";
                            "1" == K.charAt(O) && (V = "formblickgreen", E = F ? "FFFFFFFFFFFF" : "000000000000"), 
                            t.push({
                                id: O,
                                area: parseInt(O / 4) < 10 ? "0" + parseInt(O / 4) : parseInt(O / 4),
                                block: O < 10 ? "0" + O : O,
                                r: V,
                                key: E,
                                release: K.charAt(O)
                            });
                        }
                        S = t;
                    } else {
                        t = S;
                        for (E = "", O = 0; O < K.length; O++) "1" == K.charAt(O) && (E = F ? "FFFFFFFFFFFF" : "000000000000", 
                        t[O].r = "formblickgreen", t[O].release = K.charAt(O), t[O].key = E);
                        S = t;
                    }
                    if (!F) {
                        this.InitCardDataText(2 * S.length);
                        o = new Array();
                        var j = 0;
                        for (O = 0; O < S.length; O++) O % 2 == 0 ? (o.push({
                            id: j,
                            r: S[O].r,
                            r1: ""
                        }), j++) : o[O - j].r1 = S[O].r;
                        if (this.CloseTip(), this.setData({
                            imglist: o,
                            hhlist: this.data.hzlist,
                            index: "decode"
                        }), C = 0, Tt()) {
                            if (q) return void this.FormartData();
                            this.setData({
                                isWork: !1
                            }), this.data.allTextData = [], this.PassMakeBlock(), this.OnLoading("数据读取中,请稍后..", "progresslineshow"), 
                            this.ShowTipMessageOnFirstPage("解码完成,读取数据！");
                        } else this.SetProgress(), this.data.isconnectnet ? this.FindCard() : this.FullCounter(), 
                        this.InsertData();
                    }
                } else "2" == i.charAt(5) && this.ShowTip("请放入卡片", 2);
                if (rt < this.data.konwarray.length) return it = 1, F = !0, void this.OnePassToMoreBlock();
                F && (it = 2, this.OnePassToMoreBlock()), F = !1;
                break;

              case "121":
                if ("1" == i.charAt(5)) {
                    E = "";
                    "04" == y ? E = i.substring(6, 14) : "02" == y && (E = i.substring(6, 26));
                    K = wt(E);
                    var Z = this.data.imglist;
                    for (O = 0; O < K.length; O++) "1" == K.charAt(O) && (S[O].key = st, S[O].release = K.charAt(O), 
                    O % 2 == 0 ? Z[parseInt(O / 2)].r = "formblickgreen" : Z[parseInt(O / 2)].r1 = "formblickgreen", 
                    this.setData({
                        imglist: Z
                    }));
                }
                this.OnePassToAllBlock();
                break;

              case "13":
                Z = this.data.imglist;
                if ("1" == i.charAt(5)) {
                    if (this.data.totalstatic = 0, S[Q].key = i.substring(6, 18), S[Q].release = i.charAt(5), 
                    Q % 2 == 0 ? parseInt(Q / 2) < Z.length && (Z[parseInt(Q / 2)].r = "formblickgreen") : parseInt(Q / 2) < Z.length && (Z[parseInt(Q / 2)].r1 = "formblickgreen"), 
                    this.setData({
                        imglist: Z
                    }), this.SetProgress(), Tt()) return q ? (clearInterval($), this.OnLoading("格式化中"), 
                    this.setData({
                        msgText: []
                    }), void this.FormartData()) : (clearInterval($), this.setData({
                        msgText: []
                    }), this.data.allTextData = [], this.PassMakeBlock(), void this.OnLoading("数据读取中,请稍后..", "progresslineshow"));
                    Y ? 4 == L ? this.NestedABlockToBBlock() : 2 == L && this.ABlockToBBlock() : (W = [], 
                    z = 0, 0 == L ? this.passTest() : this.GetAllTemPass());
                } else (5 != L || this.data.staticindex >= this.data.totalstatic) && (Q % 2 == 0 ? "1" != S[Q].release && parseInt(Q / 2) < Z.length && (Z[parseInt(Q / 2)].r = "formblickred") : "1" != S[Q].release && parseInt(Q / 2) < Z.length && (Z[parseInt(Q / 2)].r1 = "formblickred")), 
                this.setData({
                    imglist: Z
                }), Y ? this.ABlockToBBlock() : 0 == L ? this.passTest() : (z >= W.length - 1 && (z = 0, 
                W = [], !1), this.GetAllTemPass());
                break;

              case "14":
                H = this, Z = this.data.imglist;
                if ("1" == i.charAt(5)) {
                    var J = i.substring(6, 2 * T - 4);
                    this.data.nownetpassarray.push({
                        CMD: "05",
                        KeyWord: J,
                        Block: 4 * parseInt(Q / 2),
                        abpass: Q % 2
                    });
                } else Q % 2 == 0 ? Z[parseInt(Q / 2)].r = "formblickred" : Z[parseInt(Q / 2)].r1 = "formblickred", 
                this.setData({
                    imglist: Z
                });
                this.HalfCounter();
                break;

              case "30":
                H = this, Z = this.data.imglist;
                if ("1" == i.charAt(5)) {
                    var X = i.substring(6, 2 * T - 4);
                    console.log(X), this.data.nownetpassarray.push({
                        CMD: "0A",
                        KeyWord: X,
                        Block: 4 * parseInt(Q / 2),
                        abpass: Q % 2
                    });
                } else Q % 2 == 0 ? Z[parseInt(Q / 2)].r = "formblickred" : Z[parseInt(Q / 2)].r1 = "formblickred", 
                this.setData({
                    imglist: Z
                });
                this.NestedCounter();
                break;

              case "32":
                H = this, Z = this.data.imglist;
                if ("1" == i.charAt(5)) {
                    J = i.substring(6, 2 * T - 4);
                    this.data.nownetpassarray.push({
                        CMD: "0C",
                        KeyWord: J,
                        Block: 4 * parseInt(Q / 2),
                        abpass: Q % 2
                    }), this.data.staticattak = Q;
                } else Q % 2 == 0 ? Z[parseInt(Q / 2)].r = "formblickred" : Z[parseInt(Q / 2)].r1 = "formblickred", 
                this.setData({
                    imglist: Z
                });
                this.StaticNestedCounter();
                break;

              case "15":
                H = this, Z = this.data.imglist;
                if ("1" == i.charAt(5)) {
                    var tt = i.substring(6, 2 * T - 4);
                    this.data.nownetpassarray.push({
                        CMD: "04",
                        KeyWord: tt,
                        Block: 4 * parseInt(Q / 2),
                        abpass: Q % 2
                    });
                } else Q % 2 == 0 ? Z[parseInt(Q / 2)].r = "formblickred" : Z[parseInt(Q / 2)].r1 = "formblickred", 
                this.setData({
                    imglist: Z
                });
                this.FullCounter();
                break;

              case "16":
                var at = parseInt(R / 2);
                if ("1" == i.charAt(5)) {
                    var et = wt(i.substring(6, 10));
                    for (M = at < 32 ? 4 : et.length, O = 0; O < M; O++) this.data.formartarrayblock.push({
                        block: at,
                        code: et[O],
                        index: O
                    });
                }
                this.FormartData();
                break;

              case "17":
                var dt = parseInt(G / 2);
                if ("1" == i.charAt(5)) {
                    var ut = i.substring(0, 4), gt = (M = parseInt(ut.charAt(2) + ut.charAt(3) + ut.charAt(0) + ut.charAt(1), 16), 
                    wt(i.substring(6, 10)));
                    E = "";
                    E = dt > 31 ? i.substring(10, 522) : i.substring(10, 138), 0 == dt && this.UploadNewKey(i);
                    var pt = E.substring(E.length - 32, E.length), ft = (t = E.substring(0, E.length - 32), 
                    pt.substring(12, 20)), bt = t + S[2 * dt].key + ft + S[2 * dt + 1].key, mt = 0;
                    for (O = 0; O < bt.length; O += 32) this.data.allTextData.push({
                        id: St(dt > 31 ? parseInt(128 + 16 * (dt - 32) + mt) : parseInt(4 * dt + mt)),
                        textarray: xt(bt.substring(O, O + 32)),
                        block: St(parseInt(dt)),
                        isedit: !0,
                        backcolor: dt > 31 ? (mt + 1) % 16 == 0 ? "bg-grey" : "" : (mt + 1) % 4 == 0 ? "bg-grey" : "",
                        comparebackcolor: "",
                        iscompare: !1,
                        isdataright: gt.charAt(O),
                        alltext: bt.substring(O, O + 32)
                    }), mt++;
                } else if (index > 31) for (O = 0; O < 16; O++) this.data.allTextData.push({
                    id: St(parseInt(4 * dt + O)),
                    textarray: 15 == O ? [ "FF", "FF", "FF", "FF", "FF", "FF", "FF", "07", "80", "69", "FF", "FF", "FF", "FF", "FF", "FF" ] : [ "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00" ],
                    block: St(parseInt(dt)),
                    isedit: !0,
                    backcolor: (mt + 1) % 16 == 0 ? "bg-grey" : "",
                    comparebackcolor: "",
                    iscompare: !1
                }), mt++; else for (O = 0; O < 4; O++) this.data.allTextData.push({
                    id: St(parseInt(4 * dt + O)),
                    textarray: 3 == O ? [ "FF", "FF", "FF", "FF", "FF", "FF", "FF", "07", "80", "69", "FF", "FF", "FF", "FF", "FF", "FF" ] : [ "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00" ],
                    block: St(parseInt(dt)),
                    isedit: !0,
                    backcolor: (mt + 1) % 4 == 0 ? "bg-grey" : "",
                    comparebackcolor: "",
                    iscompare: !1
                }), mt++;
                this.setData({
                    allTextData: this.data.allTextData
                }), this.PassMakeBlock(), this.setData({
                    datascrolls: "datascroll"
                });
                break;

              case "1D":
                if ("1" == i.charAt(5)) x = !0, ct[C] = {
                    id: St(C),
                    textarray: xt(i.substring(6, 38)),
                    block: St(parseInt(C / 4))
                }, C >= 2 * S.length - 1 && this.setData({
                    allTextData: ct
                }), this.FindCard(); else if (!x) if (C < 3) this.FindCard(); else {
                    H = this;
                    a.getcoment("/Key/list?cardtype=" + A.Type + "&cardID=" + A.ID + "&pageindex=1&pagesize=100", function(t) {
                        200 == t.code && (B = t.data, H.passTest());
                    }, function(t) {});
                }
                C++;
                break;

              case "1E":
                "1" == i.charAt(5) && this.WriteCardData2();
                break;

              case "1F":
                this.setData({
                    iswritebtn: !1,
                    isEditBtn: !1
                }), this.CloseTip(), "1" == i.charAt(5) ? (this.ShowTip("写卡成功", 1), this.SucBee()) : (this.ShowTip("写卡失败", 2), 
                this.FailBee());
                break;

              case "2D":
              case "2E":
                this.setData({
                    iswritebtn: !1
                }), this.CloseTip(), "1" == i.charAt(5) ? (this.ShowTip("写卡成功", 1), this.SucBee()) : (this.ShowTip("写卡失败", 2), 
                this.FailBee());
            }
        }
    },
    WriteToEQ: function(t) {
        if (J) this.DeleteTimeoutTimer(); else {
            if (ot >= 2) return this.CloseTip(), this.ShowTip("指令失败,请重试", 2), this.ShowTipMessageOnFirstPage("指令失败,请重试"), 
            this.setData({
                iswritebtn: !1,
                isEditBtn: !1
            }), "13" == b && this.StopCmd(), void (ot = 0);
            ot++;
            var a = this;
            this.DeleteTimeoutTimer(), H = "13" == b ? setInterval(function() {
                a.WriteToEQ(_);
            }, 4e4) : setInterval(function() {
                a.WriteToEQ(_);
            }, 3e4), _ = t;
            var e = this.ObtainCRC(t), i = d.encryption(e), r = Math.ceil(i.length / 40);
            if (r > 1) {
                for (var n = new Array(), o = new Array(), h = 0, c = 40, l = 0; l < r; l++) {
                    t = i.substring(h, h + c);
                    n.push(t), o.push(e.substring(h, h + c)), h += c, i.length - h < c && (c = i.length - h);
                }
                for (l = 0; l < n.length; l++) s.write(n[l]), Dt(15);
            } else s.write(i);
        }
    },
    ObtainCRC: function(t) {
        return function(t) {
            var a = t.length % 40;
            if (0 != a) {
                for (var e = "", s = 0; s < 40 - a; s++) e += "0";
                t += e;
            }
            return t;
        }(t += ft(n.CRC16(0, o.sys16TOArrayBuffer(t)).toString(16).toUpperCase(), 4));
    },
    PrivateCardInfoChange: function(t) {
        var e = this.data.ArrayList2[t.currentTarget.dataset.id], s = this;
        if (3 == D) {
            this.hideModal();
            var i = this.data.allTextData;
            this.data.compare1 = i;
            var r = this.data.compare1[0].alltext.substring(0, 8);
            a.getcoment("/PrivateKey/keydata?id=" + e.id, function(t) {
                200 == t.code && s.setData({
                    allTextData: Bt(s.data.compare1, At(t.data, !1, !0)),
                    iscompare: !0,
                    comparecard: {
                        card1: r,
                        card2: Ct(t.data)
                    },
                    iscomparebtn: !0,
                    clearcomparebtn: !1
                });
            }, function(t) {
                s.ShowTip("数据获取失败", 2);
            });
        }
    },
    PrivateCardInfoChange1: function(t) {
        var a = this.data.ArrayList2[t.currentTarget.dataset.id];
        K = a, this.setData({
            packgeID: t.currentTarget.dataset.id
        });
        var e = t.timeStamp;
        e - this.data.lastclicktime > 0 && e - this.data.lastclicktime < 300 && this.ChoosePrivateCard(), 
        this.data.lastclicktime = e;
    },
    ChoosePrivateCard: function() {
        var t = K;
        null != t && null != t && "" != t || (t = this.data.ArrayList2[0]), this.setData({
            PageCur: "Decode",
            index: "index",
            alreadyreadid: 0,
            carddataname: {
                isloginshow: "Flex",
                cardNamep: t.name
            },
            iswritebtn: !1,
            isEditBtn: !1
        });
        var e = this;
        a.getcoment("/PrivateKey/keydata?id=" + t.id, function(t) {
            if (200 == t.code) {
                t.data.data.substring(484, 486), t.data.data.substring(486, 488);
                e.setData({
                    carddata: {
                        ID: "(0x" + t.data.data.substring(488, 496) + ")",
                        Type: vt(e.data.fullcardtype, t.data.data.substring(484, 486)),
                        Hz: vt(e.data.fullhz, t.data.data.substring(486, 488)),
                        IntID: parseInt(kt(t.data.data.substring(488, 496)), 16),
                        cmd: "21"
                    }
                });
                var a = At(t.data, !0);
                e.setData({
                    allTextData: a,
                    iscompare: !1,
                    comparecard: {
                        card1: Ct(t.data)
                    }
                }), e.data.compare1 = a, e.data.writecarddata = t.data.data.substring(512, t.data.data.length);
            }
        });
    },
    EditPrivateCardName: function() {
        var t = K;
        null != t && null != t && "" != t || (t = this.data.ArrayList2[0]), this.data.nameinputText = "", 
        this.data.nameregioncode = [], this.setData({
            index: "editcardform",
            region: [ t.province, t.city, t.area ],
            cardName: t.name
        });
    },
    EditPrivateCardData: function() {
        var t = K;
        null != t && null != t && "" != t || (t = this.data.ArrayList2[0]), this.setData({
            PageCur: "Decode",
            index: "editcard",
            alreadyreadid: t.id
        });
        var e = this;
        a.getcoment("/PrivateKey/keydata?id=" + t.id, function(t) {
            if (200 == t.code) {
                var a = At(t.data, !0);
                e.setData({
                    allTextData: a,
                    iscompare: !1,
                    comparecard: {
                        card1: Ct(t.data)
                    }
                }), e.data.compare1 = a, e.data.writecarddata = t.data.data.substring(512, t.data.data.length);
            }
        }, function(t) {});
    },
    DeletePrivateCardP: function() {
        var t = K;
        null != t && null != t && "" != t || (t = this.data.ArrayList2[0]);
        var e = this;
        wx.showModal({
            title: "提示",
            content: "确认要删除" + t.name + "?",
            success: function(s) {
                s.confirm ? (e.ShowTip("正在删除,请稍后", 3), a.getcoment("/PrivateKey/delete?id=" + t.id, function(t) {
                    200 == t.code && (e.CloseTip(), e.GetPrivateList());
                }, function(t) {
                    e.ShowTip("删除失败", 2);
                })) : s.cancel;
            }
        });
    },
    oncardclick: function(t) {
        clearInterval(lt);
        var a = t.currentTarget.dataset.id, e = this.data.morecard[a];
        "21" == e.cmd ? (it = 1, F = !0, this.setData({
            isIC: !1,
            isIC1: !1,
            iswritebtn: !1,
            isEditBtn: !1,
            carddata: e
        }), this.OnePassToMoreBlock(), this.OnLoading("即将开始解码"), this.ShowTipMessageOnFirstPage("开始解码！")) : (this.SucBee(), 
        this.setData({
            isIC: !0,
            isIC1: !0,
            iswritebtn: !1,
            isEditBtn: !0,
            carddata: e
        })), this.setData({
            morecardshow: "",
            isWork: !1
        });
    },
    passTest: function() {
        L = 0;
        var t = function() {
            for (var t = new Array(), a = 0; a < B.total; a++) t.push(gt(B.list[a].data));
            return t;
        }();
        if (P >= S.length && E < t.length) return E++, P = 0, void this.passTest();
        if (0 != t.length && E < t.length) {
            for (var a = !1, e = P; e < S.length; e++) {
                var s = "";
                if ("1" != S[e].release) {
                    S[e].id % 2 == 0 ? (s = "0E0013" + bt(4 * parseInt(e / 2)) + "0001" + t[E][e], this.data.imglist[parseInt(e / 2)].r = "formblocck") : (s = "0E0013" + bt(4 * parseInt(e / 2)) + "0101" + t[E][e], 
                    this.data.imglist[parseInt(e / 2)].r1 = "formblocck"), this.setData({
                        imglist: this.data.imglist
                    }), Q = e, P++, a = !0, this.MorePassToOneBlock(s);
                    break;
                }
                P >= S.length && Tt() && (this.data.allTextData = [], this.PassMakeBlock()), P++;
            }
            if (P >= S.length && E < t.length && !a) return E++, P = 0, void this.passTest();
            E >= t.length && (Tt() || (this.setData({
                isWork: !1
            }), P = 0, It() ? this.FullCounter() : (N = 0, this.NestedCounter())));
        } else Tt() || (this.setData({
            isWork: !1
        }), P = 0, It() ? this.FullCounter() : (N = 0, this.NestedCounter()));
    },
    GetAllTemPass: function() {
        var t = this.data.netpassarray;
        this.data.totalnetdata = t.length;
        for (var a = !1, e = 0; e < t.length; e++) if (t[e].ISUse) a = !0; else {
            if (0 != t[e].BackData.length) {
                a = !1, t[e].ISUse = !0, W = [];
                for (var s = 0; s < t[e].BackData.length; s++) W.push({
                    key: t[e].BackData[s],
                    block: t[e].Block,
                    abpass: t[e].ABPass,
                    isuse: !1
                });
                break;
            }
            a = !0, 0 == t[e].ABPass ? this.data.imglist[t[e].Block / 4].r = "formblickred" : this.data.imglist[t[e].Block / 4].r1 = "formblickred", 
            this.setData({
                imglist: this.data.imglist
            });
        }
        a ? 1 == L ? this.FullCounter() : 4 == L ? this.NestedCounter() : 2 == L ? this.HalfCounter() : 5 == L && (this.data.staticindex > this.data.totalstatic ? (this.data.staticindex = 0, 
        this.data.totalstatic = 0, this.StaticNestedCounter()) : this.GetStaticPass()) : this.TestNetPass();
    },
    TestNetPass: function() {
        b = "13";
        for (var t = "", a = 0, e = z; e < W.length; e++) t += W[e].key, a++;
        var s = "13" + bt(W[0].block) + bt(W[0].abpass) + bt(a) + t, i = Ft(s.length);
        z += a, Q = parseInt(W[0].block / 4 * 2), 1 == W[0].abpass && (Q += 1), !0, this.WriteToEQ(i + s);
    },
    DeleteTimer: function() {
        requestupNum = 0, clearInterval(M), M = "";
    },
    DeleteTimeoutTimer: function() {
        clearInterval(H), H = "";
    },
    SetProgress: function() {
        for (var t = 0, a = 0; a < S.length; a++) "1" == S[a].release && t++;
        this.setData({
            speed: parseInt(t / S.length * 100)
        });
    },
    RemoveCompareData: function() {
        this.setData({
            allTextData: this.data.compare1,
            iscompare: !1,
            iscomparebtn: !1,
            clearcomparebtn: !0
        });
    },
    textEditbydata: function(t) {
        var a = t.currentTarget.dataset.value;
        this.data.edittextid = t.currentTarget.dataset.id, this.data.temptextdata = this.data.allTextData[this.data.edittextid].alltext, 
        this.setData({
            cardtexteshow: "show",
            carddatatextedit: Pt(a)
        });
    },
    cardatachangeinput: function(t) {
        this.data.temptextdata = t.detail.value;
    },
    SaveEditCardkeyData: function() {
        var t = this.data.temptextdata.replace(/ /g, "");
        if (t.length > 32 || t.length % 2 != 0) this.ShowTip("请输入正确的密匙", 2); else {
            var a = this.data.edittextid;
            this.data.allTextData[a].textarray = xt(t), this.data.allTextData[a].alltext = t, 
            this.setData({
                allTextData: this.data.allTextData
            }), this.hideModal();
        }
    },
    StopCmd: function() {
        J = !0, this.setData({
            isWork: !1,
            msgText: [],
            index: "index",
            iswritebtn: !0,
            isEditBtn: !0,
            isIC: !0,
            isIC1: !1,
            isbackbutton: !0
        }), Dt(1e3);
        for (var t = this.data.imglist, a = 0; a < t.length; a++) "formblocck" == t[a].r && (t[a].r = "formblickred"), 
        "formblocck" == t[a].r1 && (t[a].r1 = "formblickred");
        this.setData({
            imglist: t,
            msgText: []
        }), clearInterval($);
    },
    ShowData: function() {
        dt = this.data.index, this.setData({
            index: "editcard",
            isbackbutton: !1
        });
    },
    FormatData: function() {
        if (q = !0, s.connected()) return this.setData({
            PageCur: "EQ",
            isbackbutton: !1
        }), ht = 0, void this.ShowTip("请先连接蓝牙设备", 2);
        this.OnLoading("正在格式化"), wx.setKeepScreenOn({
            keepScreenOn: !0
        }), this.setData({
            speed: 0,
            imglist: []
        }), I = [], S = [], W = [], x = !1, !0, J = !1, P = 0, E = 0, this.ICCard();
    },
    sensecard: function() {
        this.setData({
            senseresolve: "show",
            sensebtn: !0,
            sensepassdata: []
        });
    },
    ICCardNum1: function() {
        if (s.connected()) return this.setData({
            PageCur: "EQ",
            isbackbutton: !1
        }), ht = 0, void this.ShowTip("请先连接蓝牙设备", 2);
        var t = this;
        c.iscounted() || c.ws_connect(function(a) {
            clearTimeout(j);
            var e = JSON.parse(a), s = new Array(), i = new Array();
            t.data.nownetpassarray = [], t.data.netpassarray = [];
            for (var r = 0; r < e.length; r++) {
                if ("06" != e[r].CMD) {
                    t.data.netpassarray = e, t.GetAllTemPass();
                    break;
                }
                for (var n = 0; n < e[r].BackData.length; n++) {
                    console.log(e[r].BackData[n]), -1 == s.indexOf(e[r].BackData[n]) && s.push(e[r].BackData[n]);
                    var o = {
                        block: parseInt(parseInt(e[r].Block) / 4) < 10 ? "0" + parseInt(parseInt(e[r].Block) / 4) : parseInt(parseInt(e[r].Block) / 4),
                        abpass: 0 == e[r].ABPass ? "A" : "B",
                        password: e[r].BackData[n]
                    };
                    -1 == i.findIndex(function(t) {
                        return t.block == o.block && t.abpass == o.abpass && t.passWord == o.passWord;
                    }) && i.push(o);
                }
                t.CloseTip();
            }
            t.setData({
                sensepassdata: i
            }), t.data.konwarray = s;
        }), this.OnLoading("读卡中"), b = "211";
        this.WriteToEQ("050021");
    },
    SenseCode: function() {
        this.OnLoading("初始化中"), this.setData({
            sensepassdata: []
        }), b = "26";
        var t = "12002601" + A.ID + function(t) {
            for (var a = new Array(), e = 0; e < t.length; e += 2) a.push(t.substring(e, e + 2));
            var s = new Array();
            for (e = 0; e < a.length; e++) s.push(parseInt(a[e], 16));
            var i = 0;
            for (e = 0; e < s.length; e++) i ^= s[e];
            return i.toString(16);
        }(A.ID) + "08" + A.Type + "00000000";
        this.WriteToEQ(t);
    },
    ReadSenseData: function() {
        this.OnLoading("侦测数据读取中"), b = "27";
        this.WriteToEQ("050027");
    },
    nameinputchange: function(t) {
        this.data.nameinputText = t.detail.value;
    },
    UpdatePrivateCardAddress: function() {
        var t = {
            id: K.id,
            provinceID: null == this.data.nameregioncode[0] ? K.pcode + "" : this.data.nameregioncode[0] + "",
            cityID: null == this.data.nameregioncode[1] ? K.ccode + "" : this.data.nameregioncode[1] + "",
            areaID: null == this.data.nameregioncode[2] ? K.acode + "" : this.data.nameregioncode[2] + "",
            name: "" == this.data.nameinputText ? K.name : this.data.nameinputText
        }, e = this;
        a.requestA({
            url: "/PrivateKey/update"
        }, t, function(t) {
            200 == t.code && (e.ShowTip("更新成功", 1), e.GetPrivateList(), e.backlist());
        }, function(t) {
            e.ShowTip(t, 2);
        });
    },
    bindRegionChange: function(t) {
        this.data.nameregioncode = t.detail.code, this.setData({
            region: t.detail.value
        });
    },
    SavePrivateCardData: function() {
        var t = wx.getStorageSync("frUserInfo");
        null != t && "" != t && null != t ? (this.data.nameinputText = "", this.data.nameregioncode = [], 
        this.setData({
            savecarddata: "show"
        })) : this.ShowTip("请先登录", 2);
    },
    AddNewPrivateCard: function() {
        var t = wx.getStorageSync("frUserInfo"), e = "", s = "";
        if ("" != this.data.nameinputText) {
            this.OnLoading("正在保存");
            var i = "", r = "01";
            if (this.data.iscompare) {
                s = this.data.compare1[0].alltext;
                for (var n = 0; n < this.data.compare1.length; n++) e += this.data.compare1[n].alltext;
            } else {
                s = this.data.allTextData[0].alltext;
                for (n = 0; n < this.data.allTextData.length; n++) e += this.data.allTextData[n].alltext;
            }
            var o = s.substring(12, 16);
            "0400" == o || "0200" == o ? (i = s.substring(0, 8), r = "0B") : r = vt(this.data.fullhz, e.substring(6, 8));
            var d = {
                userID: parseInt(t.id),
                account: t.account,
                provinceID: Ut(this.data.nameregioncode[0]) ? "440000" : this.data.nameregioncode[0] + "",
                cityID: Ut(this.data.nameregioncode[1]) ? "440100" : this.data.nameregioncode[1] + "",
                areaID: Ut(this.data.nameregioncode[2]) ? "440105" : this.data.nameregioncode[2] + "",
                name: this.data.nameinputText,
                cardID: i,
                cardRate: r,
                cardType: o,
                data: e
            }, h = this;
            a.requestA({
                url: "/PrivateKey/add"
            }, d, function(t) {
                200 == t.code && (h.ShowTip("添加成功", 1), h.setData({
                    savecarddata: ""
                }), this.CloseTip());
            }, function(t) {
                h.ShowTip(t, 2);
            });
        } else this.ShowTip("名字为空", 2);
    },
    cancelsave: function() {
        this.setData({
            savecarddata: ""
        });
    },
    InitWebSocket: function() {
        var t = this;
        clearTimeout(j), j = setTimeout(function() {
            t.InitWebSocket();
        }, 9e4), c.iscounted() ? c.sendMsg(this.data.nownetpassarray, function(t) {}) : c.ws_connect(function(a) {
            clearTimeout(j);
            var e = JSON.parse(a), s = new Array(), i = new Array();
            t.data.nownetpassarray = [], t.data.netpassarray = [];
            for (var r = 0; r < e.length; r++) if ("06" == e[r].CMD) {
                for (var n = 0; n < e[r].BackData.length; n++) s.push(e[r].BackData[n]), i.push({
                    block: parseInt(parseInt(e[r].Block) / 4) < 10 ? "0" + parseInt(parseInt(e[r].Block) / 4) : parseInt(parseInt(e[r].Block) / 4),
                    abpass: 0 == e[r].ABPass ? "A" : "B",
                    password: e[r].BackData[n]
                });
                t.CloseTip();
            } else {
                if ("0C" != e[r].CMD) {
                    t.data.netpassarray = e, t.GetAllTemPass();
                    break;
                }
                t.setData({
                    totalstatic: e[r].TotalLength,
                    staticnested: "flex"
                }), t.data.totalstatic > 0 && t.GetStaticPass();
            }
            t.setData({
                sensepassdata: i
            }), t.data.konwarray = s;
        });
    },
    GetStaticPass: function() {
        this.setData({
            staticindex: this.data.staticindex
        });
        var t = 200;
        this.data.staticindex + t >= this.data.totalstatic && (t = this.data.totalstatic - this.data.staticindex);
        var a = Nt(Mt(this.data.staticindex, 8)) + Nt(Mt(t, 4));
        this.data.nownetpassarray.push({
            CMD: "0D",
            KeyWord: a,
            Block: 4 * parseInt(this.data.staticattak / 2),
            abpass: this.data.staticattak % 2
        }), this.data.staticindex += t, this.InitWebSocket();
    },
    bindeditformatchage: function(t) {
        1 == t.detail.value ? this.setData({
            isten: !0
        }) : 2 == t.detail.value && this.setData({
            isten: !1
        });
    },
    bindeditcardidchange: function(t) {
        this.data.editcardID = t.detail.value;
    },
    bindeditcardhzChange: function(t) {
        this.setData({
            editcardhz: t.detail.value
        });
    },
    bindeditcardtypeChange: function(t) {
        this.data.hhlist = [], 2 == t.detail.value ? this.data.hhlist = this.data.hz1list : this.data.hhlist = this.data.hzlist, 
        this.setData({
            editcardtype: t.detail.value,
            hhlist: this.data.hhlist
        });
    },
    editcarddatasubmit: function() {
        if (this.data.isten) {
            var t = bt(parseInt(this.data.editcardID));
            if (t.length < 8) {
                for (var a = "", e = 0; e < 8 - t.length; e++) a += "0";
                t = a + t;
            }
            2 != this.data.editcardtype ? (t = kt(t), this.setData({
                editcarddata: {
                    id: t,
                    type: this.data.typelist[this.data.editcardtype],
                    hz: this.data.hhlist[this.data.editcardhz]
                }
            })) : this.setData({
                editcarddata: {
                    id: kt(t),
                    type: this.data.typelist[this.data.editcardtype],
                    hz: this.data.hhlist[this.data.editcardhz]
                }
            }), this.data.carddata.IntID = this.data.editcardID, this.data.carddata.ID = "(0x" + t.toLocaleUpperCase() + ")", 
            this.data.carddata.Hz = this.data.hhlist[this.data.editcardhz].name, this.data.carddata.Type = this.data.typelist[this.data.editcardtype].name;
        } else this.data.isten || (2 != this.data.editcardtype ? (this.data.carddata.ID = "(0x" + kt(this.data.editcardID).toLocaleUpperCase() + ")", 
        this.setData({
            editcarddata: {
                id: kt(this.data.editcardID).toLocaleUpperCase(),
                type: this.data.typelist[this.data.editcardtype],
                hz: this.data.hhlist[this.data.editcardhz]
            }
        })) : (this.data.carddata.ID = "(0x" + this.data.editcardID.toLocaleUpperCase() + ")", 
        this.setData({
            editcarddata: {
                id: kt(this.data.editcardID).toLocaleUpperCase(),
                type: this.data.typelist[this.data.editcardtype],
                hz: this.data.hhlist[this.data.editcardhz]
            }
        })), this.data.carddata.Hz = this.data.hhlist[this.data.editcardhz].name, this.data.carddata.Type = this.data.typelist[this.data.editcardtype].name, 
        this.data.carddata.IntID = parseInt(this.data.editcardID, 16));
        this.setData({
            carddata: this.data.carddata
        }), this.hideModal();
    },
    UploadNewKey: function(t) {
        for (var e = "", s = 0; s < S.length; s++) e += S[s].key;
        var i = kt(mt(e));
        if (e.length < 960) {
            var r = "";
            for (s = 0; s < 960 - e.length; s++) r += "0";
            e = e += r;
        }
        var n = t.substring(10, 42), o = "";
        for (s = 0; s < 28; s++) o += "0";
        var d = n + i + o + e, h = {
            number: n.substring(0, 8),
            type: y + "00",
            keycrc: i,
            data: d
        };
        a.requestA({
            url: "/Key/add"
        }, h, function(t) {
            t.code;
        }, function(t) {});
    },
    hideModal1: function() {
        this.setData({
            attensioninfo: {
                show: "",
                text: "请点击对应的数据块，开始编辑 ",
                text1: "(此提示点击窗体自动消失)"
            }
        });
    },
    resolveData: function() {
        if ("" == this.data.writecarddata) for (var t = 0; t < this.data.allTextData.length; t++) this.data.writecarddata += this.data.allTextData[t].alltext;
        var e = {
            data: this.data.writecarddata
        };
        this.OnLoading("分析中");
        var s = this;
        a.requestA({
            url: "/key/analysedata"
        }, e, function(t) {
            s.CloseTip(), 200 == t.code && (0 == t.data.length && (t.data = [ "暂时无分析数据" ]), 
            s.setData({
                analysingdata: "show",
                analysingarray: t.data
            }));
        }, function(t) {
            s.ShowTip(t, 2);
        });
    },
    ModifyUserPassWord: function(t) {
        var e = this;
        if (t.detail.value.UmPass === t.detail.value.RmPass) {
            this.OnLoading("修改中。。");
            var s = wx.getStorageSync("frUserInfo"), i = {
                id: s.id,
                oldPass: t.detail.value.UserPass,
                newPass: t.detail.value.UmPass
            };
            a.request({
                url: "/User/updatepassword",
                Authorization: s.token
            }, i, function(t) {
                200 != t.code ? e.ShowTip(t.message, 2) : e.ShowTip(t.data, 1);
            }), e.hideModal();
        } else e.ShowTip("新密码输入不一致", 2);
    },
    ModifyUserInformation: function(t) {
        var e = this, s = wx.getStorageSync("frUserInfo");
        if (this.OnLoading("修改中.."), function(t) {
            if (!/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(t)) return !1;
            return !0;
        }(t.detail.value.email)) {
            var i = {
                id: s.id,
                name: t.detail.value.name,
                logoPath: "",
                sex: 1 == t.detail.value.sex ? 1 : 2,
                email: t.detail.value.email
            };
            a.request({
                url: "/User/update",
                Authorization: s.token
            }, i, function(a) {
                if (200 == a.code) return e.ShowTip(a.data, 1), void e.setData({
                    usernickName: t.detail.value.name
                });
                e.ShowTip(a.message, 2);
            }), e.hideModal();
        } else this.ShowTip("邮箱格式错误", 2);
    },
    editdatablock: function() {
        this.setData({
            attensioninfo: {
                show: "show",
                text: "请点击对应的数据块，开始编辑 ",
                text1: "(此提示点击窗体自动消失)"
            }
        });
    },
    SucBee: function() {
        b = "09";
        this.WriteToEQ("0700090102");
    },
    FailBee: function() {
        b = "09";
        this.WriteToEQ("0700090201");
    },
    AutoFindCard: function() {
        b = "0F";
        this.WriteToEQ("05000F");
    },
    AllPasswordAttack: function() {
        this.setData({
            Decode: "C"
        });
        var t = this;
        a.getcoment("/Key/passwordlist?pageindex=" + et + "&pagesize=10", function(a) {
            200 == a.code && (tt = a.data.list, t.OnePassToAllBlock());
        }, function(t) {});
    },
    OnePassToAllBlock: function() {
        b = "121";
        var t = "";
        this.AllPassUnlockblock(), at < tt.length ? ("04" == y ? t = "150012" + tt[at].passWord + "FFFFFFFF000000000000" : "02" == y && (t = "150012" + tt[at].passWord + "FFFFFFFFFFFFFFFFFFFF"), 
        st = tt[at].passWord, at++, this.WriteToEQ(t)) : (et++, at = 0, tt = [], this.AllPasswordAttack());
    },
    AllPassUnlockblock: function() {
        for (var t = 0, a = a; a < S.length; a++) if ("1" != S[a].release) {
            t = a;
            break;
        }
        this.data.imglist[t].r = "formblocck", this.setData({
            imglist: this.data.imglist
        });
    },
    UpdateLog: function() {
        a.UpdateVersion("/UpdateLog/add", {
            macID: this.data.oldversiondata.macID,
            snCode: this.data.oldversiondata.SnCode,
            sid: this.data.oldversiondata.sid,
            version: this.data.newversion
        }, function(t) {
            t.code;
        }, function(t) {});
    },
    AboutUs: function() {
        this.setData({
            aboutus: "show"
        });
    }
});