import React, { useState } from 'react';
import styled from 'styled-components';
import { Usuario, autenticarUsuario } from '../db/db';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const FormContainer = styled.div`
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    background-color: #ffffff;
`;

const Input = styled.input`
    width: 380px;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    font-size: 1rem;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    font-size: 1.25rem;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;



const Par = styled(Link)`
    text-decoration: none
`

interface LoginProps {
    setUsuarioLogado: (usuario: Usuario | null) => void;
}

const Login: React.FC<LoginProps> = ({ setUsuarioLogado }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate()

    const handleLogin = () => {
        const usuario: Usuario | null = autenticarUsuario(email, senha);
        if (usuario) {
            setUsuarioLogado(usuario); // Atualiza o estado de usuário logado no App
            const notify = () => {
                toast.success('Usuário autenticado com sucesso', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
            notify()
            // console.log('Usuário autenticado com sucesso');
            navigate('/');
        } else {
            toast.error('Credenciais inválidas', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            
            //console.log('Credenciais inválidas');
        }
    };

   
    return (
        <FormContainer>
            <h2>Login</h2>
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
            <Button onClick={handleLogin}>Entrar</Button>
            <p>Não tem uma conta? <Par to='/cadastro'>Cadastre-se</Par></p>


        </FormContainer>
    );
};

export default Login;
