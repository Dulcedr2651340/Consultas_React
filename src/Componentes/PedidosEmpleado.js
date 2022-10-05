import React, { Component } from 'react';

class PedidosEmpleado extends Component {
    state = { busqueda:0,
    datosbuscados:[] 
}

onchange=async e=>{
    e.persist();
    await this.setState({busqueda: e.target.value})
}

async componentDidMount() {
    const resultado=await fetch('http://localhost:21919/api/NeptunoAPI/1');
    //
    const data=await resultado.json();
    //
    this.setState(
        {datosbuscados: data}
    )
}

async componentDidUpdate(prevProps, prevState) {
    if (prevState.busqueda !== this.state.busqueda)
    {
        const {busqueda} = this.state
        const query=await fetch(`http://localhost:21919/api/NeptunoAPI/${busqueda}`);
        //
        const data=await query.json();
        //
        this.setState({
            datosbuscados: data
        })
    }
}
render() { 
    const {datosbuscados} = this.state
        return ( 
            <div className="container">
                <div>
                    Codigo de Empleado: <input type="text" name="busqueda" value={this.state.busqueda} 
                                         onChange={this.onchange} />
                </div>    
                <hr/>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nro. Pedido</th>
                                <th>Fecha de Pedido</th> 
                                <th>Cantidad Productos</th>
                                <th>Importe Pedido</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                datosbuscados.map(item=>{
                                    return <tr key={item.idPedido}>
                                        <td>{item.idPedido}</td>
                                        <td>{item.fechaPedido}</td>
                                        <td>{item.cant_Productos}</td>
                                        <td>{item.importe}</td>
                                    </tr>
                                }

                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
         );
    }
}
 
export default PedidosEmpleado;