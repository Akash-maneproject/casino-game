import { PokerCard } from './PokerCard';

export class PokerCardList {
	firstCard: PokerCard = null;
	numCards = 0;

	public constructor(num: number) {
		this.numCards = num;
		for (let i = 0; i < num; i++) {
			const temp = new PokerCard(i);
			if (this.firstCard != null) {
				temp.setNext(this.firstCard);
			}
			this.firstCard = temp;
		}
	}

	public getFirstCard(): PokerCard {
		return this.firstCard;
	}

	public setFirstCard(target: PokerCard): void {
		target.setNext(this.firstCard);
		this.firstCard = target;
	}

	public deleteCard(cardNum: number): PokerCard {
		let target: PokerCard;
		let targetPrevious: PokerCard;

		if (cardNum > this.numCards) {
			return null;
		} else {
			this.numCards--;
		}

		target = this.firstCard;
		targetPrevious = null;

		while (cardNum-- > 0) {
			targetPrevious = target;
			target = target.getNextCard();
			// Error card not found
			if (target == null) {
				return null;
			}
		}
		if (targetPrevious != null) {
			targetPrevious.setNext(target.getNextCard());
		} else {
			this.firstCard = target.getNextCard();
		}
		return target;
	} // end deleteCard

	public insertCard(newCard: PokerCard): void {
		this.numCards++;
		if (this.firstCard != null) {
			newCard.setNext(this.firstCard);
		} else {
			newCard.setNext(null);
		}
		this.firstCard = newCard;
	} // end insertCard

	public getNumCards(): number {
		return this.numCards;
	}

	public  getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
	public shuffle(): void {
		for (let i = 0; i < 52; i++) {
			const rand: number = this.getRandomInt(1,52) % this.numCards;
			const temp: PokerCard = this.deleteCard(rand);
			if (temp != null) {
				this.insertCard(temp);
			}
		} // End for loop
	} // end shuffle

	public isEmpty(): boolean {
		return this.numCards === 0;
	}

	public containsAce(): boolean {
		let current = this.getFirstCard();
		while (current == null) {
			if (current.suit === 'A') {
				return true;
			}
			current = current.getNextCard();
		}
		return false;
	}
}
