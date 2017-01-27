/**
 * Created by Rui on 26/1/17.
 */
export const maxLengthToEllipsis = (string, maxLength) => { return (string.length > maxLength ? string.substr(0, maxLength)+'...' : string)}