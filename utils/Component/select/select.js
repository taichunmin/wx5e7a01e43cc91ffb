var t = require("../../../@babel/runtime/helpers/createForOfIteratorHelper"), e = require("../../../@babel/runtime/helpers/objectSpread2");

Component({
    properties: {
        options: {
            type: Array,
            value: []
        },
        defaultOption: {
            type: Object,
            value: {
                id: "0",
                name: "请选择"
            }
        },
        key: {
            type: String,
            value: "id"
        },
        text: {
            type: String,
            value: "name"
        }
    },
    data: {
        result: [],
        isShow: !1,
        current: {}
    },
    methods: {
        optionTap: function(t) {
            var a = t.target.dataset;
            this.setData({
                current: a,
                isShow: !1
            }), this.triggerEvent("change", e({}, a));
        },
        openClose: function() {
            this.setData({
                isShow: !this.data.isShow
            });
        },
        close: function() {
            this.setData({
                isShow: !1
            });
        },
        moveout: function() {
            this.setData({
                isShow: !1
            });
        },
        refreshData: function(t) {
            this.setData({
                result: t
            });
        }
    },
    lifetimes: {
        attached: function() {
            var e, a = [], i = t(this.data.options);
            try {
                for (i.s(); !(e = i.n()).done; ) {
                    var s = e.value, r = s[this.data.key], n = s[this.data.text];
                    a.push({
                        id: r,
                        name: n
                    });
                }
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                i.e(t);
            } finally {
                i.f();
            }
            this.setData({
                current: Object.assign({}, this.data.defaultOption),
                result: a
            });
        }
    }
});