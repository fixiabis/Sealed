import { RelatiRule } from "../RelatiRule";
import { RelatiRoleStatus, RelatiRole } from "../RelatiRole";
import { RelatiProtocol, RelatiProtocolParam } from "./RelatiProtocol";
import { RelatiGame } from "../RelatiGame";

const status: RelatiRoleStatus[] = [
    "relati-launcher", "relati-repeater"
];
const type = {
    from: "relati-source",
    to: "relati-target"
};

export interface JudgementState { game: RelatiGame };
export type JudgementRule = RelatiRule<JudgementState>;

export var Judgement: JudgementRule = {
    name: "勝負判定",
    detail: "若無法繼續放置角色時判負",
    allow({ game: { board, allPlayerReady, nowPlayer: owner } }) {
        if (!allPlayerReady) return true;

        for (var grid of board.gridList) {
            if (grid.role) continue;

            var role = new RelatiRole(grid, owner);
            role.gain("relati-receiver");
            role.params["relati-source"] = RelatiProtocolParam.Normal;

            var relatiable = RelatiProtocol.allow({ role, status, type });

            if (relatiable) return true;
        }

        return false;
    }
};