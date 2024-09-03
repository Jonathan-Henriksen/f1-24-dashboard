from telemetry.enums import TyreCompounds, TyreCompoundsVisual
from telemetry.packets import *

class TyresPanel():
	def __init__(self):
		self.tyre_compound: str = TyreCompounds.C3.name
		self.tyre_compound_visual: str = TyreCompoundsVisual.MEDIUM.name
		self.tyre_front_left: Tyre = Tyre()
		self.tyre_front_right: Tyre = Tyre()
		self.tyre_rear_left: Tyre = Tyre()
		self.tyre_rear_right: Tyre = Tyre()
		self.tyre_set_laps_age: int = 0
		self.tyre_set_laps_max: int = 0
		self.tyre_set_laps_remaining: int = 0
	
	def update_from_car_telemetry_packet(self, car_telemetry_data: CarTelemetryPacket):

		player_car_telemetry = car_telemetry_data.player_data()

		# Front Left
		self.tyre_front_left.temperature_surface = player_car_telemetry.tyres_front_left_temperature_surface
		self.tyre_front_left.temperature_carcass = player_car_telemetry.tyres_front_left_temperature_inner
		self.tyre_front_left.pressure_psi = player_car_telemetry.tyres_front_left_pressure
		self.tyre_front_left.temperature_brakes = player_car_telemetry.brakes_front_left_temperature

		# Front Right
		self.tyre_front_right.temperature_surface = player_car_telemetry.tyres_front_right_temperature_surface
		self.tyre_front_right.temperature_carcass = player_car_telemetry.tyres_front_right_temperature_inner
		self.tyre_front_right.pressure_psi = player_car_telemetry.tyres_front_right_pressure
		self.tyre_front_right.temperature_brakes = player_car_telemetry.brakes_front_right_temperature
		
		# Rear Left
		self.tyre_rear_left.temperature_surface = player_car_telemetry.tyres_rear_left_temperature_surface
		self.tyre_rear_left.temperature_carcass = player_car_telemetry.tyres_rear_left_temperature_inner
		self.tyre_rear_left.pressure_psi = player_car_telemetry.tyres_rear_left_pressure
		self.tyre_rear_left.temperature_brakes = player_car_telemetry.brakes_rear_left_temperature

		# Rear Right
		self.tyre_rear_right.temperature_surface = player_car_telemetry.tyres_rear_right_temperature_surface
		self.tyre_rear_right.temperature_carcass = player_car_telemetry.tyres_rear_right_temperature_inner
		self.tyre_rear_right.pressure_psi = player_car_telemetry.tyres_front_right_pressure
		self.tyre_rear_right.temperature_brakes = player_car_telemetry.brakes_rear_right_temperature             
	
	def update_from_car_status_packet(self, car_status_packet: CarStatusPacket):
		player_car_status = car_status_packet.player_data()

		self.tyre_compound = TyreCompounds(player_car_status.tyre_compound).name
		self.tyre_compound_visual = TyreCompoundsVisual(player_car_status.tyre_compound_visual).name
		self.tyre_set_laps_age = player_car_status.tyre_age_laps
	
	def update_from_car_damage_packet(self, car_damage_packet: CarDamagePacket):
		player_car_damage = car_damage_packet.player_data()

		self.tyre_front_left.wear_percentage = player_car_damage.tyres_front_left_wear
		self.tyre_front_right.wear_percentage = player_car_damage.tyres_front_right_wear
		self.tyre_rear_left.wear_percentage = player_car_damage.tyres_rear_left_wear
		self.tyre_rear_right.wear_percentage = player_car_damage.tyres_rear_right_wear

	def update_from_tyre_sets_packet(self, tyre_sets_packet: TyreSetsPacket):
		if tyre_sets_packet.car_index != tyre_sets_packet.header.player_car_index:
			return
		
		fitted_tyre_set = tyre_sets_packet.tyre_sets[tyre_sets_packet.fitted_index]

		self.tyre_compound = TyreCompounds(fitted_tyre_set.compound).name
		self.tyre_compound_visual = TyreCompoundsVisual(fitted_tyre_set.compound_visual).name
		self.tyre_set_laps_remaining = fitted_tyre_set.num_of_laps_left
		self.tyre_set_laps_max = fitted_tyre_set.num_of_laps_max

class Tyre():
	def __init__(self):
		self.temperature_carcass = 0
		self.temperature_surface = 0
		self.temperature_brakes = 0
		self.pressure_psi = 0
		self.wear_percentage = 0