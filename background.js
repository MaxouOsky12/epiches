chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ points: 0 });
});

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(() => {
  chrome.storage.local.get("points", (data) => {
    const newPoints = (data.points || 0) + 1;
    chrome.storage.local.set({ points: newPoints });
  });
});
