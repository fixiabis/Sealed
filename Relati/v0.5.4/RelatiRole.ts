import { RelatiInfo } from "./Relati";
import { RelatiGrid } from "./RelatiBoard";
import { RelatiPlayer } from "./RelatiPlayer";
import { RelatiSkill } from "./RelatiSkill";

export type RelatiRoleType = "normal" | "knight" | "wizard" | "leader";

export interface RelatiRole {
    is(status: RelatiRoleStatus): boolean;
    is(status: RelatiRoleStatus[], type: "all" | "any"): boolean;
}

export class RelatiRole {
    public type: RelatiRoleType;
    public info: RelatiRoleInfo = {} as RelatiRoleInfo;

    public name: string = "";
    public detail: string = "";

    public status: JSONData<boolean> = {};
    public points: JSONData<number> = {};
    public params: JSONData<string> = {};
    public skills: RelatiSkill[] = [];

    constructor(
        public grid: RelatiGrid,
        public owner: RelatiPlayer,
        param: RelatiRoleInfo | RelatiRoleType = "normal"
    ) {
        if (typeof param == "string") this.type = param;
        else {
            let { type, gain, lost, status, points, params, skills } = param;

            this.type = type;
            this.info = { ...param };

            if (gain) this.gain(...gain);
            if (lost) this.lost(...lost);

            if (status) this.status = { ...status };
            if (points) this.points = { ...points };
            if (params) this.params = { ...params };
            if (skills) this.skills = [...skills];
        }
    }

    is(status: RelatiRoleStatus | RelatiRoleStatus[], type?: "all" | "any") {
        if (typeof status === "string") return this.status[status];

        if (type === "any") {
            for (let name of status) {
                if (this.status[name]) return true;
            }

            return false;
        } else {
            for (let name of status) {
                if (!this.status[name]) return false;
            }

            return true;
        }
    }

    gain(...status: RelatiRoleStatus[]) {
        for (let name of status) this.status[name] = true;
    }

    lost(...status: RelatiRoleStatus[]) {
        for (let name of status) this.status[name] = false;
    }
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