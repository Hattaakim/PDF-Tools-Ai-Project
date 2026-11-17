import type { JobSpec, RunResult } from "./types.js";
/** Working directory inside each module instance; relative job paths resolve here. */
export declare const WORKDIR = "/work";
/**
 * Runs one qpdf job in a brand-new module instance. qpdf keeps process-global state
 * (e.g. its logger), so an instance must never be reused for a second job.
 */
export declare function runJob(wasm: WebAssembly.Module, spec: JobSpec, onProgress?: (percent: number) => void): Promise<RunResult>;
