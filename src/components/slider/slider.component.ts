import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import $ from 'jquery';
import 'slick-carousel';

@Component({
  selector: 'app-slider',
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent {
  slides = [
    {
      title: 'Birds gonna be Happy',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo,
                    lacus ut magna velit eleifend. Amet, quis urna, a eu.`,
      image: 'images/main-banner2.jpg',
    },
    {
      title: 'Cats gonna be Happy',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo,
                    lacus ut magna velit eleifend. Amet, quis urna, a eu.`,
      image: 'images/main-banner1.jpg',
    },
  ];

  ngAfterViewInit(): void {
    $('.main-slider').slick({
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
      arrows: true,
      prevArrow:
        '<button class="slick-prev" aria-label="Previous" type="button">&lt;</button>',
      nextArrow:
        '<button class="slick-next" aria-label="Next" type="button">&gt;</button>',
      fade: true,
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
    });
  }
}
