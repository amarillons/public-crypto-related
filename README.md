# public-crypto-related
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
- 現在のところ、raw transaction を生成して、transaction の内容をテストする　という部分まで入っています。
- raw transaction に署名して infura 等で送る部分は、将来的に追記予定。
