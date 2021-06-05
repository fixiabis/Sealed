import Action from '../../shared/interfaces/Action';

interface Link extends Action {
  targetCoordinate: Coordinate;
}

export default Link;
