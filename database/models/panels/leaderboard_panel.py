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

	def update_from_lap_data_packet(self, lap_data_packet: LapDataPacket, session_type: str):
		player_lap_data = lap_data_packet.player_data()
		self.drivers[lap_data_packet.header.player_car_index].is_player = True

		# Update details for each driver
		for car_index in self.drivers.keys():
			lap_data = lap_data_packet.lap_data[car_index]

			# Deltas
			if 'PRACTICE' in session_type or 'QUALIFYING' in session_type:
				player_current_data = self.get_driver_by_position(player_lap_data.car_position)
				other_driver_current_data = self.get_driver_by_position(lap_data.car_position)

				if player_current_data.lap_time_personal_best and other_driver_current_data.lap_time_personal_best:
					delta_to_player_in_ms = abs(other_driver_current_data.lap_time_personal_best.to_milliseconds() - player_current_data.lap_time_personal_best.to_milliseconds())
					
					self.drivers[car_index].delta_to_player = Time(ms_part=delta_to_player_in_ms)
			else:
				player_delta_to_race_leader = Time(minutes_part=player_lap_data.delta_to_race_leader_minutes_part, ms_part=player_lap_data.delta_to_race_leader_ms_part)
				other_driver_delta_to_race_leader = Time(minutes_part=lap_data.delta_to_race_leader_minutes_part, ms_part=lap_data.delta_to_race_leader_ms_part)

				delta_to_player_in_ms = abs(other_driver_delta_to_race_leader.to_milliseconds() - player_delta_to_race_leader)

				self.drivers[car_index].delta_to_player = Time(ms_part=delta_to_player_in_ms)

			# Update other driver details
			self.drivers[car_index].position = lap_data.car_position
			self.drivers[car_index].lap_time_current = Time(ms_part=lap_data.current_lap_time_in_ms)
			self.drivers[car_index].lap_time_current_invalid = bool(lap_data.current_lap_invalid)
			
			self.drivers[car_index].pit_status = PitStatus(lap_data.pit_status).name
			self.drivers[car_index].penalty_seconds = lap_data.penalties
			self.drivers[car_index].driver_status = DriverStatus(lap_data.driver_status).name

			# Update personal best if previous lap was faster
			driver_current_personal_best_in_ms = self.drivers[car_index].lap_time_personal_best.to_milliseconds()

			if 0 < lap_data.last_lap_time_in_ms < driver_current_personal_best_in_ms or driver_current_personal_best_in_ms == 0:
				self.drivers[car_index].lap_time_personal_best = Time(ms_part=lap_data.last_lap_time_in_ms)

	def get_driver_by_position(self, car_position: int):
		return next(
			(driver for driver in self.drivers.values() if driver.position == car_position),
			None
		)