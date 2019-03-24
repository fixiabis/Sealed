import { RelatiRule } from "../RelatiRule";
import { RelatiRoleStatus, RelatiRole } from "../RelatiRole";
import { RelatiPath, RelatiPathParam } from "./RelatiPath";
import { RelatiGame } from "../RelatiGame";

const status: RelatiRoleStatus[] = [
    "relati-launcher", "relati-repeater"
];
const fromType = "relati-source";
const toType = "relati-target";

export var Judgement: RelatiRule<{ game: RelatiGame }> = {
    name: "勝負判定",
    detail: "若無法繼續放置角色時判負",
    allow({ game }) {
        if (game.turn < game.playerCount) return true;

        var { board } = game;
        var owner = game.nowPlayer;

        for (var grid of board.gridList) {
            if (grid.role) continue;

            var role = new RelatiRole(grid, owner);
            role.gain("relati-receiver");
            role.params["relati-source"] = RelatiPathParam.Normal;

            var relatiable = RelatiPath.allow({
                role, status, fromType, toType
            });

            if (relatiable) return true;
        }

        return false;
    }
};