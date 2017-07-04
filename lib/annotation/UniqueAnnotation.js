/*
 * This file is part of the conga-validation library.
 *
 * (c) Marc Roulias <marc@lampjunkie.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var Annotation = require('@conga/annotations').Annotation;

module.exports = class UniqueAnnotation extends Annotation {

	/**
	 * Define the annotation string to find
	 *
	 * @var {String}
	 */
	static get annotation() { return 'Assert:Unique'; }

    /**
     * The possible targets
     *
     * (Annotation.DEFINITION, Annotation.CONSTRUCTOR, Annotation.PROPERTY, Annotation.METHOD)
     *
     * @type {Array}
     */
    static get targets() { return [Annotation.PROPERTY] }

    /**
     * The associated validator class
     *
     * @return {String}
     */
    get validator() { return '@conga/framework-validation:validator/UniqueValidator'; }

	init(data){
		this.message = !data.message ? 'Existing document with {{ property }} = {{ value }}' : data.message;
		this.documentManager = data.documentManager;
	}

	getParameters(){
		return {
			message: this.message,
			documentManager: this.documentManager
		};
	}
}
