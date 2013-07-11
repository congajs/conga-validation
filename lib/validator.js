/*
 * This file is part of the conga-validation library.
 *
 * (c) Marc Roulias <marc@lampjunkie.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// native modules
var fs = require('fs');
var path = require('path');

// third-party modules
//var annotations = require('conga-annotations');

/**
 * The Validator provides methods to validate model objects
 * that are annotated with validation annotations
 * 
 * @author  Marc Roulias <marc@lampjunkie.com>
 */
var Validator = function(){
	this.objects = [];
};

Validator.prototype = {

	/**
	 * Parse out all of the validation annotations from objects
	 * and store the information for lookup later on
	 * 
	 * @param container
	 */
	onKernelCompile: function(event, next){

		var container = event.container;
		var config = container.get('config').get('validation');

		if (typeof config === 'undefined'){
			next();
			return;
		}

		var annotations = container.get('conga.annotations');

		var registry = new annotations.Registry();

		var annotationDir = path.join(__dirname, 'annotation');
		var annotationPaths = fs.readdirSync(annotationDir);

		annotationPaths.forEach(function(filename){
			registry.registerAnnotation(path.join(annotationDir, filename));
		});

		var paths = this.getObjectPathsFromConfig(container, config);

		// create the annotation reader
		var reader = new annotations.Reader(registry);

		paths.forEach(function(p){
			this.parseAnnotations(container, reader, p);
		}, this);		

		// move on
		next();
	},

	/**
	 * Parse the validation annotations from the given file path
	 * 
	 * @param  {Container} container
	 * @param  {Reader} reader
	 * @param  {String} filePath
	 * @return {void}
	 */
	parseAnnotations: function(container, reader, filePath){

		// parse the annotations
		reader.parse(filePath);

		// get the annotations
		var propertyAnnotations = reader.getPropertyAnnotations();

		var properties = {};

		propertyAnnotations.forEach(function(annotation){

			var property = annotation.target;

			if (typeof properties[property] === 'undefined'){
				properties[property] = [];
			}

			var validatorPath = path.join(container.get('namespace.resolver').resolveWithSubpath(annotation.validator, 'lib'))
			var validator = require(validatorPath);
		
			var validatorFunction = function(value){
				return validator.validate(value, annotation.getParameters(), annotation.message);
			};

			properties[property].push(validatorFunction);

		});

		this.objects.push({
			properties: properties,
			proto: require(filePath)
		});
	},

	/**
	 * Get all the full object paths from the validator configuration namespaces
	 * 
	 * @param  {Container} container
	 * @param  {Object} config
	 * @return {Array}
	 */
	getObjectPathsFromConfig: function(container, config){

		var paths = [];

		if (typeof config.paths !== 'undefined'){

			config.paths.forEach(function(namespace){

				var dir = container.get('namespace.resolver').resolveWithSubpath(namespace, 'lib');
				var files = container.get('wrench').readdirSyncRecursive(dir);

				files.forEach(function(p){
					if (p.substr(-3) === '.js'){
						paths.push(path.join(dir, p));
					}
				});
			});
		}

		return paths;
	},

	/**
	 * Validate an object
	 * 
	 * @param  {Object} obj
	 * @return {Array}
	 */
	validate: function(obj){

		for (var i=0, j=this.objects.length; i<j; i++){
			if (obj instanceof this.objects[i].proto){
				return this.validateObject(obj, this.objects[i]);
			}
		}

		return [];
	},

	/**
	 * Validate an object
	 * 
	 * @param  {Object} obj
	 * @param  {Object} config
	 * @return {Array}
	 */
	validateObject: function(obj, config){

		var errors = [];

		for (var property in config.properties){

			for (var validator in config.properties[property]){

				var error = config.properties[property][validator](obj[property]);

				if (error){
					errors.push({ message : error, property : property });
				}					
			}
		}

		return errors;
	}

};

module.exports = Validator;