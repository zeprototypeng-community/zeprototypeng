export function _isDefined(value: any): boolean {
    return typeof value !== 'undefined' && value !== undefined && value !== null  && value !== 'null';
}