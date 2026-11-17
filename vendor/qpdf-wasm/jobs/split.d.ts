import type { JobSpec, SplitOptions } from "../types.js";
export declare function splitJob(input: Uint8Array, options?: SplitOptions): JobSpec;
/** qpdf names split outputs out-N.pdf or out-N-M.pdf; return them in page order. */
export declare function collectSplitOutputs(files: Record<string, Uint8Array<ArrayBuffer>>): Uint8Array<ArrayBuffer>[];
