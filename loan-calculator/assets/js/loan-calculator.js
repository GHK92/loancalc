/**
 * Loan Calculator Plugin JavaScript
 * Version: 1.0.0
 */

(function() {
    'use strict';

    /**
     * Format number with spaces as thousand separator (Norwegian format)
     */
    function formatNumber(num) {
        return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    /**
     * Parse formatted number string to integer
     */
    function parseFormattedNumber(str) {
        return parseInt(str.replace(/\s/g, '').replace(/kr/g, '').trim());
    }

    /**
     * Initialize a single calculator instance
     */
    function initCalculator(container) {
        // Get calculator settings from data attributes
        const totalPrice = parseInt(container.getAttribute('data-total-price'));
        const annualInterestRate = parseFloat(container.getAttribute('data-interest-rate'));
        const operatingCost = parseInt(container.getAttribute('data-operating-cost'));

        // Calculate monthly interest rate
        const monthlyInterestRate = annualInterestRate / 100 / 12;

        // Get DOM elements
        const slider = container.querySelector('.loan-calc-slider');
        const depositInput = container.querySelector('.loan-calc-deposit-input');
        const jointDebtEl = container.querySelector('.loan-calc-joint-debt');
        const interestCostEl = container.querySelector('.loan-calc-interest-cost');
        const operatingCostEl = container.querySelector('.loan-calc-operating-cost');
        const totalMonthlyEl = container.querySelector('.loan-calc-total-monthly-value');

        /**
         * Calculate and update all values
         */
        function calculate() {
            const deposit = parseInt(slider.value);

            // Calculate joint debt (total price - deposit)
            const jointDebt = totalPrice - deposit;

            // Calculate monthly interest on joint debt
            const monthlyInterest = jointDebt * monthlyInterestRate;

            // Calculate total monthly expenses
            const totalMonthly = monthlyInterest + operatingCost;

            // Update display
            jointDebtEl.textContent = formatNumber(jointDebt) + ' kr';
            interestCostEl.textContent = formatNumber(monthlyInterest) + ' kr';
            operatingCostEl.textContent = formatNumber(operatingCost) + ' kr';
            totalMonthlyEl.textContent = formatNumber(totalMonthly) + ' kr';
            depositInput.value = formatNumber(deposit) + ' kr';
        }

        /**
         * Slider event listener
         */
        slider.addEventListener('input', calculate);

        /**
         * Input field event listener
         */
        depositInput.addEventListener('input', function(e) {
            let value = parseFormattedNumber(e.target.value);

            if (!isNaN(value)) {
                // Clamp value between 0 and total price
                value = Math.max(0, Math.min(value, totalPrice));
                slider.value = value;
                calculate();
            }
        });

        /**
         * Format input on blur
         */
        depositInput.addEventListener('blur', function(e) {
            let value = parseFormattedNumber(e.target.value);
            if (isNaN(value)) {
                value = parseInt(slider.value);
            }
            value = Math.max(0, Math.min(value, totalPrice));
            slider.value = value;
            depositInput.value = formatNumber(value) + ' kr';
            calculate();
        });

        /**
         * Allow only numbers and spaces in input
         */
        depositInput.addEventListener('keypress', function(e) {
            const char = String.fromCharCode(e.which);
            if (!/[\d\s]/.test(char)) {
                e.preventDefault();
            }
        });

        // Initial calculation (already done by PHP, but ensures consistency)
        calculate();
    }

    /**
     * Initialize all calculators on the page
     */
    function initAllCalculators() {
        const calculators = document.querySelectorAll('.loan-calculator-container');
        calculators.forEach(function(calculator) {
            initCalculator(calculator);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllCalculators);
    } else {
        initAllCalculators();
    }

    // Also initialize on window load (for late-loaded content)
    window.addEventListener('load', initAllCalculators);

})();
