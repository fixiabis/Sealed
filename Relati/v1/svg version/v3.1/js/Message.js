var Message = (function () {
    var messageBox = document.createElement("div");
    var message = document.createElement("div");
    var messageButtons = document.createElement("div");
    var messageYes = document.createElement("div");
    var messageNo = document.createElement("div");

    messageBox.id = "message-box";
    message.id = "message";
    messageButtons.id = "message-buttons";
    messageYes.id = "message-yes";
    messageYes.innerHTML = "確定";
    messageNo.id = "message-no";
    messageNo.innerHTML = "取消";

    messageBox.appendChild(message);
    messageBox.appendChild(messageButtons);
    messageButtons.appendChild(messageYes);
    messageButtons.appendChild(messageNo);

    messageYes.addEventListener("click", function () {
        messageBox.style.display = "none";
    });
    messageNo.addEventListener("click", function () {
        messageBox.style.display = "none";
    });

    return {
        viewer: messageBox,
        show: function (messageContent, yes, no) {
            message.innerHTML = messageContent;
            messageBox.style.display = "flex";

            messageButtons.style.display = !yes && !no ? "none" : "";

            if (!yes) {
                messageYes.style.display = "none";
            } else {
                messageYes.style.display = "";
                messageYes.onclick = yes;
            }

            if (!no) {
                messageNo.style.display = "none";
            } else {
                messageNo.style.display = "";
                messageNo.onclick = no;
            }
        }
    }
})();

document.body.appendChild(Message.viewer);