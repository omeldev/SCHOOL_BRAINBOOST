import { Injectable } from '@angular/core';
import {RestService} from '../rest.service';
import {FlashcardBean} from '../../../bean/flashcard';

@Injectable({
  providedIn: 'root',
})
export class FlashcardService {

  constructor(private readonly restService: RestService) {

  }

  public createFlashcard$(flashcard: Partial<FlashcardBean>) {
    return this.restService.post$<FlashcardBean>('/flashcard/create/', flashcard);
  }

  public getFlashCardsByUserId$(userId: number) {
    return this.restService.get$<FlashcardBean[]>(`/user/${userId}/flashcards/`);
  }


}
