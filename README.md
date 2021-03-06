# public-crypto-related

[![CircleCI](https://circleci.com/gh/amarillons/public-crypto-related/tree/develop.svg?style=svg)](https://circleci.com/gh/amarillons/public-crypto-related/tree/develop)

Node.js 関連の公開リポジトリ

### テストについて

- Jest を使ったテストをしています。
- *.test.js がテストファイルです。
- 自動テストは、CircleCI でプッシュ時に `npm run test` を実行するようにしています。
- 環境変数は、[constants.js](https://github.com/amarillons/public-crypto-related/blob/master/constants.js) にまとめ、CircleCI からテスト実行時に指定するようにしています。
　https://circleci.com/docs/ja/2.0/env-vars/

### CI について

- CircleCI を使っています。
- 設定ファイルは、.circleci/config.yml にあります。
- master に、テストをパスすることを protection rule として設定しています。

### 動作について
- `$ npm install`
- `$ nodemon index.js`
- トークンを送るには、[`/send_token`](https://github.com/amarillons/public-crypto-related/blob/a5e05b3fe892b9272e73017c8bdf900d3514b44c/index.js#L79) に次のような body の POST リクエストを送ります。
[該当箇所](https://github.com/amarillons/public-crypto-related/blob/a5e05b3fe892b9272e73017c8bdf900d3514b44c/index.js#L79)
```
    { to_address: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
     token_address: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      amount_decimal: '0.12345678' }
```
- トークンを送るときは、Ethereum メインネットではなくて Rinkeby testnet で送信します。
- トークン送信以外にも、[`/balance`](https://github.com/amarillons/public-crypto-related/blob/a5e05b3fe892b9272e73017c8bdf900d3514b44c/index.js#L67) でトークン残高取得、[`/new_address`](https://github.com/amarillons/public-crypto-related/blob/a5e05b3fe892b9272e73017c8bdf900d3514b44c/index.js#L59) で新規アドレス生成ができるようになっています。
- raw transaction に署名して infura のノード経由で送信します。

### 使用技術について
- Node.js, npm
- express フレームワーク
- Ethereum: web3.js [https://web3js.readthedocs.io/en/v1.2.9/](https://web3js.readthedocs.io/en/v1.2.9/)
- Ethereum: infura [https://infura.io/](https://infura.io/)
- Jest （自動テスト）
- CircleCI (自動テスト）
- Firebase Cloud Function (GCP のサーバーレスバックエンド)


