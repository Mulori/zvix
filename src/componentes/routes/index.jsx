import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../pages/login';
import Inicio from '../pages/inicio';
import MeuPerfil from '../pages/meuPerfil';
import PrivateRoute from './privateRoute';
import NavBar from '../layout/navbar';
import Cadastre from '../pages/cadastre';
import MinhaOrganizacao from '../pages/minhasOrganizacoes';
import {Navigate} from 'react-router-dom';

export default function Rotas(){
    return(
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<PrivateRoute><Inicio /></PrivateRoute>} />
                <Route path="/perfil" element={<PrivateRoute><MeuPerfil /></PrivateRoute>} />
                <Route path="/minhaOrganizacao" element={<PrivateRoute><MinhaOrganizacao /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/registre" element={<Cadastre />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    )
}