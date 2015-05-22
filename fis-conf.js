fis.config.merge({
    statics: 'statics/admin',
})
fis.config.set('modules.parser.less', 'less');
fis.config.set('roadmap.ext.less', 'css');
// seajs 处理器
fis.config.set('modules.postpackager','seajs');
// 用fis的js包装器
fis.config.set('settings.postprocessor.jswrapper.type','amd');
 //不要压缩require关键字，否则seajs会识别不了require

fis.config.set('settings.optimizer.uglify-js', {
    mangle: {
        except: 'exports, module, require, define'
    }
});

fis.config.merge({
    roadmap : {
        domain : "http://statics.shipin7.com/statics/admin"
    }
});
fis.config.set('roadmap.path',[
  {
                //一级同名组件，可以引用短路径，比如sea-modules/jquery/juqery.js
                //直接引用为var $ = require('jquery');
                reg : /^\/src\/js\/business\/([^\/]+)\/\1\.(js|coffee|less|css|jpg|gif|png)$/i,
                //是组件化的，会被jswrapper包装
                isMod : true,
                //less和css文件会做csssprite处理
                useSprite : true,
                //id为文件夹名
                id : '$1',
                release: '/$1'
            },
            {
                //sea-modules目录下的其他文件
                reg : /^\/src\/js\/widget\/(.*)\.(js|coffee|less|css|jpg|gif|png)$/i,
                //是组件化的，会被jswrapper包装
                isMod : false,
                //id是去掉sea-modules和.js后缀中间的部分
                id : '$1',
                release: '/js/widget/$1'
            },
            {
                //sea-modules目录下的其他文件
                reg : /^\/src\/js\/config\/(.*)\.(js)$/i,
                //是组件化的，会被jswrapper包装
                isMod : false,
                //id是去掉sea-modules和.js后缀中间的部分
                id : '$1',
                release: '/js/config/$1'
            },                       
            {
                //sea-modules目录下的其他文件
                reg : /^\/src\/(.*)\.(js|coffee|less|css|jpg|gif|png)$/i,
                //是组件化的，会被jswrapper包装
                isMod : true,
                //less和css文件会做csssprite处理
                useSprite : true,
                //id是去掉sea-modules和.js后缀中间的部分
                id : '$1',
                release: '/$1'
            }                  
  ]);

fis.config.set('pack', 
    {
        '/js/lib.js': [
            '/src/js/widget/jquery/1.7.1/**.js',
            '/src/js/widget/angularjs/1.2.5/**.js',
            '/src/js/widget/bootstrap/0.12.1/**.js',
            '/lib/seajs/sea.js',
            '/src/js/config/sea-config.js'
        ],
        '/css/common.css': [
            '/src/css/common/**.css'
        ]

    }
);