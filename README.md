# Wheat Spike-Layer Modeler

An offline, multilingual wheat spike-layer simulation model generator for Windows 64-bit, macOS, and modern web browsers.

小麦穗层模型生成器：支持 Windows 64 位、macOS 和现代浏览器的离线小麦模拟工具。

小麦穂層モデル生成器：Windows 64-bit、macOS、およびモダンブラウザーで動作するオフライン小麦シミュレーションツールです。

## Download / 下载 / ダウンロード

Download the packaged Windows and macOS applications from the [v1.5 release](https://github.com/Anhouse-Sakai/Wheat-Spike-Layer-Modeler/releases/tag/v1.5).

Windows 和 macOS 安装包请从 [v1.5 Release](https://github.com/Anhouse-Sakai/Wheat-Spike-Layer-Modeler/releases/tag/v1.5) 下载。

Windows・macOS 版は [v1.5 Release](https://github.com/Anhouse-Sakai/Wheat-Spike-Layer-Modeler/releases/tag/v1.5) からダウンロードできます。

## Run from source / 从源代码运行

The core modeler uses plain HTML, CSS, and JavaScript with no package installation or network connection required.

1. Clone or download this repository.
2. Open `src/web/index.html` in a modern browser.
3. Enter wheat traits manually, load the built-in examples, or import CSV/TSV data.

核心模型器由原生 HTML、CSS 和 JavaScript 构成，无需安装依赖，也不会上传数据。下载仓库后直接用现代浏览器打开 `src/web/index.html`。

## Repository layout

```text
src/web/       Browser-based modeler source and built-in example data
analysis/      R scripts used to calculate and validate group means
data/          Aggregated source data used for the built-in models
docs/          English, Simplified Chinese, and Japanese user guides
```

The repository contains the complete cross-platform browser core. The compiled Windows and macOS launchers are distributed as release assets; their native wrapper project files were not available in the preserved source set.

## Release checksums (SHA-256)

```text
Windows: F416CFA7E3022DD024285BB3AE70114986C8B24E51C8C697402F3DD4FA6BA9C0
macOS:   FE6BB804D3B9CD349B73C48A7F21B3754EDA58FB4C724C40EC065C6131DAF03A
```

## License

Copyright (c) 2026 Anhouse-Sakai.

Released under the [MIT License](LICENSE). You may use, modify, redistribute, sublicense, and sell copies subject to the license terms.
