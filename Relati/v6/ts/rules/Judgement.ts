import { RelatiRule } from "../RelatiRule";
import { RelatiGame } from "../RelatiGame";
import { RelatiPlayer } from "../RelatiPlayer";
import { RelatiRole, RelatiRoleParams, RelatiRoleStatus } from "../RelatiRole";
import { RelatiProtocolParams, RelatiProtocol } from "./RelatiProtocol";

const sourceType: RelatiRoleParams = "relati-target";
const targetType: RelatiRoleParams = "relati-source";
const relyStatus: RelatiRoleStatus[] = ["relati-launcher", "relati-repeater"];

export interface JudgementState {
    game: RelatiGame;
    owner: RelatiPlayer;
}

export type JudgementRule = RelatiRule<JudgementState>;

export let Judgement: JudgementRule = {
    name: "勝負判定",
    detail: "若無法繼續放置角色時判負",
    allow({ game: { board: { gridList } }, owner }) {
        for (let grid of gridList) {
            if (grid.role) continue;

            var role = new RelatiRole(grid, owner);
            role.gain("relati-receiver");
            role.params["relati-source"] = RelatiProtocolParams.RelatiNormal;

            var relatiable = RelatiProtocol.allow({
                role,
                sourceType,
                targetType,
                relyStatus
            });

            if (relatiable) return true;
        }

        return false;
    }
};