export const pathName = 'http://localhost:5000'
const getApiUrl = (src: string) => {
    return `${pathName}${src}`;
}

export default getApiUrl