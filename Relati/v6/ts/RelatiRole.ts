import { RelatiGrid } from "./RelatiBoard";
import { RelatiPlayer } from "./RelatiPlayer";
import { RelatiSkill } from "./RelatiSkill";
import { JSONData } from "./Relati";

export type RelatiRoleType = "leader" | "normal" | "wizard" | "knight";

export interface RelatiRole {
    is(status: RelatiRoleStatus): boolean;
    is(status: RelatiRoleStatus[], type?: "any" | "all"): boolean;
}

export interface RelatiRoleInfo {
    "status": JSONData<boolean>;
    "points": JSONData<number>;
    "params": JSONData<string>;
    "skills": RelatiSkill[];
}

export class RelatiRole {
    public status: JSONData<boolean> = {};
    public points: JSONData<number> = {};
    public params: JSONData<string> = {};
    public skills: RelatiSkill<JSONData>[] = [];

    constructor(
        public grid: RelatiGrid,
        public owner: RelatiPlayer,
        public type: RelatiRoleType = "normal"
    ) { }

    is(status: RelatiRoleStatus | RelatiRoleStatus[], type?: "all" | "any") {
        if (typeof status === "string") return this.status[status];

        if (type === "any") {
            for (let name of status) {
                if (this.status[name]) return true;
            } return false;
        } else {
            for (let name of status) {
                if (!this.status[name]) return false;
            } return true;
        }
    }

    gain(...status: RelatiRoleStatus[]) {
        for (let name of status) this.status[name] = true;
    }

    lost(...status: RelatiRoleStatus[]) {
        for (let name of status) this.status[name] = false;
    }
}

export interface RelatiRoleConstructor {
    new(
        grid: RelatiGrid,
        owner: RelatiPlayer,
        type?: RelatiRoleType
    ): RelatiRole;
}

export namespace RelatiRoleStatus {
    export type Relati = (
        "relati-launcher" |
        "relati-repeater" |
        "relati-receiver"
    );

    export let Relati = [
        "relati-launcher",
        "relati-repeater",
        "relati-receiver"
    ];
}

export type RelatiRoleStatus = (
    RelatiRoleStatus.Relati
);

export namespace RelatiRoleParams {
    export type RelatiProtocol = (
        "relati-source" |
        "relati-target"
    );

    export let RelatiProtocol = [
        "relati-source",
        "relati-target"
    ];
}

export type RelatiRoleParams = (
    RelatiRoleParams.RelatiProtocol
);

export namespace RelatiRolePoints {
    export type RoleSummon = (
        "summon-points" |
        "summon-assets"
    );

    export let RoleSummon = [
        "summon-points",
        "summon-assets"
    ];
}

export type RelatiRolePoints = (
    RelatiRolePoints.RoleSummon
);