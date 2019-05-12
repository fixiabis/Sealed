interface RelatiRole {
    type: RelatiRole.Type;
    owner: RelatiRole.Owner;
    blood: number;
    attack: number;
    shield: number;
    status: RelatiRole.Status[];
    grid: RelatiGrid;
    has(status: string): boolean;
}

class RelatiRole implements RelatiRole {
    public type: RelatiRole.Type = "士兵";
    public owner: RelatiRole.Owner = "";
    public status: RelatiRole.Status[] = [];

    constructor(public grid: RelatiGrid) { }

    has(status: string): boolean {
        if (status.indexOf("|") > -1) {
            var statusList = status.split("|");

            for (var status of statusList) {
                if (this.has(status)) return true;
            }

            return false;
        }

        if (status.indexOf("&") > -1 || status.indexOf(" ") > -1) {
            var statusList = status.replace(/ /g, "&").split("&");

            for (var status of statusList) {
                if (!this.has(status)) return false;
            }

            return true;
        }

        return this.status.indexOf(<RelatiRole.Status>status) > -1;
    }
}

namespace RelatiRole {
    export type Owner = "" | "O" | "X";
    export type Type = "君主" | "參謀" | "將軍" | "士兵";
    export type Status = (
        "飛行" | // 可無視層級連結

        "阻斷" | // 無法發動技能
        "死亡" | // 無法發動技能與行動，並視為空白
        "暈眩" | // 無法發動技能與行動

        "嘲諷" | // 優先被選為發動技能的對象
        "嗜血" | // 發動技能優先選取血量比例較低的對象
        "狂亂" | // 發動技能隨機選取對象

        "怒氣" | // 被攻擊時, 技能提升30%
        "戰意" | // 發動技能或行動時, 技能提升30%

        "靈巧" | // 被攻擊時, 有30%的機會無效
        "減傷" | // 被攻擊時, 傷害降低30%
        "易傷" | // 被攻擊時, 傷害提升30%
        "強化" | // 技能提升30%
        "弱化" | // 技能降低30%

        "中毒" | // 回合結束後血量減少10%
        "撕裂" | // 發動技能後血量減少10%
        "再生"   // 回合結束後血量恢復10%
    );
}