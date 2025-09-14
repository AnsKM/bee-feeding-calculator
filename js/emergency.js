// Emergency Feeding Diagnostic Logic
// Quick decision tree for emergency feeding situations

const EMERGENCY_DATA = {
    // Temperature thresholds for feeding methods
    temperatureThresholds: {
        liquid: 50,  // Above 50°F for liquid feed
        fondant: 40, // 40-50°F for fondant/candy
        dry: 0       // Below 40°F for dry sugar only
    },
    
    // Signs of starvation
    starvationSigns: [
        {
            sign: 'Dead bees head-first in cells',
            severity: 'critical',
            description: 'Classic starvation position - bees died searching for food',
            action: 'Feed immediately'
        },
        {
            sign: 'No visible honey in frames',
            severity: 'critical',
            description: 'Empty cells around brood area',
            action: 'Emergency feeding required'
        },
        {
            sign: 'Hive weight under 50 lbs',
            severity: 'high',
            description: 'Dangerously low stores for survival',
            action: 'Begin heavy feeding program'
        },
        {
            sign: 'Cannibalized larvae',
            severity: 'critical',
            description: 'Uncapped brood being eaten',
            action: 'Feed protein and syrup immediately'
        },
        {
            sign: 'Bees clustering tightly in warm weather',
            severity: 'high',
            description: 'Conserving energy due to low food',
            action: 'Check stores and feed'
        },
        {
            sign: 'No new eggs or brood',
            severity: 'medium',
            description: 'Queen stopped laying to conserve',
            action: 'Feed 1:1 syrup to stimulate'
        },
        {
            sign: 'Aggressive behavior during inspection',
            severity: 'medium',
            description: 'Defensive due to low stores',
            action: 'Feed and reduce inspections'
        },
        {
            sign: 'Bees not taking syrup in feeder',
            severity: 'low',
            description: 'May indicate adequate stores',
            action: 'Monitor but don\'t force feed'
        }
    ],
    
    // Emergency feeding recipes
    emergencyRecipes: {
        winter: {
            name: 'Winter Emergency Feed',
            temperature: 'Below 50°F',
            method: 'Dry Sugar or Candy Board',
            recipe: [
                '5 lbs granulated sugar',
                'Place newspaper on top bars',
                'Pour sugar on newspaper',
                'Mist lightly with water',
                'Place directly above cluster'
            ],
            notes: 'Never use liquid feed in cold weather'
        },
        spring: {
            name: 'Spring Emergency Feed',
            temperature: 'Above 50°F',
            method: '1:1 Sugar Syrup',
            recipe: [
                '1 part sugar to 1 part water by weight',
                'Heat water to 140°F (not boiling)',
                'Dissolve sugar completely',
                'Cool to room temperature',
                'Feed 1-2 gallons immediately'
            ],
            notes: 'Stimulates brood rearing'
        },
        fall: {
            name: 'Fall Emergency Feed',
            temperature: 'Above 50°F',
            method: '2:1 Sugar Syrup',
            recipe: [
                '2 parts sugar to 1 part water by weight',
                'Heat water to 140°F',
                'Dissolve sugar completely',
                'Cool before feeding',
                'Feed until target weight reached'
            ],
            notes: 'Builds winter stores quickly'
        },
        fondant: {
            name: 'Fondant/Candy Board',
            temperature: '40-50°F',
            method: 'Semi-solid Sugar',
            recipe: [
                '5 lbs sugar',
                '1 cup water',
                'Heat to 234°F (soft ball stage)',
                'Cool to 180°F',
                'Beat until creamy',
                'Pour into shallow pan',
                'Place on top bars when set'
            ],
            notes: 'Good for transition temperatures'
        }
    },
    
    // Decision tree questions
    decisionTree: {
        start: {
            question: 'Can you easily lift the back of the hive with one hand?',
            yes: 'lightweight',
            no: 'checkTemperature'
        },
        lightweight: {
            question: 'Is the temperature above 50°F?',
            yes: 'feedLiquid',
            no: 'feedDry'
        },
        checkTemperature: {
            question: 'What is the current temperature?',
            options: [
                { text: 'Above 50°F', next: 'checkStores' },
                { text: '40-50°F', next: 'checkUrgency' },
                { text: 'Below 40°F', next: 'winterCheck' }
            ]
        },
        checkStores: {
            question: 'Can you see capped honey in the frames?',
            yes: 'adequate',
            no: 'feedModerate'
        },
        checkUrgency: {
            question: 'Are bees clustered and alive?',
            yes: 'feedFondant',
            no: 'emergency'
        },
        winterCheck: {
            question: 'Is the cluster at the top of the hive?',
            yes: 'feedDryUrgent',
            no: 'monitor'
        }
    }
};

// Current diagnostic state
let diagnosticState = {
    currentQuestion: 'start',
    answers: [],
    recommendation: null
};

// Initialize emergency module
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('emergency-tab')) {
        initializeEmergency();
        displayStarvationSigns();
    }
});

// Initialize emergency diagnostic
function initializeEmergency() {
    resetDiagnostic();
}

// Reset diagnostic to start
function resetDiagnostic() {
    diagnosticState = {
        currentQuestion: 'start',
        answers: [],
        recommendation: null
    };
    showDiagnosticQuestion('start');
}

// Show diagnostic question
function showDiagnosticQuestion(questionKey) {
    const question = EMERGENCY_DATA.decisionTree[questionKey];
    if (!question) {
        showRecommendation(questionKey);
        return;
    }
    
    const diagnosticCard = document.getElementById('diagnostic-start');
    
    let html = `
        <h3>Emergency Feeding Assessment</h3>
        <div class="diagnostic-question">
            <p>${question.question}</p>
            <div class="diagnostic-buttons">
    `;
    
    if (question.yes && question.no) {
        // Yes/No question
        html += `
            <button class="btn btn-success" onclick="answerQuestion('${questionKey}', 'yes', '${question.yes}')">
                Yes
            </button>
            <button class="btn btn-danger" onclick="answerQuestion('${questionKey}', 'no', '${question.no}')">
                No
            </button>
        `;
    } else if (question.options) {
        // Multiple choice question
        question.options.forEach(option => {
            html += `
                <button class="btn btn-secondary" onclick="answerQuestion('${questionKey}', '${option.text}', '${option.next}')">
                    ${option.text}
                </button>
            `;
        });
    }
    
    html += `
            </div>
        </div>
    `;
    
    // Add restart button if not at start
    if (questionKey !== 'start') {
        html += `
            <button class="btn btn-small" onclick="resetDiagnostic()">
                Start Over
            </button>
        `;
    }
    
    diagnosticCard.innerHTML = html;
}

// Handle question answer
window.answerQuestion = function(questionKey, answer, nextKey) {
    // Save answer
    diagnosticState.answers.push({
        question: EMERGENCY_DATA.decisionTree[questionKey].question,
        answer: answer
    });
    
    // Move to next question or recommendation
    diagnosticState.currentQuestion = nextKey;
    
    if (EMERGENCY_DATA.decisionTree[nextKey]) {
        showDiagnosticQuestion(nextKey);
    } else {
        showRecommendation(nextKey);
    }
};

// Show feeding recommendation
function showRecommendation(recommendationType) {
    const diagnosticCard = document.getElementById('diagnostic-start');
    const actionDiv = document.getElementById('emergency-action');
    
    let recommendation = getRecommendation(recommendationType);
    
    // Hide diagnostic, show action
    diagnosticCard.style.display = 'none';
    actionDiv.style.display = 'block';
    
    let html = '';
    
    if (recommendation.urgent) {
        html += `
            <div class="alert alert-danger">
                <h3>⚠️ ${recommendation.title}</h3>
                <p>${recommendation.description}</p>
            </div>
        `;
    } else {
        html += `
            <div class="alert alert-${recommendation.type}">
                <h3>${recommendation.title}</h3>
                <p>${recommendation.description}</p>
            </div>
        `;
    }
    
    html += `
        <div class="emergency-steps">
            <h4>${recommendation.action}</h4>
            <ol>
    `;
    
    recommendation.steps.forEach(step => {
        html += `<li>${step}</li>`;
    });
    
    html += `
            </ol>
        </div>
    `;
    
    if (recommendation.recipe) {
        html += `
            <button class="btn btn-primary" onclick="showEmergencyRecipe('${recommendation.recipe}')">
                View Recipe
            </button>
        `;
    }
    
    html += `
        <button class="btn btn-secondary" onclick="resetEmergencyDiagnostic()">
            Start New Assessment
        </button>
    `;
    
    actionDiv.innerHTML = html;
}

// Get recommendation based on type
function getRecommendation(type) {
    const recommendations = {
        feedLiquid: {
            title: 'FEED LIQUID SYRUP IMMEDIATELY',
            description: 'Your colony is dangerously light and conditions allow liquid feeding.',
            type: 'danger',
            urgent: true,
            action: 'Emergency Liquid Feeding Protocol',
            steps: [
                'Mix 1:1 sugar syrup (8 lbs sugar to 1 gallon water)',
                'Feed 1-2 gallons immediately via top feeder',
                'Continue feeding daily until bees stop taking syrup',
                'Check weight again in 3 days',
                'Continue until hive reaches target weight for your region'
            ],
            recipe: 'spring'
        },
        feedDry: {
            title: 'EMERGENCY DRY SUGAR FEEDING',
            description: 'Colony is starving but too cold for liquid feed.',
            type: 'danger',
            urgent: true,
            action: 'Winter Emergency Feed Protocol',
            steps: [
                'Place newspaper directly on top bars',
                'Pour 5 lbs dry granulated sugar on newspaper',
                'Lightly mist sugar with water spray bottle',
                'Close hive quickly to retain heat',
                'Check again on next warm day (above 40°F)'
            ],
            recipe: 'winter'
        },
        feedDryUrgent: {
            title: 'CRITICAL - FEED DRY SUGAR NOW',
            description: 'Cluster at top indicates they have eaten through stores.',
            type: 'danger',
            urgent: true,
            action: 'Immediate Winter Rescue',
            steps: [
                'Mountain camp method: Pour dry sugar on newspaper',
                'Place directly on top bars above cluster',
                'Add moisture absorbing material if available',
                'Minimize hive opening time (under 30 seconds)',
                'Prepare candy board for sustained feeding'
            ],
            recipe: 'winter'
        },
        feedModerate: {
            title: 'Begin Supplemental Feeding',
            description: 'Stores are low but not critical. Start feeding program.',
            type: 'warning',
            urgent: false,
            action: 'Supplemental Feeding Plan',
            steps: [
                'Mix appropriate syrup ratio for season',
                'Feed 1 gallon every 3 days',
                'Monitor consumption rate',
                'Continue until target weight reached',
                'Switch to 2:1 if preparing for winter'
            ],
            recipe: 'spring'
        },
        feedFondant: {
            title: 'Use Fondant or Candy Board',
            description: 'Temperature too cold for liquid but above freezing.',
            type: 'warning',
            urgent: false,
            action: 'Semi-Solid Feeding Method',
            steps: [
                'Prepare fondant or candy board',
                'Place directly above cluster',
                'Can be left in place for weeks',
                'Check consumption monthly',
                'Switch to liquid when temps rise above 50°F'
            ],
            recipe: 'fondant'
        },
        adequate: {
            title: 'Stores Appear Adequate',
            description: 'Colony has visible honey stores. Continue monitoring.',
            type: 'success',
            urgent: false,
            action: 'Monitoring Protocol',
            steps: [
                'Check weight monthly',
                'Monitor for consumption rate',
                'Be ready to feed if weather prevents foraging',
                'Consider feeding before major nectar flows',
                'Keep feeders clean and ready'
            ],
            recipe: null
        },
        monitor: {
            title: 'Continue Monitoring',
            description: 'No immediate feeding needed but stay vigilant.',
            type: 'info',
            urgent: false,
            action: 'Regular Monitoring Schedule',
            steps: [
                'Check hive weight bi-weekly',
                'Watch for changes in activity',
                'Have emergency feed ready',
                'Document observations',
                'Reassess if conditions change'
            ],
            recipe: null
        },
        emergency: {
            title: 'EMERGENCY - COLONY IN CRISIS',
            description: 'Multiple signs of severe stress. Act immediately.',
            type: 'danger',
            urgent: true,
            action: 'Crisis Intervention',
            steps: [
                'Feed whatever is appropriate for temperature',
                'Consider combining with stronger colony',
                'Check for disease or pest issues',
                'Provide protein supplement if available',
                'Seek local beekeeping mentor help'
            ],
            recipe: 'spring'
        }
    };
    
    return recommendations[type] || recommendations.monitor;
}

// Show emergency recipe
window.showEmergencyRecipe = function(recipeType) {
    const recipe = EMERGENCY_DATA.emergencyRecipes[recipeType];
    if (!recipe) return;
    
    // Switch to recipes tab
    document.querySelector('[data-tab="recipes"]').click();
    
    // Display emergency recipe
    setTimeout(() => {
        displayEmergencyRecipe(recipe);
    }, 100);
};

// Display emergency recipe in recipes tab
function displayEmergencyRecipe(recipe) {
    const recipesTab = document.getElementById('recipes-tab');
    
    // Add emergency recipe card at top
    const emergencyCard = document.createElement('div');
    emergencyCard.className = 'emergency-recipe-card';
    emergencyCard.innerHTML = `
        <div class="alert alert-warning">
            <h3>Emergency Recipe: ${recipe.name}</h3>
        </div>
        <div class="recipe-details">
            <p><strong>Temperature Range:</strong> ${recipe.temperature}</p>
            <p><strong>Method:</strong> ${recipe.method}</p>
            <h4>Instructions:</h4>
            <ol>
                ${recipe.recipe.map(step => `<li>${step}</li>`).join('')}
            </ol>
            <p class="recipe-note"><strong>Note:</strong> ${recipe.notes}</p>
        </div>
    `;
    
    // Insert at beginning of recipes tab
    recipesTab.insertBefore(emergencyCard, recipesTab.firstChild);
    
    // Scroll to top
    emergencyCard.scrollIntoView({ behavior: 'smooth' });
}

// Reset emergency diagnostic
window.resetEmergencyDiagnostic = function() {
    document.getElementById('diagnostic-start').style.display = 'block';
    document.getElementById('emergency-action').style.display = 'none';
    resetDiagnostic();
};

// Display starvation signs grid
function displayStarvationSigns() {
    const signsGrid = document.querySelector('.signs-grid');
    if (!signsGrid) return;
    
    signsGrid.innerHTML = '';
    
    // Only show critical and high severity signs
    const importantSigns = EMERGENCY_DATA.starvationSigns.filter(
        sign => sign.severity === 'critical' || sign.severity === 'high'
    ).slice(0, 4);
    
    importantSigns.forEach(signData => {
        const card = document.createElement('div');
        card.className = `sign-card severity-${signData.severity}`;
        
        card.innerHTML = `
            <span class="sign-icon">${getSignIcon(signData.sign)}</span>
            <h4>${signData.sign}</h4>
            <p>${signData.description}</p>
            <span class="sign-action">${signData.action}</span>
        `;
        
        signsGrid.appendChild(card);
    });
}

// Get icon for starvation sign
function getSignIcon(sign) {
    const icons = {
        'Dead bees head-first in cells': '💀',
        'No visible honey in frames': '🍯',
        'Hive weight under 50 lbs': '⚖️',
        'Cannibalized larvae': '👶',
        'Bees clustering tightly in warm weather': '🐝',
        'No new eggs or brood': '🥚',
        'Aggressive behavior during inspection': '😠',
        'Bees not taking syrup in feeder': '🚫'
    };
    return icons[sign] || '⚠️';
}

// Show emergency yes response
window.showEmergencyYes = function() {
    showDiagnosticQuestion('lightweight');
};

// Check next question
window.checkNextQuestion = function() {
    showDiagnosticQuestion('checkTemperature');
};

// Add emergency-specific styles
const emergencyStyles = document.createElement('style');
emergencyStyles.textContent = `
    .severity-critical .sign-card {
        border-color: var(--danger);
    }
    
    .severity-high .sign-card {
        border-color: var(--warning);
    }
    
    .sign-action {
        display: block;
        margin-top: var(--spacing-sm);
        font-size: 0.75rem;
        font-weight: 700;
        color: var(--primary-gold);
        text-transform: uppercase;
    }
    
    .emergency-recipe-card {
        background: white;
        border: 3px solid var(--warning);
        border-radius: var(--radius-lg);
        padding: var(--spacing-lg);
        margin-bottom: var(--spacing-xl);
    }
    
    .recipe-details ol {
        margin-left: var(--spacing-lg);
        line-height: 1.8;
    }
    
    .recipe-note {
        margin-top: var(--spacing-md);
        padding: var(--spacing-md);
        background: var(--background);
        border-radius: var(--radius-md);
        font-style: italic;
    }
`;

document.head.appendChild(emergencyStyles);

// Export emergency functions
window.emergencyModule = {
    resetDiagnostic,
    showRecommendation,
    getStarvationSigns: () => EMERGENCY_DATA.starvationSigns,
    getEmergencyRecipes: () => EMERGENCY_DATA.emergencyRecipes
};