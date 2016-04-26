'use strict';

describe('ui.utils.masks.br.ncm', function() {
	it('should load the demo page', function() {
		browser.get('/src/br/ncm/ncm.html');
		expect(browser.getTitle()).toEqual('NCM Spec');
	});

	describe('ui-br-ncm-mask:', function() {
		it('should apply a NCM mask while the user is typping:', function() {
			var BS = protractor.Key.BACK_SPACE;

			var tests = [
				{key:'@', viewValue:'', modelValue:''},
				{key:'3', viewValue:'3', modelValue:'3'},
				{key:'0', viewValue:'30', modelValue:'30'},
				{key:'1', viewValue:'301', modelValue:'301'},
				{key:'1', viewValue:'3011', modelValue:'3011'},
				{key:'.', viewValue:'3011', modelValue:'3011'},
				{key:'2', viewValue:'3011.2', modelValue:'30112'},
				{key:'0', viewValue:'3011.20', modelValue:'301120'},
				{key:'.', viewValue:'3011.20', modelValue:'301120'},
				{key:'1', viewValue:'3011.20.1', modelValue:'3011201'},
				{key:'0', viewValue:'3011.20.10', modelValue:'30112010'},
				{key:BS, viewValue:'3011.20.1', modelValue:'3011201'},
				{key:BS, viewValue:'3011.20', modelValue:'301120'},
				{key:BS, viewValue:'3011.2', modelValue:'30112'},
				{key:BS, viewValue:'3011', modelValue:'3011'},
				{key:BS, viewValue:'301', modelValue:'301'},
				{key:BS, viewValue:'30', modelValue:'30'},
				{key:BS, viewValue:'3', modelValue:'3'}
			];

			var input = element(by.model('ncm')),
				value = element(by.binding('ncm'));

			for (var i = 0; i < tests.length; i++) {
				input.sendKeys(tests[i].key);
				expect(input.getAttribute('value')).toEqual(tests[i].viewValue);
				expect(value.getText()).toEqual(tests[i].modelValue);
			}
		});

		it('should apply a NCM mask in a model with default value:', function() {
			var input = element(by.model('initializedNcm'));

			expect(input.getAttribute('value')).toEqual('3011.20.10');
		});
	});
});
