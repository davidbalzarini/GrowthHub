import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cursos from './pages/Cursos';
import CursoDetalhe from './pages/CursoDetalhe';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import AreaAluno from './pages/AreaAluno';
import AreaAdm from './pages/AreaAdm';
import Certificado from './pages/Certificado';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Usuario } from './db/db';
import PerfilUsuario from './pages/PerfilUsuario';
import DesempenhoColaboradores from './pages/DesempenhoColaboradores';
import PerfilColaborador from './pages/colaborador';
import Quiz from './pages/Quiz';

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f8f9fa;
`;

const Content = styled.div`
    flex: 1;
    padding: 20px;
`;

const App: React.FC = () => {
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null);

    
    useEffect(() => {

    }, [usuarioLogado])


    return (
        <Router>
            <AppContainer>
                <Navbar usuario={usuarioLogado}/>
                <Content>
                    <Routes>
                        <Route path="/desempenho-colaboradores" element={<DesempenhoColaboradores usuario={usuarioLogado} />} />
                        <Route path="/colaborador/:id" element={<PerfilColaborador/>} />
                        <Route path='/perfil' element={<PerfilUsuario usuario={usuarioLogado} setUsuarioLogado={setUsuarioLogado}/>}/>
                        <Route path="/" element={<Home usuario={usuarioLogado} />} />
                        <Route path="/cursos" element={<Cursos />} />
                        <Route path="/curso/:id" element={<CursoDetalhe usuario={usuarioLogado} />} />
                        <Route path="/login" element={<Login setUsuarioLogado={setUsuarioLogado} />} />
                        <Route path="/cadastro" element={<Cadastro />} />
                        <Route path="/area-aluno" element={<AreaAluno usuario={usuarioLogado} />} />
                        <Route path="/area-adm" element={<AreaAdm />} />
                        <Route path="/certificado/:id" element={<Certificado usuario={usuarioLogado}/>} />
                        <Route path="/curso/:id/quiz" element={<Quiz/>} />
                    </Routes>
                </Content>
                <Footer />
            </AppContainer>
        </Router>
    );
};

export default App;
