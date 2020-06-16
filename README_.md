# public-crypto-related
Node.js 関連の公開リポジトリ

### テストについて

- Jest を使ったテストをしています。
- *.test.js がテストファイルです。
- 自動テストは、CircleCI でプッシュ時に `npm run test` を実行するようにしています。
- 環境変数は、constants.js にまとめ、CircleCI からテスト実行時に指定するようにしています。
　https://circleci.com/docs/ja/2.0/env-vars/
