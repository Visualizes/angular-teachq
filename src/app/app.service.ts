import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public toolbarBack = new Subject();
  public toolbarDone = new Subject();
  public toolbarBackTriggered = new Subject();
  public toolbarDoneTriggered = new Subject();

  constructor() { }
}
