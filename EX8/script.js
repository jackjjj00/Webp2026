window.onload = function() {
    var apiUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";

    fetch(apiUrl)
        .then(function(response) {
            return response.json(); 
        })
        .then(function(data) {
            var tbody = document.getElementById('table-body');
            tbody.innerHTML = ""; 

            data.forEach(function(item) {
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
        })
        .catch(function(error) {
            console.log("抓取資料失敗：", error);
            document.getElementById('table-body').innerHTML = "<tr><td colspan='3' class='text-danger'>資料載入失敗，請檢查網路狀態</td></tr>";
        });
};