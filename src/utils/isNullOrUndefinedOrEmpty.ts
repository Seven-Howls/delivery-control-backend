export const isNullOrUndefinedOrEmpty = (obj: { [key: string]: any }): boolean => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
                return true;
            }
        }
    }
    return false; 
}
