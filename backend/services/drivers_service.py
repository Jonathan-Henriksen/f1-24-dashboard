from database import DriversClient as drivers
from telemetry.packets import CarStatusPacket, LapDataPacket, ParticipantsPacket, SessionPacket, SessionHistoryPacket, TyreSetsPacket
from telemetry.enums import DriverStatus, Nationalities, PitStatus, Teams, TyreCompounds, TyreCompoundsVisual, FiaFlags

class DriversService:

	@staticmethod
	def find_one(session_id: int, query: dict):
		return drivers.find_one(session_id, query)
	
	@staticmethod
	def find(session_id: int, query: dict = {}):
		return drivers.find(session_id, query)

	@staticmethod
	def update_from_car_status_packet(packet: CarStatusPacket):
		for car_index, driver in enumerate(packet.car_status_list):
			drivers.insert_or_update(packet.header.session_uid, car_index, {
				'vehicleFiaFlags' : FiaFlags(driver.vehicle_fia_flags).name
			})

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
		if (packet.num_laps <= 1):
			return
		
		completed_laps = packet.lap_history_list[:packet.num_laps-1]

		best_sector_1_lap = packet.lap_history_list[packet.best_sector_1_lap_num]
		best_sector_2_lap = packet.lap_history_list[packet.best_sector_2_lap_num]
		best_sector_3_lap = packet.lap_history_list[packet.best_sector_3_lap_num]
		best_lap = packet.lap_history_list[packet.best_sector_1_lap_num]

		drivers.insert_or_update(packet.header.session_uid, packet.car_index, {
			'personalBest' : {
				'sector1' : sum(best_sector_1_lap.sector_1_time_ms_part + best_lap.sector_1_time_minutes_part * 60 * 1000),
				'sector2' : sum(best_sector_2_lap.sector_2_time_ms_part + best_lap.sector_2_time_minutes_part * 60 * 1000),
				'sector3' : sum(best_sector_3_lap.sector_3_time_ms_part + best_lap.sector_3_time_minutes_part * 60 * 1000),
				'lap' : packet.lap_history_list[packet.best_lap_time_lap_num].lap_time_in_ms,
			},
			'personalAverage' : {
				'sector1' : sum((lap.sector_1_time_ms_part + lap.sector_1_time_minutes_part * 60 * 1000) for lap in completed_laps) / len(completed_laps),
				'sector2' : sum((lap.sector_2_time_ms_part + lap.sector_2_time_minutes_part * 60 * 1000) for lap in completed_laps) / len(completed_laps),
				'sector3' : sum((lap.sector_3_time_ms_part + lap.sector_3_time_minutes_part * 60 * 1000) for lap in completed_laps) / len(completed_laps),
				'lap' : sum(lap.lap_time_in_ms for lap in completed_laps) / len(completed_laps)
			},
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
				'lapTimePrevious' : driver.last_lap_time_in_ms,
				'currentLap' : {
					'number' : driver.current_lap_num,
					'distance' : driver.lap_distance if driver.lap_distance >= 0 else 0,
					'activeSector' : driver.sector + 1, # 0 == 1, 1 == 2, etc.
					'sector1' : driver.sector1_time_ms_part + (driver.sector1_time_minutes_part * 60 * 1000),
					'sector2' : driver.sector2_time_ms_part + (driver.sector2_time_minutes_part * 60 * 1000),
					'sector3' : driver.current_lap_time_in_ms if driver.sector == 2 else 0,
					'lapTime' : driver.current_lap_time_in_ms,
					'invalidated' :bool(driver.current_lap_invalid),
				}			
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