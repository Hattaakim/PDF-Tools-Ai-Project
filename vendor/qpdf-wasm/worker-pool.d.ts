import type { FromWorker, ToWorker } from "./protocol.js";
import type { Executor } from "./types.js";
export interface WorkerLike {
    onmessage: ((event: {
        data: FromWorker;
    }) => void) | null;
    onerror: ((event: unknown) => void) | null;
    onmessageerror: ((event: unknown) => void) | null;
    postMessage(message: ToWorker, transfer?: Transferable[]): void;
    terminate(): void;
}
export interface WorkerPoolOptions {
    size: number;
    wasmUrl: string;
    /** URL of the worker script, used only in error messages (spawn() loads it). */
    workerUrl?: string;
    spawn: () => WorkerLike;
}
/** Runs jobs on `size` workers, one job per worker at a time, FIFO. Crashed workers are replaced. */
export declare function createWorkerPool(options: WorkerPoolOptions): Promise<Executor>;
