import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { Usuario, cursos } from '../db/db';

const DetalhesContainer = styled.div`
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    background-color: #ffffff;
`;

const DetalhesTitle = styled.h2`
    color: #007bff;
`;

const DetalhesDescricao = styled.p`
    color: #6c757d;
`;

const VideoContainer = styled.div`
    margin: 20px 0;
    position: relative;
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
`;

const Video = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const Button = styled.button`
    padding: 10px;
    background-color: #28a745;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    margin: 10px;

    &:hover {
        background-color: #218838;
    }
`;

const CursoDetalhe: React.FC<{ usuario: Usuario | null }> = ({ usuario }) => {
    const { id } = useParams<{ id: string }>();
    const curso = cursos.find(curso => curso.id === Number(id));

    const [moduloIndex, setModuloIndex] = useState(0);
    const [moduloAssistido, setModuloAssistido] = useState(false);

    if (!curso) {
        return <div>Curso não encontrado.</div>;
    }

    const modulo = curso.modulos[moduloIndex];
    const ultimoModulo = moduloIndex === curso.modulos.length - 1;

    useEffect(() => {
        if (usuario && modulo && modulo.visualizacao[usuario.id]) {
            setModuloAssistido(true);
        } else {
            setModuloAssistido(false);
        }
    }, [usuario, modulo]);

    const handleAssistido = () => {
        if (usuario && modulo) {
            modulo.visualizacao[usuario.id] = true;
            setModuloAssistido(true);
            console.log('Módulo marcado como assistido');
        } else {
            console.log('Usuário não está logado ou módulo não encontrado');
        }
    };

    const handleProximoModulo = () => {
        if (moduloAssistido && moduloIndex < curso.modulos.length - 1) {
            setModuloIndex(prevIndex => prevIndex + 1);
            console.log('Próximo módulo carregado');
        }
    };

    // const handleAssistido = () => {
    //     if (usuario) {
            
    //         if (modulo) {
    //             modulo.visualizacao[usuario.id] = true;
    //             console.log('Módulo marcado como assistido');
    //         } else {
    //             console.log('Módulo não encontrado');
    //         }
    //     } else {
    //         console.log('Usuário não está logado');
    //     }
    // };

    // const handleProximoModulo = () => {
    //     if (modulo && usuario) {
    //         modulo.visualizacao[usuario.id] = true;
    //         setModuloIndex(prevIndex => Math.min(prevIndex + 1, curso.modulos.length - 1));
    //         console.log('Próximo módulo carregado');
    //     }
    // };

    // const todosModulosConcluidos = curso.modulos.every(modulo => modulo.visualizacao);

    return (
        <DetalhesContainer>
            <DetalhesTitle>{curso.titulo}</DetalhesTitle>
            <DetalhesDescricao>{curso.descricao}</DetalhesDescricao>
            <p>{modulo.titulo}</p>
            <p>{modulo.descricao}</p>
            <VideoContainer>
                <Video 
                    width="800" 
                    height="800" 
                    src={modulo.videoUrl} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                ></Video>
            </VideoContainer>
            {usuario && (
                <div>
                    <Button onClick={() => handleAssistido()}>
                        Marcar como Assistido
                    </Button>
                    {ultimoModulo && moduloAssistido && curso.quiz === undefined &&(
                        <Button>
                            <Link style={{color: 'white'}} to={`/certificado/${curso.id}`}>Emitir Certificado</Link>
                        </Button>
                    )}
                    
                    
                    {modulo.visualizacao[usuario.id] && moduloIndex < curso.modulos.length - 1 && (
                        <Button onClick={handleProximoModulo}>
                            Próximo Módulo
                        </Button>
                    )}

                    {ultimoModulo && moduloAssistido && curso.quiz !== undefined && (
                        <div>
                            <h3>Parabéns! Você concluiu todos os módulos.</h3>
                            <Link to={`/curso/${curso.id}/quiz`}>Iniciar Quiz</Link>
                        </div>
                    )}  
                </div>
            )}
        </DetalhesContainer>
    );
};

export default CursoDetalhe;
