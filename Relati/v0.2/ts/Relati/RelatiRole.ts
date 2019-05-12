namespace Relati {
    export type RelatiRoleType = "normal" | "leader" | "wizard";

    export type RelatiRoleStatus = (
        RelatiRoleStatusRelati
    );

    export interface RelatiRole {
        is(status: RelatiRoleStatus): boolean;
        is(status: RelatiRoleStatus[], type: "all" | "any"): boolean;
    }

    export class RelatiRole {
        public type: RelatiRoleType = "normal";
        public status: { [status: string]: boolean } = {};
        public effects: RelatiRoleEffect[] = [];
        public actions: RelatiRoleAction[] = [];

        constructor(
            public owner: RelatiPlayer,
            public grid: RelatiGrid
        ) { }

        is(status: RelatiRoleStatus | RelatiRoleStatus[], type?: "all" | "any") {
            if (typeof status === "string") return this.status[status];

            if (type === "any") {
                for (var statusName of status) {
                    if (this.status[statusName]) return true;
                }

                return false;
            } else {
                for (var statusName of status) {
                    if (!this.status[statusName]) return false;
                }

                return true;
            }
        }

        gain(...statusList: RelatiRoleStatus[]) {
            for (var status of statusList) {
                this.status[status] = true;
            }
        }

        lost(...statusList: RelatiRoleStatus[]) {
            for (var status of statusList) {
                this.status[status] = false;
            }
        }
    }
}

namespace Relati {
    export type RelatiRoleStatusRelatiRemoteStable = (
        "relati-remote-stable-launcher" |
        "relati-remote-stable-repeater" |
        "relati-remote-stable-receiver"
    );

    export var RelatiRoleStatusRelatiRemoteStable: RelatiRoleStatusRelatiRemoteStable[] = [
        "relati-remote-stable-launcher",
        "relati-remote-stable-repeater",
        "relati-remote-stable-receiver"
    ];

    export type RelatiRoleStatusRelatiRemoteNormal = (
        "relati-remote-normal-launcher" |
        "relati-remote-normal-repeater" |
        "relati-remote-normal-receiver"
    );

    export var RelatiRoleStatusRelatiRemoteNormal: RelatiRoleStatusRelatiRemoteNormal[] = [
        "relati-remote-normal-launcher",
        "relati-remote-normal-repeater",
        "relati-remote-normal-receiver"
    ];

    export type RelatiRoleStatusRelatiRemote = (
        "relati-remote-launcher" |
        "relati-remote-repeater" |
        "relati-remote-receiver" |
        RelatiRoleStatusRelatiRemoteNormal |
        RelatiRoleStatusRelatiRemoteStable
    );

    export var RelatiRoleStatusRelatiRemote: RelatiRoleStatusRelatiRemote[] = [
        "relati-remote-launcher",
        "relati-remote-repeater",
        "relati-remote-receiver",
        ...RelatiRoleStatusRelatiRemoteNormal,
        ...RelatiRoleStatusRelatiRemoteStable
    ];

    export type RelatiRoleStatusRelatiNormal = (
        "relati-normal-launcher" |
        "relati-normal-repeater" |
        "relati-normal-receiver"
    );

    export var RelatiRoleStatusRelatiNormal: RelatiRoleStatusRelatiNormal[] = [
        "relati-normal-launcher",
        "relati-normal-repeater",
        "relati-normal-receiver"
    ];

    export type RelatiRoleStatusRelati = (
        "relati-launcher" |
        "relati-repeater" |
        "relati-receiver" |
        RelatiRoleStatusRelatiNormal |
        RelatiRoleStatusRelatiRemote
    );

    export var RelatiRoleStatusRelati: RelatiRoleStatusRelati[] = [
        "relati-launcher",
        "relati-repeater",
        "relati-receiver",
        ...RelatiRoleStatusRelatiNormal,
        ...RelatiRoleStatusRelatiRemote
    ];
}

namespace Relati {
    export type RelatiRoleStatusRelatiLauncher = (
        "relati-launcher" |
        "relati-normal-launcher" |
        "relati-remote-launcher" |
        "relati-remote-normal-launcher" |
        "relati-remote-stable-launcher"
    );

    export var RelatiRoleStatusRelatiLauncher: RelatiRoleStatusRelatiLauncher[] = [
        "relati-launcher",
        "relati-normal-launcher",
        "relati-remote-launcher",
        "relati-remote-normal-launcher",
        "relati-remote-stable-launcher"
    ];

    export type RelatiRoleStatusRelatiRepeater = (
        "relati-repeater" |
        "relati-normal-repeater" |
        "relati-remote-repeater" |
        "relati-remote-normal-repeater" |
        "relati-remote-stable-repeater"
    );

    export var RelatiRoleStatusRelatiRepeater: RelatiRoleStatusRelatiRepeater[] = [
        "relati-repeater",
        "relati-normal-repeater",
        "relati-remote-repeater",
        "relati-remote-normal-repeater",
        "relati-remote-stable-repeater"
    ];

    export type RelatiRoleStatusRelatiReceiver = (
        "relati-receiver" |
        "relati-normal-receiver" |
        "relati-remote-receiver" |
        "relati-remote-normal-receiver" |
        "relati-remote-stable-receiver"
    );

    export var RelatiRoleStatusRelatiReceiver: RelatiRoleStatusRelatiReceiver[] = [
        "relati-receiver",
        "relati-normal-receiver",
        "relati-remote-receiver",
        "relati-remote-normal-receiver",
        "relati-remote-stable-receiver"
    ];
}