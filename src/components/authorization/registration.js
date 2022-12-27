import React, {useState} from 'react';
import './auth.css'
import {userService} from '../../services';

export const Registration = () => {
    const [error, setError] = useState('');

    const handleRegistration = async (e) => {
        setError(null);
        e.preventDefault();
        if (e.target[1].value === e.target[2].value) {
            const email = e.target[0].value;
            const password = e.target[1].value;
            const response = await userService.register({email, password});
            if (!response || response.error) {
                console.log(response.error);
                if (response.error.email) {
                    setError(response.error.email);
                } else {
                    setError('Wrong password or user name...');
                }
            } else {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                window.location.href = '/';
            }
        } else {
            setError("Passwords doesn't match");
        }
    };

    return (<div className={'authFormSection'}>
        <h3 style={{marginBottom: 24}}>Create Account</h3>
        <div>
            <form action="src/components/authorization/registration" method="POST" onSubmit={handleRegistration}>
                <span>Enter your email</span>
                <div style={{padding: '0 20px'}}>
                    <input
                        type="email"
                        name="email"
                        required
                        minLength={6}
                        maxLength={24}
                        style={{paddingLeft: 10, background: '#222'}}
                    />
                </div>
                <span>Enter your password</span>
                <div style={{padding: '0 20px'}}>
                    <input
                        type="password"
                        name="password"
                        required
                        minLength={8}
                        maxLength={24}
                        style={{paddingLeft: 10, background: '#222'}}
                    />
                </div>
                <span>Repeat your password</span>
                <div style={{padding: '0 20px'}}>
                    <input
                        type="password"
                        name="password"
                        required
                        minLength={8}
                        maxLength={24}
                        style={{paddingLeft: 10, background: '#222'}}
                    />
                </div>
                <div style={{padding: '0 20px'}} className={'checkbox'}>
                    <label className={'checkbox'}>
                        <input
                            type="checkbox"
                            name="acknowledge"
                            id="acknowledge"
                            required
                        />
                        I acknowledge the Terms and Conditions
                    </label>
                </div>
                <p>{error}</p>
                <div style={{padding: '0 14px'}}>
                    <button type="submit">Create account</button>
                </div>
            </form>
        </div>
    </div>);
};
