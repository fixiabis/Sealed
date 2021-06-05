export type MarkType =
  | 'root' // -> dead-root
  | 'node' // -> missing-node, cannon-node, dead-node, root
  | 'missing-node' // -> node, dead-node
  | 'cannon-node' // -> exhausted-cannon-node, dead-cannon-node
  | 'exhausted-cannon-node' // -> dead-cannon-node
  | 'dead-root'
  | 'dead-node'
  | 'dead-cannon-node';
