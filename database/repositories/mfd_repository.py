import sqlite3
import json
from ..models import MultiFunctionDisplay

_DB_FILE = 'database/mdf.db'

# Private constants for SQL queries
_SELECT_EXISTS = 'SELECT COUNT(1) FROM multi_function_displays WHERE id = 0'

_UPDATE_STATEMENT = '''UPDATE multi_function_displays SET 
	active_panel_index=?,
	current_lap_invalid=?,
	drs_activation_distance=?,
	fia_flags=?,
	safety_car_status=?,
	safety_car_type=?,
	pit_speed_limit=?,
	pit_status=?,
	damage_panel_json=?,
	leaderboard_panel_json=?,
	strategy_panel_json=?,
	timings_panel_json=?,
	tyres_panel_json=?,
	weather_panel_json=?
	WHERE id = 0'''

_INSERT_STATEMENT = '''INSERT INTO multi_function_displays (
	id,
	active_panel_index,
	current_lap_invalid,
	drs_activation_distance,
	fia_flags,
	safety_car_status,
	safety_car_type,
	pit_speed_limit,
	pit_status,
	damage_panel_json,
	leaderboard_panel_json,
	strategy_panel_json,
	timings_panel_json,
	tyres_panel_json,
	weather_panel_json)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'''

_CREATE_TABLE_STATEMENT = '''CREATE TABLE IF NOT EXISTS multi_function_displays (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
	active_panel_index INTEGER DEFAULT 0,
	current_lap_invalid INTEGER DEFAULT 0,
	drs_activation_distance INTEGER DEFAULT 0,
	fia_flags TEXT,
	safety_car_status TEXT,
	safety_car_type TEXT,
	pit_speed_limit INTEGER DEFAULT 0,
	pit_status TEXT,
	damage_panel_json TEXT,
	leaderboard_panel_json TEXT,
	strategy_panel_json TEXT,
	timings_panel_json TEXT,
	tyres_panel_json TEXT,
	weather_panel_json TEXT
)'''

# Private constant to select all JSON fields from the table
_SELECT_JSON_FIELDS = '''SELECT active_panel_index, current_lap_invalid, drs_activation_distance, fia_flags, 
	safety_car_status, safety_car_type, pit_speed_limit, pit_status, damage_panel_json, 
	leaderboard_panel_json, strategy_panel_json, timings_panel_json, tyres_panel_json, 
	weather_panel_json FROM multi_function_displays WHERE id = 0'''

def to_json(obj):
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

	if row_exists:
		# If the row exists, update it
		c.execute(_UPDATE_STATEMENT, 
				  (mfd.active_panel_index,
				   mfd.current_lap_invalid,
				   mfd.drs_activation_distance,
				   mfd.fia_flags,
				   mfd.safety_car_status,
				   mfd.safety_car_type,
				   mfd.pit_speed_limit,
				   mfd.pit_status,
				   to_json(mfd.damage_panel()),
				   to_json(mfd.leaderboard_panel()),
				   to_json(mfd.strategy_panel()),
				   to_json(mfd.timings_panel()),
				   to_json(mfd.tyres_panel()),
				   to_json(mfd.weather_panel())))
	else:
		# If the row does not exist, insert a new row with id = 0
		c.execute(_INSERT_STATEMENT, 
				  (0,  # Insert with id = 0
				   mfd.active_panel_index,
				   mfd.current_lap_invalid,
				   mfd.drs_activation_distance,
				   mfd.fia_flags,
				   mfd.safety_car_status,
				   mfd.safety_car_type,
				   mfd.pit_speed_limit,
				   mfd.pit_status,
				   to_json(mfd.damage_panel()),
				   to_json(mfd.leaderboard_panel()),
				   to_json(mfd.strategy_panel()),
				   to_json(mfd.timings_panel()),
				   to_json(mfd.tyres_panel()),
				   to_json(mfd.weather_panel())))

	# Commit changes and close the connection
	conn.commit()
	conn.close()

def load_mfd_json() -> str:
	conn = sqlite3.connect(_DB_FILE)
	c = conn.cursor()

	# Select the JSON fields directly using the constant query
	c.execute(_SELECT_JSON_FIELDS)

	row = c.fetchone()
	conn.close()

	if row:
		# Return the result as a dictionary serialized to JSON
		mfd_json = {
			"active_panel_index": row[0],
			"current_lap_invalid": row[1],
			"drs_activation_distance": row[2],
			"fia_flags": row[3],
			"safety_car_status": row[4],
			"safety_car_type": row[5],
			"pit_speed_limit": row[6],
			"pit_status": row[7],
			"damage_panel_json": json.loads(row[8]),
			"leaderboard_panel_json": json.loads(row[9]),
			"strategy_panel_json": json.loads(row[10]),
			"timings_panel_json": json.loads(row[11]),
			"tyres_panel_json": json.loads(row[12]),
			"weather_panel_json": json.loads(row[13])
		}
		return json.dumps(mfd_json, indent=2)
	
	return None

def load_mfd(json_data: str) -> MultiFunctionDisplay:
	data = json.loads(json_data)

	mfd = MultiFunctionDisplay()
	
	# Set basic properties
	mfd.active_panel_index = data['active_panel_index']
	mfd.current_lap_invalid = data['current_lap_invalid']
	mfd.drs_activation_distance = data['drs_activation_distance']
	mfd.fia_flags = data['fia_flags']
	mfd.safety_car_type = data['safety_car_type']
	mfd.safety_car_status = data['safety_car_status']
	mfd.pit_speed_limit = data['pit_speed_limit']
	mfd.pit_status = data['pit_status']

	# Set panels by updating their attributes from JSON
	mfd.damage_panel().__dict__.update(data['damage_panel_json'])
	mfd.leaderboard_panel().__dict__.update(data['leaderboard_panel_json'])
	mfd.strategy_panel().__dict__.update(data['strategy_panel_json'])
	mfd.timings_panel().__dict__.update(data['timings_panel_json'])
	mfd.tyres_panel().__dict__.update(data['tyres_panel_json'])
	mfd.weather_panel().__dict__.update(data['weather_panel_json'])

	return mfd
