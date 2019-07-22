// Targetting the DOM elements
const mainContent = document.getElementById('main-content');
const viewDepts = document.getElementById('viewDepts');
const printReceipts = document.getElementById('printReceipts');
const paymentLog = document.getElementById('paymentLog');
const userProfile = document.getElementById('userProfile');
const logout = document.getElementById('logout');

mainContent.addEventListener('load', LoadMainPage);
viewDepts.addEventListener('click', e => {
    e.preventDefault();
    seeAllDepts();
});
paymentLog.addEventListener('click', e => {
    e.preventDefault();
    seeAllLogs();
});
logout.addEventListener('click', e => {
    e.preventDefault();
    window.location.replace("http://localhost/surepay/web/index.html");
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
    .then(html => {
        mainContent.innerHTML = html;
        validate();
        document.getElementById('RecName').innerHTML = userName.innerHTML;
    })
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
    .then(html => {
        mainContent.innerHTML = html;
        document.getElementById('profileName').innerHTML = userName.innerHTML;
    })
    .catch(err => console.log(err))

});





function LoadMainPage(){

    fetch('http://localhost/surepay/dashboard/examples/main.html')
    .then(res => {
        if(res.status !== 200){
            mainContent.innerHTML = `<div class="d-flex justify-content-center" style='align-items: center'><div class="spinner-grow" role="status"><span class="sr-only">Loading...</span></div<div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-success" role="status"><span class="sr-only">Loading...</span></div></div>`;
        }
        return (res.text())
    })
    .then(html => {mainContent.innerHTML = html; getDepts(); validateGet(); numberAnalysis();})
    .catch(err => console.log(err))

}

function seeAllDepts(){
    fetch('http://localhost/surepay/dashboard/examples/departments.html')
    .then(res => {
        if(res.status !== 200){
            mainContent.innerHTML = `<div class="d-flex justify-content-center" style='align-items: center'><div class="spinner-grow" role="status"><span class="sr-only">Loading...</span></div<div class="spinner-grow text-primary" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-warning" role="status"><span class="sr-only">Loading...</span></div><div class="spinner-grow text-success" role="status"><span class="sr-only">Loading...</span></div></div>`;
        }
        return (res.text())
    })
    .then(html => {
        mainContent.innerHTML = html;
        depts();
        document.getElementById('deptName').innerHTML = userName.innerHTML;
    })
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
    .then(html => {
        mainContent.innerHTML = html;
        validate();
        document.getElementById('logName').innerHTML = userName.innerHTML;
    })
    .catch(err => console.log(err));
}

function depts(){
    let jwt = getCookie('jwt');
    if(!jwt){
        window.location.replace("http://localhost/surepay/web/index.html");
    }
    fetch('http://localhost/surepay/api/controllers/getDepts.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({jwt: jwt})
    }).then(res => res.json())
    .then(content => {
        for(let i = 0; i < content.data.length; i++){
            document.getElementById('allDepts').innerHTML += `
            <tr>
            <th scope="row">
                <div class='badge badge-pill bg-primary text-white'># ${content.data[i].id}</div>
            </th>
            <td>
                <div class='badge badge-pill bg-warning text-white'>${content.data[i].name}</div>
            </td>
            <td>
                <span class="badge badge-dot mr-4">
                <i class="bg-success"></i> active
                </span>
            </td>
            <td>
                <div class='badge badge-pill bg-primary text-white'>N ${content.data[i].fee}</div>
            </td>
            <td>
                <button class='btn btn-success btn-sm' onclick='payWithPaystack(${content.data[i].id}, ${content.data[i].fee})'>Make Payment</button>
            </td>
            </tr>`;
        }
    })
    .catch(err => console.log(err))
}

function getDepts(){
    let jwt = getCookie('jwt');
    if(!jwt){
        window.location.replace("http://localhost/surepay/web/index.html");
    }
    fetch('http://localhost/surepay/api/controllers/getDepts.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({jwt: jwt})
    }).then(res => res.json())
    .then(content => {
        for(let i = 0; i < 4; i++){
            document.getElementById('mainDepts').innerHTML += `
            <tr>
                <th scope="row">
                     <div class='badge badge-pill bg-warning text-white'># ${content.data[i].id}</div>
                </th>
                <td>
                    <div class='badge bg-primary badge-pill badge-white'>${content.data[i].name}</div>
                </td>
                <td>
                    N ${content.data[i].fee}
                </td>
                <td>
                    <button class='btn btn-success btn-sm' onclick='payWithPaystack(${content.data[i].id}, ${content.data[i].fee})'>Pay</button>
                </td>
            </tr>
            `;
        }
    })
    .catch(err => console.log(err))
}

function payWithPaystack(id, fee){
    let handler = PaystackPop.setup({
      key: 'pk_test_32adfc3155a4e2d221c2a41c8fb16f12eacf6883',
      email: 'alelebealsjoshua@gmail.com',
      amount: fee + '00',
      currency: "NGN",
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      firstname: 'Joshua',
      lastname: 'Alele-Beals',
      // label: "Optional string that replaces customer email"
      metadata: {
         custom_fields: [
            {
                display_name: "SurePay",
                variable_name: "mobile_number",
                value: "+2348167215043"
            }
         ]
      },
      callback: function(response){
        validateSave(id,response.reference,fee);
        numberAnalysis();
      },
      onClose: function(){
          alert('window closed');
      }
    });
    handler.openIframe();
}

function validateSave(deptid, transactionRef, amount){
    let jwt = getCookie('jwt');
    if(!jwt){
        window.location.replace("http://localhost/surepay/web/index.html");
    }
    fetch('http://localhost/surepay/api/controllers/validate_token.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body: JSON.stringify({jwt:jwt})
    })
    .then(res => res.json())
    .then(data => {
        saveLog(data.data.id, deptid, transactionRef, amount, jwt);
        getLog(data.data.id);
        validateGet();
    }).catch(err => console.log(err));
}

function validateGet(){
    let jwt = getCookie('jwt');
    if(!jwt){
        window.location.replace("http://localhost/surepay/web/index.html");
    }
    fetch('http://localhost/surepay/api/controllers/validate_token.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body: JSON.stringify({jwt:jwt})
    })
    .then(res => res.json())
    .then(data => {
        userName.innerHTML = data.data.fullname;
        document.getElementById('homeName').innerHTML = userName.innerHTML;
        getLog(data.data.id);
    }).catch(err => console.log(err));
}

function saveLog(userID, deptID, transactionRef, amount, jwt){
    fetch('http://localhost/surepay/api/controllers/savePayment.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({userID: userID, deptID: deptID, transactionID: transactionRef, amount: amount, jwt: jwt})
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    }).catch(err => console.log(err))
}

function getLog(userID){
    let jwt = getCookie('jwt');
    if(!jwt){
        window.location.replace("http://localhost/surepay/web/index.html");
    }
    fetch('http://localhost/surepay/api/controllers/getPaymentLog.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({userID: userID, jwt: jwt})
    })
    .then(res => res.json())
    .then(data => {
        let count;
        if(data.data.length > 3){
            count = 3;
        }else if(data.data.length < 3){
            count = data.data.length;
        }else{
            count = data.data.length;
        }
        document.getElementById('RecentTransactions').innerHTML = '';
        for(let i = 0; i < count; i++){
            document.getElementById('RecentTransactions').innerHTML += 
            `<tr>
                <th scope="row">
                    ${data.data[i].date}
                </th>
                <td>
                    <div class='badge badge-pill bg-primary text-white'>N ${data.data[i].amount}</div>
                </td>
                <td>
                <span class="badge badge-dot mr-4">
                    <i class="bg-success"></i> ${data.data[i].status}
                </span>
                </td>
                <td>
                    <div class='badge badge-pill bg-warning text-white'>${data.data[i].name}</div>
                </td>
                <td>
                    ${data.data[i].transactionID}
                </td>
            </tr>`;
        }
        document.getElementById('transactions').innerHTML = data.data.length;
    }).catch(err => console.log(err))
}

function numberAnalysis(){
    let jwt = getCookie('jwt');
    if(!jwt){
        window.location.replace("http://localhost/surepay/web/index.html");
    }
    fetch('http://localhost/surepay/api/controllers/numberAnalysis.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body: JSON.stringify({jwt: jwt})
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('departments').innerHTML = data.data.departments;
        document.getElementById('appUsers').innerHTML = data.data.appusers;
    }).catch(err => console.log(err))
}


// get or read cookie
function getCookie(cname){
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' '){
            c = c.substring(1);
        }
 
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

