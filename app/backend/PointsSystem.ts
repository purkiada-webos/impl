export async function initializePoints(userId: string): Promise<void> {
  try {
    await fetch('/api/points', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, action: 'initialize', amount: 10 })
    });
  } catch (error) {
    console.error('Error initializing points:', error);
    throw error;
  }
}

export async function addPoints(userId: string, amount: number): Promise<number> {
  try {
    const response = await fetch('/api/points', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, action: 'add', amount })
    });
    const data = await response.json();
    
    // Trigger points refresh after successful update
    window.dispatchEvent(new Event('pointsUpdated'));
    
    return data.points;
  } catch (error) {
    console.error('Error adding points:', error);
    throw error;
  }
}

export async function subtractPoints(userId: string, amount: number): Promise<number> {
  try {
    const response = await fetch('/api/points', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, action: 'subtract', amount })
    });
    const data = await response.json();
    
    // Trigger points refresh after successful update
    window.dispatchEvent(new Event('pointsUpdated'));
    
    return data.points;
  } catch (error) {
    console.error('Error subtracting points:', error);
    throw error;
  }
}

export async function getPoints(userId: string): Promise<number> {
  try {
    const response = await fetch(`/api/points?userId=${userId}`);
    const data = await response.json();
    return data.points;
  } catch (error) {
    console.error('Error getting points:', error);
    throw error;
  }
}

export async function setPoints(userId: string, amount: number): Promise<number> {
  try {
    const response = await fetch('/api/points', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, action: 'set', amount })
    });
    const data = await response.json();
    
    // Trigger points refresh after successful update
    window.dispatchEvent(new Event('pointsUpdated'));
    
    return data.points;
  } catch (error) {
    console.error('Error setting points:', error);
    throw error;
  }
}

/*

// Initialize points for a new user
await initializePoints(userId);

// Add points to a user's balance
const newTotal = await addPoints(userId, 5);

// Subtract points from a user's balance
const afterSpending = await subtractPoints(userId, 3);

// Check the user's current balance
const currentPoints = await getPoints(userId);

*/