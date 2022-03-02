import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chart } from 'react-charts'



// Crypto
// crypto
export function CryptoChart({ ItemsCrypto }) {
    // 1. open: "2765.38000"
    // 2. high: "2765.70000"
    // 3. low: "2764.17000"
    // 4. close: "2764.27000"
    // 5. volume: 58
    const [chartData, setChartData] = useState({
        time: [],
        open: [],
        high: [],
        low: [],
        close: [],
    })
    useEffect(() => {
        ItemsCryptoToArray()

    }, [ItemsCrypto]);

    useEffect(() => {
        console.log('chartData', chartData)
    }, [chartData]);


    const ItemsCryptoToArray = () => {
        function toTimestamp(strDate) {
            var datum = Date.parse(strDate);
            return datum / 1000;
        }
        const getValue = (keyWord,index) => {
            let key  = Object.keys(valuesStock[index]).filter(item => item.includes(keyWord))[0] 
            let value = valuesStock[index][key]
            // console.log('valu t', value)
            return value
        }
        // console.log('ItemsCryptoToArray', ItemsCrypto)
        // console.log('ItemsCryptoToArray' ,Object.keys(ItemsCrypto['Time Series Crypto (5min)']) )
        let keysTime = Object.keys(ItemsCrypto)
        let valuesStock = Object.values(ItemsCrypto)
        // let arr  = Object.keys(valuesStock[0]).map( key => {if (key.includes('open')) return valuesStock[0][key]} )
 
        let valuOpen = valuesStock.map((item, index) => [toTimestamp(keysTime[index]), parseInt(getValue('open',index) )  ])
        let valuHigh = valuesStock.map((item, index) => [toTimestamp(keysTime[index]), parseInt(getValue('high',index) )  ])
        let valuLow = valuesStock.map((item, index) => [toTimestamp(keysTime[index]), parseInt(getValue('low',index) )  ])
        let valuClose = valuesStock.map((item, index) => [toTimestamp(keysTime[index]), parseInt(getValue('close',index) )  ])
        // let valuHigh = valuesStock.map((item, index) => [toTimestamp(keysTime[index]), parseInt(Object.keys(valuesStock[index]).map(key => { if (key.includes('high')) return valuesStock[index][key] })[0])])
        // let valuLow = valuesStock.map((item,index )=> [toTimestamp(keysTime[index]), parseInt( Object.keys(valuesStock[index]).map(key =>{if(key.includes('low')) return valuesStock[index][key]})[0]  )])
        // let valuClose = valuesStock.map((item,index )=> [toTimestamp(keysTime[index]), parseInt( Object.keys(valuesStock[index]).map(key =>{if(key.includes('close')) return valuesStock[index][key]})[0]  )])


        // console.log('valuOpen', valuOpen)
        // console.log('valuHigh', valuHigh)
        setChartData({
            time: keysTime,
            open: valuOpen,
            high: valuHigh,
            low: valuLow,
            close: valuClose,
        })
    }

    const data = React.useMemo(
        () => [
            {
                label: 'Series 1',
                data: chartData.open
                // data: [ItemsCrypto]
            },
            {
                label: 'Series 2',
                data: chartData.high
                // data: [ItemsCrypto]
            },
            {
                label: 'Series 3',
                data: chartData.low
                // data: [ItemsCrypto]
            },
            {
                label: 'Series 4',
                data: chartData.close
                // data: [ItemsCrypto]
            }

        ],
        [chartData]
    )

    const axes = React.useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )

    const LineChart = () => {
        // A react-chart hyper-responsively and continuously fills the available
        // space of its parent element automatically
        return (<div
            style={{
                width: '600px',
                height: '422px'
            }}
        >
            <Chart data={data} axes={axes} />
        </div>)
    }
    return (
        <div>
            {chartData.close.length > 1 && <LineChart />}
        </div>
    )
}
