import React from 'react'
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/Activity'

interface IProps {
    activity: IActivity;
    setSelectedActivity: (activity: IActivity | null) => void;
    setEditMode: (editMode: boolean) => void;
}

const ActivityDetails: React.FC<IProps> = ({activity, setEditMode, setSelectedActivity}) => {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths={2}>
                    <Button onClick={() => setEditMode(true)} basic color='blue' content='Edit' />
                    <Button onClick={() => setSelectedActivity(null)} basic color='grey' content='Cancel' />
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
}

export default ActivityDetails
