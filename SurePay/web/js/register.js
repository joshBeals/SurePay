// Targetting the DOM elements
const regUser = document.getElementById('regUser');
const regEmail = document.getElementById('regEmail');
const regPass = document.getElementById('regPass');
const close = document.getElementById('close');

const createUser = document.getElementById('createUser');

close.addEventListener('click', () => {
    main.classList.add('hide');
});

createUser.addEventListener('click', (e) => {

    e.preventDefault();

    fetch('http://localhost/surepay/api/controllers/create_user.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({fullname:regUser.value, email:regEmail.value, password:regPass.value})
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === '1'){
            topic.innerHTML = 'Registration Successful!';
            body.innerHTML = data.message;
            main.classList.remove('hide');
            main.classList.remove('alert-danger');
            main.classList.add('alert-success');
        }else{
            topic.innerHTML = 'Registration Failed!';
            body.innerHTML = data.message;
            main.classList.remove('hide');
            main.classList.add('alert-danger');
            main.classList.remove('alert-success');
        }
    })
    .catch(err => console.log(err))

});