import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useStateContext } from '../context/ContextWrapper';

//pass the user to sanity
//store the user profile to context
export const createUser = async (user) => {
    // Google will return a 'credentail' property as JWT
    // decode the JWT can get the user profile

    let response = await axios.post('/api/auth', user);
    return response.data;
}