export const discountedPrice = (price, discountePercentage) => {
    return price - Math.round(price*discountePercentage/100);
}