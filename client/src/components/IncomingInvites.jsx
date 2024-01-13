// IncomingInvites.jsx
import React, { useState, useEffect } from 'react';
import { fetchInvites, fetchAcceptInvite, fetchDeclineInvite } from '../services/inviteService';
import { fetchUserData } from '../services/authService';

function IncomingInvites() {
    const [invites, setInvites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            try {
                const userData = await fetchUserData();
                setCurrentUser(userData);

                const allInvites = await fetchInvites();
                const userInvites = allInvites.filter(invite => invite.userId === userData.id);
                console.log('Pozvánky uživatele:', userInvites);
                setInvites(userInvites);
            } catch (error) {
                console.error('Chyba při načítání dat:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleAcceptInvite = async (inviteId) => {
        try {
            await fetchAcceptInvite(inviteId);
        } catch (error) {
            console.error('Chyba při přijímání pozvánky:', error);
        }
    };

    const handleDeclineInvite = async (inviteId) => {
        try {
            await fetchDeclineInvite(inviteId);
        } catch (error) {
            console.error('Chyba při odmítání pozvánky:', error);
        }
    };

    if (loading) {
        return <p>Načítání pozvánek...</p>;
    }

    if (!currentUser) {
        return <p>Chyba při načítání údajů uživatele.</p>;
    }

    return (
        <div>
            <h3>Příchozí pozvánky</h3>
            {invites.length > 0 ? (
                <ul>
                    {invites.map(invite => (
                        <li key={invite.id}>
                            Máte pozvánku od týmu: {invite.team.name}
                            <button onClick={() => handleAcceptInvite(invite.id)} style={{ marginLeft: '10px' }}>
                                Přijmout
                            </button>
                            <button onClick={() => handleDeclineInvite(invite.id)} style={{ marginLeft: '10px' }}>
                                Odmítnout
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Žádné nové pozvánky.</p>
            )}
        </div>
    );
}

export default IncomingInvites;
