import './WorkingArea.sass';
import List from '../list/List.tsx';
import Statistics from '../statistics/Statistics.tsx';
import Calculator from '../calculator/Calculator.tsx';

const WorkingArea = ({getBool}: any) => {
    return (
        <div className="working-area">
          <List changeBool={getBool}/>
          <Statistics />
          <Calculator />
        </div>
    );
};
  
export default WorkingArea;
