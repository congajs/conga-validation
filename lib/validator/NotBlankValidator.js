/*
 * This file is part of the conga-validation library.
 *
 * (c) Marc Roulias <marc@lampjunkie.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

module.exports = {

	validate: function(container, obj, property, value, parameters, cb){

		if (value === null || value === ''){
			return cb(parameters.message);
		}

		cb(null);
	}

};
