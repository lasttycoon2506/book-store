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
import CircularProgress from '@mui/material/CircularProgress'

export default function Profile() {
    const [name, setName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [phone, setPhone] = useState<string>()
    const [loading, setLoading] = useState<boolean>(true)

    async function getUserAttributes(): Promise<void> {
        try {
            const userAttributes = await fetchUserAttributes()
            setName(userAttributes.name!)
            setEmail(userAttributes.email!)
            setPhone(formatPhone(userAttributes.phone_number!))
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    function formatPhone(phone: string): string {
        //amz returns phone w/ + prefixed
        const phoneRemovedPlus = phone.slice(1)
        const phoneFormatted =
            '(' +
            phoneRemovedPlus.slice(0, 3) +
            ') ' +
            phoneRemovedPlus.slice(3, 6) +
            '-' +
            phoneRemovedPlus.slice(6)
        return phoneFormatted
    }

    useEffect(() => {
        getUserAttributes()
    }, [name, email, phone])

    function renderProfile(): JSX.Element {
        if (loading) {
            return <CircularProgress />
        }
        return (
            <div>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <List className="profile">
                        <br />
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <FaceIcon />
                            </ListItemIcon>
                            <ListItemText primary={name} />
                        </ListItem>
                        <br />
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <PhoneIcon />
                            </ListItemIcon>
                            <ListItemText primary={phone} />
                        </ListItem>
                        <br />
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
    return renderProfile()
}
