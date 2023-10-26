export const textCut = (text: string, length: number) => {
  const end = text.indexOf(' ', length);

  if (end === -1) {
    return text.substring(0, length);
  }

  return text.substring(0, end);
};
