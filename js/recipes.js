// Batch Recipe Calculator and Management
// Pre-calculated recipes for common batch sizes

const RECIPE_DATA = {
    // Standard batch sizes
    batchSizes: {
        small: { name: '1 Gallon', gallons: 1 },
        medium: { name: '5 Gallons', gallons: 5 },
        large: { name: '10 Gallons', gallons: 10 },
        bag: { name: '10 lb Bag', special: true, sugar: 10 }
    },
    
    // Recipe calculations
    recipes: {
        '1:1': {
            name: 'Spring/Summer Syrup (1:1)',
            ratio: { sugar: 1, water: 1 },
            description: 'Light syrup for stimulating brood production',
            bestFor: ['Spring buildup', 'New packages', 'Summer dearth'],
            calculations: {
                small: { sugar: 8, water: 8, yield: 1.5 },
                medium: { sugar: 40, water: 40, yield: 7.5 },
                large: { sugar: 80, water: 80, yield: 15 },
                bag: { sugar: 10, water: 10, yield: 2 }
            },
            mixingInstructions: [
                'Measure water into large container',
                'Heat water to 140-160°F (do not boil)',
                'Remove from heat',
                'Add sugar gradually while stirring',
                'Stir until completely dissolved',
                'Cool to room temperature before feeding',
                'Use within 3 days or refrigerate'
            ],
            tips: [
                'Add 1 tsp vinegar per gallon to prevent mold',
                'Never boil - it creates HMF toxic to bees',
                'Can add essential oils for health benefits',
                'Feed warm (not hot) for faster consumption'
            ]
        },
        '2:1': {
            name: 'Fall/Winter Syrup (2:1)',
            ratio: { sugar: 2, water: 1 },
            description: 'Heavy syrup for building winter stores',
            bestFor: ['Fall preparation', 'Emergency feeding', 'Winter prep'],
            calculations: {
                small: { sugar: 16, water: 8, yield: 1.5 },
                medium: { sugar: 80, water: 40, yield: 7.5 },
                large: { sugar: 160, water: 80, yield: 15 },
                bag: { sugar: 10, water: 5, yield: 1.25 }
            },
            mixingInstructions: [
                'Measure water into large pot',
                'Heat water to 160-180°F',
                'Remove from heat immediately',
                'Add sugar in batches, stirring constantly',
                'Stir vigorously until fully dissolved',
                'May need to reheat gently if sugar won\'t dissolve',
                'Cool completely before feeding',
                'Syrup will be thick when cool'
            ],
            tips: [
                'No-cook method: Use very hot tap water',
                'Shake vigorously in sealed container',
                'Stores longer than 1:1 due to high sugar',
                'Add bee tea herbs for nutrition'
            ]
        }
    },
    
    // Cost calculations
    costFactors: {
        sugarRetail: 0.79,  // $ per pound retail
        sugarBulk: 0.45,    // $ per pound (50lb bags)
        waterCost: 0.002,   // $ per pound (negligible)
        timeValue: 15,      // $ per hour labor
        equipmentUse: 0.10  // $ per batch
    },
    
    // Storage guidelines
    storage: {
        '1:1': {
            room: '3 days',
            fridge: '2 weeks',
            frozen: '6 months',
            signs: 'Fermentation bubbles, sour smell, cloudiness'
        },
        '2:1': {
            room: '1 week',
            fridge: '1 month',
            frozen: '1 year',
            signs: 'Crystallization, mold, fermentation'
        }
    }
};

// State for recipe calculations
let recipeState = {
    currentRatio: '2:1',
    selectedBatch: 'small',
    customAmount: null,
    lastCalculation: null
};

// Initialize recipes module
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('recipes-tab')) {
        initializeRecipes();
        attachRecipeListeners();
        displayRecipeCards();
    }
});

// Initialize recipes
function initializeRecipes() {
    const savedRatio = localStorage.getItem('preferredRatio') || '2:1';
    recipeState.currentRatio = savedRatio;
    updateRecipeDisplay();
}

// Attach recipe event listeners
function attachRecipeListeners() {
    // Ratio selector buttons
    document.querySelectorAll('.recipe-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const ratio = this.dataset.ratio;
            selectRatio(ratio);
        });
    });
}

// Select syrup ratio
function selectRatio(ratio) {
    recipeState.currentRatio = ratio;
    localStorage.setItem('preferredRatio', ratio);
    
    // Update UI
    document.querySelectorAll('.recipe-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.ratio === ratio);
    });
    
    updateRecipeDisplay();
}

// Update recipe display
function updateRecipeDisplay() {
    const recipe = RECIPE_DATA.recipes[recipeState.currentRatio];
    if (!recipe) return;
    
    displayRecipeCards();
    displayMixingInstructions(recipe);
}

// Display recipe cards
function displayRecipeCards() {
    const container = document.querySelector('.recipe-cards');
    if (!container) return;
    
    const recipe = RECIPE_DATA.recipes[recipeState.currentRatio];
    container.innerHTML = '';
    
    // Create cards for each batch size
    Object.keys(RECIPE_DATA.batchSizes).forEach(sizeKey => {
        const size = RECIPE_DATA.batchSizes[sizeKey];
        const calc = recipe.calculations[sizeKey];
        
        const card = createRecipeCard(size, calc, sizeKey === 'bag');
        container.appendChild(card);
    });
}

// Create individual recipe card
function createRecipeCard(size, calculation, isFeatured) {
    const card = document.createElement('div');
    card.className = `recipe-card ${isFeatured ? 'featured' : ''}`;
    
    const sugarCost = calculation.sugar * RECIPE_DATA.costFactors.sugarBulk;
    const totalCost = sugarCost + RECIPE_DATA.costFactors.equipmentUse;
    
    card.innerHTML = `
        ${isFeatured ? '<span class="badge">Most Popular</span>' : ''}
        <h3>${size.name} Batch</h3>
        <div class="recipe-ingredients">
            <div class="ingredient">
                <span>Sugar:</span>
                <strong>${calculation.sugar} lbs</strong>
            </div>
            <div class="ingredient">
                <span>Water:</span>
                <strong>${calculation.water} lbs (${(calculation.water / 8).toFixed(2)} gal)</strong>
            </div>
            <div class="ingredient">
                <span>Makes:</span>
                <strong>~${calculation.yield} gallons</strong>
            </div>
            <div class="ingredient cost">
                <span>Cost:</span>
                <strong>$${totalCost.toFixed(2)}</strong>
            </div>
        </div>
        <button class="btn btn-small ${isFeatured ? 'btn-primary' : ''}" 
                onclick="showDetailedRecipe('${size.name}', ${calculation.sugar}, ${calculation.water}, ${calculation.yield})">
            View Instructions
        </button>
    `;
    
    return card;
}

// Display mixing instructions
function displayMixingInstructions(recipe) {
    const tipsSection = document.querySelector('.mixing-tips');
    if (!tipsSection) return;
    
    tipsSection.innerHTML = `
        <h3>${recipe.name} - Mixing Instructions</h3>
        <ol>
            ${recipe.mixingInstructions.map(step => `<li>${step}</li>`).join('')}
        </ol>
        
        <h4>Pro Tips:</h4>
        <ul>
            ${recipe.tips.map(tip => `<li>${tip}</li>`).join('')}
        </ul>
        
        <h4>Best Used For:</h4>
        <ul>
            ${recipe.bestFor.map(use => `<li>${use}</li>`).join('')}
        </ul>
        
        <h4>Storage Guidelines:</h4>
        <div class="storage-info">
            <p><strong>Room Temperature:</strong> ${RECIPE_DATA.storage[recipeState.currentRatio].room}</p>
            <p><strong>Refrigerated:</strong> ${RECIPE_DATA.storage[recipeState.currentRatio].fridge}</p>
            <p><strong>Frozen:</strong> ${RECIPE_DATA.storage[recipeState.currentRatio].frozen}</p>
            <p class="warning-text"><strong>Spoilage Signs:</strong> ${RECIPE_DATA.storage[recipeState.currentRatio].signs}</p>
        </div>
    `;
}

// Show detailed recipe modal
window.showDetailedRecipe = function(batchName, sugar, water, yield) {
    const recipe = RECIPE_DATA.recipes[recipeState.currentRatio];
    
    const modal = document.createElement('div');
    modal.className = 'recipe-modal';
    modal.innerHTML = `
        <div class="recipe-modal-content">
            <div class="recipe-modal-header">
                <h2>${batchName} - ${recipe.name}</h2>
                <button class="modal-close" onclick="closeRecipeModal()">×</button>
            </div>
            
            <div class="recipe-modal-body">
                <div class="recipe-summary">
                    <h3>Ingredients Needed:</h3>
                    <ul class="ingredient-list">
                        <li>${sugar} pounds granulated white sugar</li>
                        <li>${water} pounds water (${(water/8).toFixed(2)} gallons)</li>
                        <li>Large pot or container (${Math.ceil(yield * 1.5)} gallon capacity)</li>
                        <li>Stirring implement</li>
                        <li>Thermometer (optional but recommended)</li>
                    </ul>
                </div>
                
                <div class="recipe-steps">
                    <h3>Step-by-Step Instructions:</h3>
                    <ol>
                        ${recipe.mixingInstructions.map((step, index) => `
                            <li>
                                <span class="step-number">${index + 1}</span>
                                ${step}
                            </li>
                        `).join('')}
                    </ol>
                </div>
                
                <div class="recipe-timing">
                    <h3>Time Estimate:</h3>
                    <p>Preparation: 5 minutes</p>
                    <p>Mixing: ${Math.ceil(sugar / 20)} minutes</p>
                    <p>Cooling: 30-60 minutes</p>
                    <p><strong>Total: ${35 + Math.ceil(sugar / 20)} - ${65 + Math.ceil(sugar / 20)} minutes</strong></p>
                </div>
                
                <div class="recipe-cost-breakdown">
                    <h3>Cost Breakdown:</h3>
                    <table class="cost-table">
                        <tr>
                            <td>Sugar (bulk price):</td>
                            <td>$${(sugar * RECIPE_DATA.costFactors.sugarBulk).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Sugar (retail price):</td>
                            <td>$${(sugar * RECIPE_DATA.costFactors.sugarRetail).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Water:</td>
                            <td>$${(water * RECIPE_DATA.costFactors.waterCost).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Equipment/Energy:</td>
                            <td>$${RECIPE_DATA.costFactors.equipmentUse.toFixed(2)}</td>
                        </tr>
                        <tr class="total-row">
                            <td><strong>Total (bulk):</strong></td>
                            <td><strong>$${(sugar * RECIPE_DATA.costFactors.sugarBulk + RECIPE_DATA.costFactors.equipmentUse).toFixed(2)}</strong></td>
                        </tr>
                    </table>
                    <p class="savings-note">
                        💰 Save $${((sugar * RECIPE_DATA.costFactors.sugarRetail) - (sugar * RECIPE_DATA.costFactors.sugarBulk)).toFixed(2)} 
                        by buying sugar in bulk!
                    </p>
                </div>
                
                <div class="recipe-actions">
                    <button class="btn btn-primary" onclick="printRecipe('${batchName}', ${sugar}, ${water}, ${yield})">
                        Print Recipe
                    </button>
                    <button class="btn btn-secondary" onclick="saveRecipeToLog('${batchName}', ${sugar}, ${water}, ${yield})">
                        Save to Log
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add closing on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeRecipeModal();
        }
    });
};

// Close recipe modal
window.closeRecipeModal = function() {
    const modal = document.querySelector('.recipe-modal');
    if (modal) {
        modal.remove();
    }
};

// Print recipe
window.printRecipe = function(batchName, sugar, water, yield) {
    const recipe = RECIPE_DATA.recipes[recipeState.currentRatio];
    
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
        <html>
        <head>
            <title>${batchName} - ${recipe.name}</title>
            <style>
                body { font-family: Georgia, serif; padding: 20px; }
                h1 { color: #d68910; }
                h2 { color: #2c3e50; margin-top: 20px; }
                ul, ol { line-height: 1.8; }
                .ingredient-box { 
                    border: 2px solid #d68910; 
                    padding: 15px; 
                    margin: 20px 0;
                    background: #fef9f0;
                }
                @media print {
                    body { font-size: 12pt; }
                }
            </style>
        </head>
        <body>
            <h1>${batchName} - ${recipe.name}</h1>
            
            <div class="ingredient-box">
                <h2>Ingredients:</h2>
                <ul>
                    <li>${sugar} lbs granulated sugar</li>
                    <li>${water} lbs water (${(water/8).toFixed(2)} gallons)</li>
                </ul>
                <p><strong>Yields:</strong> Approximately ${yield} gallons of syrup</p>
            </div>
            
            <h2>Instructions:</h2>
            <ol>
                ${recipe.mixingInstructions.map(step => `<li>${step}</li>`).join('')}
            </ol>
            
            <h2>Storage:</h2>
            <p>Room temp: ${RECIPE_DATA.storage[recipeState.currentRatio].room}</p>
            <p>Refrigerated: ${RECIPE_DATA.storage[recipeState.currentRatio].fridge}</p>
            
            <p style="margin-top: 30px; font-style: italic;">
                Generated by Seasonal Feeding Calculator - ${new Date().toLocaleDateString()}
            </p>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
};

// Save recipe to log
window.saveRecipeToLog = function(batchName, sugar, water, yield) {
    const recipeLog = JSON.parse(localStorage.getItem('recipeLog') || '[]');
    
    recipeLog.push({
        date: new Date().toISOString(),
        batch: batchName,
        ratio: recipeState.currentRatio,
        sugar: sugar,
        water: water,
        yield: yield,
        cost: (sugar * RECIPE_DATA.costFactors.sugarBulk + RECIPE_DATA.costFactors.equipmentUse).toFixed(2)
    });
    
    // Keep last 20 recipes
    if (recipeLog.length > 20) {
        recipeLog.shift();
    }
    
    localStorage.setItem('recipeLog', JSON.stringify(recipeLog));
    
    // Show confirmation
    const notification = document.createElement('div');
    notification.className = 'notification notification-success';
    notification.textContent = 'Recipe saved to log!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
};

// Update recipe with calculated plan
window.updateRecipeWithPlan = function(plan) {
    // Switch to appropriate ratio
    const ratioMap = {
        '1:1': '1:1',
        '2:1': '2:1'
    };
    
    const mappedRatio = ratioMap[plan.ratio.name];
    if (mappedRatio) {
        selectRatio(mappedRatio);
    }
    
    // Highlight the batch size closest to calculated needs
    const sugarNeeded = plan.perFeeding.sugar;
    
    // Find closest batch size
    let closestBatch = 'small';
    let closestDiff = Math.abs(8 - sugarNeeded);
    
    Object.keys(RECIPE_DATA.recipes[mappedRatio].calculations).forEach(size => {
        const calc = RECIPE_DATA.recipes[mappedRatio].calculations[size];
        const diff = Math.abs(calc.sugar - sugarNeeded);
        if (diff < closestDiff) {
            closestDiff = diff;
            closestBatch = size;
        }
    });
    
    // Highlight the recommended batch
    setTimeout(() => {
        const cards = document.querySelectorAll('.recipe-card');
        cards.forEach((card, index) => {
            if (Object.keys(RECIPE_DATA.batchSizes)[index] === closestBatch) {
                card.classList.add('recommended');
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }, 100);
};

// Add recipe-specific styles
const recipeStyles = document.createElement('style');
recipeStyles.textContent = `
    .recipe-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    }
    
    .recipe-modal-content {
        background: white;
        border-radius: var(--radius-lg);
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
    }
    
    .recipe-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-lg);
        border-bottom: 2px solid var(--border-color);
        background: linear-gradient(135deg, rgba(244, 208, 63, 0.1), rgba(214, 137, 16, 0.1));
    }
    
    .recipe-modal-header h2 {
        color: var(--primary-gold);
        font-family: var(--font-primary);
        margin: 0;
    }
    
    .recipe-modal-body {
        padding: var(--spacing-lg);
    }
    
    .recipe-summary,
    .recipe-steps,
    .recipe-timing,
    .recipe-cost-breakdown {
        margin-bottom: var(--spacing-xl);
    }
    
    .recipe-steps ol {
        counter-reset: step-counter;
        list-style: none;
        padding-left: 0;
    }
    
    .recipe-steps li {
        counter-increment: step-counter;
        margin-bottom: var(--spacing-md);
        padding-left: 3rem;
        position: relative;
    }
    
    .step-number {
        position: absolute;
        left: 0;
        top: 0;
        width: 2rem;
        height: 2rem;
        background: var(--primary-gold);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
    }
    
    .cost-table {
        width: 100%;
        border-collapse: collapse;
    }
    
    .cost-table td {
        padding: var(--spacing-sm);
        border-bottom: 1px solid var(--border-color);
    }
    
    .cost-table .total-row td {
        border-top: 2px solid var(--primary-gold);
        border-bottom: none;
        padding-top: var(--spacing-md);
    }
    
    .savings-note {
        margin-top: var(--spacing-md);
        padding: var(--spacing-md);
        background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(139, 195, 74, 0.1));
        border-radius: var(--radius-md);
        border: 2px solid var(--success);
        color: var(--success);
        font-weight: 600;
    }
    
    .recipe-actions {
        display: flex;
        gap: var(--spacing-md);
        justify-content: center;
    }
    
    .recipe-card.recommended {
        border: 3px solid var(--success);
        box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
    }
    
    .ingredient.cost {
        padding-top: var(--spacing-sm);
        border-top: 1px solid var(--border-color);
        color: var(--success);
    }
    
    .warning-text {
        color: var(--warning);
        font-weight: 600;
    }
    
    .storage-info {
        background: var(--background);
        padding: var(--spacing-md);
        border-radius: var(--radius-md);
        margin-top: var(--spacing-md);
    }
    
    .storage-info p {
        margin-bottom: var(--spacing-sm);
    }
    
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: var(--spacing-md) var(--spacing-lg);
        background: var(--success);
        color: white;
        border-radius: var(--radius-md);
        font-weight: 600;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 3000;
    }
    
    .notification.show {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(recipeStyles);

// Export recipes module
window.recipesModule = {
    selectRatio,
    updateRecipeDisplay,
    getRecipeData: () => RECIPE_DATA,
    calculateCustomBatch: (sugar) => {
        const ratio = recipeState.currentRatio;
        const recipe = RECIPE_DATA.recipes[ratio];
        if (ratio === '1:1') {
            return {
                water: sugar,
                yield: sugar * 0.1875 // Approximate
            };
        } else {
            return {
                water: sugar / 2,
                yield: sugar * 0.09375 // Approximate
            };
        }
    }
};