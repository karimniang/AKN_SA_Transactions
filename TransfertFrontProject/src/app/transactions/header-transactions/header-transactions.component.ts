import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-transactions',
  templateUrl: './header-transactions.component.html',
  styleUrls: ['./header-transactions.component.scss']
})
export class HeaderTransactionsComponent implements OnInit {

  constructor() { }

  @Input()
  name:string;
  @Input()
  icon:string
  ngOnInit(): void {
  }

}
