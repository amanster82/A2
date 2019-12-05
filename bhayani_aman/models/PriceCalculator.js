class PriceCalculator{

    constructor(body){
        this.size = body.size;
        this.crust = body.crust;
        this.meats = body.meats;
        this.veggies = body.veggies;
        this.taxPercent = body.tax;
      
    }
    
    CalculateOrder() {

        let sizeCost = 0;
        if (this.size === "small") {
            sizeCost = 10;
        } else if (this.size === "medium") {
            sizeCost = 15;
        } else {
            sizeCost = 20;
        }

        let crustCost = 0;
        if (this.crust === "thin crust" || this.crust === "regular crust") {
            crustCost = 2;
        } else {
            crustCost = 5;
        }

        let meatCost = 2;
        let meatCount = (this.meats).length;

        let veggiesCost = 0.5;
        let veggiesCount = (this.veggies).length;

        let orderTotal = sizeCost+crustCost+(meatCost*meatCount)+(veggiesCost*veggiesCount);
        return orderTotal;
    }

    CalculateSalesTax(orderTotal){
        let taxAmount = orderTotal*(this.taxPercent/100);
        return taxAmount;
    }

    CalculateTotal(orderTotal, taxAmount){
        return orderTotal + taxAmount;
    }

}

// now we export the class, so other modules can create PriceCalc objects
module.exports = PriceCalculator;