from datetime import datetime
from .mongo_client import MongoDBClient

_COLLECTION_NAME = "drivers"

class SessionsClient:
    @staticmethod
    def update_or_insert(session_id: int, values: dict):
        collection = MongoDBClient.get_collection(_COLLECTION_NAME)

        filter = {'sessionId': str(session_id)}

        update = {
            "$set": values,
            "$setOnInsert" : {
                'sessionId' : str(session_id),
                'createdAt' : datetime.now()
            }
        }

        return collection.update_one(filter, update, upsert=True)

    @staticmethod
    def find(query: dict, sortList: list = None):
        collection = MongoDBClient.get_collection(_COLLECTION_NAME)

        if sortList is None:
            return collection.find_one(query)
        
        return collection.find_one(query, sort=sortList)