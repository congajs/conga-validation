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

	annotation: 'Assert:Length',
	targets: [Annotation.PROPERTY],
	validator: 'conga-validation:validator/length',

	init: function(data){
		this.message = !data.message ? 'This value must be between %s and %s characters long' : data.message;
		this.min = data.min;
		this.max = data.max;	
	},

	getParameters: function(){
		return {
			min : this.min,
			max : this.max
		};
	}
});