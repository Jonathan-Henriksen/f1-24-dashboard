from typing import Dict

from .common import Time
from telemetry.enums import Teams, PitStatus, DriverStatus, TyreCompoundsVisual
from telemetry.packets import ParticipantsPacket, LapDataPacket, TyreSetsPacket

class Driver():
	def __init__(self):
		self.position: int = 0
		self.team: str = Teams.F1_GENERIC.name
		self.name: str = ""
		self.delta_to_player: Time = Time()
		self.current_lap_invalid: bool = False
		self.pit_status: str = PitStatus.NONE.name
		self.driver_status: str = DriverStatus.IN_GARAGE.name
		self.penalty_seconds: int = 0
		self.tyre_compound: str = ""
		self.is_player: bool = False

class LeaderboardPanel():
	MILLISECONDS_IN_A_MINUTE = 60 * 1000
	def __init__(self):
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
	
			# Use get() with a fallback
			leaderboard_player = self.drivers.get(index, Driver())
	
			leaderboard_player.team = Teams(participant.team_id).name
			leaderboard_player.name = participant.name
	
			# If the player was missing, add them
			self.drivers[index] = leaderboard_player

	def update_from_lap_data_packet(self, lap_data_packet: LapDataPacket):
		player_data = lap_data_packet.player_data()

		# Total delta to race leader for the player in milliseconds
		player_delta_to_race_leader_total_ms = (
			player_data.delta_to_race_leader_ms_part + 
			(player_data.delta_to_race_leader_minutes_part * self.MILLISECONDS_IN_A_MINUTE)
		)

		for car_index in self.drivers.keys():
			if car_index == lap_data_packet.header.player_car_index:
				self.drivers[car_index].is_player = True

			other_driver = lap_data_packet.lap_data[car_index]

			# Total delta to race leader for the other driver in milliseconds
			other_driver_delta_to_race_leader_total_ms = (
				other_driver.delta_to_race_leader_ms_part + 
				(other_driver.delta_to_race_leader_minutes_part * self.MILLISECONDS_IN_A_MINUTE)
			)

			# Calculate delta to player
			other_driver_delta_to_player = abs(other_driver_delta_to_race_leader_total_ms - player_delta_to_race_leader_total_ms)

			self.drivers[car_index].delta_to_player = Time(ms_part=other_driver_delta_to_player)

			# Update other driver details
			self.drivers[car_index].position = other_driver.car_position
			self.drivers[car_index].current_lap_invalid = bool(other_driver.current_lap_invalid)
			self.drivers[car_index].pit_status = PitStatus(other_driver.pit_status).name
			self.drivers[car_index].penalty_seconds = other_driver.penalties
			self.drivers[car_index].driver_status = DriverStatus(other_driver.driver_status).name