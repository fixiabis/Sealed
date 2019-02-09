namespace Relati {
    export type RelatiRoleOwnerSymbol = "" | "O" | "X";
    export type RelatiRoleType = "leader" | "normal" | "wizard" | "general";

    export class RelatiRole {
        public owner: RelatiRoleOwnerSymbol = "";
        public type: RelatiRoleType = "normal";
        public name = "unknown";
        public blood = 1;
        /* public statusList: RelatiRoleStatus[] = []; */
        public status: { [statusName: string]: boolean } = {};
        public effects: RelatiRuleYieldable[] = [];

        constructor(public grid: RelatiGrid) { };

        is(status: string) {
            if (status.indexOf("|") > -1) {
                var statusList = status.split("|");

                for (var status of statusList) {
                    if (this.is(status)) return true;
                }

                return false;
            }

            if (status.indexOf("&") > -1) {
                var statusList = status.split("&");

                for (var status of statusList) {
                    if (!this.is(status)) return false;
                }

                return true;
            }

            switch (<RelatiRoleStatusExt>status) {
                case "ownerO": return this.owner == "O";
                case "ownerX": return this.owner == "X";
                case "space": return (this.owner == "" || this.blood == 0);
                case "spaceR": return this.owner == "";
                case "spaceF": return this.blood == 0;
            }

            return this.status[status];

            /* return this.statusList.indexOf(<RelatiRoleStatus>status) != -1; */
        }

        insertStatus(status: RelatiRoleStatus) {
            return this.status[status] = true;

            /* var statusIndex = this.statusList.indexOf(<RelatiRoleStatus>status);
            if (statusIndex == -1) this.statusList.push(status); */
        }

        updateStatus(status: RelatiRoleStatus, newStatus: RelatiRoleStatus) {
            /* var statusIndex = this.statusList.indexOf(<RelatiRoleStatus>status);
            this.statusList[statusIndex] = newStatus; */
        }

        deleteStatus(status: RelatiRoleStatus) {
            return this.status[status] = false;

            /* var statusIndex = this.statusList.indexOf(<RelatiRoleStatus>status);
            if (statusIndex != -1) this.statusList.splice(statusIndex, 1); */
        }
    }
}