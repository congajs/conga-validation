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
var Type = function(data){
	this.message = !data.message ? 'This value should be of type {{ type }}' : data.message;
	this.type = data.type;
};

/**
 * Define the annotation string to find
 * 
 * @var {String}
 */
Type.annotation = 'Assert:Type';

Type.prototype.validator = 'conga-validation:validator/type';

/**
 * Define the targets that the annotation can be applied to
 * 
 * @var {Array}
 */
Type.targets = [2];

Type.prototype.getParameters = function(){
	return {
		type : this.type
	};
};

module.exports = Type;