import store from './index';
import axios from "axios";

// export const setupStoreSubscriber = (router) => {
//     store.subscribe((mutation) => {
//         switch (mutation.type) {
//             case 'Auth/SET_TOKEN':
//                 if (mutation.payload !== 'token_black_listed' && mutation.payload) {
//                     axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
//                     localStorage.setItem('token', mutation.payload);
//                 } else if (mutation.payload === 'token_black_listed') {
//                     axios.defaults.headers.common['Authorization'] = null;
//                     localStorage.removeItem('token');
//                 } else {
//                   router.replace('/');
//                 }
//                 break;
//         }
//     });
// };

store.subscribe((mutation) => {
    switch (mutation.type) {
        case 'Auth/SET_TOKEN':
            if (mutation.payload) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
                localStorage.setItem('token', mutation.payload);
            } else {
                axios.defaults.headers.common['Authorization'] = null;
                localStorage.removeItem('token');
            }
            break;
    }
})