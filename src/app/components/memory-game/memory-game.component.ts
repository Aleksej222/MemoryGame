import { ThrowStmt } from '@angular/compiler';
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

  twoImages: Array<Card> = [];
  counter: number = 0;
  guessedCards: number = 0;
  lives: number = 8;
  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < this.paths.length; i++) {
      let card = new Card();
      card.imgPath = this.paths[i];
      card.id = i;
      this.firstImages.push(card);
    }

    for (let i = 0; i < this.firstImages.length; i++) {
      this.allImages.push({...this.firstImages[i]});
      this.allImages.push({...this.firstImages[i]});
    }
    this.allImages = this.shuffle(this.allImages);
    console.log(this.allImages)
  }

  pickCard(card: Card) {
   
      if(this.twoImages.length <2 && this.lives > 0) {
        card.isRevealed = !card.isRevealed;   
        this.twoImages.push(card);
    
        if (this.twoImages.length == 2) {
          setTimeout(() => {
          this.twoImages.forEach(img => {
              img.isRevealed = false;
          })
          if(this.allImages.indexOf(this.twoImages[0]) != this.allImages.indexOf(this.twoImages[1]) && this.twoImages[0].id == this.twoImages[1].id) {  
            this.twoImages[0].isGuessed = true;
            this.twoImages[1].isGuessed = true;
            
            this.guessedCards += 2;
            console.log(this.guessedCards);
  
            if (this.guessedCards == this.allImages.length)
            {
              alert("you won");
            }
          }
          else {
            this.lives--;
            if (this.lives == 0)
            {
              alert("you lost");
            }
          }
          if(this.allImages.indexOf(this.twoImages[0]) != this.allImages.indexOf(this.twoImages[1])) {
            this.counter++;
          }
          this.twoImages = [];
          },500)
        }
      }
    
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