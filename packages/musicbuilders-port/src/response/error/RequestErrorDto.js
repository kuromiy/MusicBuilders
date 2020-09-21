"use strict";
exports.__esModule = true;
exports.RequestErrorDto = void 0;
var RequestErrorDto = /** @class */ (function () {
    function RequestErrorDto(errorProperty, errorMessage) {
        this._errorProperty = errorProperty;
        this._errorMessage = errorMessage;
    }
    Object.defineProperty(RequestErrorDto.prototype, "errorProperty", {
        get: function () {
            return this._errorProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestErrorDto.prototype, "errorMessage", {
        get: function () {
            return this._errorMessage;
        },
        enumerable: false,
        configurable: true
    });
    return RequestErrorDto;
}());
exports.RequestErrorDto = RequestErrorDto;
