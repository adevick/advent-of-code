const fs = require('fs');
const data = fs.readFileSync('puzzleInput.txt', 'utf-8');
const testInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`

const lines = data.split(/\r?\n/);

const context = lines.reduce((acc, current) => {
  if(current === '') {
    return acc;
  }
  if(current.includes('|')) {
    const [pageA, pageB ] = current.split('|');
    acc.pageOrderingRules.push({pageA, pageB});
    return acc;
  } else {
    acc.updates.push(current);
    return acc;
  }
}, { pageOrderingRules: [], updates: []});

const getRelevantRules = (update) => {
  const relevantRules = [];
  context.pageOrderingRules.forEach((rule) => {
    if(update.includes(rule.pageA) || update.includes(rule.pageB)) {
      relevantRules.push(rule);
    }
  })
  return relevantRules;
}

const validateUpdate = (rule, update) => {
  let pageAIndex;
  let pageBIndex;
  
  update.forEach((page, i) => {
    if (page === rule.pageA) {
      pageAIndex = i;
    }
    if(page === rule.pageB) {
      pageBIndex = i;
    }
  });

  if((pageAIndex === undefined || pageBIndex === undefined) || (pageAIndex < pageBIndex)) {
    // console.log({rule, update, pageAIndex, pageBIndex, valid: true});
    return true;
  }
  // console.log({rule, update, pageAIndex, pageBIndex, valid: false});
  return false;
}

const findMiddlePage = (update) => {
  const middleIndex = ((update.length - 1) / 2);
  return update[middleIndex];
}

const middlePagesOfValidUpdates = context.updates.map((update) => {
  const updatePageList = update.split(',');
  const relevantRules = getRelevantRules(updatePageList);
  
  const results = [];
  // console.log({relevantRules, update});
  relevantRules.forEach((rule) => {
    const updateIsValid = validateUpdate(rule, updatePageList);
    results.push(updateIsValid);
  });

  // console.log({results});
  if(results.every(Boolean)) {
    return findMiddlePage(updatePageList);
  }
}).filter(Boolean);

const result = middlePagesOfValidUpdates.reduce((accumulator, current) => accumulator + Number(current), 0);
console.log(result);


