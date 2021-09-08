export const pathName = 'http://192.168.1.101:9000'
const getApiUrl = (src: string) => {
    return `${pathName}${src}`;
}

export default getApiUrl