var regex = /https:\/\/github\.com\//i;
var search = regex.exec(document.body.innerHTML);

function fetch(auth, elements) {
  var count = 0;

  var now = new Date();
	elements.each(function(ix) {
    var elt = $(this);
    var lnk = elt.attr('href');
    var items = lnk.split("/");
    // need something that looks like a repo
    if (items.length == 5 && items[3] != "site" && items[4] != "") {
      var reponame = items[3] + "/" + items[4];
      count = count + 1;

      $.ajax({
        type: "GET",
        url: "https://api.github.com/repos/" + reponame,
        dataType: 'json',
        async: true,
        data: null,
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', auth);
        },
        success: function(rt, ts, xhr) {
          var dt = rt.pushed_at;
          // var dt = rt.updated_at;
          // // console.log(rt.stargazers_count);
          remaining = xhr.getResponseHeader("X-RateLimit-Remaining");

          var t = new Date(Date.parse(dt));
          var dayCount = Math.floor((now -t) / (86400 * 1000));

          var c = "gray";
          if (dayCount < 10) {
            c = "green";
          } else if (dayCount > 30 ) {
            c = "red";
          } else {
            c = "yellow";
          }
          var img = $('<img width="8" height="8" style="margin-bottom:3px;margin-left:4px;">');
          img.attr('src', chrome.extension.getURL('images/' + c + '.png'));
          img.attr('title', "Last push " + dayCount + " days ago");
          elt.append(img);
        }
      });
    }
  });
  return count;
}

// Implementation
if (search) {
   chrome.storage.sync.get({
     green: 7,
     orange: 30,
     username: 'foo',
     token: 'bar'
   }, function(config) {
	   elements = $('a[href^="https://github.com"]')

     var tok = config.username + ':' + config.token;
     var hash = btoa(tok);
     var auth = "Basic " + hash;

     var count = fetch(auth, elements);
     if (count > 0) {
       chrome.runtime.sendMessage({}, function(response) {});
     }
	 });
}
