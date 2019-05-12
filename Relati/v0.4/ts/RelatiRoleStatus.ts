/** 角色狀態 */
export namespace RelatiRoleStatus {
    /** 通用連結狀態 */
    export type RelatiCommon = (
        "relati-launcher" |
        "relati-repeater" |
        "relati-receiver"
    );

    export const RelatiCommon: RelatiCommon[] = [
        "relati-launcher",
        "relati-repeater",
        "relati-receiver"
    ];

    /** 一般連結狀態 */
    export type RelatiNormal = (
        "relati-normal-launcher" |
        "relati-normal-repeater" |
        "relati-normal-receiver"
    );

    export const RelatiNormal: RelatiNormal[] = [
        "relati-normal-launcher",
        "relati-normal-repeater",
        "relati-normal-receiver"
    ];

    /** 遠程連結狀態 */
    export type RelatiRemote = (
        "relati-remote-launcher" |
        "relati-remote-repeater" |
        "relati-remote-receiver"
    );

    export const RelatiRemote: RelatiRemote[] = [
        "relati-remote-launcher",
        "relati-remote-repeater",
        "relati-remote-receiver"
    ];

    /** 遠程一般連結狀態 */
    export type RelatiRemoteNormal = (
        "relati-remote-normal-launcher" |
        "relati-remote-normal-repeater" |
        "relati-remote-normal-receiver"
    );

    export const RelatiRemoteNormal: RelatiRemoteNormal[] = [
        "relati-remote-normal-launcher",
        "relati-remote-normal-repeater",
        "relati-remote-normal-receiver"
    ];

    /** 遠程穩定連結狀態 */
    export type RelatiRemoteStable = (
        "relati-remote-stable-launcher" |
        "relati-remote-stable-repeater" |
        "relati-remote-stable-receiver"
    );

    export const RelatiRemoteStable: RelatiRemoteStable[] = [
        "relati-remote-stable-launcher",
        "relati-remote-stable-repeater",
        "relati-remote-stable-receiver"
    ];

    /** 連結發射器 */
    export type RelatiLauncher = (
        "relati-launcher" |
        "relati-normal-launcher" |
        "relati-remote-launcher" |
        "relati-remote-normal-launcher" |
        "relati-remote-stable-launcher"
    );

    export const RelatiLauncher: RelatiLauncher[] = [
        "relati-launcher",
        "relati-normal-launcher",
        "relati-remote-launcher",
        "relati-remote-normal-launcher",
        "relati-remote-stable-launcher"
    ];

    /** 連結中繼器 */
    export type RelatiRepeater = (
        "relati-repeater" |
        "relati-normal-repeater" |
        "relati-remote-repeater" |
        "relati-remote-normal-repeater" |
        "relati-remote-stable-repeater"
    );

    export const RelatiRepeater: RelatiRepeater[] = [
        "relati-repeater",
        "relati-normal-repeater",
        "relati-remote-repeater",
        "relati-remote-normal-repeater",
        "relati-remote-stable-repeater"
    ];

    /** 連結接收器 */
    export type RelatiReceiver = (
        "relati-receiver" |
        "relati-normal-receiver" |
        "relati-remote-receiver" |
        "relati-remote-normal-receiver" |
        "relati-remote-stable-receiver"
    );

    export const RelatiReceiver: RelatiReceiver[] = [
        "relati-receiver",
        "relati-normal-receiver",
        "relati-remote-receiver",
        "relati-remote-normal-receiver",
        "relati-remote-stable-receiver"
    ];
}

export type RelatiRoleStatus = (
    RelatiRoleStatus.RelatiCommon |
    RelatiRoleStatus.RelatiNormal |
    RelatiRoleStatus.RelatiRemote |
    RelatiRoleStatus.RelatiRemoteNormal |
    RelatiRoleStatus.RelatiRemoteStable
);