import Board from './interfaces/Board';
import Judge from './classes/judges/JudgeV4';
import Player from './classes/Player';
import LinkRule from './classes/rules/LinkRuleV3';
import CoordinateChecker from './classes/checkers/CoordinateChecker';
import MarkRule from './classes/rules/MarkRuleV2';
import PathRule from './classes/rules/PathRuleV2';
import PlacementRule from './classes/rules/PlacementRuleV2';
import ContinualActionRule from './classes/rules/ContinualActionRule';
import CannonChangeRule from './classes/rules/CannonChangeRule';
import CannonAttackRule from './classes/rules/CannonAttackRule';
import RootMovementRule from './classes/rules/RootMovementRule';

const coordinateChecker = new CoordinateChecker();
const markRule = new MarkRule();
const pathRule = new PathRule(coordinateChecker, markRule);
const linkRule = new LinkRule(coordinateChecker, markRule, pathRule);
const placementRule = new PlacementRule(coordinateChecker, linkRule, markRule);
const continualActionRule = new ContinualActionRule();
const cannonChangeRule = new CannonChangeRule(coordinateChecker, markRule);
const cannonAttackRule = new CannonAttackRule(coordinateChecker, markRule);
const rootMovementRule = new RootMovementRule(coordinateChecker, markRule, linkRule);
const players = [new Player('O'), new Player('X')];
const board = Board.create(9, 9);

const judge = new Judge(
  placementRule,
  linkRule,
  continualActionRule,
  cannonChangeRule,
  cannonAttackRule,
  rootMovementRule,
  markRule
);

let game = judge.startGame(players, board);

let coordinates: Coordinate[] = [
  [4, 4],
  [6, 7],
  [4, 6],
  [4, 5],
  [5, 7],
  [5, 6],
  // [6, 6],
];

for (const coordinate of coordinates) {
  const player = game.currentPlayer!;
  const playerState = game.playerStates[player.usedMarkShape];

  if (!playerState.rootCoordinate) {
    const placement = game.currentPlayer!.makeFirstPlacement(coordinate, game.board);
    game = judge.handleFirstPlacement(placement, game);
  }

  if (playerState.rootCoordinate) {
    const placement = game.currentPlayer!.makePlacement(coordinate, game.board);
    game = judge.handlePlacement(placement, game);
  }

  game = judge.endGameOrChangeCurrentPlayer(game);
}

{
  const cannonChange = game.currentPlayer!.makeCannonChange([5, 6], game.board);
  game = judge.handleCannonChange(cannonChange, game);
  game = judge.endGameOrChangeCurrentPlayer(game);
}

{
  const cannonAttack = game.currentPlayer!.makeCannonAttack([5, 6], [0, 1], game.board);
  game = judge.handleCannonAttack(cannonAttack, game);
  game = judge.endGameOrChangeCurrentPlayer(game);
}

coordinates = [
  [6, 5],
  [5, 5],
  [3, 5],
];

for (const coordinate of coordinates) {
  const placement = game.currentPlayer!.makePlacement(coordinate, game.board);
  game = judge.handlePlacement(placement, game);
  game = judge.endGameOrChangeCurrentPlayer(game);
}

{
  const cannonChange = game.currentPlayer!.makeCannonChange([3, 5], game.board);
  game = judge.handleCannonChange(cannonChange, game);
  game = judge.endGameOrChangeCurrentPlayer(game);
}

{
  const cannonChange = game.currentPlayer!.makeCannonChange([4, 5], game.board);
  game = judge.handleCannonChange(cannonChange, game);
  game = judge.endGameOrChangeCurrentPlayer(game);
}

{
  const cannonAttack = game.currentPlayer!.makeCannonAttack([3, 5], [1, 0], game.board);
  game = judge.handleCannonAttack(cannonAttack, game);
  game = judge.endGameOrChangeCurrentPlayer(game);
}

coordinates = [
  [2, 4],
  [5, 4],
];

for (const coordinate of coordinates) {
  const placement = game.currentPlayer!.makePlacement(coordinate, game.board);
  game = judge.handlePlacement(placement, game);
  game = judge.endGameOrChangeCurrentPlayer(game);
}

{
  const cannonChange = game.currentPlayer!.makeCannonChange([2, 4], game.board);
  game = judge.handleCannonChange(cannonChange, game);
  game = judge.endGameOrChangeCurrentPlayer(game);
}

{
  const cannonChange = game.currentPlayer!.makeCannonChange([5, 4], game.board);
  game = judge.handleCannonChange(cannonChange, game);
  game = judge.endGameOrChangeCurrentPlayer(game);
}

{
  const cannonAttack = game.currentPlayer!.makeCannonAttack([2, 4], [1, 0], game.board);
  game = judge.handleCannonAttack(cannonAttack, game);
  game = judge.endGameOrChangeCurrentPlayer(game);
}

coordinates = [
  [6, 4],
  [4, 3],
];

for (const coordinate of coordinates) {
  const placement = game.currentPlayer!.makePlacement(coordinate, game.board);
  game = judge.handlePlacement(placement, game);
  game = judge.endGameOrChangeCurrentPlayer(game);
}

{
  const cannonChange = game.currentPlayer!.makeCannonChange([6, 4], game.board);
  game = judge.handleCannonChange(cannonChange, game);
  game = judge.endGameOrChangeCurrentPlayer(game);
}

{
  const rootMovement = game.currentPlayer!.makeRootMovement([4, 3], game.board);
  game = judge.handleRootMovement(rootMovement, game);
  game = judge.endGameOrChangeCurrentPlayer(game);
}

coordinates = [
  [5, 3],
  [3, 4],
  [2, 5],
];

for (const coordinate of coordinates) {
  const placement = game.currentPlayer!.makePlacement(coordinate, game.board);
  game = judge.handlePlacement(placement, game);
  game = judge.endGameOrChangeCurrentPlayer(game);
}

{
  const cannonChange = game.currentPlayer!.makeCannonChange([5, 3], game.board);
  game = judge.handleCannonChange(cannonChange, game);
  game = judge.endGameOrChangeCurrentPlayer(game);
}

{
  const rootMovement = game.currentPlayer!.makeRootMovement([3, 4], game.board);
  game = judge.handleRootMovement(rootMovement, game);
  game = judge.endGameOrChangeCurrentPlayer(game);
}

{
  const cannonAttack = game.currentPlayer!.makeCannonAttack([6, 4], [-1, 0], game.board);
  game = judge.handleCannonAttack(cannonAttack, game);
  game = judge.endGameOrChangeCurrentPlayer(game);
}

Object.assign(globalThis, { game });
console.log(Board.stringify(game.board));
