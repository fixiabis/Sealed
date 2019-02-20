namespace lib {
    export interface MessageBox {
        body: HTMLDivElement;
        message: string;
        appendIn(container: HTMLElement): void;
    }

    export class MessageBox implements MessageBox {

        body: HTMLDivElement = createDiv("message-box");

        /**
         * @param message 顯示的訊息
         */

        constructor(public message: string, buttons?: { [execute: string]: Function }) {
            var messageDiv: HTMLDivElement = createDiv("message");
            var buttonContainerDiv: HTMLDivElement = createDiv("button-container");
            messageDiv.innerHTML = message;
            this.body.appendChild(messageDiv);

            if (buttons) {
                for (var execute in buttons) {
                    var buttonDiv: HTMLDivElement = createDiv("button");
                    buttonDiv.innerHTML = execute;
                    buttonDiv.onclick = function (this: MessageBox, arg: MouseEvent) {
                        buttons[execute].bind(this)(arg)
                    }.bind(this);
                    buttonContainerDiv.appendChild(buttonDiv);
                }
                this.body.appendChild(buttonContainerDiv);
            }
        }

        appendIn(container: HTMLElement): void {
            container.appendChild(this.body);
        }

        remove(container: HTMLElement): void {
            container.removeChild(this.body);
        }
    }

    function createDiv(className?: string): HTMLDivElement {
        var element = document.createElement("div");
        if (className) element.className = className;
        return element;
    }
}