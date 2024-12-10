const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export async function getActivities() {
  const response = await fetch(`${API_BASE_URL}/api/activity`);
  if (!response.ok) {
    throw new Error('Failed to fetch activities');
  }
  return response.json();
}

export async function completeActivity(activity) {
  const response = await fetch(`${API_BASE_URL}/api/activity`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(activity),
  });
  if (!response.ok) {
    throw new Error('Failed to complete activity');
  }
  return response.json();
}
