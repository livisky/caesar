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

		1)加上debug=true，自动加载压缩版js
		
			如http://127.0.0.1:8080/coupon-list.html?debug=true,
			
			则加载src/js/business/coupon/0.0.1/coupon-list.js;
			
			
		2)去掉debug=true，自动加载未压缩版js
		
			如http://127.0.0.1:8080/coupon-list.html,
			
			则加载js/business/coupon/0.0.1/coupon-list.js;


目录结构：

     	1、src下为未压缩的js、images、css文件
     	
     	2、执行fis release -op 发布到当前目录后 js、images、css为压缩打包版文件


demo示例解决的问题：

	1、绝对路径问题（fis压缩后的图片显示绝对路径）
	
	2、seajs+angularjs配合问题(angularjs自带代码模块化，项目部分功能可能只用jquery开发,方便统一模块化)
	
	3、目录合理配置及发布问题
	
	4、开发&调试问题


访问：
	http://127.0.0.1:8080/coupon-list.html?debug=true (开发&调试)http://127.0.0.1:8080/coupon-list.html (发布)
