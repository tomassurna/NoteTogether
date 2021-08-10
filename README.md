# NoteTogether

Wentworth Institute of Technology Computer Science Capstone Project

## Introduction

NoteTogether seeks to bring interactivity to a very crucial aspect of online learning: consuming video media. We developed a hybrid distributed web application that provides a shared space for watching and annotating video media. Analytics are provided to all users to highlight how users are interacting with a video. NoteTogether utilizes Ethereum Blockchain to ensure data security and scalability by offloading data storage and processing requirements to the distributed Ethereum network.

## Active Instance:

https://notetogether.azurewebsites.net/

## Features

- Manage a user account

  - Use a MetaMask login to record notes and upload media

- Manage Media

  - View media using a corresponding link
  - Upload media and share links with other users

- Manage their notes

  - Take notes that will be sorted by timestamp as well as view other user’s notes

  - View notes in both static and dynamic notes depending on the user’s preference

- View video usage analytics

  - Note distribution seperated by tag

  - Note and viewership heatmap

## Getting Started (Ropsten Test Network)

### Installation and Setup

1. Clone repository locally and navigate into the `src/client/` folder, then run:

   ```bash
   npm install
   ```

2. Navigate to the `/NoteTogether/` folder, then run:

   ```bash
   npm install -g truffle

   npm install @truffle/hdwallet-provider

   npm install -g ganache-cli
   ```

3. Navigate to https://infura.io and create an account. Once done navigate to the Dashboard and create a new project.

4. Find the project id and endpoint.

   ![Infura Keys](/images/Infura_Project_Info.png)

5. Navigate to `src/notetogether/truffle-config.js` and update line 65 to be the same Ropsten endpoint infura gives you.

   ![Truffle Config](/images/Truffle-Config-Ropsten-URL.png)

6. Navigate to `src/client/src/config.js` and update the `projectId` to be the project id from Infura.

   ![Config JS](/images/Config-Project-Id.PNG)

7. Navigate to `/NoteTogether/` and create a `.secret` file. Inside the file paste the tweleve word secrets for your Ethereum Ropsten account. For info on finding the see phrase see: https://metamask.zendesk.com/hc/en-us/articles/360015290032-How-to-Reveal-Your-Seed-Phrase.

### Develop (Locally)

1.  Open a terminal and navigate to `src/notetogether/` then run: ( This may take a while )
    ```bash
    truffle migrate --network ropsten
    ```
2.  The command above will deploy the contract to Ropsten. once the deployment is complete you will see the following output. You will want to copy the contract address.

    ![Truffle Migrate Output](/images/Truffle-Migrate-Ropsten-Output.png)

3.  Navigate to and open `src/client/src/config.js`

4.  Replace the variable value of `NoteTogetherAddress` with the contract id.

        `let NoteTogetherAddress = "<YOUR CONTRACT ADDRESS>";`

5.  Replace the variable value of `appUrl` with `http://localhost:8080/`. This will point to the local kotlin server once it is running.

        `let appUrl = "http://localhost:8080/";`

6.  Replace the variable value of `serverAccountId` and `serverPrivateKey` with details of an Ethereum account that the application can charge to.

7.  Open project with IntelliJ and run using the Maven NoteTogether run configuration.

8.  The application UI will now be avaliable under http://localhost:8080/. For active development, run `npm start` under the `src/client/` to use React's development environment.

## Demo video

[![Demo Video](https://img.youtube.com/vi/edE044rYUcI/0.jpg)](https://youtu.be/UsYNkVGzFZQ)

## Contributors

- Jamie Kerr
- Tomas Surna
- Max Rioux
- Fabio Marcellus

- Advised by Professor Charlie Pham
