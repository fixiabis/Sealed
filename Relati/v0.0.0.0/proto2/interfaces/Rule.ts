import Board from './Board';
import Action from './player-actions/Action';

interface Rule<TAction extends Action> {
  checkValid(action: TAction): boolean;
  handleAction?(action: TAction): Board;
}

export default Rule;
