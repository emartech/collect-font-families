module.exports = {

  getMatches(regex) {
    return (string) => {
      let matches = [];
      let match;
      while (match = regex.exec(string)) {
        matches.push(match[1]);
      }
      return matches;
    };
  }
}
