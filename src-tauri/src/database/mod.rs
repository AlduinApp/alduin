use include_dir::{include_dir, Dir};
use tauri_plugin_sql::{Migration, MigrationKind};
use itertools::Itertools;

pub fn load_migrations() -> Vec<Migration> {
    static MIGRATIONS_DIR: Dir = include_dir!("$CARGO_MANIFEST_DIR/src/database/migrations");

    let mut migrations: Vec<Migration> = vec![];

    for file in MIGRATIONS_DIR.files() {
        let sql = file.contents_utf8().expect("utf8 content should not be empty");
        let (version, description, kind) = file.path()
            .file_name().expect("file name should not be empty")
            .to_str().expect("should be able to convert as str")
            .split(".")
            .flat_map(|part| part.split("-"))
            .next_tuple().unwrap();

        migrations.push(Migration {
            version: version.parse::<i64>().expect("version should be a valid integer"),
            description,
            sql,
            kind: match kind { "up" => MigrationKind::Up, "down" => MigrationKind::Down, &_ => MigrationKind::Up},
        });
    }

    return migrations;
}
