export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "phototranslate1a58bd43": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "AppClientSecret": "string"
        }
    },
    "predictions": {
        "identifyText360eb9c4": {
            "region": "string",
            "format": "string"
        },
        "translateTextd8fbec95": {
            "region": "string",
            "sourceLang": "string",
            "targetLang": "string"
        },
        "identifyEntitiesd04d1d1d": {
            "region": "string",
            "celebrityDetectionEnabled": "string",
            "maxEntities": "string"
        },
        "identifyLabelsdff85f2a": {
            "region": "string",
            "type": "string"
        },
        "speechGenerator3e6f2f09": {
            "region": "string",
            "language": "string",
            "voice": "string"
        }
    },
    "api": {
        "ionicpredictions": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    }
}