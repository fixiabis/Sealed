import Action from './Action';

interface CannonAttack extends Action {
  readonly direction: Coordinate;
}

export default CannonAttack;
