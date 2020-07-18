import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

function App() {

  // State del formulario
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  // State de la consulta
  const [consultar, guardarConsultar] = useState(false);

  // State del resultado
  const [resultado, guardarResultado] = useState({});

  // Extraer ciudad y país
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      
      if (consultar) {
        const appId = 'dabf51f55750cdee1488398d304a5723';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);
        guardarConsultar(false);
      }
    }
    consultarAPI();
  }, [consultar]);

  return (
    <Fragment>
      <Header titulo='Clima React App'/>

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario 
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>

            <div className="col m6 s12">
              <Clima 
                resultado={resultado}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
