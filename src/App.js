import './App.css';
import { useEffect, useState, useRef } from 'react';

function App() {

  const [expression, setExpression] = useState('')
  const [answer,setAnswer] = useState(null)
  const expressionRef = useRef(expression)

  const calKey = ['C','Del','!','/',7,8,9,'*',4,5,6,'-',1,2,3,'+','%',0,'.','=']
  const operator = /[/+\-/*///!/%]/
  const operators = /[/+\-/*///!/%]/g

  useEffect(() => {
    expressionRef.current = expression
  }, [expression])

  function roundNumber(num, decimalPlaces = 8) {
    const factor = 10 ** decimalPlaces;
    return Math.round(num * factor) / factor;
  }

  const calVal = (val) => {
    let arr = expressionRef.current.split(operator)
    let symbols = expressionRef.current.match(operators) || []
    switch (val) {
        case 'C':
            setExpression('')
            setAnswer(null)
            break
        case 'Del':
            setExpression(prev => prev.slice(0, -1))
            setAnswer(null)
            break
        case '=':
            switch(symbols[0]) {
              case '+':
                setAnswer(roundNumber(Number(arr[0]) + Number(arr[1])))
                break
              case '-':
                setAnswer(roundNumber(arr[0] - arr[1]))
                break
              case '*':
                setAnswer(roundNumber(arr[0] * arr[1]))
                break
              case '/':
                setAnswer(roundNumber(arr[0] / arr[1]))
                break
              case '!':
                let sumup = 1
                for(let i=1;i<=arr[0];i++)            
                    sumup*=i
                setAnswer(roundNumber(sumup))
                break
              case '%':
                setAnswer(roundNumber(arr[0]/100))
                break
              default:
                console.log("Calval")
            }
            break
        default:
            let temp = (expressionRef.current + val).match(operators) || []
            if (temp.length <= 1 && !expressionRef.current.includes('!') && !expressionRef.current.includes('%')) {
                setExpression( prevExpression => prevExpression + val )
            }
            break
    }
  }

  useEffect(() => {
    const keyDownEvent = (e) => {
      switch(e.key) {
        case 'Delete':
          calVal('C');
          break
        case 'Backspace':
          calVal('Del');
          break
        case '+':
          calVal('+')
          break
        case '-':
          calVal('-')
          break
        case '/':
          calVal('/')
          break
        case '!':
          calVal('!')
          break
        case '*':
          calVal('*')
          break
        case '.':
          calVal('.')
          break
        case '%':
          calVal('%')
          break
        case 'Enter':
          calVal('=')
          break
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          calVal(e.key)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown',keyDownEvent)

    return(() => {
      window.removeEventListener('keydown',keyDownEvent)
    })
    
  },[])

  return (
    <>
    <section className='h-screen flex justify-center items-center bg-[#E1E1DA] text-[#092337] inter select-none'> 
      <div className='w-full h-full flex flex-col p-1'>
          <div className='w-full h-2/6 p-2 pt-0 flex flex-col justify-evenly md:border-b-2 md:border-b-[#E7D5A7]'>
            <div className='h-fit w-full flex justify-end'><p className='w-fit font-resize-1 pr-2 font-light overflow-x-auto text-nowrap'>{expression}</p></div>
            <div className='h-fit w-full flex justify-end'><p className='w-fit font-resize-2 pr-2 font-bold overflow-x-auto'>{answer}</p></div>
          </div>
          <div className='grid grid-cols-4 place-items-center text-center h-4/6 items-center font-semibold font-resize-3'>
            {calKey.map((val,i) => {return <p key={i} className='w-fit cursor-pointer px-8 p-2 bg-[#E7D5A7] md:bg-[#E1E1DA] rounded-full' onClick={() => calVal(val)}>{val}</p>})}
          </div>
      </div>
    </section>
    </>
  );
}

export default App;
