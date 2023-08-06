var o = null, n = !1;

module.exports.ws_connect = function(e) {
    (o = wx.connectSocket({
        url: "wss://47.92.79.178:17850",
        header: {
            "content-type": "application/json"
        }
    })).onOpen(function(o) {
        n = !0, console.log("监听 WebSocket 连接打开事件。", o);
    }), o.onClose(function(o) {
        n = !1, console.log("监听 WebSocket 连接关闭事件。", o);
    }), o.onError(function(o) {
        n = !1, console.log("监听 WebSocket 错误。错误信息", o);
    }), o.onMessage(function(o) {
        e(o.data);
    });
}, module.exports.sendMsg = function(e, t) {
    n && o.send({
        data: JSON.stringify(e)
    }, function(o) {
        t(o);
    });
}, module.exports.iscounted = function() {
    return n;
};