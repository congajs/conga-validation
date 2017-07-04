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

		// try to get existing manager stored on model
		let manager = obj._BASS_MANAGER;

		// open a new session/manager if there wasn't an existing manager
		if (typeof manager === 'undefined' || manager === null) {
			let managerName = Object.getPrototypeOf(obj)._BASS_MANAGER_NAME;
			manager = container.get('bass').createSession().getManager(managerName);
		}

		// can probably store this on object in bass and pull in here
		const metadata = manager.getMetadataForDocument(obj);

		const cond = {};
		cond[property] = value;

		manager.findOneBy(metadata.name, cond).then((document) => {

			manager.close();

			if (document) {
				cb(MessageFormatter(parameters.message, parameters, property, value));
			} else {
				cb(null);
			}

		});

	}
};
