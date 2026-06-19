let activeInstincts = [];
export function getCurrentActiveInstincts() {
    return [...activeInstincts];
}
export function setCurrentActiveInstincts(ids) {
    activeInstincts = [...ids];
}
export function clearActiveInstincts() {
    activeInstincts = [];
}
//# sourceMappingURL=active-instincts.js.map