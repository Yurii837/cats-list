import { State, Action, StateContext } from '@ngxs/store';
import { Breed, CatItem } from '../Types/cats-list.interface';
import { Cats } from './actions';

export interface StateModel {
  cats: CatItem[],
  breeds: Breed[]
}

@State<StateModel>({
  name: 'myState',
  defaults: {
    cats: [],
    breeds: []
  },
})
export class CatsState {
  @Action(Cats)
  receiveData(ctx: StateContext<StateModel>, action: Cats) {
    const state = ctx.getState();
    ctx.setState({ ...state, cats: action.cats });
  }
}