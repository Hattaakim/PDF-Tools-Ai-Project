import type { JobSpec, PasswordOptions, PdfInfo } from "../types.js";
export declare function infoJob(input: Uint8Array, options?: PasswordOptions): JobSpec;
export declare function parseInfo(stdout: string): Omit<PdfInfo, "warnings">;
