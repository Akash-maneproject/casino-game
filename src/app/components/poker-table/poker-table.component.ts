import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgClass, NgSwitch } from '@angular/common';
import { PokerCardList } from '../../classes/PokerCardList';
import { PokerCard } from '../../classes/PokerCard';
import { PokerService } from '../../services/poker.service';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
	selector: 'app-poker-table',
	templateUrl: './poker-table.component.html',
	styleUrls: [
		'./poker-table.component.css'
	]
})
export class PokerTableComponent implements OnInit {

	allcards: PokerCard[];
	playerCards: PokerCard[];
	dealerCards: PokerCard[];

	
	betSet = false;

	public options = {
		position: ['top', 'right'],
		timeOut: 2500,
	};

	constructor(public game: PokerService, private notifications: NotificationsService) {
		this.allcards = this.convertToArray(this.game.getAllCards());		
	}


	timerVar:any="";
	startgameVar:any="";
	ngOnInit(){
		
	}

	
	public nextGame(): void {

		this.hideAllNotiifcation();
		clearTimeout(this.startgameVar);

		if (this.game.playing === true) {
			return;
		}

		// Clear variables for next game
		this.playerCards = null;
		this.dealerCards = null;
		this.allcards = null;
		
		this.game.newPoker();
		this.allcards = this.convertToArray(this.game.getAllCards());
		this.dealerCards = this.convertToArray(this.game.getDealerCards());
		this.playerCards = this.convertToArray(this.game.getPlayerCards());
		if (this.game.dealerScore === 21 && this.game.playerScore === 21) {
			this.tie();
		}
		if (this.game.dealerScore === 21) {
			this.lose('The dealer score is 21!');
		}
		if (this.game.playerScore === 21) {
			this.win('Winner winner chiken dinner ! 21');
		}
	}

	



	public toPlayerCards(): void {
		if (this.game.playing) {

			// Send a card to player list
			this.game.toPlayerCards();

			// Make sure the player didn't lose
			if (this.game.playerScore > 21) {
				this.lose(' Your score over 21!');
			}

			// Update cards
			this.allcards = this.convertToArray(this.game.getAllCards());
			this.playerCards = this.convertToArray(this.game.getPlayerCards());
		}
		return;
	}

	public stop(): void {

		this.timerVar = setTimeout( ()=>{
			if (this.game.playing) {
				this.game.stop();
				this.allcards = this.convertToArray(this.game.getAllCards());
				this.dealerCards = this.convertToArray(this.game.getDealerCards());

				if (this.game.playerScore > this.game.dealerScore) {
					if (this.game.dealerScore > 21) {
						this.win('Dealer Lose ! You win the game !');
						return;
					}
					this.win('Congratulations! You win the game ');
					return;
				}
				if (this.game.dealerScore > this.game.playerScore) {
					if (this.game.dealerScore > 21) {
						this.win('Congratulations! You win the game !');
						return;
					}
					this.lose('Sorry! The dealer win the game !');
					return;
				}
				if (this.game.dealerScore === this.game.playerScore) {
					this.tie();
					return;
				}
			}

			this.myStopFunction()
		},1500);
		
	}

	myStopFunction() {
		clearTimeout(this.timerVar);
	}

	

	private convertToArray(deck: PokerCardList) {
		let current = deck.getFirstCard();
		const temp = [current];
		current = current.getNextCard();
		while (current != null) {
			temp.push(current);
			current = current.getNextCard();
		}
		return temp;
	}

	private lose(msg: string): void {
		this.notifications.error('You lose!', msg);
		this.game.lossGame();		
		this.startGamealert();
		return;
	}

	private tie(): void {
		this.notifications.info('Match Tie!', 'You and the dealer has same score !');
		this.game.tie();
		this.startGamealert();		
		return;
	}

	private win(msg: string): void {
		this.notifications.success('You win!', msg);
		this.game.win();		
		this.startGamealert();
		return;
	}

	private startGamealert(): void {
		this.startgameVar = setTimeout( ()=>{
		this.notifications.info('Please click on new game ','',{
			timeOut: 5000,		  
		});
		this.game.startGamealert();		
		this.myStartGameFunction();
		},2500);
	}

	myStartGameFunction() {
		clearTimeout(this.startgameVar);
	}

	hideAllNotiifcation(){
	this.notifications.remove();		
				}
}
