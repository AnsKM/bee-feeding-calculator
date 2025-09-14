// Feeding Calculator Core Logic
// Based on research data for bee feeding requirements

// Constants for calculations
const FEEDING_CONSTANTS = {
    // Syrup ratios (sugar:water by weight)
    RATIOS: {
        SPRING: { sugar: 1, water: 1, name: '1:1', use: 'Spring buildup & brood stimulation' },
        FALL: { sugar: 2, water: 1, name: '2:1', use: 'Fall preparation & winter stores' }
    },
    
    // Regional winter weight requirements (in pounds)
    REGIONAL_REQUIREMENTS: {
        north: { min: 70, target: 90, critical: 100 },
        central: { min: 50, target: 60, critical: 70 },
        south: { min: 30, target: 40, critical: 50 },
        pacific: { min: 40, target: 50, critical: 60 },
        mountain: { min: 60, target: 80, critical: 90 },
        desert: { min: 35, target: 45, critical: 55 },
        southeast: { min: 35, target: 45, critical: 55 },
        midwest: { min: 60, target: 70, critical: 80 }
    },
    
    // Colony size multipliers
    COLONY_SIZE_MULTIPLIERS: {
        nuc: 0.5,
        small: 0.75,
        medium: 1.0,
        large: 1.25
    },
    
    // Weight gain per gallon of syrup
    WEIGHT_GAIN_PER_GALLON: {
        '1:1': 5,  // pounds of stores added per gallon
        '2:1': 7   // pounds of stores added per gallon
    },
    
    // Feeding frequency recommendations
    FEEDING_FREQUENCY: {
        'spring-buildup': { times: 2, period: 'week', duration: 6 },
        'dearth': { times: 1, period: 'week', duration: 4 },
        'fall-prep': { times: 2, period: 'week', duration: 8 },
        'emergency': { times: 3, period: 'week', duration: 2 },
        'new-package': { times: 3, period: 'week', duration: 4 }
    },
    
    // Critical dates by month
    CRITICAL_DATES: {
        1: 'Winter check - emergency feed if light',
        2: 'Critical starvation period - check weight',
        3: 'Spring buildup begins - start 1:1 feeding',
        4: 'Peak buildup - monitor stores',
        5: 'Swarm season - reduce feeding',
        6: 'Early summer - monitor for dearth',
        7: 'Summer dearth - may need feeding',
        8: 'Late summer - begin fall prep',
        9: 'Fall feeding critical - switch to 2:1',
        10: 'Final winter prep - target weight crucial',
        11: 'Stop feeding when temps below 50°F',
        12: 'Winter cluster - emergency dry sugar only'
    }
};

// State management
let calculatorState = {
    numHives: 1,
    colonySize: 'medium',
    region: 'central',
    currentWeight: 'medium',
    feedingGoal: 'fall-prep',
    lastCalculation: null
};

// Initialize calculator
document.addEventListener('DOMContentLoaded', function() {
    loadSavedState();
    attachEventListeners();
    updateDateBasedRecommendations();
});

// Load saved state from localStorage
function loadSavedState() {
    const saved = localStorage.getItem('feedingCalculatorState');
    if (saved) {
        try {
            calculatorState = { ...calculatorState, ...JSON.parse(saved) };
            updateFormFromState();
        } catch (e) {
            console.error('Error loading saved state:', e);
        }
    }
}

// Update form fields from state
function updateFormFromState() {
    document.getElementById('num-hives').value = calculatorState.numHives;
    document.getElementById('colony-size').value = calculatorState.colonySize;
    document.getElementById('region').value = calculatorState.region;
    document.getElementById('feeding-goal').value = calculatorState.feedingGoal;
    
    // Update weight buttons
    document.querySelectorAll('.weight-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.weight === calculatorState.currentWeight) {
            btn.classList.add('selected');
        }
    });
}

// Attach event listeners
function attachEventListeners() {
    // Input changes
    document.getElementById('num-hives').addEventListener('change', updateState);
    document.getElementById('colony-size').addEventListener('change', updateState);
    document.getElementById('region').addEventListener('change', updateState);
    document.getElementById('feeding-goal').addEventListener('change', updateState);
    
    // Weight buttons
    document.querySelectorAll('.weight-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.weight-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            calculatorState.currentWeight = this.dataset.weight;
            saveState();
        });
    });
}

// Update state
function updateState() {
    calculatorState.numHives = parseInt(document.getElementById('num-hives').value);
    calculatorState.colonySize = document.getElementById('colony-size').value;
    calculatorState.region = document.getElementById('region').value;
    calculatorState.feedingGoal = document.getElementById('feeding-goal').value;
    saveState();
}

// Save state to localStorage
function saveState() {
    localStorage.setItem('feedingCalculatorState', JSON.stringify(calculatorState));
}

// Main calculation function
function calculateFeeding() {
    // Get current values
    const numHives = calculatorState.numHives;
    const colonySize = calculatorState.colonySize;
    const region = calculatorState.region;
    const currentWeight = calculatorState.currentWeight;
    const feedingGoal = calculatorState.feedingGoal;
    
    // Determine syrup ratio based on goal and season
    const ratio = determineSyrupRatio(feedingGoal);
    
    // Calculate weight deficit
    const weightDeficit = calculateWeightDeficit(region, currentWeight, colonySize);
    
    // Calculate feeding amounts
    const feedingPlan = calculateFeedingAmounts(
        numHives,
        colonySize,
        weightDeficit,
        ratio,
        feedingGoal
    );
    
    // Update UI with results
    displayResults(feedingPlan);
    
    // Save calculation
    calculatorState.lastCalculation = {
        timestamp: new Date().toISOString(),
        plan: feedingPlan
    };
    saveState();
    
    // Log to feeding history
    logFeedingCalculation(feedingPlan);
}

// Determine appropriate syrup ratio
function determineSyrupRatio(feedingGoal) {
    const month = new Date().getMonth() + 1;
    
    // Goal-based ratio selection
    switch(feedingGoal) {
        case 'spring-buildup':
        case 'new-package':
            return FEEDING_CONSTANTS.RATIOS.SPRING;
        
        case 'fall-prep':
        case 'emergency':
            return FEEDING_CONSTANTS.RATIOS.FALL;
        
        case 'dearth':
            // Use 1:1 in summer, 2:1 in late summer
            return month >= 8 ? FEEDING_CONSTANTS.RATIOS.FALL : FEEDING_CONSTANTS.RATIOS.SPRING;
        
        default:
            // Default based on month
            return (month >= 9 || month <= 3) ? 
                FEEDING_CONSTANTS.RATIOS.FALL : 
                FEEDING_CONSTANTS.RATIOS.SPRING;
    }
}

// Calculate weight deficit
function calculateWeightDeficit(region, currentWeight, colonySize) {
    const requirements = FEEDING_CONSTANTS.REGIONAL_REQUIREMENTS[region];
    const sizeMultiplier = FEEDING_CONSTANTS.COLONY_SIZE_MULTIPLIERS[colonySize];
    
    // Estimate current weight in pounds
    let estimatedWeight;
    switch(currentWeight) {
        case 'light':
            estimatedWeight = 40;
            break;
        case 'medium':
            estimatedWeight = 65;
            break;
        case 'heavy':
            estimatedWeight = 90;
            break;
        default:
            estimatedWeight = 65;
    }
    
    // Adjust for colony size
    estimatedWeight *= sizeMultiplier;
    
    // Calculate target weight
    const targetWeight = requirements.target * sizeMultiplier;
    
    // Calculate deficit (can be negative if overweight)
    const deficit = Math.max(0, targetWeight - estimatedWeight);
    
    return {
        current: estimatedWeight,
        target: targetWeight,
        deficit: deficit,
        critical: deficit > (requirements.critical - requirements.target)
    };
}

// Calculate feeding amounts
function calculateFeedingAmounts(numHives, colonySize, weightDeficit, ratio, feedingGoal) {
    const frequency = FEEDING_CONSTANTS.FEEDING_FREQUENCY[feedingGoal];
    const sizeMultiplier = FEEDING_CONSTANTS.COLONY_SIZE_MULTIPLIERS[colonySize];
    
    // Calculate syrup needed to meet deficit
    const ratioName = ratio.name;
    const weightGainPerGallon = FEEDING_CONSTANTS.WEIGHT_GAIN_PER_GALLON[ratioName];
    const gallonsNeeded = weightDeficit.deficit / weightGainPerGallon;
    
    // Calculate per-feeding amounts
    const totalFeedings = frequency.times * frequency.duration;
    const gallonsPerFeeding = Math.max(1, gallonsNeeded / totalFeedings) * sizeMultiplier;
    
    // Calculate sugar and water amounts
    let sugarPerGallon, waterPerGallon;
    if (ratioName === '1:1') {
        sugarPerGallon = 8;  // 8 lbs sugar per gallon of water
        waterPerGallon = 8;  // 8 lbs (1 gallon) water
    } else { // 2:1
        sugarPerGallon = 16; // 16 lbs sugar per gallon of water
        waterPerGallon = 8;  // 8 lbs (1 gallon) water
    }
    
    // Calculate batch amounts
    const sugarPerBatch = Math.round(sugarPerGallon * gallonsPerFeeding * numHives);
    const waterPerBatch = Math.round(waterPerGallon * gallonsPerFeeding * numHives);
    const syrupVolume = Math.round(gallonsPerFeeding * 1.5 * numHives * 10) / 10; // Approximate yield
    
    // Calculate total amounts
    const totalSugar = sugarPerBatch * totalFeedings;
    const totalWater = waterPerBatch * totalFeedings;
    
    // Calculate end date
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + (frequency.duration * 7));
    
    return {
        ratio: ratio,
        perFeeding: {
            sugar: sugarPerBatch,
            water: waterPerBatch,
            syrupVolume: syrupVolume
        },
        frequency: frequency,
        total: {
            sugar: totalSugar,
            water: totalWater,
            feedings: totalFeedings
        },
        weightDeficit: weightDeficit,
        endDate: endDate,
        critical: weightDeficit.critical
    };
}

// Display calculation results
function displayResults(plan) {
    // Show results section
    document.getElementById('calc-results').style.display = 'block';
    
    // Update ratio display
    document.getElementById('ratio-result').textContent = plan.ratio.name;
    document.getElementById('ratio-reason').textContent = plan.ratio.use;
    
    // Update per feeding amounts
    document.getElementById('sugar-amount').textContent = `${plan.perFeeding.sugar} lbs`;
    document.getElementById('water-amount').textContent = `${plan.perFeeding.water} lbs`;
    document.getElementById('syrup-volume').textContent = `${plan.perFeeding.syrupVolume} gal`;
    
    // Update frequency and duration
    const frequencyText = `${plan.frequency.times}x per ${plan.frequency.period}`;
    document.getElementById('feed-frequency').textContent = frequencyText;
    document.getElementById('feed-until').textContent = formatDate(plan.endDate);
    document.getElementById('total-sugar').textContent = `${plan.total.sugar} lbs sugar`;
    
    // Add critical warning if needed
    if (plan.critical) {
        addCriticalWarning();
    }
    
    // Smooth scroll to results
    document.getElementById('calc-results').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
    });
}

// Format date for display
function formatDate(date) {
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Add critical warning
function addCriticalWarning() {
    const resultsDiv = document.getElementById('calc-results');
    const existingWarning = resultsDiv.querySelector('.critical-warning');
    
    if (!existingWarning) {
        const warning = document.createElement('div');
        warning.className = 'alert alert-danger critical-warning';
        warning.innerHTML = `
            <h4>⚠️ Critical Weight Deficit Detected</h4>
            <p>Your colonies are significantly underweight for the season. 
            Begin feeding immediately and monitor closely.</p>
        `;
        resultsDiv.insertBefore(warning, resultsDiv.firstChild);
    }
}

// Show batch recipe
function showBatchRecipe() {
    if (!calculatorState.lastCalculation) return;
    
    const plan = calculatorState.lastCalculation.plan;
    
    // Switch to recipes tab
    document.querySelector('[data-tab="recipes"]').click();
    
    // Update recipe display with calculated amounts
    updateRecipeDisplay(plan);
}

// Save feeding plan
function saveFeedingPlan() {
    if (!calculatorState.lastCalculation) return;
    
    const plans = JSON.parse(localStorage.getItem('savedFeedingPlans') || '[]');
    plans.push({
        date: new Date().toISOString(),
        ...calculatorState.lastCalculation
    });
    
    // Keep only last 10 plans
    if (plans.length > 10) {
        plans.shift();
    }
    
    localStorage.setItem('savedFeedingPlans', JSON.stringify(plans));
    
    // Show confirmation
    showNotification('Feeding plan saved successfully!');
}

// Log feeding calculation
function logFeedingCalculation(plan) {
    const log = JSON.parse(localStorage.getItem('feedingLog') || '[]');
    log.push({
        timestamp: new Date().toISOString(),
        hives: calculatorState.numHives,
        region: calculatorState.region,
        goal: calculatorState.feedingGoal,
        ratio: plan.ratio.name,
        totalSugar: plan.total.sugar
    });
    
    // Keep only last 50 entries
    if (log.length > 50) {
        log.shift();
    }
    
    localStorage.setItem('feedingLog', JSON.stringify(log));
}

// Update date-based recommendations
function updateDateBasedRecommendations() {
    const month = new Date().getMonth() + 1;
    const recommendation = FEEDING_CONSTANTS.CRITICAL_DATES[month];
    
    // Add seasonal reminder if exists
    const intro = document.querySelector('.calculator-intro');
    if (intro && recommendation) {
        const reminder = document.createElement('div');
        reminder.className = 'seasonal-reminder';
        reminder.innerHTML = `
            <p class="reminder-text">
                <strong>This Month:</strong> ${recommendation}
            </p>
        `;
        intro.appendChild(reminder);
    }
}

// Update recipe display
function updateRecipeDisplay(plan) {
    // This will be implemented in recipes.js
    if (window.updateRecipeWithPlan) {
        window.updateRecipeWithPlan(plan);
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Export functions for use in other modules
window.feedingCalculator = {
    calculate: calculateFeeding,
    getState: () => calculatorState,
    constants: FEEDING_CONSTANTS
};