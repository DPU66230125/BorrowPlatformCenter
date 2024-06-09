let availableItems = [];
let selectedIndex = 0;
let user = null;

async function initLogin() {
    user = await DB.getUser();
    if (user == null) {
        window.location.href = "./login.html";
    } else {
        var settings = {
            "url": "http://54.175.155.216/api/p-3/borrow.php?method=available-items",
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            availableItems = response.data;
            renderItems();
        });
    }
}

function renderItems(){
    let catalogs = document.querySelector('#catalogs');
    availableItems.forEach((value, index) => {
        const ID = value.ID;
        const name = value.name;
        const stock_qty = value.stock_qty;
        const image = value.image;

        catalogs.innerHTML += 
            `<button class="item-button" onclick="openModal(${index})">
                <div class="item-card">
                    <img src="${image}" alt="รูปสินค้า" class="item-cardimage">
                    <h3>${name}</h3>
                </div>
            </button>`;
    });
}

initLogin();



function openModal(i) {
    selectedIndex = i;
    const item = availableItems[i];

    document.getElementById('myModal').style.display = 'flex';
    document.querySelector('.modal-header h2').innerText = `${item.name}`;
    document.querySelector('#stock-qty').innerHTML = `เหลือ ${item.stock_qty} ชิ้น`;
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

async function submitForm() {
    // Handle form submission logic
    const item_id = availableItems[selectedIndex].ID;
    const user_id = user.ID;
    const qty = $('#quantity').value();
    const borrow_date = $('borrow-date-start').value();
    const return_date = $('borrow-date-end').value();
    var settings = {
        "url": "http://54.175.155.216/api/p-3/borrow.php?method=borrow-item",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "item_id": item_id,
          "user_id": user_id,
          "qty": qty,
          "borrow_date": borrow_date,
          "return_date": return_date
        }),
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        if(response.success){
            closeModal();
            window.location.href = "./my-items.html";
        }else{
            alert(response.data.message);
        }
      });
}

async function logout() {
    if (confirm('ต้องการออกจากระบบ')) {
        await DB.logout();
        window.location.href = 'login.html';
    }
}

function navigateToMyItems() {
    window.location.href = 'my-items.html';
}

window.onclick = function (event) {
    if (event.target == document.getElementById('myModal')) {
        closeModal();
    }
}