function addEscapeRule(game, options) {
    var board = game.board;
    var dirO = ["F", "B", "R", "L", "FR", "FL", "BR", "BL"];

    var config = {
        escape: true,
        route: "space|owner",
        source: "owner valid"
    };

    if (options) {
        config = {
            escape: options["use-escape"],
            route: options["escape-route"],
            source: options["escape-source"]
        }
    }

    var escape = {
        condition: function (grid) {
            if (
                !config.escape ||
                !grid.is("space-real")
            ) return false;

            for (var i = 0; i < dirO.length; i++) {
                var nowDir = dirO[i];

                do {
                    var escapeGrid = grid.getGridFromDir(nowDir);
                    if (!escapeGrid || !escapeGrid.is(config.route)) break;
                    if (escapeGrid.is(config.source, escapeGrid.symbol)) return true;
                    nowDir += dirO[i];
                } while (grid.getGridFromDir(nowDir));
            }

            return false;
        },
        configure: function (grid) {
            board.query(config.source).forEach(
                grid => grid.status = "broken"
            );

            grid.symbol = game.symbol[game.turn % game.players];
            grid.status = "source";
            game.turn++;
        }
    };

    game.actions.push(escape);
}