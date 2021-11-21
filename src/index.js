import './css/index.less';

setTimeout(() => {
  import('./use1').then((num) => console.log(num.default));
}, 1000);

// let a = 120;
// console.log(a);
