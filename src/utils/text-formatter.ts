function capitalizeText(text: string): string {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

const textFormatter = {
  capitalizeText,
};

export default textFormatter;
