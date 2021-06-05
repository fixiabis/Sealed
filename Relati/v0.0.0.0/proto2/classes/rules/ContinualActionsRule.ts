import Board from '../../interfaces/Board';

class ContinualActionsRule {
  protected createNumberRecord(markShapes: string[]) {
    return markShapes.reduce(
      (variations, markShape) => ({
        ...variations,
        [markShape]: 0,
      }),
      {} as { [markShape: string]: number }
    );
  }

  protected countMissingNodes(board: Board, markShapes: string[]) {
    const missingNodeCount = this.createNumberRecord(markShapes);

    return board.marks.reduce(
      (missingNodeCount, marks) =>
        marks.reduce(
          (missingNodeCount, mark) =>
            mark && mark.type === 'missing-node'
              ? { ...missingNodeCount, [mark.shape]: missingNodeCount[mark.shape] + 1 }
              : missingNodeCount,
          missingNodeCount
        ),
      missingNodeCount
    );
  }

  protected getMissingNodeVariations(board: Board, prevBoard: Board, markShapes: string[]) {
    const missingNodeCount = this.countMissingNodes(board, markShapes);
    const prevMissingNodeCount = this.countMissingNodes(prevBoard, markShapes);

    return markShapes.reduce(
      (missingNodeVariations, markShape) => ({
        ...missingNodeVariations,
        [markShape]: missingNodeCount[markShape] - prevMissingNodeCount[markShape],
      }),
      this.createNumberRecord(markShapes)
    );
  }

  public getAdditionalActionsRemaining(
    board: Board,
    prevBoard: Board,
    markShapes: string[],
    playerMarkShape: string
  ) {
    const missingNodeVariations = this.getMissingNodeVariations(board, prevBoard, markShapes);

    const additionalActionRemaining = markShapes.reduce(
      (additionalActionRemaining, markShape) =>
        additionalActionRemaining +
        Number(
          playerMarkShape !== markShape
            ? missingNodeVariations[markShape] > 0
            : missingNodeVariations[markShape] < 0
        ),
      0
    );

    return additionalActionRemaining;
  }
}

export default ContinualActionsRule;
