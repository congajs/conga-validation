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

	validate: function(container, obj, property, value, parameters, cb) {

		if (typeof value !== 'string'){
			return cb(null);
		}

		if (value.length < parameters.min) {
			return cb(MessageFormatter(parameters.minMessage, parameters));
		}

		if (value.length > parameters.max) {
			return cb(MessageFormatter(parameters.maxMessage, parameters));
		}

		cb(null);
	}

};
