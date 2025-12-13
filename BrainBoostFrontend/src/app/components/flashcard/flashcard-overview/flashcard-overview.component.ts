import {Component, inject} from '@angular/core';
import {FlashcardService} from '../../../service/rest/flashcard/flashcard.service';
import {filter, firstValueFrom, switchMap} from 'rxjs';
import {Store} from '@ngxs/store';
import {UserState} from '../../../store/user/user.state';
import {AsyncPipe} from '@angular/common';
import {FlashcardCardComponent} from '../flashcard-card/flashcard-card.component';
import {UserBean} from '../../../bean/user';

@Component({
  selector: 'app-flashcard-overview',
  imports: [
    AsyncPipe,
    FlashcardCardComponent
  ],
  templateUrl: './flashcard-overview.component.html',
  styleUrl: './flashcard-overview.component.scss'
})
export class FlashcardOverviewComponent {

  private readonly store = inject(Store);
  private readonly flashCardService = inject(FlashcardService);

  public readonly flashCards$ = this.store
    .select(UserState.getUser)
    .pipe(
      filter((user): user is UserBean => !!user),
      switchMap(user =>
        this.flashCardService.getFlashCardsByUserId$(user.id)
      )
    );

}
