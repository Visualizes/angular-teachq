import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AppService} from './app.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

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
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private readonly location: Location
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

  maskRoute() {
    const url = this.router.url.substring(1);
    // this.location.replaceState(url.substring(url.indexOf('/')));
  }

}
