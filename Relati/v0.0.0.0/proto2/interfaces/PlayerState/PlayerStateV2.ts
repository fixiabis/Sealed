import PlayerStateV1 from './PlayerStateV1';

interface PlayerStateV2 extends PlayerStateV1 {
  actionsRemaining: number;
}

export default PlayerStateV2;
