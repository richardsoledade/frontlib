import { useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Table,
} from "react-bootstrap";
import api from "./service/api";

function LivrosCadastro() {
  const [livroNome, setLivroNome] = useState([]);
  const [vDiaria, setVDiaria] = useState([]);

  async function cadastrarLivro() {
    console.log({ nome: livroNome, vDiaria: vDiaria });
    await api
      .post("/livros", {
        nome: livroNome,
        valorDiaria: parseInt(vDiaria),
      })
      .then((response) => {
        getLivros();
      });
  }
  // effect listagem
  useEffect(() => {
    getLivros();
  }, []);
     
  const [livros, setLivros] = useState([]);

  // puxar livro pra listagem
  async function getLivros() {
    await api
    .get("/livros")
    .then((response) => {
      setLivros(response.data);
    })
    .catch((e) => {
      alert(e);
    });
  }


  return (
    <div className="container">
      <h1>Cadastrar Livro</h1>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Livro</InputGroup.Text>
        <Form.Control
          placeholder="Inserir nome do livro"
          aria-label="nome "
          onChange={(e) => {
            setLivroNome(e.target.value);
          }}
          value={livroNome}
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control
          aria-label="Amount (to the nearest dollar)"
          placeholder="Inserir valor da diária"
          onChange={(e) => {
            setVDiaria(e.target.value);
          }}
          value={vDiaria}
          type="number"
        />
      </InputGroup>

      <Button variant="primary" onClick={cadastrarLivro}>
            Cadastrar
          </Button>

      {/* ============ LIVRO TABLE ==================== */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID do livro</th>
            <th>Livro</th>
            <th>Diária</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((a) => {
            return (
              <tr>
                <td>{a.id}</td>
                <td>{a.nome}</td>
                <td>{a.valorDiaria}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default LivrosCadastro;
