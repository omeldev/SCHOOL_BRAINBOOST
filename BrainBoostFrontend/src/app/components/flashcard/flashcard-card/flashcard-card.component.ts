import {Component, input} from '@angular/core';
import {FlashcardBean} from '../../../bean/flashcard';

@Component({
  selector: 'app-flashcard-card',
  imports: [],
  templateUrl: './flashcard-card.component.html',
  styleUrl: './flashcard-card.component.scss'
})
export class FlashcardCardComponent {

  public flashCard = input.required<FlashcardBean>();

}
