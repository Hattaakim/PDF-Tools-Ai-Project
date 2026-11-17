import type { CreateQpdfOptions, Qpdf } from "./types.js";
export { QpdfError, type QpdfErrorCode } from "./errors.js";
export { qpdfVersion } from "./wasm/meta.mjs";
export type { CompressOptions, CreateQpdfOptions, DecryptOptions, EncryptOptions, MergeOptions, OutputOptions, PasswordOptions, PdfInfo, PdfInput, ProgressOptions, Qpdf, QpdfResult, Rotation, RunOptions, RunResult, SplitOptions, SplitResult, } from "./types.js";
/**
 * Loads qpdf.wasm and returns the API. Nothing is downloaded before this is called.
 * Browsers run jobs in module Web Workers; Node (no global Worker) runs them inline.
 */
export declare function createQpdf(options?: CreateQpdfOptions): Promise<Qpdf>;
