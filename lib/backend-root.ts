export const pathName = 'https://my.api.mockaroo.com'
const getApiUrl = (src: string) => {
    return `${pathName}${src}`;
}

export default getApiUrl