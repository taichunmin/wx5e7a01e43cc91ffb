getApp();

var t = require("config.js");

module.exports = {
    UserGetComent: function(e, n, a) {
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
                a("连接错误，请重试");
            }
        });
    },
    getcoment: function(e, n, a) {
        wx.request({
            url: t.amiiboserver_url + e,
            header: {
                "content-type": "application/json;charset=UTF-8"
            },
            method: "GET",
            success: function(t) {
                n(t.data);
            },
            fail: function() {
                a("连接错误，请重试");
            }
        });
    },
    getcoment1: function(e, n, a) {
        var o = e.url, r = e.Authorization;
        wx.request({
            url: t.amiiboserver_url + o,
            header: {
                "content-type": "application/json;charset=UTF-8",
                Authorization: r
            },
            method: "GET",
            success: function(t) {
                401 == t.statusCode ? n(t.data = {
                    code: 401
                }) : n(t.data);
            },
            fail: function() {
                a("连接错误，请重试");
            }
        });
    },
    request: function(e, n, a, o) {
        var r = e.url, u = e.Authorization;
        wx.request({
            url: t.server_user_url + r,
            header: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: u
            },
            data: JSON.stringify(n),
            method: "POST",
            success: function(t) {
                a(t.data);
            },
            fail: function() {
                o("连接错误，请重试");
            }
        });
    },
    requestA: function(e, n, a, o) {
        var r = e.url, u = e.Authorization;
        wx.request({
            url: t.amiiboserver_url + r,
            header: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: u
            },
            data: JSON.stringify(n),
            method: "POST",
            success: function(t) {
                a(t.data);
            },
            fail: function() {
                o("连接错误，请重试");
            }
        });
    },
    uploadFile: function(e, n, a) {
        wx.uploadFile({
            url: t.amiiboserver_url + e,
            data: n,
            success: function(t) {
                console.log(t);
                var e = JSON.parse(t.data);
                worksImgs.push(e.data.url), that.setData({
                    worksImgs: worksImgs
                });
            },
            fail: function(t) {
                a(t);
            }
        });
    },
    Post: function(e, n, a, o) {
        wx.request({
            url: t.server_user_url + e,
            data: JSON.stringify(n),
            method: "POST",
            success: function(t) {
                a(t.data);
            },
            fail: function() {
                o("连接错误，请重试");
            }
        });
    },
    UpdateVersion: function(e, n, a) {
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
                a("连接错误，请重试");
            }
        });
    },
    getUserCommet: function(e, n, a) {
        var o = e.url, r = e.Authorization;
        wx.request({
            url: t.server_user_url + o,
            header: {
                "content-type": "application/json;charset=UTF-8",
                Authorization: r
            },
            method: "GET",
            success: function(t) {
                401 == t.statusCode ? n(t.data = {
                    code: 401
                }) : n(t.data);
            },
            fail: function() {
                a("连接错误，请重试");
            }
        });
    }
};