var count = 1; 

function addfunction() {
    var btn = document.createElement("BUTTON");
    
    btn.innerHTML = `CLICK ME (${count})`;
    btn.setAttribute("id", "btn_" + count);
    btn.setAttribute("class", "btn btn-outline-danger m-1");
    document.getElementById("btn-container").appendChild(btn);
    count++; 
}

function delfunction() {
    if (count > 1) {
        count--; 
        var btn = document.getElementById("btn_" + count);

        if (btn) {
            btn.remove();
        }
    } else {
        alert("已經沒按鈕了！");
    }
}