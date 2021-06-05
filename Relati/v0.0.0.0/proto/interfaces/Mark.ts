import { MarkType } from '../types/Mark';

interface Mark {
  readonly shape: string;
  readonly type: MarkType;
  readonly shellsUsed: number;
}

export default Mark;
