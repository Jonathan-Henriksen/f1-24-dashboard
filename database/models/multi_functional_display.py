from .panels import *
from typing import Union

from telemetry.packets import *
from telemetry.enums import SafetyCarTypes, SafetyCarStatus, PitStatus, FiaFlags, SessionTypes

class MultiFunctionDisplay:
	def __init__(self):
		self.active_panel_index: int = 0
		self.current_lap_invalid: bool = False
		self.drs_activation_distance: int = 0
		self.fia_flags: str = FiaFlags.NONE.name
		self.safety_car_type: str = SafetyCarTypes.NONE.name
		self.safety_car_status: str = SafetyCarStatus.RESUME_RACE.name
		self.pit_speed_limit: int = 0
		self.pit_status: str = PitStatus.NONE.name
		self.session_type: str = ""
		self.player: Driver = Driver()
		self.panels = [
			TimingsPanel(),
			TyresPanel(),
			StrategyPanel(),
			LeaderboardPanel(),		
			WeatherPanel(),
			DamagePanel()
		]

	# Getter Functions
	def timings_panel(self) -> TimingsPanel:
		return self.panels[0]

	def tyres_panel(self) -> TyresPanel:
		return self.panels[1]

	def strategy_panel(self) -> StrategyPanel:
		return self.panels[2]

	def leaderboard_panel(self) -> LeaderboardPanel:
		return self.panels[3]

	def weather_panel(self) -> WeatherPanel:
		return self.panels[4]

	def damage_panel(self) -> DamagePanel:
		return self.panels[5]

	def active_panel(self) -> Union[DamagePanel, LeaderboardPanel, StrategyPanel, TimingsPanel, TyresPanel, WeatherPanel]:
		return self.panels[self.active_panel_index]

	# Panel Navigation
	def navigate_left(self):
		if self.active_panel_index == 0:
			self.active_panel_index = len(self.panels) - 1
		else:
			self.active_panel_index -= 1

	def navigate_right(self):
		if self.active_panel_index == (len(self.panels) - 1):
			self.active_panel_index = 0
		else:
			self.active_panel_index += 1

	# Safety Car Event
	def update_from_safety_car_event(self, event: SafetyCarEvent):
		self.safety_car_type = SafetyCarTypes(event.safety_car_type).name
		self.safety_car_status = SafetyCarStatus(event.event_type).name

	# Fastest Lap Event
	def update_from_fastest_lap_event(self, event: FastestLapEvent):
		fastest_lap_driver = self.leaderboard_panel().drivers.get(event.vehicle_index)

		self.timings_panel().update_from_fastest_lap_event(fastest_lap_driver)

	# Lap Data Packet
	def update_from_lap_data_packet(self, lap_data_packet: LapDataPacket):
		player_data = lap_data_packet.player_data()

		self.pit_status = PitStatus(player_data.pit_status).name
		self.current_lap_invalid = bool(player_data.current_lap_invalid)

		self.leaderboard_panel().update_from_lap_data_packet(lap_data_packet, self.session_type)

		self.player = self.leaderboard_panel().get_driver_by_position(player_data.car_position)

		if self.player:
			teammate = next(driver for driver in self.leaderboard_panel().drivers.values() if driver.team == self.player.team and not driver.is_player)

			driver_lead = self.leaderboard_panel().get_driver_by_position(1) if self.player.position != 1 else None
			driver_in_front = self.leaderboard_panel().get_driver_by_position(player_data.car_position - 1) if self.player.position > 2 else None
			driver_behind = self.leaderboard_panel().get_driver_by_position(player_data.car_position + 1)

		self.timings_panel().update_from_lap_data(lap_data_packet, self.player, teammate, driver_lead, driver_in_front, driver_behind)

	## Car Damage Packet
	def update_from_car_damage_packet(self, car_damage_packet: CarDamagePacket):
		self.damage_panel().update_from_car_damage_packet(car_damage_packet)
		self.tyres_panel().update_from_car_damage_packet(car_damage_packet)

	## Car Status Packet
	def update_from_car_status_packet(self, car_status_packet: CarStatusPacket):
		player_data = car_status_packet.player_data()

		self.fia_flags = FiaFlags(player_data.vehicle_fia_flags).name
		self.drs_activation_distance = player_data.drs_activation_distance

		self.tyres_panel().update_from_car_status_packet(car_status_packet)

	## Car Telemetry Packet
	def update_from_car_telemetry_packet(self, car_telemetry_packet: CarTelemetryPacket):
		self.tyres_panel().update_from_car_telemetry_packet(car_telemetry_packet)

	def update_from_participants_packet(self, participants_packet: ParticipantsPacket):
		self.leaderboard_panel().update_from_participants_packet(participants_packet)

	## Session Packet
	def update_from_session_packet(self, session_packet: SessionPacket):
		self.pit_speed_limit = session_packet.pit_speed_limit
		self.session_type = SessionTypes(session_packet.session_type).name

		self.timings_panel().update_from_session_packet(session_packet)
		self.weather_panel().update_from_session(session_packet)

	# Tyre Sets Packet
	def update_from_tyre_sets_packet(self, tyre_sets_packet: TyreSetsPacket):
		self.tyres_panel().update_from_tyre_sets_packet(tyre_sets_packet)
		self.leaderboard_panel().update_from_tyre_sets_packet(tyre_sets_packet)
		self.strategy_panel().update_from_tyre_sets_packet(tyre_sets_packet)