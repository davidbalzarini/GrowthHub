import React from 'react';
import styled from 'styled-components';
import { Usuario, cursos, usuarios } from '../db/db';

const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

const Title = styled.h2`
    color: #333;
    margin-bottom: 20px;
`;

const RankingList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const RankingItem = styled.li<{ position: number }>`
    background-color: ${({ position }) =>
        position === 0 ? '#ffd700' : position === 1 ? '#c0c0c0' : position === 2 ? '#cd7f32' : '#fff'};
    color: ${({ position }) => (position < 3 ? '#000' : '#333')};
    margin: 10px 0;
    padding: 15px;
    border-radius: 5px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;

    &:nth-child(1) {
        background-color: #ffd700; /* Ouro */
    }

    &:nth-child(2) {
        background-color: #c0c0c0; /* Prata */
    }

    &:nth-child(3) {
        background-color: #cd7f32; /* Bronze */
    }
`;

const DesempenhoColaboradores: React.FC<{ usuario: Usuario | null }> = ({ usuario }) => {
    const colaboradores = usuarios.filter((u) => u.gestor === usuario?.email);

    const ranking = colaboradores
        .map((colaborador) => {
            const totalTreinamentos = cursos.reduce((acc, curso) => {
                return acc + curso.modulos.filter((m) => m.visualizacao[colaborador.id]).length;
            }, 0);

            return {
                nome: colaborador.nome,
                totalTreinamentos,
            };
        })
        .sort((a, b) => b.totalTreinamentos - a.totalTreinamentos);

    return (
        <Container>
            <Title>Desempenho dos Colaboradores</Title>
            <RankingList>
                {ranking.map((colaborador, index) => (
                        <RankingItem key={index} position={index}>
                                    <span>{index + 1}º {colaborador.nome}</span>
                                    <span>{colaborador.totalTreinamentos} treinamentos</span>
                        </RankingItem>
                ))}
            </RankingList>
        </Container>
    );
};

export default DesempenhoColaboradores;




// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { Usuario, cursos, usuarios } from '../db/db';

// const Tooltip = styled.div`
//     position: absolute;
//     background-color: rgba(0, 0, 0, 0.75);
//     color: #fff;
//     padding: 5px 10px;
//     border-radius: 5px;
//     font-size: 0.9rem;
//     white-space: nowrap;
//     z-index: 10;
//     transform: translateY(-100%);
//     visibility: hidden;
// `;

// const ListItem = styled.li`
//     position: relative;
//     &:hover ${Tooltip} {
//         visibility: visible;
//     }
// `;

// const DesempenhoColaboradores: React.FC<{ usuario: Usuario | null }> = ({ usuario }) => {
//     const [tooltipContent, setTooltipContent] = useState('');

//     const colaboradores = usuarios.filter((u) => u.gestor === usuario?.email);

//     const ranking = colaboradores.map((colaborador) => {
//         const totalTreinamentos = cursos.reduce((acc, curso) => {
//             return acc + curso.modulos.filter(m => m.visualizacao[colaborador.id]).length;
//         }, 0);

//         const ultimosTreinamentos = cursos.flatMap((curso) =>
//             curso.modulos.filter((modulo) => modulo.visualizacao[colaborador.id]).map((modulo) => ({
//                 curso: curso.titulo,
//                 modulo: modulo.titulo,
//                 data: modulo.visualizacao[colaborador.id],
//             }))
//         ).sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()).slice(0, 3);

//         return {
//             id: colaborador.id,
//             nome: colaborador.nome,
//             totalTreinamentos,
//             ultimosTreinamentos,
//         };
//     }).sort((a, b) => b.totalTreinamentos - a.totalTreinamentos);

//     const handleMouseOver = (treinamentos: { curso: string, modulo: string }[]) => {
//         if (treinamentos.length > 0) {
//             const resumo = treinamentos.map(t => `${t.curso} - ${t.modulo}`).join(', ');
//             setTooltipContent(resumo);
//         } else {
//             setTooltipContent('Nenhum treinamento concluído recentemente.');
//         }
//     };

//     return (
//         <div>
//             <h2>Desempenho dos Colaboradores</h2>
//             <ul>
//                 {ranking.map((colaborador, index) => (
//                     <ListItem
//                         key={index}
//                         onMouseOver={() => handleMouseOver(colaborador.ultimosTreinamentos)}
//                         onMouseOut={() => setTooltipContent('')}
//                     >
//                         <Link to={`/colaborador/${colaborador.id}`}>
//                             {index + 1}º Lugar: {colaborador.nome} - {colaborador.totalTreinamentos} treinamentos
//                         </Link>
//                         <Tooltip>{tooltipContent}</Tooltip>
//                     </ListItem>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default DesempenhoColaboradores;

