$(function () {
    var bascURL = 'http://ajax.frontend.itheima.net'
    // ajaxPrefilter 这个函数会在发送请求或者接受请求之前调用一下 可以获得里面的参数
    $.ajaxPrefilter(function (params) {
        params.url = bascURL + params.url
        // 判断一下路径里面是否有/my如果有添加 headers
        if (params.url.indexOf('/my/') != -1) {
            params.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        // 拦截所有响应 判断身份认证信息
        params.complete = function (res) {
            if (res.responseJSON.status !== 0 && res.responseJSON.message === '身份认证失败！') {
                // 清空本地存储
                localStorage.removeItem('token')
                // 跳转页面
                location.href = "/login.html"
            }
        }
    })
})