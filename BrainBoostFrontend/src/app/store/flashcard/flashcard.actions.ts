import {UserBean} from '../../bean/user';
import {FlashcardBean} from '../../bean/flashcard';

export namespace FlashCardAction {

  const PREFIX = '[Flashcard]';

  export class SetActiveFlashcards {
    static readonly type = `${PREFIX} Set flashcards`;

    constructor(readonly flashcards: FlashcardBean[]) {

    }
  }

}
