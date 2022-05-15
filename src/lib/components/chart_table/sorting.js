/**
 * @param {any[]} rows
 * @param {string} dir
 * @param {string | number} key
 */
export const sortString = (rows, dir, key) => {
    return rows.sort((a, b) =>
        dir === "asc"
            ? ("" + b[key]).localeCompare(a[key])
            : ("" + a[key]).localeCompare(b[key])
    );
}

/**
 * @param {any[]} rows
 * @param {string} dir
 * @param {string | number} key
 */
export const sortNumber = (rows, dir, key) => {
    return rows.sort((a, b) =>
        dir === "asc" ? a[key] - b[key] : b[key] - a[key]
    );
}
