export const increaseQuantity = (setProductQuantity: Function, productQuantity: number) => {
    setProductQuantity(productQuantity + 1);
}

export const decreaseQuantity = (setProductQuantity: Function, productQuantity: number) => {
    if (productQuantity <= 1) {
        return;
    } else {
        setProductQuantity(productQuantity - 1);
    }
}