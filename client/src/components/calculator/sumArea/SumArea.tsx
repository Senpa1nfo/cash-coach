import './SumArea.sass';

import { useState, useRef } from 'react';

function SumArea() {
  const [amount, setAmount] = useState(0);
  const [percent, setPercent] = useState(0);
  const [period, setPeriod] = useState(1);

  const handleAmountChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    const newValue = value > 900000 ? 900000 : value;
    setAmount(newValue);
  }

  const handlePercentChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    const newValue = value > 100 ? 100 : value;
    setPercent(newValue);
    }

  const handlePeriodChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    const newValue = value > 35000 ? 35000 : value;
    setPeriod(newValue);
    }

  const rightWordEnding = (number:number, text: string[], cases = [2, 0, 1, 1, 1, 2]) =>  text[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

  const outputRef = useRef<HTMLDivElement | null>(null);

  const handleCalculate = () => {
    if (!amount || amount <= 0) {
      alert('Введіть коректну суму!');
      return;
    }
    if (!period || period < 1) {
      alert('Введіть коректний період!');
      return;
    }

    let savings = amount * percent / 100;
    let sum = amount - savings;

    if (outputRef.current) {
      outputRef.current.innerHTML = '';
	  outputRef.current.innerHTML += `<div>`;
	  outputRef.current.innerHTML += `<h3>Результат</h3>`;
      outputRef.current.innerHTML += `<p>Заощадження: ${savings.toFixed(2)}</p>`;
      if(period === 1) {
        outputRef.current.innerHTML += `<p>Можна витратити за ${period} день: ${(sum/period).toFixed(2)}</p>`;
		outputRef.current.innerHTML += `</div>`;
      } else if (period > 1) {
        outputRef.current.innerHTML += `<p>За ${period} ${rightWordEnding(period, ['день', 'дні', 'днів'])} у день можна витрачати по: ${(sum/period).toFixed(2)}</p>`;
		outputRef.current.innerHTML += `</div>`;
      }
	  outputRef.current.innerHTML += `<div>`;
      outputRef.current.innerHTML += `<h3>До прикладу</h3>`;
      outputRef.current.innerHTML += `<p>На день з місяця можна витрачати по: ${(sum/30).toFixed(2)}</p>`;
      outputRef.current.innerHTML += `<p>На тиждень з місяця можна витрачати по: ${(sum/4).toFixed(2)}</p>`;
	  outputRef.current.innerHTML += `</div>`;
    }

  }
    
	return (
		<div>
			<h2 className='title'>Опрацювання суми</h2>
			<div className='wrapper'>
				<div className="process">
					<div className="process__item">
						<label data-tooltip='(Можна скопіювати з історії)'>Введіть суму:</label>
						<input type="number" step='1000' value={amount} min='0' max='900000' onChange={handleAmountChange} />
					</div>
					<div className="process__item">
						<label data-tooltip='Залиште певний відсоток на чорний день'>Введіть відсоток для заощадження:</label>
						<input type="number" step="1" value={percent} min='0' max='35000' onChange={handlePercentChange} />
					</div>
					<div className="process__item">
						<label data-tooltip='Період на який ви хочете розподілити цю суму'>Введіть термін у днях:</label>
						<input type="number" value={period} min='1' max='100' onChange={handlePeriodChange} />
					</div>
					<button onClick={handleCalculate}>Обрахувати</button>
				</div>
				<div className='result' ref={outputRef}><h3 style={{ marginTop: 150, fontSize: 22 }}>Результат з'явиться тут</h3></div>
			</div>
		</div>
	)
}    

export default SumArea;