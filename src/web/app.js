"use strict";

const $ = (id) => document.getElementById(id);
const controls = ["taxa", "ph", "hsh", "lsh", "tsbSn", "tsbL", "msbSn", "msbL", "bsbSn", "bsbL", "seed", "spread", "showBelts"];
const figureTextControls = ["figureTitleTemplate", "figureSubtitleTemplate", "axisTitleText", "figureNoteText", "tsbText", "msbText", "bsbText", "phText", "hshText", "lshText", "titleFontSize", "subtitleFontSize", "axisTitleFontSize", "axisTickFontSize", "beltFontSize", "markerFontSize", "noteFontSize"];
const I18N = {
  zh: {
    appTitle: "小麦材料穗层建模器",
    intro: "把材料级表型数据变成结构可比较的单株小麦。所有分蘖共享一个冠部，各穗基部按所属穗带随机分布。",
    interfaceLanguage: "界面语言", loadExample: "载入全样本 / C / L", randomize: "换一组形态",
    currentPlant: "当前编辑植株", selectPlant: "选择植株", plantHelp: "先选择植株，再在下方修改它的 PH、HSH、LSH、各穗带参数和形态种子。",
    previousPlant: "上一株", nextPlant: "下一株", removePlant: "删除当前株",
    modelCache: "模式小麦缓存", savedModels: "已暂存模式", cacheHelp: "完整参数保存在当前浏览器中；刷新或重新打开页面后仍可载入。", saveCurrentModel: "暂存当前株", addCachedModel: "添加到画布", deleteCachedModel: "删除缓存",
    emptyCache: "暂无缓存模式", cacheReady: "已缓存 {count} 个模式小麦。", cacheSaved: "已暂存“{name}”。", cacheAdded: "已将“{name}”添加为新的可编辑植株。", cacheDeleted: "已删除“{name}”。", cacheFull: "缓存已达到 {count} 个上限，请先删除不需要的模式。", cacheInvalid: "当前参数无效，修正后才能暂存。", cacheStorageError: "浏览器本地缓存不可用。",
    materialHeight: "材料与高度", materialName: "材料名称", phHelp: "整株最高点", hshHelp: "最高穗基部", lshHelp: "最低穗基部",
    threeBelts: "三段穗带", countCm: "穗数 / cm", beltHelp: "穗层按高度等分；穗数控制成穗分蘖数量，穗长按各带均值为中心、±20% 为界的截断正态分布生成。",
    top: "上部", middle: "中部", bottom: "下部", spikeCount: "穗数", spikeLength: "穗长",
    displaySettings: "画面设置", shapeSeed: "形态种子", canvasRatio: "画布比例", customRatio: "自定义", canvasWidth: "画布宽度 (px)", canvasHeight: "画布高度 (px)", canvasSizeHelp: "选择“自定义”后可直接修改画布宽度和高度；植株不会被拉伸。", pngResolution: "PNG 清晰度", sameAsCanvas: "与画布一致", customPixels: "自定义 px", pngWidth: "PNG 宽度 (px)", pngHeight: "PNG 高度 (px)", tillerSpread: "分蘖展开度", showBelts: "显示穗带背景与边界",
    batchData: "批量数据", downloadTemplate: "下载模板", importData: "导入 CSV / TSV", supportsColumns: "支持 SLU2025 风格列名", currentMaterial: "当前材料", previousRow: "上一条", nextRow: "下一条",
    livePreview: "实时预览", currentSvg: "当前株 SVG", currentPng: "当前株 PNG", allSvg: "全部合并 SVG", allPng: "全部合并 PNG",
    figureTextEditor: "图中文字", figureTextHint: "修改后实时更新预览与导出图片", figureTextPlaceholders: "标题/副标题可使用 {name}、{ph}、{hsh}、{lsh}、{spikes}、{belt}、{seed} 和 {current}；字体保持 Times New Roman。", titleTemplate: "标题内容", subtitleTemplate: "副标题内容", axisTitleText: "纵轴标题", noteText: "底部说明", titleSize: "标题字号", subtitleSize: "副标题字号", axisTitleSize: "轴标题字号", axisTickSize: "刻度字号", beltSize: "SB 图注字号", markerSize: "PH/HSH/LSH 字号", noteSize: "说明字号", resetFigureText: "恢复文字默认值",
    totalSpikes: "总穗数", dominantBelt: "主导穗带", footerRepeat: "同一组数据 + 同一种子 = 同一幅图", footerStructure: "每个成穗分蘖顶生一个穗；全部分蘖共享同一冠部和根系",
    heightInvalid: "高度需要为有效的非负数。", lshLess: "需要满足 LSH < HSH，才能形成有效穗层。", hshLess: "需要满足 HSH < PH；PH 是整株最高点，HSH 是最高穗基部。", beltInvalid: "穗数不能小于 0，穗长需要大于 0。",
    topGapWarning: "提示：PH−HSH 为 {gap} cm，超出 TSB 平均穗长 {length} cm 的 ±20% 范围。最高分蘖仍严格连接 HSH 与 PH，其余 TSB 穗长按截断正态分布生成。",
    fixParameters: "请修正左侧参数后生成模型", compareCount: "{count} 株同坐标比较", checkHint: "请查看参数提示",
    batchLoaded: "已读取 {count} 个材料。可逐条预览并导出。", readFailed: "读取失败：{message}", noRows: "没有读取到数据行", missingColumns: "缺少必要列：{columns}"
  },
  en: {
    appTitle: "Wheat Spike-Layer Modeler",
    intro: "Turn material-level phenotypes into structurally comparable wheat plants. All tillers share one crown, and spike bases are distributed within their corresponding spike belts.",
    interfaceLanguage: "Interface language", loadExample: "Load All / C / L", randomize: "New morphology",
    currentPlant: "Plant being edited", selectPlant: "Select plant", plantHelp: "Select a plant, then edit its PH, HSH, LSH, spike-belt traits, and morphology seed below.",
    previousPlant: "Previous", nextPlant: "Next", removePlant: "Delete plant",
    modelCache: "Model wheat cache", savedModels: "Saved models", cacheHelp: "Complete parameters are stored in this browser and remain available after refresh or reopening.", saveCurrentModel: "Save current", addCachedModel: "Add to canvas", deleteCachedModel: "Delete saved",
    emptyCache: "No saved models", cacheReady: "{count} model wheat entries saved.", cacheSaved: "Saved “{name}”.", cacheAdded: "Added “{name}” as a new editable plant.", cacheDeleted: "Deleted “{name}”.", cacheFull: "The cache limit of {count} entries has been reached. Delete an unused model first.", cacheInvalid: "The current parameters are invalid and cannot be saved.", cacheStorageError: "Browser local storage is unavailable.",
    materialHeight: "Material and height", materialName: "Material name", phHelp: "Highest point", hshHelp: "Highest spike base", lshHelp: "Lowest spike base",
    threeBelts: "Three spike belts", countCm: "Spike count / cm", beltHelp: "The spike layer is divided into three equal height belts. Spike length follows a truncated normal distribution centered on each belt mean and bounded at ±20%.",
    top: "Top", middle: "Middle", bottom: "Bottom", spikeCount: "Spike count", spikeLength: "Spike length",
    displaySettings: "Display settings", shapeSeed: "Morphology seed", canvasRatio: "Canvas ratio", customRatio: "Custom", canvasWidth: "Canvas width (px)", canvasHeight: "Canvas height (px)", canvasSizeHelp: "Choose Custom to edit canvas width and height directly; plants are never stretched.", pngResolution: "PNG resolution", sameAsCanvas: "Same as canvas", customPixels: "Custom px", pngWidth: "PNG width (px)", pngHeight: "PNG height (px)", tillerSpread: "Tiller spread", showBelts: "Show spike-belt backgrounds and boundaries",
    batchData: "Batch data", downloadTemplate: "Download template", importData: "Import CSV / TSV", supportsColumns: "Supports SLU2025-style columns", currentMaterial: "Current material", previousRow: "Previous row", nextRow: "Next row",
    livePreview: "Live preview", currentSvg: "Current SVG", currentPng: "Current PNG", allSvg: "Combined SVG", allPng: "Combined PNG",
    figureTextEditor: "Figure text", figureTextHint: "Changes update the preview and exports live", figureTextPlaceholders: "Title and subtitle support {name}, {ph}, {hsh}, {lsh}, {spikes}, {belt}, {seed}, and {current}. The font remains Times New Roman.", titleTemplate: "Title content", subtitleTemplate: "Subtitle content", axisTitleText: "Vertical-axis title", noteText: "Bottom note", titleSize: "Title size", subtitleSize: "Subtitle size", axisTitleSize: "Axis-title size", axisTickSize: "Tick-label size", beltSize: "SB-label size", markerSize: "PH/HSH/LSH size", noteSize: "Note size", resetFigureText: "Reset figure text",
    totalSpikes: "Total spikes", dominantBelt: "Dominant belt", footerRepeat: "Same data + same seed = same figure", footerStructure: "Each fertile tiller carries one terminal spike; all tillers share one crown and root system",
    heightInvalid: "Heights must be valid non-negative numbers.", lshLess: "LSH must be lower than HSH to define a valid spike layer.", hshLess: "HSH must be lower than PH; PH is the highest point and HSH is the highest spike-base height.", beltInvalid: "Spike counts cannot be negative, and spike lengths must be greater than zero.",
    topGapWarning: "Note: PH−HSH is {gap} cm, outside the ±20% range around the TSB mean spike length of {length} cm. The highest tiller still connects HSH to PH exactly; other TSB spike lengths follow the truncated normal distribution.",
    fixParameters: "Correct the parameters on the left to generate the model", compareCount: "{count} plants on one scale", checkHint: "check parameter note",
    batchLoaded: "Loaded {count} materials. Preview and export them one by one.", readFailed: "Import failed: {message}", noRows: "No data rows were found", missingColumns: "Missing required columns: {columns}"
  }
};
let currentSvg = "";
let batchRows = [];
let batchIndex = 0;
let plantModels = [];
let activePlantIndex = 0;
let applyingPlantModel = false;
const MAX_COMPARISON_PLANTS = 20;
const MODEL_CACHE_KEY = "wheatModelerSavedModelsV1";
const FIGURE_TEXT_KEY = "wheatModelerFigureTextV1";
const MAX_SAVED_MODELS = 100;
let savedModels = [];
let selectedCacheId = "";
let uiLanguage = "zh";

const DEFAULT_FIGURE_TEXT = Object.freeze({
  titleTemplate: "{name}",
  subtitleTemplate: "SINGLE WHEAT INDIVIDUAL · {spikes} FERTILE TILLERS · DOMINANT {belt} · SEED {seed}",
  axisTitle: "Height (cm)",
  note: "Shared crown · segmented culms · truncated-normal spike length",
  beltLabels: { TSB: "TSB", MSB: "MSB", BSB: "BSB" },
  markerLabels: { PH: "PH", HSH: "HSH", LSH: "LSH" },
  sizes: { title: 22, subtitle: 10, axisTitle: 12, axisTick: 11, belt: 11, marker: 10, note: 9 }
});

function t(key, values = {}) {
  let text = I18N[uiLanguage]?.[key] ?? I18N.zh[key] ?? key;
  Object.entries(values).forEach(([name, value]) => { text = text.replaceAll(`{${name}}`, value); });
  return text;
}

function setLanguage(language, renderAfter = true) {
  uiLanguage = language === "en" ? "en" : "zh";
  document.documentElement.lang = uiLanguage === "en" ? "en" : "zh-CN";
  document.title = t("appTitle");
  document.querySelectorAll("[data-i18n]").forEach(element => {
    element.textContent = t(element.dataset.i18n);
  });
  $("languageSelect").value = uiLanguage;
  $("plantSelect").setAttribute("aria-label", t("selectPlant"));
  $("addPlantBtn").setAttribute("aria-label", uiLanguage === "en" ? "Add a wheat plant" : "在同一坐标中新增一株小麦");
  $("addPlantBtn").title = uiLanguage === "en" ? "Add plant" : "新增一株小麦";
  try { localStorage.setItem("wheatModelerLanguage", uiLanguage); } catch (_) {}
  updateCacheControls();
  if (renderAfter) render();
}

function number(id, fallback = 0) {
  const value = Number($(id).value);
  return Number.isFinite(value) ? value : fallback;
}

function boundedFont(id, fallback) {
  return Math.max(6, Math.min(72, Math.round(number(id, fallback))));
}

function readFigureTextSettings() {
  return {
    titleTemplate: $("figureTitleTemplate").value,
    subtitleTemplate: $("figureSubtitleTemplate").value,
    axisTitle: $("axisTitleText").value,
    note: $("figureNoteText").value,
    beltLabels: { TSB: $("tsbText").value, MSB: $("msbText").value, BSB: $("bsbText").value },
    markerLabels: { PH: $("phText").value, HSH: $("hshText").value, LSH: $("lshText").value },
    sizes: {
      title: boundedFont("titleFontSize", 22),
      subtitle: boundedFont("subtitleFontSize", 10),
      axisTitle: boundedFont("axisTitleFontSize", 12),
      axisTick: boundedFont("axisTickFontSize", 11),
      belt: boundedFont("beltFontSize", 11),
      marker: boundedFont("markerFontSize", 10),
      note: boundedFont("noteFontSize", 9)
    }
  };
}

function applyFigureTextSettings(settings = DEFAULT_FIGURE_TEXT) {
  $("figureTitleTemplate").value = settings.titleTemplate ?? DEFAULT_FIGURE_TEXT.titleTemplate;
  $("figureSubtitleTemplate").value = settings.subtitleTemplate ?? DEFAULT_FIGURE_TEXT.subtitleTemplate;
  $("axisTitleText").value = settings.axisTitle ?? DEFAULT_FIGURE_TEXT.axisTitle;
  $("figureNoteText").value = settings.note ?? DEFAULT_FIGURE_TEXT.note;
  $("tsbText").value = settings.beltLabels?.TSB ?? DEFAULT_FIGURE_TEXT.beltLabels.TSB;
  $("msbText").value = settings.beltLabels?.MSB ?? DEFAULT_FIGURE_TEXT.beltLabels.MSB;
  $("bsbText").value = settings.beltLabels?.BSB ?? DEFAULT_FIGURE_TEXT.beltLabels.BSB;
  $("phText").value = settings.markerLabels?.PH ?? DEFAULT_FIGURE_TEXT.markerLabels.PH;
  $("hshText").value = settings.markerLabels?.HSH ?? DEFAULT_FIGURE_TEXT.markerLabels.HSH;
  $("lshText").value = settings.markerLabels?.LSH ?? DEFAULT_FIGURE_TEXT.markerLabels.LSH;
  $("titleFontSize").value = settings.sizes?.title ?? DEFAULT_FIGURE_TEXT.sizes.title;
  $("subtitleFontSize").value = settings.sizes?.subtitle ?? DEFAULT_FIGURE_TEXT.sizes.subtitle;
  $("axisTitleFontSize").value = settings.sizes?.axisTitle ?? DEFAULT_FIGURE_TEXT.sizes.axisTitle;
  $("axisTickFontSize").value = settings.sizes?.axisTick ?? DEFAULT_FIGURE_TEXT.sizes.axisTick;
  $("beltFontSize").value = settings.sizes?.belt ?? DEFAULT_FIGURE_TEXT.sizes.belt;
  $("markerFontSize").value = settings.sizes?.marker ?? DEFAULT_FIGURE_TEXT.sizes.marker;
  $("noteFontSize").value = settings.sizes?.note ?? DEFAULT_FIGURE_TEXT.sizes.note;
}

function saveFigureTextSettings() {
  try { localStorage.setItem(FIGURE_TEXT_KEY, JSON.stringify(readFigureTextSettings())); } catch (_) {}
}

function loadFigureTextSettings() {
  try {
    const stored = JSON.parse(localStorage.getItem(FIGURE_TEXT_KEY) || "null");
    applyFigureTextSettings(stored && typeof stored === "object" ? stored : DEFAULT_FIGURE_TEXT);
  } catch (_) {
    applyFigureTextSettings(DEFAULT_FIGURE_TEXT);
  }
}

function fillTextTemplate(template, values) {
  return String(template).replace(/\{(name|ph|hsh|lsh|spikes|belt|seed|current)\}/g, (_, key) => values[key] ?? "");
}

function figureTextValues(model, spikeCount, belt, current = "") {
  return {
    name: model.taxa,
    ph: model.ph.toFixed(1), hsh: model.hsh.toFixed(1), lsh: model.lsh.toFixed(1),
    spikes: spikeCount, belt, seed: model.seed, current
  };
}

function boundedPixels(id, fallback, minimum) {
  return Math.max(minimum, Math.min(8000, Math.round(number(id, fallback))));
}

function getCanvasSize() {
  return {
    width: boundedPixels("canvasWidth", 1600, 480),
    height: boundedPixels("canvasHeight", 900, 360)
  };
}

function proportionalPngSize(value, sourceDimension) {
  const canvas = getCanvasSize();
  let width;
  let height;
  if (sourceDimension === "height") {
    height = Math.max(360, Math.min(8000, Math.round(value)));
    width = Math.round(height * canvas.width / canvas.height);
  } else {
    width = Math.max(480, Math.min(8000, Math.round(value)));
    height = Math.round(width * canvas.height / canvas.width);
  }
  if (width > 8000) { width = 8000; height = Math.round(width * canvas.height / canvas.width); }
  if (height > 8000) { height = 8000; width = Math.round(height * canvas.width / canvas.height); }
  if (width < 480) { width = 480; height = Math.round(width * canvas.height / canvas.width); }
  if (height < 360) { height = 360; width = Math.round(height * canvas.width / canvas.height); }
  return { width, height };
}

function updatePngSizeOutput() {
  const width = boundedPixels("pngWidth", 1600, 480);
  const height = boundedPixels("pngHeight", 900, 360);
  $("pngSizeOutput").textContent = `${width} × ${height} px`;
}

function syncPngControls() {
  const preset = $("pngPreset").value;
  const canvas = getCanvasSize();
  const custom = preset === "custom";
  $("pngWidth").disabled = !custom;
  $("pngHeight").disabled = !custom;
  const requestedWidth = custom
    ? boundedPixels("pngWidth", canvas.width, 480)
    : preset === "canvas" ? canvas.width : Number(preset);
  const size = proportionalPngSize(requestedWidth, "width");
  $("pngWidth").value = size.width;
  $("pngHeight").value = size.height;
  updatePngSizeOutput();
}

function syncCanvasControls() {
  const preset = $("canvasPreset").value;
  const custom = preset === "custom";
  $("canvasWidth").disabled = !custom;
  $("canvasHeight").disabled = !custom;
  if (preset === "16:9") {
    $("canvasWidth").value = 1600;
    $("canvasHeight").value = 900;
  } else if (preset === "4:3") {
    $("canvasWidth").value = 1200;
    $("canvasHeight").value = 900;
  }
  syncPngControls();
}

function getPngSize() {
  return {
    width: boundedPixels("pngWidth", 1600, 480),
    height: boundedPixels("pngHeight", 900, 360)
  };
}

function fitSvgToCanvas(svg, targetWidth, targetHeight) {
  const viewBoxMatch = svg.match(/viewBox="([\d.-]+) ([\d.-]+) ([\d.-]+) ([\d.-]+)"/);
  const sourceViewBox = viewBoxMatch ? viewBoxMatch.slice(1).join(" ") : "0 0 900 900";
  const openingEnd = svg.indexOf(">");
  const inner = svg.slice(openingEnd + 1).replace(/<\/svg>\s*$/, "");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${targetWidth}" height="${targetHeight}" viewBox="0 0 ${targetWidth} ${targetHeight}" role="img" data-export-scope="canvas-only">
  <rect width="${targetWidth}" height="${targetHeight}" fill="#fffdf5"/>
  <svg x="0" y="0" width="${targetWidth}" height="${targetHeight}" viewBox="${sourceViewBox}" preserveAspectRatio="xMidYMid meet">${inner}</svg>
  </svg>`;
}

function previewCanvasSvg() {
  const canvasSvg = $("svgMount").firstElementChild;
  if (!canvasSvg || canvasSvg.tagName.toLowerCase() !== "svg") return currentSvg;
  return new XMLSerializer().serializeToString(canvasSvg);
}

function currentPlantCanvasSvg() {
  const model = plantModels[activePlantIndex] || readModel();
  const canvas = getCanvasSize();
  return fitSvgToCanvas(createWheatSvg(model), canvas.width, canvas.height);
}

function readModel() {
  return {
    taxa: $("taxa").value.trim() || "Virtual wheat",
    ph: number("ph", 145), hsh: number("hsh", 132), lsh: number("lsh", 62),
    belts: [
      { key: "TSB", label: "Top spike belt", count: Math.round(number("tsbSn", 0)), length: number("tsbL", 10), color: "#d4a536" },
      { key: "MSB", label: "Middle spike belt", count: Math.round(number("msbSn", 0)), length: number("msbL", 10), color: "#66995f" },
      { key: "BSB", label: "Bottom spike belt", count: Math.round(number("bsbSn", 0)), length: number("bsbL", 8), color: "#6394b1" }
    ],
    seed: Math.max(1, Math.round(number("seed", 2025))),
    spread: number("spread", 58) / 100,
    showBelts: $("showBelts").checked
  };
}

function validate(m) {
  if (!(m.ph > 0 && m.hsh >= 0 && m.lsh >= 0)) return { level: "error", text: t("heightInvalid") };
  if (m.lsh >= m.hsh) return { level: "error", text: t("lshLess") };
  if (m.hsh >= m.ph) return { level: "error", text: t("hshLess") };
  if (m.belts.some(b => b.count < 0 || b.length <= 0)) return { level: "error", text: t("beltInvalid") };
  const topGap = m.ph - m.hsh;
  if (topGap < m.belts[0].length * .8 || topGap > m.belts[0].length * 1.2) {
    return { level: "warn", text: t("topGapWarning", { gap: topGap.toFixed(1), length: m.belts[0].length.toFixed(1) }) };
  }
  return { level: "ok", text: "" };
}

function rng(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6D2B79F5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

function createWheatSvg(m, options = {}) {
  const textSettings = options.textSettings ?? readFigureTextSettings();
  const width = options.sceneOnly ? 760 : 900;
  const height = 900;
  const groundY = 805;
  const topY = 105;
  const axisX = 92;
  const chartLeft = 150;
  const chartRight = width - 55;
  const plotWidth = chartRight - chartLeft;
  const scalePh = options.scalePh ?? m.ph;
  const y = cm => groundY - (cm / scalePh) * (groundY - topY);
  const cmScale = (groundY - topY) / scalePh;
  const sl = m.hsh - m.lsh;
  const boundary1 = m.lsh + sl / 3;
  const boundary2 = m.lsh + sl * 2 / 3;
  const random = rng(m.seed);
  const beltRanges = [
    { ...m.belts[0], low: boundary2, high: m.hsh, fill: "#f7ecd0" },
    { ...m.belts[1], low: boundary1, high: boundary2, fill: "#eaf2e5" },
    { ...m.belts[2], low: m.lsh, high: boundary1, fill: "#e5f0f4" }
  ];
  const spikeColor = "#d2a63a";
  const dominantKey = dominantBelt(m.belts);
  const densityProfiles = verticalDensityProfiles(dominantKey);

  const ticks = [];
  const tickStep = scalePh <= 100 ? 10 : 20;
  for (let cm = 0; cm <= Math.ceil(scalePh / tickStep) * tickStep; cm += tickStep) {
    if (cm > scalePh + tickStep * .2) continue;
    const ty = y(cm);
    ticks.push(`<line x1="${axisX - 6}" y1="${ty}" x2="${axisX + 6}" y2="${ty}" class="axis-tick"/>`);
    ticks.push(`<text x="${axisX - 13}" y="${ty + 4}" text-anchor="end" class="axis-label">${cm}</text>`);
    if (cm > 0) ticks.push(`<line x1="${axisX + 9}" y1="${ty}" x2="${chartRight}" y2="${ty}" class="gridline"/>`);
  }

  const beltBackgrounds = m.showBelts ? beltRanges.map(b => {
    const by = y(b.high), bh = y(b.low) - y(b.high);
    return `<rect x="${chartLeft}" y="${by}" width="${plotWidth}" height="${bh}" fill="${b.fill}" opacity=".72"/>\n` +
      `<line x1="${chartLeft}" y1="${by}" x2="${chartRight}" y2="${by}" class="belt-boundary"/>\n` +
      `<text x="${chartRight - 13}" y="${by + bh / 2 + 4}" text-anchor="end" class="belt-label" fill="${b.color}">${esc(textSettings.beltLabels[b.key])}</text>`;
  }).join("\n") + `<line x1="${chartLeft}" y1="${y(m.lsh)}" x2="${chartRight}" y2="${y(m.lsh)}" class="belt-boundary"/>` : "";

  const culms = [];
  const foliage = [];
  const spikes = [];
  const total = beltRanges.reduce((sum, b) => sum + b.count, 0);
  const spreadPx = plotWidth * (0.32 + m.spread * .45);
  const centerX = chartLeft + plotWidth * .52;
  const rootX = centerX;
  const crownWidth = Math.min(112, 38 + total * 1.05);
  // The input has no tiller-order field. Treat the highest, central culm as the
  // main stem; assign a small set of the next tallest culms as primary tillers,
  // and the remaining (often numerous) culms as secondary tillers.
  const primaryBudget = total <= 1 ? 0 : Math.min(7, Math.max(2, Math.round(Math.sqrt(total))));
  let primaryAssigned = 0;
  let globalIndex = 0;

  beltRanges.forEach((belt, beltIndex) => {
    const verticalPositions = generateBeltPositions(
      belt,
      densityProfiles[belt.key],
      random,
      beltIndex === 0,
      beltIndex === 2
    );
    const fanPositions = generateFanPositions(belt.count, dominantKey, belt.key, random);
    for (let i = 0; i < belt.count; i++, globalIndex++) {
      const position = verticalPositions[i];
      const isHighest = position?.special === "highest";
      const baseCm = position?.height ?? belt.low;
      const stemTopY = y(baseCm);
      const fan = fanPositions[i] ?? .5;
      // Height and lateral position are correlated, but not deterministically:
      // taller ears tend toward the centre; shorter ears tend toward the edge.
      // The random term deliberately allows exceptions in both directions.
      const relativeHeight = Math.max(0, Math.min(1, (baseCm - m.lsh) / Math.max(.1, m.hsh - m.lsh)));
      const heightSpreadFactor = Math.max(.48, Math.min(1.52,
        .62 + (1 - relativeHeight) * .78 + (random() - .5) * .18
      ));
      const heightAdjustedFan = .5 + (fan - .5) * heightSpreadFactor;
      const rawLateralOffset = (heightAdjustedFan - .5) * spreadPx;
      const lateralSoftLimit = spreadPx * .45;
      const lateralOffset = lateralSoftLimit * Math.tanh(rawLateralOffset / lateralSoftLimit);
      const crownFan = .5 + lateralOffset / spreadPx;
      let xTop = centerX + lateralOffset + (random() - .5) * Math.max(3, spreadPx / Math.max(belt.count, 1) * .75);
      if (isHighest) xTop = centerX;
      const xBase = isHighest ? rootX : rootX + (crownFan - .5) * crownWidth * .88 + (random() - .5) * 4.5;
      const baseY = groundY - random() * 7;
      const availableToPh = Math.max(.1, m.ph - baseCm);
      const lowerLength = belt.length * .8;
      const upperLength = Math.min(belt.length * 1.2, availableToPh);
      let headLengthCm = isHighest
        ? m.ph - m.hsh
        : truncatedNormal(random, belt.length, belt.length * .08, lowerLength, Math.max(lowerLength, upperLength));
      headLengthCm = Math.min(headLengthCm, availableToPh, baseCm);
      const headPx = headLengthCm * cmScale;
      const headTopY = stemTopY - headPx;
      const stemColor = beltIndex === 2 ? "#4c8152" : "#39794b";
      const opacity = .7 + random() * .25;
      const tillerOrder = isHighest ? "main" : primaryAssigned < primaryBudget ? "primary" : "secondary";
      if (tillerOrder === "primary") primaryAssigned++;
      const internodeCount = tillerOrder === "main"
        ? 5
        : tillerOrder === "primary"
          ? (random() < .55 ? 5 : 4)
          : (random() < .55 ? 4 : 3);
      const baseStrokeWidth = total > 70 ? 1.25 : total > 40 ? 1.65 : 2.05;
      const strokeWidth = baseStrokeWidth * (tillerOrder === "main" ? 1.28 : tillerOrder === "primary" ? 1.08 : .92);
      const outward = xTop === xBase ? (random() > .5 ? 1 : -1) : Math.sign(xTop - xBase);
      const lateralDistance = Math.abs(xTop - xBase);
      const curve = isHighest
        ? (random() - .5) * 8
        : outward * (8 + random() * 14 + lateralDistance * .06);
      const geometry = culmGeometry(xBase, xTop, stemTopY, baseY, curve, internodeCount, random);
      culms.push(culmMarkup(geometry, stemColor, strokeWidth, opacity, tillerOrder, baseCm, Math.abs(xTop - centerX)));

      const flagSide = globalIndex % 2 ? 1 : -1;
      if (total < 28 || globalIndex % 2 === 0) {
        // Flag leaves arise from the uppermost visible node, below the peduncle.
        const flagPoint = geometry.points[geometry.points.length - 2];
        foliage.push(leafMarkup(flagPoint.x, flagPoint.y, flagSide, 36 + random() * 31, 9 + random() * 11, "#5f933d", .78));
      }
      if (globalIndex % 4 === 0) {
        const lowerPoint = geometry.points[Math.max(1, geometry.points.length - 3)];
        foliage.push(leafMarkup(lowerPoint.x, lowerPoint.y, -flagSide, 40 + random() * 35, 5 + random() * 10, "#759f43", .66));
      }
      const spikeAngle = isHighest ? 0 : Math.max(-7, Math.min(7, culmTopAngle(geometry)));
      spikes.push(spikeMarkup(xTop, stemTopY, headTopY, spikeColor, random, total, belt.key, position?.zone ?? "middle", baseCm, headLengthCm, spikeAngle));
    }
  });

  const rootMarks = rootMarkup(rootX, groundY, crownWidth, random);
  const plantMarkup = `<g filter="url(#softShadow)" data-plant-name="${esc(m.taxa)}">${culms.join("\n")}${foliage.join("\n")}${spikes.join("\n")}${rootMarks}</g>`;

  if (options.sceneOnly) {
    return { content: plantMarkup, centerX, groundY, topY };
  }

  const annotations = [
    [textSettings.markerLabels.PH, m.ph, "#173c32"], [textSettings.markerLabels.HSH, m.hsh, "#b48216"], [textSettings.markerLabels.LSH, m.lsh, "#477c9a"]
  ].map(([label, value, color]) => {
    const ay = y(value);
    const annotationText = `${label}${label ? " " : ""}${Number(value).toFixed(1)}`;
    const calloutWidth = Math.max(58, Math.min(136, 22 + annotationText.length * textSettings.sizes.marker * .58));
    const calloutX = chartLeft - 2;
    return `<line x1="${axisX + 7}" y1="${ay}" x2="${chartLeft - 8}" y2="${ay}" stroke="${color}" stroke-width="1.6"/>\n`+
      `<rect x="${calloutX}" y="${ay - 11}" width="${calloutWidth.toFixed(1)}" height="22" rx="11" fill="${color}"/>\n`+
      `<text x="${(calloutX + calloutWidth / 2).toFixed(1)}" y="${ay + 4}" text-anchor="middle" class="callout">${esc(annotationText)}</text>`;
  }).join("\n");

  const textValues = figureTextValues(m, total, dominantKey);
  const figureTitle = fillTextTemplate(textSettings.titleTemplate, textValues);
  const figureSubtitle = fillTextTemplate(textSettings.subtitleTemplate, textValues);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="svgTitle svgDesc">
  <title id="svgTitle">Wheat spike-layer model of ${esc(m.taxa)}</title>
  <desc id="svgDesc">PH ${m.ph} cm, HSH ${m.hsh} cm, LSH ${m.lsh} cm; ${total} spikes across three vertical spike belts.</desc>
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf5"/><stop offset="1" stop-color="#f5f6ec"/></linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#28563f" flood-opacity=".12"/></filter>
  </defs>
  <style>
    text{font-family:"Times New Roman",Times,serif}.gridline{stroke:#dfe4dc;stroke-width:1;stroke-dasharray:3 6}.axis-line{stroke:#284d41;stroke-width:1.6}.axis-tick{stroke:#284d41;stroke-width:1.3}.axis-label{fill:#6d7d77;font-size:${textSettings.sizes.axisTick}px}.axis-title{fill:#284d41;font-size:${textSettings.sizes.axisTitle}px;font-weight:700;letter-spacing:.08em}.belt-boundary{stroke:#96a49d;stroke-width:1;stroke-dasharray:5 5}.belt-label{font-size:${textSettings.sizes.belt}px;font-weight:800;letter-spacing:.06em}.callout{fill:white;font-size:${textSettings.sizes.marker}px;font-weight:800}.title{fill:#163d32;font-size:${textSettings.sizes.title}px;font-weight:700}.subtitle{fill:#718078;font-size:${textSettings.sizes.subtitle}px}.note{fill:#6d7d77;font-size:${textSettings.sizes.note}px}
  </style>
  <rect width="${width}" height="${height}" rx="18" fill="url(#sky)"/>
  <text x="${width / 2}" y="39" text-anchor="middle" class="title">${esc(figureTitle)}</text>
  <text x="${width / 2}" y="58" text-anchor="middle" class="subtitle">${esc(figureSubtitle)}</text>
  ${beltBackgrounds}
  ${ticks.join("\n")}
  <line x1="${axisX}" y1="${topY - 14}" x2="${axisX}" y2="${groundY}" class="axis-line"/>
  <path d="M ${axisX - 5} ${topY - 6} L ${axisX} ${topY - 15} L ${axisX + 5} ${topY - 6}" fill="none" class="axis-line"/>
  <text x="${axisX}" y="${topY - 30}" text-anchor="middle" class="axis-title">${esc(textSettings.axisTitle)}</text>
  ${annotations}
  ${plantMarkup}
  <text x="${chartRight}" y="${height - 24}" text-anchor="end" class="note">${esc(textSettings.note)}</text>
  </svg>`;
}

function createComparisonSvg(models, activeIndex = models.length - 1) {
  const textSettings = readFigureTextSettings();
  const height = 900;
  const groundY = 805;
  const topY = 105;
  const axisX = 88;
  const axisArea = 128;
  const slotWidth = 600;
  const width = axisArea + slotWidth * models.length + 60;
  const chartRight = width - 28;
  const commonPh = Math.max(...models.map(model => model.ph));
  const y = cm => groundY - (cm / commonPh) * (groundY - topY);
  const tickStep = commonPh <= 100 ? 10 : 20;
  const ticks = [];
  for (let cm = 0; cm <= Math.ceil(commonPh / tickStep) * tickStep; cm += tickStep) {
    if (cm > commonPh + tickStep * .2) continue;
    const ty = y(cm);
    ticks.push(`<line x1="${axisX - 6}" y1="${ty}" x2="${axisX + 6}" y2="${ty}" class="axis-tick"/>`);
    ticks.push(`<text x="${axisX - 13}" y="${ty + 4}" text-anchor="end" class="axis-label">${cm}</text>`);
    if (cm > 0) ticks.push(`<line x1="${axisX + 9}" y1="${ty}" x2="${chartRight}" y2="${ty}" class="gridline"/>`);
  }

  const columns = models.map((model, index) => {
    const slotLeft = axisArea + index * slotWidth;
    const targetCenter = slotLeft + slotWidth / 2;
    const scene = createWheatSvg(model, { scalePh: commonPh, sceneOnly: true, textSettings });
    const translateX = targetCenter - scene.centerX;
    const sl = model.hsh - model.lsh;
    const boundary1 = model.lsh + sl / 3;
    const boundary2 = model.lsh + sl * 2 / 3;
    const beltRects = model.showBelts ? [
      { ...model.belts[0], low: boundary2, high: model.hsh, fill: "#f7ecd0" },
      { ...model.belts[1], low: boundary1, high: boundary2, fill: "#eaf2e5" },
      { ...model.belts[2], low: model.lsh, high: boundary1, fill: "#e5f0f4" }
    ].map(belt => {
      const beltTop = y(belt.high);
      const beltBottom = y(belt.low);
      const beltHeight = beltBottom - beltTop;
      return `<rect x="${slotLeft + 12}" y="${beltTop}" width="${slotWidth - 24}" height="${beltHeight}" fill="${belt.fill}" opacity=".46"/>
        <line x1="${slotLeft + 12}" y1="${beltTop}" x2="${slotLeft + slotWidth - 12}" y2="${beltTop}" class="belt-boundary"/>
        <text x="${slotLeft + slotWidth - 18}" y="${beltTop + beltHeight / 2 + 3}" text-anchor="end" class="belt-label" fill="${belt.color}">${esc(textSettings.beltLabels[belt.key])}</text>`;
    }).join("") + `<line x1="${slotLeft + 12}" y1="${y(model.lsh)}" x2="${slotLeft + slotWidth - 12}" y2="${y(model.lsh)}" class="belt-boundary"/>` : "";
    const markers = [
      [textSettings.markerLabels.PH, model.ph, "#173c32"],
      [textSettings.markerLabels.HSH, model.hsh, "#b48216"],
      [textSettings.markerLabels.LSH, model.lsh, "#477c9a"]
    ].map(([label, value, color]) => `<g><line x1="${targetCenter - 26}" y1="${y(value)}" x2="${targetCenter + 26}" y2="${y(value)}" stroke="${color}" stroke-width="1.25" opacity=".62"/><text x="${targetCenter + 31}" y="${y(value) + 3}" class="plant-marker" fill="${color}">${esc(label)}</text></g>`).join("");
    const modelSpikes = model.belts.reduce((sum, belt) => sum + belt.count, 0);
    const values = figureTextValues(model, modelSpikes, dominantBelt(model.belts), index === activeIndex ? " · CURRENT" : "");
    const comparisonSubtitleTemplate = textSettings.subtitleTemplate === DEFAULT_FIGURE_TEXT.subtitleTemplate
      ? "PH {ph} · HSH {hsh} · LSH {lsh} cm{current}"
      : textSettings.subtitleTemplate;
    return `${beltRects}
      <text x="${targetCenter}" y="38" text-anchor="middle" class="plant-title">${esc(fillTextTemplate(textSettings.titleTemplate, values))}</text>
      <text x="${targetCenter}" y="57" text-anchor="middle" class="plant-subtitle">${esc(fillTextTemplate(comparisonSubtitleTemplate, values))}</text>
      ${markers}
      <g transform="translate(${translateX.toFixed(2)} 0)">${scene.content}</g>`;
  }).join("\n");

  const totalSpikes = models.reduce((sum, model) => sum + model.belts.reduce((beltSum, belt) => beltSum + belt.count, 0), 0);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" data-plant-count="${models.length}" role="img" aria-labelledby="svgTitle svgDesc">
  <title id="svgTitle">Comparison of ${models.length} wheat plants on a shared height scale</title>
  <desc id="svgDesc">${models.length} wheat plants share a centimetre height axis and a 0 cm crown baseline, with ${totalSpikes} spikes in total.</desc>
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf5"/><stop offset="1" stop-color="#f5f6ec"/></linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#28563f" flood-opacity=".12"/></filter>
  </defs>
  <style>
    text{font-family:"Times New Roman",Times,serif}.gridline{stroke:#dfe4dc;stroke-width:1;stroke-dasharray:3 6}.axis-line{stroke:#284d41;stroke-width:1.6}.axis-tick{stroke:#284d41;stroke-width:1.3}.axis-label{fill:#6d7d77;font-size:${textSettings.sizes.axisTick}px}.axis-title{fill:#284d41;font-size:${textSettings.sizes.axisTitle}px;font-weight:700;letter-spacing:.08em}.belt-boundary{stroke:#87978f;stroke-width:1;stroke-dasharray:6 5}.belt-label{font-size:${textSettings.sizes.belt}px;font-weight:700;letter-spacing:.04em}.plant-title{fill:#163d32;font-size:${textSettings.sizes.title}px;font-weight:700}.plant-subtitle{fill:#718078;font-size:${textSettings.sizes.subtitle}px}.plant-marker{font-size:${textSettings.sizes.marker}px;font-weight:700}.note{fill:#6d7d77;font-size:${textSettings.sizes.note}px}
  </style>
  <rect width="${width}" height="${height}" rx="18" fill="url(#sky)"/>
  ${ticks.join("\n")}
  <line x1="${axisX}" y1="${topY - 14}" x2="${axisX}" y2="${groundY}" class="axis-line"/>
  <path d="M ${axisX - 5} ${topY - 6} L ${axisX} ${topY - 15} L ${axisX + 5} ${topY - 6}" fill="none" class="axis-line"/>
  <text x="${axisX}" y="${topY - 30}" text-anchor="middle" class="axis-title">${esc(textSettings.axisTitle)}</text>
  <line x1="${axisX + 9}" y1="${groundY}" x2="${chartRight}" y2="${groundY}" stroke="#8d9a92" stroke-width="1.15"/>
  ${columns}
  <text x="${chartRight}" y="${height - 24}" text-anchor="end" class="note">${esc(textSettings.note === DEFAULT_FIGURE_TEXT.note ? "Shared cm scale · all crowns aligned at the 0 cm baseline" : textSettings.note)}</text>
  </svg>`;
}

function dominantBelt(belts) {
  const maxCount = Math.max(...belts.map(b => b.count));
  const winners = belts.filter(b => b.count === maxCount && maxCount > 0);
  return winners.length === 1 ? winners[0].key : "MIXED";
}

function verticalDensityProfiles(dominantKey) {
  if (dominantKey === "TSB") {
    return { TSB: [.20, .50, .30], MSB: [.46, .33, .21], BSB: [.46, .33, .21] };
  }
  if (dominantKey === "MSB") {
    return { TSB: [.17, .30, .53], MSB: [.42, .40, .18], BSB: [.46, .33, .21] };
  }
  if (dominantKey === "BSB") {
    return { TSB: [.45, .34, .21], MSB: [.45, .34, .21], BSB: [.42, .34, .24] };
  }
  return { TSB: [1, 1, 1], MSB: [1, 1, 1], BSB: [1, 1, 1] };
}

function allocateZoneCounts(count, weights) {
  if (count <= 0) return [0, 0, 0];
  const sum = weights.reduce((a, b) => a + b, 0);
  const raw = weights.map(w => count * w / sum);
  const counts = raw.map(Math.floor);
  let remaining = count - counts.reduce((a, b) => a + b, 0);
  const order = [0, 1, 2].sort((a, b) => (raw[b] - counts[b]) - (raw[a] - counts[a]) || weights[b] - weights[a] || a - b);
  for (let i = 0; i < remaining; i++) counts[order[i % order.length]]++;
  return counts;
}

function generateBeltPositions(belt, weights, random, forceTop, forceBottom) {
  const counts = allocateZoneCounts(belt.count, weights);
  if (forceTop && belt.count > 0 && counts[0] === 0) {
    const donor = counts[1] >= counts[2] ? 1 : 2;
    counts[donor]--; counts[0]++;
  }
  if (forceBottom && belt.count > 0 && counts[2] === 0) {
    const donor = counts[0] >= counts[1] ? 0 : 1;
    counts[donor]--; counts[2]++;
  }
  const range = belt.high - belt.low;
  const positions = [];
  const zoneNames = ["top", "middle", "bottom"];
  counts.forEach((zoneCount, zoneIndex) => {
    const zoneLow = belt.low + range * (2 - zoneIndex) / 3;
    const zoneHigh = belt.low + range * (3 - zoneIndex) / 3;
    for (let i = 0; i < zoneCount; i++) {
      positions.push({ height: zoneLow + (zoneHigh - zoneLow) * random(), zone: zoneNames[zoneIndex], special: "" });
    }
  });
  if (forceTop && positions.length) {
    const item = positions.find(p => p.zone === "top") || positions[0];
    item.height = belt.high; item.special = "highest";
  }
  if (forceBottom && positions.length) {
    const item = positions.find(p => p.zone === "bottom") || positions[positions.length - 1];
    item.height = belt.low; item.special = "lowest";
  }
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  return positions;
}

function generateFanPositions(count, dominantKey, beltKey, random) {
  if (count <= 0) return [];
  const widthProfiles = {
    TSB: { TSB: 1.00, MSB: .90, BSB: .82 },
    MSB: { TSB: .64, MSB: 1.00, BSB: .88 },
    BSB: { TSB: .34, MSB: .68, BSB: 1.00 },
    MIXED: { TSB: .78, MSB: .90, BSB: 1.00 }
  };
  const factor = widthProfiles[dominantKey][beltKey];
  const values = Array.from({ length: count }, (_, i) => {
    const rank = count === 1 ? .5 : i / (count - 1);
    return .5 + (rank - .5) * factor;
  });
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }
  return values;
}

function truncatedNormal(random, mean, sd, min, max) {
  if (max <= min) return min;
  for (let attempt = 0; attempt < 24; attempt++) {
    const u1 = Math.max(Number.EPSILON, random());
    const u2 = random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const value = mean + z * sd;
    if (value >= min && value <= max) return value;
  }
  return Math.min(max, Math.max(min, mean));
}

function rootMarkup(rootX, groundY, crownWidth, random) {
  const parts = [`<g aria-label="Shared crown and root system">`];
  const crownRadius = crownWidth * .47;
  parts.push(`<path d="M ${rootX - crownRadius - 38} ${groundY + 5} Q ${rootX - 25} ${groundY - 2} ${rootX + 4} ${groundY + 3} Q ${rootX + 37} ${groundY + 9} ${rootX + crownRadius + 40} ${groundY + 3}" fill="none" stroke="#9a7a45" stroke-width="2.1" opacity=".72"/>`);
  parts.push(`<path d="M ${rootX - crownRadius - 22} ${groundY + 9} Q ${rootX - 8} ${groundY + 1} ${rootX + crownRadius + 25} ${groundY + 8}" fill="none" stroke="#c2a66e" stroke-width="3" opacity=".42"/>`);
  for (let i = 0; i < 21; i++) {
    const startX = rootX + (random() - .5) * crownWidth * .85;
    const endX = rootX + (random() - .5) * (crownWidth + 72);
    const endY = groundY + 22 + random() * 42;
    parts.push(`<path d="M ${startX.toFixed(1)} ${groundY + 2} Q ${(rootX + (endX - rootX) * .35).toFixed(1)} ${(groundY + 15 + random() * 15).toFixed(1)} ${endX.toFixed(1)} ${endY.toFixed(1)}" fill="none" stroke="#806b3d" stroke-width="${(.65 + random() * .65).toFixed(2)}" opacity=".64"/>`);
  }
  for (let i = 0; i < 9; i++) {
    const side = i % 2 ? 1 : -1;
    const startX = rootX + (random() - .5) * crownWidth * .72;
    const startY = groundY - 2 - random() * 12;
    const length = 48 + random() * 76;
    const rise = 18 + random() * 42;
    parts.push(leafMarkup(startX, startY, side, length, rise, i % 3 === 0 ? "#86a94a" : "#658f3e", .72 + random() * .18));
  }
  for (let i = 0; i < 11; i++) {
    const sheathX = rootX - crownRadius * .78 + (i / 10) * crownRadius * 1.56;
    const lean = (sheathX - rootX) * .38;
    parts.push(`<path d="M ${(sheathX - 3).toFixed(1)} ${groundY + 2} Q ${(sheathX + lean).toFixed(1)} ${groundY - 31 - random() * 18} ${(sheathX + lean * 1.35).toFixed(1)} ${groundY - 49 - random() * 18} Q ${(sheathX + 2 + lean * .35).toFixed(1)} ${groundY - 22} ${(sheathX + 3).toFixed(1)} ${groundY + 2} Z" fill="#557f3b" opacity=".78"/>`);
  }
  parts.push(`<ellipse cx="${rootX}" cy="${groundY + 1}" rx="${crownRadius.toFixed(1)}" ry="9" fill="#315f3d" opacity=".90"/>`);
  parts.push(`</g>`);
  return parts.join("");
}

function culmGeometry(baseX, topX, topY, groundY, curve, internodeCount, random) {
  const height = groundY - topY;
  const dx = topX - baseX;
  // Lower internodes are short; the distal internodes, especially the
  // peduncle, contribute progressively more of the mature culm height.
  const weightSets = {
    3: [.20, .30, .50],
    4: [.14, .20, .27, .39],
    5: [.10, .14, .19, .24, .33],
    6: [.07, .10, .14, .18, .22, .29]
  };
  const weights = weightSets[internodeCount] || weightSets[5];
  const points = [{ x: baseX, y: groundY }];
  let fraction = 0;
  for (let i = 0; i < weights.length; i++) {
    fraction += weights[i];
    if (i === weights.length - 1) {
      points.push({ x: topX, y: topY });
      continue;
    }
    const baselineX = baseX + dx * fraction;
    const bowX = curve * Math.sin(Math.PI * fraction);
    const nodeJitter = (random() - .5) * Math.min(5, 1.2 + height / 230);
    points.push({
      x: baselineX + bowX + nodeJitter,
      y: groundY - height * fraction
    });
  }
  return { points, internodeCount: weights.length };
}

function culmTopAngle(g) {
  const top = g.points[g.points.length - 1];
  const below = g.points[g.points.length - 2];
  return Math.atan2(top.x - below.x, below.y - top.y) * 180 / Math.PI;
}

function culmMarkup(g, color, strokeWidth, opacity, tillerOrder, baseHeightCm, lateralOffsetPx) {
  const d = g.points.map((point, index) => `${index ? "L" : "M"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
  const path = `<path d="${d}" fill="none" stroke="#a8bd62" stroke-width="${(strokeWidth + 1.15).toFixed(2)}" opacity="${(opacity * .68).toFixed(2)}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth.toFixed(2)}" opacity="${opacity.toFixed(2)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const nodes = g.points.slice(1, -1).map((point, index) => {
    const previous = g.points[index];
    const next = g.points[index + 2];
    const angle = Math.atan2(next.y - previous.y, next.x - previous.x) * 180 / Math.PI;
    return `<ellipse cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" rx="${Math.max(2.2, strokeWidth * 1.55).toFixed(2)}" ry="${Math.max(1.15, strokeWidth * .78).toFixed(2)}" transform="rotate(${(angle + 90).toFixed(1)} ${point.x.toFixed(1)} ${point.y.toFixed(1)})" fill="#c3b05b" stroke="#647d38" stroke-width=".55" opacity="${Math.min(1, opacity + .08).toFixed(2)}"/>`;
  }).join("");
  return `<g data-tiller-order="${tillerOrder}" data-internode-count="${g.internodeCount}" data-base-height-cm="${baseHeightCm.toFixed(3)}" data-lateral-offset-px="${lateralOffsetPx.toFixed(3)}">${path}${nodes}</g>`;
}

function leafMarkup(x, y, side, length, rise, color, opacity) {
  const tipX = x + side * length;
  const tipY = y - rise + length * .12;
  const c1x = x + side * length * .28;
  const c2x = x + side * length * .72;
  const upperC1Y = y - rise * .78;
  const upperC2Y = tipY - rise * .24;
  const bladeWidth = Math.max(3.5, Math.min(7.5, length * .075));
  return `<path d="M ${x.toFixed(1)} ${y.toFixed(1)} C ${c1x.toFixed(1)} ${upperC1Y.toFixed(1)} ${c2x.toFixed(1)} ${upperC2Y.toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)} C ${c2x.toFixed(1)} ${(upperC2Y + bladeWidth).toFixed(1)} ${c1x.toFixed(1)} ${(upperC1Y + bladeWidth).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)} Z" fill="${color}" stroke="#4d742f" stroke-width=".65" opacity="${opacity}"/>`;
}

function spikeMarkup(x, baseY, topY, color, random, total, beltKey, verticalZone, baseHeightCm, spikeLengthCm, angle) {
  const height = baseY - topY;
  const spikelets = Math.max(8, Math.min(total > 75 ? 13 : 15, Math.round(height / 4.7)));
  const step = height / spikelets;
  const beltWidthFactor = beltKey === "BSB" ? .84 : beltKey === "MSB" ? .94 : 1;
  const width = Math.max(4.2, Math.min(9.4, height * .12)) * beltWidthFactor;
  const stroke = total > 75 ? .42 : .55;
  const rachisBend = (random() - .5) * Math.min(3.2, width * .45);
  const parts = [`<g data-belt="${beltKey}" data-vertical-zone="${verticalZone}" data-base-height-cm="${baseHeightCm.toFixed(3)}" data-spike-length-cm="${spikeLengthCm.toFixed(3)}" data-spike-width-px="${width.toFixed(3)}" transform="rotate(${angle.toFixed(2)} ${x.toFixed(1)} ${baseY.toFixed(1)})">`];
  parts.push(`<path d="M ${x.toFixed(1)} ${baseY.toFixed(1)} Q ${(x + rachisBend).toFixed(1)} ${((baseY + topY) / 2).toFixed(1)} ${x.toFixed(1)} ${topY.toFixed(1)}" fill="none" stroke="#80671e" stroke-width="${Math.max(.8, stroke + .35).toFixed(2)}"/>`);
  for (let j = 0; j < spikelets; j++) {
    const fraction = (j + .48) / spikelets;
    const gy = baseY - fraction * height;
    const centerX = x + rachisBend * Math.sin(Math.PI * fraction) + (random() - .5) * .45;
    const taper = .40 + .60 * Math.sin(((j + 1) / (spikelets + 1)) * Math.PI) ** .72;
    const w = width * taper;
    const h = Math.max(5.4, step * 1.72);
    const frontSide = j % 2 ? 1 : -1;
    const leftTipX = centerX - w * (.72 + random() * .08);
    const rightTipX = centerX + w * (.72 + random() * .08);
    const tipY = gy - h * (.68 + random() * .05);
    const leftTipY = tipY + (frontSide < 0 ? -h * .05 : h * .07);
    const rightTipY = tipY + (frontSide > 0 ? -h * .05 : h * .07);
    const lowerY = gy + h * .34;
    const leftFill = frontSide < 0 ? "#dfae35" : "#c9972b";
    const rightFill = frontSide > 0 ? "#dfae35" : "#c9972b";

    // Each rachis level carries a dense pair of overlapping spikelets. The
    // pointed, convex glumes create a full wheat-ear silhouette rather than a
    // row of separate flat triangles.
    parts.push(`<path d="M ${centerX.toFixed(1)} ${lowerY.toFixed(1)} C ${(centerX - w * .38).toFixed(1)} ${(gy + h * .30).toFixed(1)} ${(centerX - w * 1.02).toFixed(1)} ${(gy - h * .08).toFixed(1)} ${leftTipX.toFixed(1)} ${leftTipY.toFixed(1)} C ${(centerX - w * .36).toFixed(1)} ${(gy - h * .62).toFixed(1)} ${(centerX - w * .10).toFixed(1)} ${(gy - h * .43).toFixed(1)} ${centerX.toFixed(1)} ${(gy - h * .29).toFixed(1)} Z" fill="${leftFill}" stroke="#745d18" stroke-width="${stroke}"/>`);
    parts.push(`<path d="M ${centerX.toFixed(1)} ${lowerY.toFixed(1)} C ${(centerX + w * .38).toFixed(1)} ${(gy + h * .30).toFixed(1)} ${(centerX + w * 1.02).toFixed(1)} ${(gy - h * .08).toFixed(1)} ${rightTipX.toFixed(1)} ${rightTipY.toFixed(1)} C ${(centerX + w * .36).toFixed(1)} ${(gy - h * .62).toFixed(1)} ${(centerX + w * .10).toFixed(1)} ${(gy - h * .43).toFixed(1)} ${centerX.toFixed(1)} ${(gy - h * .29).toFixed(1)} Z" fill="${rightFill}" stroke="#745d18" stroke-width="${stroke}"/>`);

    const frontTipX = centerX + frontSide * w * .48;
    parts.push(`<path d="M ${centerX.toFixed(1)} ${(gy + h * .27).toFixed(1)} C ${(centerX + frontSide * w * .12).toFixed(1)} ${(gy + h * .10).toFixed(1)} ${(centerX + frontSide * w * .56).toFixed(1)} ${(gy - h * .18).toFixed(1)} ${frontTipX.toFixed(1)} ${(gy - h * .58).toFixed(1)} C ${(centerX + frontSide * w * .18).toFixed(1)} ${(gy - h * .48).toFixed(1)} ${(centerX + frontSide * w * .05).toFixed(1)} ${(gy - h * .31).toFixed(1)} ${centerX.toFixed(1)} ${(gy - h * .18).toFixed(1)} Z" fill="#edc34d" stroke="#9a7b20" stroke-width="${Math.max(.32, stroke - .1).toFixed(2)}" opacity=".94"/>`);
    parts.push(`<path d="M ${centerX.toFixed(1)} ${(gy + h * .22).toFixed(1)} L ${leftTipX.toFixed(1)} ${(leftTipY + h * .08).toFixed(1)} M ${centerX.toFixed(1)} ${(gy + h * .22).toFixed(1)} L ${rightTipX.toFixed(1)} ${(rightTipY + h * .08).toFixed(1)}" fill="none" stroke="#8e711d" stroke-width=".40" opacity=".78"/>`);

    const awnBase = Math.min(17, 5 + height * .13);
    const leftAwn = awnBase * (.72 + random() * .30);
    const rightAwn = awnBase * (.72 + random() * .30);
    const primaryTipX = frontSide < 0 ? leftTipX : rightTipX;
    const primaryTipY = frontSide < 0 ? leftTipY : rightTipY;
    const primaryAwn = frontSide < 0 ? leftAwn : rightAwn;
    parts.push(`<path d="M ${primaryTipX.toFixed(1)} ${primaryTipY.toFixed(1)} Q ${(primaryTipX + frontSide * primaryAwn * .18).toFixed(1)} ${(primaryTipY - primaryAwn * .45).toFixed(1)} ${(primaryTipX + frontSide * primaryAwn * .34).toFixed(1)} ${(primaryTipY - primaryAwn).toFixed(1)}" fill="none" stroke="#a78936" stroke-width=".52" opacity=".68"/>`);
    if (j % 3 === 0) {
      const backSide = -frontSide;
      const backTipX = backSide < 0 ? leftTipX : rightTipX;
      const backTipY = backSide < 0 ? leftTipY : rightTipY;
      const backAwn = (backSide < 0 ? leftAwn : rightAwn) * .72;
      parts.push(`<path d="M ${backTipX.toFixed(1)} ${backTipY.toFixed(1)} Q ${(backTipX + backSide * backAwn * .16).toFixed(1)} ${(backTipY - backAwn * .42).toFixed(1)} ${(backTipX + backSide * backAwn * .30).toFixed(1)} ${(backTipY - backAwn).toFixed(1)}" fill="none" stroke="#a78936" stroke-width=".48" opacity=".54"/>`);
    }
  }
  const topAwn = Math.min(19, 6 + height * .16);
  parts.push(`<path d="M ${x.toFixed(1)} ${(topY + 3).toFixed(1)} L ${x.toFixed(1)} ${Math.max(72, topY - topAwn).toFixed(1)} M ${(x - width * .24).toFixed(1)} ${(topY + 5).toFixed(1)} L ${(x - width * .42).toFixed(1)} ${Math.max(72, topY - topAwn * .72).toFixed(1)} M ${(x + width * .24).toFixed(1)} ${(topY + 5).toFixed(1)} L ${(x + width * .42).toFixed(1)} ${Math.max(72, topY - topAwn * .72).toFixed(1)}" fill="none" stroke="#9a7f21" stroke-width=".58" opacity=".78"/>`);
  parts.push(`<path d="M ${(x - width * .30).toFixed(1)} ${(baseY + 1).toFixed(1)} Q ${x.toFixed(1)} ${(baseY + 4).toFixed(1)} ${(x + width * .30).toFixed(1)} ${(baseY + 1).toFixed(1)} L ${(x + width * .22).toFixed(1)} ${(baseY - 3).toFixed(1)} L ${(x - width * .22).toFixed(1)} ${(baseY - 3).toFixed(1)} Z" fill="#b99932" stroke="#78621e" stroke-width=".45"/>`);
  parts.push(`</g>`);
  return parts.join("");
}

function render() {
  const m = readModel();
  if (!plantModels.length) plantModels.push(m);
  if (!applyingPlantModel) plantModels[activePlantIndex] = m;
  const check = validate(m);
  const validation = $("validation");
  validation.className = `validation ${check.level === "ok" ? "" : check.level}`;
  validation.textContent = check.text;
  $("spreadOutput").textContent = `${Math.round(m.spread * 100)}%`;
  const sl = m.hsh - m.lsh;
  $("slMetric").textContent = `${sl.toFixed(1)} cm`;
  $("slrateMetric").textContent = m.hsh > 0 ? (sl / m.hsh).toFixed(3) : "—";
  $("snMetric").textContent = m.belts.reduce((s, b) => s + b.count, 0);
  $("dominantMetric").textContent = dominantBelt(m.belts);
  const valid = check.level !== "error";
  ["downloadCurrentSvgBtn", "downloadCurrentPngBtn", "downloadAllSvgBtn", "downloadAllPngBtn"].forEach(id => $(id).disabled = !valid);
  $("addPlantBtn").disabled = !valid || plantModels.length >= MAX_COMPARISON_PLANTS;
  updatePlantControls();
  if (!valid) {
    $("svgMount").innerHTML = `<div class="empty-state">${esc(t("fixParameters"))}</div>`;
    return;
  }
  const visiblePlants = plantModels;
  const baseSvg = visiblePlants.length === 1 ? createWheatSvg(m) : createComparisonSvg(visiblePlants, activePlantIndex);
  const canvas = getCanvasSize();
  currentSvg = fitSvgToCanvas(baseSvg, canvas.width, canvas.height);
  $("svgMount").innerHTML = currentSvg;
  const countLabel = visiblePlants.length > 1 ? t("compareCount", { count: visiblePlants.length }) : t("livePreview");
  $("previewStatus").textContent = check.level === "warn" ? `${countLabel} · ${t("checkHint")}` : countLabel;
}

function addComparisonPlant() {
  const current = readModel();
  if (validate(current).level === "error" || plantModels.length >= MAX_COMPARISON_PLANTS) return;
  plantModels[activePlantIndex] = current;
  const baseName = current.taxa.replace(/\s*·\s*\d+$/, "");
  const added = cloneModel(current);
  added.taxa = `${baseName} · ${plantModels.length + 1}`;
  added.seed = current.seed >= 999999 ? 1 : current.seed + 1;
  plantModels.push(added);
  activePlantIndex = plantModels.length - 1;
  applyModelToForm(added);
}

function cloneModel(model) {
  return {
    ...model,
    belts: model.belts.map(belt => ({ ...belt }))
  };
}

function normalizeCachedModel(raw) {
  if (!raw || !Array.isArray(raw.belts) || raw.belts.length < 3) return null;
  const numeric = (value, fallback) => Number.isFinite(Number(value)) ? Number(value) : fallback;
  const beltDefaults = [
    { key: "TSB", label: "Top spike belt", color: "#d4a536", length: 10 },
    { key: "MSB", label: "Middle spike belt", color: "#66995f", length: 10 },
    { key: "BSB", label: "Bottom spike belt", color: "#6394b1", length: 8 }
  ];
  const model = {
    taxa: String(raw.taxa || "Virtual wheat").slice(0, 60),
    ph: numeric(raw.ph, 145), hsh: numeric(raw.hsh, 132), lsh: numeric(raw.lsh, 62),
    belts: beltDefaults.map((defaults, index) => ({
      ...defaults,
      count: Math.max(0, Math.round(numeric(raw.belts[index]?.count, 0))),
      length: numeric(raw.belts[index]?.length, defaults.length)
    })),
    seed: Math.max(1, Math.round(numeric(raw.seed, 2025))),
    spread: Math.max(.2, Math.min(.92, numeric(raw.spread, .58))),
    showBelts: raw.showBelts !== false
  };
  return validate(model).level === "error" ? null : model;
}

function loadSavedModels() {
  try {
    const parsed = JSON.parse(localStorage.getItem(MODEL_CACHE_KEY) || "[]");
    savedModels = Array.isArray(parsed) ? parsed.map(entry => {
      const model = normalizeCachedModel(entry?.model);
      return model ? {
        id: String(entry.id || `${Date.now()}-${Math.random()}`),
        savedAt: String(entry.savedAt || ""),
        model
      } : null;
    }).filter(Boolean).slice(-MAX_SAVED_MODELS) : [];
  } catch (_) {
    savedModels = [];
  }
  selectedCacheId = savedModels[0]?.id || "";
}

function persistSavedModels() {
  try {
    localStorage.setItem(MODEL_CACHE_KEY, JSON.stringify(savedModels));
    return true;
  } catch (_) {
    $("cacheStatus").textContent = t("cacheStorageError");
    return false;
  }
}

function updateCacheControls(statusText = "") {
  if (!$("cacheSelect")) return;
  const select = $("cacheSelect");
  if (!savedModels.some(entry => entry.id === selectedCacheId)) selectedCacheId = savedModels[0]?.id || "";
  select.innerHTML = savedModels.length
    ? savedModels.map((entry, index) => `<option value="${esc(entry.id)}">${index + 1}. ${esc(entry.model.taxa)} · PH ${entry.model.ph.toFixed(1)}</option>`).join("")
    : `<option value="">${esc(t("emptyCache"))}</option>`;
  select.value = selectedCacheId;
  $("cacheCount").textContent = `${savedModels.length} / ${MAX_SAVED_MODELS}`;
  $("addCachedPlantBtn").disabled = !savedModels.length || plantModels.length >= MAX_COMPARISON_PLANTS;
  $("deleteCachedBtn").disabled = !savedModels.length;
  $("cacheStatus").textContent = statusText || (savedModels.length ? t("cacheReady", { count: savedModels.length }) : t("emptyCache"));
}

function saveCurrentModelToCache() {
  const model = readModel();
  if (validate(model).level === "error") {
    updateCacheControls(t("cacheInvalid"));
    return;
  }
  if (savedModels.length >= MAX_SAVED_MODELS) {
    updateCacheControls(t("cacheFull", { count: MAX_SAVED_MODELS }));
    return;
  }
  const entry = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`,
    savedAt: new Date().toISOString(),
    model: cloneModel(model)
  };
  savedModels.push(entry);
  selectedCacheId = entry.id;
  if (persistSavedModels()) updateCacheControls(t("cacheSaved", { name: model.taxa }));
}

function addSelectedCachedModel() {
  if (plantModels.length >= MAX_COMPARISON_PLANTS) return;
  const entry = savedModels.find(item => item.id === selectedCacheId);
  if (!entry) return;
  plantModels[activePlantIndex] = readModel();
  plantModels.push(cloneModel(entry.model));
  activePlantIndex = plantModels.length - 1;
  applyModelToForm(plantModels[activePlantIndex]);
  updateCacheControls(t("cacheAdded", { name: entry.model.taxa }));
}

function deleteSelectedCachedModel() {
  const entry = savedModels.find(item => item.id === selectedCacheId);
  if (!entry) return;
  savedModels = savedModels.filter(item => item.id !== selectedCacheId);
  selectedCacheId = savedModels[0]?.id || "";
  if (persistSavedModels()) updateCacheControls(t("cacheDeleted", { name: entry.model.taxa }));
}

function applyModelToForm(model) {
  applyingPlantModel = true;
  const values = {
    taxa: model.taxa, ph: model.ph, hsh: model.hsh, lsh: model.lsh,
    tsbSn: model.belts[0].count, tsbL: model.belts[0].length,
    msbSn: model.belts[1].count, msbL: model.belts[1].length,
    bsbSn: model.belts[2].count, bsbL: model.belts[2].length,
    seed: model.seed, spread: Math.round(model.spread * 100)
  };
  Object.entries(values).forEach(([id, value]) => $(id).value = value);
  $("showBelts").checked = model.showBelts;
  applyingPlantModel = false;
  render();
}

function updatePlantControls() {
  const select = $("plantSelect");
  select.innerHTML = plantModels.map((model, index) =>
    `<option value="${index}">${index + 1}. ${esc(model.taxa)}</option>`
  ).join("");
  select.value = String(activePlantIndex);
  $("plantCount").textContent = `${activePlantIndex + 1} / ${plantModels.length}`;
  $("previousPlantBtn").disabled = plantModels.length < 2;
  $("nextPlantBtn").disabled = plantModels.length < 2;
  $("removePlantBtn").disabled = plantModels.length < 2;
  $("addCachedPlantBtn").disabled = !savedModels.length || plantModels.length >= MAX_COMPARISON_PLANTS;
}

function selectPlant(index) {
  if (!plantModels.length) return;
  plantModels[activePlantIndex] = readModel();
  activePlantIndex = (index + plantModels.length) % plantModels.length;
  applyModelToForm(plantModels[activePlantIndex]);
}

function removeCurrentPlant() {
  if (plantModels.length <= 1) return;
  plantModels.splice(activePlantIndex, 1);
  activePlantIndex = Math.min(activePlantIndex, plantModels.length - 1);
  applyModelToForm(plantModels[activePlantIndex]);
}

function safeName(name) {
  return (name || "wheat_model").replace(/[\\/:*?"<>|\s]+/g, "_").slice(0, 80);
}

function downloadBlob(blob, filename) {
  const nativeHandler = window.webkit?.messageHandlers?.saveFile;
  if (nativeHandler) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = String(reader.result || "");
      const transferId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
      const chunkSize = 512 * 1024;
      nativeHandler.postMessage({ action: "begin", id: transferId, filename, totalLength: dataUrl.length });
      for (let offset = 0; offset < dataUrl.length; offset += chunkSize) {
        nativeHandler.postMessage({ action: "chunk", id: transferId, data: dataUrl.slice(offset, offset + chunkSize) });
      }
      nativeHandler.postMessage({ action: "end", id: transferId });
    };
    reader.readAsDataURL(blob);
    return;
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadSvg(svg, filename) {
  const source = `<?xml version="1.0" encoding="UTF-8"?>\n${svg}`;
  downloadBlob(new Blob([source], { type: "image/svg+xml;charset=utf-8" }), `${safeName(filename)}.svg`);
}

function downloadPng(svg, filename, pixelSize = getPngSize()) {
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  const image = new Image();
  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = pixelSize.width;
    canvas.height = pixelSize.height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fffdf5"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
      if (blob) downloadBlob(blob, `${safeName(filename)}.png`);
    }, "image/png");
    URL.revokeObjectURL(url);
  };
  image.src = url;
}

function setExample() {
  plantModels = [
    {
      taxa: "All samples (n = 171)", ph: 132.01, hsh: 120.12, lsh: 62.46,
      belts: [
        { key: "TSB", label: "Top spike belt", count: 26, length: 11.53, color: "#d4a536" },
        { key: "MSB", label: "Middle spike belt", count: 16, length: 10.36, color: "#66995f" },
        { key: "BSB", label: "Bottom spike belt", count: 7, length: 8.49, color: "#6394b1" }
      ],
      seed: 2025, spread: .58, showBelts: true
    },
    {
      taxa: "Cultivar (C, n = 42)", ph: 107.05, hsh: 96.27, lsh: 53.49,
      belts: [
        { key: "TSB", label: "Top spike belt", count: 25, length: 10.33, color: "#d4a536" },
        { key: "MSB", label: "Middle spike belt", count: 14, length: 9.62, color: "#66995f" },
        { key: "BSB", label: "Bottom spike belt", count: 6, length: 8.07, color: "#6394b1" }
      ],
      seed: 2026, spread: .58, showBelts: true
    },
    {
      taxa: "Landrace (L, n = 129)", ph: 140.14, hsh: 127.88, lsh: 65.38,
      belts: [
        { key: "TSB", label: "Top spike belt", count: 26, length: 11.92, color: "#d4a536" },
        { key: "MSB", label: "Middle spike belt", count: 17, length: 10.60, color: "#66995f" },
        { key: "BSB", label: "Bottom spike belt", count: 8, length: 8.63, color: "#6394b1" }
      ],
      seed: 2027, spread: .58, showBelts: true
    }
  ];
  activePlantIndex = 0;
  applyModelToForm(plantModels[0]);
}

function parseDelimited(text) {
  const clean = text.replace(/^\uFEFF/, "").trim();
  if (!clean) return [];
  const first = clean.split(/\r?\n/, 1)[0];
  const delimiter = first.includes("\t") ? "\t" : ",";
  const lines = clean.split(/\r?\n/).filter(Boolean);
  const parseLine = line => {
    const result = []; let value = ""; let quoted = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"' && quoted && line[i + 1] === '"') { value += '"'; i++; }
      else if (c === '"') quoted = !quoted;
      else if (c === delimiter && !quoted) { result.push(value.trim()); value = ""; }
      else value += c;
    }
    result.push(value.trim()); return result;
  };
  const headers = parseLine(lines[0]).map(h => h.trim());
  return lines.slice(1).map(line => Object.fromEntries(headers.map((h, i) => [h, parseLine(line)[i] ?? ""])));
}

function valueFrom(row, names, fallback) {
  for (const name of names) if (row[name] !== undefined && row[name] !== "") return row[name];
  return fallback;
}

function applyRow(row, index) {
  const mapping = {
    taxa: valueFrom(row, ["Taxa", "taxa", "材料名称", "name"], `Material ${index + 1}`),
    ph: valueFrom(row, ["PH", "ph"], 145), hsh: valueFrom(row, ["HSH", "hsh"], 132), lsh: valueFrom(row, ["LSH", "lsh"], 62),
    tsbSn: valueFrom(row, ["TSB_SN", "tsb_sn", "TSB穗数"], 0), tsbL: valueFrom(row, ["TSB_L", "tsb_l", "TSB穗长"], 10),
    msbSn: valueFrom(row, ["MSB_SN", "msb_sn", "MSB穗数"], 0), msbL: valueFrom(row, ["MSB_L", "msb_l", "MSB穗长"], 10),
    bsbSn: valueFrom(row, ["BSB_SN", "bsb_sn", "BSB穗数"], 0), bsbL: valueFrom(row, ["BSB_L", "bsb_l", "BSB穗长"], 8),
    seed: valueFrom(row, ["seed", "Seed", "SEED"], 2025 + index)
  };
  Object.entries(mapping).forEach(([id, value]) => $(id).value = value);
  batchIndex = index;
  $("batchSelect").value = String(index);
  render();
}

function loadBatch(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      batchRows = parseDelimited(String(reader.result));
      if (!batchRows.length) throw new Error(t("noRows"));
      const required = ["PH", "HSH", "LSH"];
      const missing = required.filter(k => batchRows[0][k] === undefined && batchRows[0][k.toLowerCase()] === undefined);
      if (missing.length) throw new Error(t("missingColumns", { columns: missing.join(", ") }));
      $("batchSelect").innerHTML = batchRows.map((row, i) => `<option value="${i}">${i + 1}. ${esc(valueFrom(row, ["Taxa", "taxa", "材料名称", "name"], `Material ${i + 1}`))}</option>`).join("");
      $("batchControls").hidden = false;
      $("batchStatus").textContent = t("batchLoaded", { count: batchRows.length });
      applyRow(batchRows[0], 0);
    } catch (error) {
      batchRows = [];
      $("batchControls").hidden = true;
      $("batchStatus").textContent = t("readFailed", { message: error.message });
    }
  };
  reader.readAsText(file, "UTF-8");
}

function downloadTemplate() {
  const csv = "Taxa,PH,HSH,LSH,TSB_SN,TSB_L,MSB_SN,MSB_L,BSB_SN,BSB_L,seed\nWheat_01,145,132,62,25,11.5,15,10.3,7,8.4,2025\nWheat_02,122,111,55,19,10.2,13,9.4,6,7.8,2026\n";
  downloadBlob(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }), "wheat_model_template.csv");
}

controls.forEach(id => $(id).addEventListener(id === "taxa" || id === "showBelts" ? "change" : "input", render));
figureTextControls.forEach(id => $(id).addEventListener("input", () => { saveFigureTextSettings(); render(); }));
$("taxa").addEventListener("input", render);
$("canvasPreset").addEventListener("change", () => { syncCanvasControls(); render(); });
$("canvasWidth").addEventListener("input", () => { syncPngControls(); render(); });
$("canvasHeight").addEventListener("input", () => { syncPngControls(); render(); });
$("pngPreset").addEventListener("change", syncPngControls);
$("pngWidth").addEventListener("input", () => {
  const size = proportionalPngSize(number("pngWidth", 1600), "width");
  $("pngWidth").value = size.width;
  $("pngHeight").value = size.height;
  updatePngSizeOutput();
});
$("pngHeight").addEventListener("input", () => {
  const size = proportionalPngSize(number("pngHeight", 900), "height");
  $("pngWidth").value = size.width;
  $("pngHeight").value = size.height;
  updatePngSizeOutput();
});
$("languageSelect").addEventListener("change", event => setLanguage(event.target.value));
$("exampleBtn").addEventListener("click", setExample);
$("randomizeBtn").addEventListener("click", () => { $("seed").value = Math.floor(1 + Math.random() * 999998); render(); });
$("resetFigureTextBtn").addEventListener("click", () => {
  applyFigureTextSettings(DEFAULT_FIGURE_TEXT);
  saveFigureTextSettings();
  render();
});
$("downloadCurrentSvgBtn").addEventListener("click", () => {
  const model = plantModels[activePlantIndex];
  downloadSvg(currentPlantCanvasSvg(), model.taxa);
});
$("downloadCurrentPngBtn").addEventListener("click", () => {
  const model = plantModels[activePlantIndex];
  downloadPng(currentPlantCanvasSvg(), model.taxa);
});
$("downloadAllSvgBtn").addEventListener("click", () => downloadSvg(previewCanvasSvg(), `All_plants_${plantModels.length}`));
$("downloadAllPngBtn").addEventListener("click", () => downloadPng(previewCanvasSvg(), `All_plants_${plantModels.length}`));
$("addPlantBtn").addEventListener("click", addComparisonPlant);
$("plantSelect").addEventListener("change", event => selectPlant(Number(event.target.value)));
$("previousPlantBtn").addEventListener("click", () => selectPlant(activePlantIndex - 1));
$("nextPlantBtn").addEventListener("click", () => selectPlant(activePlantIndex + 1));
$("removePlantBtn").addEventListener("click", removeCurrentPlant);
$("cacheSelect").addEventListener("change", event => { selectedCacheId = event.target.value; });
$("saveCacheBtn").addEventListener("click", saveCurrentModelToCache);
$("addCachedPlantBtn").addEventListener("click", addSelectedCachedModel);
$("deleteCachedBtn").addEventListener("click", deleteSelectedCachedModel);
$("templateBtn").addEventListener("click", downloadTemplate);
$("csvInput").addEventListener("change", event => { if (event.target.files[0]) loadBatch(event.target.files[0]); });
$("batchSelect").addEventListener("change", event => applyRow(batchRows[Number(event.target.value)], Number(event.target.value)));
$("prevBtn").addEventListener("click", () => { if (batchRows.length) applyRow(batchRows[(batchIndex - 1 + batchRows.length) % batchRows.length], (batchIndex - 1 + batchRows.length) % batchRows.length); });
$("nextBtn").addEventListener("click", () => { if (batchRows.length) applyRow(batchRows[(batchIndex + 1) % batchRows.length], (batchIndex + 1) % batchRows.length); });

let savedLanguage = "zh";
try { savedLanguage = localStorage.getItem("wheatModelerLanguage") || "zh"; } catch (_) {}
loadSavedModels();
loadFigureTextSettings();
setLanguage(savedLanguage, false);
syncCanvasControls();
render();
