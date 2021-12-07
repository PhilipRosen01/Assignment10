import { Component, Input, OnInit } from '@angular/core';
import { Content } from '../helper-files/content-interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss']
})
export class ContentCardComponent implements OnInit {
  @Input() song: any;
  constructor() {
    this.song = {};
  }

  ngOnInit(): void {
  }
  showId(): void {
    console.log(this.song.id);
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.song.tags, event.previousIndex, event.currentIndex);
  }
}
