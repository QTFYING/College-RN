'use strict';
import Toast from 'react-native-root-toast';

let topurl = 'http://192.168.0.111/myapp/rn_dongyi/';
let publicUrl = topurl + 'index.php/';
//let publicUrl = 'http://192.168.0.134/myapp/rn_dongyi/index.php/';

let Fn = {
    //获得顶层URL
    getTopUrl: function () {
        return topurl;
    },
    //生成验证码
    createCode: function (length) {
        if (length == undefined) {
            length = 4;
        }
        var pow = Math.pow(10, length);
        var code = Math.floor(Math.random() * pow + pow / 10).toString();
        return code.substr(0, length);
    },
    //Toast
    showToast: function (content, time) {
        let toast = Toast.show(content, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
        });
        if (!time) {
            time = 3000;
        }
        setTimeout(function () {
            Toast.hide(toast);
        }, time);
    },
    //发送验证码的url
    sendCodeUrl: function (phone, code) {
        var time = Fn.createCode(6);
        return 'http://www.dongyixueyuan.com/send_code_do' + "?phone=" + phone + "&code=" + code + "&time=" + time;
    },
    //获得公用的url
    getPublicUrl: function () {
        return publicUrl;
    },
    /**
     * [fetch description]
     * @param  {[type]}   url       [description] 我们的请求的url
     * @param  {[type]}   method    [description] 请求的方式  post get
     * @param  {[type]}   parameter [description] 参数
     * @param  {Function} callback  [description] 成功的回调
     * @return {[type]}             [description]
     */
    fetch: function (url, callback, method, parameter) {
        if (!method) {
            method = 'GET';
        } else {
            method = method.toUpperCase();
        }
        if (!parameter) {
            parameter = {};
        }
        if (method == 'POST') {
            var json = {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parameter)
            };
        }
        fetch(url, json)
            .then((response) => response.json())
            .then((data) => {
                callback && callback(data);
            })
            .catch((err) => {
                console.log(err);
            })
    },
    //转化时间 把xx分转化为xx时xx分
    changeTime: function (time) {
        var h = parseInt(time / 60);
        var m = time % 60;
        return h + '时' + m + '分';
    }

};

export {Fn as default};
