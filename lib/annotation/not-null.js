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

	annotation: 'Assert:NotNull',
	targets: [Annotation.PROPERTY],
	validator: 'conga-validation:validator/not-null',

	init: function(data){
		this.message = !data.message ? 'This value should not be null' : data.message;
	},

	getParameters: function(){
		return {};
	}
});