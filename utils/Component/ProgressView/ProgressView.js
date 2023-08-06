getApp();

var t = wx.getSystemInfoSync().windowWidth / 750;

Component({
    properties: {
        canvasWidth: {
            type: Number,
            value: 400
        },
        radian: {
            type: Number,
            value: .5
        },
        lineWidth: {
            type: Number,
            value: 16
        },
        lineColor: {
            type: String,
            value: "#E3AF6A"
        },
        bottomColor: {
            type: String,
            value: "#FFF9F1"
        },
        value: {
            type: Number,
            value: 36
        },
        maxValue: {
            type: Number,
            value: 100
        },
        direction: {
            type: String,
            value: "top"
        },
        showText: {
            type: Boolean,
            value: !0
        },
        textSize: {
            type: Number,
            value: 60
        },
        textColor: {
            type: String,
            value: "#E3AF6A"
        }
    },
    data: {
        ctx: null,
        width: 400,
        height: 400,
        percentage: 0,
        hide: !1
    },
    methods: {
        drawProgressBar: function(e, a) {
            var i = this.data.radian;
            i = (i = i > 1 ? 1 : i) < 0 ? 0 : i;
            var r = this.data.bottomColor, s = this.data.lineColor, h = this.data.lineWidth * t, o = this.data.canvasWidth, l = (Math.cos((1 - i) * Math.PI) + 1) * o / 2 + h;
            this.setData({
                width: o,
                height: i < .5 ? o / 2 : l
            });
            var n = Math.PI * (1.5 - i), d = n + 2 * Math.PI * i, u = this.data.ctx;
            u || (u = wx.createCanvasContext("circleBar", this), this.setData({
                ctx: u
            }));
            var c = o * t / 2;
            u.translate(c, c), u.beginPath(), u.setStrokeStyle(r), u.setLineWidth(h), u.arc(0, 0, c - h / 2, n, d, !1), 
            u.setLineCap("round"), u.stroke(), u.closePath();
            a = null != a ? a : this.data.maxValue, e = null != e ? e : this.data.value;
            this.setData({
                percentage: parseInt(e / a * 100)
            });
            var p = 2 * Math.PI * i * (e / a), v = n;
            if (1 == i) switch (this.data.direction) {
              case "left":
                v = Math.PI;
                break;

              case "top":
                v = 1.5 * Math.PI;
                break;

              case "right":
                v = 0;
                break;

              case "left":
                v = .5 * Math.PI;
            }
            u.beginPath(), u.setStrokeStyle(s), u.setLineWidth(h), u.arc(0, 0, c - h / 2, v, p + v, !1), 
            u.setLineCap("round"), u.stroke(), u.closePath(), u.draw();
        },
        setHide: function(t) {
            this.setData({
                hide: t
            });
        }
    },
    options: {
        addGlobalClass: !0
    }
});