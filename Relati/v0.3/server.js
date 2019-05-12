"use strict";
exports.__esModule = true;
var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var socketIO = require("socket.io");
var webServer = express();
webServer.use(bodyParser.urlencoded({ extended: true }));
webServer.use(bodyParser.json());
webServer.use(express.static("web"));
webServer.use("/", express.static("index.html"));
webServer.use("/base", express.static("base"));
webServer.use("/dist", express.static("dist"));
webServer.use("/react.js", express.static("node_modules/react/umd/react.development.js"));
webServer.use("/react-dom.js", express.static("node_modules/react-dom/umd/react-dom.development.js"));
var server = new http.Server(webServer);
var socketServer = socketIO(server);
var socketClientInfo = {};
socketServer.on("connection", function (socketClient) {
    socketClientInfo[socketClient.id] = {
        "socket": socketClient
    };
    socketClient.on("update", function (name, value) {
        if (name === "socket")
            return;
        socketClientInfo[socketClient.id][name] = value;
    });
});
server.listen(3000);
