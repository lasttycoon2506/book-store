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

export default function Profile(userProfile: profileProps) {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()

    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            <List>
                <ListItem disablePadding>
                    <ListItemIcon>
                        <FaceIcon />
                    </ListItemIcon>
                    <ListItemText primary="Name" />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemIcon>
                        <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Phone" />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Email" />
                </ListItem>
            </List>
        </Box>
    )
}
