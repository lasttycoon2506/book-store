import { useEffect, useState } from 'react'
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
import { Authentication } from '../services/Authentication'

type profileProps = {
    authentication: Authentication
}

export default function Profile({ authentication }: profileProps) {
    const [name, setName] = useState<string>(
        authentication.getUserProfile().name
    )
    const [email, setEmail] = useState<string>(
        authentication.getUserProfile().email
    )
    const [phone, setPhone] = useState<string>(
        authentication.getUserProfile().phone
    )

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
