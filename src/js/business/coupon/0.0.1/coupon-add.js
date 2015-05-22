define(function (require, exports, module) {
	require('common/util/0.0.1/util');
	var app = angular.module("hik.seller.couponApp", ['ui.bootstrap', 'hik.util'])
	//begin business related directives
		.factory('globalData', function () { return { dP: '选择省', dC: '选择市', pCom: '请选择商品类型' }; })//for sharing data between controllers
		.directive('hikValQuota', function () {
		return {
			require: 'ngModel',
			restrict: 'A',
			link: function (scope, element, attrs, ctrl) {
				var monitor = function (v) {
					if (scope.model.meetQuota)//the meet quota checkbox is checked
					{
						var regex = /^[-+]?[0-9]*\.?[0-9]+$/;
						ctrl.$setValidity('quota', regex.test(scope.model.quota));
					}
					else {
						ctrl.$setValidity('quota', true);
					}
				};
				scope.$watch(attrs.ngModel, monitor);
				scope.$watch('model.meetQuota', monitor);
			}
		};
	})
		.directive('hikValAddress', function (globalData) {
		return {
			require: 'ngModel',
			restrict: 'A',
			link: function (scope, element, attrs, ctrl) {
				var monitor = function (v) {
					if (scope.model.meetAddress)//address is checked
					{
						//use model value here, because v is the the real value and we can't get the model directly, too. Because addresses are created dynamical
						ctrl.$setValidity('address', ctrl.$modelValue !== globalData.dP);
					}
					else {
						ctrl.$setValidity('address', true);
					}
				};

				scope.$watch(attrs.ngModel, monitor);
				scope.$watch('model.meetAddress', monitor);
			}
		};
	})
	//end business related directives
		.controller("couponController", ['$scope', '$modal', '$http', 'globalData', function ($scope, $modal, $http, globalData) {
		//metadata
		var dP = globalData.dP;
		var dC = globalData.dC;
		$scope.metadata = {
			provinces: [dP, '浙江', '广东'],
			pcMapping: {
				'浙江': [dC, '杭州', '宁波'],
				'广东': [dC, '广州']
			}
		};
		$scope.metadata.pcMapping[dP] = [dC];
	
		//init model
		$scope.model = {
			type: 2,
			targetComs: 2,
			rule: 2,
			meetQuota: true,
			meetAddress: true,
			discountType: 0,
			gift: 1,
			status: 'active',
			addresses: [{ pName: 'p1', pValue: dP, cName: 'c1', cValue: dC }],
			selectedComs: [],
			selectedGoods: []
		};
	
		//init vm
		$scope.submitted = false;
	
		//commands
		$scope.addCom = function () {
			var modalInstance = $modal.open({
				templateUrl: 'template/business/selectCom.html',
				controller: "selectComController",
				resolve: {
					data: function () {
						return angular.copy($scope.model.selectedComs);
					}
				},
				size: 'add-com'
			});
			modalInstance.opened.then(function () {

			});
			modalInstance.result.then(function (result) {
				$scope.model.selectedComs = result;
			}, function (reason) {

				});
		};

		$scope.addGoods = function () {
			var modalInstance = $modal.open({
				templateUrl: 'template/business/selectGoods.html',
				controller: "selectGoodsController",
				resolve: {
					data: function () {
						return angular.copy($scope.model.selectedGoods);
					}
				},
				size: 'add-goods'
			});
			modalInstance.opened.then(function () {

			});
			modalInstance.result.then(function (result) {
				$scope.model.selectedGoods = result;
			}, function (reason) {

				});
		};

		$scope.deleteCom = function (item) {
			$scope.model.selectedComs.splice($scope.model.selectedComs.indexOf(item), 1);
		};

		$scope.deleteGoods = function (item) {
			$scope.model.selectedGoods.splice($scope.model.selectedGoods.indexOf(item), 1);
		};

		$scope.addAddr = function () {
			var idx = $scope.model.addresses.length + 1;
			$scope.model.addresses.push({ pName: 'p' + idx, pValue: dP, cName: 'c' + idx, cValue: dC });
		};

		$scope.submit = function () {
			if ($scope.couponForm.$valid) {
				$http.post('process.php', $scope.model).success(function (data) {
					console.log(data);
					if (!data.success) {
						// if not successful, bind errors to error variables
						$scope.errorName = data.errors.name;
						$scope.errorSuperhero = data.errors.superheroAlias;
					} else {
						// if successful, bind success message to message
						$scope.message = data.message;
					}
				}).error(function (reason) { });
			}
			else {
				$scope.couponForm.submitted = true;
			}
		};
	}])
		.controller("selectGoodsController", ['$scope', '$modal', '$modalInstance', '$filter', 'globalData', 'data', function ($scope, $modal, $modalInstance, $filter, globalData, data) {
		//will load from service
		$scope.model = {
			coms: [{ name: 'C2C 互联网摄影机', type: '摄像机', url: 'statics/src/images/1.png', id: 1, selected: false }, { name: '萤石运动摄像机S1', type: '摄像头', url: 'statics/src/images/2.png', id: 2, selected: false }
				, { name: 'C6 互联网云台摄像机', type: '摄像机', url: 'statics/src/images/3.png', id: 3, selected: false }, { name: 'S1专用防水壳', type: '摄像头', url: 'statics/src/images/4.png', id: 4, selected: false }
				, { name: 'C2C 互联网摄影机', type: '摄像机', url: 'statics/src/images/1.png', id: 5, selected: false }, { name: '萤石运动摄像机S1', type: '摄像头', url: 'statics/src/images/2.png', id: 6, selected: false }
				, { name: 'C6 互联网云台摄像机', type: '摄像机', url: 'statics/src/images/3.png', id: 7, selected: false }, { name: 'S1专用防水壳', type: '摄像头', url: 'statics/src/images/4.png', id: 8, selected: false }
				, { name: 'C2C 互联网摄影机', type: '摄像机', url: 'statics/src/images/1.png', id: 9, selected: false }, { name: '萤石运动摄像机S1', type: '摄像头', url: 'statics/src/images/2.png', id: 10, selected: false }
				, { name: 'C6 互联网云台摄像机', type: '摄像机', url: 'statics/src/images/3.png', id: 11, selected: false }, { name: 'S1专用防水壳', type: '摄像头', url: 'statics/src/images/4.png', id: 12, selected: false }]
		};
		var coms = $scope.model.coms;
		for (var i = 0; i < data.length; i++) {
			for (var j = 0; j < coms.length; j++) {
				if (data[i].id == coms[j].id) {
					coms[j].selected = true;
					break;
				}
			};
		}

		$scope.model.categories = coms.unique(function (i) { return i.type; });
		$scope.model.categories.unshift(globalData.pCom);
		$scope.model.category = globalData.pCom;
	
		//event handler
		$scope.select = function (item) {
			if (item.selected) {
				item.selected = false;
			}
			else {
				angular.forEach(coms, function (i) { i.selected = false; });
				item.selected = true;
			}
		};

		$scope.ok = function () {
			$modalInstance.close($filter('filter')(coms, { selected: true }));
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	}])
		.controller("selectComController", ['$scope', '$modal', '$modalInstance', '$filter', 'globalData', 'data', function ($scope, $modal, $modalInstance, $filter, globalData, data) {
		//will load from service
		$scope.model = {
			coms: [{ name: 'C2C 互联网摄影机', type: '摄像机', url: 'statics/src/images/1.png', id: 1, selected: false }, { name: '萤石运动摄像机S1', type: '摄像头', url: 'statics/src/images/2.png', id: 2, selected: false }
				, { name: 'C6 互联网云台摄像机', type: '摄像机', url: 'statics/src/images/3.png', id: 3, selected: false }, { name: 'S1专用防水壳', type: '摄像头', url: 'statics/src/images/4.png', id: 4, selected: false }
				, { name: 'C2C 互联网摄影机', type: '摄像机', url: 'statics/src/images/1.png', id: 5, selected: false }, { name: '萤石运动摄像机S1', type: '摄像头', url: 'statics/src/images/2.png', id: 6, selected: false }
				, { name: 'C6 互联网云台摄像机', type: '摄像机', url: 'statics/src/images/3.png', id: 7, selected: false }, { name: 'S1专用防水壳', type: '摄像头', url: 'statics/src/images/4.png', id: 8, selected: false }
				, { name: 'C2C 互联网摄影机', type: '摄像机', url: 'statics/src/images/1.png', id: 9, selected: false }, { name: '萤石运动摄像机S1', type: '摄像头', url: 'statics/src/images/2.png', id: 10, selected: false }
				, { name: 'C6 互联网云台摄像机', type: '摄像机', url: 'statics/src/images/3.png', id: 11, selected: false }, { name: 'S1专用防水壳', type: '摄像头', url: 'statics/src/images/4.png', id: 12, selected: false }]
		};
		var coms = $scope.model.coms;
		for (var i = 0; i < data.length; i++) {
			for (var j = 0; j < coms.length; j++) {
				if (data[i].id == coms[j].id) {
					coms[j].selected = true;
					break;
				}
			};
		}

		$scope.model.categories = coms.unique(function (i) { return i.type; });
		$scope.model.categories.unshift(globalData.pCom);
		$scope.model.category = globalData.pCom;
	
		//event handler
		$scope.clear = function () {
			angular.forEach(coms, function (i) { i.selected = false; });
		};

		$scope.selectAll = function (event) {
			angular.forEach(coms, function (i) { i.selected = (event.currentTarget || event.srcElement).checked; });
		};

		$scope.ok = function () {
			$modalInstance.close($filter('filter')(coms, { selected: true }));
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	}]);
	
	module.exports={
		run:function(elem){
			angular.bootstrap(elem,['hik.seller.couponApp']);
		}
	}
})
