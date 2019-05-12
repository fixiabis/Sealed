"use strict";
var lib;
(function (lib) {
    var MessageBox = (function () {
        function MessageBox(message, buttons) {
            this.message = message;
            this.body = createDiv("message-box");
            var messageDiv = createDiv("message");
            var buttonContainerDiv = createDiv("button-container");
            messageDiv.innerHTML = message;
            this.body.appendChild(messageDiv);
            if (buttons) {
                for (var execute in buttons) {
                    var buttonDiv = createDiv("button");
                    buttonDiv.innerHTML = execute;
                    buttonDiv.onclick = function (arg) {
                        buttons[execute].bind(this)(arg);
                    }.bind(this);
                    buttonContainerDiv.appendChild(buttonDiv);
                }
                this.body.appendChild(buttonContainerDiv);
            }
        }
        MessageBox.prototype.appendIn = function (container) {
            container.appendChild(this.body);
        };
        MessageBox.prototype.remove = function (container) {
            container.removeChild(this.body);
        };
        return MessageBox;
    }());
    lib.MessageBox = MessageBox;
    function createDiv(className) {
        var element = document.createElement("div");
        if (className)
            element.className = className;
        return element;
    }
})(lib || (lib = {}));
