import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-stats',
  templateUrl: './card-stats.component.html',
  styleUrls: ['./card-stats.component.css']
})
export class CardStatsComponent implements OnInit {

  @Input()
  get statSubtitle(): string {
    return this._statSubtitle;
  }
  set statSubtitle(statSubtitle: string) {
    this._statSubtitle = statSubtitle ;
  }
  private _statSubtitle ;

  @Input()
  get statTitle(): string {
    return this._statTitle;
  }
  set statTitle(statTitle: string) {
    this._statTitle = statTitle ;
  }
  private _statTitle ;

  @Input()
  get statIconName(): string {
    return this._statIconName;
  }
  set statIconName(statIconName: string) {
    this._statIconName = statIconName;
  }
  private _statIconName ;

  @Input()
  get statIconColor(): string {
    return this._statIconColor;
  }
  set statIconColor(statIconColor: string) {
    this._statIconColor = statIconColor;
  }
  private _statIconColor ;

  constructor() {}

  ngOnInit(): void {}

}
