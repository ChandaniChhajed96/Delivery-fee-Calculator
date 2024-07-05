export function calculateDeliveryFee(cartValue: number, deliveryDistance: number, numberOfItems: number, orderDateTime: any): number {
    const BASE_DELIVERY_FEE = 2;
    const BASE_DELIVERY_DISTANCE = 1000;
    const EXTRA_DISTANCE_FEE = 1;
    const EXTRA_DISTANCE_INTERVAL = 500;
    const SMALL_ORDER_SURCHARGE_THRESHOLD = 10;
    const MAX_ITEMS_FOR_FREE_DELIVERY = 4;
    const ITEM_SURCHARGE_PER_ITEM = 0.5;
    const BULK_ITEM_FEE_THRESHOLD = 12;
    const BULK_ITEM_ADDITIONAL_FEE = 1.2;
    const MAX_CART_VALUE_FOR_FREE_DELIVERY = 200;
    const RUSH_HOUR_SURCHARGE_MULTIPLIER = 1.2;
    const MAX_DELIVERY_FEE = 15;
    const NO_DELIVERY_FEE = 0;
    const RUSH_DAY_OF_WEEK = 5;
    const RUSH_DAY_START_HOUR = 15;
    const RUSH_DAY_END_HOUR = 19;

    let fee = 0;

    if (cartValue >= MAX_CART_VALUE_FOR_FREE_DELIVERY) {
        return NO_DELIVERY_FEE;
    }

    addDeliveryDistanceFee();

    addSmallOrderSurchargeFee();

    if (numberOfItems > MAX_ITEMS_FOR_FREE_DELIVERY) {
        addItemSurchargeFee();
    }

    if (numberOfItems > BULK_ITEM_FEE_THRESHOLD) {
        addBulkItemSurchargeFee();
    }

    if (cartValue >= MAX_CART_VALUE_FOR_FREE_DELIVERY) {
        fee = NO_DELIVERY_FEE;
    }

    const date = new Date(orderDateTime);
    if (isRushTime(date)) {
        addRushHourSurchargeFee();
    }

    fee = Math.min(fee, MAX_DELIVERY_FEE);

    return fee;

    function addRushHourSurchargeFee() {
        fee *= RUSH_HOUR_SURCHARGE_MULTIPLIER;
    }

    function addBulkItemSurchargeFee() {
        fee += BULK_ITEM_ADDITIONAL_FEE;
    }

    function addItemSurchargeFee() {
        const itemSurcharge = (numberOfItems - MAX_ITEMS_FOR_FREE_DELIVERY) * ITEM_SURCHARGE_PER_ITEM;
        fee += itemSurcharge;
    }

    function addSmallOrderSurchargeFee() {
        const smallOrderSurcharge = Math.max(0, SMALL_ORDER_SURCHARGE_THRESHOLD - cartValue);
        fee += smallOrderSurcharge;
    }

    function addDeliveryDistanceFee() {
        if (deliveryDistance > BASE_DELIVERY_DISTANCE) {
            fee += BASE_DELIVERY_FEE;
            const extraDistance = deliveryDistance - BASE_DELIVERY_DISTANCE;
            fee += Math.ceil(extraDistance / EXTRA_DISTANCE_INTERVAL) * EXTRA_DISTANCE_FEE;
        } else {
            fee += BASE_DELIVERY_FEE;
        }
    }

    function isRushTime(date: Date): boolean { 
        const currentHour = date.getHours(); 
        return (
            date.getDay() === RUSH_DAY_OF_WEEK && 
            currentHour >= RUSH_DAY_START_HOUR &&
            currentHour < RUSH_DAY_END_HOUR
        );
    }
}