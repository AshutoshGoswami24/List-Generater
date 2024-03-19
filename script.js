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
    var fileTypeSelect = document.getElementById("fileTypeSelect");

    var fileName = fileNameInput.value.trim().replace(/[^\w\s]/g, '').replace(/[:]/g, ''); // Remove non-word characters and ':'
    var url = urlInput.value.trim();
    var fileType = fileTypeSelect.value; // Get the selected file type

    if (fileName === "" || url === "" || fileType === "") {
        alert("Please enter file name, URL, and select file type.");
        return;
    }

    // Append file extension based on the selected file type
    var fileExtension = getFileExtension(fileType);

    // Add entry to fileEntries
    fileEntries.push({ fileName: fileName, fileType: fileExtension, url: url });

    // Save the state
    saveState();

    // Render the updated list
    renderList();

    // Clear inputs
    fileNameInput.value = "";
    urlInput.value = "";
}

// Function to get file extension based on file type
function getFileExtension(fileType) {
    switch (fileType) {
        case "zip":
            return ".zip";
        case "mkv":
            return ".mkv";
        case "jpg":
            return ".jpg";
        case "apk":
            return ".apk";
        default:
            return ""; // Handle other file types if necessary
    }
}

// Function to render the list
function renderList() {
    var fileList = document.getElementById("fileList");
    fileList.innerHTML = "";

    fileEntries.forEach(function(entry) {
        var listItem = document.createElement("li");
        listItem.textContent = entry.fileName + " - Free Download By @PandaWep in Telegram" + entry.fileType + ":" + entry.url;
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

// Function to clear localStorage
function clearLocalStorage() {
    localStorage.removeItem("fileEntries"); // Remove the fileEntries data from localStorage
}
