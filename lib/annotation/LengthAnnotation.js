/*
 * This file is part of the conga-validation library.
 *
 * (c) Marc Roulias <marc@lampjunkie.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Annotation = require('@conga/annotations').Annotation;

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
    get validator() { return '@conga/framework-validation:validator/LengthValidator'; }

	init(data) {

		this.minMessage = !data.minMessage ? 'This value must be at least {{ min }} characters long' : data.minMessage;
		this.maxMessage = !data.maxMessage ? 'This value must be less than {{ max }} characters long' : data.maxMessage;

		this.min = !data.min ? null : data.min;
		this.max = !data.max ? null : data.max;
	}

	getParameters() {
		return {
			minMessage: this.minMessage,
			maxMessage: this.maxMessage,
			min: this.min,
			max: this.max
		};
	}
}
