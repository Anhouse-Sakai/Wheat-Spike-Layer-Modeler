#!/usr/bin/env Rscript

args <- commandArgs(trailingOnly = TRUE)
if (length(args) < 3) {
  stop(
    "Usage: Rscript script_R_finalize_group_mean_virtual_wheat_models_work287.R ",
    "<software_raw.svg> <group_mean.tsv> <output_dir>"
  )
}

raw_svg <- normalizePath(args[[1]], mustWork = TRUE)
summary_tsv <- normalizePath(args[[2]], mustWork = TRUE)
output_dir <- normalizePath(args[[3]], mustWork = FALSE)
dir.create(output_dir, recursive = TRUE, showWarnings = FALSE)

sb_root <- Sys.getenv("SBCODEX_ROOT", "/home/an/workspace/SBcodex")
phenotype_file <- file.path(sb_root, "tmp", "SLU2025.txt")
metadata_file <- file.path(
  sb_root, "tmp", "result", "Step1群体结构分析",
  "3.样本综合信息表_by_Python", "分类标准总表_185样本.tsv"
)

required_packages <- c("rsvg", "magick")
missing_packages <- required_packages[
  !vapply(required_packages, requireNamespace, logical(1), quietly = TRUE)
]
if (length(missing_packages)) {
  stop("Missing R packages: ", paste(missing_packages, collapse = ", "))
}

publication_font <- "Arial"
text_sizes_pt <- c(
  group_title = 12.0,
  group_subtitle = 7.0,
  axis_title = 9.0,
  axis_tick = 7.0,
  belt_label = 9.5,
  trait_marker = 6.5,
  note = 5.5,
  sl_label = 8.5,
  sl_value = 6.5
)
final_width_mm <- 140
raster_dpi <- 300

traits <- c(
  "PH", "HSH", "LSH",
  "TSB_SN", "TSB_L", "MSB_SN", "MSB_L", "BSB_SN", "BSB_L"
)

phenotype <- read.delim(
  phenotype_file, check.names = FALSE, stringsAsFactors = FALSE
)
metadata <- read.delim(
  metadata_file, check.names = FALSE, stringsAsFactors = FALSE
)

joined <- merge(
  phenotype[, c("Taxa", traits)],
  metadata[, c("sample_id", "CL")],
  by.x = "Taxa", by.y = "sample_id", all.x = TRUE
)
n_before_complete_case_filter <- nrow(joined)
joined <- joined[complete.cases(joined[, traits]), ]
n_after_complete_case_filter <- nrow(joined)
n_excluded_for_missing_model_inputs <-
  n_before_complete_case_filter - n_after_complete_case_filter
classified <- joined[joined$CL %in% c("C", "L"), ]
n_excluded_for_missing_CL <- nrow(joined) - nrow(classified)

mean_row <- function(x, label) {
  values <- colMeans(x[, traits])
  data.frame(
    Group = label,
    n = nrow(x),
    as.list(values),
    check.names = FALSE
  )
}

calculated <- rbind(
  mean_row(classified, "All samples"),
  mean_row(joined[which(joined$CL == "C"), ], "Cultivars"),
  mean_row(joined[which(joined$CL == "L"), ], "Landraces")
)
calculated$SL <- calculated$HSH - calculated$LSH

declared <- read.delim(
  summary_tsv, check.names = FALSE, stringsAsFactors = FALSE
)
check_columns <- c(
  "PH", "HSH", "LSH", "SL",
  "TSB_SN", "TSB_L", "MSB_SN", "MSB_L", "BSB_SN", "BSB_L"
)

declared <- declared[match(calculated$Group, declared$Group), ]
if (any(is.na(declared$Group))) {
  stop("The declared source-data table is missing one or more group rows.")
}
if (!all(calculated$n == declared$n)) {
  stop("Group sample counts do not match the formal phenotype data.")
}

delta <- abs(
  as.matrix(calculated[, check_columns]) -
    as.matrix(declared[, check_columns])
)
if (max(delta, na.rm = TRUE) > 0.011) {
  stop(
    "Group means in the model input do not match the formal phenotype data. ",
    "Maximum absolute difference: ", signif(max(delta, na.rm = TRUE), 5)
  )
}

read_svg <- paste(readLines(raw_svg, encoding = "UTF-8"), collapse = "\n")
if (!grepl('viewBox="0 0 1988 900"', read_svg, fixed = TRUE)) {
  stop("Unexpected modeler SVG viewBox; expected 0 0 1988 900.")
}

arrow_definition <- paste0(
  '<marker id="slArrow287" markerWidth="9" markerHeight="9" ',
  'refX="4.5" refY="4.5" orient="auto-start-reverse" ',
  'markerUnits="strokeWidth">',
  '<path d="M 0 0 L 9 4.5 L 0 9 z" fill="#1F5D78"/>',
  '</marker>'
)
read_svg <- sub(
  "</defs>",
  paste0(arrow_definition, "</defs>"),
  read_svg,
  fixed = TRUE
)

read_svg <- gsub(
  'class="belt-label" fill="#[0-9A-Fa-f]{6}"',
  'class="belt-label" fill="#222222"',
  read_svg
)
read_svg <- gsub(
  '"Times New Roman",Times,serif',
  'Arial,Helvetica,sans-serif',
  read_svg,
  fixed = TRUE
)
read_svg <- gsub(
  'font-size:24px}.axis-title',
  'font-size:28px}.axis-title',
  read_svg,
  fixed = TRUE
)
read_svg <- gsub(
  'font-size:28px;font-weight:700;letter-spacing:.08em',
  'font-size:36px;font-weight:700;letter-spacing:.08em',
  read_svg,
  fixed = TRUE
)
read_svg <- gsub(
  'font-size:34px;font-weight:700;letter-spacing:.04em',
  'font-size:38px;font-weight:700;letter-spacing:.04em',
  read_svg,
  fixed = TRUE
)
read_svg <- gsub(
  'font-size:40px;font-weight:700',
  'font-size:46px;font-weight:700',
  read_svg,
  fixed = TRUE
)
read_svg <- gsub(
  'font-size:24px}.plant-marker',
  'font-size:28px}.plant-marker',
  read_svg,
  fixed = TRUE
)
read_svg <- gsub(
  'font-size:22px;font-weight:700',
  'font-size:26px;font-weight:700',
  read_svg,
  fixed = TRUE
)
read_svg <- gsub(
  'font-size:18px}',
  'font-size:22px}',
  read_svg,
  fixed = TRUE
)
read_svg <- gsub(
  '<text x="88" y="75" text-anchor="middle" class="axis-title">',
  '<text x="55" y="75" text-anchor="middle" class="axis-title">',
  read_svg,
  fixed = TRUE
)
read_svg <- sub(
  'class="axis-title">Height \\(cm\\)</text>',
  'class="axis-title">cm</text>',
  read_svg
)
read_svg <- gsub(
  'y="57" text-anchor="middle" class="plant-subtitle"',
  'y="70" text-anchor="middle" class="plant-subtitle"',
  read_svg,
  fixed = TRUE
)
read_svg <- gsub(
  '<g><line[^>]+/><text[^>]+>(HSH|LSH)</text></g>',
  '',
  read_svg,
  perl = TRUE
)

common_ph <- max(declared$PH)
y_coord <- function(cm) 805 - (cm / common_ph) * 700
arrow_x <- c(184, 784, 1384)

arrow_markup <- character(nrow(declared))
for (i in seq_len(nrow(declared))) {
  y_top <- y_coord(declared$HSH[[i]]) + 10
  y_bottom <- y_coord(declared$LSH[[i]]) - 10
  y_mid <- (y_top + y_bottom) / 2
  arrow_markup[[i]] <- sprintf(
    paste0(
      '<g class="sl-annotation" aria-label="Spike layer thickness %.1f cm">',
      '<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" ',
      'stroke="#1F5D78" stroke-width="3.2" ',
      'marker-start="url(#slArrow287)" marker-end="url(#slArrow287)"/>',
      '<text x="%.1f" y="%.1f" text-anchor="middle" ',
      'font-family="Arial, Helvetica, sans-serif" font-size="34" ',
      'font-weight="700" fill="#153F52">SL</text>',
      '<text x="%.1f" y="%.1f" text-anchor="middle" ',
      'font-family="Arial, Helvetica, sans-serif" font-size="26" ',
      'font-weight="700" fill="#153F52">%.1f cm</text>',
      '</g>'
    ),
    declared$SL[[i]],
    arrow_x[[i]], y_top, arrow_x[[i]], y_bottom,
    arrow_x[[i]] - 34, y_mid - 4,
    arrow_x[[i]] - 34, y_mid + 22,
    declared$SL[[i]]
  )
}

final_svg_text <- sub(
  "</svg>",
  paste0(paste(arrow_markup, collapse = "\n"), "\n</svg>"),
  read_svg
)

svg_file <- file.path(
  output_dir, "Fig18_group_mean_virtual_wheat_models.svg"
)
pdf_file <- file.path(
  output_dir, "Fig18_group_mean_virtual_wheat_models.pdf"
)
png_file <- file.path(
  output_dir, "Fig18_group_mean_virtual_wheat_models_300dpi.png"
)
tiff_file <- file.path(
  output_dir, "Fig18_group_mean_virtual_wheat_models_300dpi.tiff"
)

writeLines(final_svg_text, svg_file, useBytes = TRUE)

width_cm <- final_width_mm / 10
width_px <- round(width_cm / 2.54 * raster_dpi)
height_px <- round(width_px * 900 / 1988)

# The software-generated SVG is already an editable vector document. Reopening
# it through svglite::svglite() or grDevices::cairo_pdf() would rasterize the
# imported plant artwork, so librsvg is used to preserve vector shapes and text
# in the PDF conversion.
rsvg::rsvg_pdf(svg_file, pdf_file)
rsvg::rsvg_png(
  svg_file, png_file, width = width_px, height = height_px
)

png_image <- magick::image_read(png_file)
magick::image_write(
  png_image, png_file, format = "png",
  density = paste0(raster_dpi, "x", raster_dpi)
)

tiff_image <- magick::image_read_svg(
  svg_file, width = width_px, height = height_px
)
magick::image_write(
  tiff_image, tiff_file, format = "tiff",
  compression = "lzw",
  density = paste0(raster_dpi, "x", raster_dpi)
)

audit <- data.frame(
  Group = declared$Group,
  n = declared$n,
  PH = declared$PH,
  HSH = declared$HSH,
  LSH = declared$LSH,
  SL = declared$SL,
  TSB_SN_input = declared$TSB_SN,
  TSB_SN_rendered = round(declared$TSB_SN),
  MSB_SN_input = declared$MSB_SN,
  MSB_SN_rendered = round(declared$MSB_SN),
  BSB_SN_input = declared$BSB_SN,
  BSB_SN_rendered = round(declared$BSB_SN),
  TSB_L = declared$TSB_L,
  MSB_L = declared$MSB_L,
  BSB_L = declared$BSB_L,
  render_seed = declared$render_seed,
  complete_records_before_filter = n_before_complete_case_filter,
  complete_records_after_filter = n_after_complete_case_filter,
  excluded_for_missing_model_inputs = n_excluded_for_missing_model_inputs,
  excluded_for_missing_CL = n_excluded_for_missing_CL,
  CL_only_comparison_records = nrow(classified),
  final_width_mm = final_width_mm,
  raster_dpi = raster_dpi,
  publication_font = publication_font,
  stringsAsFactors = FALSE
)
write.table(
  audit,
  file.path(output_dir, "Fig18_group_mean_virtual_wheat_models_audit.tsv"),
  sep = "\t", quote = FALSE, row.names = FALSE
)

cat(
  "Validated formal group means and wrote:\n",
  paste(c(svg_file, pdf_file, png_file, tiff_file), collapse = "\n"),
  "\nRaster size:", width_px, "x", height_px, "px at",
  raster_dpi, "dpi\n"
)
