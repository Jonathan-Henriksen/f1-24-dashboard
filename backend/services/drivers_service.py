from database import DriversClient as drivers
from telemetry.packets import LapDataPacket, ParticipantsPacket, SessionPacket, SessionHistoryPacket, TyreSetsPacket
from telemetry.enums import DriverStatus, Nationalities, PitStatus, Teams, TyreCompounds, TyreCompoundsVisual

class DriversService:

	@staticmethod
	def find(session_id: int, query: dict):
		return drivers.find(session_id, query)

	@staticmethod
	def update_from_session_packet(packet: SessionPacket):
		drivers.insert_or_update(packet.header.session_uid, packet.header.player_car_index, {
			'pitStop' : {
				'lapIdeal' : packet.pit_stop_window_ideal_lap,
				'lapLatest' : packet.pit_stop_window_latest_lap,
				'rejoinPosition' : packet.pit_stop_rejoin_position
			}
		})

	@staticmethod
	def update_from_session_history_packet(packet: SessionHistoryPacket):
		drivers.insert_or_update(packet.header.session_uid, packet.car_index, {
			'lapTimeBest' : packet.lap_history_list[packet.best_lap_time_lap_num].lap_time_in_ms
		})


	@staticmethod
	def update_from_lap_data_packet(packet: LapDataPacket):
		for car_index, driver in enumerate(packet.lap_data):
			drivers.insert_or_update(packet.header.session_uid, car_index, {
				'isPlayer' : car_index == packet.header.player_car_index,
				'position' : driver.car_position,
				'gridPosition' : driver.grid_position,
				'driverStatus' : DriverStatus(driver.driver_status).name,
				'pitStatus' : PitStatus(driver.pit_status).name,
				'penaltySeconds' : driver.penalties,
				'cornerCuttingWarnings' : driver.corner_cutting_warnings,
				'totalWarnings' : driver.total_warnings,
				'lapNumber' : driver.current_lap_num,
				'lapDistance' : driver.lap_distance,
				'lapTimeCurrent' : driver.current_lap_time_in_ms,
				'lapTimeCurrentInvalid' : bool(driver.current_lap_invalid),
				'lapTimePrevious' : driver.last_lap_time_in_ms,
				
			})

	@staticmethod
	def update_from_tyre_sets_packet(packet: TyreSetsPacket):
		
		fitted_tyre_set = packet.tyre_sets[packet.fitted_index]

		available_tyre_sets = []
		for tyre_set in (tyre_set for tyre_set in packet.tyre_sets if bool(tyre_set.available)):
			available_tyre_sets.append({
				'compoundActual': TyreCompounds(tyre_set.compound).name,
				'compoundVisual': TyreCompoundsVisual(tyre_set.compound_visual).name,
				'deltaTime': tyre_set.lap_delta_time,
				'lapsLeft': tyre_set.num_of_laps_left,
				'lapsMax': tyre_set.num_of_laps_max,
				'wear': tyre_set.wear,
			})


		drivers.insert_or_update(packet.header.session_uid, packet.car_index, {
			'availableTyreSets' : available_tyre_sets,
			'currentTyreSet' : {
				'compoundActual' : TyreCompounds(fitted_tyre_set.compound).name,
				'compoundVisual' : TyreCompoundsVisual(fitted_tyre_set.compound_visual).name,
				'lapsLeft' : fitted_tyre_set.num_of_laps_left,
				'lapsMax' : fitted_tyre_set.num_of_laps_max,
				'wear' : fitted_tyre_set.wear,
			}
		})

	@staticmethod
	def update_from_participants_packet(packet: ParticipantsPacket):
		for car_index, driver in enumerate(packet.participants):
			drivers.insert_or_update(packet.header.session_uid, car_index, {
				'name' : driver.name,
				'team': Teams(driver.team_id).name,
				'raceNumber' : driver.race_number,
				'nationality' : Nationalities(driver.nationality).name,
				'isAi' : bool(driver.ai_controlled)
			})