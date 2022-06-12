import { expect } from 'chai';
import { Item } from '../app/item';
import { GildedRose } from '../app/gilded-rose';

describe('Basic rules.', function () {
    it('add item', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const item = gildedRose.items[0];
        expect(item.name).to.equal('foo');
        expect(item.sellIn).to.equal(0);
        expect(item.quality).to.equal(0);
    });

    it('update quality', function() {
        const gildedRose = new GildedRose([ new Item('foo', 2, 2) ]);
        const items = gildedRose.updateQuality();

        expect(items[0].name).to.equal('foo');
        expect(items[0].sellIn).to.equal(1);
        expect(items[0].quality).to.equal(1);
    });

    it('quality of an item is never negative', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    });

    it('once the sell by date has passed, quality degrades twice as fast', function() {
        const gildedRose = new GildedRose([ new Item('foo', -1, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(-2);
        expect(items[0].quality).to.equal(8);
    });

    it('quality of an item is never more than 50', function() {
        const gildedRose = new GildedRose([ new Item('foo', -1, 100) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(-2);
        expect(items[0].quality).to.equal(50);
    });
});


describe('Aged Brie rules.', function () {
    const itemName = 'Aged Brie';

    it('increases in quality the older it gets', function() {
        const gildedRose = new GildedRose([ new Item(itemName, 11, 2) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(10);
        expect(items[0].quality).to.equal(3);
    });

    it('quality of an item is never more than 50', function() {
        const gildedRose = new GildedRose([ new Item(itemName, 5, 49) ]);
        let items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(4);
        expect(items[0].quality).to.equal(50);
    });
})


describe('Backstage passes rules.', function () {
    const itemName = 'Backstage passes to a TAFKAL80ETC concert';

    it('increases in quality the older it gets', function() {
        const gildedRose = new GildedRose([ new Item(itemName, 11, 2) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(10);
        expect(items[0].quality).to.equal(3);
    });

    it('quality of an item is never more than 50', function() {
        const gildedRose = new GildedRose([ new Item(itemName, 5, 49) ]);
        let items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(4);
        expect(items[0].quality).to.equal(50);
    });

    it('quality increases by 2 when there are 10 days or less', function() {
        const gildedRose = new GildedRose([ new Item(itemName, 10, 2) ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(9);
        expect(gildedRose.items[0].quality).to.equal(4);

        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(8);
        expect(gildedRose.items[0].quality).to.equal(6);
    });

    it('quality increases by 3 when there are 5 days or less', function() {
        const gildedRose = new GildedRose([ new Item(itemName, 5, 2) ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(4);
        expect(gildedRose.items[0].quality).to.equal(5);

        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(3);
        expect(gildedRose.items[0].quality).to.equal(8);
    });

    it('quality drops to 0 after the concert', function() {
        const gildedRose = new GildedRose([ new Item(itemName, 0, 49) ]);
        let items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(0);
    });
})


describe('Sulfuras rules.', function () {
    const itemName = 'Sulfuras, Hand of Ragnaros';

    it('sulfras quality is 80 and it never alters', function() {
        const gildedRose = new GildedRose([ new Item(itemName, 1, 100) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(80);
    });

    it('sulfras never has to be sold', function() {
        const gildedRose = new GildedRose([ new Item(itemName, 1, 100) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(1);
    });
})


describe('Conjured rules.', function () {
    const itemName = 'Conjured';

    it('degrade in quality twice as fast as normal items', function() {
        const gildedRose = new GildedRose([ new Item(itemName, 11, 3) ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(10);
        expect(gildedRose.items[0].quality).to.equal(1);

        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(9);
        expect(gildedRose.items[0].quality).to.equal(0);
    });

    it('degrade in quality twice as fast as normal items for negative sellIn (decrease quality four times)', function() {
        const gildedRose = new GildedRose([ new Item(itemName, 0, 5) ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(-1);
        expect(gildedRose.items[0].quality).to.equal(1);
    });
})



