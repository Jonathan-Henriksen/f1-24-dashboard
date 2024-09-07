from typing import List

from telemetry.enums import TyreCompounds, TyreCompoundsVisual
from telemetry.packets import SessionPacket, TyreSetsPacket

class StrategyPanel():
	def __init__(self):
		self.name = "Strategy"
		self.lap_to_pit_recommended: int = 0
		self.lap_to_pit_latest: int = 0
		self.tyre_sets_current_wear_percentage: int = 0
		self.tyre_sets_current_laps_left: int = 0
		self.tyre_sets_current_compound_laps_max: int = 0
		self.tyre_sets_available: List[TyreSetInfo] = []
		self.expected_rejoin_position: int = 0
	
	def update_from_session_packet(self, session_packet: SessionPacket):
		self.lap_to_pit_recommended = session_packet.pit_stop_window_ideal_lap
		self.lap_to_pit_latest = session_packet.pit_stop_window_latest_lap
		self.expected_rejoin_position = session_packet.pit_stop_rejoin_position

	def update_from_tyre_sets_packet(self, tyre_sets_packet: TyreSetsPacket):
		if tyre_sets_packet.car_index != tyre_sets_packet.header.player_car_index:
			return
		
		# Current Tyre
		fitted_tyre_set = tyre_sets_packet.tyre_sets[tyre_sets_packet.fitted_index]

		self.tyre_sets_current_wear_percentage = fitted_tyre_set.wear
		self.tyre_sets_current_laps_left = fitted_tyre_set.num_of_laps_left
		self.tyre_sets_current_compound_laps_max = fitted_tyre_set.num_of_laps_max

		# Available Tyres
		self.tyre_sets_available.clear()

		for tyre_set in tyre_sets_packet.tyre_sets:
			if tyre_set.fitted or not tyre_set.available:
				continue

			tyre_set_info = TyreSetInfo()
			tyre_set_info.wear_percentage = tyre_set.wear
			tyre_set_info.tyre_compund = TyreCompounds(tyre_set.compound).name
			tyre_set_info.tyre_compund_visual = TyreCompoundsVisual(tyre_set.compound_visual).name
			tyre_set_info.num_of_laps_left = tyre_set.num_of_laps_left
			tyre_set_info.num_of_laps_max = tyre_set.num_of_laps_max

			self.tyre_sets_available.append(tyre_set_info)

class TyreSetInfo():
	def __init__(self):
		self.wear_percentage: int = 0
		self.tyre_compund: str = TyreCompounds.C3.name
		self.tyre_compund_visual: str = TyreCompoundsVisual.MEDIUM.name
		self.num_of_laps_left: int = 0
		self.num_of_laps_max: int = 0