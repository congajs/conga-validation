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

		// try to get existing manager stored on model
		var manager = obj._BASS_MANAGER;

		// open a new session/manager if there wasn't an existing manager
		if (typeof manager === 'undefined' || manager === null) {
			var managerName = Object.getPrototypeOf(obj)._BASS_MANAGER_NAME;
			manager = container.get('bass').createSession().getManager(managerName);			
		}

		// can probably store this on object in bass and pull in here
		var metadata = manager.getMetadataForDocument(obj);

		var cond = {};
		cond[property] = value;

		manager.findOneBy(metadata.name, cond).then(function(document){

			manager.close();

			if (document) {
				cb(util.format(message, property, value));
			} else {
				cb(null);
			}

		});

	}
};