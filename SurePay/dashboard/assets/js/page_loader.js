// Targetting the DOM elements
const mainContent = document.getElementById('main-content');
const viewDepts = document.getElementById('viewDepts');
const printReceipts = document.getElementById('printReceipts');
const paymentLog = document.getElementById('paymentLog');
const userProfile = document.getElementById('userProfile');

mainContent.addEventListener('load', LoadMainPage);

function LoadMainPage(){

    fetch('http://localhost/surepay/dashboard/examples/main.html')
    .then(res => {
        if(res.status !== 200){
            mainContent.innerHTML = `<div class="d-flex justify-content-center" style='align-items: center'><div class="spinner-grow" role="status"><span class="sr-only">Loading...</span></div<div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-success" role="status"><span class="sr-only">Loading...</span></div></div>`;
        }
        return (res.text())
    })
    .then(html => mainContent.innerHTML = html)
    .catch(err => console.log(err))

}

function seeAllDepts(){
    // e.preventDefault();
    fetch('http://localhost/surepay/dashboard/examples/departments.html')
    .then(res => {
        if(res.status !== 200){
            mainContent.innerHTML = `<div class="d-flex justify-content-center" style='align-items: center'><div class="spinner-grow" role="status"><span class="sr-only">Loading...</span></div<div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-success" role="status"><span class="sr-only">Loading...</span></div></div>`;
        }
        return (res.text())
    })
    .then(html => mainContent.innerHTML = html)
    .catch(err => console.log(err));
}

function seeAllLogs(){
    // e.preventDefault();
    fetch('http://localhost/surepay/dashboard/examples/log.html')
    .then(res => {
        if(res.status !== 200){
            mainContent.innerHTML = `<div class="d-flex justify-content-center" style='align-items: center'><div class="spinner-grow" role="status"><span class="sr-only">Loading...</span></div<div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-success" role="status"><span class="sr-only">Loading...</span></div></div>`;
        }
        return (res.text())
    })
    .then(html => mainContent.innerHTML = html)
    .catch(err => console.log(err));
}

viewDepts.addEventListener('click', e => {
    e.preventDefault();
    fetch('http://localhost/surepay/dashboard/examples/departments.html')
    .then(res => {
        if(res.status !== 200){
            mainContent.innerHTML = `<div class="d-flex justify-content-center" style='align-items: center'><div class="spinner-grow" role="status"><span class="sr-only">Loading...</span></div<div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-success" role="status"><span class="sr-only">Loading...</span></div></div>`;
        }
        return (res.text())
    })
    .then(html => mainContent.innerHTML = html)
    .catch(err => console.log(err))

});

printReceipts.addEventListener('click', e => {
    e.preventDefault();
    fetch('http://localhost/surepay/dashboard/examples/receipts.html')
    .then(res => {
        if(res.status !== 200){
            mainContent.innerHTML = `<div class="d-flex justify-content-center" style='align-items: center'><div class="spinner-grow" role="status"><span class="sr-only">Loading...</span></div<div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-success" role="status"><span class="sr-only">Loading...</span></div></div>`;
        }
        return (res.text())
    })
    .then(html => mainContent.innerHTML = html)
    .catch(err => console.log(err))

});

paymentLog.addEventListener('click', e => {
    e.preventDefault();
    fetch('http://localhost/surepay/dashboard/examples/log.html')
    .then(res => {
        if(res.status !== 200){
            mainContent.innerHTML = `<div class="d-flex justify-content-center" style='align-items: center'><div class="spinner-grow" role="status"><span class="sr-only">Loading...</span></div<div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-success" role="status"><span class="sr-only">Loading...</span></div></div>`;
        }
        return (res.text())
    })
    .then(html => mainContent.innerHTML = html)
    .catch(err => console.log(err))

});

userProfile.addEventListener('click', e => {
    e.preventDefault();
    fetch('http://localhost/surepay/dashboard/examples/profile.html')
    .then(res => {
        if(res.status !== 200){
            mainContent.innerHTML = `<div class="d-flex justify-content-center" style='align-items: center'><div class="spinner-grow" role="status"><span class="sr-only">Loading...</span></div<div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-success" role="status"><span class="sr-only">Loading...</span></div></div>`;
        }
        return (res.text())
    })
    .then(html => mainContent.innerHTML = html)
    .catch(err => console.log(err))

});