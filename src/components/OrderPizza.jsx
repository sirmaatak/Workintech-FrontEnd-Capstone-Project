import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  Label,
  Input,
  Button,
  ButtonGroup,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function OrderPizza(props) {
  const malzemeListesi = [
    "Pepperoni",
    "Domates",
    "Biber",
    "Sosis",
    "Misir",
    "Sucuk",
    "Kanada Jambonu",
    "Ananas",
    "Tavuk Izgara",
    "Jalepeno",
    "Kabak",
    "Sogan",
    "Sarimsak",
  ];
  const [sayac, setSayac] = useState(1);
  return (
    <Form>
      <h3>Position Absolute Aci Pizza</h3>
      <h4>Fiyat Bilgisi Buraya Gelecek</h4>
      <Card>
        <CardBody>
          FrontEnd Dev olarak hala position:absolute kullaniyorsan bu cok aci
          pizza tam sana gore. Pizza,domates,peynir ve genellikle cesitli diger
          malzemelerle kaplanmis,daha sonra geleneksel olarak odun atesinde bir
          firinda yuksek sicaklikta pisirilen,genellikle yuvarlak,
          duzlestirilmis mayali bugday bazli hamurdan olusan Italyan kokenli
          lezzetli bir yemektir.. Kucuk bir pizzaya bazen pizzetta denir.
        </CardBody>
      </Card>
      <Row>
        <Col md={6}>
          <FormGroup>
            <legend>Boyut Sec*</legend>
            <FormGroup>
              <Input name="radio-kucuk" id="radio-kucuk" type="radio" />{" "}
              <Label for="radio-kucuk" check>
                Kucuk
              </Label>
            </FormGroup>
            <FormGroup>
              <Input name="radio-orta" id="radio-orta" type="radio" />{" "}
              <Label for="radio-orta" check>
                Orta
              </Label>
            </FormGroup>
            <FormGroup>
              <Input id="radio-buyuk" name="radio-buyuk" type="radio" />{" "}
              <Label for="radio-buyuk" check>
                Buyuk
              </Label>
            </FormGroup>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="hamurSelect">Hamur Sec*</Label>
            <Input id="hamurSelect" name="select" type="select">
              <option>Kalin</option>
              <option>Normal</option>
              <option>Ince</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup check>
        <Label>
          <legend>Ek Malzemeler</legend>
          <label>En fazla 10 malzeme secebilirsiniz. 5TL</label>
        </Label>
        <Row md={3}>
          {malzemeListesi.map((item, index) => {
            return (
              <FormGroup key={index}>
                <Input type="checkbox" id={`${item}`} />
                <Label for="checkbox" check>
                  {item}
                </Label>
              </FormGroup>
            );
          })}
        </Row>
      </FormGroup>
      <FormGroup>
        <legend>Ad Soyad</legend>
        <Input
          id="fullname"
          name="fullname"
          placeholder="Ad Soyad bilgisi yaziniz"
        />
      </FormGroup>
      <FormGroup>
        <legend>Siparis Notu</legend>
        <Input
          id="not"
          name="not"
          placeholder="Siparisine eklemek istedigin not var mi ?"
        />
      </FormGroup>
      <Row md={2}>
        <ButtonGroup>
          <div class="flex-container">
            <Button color="warning">-</Button>
            <Label color="warning">{sayac}</Label>
            <Button color="warning">+</Button>
          </div>
        </ButtonGroup>
        <Card
          style={{
            width: "18rem",
          }}
        >
          <CardBody>
            <CardTitle tag="h5">Siparis Toplami</CardTitle>
            <CardText>Secimler : Malzeme secimleri fiyati buraya</CardText>
            <CardText>Toplam : Toplam fiyati buraya</CardText>
            <Button color="warning" block="true">
              Siparis Ver
            </Button>
          </CardBody>
        </Card>
      </Row>
    </Form>
  );
}

export default OrderPizza;
