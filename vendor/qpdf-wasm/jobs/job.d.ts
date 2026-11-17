import type { JobSpec, ProgressOptions } from "../types.js";
export declare const INPUT = "in.pdf";
export declare const OUTPUT = "out.pdf";
export declare const JOB_FILE = "job.json";
export declare function inputName(index: number): string;
/** A JobSpec that runs qpdf with `job` (qpdf job JSON) and the given input files. */
export declare function jobSpec(job: Record<string, unknown>, files: Record<string, Uint8Array>): JobSpec;
export declare function withPassword(job: Record<string, unknown>, password: string | undefined): Record<string, unknown>;
/** Asks qpdf for write progress (job JSON `progress`) when the caller passed onProgress. */
export declare function withProgress(job: Record<string, unknown>, options: ProgressOptions): Record<string, unknown>;
