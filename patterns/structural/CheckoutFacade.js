import { InventoryService } from '../../services/InventoryService.js';
import { PaymentService } from '../../services/PaymentService.js';
import { ShippingService } from '../../services/ShippingService.js';

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }

    placeOrder(orderDetails) {
        const {
            userId,
            productIds,
            amount,
            shippingInfo
        } = orderDetails;

        // Bước 1: kiểm tra kho
        const inStock =
            this.inventoryService.checkStock(productIds);

        if (!inStock) {
            console.log(
                '[Checkout] Order failed: products are out of stock.'
            );
            return null;
        }

        // Bước 2: thanh toán
        const paymentSuccessful =
            this.paymentService.processPayment(
                userId,
                amount
            );

        if (!paymentSuccessful) {
            console.log(
                '[Checkout] Order failed: payment was unsuccessful.'
            );
            return null;
        }

        // Bước 3: giao hàng
        const shipment =
            this.shippingService.arrangeShipping(
                userId,
                shippingInfo
            );

        console.log(
            `[Checkout] Order placed successfully. ` +
            `Tracking ID: ${shipment.trackingId}`
        );

        return shipment;
    }
}

export { CheckoutFacade };