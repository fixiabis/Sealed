import Board from './Board';

interface BoardBasedCheck<T> {
  checkValid(subject: T, board: Board): boolean;
}

export default BoardBasedCheck;
