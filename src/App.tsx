import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';


const keycloakUrl = process.env.REACT_APP_KEYCLOAK_URL;

if (!keycloakUrl) {
  throw new Error('A variável de ambiente REACT_APP_KEYCLOAK_URL não está definida.');
}


const keycloak = new Keycloak({
    url: keycloakUrl,
    realm: 'ans',
    clientId: 'usuario-spa',
});

const initOptions = {
  onLoad: 'check-sso'
};

const App: React.FC = () => {
    return (
        <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions} >
            <AppRoutes />
        </ReactKeycloakProvider>
    );
};

export default App;
