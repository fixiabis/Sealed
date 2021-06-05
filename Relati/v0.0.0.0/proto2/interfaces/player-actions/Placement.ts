import Mark from '../Mark';
import Action from './Action';

interface Placement extends Action {
  readonly mark: Mark;
}

export default Placement;
