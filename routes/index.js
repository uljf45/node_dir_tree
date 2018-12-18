var express = require('express');
var fs = require("fs");
var path = require("path");
var router = express.Router();


var prefix = '../public/'
var root = '../public/product';

/* GET home page. */
router.get('/', function(req, res, next) {
  // readDirSync(root,res);
  readAllDir(res)
});

function readDirSync(path,res) {
  fs.readdir(path,function(err, files){
    if(err){
      res.render('error', { title: '错误' });
      return;
    }
    console.log(files);
    res.render('index', { list: files });
  });
}


function readAllDir(res) {
  var datas = {
    name: 'product'
  }
  readAllDirSync(datas, root)
  console.log(datas)
  res.render('index', {datas})
}

function readAllDirSync (datas, path) {
  var files = fs.readdirSync(path)
  var isProject = files.indexOf('start.html') > -1

  datas.isProject = isProject
  datas.list = []

  var stat = fs.statSync(path)

  if (!isProject && stat && stat.isDirectory()) {
    files.forEach(function (file, index) {
      var tmp = {}
      tmp.name = file
      tmp.file = (path+ '/' + file).replace(root + '/', '')
      var subPath = path + '/' + file
      var subStat = fs.statSync(subPath)
      var isDirectory = subStat && subStat.isDirectory()
      tmp.isDirectory = isDirectory || false
      if (isDirectory) {
        readAllDirSync(tmp, subPath)
      }
      datas.list.push(tmp)
    })
  }
}


module.exports = router;
