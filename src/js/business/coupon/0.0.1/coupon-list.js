define(function (require, exports, module) {
	require('common/util/0.0.1/util');
	angular.module('hik.seller.couponApp', ['ui.bootstrap', 'hik.util'])
		.controller('listCouponController', ['$scope', '$filter', '$http', '$modal', function ($scope, $filter, $http, $modal) {
		$scope.vm = {
			items: [{ id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 3, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启', number: 3 }],
			page: {
				size: 10,
				index: 1,
				total: 23,
			}
		};
	
		//commands
		$scope.selectAll = function (event) {
			angular.forEach($scope.vm.items, function (i) { i.selected = (event.currentTarget || event.srcElement).checked; });//IE8 doesn't have currentTarget property
		};

		$scope.deleteItem = function (item) {
			item = angular.isArray(item) ? item : [item];
			$http.post('delete.php', item).success(function (data) {
				//after delete success, need to get current page again.
			}).error(function (reason) {
			});
		};

		$scope.exportCoupon = function (item) {
			var modalInstance = $modal.open({
				templateUrl: 'template/business/exportCoupon.html',
				controller: "exportCouponController",
				resolve: {
					data: function () {
						return item;
					},
				},
				size: 'export-coupon'
			});
			modalInstance.opened.then(function () {

			});
			modalInstance.result.then(function (result) {

			}, function (reason) {

				});
		};

		$scope.deleteAll = function () {
			var items = $filter('select')($filter('filter')($scope.vm.items, { selected: true }), 'id');
			if (items.length > 0)
				$scope.deleteItem(items);
		};
	}])
		.controller('exportCouponController', ['$scope', '$modalInstance', 'data', function ($scope, $modalInstance, data) {
		$scope.vm = {
			item: data
		};

		$scope.ok = function () {
			if ($scope.form.$valid) {
				data.number = data.number - $scope.vm.count;
				$modalInstance.close();
			}
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	}]);
	
	module.exports={
		run:function(elem){
			angular.bootstrap(elem,['hik.seller.couponApp']);
		}	
	};
});