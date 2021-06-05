import Mark from '../../shared/interfaces/Mark';
import Action from '../../shared/interfaces/Action';

interface Placement extends Action {
  readonly mark: Mark;
}

export default Placement;
