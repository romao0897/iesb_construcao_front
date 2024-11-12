'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { ReactInputMask } from "react-input-mask"
import { v4 } from 'uuid'
import * as Yup from 'yup'
import { useEffect } from 'react'


export default function FornecedorFormPage(props) {
  const router = useRouter()
  const fornecedores = JSON.parse(localStorage.getItem('fornecedores')) || []

  const id = props.searchParams.id
  const fornecedorEditado = fornecedores.find(item => item.id == id)

  function salvar(dados) {
    if (fornecedorEditado) {
      Object.assign(fornecedorEditado, dados)
      localStorage.setItem('fornecedores', JSON.stringify(fornecedores))
    } else {
      dados.id = v4()
      fornecedores.push(dados)
      localStorage.setItem('fornecedores', JSON.stringify(fornecedores))
    }
    alert("Fornecedor salvo com sucesso!")
    router.push("/Fornecedores")
  }

  function adicionarFornecedoresExemplo() {
    const exemplos = [
      {
        id: v4(),
        nomeFornecedor: 'Distribuidora Solar Ltda',
        cnpj: '12345678000199',
        telefone: '1134567890',
        email: 'contato@distribuidorasolar.com',
        endereco: 'Rua das Palmeiras, 450, São Paulo, SP',
        representante: 'Maria Andrade',
        taxaEntrega: '10%',
        siteRedes: 'www.distribuidorasolar.com'
      },
      // Outros exemplos omitidos para brevidade
    ]
    const fornecedoresAtualizados = [...fornecedores, ...exemplos]
    localStorage.setItem('fornecedores', JSON.stringify(fornecedoresAtualizados))
  }

  useEffect(() => {
    if (fornecedores.length === 0) {
      adicionarFornecedoresExemplo()
    }
  }, [])

  const initialValues = {
    nomeFornecedor: '',
    cnpj: '',
    telefone: '',
    email: '',
    endereco: '',
    representante: '',
    taxaEntrega: '',
    siteRedes: ''
  }

  const validationSchema = Yup.object().shape({
    nomeFornecedor: Yup.string().required("Campo obrigatório"),
    cnpj: Yup.string().required("Campo obrigatório").matches(/^\d{14}$/, "CNPJ inválido"),
    telefone: Yup.string().required("Campo obrigatório").matches(/^\d+$/, "Telefone inválido"),
    email: Yup.string().required("Campo obrigatório").email("Email inválido"),
    endereco: Yup.string().required("Campo obrigatório"),
    representante: Yup.string().required("Campo obrigatório"),
    taxaEntrega: Yup.string().required("Campo obrigatório"),
    siteRedes: Yup.string().url("URL inválida").required("Campo obrigatório")
  })

  return (
    <Pagina titulo={"Cadastro de Fornecedor"}>
      <Formik
        initialValues={fornecedorEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Nome do Fornecedor:</Form.Label>
                  <Form.Control
                    name='nomeFornecedor'
                    type='text'
                    value={values.nomeFornecedor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.nomeFornecedor && !errors.nomeFornecedor}
                    isInvalid={touched.nomeFornecedor && errors.nomeFornecedor}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.nomeFornecedor}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>CNPJ:</Form.Label>
                  <Form.Control as={ReactInputMask}
                    name='cnpj'
                    type='text'
                    mask={'99.999.999/9999-99'}
                    placeholder={'99.999.999/9999-99'}
                    value={values.cnpj}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.cnpj && !errors.cnpj}
                    isInvalid={touched.cnpj && errors.cnpj}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.cnpj}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Telefone:</Form.Label>
                  <Form.Control
                    name='telefone'
                    type='text'
                    value={values.telefone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.telefone && !errors.telefone}
                    isInvalid={touched.telefone && errors.telefone}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    name='email'
                    type='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.email && !errors.email}
                    isInvalid={touched.email && errors.email}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Endereço:</Form.Label>
                  <Form.Control
                    name='endereco'
                    type='text'
                    value={values.endereco}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.endereco && !errors.endereco}
                    isInvalid={touched.endereco && errors.endereco}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.endereco}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Representante:</Form.Label>
                  <Form.Control
                    name='representante'
                    type='text'
                    value={values.representante}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.representante && !errors.representante}
                    isInvalid={touched.representante && errors.representante}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.representante}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Taxa de Entrega:</Form.Label>
                  <Form.Control
                    name='taxaEntrega'
                    type='text'
                    value={values.taxaEntrega}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.taxaEntrega && !errors.taxaEntrega}
                    isInvalid={touched.taxaEntrega && errors.taxaEntrega}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.taxaEntrega}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Site/Redes Sociais:</Form.Label>
                  <Form.Control
                    name='siteRedes'
                    type='text'
                    value={values.siteRedes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.siteRedes && !errors.siteRedes}
                    isInvalid={touched.siteRedes && errors.siteRedes}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.siteRedes}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group className='text-end'>
                <Button className='me-2' href='/Fornecedores'><FaArrowLeft /> Voltar</Button>
                <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
              </Form.Group>
            </Form>
          )
        }}
      </Formik>
    </Pagina>
  )
}
