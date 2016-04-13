function saveOptions() {
  var token = document.getElementById('token').value;
  var username = document.getElementById('username').value;

  chrome.storage.sync.set({
    token: token,
    username: username
  }, function(items) {
    var status = document.getElementById('saveMessage');
    status.textContent = 'Saved settings';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function getOptions(callback) {
  chrome.storage.sync.get({
    username: 'username',
    token: 'Generate a token at https://github.com/settings/tokens',
    repocount: 0,
    pages: 0
  }, function(items) {
    document.getElementById('username').value = items.username;
    document.getElementById('token').value = items.token;
    document.getElementById('repocount').textContent = items.repocount;
    document.getElementById('pagecount').textContent = items.pages;
  });
}

function restoreOptions() {
  getOptions();
  document.getElementById('save').addEventListener('click', saveOptions);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
