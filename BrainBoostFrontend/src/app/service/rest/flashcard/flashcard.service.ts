import { Injectable } from '@angular/core';
import {RestService} from '../rest.service';

@Injectable({
  providedIn: 'root',
})
export class FlashcardService {

  constructor(private readonly restService: RestService) {

  }


}
