import { useNavigate } from "react-router-dom";
import { auth } from '../../Firebase/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
       
        if (!email || !password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in:' );
            localStorage.setItem('user', "true");
            navigate('/dashboard'); // Navigate to dashboard after successful login
            window.location.reload();
        } catch (error) {
            console.error('Login error:', error);
            switch (error.code) {
                case 'auth/invalid-email':
                    setError('Invalid email address');
                    break;
                case 'auth/user-disabled':
                    setError('This account has been disabled');
                    break;
                case 'auth/user-not-found':
                    setError('No account found with this email');
                    break;
                case 'auth/wrong-password':
                    setError('Incorrect password');
                    break;
                default:
                    setError('Failed to login. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }
    
    return ( <>
        <div className="lgoin flex justify-center ">
            <form className="flex flex-col p-10 mt-[8rem] backdrop-blur-lg bg-black/40 rounded-xl" onSubmit={onSubmit}>
                <h1 className="text-3xl text-center mb-7 font-bold text-green-300">
                <i className="fa-solid fa-lock mr-3"></i>LOGIN
                </h1>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <input 
                    className="mb-7 text-lg bg-zinc-600 rounded-lg p-2 text-white font-semibold outline-none" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input 
                    className="mb-7 text-lg bg-zinc-600 rounded-lg p-2 text-white font-semibold outline-none" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button 
                    className={`${loading ? 'bg-pink-300' : 'bg-pink-400'} text-lg rounded-lg p-2 font-semibold`} 
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    </>)
}

export default Login;