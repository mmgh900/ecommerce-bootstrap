export default class ICategory {
    id: number
    name: string
    pLevel: ProductGroupLevel
    isChecked?: boolean
}
export const getProductGroupImage = (item: ICategory) => {
    return `/images/productGroups/${ProductGroupLevel[item.pLevel].toLowerCase()}_${item.id}.png`
}
export enum ProductGroupLevel {
    Company = 0,
    Car = 1,
    Section = 2
}

export const persianNames = {
    [ProductGroupLevel.Company]: 'برند',
    [ProductGroupLevel.Car]: 'خودرو',
    [ProductGroupLevel.Section]: 'یخش',
}

export const getCar = (productGroups) => productGroups.filter(item => item.pLevel == ProductGroupLevel.Car)
export const getCompany = (productGroups) => productGroups.filter(item => item.pLevel == ProductGroupLevel.Company)
export const getSection = (productGroups) => productGroups.filter(item => item.pLevel == ProductGroupLevel.Section)

