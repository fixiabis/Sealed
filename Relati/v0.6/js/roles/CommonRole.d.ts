import { RelatiGrid } from "../RelatiBoard";
import { RelatiPlayer } from "../RelatiPlayer";
import { RelatiRoleType, RelatiRole } from "../RelatiRole";
export declare class CommonRole extends RelatiRole {
    constructor(grid: RelatiGrid, owner: RelatiPlayer, type?: RelatiRoleType);
}
