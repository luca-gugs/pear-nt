export const trimContent = (content: string) => {
  let newString;
  if (content.length > 140) {
    newString = content.slice(0, 140) + "...";
  } else {
    newString = content;
  }
  return newString;
};
