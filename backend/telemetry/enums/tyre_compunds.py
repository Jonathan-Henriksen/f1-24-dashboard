from enum import Enum

class TyreCompounds(Enum):
	UNKNOWN = 0
	INTER = 7
	WET = 8
	C5 = 16
	C4 = 17
	C3 = 18
	C2 = 19
	C1 = 20
	C0  = 21,

class TyreCompoundsVisual(Enum):
	UNKNOWN = 0
	INTER = 7
	WET  = 8
	SOFT = 16
	MEDIUM = 17
	HARD = 18