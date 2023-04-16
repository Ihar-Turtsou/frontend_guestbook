
export const isValidName = (name) => {
    const regex = /^[a-zA-Z0-9_ ]*$/;
    return regex.test(name);
  };

  export const containsHyperlink = (text) => {
    const hyperlinkRegex = /https?:\/\/[^\s]+/gi;
    return hyperlinkRegex.test(text);
  };

  