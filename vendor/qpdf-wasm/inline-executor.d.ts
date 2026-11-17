import type { Executor } from "./types.js";
/** Runs jobs on the calling thread. Used in Node and with `inline: true`. */
export declare function createInlineExecutor(wasm: WebAssembly.Module): Executor;
