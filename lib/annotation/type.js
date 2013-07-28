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

	annotation: 'Assert:Type',
	targets: [Annotation.PROPERTY],
	validator: 'conga-validation:validator/type',
	match: false,
	pattern: null,

	init: function(data){
		this.message = !data.message ? 'This value should be of type {{ type }}' : data.message;
		this.type = data.type;
	},

	getParameters: function(){
		return {
			type : this.type
		};
	}
});