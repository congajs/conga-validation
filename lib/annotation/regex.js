/*
 * This file is part of the conga-validation library.
 *
 * (c) Marc Roulias <marc@lampjunkie.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var Annotation = require('conga-annotations').Annotation;

module.exports = Annotation.extend({

	annotation: 'Assert:Regex',
	targets: [Annotation.PROPERTY],
	validator: 'conga-validation:validator/regex',
	match: false,
	pattern: null,

	init: function(data){
		this.message = !data.message ? 'This value is not valid' : data.message;
		this.pattern = data.pattern;
		if (typeof data.match !== 'undefined') this.match = data.match;
	},

	getParameters: function(){
		return {
			match: this.match,
			pattern: this.pattern
		};
	}
});