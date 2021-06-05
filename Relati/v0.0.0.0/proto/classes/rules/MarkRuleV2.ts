import Mark from '../../interfaces/Mark';
import MarkRule from './MarkRule';

class MarkRuleV2 extends MarkRule {
  public checkIsConsumer(mark: Mark): boolean {
    return (
      super.checkIsConsumer(mark) ||
      mark.type === 'cannon-node' ||
      mark.type === 'exhausted-cannon-node'
    );
  }

  public handleConsume(mark: Mark | null): Mark | null {
    if (mark?.type === 'cannon-node' || mark?.type === 'exhausted-cannon-node') {
      const type = 'dead-cannon-node';
      return { ...mark, type };
    }

    return super.handleConsume(mark);
  }

  public checkIsCannon(mark: Mark) {
    return mark.type === 'cannon-node';
  }

  public checkCanBeCannon(mark: Mark) {
    return mark.type === 'node';
  }

  public checkCanBeCannonTarget(mark: Mark, markShape: string) {
    return (
      mark.shape !== markShape &&
      (mark.type === 'root' ||
        mark.type === 'node' ||
        mark.type === 'missing-node' ||
        mark.type === 'cannon-node' ||
        mark.type === 'exhausted-cannon-node')
    );
  }

  public checkCanBeRoot(mark: Mark) {
    return mark.type === 'node';
  }

  public checkCanThrough(mark: Mark | null): boolean {
    return (
      mark === null ||
      mark.type === 'dead-node' ||
      mark.type === 'dead-root' ||
      mark.type === 'dead-cannon-node'
    );
  }

  public checkCanThroughForCannon(mark: Mark | null, markShape: string): boolean {
    return (
      this.checkCanThrough(mark) ||
      (mark?.shape === markShape &&
        mark.type !== 'cannon-node' &&
        mark.type !== 'exhausted-cannon-node')
    );
  }

  public handleCannonAttack(mark: Mark, markShape: string): Mark {
    if (mark.shape === markShape) {
      return mark;
    }

    if (mark.type === 'root') {
      return { ...mark, type: 'dead-root' };
    }

    if (mark.type === 'cannon-node' || mark.type === 'exhausted-cannon-node') {
      return { ...mark, type: 'dead-cannon-node' };
    }

    return { ...mark, type: 'dead-node' };
  }
}

export default MarkRuleV2;
