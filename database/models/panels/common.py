from telemetry.enums import PitStatus, DriverStatus
class Driver():
	def __init__(self):
		self.position: int = 0
		self.team: str = ""
		self.name: str = ""
		self.delta_to_player: Time = Time()
		self.lap_time_current: Time = Time()
		self.lap_time_previous: Time = ()
		self.lap_time_current_invalid: bool = False
		self.lap_time_personal_best: Time = Time()
		self.pit_status: str = PitStatus.NONE.name
		self.driver_status: str = DriverStatus.IN_GARAGE.name
		self.penalty_seconds: int = 0
		self.tyre_compound: str = ""
		self.is_player: bool = False

class Time:
	def __init__(self, minutes_part: int = 0, ms_part: int = 0):
		total_seconds = ms_part // 1000
		self.minutes: int = minutes_part + (total_seconds // 60)  # Add extra minutes from total seconds
		self.seconds: int = total_seconds % 60  # Seconds left after converting to minutes
		self.ms: int = ms_part % 1000  # Remaining milliseconds

	def to_milliseconds(self):
		return (self.minutes * 60 * 1000) + (self.seconds * 1000) + self.ms