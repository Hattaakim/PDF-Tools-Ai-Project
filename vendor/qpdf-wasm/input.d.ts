import type { PdfInput } from "./types.js";
/**
 * Normalises an input to a Uint8Array that owns its whole ArrayBuffer, so it can be
 * transferred to a worker without detaching anything the caller didn't pass in.
 */
export declare function toBytes(input: PdfInput): Promise<Uint8Array>;
export declare function assertNotDetached(buffer: ArrayBufferLike): void;
