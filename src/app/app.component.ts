import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public showToolbarBack = false;
  public showToolbarDone = false;

  constructor(
    private appService: AppService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.appService.toolbarBack.asObservable().subscribe(value => {
      this.showToolbarBack = <boolean>value;
      this.cdr.detectChanges();
    });

    this.appService.toolbarDone.asObservable().subscribe(value => {
      this.showToolbarDone = <boolean>value;
      this.cdr.detectChanges();
    });
  }

  back() {
    this.appService.toolbarBackTriggered.next(true);
  }

  done() {
    this.appService.toolbarDoneTriggered.next(true);
  }

}
