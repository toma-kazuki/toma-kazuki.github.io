# Feedback document
This is the first feedback for the first prototype of this website under /prototype. Below I will write my feedback in either Japanese or English. 
## Top-page
シンプルな研究ウェブサイトでありつつ、ここだけは形式的な情報だけでなくパッとみて興味を引くようにビジュアルもきちんと詰めたい。
今は丸の内の写真を背景に使っている (さらにその写真も今反映されていない) が、このアイデアは完全に無くしてしまいたい。
現在のページ構成は以下のようになっている
1. ヘッダー
2. 中身一層目 (名前とCVへのリンクなど) →ここのインパクトが弱い
3. 中身二層目 (写真や簡単な自己紹介)→GithubやLinkedinなどに飛ぶアイコンは第一層にあってもいいのでは？
4. Research & Experience→まあよし (これも写真があるとよき)
5. Publications →よき　(ラベルや論文整理番号のせいで若干タイトルが入ってきづらいのでこれはなくてもいいかも)
ひとまず現状の技術スタックでどれくらいのことができるのかも含めて、このページだけはより洗練されたデザインとナビゲーションを目指したい。動的なものも試したい。

## Research
若干ラベルが多すぎる
あと研究者はこの研究がPhDのときかMSかBSかで分けてみたいと思うのでそれも分けられるようにしたい。

## Timeline
確かに思った通りにデザインされているもののPoorという印象... 
タイムラインの軸が貧弱、その上に乗っかっているポイントのアイコンもださい、線にしっかり乗っていない。
そしてその点とイベントのボックスが線で繋がっていてほしい。
イベントのボックスをおして中身を見れる仕様はすばらしい。
プロジェクトの期間が被っていたりするのもあるので、そこは複数の矢印で範囲を記述した方がわかりやすいかも。

## Publications
JournalとConference, First AuthorとCo-authorのラベルは素晴らしい。
改めてC1とかJ1とかって必要だろうか？それぞれのResearch ProjectでRelated publicationsをメンションするときも、この番号ではなく、シンプルにタイトルを載せてクリックさせた方がいいと思う。

## CV
これは問題ない

## Blog 
これはどうやって追加してどのように表示されるのか気になる

##Other things
Contactのページを用意して、メールを送るフォームがほしい。僕のメールか電話番号のテキストメッセージに連絡が来るようにしてほしい。
自分がこのウェブサイトをよりスムーズにアップデートしていける仕組みについても考えなければならない。新しい研究を載せる時、ブログ、CV、写真のupdate、Timelineの編集、他のSNS(特にLinkedin)とのシームレスな連携など、何ができるだろうか。

---

## プロトタイプ修正結果（設計書・本実装向け・再現用仕様）

以下は `/prototype` で反映済みの挙動を、**データ構造・定数・レイヤ順・インタラクション**まで書き起こしたもの。設計書（`SPEC.md` / `docs/architecture.md` / `docs/design-system.md` / `docs/content-strategy.md`）へ転記する際は、この節を「要件のソースオブトゥルース」として切り出せる。

### 共通（プロトタイプ全体）

- **スタック**: Astro 4 + Tailwind + `@fontsource`（Space Grotesk / Inter / Noto Sans JP）。テーマは `data-theme` と CSS 変数（`global.css`）。
- **本番移行時の方針**: モックは `src/data/mock.ts`、本番はコレクション／JSON／YAML に置換。UI ロジックは「データに `id`, `start_date`, `end_date?`, `type`, `labels[]` があれば同じアルゴリズムを再利用可能」と明記する。

### トップページ（`src/pages/index.astro`）

- **ヒーロー**: 全幅の Space Music Hall 系画像（例: `spectacle4.png`）、オーバーレイ＋名前・肩書・CTA。スクロール連動のフェード（ヒーロー退場／下セクション登場）。
- **About**: `gaikann.PNG` は使用しない。左列に顔写真＋縦並びの SNS／連絡リンク、右にバイオ＋ナビ誘導。
- **Featured Research**: カード下部にラベル（視線の邪魔にならない配置）。
- **Publications 抜粋**: 一覧用の **C1/J1 等の内部 ID は表示しない**（CV・LaTeX側のみ保持の方針と整合）。

### Research 一覧（`src/pages/research.astro`）

- **フィルター二段**: 上段＝主ラベル（例: Research / Work 等、件数削減）、下段＝学歴レベル（PhD / MS / BS）の排他。主ラベルは OR、学歴は単一選択。状態は URL クエリと同期可能な実装方針。
- **カード**: 期間・ステータスの下にラベル（低コントラスト）。学歴バッジをステータス近傍に表示。

### Research 詳細（`src/pages/research/[slug].astro`）

- **関連論文**: `C1` のような ID 表記はやめ、**Publications ページと同型のカード**でタイトル・会場等を表示。データは `related_publications` 等の ID からルックアップ。

### Publications 一覧（`src/pages/publications.astro`）

- **Web 表示から内部番号（C1/J1）を除去**。フィルター（Journal/Conference、First/Co）は維持。

### CV（`src/pages/cv.astro`）

- 大きな仕様変更なし（印刷用スタイル維持）。

### Timeline（`src/pages/timeline.astro`）— 技術要件の詳細

#### データ・除外・フィルター

- **データソース**: `TIMELINE`（各エントリに `id`, `title`, `type`, `start_date`, `end_date?`, `labels?`, 表示用 `start`/`end` 文字列など）。
- **タイムラインから除外する ID（プロトタイプ固定）**: `lnss`, `lunar-rover`（設計書では「コンテンツ側で `timeline_show: false` または exclude リストで制御」と書ける）。
- **フィルター UI に出すカテゴリのみ**（順序固定）: `Education` → `Projects` → `Research` → `Work` → `Awards`。対応する `data-filter` 用 id: `education`, `project`, `research`, `work`, `award`。
- **ラベル系フィルター**（Research / Work 等）: エントリの `tags` は `[type, ...labels]` をカンマ結合。ラベルが付いたプロジェクトは `research` / `work` ボタンでもヒットする。
- **「All」なし**。初期選択: **`project`**。
- **`end_date` 欠如（進行中）**: レイアウト計算の終端には **`new Date()` 由来の当月** を仮の `endIso` として用いる（`durLabel` / `barH` 計算）。

#### 時間スケール・ボックス寸法（ビルド時）

- **縦スケール**: `PPY = 100`（px/年）。**年範囲**: `MIN_YR = 2018`, `MAX_YR = 2029`（設計書では可変に）。
- **各エントリ**: `baseY = toY(start_date)`（ISO `YYYY-MM`）。`barH = max(12, toY(endIso) - baseY)`。`totH = max(CARD_H, barH)` で **カード枠の高さが期間に比例**（`CARD_H = 108` は下限）。
- **初期コンテナ高**: 年レンジに基づく高さと、`baseY + totH` の最大＋余白の大きい方。フィルター後の押し下げで不足する場合は **クライアントで `tl-desktop` / `#tl-svg` の `height` を拡張**。

#### レイアウトエンジン（クライアント・フィルター変更時）

1. **マッチしたエントリのみ** `baseY` 昇順で処理。非マッチは `transform: translateY(0)`、`opacity: 0.1`、`grayscale(1)`、`pointer-events: none`（モバイルは opacity のみの簡略可）。
2. **左右（時間軸に近い側を優先）**: 各エントリについて、左レーン・右レーンそれぞれで「次に置ける最小 `dispY`」を `max(baseY, sideBottom + COLL_PAD)` で計算（`COLL_PAD = 14`）。**小さい方のレーンを選択**（同値なら左優先）。これで二列分散＋衝突回避。
3. **垂直オフセット**: `transform: translateY(dispY - baseY)`。CSS `transition` でカード移動（例: `transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)`）。
4. **カードの水平位置**: 軸中心から **`AXIS_GAP = 44` px**（旧 22px の 2 倍）。左: `right: calc(50% + AXIS_GAP)`、右: `left: calc(50% + AXIS_GAP)`。

#### SVG レイヤ（描画順・座標）

- **レイヤ順**: 静的グループ（軸＋年目盛り）→ **期間バー＋ノード** → **ベジェ曲線**（カードの下に来ないよう SVG をカードより下に重ねる場合は `z-index` で調整済みの方針を設計書に明記）。
- **時間軸の見た目**: メイン線は `linearGradient#axisGrad`。**色は `--color-text-muted` と同一トークン**（年ラベル・「ongoing…」の文字色と揃える）。グロー・年のチックも同系。白一色指定は廃止。
- **期間バー**: DOM 内のカードには描かない。**SVG の `<rect>`** で、`baseY` から高さ `barH`。**軸本体（中心 ±1.25px 程度の線幅）と重ならない**よう、左レーンは `[ax - 14, ax - 9]`、右レーンは `[ax + 9, ax + 14]`（幅 5px、`BAR_NEAR = 9`）。左イベントはバーを軸の**左側**、右イベントは**右側**にのみ出す。
- **ノード**: バーの上端・**バー水平中心**にドット＋薄いグロー。`data-bar-cx` をエントリ DOM に保存し、曲線の始点 X に再利用。
- **非選択カテゴリ**: 期間バー・ノードの **opacity 0**、ベジェは **パス自体を描かない**（完全非表示）。時間軸・目盛りは常に表示。

#### ベジェ曲線（毎フレームまたはフィルター後の RAF ループ）

- **起点**: 期間バーの **垂直方向の中点** — `(originX = barCx, barMidY = baseY + barH/2)`。
- **終点**: イベントボックス（`.tl-entry`）の **時間軸に面した辺の中央**。`getBoundingClientRect()` で毎フレーム取得し、左レーンなら **右辺の中点**、右レーンなら **左辺の中点**（`transform` アニメと同期）。
- **制御点**: 縦方向オフセット量 `dy` に応じて外側へ広げる係数を持ち、押し下げが大きいほど滑らかに膨らむ S 字に。
- **アニメ同期**: カードの `transition` 時間（例 550ms）に合わせ **約 600ms の `requestAnimationFrame` ループ**で `drawCurves` を回し、曲線が移動に追従する。

#### Framer Motion について

- プロトタイプは **依存追加なし**（CSS transition + RAF + `getBoundingClientRect`）。設計書には「本番で Framer Motion を採用する場合は `layout` で同等の座標追従を代替可能」と注記可能。

### 設計書へ落とすときのチェックリスト

- [ ] Timeline エントリスキーマに `id`, `start_date`, `end_date?`, `type`, `labels[]`, `timeline_exclude?` 等を定義し、除外・フィルターをデータ駆動にする。
- [ ] 軸・目盛り・補助テキストの色トークンを ** `--color-text-muted` 系に統一** と明文化する。
- [ ] Publications の「Web 非表示 ID」と CV の「番号付き一覧」の役割分担を一文で固定する。
- [ ] Contact / Blog / 更新ワークフローは別節（下記「残り議論」）で SPEC に追記する。

---

## 残り議論（次ステップ）

元の「Blog / Contact / 更新ワークフロー」に加え、上記タイムライン仕様を `docs/` に取り込むタスクを並行で扱う想定。

1. **Blog ワークフロー**: コレクション（`src/content/blog/`）＋ frontmatter（日付・言語・タグ）→ 一覧・RSS・多言語 URL 方針。執筆からデプロイまでの手順（PR 運用 or 単独コミット）。
2. **Contact フォーム**: 静的ホスト前提で Formspree / Getform / Cloudflare Workers 等の候補比較、スパム対策、**メール＋SMS** 到達の現実的な構成（SMS は Twilio 等のバックエンドが別途必要になる旨）。
3. **更新ワークフロー**: 研究・論文・CV・タイムライン・画像の更新を **単一のコンテンツ編集フロー**（例: YAML + MD のみ触る）にどう束ねるか、LinkedIn 等との手動／自動の切り分け。
