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
var NotBlank = function(data){
	this.message = !data.message ? 'This value should not be blank' : data.message;
};

/**
 * Define the annotation string to find
 * 
 * @var {String}
 */
NotBlank.annotation = 'Assert:NotBlank';

NotBlank.prototype.validator = 'conga-validation:validator/not-blank';

/**
 * Define the targets that the annotation can be applied to
 * 
 * @var {Array}
 */
NotBlank.targets = [2];

NotBlank.prototype.getParameters = function(){
	return {};
};

module.exports = NotBlank;