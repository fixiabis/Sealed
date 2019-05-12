import { RelatiRule } from "../RelatiRule";
import { RelatiPath } from "./RelatiPath";
import { RelatiRoleStatus, RelatiRole } from "../RelatiRole";
import { RelatiGame } from "../RelatiGame";

const status: RelatiRoleStatus[] = ["relati-launcher", "relati-repeater"];
const fromType = "relati-source";
const toType = "relati-target";

type PlacementState = { game: RelatiGame, role: RelatiRole };
type PlacementRule = RelatiRule<PlacementState>;

export var Placement: PlacementRule = {
    name: "設置規則",
    detail: "確認該格子是否可以放置角色",
    allow({ game: { allPlayerReady }, role, role: { grid } }) {
        var placeable = !grid.role;
        if (!placeable) return false;
        if (!allPlayerReady) return placeable;
        var relatiable = RelatiPath.allow({ role, status, fromType, toType });
        return relatiable;
    }
};