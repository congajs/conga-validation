/*
 * This file is part of the conga-validation library.
 *
 * (c) Marc Roulias <marc@lampjunkie.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

 const MessageFormatter = require('../message/MessageFormatter');

module.exports = {

	validate: function(container, obj, property, value, parameters, cb){

		let isValid = true;

		if (parameters.type === 'Date'){

			if (!(value instanceof Date)){
				isValid = false;
			}

		} else {

			if (typeof value !== parameters.type){
				isValid = false;
			}
		}

		if (isValid){
			cb(null);
		} else {
			cb(MessageFormatter(parameters.message, parameters));
		}
	}

};
