export function formatWithSpaces(str: string) {
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function removeSpaces(str: string) {
    return str.replace(/\s+/g, '');
}