<?php
/**
 * Plugin Name: Lånekalkulator
 * Plugin URI: https://github.com/GHK92/loancalc
 * Description: En lånekalkulator som kan brukes på forskjellige leiligheter ved hjelp av shortcode. Beregner fellesgjeld, renter og månedlige kostnader.
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://github.com/GHK92
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: loan-calculator
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class Loan_Calculator {

    /**
     * Constructor
     */
    public function __construct() {
        // Register shortcode
        add_shortcode('loanekalkulator', array($this, 'render_calculator'));

        // Enqueue scripts and styles
        add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));
    }

    /**
     * Enqueue CSS and JavaScript
     */
    public function enqueue_assets() {
        // Enqueue CSS
        wp_enqueue_style(
            'loan-calculator-css',
            plugin_dir_url(__FILE__) . 'assets/css/loan-calculator.css',
            array(),
            '1.0.0'
        );

        // Enqueue JavaScript
        wp_enqueue_script(
            'loan-calculator-js',
            plugin_dir_url(__FILE__) . 'assets/js/loan-calculator.js',
            array(),
            '1.0.0',
            true
        );
    }

    /**
     * Render the calculator shortcode
     *
     * Usage: [loanekalkulator total_price="6700000" deposit="1675000" interest_rate="4.6" operating_cost="3698"]
     *
     * @param array $atts Shortcode attributes
     * @return string HTML output
     */
    public function render_calculator($atts) {
        // Default values
        $atts = shortcode_atts(array(
            'total_price' => '6700000',      // Total property price in kr
            'deposit' => '1675000',          // Default deposit in kr
            'interest_rate' => '4.6',        // Annual interest rate in percentage
            'operating_cost' => '3698',      // Monthly operating cost in kr
            'title' => 'Lånekalkulator',     // Calculator title
        ), $atts);

        // Sanitize inputs
        $total_price = absint($atts['total_price']);
        $deposit = absint($atts['deposit']);
        $interest_rate = floatval($atts['interest_rate']);
        $operating_cost = absint($atts['operating_cost']);
        $title = sanitize_text_field($atts['title']);

        // Calculate initial values
        $joint_debt = $total_price - $deposit;
        $monthly_interest_rate = $interest_rate / 100 / 12;
        $monthly_interest = $joint_debt * $monthly_interest_rate;
        $total_monthly = $monthly_interest + $operating_cost;

        // Generate unique ID for this calculator instance
        $calculator_id = 'loan-calc-' . uniqid();

        // Start output buffering
        ob_start();
        ?>

        <div class="loan-calculator-container" id="<?php echo esc_attr($calculator_id); ?>"
             data-total-price="<?php echo esc_attr($total_price); ?>"
             data-interest-rate="<?php echo esc_attr($interest_rate); ?>"
             data-operating-cost="<?php echo esc_attr($operating_cost); ?>">

            <h2 class="loan-calc-title"><?php echo esc_html($title); ?></h2>

            <div class="loan-calc-total-price">
                <div class="loan-calc-total-price-label">Totalpris</div>
                <div class="loan-calc-total-price-value"><?php echo number_format($total_price, 0, ',', ' '); ?> <span class="loan-calc-kr">kr</span></div>
            </div>

            <div class="loan-calc-input-group">
                <label class="loan-calc-input-label">Egenkapital (innskudd)</label>
                <div class="loan-calc-slider-container">
                    <input
                        type="range"
                        class="loan-calc-slider"
                        min="0"
                        max="<?php echo esc_attr($total_price); ?>"
                        step="10000"
                        value="<?php echo esc_attr($deposit); ?>"
                    >
                    <input
                        type="text"
                        class="loan-calc-deposit-input"
                        value="<?php echo number_format($deposit, 0, ',', ' '); ?> kr"
                    >
                </div>
            </div>

            <div class="loan-calc-results-section">
                <div class="loan-calc-result-row">
                    <span class="loan-calc-result-label">Fellesgjeld</span>
                    <span class="loan-calc-result-value loan-calc-joint-debt"><?php echo number_format($joint_debt, 0, ',', ' '); ?> kr</span>
                </div>
            </div>

            <div class="loan-calc-monthly-section">
                <div class="loan-calc-monthly-title">Månedlige utgifter</div>

                <div class="loan-calc-result-row">
                    <span class="loan-calc-result-label">Renter fellesgjeld</span>
                    <span class="loan-calc-result-value loan-calc-interest-cost"><?php echo number_format($monthly_interest, 0, ',', ' '); ?> kr</span>
                </div>

                <div class="loan-calc-result-row">
                    <span class="loan-calc-result-label">Driftskostnader</span>
                    <span class="loan-calc-result-value loan-calc-operating-cost"><?php echo number_format($operating_cost, 0, ',', ' '); ?> kr</span>
                </div>

                <div class="loan-calc-total-monthly">
                    <span class="loan-calc-total-monthly-label">Totalt per måned</span>
                    <span class="loan-calc-total-monthly-value"><?php echo number_format($total_monthly, 0, ',', ' '); ?> kr</span>
                </div>
            </div>
        </div>

        <?php
        // Return the buffered content
        return ob_get_clean();
    }
}

// Initialize the plugin
new Loan_Calculator();
