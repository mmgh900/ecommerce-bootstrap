export const pathName = 'http://192.168.43.31:9000'
const getApiUrl = (src: string) => {
    return `${pathName}${src}`;
}

export default getApiUrl