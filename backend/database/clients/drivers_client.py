from mongo_client import MongoDBClient

_COLLECTION_NAME = "drivers"

class DriversClient:
    @staticmethod
    def insert(car_index, driver_data: dict):
        collection = MongoDBClient.get_collection(_COLLECTION_NAME)
        driver_data["car_index"] = car_index
        return collection.insert_one(driver_data).inserted_id

    @staticmethod
    def update(car_index: int, values: dict):
        collection = MongoDBClient.get_collection(_COLLECTION_NAME)
        filter = {'car_index': car_index}
        new_values = {"$set": values}
        return collection.update_one(filter, new_values)

    @staticmethod
    def find(query: dict):
        collection = MongoDBClient.get_collection(_COLLECTION_NAME)
        return collection.find_one(query)