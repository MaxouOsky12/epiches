chrome.storage.local.get("points", (data) => {
  document.getElementById("points").textContent = data.points || 0;
});
