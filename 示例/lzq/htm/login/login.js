$(function () {
    //alert($('.active a').attr('href'));
    $('button[type="submit"]').click(function (e) {
        e.preventDefault();
        //little validation just to check username
        var loginname = $('.active a').attr('href');
        if (loginname == '#student') {
            var role =1;
            var username = $('#ff1 input[name="username"]').val();
            var password = $('#ff1 input[name="password"]').val();
            if (username != '' && password != '') {
                $(".avatar").css({
                    "background-image": "url('img/avatar9.jpg')"
                });
                $.post('../../ashx/Award.ashx?action=login', { role: role, username: username, password: password }, function (result) {
                    if (result.indexOf('登录成功') > -1) {
                        $("#output").addClass("alert alert-success animated fadeInUp").html("登录成功");
                        $("#output").removeClass(' alert-danger');
                        var arr = result.split(',');
                        window.location.href = '../index.html?userid=' + username + '&username=' + arr[2] + '&roleid=' + arr[1];
                    } else {
                        $("#output").removeClass(' alert alert-success');
                        $("#output").addClass("alert alert-danger animated fadeInUp").html(result);
                    }
                });
            } else if (username == '') {
                $("#output").removeClass(' alert alert-success');
                $("#output").addClass("alert alert-danger animated fadeInUp").html("请输入学号");
            } else if (password == '') {
                $("#output").removeClass(' alert alert-success');
                $("#output").addClass("alert alert-danger animated fadeInUp").html("请输入密码");
            }
            
            
        } else if (loginname == '#teacher') {
            var role = 2;
            var username = $('#ff2 input[name="username"]').val();
            var password = $('#ff2 input[name="password"]').val();
            if (username != '' && password != '') {
                $(".avatar").css({
                    "background-image": "url('img/avatar9.jpg')"
                });
                $.post('../../ashx/Award.ashx?action=login', { role: role, username: username, password: password }, function (result) {
                    if (result.indexOf('登录成功') > -1) {
                        $("#output").addClass("alert alert-success animated fadeInUp").html("登录成功");
                        $("#output").removeClass(' alert-danger');
                        var arr = result.split(',');
                        window.location.href = '../index.html?userid=' + username + '&username=' + arr[2] + '&roleid=' + arr[1];
                    } else {
                        $("#output").removeClass(' alert alert-success');
                        $("#output").addClass("alert alert-danger animated fadeInUp").html(result);
                    }
                });
            } else if (username == '') {
                $("#output").removeClass(' alert alert-success');
                $("#output").addClass("alert alert-danger animated fadeInUp").html("请输入教师编号");
            } else if (password == '') {
                $("#output").removeClass(' alert alert-success');
                $("#output").addClass("alert alert-danger animated fadeInUp").html("请输入密码");
            }
           
        }
      /*  if (username != "" && pass!='') {
            //$("body").scrollTo("#output");
            $("#output").addClass("alert alert-success animated fadeInUp").html("Welcome back " + "<span style='text-transform:uppercase'>" + username + "</span>");
            $("#output").removeClass(' alert-danger');
            alert(pass);
            
           
            //show avatar
            
        } else {
            //remove success mesage replaced with error message
            $("#output").removeClass(' alert alert-success');
            $("#output").addClass("alert alert-danger animated fadeInUp").html("请输入学号或教师编号 ");
        }*/
        //console.log(textfield.val());

    });
});