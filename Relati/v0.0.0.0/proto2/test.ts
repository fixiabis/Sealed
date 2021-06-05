import JudgeV3 from './classes/Judge/JudgeV3';
import PlayerV1 from './classes/Player/PlayerV1';
import ContinualActionsRule from './classes/rules/ContinualActionsRule';
import LinkRuleV2 from './classes/rules/LinkRule/LinkRuleV2';
import MarkRuleV2 from './classes/rules/MarkRule/MarkRuleV2';
import PlacementRuleV2 from './classes/rules/PlacementRule/PlacementRuleV2';
import Board from './interfaces/Board';

const players = ['O', 'X'].map((shape) => new PlayerV1(shape));
const board = Board.create(9, 9);
const markRule = new MarkRuleV2();
const linkRule = new LinkRuleV2(markRule);
const placementRule = new PlacementRuleV2(markRule, linkRule);
const continualActionsRule = new ContinualActionsRule();
const judge = new JudgeV3();

const rules = {
  placement: placementRule,
  link: linkRule,
  continualActions: continualActionsRule,
};

let game = judge.startGame(players, board, rules);

let coordinates: Coordinate[] = [
  [4, 4],
  [6, 7],
  [4, 6],
  [4, 5],
  [5, 6],
];

for (const coordinate of coordinates) {
  const player = game.currentPlayer!;
  const playerState = game.playerStates[player.usedMarkShape];

  if (!playerState.rootCoordinate) {
    const placement = game.currentPlayer!.makeRootPlacement(coordinate, game.board);
    game = judge.handleRootPlacement(placement, game);
  }

  if (playerState.rootCoordinate) {
    const placement = game.currentPlayer!.makePlacement(coordinate, game.board);
    game = judge.handlePlacement(placement, game);
  }

  game = judge.endGameOrChangeCurrentPlayer(game);
}

Object.assign(window, { game });
console.log(Board.stringify(game.board));
