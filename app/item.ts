export class Item {
    name: string;
    sellIn: number; //denotes the number of days we have to sell the item
    quality: number; //denotes how valuable the item is

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}


