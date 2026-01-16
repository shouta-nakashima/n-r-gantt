# n-r-gantt

React専用のモダンなGanttチャートライブラリ

## 特徴

- TypeScriptファースト
- SVGベースのレンダリング
- 軽量（外部依存最小限）
- カスタマイズ可能なスタイル

## セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/shouta-nakashima/n-r-gantt.git
cd n-r-gantt

# 依存関係をインストール
pnpm install

# ライブラリをビルド
pnpm build
```

## 開発の流れ

### 1. ライブラリをビルド

```bash
pnpm build
```

ライブラリの変更を反映するには、ビルドが必要です。

### 2. デモアプリで動作確認

```bash
pnpm example
```

ブラウザで http://localhost:3000 を開き、Ganttチャートの動作を確認できます。

### 3. ライブラリを変更しながら開発

ターミナルを2つ開いて並行実行すると効率的です。

```bash
# ターミナル1: ライブラリをwatchモードでビルド
pnpm dev

# ターミナル2: デモアプリを起動
pnpm example
```

`pnpm dev` はファイル変更を検知して自動でリビルドします。
デモアプリ側でリロードすると変更が反映されます。

### 4. テスト実行

```bash
# テストを実行
pnpm test

# watchモードでテスト
pnpm --filter n-r-gantt test
```

### 5. Lint

```bash
# 構文チェック
pnpm lint

# 自動修正
pnpm lint:fix
```

## 使い方

```tsx
import { Gantt, GanttTask } from 'n-r-gantt';

const tasks: GanttTask[] = [
  {
    id: '1',
    name: 'タスク1',
    start: new Date(2024, 0, 1),
    end: new Date(2024, 0, 5),
    progress: 50,
  },
];

function App() {
  return <Gantt tasks={tasks} />;
}
```

## コマンド一覧

| コマンド | 説明 |
|----------|------|
| `pnpm install` | 依存関係インストール |
| `pnpm build` | ライブラリをビルド |
| `pnpm dev` | ライブラリをwatchモードでビルド |
| `pnpm example` | デモアプリを起動 |
| `pnpm test` | テスト実行 |
| `pnpm lint` | Lint実行 |

## プロジェクト構成

```
packages/n-r-gantt/  # ライブラリ本体
examples/demo/       # 開発用デモアプリ
```

## ライセンス

MIT
