import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Certificado, certificados, cursos } from '../db/db';

const QuizContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
`;

const QuestionContainer = styled.div`
    margin-bottom: 20px;
`;

const QuestionTitle = styled.h3`
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #555;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-size: 1rem;
    color: #444;
    cursor: pointer;
    
    input {
        margin-right: 10px;
    }
`;

const Button = styled.button`
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background-color: #0056b3;
    }
`;

const Result = styled.div`
    margin-top: 20px;
    font-size: 1.2rem;
    color: #333;
    text-align: center;
`;

const quizzesRealizados: { [usuarioId: number]: { [cursoId: number]: boolean } } = {
    1: { 1: true }, // Exemplo: Usuário 1 já fez o quiz do curso 1
};

const Quiz: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const cursoId = Number(id?.replace(':', ''));
    const curso = cursos.find(c => c.id === cursoId);
    const [respostas, setRespostas] = useState<number[]>([]);
    const [resultado, setResultado] = useState<number | null>(null);
    const [quizConcluido, setQuizConcluido] = useState<boolean>(false);
    const usuarioId = 1; // ID do usuário logado (este ID pode ser obtido da autenticação)

    useEffect(() => {
        if (quizzesRealizados[usuarioId]?.[cursoId]) {
            setQuizConcluido(true);
        }
    }, [usuarioId, cursoId]);

    if (!curso) return <QuizContainer>Curso não encontrado</QuizContainer>;
    if (!curso.quiz) return <QuizContainer>Quiz não disponível para este curso</QuizContainer>;
    if (quizConcluido) return <QuizContainer>Você já completou este quiz.</QuizContainer>;

    const handleResposta = (perguntaIndex: number, alternativaIndex: number) => {
        const novasRespostas = [...respostas];
        novasRespostas[perguntaIndex] = alternativaIndex;
        setRespostas(novasRespostas);
    };

    const calcularResultado = () => {
        
        if(curso.quiz){
            const corretas = curso.quiz.perguntas.reduce((acc, pergunta, index) => {
                return acc + (respostas[index] === pergunta.respostaCorreta ? 1 : 0);
            }, 0);
            const percentual = (corretas / curso.quiz.perguntas.length) * 100;

            setResultado(corretas);

            curso.quiz.pontuacao = percentual

            if (percentual > 70) {
                emitirCertificado(usuarioId, cursoId);
            }
        }
        

        // Marcar o quiz como concluído para este usuário e curso
        if (!quizzesRealizados[usuarioId]) {
            quizzesRealizados[usuarioId] = {};
        }
        quizzesRealizados[usuarioId][cursoId] = true;
    };

    const emitirCertificado = (usuarioId: number, cursoId: number) => {
        const novoCertificado: Certificado = {
            id: certificados.length + 1,
            usuarioId,
            cursoId,
            dataEmissao: new Date().toISOString().split('T')[0],
        };
        certificados.push(novoCertificado);
    };

    return (
        <QuizContainer>
            <Title>Quiz: {curso.titulo}</Title>
            {curso.quiz.perguntas.map((pergunta, index) => (
                <QuestionContainer key={index}>
                    <QuestionTitle>{pergunta.pergunta}</QuestionTitle>
                    {pergunta.alternativas.map((alternativa, altIndex) => (
                        <Label key={altIndex}>
                            <input
                                type="radio"
                                name={`pergunta-${index}`}
                                value={altIndex}
                                onChange={() => handleResposta(index, altIndex)}
                            />
                            {alternativa}
                        </Label>
                    ))}
                </QuestionContainer>
            ))}
            <Button onClick={calcularResultado}>Enviar Respostas</Button>
            {resultado !== null && (
                <Result>
                    <h2>Você acertou {resultado} de {curso.quiz.perguntas.length} perguntas.</h2>
                </Result>
            )}
        </QuizContainer>
    );
};

export default Quiz;