export const schema = {
    "models": {
        "Setting": {
            "syncable": true,
            "name": "Setting",
            "pluralName": "Settings",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ],
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "string",
                    "isRequired": true,
                    "attributes": []
                },
                "value": {
                    "name": "value",
                    "isArray": false,
                    "type": "string",
                    "isRequired": false,
                    "attributes": []
                }
            }
        }
    },
    "enums": {},
    "version": "143746525d423107bde2b38a05bee30a"
};