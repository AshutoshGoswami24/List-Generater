function addEntry() {
    var fileNameInput = document.getElementById("fileNameInput");
    var urlInput = document.getElementById("urlInput");

    var fileName = fileNameInput.value.trim().replace(/[:;]/g, ''); // Remove ':' and ';' characters
    var url = urlInput.value.trim();

    if (fileName === "" || url === "") {
        alert("Please enter both file name and URL.");
        return;
    }

    var listItem = document.createElement("li");
    listItem.textContent = fileName + " - Free Download By @PandaWep In Telegram.mkv" + ":" + url;

    document.getElementById("fileList").appendChild(listItem);

    // Clear inputs
    fileNameInput.value = "";
    urlInput.value = "";
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
