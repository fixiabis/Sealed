import { RelatiRoleInfo } from "../RelatiRole";
import { RelatiProtocolParam } from "../rules/RelatiProtocol";

export var NormalOd: RelatiRoleInfo = {
    type: "normal",
    name: "奧德",
    detail: "連結能力極廣的角色",
    gain: ["relati-receiver"],
    points: { "summon-cost": 1 },
    params: {
        "relati-source": RelatiProtocolParam.Common,
        "relati-target": RelatiProtocolParam.Common
    },
    leader: {
        type: "leader",
        name: "奧德",
        detail: "連結能力極廣的角色",
        gain: ["relati-launcher"],
        points: { "summon-assets": 40 },
        params: {
            "relati-target": RelatiProtocolParam.Common
        }
    }
};
