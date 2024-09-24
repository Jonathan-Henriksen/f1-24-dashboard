from enum import Enum

class DriverStatus(Enum):
	IN_GARAGE = 0
	FLYING_LAP = 1
	IN_LAP = 2
	OUT_LAP = 3
	ON_TRACK = 4
