/// <reference path="GridBoard.d.ts" />

declare namespace Relati {
    interface RelatiAction {
        name: string;
        do(state: RelatiGameState): void;
    }
}
declare namespace Relati {
    interface RelatiBoard extends GridBoard {
        grids: RelatiGrid[][];
        gridList: RelatiGrid[];
        query(coordinateCommand: string): RelatiGrid;
        queries(coordinateCommands: string): RelatiGrid[];
    }
    interface RelatiGrid extends Grid {
        role?: RelatiRole;
        board: RelatiBoard;
        query(directionCommand: string): RelatiGrid;
        queries(directionCommands: string): RelatiGrid[];
    }
}
declare namespace Relati {
    interface RelatiEffect {
        name: string;
        do(state: RelatiGameState): void;
    }
}
declare namespace Relati {
    class RelatiGame {
        board: RelatiBoard;
        turn: number;
        players: RelatiPlayer[];
        view: {
            [name: string]: SVGElement;
        };
        constructor(board: RelatiBoard, container: HTMLElement);
        getNowPlayer(): RelatiPlayer;
        selectGrid(grid: RelatiGrid): void;
    }
    interface RelatiGameState {
        game?: RelatiGame;
        owner?: RelatiPlayer;
        grid?: RelatiGrid;
    }
}
declare namespace Relati {
    class RelatiPlayer {
        game: RelatiGame;
        badge: string;
        constructor(game: RelatiGame, badge: string);
        selectGrid(grid: RelatiGrid): void;
    }
}
declare namespace Relati {
    type RelatiRoleType = "normal" | "leader" | "wizard";
    type RelatiRoleStatus = (RelatiRoleStatusRelati);
    interface RelatiRole {
        is(status: RelatiRoleStatus): boolean;
        is(status: RelatiRoleStatus[], type: "all" | "any"): boolean;
    }
    class RelatiRole {
        owner: RelatiPlayer;
        grid: RelatiGrid;
        type: RelatiRoleType;
        status: {
            [status: string]: boolean;
        };
        effects: RelatiAction[];
        actions: RelatiAction[];
        constructor(owner: RelatiPlayer, grid: RelatiGrid);
        gain(...statusList: RelatiRoleStatus[]): void;
        lost(...statusList: RelatiRoleStatus[]): void;
    }
}
declare namespace Relati {
    type RelatiRoleStatusRelatiRemoteStable = ("relati-remote-stable-launcher" | "relati-remote-stable-repeater" | "relati-remote-stable-receiver");
    var RelatiRoleStatusRelatiRemoteStable: RelatiRoleStatusRelatiRemoteStable[];
    type RelatiRoleStatusRelatiRemoteNormal = ("relati-remote-normal-launcher" | "relati-remote-normal-repeater" | "relati-remote-normal-receiver");
    var RelatiRoleStatusRelatiRemoteNormal: RelatiRoleStatusRelatiRemoteNormal[];
    type RelatiRoleStatusRelatiRemote = ("relati-remote-launcher" | "relati-remote-repeater" | "relati-remote-receiver" | RelatiRoleStatusRelatiRemoteNormal | RelatiRoleStatusRelatiRemoteStable);
    var RelatiRoleStatusRelatiRemote: RelatiRoleStatusRelatiRemote[];
    type RelatiRoleStatusRelatiNormal = ("relati-normal-launcher" | "relati-normal-repeater" | "relati-normal-receiver");
    var RelatiRoleStatusRelatiNormal: RelatiRoleStatusRelatiNormal[];
    type RelatiRoleStatusRelati = ("relati-launcher" | "relati-repeater" | "relati-receiver" | RelatiRoleStatusRelatiNormal | RelatiRoleStatusRelatiRemote);
    var RelatiRoleStatusRelati: RelatiRoleStatusRelati[];
}
declare namespace Relati {
    type RelatiRoleStatusRelatiLauncher = ("relati-launcher" | "relati-normal-launcher" | "relati-remote-launcher" | "relati-remote-normal-launcher" | "relati-remote-stable-launcher");
    var RelatiRoleStatusRelatiLauncher: RelatiRoleStatusRelatiLauncher[];
    type RelatiRoleStatusRelatiRepeater = ("relati-repeater" | "relati-normal-repeater" | "relati-remote-repeater" | "relati-remote-normal-repeater" | "relati-remote-stable-repeater");
    var RelatiRoleStatusRelatiRepeater: RelatiRoleStatusRelatiRepeater[];
    type RelatiRoleStatusRelatiReceiver = ("relati-receiver" | "relati-normal-receiver" | "relati-remote-receiver" | "relati-remote-normal-receiver" | "relati-remote-stable-receiver");
    var RelatiRoleStatusRelatiReceiver: RelatiRoleStatusRelatiReceiver[];
}
declare namespace Relati {
    interface RelatiRule {
        allow(state: RelatiGameState): boolean;
    }
    interface RelatiRuleTraceable extends RelatiRule {
        trace(state: RelatiGameState): RelatiRuleTrace[];
    }
    interface RelatiRuleTrace {
        target: RelatiGrid;
        routes: RelatiGrid[];
    }
}
declare namespace Relati {
    namespace RelatiView {
        function viewInitialize(board: RelatiBoard, gridSize: number, container: HTMLElement, view: RelatiGame["view"]): void;
        function updateBoardView(board: RelatiBoard, view: RelatiGame["view"]): void;
    }
}
declare namespace Relati {
    namespace RelatiEffects {
        var RelatiMaintain: RelatiEffect;
    }
}
declare namespace Relati {
    namespace RelatiRoles {
        class RelatiLeader extends RelatiRole {
            type: RelatiRoleType;
            effects: RelatiEffect[];
        }
    }
}
declare namespace Relati {
    namespace RelatiRules {
        var RelatiSourceGridStatus: RelatiRoleStatus[];
        var RelatiBySource: RelatiRuleTraceable;
        var RelatiNormalSourceGridStatus: RelatiRoleStatus[];
        var RelatiNormalBySource: RelatiRuleTraceable;
        var RelatiRemoteSourceGridStatus: RelatiRoleStatus[];
        var RelatiRemoteBySource: RelatiRuleTraceable;
        var RelatiRemoteNormalSourceGridStatus: RelatiRoleStatus[];
        var RelatiRemoteNormalBySource: RelatiRuleTraceable;
        var RelatiRemoteStableSourceGridStatus: RelatiRoleStatus[];
        var RelatiRemoteStableBySource: RelatiRuleTraceable;
    }
}
declare namespace Relati {
    namespace RelatiRules {
        var RelatiTargetGridStatus: RelatiRoleStatus[];
        var RelatiToTarget: RelatiRuleTraceable;
        var RelatiNormalTargetGridStatus: RelatiRoleStatus[];
        var RelatiNormalToTarget: RelatiRuleTraceable;
        var RelatiRemoteTargetGridStatus: RelatiRoleStatus[];
        var RelatiRemoteToTarget: RelatiRuleTraceable;
        var RelatiRemoteNormalTargetGridStatus: RelatiRoleStatus[];
        var RelatiRemoteNormalToTarget: RelatiRuleTraceable;
        var RelatiRemoteStableTargetGridStatus: RelatiRoleStatus[];
        var RelatiRemoteStableToTarget: RelatiRuleTraceable;
    }
}
