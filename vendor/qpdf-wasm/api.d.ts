import type { Executor, Qpdf } from "./types.js";
/** Typed helpers on top of an Executor. Exit 0 and 3 succeed; anything else rejects with QpdfError. */
export declare function createQpdfApi(executor: Executor): Qpdf;
