import React, { SyntheticEvent } from 'react'
import { Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
    setSelectedActivity: (activity: IActivity | null) => void;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    createActivity: (e: SyntheticEvent<HTMLFormElement>, activity: IActivity) => void;
    editActivity: (e: SyntheticEvent<HTMLFormElement>, activity: IActivity) => void;
    deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string;
}

const ActivityDashboard: React.FC<IProps> = ({activities, selectActivity, selectedActivity, setSelectedActivity, 
                                              editMode, setEditMode, createActivity, editActivity, deleteActivity, submitting, target}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} 
                              submitting={submitting} target={target} />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && 
                    <ActivityDetails activity={selectedActivity} setSelectedActivity={setSelectedActivity} setEditMode={setEditMode} />}
                {editMode && 
                    <ActivityForm key={selectedActivity && selectedActivity.id || 0} activity={selectedActivity!} setEditMode={setEditMode}
                                  createActivity={createActivity} editActivity={editActivity} submitting={submitting} target={target} />}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard
