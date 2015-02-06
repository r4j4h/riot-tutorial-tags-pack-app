# Riot tutorial tags package

In this tutorial we will see how It is possible lo import compiled tags pack from external servers. The tutorial is composed by to projects hosted in to github repositories: [**riot-tutorial-tags-pack-app**](https://github.com/ivan-saorin/riot-tutorial-tags-pack-app) and [**riot-tutorial-tags-pack-lib**](https://github.com/ivan-saorin/riot-tutorial-tags-pack-lib).

The added values of the approach is that it allows the complete SLM. In fact in development mode the tags are watched and compiled singularly by the gulp-riot plugin. The main application will access them on a one by one basis.

Then in production mode both **application** and **library** will be concatenated and minified: still the **application** will be able to import the tag pack from the other application.

For the sake of this tutorial we used a bunch of ready-made tags from the great [txchen example](https://github.com/txchen/feplay/tree/gh-pages/riot_vue)

All those tags and their dependencies are hosted in the **library** app and imported in the **application** app.

## The App
The App repository contains the main **application** with its dependencies.

### Installation
* clone the repository
* npm install
* bower install

## The Lib
The Lib repository contains the tag **library** with their dependencies.

### Installation
* clone the repository
* npm install
* bower install

## Development lifecycle
### Starting the application
The **application** need to be started first so that the gulp's defaults will assign to it the port ```3000```.
* cd ```application folder```
* ```gulp serve```
### Starting the library
The **library** need to be started second so that the gulp's defaults will assign to it the port ```3001```.
* cd ```library folder```
* ```gulp serve```

_**N.B.**The order of starting is completely avoidable and it is only due to gulp defaults that, of course, can be changed at wish._

## Production lifecycle
### Starting the application
The **application** need to be started first so that the gulp's defaults will assign to it the port ```3000```.
* cd ```application folder```
* ```gulp build```
* ```gulp serve:dist```
### Starting the library
The **library** need to be started second so that the gulp's defaults will assign to it the port ```3001```.
* cd ```library folder```
* ```gulp build```
* ```gulp serve:dist```

# What does the trick?
Tha **application** contains a custom tag called ```scripts``` that dinamically load the conigured files.

## scripts tag
The script tag is used to dinamically load a list of script provided by the tag configuration.

### env attribute
The ```env``` attribute control which configuration branch to consider, it can be one of: ```dev```, ```prod```.
### example usage
```html
   <scripts env="dev"></scripts>
```

```javascript
  riot.mount('scripts', {
    dev: {
      "server": {
        "context1/": {
          "context2/": [
            "filename"
          ]
        }
      }
    },
    prod: {
      //...
    }
  });

```

### scripts tag configuration
The configuration object has two main sections: ```dev``` and ```prod```.
The following is the annotated configuration you may find inside the ```index.html``` file of the **application```.

```javascript
{
  // the development configuration branch: active if env === 'dev'
  dev: {
    // server address
    "http://localhost:3001/": {
      // nested folders
      "bower_components/": [
        // array of file
        "marked/marked.min.js"
      ],
      // nested folders
      "scripts/": [
        // array of file
        "markdown.js",
        "githubcommits.js",
        "treeview.js",
        "svggraph.js",
        "imageslider.js"
      ]
    }
  },
  // the production configuration branch: active if env === 'prod'
  prod: {
    // server address
    "http://localhost:3001/": {
      // nested folders
      "scripts/": [
        // array of file
        "tags-878e8b2b.js",
        "vendor-b2ccfe02.js"
      ]
    }
  }
}
```

The above representation will be converted in an ```array``` od ```string``` containing the filenames list to be loaded.
For example the above coniguration for the branch
```prod``` will be converted into the following ```array```.

```
[
  "http://localhost:3001/scripts/tags-878e8b2b.js",
  "http://localhost:3001/scripts/vendor-b2ccfe02.js",
]
```

The loading mechanism is done via ```script``` tags added to the ```head``` element of the page.
