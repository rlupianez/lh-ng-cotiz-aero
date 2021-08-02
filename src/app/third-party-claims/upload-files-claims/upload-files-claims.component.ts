import { Component, OnInit, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-claims-upload-file',
  templateUrl: './upload-files-claims.component.html',
  styleUrls: ['./upload-files-claims.component.scss']
})
export class UploadFilesClaimsComponent implements OnInit {
  @Input() list: any;
  @Input() size: number;
  @Input() accept: string;
  @Input() count: number

  constructor() { }

  onFileSelected(event: any, files: any) {

    const file: File = event.target.files[0];

    //validate extensions
    var extensions = this.accept;
    var regex = new RegExp(extensions, 'gi');
    //file.name.match(regex);
    if (!regex.test(file.name)) { return; }

    //validate size
    var mega = (file.size / 1024) / 1024;
    if (mega > this.size) { return; }

    //validate count
    if (files.length >= this.count) { return; }

    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const item = {
        name: file.name,
        content: event.target.result
      }
      files.push(item);
      console.log(event);
    };

    reader.onerror = (event) => {
      console.log(event);
    };

    reader.onabort = (event) => {
      console.log(event);
    }

    reader.onloadstart = (event) => {
      console.log(event);
    }

  }


  ngOnInit(): void {
  }

  onElement(files, index) {
    files.splice(index, 1);
  }


}
