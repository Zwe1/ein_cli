Array.prototype.unique = function() {
  if (!Array.isArray(this) || this.length === 0) return this;
  let result = [];

  let i = 0;

  while (i <= this.length - 1) {
    if (this.indexOf(this[i]) !== i) {
      result.push(this[i]);
      this.splice(i, 1);
    } else {
      i++;
    }
  }

  return result;
};

a = [1, 2, 3, 1, 2, 3, 2, 5, 4];

console.log(a.unique(), a);
