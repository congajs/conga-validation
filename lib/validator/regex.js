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

		console.log('validate regex');

		var regex = new RegExp(parameters.pattern);

		if (regex.match(value)){

			if (parameters.match){
				return message;
			}

		} else {

			if (!parameters.match){
				return message;
			}
		}

		return false;
	}

};