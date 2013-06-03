'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
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

  grunt.registerTask('test', ['jshint', 'karma:ci']);
  grunt.registerTask('default', 'test');

};
