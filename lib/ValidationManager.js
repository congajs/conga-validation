/*
 * This file is part of the conga-validation library.
 *
 * (c) Marc Roulias <marc@lampjunkie.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// native modules
const fs = require('fs');
const path = require('path');

// third-party modules
const annotations = require('@conga/annotations');
const recursiveReadSync = require('recursive-readdir-sync');

/**
 * The ValidationManager parses out all of the validation annotations from
 * the configured file paths
 *
 * @author Marc Roulias <marc@lampjunkie.com>
 */
module.exports = class ValidationManager {

    /**
     * Parse out all of the validation annotations from objects
     * and store the information for lookup later on
     *
     * @param  {Object}   event
     * @param  {Function} next
     * @return {void}
     */
    onKernelCompile(event, next) {

        this.container = event.container;

        const config = this.container.get('config').get('validation');

        this.container.get('logger').debug('[conga-validation] - setting up validation');

        if (typeof config === 'undefined') {
            next();
            return;
        }

        const registry = new annotations.Registry();
        const annotationDir = path.join(__dirname, 'annotation');
        const annotationPaths = fs.readdirSync(annotationDir);

        annotationPaths.forEach((filename) => {
            registry.registerAnnotation(path.join(annotationDir, filename));
        });

        const paths = this.getObjectPathsFromConfig(this.container, config);

        // create the annotation reader
        const reader = new annotations.Reader(registry);

        paths.forEach((p) => {
            this.parseAnnotations(this.container, reader, p);
        });

        // move on
        next();
    }

    /**
     * Parse the validation annotations from the given file path
     *
     * @param  {Container} container
     * @param  {Reader}    reader
     * @param  {String}    filePath
     * @return {void}
     */
    parseAnnotations(container, reader, filePath) {

        container.get('logger').debug('[conga-validation] - parsing annotations from: ' + filePath);

        // parse the annotations
        reader.parse(filePath);

        // get the annotations
        const propertyAnnotations = reader.propertyAnnotations;

        const properties = {};

        propertyAnnotations.forEach((annotation) => {

            const property = annotation.target;

            if (typeof properties[property] === 'undefined'){
                properties[property] = [];
            }

            const validatorPath = path.join(container.get('namespace.resolver').resolveWithSubpath(annotation.validator, 'lib'));
            const validator = require(validatorPath);

            const validatorFunction = function(obj, property, value, cb) {
                validator.validate(
                    container,
                    obj,
                    property,
                    value,
                    annotation.getParameters(),
                    cb
                );
            };

            properties[property].push(validatorFunction);

        });

        const proto = require(filePath);

        proto.prototype._CONGA_VALIDATION = {
            properties: properties
        };
    }

    /**
	 * Get all the full object paths from the validator configuration namespaces
	 *
	 * @param  {Container} container
	 * @param  {Object} config
	 * @return {Array}
	 */
	getObjectPathsFromConfig(container, config) {

		const paths = [];

		if (typeof config.paths !== 'undefined'){

			config.paths.forEach((namespace) => {

				const dir = container.get('namespace.resolver').resolveWithSubpath(namespace, 'lib');
				const files = recursiveReadSync(dir);

				files.forEach((p) => {
					if (p.substr(-3) === '.js'){
						paths.push(p);//path.join(dir, p));
					}
				});

			});
		}

		return paths;
	}

}
