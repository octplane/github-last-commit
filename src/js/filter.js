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
          var sg =rt.stargazers_count;
          remaining = xhr.getResponseHeader("X-RateLimit-Remaining");

          var t = new Date(Date.parse(dt));
          var dayCount = Math.floor((now -t) / (86400 * 1000));

          var c = "red";
          sz = 6;
          if (dayCount < 10) {
            c = "green";
            sz = 12;
          } else if (dayCount > 30 ) {
            c = "red";
            sz = 6;
          } else {
            c = "yellow";
            sz = 9;
          }

          if (sg < 10) {
            c = c + "-1";
          } else if (sg < 100) {
            c = c + "-2";
          } else if (sg < 1000) {
            c = c + "-3";
          } else {
            c = c + "-4";
          }

          var lang = rt.language;
          var forks = rt.forks_count;
          var issues = rt.open_issues_count;
          var hp = rt.homepage;
          var home = '';
          if(hp != null && hp != "" &&  !hp.startsWith("https://github.com/")) {
            home = '&nbsp;<a class="_glu_gh" href="' + hp + '">[Web]</a>';
          }

          

          title = "Last push " + dayCount + " days ago, " + sg + " stars.<br>" + forks + " forks and " + issues +" opened issues.<br>In " + lang + ".";

          var packer = $('<span class="_glu_packer"></span>');
          var d = $('<div class="_glu_wrapper"></div>');
          var tt = $('<div class="_glu_tooltip"><h6 class="_glu_gh6">'+ reponame + home + '</h6>' + title + '</div>');


          var img = $('<img width="' + sz + '" height="' + sz + '" style="margin-bottom:3px;margin-left:4px;">');
          img.attr('src', chrome.extension.getURL('images/' + c + '.png'));
          d.append(img);
          d.append(tt);
          elt.append(d);
          elt.append(packer);
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
