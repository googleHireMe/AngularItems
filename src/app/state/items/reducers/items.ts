import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  ADD_POWER_SUCCESS, DELETE_POWER_SUCCESS, LOAD_POWER_SUCCESS, LOAD_POWERS_SUCCESS, PowersAction, SELECT_POWER,
  UPDATE_POWER_SUCCESS
} from '../actions/items';
import { Item } from 'src/app/items/models/item';

export interface State extends EntityState<Item> {
  selectedPowerId: number;
}

export const adapter: EntityAdapter<Item> = createEntityAdapter();

const initialState: State = adapter.getInitialState({
  selectedPowerId: null
});

export function reducer(state: State = initialState, action: PowersAction) {
  switch (action.type) {
    case ADD_POWER_SUCCESS:
      return adapter.addOne(action.payload, state);
    case DELETE_POWER_SUCCESS:
      return adapter.removeOne(action.payload.id, state);
    case LOAD_POWER_SUCCESS:
      return adapter.addOne(action.payload, state);
    case LOAD_POWERS_SUCCESS:
      return adapter.addMany(action.payload, state);
    case SELECT_POWER:
      return { ...state, selectedPowerId: action.payload.id };
    case UPDATE_POWER_SUCCESS:
      return adapter.updateOne({
        id: action.payload.id,
        changes: action.payload
      }, state);
    default:
      return state;
  }
}

export const getSelectedPowerId = (state: State) => state.selectedPowerId;