(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../base/GridBoard"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const GridBoard_1 = require("../base/GridBoard");
    exports.RelatiProtocol = {
        name: "Relati協定",
        detail: "判定是否符合Relati原則",
        allow({ role, role: { owner, grid }, sourceType, targetType, relyStatus, allowCache = true }) {
            let protocolTraces = exports.RelatiProtocol.parse(grid, role.params[targetType], allowCache);
            for (let { target, routes } of protocolTraces) {
                if (reliable(target, owner, relyStatus) &&
                    relatiable(target, grid, sourceType, allowCache) &&
                    unobstructed(routes))
                    return true;
            }
            return false;
        },
        trace({ role, role: { owner, grid }, sourceType, targetType, relyStatus, allowCache = true }) {
            let traces = [];
            let protocolTraces = exports.RelatiProtocol.parse(grid, role.params[targetType], allowCache);
            for (let { target, routes } of protocolTraces) {
                if (reliable(target, owner, relyStatus) &&
                    relatiable(target, grid, sourceType, allowCache) &&
                    unobstructed(routes))
                    traces.push({ target, routes });
            }
            return traces;
        },
        parse(grid, protocol, allowCache) {
            let { cache } = exports.RelatiProtocol;
            if (!cache[grid.coordinate]) {
                cache[grid.coordinate] = {};
            }
            if (cache[grid.coordinate][protocol] && allowCache) {
                return cache[grid.coordinate][protocol];
            }
            let traces = [];
            for (let routes of protocol.split(";")) {
                let route = routes.split(",");
                traces.push({
                    target: grid.query(route.pop()),
                    routes: grid.queries(route.join(","))
                });
            }
            if (allowCache)
                return cache[grid.coordinate][protocol] = traces;
            return traces;
        },
        cache: {}
    };
    var RelatiProtocolParams;
    (function (RelatiProtocolParams) {
        RelatiProtocolParams.RelatiNormal = GridBoard_1.Grid.getOriginalDirection("O").join(";");
        RelatiProtocolParams.RelatiRemoteNormal = GridBoard_1.Grid.getOriginalDirection("O,2O").join(";");
        RelatiProtocolParams.RelatiRemoteStable = GridBoard_1.Grid.getOriginalDirection("I,IH,IIH;H,IH,IIH;I,II,IIH;I,IH,IHH;H,IH,IHH;H,HH,IHH").join(";");
        RelatiProtocolParams.RelatiRemote = `${RelatiProtocolParams.RelatiRemoteNormal};${RelatiProtocolParams.RelatiRemoteStable}`;
        RelatiProtocolParams.RelatiCommon = `${RelatiProtocolParams.RelatiNormal};${RelatiProtocolParams.RelatiRemote}`;
    })(RelatiProtocolParams = exports.RelatiProtocolParams || (exports.RelatiProtocolParams = {}));
    function reliable(grid, owner, status) {
        return (grid &&
            grid.role &&
            grid.role.owner == owner &&
            grid.role.is(status, "any"));
    }
    function relatiable(sourceGrid, targetGrid, type, allowCache) {
        let protocolTraces = exports.RelatiProtocol.parse(sourceGrid, sourceGrid.role.params[type], allowCache);
        for (let { target } of protocolTraces)
            if (target == targetGrid)
                return true;
        return false;
    }
    function unobstructed(middleGrids) {
        for (let middleGrid of middleGrids) {
            if (middleGrid.role)
                return false;
        }
        return true;
    }
});
