/* 
*  – Реализация с помощью прототипного наследования
*  – Работа с шаблоном и событиями в целом
*  – Дублирование массива с данными
*  – Работа preventDefault(). 
*  – Пейджинг, кнопка "Далее"
*  – Выбор всех элементов списка
*  – Выбор одного элемента списка
*  – Фильтрация элементов
*  – Сортировка элементов
*  – Поиск элементов по имени
*  – Работа с функцией Reduce
*  – Кастомные data атрибуты
*  – Работа с разными View
*  – Отображение полной информации об элементе
*/

(function(){
    const selectAll = document.querySelector('#selectAll'),
        userList = document.querySelector('#user-list'),
        nextBtn = document.querySelector('.btn-next-page'),
        countRole = document.querySelector('.statsUsers'),
        emailDropDown = document.querySelector('#dropdown-email'),
        roleDropDown = document.querySelector('#dropdown-role'),
        search = document.querySelector('#inputSearch');

    let userData = [];

    let pageService = {
        pageItem : 10,
        currentPage : 0
    }    

    function initListeners(){
        selectAll.addEventListener('click', selectAllItem);
        userList.addEventListener('click', selectTabLine);
        nextBtn.addEventListener('click', getNextPage);
        emailDropDown.addEventListener('click', sortHandler);
        roleDropDown.addEventListener('click', sortHandler);
        search.addEventListener('keyup', searchFunc);
    }

    // выбор всех чекбоксов
    function selectAllItem(){
        let chexkboxes = userList.querySelectorAll('input[type="checkbox"]');
        chexkboxes.forEach(elem => {
            selectAll.checked ? elem.checked = true : elem.checked = false;
        });
    }

    // Выделение выбраной линии по клику
    function selectTabLine(event){
        let tabLine = event.currentTarget.querySelectorAll('tr');
        // tabLine.forEach(elem => elem.classList.remove('table-active'));
        tabLine.forEach(elem => elem.style.backgroundColor = 'inherit');
        event.target.closest('tr').classList.add('table-active');
        event.target.closest('tr').style.backgroundColor = 'red';
    }

    // Построение следущего списка
    function getNextPage(e){
        e.preventDefault();
        buildUserList();
        if(isMaxPage()){
            disableBtn();
            showUserRole();
        }
    }

    // если страница последняя - вернет true
    function isMaxPage(){
        return (pageService.currentPage * pageService.pageItem >= userData.length);
    }

    // Если страница последняя - блокируем кнопку
    function disableBtn(){
        nextBtn.classList.add('disabled');
    }

    // Отображает счетчик с Admin & user
    function showUserRole(){
        let info = userData.reduce((sum, user) => {
            (user.role === 'Admin') ? sum.admin++ : sum.user++;
            return sum;
        }, {admin:0, user:0});
        countRole.innerHTML = `Пользователи : Admin - ${info.admin}, User - ${info.user}`;
    }

    // сортировка Users
    function sortHandler (e){
        e.preventDefault();
        //e.currentTarget.querySelector('button').innerHTML = e.target.innerHTML;
        let sortType = e.target.value;
        if (sortType == 0) return;
        sortType && applySortMethod(sortType);
    }

    // Функция сортировки по типу
    function applySortMethod(sortType){
        pageService.currentPage = 0;
        userList.innerHTML = '';
        buildUserList(config.configService[sortType]);

   /*      if (sortType == "AZ"){
            let sortFunction = (page) => {
                page.sort(listService.sortEmailAZ);
                return page;
            }
            buildUserList(sortFunction);
        }

        if (sortType == "ZA"){
            let sortFunction = (page) => {
                page.sort(listService.sortEmailZA);
                return page;
            }
            buildUserList(sortFunction);
        }

        if (sortType == "Admin"){
            let filterFunction = (page) => {
                return page.filter(listService.sortAdmin);
            }
            buildUserList(filterFunction);
        }

        if (sortType == "User"){
            let filterFunction = (page) => {
                return page.filter(listService.sortUser);
            }
            buildUserList(filterFunction);
        } */
    }

    // Поиск search
    function searchFunc(e){
        e.preventDefault();
        let value = e.target.value;

        if (e.keyCode === 13 && (value.length === 0 || value.length > 2)){
            pageService.currentPage = 0;
            userList.innerHTML = '';

            let searchFunction = (page) => {
                let exp = new RegExp(value,"i");
                return page.filter(item => {
                    return exp.test(item.name);
                })
            }
            buildUserList(searchFunction);
        } 
    }
    // дублируем массив
    function dublicateArr (){
        userData =  listService.dublicateData(users, 1);
        console.log(userData);
    }

    // Отображение следущего списка
    function getPage(){
        let start = pageService.pageItem * pageService.currentPage;
        let end = pageService.pageItem + start;
        pageService.currentPage++;
        return userData.slice(start,end);
    }

    // Постройка списка
    function buildUserList(filterSortFunction){
        let page = getPage();
        filterSortFunction && (page = filterSortFunction(page))
        let result = page.map(elem => listService.createTemplate(elem));
        userList.innerHTML += result.join('');
    }

    // Инициализация
    function init(){
        initListeners();
        dublicateArr();
        buildUserList();
    }

    init();
})();
