import { TennisGame } from "./TennisGame";

enum Player {
  One = "player1",
  Tow = "player2",
}

enum Win {
  Player1 = "Win for player1",
  Player2 = "Win for player2",
}

enum Advantage {
  Player1 = "Advantage player1",
  Player2 = "Advantage player2",
}

enum Score {
  All = "All",
  Love = "Love",
  Fifteen = "Fifteen",
  Thirty = "Thirty",
  Forty = "Forty",
  Deuce = "Deuce",
}

export class TennisGame1 implements TennisGame {
  private player1Score: number = 0;
  private player2Score: number = 0;

  wonPoint(playerName: string): void {
    if (playerName === Player.One) this.player1Score += 1;
    else this.player2Score += 1;
  }

  getScore(): string {
    if (this.playersAreTied()) {
      return this.scoreWhenIsATie(this.player1Score);
    }

    if (this.arePlayersInBreakPoint()) {
      return this.scoreWhenPointsMoreThan4(
        this.player1Score,
        this.player2Score
      );
    }

    return this.scoreInTheGame(this.player1Score, this.player2Score);
  }

  private arePlayersInBreakPoint() {
    return this.player1Score >= 4 || this.player2Score >= 4;
  }

  private playersAreTied() {
    return this.player1Score === this.player2Score;
  }

  private scoreWhenIsATie(score: number): string {
    switch (score) {
      case 0:
        return Score.Love + "-" + Score.All;
      case 1:
        return Score.Fifteen + "-" + Score.All;
      case 2:
        return Score.Thirty + "-" + Score.All;
      default:
        return Score.Deuce;
    }
  }

  private scoreWhenPointsMoreThan4(
    player1Score: number,
    player2Score: number
  ): string {
    const scoreDifference: number = player1Score - player2Score;
    if (scoreDifference === 1) {
      return Advantage.Player1;
    }
    if (scoreDifference === -1) {
      return Advantage.Player2;
    }
    if (scoreDifference >= 2) {
      return Win.Player1;
    }
    return Win.Player2;
  }

  private scoreInTheGame(player1Score: number, player2Score: number): string {
    let score: string = "";
    let tempScore: number = 0;
    for (let i = 1; i < 3; i++) {
      if (i === 1) tempScore = player1Score;
      else {
        score += "-";
        tempScore = player2Score;
      }
      switch (tempScore) {
        case 0:
          score += Score.Love;
          break;
        case 1:
          score += Score.Fifteen;
          break;
        case 2:
          score += Score.Thirty;
          break;
        case 3:
          score += Score.Forty;
          break;
      }
    }
    return score;
  }
}
