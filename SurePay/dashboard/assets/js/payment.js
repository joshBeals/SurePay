let userName = document.getElementById('userName');

function validate(){
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
        showLogs(data.data.id);
        receipts(data.data.id);
    }).catch(err => console.log(err));
}


function showLogs(userID){
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
                    <button class="btn btn-primary btn-sm" onclick="printReceipt(${data.data[i].transactionID},${data.data[i].amount},'${data.data[i].name}')">Print</button>
                </td>
          </tr>`;
        }
    }).catch(err => console.log(err))
}

// function to print receipt
function printReceipt(transactionID,amount,name){
    console.log(transactionID+' '+amount+' '+name);
    document.getElementById('inner').innerHTML = `<div style="display: flex; width: 100%;">
    <h1 style="flex: 1; margin:0; padding:0">SurePay Receipt</h1>
    <div style="flex: 1; text-align: right;">
      <i class="fas fa-signature" style="color: #fc636b; font-size: 40px;"></i>
    </div>
  </div>
  <hr style="margin:15px; padding:0;">
  <table class="table align-items-center table-flush">
    <thead class="thead-light">
      <tr>
        <th scope="col">Transaction ID</th>
        <th scope="col">Amount Paid</th>
        <th scope="col">Department Paid To</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${transactionID}</td>
        <td>N ${amount}</td>
        <td>${name}</td>
      </tr>
    </tbody>
  </table>
  <p>Total: N 5000</p>
  <button class="btn btn-primary btn-sm" onclick="window.print(); document.getElementById('mymodal').className = 'hide';">Print</button><button class="btn btn-danger btn-sm" onclick="document.getElementById('mymodal').className = 'hide';">Cancel</button>`;
    document.getElementById('mymodal').className = 'view';
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
