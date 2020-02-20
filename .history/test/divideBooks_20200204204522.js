function divide(n) {
  if (n === 2) return 2;
  if (n === 1) return 1;
  return divide(n - 1) + divide(n - 2);
}

console.log(divide(10));
