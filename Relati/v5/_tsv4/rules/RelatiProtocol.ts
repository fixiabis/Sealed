import { RelatiRuleTrace, RelatiRuleTraceable } from "../RelatiRule";
import { RelatiRole, RelatiRoleStatus } from "../RelatiRole";
import { RelatiGrid, RelatiGridHasRole } from "../RelatiBoard";
import { RelatiPlayer } from "../RelatiPlayer";
import { Grid } from "../base/GridBoard";

export interface RelatiProtocolState {
    role: RelatiRole,
    type: { from: string, to: string }
    status: RelatiRoleStatus[]
};

export type RelatiProtocolRule = RelatiRuleTraceable<RelatiProtocolState>

export let RelatiProtocol: RelatiProtocolRule = {
    name: "連結協定",
    detail: "判斷連結是否符合規則",
    allow({ role, type: { from, to }, status }) {
        var { owner, grid: source } = role;
        var pathTrace = RelatiProtocolRouter(role.params[to], source);

        for (var { target, routes } of pathTrace) {
            if (
                reliable(target, owner, status) &&
                relatiable(target, source, from) &&
                unobstructed(routes)
            ) return true;
        }

        return false;
    },
    trace({ role, type: { from, to }, status }) {
        let traces: RelatiRuleTrace[] = [];

        var { owner, grid } = role;
        var pathTrace = RelatiProtocolRouter(role.params[to], grid);

        for (var { target, routes } of pathTrace) {
            if (
                reliable(target, owner, status) &&
                relatiable(target, grid, from) &&
                unobstructed(routes)
            ) traces.push({ target, routes });
        }

        return traces;
    }
};

function reliable(
    grid: RelatiGrid,
    owner: RelatiPlayer,
    status: RelatiRoleStatus[]
): grid is RelatiGridHasRole {
    return (
        grid &&
        grid.role &&
        grid.role.owner == owner &&
        grid.role.is(status, "any")
    ) as boolean;
}

function relatiable(
    sourceGrid: RelatiGridHasRole,
    targetGrid: RelatiGrid,
    type: string
) {
    let paths = RelatiProtocolRouter(sourceGrid.role.params[type], sourceGrid);
    for (let path of paths) if (path.target == targetGrid) return true;
    return false;
}

function unobstructed(middleGrids: RelatiGrid[]) {
    for (let middleGrid of middleGrids) {
        if (middleGrid.role) return false;
    }

    return true;
}

export interface RelatiPathTrace { target: string, routes: string };

let cachedRoute: JSONData<RelatiPathTrace[]>;

export function RelatiProtocolRouter(path: string): RelatiPathTrace[];
export function RelatiProtocolRouter(path: string, grid: RelatiGrid): RelatiRuleTrace[];
export function RelatiProtocolRouter(path: string, grid?: RelatiGrid) {
    if (grid) {
        let pathTraces: RelatiPathTrace[] = cachedRoute[path] || RelatiProtocolRouter(path);
        let traces: RelatiRuleTrace[] = [];

        for (let trace of pathTraces) {
            traces.push({
                target: grid.query(trace.target),
                routes: grid.queries(trace.routes)
            });
        }

        return traces;
    } else {
        if (cachedRoute[path]) return cachedRoute[path];

        let paths = path.split("|");
        let traces: RelatiPathTrace[] = [];

        for (let path of paths) {
            let directions = path.split(",");

            traces.push({
                target: directions.shift() as string,
                routes: directions.join(",")
            });
        }

        return cachedRoute[path] = traces;
    }
};

export namespace RelatiProtocolParam {
    export function parse(directionCommands: string | string[]) {
        if (directionCommands instanceof Array) {
            directionCommands = directionCommands.join("|");
        }

        let directions = Grid.getOriginalDirection(directionCommands).join("|");
        RelatiProtocolRouter(directions);
        return directions;
    };

    export const RemoteStable = parse([
        "IIH,II,I", "IIH,IH,I", "IIH,IH,H",
        "IHH,HH,H", "IHH,IH,I", "IHH,IH,H"
    ]);
    RelatiProtocolRouter(RemoteStable);

    export const RemoteNormal = parse("2O,O");
    RelatiProtocolRouter(RemoteNormal);

    export const Remote = [RemoteNormal, RemoteStable].join("|");
    RelatiProtocolRouter(Remote);

    export const Normal = parse("O");
    RelatiProtocolRouter(Normal);

    export const Common = [Normal, Remote].join("|");
    RelatiProtocolRouter(Common);
}