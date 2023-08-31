
export const findDiscountPercentage = (originalPrice: number, discountPrice: number) => {
    return ((originalPrice - discountPrice) / originalPrice) * 100;
}