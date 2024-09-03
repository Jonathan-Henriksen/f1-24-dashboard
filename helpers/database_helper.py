import sqlite3
from panels.tyre_info import TyreInfoPanel

_DB_FILE = 'telemetry.db'

def init_db():
    conn = sqlite3.connect(_DB_FILE)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS tyre_info (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            data TEXT
        )
    ''')
    conn.commit()
    conn.close()

def save_tyres_to_db(tyre_info: TyreInfoPanel):
    conn = sqlite3.connect(_DB_FILE)
    c = conn.cursor()
    c.execute('INSERT INTO tyre_info (data) VALUES (?)', (tyre_info.to_json(),))
    conn.commit()
    conn.close()

def get_latest_tyre_info():
    conn = sqlite3.connect(_DB_FILE)
    c = conn.cursor()
    c.execute('SELECT data FROM tyre_info ORDER BY timestamp DESC LIMIT 1')
    result = c.fetchone()
    conn.close()
    if result:
        return result[0]
    return None