import { isWebp } from './checkWebp.js';
import { headerLoad } from './headerLoad.js';
import { efficiencyCheckbox } from './efficiencyLoad.js';
import { projectInfoLoad, projectTimeLoad  } from './projectLoad.js';
import { tableLoad } from './tableLoad.js';


document.addEventListener('DOMContentLoaded', () => {
    isWebp()
    headerLoad()
    projectInfoLoad()
    projectTimeLoad()
    efficiencyCheckbox()
    tableLoad()
});