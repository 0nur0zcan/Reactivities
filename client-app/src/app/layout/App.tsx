import React, {Fragment, SyntheticEvent, useEffect, useState} from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
   const [activities, setActivities] = useState<IActivity[]>([]);
   const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
   const [editMode, setEditMode] = useState(false);
   const [loading, setLoading] = useState(true);
   const [submitting, setSubmitting] = useState(false);
   const [target, setTarget] = useState('');

   const handleSelectActivity = (id: string) => {
     setSelectedActivity(activities.filter(a => a.id === id)[0]);
     setEditMode(false);
   }

   const handleOpenCreateForm = () => {
     setSelectedActivity(null);
     setEditMode(true);
   }

   const handleCreateActivity = (event: SyntheticEvent<HTMLFormElement>, activity: IActivity) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
     agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
     }).then(() => setSubmitting(false));
   }

   const handleEditActivity = (event: SyntheticEvent<HTMLFormElement>, activity: IActivity) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
   }

   const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
      if (selectedActivity && selectedActivity.id === id)
        setSelectedActivity(null);
    }).then(() => setSubmitting(false));
   }

  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        let activities: IActivity[] = [];
        response.forEach(a => {
          a.date = a.date.split('.')[0];
          activities.push(a);
        });
        setActivities(activities)
      }).then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content='Loading activities...' />

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
              deleteActivity={handleDeleteActivity}
              submitting={submitting}
              target={target} />
        </Container>
    </Fragment>
  );
}

export default App;
