function login(){
    const username = $('#username').val();
    const password = $('#password').val();   
    if(username != '' && password != ''){
        var settings = {
            "url": "http://54.175.155.216/api/p-3/auth.php?method=login",
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify({
              "username": username,
              "password": password
            }),
          };
          
          $.ajax(settings).done(async function (response) {
            console.log(response);
            if(response.success){
                await DB.login(response.data);
                window.location.href = "index.html"
            }else{
                alert(response.data.message)
            }
          });
    }else{
        alert("กรุณากรอก username และ password ของคุณให้ครบถ้วน");
    }
}

async function initLogin(){
    const user = await DB.getUser();
    if(user != null){
        window.location.href = "./index.html";
    }
}

initLogin();