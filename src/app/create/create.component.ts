import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Content } from '../helper-files/content-interface';
import { ContentServiceService } from '../services/content-service.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @Output() addContentEvent = new EventEmitter<Content>();
  @Output() updateContentEvent = new EventEmitter<Content>();
  newContent: Content;
  constructor(private contentService: ContentServiceService, private messageService: MessageService, private dialog: MatDialog) {
    this.newContent = {
      author: '',
      title: '',
      body: ''
    };
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '400px',
      data: this.newContent,
    });

    dialogRef.afterClosed().subscribe(newContentFromDialog => {
      console.log('The dialog was closed');
      console.log("what's the id really?:", newContentFromDialog.id);
      if (isNaN(newContentFromDialog.id)) {
        this.addContentEvent.emit(newContentFromDialog);
      }
      else { // the id must have had a value in it
        this.updateContentEvent.emit(newContentFromDialog);
      }
      this.newContent = {
        author: '',
        title: '',
        body: ''
      };
    });
  }
}



@Component({
  selector: 'crete-dialog-component',
  templateUrl: 'create.dialog-component.html',
})
export class CreateDialogComponent {
  tempId: string;
  tempTags: string;

  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Content, private contentService: ContentServiceService, private messageService: MessageService
  ) { }

  addCoconut(): void {
    this.data.tags = this.tempTags.split(",");
    this.contentService.postContent(this.data).subscribe(newCoconut => {
      this.messageService.addMessage("Added content has an id of: " + newCoconut.id);
      this.data = {
        author: '',
        title: '',
        body: ''
      };
      this.tempTags = "";
    });
  }
  updateCoconut(): void {
    this.data.tags = this.tempTags.split(",");
    this.data.id = parseInt(this.tempId);
    this.dialogRef.close(this.data);

    this.contentService.postContent(this.data).subscribe(() => {
      this.messageService.addMessage("Updated content at id: " + this.data.id);
      this.tempTags = "";
      this.tempId = "";
      // this.updateContentEvent.emit(this.data);
      // this.data = {
      //   author: '',
      //   title: '',
      //   body: ''
      // };
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}