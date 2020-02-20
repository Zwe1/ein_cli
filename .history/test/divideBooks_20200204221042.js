// 题目：有一个只能容纳10本书的单层书架，你每次只能放1本或2本书。要求用程序求出你将书架填满一共有多少种方法。

function divide(n) {
  if (n === 2) return 2;
  if (n === 1) return 1;
  return divide(n - 1) + divide(n - 2);
}

console.log(divide(10));
