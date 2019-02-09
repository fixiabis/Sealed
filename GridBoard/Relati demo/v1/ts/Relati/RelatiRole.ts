namespace Relati {
    export type RelatiRoleType = "leader" | "normal" | "wizard" | "general";

    export class RelatiRole {
        public owner: RelatiPlayer | undefined;
        public type: RelatiRoleType = "normal";
        public name = "unknown";
        public blood = 1;
        public actions: RelatiAction[] = [];
        public effects: RelatiAction[] = [];
        [statusName: string]: any;

        constructor(public grid: RelatiGrid) { };

        is(status: string): boolean {
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

            switch (status) {
                case "space": return (this.owner == null || this.blood == 0);
                case "spaceR": return this.owner == null;
                case "spaceF": return this.blood == 0;
            }

            return this[status];
        }
    }
}