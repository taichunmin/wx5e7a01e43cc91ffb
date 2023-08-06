getApp();

module.exports = {
    userLogin: function() {
        wx.checkSession({
            success: function() {},
            fail: function() {
                wx.redirectTo({
                    url: "../../../pages/Authrority/authorize"
                });
            }
        });
    }
};