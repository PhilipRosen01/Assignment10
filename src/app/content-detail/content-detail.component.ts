import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentServiceService } from '../services/content-service.service';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements OnInit {
  @Input() song: any;
  id: number;
  constructor(private route: ActivatedRoute, private contentService: ContentServiceService) {
    this.song = {};
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id');
      this.contentService.getContentItem(this.id).subscribe(c => {
        this.song = c;
        console.log(this.song);
      });
    });

  }
  showId(): void {
    console.log(this.song.id);
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.song.tags, event.previousIndex, event.currentIndex);
  }
}
