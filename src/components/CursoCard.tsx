import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface CursoCardProps {
    curso: {
        id: number;
        titulo: string;
        descricao: string;
        image: string;
        obg: boolean;
    };
}

const Card = styled.div`
    border: 1px solid #dee2e6;
    border-radius: 5px;
    padding: 15px;
    width: 500px;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
    color: #343a40;
    margin-bottom: 10px;
`;

const Description = styled.p`
    color: #6c757d;
    margin-bottom: 15px;
    min-height: 200px
`;

const DetailLink = styled(Link)`
    color: #007bff;
    text-decoration: none;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
`;

const Image = styled.img`
    width: 500px;
    min-height: 350px
`

const CursoCard: React.FC<CursoCardProps> = ({ curso }) => {
    return (
        <Card>
            {curso.obg ? (
                <Title>{curso.titulo} (treinamento obrigatório)</Title>
            ) : (
                <Title>{curso.titulo}</Title>
            )}
            <Image src={curso.image}/>
            <Description>{curso.descricao}</Description>
            <DetailLink to={`/curso/${curso.id}`}>Ver Detalhes</DetailLink>
        </Card>
    );
};

export default CursoCard;
