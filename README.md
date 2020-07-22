# Javascript implementation of the MOM standard

![Node.js Package](https://github.com/InternetOfPeers/mom-js/workflows/Node.js%20Package/badge.svg)

Javascript implementation of the MOM (My Own Messages) standard, an easy and cost effective Ethereum standard to give voice to your smart contract, send messages to the world, create a certified blog with your ideas, and so on.

## How to use mom-js

Install the package with:

```bash
$ npm install @internetofpeers/mom-js
```
Then use something like this:

```javascript
// example
const mom = require("@internetofpeers/mom-js");
const multihashes = require("multihashes");
//...
let senderAddress = "0x....";
let messageHash = "QmbHQieckNGj2KwBhpzkGSLDgezGnArL6eeuvb87YLX665";
let multihash = multihashes.fromB58String(messageHash);
let addTransacion = mom.createAddTransaction("0x", multihash);
//...
```

Check the [MOM client](https://github.com/InternetOfPeers/mom-client.git) example to develop your own _MOM-enabled_ ÐApp:

```bash
$ git clone https://github.com/InternetOfPeers/mom-client.git
$ cd mom-client
$ npm install
$ npm start
```
Or, with a more classic client-server approach, you can obtain and use the latest version of MOM client directly from the [GitHub's servers](https://internetofpeers.github.io/mom-client).

MOM does not need smart contracts, so it is already available on every current and future Ethereum network (mainnet, rinkeby, kovan, ecc.): just choose the one for you and you are ready to go.

### Dealing with line endings
Please respect the current line endings strategy. See [Configuring Git to handle line endings](https://help.github.com/en/articles/dealing-with-line-endings) for more details.

### VSCode plugins
Development of this code is done with VSCode and in particular some plugins affect the formatting of the source code:
- Beautify ([hookyqr.beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify))
- ESLint ([dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint))
- EditorConfig for VS Code ([editorconfig.editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig))
