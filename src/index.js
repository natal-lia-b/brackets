module.exports = function check(str, bracketsConfig) {
  // your solution
  let getBrackets = (bracket, bracketsConfig) => {
    return bracketsConfig.find((value) => value[0] == bracket || value[1] == bracket)
  }

  let hasValue = (arr, value) => {
      return arr.findIndex(subArr => subArr[0] == value) > -1 ? true : false;
  }

  let brackets = [[]];

  return str.split('').every((value, index, array) => {
    let valueBrackets = getBrackets(value, bracketsConfig);
    const isSpecialCase = valueBrackets[0] == valueBrackets[1];
    let lastElement = brackets[brackets.length - 1];

    if (isSpecialCase &&
       (lastElement[1] % 2 == 0 || 
       (lastElement[0] != value && !(hasValue(brackets, value))))) {
          brackets.push([value, 1]);
          return true;
    } else if (!isSpecialCase && value == valueBrackets[0]) {
      if (lastElement[0] == value) {
        lastElement[1]++;
      } else if (lastElement[0] != value) {
          if (index == array.length - 1) {
              return false;
          } else {
              brackets.push([value, 1]);
          }
      }
      return true;
    } else if (value == valueBrackets[1]) {
      if (brackets.length == 0) {
        return false;
      } else if (lastElement[0] == valueBrackets[0] && (lastElement[1] > 0)) {
          if (lastElement[1] == 1) {
              brackets.pop();
          } else {
              lastElement[1]--;
          }
          return true;
        } else return false;
      }
  })
}

