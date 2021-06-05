import Mark from '../../shared/interfaces/Mark';

class MarkRule {
  public checkEmpty(mark: Mark | null): mark is null {
    return mark === null;
  }

  public checkSameShape(mark: Mark, markShape: string): boolean {
    return mark.shape === markShape;
  }
}

export default MarkRule;
