from typing import Dict

from .common import Driver, Time
from telemetry.enums import Teams, PitStatus, DriverStatus, TyreCompoundsVisual
from telemetry.packets import ParticipantsPacket, LapDataPacket, TyreSetsPacket

class LeaderboardPanel():
	MILLISECONDS_IN_A_MINUTE = 60 * 1000
	def __init__(self):
		self.name = "Leaderboard"
		self.drivers: Dict[int, Driver] = {}
	
	def update_from_tyre_sets_packet(self, tyre_sets_packet: TyreSetsPacket):
		fitted_tyre_set = tyre_sets_packet.tyre_sets[tyre_sets_packet.fitted_index]
	
		# Use get() to retrieve or create the Driver object
		driver = self.drivers.setdefault(tyre_sets_packet.car_index, Driver())
	
		# Update the tyre compound
		driver.tyre_compound = TyreCompoundsVisual(fitted_tyre_set.compound_visual).name
	

	def update_from_participants_packet(self, participants_packet: ParticipantsPacket):
		for index in range(participants_packet.num_active_cars):
			participant = participants_packet.participants[index]

			leaderboard_player = self.drivers.get(index, Driver())

			leaderboard_player.team = Teams(participant.team_id).name
			leaderboard_player.name = participant.name

			self.drivers[index] = leaderboard_player

	def update_from_lap_data_packet(self, lap_data_packet: LapDataPacket):
		player_data = lap_data_packet.player_data()

		# Total delta to race leader for the player in milliseconds
		player_delta_to_race_leader_total_ms = (
			player_data.delta_to_race_leader_ms_part + 
			(player_data.delta_to_race_leader_minutes_part * self.MILLISECONDS_IN_A_MINUTE)
		)

		# Update details for each driver
		for car_index in self.drivers.keys():
			if car_index == lap_data_packet.header.player_car_index:
				self.drivers[car_index].is_player = True

			driver = lap_data_packet.lap_data[car_index]

			# Total delta to race leader for the other driver in milliseconds
			other_driver_delta_to_race_leader_total_ms = (
				driver.delta_to_race_leader_ms_part + 
				(driver.delta_to_race_leader_minutes_part * self.MILLISECONDS_IN_A_MINUTE)
			)

			# Calculate delta to player
			other_driver_delta_to_player = abs(other_driver_delta_to_race_leader_total_ms - player_delta_to_race_leader_total_ms)

			self.drivers[car_index].delta_to_player = Time(ms_part=other_driver_delta_to_player)

			# Update other driver details
			self.drivers[car_index].position = driver.car_position
			self.drivers[car_index].lap_time_current = Time(ms_part=driver.current_lap_time_in_ms)
			self.drivers[car_index].lap_time_current_invalid = bool(driver.current_lap_invalid)
			
			self.drivers[car_index].pit_status = PitStatus(driver.pit_status).name
			self.drivers[car_index].penalty_seconds = driver.penalties
			self.drivers[car_index].driver_status = DriverStatus(driver.driver_status).name

			# Update personal best if previous lap was faster
			driver_current_personal_best_in_ms = self.drivers[car_index].lap_time_personal_best.to_milliseconds()
			
			if driver.last_lap_time_in_ms > 0 and (driver_current_personal_best_in_ms == 0 or driver.last_lap_time_in_ms < driver_current_personal_best_in_ms):
				self.drivers[car_index].lap_time_personal_best = Time(ms_part=driver.last_lap_time_in_ms)

	def get_driver_by_position(self, car_position: int):
		return next(
			(driver for driver in self.drivers.values() if driver.position == car_position),
			None
		)