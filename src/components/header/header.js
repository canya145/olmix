import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './header.css';

export const Header = () => {
    const [state, setState] = useState(true);
    const [email, setEmail] = useState(null);

    const dateFromLocal = localStorage.getItem('token');
    const userFromLocal = localStorage.getItem('user');

    const history = useHistory();


    const handleLogOut = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    useEffect(() => {
        if (dateFromLocal) {
            setState(false);
            const user = JSON.parse(userFromLocal);
            setEmail(user.email);
        }
    }, [dateFromLocal]);

    return (
        <div className={'headerSection'}>
            <div className={'logo'}>
                <div
                    onClick={() => history.push('/')}
                    className="d-flex align-items-center ml-3 cursor-pointer">
                    <h3 style={{marginRight: 20}}>
                        OLmiX
                    </h3>
                </div>
            </div>
            <div className="d-flex" style={{flex: 1}}></div>
            <div className={'auth'}>
                {state ? (
                    <div className={'auth'}>
                        <h3 style={{marginRight: 20}}>
                            <Link to={'/registration'}>Registration</Link>
                        </h3>
                        <h3 style={{marginRight: 20}}>
                            <Link to={'/login'}>Login</Link>
                        </h3>
                    </div>
                ) : (
                    <div className="d-flex" style={{marginRight: 32}}>
                        <h3 style={{marginRight: 20}}>
                            Hello {email}
                        </h3>
                        <div className={'logout'}>
                            <button onClick={handleLogOut}>Log out</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
