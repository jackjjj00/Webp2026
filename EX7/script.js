var container = document.getElementById('container');
var scoreDisplay = document.getElementById('score');
var currentScore = 0; // 記錄分數的變數

function generateRandomChars(min, max) {
    var chars = "abcdefghijklmnopqrstuvwxyz";
    var result = "";
    var length = Math.floor(Math.random() * (max - min + 1)) + min;
    for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

window.onload = function() {
    container.focus();
    container.textContent = generateRandomChars(1, 3);
};

window.addEventListener("keyup", function(e) {
    var str = container.textContent;
    
    // 如果打對了第一個字
    if (str.length > 0 && e.key === str[0]) {
        container.textContent = str.substring(1); 
        currentScore += 10; // 打對加 10 分
        scoreDisplay.textContent = currentScore; // 更新畫面上的分數
    }
    
    // 每次按鍵都隨機增加 1~3 個字
    container.textContent += generateRandomChars(1, 3);
});