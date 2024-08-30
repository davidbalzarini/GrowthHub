import React from 'react';
import { useParams } from 'react-router-dom';
import { cursos, usuarios } from '../db/db';

const PerfilColaborador: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const colabId = Number(id?.replace(':', ''));
    const colaborador = usuarios.find((u) => u.id === colabId);
    alert(colabId)

    if (!colaborador) {
        return <div>Colaborador não encontrado</div>;
    }

    const treinamentosConcluidos = cursos.flatMap((curso) =>
        curso.modulos.filter((modulo) => modulo.visualizacao[colaborador.id]).map((modulo) => ({
            curso: curso.titulo,
            modulo: modulo.titulo,
        }))
    );

    return (
        <div>
            <h2>Perfil do Colaborador: {colaborador.nome}</h2>
            <p>Email: {colaborador.email}</p>
            <h3>Treinamentos Concluídos</h3>
            <ul>
                {treinamentosConcluidos.length > 0 ? (
                    treinamentosConcluidos.map((treinamento, index) => (
                        <li key={index}>
                            {treinamento.curso} - {treinamento.modulo}
                        </li>
                    ))
                ) : (
                    <p>Nenhum treinamento concluído.</p>
                )}
            </ul>
        </div>
    );
};

export default PerfilColaborador;
