import React from 'react';
import styled from 'styled-components';
import { Usuario, cursos } from '../db/db';
import { Link } from 'react-router-dom';

const AreaContainer = styled.div`
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    background-color: #ffffff;
`;

const CourseList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const CourseItem = styled.li`
    padding: 10px;
    border-bottom: 1px solid #dee2e6;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:last-child {
        border-bottom: none;
    }
`;

const Button = styled.button`
    padding: 10px;
    background-color: #28a745;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    margin: 0px 5px;

    &:hover {
        background-color: #218838;
    }
`;

const AreaAluno: React.FC<{ usuario: Usuario | null }> = ({ usuario }) => {
    if (!usuario) {
        return <div>Você precisa estar logado para acessar esta área.</div>;
    }

    return (
        <AreaContainer>
            <h2>Área do Aluno</h2>
            <h3>Cursos Matriculados</h3>
            <CourseList>
                {cursos.map((curso) => {
                    const modulosAssistidos = curso.modulos.filter(
                        (modulo) => modulo.visualizacao[usuario.id]
                    ).length;
                    const totalModulos = curso.modulos.length;
                    const porcentagemConcluida = (modulosAssistidos / totalModulos) * 100;
                    const pontuacaoQuiz = curso.quiz?.pontuacao
                    

                    return (
                        porcentagemConcluida > 0 ? (
                            <CourseItem key={curso.id}>
                                {curso.titulo}
                               
                                <div style={{margin: '5px'}}>
                                {(porcentagemConcluida === 100 && ((pontuacaoQuiz !== undefined && pontuacaoQuiz > 70) || curso.quiz === undefined)) && (
                                    <Button>
                                        <Link style={{ color: 'white' }} to={`/certificado/${curso.id}`}>Emitir Certificado</Link>
                                    </Button>
                                )}

                                    <span>
                                        {porcentagemConcluida === 100
                                            ? ' (Curso Concluído)'
                                            : ` (${porcentagemConcluida.toFixed(0)}% Concluído)`}
                                    </span>
                                </div>
                            </CourseItem>
                            
                         
                        ) : (
                            <p></p>
                        )
                    );
                })}
            </CourseList>
        </AreaContainer>
    );
};

export default AreaAluno;
