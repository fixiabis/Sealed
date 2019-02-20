namespace Relati {
    export namespace RelatiRoles {
        export class RelatiLeader extends RelatiRole {
            public type: RelatiRoleType = "leader";
            public effects = [RelatiEffects.RelatiMaintain];
        }
    }
}