import React, { Component } from 'react';
import { Navbar,Input,Button,Row,InputGroup,InputGroupAddon,Container,Col,Form,Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Spinner} from 'reactstrap';
import { MdSearch } from 'react-icons/md';
import axios from 'axios';
import {Link} from 'react-router-dom'
class Home extends Component{
    state = {
        carregando: false,
        meteoro: []
    }
    meteoro = async (evento) => {
        evento.preventDefault()
        this.setState({carregando: true})
        const form = evento.target
        const inputGroup = form.children[0]
        const input = inputGroup.children[0]
        // const { seguidores: data } = await axios(`https://api.github.com/users/${input.value}/followers`);
        // const seguidores = await axios(`https://api.github.com/users/${input.value}/followers`);
        const meteoro = await axios(`https://api.nasa.gov/planetary/apod?date=${input.value}&api_key=mvijtPeOy1eA4OdnUTlRt3kKRYkJdjgXhHcOVWwM`)
    
        // this.setState({ seguidores })
        this.setState({meteoro: [meteoro.data, ...this.state.meteoro],carregando: false})
}
    render(){
        return (
        
            <>
            <Navbar color="dark">
                    <Container className="d-flex justify-content-center">
        
                         <img className="rounded-circle border border-white ml-3" width="50"
                         src="https://www.thispersondoesnotexist.com/image" alt="pessoa aleatoria"/>

                         <span className="text-white">
                             Logado como
                             <Link className="text-white font-weight-bold" to="/">

                             {this.props.match.params.usuario}
                             </Link>
                         </span>
                         

                         
                         </Container>
            </Navbar>
            
             <Navbar color="dark" fixed="bottom">
                 <Container className="d-flex justify-content-center">
                     <Col xs="12" md="6">
                         <Form onSubmit={this.meteoro}>
                             <InputGroup>
                             <Input type="date"/>
                             <InputGroupAddon addonType="append">
                                 <Button color="danger">{ this.state.carregando ? ( <Spinner size="sm" color="light"/> ) : (<MdSearch size="20"/>)} </Button>
                             </InputGroupAddon>
                             </InputGroup>
                         </Form>
                     </Col>
                 </Container>
             </Navbar>
           
                {this.state.carregando ? (
                <Container className="h-100 d-flex justify-content-center align-items-center">
                    <Spinner color="dark" size="lg"/>
                    <span> Carregando ...</span>
                </Container>
                ) : (
                    <Container className="mt-3 mb-5">
                      <Row>
             { this.state.meteoro.map((meteoro)=>(
                  <Col className="d-flex mb-3" xs="12" md="4">
                  <Card color="dark" className="text-white">
                  <CardImg top width="100%" height="30%" src={meteoro.url} alt={meteoro.title} />
                  <CardBody>
                    <CardTitle className="h3 text-center">{meteoro.title}</CardTitle>
                    <CardSubtitle className="text-muted text-center">{meteoro.date.split('-').reverse().join('/')}</CardSubtitle>
             <CardText className="text-justify">{meteoro.explanation}</CardText>
                  </CardBody>
                </Card>
                </Col>
             ))}
             </Row>
                </Container>
             )} 

                {this.state.meteoro.length === 0 &&(
                    <div className="d-flex justify-content-center align-items-center p-3">
                    <h1>Galáxia em um click</h1>
                    </div>
                    
                )}
                {/* {this.state.carregando && (
                <Container className="h-100 d-flex justify-content-center align-items-center">
                    <Spinner color="dark" size="lg"/>
                    <span> Carregando ...</span>
                </Container>)} */}
            </>
        )
    }
}
export default Home;