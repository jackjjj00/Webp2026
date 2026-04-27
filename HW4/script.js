// ====== 宣告全域變數 ======
var allData = [];      // 儲存從 API 抓回來的「所有」原始資料
var filteredData = []; // 儲存「搜尋過濾後」的資料 (一開始等於所有資料)
var currentPage = 1;   // 記錄目前在第幾頁
var itemsPerPage = 10; // 老師規定：每頁 10 筆資料

// ====== 1. 網頁載入時，抓取 API 資料 ======
window.onload = function() {
    var apiUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";

    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            allData = data;        // 把抓到的資料存進大倉庫
            filteredData = data;   // 一開始沒有搜尋，所以過濾後的資料 = 所有資料
            renderTable();         // 呼叫畫表格的函數
        })
        .catch(function(error) {
            console.log("抓取資料失敗：", error);
            document.getElementById('table-body').innerHTML = "<tr><td colspan='3' class='text-danger'>資料載入失敗</td></tr>";
        });
};

// ====== 2. 負責把資料畫到畫面上的函數 ======
function renderTable() {
    var tbody = document.getElementById('table-body');
    tbody.innerHTML = ""; // 先清空舊表格

    // 如果搜尋不到任何資料
    if (filteredData.length === 0) {
        tbody.innerHTML = "<tr><td colspan='3' class='text-center text-muted'>找不到符合的資料</td></tr>";
        document.getElementById('pageInfo').innerText = "0 / 0 頁";
        return;
    }

    // 計算總頁數 (無條件進位：例如 101 筆 / 10 = 10.1 -> 11頁)
    var totalPages = Math.ceil(filteredData.length / itemsPerPage);
    
    // 更新畫面上的「上一頁 1 / 111 頁 下一頁」
    document.getElementById('pageInfo').innerText = currentPage + " / " + totalPages + " 頁";

    // 計算這一頁要從第幾筆開始、到第幾筆結束 (陣列切割)
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var pageData = filteredData.slice(startIndex, endIndex); // 拿出這 10 筆資料

    // 用迴圈把這 10 筆資料畫出來 (跟 EX#8 剝洋蔥的寫法一樣)
    pageData.forEach(function(item) {
        var tr = document.createElement('tr');
        var name = item.title;
        var location = "";
        var price = "";
        
        if (item.showInfo && item.showInfo.length > 0) {
            location = item.showInfo[0].location || ""; 
            price = item.showInfo[0].price || "";       
        }

        tr.innerHTML = `
            <td>${name}</td>
            <td>${location}</td>
            <td>${price}</td>
        `;
        tbody.appendChild(tr);
    });
}

// ====== 3. 搜尋功能 (Onchange 事件觸發) ======
function searchData() {
    // 取得輸入框的文字
    var keyword = document.getElementById('searchInput').value;

    // 利用 filter 過濾出名稱 (title) 包含關鍵字的資料
    filteredData = allData.filter(function(item) {
        return item.title.includes(keyword);
    });

    // 老師規定：搜尋後要重新計算，所以一定要把頁碼切回第 1 頁！
    currentPage = 1;
    
    // 重新畫表格
    renderTable();
}

// ====== 4. 分頁按鈕功能 ======
function prevPage() {
    if (currentPage > 1) { // 如果不是第一頁，就可以往前
        currentPage--;
        renderTable();
    }
}

function nextPage() {
    var totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage < totalPages) { // 如果還沒到最後一頁，就可以往後
        currentPage++;
        renderTable();
    }
}