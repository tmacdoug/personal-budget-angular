import { Component, Input } from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'pb-article',
  imports: [],
  templateUrl: './article.html',
  styleUrl: './article.scss'
})
export class Article {
  @Input() title = 'Title';
  @Input() content = 'Content'
}
