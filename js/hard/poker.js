var fs  = require("fs");

var rank = ['_', 2,3,4,5,6,7,8,9,'T','J','Q','K','A'];
var rank_map = {};
rank.map(function(val, idx) { rank_map[val] = parseInt(idx, 10); });
var BASE = rank.length;

var order_idx = 0;
var orders = {
	             CARD_1: order_idx++,
	             CARD_2: order_idx++,
	             CARD_3: order_idx++,
	             CARD_4: order_idx++,
	             CARD_5: order_idx++,
	           PAIR_LOW: order_idx++,
	          PAIR_HIGH: order_idx++,
	    THREE_OF_A_KIND: order_idx++,
	      STRAIGHT_HIGH: order_idx++,
	              FLUSH: order_idx++,
	    FULL_HOUSE_PAIR: order_idx++,
	   FULL_HOUSE_THREE: order_idx++,
	     FOUR_OF_A_KIND: order_idx++,
	STRAIGHT_FLUSH_HIGH: order_idx++
};

function get_card(token) { return new Card(token); }
function card_sort(ca, cb) { return ca.value - cb.value; }

var lab = fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
	if (!line) return;

	cards = line.split(/\s+/).slice(0, 10).map(get_card);

	// console.log(line);

	var hand1 = new Hand(cards.slice(0, 5));
	// console.log(hand1);

	var hand2 = new Hand(cards.slice(5));
	// console.log(hand2);

	process.stdout.write(
		(hand1.value === hand2.value
			? 'none'
			: (hand1.value > hand2.value
				? 'left'
				: 'right'
			)
		) + 
		"\n"
	);

	// console.log("==============================================");
});

function Hand(cards) {
	var self = this;
	this.value = 0;

	this.num_suits = 0;
	this.suits = {};

	this.num_values = 0;
	this.values = {};

	this.cards = cards.sort(card_sort);

	this.flush    = true;
	this.straight = true;
	var last_card = null;

	this.cards.forEach(function(card, idx) {
		self.value += card.value * Math.pow(BASE, idx);

		if (last_card) {
			if (card.value - last_card.value != 1) {
				self.straight = false;
			}
		}
		last_card = card;

		if (!(card.suit in self.suits)) {
			self.suits[card.suit] = 1;
			self.num_suits++;
		}
		else self.suits[card.suit]++;

		if (!(card.value in self.values)) {
			self.values[card.value] = 1;
			self.num_values++;
		}
		else self.values[card.value]++;
	});

	this.flush = (this.num_suits === 1);

	// return;

	// compute value of hand
	// value is derived as a base-13 magnitude system to assign a unique score on a hand
	// if the score is the same, we'll resort to inspecting the individual cars in a separate algorithm

	if (this.num_values === 2) {
		// either 4 of a kind, or full house!
		for (var value in this.values) {
			var occurences = this.values[value];
			if (occurences === 4) {
				// console.log("FOUR_OF_A_KIND");
				this.value += parseInt(value, 10) * Math.pow(BASE, orders.FOUR_OF_A_KIND);
				break;
			}
			else if (occurences === 3) {
				// console.log("FULL_HOUSE_THREE");
				this.value += parseInt(value, 10) * Math.pow(BASE, orders.FULL_HOUSE_THREE);
			}
			else if (occurences === 2) {
				// console.log("FULL_HOUSE_PAIR");
				this.value += parseInt(value, 10) * Math.pow(BASE, orders.FULL_HOUSE_PAIR);
			}
		}
	}
	else if (this.num_values === 3) {
		var pairs = [];
		// either 3 of a kind, or 2 pairs
		for (var value in this.values) {
			var occurences = this.values[value];
			if (occurences === 3) {
				// console.log("THREE_OF_A_KIND");
				this.value += parseInt(value, 10) * Math.pow(BASE, orders.THREE_OF_A_KIND);
				break;
			}
			else if (occurences === 2) {
				pairs.push(parseInt(value, 10));
			}
		}
		if (pairs.length) {
			// console.log("2 PAIRS");
			if (pairs[0] > pairs[1]) pairs.reverse();
			this.value += parseInt(pairs[0], 10) * Math.pow(BASE, orders.PAIR_LOW);
			this.value += parseInt(pairs[1], 10) * Math.pow(BASE, orders.PAIR_HIGH);
		}
	}
	else if (this.num_values === 4) {
		// single pair
		for (var value in this.values) {
			var occurences = this.values[value];
			if (occurences === 2) {
				this.value += parseInt(value, 10) * Math.pow(BASE, orders.PAIR_LOW);
				break;
			}
		}
	}
	else {
		// 5 different cards, either straight, flush, or nothing!
		if (this.straight) {
			if (this.flush) {
				// console.log("STRAIGHT_FLUSH_HIGH");
				this.value += this.cards[4].value * Math.pow(BASE, orders.STRAIGHT_FLUSH_HIGH);
			}
			else {
				// console.log("STRAIGHT_HIGH");
				this.value += this.cards[4].value * Math.pow(BASE, orders.STRAIGHT_HIGH);
			}
		}
		else if (this.flush) {
			// console.log("FLUSH");
			this.value += Math.pow(BASE, orders.FLUSH);
		}
	}
}

function Card(card_str) {
	this.suit = card_str.charAt(1);
	this.figure = card_str.charAt(0);
	this.value = rank_map[this.figure];
};
