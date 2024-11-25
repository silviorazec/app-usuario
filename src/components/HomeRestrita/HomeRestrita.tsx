import React, { useCallback, useEffect, useState } from 'react';
import type { TUserInfo } from '../../types/TUserInfo';
import { useKeycloak } from '@react-keycloak/web';
import factApi from '../../api/FactApi';
import { Sentence } from '../../types/Sentence';


const HomeRestrita: React.FC = () => {
    
    const { keycloak, initialized } = useKeycloak(); 
    const [userInfo, setUserInfo] = useState<string | null>(null);
    const [sentence, setSentence] = useState<Sentence | null>(null);

    // Busca informações do usuário e grava no estado userInfo
    const fetchUserInfo = useCallback(async () => {
        if (initialized && keycloak.authenticated) {
            const { name } = (await keycloak.loadUserInfo()) as TUserInfo;
            setUserInfo(name || 'Usuário Desconhecido');
        }
    }, [initialized, keycloak]);

    // UseEffect para carregar informações do usuário
    useEffect(() => {
        fetchUserInfo();

        const fetchFact = async () => {
            try {
                const response = await factApi.getFact();
                setSentence( response.data);
    
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
        };
    
        fetchFact();

    }, [fetchUserInfo]);

    // Desloga o usuário
    const handleLogout = () => {
        try {
            keycloak.logout();
        } catch (e) {
            console.error('Erro ao deslogar:', e);
        }
    };


    return (
        <div >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>Seja bem-vindo {userInfo}</h1>
                
                <button style={{ cursor: 'pointer', height:20 }} onClick={handleLogout}>
                   Sair
                </button>
            </div>

            <br/>
            Frase: {sentence?.fact || "carregando frase..."}
            
        </div>

    );
};

export default HomeRestrita;
