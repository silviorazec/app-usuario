import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';

interface ProtectedRouteProps {
    element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { keycloak, initialized } = useKeycloak();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (initialized && !keycloak.authenticated && !isRedirecting) {
            console.log('User not authenticated. Redirecting to login...');
            setIsRedirecting(true);

            keycloak
                .login()
                .catch((error) => {
                    console.error('Error during login:', error);
                    setIsRedirecting(false); // Reset redirection state if login fails
                });
        }
    }, [initialized, keycloak, isRedirecting]);

    // 1. Verifica se o Keycloak está inicializando
    if (!initialized) {
        console.log('Waiting for Keycloak initialization...');
        return <div>Loading Keycloak...</div>;
    }

    // 2. Verifica se está redirecionando
    if (isRedirecting) {
        console.log('Redirection in progress...');
        return <div>Redirecionando para a tela de autenticação...</div>;
    }

    // 3. Verifica se o usuário está autenticado após redirecionamento
    if (!keycloak.authenticated) {
        console.log('User not authenticated after redirection.');
        return null; // Não renderiza nada até a autenticação estar completa
    }

    return element;
};

export default ProtectedRoute;
