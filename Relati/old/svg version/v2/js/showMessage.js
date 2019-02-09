var showMessage = (function () {
    var messageBox = document.getElementById("message-box");
    var message = document.getElementById("message");
    var messageButton = document.getElementById("message-button");

    messageButton.addEventListener("click", function () {
        messageBox.style.display = "none";
    });

    return function showMessage(messageContent, clicked) {
        message.innerHTML = messageContent;
        messageBox.style.display = "flex";
        messageButton.onclick = clicked;
    };
})();