declare class Grid {
    board: GridBoard;
    x: number;
    y: number;
    coordinate: string;
    static simplifyDirectionList: RegExp[];
    static originalDirectionLists: string[][];
    constructor(board: GridBoard, x: number, y: number);
    query(directionCommand: string): void | Grid;
    queries(directionCommands: string): (void | Grid)[];
}
declare class GridBoard {
    width: number;
    height: number;
    [gridCoor: string]: any;
    grids: Grid[][];
    gridList: Grid[];
    constructor(width: number, height: number);
    query(coordinateCommand: string): Grid;
    queries(coordinateCommands: string): Grid[];
}
declare namespace Relati {
    interface RelatiAction {
        action(state: RelatiGameState): void;
    }
}
declare namespace Relati {
    interface RelatiBoard {
        grids: RelatiGrid[][];
        gridList: RelatiGrid[];
        query(coordinateCommand: string): RelatiGrid;
        queries(coordinateCommands: string): RelatiGrid[];
    }
    class RelatiBoard extends GridBoard {
        width: number;
        height: number;
        gridList: RelatiGrid[];
        constructor(width: number, height: number);
    }
}
declare namespace Relati {
    interface RelatiCard {
        owner: RelatiPlayer;
        actions: RelatiAction[];
        effects: RelatiAction[];
        select(game: RelatiGame): void;
        launch(game: RelatiGame, grid: RelatiGrid): void;
    }
}
declare namespace Relati {
    class RelatiGame {
        board: RelatiBoard;
        players: RelatiPlayer[];
        turn: number;
        constructor(board: RelatiBoard, players: RelatiPlayer[]);
        nowPlayer(): RelatiPlayer;
    }
    interface RelatiGameState {
        game?: RelatiGame;
        owner?: RelatiPlayer;
        grid?: RelatiGrid;
    }
}
declare namespace Relati {
    interface RelatiGrid {
        board: RelatiBoard;
        query(directionCommand: string): RelatiGrid;
        queries(directionCommands: string): RelatiGrid[];
    }
    class RelatiGrid extends Grid {
        role?: RelatiRole;
        selectable: boolean;
        cards: RelatiCard[];
    }
}
declare namespace Relati {
    class RelatiPlayer {
        deck: RelatiCard[];
        hand: RelatiCard[];
        blood: number;
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
        blood: number;
        status: {
            [statusName: string]: boolean;
        };
        attack: number;
        defend: number;
        constructor(owner: RelatiPlayer, grid: RelatiGrid);
        gain(status: RelatiRoleStatus): void;
        lost(status: RelatiRoleStatus): void;
    }
}
declare namespace Relati {
    type RelatiRoleStatusRelati = ("relati-launcher" | "relati-repeater" | "relati-recepter" | "relati-blocked" | RelatiRoleStatusRelatiNormal | RelatiRoleStatusRelatiRemote);
    type RelatiRoleStatusRelatiNormal = ("relati-normal-launcher" | "relati-normal-repeater" | "relati-normal-recepter" | "relati-normal-blocked");
    type RelatiRoleStatusRelatiRemote = ("relati-remote-launcher" | "relati-remote-repeater" | "relati-remote-recepter" | "relati-remote-blocked" | RelatiRoleStatusRelatiRemoteNormal | RelatiRoleStatusRelatiRemoteStable);
    type RelatiRoleStatusRelatiRemoteNormal = ("relati-remote-normal-launcher" | "relati-remote-normal-repeater" | "relati-remote-normal-recepter" | "relati-remote-normal-blocked");
    type RelatiRoleStatusRelatiRemoteStable = ("relati-remote-stable-launcher" | "relati-remote-stable-repeater" | "relati-remote-stable-recepter" | "relati-remote-stable-blocked");
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
    var RelatiBlockGridStatus: RelatiRoleStatus[];
    var RelatiBlock: RelatiAction;
}
declare namespace Relati {
    namespace RelatiActions {
        var Shuffle: RelatiAction;
    }
}
declare namespace Relati {
    namespace RelatiCards {
        class Normal implements RelatiCard {
            owner: RelatiPlayer;
            actions: RelatiAction[];
            effects: RelatiAction[];
            constructor(owner: RelatiPlayer);
            select(game: RelatiGame): void;
            launch(game: RelatiGame, grid: RelatiGrid): void;
        }
    }
}
declare namespace Relati {
    namespace RelatiRoles {
        class Normal extends RelatiRole {
            blood: number;
            attack: number;
            defend: number;
        }
    }
}
declare namespace Relati {
    namespace RelatiRules {
        var RelatiSourceGridStatus: RelatiRoleStatus[];
        var Relati: RelatiRuleTraceable;
        var RelatiNormalSourceGridStatus: RelatiRoleStatus[];
        var RelatiNormal: RelatiRuleTraceable;
        var RelatiRemoteSourceGridStatus: RelatiRoleStatus[];
        var RelatiRemote: RelatiRuleTraceable;
        var RelatiRemoteNormalSourceGridStatus: RelatiRoleStatus[];
        var RelatiRemoteNormal: RelatiRuleTraceable;
        var RelatiRemoteStableSourceGridStatus: RelatiRoleStatus[];
        var RelatiRemoteStable: RelatiRuleTraceable;
    }
}
declare namespace Relati {
    namespace RelatiRules {
        var RelatiTargetGridStatus: RelatiRoleStatus[];
        var RelatiBlock: RelatiRuleTraceable;
        var RelatiNormalTargetGridStatus: RelatiRoleStatus[];
        var RelatiNormalBlock: RelatiRuleTraceable;
        var RelatiRemoteTargetGridStatus: RelatiRoleStatus[];
        var RelatiRemoteBlock: RelatiRuleTraceable;
        var RelatiRemoteNormalTargetGridStatus: RelatiRoleStatus[];
        var RelatiRemoteNormalBlock: RelatiRuleTraceable;
        var RelatiRemoteStableTargetGridStatus: RelatiRoleStatus[];
        var RelatiRemoteStableBlock: RelatiRuleTraceable;
    }
}
