import {Component, ViewChild, OnInit} from '@angular/core';
import {NgbCarousel, NgbSlideEvent, NgbSlideEventSource} from '@ng-bootstrap/ng-bootstrap';
import {CarouselService} from "./services/carousel.service";
import {ExchangeRate} from "../models/exchangeRate";


@Component({selector: 'app-carousel-component', templateUrl: './carousel.component.html'})

export class CarouselComponent implements OnInit {

  constructor(private carouselService: CarouselService) {
  }

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @ViewChild('carousel', {static: true}) carousel: NgbCarousel;

  currencyList: ExchangeRate[];

  ngOnInit() {
    this.carouselService.refreshRate();
    this.currencyList = this.carouselService.getExchangeList();
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
}
