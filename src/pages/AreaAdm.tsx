import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Curso, cursos } from '../db/db';

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
    margin-bottom: 30px;
`;

const Title = styled.h2`
    text-align: center;
    color: #007bff;
    margin-bottom: 20px;
`;

const Subtitle = styled.h3`
    color: #343a40;
    margin-bottom: 10px;
`;

const Input = styled.input`
    width: calc(100% - 20px);
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
    margin-top: 10px;

    &:hover {
        background-color: #0056b3;
    }
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    margin: 10px 0;
`;

const List = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin: 5px 0;
    background-color: #ffffff;
    border: 1px solid #ced4da;
    border-radius: 4px;

    button {
        margin-left: 10px;
    }
`;

const AreaAdm: React.FC = () => {
    const [cursoSelecionado, setCursoSelecionado] = useState<Curso | null>(null);
    const [tituloCurso, setTituloCurso] = useState('');
    const [descricaoCurso, setDescricaoCurso] = useState('');
    const [imagemCurso, setImagemCurso] = useState('');
    const [obg, setObg] = useState(false);
    const [tituloModulo, setTituloModulo] = useState('');
    const [descricaoModulo, setDescricaoModulo] = useState('');
    const [videoUrlModulo, setVideoUrlModulo] = useState('');
    const [listaCursos, setListaCursos] = useState<Curso[]>([]);

    useEffect(() => {
        setListaCursos([...cursos]);
    }, [cursos]);

    const handleAdicionarModulo = () => {
        if (!cursoSelecionado) return;

        const novoModulo = {
            id: cursoSelecionado.modulos.length + 1,
            titulo: tituloModulo,
            descricao: descricaoModulo,
            videoUrl: videoUrlModulo,
            visualizacao: {},
        };

        const cursoAtualizado = {
            ...cursoSelecionado,
            modulos: [...cursoSelecionado.modulos, novoModulo],
        };

        const index = cursos.findIndex(curso => curso.id === cursoSelecionado.id);
        if (index !== -1) {
            cursos[index] = cursoAtualizado;
        }

        setCursoSelecionado(cursoAtualizado);
        setTituloModulo('');
        setDescricaoModulo('');
        setVideoUrlModulo('');
        console.log('Módulo adicionado com sucesso');
    };
    const handleConfirmarEdicao = () => {
        if (!cursoSelecionado) return;

        const cursoAtualizado = {
            ...cursoSelecionado,
            titulo: tituloCurso,
            descricao: descricaoCurso,
            image: imagemCurso,
            obg: obg,
        };

        const index = cursos.findIndex(curso => curso.id === cursoSelecionado.id);
        if (index !== -1) {
            cursos[index] = cursoAtualizado;
            setCursoSelecionado(cursoAtualizado);
            setTituloCurso('');
            setDescricaoCurso('');
            setImagemCurso('');
            setObg(false);
            console.log('Curso editado com sucesso');
            setListaCursos([...cursos]);
        }
    };
    const handleEditarModulo = (moduloId: number) => {
        if (!cursoSelecionado) return;

        const modulosAtualizados = cursoSelecionado.modulos.map(modulo =>
            modulo.id === moduloId
                ? {
                    ...modulo,
                    titulo: tituloModulo || modulo.titulo,
                    descricao: descricaoModulo || modulo.descricao,
                    videoUrl: videoUrlModulo || modulo.videoUrl,
                }
                : modulo
        );

        const cursoAtualizado = {
            ...cursoSelecionado,
            modulos: modulosAtualizados,
        };

        const index = cursos.findIndex(curso => curso.id === cursoSelecionado.id);
        if (index !== -1) {
            cursos[index] = cursoAtualizado;
            setCursoSelecionado(cursoAtualizado);
            setTituloModulo('');
            setDescricaoModulo('');
            setVideoUrlModulo('');
            console.log('Módulo editado com sucesso');
        }
    };

    const handleAdicionarCurso = () => {
        const novoCurso: Curso = {
            id: cursos.length + 1,
            titulo: tituloCurso,
            descricao: descricaoCurso,
            image: imagemCurso,
            obg: obg,
            modulos: [],
        };

        cursos.push(novoCurso);
        setTituloCurso('');
        setDescricaoCurso('');
        setImagemCurso('');
        setObg(false);
        console.log('Curso adicionado com sucesso');
        setListaCursos([...cursos]);
    };

    const handleRemoverCurso = (id: number) => {
        const index = cursos.findIndex((curso) => curso.id === id);
        if (index !== -1) {
            cursos.splice(index, 1);
            setCursoSelecionado(null); // Desmarcar o curso selecionado se for removido
            console.log('Curso removido com sucesso');
            setListaCursos([...cursos]);
        }
    };

    const handleSelecionarCurso = (curso: Curso) => {
        setCursoSelecionado(curso);
        setTituloCurso(curso.titulo);
        setDescricaoCurso(curso.descricao);
        setImagemCurso(curso.image);
        setObg(curso.obg); // Atualiza o checkbox
    };

    const handleRemoverModulo = (moduloId: number) => {
        if (!cursoSelecionado) return;

        const modulosAtualizados = cursoSelecionado.modulos.filter(modulo => modulo.id !== moduloId);

        const cursoAtualizado = {
            ...cursoSelecionado,
            modulos: modulosAtualizados,
        };

        const index = cursos.findIndex(curso => curso.id === cursoSelecionado.id);
        if (index !== -1) {
            cursos[index] = cursoAtualizado;
            setCursoSelecionado(cursoAtualizado);
            console.log('Módulo removido com sucesso');
            setListaCursos([...cursos]);
        }
    };

    return (
        <Container>
            <Title>Área Administrativa</Title>

            <Section>
                <Subtitle>Adicionar Novo Curso</Subtitle>
                <Input
                    type="text"
                    placeholder="Título do Curso"
                    value={tituloCurso}
                    onChange={(e) => setTituloCurso(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Descrição do Curso"
                    value={descricaoCurso}
                    onChange={(e) => setDescricaoCurso(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="URL da Imagem"
                    value={imagemCurso}
                    onChange={(e) => setImagemCurso(e.target.value)}
                />
                <CheckboxLabel>
                    <input
                        type="checkbox"
                        checked={obg}
                        onChange={(e) => setObg(e.target.checked)}
                    />
                    &nbsp;Obrigatório
                </CheckboxLabel>
                <Button onClick={handleAdicionarCurso}>Adicionar Curso</Button>
            </Section>

            {cursoSelecionado && (
                <Section>
                    <Subtitle>Editar Curso</Subtitle>
                    <Input
                        type="text"
                        placeholder="Título do Curso"
                        value={tituloCurso}
                        onChange={(e) => setTituloCurso(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Descrição do Curso"
                        value={descricaoCurso}
                        onChange={(e) => setDescricaoCurso(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="URL da Imagem"
                        value={imagemCurso}
                        onChange={(e) => setImagemCurso(e.target.value)}
                    />
                    <CheckboxLabel>
                        <input
                            type="checkbox"
                            checked={obg}
                            onChange={(e) => setObg(e.target.checked)}
                        />
                        &nbsp;Obrigatório
                    </CheckboxLabel>
                    <Button onClick={handleConfirmarEdicao}>Confirmar Edição</Button>
                    {/* Campos para adicionar ou editar módulo */}
                    <Subtitle>Adicionar/Editar Módulo</Subtitle>
                    <Input
                        type="text"
                        placeholder="Título do Módulo"
                        value={tituloModulo}
                        onChange={(e) => setTituloModulo(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Descrição do Módulo"
                        value={descricaoModulo}
                        onChange={(e) => setDescricaoModulo(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="URL do Vídeo"
                        value={videoUrlModulo}
                        onChange={(e) => setVideoUrlModulo(e.target.value)}
                    />
                    <Button onClick={handleAdicionarModulo}>Adicionar Módulo</Button>

                    <Subtitle>Módulos</Subtitle>
                    <List>
                        {cursoSelecionado.modulos.map((modulo) => (
                            <ListItem key={modulo.id}>
                                {modulo.titulo}
                                <div>
                                    <Button onClick={() => handleEditarModulo(modulo.id)}>Editar</Button>
                                    <Button onClick={() => handleRemoverModulo(modulo.id)}>Remover</Button>
                                </div>
                            </ListItem>
                        ))}
                    </List>
                </Section>
            )}

            <Section>
                <Subtitle>Cursos Disponíveis</Subtitle>
                <List>
                    {listaCursos.map((curso) => (
                        <ListItem key={curso.id}>
                            {curso.titulo}
                            <div>
                                <Button onClick={() => handleSelecionarCurso(curso)}>Editar</Button>
                                <Button onClick={() => handleRemoverCurso(curso.id)}>Remover</Button>
                            </div>
                        </ListItem>
                    ))}
                </List>
            </Section>
        </Container>
    );
};

export default AreaAdm;
