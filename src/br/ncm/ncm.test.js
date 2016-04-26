'use strict';

require('../br-masks');

describe('ui-br-ncm-mask', function() {
	beforeEach(angular.mock.module('ui.utils.masks.br'));

	it('should throw an error if used without ng-model', function() {
		expect(function() {
			TestUtil.compile('<input ui-br-ncm-mask>');
		}).toThrow();
	});

	it('should register a $parser and a $formatter', function() {
		var input = TestUtil.compile('<input ng-model="model">');
		var model = input.controller('ngModel');

		var maskedInput = TestUtil.compile('<input ng-model="maskedModel" ui-br-ncm-mask>');
		var maskedModel = maskedInput.controller('ngModel');

		expect(maskedModel.$parsers.length).toBe(model.$parsers.length + 1);
		expect(maskedModel.$formatters.length).toBe(model.$formatters.length + 1);
	});

	it('should convert number inputs to correct format', function() {
		var input = TestUtil.compile('<input ng-model="model" ui-br-ncm-mask>', {
			model: 30112010
		});

		var model = input.controller('ngModel');
		expect(model.$viewValue).toBe('3011.20.10');
	});

	it('should format initial model values', function() {
		var input = TestUtil.compile('<input ng-model="model" ui-br-ncm-mask>', {
			model: '30112010'
		});

		var model = input.controller('ngModel');
		expect(model.$viewValue).toBe('3011.20.10');
	});

	it('should accept formatted initial model values', function() {
		var input = TestUtil.compile('<input ng-model="model" ui-br-ncm-mask>', {
			model: '3011.20.10'
		});

		var model = input.controller('ngModel');
		expect(model.$viewValue).toBe('3011.20.10');
	});

	it('should ignore non digits', function() {
		var input = TestUtil.compile('<input ng-model="model" ng-model-options="{allowInvalid:true}" ui-br-ncm-mask>');
		var model = input.controller('ngModel');

		var tests = [
			{value:'@', viewValue:'', modelValue:''},
			{value:'2-', viewValue:'2', modelValue:'2'},
			{value:'23a', viewValue:'23', modelValue:'23'},
			{value:'23_34', viewValue:'2334', modelValue:'2334'},
			{value:'23346!', viewValue:'2334.6', modelValue:'23346'},
			{value:'23346!324', viewValue:'2334.63.24', modelValue:'23346324'},
		];

		tests.forEach(function(test) {
			input.val(test.value).triggerHandler('input');
			expect(model.$viewValue).toBe(test.viewValue);
			expect(model.$modelValue).toBe(test.modelValue);
		});
	});
});
