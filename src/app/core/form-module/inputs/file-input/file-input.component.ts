import { Component, OnInit } from '@angular/core';
import { InputService } from '../../services/input.service';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {

  constructor(public inputService: InputService) { }

  ngOnInit(): void {
  }

}
