import { RelatiRuleTrace, RelatiRuleTraceable } from "../RelatiRule";
import { RelatiGrid, RelatiGridHasRole } from "../RelatiBoard";
import { RelatiRoleStatus, RelatiRole } from "../RelatiRole";
import { RelatiPlayer } from "../RelatiPlayer";
import { Grid } from "../base/GridBoard";

interface RelatiPathState {
    role: RelatiRole,
    status: RelatiRoleStatus[],
    fromType: string,
    toType: string
};

type RelatiPathRule = RelatiRuleTraceable<RelatiPathState>;

export var RelatiPath: RelatiPathRule = {
    name: "連結規則",
    detail: "判斷是否能夠連結",
    allow({ role, status, fromType, toType }) {
        var { owner } = role;

        var paths = RelatiGridPathRouter(
            role.params[fromType],
            role.grid
        );

        for (var path of paths) {
            var { target, routes } = path;

            if (
                reliable(target, owner, status) &&
                relatiable(target as RelatiGridHasRole, role.grid, toType)
            ) {
                if (unobstructed(routes)) return true;
            }
        }

        return false;
    },
    trace({ role, status, fromType, toType }) {
        var { owner } = role;
        var paths = RelatiGridPathRouter(
            role.params[fromType],
            role.grid
        );

        var traces: RelatiRuleTrace[] = [];

        for (var path of paths) {
            var { target, routes } = path;

            if (
                reliable(target, owner, status) &&
                relatiable(target as RelatiGridHasRole, role.grid, toType)
            ) {
                if (unobstructed(routes)) traces.push(path);
            }
        }

        return traces;
    }
};

function reliable(
    grid: RelatiGrid,
    owner: RelatiPlayer,
    status: RelatiRoleStatus[]
) {
    return (
        grid &&
        grid.role &&
        grid.role.owner == owner &&
        grid.role.is(status, "any")
    );
}

function relatiable(fromGrid: RelatiGridHasRole, toGrid: RelatiGrid, type: string) {
    var paths = RelatiGridPathRouter(
        fromGrid.role.params[type],
        fromGrid
    );

    for (var path of paths) if (path.target == toGrid) return true;
    return false;
}

function unobstructed(middleGrids: RelatiGrid[]) {
    for (var middleGrid of middleGrids) {
        if (middleGrid.role) return false;
    }

    return true;
}

export interface RelatiPath {
    target: string;
    routes: string;
}

var cachedPath: { [name: string]: RelatiPath[] } = {};

export function RelatiPathRouter(path: string): RelatiPath[] {
    if (cachedPath[path]) return cachedPath[path];

    var paths = path.split("|");
    var traces: RelatiPath[] = [];

    for (var path of paths) {
        var directions = path.split(",");

        traces.push({
            target: directions.shift() as string,
            routes: directions.join(",")
        });
    }

    return cachedPath[path] = traces;
}

export type RelatiGridPath = RelatiRuleTrace;

var cachedGridPath: {
    [grid: string]: {
        [path: string]: RelatiGridPath[]
    }
} = {};

export function RelatiGridPathRouter(
    path: string,
    grid: RelatiGrid
): RelatiGridPath[] {
    if (!cachedGridPath[grid.coordinate]) cachedGridPath[grid.coordinate] = {};

    if (cachedGridPath[grid.coordinate][path]) {
        return cachedGridPath[grid.coordinate][path];
    }

    var directionPaths = RelatiPathRouter(path);

    var gridPaths: RelatiGridPath[] = directionPaths.map(function (path) {
        return {
            target: grid.query(path.target),
            routes: grid.queries(path.routes)
        };
    });

    return cachedGridPath[grid.coordinate][path] = gridPaths;
}

export namespace RelatiPathParam {
    export var RemoteStable = Grid.getOriginalDirection([
        "IIH,II,I", "IIH,IH,I", "IIH,IH,H",
        "IHH,HH,H", "IHH,IH,I", "IHH,IH,H"
    ].join("|")).join("|");
    RelatiPathRouter(RemoteStable);

    export var RemoteNormal = Grid.getOriginalDirection("2O,O").join("|");
    RelatiPathRouter(RemoteNormal);

    export var Remote = [RemoteNormal, RemoteStable].join("|");
    RelatiPathRouter(Remote);

    export var Normal = Grid.getOriginalDirection("O").join("|");
    RelatiPathRouter(Normal);

    export var Common = [Normal, Remote].join("|");
    RelatiPathRouter(Common);

    export function parse(directionCommands: string | string[]) {
        if (directionCommands instanceof Array) {
            directionCommands = directionCommands.join("|");
        }

        var directions = Grid.getOriginalDirection(directionCommands).join("|");
        RelatiPathRouter(directions);
        return directions;
    };
}