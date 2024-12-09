import React, { useEffect, useState } from 'react';
import { logCompletedActivity, fetchCompletedActivities } from './activities';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const token = localStorage.getItem('authToken'); 

  useEffect(() => {
    if (token) {
      fetchCompletedActivities(token).then(setActivities);
    }
  }, [token]);

  const handleLogActivity = async (activity) => {
    if (token) {
      await logCompletedActivity(token, activity);
      const updatedActivities = await fetchCompletedActivities(token);
      setActivities(updatedActivities);
    }
  };

  return (
    <div>
      <h1>Completed Activities</h1>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            {activity.activity} - {new Date(activity.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
      <button onClick={() => handleLogActivity('Juggling')}>Log "Juggling"</button>
      <button onClick={() => handleLogActivity('Chess')}>Log "Chess"</button>
    </div>
  );
};

export default Activities;
