import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './menu/menu';
import { Hero } from './hero/hero';
import { Homepage } from './homepage/homepage';
import { Footer } from './footer/footer';
import { Article } from './article/article';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pb-root',
  imports: [RouterOutlet, Menu, Hero, Homepage, Footer, Article],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('personal-budget');
}
