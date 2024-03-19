// Initialize variables for tracking changes
var fileEntries = [];

// Load data from localStorage when the page loads
window.onload = function() {
    if (localStorage.getItem("fileEntries")) {
        fileEntries = JSON.parse(localStorage.getItem("fileEntries"));
        renderList();
    }
};

// Function to add an entry
function addEntry() {
    var fileNameInput = document.getElementById("fileNameInput");
    var urlInput = document.getElementById("urlInput");

    var fileName = fileNameInput.value.trim().replace(/[^\w\s]/g, '').replace(/[:]/g, ''); // Remove non-word characters and ':'
    var url = urlInput.value.trim();

    if (fileName === "" || url === "") {
        alert("Please enter both file name and URL.");
        return;
    }

    // Add entry to fileEntries
    fileEntries.push({ fileName: fileName, url: url });

    // Save the state
    saveState();

    // Render the updated list
    renderList();

    // Clear inputs
    fileNameInput.value = "";
    urlInput.value = "";
}

// Function to render the list
function renderList() {
    var fileList = document.getElementById("fileList");
    fileList.innerHTML = "";

    fileEntries.forEach(function(entry) {
        var listItem = document.createElement("li");
        listItem.textContent = entry.fileName + " - Free Download By @PandaWep In Telegram" + ":" + entry.url;
        fileList.appendChild(listItem);
    });
}

// Function to save the state
function saveState() {
    var currentState = JSON.stringify(fileEntries);
    localStorage.setItem("fileEntries", currentState);
}

// Function to prompt user before closing the page
window.onbeforeunload = function() {
    return "Are you sure you want to leave?";
};

// Function to download the file list
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
