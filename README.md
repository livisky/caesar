# hikfis
fis+angularjs+seajs

安装：

	npm install fis -g

	fis -v

	npm install fis-postpackager-seajs -g

发布：

	1、如果是域名访问（如：http://127.0.0.1:8080）则
		1）在src/js/config下设置域名地址，如：staticPath="http://127.0.0.1:8080";
		2）执行发布 fis release -op （发布fis根目录）
	        ---------fis release -op -d E:\Project\newmall\statics（到E盘项目目录）

	2、如果是域名下二级目录访问（如：http://127.0.0.1:8080/admin）则
	   1）在fis-config.js里配置
			fis.config.merge({
			    roadmap : {
			        domain : "http://127.0.0.1:8080/admin"
			    }
			});
		2）执行发布 fis release --domains -op （发布fis根目录）
		   ---------fis release --domains -op -d E:\Project\newmall\statics（到E盘项目目录）


	3、方便开发及线上调试（sea.config里配置）

		加上debug=true，自动加载未压缩版js
	如http://127.0.0.1:8080/coupon-list.html?debug=true,则加载src/js/business/coupon/0.0.1/coupon-list.js;
		去掉debug=true，如http://127.0.0.1:8080/coupon-list.html,则加载js/business/coupon/0.0.1/coupon-list.js;



目录结构：

     src下为未压缩的js、images、css文件

     执行fis release -op 后 js、images、css为压缩打包版文件
