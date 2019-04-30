import { RelatiSkill } from "../RelatiSkill";
import { RelatiRole, RelatiRoleParams, RelatiRoleStatus } from "../RelatiRole";
import { RelatiProtocol } from "../rules/RelatiProtocol";
import { RelatiPlayer } from "../RelatiPlayer";

export interface RelatiRestoreState {
    owner: RelatiRole;
}

export type RelatiRestoreSkill = RelatiSkill<RelatiRestoreState>;

export let RelatiRestore: RelatiRestoreSkill = {
    when: "next-player",
    type: "effect",
    name: "連結恢復",
    detail: "恢復我方所有角色的連結轉發機能",
    priority: 10,
    async do({ owner }) {
        if (!owner.is("relati-launcher")) return;
        await restore(owner, owner.owner);
    }
};

const sourceType: RelatiRoleParams = "relati-source";
const targetType: RelatiRoleParams = "relati-target";
const relyStatus: RelatiRoleStatus[] = ["relati-receiver"];

async function restore(role: RelatiRole, owner: RelatiPlayer) {
    if (role.owner != owner || role.is("relati-repeater")) return;
    role.gain("relati-repeater");

    var traces = RelatiProtocol.trace({
        role,
        sourceType,
        targetType,
        relyStatus
    });

    await Promise.all(traces.map(({ target }) =>
        new Promise<void>(resolve => {
            if (!target.role) return resolve();
            restore(target.role, owner).then(resolve);
        })
    ));
}