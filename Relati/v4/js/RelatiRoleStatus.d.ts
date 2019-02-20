/** 角色狀態 */
export declare namespace RelatiRoleStatus {
    /** 通用連結狀態 */
    type RelatiCommon = ("relati-launcher" | "relati-repeater" | "relati-receiver");
    const RelatiCommon: RelatiCommon[];
    /** 一般連結狀態 */
    type RelatiNormal = ("relati-normal-launcher" | "relati-normal-repeater" | "relati-normal-receiver");
    const RelatiNormal: RelatiNormal[];
    /** 遠程連結狀態 */
    type RelatiRemote = ("relati-remote-launcher" | "relati-remote-repeater" | "relati-remote-receiver");
    const RelatiRemote: RelatiRemote[];
    /** 遠程一般連結狀態 */
    type RelatiRemoteNormal = ("relati-remote-normal-launcher" | "relati-remote-normal-repeater" | "relati-remote-normal-receiver");
    const RelatiRemoteNormal: RelatiRemoteNormal[];
    /** 遠程穩定連結狀態 */
    type RelatiRemoteStable = ("relati-remote-stable-launcher" | "relati-remote-stable-repeater" | "relati-remote-stable-receiver");
    const RelatiRemoteStable: RelatiRemoteStable[];
    /** 連結發射器 */
    type RelatiLauncher = ("relati-launcher" | "relati-normal-launcher" | "relati-remote-launcher" | "relati-remote-normal-launcher" | "relati-remote-stable-launcher");
    const RelatiLauncher: RelatiLauncher[];
    /** 連結中繼器 */
    type RelatiRepeater = ("relati-repeater" | "relati-normal-repeater" | "relati-remote-repeater" | "relati-remote-normal-repeater" | "relati-remote-stable-repeater");
    const RelatiRepeater: RelatiRepeater[];
    /** 連結接收器 */
    type RelatiReceiver = ("relati-receiver" | "relati-normal-receiver" | "relati-remote-receiver" | "relati-remote-normal-receiver" | "relati-remote-stable-receiver");
    const RelatiReceiver: RelatiReceiver[];
}
export declare type RelatiRoleStatus = (RelatiRoleStatus.RelatiCommon | RelatiRoleStatus.RelatiNormal | RelatiRoleStatus.RelatiRemote | RelatiRoleStatus.RelatiRemoteNormal | RelatiRoleStatus.RelatiRemoteStable);
