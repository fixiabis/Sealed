import { RelatiGrid } from "./RelatiBoard";
import { RelatiPlayer } from "./RelatiPlayer";
import { RelatiSkill } from "./RelatiSkill";
import { JSONData } from "./Relati";
export declare type RelatiRoleType = "leader" | "normal" | "wizard" | "knight";
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
export declare class RelatiRole {
    grid: RelatiGrid;
    owner: RelatiPlayer;
    type: RelatiRoleType;
    status: JSONData<boolean>;
    points: JSONData<number>;
    params: JSONData<string>;
    skills: RelatiSkill<JSONData>[];
    constructor(grid: RelatiGrid, owner: RelatiPlayer, type?: RelatiRoleType);
    gain(...status: RelatiRoleStatus[]): void;
    lost(...status: RelatiRoleStatus[]): void;
}
export interface RelatiRoleConstructor {
    new (grid: RelatiGrid, owner: RelatiPlayer, type?: RelatiRoleType): RelatiRole;
}
export declare namespace RelatiRoleStatus {
    type Relati = ("relati-launcher" | "relati-repeater" | "relati-receiver");
    let Relati: string[];
}
export declare type RelatiRoleStatus = (RelatiRoleStatus.Relati);
export declare namespace RelatiRoleParams {
    type RelatiProtocol = ("relati-source" | "relati-target");
    let RelatiProtocol: string[];
}
export declare type RelatiRoleParams = (RelatiRoleParams.RelatiProtocol);
export declare namespace RelatiRolePoints {
    type RoleSummon = ("summon-points" | "summon-assets");
    let RoleSummon: string[];
}
export declare type RelatiRolePoints = (RelatiRolePoints.RoleSummon);
