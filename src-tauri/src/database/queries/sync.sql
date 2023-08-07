UPDATE feeds
SET type = ?, last_updated = unixepoch() * 1000, image_url = ?
WHERE identifier = ?
