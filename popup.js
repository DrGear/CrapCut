document.addEventListener("DOMContentLoaded", async () => {
    const downloadList = document.getElementById("downloadList");
    const clearHistoryBtn = document.getElementById("clearHistoryBtn");

    chrome.storage.local.get("downloadHistory", (data) => {
        const history = data.downloadHistory || [];

        downloadList.innerHTML = "";

        if (history.length === 0) {
            downloadList.innerHTML = "<li>No downloads yet.</li>";
        } else {
            history.forEach((entry, index) => {
                const listItem = document.createElement("li");

                const numberSpan = document.createElement("span");
                numberSpan.textContent = `${index + 1}. `;
                numberSpan.style.fontWeight = "bold";

                const link = document.createElement("a");
                link.href = entry.url;
                link.textContent = "Download";
                link.target = "_blank";
                
                listItem.appendChild(numberSpan);
                listItem.appendChild(link);
                downloadList.appendChild(listItem);
            });
        }
    });

    clearHistoryBtn.addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "clearDownloadHistory" }, () => {
            downloadList.innerHTML = "<li>No downloads yet.</li>";
        });
    });
});
