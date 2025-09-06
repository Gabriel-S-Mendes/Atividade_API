// src/Domain/Exceptions/UserAlreadyExistsException.js
class UserAlreadyExistsException extends Error {
    constructor(message = "User already exists.") {
        super(message);
        this.name = "UserAlreadyExistsException";
        this.statusCode = 400; // optional, caso queira usar para HTTP
    }
}

module.exports = UserAlreadyExistsException;