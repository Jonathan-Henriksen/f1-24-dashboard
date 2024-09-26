from .mongo_client import MongoDBClient as client

_COLLECTION_NAME = "drivers"

class DriversClient:
    
    @staticmethod
    def insert_or_update(session_id: int, car_index: int, values: dict):
        collection = client.get_collection(_COLLECTION_NAME)

        filter = {'sessionId': str(session_id), 'carIndex': car_index}

        update = {
            "$set": values,
            "$setOnInsert" : {
                'sessionId' : str(session_id),
                'carIndex' : car_index
            }
        }

        return collection.update_one(filter, update, upsert=True)

    @staticmethod
    def find_one(session_id: int, query: dict):
        collection = client.get_collection(_COLLECTION_NAME)

        query['sessionId'] = session_id

        result = collection.find_one(query)
        return result

    @staticmethod
    def find(session_id: int, query: dict = {}):
        collection = client.get_collection(_COLLECTION_NAME)

        query['sessionId'] = session_id

        return collection.find(query)