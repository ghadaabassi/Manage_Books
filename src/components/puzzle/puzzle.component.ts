import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css'],
  imports: [CommonModule],
})
export class PuzzleComponent implements OnInit, OnDestroy {
  questions = [
    {
      question: "Who wrote '1984'?",
      options: [
        'George Orwell',
        'Aldous Huxley',
        'F. Scott Fitzgerald',
        'J.K. Rowling',
      ],
      correctAnswer: 'George Orwell',
    },
    {
      question: "Which book series features the character 'Harry Potter'?",
      options: [
        'The Hunger Games',
        'Percy Jackson',
        'Harry Potter',
        'Lord of the Rings',
      ],
      correctAnswer: 'Harry Potter',
    },
    {
      question: "What is the title of the first 'Game of Thrones' book?",
      options: [
        'A Clash of Kings',
        'A Storm of Swords',
        'A Game of Thrones',
        'A Dance with Dragons',
      ],
      correctAnswer: 'A Game of Thrones',
    },
  ];

  currentQuestionIndex = 0;
  currentQuestion: any = this.questions[this.currentQuestionIndex];
  score = 0;
  timer: number = 30;
  timerInterval: any;
  gameOver = false;

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.timer > 0 && !this.gameOver) {
        this.timer--;
      } else if (this.timer === 0) {
        this.gameOver = true;
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  nextQuestion(selectedAnswer: string): void {
    if (this.gameOver) return;

    if (selectedAnswer === this.currentQuestion.correctAnswer) {
      this.score++;
    }

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    } else {
      this.gameOver = true;
      clearInterval(this.timerInterval);
      this.saveScore();
    }
  }

  saveScore(): void {
    localStorage.setItem('userScore', this.score.toString());
  }

  restartQuiz(): void {
    this.score = 0;
    this.currentQuestionIndex = 0;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.timer = 30;
    this.gameOver = false;
    this.startTimer();
  }
}
