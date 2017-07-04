module.exports = class NotNullWithMessage {

    constructor() {

        /**
         * @Assert:NotNull(message="My custom message")
         */
        this.name = null;

    }

}
