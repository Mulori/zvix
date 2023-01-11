import { useEffect, useState } from 'react';
import './styles.css';
 
function Inicio(){  
    const [nome, setNome] = useState('');
    
    useEffect(() => {
        Load();
        StyleBody();
    })

    function StyleBody() {
        document.body.style = "background: white;";
        document.title = "Zvix | Inicio";
      }

    function Load(){
        setNome(localStorage.getItem('zvix_nome'));
    }

    return (
        <div className="content">
            <div className="card card-background">
                <div className="card-header" id="label-title-page">Inicio - {nome}</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md">
                        </div>
                        <div className="col-md"> 
                        </div>
                        <div className="col-md">
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default Inicio