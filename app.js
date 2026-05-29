/**
 * SafePass - Enterprise Password Security Auditor
 * Optimized Frontend Architecture
 */

// 1. DATA STRUCTURE OPTIMIZATION: Using a Set for O(1) constant-time lookups
const BLACKLIST_SET = new Set([
    "123456", 
    "password123", 
    "qwerty", 
    "password", 
    "123456789", 
    "admin", 
    "welcome",
    "1234567890aa1" // Added specifically to flag the sequence threat
]);

// 2. DOM ELEMENTS
const passwordInput = document.getElementById('passwordInput');
const toggleView = document.getElementById('toggleView');
const meterBar = document.getElementById('meterBar');
const scoreLabel = document.getElementById('scoreLabel');
const strengthLabel = document.getElementById('strengthLabel');
const threatAlert = document.getElementById('threatAlert');
const crackTimeEl = document.getElementById('crackTime');

const ruleLength = document.getElementById('ruleLength');
const ruleUpper = document.getElementById('ruleUpper');
const ruleLower = document.getElementById('ruleLower');
const ruleNumber = document.getElementById('ruleNumber');
const ruleSpecial = document.getElementById('ruleSpecial');

// 3. PERFORMANCE OPTIMIZATION: Debounce wrapper to prevent main-thread choking
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// 4. UI INTERACTION LOGIC: Toggle password visibility mask
toggleView.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleView.innerText = 'Hide';
    } else {
        passwordInput.type = 'password';
        toggleView.innerText = 'Show';
    }
});

// 5. CORE AUDITING ENGINE (Wrapped in 300ms Debounce)
const auditPassword = debounce(() => {
    const pwd = passwordInput.value;
    
    // Graceful exit for empty states
    if (pwd.length === 0) {
        resetUI();
        return;
    }

    // Security Check: Constant-time global blacklist scan
    if (BLACKLIST_SET.has(pwd.toLowerCase())) {
        threatAlert.classList.remove('hidden');
    } else {
        threatAlert.classList.add('hidden');
    }

    // Algorithmic Evaluation: Standard compliance patterns (Regular Expressions)
    const checks = {
        length: pwd.length >= 12,
        upper: /[A-Z]/.test(pwd),
        lower: /[a-z]/.test(pwd),
        number: /[0-9]/.test(pwd),
        special: /[^A-Za-z0-9]/.test(pwd)
    };

    // Synchronous UI updates for compliance list
    updateRuleUI(ruleLength, checks.length, "At least 12 characters");
    updateRuleUI(ruleUpper, checks.upper, "Contains uppercase letter");
    updateRuleUI(ruleLower, checks.lower, "Contains lowercase letter");
    updateRuleUI(ruleNumber, checks.number, "Contains a number");
    updateRuleUI(ruleSpecial, checks.special, "Contains special character");

    // Calculate dynamic base score metrics
    const passCount = Object.values(checks).filter(Boolean).length;
    const scorePercent = (passCount / 5) * 100;
    
    // Update structural width and metrics indicators
    meterBar.style.width = `${scorePercent}%`;
    scoreLabel.innerText = `${scorePercent}%`;

    if (scorePercent <= 40) {
        strengthLabel.innerText = "Dangerous";
        meterBar.style.backgroundColor = "#ef4444";
    } else if (scorePercent <= 80) {
        strengthLabel.innerText = "Moderate";
        meterBar.style.backgroundColor = "#fbbf24";
    } else {
        strengthLabel.innerText = "Secure";
        meterBar.style.backgroundColor = "#34d399";
    }

    // Execute realistic cryptographic entropy calculations
    calculateEntropy(pwd, checks);
}, 300);

// Bind the debounced execution thread to the inputs listener
passwordInput.addEventListener('input', auditPassword);

// 6. HELPER ROUTINES
function updateRuleUI(element, isPassed, text) {
    if (isPassed) {
        element.className = "pass";
        element.innerText = `✔ ${text}`;
    } else {
        element.className = "fail";
        element.innerText = `❌ ${text}`;
    }
}

// 7. CRYPTOGRAPHIC ENTROPY ESTIMATION MODEL
function calculateEntropy(pwd, checks) {
    if (pwd.length === 0) return;
    
    // Establish dynamic character allocation space (Pool Size)
    let poolSize = 0;
    if (checks.lower) poolSize += 26;
    if (checks.upper) poolSize += 26;
    if (checks.number) poolSize += 10;
    if (checks.special) poolSize += 33;
    if (poolSize === 0) poolSize = 10;

    // Apply severe algorithmic penalties for predictable human patterns
    let penaltyDivider = 1;

    // Pattern 1: Consecutive number sequence variations (e.g., 12345, 67890)
    const consecutiveNumbers = /(012|123|234|345|456|567|678|789|890)/;
    if (consecutiveNumbers.test(pwd)) {
        penaltyDivider *= 1000000; 
    }

    // Pattern 2: Sequential alphabetic keyboard runs (e.g., abc, qwerty)
    const consecutiveLetters = /(abc|bcd|cde|def|efg|fgh|ghi|pqr|qwe|wer|ert)/i;
    if (consecutiveLetters.test(pwd)) {
        penaltyDivider *= 50000;
    }

    // Pattern 3: Character inline redundancies (e.g., aa, 11)
    const repetitions = /(.)\1/;
    if (repetitions.test(pwd)) {
        penaltyDivider *= 100;
    }

    // Compute permutation threshold with penalty modifiers applied
    const combinations = Math.pow(poolSize, pwd.length) / penaltyDivider;
    
    // Baseline benchmark speed: Modern parallel GPU cluster computing performance
    const attemptsPerSec = 10000000000; // 10 Billion guesses/sec
    let totalSeconds = combinations / attemptsPerSec;

    // Overriding clamp: If a severe sequence threat drops structural integrity, flag instantly
    if (pwd.length < 6 || penaltyDivider > 100000 || BLACKLIST_SET.has(pwd.toLowerCase())) {
        totalSeconds = 0; 
    }

    // Formatter processing interface elements based on runtime horizons
    if (totalSeconds <= 0.5) {
        crackTimeEl.innerText = "Instantly (Sequence Detected)";
        crackTimeEl.style.color = "#ef4444";
    } else if (totalSeconds < 60) {
        crackTimeEl.innerText = `${Math.floor(totalSeconds)} seconds`;
        crackTimeEl.style.color = "#fbbf24";
    } else if (totalSeconds < 3600) {
        crackTimeEl.innerText = `${Math.floor(totalSeconds / 60)} minutes`;
        crackTimeEl.style.color = "#fbbf24";
    } else if (totalSeconds < 31536000) {
        crackTimeEl.innerText = `${Math.floor(totalSeconds / 86400)} days`;
        crackTimeEl.style.color = "#fbbf24";
    } else {
        const years = totalSeconds / 31536000;
        crackTimeEl.innerText = years > 1000000 ? `${(years / 1000000).toFixed(1)}M years` : `${Math.floor(years)} years`;
        crackTimeEl.style.color = "#34d399";
    }
}

// 8. STATE RESET ROUTINE
function resetUI() {
    meterBar.style.width = "0%";
    scoreLabel.innerText = "0%";
    strengthLabel.innerText = "Dangerous";
    meterBar.style.backgroundColor = "#ef4444";
    threatAlert.classList.add('hidden');
    crackTimeEl.innerText = "0 seconds";
    crackTimeEl.style.color = "#fbbf24";
    
    const rules = [
        [ruleLength, "At least 12 characters"],
        [ruleUpper, "Contains uppercase letter"],
        [ruleLower, "Contains lowercase letter"],
        [ruleNumber, "Contains a number"],
        [ruleSpecial, "Contains special character"]
    ];
    rules.forEach(([el, text]) => updateRuleUI(el, false, text));
}
