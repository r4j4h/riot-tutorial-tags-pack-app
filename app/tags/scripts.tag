<scripts>

  <!-- -->
  this.env = opts.env
  this.current = opts[this.env]

  var res = []

  scan(acc, obj) {
    var res = []

    for(var pn in obj) {
      if (obj.hasOwnProperty(pn)) {
        if (typeof obj[pn] === 'object') {
          var t = this.scan(acc + pn, obj[pn])
          for (var i = 0; i < t.length; i++) {
            res.push(t[i])
          }
        }
        else {
          res.push(acc + obj[pn])
        }
      }
    }

    return res
  }

  var a = this.scan('', this.current)

  for (var i = 0; i < a.length; i++) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = a[i]
    head.appendChild(script);
  }
</scripts>
