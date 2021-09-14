export const pathName = 'http://192.168.139.81:9000'
const getApiUrl = (src: string) => {
    return `${pathName}${src}`;
}

export default getApiUrl