/**
 * Where the worker script is expected, for error messages only (spawn() loads the real one, which a
 * bundler may have renamed). Deliberately not the literal `new URL("./worker.js", import.meta.url)`:
 * Vite would inline worker.js as a data: URL and webpack would emit it again as an asset.
 */
export declare function workerScriptUrlFor(base: string): string | undefined;
