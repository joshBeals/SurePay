let userName = document.getElementById('userName');

function validate(){
    let jwt = getCookie('jwt');
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
        showLogs(data.data.id);
        receipts(data.data.id);
    }).catch(err => console.log(err));
}


function showLogs(userID){
    let jwt = getCookie('jwt');
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
        document.getElementById('paymentLogs').innerHTML = '';
        for(let i = 0; i < data.data.length; i++){
            document.getElementById('paymentLogs').innerHTML += 
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
    }).catch(err => console.log(err))
}

function receipts(userID){
    let jwt = getCookie('jwt');
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
        for(let i = 0; i < data.data.length; i++){
            document.getElementById('allReceipts').innerHTML += 
            `<tr>
                <th scope="row">
                    <div class='badge badge-pill bg-primary text-white'># ${data.data[i].id}</div>
                </th>
                <td>
                    ${data.data[i].transactionID}
                </td>
                <td>
                    <div class='badge badge-pill bg-success text-white'>N ${data.data[i].amount}</div>
                </td>
                <td>
                    <div class='badge badge-pill bg-warning text-white'>${data.data[i].name}</div>
                </td>
                <td>
                    <button class="btn btn-primary btn-sm">Print</button>
                </td>
          </tr>`;
        }
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
