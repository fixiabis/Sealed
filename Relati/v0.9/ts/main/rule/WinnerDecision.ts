import { RelatiRule } from "../RelatiDefs";
import { RelatiGame } from "../RelatiGame";
import { PlacementRule } from "./Placement";

/** 遊戲勝負結果 */
export type RelatiGameResult = 0 | 1 | 2 | 3;

/** 尚無結果 */
export const GAME_RESULT_NONE: RelatiGameResult = 0;

/** 玩家O勝利 */
export const GAME_RESULT_OWIN: RelatiGameResult = 1;

/** 玩家X勝利 */
export const GAME_RESULT_XWIN: RelatiGameResult = 2;

/** 平手 */
export const GAME_RESULT_DRAW: RelatiGameResult = 3;

/** 勝負判定 */
interface WinnerDecision extends RelatiRule {
    /**
     * 判定遊戲是否已分出勝負
     * @param game 遊戲主體
     */
    state(game: RelatiGame): RelatiGameResult;
}

/** 勝負判定 */
export let WinnerDecision: WinnerDecision = {
    /**
     * 判定遊戲是否已分出勝負
     * @param game 遊戲主體
     */
    state(game: RelatiGame) {
        if (game.turn < 2) return GAME_RESULT_NONE;

        let { nowPlayer } = game;

        let playerOPlaceableGrids = PlacementRule.trace(game, "O");
        let playerXPlaceableGrids = PlacementRule.trace(game, "X");

        let playerOHasPlaceableGrid = playerOPlaceableGrids[0] != undefined;
        let playerXHasPlaceableGrid = playerXPlaceableGrids[0] != undefined;

        if (
            playerOHasPlaceableGrid &&
            playerXHasPlaceableGrid
        ) return GAME_RESULT_NONE;

        if (nowPlayer.symbol == "O") {
            if (playerOHasPlaceableGrid) return GAME_RESULT_NONE;
            else if (playerXHasPlaceableGrid) return GAME_RESULT_XWIN;
        } else if (nowPlayer.symbol == "X") {
            if (playerXHasPlaceableGrid) return GAME_RESULT_NONE;
            else if (playerOHasPlaceableGrid) return GAME_RESULT_OWIN;
        }

        return GAME_RESULT_DRAW;
    }
}