from database.clients import DriversClient as drivers
from telemetry.packets import CarStatusPacket, LapDataPacket, ParticipantsPacket, TyreSetsPacket
from telemetry.enums import DriverStatus, Nationalities, PitStatus, Teams, TyreCompounds, TyreCompoundsVisual

class DriverService:

	@staticmethod
	def update_from_car_status_packet(packet: CarStatusPacket):
		for car_index, driver in enumerate(packet.car_status_list):
			drivers.update_or_insert(packet.header.session_uid, car_index, {
				'currentTyreSet' : {
					'lapsAge' : driver.tyre_age_laps,
					'compoundActual' : TyreCompounds(driver.tyre_compound).name,
					'compoundVisual' : TyreCompoundsVisual(driver.tyre_compound_visual).name
				}
			})

	@staticmethod
	def update_from_lap_data_packet(packet: LapDataPacket):
		for car_index, driver in enumerate(packet.lap_data):
			drivers.update_or_insert(packet.header.session_uid, car_index, {
				'isPlayer' : car_index == packet.header.player_car_index,
				'position' : driver.car_position,
				'gridPosition' : driver.grid_position,
				'lapNumber' : driver.current_lap_num,
				'lapDistance' : driver.lap_distance,
				'totalWarnings' : driver.total_warnings,
				'cornerCuttingWarnings' : driver.corner_cutting_warnings,
				'lapTimes' : {
					'current' : driver.current_lap_time_in_ms,
					'currentIsInvalid' : bool(driver.current_lap_invalid),
					'previous' :driver.last_lap_time_in_ms,
				},
				'driverStatus' : DriverStatus(driver.driver_status).name,
				'pitStatus' : PitStatus(driver.pit_status).name,
				'penaltySeconds' : driver.penalties
			})

	@staticmethod
	def update_from_tyre_sets_packet(packet: TyreSetsPacket):
		
		fitted_tyre_set = packet.tyre_sets[packet.fitted_index]

		available_tyre_sets = []
		for tyre_set in (tyre_set for tyre_set in packet.tyre_sets if bool(tyre_set.available)):
			available_tyre_sets.append({
				'compoundActual': TyreCompounds(tyre_set.compound).name,
				'compoundVisual': TyreCompoundsVisual(tyre_set.compound_visual).name,
				'lapsLeft': tyre_set.num_of_laps_left,
				'lapsMax': tyre_set.num_of_laps_max,
				'lapDeltaTime': tyre_set.lap_delta_time,
				'wear': tyre_set.wear,
			})


		drivers.update_or_insert(packet.header.session_uid, packet.car_index, {
			'currentTyreSet' : {
				'lapsLeft' : fitted_tyre_set.num_of_laps_left,
				'lapsMax' : fitted_tyre_set.num_of_laps_max,
				'wear' : fitted_tyre_set.wear,
			},
			'availableTyreSets' : available_tyre_sets
		})

	@staticmethod
	def update_from_participants_packet(packet: ParticipantsPacket):
		for car_index, driver in enumerate(packet.participants):
			drivers.update_or_insert(packet.header.session_uid, car_index, {
				'name' : driver.name,
				'team': Teams(driver.team_id).name,
				'raceNumber' : driver.race_number,
				'nationality' : Nationalities(driver.nationality).name,
				'isAi' : bool(driver.ai_controlled)
			})