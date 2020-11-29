$(function () {
    // 获取form
    var form = layui.form
    // 获取 layer
    var layer = layui.layer
    // 获取数据
    initArtCateList()
    // ajax 渲染
    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return
                }
                // template
                var str = template('tpl-table', res)
                $('tbody').html(str)
            }
        })
    }
    // 
    var indexAdd = null
    // 弹出层
    $('#btnAdd').on('click', function () {
        // 
        indexAdd = layer.open({
            type: '1',
            area: ['500px', '260px'],
            title: '添加文章分类',
            content: $("#dialog-add").html()
        });
    })
    // 事件代理  发送Ajax
    $('body').on('submit', '#form-add', function (e) {
        // 默认行为
        e.preventDefault()
        // 发送
        $.ajax({
            method: "POST",
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你添加文章成功！')
                // 重新渲染页面
                initArtCateList()
                layer.close(indexAdd)
            }
        })
    })
    var indexEdit = null
    // 事件代理  点击编辑
    $('tbody').on('click', '.btn_edit', function () {
        indexEdit = layer.open({
            type: '1',
            area: ['500px', '260px'],
            title: '添加文章分类',
            content: $("#dialog-edit").html()
        });
        // 获取自定义id
        var Id = $(this).attr('data-id')
        // ajax
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                // console.log(res);
                form.val('form-edit', res.data)
            }
        })
    })
    // 修改提交
    $('body').on('submit', '#form-edit', function (e) {
        // 默认行为
        e.preventDefault()
        // 发送
        $.ajax({
            method: "POST",
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你修改文章成功！')
                // 重新渲染页面
                initArtCateList()
                layer.close(indexEdit)
            }
        })
    })
    // 事件代理  删除
    $('tbody').on('click', '.btn-delete', function () {
        // 获取 id
        var Id = $(this).siblings('.btn_edit').attr('data-id')
        console.log(Id);
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + Id,
                success: function (res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除分类成功!')
                    // 获取数据 渲染
                    initArtCateList()
                    // 
                    layer.close(index);
                }
            })
        });
    })
})