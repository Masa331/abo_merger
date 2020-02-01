const fs = require('fs');
const raw = fs.readFileSync('./test.gpc', 'utf8');

const lines = raw.split('\r\n')
const present = lines.filter((line) => line !== '')
// const header = lines.find((line) => line.substring(0,3) === '074')

let header;
let transactions = [];

function parseHeader(line) {
  const parsed = {
    account: line.substring(3,19),
    name: line.substring(19,39),
    initial_balance_date: line.substring(39,45),
    initial_balance: line.substring(45,59),
    initial_balance_sign: line.substring(59,60),

    end_balance: line.substring(60,74),
    end_balance_sign: line.substring(74,75),

    debit_transactions: line.substring(75,89),
    debit_transactions_sign: line.substring(89,90),

    credit_transactions: line.substring(90,104),
    credit_transactions_sign: line.substring(104,105),

    statement_id: line.substring(105,108),

    export_date: line.substring(108,114),

    filler: line.substring(114,128),
  }

  return parsed;
}

function parseTransaction(line) {
  const parsed = {
    account: line.substring(3,19),
    counterparty: line.substring(19,35),
    transaction_number: line.substring(35,48),

    amount: line.substring(48,60),
    type: line.substring(60,61),
    variable_symbol: line.substring(61,71),

    constant_symbol: line.substring(71,81),
    specific_symbol: line.substring(81,91),

    date: line.substring(91,97),
    note: line.substring(97,117),

    change_type: line.substring(117,118),
    data_type: line.substring(118,122),

    due_date: line.substring(122,128)
  }

  return parsed;
}

for (line of present) {
  switch (line.substring(0,3)) {
    case '074':
      if (header !== undefined) {
        throw new Error('Multiple header fields');
      }
      header = parseHeader(line);
      console.log(header);
      break;
    case '075':
      const transaction = parseTransaction(line);
      console.log(transaction);
      transactions.push(transaction);
      break;
    default:
      throw new Error('Unknown line type', line.substring(0,3));
  }
}


// console.log('HEADER: ', header);
