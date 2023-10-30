export const contains = (arr: number[], elem: number): boolean => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === elem) {
      return true;
    }
  }
  return false;
};
