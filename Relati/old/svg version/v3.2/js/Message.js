var Message = (function () {
    var messageBox = document.getElementById("message-box");
    var messageSign = document.getElementById("message-sign");
    var messageButton = document.getElementById("message-button");
    var messageAccept = document.getElementById("message-accept");
    var messageReject = document.getElementById("message-reject");

    function hide() {
        messageBox.style.display = "none";
    }

    messageAccept.addEventListener("click", hide);
    messageReject.addEventListener("click", hide);

    hide();

    return {
        show: function (type, accept, reject) {
            messageBox.style.display = "";
            messageBox.className = type;
            messageAccept.onclick = accept;
            messageReject.onclick = reject;
        },
        hide: hide
    }
})();