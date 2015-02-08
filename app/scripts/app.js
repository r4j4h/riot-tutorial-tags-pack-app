riot.tag('app', '<nav id="sidenavs"> <h2>Examples</h2> <ul> <li each="{ opts }"> <a class="{ current: parent.isCurrent(link) }" href="{ link }">{ title }</a> <span>-</span> <a href="{ vuelink }" target="_blank">(vue)</a> </li> </ul> <p><a href="https://github.com/txchen/feplay/tree/gh-pages/riot_vue" target="_blank">Source Code</a></p> </nav> <div id="example-content"> <example-content id="example"> </example-content> </div>', function(opts) {
  var self = this

  this.on('mount', function(){
    riot.route.exec(function(example) {
      console.log('initial route is ' + example)
      self.loadExample(example || 'markdown')
    })
  })

  this.isCurrent = function(link) {
    return link == window.location.hash
  }.bind(this);

  this.loadExample = function(example) {
    console.log('loadExample ' + example)
    var oldElement = document.getElementById('example')
    if (oldElement) {
      oldElement.remove()
    }
    exampleEle = document.createElement('example-content' )
    exampleEle.id = 'example'
    document.getElementById('example-content').appendChild(exampleEle)
    riot.mountTo(document.getElementById('example'), example)


    riot.update()
  }.bind(this);

  riot.route(function(example) {
    self.loadExample(example)
    self.update()
  })
  
});
