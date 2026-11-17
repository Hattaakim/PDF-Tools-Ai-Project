export type QpdfErrorCode = "INVALID_PASSWORD" | "INVALID_PDF" | "FAILED" | "TERMINATED";
export declare class QpdfError extends Error {
    readonly code: QpdfErrorCode;
    /** qpdf exit code, or null when qpdf did not run to completion. */
    readonly exitCode: number | null;
    readonly stderr: string;
    constructor(code: QpdfErrorCode, message: string, details?: {
        exitCode?: number | null;
        stderr?: string;
    });
}
export declare function classifyFailure(stderr: string): QpdfErrorCode;
export declare function parseWarnings(stderr: string): string[];
/** The percent in a qpdf `--progress` line ("qpdf: out.pdf: write progress: 42%"), or null for any other line. */
export declare function parseProgressLine(line: string): number | null;
export declare function failureFromResult(result: {
    exitCode: number;
    stderr: string;
}): QpdfError;
export declare function terminatedError(): QpdfError;
/**
 * Normalises anything a job threw: QpdfErrors pass through; anything else (a wasm trap, an
 * out-of-memory abort, a failed instantiation) becomes FAILED. Used by both executors.
 */
export declare function crashError(error: unknown): QpdfError;
