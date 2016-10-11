var grunt = require('grunt');
require('actionhero/grunt')(grunt);

var fs = require('fs');
var path = require('path');
var shelljs = require('shelljs/global');
var repl = require('repl');

var browserify = require('browserify'),
    babelify = require('babelify');

var walkDir = require('./src/lib/walk-dir').walkDir;

//  uncompiled asset location
var prepDir = __dirname + '/lib';
// temporary asset directory used during asset building
var tmpDir = __dirname + '/tmp';
//  compiled asset location
var distDir = __dirname + '/public';

var actionheroRoot = function(){
  var rv;
  if(fs.existsSync(__dirname + '/actionhero.js')){
    // in the actionhero project itself
    rv = __dirname;
  } else if(fs.existsSync(__dirname + '/../actionhero.js')){
    // running from /grunt in the actionhero project itself
    rv =  __dirname + '/../';
  } else if(fs.existsSync(__dirname + '/node_modules/actionhero/actionhero.js')){
    // running from a project's node_modules (bin or actionhero)
    rv = __dirname + '/node_modules/actionhero';
  } else {
    // installed globally
    rv = path.normalize(__dirname);
  }
  return rv;
};

var actionhero;

var vendorJs = [
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
];

var prodVendorJs = [
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/bootstrap/dist/js/bootstrap.min.js',
];

var vendorCss = [
  'bower_components/bootstrap/dist/css/bootstrap.min.css'
];


var prodVendorCss = [
  'bower_components/bootstrap/dist/css/bootstrap.min.css'
];

var init = function(fn, logging){
  var ActionHeroPrototype = require(actionheroRoot() + '/actionhero.js').actionheroPrototype;
  actionhero = new ActionHeroPrototype();
  if(logging === null){ logging = false; }
  configChanges = {
    general: {
      developmentMode: false
    }
  };
  if(logging === false){
    configChanges.logger = {transports: null};
  }
  actionhero.initialize({configChanges: configChanges}, function(err, api){
    fn(api, actionhero);
  });
};

module.exports = function(grunt) {
  var lintedFiles = [
    'Gruntfile.js',
    'actions/**/*.js',
    'config/**/*.js',
    'initializers/**/*.js',
    'src/**/*.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      npm_install: {
        command: [
          'npm install'
        ].join('&&'),
        options: {
          stdout: true,
          stderr: true
        }
      },
      bower_install: {
        command: [
          'bower install'
        ].join('&&'),
        options: {
          stdout: true,
          stderr: true
        }
      },
      moveTmpToDist: {
        command: 'mkdir -p ' + distDir + ' && cp -R ' + tmpDir + '/* "' + distDir + '"',
        options: {
          stdout: true,
          stderr: true
        }
      },
      moveImages: {
        command: 'cp -R ' + __dirname + '/src/img "' + distDir + '"',
        options: {
          stdout: true,
          stderr: true
        }
      },
      cleanTmp: {
        command: 'rm -rf "' + tmpDir + '"',
        options: {
          stdout: true,
          stderr: true
        }
      },
      startServer: {
        command: 'npm start'
      }
    },
    jshint: {
      options: {
        ignores: [],
        jshintrc: true
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'src/scss',
          cssDir: 'tmp/css',
          imagesPath: 'public/img',
          environment: 'production'
        }
      }
    },
    uglify: {
      options: {
        expand: true,
        flatten: true,
        ext: '.js'
      },
      vendor: {
        src: tmpDir + '/js/vendor.js',
        dest: distDir + '/js/vendor.js'
      },
      app: {
        src: tmpDir + '/js/app.js',
        dest: distDir + '/js/app.js'
      }
    },
    concat: {
      dist: {
        files: {
          "tmp/js/vendor.js": [].concat(prodVendorJs),
          "tmp/css/vendor.css": [].concat(prodVendorCss)
        }
      }
    },
    watch: {
      js: {
        files: ['src/**/*.js', 'src/**/*.jsx'],
        tasks: ['build:appjs', 'shell:moveTmpToDist']
      },
      css: {
        files: ['src/scss/**/*'],
        tasks: ['compass:dist', 'shell:moveTmpToDist']
      },
      img: {
        files: ['src/img/**/*'],
        tasks: ['shell:moveImages']
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: {
        tasks: ['shell:startServer', 'watch:js', 'watch:css', 'watch:img']
      }
    },
  });


  //  load npm grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('migrate','run any pending database migrations', function(){
    var done = this.async();
    init(function(api, actionhero){
      actionhero.start(function() {
        api.sequelize.migrate(function(){
          done();
        });
      });
    });
  });

  grunt.registerTask('build:appjs','build app js', function(){
    var done = this.async();
    var bowserifyChain = browserify()
      .add(__dirname + '/src/lib/browser.js')
      .exclude('path'); //path should never be used on client-side

    var allTemplates = walkDir(__dirname + '/src/views');

    allTemplates.forEach(function(templatePath){
      delete require.cache[require.resolve(templatePath)];
      var templateName = path.relative(__dirname + '/src/views', templatePath).replace('.jsx', '');
      bowserifyChain.require(templatePath, {expose: templateName});
    });

    bowserifyChain.transform(babelify, {presets: ['es2015', 'react']})
      .bundle(function(err, buf){
        if (err) {
          grunt.log.error(err);
        }
        var jsString = buf.toString();
        fs.writeFileSync(__dirname + '/tmp/js/app.js', jsString);
        done();
      });
  });

  // grunt.registerTask('build:vendor', ['concat:dist', 'uglify', 'shell:moveTmpToDist', 'shell:cleanTmp']);
  // grunt.registerTask('dev', ['jshint:test', 'build:vendor',  'shell:startServer']);

  grunt.registerTask('vendorTmp', ['concat:dist']);
  grunt.registerTask('appTmp', ['build:appjs', 'compass:dist']);

  grunt.registerTask('dev', ['shell:moveImages', 'vendorTmp', 'appTmp', 'shell:moveTmpToDist', 'concurrent']);
  grunt.registerTask('build:dist', ['vendorTmp', 'appTmp', 'shell:moveTmpToDist', 'uglify', 'shell:cleanTmp']);
  grunt.registerTask('publish', function() {
    throw grunt.util.error("This project no longer requires grunt publish to be run before pull requests.");
  });
};
