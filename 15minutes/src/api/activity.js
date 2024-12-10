
export async function getActivities() {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetch(`https://startup.15minutes.click/api/activity`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token, 
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch activities: ${response.statusText} (Status: ${response.status})`
    );
  }

  return response.json();
}

export async function completeActivity(activity) {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch(`https://startup.15minutes.click/api/activity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token, 
      },
      body: JSON.stringify(activity),
    });

    if (!response.ok) {
      throw new Error(`Failed to complete activity: ${response.statusText} (Status: ${response.status})`);
    }

    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Expected JSON response but received a non-JSON response');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in completeActivity:', error);
    throw error; 
  }
}
