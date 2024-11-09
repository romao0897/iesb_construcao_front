'use client'

import Pagina from '@/components/Pagina'
import { Button, Card, Col, Row } from 'react-bootstrap'

export default function HomePage() {


  const Clientes = JSON.parse(localStorage.getItem("Clientes")) || []
  const cursos = JSON.parse(localStorage.getItem("cursos")) || []
  const professores = JSON.parse(localStorage.getItem("professores")) || []
  const disciplinas = JSON.parse(localStorage.getItem("disciplinas")) || []
  const alunos = JSON.parse(localStorage.getItem("alunos")) || []

  const lista = [
    {
      nome: "Clientes",
      imagem: "https://img.freepik.com/fotos-gratis/laboratorio-de-informatica-moderno-e-equipado_23-2149241262.jpg", quantidade: Clientes.length,
      link: "/Clientes"
    },
    {
      nome: "Produtos",
      imagem: "https://st3.depositphotos.com/1001335/14944/i/450/depositphotos_149444160-stock-illustration-materials-for-construction-3d-illustration.jpg", quantidade: cursos.length,
      link: "/Produtos"
    },
    {
      nome: "Fornecedores",
      imagem: "https://respostas.sebrae.com.br/wp-content/uploads/2021/02/fornecedores-959x615.jpg", quantidade: professores.length,
      link: "/Fornecedores"
    },
    {
      nome: "Funcionarios",
      imagem: "https://img.freepik.com/fotos-gratis/equipe-trabalhando-juntos-no-projeto_23-2149325422.jpg", quantidade: disciplinas.length,
      link: "/Funcionarios"
    },
    {
      nome: "Pedidos",
      imagem: "https://img.freepik.com/fotos-premium/ferramentas-de-construcao-em-carrinho-de-compras-isoladas-em-branco_392895-109786.jpg", quantidade: alunos.length,
      link: "/Pedidos"
    },
  ]



  return (
    <Pagina titulo={"Madereira RM"}>
      <Row md={5}>
        {lista.map(item => (
          <Col className='py-2'>
            <Card style={{height: '100%'}}>
              <Card.Img src={item.imagem} style={{ height: '100%' }} />
              <Card.Body>
                <Card.Title>{item.nome}</Card.Title>
                Cadastrados: {item.quantidade}
              </Card.Body>
              <Card.Footer className='text-end'>
                <Button href={item.link}>Ver Lista</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}

      </Row>
    </Pagina>
  )
}