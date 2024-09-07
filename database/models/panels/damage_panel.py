from telemetry.packets import CarDamagePacket

class DamagePanel():
	def __init__(self):
		self.name = "Damage"
		self.wing_front_left: int = 0
		self.wing_front_right: int = 0
		self.wing_rear: int = 0
		self.floor: int = 0
		self.diffuser: int = 0
		self.sidepod: int = 0
		self.gearbox: int = 0
		self.engine: int = 0
		self.ers_fault: bool = False
	
	def update_from_car_damage_packet(self, car_damage_packet: CarDamagePacket):
		player_data = car_damage_packet.player_data()

		self.wing_front_left = player_data.wing_front_left_damage
		self.wing_front_right = player_data.wing_front_right_damage
		self.wing_rear = player_data.wing_rear_damage

		self.floor = player_data.floor_damage
		self.diffuser = player_data.diffuser_damage
		self.sidepod = player_data.sidepod_damage
		self.gearbox = player_data.gearbox_damage
		self.engine = player_data.engine_damage

		self.ers_fault = bool(player_data.ers_fault)