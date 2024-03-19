function addEntry() {
    var fileName = document.getElementById("fileNameInput").value.trim();
    var url = document.getElementById("urlInput").value.trim();
    
    if (fileName === "" || url === "") {
        alert("Please enter both file name and URL.");
        return;
    }

    var listItem = document.createElement("li");
    listItem.textContent = fileName + " - Free Download By @PandaWep In Telegram.mkv" + ":" + url;

    document.getElementById("fileList").appendChild(listItem);

    // Clear inputs
    document.getElementById("fileNameInput").value = "";
    document.getElementById("urlInput").value = "";
}

function downloadFile() {
    var listItems = document.querySelectorAll("#fileList li");
    var content = "";

    listItems.forEach(function(item) {
        content += item.textContent + "\n";
    });

    var blob = new Blob([content], { type: "text/plain" });
    var url = URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = url;
    a.download = "file_list.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
