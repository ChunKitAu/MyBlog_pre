function myLogin() {
    var username = $('#username').val();
    var password = $('#password').val();
    if(username.length ==0 || password.length == 0){
        return
    }

    $.ajax({
        url: myhost + "/blog/user/login",
        type: "POST",
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            "username": username,
            "password": password,
        }),
        success: function (result) {
            var user = new Array();
            user[0] = result.data.id;
            user[1] = result.data.avatar;
            user[2] = result.data.nickname;
            sessionStorage.setItem("token",result.data.token);
            sessionStorage.setItem("user",user);
            window.location.href="index.html";
        },
        error: function (result) {
            $("#errorDiv").show();
        }
    });
}

$('.ui.form').form({
    fields : {
        username : {
            identifier: 'username',
            rules: [{
                type : 'empty',
                prompt: '请输入用户名'
            }]
        },
        password : {
            identifier: 'password',
            rules: [{
                type : 'empty',
                prompt: '请输入密码'
            }]
        }
    }
});