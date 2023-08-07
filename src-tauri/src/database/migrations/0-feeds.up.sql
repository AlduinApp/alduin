CREATE TABLE IF NOT EXISTS feeds (
    identifier TEXT NOT NULL PRIMARY KEY,
    display_name TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT DEFAULT NULL,
    interval INTEGER NOT NULL,
    last_updated INTEGER DEFAULT 0,
    image_url TEXT DEFAULT NULL
);
