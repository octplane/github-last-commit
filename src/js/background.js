function onMessage(request, sender, sendResponse) {
  chrome.pageAction.show(sender.tab.id);
  chrome.pageAction.setTitle("Found Github repositories URLs.");

  sendResponse({});
}

chrome.runtime.onMessage.addListener(onMessage);
