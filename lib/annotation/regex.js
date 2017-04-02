/*
 * This file is part of the conga-validation library.
 *
 * (c) Marc Roulias <marc@lampjunkie.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var Annotation = require('conga-annotations').Annotation;

module.exports = class RegexAnnotation extends Annotation {

	/**
	 * Define the annotation string to find
	 * 
	 * @var {String}
	 */
	static get annotation() { return 'Assert:Regex'; }

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
    get validator() { return 'conga-validation:validator/regex'; }

	init(data){
		this.message = !data.message ? 'This value is not valid' : data.message;
		this.pattern = data.pattern;
		if (typeof data.match !== 'undefined') this.match = data.match;
		if (typeof data.pattern !== 'undefined') this.match = data.match;
	}

	getParameters(){
		return {
			match: this.match,
			pattern: this.pattern
		};
	}
}