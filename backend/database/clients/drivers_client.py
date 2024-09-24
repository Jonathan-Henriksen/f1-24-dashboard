from .mongo_client import MongoDBClient

_COLLECTION_NAME = "drivers"

class DriversClient:
    @staticmethod
    def update_or_insert(session_id: int, car_index: int, values: dict):
        collection = MongoDBClient.get_collection(_COLLECTION_NAME)

        filter = {'sessionId': str(session_id), 'carIndex': car_index}

        values["sessionId"] = str(session_id)
        values["carIndex"] = car_index
        
        new_values = {"$set": values}

        return collection.update_one(filter, new_values, upsert=True)

    @staticmethod
    def find(session_id: int, query: dict):
        collection = MongoDBClient.get_collection(_COLLECTION_NAME)

        query['sessionId'] = session_id

        return collection.find_one(query)