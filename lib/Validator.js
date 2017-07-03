/*
 * This file is part of the conga-validation library.
 *
 * (c) Marc Roulias <marc@lampjunkie.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * The Validator provides methods to validate model objects
 * that are annotated with validation annotations
 *
 * @author  Marc Roulias <marc@lampjunkie.com>
 */
module.exports = class Validator {

	/**
	 * Construct the Validator with a container
	 *
	 * @param  {Container} container
	 */
	constructor(container) {
		this.container = container;
	}

	/**
	 * Validate an object
	 *
	 * @param  {Object}   obj
	 * @return {Promise}
	 */
	validate(obj) {

		return new Promise((resolve, reject) => {

			const config = Object.getPrototypeOf(obj)._CONGA_VALIDATION;

			if (typeof config === 'undefined') {
				return cb(null);
			}

			this.validateObject(obj, config, (errors) => {

				if (errors) {
					reject(errors);
				} else {
					resolve();
				}

			});
		});
	}

	/**
	 * Validate an object
	 *
	 * @param  {Object}   obj
	 * @param  {Object}   config
	 * @param  {Function} cb
	 * @return {void}
	 */
	validateObject(obj, config, cb) {

		const calls = [];
		const errors = [];

		for (let property in config.properties) {

			for (let validator in config.properties[property]) {

				(function(property, validator) {

					calls.push(function(callback) {

					config.properties[property][validator](obj, property, obj[property], function(err) {
						if (err) {
							errors.push({ message : err, property : property });
						}
						callback();
					});

					});
				}(property, validator));
			}
		}

		this.container.get('async').series(calls, () => {
			if (errors.length > 0) {
				cb(errors);
			} else {
				cb(null);
			}
		});
	}
}
