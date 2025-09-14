// Regional Feeding Calendar Logic
// Seasonal schedules and critical dates for beekeeping

const CALENDAR_DATA = {
    // Regional feeding schedules by month
    regions: {
        north: {
            name: 'Northern US (Zones 3-5)',
            schedule: [
                { month: 1, activity: 'Monitor', feeding: 'emergency', notes: 'Emergency dry sugar if needed' },
                { month: 2, activity: 'Critical Check', feeding: 'emergency', notes: 'Peak starvation risk - check weight' },
                { month: 3, activity: 'Spring Prep', feeding: 'light-1:1', notes: 'Begin light feeding if warm days' },
                { month: 4, activity: 'Spring Buildup', feeding: 'heavy-1:1', notes: 'Heavy feeding for brood buildup' },
                { month: 5, activity: 'Reduce Feed', feeding: 'monitor', notes: 'Natural nectar flow begins' },
                { month: 6, activity: 'Monitor', feeding: 'none', notes: 'Strong nectar flow' },
                { month: 7, activity: 'Dearth Watch', feeding: 'light-1:1', notes: 'Monitor for summer dearth' },
                { month: 8, activity: 'Fall Prep Start', feeding: 'heavy-2:1', notes: 'Begin fall feeding' },
                { month: 9, activity: 'Heavy Feed', feeding: 'heavy-2:1', notes: 'Critical fall feeding period' },
                { month: 10, activity: 'Final Feed', feeding: 'heavy-2:1', notes: 'Last chance - target 90 lbs' },
                { month: 11, activity: 'Winter Prep', feeding: 'emergency', notes: 'Emergency feeding only if needed' },
                { month: 12, activity: 'Winter Cluster', feeding: 'none', notes: 'Colony clustered - no liquid feed' }
            ],
            criticalDates: [
                { date: '02-15', event: 'Weight Check Critical', type: 'danger' },
                { date: '04-01', event: 'Spring Feeding Begins', type: 'success' },
                { date: '07-04', event: 'Queen Right Check', type: 'warning' },
                { date: '08-15', event: 'Varroa Treatment Deadline', type: 'danger' },
                { date: '10-01', event: '90 lbs Target Weight', type: 'danger' },
                { date: '11-01', event: 'Final Winter Check', type: 'warning' }
            ]
        },
        
        central: {
            name: 'Central US (Zones 5-7)',
            schedule: [
                { month: 1, activity: 'Monitor', feeding: 'emergency', notes: 'Check on warm days only' },
                { month: 2, activity: 'Late Winter Check', feeding: 'emergency', notes: 'Monitor weight closely' },
                { month: 3, activity: 'Spring Buildup', feeding: 'moderate-1:1', notes: 'Start feeding mid-month' },
                { month: 4, activity: 'Heavy Buildup', feeding: 'heavy-1:1', notes: 'Peak feeding for growth' },
                { month: 5, activity: 'Monitor Flow', feeding: 'light-1:1', notes: 'Reduce as nectar flows' },
                { month: 6, activity: 'Nectar Flow', feeding: 'none', notes: 'Natural forage available' },
                { month: 7, activity: 'Summer Dearth', feeding: 'moderate-1:1', notes: 'Feed during dearth periods' },
                { month: 8, activity: 'Fall Prep', feeding: 'moderate-2:1', notes: 'Switch to 2:1 ratio' },
                { month: 9, activity: 'Fall Feeding', feeding: 'heavy-2:1', notes: 'Build winter stores' },
                { month: 10, activity: 'Final Prep', feeding: 'moderate-2:1', notes: 'Target 60 lbs minimum' },
                { month: 11, activity: 'Winter Ready', feeding: 'none', notes: 'Colony should be prepared' },
                { month: 12, activity: 'Winter', feeding: 'none', notes: 'Emergency dry sugar only' }
            ],
            criticalDates: [
                { date: '03-01', event: 'Spring Inspection', type: 'success' },
                { date: '04-15', event: 'Swarm Season Begins', type: 'warning' },
                { date: '07-15', event: 'Dearth Period Start', type: 'warning' },
                { date: '09-01', event: 'Fall Feeding Critical', type: 'danger' },
                { date: '10-15', event: '60 lbs Target Weight', type: 'danger' },
                { date: '11-15', event: 'Winter Preparation Complete', type: 'success' }
            ]
        },
        
        south: {
            name: 'Southern US (Zones 7-9)',
            schedule: [
                { month: 1, activity: 'Light Feed', feeding: 'light-1:1', notes: 'Feed on warm days' },
                { month: 2, activity: 'Spring Start', feeding: 'moderate-1:1', notes: 'Early buildup begins' },
                { month: 3, activity: 'Heavy Buildup', feeding: 'heavy-1:1', notes: 'Rapid growth phase' },
                { month: 4, activity: 'Peak Season', feeding: 'none', notes: 'Strong nectar flow' },
                { month: 5, activity: 'Monitor', feeding: 'none', notes: 'Abundant forage' },
                { month: 6, activity: 'Early Dearth', feeding: 'light-1:1', notes: 'Watch for dearth' },
                { month: 7, activity: 'Summer Dearth', feeding: 'moderate-1:1', notes: 'Hot weather feeding' },
                { month: 8, activity: 'Late Summer', feeding: 'moderate-1:1', notes: 'Continue support' },
                { month: 9, activity: 'Fall Flow', feeding: 'light-2:1', notes: 'Fall nectar available' },
                { month: 10, activity: 'Light Prep', feeding: 'light-2:1', notes: 'Target 40 lbs' },
                { month: 11, activity: 'Monitor', feeding: 'none', notes: 'Mild winter prep' },
                { month: 12, activity: 'Light Winter', feeding: 'emergency', notes: 'Feed if needed' }
            ],
            criticalDates: [
                { date: '02-01', event: 'Early Spring Buildup', type: 'success' },
                { date: '03-15', event: 'Swarm Season Peak', type: 'warning' },
                { date: '06-15', event: 'Summer Dearth Begins', type: 'warning' },
                { date: '09-15', event: 'Fall Nectar Flow', type: 'success' },
                { date: '10-01', event: '40 lbs Target Weight', type: 'warning' },
                { date: '12-01', event: 'Winter Check', type: 'info' }
            ]
        }
    },
    
    // Feeding intensity definitions
    feedingIntensity: {
        'none': { color: '#4CAF50', label: 'No Feeding', amount: 0 },
        'emergency': { color: '#F44336', label: 'Emergency Only', amount: 'as needed' },
        'light-1:1': { color: '#FFC107', label: 'Light 1:1', amount: '1 gal/week' },
        'moderate-1:1': { color: '#FF9800', label: 'Moderate 1:1', amount: '2 gal/week' },
        'heavy-1:1': { color: '#FF5722', label: 'Heavy 1:1', amount: '3+ gal/week' },
        'light-2:1': { color: '#9C27B0', label: 'Light 2:1', amount: '1 gal/week' },
        'moderate-2:1': { color: '#673AB7', label: 'Moderate 2:1', amount: '2 gal/week' },
        'heavy-2:1': { color: '#3F51B5', label: 'Heavy 2:1', amount: '3+ gal/week' },
        'monitor': { color: '#00BCD4', label: 'Monitor Only', amount: 'check weekly' }
    }
};

// Initialize calendar
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('calendar-tab')) {
        initializeCalendar();
        attachCalendarListeners();
    }
});

// Initialize calendar display
function initializeCalendar() {
    const savedRegion = localStorage.getItem('selectedRegion') || 'central';
    document.getElementById('calendar-region').value = savedRegion;
    renderCalendar(savedRegion);
}

// Attach calendar event listeners
function attachCalendarListeners() {
    document.getElementById('calendar-region').addEventListener('change', function() {
        const region = this.value;
        localStorage.setItem('selectedRegion', region);
        renderCalendar(region);
    });
}

// Render calendar for selected region
function renderCalendar(regionKey) {
    const region = CALENDAR_DATA.regions[regionKey];
    if (!region) return;
    
    const calendarContainer = document.querySelector('.calendar-timeline');
    calendarContainer.innerHTML = '';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'calendar-region-header';
    header.innerHTML = `
        <h3>${region.name}</h3>
        <p>Customized feeding schedule for your region</p>
    `;
    calendarContainer.appendChild(header);
    
    // Create month grid
    const monthGrid = document.createElement('div');
    monthGrid.className = 'month-grid';
    
    const currentMonth = new Date().getMonth() + 1;
    
    region.schedule.forEach(month => {
        const monthCard = createMonthCard(month, currentMonth === month.month);
        monthGrid.appendChild(monthCard);
    });
    
    calendarContainer.appendChild(monthGrid);
    
    // Add critical dates section
    const criticalSection = createCriticalDatesSection(region.criticalDates);
    calendarContainer.appendChild(criticalSection);
    
    // Add year overview
    const yearOverview = createYearOverview(region);
    calendarContainer.appendChild(yearOverview);
}

// Create month card
function createMonthCard(monthData, isCurrent) {
    const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    const intensity = CALENDAR_DATA.feedingIntensity[monthData.feeding];
    
    const card = document.createElement('div');
    card.className = `month-card ${isCurrent ? 'current-month' : ''}`;
    card.style.borderColor = intensity.color;
    
    card.innerHTML = `
        <div class="month-header" style="background: ${intensity.color}">
            <h4>${monthNames[monthData.month]}</h4>
            ${isCurrent ? '<span class="current-badge">Current</span>' : ''}
        </div>
        <div class="month-body">
            <div class="month-activity">
                <strong>${monthData.activity}</strong>
            </div>
            <div class="month-feeding">
                <span class="feeding-label">${intensity.label}</span>
                <span class="feeding-amount">${intensity.amount}</span>
            </div>
            <div class="month-notes">
                ${monthData.notes}
            </div>
        </div>
    `;
    
    return card;
}

// Create critical dates section
function createCriticalDatesSection(dates) {
    const section = document.createElement('div');
    section.className = 'critical-dates-section';
    
    section.innerHTML = '<h3>Critical Dates This Year</h3>';
    
    const datesList = document.createElement('div');
    datesList.className = 'critical-dates-list';
    
    const currentYear = new Date().getFullYear();
    const today = new Date();
    
    dates.forEach(dateInfo => {
        const [month, day] = dateInfo.date.split('-');
        const eventDate = new Date(currentYear, parseInt(month) - 1, parseInt(day));
        const isPast = eventDate < today;
        const isNear = Math.abs(eventDate - today) < (7 * 24 * 60 * 60 * 1000); // Within 7 days
        
        const dateCard = document.createElement('div');
        dateCard.className = `critical-date-card ${dateInfo.type} ${isPast ? 'past' : ''} ${isNear ? 'near' : ''}`;
        
        dateCard.innerHTML = `
            <div class="date-marker">
                <span class="date-month">${getMonthShort(parseInt(month))}</span>
                <span class="date-day">${day}</span>
            </div>
            <div class="date-info">
                <strong>${dateInfo.event}</strong>
                ${isNear && !isPast ? '<span class="upcoming-badge">Upcoming!</span>' : ''}
            </div>
        `;
        
        datesList.appendChild(dateCard);
    });
    
    section.appendChild(datesList);
    return section;
}

// Create year overview visualization
function createYearOverview(region) {
    const overview = document.createElement('div');
    overview.className = 'year-overview';
    
    overview.innerHTML = '<h3>Year at a Glance</h3>';
    
    const chart = document.createElement('div');
    chart.className = 'feeding-chart';
    
    // Create visual timeline
    const timeline = document.createElement('div');
    timeline.className = 'feeding-timeline';
    
    region.schedule.forEach(month => {
        const intensity = CALENDAR_DATA.feedingIntensity[month.feeding];
        const bar = document.createElement('div');
        bar.className = 'timeline-month';
        bar.style.background = intensity.color;
        bar.title = `${getMonthShort(month.month)}: ${intensity.label}`;
        timeline.appendChild(bar);
    });
    
    chart.appendChild(timeline);
    
    // Add timeline labels
    const labels = document.createElement('div');
    labels.className = 'timeline-labels';
    for (let i = 1; i <= 12; i++) {
        const label = document.createElement('span');
        label.textContent = getMonthShort(i);
        labels.appendChild(label);
    }
    chart.appendChild(labels);
    
    overview.appendChild(chart);
    return overview;
}

// Get short month name
function getMonthShort(monthNum) {
    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[monthNum];
}

// Add calendar-specific styles
const calendarStyles = document.createElement('style');
calendarStyles.textContent = `
    .calendar-region-header {
        text-align: center;
        margin-bottom: var(--spacing-xl);
    }
    
    .calendar-region-header h3 {
        color: var(--primary-gold);
        font-family: var(--font-primary);
        font-size: 1.5rem;
        margin-bottom: var(--spacing-sm);
    }
    
    .month-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-xl);
    }
    
    .month-card {
        background: white;
        border: 2px solid;
        border-radius: var(--radius-md);
        overflow: hidden;
        transition: transform 0.3s ease;
    }
    
    .month-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }
    
    .month-card.current-month {
        box-shadow: 0 0 0 3px rgba(214, 137, 16, 0.3);
    }
    
    .month-header {
        padding: var(--spacing-sm) var(--spacing-md);
        color: white;
        position: relative;
    }
    
    .month-header h4 {
        margin: 0;
        font-size: 1rem;
    }
    
    .current-badge {
        position: absolute;
        top: 50%;
        right: var(--spacing-md);
        transform: translateY(-50%);
        background: white;
        color: var(--primary-gold);
        padding: 2px 8px;
        border-radius: var(--radius-sm);
        font-size: 0.75rem;
        font-weight: 700;
    }
    
    .month-body {
        padding: var(--spacing-md);
    }
    
    .month-activity {
        font-size: 1.125rem;
        color: var(--text-primary);
        margin-bottom: var(--spacing-sm);
    }
    
    .month-feeding {
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--spacing-sm);
        padding: var(--spacing-xs);
        background: var(--background);
        border-radius: var(--radius-sm);
    }
    
    .feeding-label {
        font-weight: 600;
    }
    
    .feeding-amount {
        color: var(--text-secondary);
        font-size: 0.875rem;
    }
    
    .month-notes {
        font-size: 0.875rem;
        color: var(--text-secondary);
        font-style: italic;
    }
    
    .critical-dates-section {
        margin: var(--spacing-xl) 0;
    }
    
    .critical-dates-section h3 {
        color: var(--primary-gold);
        margin-bottom: var(--spacing-lg);
    }
    
    .critical-dates-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--spacing-md);
    }
    
    .critical-date-card {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-md);
        background: white;
        border-radius: var(--radius-md);
        border: 2px solid var(--border-color);
    }
    
    .critical-date-card.danger {
        border-color: var(--danger);
    }
    
    .critical-date-card.warning {
        border-color: var(--warning);
    }
    
    .critical-date-card.success {
        border-color: var(--success);
    }
    
    .critical-date-card.past {
        opacity: 0.5;
    }
    
    .critical-date-card.near {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
    
    .date-marker {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: var(--spacing-sm);
        background: var(--background);
        border-radius: var(--radius-sm);
        min-width: 50px;
    }
    
    .date-month {
        font-size: 0.75rem;
        text-transform: uppercase;
        color: var(--text-secondary);
    }
    
    .date-day {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--primary-gold);
    }
    
    .date-info {
        flex: 1;
    }
    
    .upcoming-badge {
        display: inline-block;
        background: var(--warning);
        color: white;
        padding: 2px 6px;
        border-radius: var(--radius-sm);
        font-size: 0.625rem;
        margin-left: var(--spacing-sm);
    }
    
    .year-overview {
        margin-top: var(--spacing-xl);
    }
    
    .year-overview h3 {
        color: var(--primary-gold);
        margin-bottom: var(--spacing-lg);
    }
    
    .feeding-chart {
        background: white;
        padding: var(--spacing-lg);
        border-radius: var(--radius-md);
    }
    
    .feeding-timeline {
        display: flex;
        height: 40px;
        border-radius: var(--radius-sm);
        overflow: hidden;
        margin-bottom: var(--spacing-sm);
    }
    
    .timeline-month {
        flex: 1;
        transition: transform 0.3s ease;
    }
    
    .timeline-month:hover {
        transform: scaleY(1.2);
    }
    
    .timeline-labels {
        display: flex;
        justify-content: space-around;
    }
    
    .timeline-labels span {
        font-size: 0.75rem;
        color: var(--text-secondary);
    }
`;

document.head.appendChild(calendarStyles);

// Export calendar functions
window.calendarModule = {
    renderCalendar,
    getRegionalData: (region) => CALENDAR_DATA.regions[region],
    getCurrentMonthFeeding: (region) => {
        const month = new Date().getMonth() + 1;
        return CALENDAR_DATA.regions[region]?.schedule[month - 1];
    }
};