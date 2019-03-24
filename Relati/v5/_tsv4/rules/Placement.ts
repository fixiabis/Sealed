import { RelatiRule } from "../RelatiRule";
import { RelatiProtocol } from "./RelatiProtocol";
import { RelatiRoleStatus, RelatiRole } from "../RelatiRole";
import { RelatiGame } from "../RelatiGame";

const status: RelatiRoleStatus[] = ["relati-launcher", "relati-repeater"];
const type = {
    from: "relati-source",
    to: "relati-target"
};

export interface PlacementState {
    game: RelatiGame;
    role: RelatiRole;
}

export type PlacementRule = RelatiRule<PlacementState>;

export var Placement: PlacementRule = {
    name: "設置規則",
    detail: "確認該格子是否可以放置角色",
    allow({ game, game: { allPlayerReady }, role, role: { grid } }) {
        var placeable = !grid.role;
        if (!placeable) return false;
        if (!allPlayerReady) return placeable;
        return RelatiProtocol.allow({ role, status, type });
    }
};