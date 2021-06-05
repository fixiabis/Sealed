import Mark from '../../interfaces/Mark';

class MarkRule {
  public checkEmpty(mark: Mark | null): mark is null {
    return mark === null;
  }

  public checkSameShape(mark: Mark, markShape: string): boolean {
    return mark.shape === markShape;
  }

  public checkIsProvider(mark: Mark): boolean {
    return mark.type === 'node' || mark.type === 'root';
  }

  public checkIsConsumer(mark: Mark): boolean {
    return mark.type === 'missing-node' || mark.type === 'node';
  }

  public handleProvide(mark: Mark | null): Mark | null {
    if (mark?.type === 'missing-node') {
      const type = 'node';
      return { ...mark, type };
    }

    return mark;
  }

  public handleConsume(mark: Mark | null): Mark | null {
    if (mark?.type === 'node') {
      const type = 'missing-node';
      return { ...mark, type };
    }

    return mark;
  }
}

export default MarkRule;
