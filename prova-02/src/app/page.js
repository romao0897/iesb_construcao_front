'use client'

import Pagina from '@/components/Pagina'
import { Button, Card, Col, Row, Alert } from 'react-bootstrap'
import { useState, useEffect } from 'react'

export default function HomePage() {

  const Clientes = JSON.parse(localStorage.getItem("Clientes")) || []
  const Produtos = JSON.parse(localStorage.getItem("Produtos")) || []
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
      imagem: "https://st3.depositphotos.com/1001335/14944/i/450/depositphotos_149444160-stock-illustration-materials-for-construction-3d-illustration.jpg", quantidade: Produtos.length,
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

  // Exemplo de promoções limitadas com contagem regressiva
  const [timeLeft, setTimeLeft] = useState(3600) // 1 hora de contagem regressiva

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
  }

  return (
    <Pagina titulo={"Madereira RM"}>
      {/* Seção de Ofertas Relâmpago */}
      <Alert variant="danger" className="d-flex justify-content-between align-items-center">
        <div className="text-center">
          <h4>Oferta Relâmpago!</h4>
          <p>Corra! Últimas unidades disponíveis para o produto com desconto!</p>
          <p><strong>Tempo restante: {formatTime(timeLeft)}</strong></p>
        </div>
        <img 
          src="https://st3.depositphotos.com/1063437/18864/i/450/depositphotos_188648452-stock-photo-cordless-drill-with-drill-bit.jpg" 
          alt="Produto de oferta" 
          style={{ width: '150px', height: 'auto', borderRadius: '5px' }} 
        />
      </Alert>

      <Row md={5}>
        {lista.map(item => (
          <Col className='py-2' key={item.nome}>
            <Card style={{ height: '100%' }}>
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
