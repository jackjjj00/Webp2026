var container = document.getElementById('container');

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
    container.textContent = generateRandomChars(0, 2);
};


window.addEventListener("keyup", function(e) {
    console.log(e.key);
    var str = container.textContent;
    if (e.key == 'Escape') {
        container.textContent = "";
    }
    else if (e.key == 'Backspace') {
        container.textContent = str.substring(0, str.length-1);
    }
    else if (str.length > 0 && e.key === str[0]) {
        container.textContent = str.substring(1);
    }
    container.textContent += generateRandomChars(1, 3);
});