import { RelatiRole, RelatiRoleType } from "../RelatiRole";
import { RelatiGrid } from "../RelatiBoard";
import { RelatiPlayer } from "../RelatiPlayer";
export declare class NormalRole extends RelatiRole {
    constructor(grid: RelatiGrid, owner: RelatiPlayer, type?: RelatiRoleType);
}
