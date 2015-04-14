'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        mochaTest: {
            unit: {
                options: {
                    reporter: 'spec',
                    clearRequireCache : true
                },
                src : ['tests/unit/**/*.js']
            }
        },
        jshint : {
            options : {
                jshintrc : '.jshintrc'
            },
            gruntfile : {
                src : 'Gruntfile.js'
            },
            lib : {
                src : ['src/**/*.js']
            },
            test : {
                src : ['tests/unit/**/*.js', 'tests/*.js']
            }
        },
        watch : {
            gruntfile : {
                files : '<%= jshint.gruntfile.src %>',
                tasks : ['jshint:gruntfile']
            },
            lib : {
                files : '<%= jshint.lib.src %>',
                tasks : ['jshint:lib', 'mochaTest:unit']
            },
            test : {
                files : '<%= jshint.test.src %>',
                tasks : ['jshint:test', 'mochaTest:unit']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['jshint', 'nodeunit']);

};
