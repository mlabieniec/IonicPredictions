# Amplify Predictions PWA

An Ionic app that uses [AWS Amplify Predictions](https://aws-amplify.github.io/docs/js/predictions) AI/ML services to:

- Identify and Translate Text from an image using Amazon Transcribe
- Identify Entities, Faces of Celebrities from an image using Amazon Rekognition
- Identify and Label Entities in an image using Amazon Rekognition
- Store locally & Sync settings with the cloud using Amplify DataStore and AWS AppSync
- PWA Splash Screen and add to home screen Icon for both iOS and Android

> This app was demoed at re:Invent 2019, here is the talk/demo: https://t.co/bPEFO9Etww?amp=1

<div style="text-align:center;">

![Demo Gif](./demo.gif)

</div>

## Requirements

- [Amplify CLI](https://docs.amplify.aws/cli/start/install/) `npm i -g @aws-amplify/cli`
- Ionic `npm i -g @ionic/cli`
- [AWS Account](https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start)

## Setup

From the root of the project, run:

```bash
$ npm i -g @aws-amplify/cli
$ amplify configure
$ cd IonicPredictions && npm install
$ amplify init
```

Choose a name for your environment i.e. "dev", then run `amplify push` to create the backend, then run `npm start` to serve the application.

## Hosting

To add hosting to your PWA:

```
$ amplify add hosting
$ amplify push
```

*Or you can connect the AWS Amplify Console and provision using git.
