/*
 * This file is part of the conga-validation library.
 *
 * (c) Marc Roulias <marc@lampjunkie.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var Annotation = require('conga-annotations').Annotation;

module.exports = class LengthAnnotation extends Annotation {

	/**
	 * Define the annotation string to find
	 * 
	 * @var {String}
	 */
	static get annotation() { return 'Assert:Length'; }

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
    get validator() { return 'conga-validation:validator/length'; }

	init(data){
		this.message = !data.message ? 'This value must be between %s and %s characters long' : data.message;
		this.min = data.min;
		this.max = data.max;	
	}

	getParameters(){
		return {
			min : this.min,
			max : this.max
		};
	}
}