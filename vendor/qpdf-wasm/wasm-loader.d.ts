/** Default location: next to this module (dist/wasm/qpdf.wasm). Bundlers rewrite this pattern. */
export declare function defaultWasmUrl(): URL;
export declare function resolveWasmUrl(url?: string | URL): URL;
export declare function loadWasmModule(url: string | URL): Promise<WebAssembly.Module>;
