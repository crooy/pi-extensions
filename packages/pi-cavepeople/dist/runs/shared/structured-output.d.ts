import type { JsonSchemaObject } from "../../shared/types.ts";
export declare const STRUCTURED_OUTPUT_SCHEMA_ENV = "PI_SUBAGENT_STRUCTURED_OUTPUT_SCHEMA";
export declare const STRUCTURED_OUTPUT_CAPTURE_ENV = "PI_SUBAGENT_STRUCTURED_OUTPUT_CAPTURE";
export interface StructuredOutputRuntime {
    schema: JsonSchemaObject;
    schemaPath: string;
    outputPath: string;
}
export declare function assertJsonSchemaObject(schema: unknown, label?: string): asserts schema is JsonSchemaObject;
export declare function createStructuredOutputRuntime(schema: JsonSchemaObject, baseDir?: string): StructuredOutputRuntime;
export declare function validateStructuredOutputValue(schema: JsonSchemaObject, value: unknown): {
    status: "valid";
} | {
    status: "invalid";
    message: string;
};
export declare function readStructuredOutput(runtime: StructuredOutputRuntime): {
    value?: unknown;
    error?: string;
};
export declare function cleanupStructuredOutputRuntime(runtime: StructuredOutputRuntime | undefined): void;
//# sourceMappingURL=structured-output.d.ts.map