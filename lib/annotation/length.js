/*
 * This file is part of the conga-validation library.
 *
 * (c) Marc Roulias <marc@lampjunkie.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * 
 * 
 * @author Marc Roulias <marc@lampjunkie.com>
 * 
 * @param {Object} data
 */
var Length = function(data){

	this.message = !data.message ? 'This value must be between %s and %s characters long' : data.message;
	this.min = data.min;
	this.max = data.max;
};

/**
 * Define the annotation string to find
 * 
 * @var {String}
 */
Length.annotation = 'Assert:Length';

Length.prototype.validator = 'conga-validation:validator/length';

/**
 * Define the targets that the annotation can be applied to
 * 
 * @var {Array}
 */
Length.targets = [2];

Length.prototype.getParameters = function(){
	return {
		min : this.min,
		max : this.max
	};
};

module.exports = Length;