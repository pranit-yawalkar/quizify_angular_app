import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  slides: any = [
    { image: '../../../assets/images/carousel/c1.jpg', title: 'Quizify', desc: 'A platform to test yourself.' },

    { image: '../../../assets/images/carousel/c2.jpg', title: 'Quizify', desc: 'A platform to test yourself.' },
    { image: '../../../assets/images/carousel/c3.jpg', title: 'Quizify', desc: 'A platform to test yourself.' },
    { image: '../../../assets/images/carousel/c4.jpg', title: 'Quizify', desc: 'A platform to test yourself.' },
  ]

  constructor() { }

  ngOnInit(): void {

  }


}






