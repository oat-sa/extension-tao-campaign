module.exports = function(grunt) { 

    var requirejs   = grunt.config('requirejs') || {};
    var clean       = grunt.config('clean') || {};
    var copy        = grunt.config('copy') || {};

    var root        = grunt.option('root');
    var libs        = grunt.option('mainlibs');
    var ext         = require(root + '/tao/views/build/tasks/helpers/extensions')(grunt, root);

    /**
     * Remove bundled and bundling files
     */
    clean.taocampaignbundle = ['output',  root + '/taoCampaign/views/js/controllers.min.js'];
    
    /**
     * Compile tao files into a bundle 
     */
    requirejs.taocampaignbundle = {
        options: {
            baseUrl : '../js',
            dir : 'output',
            mainConfigFile : './config/requirejs.build.js',
            paths : { 'taoCampaign' : root + '/taoCampaign/views/js' },
            modules : [{
                name: 'taoCampaign/controller/routes',
                include : ext.getExtensionsControllers(['taoCampaign']),
                exclude : ['mathJax', 'mediaElement'].concat(libs)
            }]
        }
    };

    /**
     * copy the bundles to the right place
     */
    copy.taocampaignbundle = {
        files: [
            { src: ['output/taoCampaign/controller/routes.js'],  dest: root + '/taoCampaign/views/js/controllers.min.js' },
            { src: ['output/taoCampaign/controller/routes.js.map'],  dest: root + '/taoCampaign/views/js/controllers.min.js.map' }
        ]
    };

    grunt.config('clean', clean);
    grunt.config('requirejs', requirejs);
    grunt.config('copy', copy);

    // bundle task
    grunt.registerTask('taocampaignbundle', ['clean:taocampaignbundle', 'requirejs:taocampaignbundle', 'copy:taocampaignbundle']);
};
