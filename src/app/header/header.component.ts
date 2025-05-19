import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'hotelinv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor() { }
  title: string = 'HEADER : Hotel Inventory';

  @ViewChild('name') nameDiv!: ElementRef; // Access the template reference variable
  ngOnInit(): void {}

  getDivContent(): void {
    let divContent = this.nameDiv.nativeElement.innerText; // Access the inner text of the div
    console.log('Div Content:', divContent);
    alert(`Div Content: ${divContent}`); // Display the content in an alert
  }

  setDivContent(): void {
    this.nameDiv.nativeElement.innerText = 'New Content set by template reference variable'; // Set new content to the div
  }

  clearDivContent(): void {
    this.nameDiv.nativeElement.innerText = '';
  }

}
