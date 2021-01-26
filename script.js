let seuVotoPara = document.querySelector ('.d-1-1 span');
let cargo = document.querySelector ('.d-1-2 span');
let descricao = document.querySelector ('.d-1-4');
let aviso = document.querySelector ('.d-2');
let foto= document.querySelector ('.d-1-right');
let numeros = document.querySelector ('.d-1-3');

let etapasAtual=0;
let numero='';
let votoBranco= false;

function iniciarEtapa () {

  let numeroHtml= ''; 
  let etapa = etapas[etapasAtual];
   numero='';
  let votoBranco=false;

  for (let i=0; i<etapa.numeros; i++){

    if(i === 0){ 
        numeroHtml +=  '<div class="numero pisca"></div>';
    }
       else {
        numeroHtml +=  '<div class="numero"></div>';
    }
 }
  seuVotoPara.style.display='none';
  cargo.innerHTML= etapa.titulo;
  descricao.innerHTML='';
  aviso.style.display='none';
  numeros.innerHTML= numeroHtml;
  foto.innerHTML='';
}

function atualizaInterface (){
    let etapa= etapas[etapasAtual];
    let candidato = etapa.candidatos.filter ((item)=>{ 
        if (item.numero===numero){
           return true;

        }else {
           return false;
        }
     })
    if(candidato.length>0){
        candidato=candidato[0];
        seuVotoPara.style.display='block';
        aviso.style.display='block';
        descricao.innerHTML= `Nome: ${candidato.nome}</br> Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for (let i in candidato.fotos){
            fotosHtml+= `<div class="d-1-image"><img src="src/img/${candidato.fotos[i].url }" />
            ${candidato.fotos[i].legenda }</div>`;
        }
        foto.innerHTML=fotosHtml;
        

    
    }else{
        seuVotoPara.style.display='block';
        aviso.style.display='block';
        descricao.innerHTML ='<div class = "aviso--grande pisca">VOTO NULO </div>';
    }
}

function clicou (n){
let elNumero = document.querySelector ('.numero.pisca');
if (elNumero !== null){
    elNumero.innerHTML=n;
    numero= `${numero}${n}`;
    
    elNumero.classList.remove('pisca');
    if (elNumero.nextElementSibling!==null){

        elNumero.nextElementSibling.classList.add('pisca');

     } else {
         atualizaInterface();
     }
    
}
}


function branco(){
    numero='';
    votoBranco=true;
    numeros.innerHTML='';
    descricao.innerHTML ='<div class = "aviso--grande pisca">VOTO EM BRANCO </div>';
    foto.innerHTML='';
    aviso.style.display='block';
    seuVotoPara.style.display='block';
}
function corrige(){
    iniciarEtapa();
}
function confirma(){
    let etapa=etapas[etapasAtual];
    let votoConfirmado= false;

    if(votoBranco===true){
        votoConfirmado=true;
        console.log("confirmando como voto em branco");
        

    }else if (numero.length===etapa.numeros){
        votoConfirmado=true;
        console.log("Voto confirmado para o numero: "+numero);
    }
    if (votoConfirmado){
        etapasAtual++;
        if(etapas[etapasAtual] !== undefined){
            iniciarEtapa();
        } else {
            console.log("FIM");
        }

    }
}

iniciarEtapa();