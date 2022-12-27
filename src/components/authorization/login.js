import React, {useState} from 'react';
import './auth.css'
import {userService} from '../../services';

export const Login = () => {
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        setError(null);
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const response = await userService.login({email, password});
        if (!response || response.error) {
            setError('Error, wrong password or user name...');
        } else {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            window.location.href = '/';
        }
    };

    return (
        <div className={'authFormSection'}>
            <h3 style={{marginBottom: 24}}>Sign in</h3>
            <div>
                <form action="src/components/authorization/login" method="POST" onSubmit={handleLogin}>
                    <span>Enter your email</span>
                    <div style={{padding: '0 20px'}}>
                        <input
                            type="email"
                            name="email"
                            required
                            style={{paddingLeft: 10, background: '#222'}}
                        />
                    </div>
                    <span>Enter your password</span>
                    <div style={{padding: '0 20px'}}>
                        <input
                            type="password"
                            name="passwordUser"
                            required
                            style={{paddingLeft: 10, background: '#222'}}
                        />
                    </div>
                    <p>{error}</p>
                    <div style={{padding: '0 14px'}}>
                        <button type="submit">Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
