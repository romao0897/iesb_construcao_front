'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function ProdutoFormPage(props) {

  const router = useRouter()

  // Carrega os produtos do localStorage
  const produtos = JSON.parse(localStorage.getItem('produtos')) || []

  // Recupera o ID do produto editado (se houver)
  const id = props.searchParams.id
  const produtoEditado = produtos.find(item => item.id == id)

  // Função para salvar os dados do produto
  function salvar(dados) {
    if (produtoEditado) {
      Object.assign(produtoEditado, dados)
      localStorage.setItem('produtos', JSON.stringify(produtos))
    } else {
      dados.id = v4()
      produtos.push(dados)
      localStorage.setItem('produtos', JSON.stringify(produtos))
    }

    alert("Produto salvo com sucesso!")
    router.push("/Produtos")
  }

  // Valores iniciais do formulário
  const initialValues = {
    nomeProduto: '',
    tipoMaterial: '',
    unidadeMedida: '',
    preco: '',
    quantidadeEstoque: '',
    marca: '',
    fornecedor: '',
    cor: ''
  }

  // Validação dos campos
  const validationSchema = Yup.object().shape({
    nomeProduto: Yup.string().required("Campo obrigatório"),
    tipoMaterial: Yup.string().required("Campo obrigatório"),
    unidadeMedida: Yup.string().required("Campo obrigatório"),
    preco: Yup.number().required("Campo obrigatório").positive("Preço deve ser positivo"),
    quantidadeEstoque: Yup.number().required("Campo obrigatório").integer("Quantidade deve ser inteira").min(0, "Quantidade não pode ser negativa"),
    marca: Yup.string().required("Campo obrigatório"),
    fornecedor: Yup.string().required("Campo obrigatório"),
    cor: Yup.string().required("Campo obrigatório")
  })

  return (
    <Pagina titulo={"Cadastro de Produto de Material de Construção"}>

      <Formik
        initialValues={produtoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Nome do Produto:</Form.Label>
                  <Form.Control
                    name='nomeProduto'
                    type='text'
                    value={values.nomeProduto}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.nomeProduto && !errors.nomeProduto}
                    isInvalid={touched.nomeProduto && errors.nomeProduto}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.nomeProduto}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Tipo de Material:</Form.Label>
                  <Form.Select
                    name='tipoMaterial'
                    value={values.tipoMaterial}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.tipoMaterial && !errors.tipoMaterial}
                    isInvalid={touched.tipoMaterial && errors.tipoMaterial}
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="Cimento">Cimento</option>
                    <option value="Madeira">Madeira</option>
                    <option value="Aço">Aço</option>
                    <option value="Epi">Epi</option>
                    <option value="Ferramentas">Ferramentas</option>
                    {/* Adicione outras opções conforme necessário */}
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.tipoMaterial}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Unidade de Medida:</Form.Label>
                  <Form.Select
                    name='unidadeMedida'
                    value={values.unidadeMedida}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.unidadeMedida && !errors.unidadeMedida}
                    isInvalid={touched.unidadeMedida && errors.unidadeMedida}
                  >
                    <option value="">Selecione a unidade</option>
                    <option value="Kg">Kg</option>
                    <option value="Litros">Litros</option>
                    <option value="Unidade">Unidade</option>
                    {/* Adicione outras opções conforme necessário */}
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.unidadeMedida}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Preço:</Form.Label>
                  <Form.Control
                    name='preco'
                    type='number'
                    value={values.preco}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.preco && !errors.preco}
                    isInvalid={touched.preco && errors.preco}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.preco}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Quantidade em Estoque:</Form.Label>
                  <Form.Control
                    name='quantidadeEstoque'
                    type='number'
                    value={values.quantidadeEstoque}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.quantidadeEstoque && !errors.quantidadeEstoque}
                    isInvalid={touched.quantidadeEstoque && errors.quantidadeEstoque}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.quantidadeEstoque}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Marca:</Form.Label>
                  <Form.Control
                    name='marca'
                    type='text'
                    value={values.marca}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.marca && !errors.marca}
                    isInvalid={touched.marca && errors.marca}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.marca}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Fornecedor:</Form.Label>
                  <Form.Control
                    name='fornecedor'
                    type='text'
                    value={values.fornecedor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.fornecedor && !errors.fornecedor}
                    isInvalid={touched.fornecedor && errors.fornecedor}
                    
                  />
                  
                   
                  <Form.Control.Feedback type='invalid'>{errors.fornecedor}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Cor:</Form.Label>
                  <Form.Select
                    name='cor'
                    value={values.cor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.cor && !errors.cor}
                    isInvalid={touched.cor && errors.cor}
                  >
                    <option value="">Selecione a cor</option>
                    <option value="Vermelho">Vermelho</option>
                    <option value="Azul">Azul</option>
                    <option value="Verde">Verde</option>
                    <option value="Preto">Preto</option>
                    {/* Adicione outras cores conforme necessário */}
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.cor}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group className='text-end'>
                <Button className='me-2' href='/Produtos'><FaArrowLeft /> Voltar</Button>
                <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
              </Form.Group>
            </Form>
          )
        }}
      </Formik>
    </Pagina>
  )
}
