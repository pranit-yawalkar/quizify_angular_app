import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  slides: any = [
    { image: 'https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg' },

    { image: 'https://static-cse.canva.com/blob/572626/1.magebyRodionKutsaevviaUnsplash.jpg' }
  ]

  constructor() { }

  ngOnInit(): void {
  }


}
