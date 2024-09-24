from .mongo_client import MongoDBClient

_COLLECTION_NAME = "drivers"

class SessionsClient:
    @staticmethod
    def update_or_insert(session_id: int, values: dict):
        collection = MongoDBClient.get_collection(_COLLECTION_NAME)

        filter = {'sessionId': str(session_id)}

        values["sessionId"] = str(session_id)
        
        new_values = {"$set": values}

        return collection.update_one(filter, new_values, upsert=True)

    @staticmethod
    def find(query: dict):
        collection = MongoDBClient.get_collection(_COLLECTION_NAME)

        return collection.find_one(query)