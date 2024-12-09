export async function getActivities() {
  const response = await fetch(`/api/activities`);
  if (!response.ok) {
    throw new Error('Failed to fetch activities');
  }
  return response.json();
}

export async function completeActivity(activity) {
  const response = await fetch(`/api/activities`, {
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