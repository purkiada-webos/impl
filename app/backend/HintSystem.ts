import { getPoints, subtractPoints } from './PointsSystem';

interface Hint {
  id: string;
  text: string;
  cost: number;
}

const HINT_COST = 5;

const hints: { [key: string]: Hint[] } = {
  'customization': [
    {
      id: 'theme',
      text: 'Try changing the theme in Settings to customize your experience',
      cost: HINT_COST
    },
    {
      id: 'accent',
      text: 'You can change the accent color in Settings to personalize your interface',
      cost: HINT_COST
    },
    {
      id: 'background',
      text: 'Change your background in Settings to make the OS feel more personal',
      cost: HINT_COST
    }
  ]
  // Add more categories and hints as needed
};

interface HintResult {
  success: boolean;
  message: string;
  hint?: string;
  remainingPoints?: number;
}

export async function showHint(userId: string, category: string, hintId: string): Promise<HintResult> {
  try {
    // Check if category exists
    if (!hints[category]) {
      return {
        success: false,
        message: 'Invalid hint category'
      };
    }

    // Find the specific hint
    const hint = hints[category].find(h => h.id === hintId);
    if (!hint) {
      return {
        success: false,
        message: 'Hint not found'
      };
    }

    // Check if user has already seen this hint
    const hintKey = `hint_${userId}_${category}_${hintId}`;
    const hintSeen = localStorage.getItem(hintKey);
    if (hintSeen) {
      return {
        success: true,
        hint: hint.text,
        message: 'Hint already unlocked'
      };
    }

    // Check if user has enough points
    const currentPoints = await getPoints(userId);
    if (currentPoints < hint.cost) {
      return {
        success: false,
        message: `Not enough points. Required: ${hint.cost}, Available: ${currentPoints}`,
        remainingPoints: currentPoints
      };
    }

    // Subtract points and show hint
    const remainingPoints = await subtractPoints(userId, hint.cost);
    
    // Mark hint as seen
    localStorage.setItem(hintKey, 'true');

    return {
      success: true,
      hint: hint.text,
      message: 'Hint unlocked successfully',
      remainingPoints
    };
  } catch (error) {
    console.error('Error showing hint:', error);
    return {
      success: false,
      message: 'Error showing hint'
    };
  }
}

export function getAvailableHints(category: string): Hint[] {
  return hints[category] || [];
}

export function getAllCategories(): string[] {
  return Object.keys(hints);
}

export function isHintSeen(userId: string, category: string, hintId: string): boolean {
  const hintKey = `hint_${userId}_${category}_${hintId}`;
  return localStorage.getItem(hintKey) === 'true';
}

export async function unlockHint(userId: string, category: string, hintId: string): Promise<HintResult> {
  try {
    // Check if category exists
    if (!hints[category]) {
      return {
        success: false,
        message: 'Invalid hint category'
      };
    }

    // Find the specific hint
    const hint = hints[category].find(h => h.id === hintId);
    if (!hint) {
      return {
        success: false,
        message: 'Hint not found'
      };
    }

    // Check if user has already unlocked this hint
    const hintKey = `hint_${userId}_${category}_${hintId}`;
    const hintUnlocked = localStorage.getItem(hintKey);
    if (hintUnlocked) {
      return {
        success: false,
        message: 'Hint already unlocked'
      };
    }

    // Mark hint as unlocked
    localStorage.setItem(hintKey, 'true');

    return {
      success: true,
      message: 'Hint unlocked successfully',
      hint: hint.text
    };
  } catch (error) {
    console.error('Error unlocking hint:', error);
    return {
      success: false,
      message: 'Error unlocking hint'
    };
  }
}

/*

// Show a hint
const result = await showHint(userId, 'customization', 'theme');
if (result.success) {
  // Show the hint to the user
  console.log(result.hint);
  console.log(`Remaining points: ${result.remainingPoints}`);
} else {
  // Handle error
  console.log(result.message);
}

// Check available hints
const hints = getAvailableHints('customization');

// Check if hint was seen
const seen = isHintSeen(userId, 'customization', 'theme');

*/