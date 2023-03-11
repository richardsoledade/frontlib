import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  DropdownButton,
  Form,
  InputGroup,
  Table,
} from "react-bootstrap";
import api from "./service/api";

function FaturamentoLivros() {
  const [clienteId, setClienteId] = useState();
  const [aluguels, setAlguels] = useState([]);
  const [clientes, setClientes] = useState([]);

  const [dataIni, setDataIni] = useState('');
  const [dataFim, setDataFim] = useState('');

  //==========================================
  //Constante de filtragem de transformação de data via moment por intervalo, utilizando arredondamento de data por conta do fuso horário
  const listaFiltrada =
    aluguels.filter(
      (a) => moment(a.data).isAfter(moment(dataIni).startOf('day')) && !a.dataDevolucao || moment(a.dataDevolucao).isBetween(moment(dataIni).startOf('day'), moment(dataFim).endOf('day')));

  // effect listagem
  useEffect(() => {
    getAluguels();
    getClientes();
  }, []);

  //==========================================
  // Puxar aluguel
  async function getAluguels() {
    await api
      .get("/aluguel")
      .then((response) => {
        setAlguels(response.data);
      })
      .catch((e) => {
        alert(e);
      });
  }
  //==========================================

  // puxar cliente pra listagem
  async function getClientes() {
    await api
      .get("/cliente")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((e) => {
        alert(e);
      });
  }
  //==========================================
  // Soma do faturamento total de intervalos

  function somaTotal(alugueis) {
    let total = 0
    for (let i = 0; i < alugueis.length; i++) {
      total += Number(alugueis[i].valorArrecadado)
    }
    return total
  }

  return (
    <div className="container">
      <h1>Histórico de Faturamentos</h1>

      <div className="botoes">
        <input
          className="inputDate"
          type={"date"}
          placeholder="Data Inicial"
          onChange={(e) => setDataIni(e.target.value)}
          value={dataIni}
        />

        <input
          className="inputDate"
          type={"date"}
          placeholder="Data Final"
          onChange={(e) => setDataFim(e.target.value)}
          value={dataFim}
        />
    
      </div>

      {/* ============ LIVRO TABLE ==================== */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Livro</th>
            <th>Retirada</th>
            <th>Devolução</th>
            <th>Arrecadado</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {listaFiltrada.map((a) => {
            return (
              <tr>
                <td>{a.Livro.nome}</td>
                <td>{moment(a.data).format("DD/MM/YYYY")}</td>
                <td>
                  {a.dataDevolucao
                    ? moment(a.dataDevolucao).format("DD/MM/YYYY")
                    : "Pendente"}
                </td>
                <td>{a.valorArrecadado
                ? `R$ ${a.valorArrecadado}`
                : "Pendente"}</td>
                <td>
                {a.valorArrecadado
                ? ` Finalizado`
                : "Em Andamento"}
                </td>
              </tr>

            );
          })}
        </tbody>
      </Table>
      
      <div>
        <h5> Faturamento total: R$ {somaTotal(listaFiltrada)}  </h5></div>
    </div>
  );
}

export default FaturamentoLivros;
