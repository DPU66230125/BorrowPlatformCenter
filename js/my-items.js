let records = [];
let selectedIndex = 0;
let user = null;

async function initLogin() {
    user = await DB.getUser();
    if (user == null) {
        window.location.href = "./login.html";
    } else {
        var settings = {
            "url": `http://54.175.155.216/api/p-3/borrow.php?method=my-records&user_id=${user.ID}`,
            "method": "GET",
            "timeout": 0,
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
            records = response.data;
            renderRecords();
          });
    }
}

function renderRecords(){
    let container = document.querySelector('#items-container');
    records.forEach((value, index) => {
        container.innerHTML += `
        <div class="item-card">
            <img src="${value.image}" alt="รูปสินค้า" class="item-image">
            <div class="item-details">
                <h2>${value.name}</h2>
                <p>จำนวนการยืม : ${value.qty}</p>
                <p>วันที่ยืม : ${value.borrow_date} - ${value.return_date}</p>
            </div>
            <div class="item-actions">
                <button type="button" onclick="confirmReturn(${index})">คืนของ</button>
            </div>
        </div>
        `;
    });
}



function goBack() {
    window.location.href = 'index.html';
}

function navigateToArchiveItems() {
    window.location.href = 'archive-items.html';
}

function confirmReturn(i) {
    selectedIndex = i;
    const item = records[i];
    if (confirm(`คุณแน่ใจหรือไม่ว่าต้องการคืน ${item.name}?`)) {
        returnItem(i);
    }
}

function returnItem() {
    const item = records[i];
    var settings = {
        "url": "http://54.175.155.216/api/p-3/borrow.php?method=return-item",
        "method": "PUT",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "record_id": item.ID
        }),
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        alert(`คุณได้ทำการคืน ${item.name}`);
        window.location.reload();
      });
    // โค๊ดลบ API
}