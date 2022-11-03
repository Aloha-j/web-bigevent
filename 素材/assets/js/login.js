$(function () {
    $('#link_reg').on('click', function () {

        $('.login_box').hide()
        $('.reg_box').show()
    })

    $('#link_login').on('click', function () {
        $('.login_box').show()
        $('.reg_box').hide()
    })
    // 从layui中取得form对象
    var form = layui.form
    //通过form.verify()在自定义规则
    form.verify({
        pwd:[/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd:function(value){
            var pwd=$('.reg_box [name=password]').val()
            if(pwd!==value){
                return'2次密码不一致!'
            }
        }
    })
    $('form_reg').on('submit',function(e){
        e.preventDefault()
        $.pust('http://www.liulongbin.top:3007/api/reguser',{
            username:$('#form_reg[name=username]').val(),password:$('form_reg[name=password]').val(),function(res){
                if(res.status!==0){
                    return console.log(res.massage);
                }
                console.log('注册成功');
            }
        })
    })
})
