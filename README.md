## HTML Receipt Grabber 
Snap you company expense receipts on your smart phone camera, enter the details and the automagically appear in dropbox with csv expense reports!

This is an  **all JavaScript project** from top to tail built on a **MEAN stack** (MongoDB,Express,AngularJS,Node.js)



## Prerequisites
* Node.js - Download and Install [Node.js](http://www.nodejs.org/download/). You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm
* MongoDB - Download and Install [MongoDB](http://docs.mongodb.org/manual/installation/) - Make sure `mongod` is running on the default port (27017).

### Tools Prerequisites
* NPM - Node.js package manage; should be installed when you install node.js.
* Bower - Web package manager. Installing [Bower](http://bower.io/) is simple when you have `npm`:

```
$ npm install -g bower
```

### Optional [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
* Grunt - Download and Install [Grunt](http://gruntjs.com).
```
$ npm install -g grunt-cli
```


## Getting Started

```
$ npm install
$ node server.js
$ grunt serve
```

## Initializing heroku folder

```
yo angular-fullstack:heroku
```
This will do a grunt build, copy all the production files into the dist folder, create a Procfile required by heroku, and initialize a git repository for you.

Finally, it will create a heroku app for you, with the heroku toolbelt, and sets the node_env to production.

Push to heroku

Once it’s all done with that, you’ll need to git push the dist folder to deploy it.

```
$ grunt build
$ cd dist

$ git push heroku master
```




## To do
<table>
  <tr>
    <th></th><th>Description</th>
  </tr>
  <tr>
    <td>done</td><td>basic file upload with meta data to node server</td>
  </tr>
  <tr>
    <td>partially done</td><td>write files to dropbox</td>
  </tr>
  <tr>
    <td></td><td>store current exchange rates with each transaction</td>
  </tr>
    <tr>
    <td></td><td>get historic exchange rates npm install open-exchange-rates</td>
  </tr>
    <tr>
    <td></td><td>generate csv expense report and sync to drop box</td>
  </tr>
      <tr>
    <td>almost done - revisit cookie implementation</td><td>secure app with passport & twitter & known user in mongo</td>
  </tr>
  <tr>
    <td>done</td><td>heroku CI </td>
  </tr>
    <tr>
    <td>done</td><td>heroku -automatically generate uploads folder </td>
  </tr>
  </table>


## Special Thanks
 * [yeoman scaffolding generator](http://tylerhenkel.com/creating-apps-with-angular-and-node-using-yeoman/).
 * and more...



## License
[The MIT License](http://opensource.org/licenses/MIT)
