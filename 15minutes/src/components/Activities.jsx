import React, { useState, useEffect } from "react";
import { getActivities, completeActivity } from "../api/activity"

const Activities = () => {
  const [activities, setActivities] = useState([]); 
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activitiesList = await getActivities();
        // console.log("Fetched Activities: ", activitiesList);
        setActivities(activitiesList);
      } catch (err) {
        console.error("Error fetching activities: ", err);
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

  console.log(activities);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {activities.length > 0 ? (
        <ul>
          {activities.map((activity, index) => (
            <li key={index}>{activity.activity}</li>
          ))}
        </ul>
      ) : (
        <p>No activities logged yet.</p>
      )}
    </div>
  );
};

export default Activities;
