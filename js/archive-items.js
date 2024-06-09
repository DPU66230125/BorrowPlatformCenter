let archives = [];
let selectedIndex = 0;
let user = null;

async function initArchives() {
    user = await DB.getUser();
    if (user == null) {
        window.location.href = "./login.html";
    } else {
          var settings = {
            "url": "http://54.175.155.216/api/p-3/borrow.php?method=archives",
            "method": "GET",
            "timeout": 0,
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
            archives = response.data;
            renderArchives();
          });
    }
}

initArchives();

function renderArchives(){
    let container = document.querySelector('#items-container');
    archives.forEach((value, index) => {
        container.innerHTML += `
        <div class="item-card">
            <img src="${value.image}" alt="รูปสินค้า" class="item-image">
            <div class="item-details">
                <h2>${value.name}</h2>
                <p>จำนวนการยืม : ${value.qty}</p>
                <p>วันที่ยืม : ${value.borrow_date} - ${value.return_date}</p>
                <p>ผู้ยืม : ${value.username}</p>
            </div>
        </div>
        `;
    });
}



function goBack() {
    window.location.href = 'index.html';
}

function navigateToMyItems() {
    window.location.href = 'my-items.html';
}

