import{formatCurrency}from'../scripts/Utils/money.js';

console.log('test suite: formatCurrency');
console.log('Convert cents into dollars');

if(formatCurrency(2095)==='20.95'){
  console.log('Passed');
}else{
  console.log('Failes');
}


console.log('works with 0');

if(formatCurrency(0)==='0.00'){
  console.log('Passed');
}else{
  console.log('Failes');
}

console.log('round up to the nearest cent');

if(formatCurrency(2000.5)=== '20.01'){
  console.log('Passed');
}else{
  console.log('Failed')
}