$(function () {
    // 小于十 补零
    function padZero(n) {
        return n < 9 ? '0' + n : n
    }
    // 定义过滤器
    template.defaults.imports.dateFormat = function (time) {
        var dr = new Date(time)

        var n = dr.getFullYear()
        var y = padZero(dr.getMonth() + 1)
        var r = padZero(dr.getDate())

        var nn = padZero(dr.getHours())
        var yy = padZero(dr.getMinutes())
        var rr = padZero(dr.getSeconds())

        return `${n} - ${y} - ${r} ${nn}:${yy}:${rr}`
    }
    // 获取form
    var form = layui.form
    // 获取 layer
    var layer = layui.layer
    // 定义laypage
    var laypage = layui.laypage
    // 定义提交参数
    var q = {
        pagenum: 1, // 页码值
        pagesize: 2, // 每页显示多少条数据
        cate_id: '', // 文章分类的id
        state: '', // 文章的状态 可选值有 已发布、草稿
    }
    initTable()
    initCate()
    // 渲染列表
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 调用模板引擎
                var str = template('tpl-table', res)
                $('tbody').html(str)
                // 调用分页
                renderPage(res.total)
            }
        })
    }
    // 分类列表渲染
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 重新执行 layUI js文件
                form.render()
            }
        })
    }
    // 表单筛选
    $('#form-search').on('submit', function (e) {
        // 清楚默认
        e.preventDefault()
        // 拿到俩个筛选框里面的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 给q重新赋值
        q.cate_id = cate_id
        q.state = state
        // 重新渲染
        initTable()
    })
    // 定义渲染分页的函数
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', // 这里的参数传的是ID名
            count: total, // 数据总数，从服务器得到
            limit: q.pagesize, //每页几条
            curr: q.pagenum, //第几页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }
    // 删除文章操作
    $('tbody').on('click', '.btn-delete', function () {
        // 获取删除按钮自定义ID名
        var id = $(this).attr('data-id')
        // 删除询问框
        layer.confirm('确认删除文章?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/delete/' + id,
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('恭喜你删除文章成功！')
                    // 判断删除按钮个数是否等于 1
                    var len = $('.btn-delete').length
                    if (len === 1) {
                        q.pagenum == 1?  1 : q.pagenum--
                    }
                    // 重新渲染
                    initTable()
                    layer.close(index);
                }
            })
        });
    })

})