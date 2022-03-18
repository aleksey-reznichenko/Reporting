import { efficiency } from '../../services/efficiency.service.js';

//Load data from API in section efficiency
const efficiencyLoad = () => {
    Array.from(document.querySelectorAll('.efficiency__row')[1].children).forEach((col, colIndex) => {
        Array.from(col.children).forEach((row, rowIndex) => {
            if (rowIndex !== 0) {
                Array.from(row.children).forEach((item) => {
                    Array.from(item.children).forEach((itemChild, index) => {
                        if (index !== 0) {
                            if (index === 1) {
                                let value = parseFloat(efficiency[colIndex][row.children[0].innerText][0])
                                itemChild.innerText = value ? value + 'h' : ''
                            }
                            if (index === 2) {
                                let value = parseFloat(efficiency[colIndex][row.children[0].children[0].innerText][1])
                                itemChild.innerText = value ? value + '%' : ''
                            }
                        }
                    })
                })
            }
        })
    })
}

//Hide/show efficiency block
export const efficiencyCheckbox = () => {
    if(!document.querySelector('#filters__efficiency-checkbox').checked){
        document.querySelector('.efficiency').style.display = 'none'
    }
    else {
        document.querySelector('.efficiency').style.display = 'block'
        efficiencyLoad()
    }
    document.querySelector('#filters__efficiency-checkbox').addEventListener("change", efficiencyCheckbox)
}