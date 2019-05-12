import { RelatiInfo } from "./Relati";
import { RelatiGrid } from "./RelatiBoard";
import { RelatiSkill } from "./RelatiSkill";
import { RelatiPlayer } from "./RelatiPlayer";

export type RelatiRoleType = "normal" | "knight" | "wizard" | "leader";

export interface RelatiRole {
    is(status: RelatiRoleStatus): boolean;
    is(status: RelatiRoleStatus[], type: "all" | "any"): boolean;
}

export class RelatiRole implements RelatiInfo {
    public type: RelatiRoleType;
    public info: RelatiRoleInfo = {} as RelatiRoleInfo;
    public name: string = "";
    public detail: string = "";

    public status: { [status: string]: boolean } = {};
    public points: { [points: string]: number } = {};
    public params: { [params: string]: string } = {};
    public skills: RelatiSkill[] = [];

    constructor(
        public grid: RelatiGrid,
        public owner: RelatiPlayer,
        param: RelatiRoleInfo | RelatiRoleType = "normal"
    ) {
        if (typeof param == "string") this.type = param;
        else {
            var { type, gain, lost, status, points, params, skills } = param;

            this.type = type;
            Object.assign(this.info, param);

            if (gain) this.gain(...gain);
            if (lost) this.lost(...lost);

            if (status) Object.assign(this.status, status);
            if (points) Object.assign(this.points, points);
            if (params) Object.assign(this.params, params);
            if (skills) Object.assign(this.skills, skills);
        }
    }

    is(status: RelatiRoleStatus | RelatiRoleStatus[], type?: "all" | "any") {
        if (typeof status === "string") return this.status[status];

        if (type === "any") {
            for (var name of status) {
                if (this.status[name]) return true;
            }

            return false;
        } else {
            for (var name of status) {
                if (!this.status[name]) return false;
            }

            return true;
        }
    }

    gain(...status: RelatiRoleStatus[]) {
        for (var name of status) this.status[name] = true;
    }

    lost(...status: RelatiRoleStatus[]) {
        for (var name of status) this.status[name] = false;
    }
}

export namespace RelatiRoleStatus {
    export type Relati = (
        "relati-launcher" |
        "relati-repeater" |
        "relati-receiver"
    );

    export var Relati = [
        "relati-launcher",
        "relati-repeater",
        "relati-receiver"
    ];
}

export type RelatiRoleStatus = (
    RelatiRoleStatus.Relati
);

export type RelatiRoleInfo = RelatiInfo & {
    type: RelatiRoleType,
    gain?: RelatiRoleStatus[],
    lost?: RelatiRoleStatus[],
    status?: RelatiRole["status"],
    points?: RelatiRole["points"],
    params?: RelatiRole["params"],
    skills?: RelatiRole["skills"],
    leader?: RelatiRoleInfo
} & ({
    type: "normal" | "knight" | "wizard",
    points: { "summon-cost": number }
} | {
    type: "leader",
    points: { "summon-assets": number }
});