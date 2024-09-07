from telemetry.packets import *
from .common import Driver, Time

class TimingsPanel:
	def __init__(self):
		self.name = "Timings"
		self.lap_time_current: Time = Time()
		self.lap_time_current_invalid: bool = False
		self.lap_time_previous: Time = Time()
		self.lap_time_fastest_driver: Driver = Driver()
		self.lap_time_personal_best: Time = Time()
		self.lap_time_teammate_best: Time = Time()
		self.player: Driver = Driver()
		self.race_leader: Driver = Driver()
		self.driver_in_front: Driver = Driver()
		self.driver_behind: Driver = Driver()
		self.delta_safety_car: Time = Time()
	
	def update_from_lap_data(self, lap_data_packet: LapDataPacket, player: Driver, teammate: Driver, driver_lead: Driver, driver_in_front: Driver, driver_behind: Driver):
		player_lap_data = lap_data_packet.player_data()

		# Player Lap times
		self.lap_time_current = Time(ms_part=player_lap_data.current_lap_time_in_ms)
		self.lap_time_previous = Time(ms_part=player_lap_data.last_lap_time_in_ms)
		self.lap_time_personal_best = player.lap_time_personal_best

		# Teammate Lap times
		self.lap_time_teammate_best = teammate.lap_time_personal_best

		# Deltas for key cars
		self.player = player
		self.race_leader = driver_lead
		self.driver_in_front = driver_in_front
		self.driver_behind = driver_behind

		# Delta to safety car
		self.delta_safety_car = Time(ms_part=player_lap_data.safety_car_delta_in_seconds * 1000)

	def update_from_fastest_lap_event(self, fastest_lap_event: FastestLapEvent, fastest_lap_driver: Driver):
		if not fastest_lap_driver:
			return
		
		self.lap_time_fastest_driver = fastest_lap_driver
