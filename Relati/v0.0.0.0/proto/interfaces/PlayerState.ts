interface PlayerState {
  readonly rootCoordinate: Coordinate | null;
  readonly actionRemaining: number;
  readonly isCannonAttacking: boolean;
}

class PlayerState {
  static update(partialState: Partial<PlayerState>, state: PlayerState) {
    return { ...state, ...partialState };
  }
}

export default PlayerState;
