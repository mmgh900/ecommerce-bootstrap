export default interface IProduct {
    id: string | number,
    namePersian: string,
    nameAlias?: string,
    techNumber: string,
    description?: string,
    price: number,
    isExists: boolean,
    lastBuyDate: string,
    company: string,
    car: string,
    section: string,
    isNewest: boolean,
    discount: number,
    count: number,
    url: string
}

