# Amplify Predictions PWA

An Ionic app that uses [AWS Amplify Predictions](https://aws-amplify.github.io/docs/js/predictions) AI/ML services to:

- Identify and Translate Text from an image using Amazon Transcribe
- Identify Entities, Faces of Celebrities from an image using Amazon Rekognition
- Identify and Label Entities in an image using Amazon Rekognition

<div style="text-align:center;">

![Demo Gif](./demo.gif)

</div>

## Requirements

- Amplify CLI `npm i -g @aws-amplify/cli`
- Ionic `npm i -g ionic`
- [AWS Account](https://aws-amplify.github.io/docs/)

## Setup

From the root of the project, run:

```bash
$ npm i -g @aws-amplify/cli
$ npm install
$ amplify init
```

Choose a name for your environment i.e. "dev", then run `amplify push` to create the backend, then run `npm start` to serve the application.