import { RelatiRoleInfoParam } from "../RelatiRole";
import { RelatiPathParam } from "../rules/RelatiPath";

export var NormalOd: RelatiRoleInfoParam = {
    type: "normal",
    name: "奧德",
    detail: "連結能力極廣的角色",
    status: ["relati-receiver"],
    points: { "summon-cost": 1 },
    params: {
        "relati-source": RelatiPathParam.Common,
        "relati-target": RelatiPathParam.Common
    },
    leader: {
        type: "leader",
        name: "奧德",
        detail: "連結能力極廣的角色",
        status: ["relati-launcher"],
        points: { "summon-assets": 40 },
        params: {
            "relati-target": RelatiPathParam.Common
        }
    }
};
