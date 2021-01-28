import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import { IActivity } from '../models/Activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
   const [activities, setActivities] = useState<IActivity[]>([]);
   const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
   const [editMode, setEditMode] = useState(false);

   const handleSelectActivity = (id: string) => {
     setSelectedActivity(activities.filter(a => a.id === id)[0]);
     setEditMode(false);
   }

   const handleOpenCreateForm = () => {
     setSelectedActivity(null);
     setEditMode(true);
   }

   const handleCreateActivity = (activity: IActivity) => {
     setActivities([...activities, activity]);
     setSelectedActivity(activity);
     setEditMode(false);
   }

   const handleEditActivity = (activity: IActivity) => {
     setActivities([...activities.filter(a => a.id !== activity.id), activity]);
     setSelectedActivity(activity);
     setEditMode(false);
   }

   const handleDeleteActivity = (id: string) => {
     setActivities([...activities.filter(a => a.id !== id)]);
   }

  useEffect(() => {
    axios.get<IActivity[]>("http://localhost:5000/api/activities").then(response => {
      let activities: IActivity[] = [];
      response.data.forEach(a => {
        a.date = a.date.split('.')[0];
        activities.push(a);
      });
      setActivities(activities)})
    }, []);

    return (
      <Fragment>
          <NavBar openCreateForm={handleOpenCreateForm} />
          
          <Container style={{marginTop: '7em'}}> 
            <ActivityDashboard 
              activities={activities} 
              selectActivity={handleSelectActivity} 
              selectedActivity={selectedActivity}
              setSelectedActivity={setSelectedActivity}
              editMode={editMode}
              setEditMode={setEditMode}
              createActivity={handleCreateActivity}
              editActivity={handleEditActivity}
              deleteActivity={handleDeleteActivity} />
          </Container>
      </Fragment>
    );
}

export default App;