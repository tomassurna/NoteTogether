# Capstone

Capstone

# NoteTogether

## Introduction

   ...

## Features

   ...

## Getting Started (Ropsten Test Network)

### Installation and Setup

1. Clone repository locally and navigate into the `/appui/` folder, then run:

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

5. Navigate to `/NoteTogether/truffle-config.js` and update line 65 to be the same Ropsten endpoint infura gives you.

   ![Truffle Config](/images/Truffle-Config-Ropsten-URL.png)

6. Navigate to `/appui/src/config.js` and update the `projectId` to be the project id from Infura.

   ![Config JS](/images/Config-Project-Id.PNG)

7. Navigate to `/NoteTogether/` and create a `.secret` file. Inside the file paste the tweleve word secrets for your Ethereum Ropsten account. For info on finding the see phrase see: https://metamask.zendesk.com/hc/en-us/articles/360015290032-How-to-Reveal-Your-Seed-Phrase.

### Run

1.  Open a terminal and navigate to `/NoteTogether/` then run: ( This may take a while )
    ```bash
    truffle migrate --network ropsten
    ```
2.  The command above will deploy the contract to Ropsten. once the deployment is complete you will see the following output. You will want to copy the contract address.

    ![Truffle Migrate Output](/images/Truffle-Migrate-Ropsten-Output.png)

3.  Navigate to and open `/appui/src/config.js`

4.  Replace the variable value of `NoteTogetherAddress` with the contract id.

        `let NoteTogetherAddress = "<YOUR CONTRACT ADDRESS>";`

5.  Navigate to `/appui/` and run

    ```bash
    npm start
    ```

6.  The application UI will now be open in your browser and connected to the smart contract. You can then input your private key to your account and start using the application.

## Demo video

...

## Contributors

...