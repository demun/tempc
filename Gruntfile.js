module.exports = function (grunt) {
    'use strict';

    // 작업시간 표시
    require('time-grunt')(grunt);

    // 자동으로 grunt 태스크를 로드합니다. grunt.loadNpmTasks 를 생략한다.
    // require('load-grunt-tasks')(grunt);
    require('jit-grunt')(grunt);

    // Configurable paths
    var appConfig = {
        src: 'src',
        dest: 'Publish',
        dev: 'Develop',
        bower: 'bower_components'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: appConfig,

        clean: {
            dist: {
                files: [{
                    dot: true,
                    nonull: true,
                    src: '<%= config.dest %>'
                }]
            },
            dev: {
                files: [{
                    dot: true,
                    nonull: true,
                    src: [
                        '<%= config.dest %>',
                        '<%= config.dev %>'
                    ]
                }]
            },
        },

        // html 에서 인클루드를 사용합니다.
        includes: {
            dist: {
                expand: true,
                cwd: '<%= config.src %>/docs/html/',
                src: ['**/*.html'],
                dest: '<%= config.dest %>',
                options: {
                    flatten: true,
                    // debug: true,
                    includePath: '<%= config.src %>/docs/include/'
                }
            }
        },
        // html 구문검사를 합니다.
        htmlhint: {
            options: {
                htmlhintrc: 'grunt/.htmlhintrc'
            },
            dist: [
                '<%= config.dest %>/**/*.html',
                '!<%= config.dest %>/example/*',
                '!<%= config.dest %>/others/login1-backup.html',
            ]
        },

        // sass 를 css 로 변환합니다.
        sass: {
            options: {
                includePaths: ['scss'],
                precision: 6,               // 단위, 소숫점6개까지 사용
                indentType : 'space',       // 들여쓰기 공간사용
                indentWidth: 4,             // 들여쓰기 너비
                sourceComments: false,      // 디버깅을 위해 줄라인을 만듬
                sourceMap: true,
                outputStyle: 'expanded',
                sourceMapContents: true,
                sourceMapEmbed: true,
            },
            dist: {
                expand: true,
                cwd: '<%= config.src %>/sass/',
                // src: ['style.scss'],
                src: ['**/*.{sass,scss}'],
                dest: '<%= config.dest %>/css/',
                ext: '.css'
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: [
                            'Android 2.3',
                            'Android >= 4',
                            'Chrome >= 20',
                            'Firefox >= 24',
                            'Explorer >= 8',
                            'iOS >= 6',
                            'Opera >= 12',
                            'Safari >= 6'
                        ]
                    })
                ]
            },
            dist: {
                expand: true,
                cwd: '<%= config.dest %>/css',
                // src: ['style.css'],
                src: ['*.css'],
                dest: '<%= config.dest %>/css'
            }
        },
        // css 구문검사를 합니다.
        csslint: {
            options: {
                csslintrc: 'grunt/.csslintrc'
            },
            dist: {
                expand: true,
                cwd: '<%= config.dest %>/css',
                // src: ['style.css'],
                src: ['*.css', '!*.min.css'],
                dest: '<%= config.dest %>/css'
                // ext: '.css'
            }
        },
        // css 의 속성을 정렬해줍니다.
        csscomb: {
            options: {
                config: 'grunt/.csscomb.json'
            },
            dist: {
                expand: true,
                cwd: '<%= config.dest %>/css',
                // src: ['style.css'],
                src: ['*.css'],
                // src: ['*.css', '!*.min.css'],
                dest: '<%= config.dest %>/css'
                // ext: '.css'
            }
        },
        // css 를 압축합니다.
        cssmin: {
            options: {
                // noAdvanced: true
                compatibility: 'ie9',
                keepSpecialComments: '*',
                sourceMap: true,
                advanced: false
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dest %>/css',
                    src: ['*.css', '!*.min.css'],
                    // src: ['style.css'],
                    dest: '<%= config.dest %>/css',
                    ext: '.min.css'
                }]
            }
        },

        
        // 자바스크립트 구문검사를 합니다.
        jshint: {
            options: {
                jshintrc: 'grunt/.jshintrc',
                // force: true, // error 검출시 task를 fail 시키지 않고 계속 진단
                reporter: require('jshint-stylish') // output을 수정 할 수 있는 옵션
            },
            grunt: {
                src: ['Gruntfile.js']
            },
            dist: {
                src: '<%= config.src %>/js/site/*.js'
            }
        },

        concat: {
            options: {
                // separator: ';',
                stripBanners: false,
                banner: '/*!\n' +
                ' * <%= pkg.name %> | v<%= pkg.version %> | <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * <%= pkg.author %> | <%= pkg.email %>\n' +
                ' */\n'
            },
            jquery: {
                src: [
                    '<%= config.bower %>/jquery/dist/jquery.js',
                    '<%= config.bower %>/jquery-migrate/jquery-migrate.js',
                ],
                dest: '<%= config.dest %>/js/jquery.js'
            },
            plugins: {
                src: [
                    '<%= config.bower %>/fafnur-bxslider/dist/jquery.bxslider.min.js',
                    '<%= config.bower %>/jquery.easing/js/jquery.easing.min.js',
                    '<%= config.bower %>/smooth-scroll/smooth-scroll.min.js',
                    '<%= config.src %>/js/site/jquery.showHide.js',
                    '<%= config.src %>/js/site/jquery.sidebar.js',
                ],
                dest: '<%= config.dest %>/js/plugins.js'
            },
            site: {
                src: '<%= config.src %>/js/site/site.js',
                dest: '<%= config.dest %>/js/site.js'
            }
        },

        uglify: {
            options: {
                banner: '/*!\n' +
                ' * <%= pkg.name %> | v<%= pkg.version %> | <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * <%= pkg.author %> | <%= pkg.email %>\n' +
                ' */\n',
                compress: {
                    warnings: false
                },
                mangle: true,
                preserveComments: /^!|@preserve|@license|@cc_on/i
            },
            jquery: {
                src: '<%= concat.jquery.dest %>',
                dest: '<%= config.dest %>/js/jquery.min.js'
            },
            plugins: {
                src: '<%= concat.plugins.dest %>',
                dest: '<%= config.dest %>/js/plugins.min.js'
            },
            site: {
                src: '<%= config.dest %>/js/site.js',
                dest: '<%= config.dest %>/js/site.min.js'
            }
        },

        
        // others task
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/images/',
                    src: '**/*.{png,jpeg,jpg,gif,ico}',
                    dest: '<%= config.dest %>/images/'
                }]
            }
        },

        copy: {
            dist: {
                files: [
                    // fontawesome
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.bower %>/fontawesome/fonts',
                        src: '*.{eot,svg,ttf,woff,woff2,otf}',
                        dest: '<%= config.dest %>/fonts/'
                    },
                    // Noto Sans Korean fonts
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.bower %>/noto-sans-scott/fonts/',
                        src: '*',
                        dest: '<%= config.dest %>/fonts/'
                    },
                ]
            },
            
            dev: {
                files: [
                    // html
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.src %>/docs/html',
                        src: '**/*.html',
                        dest: '<%= config.dev %>'
                    },
                    // include html
                    {
                        expand: true,
                        cwd: '<%= config.src %>/docs/',
                        src: 'include/**/*.html',
                        dest: '<%= config.dev %>/'
                    },
                    // fonts
                    {
                        expand: true,
                        cwd: '<%= config.src %>/fonts',
                        src: '*.*',
                        dest: '<%= config.dev %>/fonts'
                    },
                    // images
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.src %>/images',
                        // src: '**/*.{png,jpeg,jpg,gif}',
                        src: '**/*',
                        dest: '<%= config.dev %>/images/'
                    },
                    // js
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.dest %>/js',
                        src: '*.*',
                        dest: '<%= config.dev %>/js/'
                    },
                    // css
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.dest %>/css',
                        src: '*.*',
                        dest: '<%= config.dev %>/css/'
                    },

                ]
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            dist: [
                'imagemin',
                'copy:dist'
            ],
            dev: [
                'imagemin',
                'copy'
            ]
        },

        watch: {
            options: { livereload: true },
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['jshint:grunt'],
            },
            html: {
                files: ['<%= config.src %>/docs/**/*.html'],
                tasks: ['includes','htmlhint'],
            },
            sass: {
                files: ['<%= config.src %>/sass/**/*.{sass,scss}'],
                tasks: ['sass','postcss','csscomb','cssmin'],
            },
            jsnt: {
                files: ['<%= config.src %>/js/**/*.js'],
                tasks: ['jshint','concat','uglify'],
            },
            // fonts: {
            //     files: ['<%= config.src %>/fonts/*'],
            //     tasks: ['newer:copy:dist'],
            // },
            img: {
                files: ['<%= config.src %>/images/**/*.{gif,jpeg,jpg,png}'],
                tasks: ['newer:imagemin']
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    livereload: 35729,
                    // keepalive: true,
                    base: '<%= config.dest %>',
                    open: 'http://<%= connect.server.options.hostname %>:<%= connect.server.options.port %>/test.html'
                }
            }
        },

    });

    grunt.registerTask('serve', function (target) {
      if (target === 'dist') {
          return grunt.task.run(['connect', 'watch']);
      }

      grunt.task.run([
        'default',
        'connect',
        'watch'
      ]);

    });

    // html task
    grunt.registerTask('html', [
            'includes',
            'htmlhint'
        ]
    );

    grunt.registerTask('css', [
            // 'clean',
            'sass',
            'postcss',
            'csscomb',
            'cssmin'
        ]
    );

    // javascript task
    grunt.registerTask('jsnt', [
            'jshint',
            'concat',
            'uglify'
        ]
    );

    grunt.registerTask('build', [
        'clean:dev',
        'html',
        'css',
        'jsnt',
        'concurrent:dev'
    ]);

    grunt.registerTask('default', [
        'clean:dist',
        'html',
        'css',
        'jsnt',
        'concurrent:dist'
    ]);


};
