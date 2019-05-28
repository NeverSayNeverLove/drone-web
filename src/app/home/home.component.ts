import { Component, OnInit } from '@angular/core';
import { IImage } from 'ng-simple-slideshow/src/app/modules/slideshow/IImage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imageUrls: (string | IImage)[] = [
    { url: '../../assets/images/slide_13.jpg', caption: 'Drone Calendar', href: 'user-calendar' },
    { url: '../../assets/images/slide_9.jpg', caption: 'Drone Calendar', href: 'user-calendar' },
    { url: '../../assets/images/drone_4.jpg', caption: 'Drone Calendar', href: 'user-calendar' },
    { url: '../../assets/images/slide_16.jpg', caption: 'Drone Calendar', href: 'user-calendar' },
    { url: '../../assets/images/slide_15.jpg', caption: 'Drone Calendar', href: 'user-calendar' },
  ];
  height: string = '400px';
  minHeight: string;
  arrowSize: string = '30px';
  showArrows: boolean = true;
  disableSwiping: boolean = false;
  autoPlay: boolean = true;
  autoPlayInterval: number = 3333;
  stopAutoPlayOnSlide: boolean = true;
  debug: boolean = false;
  backgroundSize: string = 'cover';
  backgroundPosition: string = 'center center';
  backgroundRepeat: string = 'no-repeat';
  showDots: boolean = true;
  dotColor: string = '#FFF';
  showCaptions: boolean = true;
  captionColor: string = '#FFF';
  captionBackground: string = 'rgba(0, 0, 0, .35)';
  lazyLoad: boolean = false;
  hideOnNoSlides: boolean = false;
  width: string = '100%';
  fullscreen: boolean = false;
  
  constructor() {}

  ngOnInit() {}

}
