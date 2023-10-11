import { switchButtons } from '../menu/Menu.tsx';
import './Statistics.sass';
import Chart from './chart/Chart.tsx';
import { useContext, useEffect, useState } from 'react';
import { ListItem } from '../../models/ListItem.ts';
import {Context} from "../../main.tsx";
const Statistics = () => {

    const [items, setItems] = useState<Array<ListItem>>([]);
    const {store} = useContext(Context);
    
    useEffect(() => {
        async function fetchData() {
            const res = await store.generate_list();
            setItems(res);
        }
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const calculateTotal = (duration: string, type: boolean) => {
        let total = 0;
        const today = new Date();
        const startDate = new Date(today);

        switch (duration) {
            case 'day':
                startDate.setDate(startDate.getDate() - 1);
                break;
            case 'week':
                startDate.setDate(startDate.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(startDate.getMonth() - 1);
                break;
            case 'year':
                startDate.setFullYear(startDate.getFullYear() - 1);
                break;
            default:
                startDate.setFullYear(0);
        }

        const filteredItems = items.filter(item => {
            const itemDate = new Date(item.timeAdded);
            return itemDate >= startDate && itemDate <= today;
        });

        filteredItems.forEach(item => {
            if (item.bool === type) {
                total += Number(item.value);
            }
        });

        return total;
    };

    const btnsContent: any[] = [
        '.stats-day',
        '.stats-week',
        '.stats-month',
        '.stats-year',
        '.stats-general',
    ];

    return (
        <div>
            <div className="stats none">
                <button className="stats__btn stats__btn__active" onClick={() => {switchButtons(1, btnsContent, '.stats__btn', 'stats__btn__active')}}>За день</button>
                <button className="stats__btn" onClick={() => {switchButtons(2, btnsContent, '.stats__btn', 'stats__btn__active')}}>За тиждень</button>
                <button className="stats__btn" onClick={() => {switchButtons(3, btnsContent, '.stats__btn', 'stats__btn__active')}}>За місяць</button>
                <button className="stats__btn" onClick={() => {switchButtons(4, btnsContent, '.stats__btn', 'stats__btn__active')}}>За рік</button>
                <button className="stats__btn" onClick={() => {switchButtons(5, btnsContent, '.stats__btn', 'stats__btn__active')}}>За весь час</button>
            </div>
            <div className="stats-day none">
                <Chart
                    labels={["Статистика витрат"]}
                    datasets={[
                        {
                            label: "Витрати",
                            data: [calculateTotal('day', false)],
                            borderColor: "rgb(251, 63, 12)",
                            backgroundColor: "rgba(251, 63, 12, 0.4)",
                        },
                        {
                            label: "Доходи",
                            data: [calculateTotal('day', true)],
                            borderColor: "rgb(53, 235, 96)",
                            backgroundColor: "rgba(53, 235, 96, 0.4)",
                        },
                    ]}
                />
            </div>
            <div className="stats-week none">
                <Chart 
                labels={["Статистика витрат"]}
                datasets={[
                    {
                        label: "Витрати",
                        data: [calculateTotal('week', false)],
                        borderColor: "rgb(251, 63, 12)",
                        backgroundColor: "rgba(251, 63, 12, 0.4)",
                    },
                    {
                        label: "Доходи",
                        data: [calculateTotal('week', true)],
                        borderColor: "rgb(53, 235, 96)",
                        backgroundColor: "rgba(53, 235, 96, 0.4)",
                    },
                ]}
            />
        </div>
        <div className="stats-month none">
            <Chart
                labels={["Статистика витрат"]}
                datasets={[{
                        label: "Витрати", 
                        data: [calculateTotal('month', false)],
                        borderColor: "rgb(251, 63, 12)",
                        backgroundColor: "rgba(251, 63, 12, 0.4)",
                    },
                    {
                        label: "Доходи",
                        data: [calculateTotal('month', true)],
                        borderColor: "rgb(53, 235, 96)",
                        backgroundColor: "rgba(53, 235, 96, 0.4)",
                    },
                ]}
            />
        </div>
        <div className="stats-year none">
            <Chart
                labels={["Статистика витрат"]}
                datasets={[
                    {
                        label: "Витрати",  
                        data: [calculateTotal('year', false)],
                        borderColor: "rgb(251, 63, 12)",
                        backgroundColor: "rgba(251, 63, 12, 0.4)",
                    },
                    {
                        label: "Доходи",
                        data: [calculateTotal('year', true)],
                        borderColor: "rgb(53, 235, 96)",
                        backgroundColor: "rgba(53, 235, 96, 0.4)",
                    },
                ]}
            />
        </div>
        <div className="stats-general none">
            <Chart
                labels={["Статистика витрат"]}
                datasets={[
                    {
                        label: "Витрати",
                        data: [calculateTotal('', false)],
                        borderColor: "rgb(251, 63, 12)",
                        backgroundColor: "rgba(251, 63, 12, 0.4)",
                    },
                    {
                        label: "Доходи",
                        data: [calculateTotal('', true)],
                        borderColor: "rgb(53, 235, 96)",
                        backgroundColor: "rgba(53, 235, 96, 0.4)",
                    },
                ]}
            />
        </div>
    </div>
    );
};

export default Statistics;
