class Time:
	def __init__(self, minutes_part=0, ms_part=0):
		total_seconds = ms_part // 1000
		self.minutes: int = minutes_part + (total_seconds // 60)  # Add extra minutes from total seconds
		self.seconds: int = total_seconds % 60  # Seconds left after converting to minutes
		self.ms: int = ms_part % 1000  # Remaining milliseconds

	def __repr__(self):
		return f"{self.minutes} minutes, {self.seconds} seconds, {self.ms} milliseconds"