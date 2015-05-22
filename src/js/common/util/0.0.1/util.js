define(function (require, exports, module) {
	angular.module("hik.util", [])
		.directive('ngFocus', [function () {
		var FOCUS_CLASS = "ng-focused";
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attrs, ctrl) {
				ctrl.$focused = false;
				element.bind('focus', function (evt) {
					element.addClass(FOCUS_CLASS);
					scope.$apply(function () {
						ctrl.$focused = true;
					});
				}).bind('blur', function (evt) {
					element.removeClass(FOCUS_CLASS);
					scope.$apply(function () {
						ctrl.$focused = false;
					});
				});
			}
		};
	}])
		.directive('hikValRange', function () {
		return {
			require: 'ngModel',
			restrict: 'A',
			link: function (scope, element, attrs, ctrl) {
				scope.$watch(attrs.ngModel, function (v) {
					if (!v && v !== 0)//0 is false, here only treat undefined, null and, '' as false
					{
						ctrl.$setValidity('range', true);
						return;
					}
					var restrict = attrs.hikValRange;
					if (restrict) {
						var values = restrict.split('-');
						if (values.length == 2) {
							ctrl.$setValidity('range', -v <= -values[0] && -v >= -values[1]);
						}
						else if (values.length == 1) {
							ctrl.$setValidity('range', -v <= -values[0]);
						}
						else {
							ctrl.$setValidity('range', true);
						}
					}
				});
			}
		};
	})
		.directive('hikValDaterange', function () {
		return {
			require: 'ngModel',
			restrict: 'A',
			link: function (scope, element, attrs, ctrl) {
				if (ctrl) {
					var otherInput = element.inheritedData("$formController")[attrs.hikValDaterange];
					var lessThanValidator = function (value) {
						var t = Date.parse(value);
						var f = Date.parse(otherInput.$viewValue);
						var validity = true;
						if (typeof (f) == 'number' && typeof (t) == 'number' && !isNaN(f) && !isNaN(t))
							validity = f <= t;
						ctrl.$setValidity('daterange', validity);

						return value;
					};

					ctrl.$parsers.push(lessThanValidator);
					ctrl.$formatters.push(lessThanValidator);

					otherInput.$parsers.push(function (value) {
						var f = Date.parse(value);
						var t = Date.parse(ctrl.$viewValue);
						if (typeof (f) == 'number' && typeof (t) == 'number' && !isNaN(f) && !isNaN(t))
							ctrl.$setValidity('daterange', f <= t);
						else
							ctrl.$setValidity('daterange', true);

						return value;
					});
				}
			}
		};
	})
		.directive('hikValDatetimerange', function () {
		return {
			require: 'ngModel',
			restrict: 'A',
			link: function (scope, element, attrs, ctrl) {
				if (ctrl) {
					var otherInput = element.inheritedData("$formController")[attrs.hikValDatetimerange];
					var innerValidator = function (f, t) {
						var validity = true;
						var regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
						if (regex.test(f) && regex.test(t)) {
							var f_sects = f.split(':');
							var t_sects = t.split(':');
							validity = -f_sects[0] > -t_sects[0] || (-f_sects[0] == -t_sects[0] && -f_sects[1] > -t_sects[1]);
						}
						ctrl.$setValidity('daterange', validity);

						return validity;
					};

					var lessThanValidator = function (value) {
						innerValidator(otherInput.$viewValue, value);
						return value;
					};

					ctrl.$parsers.push(lessThanValidator);
					ctrl.$formatters.push(lessThanValidator);

					otherInput.$parsers.push(function (value) {
						innerValidator(value, ctrl.$viewValue);
						return value;
					});
				}

				var monitor = function (v) {
					var f = scope.model.fromTime;
					var t = scope.model.toTime;
					var regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
					if (!regex.test(f) || !regex.test(t)) {
						ctrl.$setValidity('datetimerange', true);
					}
					else {
						var f_sects = f.split(':');
						var t_sects = t.split(':');
						ctrl.$setValidity('datetimerange', -f_sects[0] > -t_sects[0] || (-f_sects[0] == -t_sects[0] && -f_sects[1] > -t_sects[1]));
					}
				};
				scope.$watch('model.fromTime', monitor);
				scope.$watch('model.toTime', monitor);
			}
		};
	})
	//dynamic name solution can be linked from http://stackoverflow.com/questions/21455695/angularjs-dynamic-form-field-validation
		.directive("dynamicName", ['$compile', function ($compile) {
		return {
			restrict: "A",
			terminal: true,
			priority: 1000,
			link: function (scope, element, attrs) {
				element.attr('name', scope.$eval(attrs.dynamicName));
				element.removeAttr("dynamic-name");
				$compile(element)(scope);
			}
		};
	}])
		.directive('hikPlaceholder', ['$compile', function ($compile) {
		return {
			restrict: "A",
			link: function (scope, element, attrs) {
				var hasPlaceholder = !document.attachEvent;
				var placeholderText = attrs['placeholder'] || attrs['hikPlaceholder'];
				if (placeholderText) {
					if (!hasPlaceholder) {
						var wrapper = angular.element('<span class="placeholder"></span>');
						var placeholder = angular.element('<label for=' + attrs['name'] + '>' + placeholderText + '</label>');
						element.wrap(wrapper).after(placeholder);
					
						//montor model value if changed from model
						scope.$watch(attrs.ngModel, function () {
							if (element.val()) {
								element.next().addClass('ng-hide');
							}
							else {
								element.next().removeClass('ng-hide');
							}
						});
					
						//always add hidden for IE less than 9 which doesn't have input event
						element.on('keydown', function () {
							element.next().addClass('ng-hide');
						});

						element.on('keyup input change', function () {
							if (element.val()) {
								element.next().addClass('ng-hide');
							}
							else {
								element.next().removeClass('ng-hide');
							}
						});
					}
					else {
						element.attr('placeholder', placeholderText);
					}
				}
			}
		};
	}])
		.filter('paging', function () {
		return function (items, index, pageSize) {
			if (!items)
				return [];

			var offset = (index - 1) * pageSize;
			return items.slice(offset, offset + pageSize);
		};
	})
		.filter('select', function () {
		return function (items, selector) {
			if (selector && items) {
				if (typeof (selector) == 'string') {
					var s = selector;
					selector = function (i) { return i[s]; };
				}

				if (typeof (selector) == 'function') {
					var result = [];
					angular.forEach(items, function (i) { result.push(selector(i)); });

					return result;
				}
			}
			return [];
		};
	});

	(function () {
		Array.prototype.unique = Array.prototype.unique || function (selector) {
			var n = {}, r = [];
			for (var i = 0; i < this.length; i++) {
				var item = (selector && selector(this[i])) || this[i];
				if (!n[item]) {
					n[item] = true;
					r.push(item);
				}
			}
			return r;
		};
	} ());
})
