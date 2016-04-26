'use strict';

var StringMask = require('string-mask');
var maskFactory = require('mask-factory');

var ncmMask8D = new StringMask('0000.00.00');
var ncmMask2D = new StringMask('00');

module.exports = maskFactory({
	clearValue: function(rawValue) {
		return rawValue.toString().replace(/\D/g, '').slice(0, 8);
	},
	format: function(cleanValue) {
		var formatedValue;
		if (cleanValue.length < 8) {
			formatedValue = ncmMask2D.apply(cleanValue) || '';
		} else {
			formatedValue = ncmMask8D.apply(cleanValue);
		}
		return formatedValue.replace(/\D$/, '');
	},
	validations: {
		ncm: function(value) {
			return value.length === 8 || value.length === 2;
		}
	}
});
