import { Component, computed, effect, OnInit, signal, viewChildren } from '@angular/core';
import { IBalloon } from './balloon.interface';
import { Balloon } from './balloon.class';
import { BalloonComponent } from './components/balloon/balloon.component';
import { max } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'balloon-pop';
  balloonsonScreen = 10;
  balloons: IBalloon[] = [];
  missed = signal(0);
  maxMissed = 10;
  score = 0;
  balloonElements = viewChildren(BalloonComponent);

  createBalloonsOnDemand = effect(() => {
    if (
      !this.gameOver() &&
      this.balloonElements().length < this.balloonsonScreen
    ) {
      this.balloons = [...this.balloons, new Balloon()];
    }
  }
  );

  gameOver = computed(() => {
    return this.missed() === this.maxMissed;
  })

  ngOnInit() {
    this.startGame();

  }

  startGame() {
    this.balloons = new Array(this.balloonsonScreen).fill(null).map(() => new Balloon());
    this.missed.update(() => 0);
    this.score = 0;
  }

  handleBalloonPop($event: any) {
    this.score++;
    this.balloons = this.balloons.filter(balloon => balloon.id !== $event);
    this.balloons.push(new Balloon());

  }

  handleBalloonMissed(balloonId: string) {
    this.missed.update(value => value + 1);
    this.balloons = this.balloons.filter((balloon) => balloon.id !== balloonId);
  }
}
