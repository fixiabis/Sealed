import { RelatiRoleInfo } from "../RelatiRole";
import { RelatiPathParam } from "../rules/RelatiPath";

export var NormalXa: RelatiRoleInfo = {
    type: "normal",
    name: "科薩",
    detail: "連結能力極廣的角色",
    gain: ["relati-receiver"],
    points: { "summon-cost": 1 },
    params: {
        "relati-source": RelatiPathParam.Common,
        "relati-target": RelatiPathParam.Common
    },
    leader: {
        type: "leader",
        name: "科薩",
        detail: "連結能力極廣的角色",
        gain: ["relati-launcher"],
        points: { "summon-assets": 40 },
        params: {
            "relati-target": RelatiPathParam.Common
        }
    }
};
