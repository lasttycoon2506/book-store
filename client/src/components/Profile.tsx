import { useState } from 'react'
import { User } from '../models/User'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import PhoneIcon from '@mui/icons-material/Phone'
import DraftsIcon from '@mui/icons-material/Drafts'
import FaceIcon from '@mui/icons-material/Face'
import ListItemText from '@mui/material/ListItemText'

type profileProps = {
    userProfile: User
}

export default function Profile({userProfile}: profileProps) {
    const [name, setName] = useState(userProfile.name)
    const [email, setEmail] = useState(userProfile.email)
    const [phone, setPhone] = useState(userProfile.phone)

    return (
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
    )
}
