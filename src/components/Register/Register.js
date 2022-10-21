import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css'

const Register = () => {
    return (
        <div>
            <div className='form-container'>
                <h2 className='form-title'>Sign Up</h2>
                <form>
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' required />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' required />
                    </div>
                    <div className="form-control">
                        <label htmlFor="confirm">Confirm Password</label>
                        <input type="password" name='confirm' required />
                    </div>
                    <input type="submit" className='btn-submit' value="Sign Up" />
                </form>
                <p>Already Have An Account<Link to='/login'>Log In</Link></p>
            </div>
        </div>
    );
};

export default Register;