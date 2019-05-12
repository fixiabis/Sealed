import { RelatiRule } from "../RelatiRule";
import { RelatiPath } from "./RelatiPath";
import { RelatiRoleStatus, RelatiRole } from "../RelatiRole";
import { RelatiGame } from "../RelatiGame";

const status: RelatiRoleStatus[] = [
    "relati-launcher", "relati-repeater"
];
const fromType = "relati-source";
const toType = "relati-target";

export var Placement: RelatiRule<{ game: RelatiGame, role: RelatiRole }> = {
    name: "設置規則",
    detail: "確認該格子是否可以放置角色",
    allow({ game, role }) {
        var { grid } = role;
        var placeable = !grid.role;

        if (!placeable) return false;
        if (game.turn < game.playerCount) return placeable;

        var relatiable = RelatiPath.allow({
            role, status, fromType, toType
        });

        return relatiable;
    }
};