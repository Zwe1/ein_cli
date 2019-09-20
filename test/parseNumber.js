function parse(num) {
  if (typeof num !== "number") return num;
  let strArr = [];
  num
    .toString()
    .split("")
    .reverse()
    .forEach((v, i) => {
      if (i && i % 3 === 0) {
        strArr.push(",");
      }
      strArr.push(v);
    });

  return strArr.reverse().join("");
}

const num = 345676544578;
console.log(parse(num));
