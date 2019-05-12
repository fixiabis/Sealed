import { RelatiSkill } from "../RelatiSkill";
import { RelatiGame } from "../RelatiGame";
import { RelatiRole } from "../RelatiRole";
import { RelatiGrid } from "../RelatiBoard";
import { RelatiCard } from "../RelatiPlayer";

export interface RoleEffectState {
    game: RelatiGame;
    grid?: RelatiGrid;
    role?: RelatiRole;
    card?: RelatiCard;
    skill?: RelatiSkill;
}

export type RoleEffectSkill = RelatiSkill<RoleEffectState>;

export let RoleEffect: RoleEffectSkill = {
    type: "action",
    name: "角色被動技能",
    detail: "觸發所有被動技能",
    async do({ game, game: { board: { gridList } }, grid, role, card, skill }) {
        var skillPriority = 0;

        do {
            var skillActived = false;

            await Promise.all(gridList.map(grid => new Promise(resolve => {
                if (!grid.role) return resolve();

                Promise.all(grid.role.skills.map(skill => new Promise<void>(skillExecuted => {
                    if (skill.type != "effect" || skill.priority != skillPriority) {
                        return skillExecuted();
                    }

                    skillActived = true;
                    skill.do({ game, grid, role, card, skill }).then(skillExecuted);
                    skillExecuted();
                }))).then(resolve);
            })));

            skillPriority++;
        } while (skillActived);

        for (var { role } of gridList) {
            if (!role) continue;
            Object.assign(role.info.status, role.status);
            Object.assign(role.info.points, role.points);
            Object.assign(role.info.params, role.params);
            Object.assign(role.info.skills, role.skills);
        }
    }
};