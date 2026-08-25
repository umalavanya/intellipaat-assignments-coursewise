import React, {useState} from 'react' ;
import {LogIn, mail, Lock, AlertCircle, Info} from 'lucide-react' ;


export default function Login({onLoginSuccess, navigateToSignup, infoMessage}) {
    const [email, setEmail] = useState('') ;
    const [password, setPassword] = useState('') ;
    const [error, setError] = useState('') ;
    const [loading, setLoading] = useState(false) ;

    
}