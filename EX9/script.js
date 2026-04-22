window.onload = function() {
    // 老師提供的 API Key
    var apiKey = "ca370d51a054836007519a00ff4ce59e";
    
    // 步驟 1：取得最新照片清單 (10張)
    var imglist_Url = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&per_page=10&format=json&nojsoncallback=1`;
    var gallery = document.getElementById("gallery");

    // 第一個 Fetch：拿照片列表
    fetch(imglist_Url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            gallery.innerHTML = ""; // 清空「載入中」的文字
            
            // Flickr 回傳的資料結構，照片陣列藏在 data.photos.photo 裡面
            var photos = data.photos.photo;

            // 用迴圈把每一張照片的 ID 拿出來
            photos.forEach(function(photo) {
                var photoId = photo.id;
                var title = photo.title || "無標題"; // 如果沒有標題就顯示無標題

                // 步驟 2：針對每一張照片的 ID，再去打一次 API 取得各種尺寸的「真實網址」
                var img_Url = `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${apiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`;

                // 第二個 Fetch：拿真實圖片網址
                fetch(img_Url)
                    .then(function(res) {
                        return res.json();
                    })
                    .then(function(sizeData) {
                        // sizeData.sizes.size 是一個陣列，裡面有這張照片的大、中、小各種尺寸
                        var sizes = sizeData.sizes.size;
                        
                        // 我們找一個 'Medium' (中等尺寸) 的照片來顯示，如果沒有就拿最後一個
                        var targetSize = sizes.find(s => s.label === "Medium") || sizes[sizes.length - 1];

                        // 建立一張照片的 HTML 卡片
                        var card = document.createElement("div");
                        card.className = "photo-card bg-white";
                        card.innerHTML = `
                            <img src="${targetSize.source}" alt="flickr photo">
                            <p class="mt-3 mb-0 text-truncate text-muted">${title}</p>
                        `;
                        
                        // 把卡片貼到照片牆上
                        gallery.appendChild(card);
                    })
                    .catch(function(err) {
                        console.log("取得單張照片大小失敗：", err);
                    });
            });
        })
        .catch(function(error) {
            console.log("取得照片列表失敗：", error);
            gallery.innerHTML = "<h5 class='text-danger'>連線 Flickr 失敗，請檢查網路或 API Key！</h5>";
        });
};