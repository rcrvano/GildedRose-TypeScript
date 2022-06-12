import { Item } from "./item";

export class GildedRose {
    items: Array<Item>;

    constructor(items: Array<Item> = []) {
        this.items = items;
    }

    updateQuality(): Array<Item> {
        this.items.map( (item: Item) => {
            this.updateItemSellIn(item);
            this.updateItemQuality(item);
            return item;
        });
        return this.items;
    }

    updateItemSellIn (item:Item): void {
        if (item.name !== 'Sulfuras, Hand of Ragnaros') {
            item.sellIn--;
        };
    }

    updateItemQuality (item:Item): void {
        switch (item.name) {
            case 'Aged Brie':
                this.updateAgedBrie(item);
                break;
            case 'Backstage passes to a TAFKAL80ETC concert':
                this.updateBackstage(item);
                break;
            case 'Sulfuras, Hand of Ragnaros':
                this.updateSulfuras(item);
                break;
            case 'Conjured':
                this.updateConjured(item);
                break;
            default:
                this.updateDefault(item);
                break;
        };
    }

    updateAgedBrie(item: Item): void {
        item.quality++;
        this.fixQualityLimits(item);
    }

    updateBackstage(item: Item): void {
        item.quality++;
        if (item.sellIn < 10) item.quality++; 
        if (item.sellIn < 5) item.quality++; 
        if (item.sellIn < 0) item.quality=0;
        this.fixQualityLimits(item);
    }

    updateSulfuras(item: Item): void {
        item.quality=80;
    }

    updateConjured(item: Item): void {
        item.quality = item.quality-2;
        if (item.sellIn < 0) item.quality = item.quality-2; 
        this.fixQualityLimits(item);
    }

    updateDefault(item: Item): void {
        item.quality--;
        if (item.sellIn < 0) item.quality--; 
        this.fixQualityLimits(item);
    }

    fixQualityLimits(item: Item): void {
        if (item.quality < 0) item.quality = 0;
        if (item.quality > 50) item.quality = 50;
    }
}
