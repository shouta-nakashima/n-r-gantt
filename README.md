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

## 開発

```bash
# デモアプリを起動（http://localhost:3000）
pnpm example

# ライブラリをwatchモードで開発
pnpm dev

# テスト実行
pnpm test

# Lint
pnpm lint
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

## プロジェクト構成

```
packages/n-r-gantt/  # ライブラリ本体
examples/demo/       # 開発用デモアプリ
```

## ライセンス

MIT
