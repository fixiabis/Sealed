function addAttackRule(game, options) {
    var board = game.board;
    var dirO = ["F", "B", "R", "L", "FR", "FL", "BR", "BL"];

    var config = {
        attack: true,
        target: "other normal|other source|other forbid",
        route: "space|owner",
        medium: "owner valid",
        bullet: "owner normal"
    };

    if (options) {
        config = {
            attack: options["use-attack"],
            target: options["attack-target"],
            route: options["attack-route"],
            medium: options["attack-medium"],
            bullet: options["attack-bullet"]
        }
    }

    var select = {
        condition: function () {
            return (
                config.attack &&
                board.query("select").length > 0
            );
        },
        configure: function (grid) {
            if (grid.status !== "select") return;
            grid.status = "broken";
            board.query("select").forEach(
                grid => grid.status = "normal"
            );
            game.turn++;
        }
    };

    var attack = {
        condition: function (grid) {
            if (
                !grid.is(config.target)
            ) return false;

            var selected = false;

            for (var i = 0; i < dirO.length; i++) {
                var nowDir = dirO[i];

                do {
                    var attackGrid = grid.getGridFromDir(nowDir);
                    if (!attackGrid || !attackGrid.is(config.route)) break;

                    if (attackGrid.is(config.medium)) {
                        var consumGrid = attackGrid.getGridFromDir(dirO[i]);

                        if (consumGrid && consumGrid.is(config.bullet)) {
                            consumGrid.status = "select";
                            selected = true;
                            break;
                        }
                    }

                    nowDir += dirO[i];
                } while (grid.getGridFromDir(nowDir));
            }

            return selected;
        },
        configure: function (grid) {
            grid.status = "broken";
        }
    };

    game.actions.unshift(select);
    game.actions.push(attack);
}

function addDefendRule(game, options) {
    var config = {
        defend: true,
        source: "other valid|other forbid"
    };

    if (options) {
        config = {
            defend: options["use-defend"],
            source: options["defend-source"]
        }
    }

    var defend = {
        condition: function (grid) {
            return (
                config.defend &&
                grid.is(config.source)
            );
        },
        configure: function (grid) {
            grid.status = "shield";
            game.turn++;
        }
    };

    game.actions.push(defend);
}

function addBomberRule(game, options) {
    var board = game.board;

    var config = {
        bomber: true,
        target: "owner|other",
        source: "owner shield"
    };

    if (options) {
        config = {
            bomber: options["use-bomber"],
            target: options["bomber-target"] + "|" +
                options["bomber-target"].replace(/other/g, "owner"),
            source: options["bomber-source"]
        }
    }

    var bomber = {
        condition: function (grid) {
            return (
                config.bomber &&
                grid.is(config.source)
            );
        },
        configure: function (grid) {
            grid.status = "broken";
            board.query(config.target, grid.getGridsFromDir("O")).forEach(
                grid => grid.status = "broken"
            );
            game.turn++;
        }
    };

    game.actions.push(bomber);
}

function addPincerRule(game, options) {
    var board = game.board;

    var config = {
        pincer: true,
        target: "owner valid|owner forbid",
        source: "other valid|other forbid",
        dir: ["T", "X"]
    };

    if (options) {
        config = {
            pincer: options["use-pincer"],
            target: options["pincer-target"].replace(/other/g, "owner"),
            source: options["pincer-source"].replace(/owner/g, "other"),
            dir: options["pincer-dir"].split("|")
        }
    }

    function pincer() {
        if (!config.pincer) return;

        for (var x = 1; x < board.width - 1; x++) {
            for (var y = 1; y < board.height - 1; y++) {
                var grid = board.grids[x][y];
                var gridSym = grid.symbol;
                if (!grid.is(config.target, gridSym)) continue;
                var broken = false;

                for (var i = 0; i < config.dir.length; i++) {
                    if (!config.dir[i]) break;

                    var pincerSourceGrid = grid.getGridsFromDir(config.dir[i]);
                    broken = board.query(
                        config.source,
                        pincerSourceGrid,
                        gridSym
                    ).length === pincerSourceGrid.length;
                }

                if (broken) grid.status = "broken";
            }
        }
    }

    game.rules.push(pincer);
}