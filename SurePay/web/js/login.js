// Targetting the DOM
const logEmail = document.getElementById('logEmail');
const logPass = document.getElementById('logPass');

const loginUser = document.getElementById('loginUser');

loginUser.addEventListener('click', (e) => {
    
    e.preventDefault();

    // remove jwt
    setCookie("jwt", "", 1);

    fetch('http://localhost/surepay/api/controllers/user_login.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({email:logEmail.value, password:logPass.value})
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === '1'){
            console.log('loged in');
            setCookie("jwt", data.jwt, 1);
            topic.innerHTML = 'Login Successful!';
            body.innerHTML = data.message;
            main.classList.remove('hide');
            main.classList.remove('alert-danger');
            main.classList.add('alert-success');
            redirectToDashboard();
        }else{
            console.log('loged out');
            topic.innerHTML = 'Login Failed!';
            body.innerHTML = data.message;
            main.classList.remove('hide');
            main.classList.add('alert-danger');
            main.classList.remove('alert-success');
        }
    })
    .catch(err => console.log(err))

});

// function to set cookie
function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function redirectToDashboard(){
    setTimeout(console.log('dashboard!'),2000);
}