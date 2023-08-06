Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.HTTP = void 0;

var e = require("../../@babel/runtime/helpers/classCallCheck"), a = require("../../@babel/runtime/helpers/createClass"), r = require("config.js"), t = function() {
    function t() {
        e(this, t);
    }
    return a(t, [ {
        key: "JAVAupload_file",
        value: function(e, a, t) {
            var i = a.filePath, l = a.UserInformation;
            wx.uploadFile({
                url: r.file_server_url + e,
                filePath: i,
                name: "imagefile",
                header: {
                    "content-type": "multipart/form-data"
                },
                formData: l,
                success: function(e) {
                    t(JSON.parse(e.data));
                }
            });
        }
    }, {
        key: "C3cupload_file",
        value: function(e, a, t, i) {
            wx.uploadFile({
                url: r.amiiboserver_url + e,
                filePath: a,
                name: "file",
                header: {
                    "Content-Type": "multipart/form-data",
                    accept: "application/json"
                },
                formData: t,
                success: function(e) {
                    i(JSON.parse(e.data));
                },
                fail: function(e) {
                    console.log(e);
                }
            });
        }
    } ]), t;
}();

exports.HTTP = t;