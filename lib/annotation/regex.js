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
var Regex = function(data){
	this.message = !data.message ? 'This value is not valid' : data.message;
	this.pattern = data.pattern;
	if (typeof data.match !== 'undefined') this.match = data.match;
};

/**
 * Define the annotation string to find
 * 
 * @var {String}
 */
Regex.annotation = 'Assert:Regex';

Regex.prototype.validator = 'conga-validation:validator/regex';

/**
 * Define the targets that the annotation can be applied to
 * 
 * @var {Array}
 */
Regex.targets = [2];

Regex.prototype.match = false;

Regex.prototype.getParameters = function(){
	return {};
};

module.exports = Regex;