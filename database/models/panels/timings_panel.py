from telemetry.packets import *
from .common import Time

class TimingsPanel:
	def __init__(self):
		self.lap_time_current: Time = Time()
		self.lap_time_current_invalid: bool = False
		self.lap_time_previous: Time = Time()
		self.lap_time_fastest: Time = Time()
		self.lap_time_personal_best: Time = Time()
		self.delta_race_leader: Time = Time()
		self.delta_driver_in_front: Time = Time()
		self.delta_driver_behind: Time = Time()
		self.delta_safety_car: Time = Time()
	
	def update_from_lap_data(self, lap_data_packet: LapDataPacket):
		player_lap_data = lap_data_packet.player_data()

		# Current lap time
		self.lap_time_current = Time(ms_part=player_lap_data.current_lap_time_in_ms)

		# Previous lap time
		self.lap_time_previous = Time(ms_part=player_lap_data.last_lap_time_in_ms)

		# Delta to leader
		self.delta_race_leader = Time(player_lap_data.delta_to_race_leader_minutes_part, player_lap_data.delta_to_race_leader_ms_part)

		# Delta to driver in front
		self.delta_driver_in_front = Time(player_lap_data.delta_to_car_in_front_minutes_part, player_lap_data.delta_to_car_in_front_ms_part)

		# Delta to driver behind
		driver_behind_data = next(
			(lap_data for lap_data in lap_data_packet.lap_data if lap_data.car_position == player_lap_data.car_position + 1),
			None
		)

		if driver_behind_data:
			self.delta_driver_behind = Time(driver_behind_data.delta_to_car_in_front_minutes_part, driver_behind_data.delta_to_car_in_front_ms_part)		

		# Delta to safety car
		self.delta_safety_car = Time(ms_part=player_lap_data.safety_car_delta_in_seconds * 1000)		
