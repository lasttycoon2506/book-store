import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import PhoneIcon from '@mui/icons-material/Phone'
import DraftsIcon from '@mui/icons-material/Drafts'
import FaceIcon from '@mui/icons-material/Face'
import ListItemText from '@mui/material/ListItemText'
import { fetchUserAttributes } from 'aws-amplify/auth'

export default function Profile() {
    const [name, setName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [phone, setPhone] = useState<string>()

    async function getUserAttributes(): Promise<void> {
        const userAttributes = await fetchUserAttributes()
        setName(userAttributes.name!)
        setEmail(userAttributes.email!)
        setPhone(userAttributes.phone_number!)
    }

    useEffect(() => {
        getUserAttributes()
    }, [name, email, phone])

    return (
        <div>
            <Box display="flex" alignItems="center" justifyContent="center">
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <FaceIcon />
                        </ListItemIcon>
                        <ListItemText primary={name} />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            <PhoneIcon />
                        </ListItemIcon>
                        <ListItemText primary={phone} />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary={email} />
                    </ListItem>
                </List>
            </Box>
        </div>
    )
}
