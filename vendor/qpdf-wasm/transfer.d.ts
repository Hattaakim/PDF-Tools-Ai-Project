/** Unique ArrayBuffers behind the given views. A duplicate in a transfer list throws DataCloneError. */
export declare function transferablesOf(files: Record<string, Uint8Array>): ArrayBuffer[];
