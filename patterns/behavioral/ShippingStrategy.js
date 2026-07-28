// The Context class that uses a strategy
class ShippingCalculator {
    constructor() {
        this.strategy = null;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    calculate(packageDetails) {
        if (!this.strategy) {
            throw new Error("Shipping strategy has not been set!");
        }

        return this.strategy.calculate(packageDetails);
    }
}

// The Strategy interface (conceptual in JavaScript)
class ShippingStrategy {
    calculate(packageDetails) {
        throw new Error("This method should be overridden!");
    }
}

// Concrete Strategy 1: Flat Rate
class FlatRateStrategy extends ShippingStrategy {
    calculate(packageDetails) {
        // Phí vận chuyển cố định là $10
        return 10;
    }
}

// Concrete Strategy 2: Weight-Based
class WeightBasedStrategy extends ShippingStrategy {
    calculate(packageDetails) {
        // Phí vận chuyển là $3 cho mỗi kilogram
        return packageDetails.weight * 3;
    }
}

export {
    ShippingCalculator,
    FlatRateStrategy,
    WeightBasedStrategy
};