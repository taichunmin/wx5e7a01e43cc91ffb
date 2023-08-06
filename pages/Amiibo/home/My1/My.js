Page({
    data: {
        list: [ {
            id: "view",
            name: "视图容器",
            open: !1,
            pages: [ "view", "scroll-view", "swiper", "movable-view", "cover-view" ]
        }, {
            id: "content",
            name: "基础内容",
            open: !1,
            pages: [ "text", "icon", "progress", "rich-text" ]
        }, {
            id: "form",
            name: "表单组件",
            open: !1,
            pages: [ "button", "checkbox", "form", "input", "label", "picker", "picker-view", "radio", "slider", "switch", "textarea" ]
        }, {
            id: "nav",
            name: "导航",
            open: !1,
            pages: [ "navigator" ]
        }, {
            id: "media",
            name: "媒体组件",
            open: !1,
            pages: [ "image", "audio", "video", "camera" ]
        }, {
            id: "map",
            name: "地图",
            pages: [ "map" ]
        }, {
            id: "canvas",
            name: "画布",
            pages: [ "canvas" ]
        }, {
            id: "open",
            name: "开放能力",
            pages: [ "ad", "open-data", "web-view" ]
        } ]
    },
    kindToggle: function(e) {
        for (var a = e.currentTarget.id, i = this.data.list, n = 0, t = i.length; n < t; ++n) i[n].id === a ? i[n].open = !i[n].open : i[n].open = !1;
        this.setData({
            list: i
        });
    }
});