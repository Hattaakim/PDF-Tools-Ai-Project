import type { FromWorker, ToWorker } from "./protocol.js";
export interface WorkerPort {
    postMessage(message: FromWorker, transfer?: Transferable[]): void;
}
/** Worker-side logic, separate from src/worker.ts so it can be tested without a real Worker. */
export declare function createWorkerHandler(port: WorkerPort): (message: ToWorker) => Promise<void>;
