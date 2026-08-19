# Wheat Spike-Layer Modeler — Windows 版

**语言：简体中文**

## 适用系统

- 64 位 Windows 10 或 Windows 11。
- 使用系统 Microsoft Edge WebView2，不携带 Electron 或 Chromium，因此体积很小。

## 启动方法

1. 完整解压 `Wheat_Spike_Layer_Modeler_Windows_64bit_v1.5.zip`。
2. 保留解压目录中的全部文件和 `web` 文件夹。
3. 双击 `Wheat Spike-Layer Modeler.exe`。

不要只复制 `.exe`。`WebView2Loader.dll` 和 `web` 文件夹都是运行所需内容。

本应用没有商业代码签名证书。如果 SmartScreen 显示“未知发布者”，请确认压缩包来源无误后选择“更多信息 → 仍要运行”。

## WebView2 Runtime

Windows 11 通常已预装 WebView2 Runtime，绝大多数 Windows 10 电脑也已经安装。如果启动时提示缺少 Runtime：

1. 在提示窗口中选择打开 Microsoft 官方下载页。
2. 安装 Evergreen WebView2 Runtime。
3. 重新打开本软件。

官方下载页：<https://developer.microsoft.com/microsoft-edge/webview2/>

## 画布与清晰度

- 画布比例可选择 `16:9`、`4:3` 或“自定义”。
- 自定义模式可直接输入画布宽度和高度，单位为 px。
- PNG 清晰度可选择与画布一致、1920 px、2560 px、3840 px 或自定义。
- 自定义 PNG 修改宽度或高度时，另一边会按画布比例自动联动，植株不会被拉伸。

## 建模与多株比较

1. 输入材料名称、PH、HSH、LSH，以及 TSB、MSB、BSB 的穗数和平均穗长。
2. 全部高度和穗长单位均为 cm。
3. 点击图形右上方 `+` 可添加新植株，所有植株共用 `0 cm` 基线和高度坐标。
4. 在“当前编辑植株”中选择第 1、2、3……株，再分别修改参数。
5. 可暂存、载入和删除模式小麦；最多缓存 100 个模式。
6. 可导入 CSV/TSV 批量数据。

## 内置示例

- 点击“载入全样本 / C / L”，会直接在同一高度坐标中加入三株平均模式小麦：All samples、Cultivar (C) 和 Landrace (L)。
- 示例高度和穗长采用原始平均值；穗数按四舍五入转换为软件所需的整数。
- 三株使用不同形态种子，可继续逐株选择和修改。

## 自定义图中文字

- 展开预览上方的“图中文字”，可实时修改标题、副标题、纵轴标题、底部说明以及 TSB、MSB、BSB、PH、HSH、LSH 的显示内容。
- 可分别调整标题、副标题、坐标轴标题、刻度、SB 图注、性状标记和底部说明的字号。
- 标题和副标题支持 `{name}`、`{ph}`、`{hsh}`、`{lsh}`、`{spikes}`、`{belt}`、`{seed}`、`{current}` 占位符。
- 图中字体保持 Times New Roman；文字设置会自动保存在本机，并同时应用于预览、SVG 和 PNG。
- 材料名称仍可在左侧逐株设置；“恢复文字默认值”可一键复原。

## 保存图片

- “当前株 SVG/PNG”只保存当前选中的植株。
- “全部合并 SVG/PNG”保存画布中的全部植株和共用高度坐标。
- 导出程序只序列化小麦预览画布，不会把参数面板、文字编辑区、按钮或页面留白保存进图片。

- 点击保存按钮后，会出现 Windows 文件保存窗口。

## 缓存与隐私

- 软件离线运行，不上传材料数据。
- 模式小麦缓存保存在 `%LOCALAPPDATA%\WheatSpikeLayerModeler\WebView2`。
- 删除该目录或清除应用数据可能删除缓存；重要数据请同时保留 CSV/TSV。

## 压缩包内容

```text
Wheat Spike-Layer Modeler.exe
WebView2Loader.dll
web\
README_简体中文.md
README_English.md
README_日本語.md
```
