import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-main-title',
  templateUrl: './main-title.component.html',
  styleUrls: ['./main-title.component.scss']
})
export class MainTitleComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // console.log(this.activatedRoute.firstChild.snapshot.data);
          if (this.activatedRoute.firstChild.snapshot.data?.['mainTitle']) {
            this.title = this.activatedRoute.firstChild.snapshot.data?.['mainTitle']['title'];
            this.description = this.activatedRoute.firstChild.snapshot.data?.['mainTitle']['description'];
          } else {
            this.title = null;
            this.description = null;
          }
        }
      })
  }

}
