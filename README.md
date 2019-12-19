# CatHouse

This is a Super CatHouse - platform based on Ethereum smart contacts, where you can ask strangers to donate money for cat food.  

![](https://media.giphy.com/media/JRE3AvLsSRXg360F6l/giphy.gif)

This smart contract solution was created by using:
* React.js
* Solidity
* Web3.js


### How to run the project?
1. First, you will need to install nodejs to your device (you can check the version by running `$ node -v`). Then you will have to install Truffle Framework:  
`$ npm install -g truffle@5.0.5`.
2. Make sure that Ganache server is running.
3. Install all node dependencies by running: `$ npm install` inside the project's man dir.
4. Compile Solidity part of the project: `$ truffle compile`.
5. Migrate contract: `$ truffle migrate`.
6. Now deploy the contract to the network:
* `$ truffle console`
* `cathouse = await Cathouse.deployed()` (inside the console)
7. To make sure that everything is working, run tests: `$ truffle test`
8. Finally, run migrations again: `$ truffle migrate --reset`
9. Start the client server: `$ npm run start`

You will also need to configure [MetaMask](https://metamask.io/) and connect your account to the network.
