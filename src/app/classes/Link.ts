export class Link {
	protected next: Link;

	public getNext(): Link {
		return this.next;
	}

	public setNext(newNext: Link): void {
		this.next = newNext;
	}
}
