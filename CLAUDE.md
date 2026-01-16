# CLAUDE.md - AI Assistant Guide for n-r-gantt

This document provides guidance for AI assistants working on the n-r-gantt project.

---

## 🔒 確定方針（変更不可）

以下の方針は承認済みであり、明示的な許可なく変更してはいけません。

### プロジェクトの目的

- **React専用**のGanttチャートライブラリを作成する
- **npm**で配布可能なパッケージとして公開する
- **TypeScriptファースト**で型安全性を最優先する

### 技術スタック（確定）

| カテゴリ | 技術 | 変更不可 |
|----------|------|:--------:|
| 言語 | TypeScript 5.x (strict mode) | ✅ |
| フレームワーク | React 18+ (peerDependency) | ✅ |
| バンドラー | tsup | ✅ |
| パッケージマネージャー | pnpm | ✅ |
| Linting/Formatting | Biome | ✅ |
| テスト | Vitest + React Testing Library | ✅ |
| コンポーネント開発 | Storybook 8.x | ✅ |
| レンダリング | SVG | ✅ |
| 状態管理 | Context + useReducer | ✅ |
| スタイリング | CSS + Custom Properties | ✅ |

### アーキテクチャ決定（確定）

1. **外部依存は最小限に**: React以外の大きな依存を避ける
2. **SVGベースレンダリング**: Canvas fallbackは大量データ時のみ検討
3. **Tree-shakeable設計**: 使用しない機能はバンドルに含めない
4. **ESM/CJS両対応**: モダンとレガシー環境の両方をサポート

### 開発フェーズ（確定）

1. Phase 1: プロジェクト基盤のセットアップ
2. Phase 2: コアアーキテクチャの設計・実装
3. Phase 3: 主要機能の実装
4. Phase 4: API設計の詳細化
5. Phase 5: テスト戦略の実装
6. Phase 6: ドキュメント作成
7. Phase 7: npm公開準備

### AIアシスタントへの指示

- 上記の確定方針に反する提案・実装をしてはいけない
- 技術スタックの変更が必要な場合は、必ずユーザーに確認を取る
- 新しいライブラリの追加は最小限に抑え、追加時は理由を明示する
- フェーズの順序を守り、スキップしない

---

## Project Overview

**n-r-gantt** is a modern, TypeScript-first React Gantt chart library designed for npm distribution. The library aims to provide developers with a powerful, customizable, and performant Gantt chart component.

### Key Goals

- React専用のGanttチャートコンポーネントライブラリ
- TypeScriptファーストで型安全性を重視
- npmでの配布を目指す
- モダンで開発者フレンドリーなAPI

## Technology Stack

| Category | Technology | Rationale |
|----------|------------|-----------|
| Language | TypeScript 5.x (strict mode) | 型安全性、優れたDX |
| Framework | React 18+ | peerDependencyとして |
| Bundler | tsup | ゼロコンフィグ、ESM/CJS両対応 |
| Package Manager | pnpm | 高速、効率的 |
| Linting | Biome | ESLint+Prettierより高速 |
| Testing | Vitest + React Testing Library | ESMネイティブサポート |
| Component Dev | Storybook 8.x | コンポーネント開発・ドキュメント |
| Rendering | SVG | 任意のズームでクリアな表示 |

## Project Structure

```
n-r-gantt/
├── src/
│   ├── components/
│   │   ├── Gantt/              # メインコンポーネント
│   │   │   ├── Gantt.tsx
│   │   │   ├── Gantt.types.ts
│   │   │   ├── Gantt.test.tsx
│   │   │   └── index.ts
│   │   ├── Timeline/           # タイムラインヘッダー
│   │   ├── TaskBar/            # タスクバー
│   │   ├── TaskList/           # タスクリスト（左パネル）
│   │   ├── DependencyLines/    # 依存関係の線
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useGanttState.ts    # 状態管理
│   │   ├── useTimeline.ts      # タイムライン計算
│   │   ├── useZoom.ts          # ズーム制御
│   │   ├── useDragAndDrop.ts   # ドラッグ&ドロップ
│   │   ├── useVirtualization.ts # 仮想スクロール
│   │   └── index.ts
│   ├── context/
│   │   ├── GanttContext.tsx    # Context + useReducer
│   │   └── index.ts
│   ├── utils/
│   │   ├── date-utils.ts       # 日付ユーティリティ
│   │   ├── task-utils.ts       # タスク操作
│   │   ├── dependency-utils.ts # 依存関係計算
│   │   └── index.ts
│   ├── types/
│   │   ├── task.ts             # GanttTask型
│   │   ├── dependency.ts       # GanttDependency型
│   │   ├── config.ts           # GanttConfig型
│   │   └── index.ts
│   ├── styles/
│   │   ├── gantt.css
│   │   └── variables.css       # CSS Custom Properties
│   └── index.ts                # パブリックAPI
├── tests/
│   ├── setup.ts
│   └── utils/
├── stories/                    # Storybookストーリー
├── docs/                       # ドキュメント
├── examples/                   # 使用例
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── vitest.config.ts
├── biome.json
└── CLAUDE.md
```

## Core Types

```typescript
// GanttTask - タスクの基本型
interface GanttTask {
  id: string;
  name: string;
  start: Date;
  end: Date;
  progress?: number;          // 0-100
  type?: 'task' | 'milestone' | 'project';
  dependencies?: string[];    // 依存タスクのID配列
  parentId?: string;          // 階層構造用
  collapsed?: boolean;
  styles?: TaskStyles;
  metadata?: Record<string, unknown>;
}

// GanttDependency - 依存関係の型
interface GanttDependency {
  id: string;
  fromTaskId: string;
  toTaskId: string;
  type: 'finish-to-start' | 'start-to-start' |
        'finish-to-finish' | 'start-to-finish';
}

// ViewMode - 表示モード
type ViewMode = 'hour' | 'quarter-day' | 'half-day' |
                'day' | 'week' | 'month' | 'quarter' | 'year';
```

## Component Hierarchy

```
<GanttProvider>           // Context provider
  <Gantt>                 // メインオーケストレーター
    <GanttHeader>         // タイムラインヘッダー
      <TimelineScale />   // 日付スケール
    </GanttHeader>
    <GanttBody>
      <TaskList>          // 左パネル（タスク名）
        <TaskListRow />
      </TaskList>
      <TaskArea>          // 右パネル（タイムライン）
        <GridLines />     // 背景グリッド
        <TodayMarker />   // 今日の線
        <DependencyLines /> // 依存関係のSVG矢印
        <TaskBar />       // タスクバー
      </TaskArea>
    </GanttBody>
  </Gantt>
</GanttProvider>
```

## Development Phases

### Phase 1: プロジェクト基盤のセットアップ
- package.json設定（ESM/CJS両対応のexports）
- TypeScript設定（strict mode）
- tsup設定（bundler）
- Biome設定（linting/formatting）
- Vitest設定（testing）
- Storybook設定

### Phase 2: コアアーキテクチャの設計・実装
- Core Types定義（`/src/types/`）
- GanttContext実装（状態管理）
- 基本コンポーネント構造

### Phase 3: 主要機能の実装
- タイムラインレンダリング
- タスクバーコンポーネント
- ドラッグ&ドロップ
- 依存関係の描画
- ズーム機能
- 仮想スクロール（大量データ対応）

### Phase 4: API設計の詳細化
- Props API設計
- Imperative Handle API（ref経由の制御）
- カスタムフック公開
- テーマAPI

### Phase 5: テスト戦略の実装
- ユニットテスト（utils）
- コンポーネントテスト
- インテグレーションテスト
- アクセシビリティテスト
- パフォーマンステスト

### Phase 6: ドキュメント作成
- README.md
- API Reference
- Storybook Stories
- 使用例

### Phase 7: npm公開準備
- パッケージメタデータ
- GitHub Actions（CI/CD）
- CHANGELOG.md
- ベータリリース → v1.0.0

## Commands

```bash
# 依存関係インストール
pnpm install

# 開発モード（watch）
pnpm dev

# ビルド
pnpm build

# テスト
pnpm test
pnpm test:coverage

# Lint
pnpm lint
pnpm lint:fix

# Storybook
pnpm storybook
pnpm build-storybook
```

## Development Guidelines

### Code Style

- TypeScript strict modeを使用
- 命名規則:
  - PascalCase: コンポーネント、型、インターフェース
  - camelCase: 関数、変数、hooks
  - kebab-case: ファイル名、CSSクラス
- React hooks使用のfunctional components
- 自己文書化コード（意味のある名前）

### Git Workflow

1. **Branch Naming**:
   - `feature/` 新機能
   - `fix/` バグ修正
   - `docs/` ドキュメント
   - `claude/` AI支援開発

2. **Commit Messages**:
   - 命令形を使用（"Add feature" not "Added feature"）
   - 50文字以内のサブジェクト
   - 必要に応じてボディで詳細説明

### Testing

- 新機能にはテストを追加
- クリティカルパスのテストカバレッジを維持
- コミット前にテスト実行

## Key Conventions for AI Assistants

### When Making Changes

1. **Read before modifying**: 変更前に既存コードを必ず読む
2. **Minimal changes**: タスクに必要な変更のみ行う
3. **Preserve style**: 既存のコードスタイルを維持
4. **Test changes**: 変更が期待通り動作することを確認
5. **Update docs**: 重要な変更はドキュメントも更新

### Architecture Decisions

| 決定事項 | 選択 | 理由 |
|----------|------|------|
| 状態管理 | Context + useReducer | 外部依存なし、Reactネイティブ |
| レンダリング | SVG | 任意のズームでクリア、スタイリング容易 |
| スタイリング | CSS + Custom Properties | Tree-shakeable、ランタイムコストなし |
| 大量データ | 仮想スクロール | 100+タスクでも高パフォーマンス |

### Performance Considerations

- 100+タスク: 仮想スクロール必須
- 1000+タスク: Canvas fallbackを検討
- メモ化: `useMemo`, `useCallback`の適切な使用
- 再レンダリング最小化

## Important Files

- `src/types/index.ts` - 全データモデルとAPIコントラクト
- `src/components/Gantt/Gantt.tsx` - メインコンポーネント
- `src/context/GanttContext.tsx` - 状態管理の中心
- `src/hooks/useDragAndDrop.ts` - 最も複雑なインタラクション
- `package.json` - npm配布の基盤

---

*Last updated: 2026-01-16*
*Repository state: Planning complete, policies locked, ready for implementation*
*Policy version: 1.0 (approved)*
