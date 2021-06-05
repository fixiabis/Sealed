import Board from './Board';
import Action from './Action';

interface ActionRule<TAction extends Action = Action> {
  checkValid(action: TAction): boolean;
  checkAvailable(action: TAction): boolean;
  handleAction(action: TAction): Board;
}

export default ActionRule;
