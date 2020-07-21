# MOM - Javascript implementation

Javascript implementation of the MOM (My Own Messages) standard, an easy and cost effective Ethereum standard to give voice to your smart contract, send messages to the world, create a certified blog with your ideas, and so on.

See [ERCXXX](#) (_will be submitted soon_).

## MOM v1.0 - List of supported messages

| OPERATION | HEX CODE  | PARAMETERS | MEANING 			|
|--------|:------------:|------------|-------------------|
| ADD | 00       | multihash  | Add a message. The parameter is the multihash of the content. Content default is Markdown text in UTF8 without BOM |
| DELETE | 01	   | multihash | Delete a message identified by the specified multihash. This does not delete a message from the blockchain, just tell clients to hide because it's not valid anymore for some reason. Think it like: I changed my mind so please ÐApps don't show this anymore, unless expressly asked by the user of course, and if the content is still available and shared by someone, of course (it's very likely that deleted messages are not shared anyore by the author). |
| UPDATE | 02       | multihash, multihash | Update a message. The first parameter is the message to be updated. The second parameter is the multihash of the updated message |
| REPLY | 03       | multihash, multihash | Reply to a message. The first parameter is the message to reply to. The second parameter is the multihash of the message
| ENDORSE | 04	   | multihash | Endorse a message identified by the specified multihash. Think it as a "like", a "retwitt", etc. |
| DISAPPROVE | 05  | multihash | Disapprove a message identified by the specified multihash. Think it as a "I don't like it" |
| CLOSE ACCOUNT | FD | multihash | "Close the account" or "Never consider valid any other MOM messages sent by this account from now on.". This is  useful when you want to change account, especially when the private key is compromised - or you think it is. The multihash parameter is an optional file with motivations |
| CUSTOM | FE	   | any | Custom MOM specifications
| RAW | FF	   | any | Raw content, no need to disclose the meaning. General client can ignore it.

![Node.js Package](https://github.com/InternetOfPeers/mom/workflows/Node.js%20Package/badge.svg)

## How to use MOM

Install the package with:

```bash
$ npm install @internetofpeers/mom
```
Then in your Javascript file use something like this:

```javascript
// example
const mom = require("@internetofpeers/mom");
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



## Project's rationales (WIP)

My Own Messages
"Just say it to MOM"

Create your Ethereum account dedicated to your personal messages
Spread your words to the world
Follow other

And do it all by yourself

How MOM can help me?

You can send messages to users of your ÐApp or Smart Contract, and they always know it is a voice reliable as the smart contract is.
Say once, show everywhere. Say something only once, it can be seen on every social platform (no more reply of the same post/opinion on dozens of sites like reddit, twitter, facebook, medium, disquis, and so on...)

Verificable and decentralized content

Small fee to be free: pay just few cents of dollar to notarize your messages, and distribute them with IPFS or Swarm.

Get tips for your words directly into your wallet.


And I want to spend less gas as possible, so MOM transactions acts like this:

- `from`: `MUST` be the tx signer
- `to`: `MUST` be the tx signer
- `value`: `MUST` be 0 wei
- `data`: `MUST` be at least 1 byte. First byte is the code for operation. Then it comes the content.

Why [multihash](https://github.com/multiformats/multihash)? Because it is flexible, future-proof and there are already a tons of library supporting it.

### Don't like default specifications, just choose yours
FE - Define your own specification. If you encounter FE again, you read the next byte to know the message type, and so on..
If you find FE it means user want to define it's own MOM specifications and meaning.

#### MOM Smart Contract - V1 specification, list of codes, ecc
If you don't like the standard code list, you need to deploy the specification that works for yourself. You can use the MOM Factory (WIP) if you prefer, but it's not mandatory.

## How to contribute to the MOM standard
Just send a pull request and it will be evaluated.

### Dealing with line endings
Please respect the current line endings strategy. See [Configuring Git to handle line endings](https://help.github.com/en/articles/dealing-with-line-endings) for more details.

### VSCode plugins
Development of this code is done with VSCode and in particular some plugins affect the formatting of the source code:
- Beautify ([hookyqr.beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify))
- ESLint ([dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint))
- EditorConfig for VS Code ([editorconfig.editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig))
