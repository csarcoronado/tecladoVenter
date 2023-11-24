import { useState } from 'react'
import { useEffect } from 'react';
import Dragger from '../helpers/Dragger'
import { FiDelete,FiChevronUp, FiChevronDown, FiArrowDown, FiArrowUp } from "react-icons/fi";
import {IoCloseSharp} from "react-icons/io5"
import './tecla.css'
import { TbLetterCaseUpper } from "react-icons/tb";
import { GoNumber } from "react-icons/go";
import { AiOutlineEnter } from "react-icons/ai";
import { BorraIma } from '../interface/interfaceTabla';

interface VirtualKeyboardProps{
    setInput: React.Dispatch<React.SetStateAction<string>>;
    onClose: () => void;
    activeInput: string;
    searchText: string;
    isFieldSelected: boolean;
    handleTecladoInput: (key: string) => void;
    id: string;
    InputValues: string;
    setInputValues: React.Dispatch<React.SetStateAction<InputValues>>;
    input: string;
    imageData: string;
    addData: () => void;
    handleSearch: (e: React.FormEvent) => void
}

export const VirtualKeyboard = ({ setInput, onClose, activeInput, id, setInputValues, input, addData, handleSearch}: VirtualKeyboardProps) => {
    Dragger('teclado')

    const [imageData, setImageData] = useState<BorraIma[]>([]);
    const [tecladoVisible, setTecladoVisible] = useState(false);
    const [keyboardPosition, setKeyboardPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [tecladoLetrasVisible, setTecladoLetrasVisible] = useState(true);
    const [savedBox, setSavedBox] = useState('');
    const [isUppercase, setIsUppercase] = useState(true);
    const [mostrarBox, setMostrarBox] = useState(false);
    const [mostrarBox1, setMostrarBox1] = useState(true);
    const [searchInput, setSearchInput] = useState<string>('');
    const [activeBox, setActiveBox] = useState<string | null>(null);
    const [originalData, setOriginalData] = useState<BorraIma[]>([]);
    const [formData, setFormData] = useState<BorraIma>({name:'', precio: ''});

    const handleIncrement = (amount: number) => {
        setInput((prevInput) => {
          const currentInput = parseFloat(prevInput) || 0;
          const result = currentInput + amount;
          const newInput = result.toString();
          console.log(newInput); // Imprime el valor actual de input
          return newInput;
        });
      };

      const handleBackspace = () => {
        setInput((prevInput) => prevInput.slice(0,-1));
    };


      const handleMouseDown = (e) => {
        setIsDragging(true);
      };
    
      const handleMouseMove = (e) => {
        if (isDragging) {
          setKeyboardPosition((prevPosition) => ({
            x: prevPosition.x + (e.pageX - prevPosition.x),
            y: prevPosition.y + (e.pageY - prevPosition.y),
          }));
        }
      };
    
      const handleMouseUp = () => {
        setIsDragging(false);
      };
    
      useEffect(() => {
        // Agregar los manejadores de eventos al documento completo
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    
        // Limpiar los manejadores al desmontar el componente
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
      }, [handleMouseMove, handleMouseUp]);

      const closeTeclado = () => {
        setTecladoVisible(false);
      };

      const handleIncrementOne = () => {
        setInput((prevInput) => {
          const currentInput = parseFloat(prevInput) || 0;
          const result = currentInput + 1;
          const newInput = result.toString();
          console.log(newInput); // Imprime el valor actual de input
          return newInput;
        });
      };

      const handleDecrementOne = () => {
        setInput((prevInput) => {
          const currentInput = parseFloat(prevInput) || 0;
          const result = currentInput - 1;
          const newInput = result.toString();
          console.log(newInput); // Imprime el valor actual de input
          return newInput;
        });
      };

      const handleClearInput = () => {
        setInput('');
      };

      const handleEnterKeyPress = () => {
        closeTeclado();
      };

      const handleSpacePress = () =>{
        setInput((prevInput) => prevInput + ' ');
        
      }

      const handleToggleCase = () => {
        setIsUppercase((prev) => !prev);
        setTecladoLetrasVisible((prev) => !prev);
      };

      const handleKeyClick = (key: string) => {
        // Actualiza el contenido del input solo si el input activo es 'cantidad'
        const adjustedKey = isUppercase ? key.toUpperCase() : key.toLowerCase();
        setInput((prevInput) => prevInput + adjustedKey);
      };
      
      const handleSaveBox = () => {
        // Puedes guardar la información actual en el estado del componente
        
      
        setSavedBox('Información a guardar'); // Cambia esto con la información que deseas guardar
      };

      const toggleBox = () => {
        setMostrarBox(!mostrarBox);
      };

      const cambiarBox = () => {
        setMostrarBox1(!mostrarBox1);
      };


      const clearInput = () => {
        setSearchInput('');
      };
    
      const handleBoxOpen = (boxType: string) => {
        setActiveBox(boxType);
      };

    return (
        <div
        className={`virtual-keyboard ${tecladoVisible ? 'seleccionado' : ''}`}
        style={{
          position: 'absolute',
          left: keyboardPosition.x,
          top: keyboardPosition.y,
          cursor: isDragging ? 'grabbing' : 'grab',
          display: activeInput ? 'block' : 'none', // Agregado: Mostrar solo si hay un input activo
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
        id="teclado"
        className={`bg-white teclado container-teclado ${
          tecladoVisible ? 'teclado-open' : 'teclado-closed'
        }`}
      ></div>
      
      {mostrarBox1 ? (
        
        <div id='teclado' className={`bg-white teclado container-teclado ${tecladoVisible ? 'teclado-open' : 'teclado-closed'}`}>
        <button className='btn text-danger buttonXe teclado-styles' onClick={onClose}><IoCloseSharp/></button>{}
            <div className="box containerT">
            
                <div>
                    <button className='btn buttonN teclado-styles'  onClick={() =>handleIncrement(10)}>10</button>
                    <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyClick('7', id)}>7</button>
                    <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyClick('8', id)}>8</button>
                    <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyClick('9', id)}>9</button>
                    <button className='btn text-danger buttonT teclado-styles'  onClick={handleBackspace}><FiDelete/></button>
                    <button className='btn buttonT teclado-styles' onClick={handleIncrementOne}><FiChevronUp/></button>
                </div>

                <div>
                    <button className='btn buttonN teclado-styles'  onClick={() =>handleIncrement(20)}>20</button>
                    <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyClick('4', id)}>4</button>
                    <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyClick('5', id)}>5</button>
                    <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyClick('6', id)}>6</button>
                    <button className='btn text-danger buttonT teclado-styles'  onClick={handleClearInput}>C</button>
                    <button className='btn buttonT teclado-styles' onClick={handleDecrementOne}><FiChevronDown/></button>
                </div>

                <div>
                    <button className='btn buttonN teclado-styles'  onClick={() =>handleIncrement(50)}>50</button>
                    <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyClick('1', id)}>1</button>
                    <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyClick('2', id)}>2</button>
                    <button className='btn buttonT teclado-styles'  onClick={() =>handleKeyClick('3', id)}>3</button>
                    <button className='btn buttonT' onClick={cambiarBox}><TbLetterCaseUpper/></button>
                    <button className='btn buttonT teclado-styles'  onClick={handleSearch}><AiOutlineEnter/></button>
                </div>

                <div>
                    <button className='btn buttonCn teclado-styles'  onClick={() =>handleIncrement(100)}>100</button>
                    <button className='btn buttonC teclado-styles'  onClick={() =>handleKeyClick('0', id)}>0</button>
                    <button className='btn buttonP teclado-styles'  onClick={() =>handleKeyClick('.')}>.</button>
                </div>
                
            </div>
           

       

        </div> 
        ) : (
        <div className={`box containerTc ${tecladoLetrasVisible ? 'teclado-letras-visible' : ''}`}>
          <div><button className='btn text-danger buttonXel teclado-styles' onClick={onClose}><IoCloseSharp/></button></div>
    <div>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('Q', id)}>Q</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('W', id)}>W</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('E', id)}>E</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('R', id)}>R</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('T', id)}>T</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('Y', id)}>Y</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('U', id)}>U</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('I', id)}>I</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('O', id)}>O</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('P', id)}>P</button>
        
    </div>

    <div>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('A', id)}>A</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('S', id)}>S</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('D', id)}>D</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('F', id)}>F</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('G', id)}>G</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('H', id)}>H</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('J', id)}>J</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('K', id)}>K</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('L', id)}>L</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('Ñ', id)}>Ñ</button>
    </div>

    <div>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('Z', id)}>Z</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('X', id)}>X</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('C', id)}>C</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('V', id)}>V</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('B', id)}>B</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('N', id)}>N</button>
        <button className='btn buttonL teclado-styles'  onClick={() =>handleKeyClick('M', id)}>M</button>
        <button className='btn buttonL teclado-styles'  onClick={handleSearch}><AiOutlineEnter/></button>
        <button className='btn text-danger buttonL teclado-styles'  onClick={handleBackspace}><FiDelete/></button>
        <button className='btn text-danger buttonL teclado-styles'  onClick={handleClearInput}>C</button>
        <button className='btn buttonSE teclado-styles'  onClick={handleSpacePress}>_____</button>
        <button className='btn buttonE' onClick={cambiarBox}><GoNumber/></button>
        

    </div>

    <div>
        
    </div>
    </div>)}
        </div> 

        
    ) 
} 
export default VirtualKeyboard