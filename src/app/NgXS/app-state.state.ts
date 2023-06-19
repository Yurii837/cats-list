import { State, Action, StateContext } from '@ngxs/store';
import { StateModel } from '../Types/cats-list.interface';
import { Breeds, Cats } from './actions';

@State<StateModel>({
  name: 'catsState',
  defaults: {
    cats: [],
    breeds: []
  },
})

export class CatsState {
  @Action(Cats)
  receiveCats(ctx: StateContext<StateModel>, action: Cats) {
    const state = ctx.getState();
    ctx.setState({ ...state, cats: action.cats });
  }

  @Action(Breeds)
  receiveBreeds(ctx: StateContext<StateModel>, action: Breeds) {
    const state = ctx.getState();
    ctx.setState({ ...state, breeds: action.breeds });
  }
}