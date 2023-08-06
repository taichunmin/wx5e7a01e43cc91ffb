getApp();

var t = require("config.js");

module.exports = {
    UserGetComent: function(e, n, o) {
        wx.request({
            url: t.server_user_url + e,
            header: {
                "content-type": "application/json;charset=UTF-8"
            },
            method: "GET",
            success: function(t) {
                n(t.data);
            },
            fail: function() {
                o("连接错误，请重试");
            }
        });
    },
    getcoment: function(e, n, o) {
        wx.request({
            url: t.icopyserver_url + e,
            header: {
                "content-type": "application/json;charset=UTF-8"
            },
            method: "GET",
            success: function(t) {
                n(t.data);
            },
            fail: function() {
                o("连接错误，请重试");
            }
        });
    },
    getcoment1: function(e, n, o) {
        var r = e.url, a = e.Authorization;
        wx.request({
            url: t.icopyserver_url + r,
            header: {
                "content-type": "application/json;charset=UTF-8",
                Authorization: a
            },
            method: "GET",
            success: function(t) {
                401 == t.statusCode ? n(t.data = {
                    code: 401
                }) : n(t.data);
            },
            fail: function() {
                o("连接错误，请重试");
            }
        });
    },
    request: function(e, n, o, r) {
        var a = e.url, u = e.Authorization;
        wx.request({
            url: t.server_user_url + a,
            header: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: u
            },
            data: JSON.stringify(n),
            method: "POST",
            success: function(t) {
                o(t.data);
            },
            fail: function() {
                r("连接错误，请重试");
            }
        });
    },
    requestA: function(e, n, o, r) {
        var a = e.url, u = e.Authorization;
        wx.request({
            url: t.icopyserver_url + a,
            header: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: u
            },
            data: JSON.stringify(n),
            method: "POST",
            success: function(t) {
                o(t.data);
            },
            fail: function() {
                r("连接错误，请重试");
            }
        });
    },
    uploadFile: function(e, n, o) {
        wx.uploadFile({
            url: t.icopyserver_url + e,
            data: n,
            success: function(t) {
                console.log(t);
                var e = JSON.parse(t.data);
                worksImgs.push(e.data.url), that.setData({
                    worksImgs: worksImgs
                });
            },
            fail: function(t) {
                o(t);
            }
        });
    },
    Post: function(e, n, o, r) {
        wx.request({
            url: t.server_user_url + e,
            data: JSON.stringify(n),
            method: "POST",
            success: function(t) {
                o(t.data);
            },
            fail: function() {
                r("连接错误，请重试");
            }
        });
    },
    UpdateVersion: function(e, n, o) {
        wx.request({
            url: t.server_update_url + e,
            header: {
                "content-type": "application/json;charset=UTF-8"
            },
            method: "GET",
            success: function(t) {
                n(t.data);
            },
            fail: function() {
                o("连接错误，请重试");
            }
        });
    },
    getUserCommet: function(e, n, o) {
        var r = e.url, a = e.Authorization;
        wx.request({
            url: t.server_user_url + r,
            header: {
                "content-type": "application/json;charset=UTF-8",
                Authorization: a
            },
            method: "GET",
            success: function(t) {
                401 == t.statusCode ? n(t.data = {
                    code: 401
                }) : n(t.data);
            },
            fail: function() {
                o("连接错误，请重试");
            }
        });
    }
};