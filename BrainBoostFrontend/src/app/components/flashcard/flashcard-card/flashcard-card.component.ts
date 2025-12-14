import {Component, input} from '@angular/core';
import {FlashcardBean} from '../../../bean/flashcard';
import {BehaviorSubject, firstValueFrom} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-flashcard-card',
  imports: [
    AsyncPipe
  ],
  templateUrl: './flashcard-card.component.html',
  styleUrl: './flashcard-card.component.scss'
})
export class FlashcardCardComponent {

  public flashCard = input.required<FlashcardBean>();

  private readonly revealedSubject$ = new BehaviorSubject(false);
  public readonly revealed$ = this.revealedSubject$.asObservable();

  public async toggleReveal() {
    const current = await firstValueFrom(this.revealed$);
    this.revealedSubject$.next(!current);
  }

}
