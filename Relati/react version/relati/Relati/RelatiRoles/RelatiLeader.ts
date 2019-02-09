import { RelatiRole, RelatiRoleType } from "../RelatiRole";
import * as RelatiRoleEffects from "../RelatiRoleEffects";

export class RelatiLeader extends RelatiRole {
    public type: RelatiRoleType = "leader";
    public effects = [RelatiRoleEffects.RelatiMaintain];
}