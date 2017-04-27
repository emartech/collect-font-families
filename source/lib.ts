export const getMatches = (regex: RegExp) => (str: string) => {
  let matches = [];
  let match;
  while (match = regex.exec(str)) {
    matches.push(match[1]);
  }
  return matches;
};
