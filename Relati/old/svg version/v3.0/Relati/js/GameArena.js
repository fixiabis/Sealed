var GameArena = (function () {
    var socket = io("https://gridboard.herokuapp.com");
    var playerId = "";

    socket.on("user.leave", function () { playerId = ""; });

    return {
        join: function (gameName, name, picUrl) {
            return new Promise(function (resolve, reject) {
                socket.emit("join", { name: name, picUrl: picUrl, gameName: gameName });
                socket.on("matched", function (data) {
                    playerId = data.id;
                    resolve(data);
                });
            });
        },
        set: function (crd) {
            socket.emit("symbol.set", {
                id: playerId,
                crd: crd
            });
        },
        whenPlayerSet: function (execute) {
            socket.on("symbol.set", function (crd) {
                execute(crd);
            });
        },
        playerExist: function () { return playerId !== ""; },
        whenPlayerLeave: function (execute) {
            socket.on("user.leave", function () {
                playerId = "";
                execute();
            });
        }
    };
})();