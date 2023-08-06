getApp();

Page({
    data: {
        speed: 90,
        ColorList: [ {
            title: "c",
            name: "D"
        } ],
        checkbox: [ {
            value: 0,
            name: "云睿解码"
        }, {
            value: 1,
            name: "云钥解码"
        }, {
            value: 2,
            name: "云格式化"
        }, {
            value: 3,
            name: "变色龙解码"
        }, {
            value: 4,
            name: "已知秘钥解码"
        }, {
            value: 5,
            name: "数据返回配匙"
        } ],
        gridCol: 3
    },
    onReady: function() {
        var e = this;
        wx.createSelectorQuery().select("#index-menu").boundingClientRect().exec(function(t) {
            e.setData({
                shortop: t[0].height
            });
        });
    },
    onLoad: function() {
        var e = this;
        setTimeout(function() {
            e.setData({
                loading: !0
            });
        }, 500);
    },
    ceshi: function() {
        console.log("ceshi s");
    }
});