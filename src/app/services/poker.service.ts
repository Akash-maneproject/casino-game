import { Injectable } from '@angular/core';
import { PokerCardList } from '../classes/PokerCardList';
import { PokerCard } from '../classes/PokerCard';

@Injectable()
export class PokerService {

	private theAllCardsList: PokerCardList = null;
	private playerCardsList: PokerCardList = null;
	private dealerCardsList: PokerCardList = null;

	public playerScore: number;
	public dealerScore: number;
	public playerBet: number;
	
	private cardSize = 52;

	public playing = false;

	public playerWins: number;
	public playerLosses: number;

	constructor() {
		this.theAllCardsList = new PokerCardList(this.cardSize);
		this.theAllCardsList.shuffle();
		this.dealerCardsList = null;
		this.playerCardsList = null;
		this.playerBet = 0;	
		this.playerLosses = 0;
		this.playerWins = 0;
	}

	public getAllCards(): PokerCardList { return this.theAllCardsList; }

	public getPlayerCards(): PokerCardList { return this.playerCardsList; }

	public getDealerCards(): PokerCardList { return this.dealerCardsList; }

	public getPlayerScore(): number { return this.playerScore; }

	public getDealerScore(): number {
		if (this.playing === true) {
			let score = this.dealerCardsList.firstCard.getCardPoint();
			if (score === 'A') {
				score = 11;
			}
			if (score === 'K' || score === 'Q' || score === 'J') {
				score = 10;
			}
			return score;
		} else {
			return this.dealerScore;
		}
	}


	public shuffleCards(): void { this.theAllCardsList.shuffle(); }

	public newPoker(): void {
		this.dealerCardsList = null;
		this.playerCardsList = null;
		this.playerScore = 0;
		this.playing = true;
		this.dealerScore = 0;
		this.dealerCardsList = new PokerCardList(0);
		this.playerCardsList = new PokerCardList(0);
		if (this.theAllCardsList.isEmpty()) {
			this.theAllCardsList = new PokerCardList(this.cardSize);
			this.shuffleCards();
		}
		this.startPoker();
	}

	private startPoker(): void {
		while (this.dealerCardsList.getNumCards() < 1) {
			const firstCard = this.theAllCardsList.deleteCard(0);
			this.playerCardsList.insertCard(firstCard);
			this.playerScore += this.calculatePlayerScore(firstCard);
			const dealerCard = this.theAllCardsList.deleteCard(0);
			this.dealerCardsList.insertCard(dealerCard);
			this.dealerScore += this.calculateDealerScore(dealerCard);
		}
	}

	public toDealerCards(): void {
		if (this.theAllCardsList.isEmpty()) {
			this.theAllCardsList = new PokerCardList(this.cardSize);
			this.shuffleCards();
		}
		const card = this.theAllCardsList.deleteCard(0);
		this.dealerCardsList.insertCard(card);
		this.dealerScore += this.calculateDealerScore(card);
	}

	public toPlayerCards(): void {
		if (this.theAllCardsList.isEmpty()) {
			this.theAllCardsList = new PokerCardList(this.cardSize);
			this.shuffleCards();
		}
		const card = this.theAllCardsList.deleteCard(0);
		this.playerCardsList.insertCard(card);
		this.playerScore += this.calculatePlayerScore(card);
	}

	public stop(): void {
		if (this.dealerScore < 16) {
			this.toDealerCards();
			this.stop();
		}
	}

	public lossGame(): void {
		this.playing = false;		
	}

	public tie(): void {
		this.playing = false;
	}

	public win(): void {
		this.playing = false;
	
	}

	public startGamealert(): void {
		this.playing = false;
	
	}

	public setPlayerBet(bet: number) {
		this.playerBet = bet;
	}

	public calculateDealerScore(card: PokerCard): number {
		let point = card.getCardPoint();

		if (point === 'A') {
			if (this.dealerScore >= 11) {
				point = 1;
			} else {
				point = 11;
			}
		}

		if (point === 'J' || point === 'Q' || point === 'K') {
			point = 10;
		}

		return point;
	}

	public calculatePlayerScore(card: PokerCard): number {
		let point = card.getCardPoint();

		if (point === 'A') {
			if (this.playerScore >= 11) {
				point = 1;
			} else {
				point = 11;
			}
		}

		if (point === 'J' || point === 'Q' || point === 'K') {
			point = 10;
		}

		return point;
	}



}
