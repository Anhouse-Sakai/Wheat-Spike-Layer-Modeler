# Wheat Spike-Layer Modeler — Windows Edition

**Language: English**

## System Requirements

- 64-bit Windows 10 or Windows 11.
- Uses the system Microsoft Edge WebView2 runtime. Electron and Chromium are not bundled, keeping the application small.

## Getting Started

1. Extract the entire `Wheat_Spike_Layer_Modeler_Windows_64bit_v1.5.zip` archive.
2. Keep all files and the `web` folder together in the extracted directory.
3. Double-click `Wheat Spike-Layer Modeler.exe`.

Do not copy only the `.exe`. Both `WebView2Loader.dll` and the `web` folder are required to run the application.

This application does not have a commercial code-signing certificate. If SmartScreen displays “Unknown publisher,” verify that the archive came from a trusted source, then select “More info → Run anyway.”

## WebView2 Runtime

Windows 11 normally includes WebView2 Runtime, and it is already installed on most Windows 10 computers. If the application reports that the runtime is missing at startup:

1. In the prompt, choose to open Microsoft's official download page.
2. Install the Evergreen WebView2 Runtime.
3. Reopen the application.

Official download page: <https://developer.microsoft.com/microsoft-edge/webview2/>

## Canvas and Resolution

- Choose a canvas aspect ratio of `16:9`, `4:3`, or Custom.
- In Custom mode, enter the canvas width and height directly in pixels.
- PNG resolution can match the canvas or be set to 1920 px, 2560 px, 3840 px, or a custom size.
- When you change the width or height of a custom PNG, the other dimension adjusts automatically to the canvas aspect ratio so the plants are not distorted.

## Modeling and Multi-Plant Comparison

1. Enter the material name, PH, HSH, and LSH, plus the spike count and mean spike length for TSB, MSB, and BSB.
2. All height and spike-length values are in cm.
3. Click `+` in the upper-right corner of the graphic to add a plant. All plants share the `0 cm` baseline and height scale.
4. Under “Current plant,” select plant 1, 2, 3, and so on, then edit each plant's parameters separately.
5. You can temporarily store, load, and delete modeled wheat plants. Up to 100 models can be cached.
6. CSV/TSV files can be imported for batch data entry.

## Built-in Examples

- Click “Load All samples / C / L” to add three average wheat models to the same height scale: All samples, Cultivar (C), and Landrace (L).
- Example heights and spike lengths use the original mean values; spike counts are rounded to the integers required by the software.
- The three plants use different seed shapes and can still be selected and edited individually.

## Customizing Figure Text

- Expand “Figure text” above the preview to edit the title, subtitle, y-axis title, footer, and the displayed labels for TSB, MSB, BSB, PH, HSH, and LSH in real time.
- Font sizes can be adjusted separately for the title, subtitle, axis title, tick labels, SB annotations, trait markers, and footer.
- Titles and subtitles support the placeholders `{name}`, `{ph}`, `{hsh}`, `{lsh}`, `{spikes}`, `{belt}`, `{seed}`, and `{current}`.
- Figure text uses Times New Roman. Text settings are saved locally and applied to the preview, SVG, and PNG outputs.
- Material names can still be set for each plant in the left panel. “Restore text defaults” resets all figure text with one click.

## Saving Images

- “Current plant SVG/PNG” saves only the currently selected plant.
- “Combined SVG/PNG” saves all plants on the canvas with their shared height scale.
- Export serializes only the wheat preview canvas; it does not include the parameter panel, text editor, buttons, or page whitespace.

- Clicking a save button opens the Windows file-save dialog.

## Cache and Privacy

- The application runs offline and does not upload material data.
- Modeled wheat plants are cached in `%LOCALAPPDATA%\WheatSpikeLayerModeler\WebView2`.
- Deleting this directory or clearing the application's data may remove the cache. Keep important data in CSV/TSV files as well.

## Archive Contents

```text
Wheat Spike-Layer Modeler.exe
WebView2Loader.dll
web\
README_简体中文.md
README_English.md
README_日本語.md
```
