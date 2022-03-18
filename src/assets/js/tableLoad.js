import { devs } from '../../services/devs.service.js';
import { tasksArray } from '../../services/table.service.js';

export let renders;

export const tableLoad = () => {
   let tasks = tasksArray

   //Filters
   let applyFilters = { dev: [] } //filter values object

   //Hide/show select block
   const selectDesign = e => {
      const defaultDeg = 180;

      if (e?.target.children.length === 2) {
         let deg = parseInt(e.target.children[1].style.transform.slice(7))
         if (deg === defaultDeg) {
               e.target.parentNode.children[1].style.display = 'none';
         }
         else {
               e.target.parentNode.children[1].style.display = 'block';
         }
         e.target.children[1].style.transform = `rotate(${deg === defaultDeg ? 0 : defaultDeg}deg)`;
      }
      else {
         let deg = parseInt(e?.target.parentNode.children[1].style.transform.slice(7))
         if (deg === defaultDeg) {
               e.target.parentNode.parentNode.children[1].style.display = 'none';
         }
         else {
               if (e?.target) {
                  e.target.parentNode.parentNode.children[1].style.display = 'block';
               }
         }
         if (e?.target) {
               e.target.parentNode.children[1].style.transform = `rotate(${deg === defaultDeg ? 0 : defaultDeg}deg)`;
         }
      }
   }

   document.querySelectorAll('.select__main-row').forEach(item => item.addEventListener("click", e => {
      selectDesign(e);
   }))

   document.querySelectorAll('.filter-status').forEach(item => item.addEventListener("click", e => {
      if (e.target.children.length === 1) {
         e.target.parentNode.parentNode.children[0].children[0].innerText = e.target.children[0].innerText
         selectDesign(e.target.parentNode.parentNode.children[0].click());
      }
      else {
         e.target.parentNode.parentNode.parentNode.children[0].children[0].innerText = e.target.innerText
         selectDesign(e.target.parentNode.parentNode.parentNode.children[0].click());
      }
   }))

   let selectMoreFlag = true;
   document.querySelectorAll('.select__more').forEach(item => item.addEventListener("click", e => {
      const defaultDeg = 180;
      let parent;
      let type;

      if (e.target.children.length !== 0) {
         let deg = parseInt(e.target.children[0].style.transform.slice(7))
         parent = e.target.parentNode.parentNode.children[1]
         type = e.target.parentNode.children[0].children[1].innerText
         e.target.children[0].style.transform = `rotate(${deg === defaultDeg ? 0 : defaultDeg}deg)`;
         if (deg === defaultDeg) {
               parent.style.display = 'none'
               selectMoreFlag = false
         }
         else {
               addBlock()
         }
      }
      else {
         let deg = parseInt(e.target.style.transform.slice(7))
         e.target.style.transform = `rotate(${deg === defaultDeg ? 0 : defaultDeg}deg)`;
         parent = e.target.parentNode.parentNode.parentNode.children[1]
         type = e.target.parentNode.parentNode.children[0].children[1].innerText
         if (deg === defaultDeg) {
               parent.style.display = 'none'
               selectMoreFlag = false
         }
         else {
               addBlock()
         }
      }

      function addBlock() {
         if (parent && type) {
               for (const [key, value] of Object.entries(devs)) {
                  if(key.trim() === type.trim()) {
                     value.forEach(item => {
                           if(!selectMoreFlag) {
                              let strValue = Array.from(parent.children).map(item => item.children[0].children[1].innerText);
                              if (!strValue.join(' ').includes(item)) {
                                 addRow(item)
                              }
                              else {
                                 parent.style.display = 'block'
                              }
                           }
                           else {
                              addRow(item)
                           }
                     })
                  }
               }
         }
      }

      function addRow(item) {
         parent.style.display = 'block'
         let li = document.createElement('li')
         let div = document.createElement('div')
         div.classList.add('select__developers-row')

         let input = document.createElement('input')
         input.type='checkbox';
         input.checked = true
         input.classList.add('select__checkbox')
         input.id = `select__checkbox-${item.toLowerCase().split(' ').join('-')}`
         input.addEventListener('click', e =>
               checkSelected(e)
         )

         let label = document.createElement('label')
         label.for = input.id
         label.classList.add('select__checkbox-label', 'select__checkbox-label--developers')
         label.innerText = item

         div.append(input)
         div.append(label)
         li.append(div)
         parent.append(li)
      }

      function checkSelected(e) {
         let arrCheck = Array.from(e.target.parentNode.parentNode.parentNode.children).map(item =>
               !!item.children[0].children[0].checked
         )
         e.target.parentNode.parentNode.parentNode.parentNode.children[0].children[0].children[0].checked = arrCheck.includes(true);
         
         let globalArrCheck = Array.from(document.querySelectorAll('.select__developers-row')).map(item => {
               return !!item.children[0].checked
         })
         if (globalArrCheck.includes(false)){
               document.querySelector('#select__checkbox-all-people').checked = false
         }
         else {
               document.querySelector('#select__checkbox-all-people').checked = true
         }
      }
   }))

   document.querySelector('#select__checkbox-all-people').addEventListener('click', e => {
      if (!e.target.checked){
         document.querySelectorAll('.select__checkbox').forEach(item => item.checked = false)
         e.target.checked = false
      }
      else {
         document.querySelectorAll('.select__checkbox').forEach(item => item.checked = true )
         e.target.checked = true
      }
   })

   document.querySelectorAll('.select__checkbox').forEach((item, index, array) => item.addEventListener("click", e => {
      if(!e.target.checked) {
         document.querySelector('#select__checkbox-all-people').checked = false
         document.querySelector('#select__value').innerText = 'Selected People'
      }
      else {
         let flag = Array.from(array).map(item => !!item.checked)
         flag.shift()
         if(!flag.includes(false)){
               document.querySelector('#select__checkbox-all-people').checked = true
               document.querySelector('#select__value').innerText = 'All People'
         }
      }
   }))

   document.querySelectorAll('.select__main-cat').forEach(item => item.addEventListener('click', e => {
      e.target.parentNode.parentNode.children[1].click()
      Array.from(e.target.parentNode.parentNode.parentNode.children[1].children).forEach(item =>
         item.children[0].children[0].checked = e.target.checked
      )
   }))

   document.querySelector('.filters__button-reset').addEventListener('click', () => {
      document.querySelector('#select__value').innerText = 'All People'
      document.querySelector('#select__status').innerText = 'All Statuses'
      document.querySelectorAll('.select__checkbox').forEach(item => item.checked = true)
      document.querySelector('#filters__efficiency-checkbox').checked = true
   })

   document.querySelector('.filters__button-apply').addEventListener('click', () => {
      applyFilters.dev = []
      document.querySelectorAll('.select__developers').forEach(item => {
         if (item.children.length === 0) {
               item.parentNode.children[0].children[1].children[0].style.transform = 'rotate(0deg)'
               item.parentNode.children[0].children[1].click()
               Array.from(item.children).forEach(li => {
                  if (li.children[0].children[0].checked) {
                     applyFilters.dev.push(li.children[0].children[1].innerText)
                  }
               })
         }
         else {
               Array.from(item.children).forEach(li => {
                  if (li.children[0].children[0].checked) {
                     applyFilters.dev.push(li.children[0].children[1].innerText)
                  }
               })
         }
      })


      applyFilters.status = document.querySelector('#select__status').innerText

      if (!applyFilters.status || applyFilters.dev.length !== 0) {
         tasks = tasksArray.filter(item => {
               if (applyFilters.status !== 'All Statuses') {
                  if (item.status.toLowerCase().trim().length === applyFilters.status.toLowerCase().trim().length) {
                     return item
                  }
               }
               else {
                  return item
               }
         })
         tasks = tasks.filter(item => {
               let flag = item.developer.filter(dev => {
                  if (applyFilters.dev.includes(dev)){
                     return true
                  }
               })
               if (flag.length > 0) {
                  return item
               }
         })
         createTableTasks()
         changeRows()
         paginationF()
      }
   })


   let currentRowsPerPage = +document.querySelector('#select__page').innerHTML;
   let currentPage = 1;

   const $paginationCount = document.querySelector('.pagination__count');
   const $rowsPerPage = document.createElement('span');
   $rowsPerPage.className = 'pagination__rows-per-page';
   $rowsPerPage.innerHTML = `1-${tasks.length < currentRowsPerPage ? tasks.length : currentRowsPerPage} of ${tasks.length}`;
   $paginationCount.appendChild($rowsPerPage);

   function createTableTasks() {
      const maxLengthLineDeveloper = 7;
      const maxLengthLineWork = 5;

      let counter = 0;
      let summTotalTimeSpentByAll = 0;
      let summMyTimeSpentByPeriod = 0;
      let efficiencyAvarage = [];

      const table = document.querySelector('.table__body');
      table.innerHTML = ''
      for (const row of tasks) {
         const tr = document.createElement('tr');
         if (counter % 2 === 0) {
               tr.classList.add('table__row', 'table__row--content', 'table__row--not-odd')
               counter++
         }
         else {
               tr.classList.add('table__row', 'table__row--content', 'table__row--odd')
               counter++
         }

         for (const [key, value] of Object.entries(row)) {
               const td = document.createElement('td')
               if (key === 'taskName') {
                  td.classList.add('table__task-name', 'table__task-name--content');
                  td.innerHTML = `<a href="#">${value || 'task name'}</a>`
               }
               else if (key === 'developer') {
                  td.classList.add('table__developer', 'table__developer--content')
                  if (value.length > 0) {
                     if (value.length >= maxLengthLineDeveloper) {
                           td.innerHTML += `
                     <p>
                           <span>${value[0]}, ${value[1]}...</span>
                           <span style="display:none;">${value.join(', ')}</span>
                     </p>
                     <span class="table__show-more">
                           Show more (${value.length-2})
                     </span>
                  `
                     }
                     else{
                           td.innerHTML += `${value.join(', ')}`
                     }
                  }
                  else{
                     td.innerHTML = 'not developers'
                  }
               }
               else if (key === 'workType') {
                  td.classList.add('table__work-type', 'table__work-type--content')
                  if (value.length > 0) {
                     if (value.length >= maxLengthLineWork) {
                           td.innerHTML += `
                     <p>
                           <span>${value[0]}, ${value[1]}...</span>
                           <span style="display:none;">${value.join(', ')}</span>
                     </p>
                     <span class="table__show-more">
                           Show more (${value.length-2})
                     </span>
                  `
                     }
                     else {
                           td.innerHTML += `${value.join(', ')}`
                     }
                  }
                  else {
                     td.innerHTML = 'not work type'
                  }
               }
               else if (key === 'status') {
                  if (value === 'Сompleted') {
                     td.classList.add('table__status', 'table__status--completed')
                     td.innerHTML = `<span>${value}</span>`
                  }
                  else if(value === 'Not completed'){
                     td.classList.add('table__status', 'table__status--non-completed')
                     td.innerHTML = `<span>${value}</span>`
                  }
                  else{
                     td.innerHTML = `<span>-</span>`
                  }
               }
               else if (key === 'estimation') {
                  td.classList.add('table__estimation')
                  td.innerHTML = `<span>${parseFloat(value).toFixed(1) || '0.0'}</span>`
               }
               else if (key === 'totalTimeSpent') {
                  td.classList.add('table__total-time')
                  td.innerHTML = `<span>${parseFloat(value).toFixed(2) || '0.0'}</span>`
                  summTotalTimeSpentByAll += value
               }
               else if (key === 'MyTimeSpentByPeriod') {
                  td.classList.add('table__my-time')
                  td.innerHTML = `<span>${parseFloat(value).toFixed(2) || '0.0'}</span>`
                  summMyTimeSpentByPeriod += value
               }
               else if (key === 'efficiency') {
                  td.classList.add('table__efficiency')
                  td.innerHTML = `<span>${value || '-'}</span>`
                  if (value !== null) {
                     efficiencyAvarage.push(parseFloat(value))
                  }
               }
               else {
                  continue;
               }
               tr.appendChild(td)
         }
         if (counter === tasks.length) {
               const totalTime = Math.ceil(summTotalTimeSpentByAll)
               const totalMyTime = Math.ceil(summMyTimeSpentByPeriod)
               const eff = efficiencyAvarage.reduce((acc, item) => acc + item, 0)
               const totalEfficiency = (eff / efficiencyAvarage.length) || 0

               const trSumm = document.querySelector('.table__row--summ');
               trSumm.innerHTML = `
                  <div class="table__width-summ"><span>Sum</span></div>
                  <div class="table__total-time"><span>${totalTime}h</span></div>
                  <div class="table__my-time"><span>${totalMyTime}h</span></div>
                  <div class="table__efficiency"><span>${totalEfficiency}% (${totalMyTime}h)</span></div>
               `;
               table.append(tr);
         }
         else {
               table.append(tr);
         }
      }

      const readMore = e => {
         const text = e.target.parentNode
         if (e.target.innerHTML.includes('Show more')) {
               e.target.innerHTML = 'Hide'
               text.children[0].children[0].style.display = 'none'
               text.children[0].children[1].style.display = 'inline'
         }
         else {
               e.target.innerHTML = `Show more (${text.children[0].children[1].innerHTML.split(', ').length-2})`
               text.children[0].children[0].style.display = 'inline'
               text.children[0].children[1].style.display = 'none'
         }
      }
      document.querySelectorAll('.table__show-more').forEach(showMore => showMore.addEventListener('click', event => readMore(event)));
   }

   function getSort ({ target }) {
         const order = (target.dataset.order = -(target.dataset.order || -1));
         let index = 0
         if (target.parentNode.cells) {
               index = [...target.parentNode.cells].indexOf(target);
         }
         else {
               index = [...target.parentNode.parentNode.cells].indexOf(target.parentNode);
         }
         const collator = new Intl.Collator('en', { numeric: true });
         const comparator = (index, order) => (a, b) => {
               return order * collator.compare(
                  a.children[index].innerHTML,
                  b.children[index].innerHTML
               )};

         for(const tBody of target.closest('table').tBodies)
               tBody.append(...[...tBody.rows].sort(comparator(index, order)));
   }

   function changeRows() {
      const maxHeightPerPage5 = 363;
      const maxHeightPerPage10 = 600;
      currentRowsPerPage = +document.querySelector('#select__page').innerHTML;
      $rowsPerPage.innerHTML = `${currentPage === 1 ? currentPage : ((currentPage - 1) * currentRowsPerPage)+1}-${tasks.length > currentRowsPerPage*currentPage ? currentRowsPerPage*currentPage : tasks.length} of ${tasks.length}`;
      let tBody = document.querySelector('.table__body');
      if (currentRowsPerPage === 5) {
         tBody.style.minHeight = `${maxHeightPerPage5}px`;
         tBody.style.maxHeight = `${maxHeightPerPage5}px`;
         tBody.style.overflowY="scroll";
         tBody.style.display="block";
      }
      if (currentRowsPerPage >= 10) {
         tBody.style.minHeight = `${maxHeightPerPage10}px`;
         tBody.style.maxHeight = `${maxHeightPerPage10}px`;
         tBody.style.overflowY="scroll";
         tBody.style.display="block";
      }
      tBody.childNodes.forEach((item, index) => {
         if (index >= currentRowsPerPage * (currentPage - 1) && index < currentRowsPerPage * currentPage) {
            item.style.display = 'flex'
         }
         else {
            item.style.display = 'none'
         }
      })
   }

   function paginationF() {
      const $pagination = document.querySelector('.pagination__page-number');
      $pagination.innerHTML = ''
      const $arrowPrev = document.createElement('img');
      $arrowPrev.className = 'arrowPrev';
      if (document.documentElement.getAttribute('data-theme') === 'dark') {
         $arrowPrev.src = 'img/arrowRight.svg';
      }
      else {
         $arrowPrev.src = 'img/arrowGray.svg';
      }
      $pagination.appendChild($arrowPrev);

      if (currentPage > Math.ceil(tasks.length / currentRowsPerPage)-1) {
         const $selectedButton = document.createElement('button');
         $selectedButton.className = 'pagination__button-selected';
         $selectedButton.innerText = `${currentPage}`;

         const $pageNumber = document.createElement('div');
         $pageNumber.style.marginRight = '14px'
         $pagination.style.width = '100px'

         $pageNumber.appendChild($selectedButton);
         $pagination.appendChild($pageNumber);

         const $arrowNext = document.createElement('img');
         $arrowNext.className = 'arrowNext';
         if (document.documentElement.getAttribute('data-theme') === 'dark') {
               $arrowNext.src = 'img/arrowRight.svg';
               $arrowNext.style.transform = 'rotate(180deg)';
         } 
         else {
               $arrowNext.src = 'img/arrowGray.svg';
               $arrowNext.style.transform = 'rotate(180deg)';
         }

         $pagination.appendChild($arrowNext);
      } 
      else {
         const $selectedButton = document.createElement('button');
         $selectedButton.className = 'pagination__button-selected';
         $selectedButton.innerText = `${currentPage}`;
         $pagination.style.width = '120px'

         const $pageNumber = document.createElement('div');

         const $button = document.createElement('button');
         $button.className = 'pagination__button';
         $button.innerText = `${currentPage + 1}`;
         $button.addEventListener('click', () => next());

         $pageNumber.appendChild($selectedButton);
         $pageNumber.appendChild($button);
         $pagination.appendChild($pageNumber);

         const $arrowNext = document.createElement('img');
         $arrowNext.className = 'arrowNext';
         if (document.documentElement.getAttribute('data-theme') === 'dark') {
               $arrowNext.src = 'img/arrowLeft.svg';
         } 
         else {
               $arrowNext.src = 'img/arrowRight.svg';
               $arrowNext.style.transform = 'rotate(180deg)';
         }

         $pagination.appendChild($arrowNext);

         $arrowPrev.addEventListener('click', () => prev());
         $arrowNext.addEventListener('click', () => next());

         const prev = () => {
               if (currentPage > 1) {
                  currentPage--;
                  changePage(currentPage);
                  changeRows();

                  if (document.documentElement.getAttribute('data-theme') === 'dark') {
                     if (currentPage !== 1) {
                           $arrowNext.src = 'img/arrowLeft.svg';
                           $arrowNext.style.transform = 'none';
                     }
                  }
                  else {
                     if (currentPage !== 1) {
                           $arrowNext.src = 'img/arrowRight.svg';
                           $arrowNext.style.transform = 'rotare(180deg)';
                           $arrowPrev.style.transform = 'none';
                           $arrowPrev.src = 'img/arrowRight.svg';
                     }
                  }
               }
               if (currentPage === 1) {
                  if (document.documentElement.getAttribute('data-theme') === 'dark') {
                     $arrowPrev.style.transform = 'none';
                     $arrowPrev.src = 'img/arrowRight.svg'
                     $arrowNext.src = 'img/arrowLeft.svg';
                     $arrowNext.style.transform = 'none';
                  }
                  else {
                     $arrowPrev.style.transform = 'none';
                     $arrowPrev.src = 'img/arrowGray.svg'
                     $arrowNext.src = 'img/arrowRight.svg';
                     $arrowNext.style.transform = 'rotare(180deg)';
                  }
               }
         };

         const next = () => {
               if (currentPage < Math.ceil(tasks.length / currentRowsPerPage)) {
                  currentPage++;
                  changePage(currentPage);
                  changeRows();
                  if (document.documentElement.getAttribute('data-theme') === 'dark') {
                     $arrowPrev.src = 'img/arrowLeft.svg';
                     $arrowPrev.style.transform = 'rotate(180deg)';
                     $arrowNext.src = 'img/arrowLeft.svg';
                     $arrowNext.style.transform = 'none';
                  }
                  else {
                     $arrowPrev.src = 'img/arrowRight.svg';
                     $arrowPrev.style.transform = 'none';
                     $arrowNext.src = 'img/arrowRight.svg';
                     $arrowNext.style.transform = 'rotate(180deg)';
                  }
               }
               if (currentPage === Math.ceil(tasks.length / currentRowsPerPage)) {
                  if (document.documentElement.getAttribute('data-theme') === 'dark') {
                     $arrowNext.src = 'img/arrowRight.svg';
                     $arrowNext.style.transform = 'rotate(180deg)';
                  } 
                  else {
                     $arrowNext.src = 'img/arrowGray.svg';
                     $arrowNext.style.transform = 'rotate(180deg)';
                  }
               }
         };

         const changePage = (currentPage) => {
               $selectedButton.innerText = `${currentPage}`;
               $button.innerText = `${currentPage + 1}`;
               $button.style.opacity = '1';
               $button.style.cursor = 'pointer';

               if (currentPage > Math.ceil(tasks.length / currentRowsPerPage)-1) {
                  $button.style.opacity = '0';
                  $button.style.cursor = 'default';
               }
         };
      }
   }

   document.querySelectorAll('.per-page').forEach(item => item.addEventListener('click', () => {
      currentPage = 1;
      changeRows(); 
      paginationF();
   }))
   document.querySelectorAll('.table thead tr').forEach(tableTH => tableTH.addEventListener('click', event => getSort(event)));

   renders = paginationF
   paginationF()
   createTableTasks()
   changeRows()
}