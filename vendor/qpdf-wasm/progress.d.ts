/**
 * A line handler for qpdf's stdout/stderr: returns true when the line was a progress line (consumed).
 * Reports `p` whenever `p !== last`. Within one output file qpdf's values never decrease, so a rise
 * continues the file and a drop starts the next split output file (a linearized one starts above 0).
 * qpdf repeats values (encrypt, linearize); repeats are consumed silently.
 */
export declare function createProgressFilter(onPercent: (percent: number) => void): (line: string) => boolean;
/** Calls the caller's callback. A throw is rethrown asynchronously, so it can't abort qpdf or break the pool. */
export declare function callSafely(callback: (percent: number) => void, percent: number): void;
