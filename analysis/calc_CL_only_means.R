args <- commandArgs(trailingOnly = TRUE)
if (length(args) != 2) {
  stop("Usage: Rscript calc_CL_only_means.R <phenotype.tsv> <metadata.tsv>")
}

traits <- c(
  "PH", "HSH", "LSH",
  "TSB_SN", "TSB_L", "MSB_SN", "MSB_L", "BSB_SN", "BSB_L"
)
phenotype <- read.delim(args[[1]], check.names = FALSE)
metadata <- read.delim(args[[2]], check.names = FALSE)
joined <- merge(
  phenotype[, c("Taxa", traits)],
  metadata[, c("sample_id", "CL")],
  by.x = "Taxa",
  by.y = "sample_id",
  all.x = TRUE
)
joined <- joined[
  complete.cases(joined[, traits]) & joined$CL %in% c("C", "L"),
]
means <- colMeans(joined[, traits])
output <- data.frame(
  Group = "All samples",
  n = nrow(joined),
  PH = means[["PH"]],
  HSH = means[["HSH"]],
  LSH = means[["LSH"]],
  SL = means[["HSH"]] - means[["LSH"]],
  TSB_SN = means[["TSB_SN"]],
  TSB_L = means[["TSB_L"]],
  MSB_SN = means[["MSB_SN"]],
  MSB_L = means[["MSB_L"]],
  BSB_SN = means[["BSB_SN"]],
  BSB_L = means[["BSB_L"]],
  check.names = FALSE
)
write.table(
  output,
  stdout(),
  sep = "\t",
  quote = FALSE,
  row.names = FALSE
)
