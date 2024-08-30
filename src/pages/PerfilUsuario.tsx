import React, { useState } from 'react';
import styled from 'styled-components';
import { Usuario, usuarios } from '../db/db';
import { useNavigate } from 'react-router-dom';

const PerfilContainer = styled.div`
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    background-color: #ffffff;
`;

const Title = styled.h2`
    color: #007bff;
`;

const Label = styled.label`
    display: block;
    margin: 10px 0 5px;
    color: #6c757d;
`;

const Input = styled.input`
    width: 95%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ced4da;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 10px 15px;
    background-color: #28a745;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    margin: 5px;

    &:hover {
        background-color: #218838;
    }
`;

const LogoutButton = styled(Button)`
    background-color: #dc3545;
    margin: 5px;

    &:hover {
        background-color: #c82333;
    }
`;

interface PerfilUsuarioProps {
    usuario: Usuario | null;
    setUsuarioLogado: (usuario: Usuario | null) => void;
}

const PerfilUsuario: React.FC<PerfilUsuarioProps> = ({ usuario, setUsuarioLogado }) => {

    if(!usuario){
        return <p>vc precisa estar logado</p>
    }
        const [nome, setNome] = useState(usuario.nome);
        const [email, setEmail] = useState(usuario.email);
        const [senha, setSenha] = useState(usuario.senha);
        const [foto, setFoto] = useState(usuario.foto);
        const navigate = useNavigate()

        const handleLogout = () => {
            setUsuarioLogado(null);
        };
    

    const handleSave = () => {
        const userIndex = usuarios.findIndex(u => u.id === usuario.id);
        if (userIndex !== -1) {
            usuarios[userIndex] = { ...usuario, nome, email, senha, foto };
            navigate('/')
        }
    };
    

    return (
        <PerfilContainer>
            <Title>Perfil do Usuário</Title>
            <Label>Nome</Label>
            <Input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <Label>Email</Label>
            <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Label>Senha</Label>
            <Input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
            <Label>Foto (URL)</Label>
            <Input
                type="text"
                value={foto}
                onChange={(e) => setFoto(e.target.value)}
            />
            <Button onClick={handleSave}>Salvar Alterações</Button>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </PerfilContainer>
    );
};

export default PerfilUsuario;
