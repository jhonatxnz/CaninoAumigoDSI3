import './Menu.css';

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
export default function Menu(props) {

  return (
    <div class="topnav" id="myTopnav">
      <div class="meio">
      <a href="#home" class="active">Home</a>
      <a href="#news">Adotar</a>
      <a href="#contact">Doar</a>
      <a href="#about">Postar</a>
      <a href="#about">Sobre nós</a>
      
        <a href="#about" class="adireita">Entrar</a>
        <a href="#about" class="adireita">Cadastrar-se</a>
      
      <a href="javascript:void(0);" class="icon" onClick={myFunction}>
        <i class="fa fa-bars"></i>
      </a>
      </div>
      
    </div>
  )
}