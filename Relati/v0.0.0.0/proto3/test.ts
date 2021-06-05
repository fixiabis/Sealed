import Board from './shared/interfaces/Board';
import Judge from './v2/Judge';
import Player from './v1/Player';
import LinkRule from './v2/rules/LinkRule';
import MarkRule from './v2/rules/MarkRule';
import PlacementRule from './v2/rules/PlacementRule';

const players = ['O', 'X'].map((shape) => new Player(shape));
const board = Board.create(9, 9);
const markRule = new MarkRule();
const linkRule = new LinkRule(markRule);
const placementRule = new PlacementRule(linkRule);
const judge = new Judge(placementRule, linkRule);

let game = judge.startGame(players, board);

let coordinates: Coordinate[] = [
  [0, 0],
  [1, 0],
  [2, 1],
  [1, 1],
  [0, 2],
  [0, 1],
];

for (const coordinate of coordinates) {
  const player = game.currentPlayer!;
  const rootCoordinate = game.state.playerRootCoordinates[player.usedMarkShape];

  if (!rootCoordinate) {
    const placement = game.currentPlayer!.makeRootPlacement(coordinate, game.board);
    game = judge.handleAction(placement, game);
  }

  if (rootCoordinate) {
    const placement = game.currentPlayer!.makePlacement(coordinate, game.board);
    game = judge.handleAction(placement, game);
  }
}

Object.assign(window, { game });
