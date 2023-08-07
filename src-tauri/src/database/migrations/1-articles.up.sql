CREATE TABLE IF NOT EXISTS articles (
    identifier TEXT NOT NULL PRIMARY KEY,
    feed_identifier TEXT REFERENCES feeds(identifier) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    date INTEGER NOT NULL,
    read INTEGER NOT NULL DEFAULT 0,
    image_url TEXT DEFAULT NULL
);
