export const pathName = 'http://localhost:10987'
const getApiUrl = (src: string) => {
    return `${pathName}${src}`;
}

export default getApiUrl