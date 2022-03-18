import { projectInfo, projectTime } from '../../services/project.service.js';

//Load data from API in section project information
export const projectInfoLoad = () => {
    Array.from(document.querySelector('.info__body').children).forEach(li => {
        switch (li.children[0].innerText) {
            case 'Project name': 
                li.children[1].innerText = projectInfo[li.children[0].innerText] || ''
                break;

            case 'Team lead': 
                li.children[1].innerText = projectInfo[li.children[0].innerText].join(', ') || ''
                break;

            case 'Categories': 
                li.children[1].innerText = projectInfo[li.children[0].innerText].join(', ') || ''
                break;

            case 'Created': 
                if (projectInfo[li.children[0].innerText]) {
                    let time = new Date(+projectInfo[li.children[0].innerText] * 1000)
                    let year = time.getFullYear();
                    let mouth = "0" + time.getMonth();
                    let day = "0" + time.getDate();
                    li.children[1].innerText =`${day.substr(-2)}/${mouth.substr(-2)}/${year}`
                }
                break;
            
            case 'Finished': 
                if (projectInfo[li.children[0].innerText]) {
                    let time = new Date(+projectInfo[li.children[0].innerText] * 1000)
                    let year = time.getFullYear();
                    let mouth = "0" + time.getMonth();
                    let day = "0" + time.getDate();
                    li.children[1].innerText =`${day.substr(-2)}/${mouth.substr(-2)}/${year}`
                }
                break;

            case 'Time': 
                if (projectInfo[li.children[0].innerText]) {
                    li.children[1].children[1].src = projectInfo[li.children[0].innerText]
                }
                break;

            case 'Label': 
                if (projectInfo[li.children[0].innerText].length > 0) {
                    projectInfo[li.children[0].innerText].forEach(item => {
                        let p = document.createElement('p')
                        p.classList.add('info__content', 'info__content--label')
                        p.innerHTML = item
                        li.append(p)
                    })
                }
                break;

            case 'Tag': 
                if (projectInfo[li.children[0].innerText].length > 0) {
                    projectInfo[li.children[0].innerText].forEach(item => {
                        let p = document.createElement('p')
                        p.classList.add('info__content', 'info__content--tag')
                        p.innerHTML = item
                        li.append(p)
                    })
                }
                break;

            case 'Status': 
                if (projectInfo[li.children[0].innerText] === 'Non Completed') {
                    let p = document.createElement('p')
                    p.classList.add('info__content', 'info__content--status')
                    p.innerHTML = projectInfo[li.children[0].innerText]
                    li.append(p)
                }
                else if (projectInfo[li.children[0].innerText] === 'Completed') {
                    let p = document.createElement('p')
                    p.classList.add('info__content', 'info__content--status-grean')
                    p.innerHTML = projectInfo[li.children[0].innerText]
                    li.append(p)
                }
                break;

            case 'Team': 
                li.children[1].innerText = projectInfo[li.children[0].innerText].join(', ') || ''
                break;  

            default:
                li.children[1].innerText = projectInfo[li.children[0].innerText] || ''
                break;
        }
    })
}

//Load data from API in section project time
export const projectTimeLoad = () => {
    document.querySelectorAll('.time__list').forEach((ul, index) => {
        Array.from(ul.children).forEach(li => {
            if (li.classList.contains('time__item')) {
                li.children[1].innerHTML = `${projectTime[index][li.children[0].innerHTML]}h` || '0h'
            }
            else if(li.classList.contains('time__item--col')){
                li.children[0].children[1].innerHTML = `${projectTime[index][li.children[0].children[0].innerHTML][li.children[0].children[0].innerHTML]}h` || '0h'
                for (const [key, value] of Object.entries(projectTime[index][li.children[0].children[0].innerHTML])) {
                    if (key !== 'Origin'){
                        let row = document.createElement('li')
                        row.className = 'time__item'
                        let titleRow = document.createElement('p')
                        titleRow.classList.add('time__text-light', 'text-light')
                        let contentRow = document.createElement('p')
                        contentRow.classList.add('time__text-light', 'text-light')
                        titleRow.innerHTML = key
                        contentRow.innerHTML = value + 'h'

                        row.append(titleRow)
                        row.append(contentRow)
                        li.children[1].children[0].append(row)
                    }
                }
            }
        })
    })
}