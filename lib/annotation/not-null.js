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
var NotNull = function(data){
	this.message = !data.message ? 'This value should not be null' : data.message;
};

/**
 * Define the annotation string to find
 * 
 * @var {String}
 */
NotNull.annotation = 'Assert:NotNull';

NotNull.prototype.validator = 'conga-validation:validator/not-null';

/**
 * Define the targets that the annotation can be applied to
 * 
 * @var {Array}
 */
NotNull.targets = [2];

NotNull.prototype.getParameters = function(){
	return {};
};

module.exports = NotNull;