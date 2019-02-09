namespace Relati {
    export type RelatiRoleStatusExt = (
        "ownerO" | "ownerX" |
        "spaceR" | "spaceF" |
        "space"
    );

    export type RelatiRoleStatus = (
        RelatiRoleRelatiStatus |
        RelatiRolePlaceableStatus |
        "archer"
    );

    export type RelatiRolePlaceableStatus = (
        "O-placeable" |
        "X-placeable"
    );

    export type RelatiRoleRelatiStatus = (
        "relati-launcher" |
        "relati-repeater" |
        "relati-receiver" |
        "relati-blocked" |
        RelatiRoleRelatiNormalStatus |
        RelatiRoleRelatiRemoteStatus
    );

    export type RelatiRoleRelatiNormalStatus = (
        "relati-normal-launcher" |
        "relati-normal-repeater" |
        "relati-normal-receiver" |
        "relati-normal-blocked"
    );

    export type RelatiRoleRelatiRemoteStatus = (
        "relati-remote-launcher" |
        "relati-remote-repeater" |
        "relati-remote-receiver" |
        "relati-remote-blocked" |
        RelatiRoleRelatiRemoteNormalStatus |
        RelatiRoleRelatiRemoteStableStatus
    );

    export type RelatiRoleRelatiRemoteNormalStatus = (
        "relati-remote-normal-launcher" |
        "relati-remote-normal-repeater" |
        "relati-remote-normal-receiver" |
        "relati-remote-normal-blocked"
    );

    export type RelatiRoleRelatiRemoteStableStatus = (
        "relati-remote-stable-launcher" |
        "relati-remote-stable-repeater" |
        "relati-remote-stable-receiver" |
        "relati-remote-stable-blocked"
    );
}