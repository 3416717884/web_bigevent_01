$(function () {
    // 1   点击去注册账号 隐藏登录界面 显示注册界面
    $('#link_red').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录账号 隐藏注册界面 显示登录界面
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 2   表单输入校验规则
    var form = layui.form
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // value 等于当前调用repwd表单的内容
            // 获取密码框的内容
            var pwd = $('.reg-box [name=password]').val()
            // 判断是否一致
            if (value !== pwd) {
                return '两次输入密码的内容不一致！'
            }
        }
    })
    // 获取layer
    var layer = layui.layer
    // 3   注册设置注册监听事件
    $('#form_reg').on('submit', function (e) {
        // 清除事件跳转行为
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg('恭喜你，注册成功！', { icon: 6 });
                // 跳转到登录页面
                $('#link_login').click()
                // 清空表单
                $('#form_reg')[0].reset()
            }
        })
    })
    // 3   登录设置注册监听事件
    $('#form_login').on('submit', function (e) {
        // 清除默认跳转
        e.preventDefault()
        // 获取数据
        $.ajax({
            method : 'POST',
            url :'/api/login',
            // 获取所有表单内容
            data : $(this).serialize(),
            success : function(res) {
                console.log(res);
                // 判断
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg('恭喜你，登录成功！', { icon: 6 });
                // 把token存到本地存储
                localStorage.setItem('token',res.token)
                // 跳转页面 到后台
                location.href = '/index.html'
            }
        })
    })
})