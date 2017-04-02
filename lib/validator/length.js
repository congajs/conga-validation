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

	validate: function(container, obj, property, value, parameters, message, cb){

		if (typeof value !== 'string'){
			return cb(null);
		}

		if (value.length < parameters.min || value.length > parameters.max){
			return cb(util.format(message, parameters.min, parameters.max));
		}

		cb(null);
	}

};