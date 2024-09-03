from enum import Enum

class SafetyCarTypes(Enum):
	NONE = 0
	FULL_SAFETY_CAR = 1
	VIRTUAL_SAFETY_CAR = 2
	FORMATION_LAP_SAFETY_CAR = 3

class SafetyCarStatus(Enum):
	DEPLOYED = 0
	RETURNING = 1
	RETURNED = 2
	RESUME_RACE = 3