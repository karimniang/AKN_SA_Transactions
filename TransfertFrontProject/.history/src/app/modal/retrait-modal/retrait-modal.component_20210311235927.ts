import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-retrait-modal',
  templateUrl: './retrait-modal.component.html',
  styleUrls: ['./retrait-modal.component.scss']
})
export class RetraitModalComponent implements OnInit {

  constructor() { }

  succes;
  error;
  ngOnInit(): void {
  }
  @Input() type: string;
  @Input() data

}
