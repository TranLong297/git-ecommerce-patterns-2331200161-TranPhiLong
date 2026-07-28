import { CartService } from './patterns/creational/CartService.js';
import { ProductFactory } from './patterns/creational/ProductFactory.js';

import {
    GiftWrapDecorator,
    ExtendedWarrantyDecorator
} from './patterns/structural/ProductDecorator.js';

import { CheckoutFacade } from './patterns/structural/CheckoutFacade.js';

import {
    ShippingCalculator,
    FlatRateStrategy,
    WeightBasedStrategy
} from './patterns/behavioral/ShippingStrategy.js';

import {
    AddToCartCommand,
    CommandInvoker
} from './patterns/behavioral/Command.js';

import {
    OrderTracker,
    EmailNotifier,
    DashboardNotifier
} from './patterns/behavioral/Observer.js';

console.log("--- E-Commerce Design Patterns Simulation ---");
console.log("===========================================\n");

const factory = new ProductFactory();

// Part 2A: Singleton
console.log("--- 2A: Singleton Pattern ---");

const cart1 = new CartService();
const cart2 = new CartService();

cart1.addProduct({
    id: 1,
    name: 'Laptop',
    price: 1200
});

console.log("Cart 1 contents:", cart1.getProducts());
console.log("Cart 2 contents:", cart2.getProducts());
console.log(
    "Are cart1 and cart2 the same instance?",
    cart1 === cart2
);
console.log("\n");

// Part 2B: Factory
console.log("--- 2B: Factory Pattern ---");

const book = factory.createProduct('book', {
    id: 10,
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    price: 35
});

const laptop = factory.createProduct('electronic', {
    id: 11,
    model: 'XPS 15',
    brand: 'Dell',
    price: 1500
});

book.describe();
laptop.describe();
console.log("\n");

// Part 3A: Decorator
console.log("--- 3A: Decorator Pattern ---");

let myBook = factory.createProduct('book', {
    id: 12,
    title: 'Design Patterns',
    price: 45
});

myBook = new GiftWrapDecorator(myBook);
myBook = new ExtendedWarrantyDecorator(myBook);

console.log(`Final Price: $${myBook.getPrice()}`);
console.log(
    `Final Description: ${myBook.getDescription()}`
);
console.log("\n");

// Part 3B: Facade
console.log("--- 3B: Facade Pattern ---");

const checkout = new CheckoutFacade();

const orderDetails = {
    userId: 'user-123',
    productIds: [1, 3],
    amount: 1580,
    shippingInfo: '123 Main St'
};

checkout.placeOrder(orderDetails);
console.log("\n");

// Part 4A: Strategy
console.log("--- 4A: Strategy Pattern ---");

const packageDetails = {
    weight: 2.5,
    dimensions: {
        width: 10,
        height: 8,
        depth: 3
    }
};

const calculator = new ShippingCalculator();

calculator.setStrategy(new FlatRateStrategy());

console.log(
    `Flat Rate Shipping Cost: $${calculator.calculate(
        packageDetails
    )}`
);

calculator.setStrategy(new WeightBasedStrategy());

console.log(
    `Weight-Based Shipping Cost: $${calculator.calculate(
        packageDetails
    )}`
);
console.log("\n");

// Part 4B: Command
console.log("--- 4B: Command Pattern ---");

const invoker = new CommandInvoker();
const cart = new CartService();

const newLaptop = factory.createProduct('electronic', {
    id: 2,
    model: 'MacBook Pro',
    brand: 'Apple',
    price: 2500
});

const command = new AddToCartCommand(
    cart,
    newLaptop
);

console.log("Initial Cart:", cart.getProducts());

invoker.executeCommand(command);

console.log(
    "Cart after executing command:",
    cart.getProducts()
);

invoker.undoLastCommand();

console.log(
    "Cart after undoing command:",
    cart.getProducts()
);

invoker.executeCommand(command);

console.log(
    "Cart after re-executing command:",
    cart.getProducts()
);
console.log("\n");

// Part 4C: Observer
console.log("--- 4C: Observer Pattern ---");

const orderTracker = new OrderTracker('order-456');
const emailNotifier = new EmailNotifier();
const dashboardNotifier = new DashboardNotifier();

orderTracker.addObserver(emailNotifier);
orderTracker.addObserver(dashboardNotifier);

orderTracker.updateStatus('Processing');

console.log("---");

orderTracker.removeObserver(emailNotifier);
orderTracker.updateStatus('Shipped');

console.log("\n");