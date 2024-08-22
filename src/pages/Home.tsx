import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Usuario } from '../db/db';

const HomeContainer = styled.div`
    text-align: center;
    margin-top: 50px;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    color: #007bff;
`;

const StartLink = styled(Link)`
    font-size: 1.25rem;
    color: #ffffff;
    background-color: #007bff;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;

    &:hover {
        background-color: #0056b3;
    }
`;

const Home: React.FC<{usuario: Usuario | null}> = ({usuario}) => {
    return (
        <HomeContainer>
            {usuario ? (
                <Title>Bem-vindo à GrowthHub, {usuario.nome}</Title>
            ) : (
                <Title>Bem-vindo à GrowthHub</Title>
            )}
            <StartLink to="/cursos">Ver Cursos</StartLink>
        </HomeContainer>
    );
};

export default Home;
