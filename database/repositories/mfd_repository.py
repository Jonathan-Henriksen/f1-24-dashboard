import sqlite3
import json
from ..models import MultiFunctionDisplay

_DB_FILE = 'database/mfd.db'

# Private constants for SQL queries
_SELECT_EXISTS = 'SELECT COUNT(1) FROM multi_function_displays WHERE id = 0'
_SELECT_DATA = 'SELECT data FROM multi_function_displays WHERE id = 0'

_UPDATE_STATEMENT = '''UPDATE multi_function_displays SET 
	data=?
	WHERE id = 0'''

_INSERT_STATEMENT = '''INSERT INTO multi_function_displays (
	id,
	data)
	VALUES (?, ?)'''

_CREATE_TABLE_STATEMENT = '''CREATE TABLE IF NOT EXISTS multi_function_displays (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
	data TEXT)'''

def to_json(obj) -> str:
	return json.dumps(obj, default=lambda o: o.__dict__)

def init_db():
	conn = sqlite3.connect(_DB_FILE)
	c = conn.cursor()
	c.execute(_CREATE_TABLE_STATEMENT)
	conn.commit()
	conn.close()

def save_mfd(mfd: MultiFunctionDisplay):
	conn = sqlite3.connect(_DB_FILE)
	c = conn.cursor()

	# Check if the row with id = 0 exists
	c.execute(_SELECT_EXISTS)
	row_exists = c.fetchone()[0]

	mfd_json = to_json(mfd)
	if row_exists:
		# If the row exists, update it
		c.execute(_UPDATE_STATEMENT, (mfd_json,))
	else:
		# If the row does not exist, insert a new row with id = 0
		c.execute(_INSERT_STATEMENT, (0, mfd_json))

	# Commit changes and close the connection
	conn.commit()
	conn.close()

def load_mfd_json() -> str:
    conn = sqlite3.connect(_DB_FILE)
    c = conn.cursor()

    # Select the "data" column from the row where id = 0
    c.execute(_SELECT_DATA)

    # Fetch the data
    result = c.fetchone()
    conn.close()

    # Return the "data" if it exists, otherwise return None
    return result[0] if result else None