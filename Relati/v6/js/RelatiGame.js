(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./RelatiPlayer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const RelatiPlayer_1 = require("./RelatiPlayer");
    class RelatiGame {
        constructor(board, playerNames) {
            this.board = board;
            this.turn = 0;
            this.players = [];
            this.eventPrevented = false;
            this.listeners = {
                "role-create": [],
                "role-update": [],
                "role-delete": [],
                "role-leader": [],
                "next-player": []
            };
            for (let name of playerNames) {
                this.players.push(new RelatiPlayer_1.RelatiPlayer(name, this));
            }
        }
        get playerCount() { return this.players.length; }
        get playerNow() { return this.players[this.turn % this.playerCount]; }
        on(type, owner, skill) {
            this.listeners[type].push({ owner, skill });
            this.listeners[type].sort(({ skill: skill1 }, { skill: skill2 }) => skill1.priority - skill2.priority);
        }
        do(type, role, info) {
            return new Promise((resolve, reject) => {
                this.eventPrevented = false;
                for (let { owner, skill } of this.listeners[type]) {
                    skill.do({ game: this, owner, role, info });
                    if (this.eventPrevented)
                        return reject();
                }
                switch (type) {
                    case "role-create":
                        role.grid.role = role;
                        for (let skill of role.skills) {
                            if (skill.when)
                                this.on(skill.when, role, skill);
                        }
                        break;
                    case "role-update":
                        for (let type in info) {
                            for (let status in info[type]) {
                                role[type][status] = info[type][status];
                            }
                        }
                        break;
                    case "role-delete":
                        delete role.grid.role;
                        break;
                    case "role-leader":
                        role.owner.leader = role;
                        break;
                    case "next-player":
                        this.turn++;
                        break;
                }
                resolve();
            });
        }
    }
    exports.RelatiGame = RelatiGame;
});
