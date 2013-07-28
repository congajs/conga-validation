/*
 * This file is part of the conga-validation library.
 *
 * (c) Marc Roulias <marc@lampjunkie.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

module.exports = {

	validate: function(value, parameters, message){

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
			return false;
		} else {
			return message.replace('{{ type }}', parameters.type);
		}

		return false;
	}

};