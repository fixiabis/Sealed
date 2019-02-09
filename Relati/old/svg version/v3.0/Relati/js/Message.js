var Message = (function () {
    var messageBox = document.createElement("div");
    var message = document.createElement("div");
    var messageButton = document.createElement("div");

    messageBox.id = "message-box";
    message.id = "message";
    messageButton.id = "message-button";
    messageButton.innerHTML = "OK";

    messageBox.appendChild(message);
    messageBox.appendChild(messageButton);

    return {
        createViewer: function createViewer() {
            messageButton.addEventListener("click", function () {
                messageBox.style.display = "none";
            });

            return messageBox;
        },
        show: function show(messageContent, clicked) {
            message.innerHTML = messageContent;
            messageBox.style.display = "flex";
            messageButton.onclick = clicked;
        }
    }
})();

document.body.appendChild(Message.createViewer());