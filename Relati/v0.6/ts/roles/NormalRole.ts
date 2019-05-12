import { RelatiRole, RelatiRoleType } from "../RelatiRole";
import { RelatiGrid } from "../RelatiBoard";
import { RelatiPlayer } from "../RelatiPlayer";
import { RelatiProtocolParams } from "../rules/RelatiProtocol";
import { RelatiDestory } from "../skills/RelatiDestroy";
import { RelatiRestore } from "../skills/RelatiRestore";

export class NormalRole extends RelatiRole {
    constructor(
        grid: RelatiGrid,
        owner: RelatiPlayer,
        type?: RelatiRoleType
    ) {
        super(grid, owner, type);
        this.params["relati-source"] = RelatiProtocolParams.RelatiNormal;
        this.params["relati-target"] = RelatiProtocolParams.RelatiNormal;

        if (type == "leader") {
            this.gain("relati-launcher");
            this.skills.push(RelatiDestory);
            this.skills.push(RelatiRestore);
        } else this.gain("relati-receiver");
    }
}