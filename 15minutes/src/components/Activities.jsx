import React, { useState, useEffect } from 'react';
import { getActivities, completeActivity } from '../api/activity';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activitiesList = await getActivities();
        setActivities(activitiesList);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchActivities();
  }, []);

  const handleComplete = async (activity) => {
    try {
      const updatedActivities = await completeActivity(activity);
      setActivities(updatedActivities);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            {activity.name}{' '}
            <button onClick={() => handleComplete(activity)}>Complete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Activities;
