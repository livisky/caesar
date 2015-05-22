define(function (require, exports, module) {
	require('common/util/0.0.1/util');
	angular.module('hik.seller.saleApp', ['ui.bootstrap', 'hik.util'])
		.controller('listController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {
		$scope.vm = {
			items: [{ id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 3, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }, { id: 1, name: '萤石商城全场大酬宾', start: '2015-04-20 20:30:30', end: '2015-04-20 20:30:30', status: '开启' }],
			page: {
				size: 10,
				index: 1,
				total: 23,
			},
		};
	
		//commands
		$scope.selectAll = function (event) {
			angular.forEach($scope.vm.items, function (i) { i.selected = (event.currentTarget || event.srcElement).checked; });
		};

		$scope.deleteItem = function (item) {
			item = angular.isArray(item) ? item : [item];
			$http.post('delete.php', item).success(function (data) {
				//after delete success, need to get current page again.
			}).error(function (reason) {
			});
		};

		$scope.deleteAll = function () {
			var toDelete = $filter('select')($filter('filter')($scope.vm.items, { selected: true }), 'id');
			if (toDelete.length > 0)
				$scope.deleteItem(toDelete);
		};
	}]);

	module.exports = {
		run: function (elem) {
			angular.bootstrap(elem, ['hik.seller.saleApp']);
		}
	};
});