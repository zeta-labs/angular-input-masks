'use strict';

var StringMask = require('string-mask');
var maskFactory = require('mask-factory');

var ncmMask8D = new StringMask('0000.00.00');
var ncmMask2D = new StringMask('00');

module.exports = maskFactory({
	clearValue: function(rawValue) {
		return rawValue.toString().replace(/[^0-9]/g, '').slice(0, 8);
	},
	format: function(cleanValue) {
		if (cleanValue.length === 2) {
			return ncmMask2D.apply(cleanValue) || '';
		}
		return ncmMask8D.apply(cleanValue);
	},
	validations: {
		ncm: function(value) {
			return value.length === 8 || value.length === 2;
		}
	}
});
