function feeds() {
  return ['feeds'];
}

function articles(identifier: string | null) {
  return ['articles', identifier];
}

function article(identifier: string | null) {
  return ['article', identifier];
}

function preferences() {
  return ['preferences'];
}

const QueryKey = {
  feeds,
  articles,
  article,
  preferences,
};

export default QueryKey;
