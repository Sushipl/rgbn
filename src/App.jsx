import { useEffect, useState } from 'react'
import styled, { ThemeProvider ,  createGlobalStyle } from "styled-components";
import copy from "copy-to-clipboard"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CSSReset = createGlobalStyle`
  body{
    margin: 0 auto;
  }
`

const Mod = styled.div`

  input[type=checkbox] {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  label{
    -webkit-appearance: push-button;
    -moz-appearance: button; 
    position: absolute;
    top: 1%; right: 1%;
    cursor: pointer;
    background-color: rgba(250, 250, 250, 0.5);
    width: 30px;
    height: 30px;
    border-radius: 30px;
    .i {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
    }    
  }

  div.modf {
    text-align: center;
    left: 0; right: 0;
    display: none;
    flex-direction: column;
  }

  div.linha {
    flex-direction: row;
    left: 0; right: 0;
    margin-top: 4%;
    display: inline-block;
  }

  /* Toggled State */
  input[type=checkbox]:checked ~ div.modf {
    animation: fadeIn 1s linear;
    display: flex;
    position: absolute;

    background-color: rgba(250, 250, 250, 0.5);

    border-radius: 20px;
    margin-left: auto;
    margin-right: auto;
    top: 36%;
    height: 40%;
    max-width: 100%;
    width: 400px;
  }

  input[type=text] {
    width: 60%;
  }

  input[type=number] {
    width: 20%;
  }

  input[type=color]{
    width: 20%;
    display: inline-block;
  }

  @keyframes fadeIn{
    from {opacity: 0}
    to {opacity: 1}
  }
` 

const RGB = styled.div`

    width: 100%;
    height: 100vh; 
    
    background-image: ${({theme}) => {
      return(`linear-gradient(${theme.BDeg}deg,${theme.BColor})`)
    }};

    display: flex;

    align-items: center;

    input {
      background-color: #d1bff2f1;
      border-width: 1px;
      border-radius: 20px;
      margin-top: 4px;
    }

    select {
      background-color: #d1bff2f1;
      border-width: 1px;
      border-radius: 20px;
    }

    button {
      background-color: #d1bff2f1;
      border-width: 1px;
      border-radius: 20px;
    }

    .text{
      -webkit-text-fill-color: transparent;
      background-image: ${({theme}) => {
        return(`linear-gradient(${theme.TDeg}deg,${theme.TColor})`)
      }};
      background-clip: text;
      font-family: 'Pacifico', cursive;
      text-align: center;
      -webkit-background-clip: text;
      font-weight: 700;
      margin-left: auto;
      margin-right: auto;
      font-size: ${({theme}) => {
        return(theme.Tam+theme.UniMed)
      }};
      
    }
`

function App() {

  const [TColorInps, setTColorInps] = useState([])
  const [BColorInps, setBColorInps] = useState([])
  const [Ele, setEle] = useState({TDeg: "90",TColor: ["#ff3322","#55f555","#dd33ff"],BDeg: "180",BColor:["#ffff82","#4411ff","#dd3377"],Text: "Bom dia! ♥",Tam:"48", UniMed:"px", QuantTColors: 3, QuantBColors: 3})
  const uniMedChoices = ['px', 'em', 'vh']
  
  // Mudar variáveis
  const handleChange = (e, valuer=e.target.value) => {
    const name = e.target.name
    const value = valuer
    setEle({...Ele, [name]: value})
  }

  // Mudar cores
  const ChangeColors = (e) => {
    var value = e.target.value
    var nvar = e.target.name.substr(0, 6)
    var num = Number(e.target.name.substr(6, 7))
    var n = Ele[nvar]
    n[num] = value
    setEle({...Ele, [nvar]: n})
  }

  //adicionar input de cores do fundo
  useEffect(() => {
    var inps = []
    for(let i = 0; i < Ele.QuantBColors; i++){
      inps.push(<input onChange={(e) => {ChangeColors(e)}} type="color" name={'BColor'+i} key={'BColor'+i} defaultValue={Ele.BColor[i]}/>)
    }

    setBColorInps(inps)
  }, [Ele])


  //adicionar input de cores do texto
  useEffect(() => {
    var inps = []
    for(let i = 0; i < Ele.QuantTColors; i++){
      inps.push(<input onChange={(e) => {ChangeColors(e)}} type="color" name={'TColor'+i} key={'TColor'+i} defaultValue={Ele.TColor[i]}/>)
    }
    setTColorInps(inps)
  }, [Ele])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    var ele = Ele
    if(urlParams.has('TDeg')){
      ele.TDeg = urlParams.get('TDeg')
    }
    if(urlParams.has('TColor')){
      ele.TColor = urlParams.get('TColor').split(',')
    }
    if(urlParams.has("BDeg")){
      ele.BDeg = urlParams.get("BDeg")
    }
    if(urlParams.has('BColor')){
      ele.BColor = urlParams.get('BColor').split(',')
    }
    if(urlParams.has("Text")){
      ele.Text = urlParams.get('Text')
    }
    if(urlParams.has("Tam")){
      ele.Tam = urlParams.get('Tam')
    }
    if(urlParams.has("UniMed")){
      ele.UniMed = urlParams.get('UniMed')
    }
    if(urlParams.has("QuantTColors")){
      ele.QuantTColors = urlParams.get('QuantTColors')
    }
    if(urlParams.has("QuantBColors")){
      ele.QuantBColors = urlParams.get('QuantBColors')
    }
    setEle(ele)
  }, [])

  return (
    <ThemeProvider theme={Ele}>
      <CSSReset />
      <RGB>
        <span className='text'>{Ele.Text}</span>
        <Mod>
          <label htmlFor="toggle-1">
            <span className="i">i</span>
          </label>
          <input type='checkbox' id='toggle-1'/>
            <div className="modf">
              <label htmlFor="toggle-1">
                <span className="i">X</span>
              </label>
              <div className="linha">
                <input onChange={(e) => {handleChange(e)}} name="Tam" type="number" value={Ele.Tam}/>
                <select onChange={(e) => {handleChange(e)}} name="UniMed" value={Ele.UniMed}>{uniMedChoices.map((ele, index) => {return (<option key={index} value={ele}>{ele}</option>)})}</select>
                <br/>
                <input onChange={(e) => {handleChange(e)}} name="Text" type="text" value={Ele.Text}/>
                <br/>
                <br />
                <input onChange={(e) => {handleChange(e)}} name="TDeg" type="number" value={Ele.TDeg}/>º
                <br/>
                <input onChange={(e) => {handleChange(e, Number(e.target.value))}} name="QuantTColors" type="number" value={Ele.QuantTColors}/>
                {TColorInps}
                <br />
                <input onChange={(e) => {handleChange(e)}} name="BDeg" type="number" value={Ele.BDeg}/>º
                <br/>
                <input onChange={(e) => {handleChange(e, Number(e.target.value))}} name="QuantBColors" type="number" value={Ele.QuantBColors}/>
                {BColorInps}
                <br />
                <button onClick={() => {
                  var list = "?"
                  if(Ele.TDeg!=="90"){
                    list+=`TDeg=${Ele.TDeg}&`
                  }
                  if(Ele.TColor != ["#ff3322","#55f555","#dd33ff"]){
                    list+="TColor="
                    var vir = ","
                    for(var l in Ele.TColor){
                      if(l==Ele.TColor.length-1){
                        vir = ''
                      }
                      list+=`${Ele.TColor[l].replace("#","%23")+vir}`
                    }
                    list+="&"
                  }
                  if(Ele.BDeg!=="180"){
                    list+=`BDeg=${Ele.BDeg}&`
                  }
                  if(Ele.BColor != ["#ffff82","#4411ff","#dd3377"]){
                    list+="BColor="
                    var vir = ","
                    for(var l in Ele.BColor){
                      if(l==Ele.BColor.length-1){
                        vir = ''
                      }
                      list+=`${Ele.BColor[l].replace("#","%23")+vir}`
                    }
                    list+="&"
                  }
                  if(Ele.Text !== "Bom dia! ♥"){
                    list+=`Text=${Ele.Text.replace(/ /gi, "%20")}&`
                  }
                  if(Ele.Tam !== "48"){
                    list+=`Tam=16&`
                  }
                  if(Ele.UniMed !== 'px'){
                    list+=`UniMed=${Ele.UniMed}&`
                  }
                  if(Ele.QuantTColors !== 3){
                    list+=`QuantTColors=${Ele.QuantTColors}&`
                  }
                  if(Ele.QuantBColors !== 3){
                    list+=`QuantBColors=${Ele.QuantBColors}&`
                  }
                  copy(`https://rgbn.vercel.app/${list}`)
                  toast.success("Link da página modificada copiada para área de transferência")
                }} type="button">Copiar</button>
              </div>
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="colored"
              />
            </div>

        </Mod>
      </RGB>
    </ThemeProvider>
  )
}

export default App
