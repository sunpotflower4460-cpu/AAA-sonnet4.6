# 残心 / Zanshin Phase 2 Audit

## 監査日

2026-05-17

## 監査対象

- README.md
- docs/concept.md
- docs/design-system.md
- docs/mvp-spec.md
- docs/development-phases.md
- .github/copilot-instructions.md

---

## 1. コンセプト監査

**判定: Needs Fix → 修正済み**

確認内容:

- ✅ アプリ名「残心 / Zanshin」が全ファイルで一致している
- ✅ 一言コンセプト「書いたあとにも、心がそこに残るメモ帳」が README.md に明記されている
- ✅ 英語訳「A note-taking app where the heart lingers, even after the writing ends.」も併記されている
- ✅ 「書く体験の余韻」を大切にするアプリとして docs/concept.md で整理されている
- ✅ 「残心」「間（ま）」「余白」の3キーワードがUI/UXの中核として説明されている
- ✅ 機能追加よりも静かに書く体験を優先する方針が明記されている
- ⚠️ README.md の海外向け表現に「Samurai-inspired calm focus」があり、テーマパーク的ニュアンスが混入していた

修正した内容:

- README.md の「Samurai-inspired calm focus」を削除し、「Write with stillness / Calm journaling」「Mindful notes / Quiet focus」に置き換えた
- コンセプトの核（余韻・静けさ）と一致する表現に統一した

---

## 2. デザイン監査

**判定: OK**

確認内容:

- ✅ 黄金比スケール `4 / 8 / 13 / 21 / 34 / 55 / 89` が明記されている
- ✅ 画面左右余白 21px、カード padding 21px、FABサイズ 55px など具体的な数値方針がある
- ✅ 7色のカラーパレットが定義されている（Washi / Sumi / Gold / Deep Indigo / Vermilion 等）
- ✅ 刀・扇・円相のモチーフが「意味」として整理されており、装飾的な扱いを避けている
- ✅ 「現代和」「静けさ」「海外にも伝わる日本的美意識」として成立している
- ✅ アニメーション方針（200ms以上、バウンド禁止、呼吸感優先）が明記されている
- ✅ iPhone-firstのデザイン原則が明記されている
- ✅ 本文行間 1.618 前後（黄金比）が指定されている

修正した内容:

- なし（デザインシステムは完成度が高く、修正不要と判断）

---

## 3. MVP範囲監査

**判定: OK**

確認内容:

- ✅ MVP必須機能（メモ一覧・作成・編集・削除・自動保存・検索・お気に入り・ローカル保存・iPhone向けUI・多言語文言）がすべて含まれている
- ✅ MVPで作らないもの（ログイン・クラウド同期・AI機能・課金・Markdown・タグ管理・共同編集・App Store申請・途中デプロイ）が明記されている
- ✅ データ構造 `Note` 型がシンプルで必要十分（id, title, body, createdAt, updatedAt, isFavorite, locale?）
- ✅ 保存処理を `lib/storage.ts` に分離する方針が明記されており、Capacitor化を邪魔しない
- ✅ 保存キー `zanshin.notes.v1` が明記されており、将来の移行に対応できる
- ✅ localStorage → IndexedDB の移行路が設計上確保されている
- ✅ Phase 3 で一気に作れる粒度のMVP（2画面構成：一覧 + エディタ）

修正した内容:

- なし（MVP仕様は適切な範囲で完成している）

---

## 4. 開発フェーズ監査

**判定: Needs Fix → 修正済み**

確認内容:

- ✅ Phase 1：README/docsに設計を入れる方針が明記されている
- ✅ Phase 2：監査のみ行う方針が明記されている
- ✅ Phase 3：初めてMVP実装する流れになっている
- ✅ Phase 3完了前はCloudflareにデプロイしないルールが明記されている
- ✅ 将来の拡張候補（Phase 4〜9）がMVPと分離されている
- ⚠️ Phase 1 のステータスが「🟢 実施中」のままになっており、Phase 2 に進んでいる状態と矛盾していた
- ⚠️ Phase 2 のステータスが「⬜ 未着手」のままになっており、実態と一致していなかった

修正した内容:

- development-phases.md の Phase 1 ステータスを「✅ 完了」に更新
- development-phases.md の Phase 2 ステータスを「🟢 実施中」に更新

---

## 5. Cloud Agent指示監査

**判定: Needs Fix → 修正済み**

確認内容:

- ✅ プロジェクトの目的（静かで意図的な書き体験）が明確に記述されている
- ✅ 「多機能化しすぎない」ルールが Core Principles に含まれている
- ✅ 「余白」「静けさ」「iPhone-first」が明記されている
- ✅ Phase 1/2/3 の作業範囲が記述されている
- ✅ Cloudflare デプロイ禁止ルールが明記されている
- ✅ 技術方針（React + TypeScript + Tailwind + localStorage → IndexedDB）が簡潔に記述されている
- ⚠️ Phase 1 が「(Current)」と表示されたままで Phase 2 の現在フェーズが反映されていなかった
- ⚠️ Phase 2 の禁止事項（MVP実装開始禁止、Reactコンポーネント追加禁止）が不明瞭だった
- ⚠️ AI機能・ログイン・クラウド同期・課金を追加しないルールが "What Zanshin Is NOT" セクションに暗示されているだけで、明示的な禁止リストがなかった

修正した内容:

- Phase 1 を「(Complete)」に変更し、Phase 2 を「(Current)」に更新
- Phase 2 に「MVP実装開始禁止」「Reactコンポーネント追加禁止」を明示
- 「Features Never to Add」セクションを新設し、ログイン・クラウド同期・AI機能・課金・通知・ソーシャル機能を明示的に禁止

---

## 6. Phase 3 実装前の最終方針

Phase 3では以下を守ること。

- Vite + React + TypeScript + TailwindでMVPを作る
- localStorage保存から開始する
- メモ一覧、作成、編集、削除、自動保存、検索、お気に入りを実装する
- iPhone-firstで設計する（safe-area、viewport、タップターゲット44px以上）
- 余白と行間を大切にする（黄金比スケールを使用）
- 機能を増やしすぎない
- 保存処理は必ず `lib/storage.ts` に分離する
- Cloudflare PagesへのデプロイはMVP完成後のみ行う

---

## 7. MVPでまだ作らないもの

- ログイン
- クラウド同期
- AI機能
- 課金
- Markdown完全対応
- 複雑なタグ管理
- 共同編集
- App Store申請

---

## 8. 追加確認：「残心らしさ」の最終判定

**この設計は、ただのメモ帳ではなく「残心」と呼べるか？**

| 問い | 判定 | 根拠 |
|------|------|------|
| 書く体験が静かか | ✅ | プレースホルダー文言、シンプルな2画面構成 |
| 保存体験が静かか | ✅ | 「余韻を保存しました / Saved in stillness」、フェードで静かに消える |
| 読み返しに余韻があるか | ✅ | 将来の読み返しモード構造が意識されている |
| UIに間があるか | ✅ | 黄金比スケール、画面情報量の制限、最小限のボタン |
| 和の要素が意味として入っているか | ✅ | 刀・扇・円相が装飾ではなく意味として整理されている |
| 機能が画面を騒がせていないか | ✅ | MVPで作らないものが明確に定義されている |

**判定：この設計は「残心」と呼べる。**

---

## 9. 総合判定

```
Phase 3に進んでよい
```

**理由:**

- 全6ファイルを確認し、コンセプト・デザイン・MVP範囲・フェーズ管理のすべてに一貫性がある
- 発見された3点の問題（README表現、フェーズステータス、Copilot禁止ルール不明確）はすべて修正済み
- データ構造・保存方針・ファイル構成案がPhase 3実装に十分な詳細で揃っている
- Cloudflareへのデプロイはまだ行っていない
- MVP実装はまだ開始していない
