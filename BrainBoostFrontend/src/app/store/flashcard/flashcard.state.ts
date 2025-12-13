import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {FlashCardAction} from './flashcard.actions';
import {FlashcardBean} from '../../bean/flashcard';

export interface FlashCardModel {
  flashcards: FlashcardBean[] | null;
}

const DEFAULTS: FlashCardModel = {
  flashcards: null
}

const FLASHCARD_TOKEN = new StateToken<FlashCardModel>('flashcard');

@State<FlashCardModel>({
  name: FLASHCARD_TOKEN,
  defaults: DEFAULTS
})
@Injectable()
export class FlashcardState {

  constructor() {
  }

  @Selector()
  static getActiveFlashcards(state: FlashCardModel) {
    return state.flashcards;
  }

  @Action(FlashCardAction.SetActiveFlashcards)
  setUser(ctx: StateContext<FlashCardModel>, action: FlashCardAction.SetActiveFlashcards) {
    ctx.setState({
      flashcards: action.flashcards,
    });
  }

}
