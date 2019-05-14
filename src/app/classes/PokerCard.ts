import { Link } from './Link';

export class PokerCard extends Link {
	private cardNum: number;
	public rank: any;
	public suit: string;

	constructor(cardNumber: number) {
		super();
		this.cardNum = cardNumber;
		this.rank = this.getCardPoint();
		this.suit = this.getFaceCard();
	}

	public getNextCard(): PokerCard {
		return this.getNext() as PokerCard;
	}

	public getCardPoint(): any {
		if (this.cardNum === 0 || this.cardNum === 13 || this.cardNum === 26 || this.cardNum === 39) {
			return 'A';
		} else if (this.cardNum === 10 || this.cardNum === 23 || this.cardNum === 36 || this.cardNum === 49) {
			return 'J';
		} else if (this.cardNum === 11 || this.cardNum === 24 || this.cardNum === 37 || this.cardNum === 50) {
			return 'Q';
		} else if (this.cardNum === 12 || this.cardNum === 25 || this.cardNum === 38 || this.cardNum === 51) {
			return 'K';
		} else if (this.cardNum >= 39) {
			return this.cardNum - 38;
		} else if (this.cardNum >= 27 && this.cardNum <= 38) {
			return this.cardNum - 25;
		} else if (this.cardNum >= 14 && this.cardNum <= 26) {
			return this.cardNum - 12;
		} else {
			return this.cardNum + 1;
		}
	}

	public getFaceCard(): string {
		if (this.cardNum < 13) {
			return 'clubs';
		} else if (this.cardNum < 26) {
			return 'diams';
		} else if (this.cardNum < 39) {
			return 'hearts';
		} else {
			return 'spades';
		}
	}
}
