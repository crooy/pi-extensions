/**
 * Preprocess a single observation.
 * Returns null if the observation should be dropped entirely.
 * Returns a new (immutable) observation with large fields stripped if applicable.
 */
export function preprocessObservation(obs) {
    if (obs.event === "turn_start" || obs.event === "tool_start") {
        return null;
    }
    if (obs.event === "tool_complete" && !obs.is_error) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { output: _, ...stripped } = obs;
        return stripped;
    }
    return obs;
}
/**
 * Preprocess an array of raw observations.
 * Drops nulls and returns only the meaningful events.
 */
export function preprocessObservations(observations) {
    const result = [];
    for (const obs of observations) {
        const processed = preprocessObservation(obs);
        if (processed !== null) {
            result.push(processed);
        }
    }
    return result;
}
//# sourceMappingURL=observation-preprocessor.js.map