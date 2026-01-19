import {Component, inject, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {FlashcardService} from '../../../service/rest/flashcard/flashcard.service';
import {Store} from '@ngxs/store';
import {UserState} from '../../../store/user/user.state';
import {FlashcardBean} from '../../../bean/flashcard';
import {Router} from '@angular/router';
import {form, FormField} from '@angular/forms/signals';

interface FlashCardCreateFormData {
  title: string;
  question: string;
  answer: string;
}

@Component({
  selector: 'app-flashcard-create',
  imports: [
    FormField
  ],
  templateUrl: './flashcard-create.component.html',
  styleUrl: './flashcard-create.component.scss'
})
export class FlashcardCreateComponent {

  private readonly flashCardCreateFormModel = signal<FlashCardCreateFormData>({
    title: '',
    question: '',
    answer: ''
  });

  public flashCardCreateForm = form(this.flashCardCreateFormModel);

  private readonly user$ = inject(Store).select(UserState.getUser);


  constructor(private readonly flashCardService: FlashcardService,
              private readonly router: Router) {
  }


  public async createFlashCard$() {
    const user = await firstValueFrom(this.user$);
    if(!user) {
      throw new Error("User not logged in");
    }

    const flashCardBean: Partial<FlashcardBean> = {
      title: this.flashCardCreateFormModel().title,
      question: this.flashCardCreateFormModel().question,
      answer: this.flashCardCreateFormModel().answer,
      userId: user.id
    }

    return firstValueFrom(this.flashCardService.createFlashcard$(flashCardBean)).then(() => {
      this.router.navigateByUrl(this.router.createUrlTree(['/flashcard/overview']));
    });
  }
}
