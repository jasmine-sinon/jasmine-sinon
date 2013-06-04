'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jasmine_node: {
      forceExit: true,
      isVerbose: true
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'lib/jasmine-sinon.js']
    },

    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      dev: {
        reporters: 'dots'
      },
      ci: {
        singleRun: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma-0.9.1');
  grunt.loadNpmTasks('grunt-jasmine-node');

  grunt.registerTask('test', ['jshint', 'karma:ci', 'jasmine_node']);
  grunt.registerTask('default', 'test');

};
