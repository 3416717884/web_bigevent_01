$(function () {
    // 获取用户信息
    getUSerInof()

    // 设置退出弹出框
    $("#logout").on('click', function () {
        // 弹出框
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空本地存储
            localStorage.removeItem('token')
            // 跳转登录页面
            location.href = "/login.html"
            // 取消模态框
            layer.close(index);
        });
    })
})
// 获取用户信息 封装到入口函数外面
// 原因 后面其他页面要调用 全局函数
function getUSerInof() {
    // 发送Ajax请求
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user) {
    // 获取到数据的 昵称
    var name = user.nickname || user.username
    // 渲染到页面上
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 判断数据中是否有图片头像 如果没有就用文字头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').html(text)
    }
}