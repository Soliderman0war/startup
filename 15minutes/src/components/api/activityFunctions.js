export async function logCompletedActivity(token, activity) {
    try {
      const response = await fetch('/api/activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, activity }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        console.error('Error logging activity:', error.msg);
      } else {
        console.log('Activity logged successfully!');
      }
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }
  
  export async function fetchCompletedActivities(token) {
    try {
      const response = await fetch(`/api/activities?token=${encodeURIComponent(token)}`);
  
      if (!response.ok) {
        const error = await response.json();
        console.error('Error fetching activities:', error.msg);
        return [];
      }
  
      const activities = await response.json();
      console.log('Retrieved activities:', activities);
      return activities;
    } catch (error) {
      console.error('Error fetching activities:', error);
      return [];
    }
  }
  