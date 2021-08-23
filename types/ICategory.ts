interface ICategory {
    id: number;
    name: string;
    image: string;
    isChecked?: boolean
    type: CatType
}
export enum CatType {
    CAR,
    BRANDS,
    PART
}

export const getCatTypeUtl = (type: CatType) => {
    switch (type) {
        case CatType.BRANDS:
            return "/api/ProductGroup/GetCompanies"
        case CatType.CAR:
            return "/api/ProductGroup/GetCars"
        case CatType.PART:
            return "/api/ProductGroup/GetSections"
    }
}
export const getCatTypePrefix = (type: CatType) => {
    switch (type) {
        case CatType.BRANDS:
            return "company"
        case CatType.CAR:
            return "car"
        case CatType.PART:
            return "car"
    }
}
export const getListNameByType = (type: CatType) => {
    switch (type) {
        case CatType.BRANDS:
            return "Company"
        case CatType.CAR:
            return "Car"
        case CatType.PART:
            return "Section"
    }
}
export const getPersianNameByType = (type: CatType) => {
    switch (type) {
        case CatType.BRANDS:
            return "برند"
        case CatType.CAR:
            return "خودرو"
        case CatType.PART:
            return "بخش"
    }
}

export default ICategory;