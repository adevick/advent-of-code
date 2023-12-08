const fs = require('fs');
const sampleContents = fs.readFileSync('samplePuzzleInput.txt', 'utf-8');
const allContents = fs.readFileSync('puzzleInput.txt', 'utf-8');

const hands = [];
allContents.split(/\r?\n/).forEach((line) => {
  const hand = { hand: line.split(' ')[0], bid: Number(line.split(' ')[1]) };
  hands.push(hand);
});

const cardValues = [
  { card: 'A', value: 13 },
  { card: 'K', value: 12 },
  { card: 'Q', value: 11 },
  { card: 'J', value: 10 },
  { card: 'T', value: 9 },
  { card: '9', value: 8 },
  { card: '8', value: 7 },
  { card: '7', value: 6 },
  { card: '6', value: 5 },
  { card: '5', value: 4 },
  { card: '4', value: 3 },
  { card: '3', value: 2 },
  { card: '2', value: 1 }
]

const cardValuesPart2 = [
  { card: 'A', value: 13 },
  { card: 'K', value: 12 },
  { card: 'Q', value: 11 },
  { card: 'J', value: 0 },
  { card: 'T', value: 9 },
  { card: '9', value: 8 },
  { card: '8', value: 7 },
  { card: '7', value: 6 },
  { card: '6', value: 5 },
  { card: '5', value: 4 },
  { card: '4', value: 3 },
  { card: '3', value: 2 },
  { card: '2', value: 1 }
]

const handTypes = {
  FiveOfAKind: 7,
  FourOfAKind: 6,
  FullHouse: 5,
  ThreeOfAKind: 4,
  TwoPair: 3,
  OnePair: 2,
  HighCard: 1
}

const lookUpCardByValue = (value) => {
  return cardValues.find((x) => x.value === value);
}

const assignType = (hand) => {
  const setTest = new Set(hand.hand);
  if (setTest.size === 5) {
    if (hand.hand.includes('J')) {
      hand.type = handTypes.OnePair
      return hand;
    } else {
      hand.type = handTypes.HighCard;
      return hand;
    }
  }
  if (setTest.size === 1) {
    hand.type = handTypes.FiveOfAKind
    return hand;
  }
  
  let charCount = {};
  let results = [];
  for (let i = 0; i < hand.hand.length; i++) {
    let character = hand.hand[i];
    charCount[character] = (charCount[character] || 0) + 1;
  }

  for (let char in charCount) {
    if (charCount[char] > 1) {
      results.push({ char: char, count: charCount[char] });
    }
  }
  
  if (results.length === 1) {
    if (results[0].char === 'J' || hand.hand.includes('J')) {
      switch (results[0].count) {
        case 2:
          hand.type = handTypes.ThreeOfAKind
          return hand;
        case 3:
          hand.type = handTypes.FourOfAKind
          return hand;
        case 4:
          hand.type = handTypes.FiveOfAKind
          return hand;
      }
    } else {
      switch (results[0].count) {
        case 2:
          hand.type = handTypes.OnePair
          return hand;
        case 3:
          hand.type = handTypes.ThreeOfAKind
          return hand;
        case 4:
          hand.type = handTypes.FourOfAKind
          return hand;
      }
    }
  }

  if (results.length === 2) {
    if (results[0].char === 'J' || results[1].char === 'J') {
      if ((results[0].count === 2 && results[1].count === 3) ||
        results[0].count === 3 && results[1].count === 2) {
        hand.type = handTypes.FiveOfAKind;
        return hand;
      }
    } else if ((results[0].count === 2 && results[1].count === 3) ||
      results[0].count === 3 && results[1].count === 2) {
      hand.type = handTypes.FullHouse
      return hand;
    }
    if (results[0].count === 2 && results[1].count === 2) {
      if (results[0].char === 'J' || results[1].char === 'J') {
        hand.type = handTypes.FourOfAKind
        return hand;
      } else if (hand.hand.includes('J')) {
        hand.type = handTypes.FullHouse;
        return hand;
      } else {
        hand.type = handTypes.TwoPair;
      }
    }
  }
};

hands.forEach(hand => {
  hand = assignType(hand);
});
console.log('HANDS ARE NOW: ', hands);

hands.sort((a, b) => a.type - b.type)
console.log('Hands Assigned and Sorted: ', hands.filter((x) => x.type === 1).length);

hands.forEach(hand => {
  if (hand.type === 1) {
    console.log(hand);
  }
});

const lookUpCardValue = (card) => {
  return cardValues.find((x) => x.card === card).value;
}

const lookUpCardValuePart2 = (card) => {
  return cardValuesPart2.find((x) => x.card === card).value;
}

const rankedCards = [];
let rank = 1;
for (let i = 1; i <= 7; i++) {
  console.log('Checking hand type: ', i);
  const types = hands.filter((x) => x.type === i);
  let cardDataPerType = [];
  types.forEach(hand => {
    for (let index = 0; index < 5; index++) {
      const card = lookUpCardValuePart2(hand.hand[index]);
      cardDataPerType.push({ id: hand.hand, position: index, value: card, bid: hand.bid })
    }
  });

  console.log('cardDataPerType: ');
  cardDataPerType.forEach(element => {
    console.log(element);
  });

  while (cardDataPerType.length) {
    let nextLayer = [];
    for (let index = 0; index < 5; index++) {
      let cardsByPosition;
      if (nextLayer.length) {
        cardsByPosition = cardDataPerType.filter((x) => nextLayer.map((y) => y.id).includes(x.id)).filter((x) => x.position === index);
      } else {
        cardsByPosition = cardDataPerType.filter((x) => x.position === index);
      }

      cardsByPosition.sort((a, b) => a.value - b.value);

      console.log('cardsByPosition sorted: ', cardsByPosition);
      console.log(`${cardsByPosition[0]?.value} !== ${cardsByPosition[1]?.value} || ${cardsByPosition.length} === 1`)
      // console.log('test: ', Number(cardsByPosition[0]?.value) !== Number(cardsByPosition[1]?.value));
      if ((cardsByPosition[0]?.value !== cardsByPosition[1]?.value) || cardsByPosition.length === 1) {
        const topDog = cardsByPosition.shift();
        console.log('Found top Dog: ', topDog);
        cardDataPerType = cardDataPerType.filter((x) => x.id !== topDog.id);
        topDog.rank = rank;
        rankedCards.push(topDog);
        rank += 1;
        nextLayer = [];
        break;
      } else {
        nextLayer = cardsByPosition.filter((x) => x.value === cardsByPosition[0]?.value);
        console.log('NextLayer', nextLayer);
      }
    }
  }

  types.sort((a, b) => a.hand - b.hand)
}
console.log(hands);
const answer = rankedCards.reduce((agg, current) => (agg += current.rank * current.bid), 0);
console.log(answer);
console.log('rankedCards', rankedCards);
