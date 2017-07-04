/*
 * This file is part of the conga-validation library.
 *
 * (c) Marc Roulias <marc@lampjunkie.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

_ = require('lodash');

/**
 * The message formatter renders a templated error message with an object
 * of template values
 *
 * @param  {String} message
 * @param  {Object} parameters
 * @return {String}
 */
module.exports = (message, parameters, property = null, value = null) => {

    parameters.property = property;
    parameters.value = value;

    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    const compiled = _.template(message);

    return compiled(parameters);

}
