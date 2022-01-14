import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

function Profile() {
    const auth = getAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(auth.currentUser);
    }, [])
    return user ? <h1>{user.displayName}</h1> : 'You must be logged in to view your profile'
    
}

export default Profile