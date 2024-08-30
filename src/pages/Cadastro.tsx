import React, { useState } from 'react';
import styled from 'styled-components';
import { Usuario, usuarios } from '../db/db';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    background-color: #f8f9fa;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    color: #007bff;
    text-align: center;
    margin-bottom: 20px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ced4da;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 1rem;
    background-color: #ffffff;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: #0056b3;
    }
`;

const FileInputLabel = styled.label`
    font-size: 0.9rem;
    color: #6c757d;
    margin-bottom: 5px;
    display: block;
`;

const Cadastro: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [gestor, setGestor] = useState('');
    const [foto, setFoto] = useState<File | null>(null);
    const [adm] = useState(false);
    const [codigoGerado, setCodigoGerado] = useState<number | null>(null);
    const [codigoInserido, setCodigoInserido] = useState('');
    const [codigoEnviado, setCodigoEnviado] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setFoto(file);
        } else {
            alert('Por favor, selecione um arquivo de imagem no formato .jpeg ou .png.');
        }
    };

    const gerarCodigoVerificacao = () => {
        const codigo = Math.floor(100000 + Math.random() * 900000); // Gera um código de 6 dígitos
        setCodigoGerado(codigo);
        setCodigoEnviado(true);
        // Simulando o envio do código para o e-mail
        console.log(`Código de verificação enviado para ${email}: ${codigo}`);
        alert(`Código de verificação enviado para ${email}`);
    };

    const handleVerificarCodigo = () => {
        if (parseInt(codigoInserido) === codigoGerado) {
            handleCadastro();
        } else {
            alert('Código de verificação incorreto. Tente novamente.');
        }
    };

    const handleCadastro = () => {
        if (!foto) {
            alert('Por favor, selecione uma imagem de perfil.');
            return;
        }

        const novoUsuario: Usuario = {
            id: usuarios.length + 1,
            nome,
            email,
            senha,
            foto: URL.createObjectURL(foto), // URL da imagem carregada
            adm,
            gestor,
        };
        usuarios.push(novoUsuario);
        console.log('Usuário cadastrado com sucesso');
        navigate('/login');
    };

    return (
        <Container>
            <Title>Cadastro</Title>
            {!codigoEnviado ? (
                <>
                    <Input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <FileInputLabel htmlFor="foto">Selecione uma imagem de perfil (.jpeg ou .png)</FileInputLabel>
                    <Input type="file" id="foto" accept=".jpeg, .png" onChange={handleFileChange} />
                    <Input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <Input type="email" placeholder="Email do seu gestor" value={gestor} onChange={(e) => setGestor(e.target.value)} />
                    <Button onClick={gerarCodigoVerificacao}>Enviar Código de Verificação</Button>
                </>
            ) : (
                <>
                    <Input
                        type="text"
                        placeholder="Digite o código de verificação"
                        value={codigoInserido}
                        onChange={(e) => setCodigoInserido(e.target.value)}
                    />
                    <Button onClick={handleVerificarCodigo}>Verificar Código</Button>
                </>
            )}
        </Container>
    );
};

export default Cadastro;
