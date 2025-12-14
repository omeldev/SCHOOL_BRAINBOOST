import {Component, inject} from '@angular/core';
import {Store} from '@ngxs/store';
import {FlashcardService} from '../../../service/rest/flashcard/flashcard.service';
import {UserState} from '../../../store/user/user.state';
import {filter, firstValueFrom, switchMap} from 'rxjs';
import {UserBean} from '../../../bean/user';
import {FlashcardCardComponent} from '../flashcard-card/flashcard-card.component';
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-flashcard-learn',
  imports: [
    FlashcardCardComponent,
    AsyncPipe
  ],
  templateUrl: './flashcard-learn.component.html',
  styleUrl: './flashcard-learn.component.scss'
})
export class FlashcardLearnComponent {


  private readonly store = inject(Store);
  private readonly flashCardService = inject(FlashcardService);
  private readonly route = inject(ActivatedRoute);

  protected activeFlashCardIndex = 0;

  public readonly flashCards$ = this.store
    .select(UserState.getUser)
    .pipe(
      filter((user): user is UserBean => !!user || !!this.route.snapshot.queryParamMap.get('userId')),
      switchMap(user => {
          if (this.route.snapshot.queryParamMap.get('userId')) {
            return this.flashCardService.getFlashCardsByUserId$(Number(this.route.snapshot.queryParamMap.get('userId')))
          }
          return this.flashCardService.getFlashCardsByUserId$(user.id);
        }
      )
    );

  async previousFlashCard() {
    const flashCards = await firstValueFrom(this.flashCards$);
    if(!flashCards || flashCards.length === 0) {
      return;
    }
    if(this.activeFlashCardIndex > 0 && this.activeFlashCardIndex <= flashCards.length -1) {
      this.activeFlashCardIndex--;
    }
  }

  async nextFlashCard() {
    const flashCards = await firstValueFrom(this.flashCards$);
    if(!flashCards || flashCards.length === 0) {
      return;
    }
    if(this.activeFlashCardIndex >= 0 && this.activeFlashCardIndex < flashCards.length -1) {
      this.activeFlashCardIndex++;
    }
  }


}
