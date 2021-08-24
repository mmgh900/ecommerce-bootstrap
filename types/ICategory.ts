export default class ICategory {
    id: number
    name: string
    pLevel: ProductGroupLevel
    isChecked?: boolean

    getImage() {
        return `/images/productGroups/${ProductGroupLevel[this.pLevel].toLowerCase()}_${this.id}`
    }


}
export const getProductGroupImage = (item: ICategory) => {
    return `/images/productGroups/${ProductGroupLevel[item.pLevel].toLowerCase()}_${item.id}.png`
}
export const getCar = (productGroups) => productGroups.filter(item => item.pLevel == ProductGroupLevel.Car)
export const getCompany = (productGroups) => productGroups.filter(item => item.pLevel == ProductGroupLevel.Company)
export const getSection = (productGroups) => productGroups.filter(item => item.pLevel == ProductGroupLevel.Section)

export enum ProductGroupLevel {
    Company = 0,
    Car = 1,
    Section = 2
}
