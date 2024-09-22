import { Component, ElementRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { IBalloon } from '../../balloon.interface';
import { animate, AnimationBuilder, keyframes, style } from '@angular/animations';

@Component({
  selector: 'app-balloon',
  templateUrl: './balloon.component.html',
  styleUrl: './balloon.component.css'
})
export class BalloonComponent implements OnInit {
@Input() balloon: IBalloon = { id: '', color: '' };
animBuilder = inject(AnimationBuilder);
elRef = inject(ElementRef);
@Output() balloonPopped = new EventEmitter<string>();
@Output() balloonMissed = new EventEmitter<string>();


pop() {
  const popAnimation = this.animBuilder.build([
    animate(
      '0.2s ease-out',
      keyframes([
        style({
          scale: '1.2',
          offset: 0.5,
        }),
        style({
          scale: '0.8',
          offset: 0.75,
        }),
      ])
    ),
  ]);
  const player = popAnimation.create(this.elRef.nativeElement.firstChild);
  player.play();
  player.onDone(() => {
    this.balloonPopped.emit(this.balloon.id);
  });
}

ngOnInit() {
  this.animateBalloons();
}

animateBalloons() {
  const buffer = 30;
  const width = window.innerWidth - this.elRef.nativeElement.firstChild.clientWidth - buffer;
  const leftPostion = Math.floor(Math.random() * width);
  const minSpeed = 3;
  const speedvariation = 6;
  const speed = minSpeed + Math.floor(Math.random() * speedvariation);

  const flyAnimation = this.animBuilder.build([
    style({
      translate: `${leftPostion}px 0`,
      position: 'fixed',
      bottom: '0',
      left: '0',
    }),
    animate(
      `${speed}s ease-in-out`,
      style({
        translate: `${leftPostion}px -100vh`,
      })
    )
  ])
  const player = flyAnimation.create(this.elRef.nativeElement.firstChild);
  player.play();
  player.onDone(()=> {
    console.log("Animation Done");
    this.balloonMissed.emit(this.balloon.id);
  } )
  
}


}
