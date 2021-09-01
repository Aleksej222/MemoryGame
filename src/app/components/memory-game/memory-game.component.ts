import { Component, OnInit } from '@angular/core';
import Card from 'src/app/models/card';

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.css']
})
export class MemoryGameComponent implements OnInit {
  backgroundCards = Array(12);


  firstImages: Array<Card> = [];
  paths: Array<string> = ["/assets/images/discord.png", "/assets/images/apple.png", "/assets/images/skype.png", "/assets/images/twitter.png", "/assets/images/instagram.png", "/assets/images/facebook.png"]
  allImages: Array<Card> = [];
  constructor() { }

  ngOnInit(): void {
    console.log(this.paths)

    for (let i = 0; i < this.paths.length; i++) {
      let card = new Card();
      card.imgPath = this.paths[i];
      card.id = i;
      this.firstImages.push(card);
      console.log(this.firstImages)
    }

    for (let i = 0; i < this.firstImages.length; i++) {
      this.allImages.push({...this.firstImages[i]});
      this.allImages.push({...this.firstImages[i]});
    }
    this.allImages = this.shuffle(this.allImages);
    console.log(this.allImages)
  }

  pickCard(card: Card) {
    console.log(card.imgPath);
    card.isRevealed = true;
  }
  shuffle(array: any) {
    var currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
}
