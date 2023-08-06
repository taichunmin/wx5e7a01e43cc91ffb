module.exports = {
    getErrorInfo: function(e) {
        var a = "";
        switch (e) {
          case 0:
            a = "正常";
            break;

          case 1e4:
            a = "未初始化蓝牙适配器";
            break;

          case 10001:
            a = "当前蓝牙适配器不可用 未初始化蓝牙适配器？ 或是你的手机蓝牙处于关闭状态";
            break;

          case 10002:
            a = "没有找到指定设备";
            break;

          case 10003:
            a = "连接失败";
            break;

          case 10004:
            a = "没有找到指定服务";
            break;

          case 10005:
            a = "没有找到指定特征值";
            break;

          case 10006:
            a = "当前连接已断开";
            break;

          case 10007:
            a = "当前特征值不支持此操作";
            break;

          case 10008:
            a = "其余所有系统上报的异常";
            break;

          case 10009:
            a = "Android 系统特有，系统版本低于 4.3 不支持 BLE";
            break;

          default:
            a = "其他错误 可能本方法定义的错误码已更新不上官方的错误码 也可能是未知错误";
        }
        return a;
    }
};