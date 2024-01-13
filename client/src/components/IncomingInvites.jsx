// IncomingInvites.jsx
import React, { useState, useEffect } from 'react';
import { fetchInvites, fetchAcceptInvite, fetchDeclineInvite } from '../services/inviteService';
import { fetchUserData } from '../services/authService';
import '../styles/component-style/IncomingInvites.css';

function IncomingInvites() {
    const [invites, setInvites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const userData = await fetchUserData();
            setCurrentUser(userData);

            const allInvites = await fetchInvites();
            // Filtrujeme pouze pozvánky se stavem 'PENDING' a pro aktuálního uživatele
            const userInvites = allInvites.filter(invite => 
                invite.userId === userData.id && invite.state === 'PENDING'
            );
            console.log('Pozvánky:', userInvites);
            setInvites(userInvites);
        } catch (error) {
            console.error('Chyba při načítání dat:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (inviteId, action) => {
        try {
            if (action === 'accept') {
                await fetchAcceptInvite(inviteId);
            } else {
                await fetchDeclineInvite(inviteId);
            }
            // Odebíráme pozvánku z lokálního stavu
            setInvites(prevInvites => prevInvites.filter(invite => invite.id !== inviteId));
        } catch (error) {
            console.error(`Chyba při ${action === 'accept' ? 'přijímání' : 'odmítání'} pozvánky:`, error);
        }
    };

    if (loading) {
        return <p>Načítání pozvánek...</p>;
    }

    if (!currentUser) {
        return <p>Chyba při načítání údajů uživatele.</p>;
    }

    return (
        <div className="incoming-invites-container">
            <h3 className="incoming-invites-header">Příchozí pozvánky</h3>
            {invites.length > 0 ? (
                <ul>
                    {invites.map(invite => (
                        <li key={invite.id}>
                            Máte pozvánku od týmu: {invite.team.name}
                            <button onClick={() => handleAction(invite.id, 'accept')} style={{ marginLeft: '10px' }}>
                                Přijmout
                            </button>
                            <button onClick={() => handleAction(invite.id, 'decline')} style={{ marginLeft: '10px' }}>
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
