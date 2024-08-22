import React from 'react';
import styled from 'styled-components';
import CursoCard from '../components/CursoCard';
import { cursos } from '../db/db';

const CursosContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 20px;
    margin-top: 30px;
`;

const Cursos: React.FC = () => {
    return (
        <div>
            <h2>Cursos Disponíveis</h2>
            <CursosContainer>
                {cursos.map((curso) => (
                    <CursoCard key={curso.id} curso={curso} />
                ))}
            </CursosContainer>
        </div>
    );
};

export default Cursos;
