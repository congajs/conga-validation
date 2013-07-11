/*
 * This file is part of the conga-validation library.
 *
 * (c) Marc Roulias <marc@lampjunkie.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var util = require('util');

module.exports = {

	validate: function(value, parameters, message){

		if (typeof value !== 'string'){
			return false;
		}

		if (value.length < parameters.min || value.length > parameters.max){
			return util.format(message, parameters.min, parameters.max);
		}

		return false;
	}

};