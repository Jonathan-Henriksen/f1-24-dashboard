from pymongo import MongoClient

class MongoDBClient:
    _client = None
    _db = None

    @classmethod
    def _get_client(cls):
        if cls._client is None:
            cls._client = MongoClient("mongodb://root:example@localhost:27017/")
            cls._db = cls._client["sessions"]
        return cls._db

    @classmethod
    def get_collection(cls, collection_name):
        db = cls._get_client()
        return db[collection_name]