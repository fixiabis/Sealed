import Board from '../../interfaces/Board';
import BoardBasedCheck from '../../interfaces/BoardBasedCheck';
import CannonAttack from '../../interfaces/CannonAttack';
import CoordinateChecker from '../checkers/CoordinateChecker';
import MarkRuleV2 from './MarkRuleV2';

class CannonAttackRule implements BoardBasedCheck<CannonAttack> {
  constructor(protected coordinateChecker: CoordinateChecker, protected markRule: MarkRuleV2) {}

  public checkValid(cannonAttack: CannonAttack, board: Board): boolean {
    const coordinate = cannonAttack.coordinate;
    const [x, y] = coordinate;
    const [dx, dy] = cannonAttack.direction;
    const isCoordinateValid = this.coordinateChecker.checkValid(coordinate, board);

    const isDirectionValid =
      (Math.abs(dx) === 1 && Math.abs(dy) === 0) || (Math.abs(dx) === 0 && Math.abs(dy) === 1);

    const isCoordinateCanAttack = () =>
      !this.markRule.checkEmpty(board.marks[x][y]) &&
      this.markRule.checkIsCannon(board.marks[x][y]!);

    return isCoordinateValid && isDirectionValid && isCoordinateCanAttack();
  }

  public checkAvailable(cannonAttack: CannonAttack, board: Board): boolean {
    const coordinate = cannonAttack.coordinate;
    const [dx, dy] = cannonAttack.direction;
    const [x, y] = coordinate;
    const markShape = board.marks[x][y]!.shape;
    let targetCoordinate: Coordinate = [x + dx, y + dy];

    while (this.coordinateChecker.checkValid(targetCoordinate, board)) {
      const [targetX, targetY] = targetCoordinate;
      const mark = board.marks[targetX][targetY];
      const isMarkCanThrough = this.markRule.checkCanThroughForCannon(mark, markShape);

      if (!isMarkCanThrough) {
        const isMarkCanBeCannonTarget =
          !this.markRule.checkEmpty(mark) && this.markRule.checkCanBeCannonTarget(mark, markShape);

        return isMarkCanBeCannonTarget;
      }

      targetCoordinate = [targetX + dx, targetY + dy];
    }

    return false;
  }

  public findTargetCoordinate(cannonAttack: CannonAttack, board: Board): Coordinate | null {
    const coordinate = cannonAttack.coordinate;
    const [dx, dy] = cannonAttack.direction;
    const [x, y] = coordinate;
    const markShape = board.marks[x][y]!.shape;
    let targetCoordinate: Coordinate = [x + dx, y + dy];

    while (this.coordinateChecker.checkValid(targetCoordinate, board)) {
      const [targetX, targetY] = targetCoordinate;
      const mark = board.marks[targetX][targetY];
      const isMarkCanThrough = this.markRule.checkCanThroughForCannon(mark, markShape);

      if (!isMarkCanThrough) {
        const isMarkCanBeCannonTarget =
          !this.markRule.checkEmpty(mark) && this.markRule.checkCanBeCannonTarget(mark, markShape);

        return isMarkCanBeCannonTarget ? targetCoordinate : null;
      }

      targetCoordinate = [targetX + dx, targetY + dy];
    }

    return null;
  }
}

export default CannonAttackRule;
