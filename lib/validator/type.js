/*
 * This file is part of the conga-validation library.
 *
 * (c) Marc Roulias <marc@lampjunkie.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

module.exports = {

	validate: function(container, obj, property, value, parameters, message, cb){

		var isValid = true;

		if (parameters.type === 'Date'){

			if (!(value instanceof Date)){
				isValid = false;
			}

		} else {

			if (typeof value !== parameters.type){
				
			}
		}

		if (isValid){
			cb(null);
		} else {
			cb(message.replace('{{ type }}', parameters.type));
		}
	}

};