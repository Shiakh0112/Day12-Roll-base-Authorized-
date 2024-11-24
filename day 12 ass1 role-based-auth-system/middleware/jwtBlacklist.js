const blacklist = new Set();

const blacklistToken = (token) => {
  blacklist.add(token);
};

const isTokenBlacklisted = (token) => {
  return blacklist.has(token);
};

module.exports = { blacklistToken, isTokenBlacklisted };
