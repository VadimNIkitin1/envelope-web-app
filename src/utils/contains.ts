export const contains = (arr: [], elem: number): boolean => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === elem) {
      return true;
    }
  }
  return false;
};
